/**
 * @file add-frontmatter.mjs
 * @description 为 docs/figures 下缺少 frontmatter 的 markdown 文件自动补充元数据
 *
 * 本脚本扫描 figures/emperors、figures/generals、figures/strategists 三个目录，
 * 读取每个文件的正文内容，从中提取：
 * - title: 从 H1 标题提取（去除副标题如"· 李世民"）
 * - dynasty: 从基本信息表的「朝代」字段提取高层朝代名
 * - era: 根据朝代字段映射为侧边栏分组时期
 * - type: 根据所在目录自动判定（emperor/general/strategist）
 *
 * 已存在 frontmatter 的文件会被跳过，不会重复添加。
 *
 * 使用方式：node scripts/add-frontmatter.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ── 路径设置 ────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const docsDir = path.join(projectRoot, 'docs')

// ── 朝代 → frontmatter dynasty/era 映射表 ──────────────────
// key: 基本信息表中「朝代」列提取的文本
// value: { dynasty, era } — 分别对应 frontmatter 中的 dynasty 和 era 字段

const DYNASTY_MAP = {
  // ── 先秦 ──
  '夏朝':    { dynasty: '先秦', era: '夏' },
  '商朝':    { dynasty: '先秦', era: '商' },
  '西周':    { dynasty: '先秦', era: '西周' },
  '东周':    { dynasty: '先秦', era: '东周' },
  '春秋':    { dynasty: '先秦', era: '春秋' },
  '战国':    { dynasty: '先秦', era: '战国' },
  '战国·秦': { dynasty: '先秦', era: '战国' },

  // ── 秦汉 ──
  '秦朝':      { dynasty: '秦汉', era: '秦' },
  '秦':        { dynasty: '秦汉', era: '秦' },
  '西汉':      { dynasty: '秦汉', era: '西汉' },
  '东汉':      { dynasty: '秦汉', era: '东汉' },
  '秦汉':      { dynasty: '秦汉', era: '秦汉' },
  '秦末汉初':  { dynasty: '秦汉', era: '秦末汉初' },
  '楚汉之争':  { dynasty: '秦汉', era: '楚汉之争' },
  '新朝':      { dynasty: '秦汉', era: '新莽末年' },

  // ── 三国 ──
  '三国':          { dynasty: '三国', era: '三国' },
  '三国·曹魏':     { dynasty: '三国', era: '曹魏' },
  '三国·蜀汉':     { dynasty: '三国', era: '蜀汉' },
  '三国·孙吴':     { dynasty: '三国', era: '孙吴' },
  '三国·东汉末年': { dynasty: '三国', era: '东汉末' },
  '三国·南蛮':     { dynasty: '三国', era: '三国' },

  // ── 两晋南北朝 ──
  '西晋':        { dynasty: '两晋南北朝', era: '西晋' },
  '东晋':        { dynasty: '两晋南北朝', era: '东晋' },
  '十六国':      { dynasty: '两晋南北朝', era: '十六国' },
  '南朝':        { dynasty: '两晋南北朝', era: '南朝' },
  '北朝':        { dynasty: '两晋南北朝', era: '北朝' },
  '北魏':        { dynasty: '两晋南北朝', era: '北魏' },
  '南朝梁':      { dynasty: '两晋南北朝', era: '南朝梁' },

  // ── 隋唐 ──
  '隋朝':    { dynasty: '隋唐', era: '隋' },
  '唐朝':    { dynasty: '隋唐', era: '唐' },
  '唐':      { dynasty: '隋唐', era: '唐' },
  '贞观':    { dynasty: '隋唐', era: '唐初' },
  '开元':    { dynasty: '隋唐', era: '唐中期' },
  '安史之乱': { dynasty: '隋唐', era: '安史之乱' },
  '五代十国': { dynasty: '隋唐', era: '五代十国' },

  // ── 宋元明清 ──
  '宋朝':    { dynasty: '宋元明清', era: '宋' },
  '北宋':    { dynasty: '宋元明清', era: '北宋' },
  '南宋':    { dynasty: '宋元明清', era: '南宋' },
  '辽':      { dynasty: '宋元明清', era: '辽' },
  '西夏':    { dynasty: '宋元明清', era: '西夏' },
  '金':      { dynasty: '宋元明清', era: '金' },
  '元朝':    { dynasty: '宋元明清', era: '元' },
  '明朝':    { dynasty: '宋元明清', era: '明' },
  '清朝':    { dynasty: '宋元明清', era: '清' },
  '明':      { dynasty: '宋元明清', era: '明' },
  '清':      { dynasty: '宋元明清', era: '清' }
}

// ── 工具函数 ────────────────────────────────────────────────

/**
 * 判断文件是否已有 frontmatter
 * @param {string} content - 文件内容
 * @returns {boolean}
 */
function hasFrontmatter(content) {
  return /^---\r?\n/.test(content)
}

/**
 * 从 H1 标题提取简短标题（去除副标题分隔符「·」「•」及后续内容）
 * @param {string} content - 文件内容
 * @param {string} fallback - 无法提取时的备选标题（文件名）
 * @returns {string}
 */
function extractTitle(content, fallback) {
  const h1 = content.match(/^#\s+(.+)/m)
  if (!h1) return fallback
  // 去除副标题，如 "唐太宗 · 李世民" → "唐太宗"
  return h1[1].replace(/[·•\-—].*$/, '').trim()
}

/**
 * 从基本信息表中提取朝代字段的纯文本值
 * @param {string} content - 文件内容
 * @returns {string|null} 朝代文本，如 "唐朝"、"三国·蜀汉"
 */
function extractDynasty(content) {
  // 匹配表格中的朝代行：| **朝代** | [显示文本](链接) |
  // 或：| **朝代** | 纯文本 |
  const match = content.match(/\|\s*\*\*朝代\*\*\s*\|\s*([^|]+)\|/)
  if (!match) return null
  const raw = match[1].trim()
  // 如果是 markdown 链接格式 [文本](链接)，提取文本部分
  const linkMatch = raw.match(/\[([^\]]+)\]/)
  if (linkMatch) return linkMatch[1].trim()
  return raw
}

/**
 * 根据朝代文本查找对应的 dynasty 和 era
 * @param {string} dynastyText - 从表格提取的朝代文本
 * @returns {{ dynasty: string, era: string } | null}
 */
function resolveDynasty(dynastyText) {
  if (!dynastyText) return null
  // 直接匹配
  if (DYNASTY_MAP[dynastyText]) return DYNASTY_MAP[dynastyText]
  // 尝试去掉可能的多余部分（如 "战国·秦" 匹配不到时尝试 "秦"）
  for (const key of Object.keys(DYNASTY_MAP)) {
    if (dynastyText.includes(key) || key.includes(dynastyText)) {
      return DYNASTY_MAP[key]
    }
  }
  return null
}

/**
 * 根据目录名确定 type 字段
 * @param {string} dirName - 目录名（emperors/generals/strategists）
 * @returns {string}
 */
function resolveType(dirName) {
  const map = {
    emperors: 'emperor',
    generals: 'general',
    strategists: 'strategist'
  }
  return map[dirName] || ''
}

/**
 * 为单个文件添加 frontmatter
 * @param {string} filePath - 文件绝对路径
 * @param {string} relPath - 相对 docs 目录的路径
 * @returns {{ status: 'skipped'|'added'|'error', message: string }}
 */
function processFile(filePath, relPath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  // 已有 frontmatter 则跳过
  if (hasFrontmatter(content)) {
    return { status: 'skipped', message: '已有 frontmatter，跳过' }
  }

  const fileName = path.basename(filePath, '.md')
  const dirName = path.basename(path.dirname(filePath))

  // 提取标题
  const title = extractTitle(content, fileName)

  // 提取朝代信息
  const dynastyText = extractDynasty(content)
  const resolved = resolveDynasty(dynastyText)

  // 确定 type
  const type = resolveType(dirName)

  // 构建 frontmatter
  let fmLines = [`---`]
  fmLines.push(`title: ${title}`)

  if (resolved) {
    fmLines.push(`dynasty: ${resolved.dynasty}`)
    fmLines.push(`type: ${type}`)
    fmLines.push(`era: ${resolved.era}`)
  } else {
    // 无法判定朝代时，仍添加基础 frontmatter
    fmLines.push(`type: ${type}`)
    fmLines.push(`# TODO: 请补充 dynasty 和 era 字段`)
    if (dynastyText) {
      fmLines.push(`# 检测到朝代值: "${dynastyText}"，但未在映射表中找到匹配`)
    }
  }
  fmLines.push(`---`)
  fmLines.push(``)

  const newContent = fmLines.join('\n') + content

  fs.writeFileSync(filePath, newContent, 'utf-8')
  return {
    status: 'added',
    message: resolved
      ? `title=${title}, dynasty=${resolved.dynasty}, era=${resolved.era}`
      : `title=${title} (朝代未匹配: "${dynastyText}")`
  }
}

// ── 主流程 ──────────────────────────────────────────────────

/**
 * 扫描指定目录并处理所有 markdown 文件
 * @param {string} dir - 目录绝对路径
 * @param {string} [baseRel=''] - 相对路径前缀
 */
function processDir(dir, baseRel = '') {
  if (!fs.existsSync(dir)) return

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let added = 0, skipped = 0, errors = 0

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'index.md') continue

    const fullPath = path.join(dir, entry.name)
    const relPath = path.join(baseRel, entry.name)

    if (entry.isDirectory()) {
      const result = processDir(fullPath, relPath)
      added += result.added
      skipped += result.skipped
      errors += result.errors
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const result = processFile(fullPath, relPath)
      if (result.status === 'added') {
        console.log(`  ✏️  ${relPath} → ${result.message}`)
        added++
      } else if (result.status === 'error') {
        console.log(`  ❌ ${relPath} → ${result.message}`)
        errors++
      } else {
        skipped++
      }
    }
  }

  return { added, skipped, errors }
}

// 执行
console.log('🔍 扫描 docs/figures 目录，为缺少 frontmatter 的文件补充元数据...\n')

const figureDirs = ['figures/emperors', 'figures/generals', 'figures/strategists']
let totalAdded = 0, totalSkipped = 0, totalErrors = 0

for (const dir of figureDirs) {
  const fullPath = path.join(docsDir, dir)
  console.log(`\n📁 ${dir}`)
  const result = processDir(fullPath, dir)
  totalAdded += result.added
  totalSkipped += result.skipped
  totalErrors += result.errors
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 已添加 frontmatter: ${totalAdded} 个文件`)
console.log(`⏭️  已有 frontmatter: ${totalSkipped} 个文件（跳过）`)
if (totalErrors > 0) {
  console.log(`❌ 出错: ${totalErrors} 个文件`)
}
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

if (totalAdded > 0) {
  console.log(`\n💡 提示：请检查标记了 TODO 的文件，手动补充 dynasty 和 era 字段。`)
}
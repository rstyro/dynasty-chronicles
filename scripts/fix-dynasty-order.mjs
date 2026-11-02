/**
 * @file fix-dynasty-order.mjs
 * @description 为朝代目录下所有 markdown 文件添加 order 字段，实现按历史年代顺序排序
 *
 * 侧边栏生成器默认按中文拼音排序，导致朝代顺序混乱（如"北朝"排在"东晋"之前）。
 * 本脚本为每个朝代文件添加 order 字段，确保侧边栏按历史演进顺序显示。
 *
 * 使用方式：node scripts/fix-dynasty-order.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ── 路径设置 ────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const dynastiesDir = path.join(projectRoot, 'docs', 'dynasties')

// ── 朝代排序映射表 ──────────────────────────────────────────
// 按历史演进顺序排列，order 数字越小越靠前
// key: 文件名（不含 .md），value: order 序号

const DYNASTY_ORDER = {
  // ── 上古 ──
  'three-sovereigns': 1,  // 三皇五帝
  'xia': 2,               // 夏朝
  'shang': 3,             // 商朝
  'western-zhou': 4,      // 西周
  'pre-qin': 5,           // 先秦时期（总览）

  // ── 春秋战国 ──
  'spring-autumn': 1,     // 东周（春秋时期）
  'chunqiu': 2,           // 春秋
  'zhanguo': 3,           // 战国

  // ── 帝国初立 ──
  'qin': 1,               // 秦朝
  'chu-han': 2,           // 楚汉之争
  'western-han': 3,       // 西汉
  'eastern-han': 4,       // 东汉
  'han': 5,               // 汉朝（总览）
  'xin': 6,               // 新朝

  // ── 分裂融合 ──
  'sanguo': 1,            // 三国（总览）
  'cao-wei': 2,           // 曹魏
  'shu-han': 3,           // 蜀汉
  'sun-wu': 4,            // 孙吴
  'jin': 5,               // 晋朝（总览）
  'western-jin': 6,       // 西晋
  'eastern-jin': 7,       // 东晋
  'sixteen-kingdoms': 8,  // 十六国
  'nanbei-chao': 9,       // 南北朝（总览）
  'nanchao': 10,          // 南朝
  'beichao': 11,           // 北朝

  // ── 隋唐盛世 ──
  'sui': 1,               // 隋朝
  'tang': 2,              // 唐朝
  'wudai-shiguo': 3,      // 五代十国

  // ── 宋元明清 ──
  'song': 1,              // 宋朝（总览）
  'northern-song': 2,     // 北宋
  'southern-song': 3,     // 南宋
  'liao': 4,              // 辽朝
  'western-xia': 5,       // 西夏
  'jin-dynasty': 6,       // 金朝
  'yuan': 7,              // 元朝
  'ming': 8,              // 明朝
  'qing': 9               // 清朝
}

// ── 主流程 ──────────────────────────────────────────────────

const entries = fs.readdirSync(dynastiesDir, { withFileTypes: true })
let updated = 0, skipped = 0, notFound = []

for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') continue

  const slug = entry.name.replace(/\.md$/, '')
  const filePath = path.join(dynastiesDir, entry.name)
  let content = fs.readFileSync(filePath, 'utf-8')

  // 跳过没有 frontmatter 的文件
  if (!/^---\r?\n/.test(content)) {
    console.log(`  ⏭️  ${entry.name} — 无 frontmatter，跳过`)
    skipped++
    continue
  }

  const order = DYNASTY_ORDER[slug]
  if (order === undefined) {
    notFound.push(slug)
    console.log(`  ⚠️  ${entry.name} — 未在排序表中找到，跳过`)
    skipped++
    continue
  }

  // 检查是否已有 order 字段
  if (/^order:\s*\d+/m.test(content)) {
    // 更新已有的 order 值
    content = content.replace(/^(order:\s*)\d+/m, `$1${order}`)
    console.log(`  🔄 ${entry.name} — 更新 order=${order}`)
  } else {
    // 在 period 字段后插入 order 字段
    content = content.replace(/^(period:\s*.+)$/m, `$1\norder: ${order}`)
    console.log(`  ✏️  ${entry.name} — 添加 order=${order}`)
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  updated++
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 已更新: ${updated} 个文件`)
console.log(`⏭️  已跳过: ${skipped} 个文件`)
if (notFound.length > 0) {
  console.log(`⚠️  未找到排序配置: ${notFound.join(', ')}`)
}
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
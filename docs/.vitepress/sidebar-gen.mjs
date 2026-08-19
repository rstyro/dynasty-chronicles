/**
 * @file sidebar-gen.mjs
 * @description VitePress 侧边栏自动生成脚本
 *
 * 本脚本通过扫描 docs/ 目录下所有 markdown 文件的 frontmatter 元数据，
 * 自动生成 VitePress 侧边栏配置，避免手动维护 config.mts 中的侧边栏列表。
 *
 * ## 使用方式
 * 1. 在 config.mts 中导入：`import { generateSidebar } from './sidebar-gen.mjs'`
 * 2. 将 `sidebar` 字段设为 `generateSidebar()`
 *
 * ## Frontmatter 字段说明
 * 每个 markdown 文件头部需要包含 YAML frontmatter：
 * ```yaml
 * ---
 * title: 显示标题          # 侧边栏显示的名称（可选，默认从 H1 标题提取）
 * era: 秦汉               # 历史时期分组，用于侧边栏分组
 * type: general           # 类型：general / emperor / strategist（可选）
 * order: 1                # 同组内排序序号，数字越小越靠前（可选，默认 0）
 * ---
 * ```
 *
 * ## era 分组规则
 * - 人物（帝王/武将/谋臣）：先秦 / 秦汉 / 三国 / 两晋南北朝 / 隋唐 / 宋元明清
 * - 朝代：上古 / 春秋战国 / 帝国初立 / 分裂融合 / 隋唐盛世 / 宋元明清
 * - 战役：上古先秦 / 秦汉 / 三国 / 两晋南北朝 / 隋唐 / 宋元明清
 *
 * 如果 era 值不在上述标准分组中，会通过映射表自动归并到最近的大分组。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 当前脚本所在目录（docs/.vitepress/）
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// docs 根目录
const docsDir = path.resolve(__dirname, '..')

// ── 侧边栏分组排序 ──────────────────────────────────────────
// 定义各个板块侧边栏的分组显示顺序，数组顺序即为侧边栏中分组的出现顺序

/** 人物板块（帝王/武将/谋臣/科学家）的时期分组排序 */
const FIGURES_ERA_ORDER = ['上古', '东周', '秦汉', '三国', '晋朝', '南北朝', '隋唐', '五代十国宋辽金夏', '元朝', '明朝', '清朝', '现代']

/** 朝代板块的时期分组排序（多民族政权并立视角） */
const DYNASTIES_PERIOD_ORDER = ['上古·文明起源', '东周·诸侯割据', '秦汉·大一统', '三国·两晋·十六国', '南北朝·民族融合', '隋唐盛世', '多民族政权并立', '大一统皇朝']

// ── Era → 侧边栏分组 映射 ──────────────────────────────────
// 将文件中具体的、细粒度的 era 值映射为侧边栏的大分组名。
// 新增人物/战役时，只需在其 frontmatter 中填入 era 值，
// 脚本会自动通过此映射表将其归入正确的侧边栏分组。

/** 人物类（帝王/武将/谋臣）的 era 映射表 */
const ERA_TO_GROUP = {
  // ── 上古（三皇五帝、夏、商、西周） ──
  '上古': '上古',
  '三皇': '上古',
  '五帝': '上古',
  '夏': '上古',
  '商': '上古',
  '商末': '上古',
  '商末周初': '上古',
  '西周': '上古',
  // ── 东周（独立一级分组） ──
  '东周': '东周',
  '春秋': '东周',
  '战国': '东周',
  '先秦': '东周',
  // ── 秦汉 ──
  '秦': '秦汉',
  '秦末': '秦汉',
  '秦末汉初': '秦汉',
  '西汉': '秦汉',
  '东汉': '秦汉',
  '秦汉': '秦汉',
  '楚汉之争': '秦汉',
  '新': '秦汉',
  '新莽': '秦汉',
  '新莽末年': '秦汉',
  // ── 三国 ──
  '东汉末': '三国',
  '东汉末-蜀汉': '三国',
  '东汉末年': '三国',
  '三国': '三国',
  '三国初年': '三国',
  '曹魏': '三国',
  '蜀汉': '三国',
  '孙吴': '三国',
  // ── 晋朝 ──
  '西晋': '晋朝',
  '东晋': '晋朝',
  '十六国': '晋朝',
  '十六国-前秦': '晋朝',
  '十六国-后赵': '晋朝',
  '十六国-前赵': '晋朝',
  '十六国-后燕': '晋朝',
  '十六国-前燕': '晋朝',
  '十六国-后秦': '晋朝',
  '十六国-胡夏': '晋朝',
  '十六国-冉魏': '晋朝',
  '前秦': '晋朝',
  '后赵': '晋朝',
  // ── 南北朝 ──
  '北朝': '南北朝',
  '北朝-北魏': '南北朝',
  '北朝-东魏': '南北朝',
  '北朝-西魏': '南北朝',
  '北朝-北周': '南北朝',
  '北朝-北齐': '南北朝',
  '北魏': '南北朝',
  '南朝': '南北朝',
  '南朝-梁': '南北朝',
  '南朝-宋': '南北朝',
  '南朝-陈': '南北朝',
  '南朝宋': '南北朝',
  '南朝齐': '南北朝',
  '南朝梁': '南北朝',
  '南朝陈': '南北朝',
  '梁': '南北朝',
  // ── 隋唐 ──
  '隋': '隋唐',
  '唐': '隋唐',
  '唐初': '隋唐',
  '唐中期': '隋唐',
  '唐-武周': '隋唐',
  '隋唐': '隋唐',
  '安史之乱': '隋唐',
  // ── 五代十国宋辽金夏 ──
  '五代': '五代十国宋辽金夏',
  '五代十国': '五代十国宋辽金夏',
  '五代-后周': '五代十国宋辽金夏',
  '五代-后梁': '五代十国宋辽金夏',
  '五代-后唐': '五代十国宋辽金夏',
  '五代-后晋': '五代十国宋辽金夏',
  '五代-后汉': '五代十国宋辽金夏',
  '后周': '五代十国宋辽金夏',
  '十国': '五代十国宋辽金夏',
  '宋': '五代十国宋辽金夏',
  '北宋': '五代十国宋辽金夏',
  '南宋': '五代十国宋辽金夏',
  '辽': '五代十国宋辽金夏',
  '辽朝': '五代十国宋辽金夏',
  '西夏': '五代十国宋辽金夏',
  '金': '五代十国宋辽金夏',
  '金朝': '五代十国宋辽金夏',
  // ── 元朝 ──
  '元': '元朝',
  '元末': '元朝',
  // ── 明朝 ──
  '明初': '明朝',
  '明': '明朝',
  '明末': '明朝',
  '明末清初': '明朝',
  // ── 清朝 ──
  '清末': '清朝',
  '清': '清朝',
  '清（后金）': '清朝',
  '清（后金/清）': '清朝',
  '后金': '清朝',
  // ── 近现代（科学家等新时代人物） ──
  '民国': '现代',
  '现代': '现代'
}

/** 朝代类的 period 映射表（朝代使用 period 而非 era）—— 多民族政权并立视角 */
const PERIOD_TO_GROUP = {
  '上古·文明起源': '上古·文明起源',
  '东周·诸侯割据': '东周·诸侯割据',
  '秦汉·大一统': '秦汉·大一统',
  '三国·两晋·十六国': '三国·两晋·十六国',
  '南北朝·民族融合': '南北朝·民族融合',
  '隋唐盛世': '隋唐盛世',
  '多民族政权并立': '多民族政权并立',
  '大一统皇朝': '大一统皇朝'
}

/**
 * 人物 era 子分组映射表
 * 将细粒度的 rawEra 值映射为二级分组名，用于在侧边栏中做二级分类。
 * key: rawEra 值（frontmatter 中的 era 字段原始值）
 * value: 对应的二级分组名
 *
 * 如果某个 era 分组下所有人物的 rawEra 都映射到同一个子分组，
 * 则不会产生二级菜单（因为没有细分意义）。
 */
const ERA_SUBGROUP_MAP = {
  // ── 上古 ──
  '上古': '上古',
  '三皇': '三皇五帝',
  '五帝': '三皇五帝',
  '夏': '夏',
  '商': '商', '商末': '商', '商末周初': '西周',
  '西周': '西周',
  // ── 东周 ──
  '东周': '春秋',
  '春秋': '春秋',
  '战国': '战国',
  // ── 秦汉 ──
  '秦': '秦朝', '秦末': '秦朝', '秦末汉初': '秦朝',
  '楚汉之争': '楚汉',
  '西汉': '西汉',
  '新': '新朝', '新莽': '新朝', '新莽末年': '新朝',
  '东汉': '东汉',
  // ── 三国 ──
  '曹魏': '魏',
  '蜀汉': '蜀',
  '孙吴': '吴',
  '东汉末': '群雄', '东汉末-蜀汉': '蜀', '东汉末年': '群雄',
  '三国初年': '三国',
  // ── 晋朝 ──
  '西晋': '西晋',
  '东晋': '东晋',
  '十六国': '十六国', '十六国-前秦': '十六国', '十六国-后赵': '十六国',
  '十六国-前赵': '十六国', '十六国-后燕': '十六国',
  '十六国-前燕': '十六国', '十六国-后秦': '十六国', '十六国-胡夏': '十六国',
  '前秦': '十六国', '后赵': '十六国',
  '十六国-冉魏': '十六国',
  // ── 南北朝 ──
  '南朝': '南朝', '南朝-梁': '南朝', '南朝-宋': '南朝', '南朝-陈': '南朝',
  '南朝宋': '南朝', '南朝齐': '南朝', '南朝梁': '南朝', '南朝陈': '南朝',
  '梁': '南朝',
  '北朝': '北朝', '北朝-北魏': '北朝', '北朝-东魏': '北朝', '北朝-西魏': '北朝', '北朝-北周': '北朝', '北朝-北齐': '北朝',
  '北魏': '北朝',
  // ── 隋唐 ──
  '隋': '隋朝',
  '唐': '唐朝', '唐初': '唐朝', '唐中期': '唐朝', '唐-武周': '唐朝', '安史之乱': '唐朝',
  // ── 五代十国宋辽金夏 ──
  '五代': '五代', '五代十国': '五代', '五代-后周': '五代', '五代-后梁': '五代',
  '五代-后唐': '五代', '五代-后晋': '五代', '五代-后汉': '五代', '后周': '五代',
  '十国': '十国',
  '北宋': '北宋',
  '辽': '辽', '辽朝': '辽',
  '金': '金', '金朝': '金',
  '西夏': '西夏',
  '南宋': '南宋',
  // ── 元朝 ──
  '元': '元朝', '元末': '元朝',
  // ── 明朝 ──
  '明': '明朝', '明初': '明朝', '明末': '明朝', '明末清初': '明朝',
  // ── 清朝 ──
  '清': '清朝', '后金': '清朝', '清（后金）': '清朝', '清（后金/清）': '清朝',
  '清末': '清朝',
  // ── 近现代 ──
  '民国': '民国',
  '现代': '现代'
}

/**
 * 各时期的二级分组排序（数字越小越靠前）
 * 确保子分组按历史顺序排列，而非拼音排序
 */
const SUBGROUP_ORDER = {
  // ── 上古：三皇五帝 → 夏 → 商 → 西周 ──
  '三皇五帝': 0, '上古': 1, '夏': 2, '商': 3, '西周': 4,
  // ── 东周：春秋 → 战国 ──
  '春秋': 1, '战国': 2,
  // ── 秦汉：秦朝 → 楚汉 → 西汉 → 新朝 → 东汉 ──
  '秦朝': 1, '楚汉': 2, '西汉': 3, '新朝': 4, '东汉': 5,
  // ── 三国：魏 → 蜀 → 吴 → 群雄 → 三国 ──
  '魏': 1, '蜀': 2, '吴': 3, '群雄': 4, '三国': 5,
  // ── 晋朝：西晋 → 东晋 → 十六国 ──
  '西晋': 1, '东晋': 2, '十六国': 3,
  // ── 南北朝：南朝 → 北朝 ──
  '南朝': 1, '北朝': 2,
  // ── 隋唐：隋朝 → 唐朝 ──
  '隋朝': 1, '唐朝': 2,
  // ── 五代十国宋辽金夏：五代 → 十国 → 北宋 → 辽 → 金 → 西夏 → 南宋 ──
  '五代': 1, '十国': 2, '北宋': 3, '辽': 4, '金': 5, '西夏': 6, '南宋': 7,
  // ── 现代：民国 → 现代 ──
  '民国': 1, '现代': 2
}

/**
 * 朝代父子层级映射表
 * key: 父朝代 slug（总览页），value: 子朝代 slug 列表
 * 在侧边栏中，父朝代会显示为可展开的折叠组，子朝代作为其下级菜单项。
 * 不在此映射中的朝代作为独立条目直接显示。
 */
const DYNASTY_HIERARCHY = {
  'han': ['western-han', 'xin', 'eastern-han'],       // 汉朝 → 西汉、新朝、东汉
  'sanguo': ['cao-wei', 'shu-han', 'sun-wu'],          // 三国 → 曹魏、蜀汉、孙吴
  'jin': ['western-jin', 'eastern-jin','sixteen-kingdoms'],                // 晋朝 → 西晋、东晋
  'nanbei-chao': ['nanchao', 'beichao'],                // 南北朝 → 南朝、北朝
  'song': ['northern-song', 'southern-song']            // 宋朝 → 北宋、南宋
}

// ── Frontmatter 解析 ────────────────────────────────────────

/**
 * 解析 markdown 文件头部的 YAML frontmatter
 *
 * @param {string} content - markdown 文件的完整文本内容
 * @returns {Object} 解析后的键值对对象，如 { title: '韩信', era: '秦汉', type: 'general' }
 *
 * @example
 * // 输入：
 * // ---
 * // title: 韩信
 * // era: 秦汉
 * // type: general
 * // ---
 * //
 * // 返回：{ title: '韩信', era: '秦汉', type: 'general' }
 */
function parseFrontmatter(content) {
  // 匹配以 --- 开始和结束的 YAML frontmatter 块（支持 Windows \r\n 和 Unix \n 换行）
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  const result = {}
  // 逐行解析 key: value 格式
  match[1].split(/\r?\n/).forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim()
      let value = line.substring(colonIdx + 1).trim()
      // 去除值两端的引号（支持单引号和双引号）
      if ((value.startsWith("'") && value.endsWith("'")) ||
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }
      result[key] = value
    }
  })
  return result
}

// ── 从 markdown 正文提取标题 ────────────────────────────────

/**
 * 获取侧边栏中显示的标题文本。
 * 优先级：frontmatter 中的 title > markdown 中的 H1 标题 > 文件名（slug）
 *
 * @param {string} content - markdown 文件的完整文本内容
 * @param {string|undefined} fmTitle - frontmatter 中的 title 值
 * @param {string} slug - 文件名（不含 .md 后缀）
 * @returns {string} 用于侧边栏显示的标题文本
 */
function extractTitle(content, fmTitle, slug) {
  if (fmTitle) return fmTitle
  // 尝试从正文中提取第一个 H1 标题
  const h1 = content.match(/^#\s+(.+)/m)
  if (h1) return h1[1].trim()
  return slug
}

// ── 获取映射后的侧边栏分组名 ────────────────────────────────

/**
 * 根据 era 值在映射表中查找对应的侧边栏分组名。
 * 如果 era 为空则归入"其他"分组；如果映射表中没有对应项，则直接使用原值。
 *
 * @param {string} era - 文件 frontmatter 中的 era 值
 * @param {Object} mapping - era → 分组名 的映射表（如 ERA_TO_GROUP）
 * @returns {string} 侧边栏分组名
 */
function resolveGroup(era, mapping) {
  if (!era) return '其他'
  return mapping[era] || era
}

// ── 目录扫描 ────────────────────────────────────────────────

/**
 * 递归扫描指定目录，读取所有 markdown 文件并解析其 frontmatter。
 * 忽略以点开头的隐藏文件和 index.md 索引页。
 *
 * @param {string} dir - 要扫描的目录绝对路径
 * @param {string} [basePath=''] - 相对于 docs 根目录的路径前缀，用于生成链接
 * @param {Object} [mapping={}] - era → 分组名 的映射表
 * @returns {Array<Object>} 文件元数据数组，每个元素包含：
 *   - {string} slug: 文件名（不含 .md）
 *   - {string} text: 侧边栏显示的标题
 *   - {string} link: VitePress 路由链接（如 /figures/generals/han-xin）
 *   - {string} group: 映射后的侧边栏分组名
 *   - {string} rawEra: 原始的 era/period 值
 *   - {string} type: 文件类型（general/emperor/strategist）
 *   - {number} order: 同组内排序序号
 *   - {string} dynasty: 朝代信息
 */
function scanDir(dir, basePath = '', mapping = {}) {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    // 跳过隐藏文件和 index 索引页
    if (entry.name.startsWith('.') || entry.name === 'index.md') continue

    const fullPath = path.join(dir, entry.name)
    const relPath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      // 递归扫描子目录
      files.push(...scanDir(fullPath, relPath, mapping))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 读取文件内容并解析 frontmatter
      const content = fs.readFileSync(fullPath, 'utf-8')
      const fm = parseFrontmatter(content)
      const slug = entry.name.replace(/\.md$/, '')
      // 生成 VitePress 路由链接，使用正斜杠分隔，去掉 .md 后缀
      const link = '/' + relPath.replace(/\\/g, '/').replace(/\.md$/, '')

      // 兼容 era 和 period 字段（人物用 era，朝代用 period）
      const rawEra = fm.era || fm.period || ''
      const group = resolveGroup(rawEra, mapping)

      files.push({
        slug,
        text: extractTitle(content, fm.title, slug),
        link,
        group,
        rawEra,
        type: fm.type || '',
        order: parseInt(fm.order || '0', 10),
        start: fm.start !== undefined ? parseInt(fm.start, 10) : undefined,
        dynasty: fm.dynasty || ''
      })
    }
  }
  return files
}

// ── 分组并排序 ──────────────────────────────────────────────

/**
 * 将文件元数据数组按 group 字段分组，并按指定的顺序排列分组。
 * 每个分组内的元素先按 order 字段数值排序，再按文字的中文拼音排序。
 *
 * @param {Array<Object>} items - scanDir 返回的文件元数据数组
 * @param {Array<string>|null} orderList - 分组的预期显示顺序。
 *   如果为 null，则按分组名字母排序。未在 orderList 中的分组会被追加到末尾。
 * @returns {Object} 以分组名为键、排序后文件数组为值的对象
 */
function groupBy(items, orderList) {
  // 第一步：按 group 值分组
  const groups = {}
  for (const item of items) {
    const k = item.group || '其他'
    if (!groups[k]) groups[k] = []
    groups[k].push(item)
  }

  // 第二步：按 orderList 指定的顺序排列分组
  const sortedGroups = {}
  const keys = orderList
    ? [...orderList, ...Object.keys(groups).filter(k => !orderList.includes(k))]
    : Object.keys(groups).sort()

  // 第三步：对每个分组内的文件进行排序
  for (const k of keys) {
    if (groups[k]) {
      sortedGroups[k] = groups[k].sort((a, b) => {
        // 先按 order 数字排序，order 相同时按标题文本的中文拼音排序
        if (a.order !== b.order) return a.order - b.order
        return a.text.localeCompare(b.text, 'zh-CN')
      })
    }
  }
  return sortedGroups
}

// ── 主入口：生成完整侧边栏 ──────────────────────────────────

/**
 * 生成 VitePress 侧边栏配置对象。
 * 扫描 docs/ 下的 dynasties、figures、battles 目录，
 * 自动根据 frontmatter 元数据构建侧边栏结构。
 *
 * @returns {Object} VitePress 侧边栏配置对象，结构为：
 *   { '/dynasties/': [...], '/figures/': [...], '/battles/': [...], ... }
 *
 * 使用方式：在 config.mts 中：
 * ```js
 * import { generateSidebar } from './sidebar-gen.mjs'
 * export default defineConfig({
 *   themeConfig: {
 *     sidebar: generateSidebar(),
 *   }
 * })
 * ```
 */
export function generateSidebar() {
  const sidebar = {}

  // ════════════════════════════════════════════════════════════
  // 朝代板块 (/dynasties/)
  // 按 period 字段分组：上古 → 春秋战国 → 帝国初立 → 分裂融合 → 隋唐盛世 → 宋元明清
  // 支持父子层级：如「三国」可展开为「曹魏 / 蜀汉 / 孙吴」
  // ════════════════════════════════════════════════════════════
  const dynastyDir = path.join(docsDir, 'dynasties')
  if (fs.existsSync(dynastyDir)) {
    const dynastyFiles = scanDir(dynastyDir, 'dynasties', PERIOD_TO_GROUP)
    const grouped = groupBy(dynastyFiles, DYNASTIES_PERIOD_ORDER)

    // 构建子朝代 → 父朝代 的反向映射，用于判断一个文件是否为子朝代
    const childToParent = {}
    for (const [parent, children] of Object.entries(DYNASTY_HIERARCHY)) {
      for (const child of children) {
        childToParent[child] = parent
      }
    }

    sidebar['/dynasties/'] = [
      // "朝代总览" 固定放在最前
      { text: '🏯 朝代', items: [{ text: '朝代总览', link: '/dynasties/' }] },
      // 自动生成各时期分组，支持父子层级展开
      ...Object.entries(grouped).map(([group, items]) => {
        const result = []
        const processed = new Set()

        for (const item of items) {
          // 已处理的子朝代跳过
          if (processed.has(item.slug)) continue
          // 子朝代会跟随父朝代显示，此处跳过
          if (childToParent[item.slug]) continue

          // 判断是否为父朝代（总览页）
          if (DYNASTY_HIERARCHY[item.slug]) {
            // 构建可展开的二级菜单：父朝代页面 + 各子朝代
            const childSlugs = DYNASTY_HIERARCHY[item.slug]
            const childItems = childSlugs
              .map(s => items.find(i => i.slug === s))
              .filter(Boolean)
              .map(c => ({ text: c.text, link: c.link }))

            childSlugs.forEach(s => processed.add(s))
            processed.add(item.slug)

            result.push({
              text: item.text,
              collapsed: false,
              items: [
                { text: `${item.text}总览`, link: item.link },
                ...childItems
              ]
            })
          } else {
            // 独立朝代，直接作为链接
            result.push({ text: item.text, link: item.link })
          }
        }

        return {
          text: `🏛️ ${group}`,
          collapsed: false,
          items: result
        }
      })
    ]
  }

  // ════════════════════════════════════════════════════════════
  // 人物板块 (/figures/) —— 按类型拆分为独立侧边栏
  // 每个子分类（帝王/武将/谋臣）按 era 字段分组，
  // 各时期进一步按子分组（如 曹魏/蜀汉/孙吴）做二级菜单。
  //
  // 拆分策略（降低单页 HTML 体积，避免每页携带全量侧边栏）：
  //   /figures/             → 全量侧边栏（人物总览页用，三类都在）
  //   /figures/emperors/    → 仅帝王侧边栏
  //   /figures/generals/    → 仅武将侧边栏
  //   /figures/strategists/ → 仅谋臣侧边栏
  // VitePress 按最长路径前缀匹配，各类型页面只会命中自己的侧边栏。
  // ════════════════════════════════════════════════════════════
  const figuresDir = path.join(docsDir, 'figures')
  if (fs.existsSync(figuresDir)) {
    // 定义人物的子分类及其对应的目录路径和标签
    const figureTypes = [
      { dir: 'emperors', label: '👑 帝王' },
      { dir: 'generals', label: '⚔️ 武将' },
      { dir: 'strategists', label: '📜 谋臣' },
      { dir: 'scientists', label: '🔬 科学家' },
      { dir: 'writers', label: '✍️ 文学家' }
    ]

    /**
     * 构建单个类型（帝王/武将/谋臣）的侧边栏主体
     * @returns {Object|null} 侧边栏节点，结构 { text: 类型标签, items: [总览, 各时期分组...] }
     */
    const buildTypeSection = ({ dir, label }) => {
      const subDir = path.join(figuresDir, dir)
      if (!fs.existsSync(subDir)) return null

      // 扫描子目录中的所有人物文件
      const files = scanDir(subDir, `figures/${dir}`, ERA_TO_GROUP)
      const grouped = groupBy(files, FIGURES_ERA_ORDER)

      // 构建子分类的侧边栏节点
      const groupSection = {
        text: label,
        items: [{ text: `${label}总览`, link: `/figures/${dir}/` }]
      }

      // 为每个历史时期创建可折叠的子分组
      for (const [era, items] of Object.entries(grouped)) {
        // 尝试将每个人物按 rawEra 映射到二级子分组
        const subGroups = {}  // { 子分组名: [items] }
        const noSubGroup = [] // 无法映射到子分组的人物

        for (const item of items) {
          const sub = ERA_SUBGROUP_MAP[item.rawEra]
          if (sub) {
            if (!subGroups[sub]) subGroups[sub] = []
            subGroups[sub].push(item)
          } else {
            noSubGroup.push(item)
          }
        }

        const subGroupNames = Object.keys(subGroups)

        if (subGroupNames.length > 1) {
          // 有多个子分组 → 构建二级菜单
          // 按 SUBGROUP_ORDER 排序子分组
          subGroupNames.sort((a, b) => {
            const oa = SUBGROUP_ORDER[a] ?? 99
            const ob = SUBGROUP_ORDER[b] ?? 99
            return oa - ob
          })

          const subItems = subGroupNames.map(sg => ({
            text: sg,
            collapsed: true,
            // 每个子分组内的人物再按 order（主）+ 中文拼音（次）排序，
            // 避免因跨朝代的 order 值冲突而退化为错误的拼音先后
            items: subGroups[sg]
              .sort((a, b) => {
                if (a.order !== b.order) return a.order - b.order
                return a.text.localeCompare(b.text, 'zh-CN')
              })
              .map(item => ({ text: item.text, link: item.link }))
          }))
          // 无法分类的人物直接列出
          for (const item of noSubGroup) {
            subItems.push({ text: item.text, link: item.link })
          }

          groupSection.items.push({
            text: era,
            collapsed: true,
            items: subItems
          })
        } else {
          // 只有一个或零个子分组 → 保持扁平列表
          groupSection.items.push({
            text: era,
            collapsed: true,
            items: items.map(item => ({ text: item.text, link: item.link }))
          })
        }
      }
      return groupSection
    }

    // ── 1) 人物总览页 (/figures/)：全量侧边栏（三类都在） ──
    const fullSidebar = [
      { text: '👤 人物总览', items: [{ text: '人物总览', link: '/figures/' }] }
    ]
    for (const t of figureTypes) {
      const sec = buildTypeSection(t)
      if (sec) fullSidebar.push(sec)
    }
    sidebar['/figures/'] = fullSidebar

    // ── 2) 各类型路径段：只带本类型侧边栏 + 顶部跨类型入口 ──
    for (const t of figureTypes) {
      const sec = buildTypeSection(t)
      if (!sec) continue
      sidebar[`/figures/${t.dir}/`] = [
        {
          text: '👤 人物',
          items: [
            { text: '人物总览', link: '/figures/' },
            { text: `${t.label}总览`, link: `/figures/${t.dir}/` }
          ]
        },
        // 去掉主体内重复的"类型总览"项，只保留各时期分组
        ...sec.items.slice(1)
      ]
    }
  }

  // ════════════════════════════════════════════════════════════
  // 战役板块 (/battles/)
  // 与人物板块同构：一级按时代分组（复用 FIGURES_ERA_ORDER + ERA_TO_GROUP），
  // 二级按具体朝代/时期子分组（复用 ERA_SUBGROUP_MAP + SUBGROUP_ORDER）。
  // 战役文件 era 值已规范化对齐人物体系（如 战国/楚汉之争/东汉末年/东晋/唐初）。
  // ════════════════════════════════════════════════════════════
  const battleDir = path.join(docsDir, 'battles')
  if (fs.existsSync(battleDir)) {
    const battleFiles = scanDir(battleDir, 'battles', ERA_TO_GROUP)
    const grouped = groupBy(battleFiles, FIGURES_ERA_ORDER)

    const battleSections = []
    for (const [era, items] of Object.entries(grouped)) {
      // 二级子分组：按 rawEra 映射到具体朝代/时期
      const subGroups = {}
      const noSubGroup = []
      for (const item of items) {
        const sub = ERA_SUBGROUP_MAP[item.rawEra]
        if (sub) {
          if (!subGroups[sub]) subGroups[sub] = []
          subGroups[sub].push(item)
        } else {
          noSubGroup.push(item)
        }
      }

      const subGroupNames = Object.keys(subGroups)

      // 战役组内排序：先按 start 年份（无 start 的排最后），再 order，再拼音
      const sortByTime = (a, b) => {
        const sa = a.start ?? Number.MAX_SAFE_INTEGER
        const sb = b.start ?? Number.MAX_SAFE_INTEGER
        if (sa !== sb) return sa - sb
        if (a.order !== b.order) return a.order - b.order
        return a.text.localeCompare(b.text, 'zh-CN')
      }

      if (subGroupNames.length > 1) {
        // 有多个子分组 → 构建二级菜单
        subGroupNames.sort((a, b) => {
          const oa = SUBGROUP_ORDER[a] ?? 99
          const ob = SUBGROUP_ORDER[b] ?? 99
          return oa - ob
        })

        const subItems = subGroupNames.map(sg => ({
          text: sg,
          collapsed: true,
          items: subGroups[sg]
            .sort(sortByTime)
            .map(item => ({ text: item.text, link: item.link }))
        }))
        // 无法归入子分组的战役直接列出
        for (const item of noSubGroup) {
          subItems.push({ text: item.text, link: item.link })
        }

        battleSections.push({
          text: `⚔️ ${era}`,
          collapsed: true,
          items: subItems
        })
      } else {
        // 只有一个或零个子分组 → 保持扁平列表
        battleSections.push({
          text: `⚔️ ${era}`,
          collapsed: true,
          items: items.slice().sort(sortByTime).map(item => ({ text: item.text, link: item.link }))
        })
      }
    }

    sidebar['/battles/'] = [
      // "战役总览" 固定放在最前
      { text: '⚔️ 战役总览', items: [{ text: '战役总览', link: '/battles/' }] },
      ...battleSections
    ]
  }

  // ════════════════════════════════════════════════════════════
  // 文化板块 (/culture/) — 按类型→子类自动扫描
  // 扫描 docs/culture/ 下每个子目录：
  //   - 子目录 index.md 的 title 作为分组名
  //   - 子目录下其余 .md 文件作为下级菜单项
  //   - 子目录按 CULTURE_DIR_ORDER 排序，未列出的目录追加到末尾
  //   - 子项支持 frontmatter 的 order 字段控制顺序（默认按中文拼音）
  // 新增内容只需在对应目录添加 .md 文件，无需改此配置。
  // ════════════════════════════════════════════════════════════
  const cultureDir = path.join(docsDir, 'culture')
  const cultureSections = []
  if (fs.existsSync(cultureDir)) {
    const CULTURE_DIR_ORDER = ['literature', 'philosophy', 'inventions', 'art']
    const dirs = fs.readdirSync(cultureDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .sort((a, b) => {
        const ia = CULTURE_DIR_ORDER.indexOf(a.name)
        const ib = CULTURE_DIR_ORDER.indexOf(b.name)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      })

    for (const dir of dirs) {
      const subDir = path.join(cultureDir, dir.name)
      const indexPath = path.join(subDir, 'index.md')
      if (!fs.existsSync(indexPath)) continue

      // 分组名取自 index.md 的 title
      const indexContent = fs.readFileSync(indexPath, 'utf-8')
      const indexFm = parseFrontmatter(indexContent)
      const sectionText = indexFm.title || extractTitle(indexContent, indexFm.title, dir.name)

      // 扫描子目录下的 md 文件（排除 index.md 和隐藏文件）
      const items = []
      for (const entry of fs.readdirSync(subDir, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') continue
        if (entry.name.startsWith('.')) continue
        const fullPath = path.join(subDir, entry.name)
        const content = fs.readFileSync(fullPath, 'utf-8')
        const fm = parseFrontmatter(content)
        const slug = entry.name.replace(/\.md$/, '')
        items.push({
          text: extractTitle(content, fm.title, slug),
          link: `/culture/${dir.name}/${slug}`,
          order: parseInt(fm.order || '0', 10)
        })
      }

      // 子项排序：order 优先，其次中文拼音
      items.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order
        return a.text.localeCompare(b.text, 'zh-CN')
      })

      if (items.length > 0) {
        cultureSections.push({
          text: sectionText,
          collapsed: false,
          items: [
            { text: `${sectionText}总览`, link: `/culture/${dir.name}/` },
            ...items.map(i => ({ text: i.text, link: i.link }))
          ]
        })
      }
    }
  }

  sidebar['/culture/'] = [
    {
      text: '📚 文化科技',
      items: [
        { text: '文化总览', link: '/culture/' },
        ...cultureSections
      ]
    }
  ]

  // ════════════════════════════════════════════════════════════
  // 时间线 (/timeline) — 单页，手动定义
  // ════════════════════════════════════════════════════════════
  sidebar['/timeline'] = [
    { text: '🕐 时间线', items: [{ text: '历史时间线', link: '/timeline' }] }
  ]

  return sidebar
}

// ── 直接运行支持 ─────────────────────────────────────────────
// 当使用 `node docs/.vitepress/sidebar-gen.mjs` 直接运行本脚本时，
// 会在控制台打印生成的侧边栏 JSON 结构，便于调试和检查。
// 在 config.mts 中通过 import 引用时，此段代码不会执行。

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isMainModule) {
  console.log(JSON.stringify(generateSidebar(), null, 2))
}
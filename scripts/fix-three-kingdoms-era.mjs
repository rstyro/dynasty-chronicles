/**
 * @file fix-three-kingdoms-era.mjs
 * @description 修正三国时期人物的 era 字段，确保势力归属正确
 *
 * 问题：之前批量添加 frontmatter 时，部分三国人物 era 值写为"东汉末"，
 * 但实际应归属为"曹魏 / 蜀汉 / 孙吴"，导致侧边栏势力分类错误。
 *
 * 本脚本根据历史归属修正这些 era 值。
 *
 * 使用方式：node scripts/fix-three-kingdoms-era.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ── 路径设置 ────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const figuresDir = path.join(projectRoot, 'docs', 'figures')

// ── era 修正映射表 ──────────────────────────────────────────
// key: 文件所在目录 + slug，value: 修正后的 era 值

const FIX_MAP = {
  // ════════════════════════════════════════════════════════════
  // 武将（generals）
  // ════════════════════════════════════════════════════════════

  // ── 蜀汉势力 ──
  'generals/zhang-fei': '蜀汉',     // 张飞
  'generals/zhao-yun': '蜀汉',      // 赵云
  'generals/guan-yu': '蜀汉',       // 关羽
  'generals/ma-chao': '蜀汉',       // 马超
  'generals/jiang-wei': '蜀汉',     // 姜维
  'generals/huang-zhong': '蜀汉',   // 黄忠
  'generals/wei-yan': '蜀汉',       // 魏延
  'generals/li-yan': '蜀汉',        // 李严
  'generals/guan-ping': '蜀汉',     // 关平

  // ── 孙吴势力 ──
  'generals/zhou-yu': '孙吴',       // 周瑜（虽然是大都督，但 era 归孙吴）
  'generals/lu-xun': '孙吴',        // 陆逊
  'generals/lu-meng': '孙吴',        // 吕蒙
  'generals/sun-ce': '孙吴',         // 孙策
  'generals/cheng-pu': '孙吴',       // 程普
  'generals/gan-ning': '孙吴',       // 甘宁
  'generals/tai-shi-ci': '孙吴',     // 太史慈
  'generals/ling-tong': '孙吴',       // 凌统
  'generals/zhou-tai': '孙吴',       // 周泰

  // ── 曹魏势力 ──（东汉末 → 曹魏）
  'generals/xia-hou-dun': '曹魏',    // 夏侯惇
  'generals/xia-hou-yuan': '曹魏',   // 夏侯渊
  'generals/cao-ren': '曹魏',        // 曹仁
  'generals/cao-hong': '曹魏',       // 曹洪
  'generals/cao-zhang': '曹魏',      // 曹彰
  'generals/zhang-liao': '曹魏',     // 张辽
  'generals/zhang-he': '曹魏',       // 张郃
  'generals/xu-huang': '曹魏',       // 徐晃
  'generals/xu-chu': '曹魏',         // 许褚
  'generals/dian-wei': '曹魏',       // 典韦
  'generals/pang-de': '曹魏',        // 庞德
  'generals/yu-jin': '曹魏',         // 于禁
  'generals/yue-jin': '曹魏',        // 乐进
  'generals/zang-ba': '曹魏',        // 臧霸
  'generals/wen-pin': '曹魏',        // 文聘
  'generals/wen-yang': '曹魏',       // 文鸯

  // ── 东汉末年势力（群雄割据，无固定归属）──
  'generals/lv-bu': '东汉末',        // 吕布
  'generals/yan-liang': '东汉末',    // 颜良
  'generals/wen-chou': '东汉末',     // 文丑
  'generals/gao-lan': '东汉末',      // 高览
  'generals/guan-hai': '东汉末',     // 管亥
  'generals/wu-tu-gu': '东汉末',     // 兀突骨

  // ════════════════════════════════════════════════════════════
  // 帝王（emperors）
  // ════════════════════════════════════════════════════════════
  'emperors/han-xiandi': '曹魏',     // 汉献帝（被曹操控制，归曹魏组）

  // ════════════════════════════════════════════════════════════
  // 谋臣（strategists）
  // ════════════════════════════════════════════════════════════

  // ── 蜀汉势力 ──
  'strategists/zhuge-liang': '蜀汉', // 诸葛亮
  'strategists/pang-tong': '蜀汉',    // 庞统
  'strategists/fa-zheng': '蜀汉',     // 法正
  'strategists/jiang-wan': '蜀汉',    // 蒋琬
  'strategists/fei-yi': '蜀汉',       // 费祎
  'strategists/dong-yun': '蜀汉',     // 董允
  'strategists/ma-su': '蜀汉',        // 马谡
  'strategists/yang-yi': '蜀汉',      // 杨仪
  'strategists/huang-quan': '蜀汉',   // 黄权
  'strategists/liu-ba': '蜀汉',       // 刘巴
  'strategists/ma-liang': '蜀汉',      // 马良
  'strategists/li-hui': '蜀汉',       // 李恢
  'strategists/mi-zhu': '蜀汉',       // 糜竺
  'strategists/sun-qian': '蜀汉',     // 孙乾
  'strategists/jian-yong': '蜀汉',    // 简雍
  'strategists/yi-ji': '蜀汉',        // 伊籍
  'strategists/qin-mi': '蜀汉',       // 秦宓
  'strategists/dong-he': '蜀汉',      // 董和
  'strategists/chen-zhen': '蜀汉',    // 陈震

  // ── 孙吴势力 ──
  'strategists/zhou-yu': '孙吴',      // 周瑜
  'strategists/lu-su': '孙吴',        // 鲁肃
  'strategists/lu-xun': '孙吴',       // 陆逊
  'strategists/zhang-zhao': '孙吴',   // 张昭
  'strategists/zhang-hong': '孙吴',   // 张纮
  'strategists/zhu-ge-jin': '孙吴',   // 诸葛瑾
  'strategists/gu-yong': '孙吴',      // 顾雍
  'strategists/bu-zhi': '孙吴',       // 步骘
  'strategists/kan-ze': '孙吴',       // 阚泽
  'strategists/sun-shao': '孙吴',     // 孙邵
  'strategists/yan-jun': '孙吴',      // 严畯
  'strategists/yu-fan': '孙吴',       // 虞翻

  // ── 曹魏势力 ──（之前脚本已设，此处兜底）
  'strategists/xun-yu': '曹魏',
  'strategists/xun-you': '曹魏',
  'strategists/jia-xu': '曹魏',
  'strategists/guo-jia': '曹魏',
  'strategists/cheng-yu': '曹魏',
  'strategists/xi-zhi-cai': '曹魏',
  'strategists/liu-ye': '曹魏',
  'strategists/jiang-ji': '曹魏',
  'strategists/sima-yi': '曹魏',
  'strategists/chen-qun': '曹魏',
  'strategists/hua-xin': '曹魏',
  'strategists/zhong-yao': '曹魏',
  'strategists/man-chong': '曹魏',
  'strategists/dong-zhao': '曹魏',
  'strategists/wang-lang': '曹魏',
  'strategists/cui-yan': '曹魏',
  'strategists/mao-jie': '曹魏',
  'strategists/jia-kui': '曹魏',
  'strategists/du-ji': '曹魏',
  'strategists/tian-chou': '曹魏',
  'strategists/wang-xiu': '曹魏',
  'strategists/yang-xiu': '曹魏',
  'strategists/xin-pi': '曹魏',
  'strategists/yang-fu': '曹魏',
  'strategists/tian-yu': '曹魏',
  'strategists/wang-can': '曹魏',
  'strategists/kuai-yue': '曹魏',
  'strategists/zhang-ji': '曹魏',
  'strategists/du-xi': '曹魏',
  'strategists/zao-zhi': '曹魏',
  'strategists/ren-jun': '曹魏',
  'strategists/chen-jiao': '曹魏',
  'strategists/chi-lv': '曹魏',
  'strategists/huan-jie': '曹魏',
  'strategists/ding-yi': '曹魏',
  'strategists/ding-yi-2': '曹魏',
  'strategists/sima-lang': '曹魏',
  'strategists/han-ji': '曹魏',
  'strategists/wei-kang': '曹魏',
  'strategists/bing-yuan': '曹魏',
  'strategists/zhao-yan': '曹魏',
  'strategists/lou-gui': '曹魏',
  'strategists/xu-you': '曹魏',
  'strategists/guo-huai': '曹魏',

  // ── 群雄（东汉末）──
  'strategists/zu-ti': '东晋'         // 祖逖是东晋的，不应在三国
}

// ── 主流程 ──────────────────────────────────────────────────

let updated = 0, skipped = 0, notFound = []

for (const [relPath, newEra] of Object.entries(FIX_MAP)) {
  const [subDir, slug] = relPath.split('/')
  const filePath = path.join(figuresDir, subDir, slug + '.md')

  if (!fs.existsSync(filePath)) {
    notFound.push(relPath)
    console.log(`  ⚠️  ${relPath} — 文件不存在，跳过`)
    skipped++
    continue
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // 检查现有 era 值
  const oldEraMatch = content.match(/^era:\s*(.+)$/m)
  const oldEra = oldEraMatch ? oldEraMatch[1] : ''

  if (oldEra === newEra) {
    console.log(`  ⏭️  ${relPath} — era=${oldEra} 已是正确值，跳过`)
    skipped++
    continue
  }

  // 更新 era 字段
  content = content.replace(/^era:\s*.+$/m, `era: ${newEra}`)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  ✏️  ${relPath} — ${oldEra || '(无)'} → ${newEra}`)
  updated++
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 已修正: ${updated} 个文件`)
console.log(`⏭️  已跳过: ${skipped} 个文件`)
if (notFound.length > 0) {
  console.log(`⚠️  未找到: ${notFound.join(', ')}`)
}
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
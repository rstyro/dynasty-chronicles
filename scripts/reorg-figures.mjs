/**
 * @file reorg-figures.mjs
 * @description 武将/谋臣目录重组脚本：参照帝王目录结构，按朝代归入子目录
 *
 * 帝王目录结构（docs/figures/emperors/）：
 *   shanggu/{sanhuang-wudi,xia,shang,xizhou} → dongzhou/{chunqiu,zhanguo}
 *   → qinhan/{qin,xihan,xin,donghan,donghanmo} → sanguo/{wei,shu,wu}
 *   → jinchao/{xijin,dongjin,shiliuguo} → nanbei/{nanchao,beichao}
 *   → suitang/{sui,tang} → songliao/{wudai,shiguo,beisong,liao,jin,xixia,nansong}
 *   → yuan → ming → qing
 *
 * 步骤：
 *   1. 全站替换所有 /figures/generals/{slug} 与 /figures/strategists/{slug} 链接为新路径
 *   2. 移动 .md 文件到新子目录
 *
 * 运行：node scripts/reorg-figures.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.resolve(__dirname, '..', 'docs')

// ── 武将映射：slug → 目标目录（相对 docs/figures/generals/） ──────────
const GENERAL_MAP = {
  // 上古
  'chi-you': 'shanggu/sanhuang-wudi',
  'gong-gong': 'shanggu/sanhuang-wudi',
  'li-mu-shanggu': 'shanggu/sanhuang-wudi',
  'hou-yi': 'shanggu/xia',
  'fu-hao': 'shanggu/shang',
  'e-lai': 'shanggu/shang',
  'fei-lian': 'shanggu/shang',
  'nan-gong-kuo': 'shanggu/xizhou',
  // 东周
  'sun-wu': 'dongzhou/chunqiu',
  'bai-qi': 'dongzhou/zhanguo',
  'li-mu': 'dongzhou/zhanguo',
  'lian-po': 'dongzhou/zhanguo',
  'wang-jian': 'dongzhou/zhanguo',
  'wu-qi': 'dongzhou/zhanguo',
  // 秦汉
  'meng-tian': 'qinhan/qin',
  'xiang-yu': 'qinhan/qin',
  'han-xin': 'qinhan/xihan',
  'huo-qu-bing': 'qinhan/xihan',
  'li-guang': 'qinhan/xihan',
  'wei-qing': 'qinhan/xihan',
  'ban-chao': 'qinhan/donghan',
  // 东汉末（群雄）
  'gao-lan': 'qinhan/donghanmo',
  'guan-hai': 'qinhan/donghanmo',
  'lv-bu': 'qinhan/donghanmo',
  'wen-chou': 'qinhan/donghanmo',
  'wu-tu-gu': 'qinhan/donghanmo',
  'yan-liang': 'qinhan/donghanmo',
  // 三国
  'cao-hong': 'sanguo/wei',
  'cao-ren': 'sanguo/wei',
  'cao-zhang': 'sanguo/wei',
  'dian-wei': 'sanguo/wei',
  'pang-de': 'sanguo/wei',
  'wen-pin': 'sanguo/wei',
  'wen-yang': 'sanguo/wei',
  'xia-hou-dun': 'sanguo/wei',
  'xia-hou-yuan': 'sanguo/wei',
  'xu-chu': 'sanguo/wei',
  'xu-huang': 'sanguo/wei',
  'yu-jin': 'sanguo/wei',
  'yue-jin': 'sanguo/wei',
  'zang-ba': 'sanguo/wei',
  'zhang-he': 'sanguo/wei',
  'zhang-liao': 'sanguo/wei',
  'guan-ping': 'sanguo/shu',
  'guan-yu': 'sanguo/shu',
  'huang-zhong': 'sanguo/shu',
  'jiang-wei': 'sanguo/shu',
  'li-yan': 'sanguo/shu',
  'ma-chao': 'sanguo/shu',
  'wei-yan': 'sanguo/shu',
  'zhang-fei': 'sanguo/shu',
  'zhao-yun': 'sanguo/shu',
  'cheng-pu': 'sanguo/wu',
  'gan-ning': 'sanguo/wu',
  'ling-tong': 'sanguo/wu',
  'lu-xun': 'sanguo/wu',
  'lv-meng': 'sanguo/wu',
  'sun-ce': 'sanguo/wu',
  'tai-shi-ci': 'sanguo/wu',
  'zhou-tai': 'sanguo/wu',
  'zhou-yu': 'sanguo/wu',
  // 晋朝
  'xie-xuan': 'jinchao/dongjin',
  'zu-ti': 'jinchao/dongjin',
  // 南北朝
  'cao-jing-zong': 'nanbei/nanchao',
  'chen-qing-zhi': 'nanbei/nanchao',
  'wang-seng-bian': 'nanbei/nanchao',
  'wei-rui': 'nanbei/nanchao',
  'chen-ba-xian': 'nanbei/nanchao',
  'xiao-mo-he': 'nanbei/nanchao',
  'er-zhu-rong': 'nanbei/beichao',
  'gao-huan': 'nanbei/beichao',
  'yu-wen-tai': 'nanbei/beichao',
  'wei-xiao-kuan': 'nanbei/beichao',
  'hu-lv-guang': 'nanbei/beichao',
  // 隋唐
  'qin-shu-bao': 'suitang/tang',
  'su-ding-fang': 'suitang/tang',
  'wei-chi-gong': 'suitang/tang',
  'xue-ren-gui': 'suitang/tang',
  'guo-zi-yi': 'suitang/tang',
  'li-jing': 'suitang/tang',
  // 五代十国宋辽金夏
  'yue-fei': 'songliao/nansong',
  // 明朝
  'qi-ji-guang': 'ming',
  'yuan-chong-huan': 'ming',
  'xu-da': 'ming',
  'zheng-cheng-gong': 'ming'
}

// ── 谋臣映射：slug → 目标目录（相对 docs/figures/strategists/） ──────
const STRATEGIST_MAP = {
  // 上古
  'jiang-zi-ya': 'shanggu/xizhou',
  // 东周
  'guan-zhong': 'dongzhou/chunqiu',
  'shang-yang': 'dongzhou/zhanguo',
  'su-qin': 'dongzhou/zhanguo',
  'sun-bin': 'dongzhou/zhanguo',
  'zhang-yi': 'dongzhou/zhanguo',
  // 秦汉
  'chen-ping': 'qinhan/xihan',
  'xiao-he': 'qinhan/xihan',
  'zhang-liang': 'qinhan/xihan',
  // 三国
  'bing-yuan': 'sanguo/wei',
  'chen-jiao': 'sanguo/wei',
  'chen-qun': 'sanguo/wei',
  'cheng-yu': 'sanguo/wei',
  'chi-lv': 'sanguo/wei',
  'cui-yan': 'sanguo/wei',
  'dong-zhao': 'sanguo/wei',
  'du-ji': 'sanguo/wei',
  'du-xi': 'sanguo/wei',
  'guo-huai': 'sanguo/wei',
  'guo-jia': 'sanguo/wei',
  'han-ji': 'sanguo/wei',
  'hua-xin': 'sanguo/wei',
  'huan-jie': 'sanguo/wei',
  'jia-kui': 'sanguo/wei',
  'jia-xu': 'sanguo/wei',
  'jiang-ji': 'sanguo/wei',
  'kuai-yue': 'sanguo/wei',
  'liu-ye': 'sanguo/wei',
  'lou-gui': 'sanguo/wei',
  'man-chong': 'sanguo/wei',
  'mao-jie': 'sanguo/wei',
  'ren-jun': 'sanguo/wei',
  'sima-lang': 'sanguo/wei',
  'sima-yi': 'sanguo/wei',
  'tian-chou': 'sanguo/wei',
  'tian-yu': 'sanguo/wei',
  'wang-can': 'sanguo/wei',
  'wang-lang': 'sanguo/wei',
  'wang-xiu': 'sanguo/wei',
  'wei-kang': 'sanguo/wei',
  'xi-zhi-cai': 'sanguo/wei',
  'xin-pi': 'sanguo/wei',
  'xu-you': 'sanguo/wei',
  'xun-you': 'sanguo/wei',
  'xun-yu': 'sanguo/wei',
  'yang-fu': 'sanguo/wei',
  'yang-xiu': 'sanguo/wei',
  'zao-zhi': 'sanguo/wei',
  'zhang-ji': 'sanguo/wei',
  'zhao-yan': 'sanguo/wei',
  'zhong-yao': 'sanguo/wei',
  'chen-zhen': 'sanguo/shu',
  'dong-he': 'sanguo/shu',
  'dong-yun': 'sanguo/shu',
  'fa-zheng': 'sanguo/shu',
  'fei-yi': 'sanguo/shu',
  'huang-quan': 'sanguo/shu',
  'jian-yong': 'sanguo/shu',
  'jiang-wan': 'sanguo/shu',
  'li-hui': 'sanguo/shu',
  'liu-ba': 'sanguo/shu',
  'ma-liang': 'sanguo/shu',
  'ma-su': 'sanguo/shu',
  'mi-zhu': 'sanguo/shu',
  'pang-tong': 'sanguo/shu',
  'qin-mi': 'sanguo/shu',
  'sun-qian': 'sanguo/shu',
  'yang-yi': 'sanguo/shu',
  'yi-ji': 'sanguo/shu',
  'zhuge-liang': 'sanguo/shu',
  'bu-zhi': 'sanguo/wu',
  'gu-yong': 'sanguo/wu',
  'kan-ze': 'sanguo/wu',
  'lu-su': 'sanguo/wu',
  'lu-xun': 'sanguo/wu',
  'sun-shao': 'sanguo/wu',
  'yan-jun': 'sanguo/wu',
  'yu-fan': 'sanguo/wu',
  'zhang-hong': 'sanguo/wu',
  'zhang-zhao': 'sanguo/wu',
  'zhou-yu': 'sanguo/wu',
  'zhu-ge-jin': 'sanguo/wu',
  // 晋朝
  'xie-an': 'jinchao/dongjin',
  'wang-meng': 'jinchao/shiliuguo',
  // 隋唐
  'di-ren-jie': 'suitang/tang',
  'fang-xuanling': 'suitang/tang',
  'wei-zheng': 'suitang/tang',
  // 五代十国宋辽金夏
  'wang-anshi': 'songliao/beisong',
  // 明朝
  'liu-ji': 'ming',
  'zhang-ju-zheng': 'ming'
}

// ── 工具：递归扫描 ──────────────────────────────────────────────────
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.vitepress' && e.name !== '.git') walk(p, out)
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p)
  }
  return out
}

// ── 1. 全站替换链接 ────────────────────────────────────────────────
const rules = [
  ['/figures/generals/', GENERAL_MAP],
  ['/figures/strategists/', STRATEGIST_MAP]
]

const files = walk(docsDir)
let replacedTotal = 0
let affectedFiles = 0

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8')
  const before = content
  for (const [prefix, map] of rules) {
    // 贪婪匹配完整 slug，避免 li-mu 误伤 li-mu-shanggu
    const re = new RegExp(prefix.replace(/\//g, '\\/') + '([a-z0-9]+(?:-[a-z0-9]+)*)', 'g')
    content = content.replace(re, (m, slug) => {
      if (map[slug]) {
        replacedTotal++
        return prefix + map[slug] + '/' + slug
      }
      return m
    })
  }
  if (content !== before) {
    fs.writeFileSync(f, content)
    affectedFiles++
  }
}

console.log(`[1/3] 链接替换完成：共替换 ${replacedTotal} 处，涉及 ${affectedFiles} 个文件`)

// ── 2. 移动文件 ─────────────────────────────────────────────────────
let moved = 0
let movedFailed = []

for (const [root, map] of [['generals', GENERAL_MAP], ['strategists', STRATEGIST_MAP]]) {
  const base = path.join(docsDir, 'figures', root)
  for (const [slug, dir] of Object.entries(map)) {
    const src = path.join(base, slug + '.md')
    if (!fs.existsSync(src)) {
      movedFailed.push(`源文件不存在: ${src}`)
      continue
    }
    const dstDir = path.join(base, dir)
    fs.mkdirSync(dstDir, { recursive: true })
    const dst = path.join(dstDir, slug + '.md')
    if (fs.existsSync(dst)) {
      movedFailed.push(`目标已存在: ${dst}`)
      continue
    }
    fs.renameSync(src, dst)
    moved++
  }
}

console.log(`[2/3] 文件移动完成：共移动 ${moved} 个文件`)
if (movedFailed.length) {
  console.log('!! 以下文件移动失败：')
  movedFailed.forEach(m => console.log('   ' + m))
}

// ── 3. 目录统计报告 ─────────────────────────────────────────────────
console.log('[3/3] 迁移后目录结构：')
for (const root of ['generals', 'strategists']) {
  const base = path.join(docsDir, 'figures', root)
  console.log(`--- ${root}/`)
  const subdirs = fs.readdirSync(base, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort()
  for (const d of subdirs) {
    const cnt = fs.readdirSync(path.join(base, d)).filter(n => n.endsWith('.md')).length
    console.log(`  ${d}/ (${cnt})`)
  }
  const left = fs.readdirSync(base).filter(n => n.endsWith('.md'))
  console.log(`  根目录剩余: ${left.join(', ') || '(无)'}`)
}

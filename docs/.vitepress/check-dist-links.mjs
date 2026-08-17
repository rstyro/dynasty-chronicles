// 构建产物断链扫描：遍历 docs/.vitepress/dist/**/*.html，
// 检查所有站内 href（含 base 前缀）对应文件是否真实存在。
// 覆盖 check-links.mjs 的盲区：js 数据文件的 url、Vue 动态绑定 :href、base 前缀遗漏。
// 用法：npm run docs:build && node docs/.vitepress/check-dist-links.mjs
import fs from 'fs'
import path from 'path'

const distDir = path.resolve('docs/.vitepress/dist')
if (!fs.existsSync(distDir)) {
  console.log('SKIP: dist 目录不存在，请先 npm run docs:build')
  process.exit(0)
}

// 从 config 读取 base（避免硬编码）
let base = '/'
const configPath = path.resolve('docs/.vitepress/config.mts')
if (fs.existsSync(configPath)) {
  const cfg = fs.readFileSync(configPath, 'utf8')
  const m = cfg.match(/base:\s*['"]([^'"]+)['"]/)
  if (m) base = m[1]
}

const htmlFiles = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.html')) htmlFiles.push(p)
  }
}
walk(distDir)

const assetRe = /\.(css|js|png|jpe?g|gif|svg|ico|woff2?|ttf|json|webp|mp4|webm|pdf)$/i
const broken = []

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8')
  const rel = path.relative(distDir, file).replace(/\\/g, '/')
  const hrefRe = /href="([^"]+)"/g
  let m
  while ((m = hrefRe.exec(content)) !== null) {
    let target = m[1].trim()
    if (!target || target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('data:') || target.startsWith('#')) continue
    const hashIdx = target.indexOf('#')
    if (hashIdx >= 0) target = target.slice(0, hashIdx)
    if (!target) continue
    if (assetRe.test(target)) continue

    let abs
    if (target.startsWith('/')) {
      if (!target.startsWith(base)) {
        broken.push(`${rel} -> ${m[1]}  （缺 base 前缀 "${base}"）`)
        continue
      }
      abs = path.join(distDir, target.slice(base.length))
    } else {
      abs = path.resolve(path.dirname(file), target)
    }
    // 解码 URL 转义
    try { abs = decodeURIComponent(abs) } catch { /* keep as-is */ }

    const exists = (p) => fs.existsSync(p)
    let ok = false
    if (exists(abs) && fs.statSync(abs).isDirectory()) {
      ok = exists(path.join(abs, 'index.html'))
    } else if (exists(abs)) {
      ok = true
    } else if (!abs.endsWith('.html')) {
      ok = exists(abs + '.html') || (exists(abs) && fs.statSync(abs).isDirectory() && exists(path.join(abs, 'index.html')))
    }
    if (!ok) broken.push(`${rel} -> ${m[1]}`)
  }
}

if (broken.length) {
  console.log(`[check-dist-links] 断链 ${broken.length} 条：`)
  const seen = new Set()
  for (const b of broken) {
    if (!seen.has(b)) { seen.add(b); console.log('  ' + b) }
  }
  process.exit(1)
} else {
  console.log(`[check-dist-links] OK: ${htmlFiles.length} 个 html，构建产物零断链（base=${base}）`)
}

// 全站断链扫描：递归遍历 docs/**/*.md，检查所有 markdown 链接目标存在性
import fs from 'fs'
import path from 'path'

const docsDir = path.resolve('docs')
const mdFiles = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === '.vitepress') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.md')) mdFiles.push(p)
  }
}
walk(docsDir)

const linkRe = /\[[^\]]*\]\(([^)]+)\)/g
const broken = []
const checked = new Set()

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8')
  const rel = path.relative(docsDir, file).replace(/\\/g, '/')
  let m
  while ((m = linkRe.exec(content)) !== null) {
    let target = m[1].trim()
    if (!target || target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('#') || target.startsWith('tel:')) continue
    // 去锚点
    const hashIdx = target.indexOf('#')
    if (hashIdx >= 0) target = target.slice(0, hashIdx)
    if (!target) continue
    let abs
    if (target.startsWith('/')) {
      abs = path.join(docsDir, target.replace(/^\//, ''))
    } else {
      abs = path.resolve(path.dirname(file), target)
    }
    const key = abs
    if (checked.has(key)) continue
    checked.add(key)
    // 目录则找 index.md，否则 .md；无扩展名补 .md
    let candidates = []
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) candidates.push(path.join(abs, 'index.md'))
    else if (abs.endsWith('.md')) candidates.push(abs)
    else candidates.push(abs + '.md', abs + '.html')
    if (!candidates.some((c) => fs.existsSync(c))) {
      broken.push(`${rel} -> ${m[1]}`)
    }
  }
}

if (broken.length) {
  console.log('断链 ' + broken.length + ' 条：')
  broken.forEach((b) => console.log('  ' + b))
  process.exit(1)
} else {
  console.log(`OK: ${mdFiles.length} 个 md，全站链接零断链`)
}

/**
 * @file scan-emperors.mjs
 * @description 扫描现有帝王，按 era 分组输出完整清单，用于查漏补缺
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, '..', 'docs', 'figures', 'emperors')

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md')

const map = {} // era -> [{slug, title, order}]
let total = 0
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf-8')
  const m = c.match(/^---\n([\s\S]*?)\n---/)
  if (!m) continue
  const fm = Object.fromEntries(m[1].split('\n').map(l => l.split(': ')).filter(a => a.length === 2))
  if (fm.type !== 'emperor') continue
  const era = fm.era || ''
  if (!map[era]) map[era] = []
  const order = parseInt(fm.order || '99', 10)
  map[era].push({ slug: f.replace('.md',''), title: fm.title, order })
  total++
}
for (const era of Object.keys(map)) {
  map[era].sort((a,b) => a.order - b.order)
}
console.log(`\n✅ 现有帝王总数: ${total}`)
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
for (const [era, arr] of Object.entries(map).sort()) {
  console.log(`\n📂 ${era} (${arr.length}人)`)
  for (const p of arr) {
    console.log(`   ${String(p.order).padStart(2)} ${p.slug}.md → ${p.title}`)
  }
}

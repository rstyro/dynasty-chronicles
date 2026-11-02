// 临时验证脚本：打印帝王侧边栏结构
import { generateSidebar } from '../docs/.vitepress/sidebar-gen.mjs'

const sidebar = generateSidebar()
const fig = sidebar['/figures/']
const emp = fig.find(s => s.text.includes('帝王'))

let total = 0
for (const it of emp.items) {
  if (!it.items || it.text.includes('总览')) continue
  const hasSub = it.items.some(i => i.items)
  if (hasSub) {
    console.log(`\n📂  ${it.text}`)
    for (const sub of it.items) {
      if (sub.items) {
        total += sub.items.length
        console.log(`    📂 ${sub.text}: ${sub.items.map(i => i.text).join(' → ')}`)
      } else {
        total += 1
        console.log(`    📄 ${sub.text}`)
      }
    }
  } else {
    total += it.items.length
    console.log(`\n📄 ${it.text}: ${it.items.map(i => i.text).join(' → ')}`)
  }
}
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 帝王总数：${total}`)

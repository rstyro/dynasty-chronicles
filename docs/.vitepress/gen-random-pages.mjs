/**
 * 扫描 docs 下所有内容页（.md），生成 public/random-pages.json
 * 供随机探索按钮使用。
 * 在 dev / build 前运行。
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, extname, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs')
const PUBLIC = join(ROOT, 'public')

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === '.vitepress' || name === 'public') continue
      walk(p, files)
    } else if (extname(p) === '.md') {
      if (name === 'index.md' || name === '404.md' || name === 'README.md') continue
      const rel = relative(ROOT, p).replace(/\\/g, '/').replace(/\.md$/, '')
      files.push('/' + rel) // 绝对路径，配合 withBase 正确拼接 base
    }
  }
  return files
}

const pages = walk(ROOT)
writeFileSync(join(PUBLIC, 'random-pages.json'), JSON.stringify(pages, null, 2), 'utf8')
console.log('random-pages.json generated:', pages.length, 'pages')

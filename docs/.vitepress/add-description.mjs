// 全站补 description frontmatter（幂等：已有 description 的跳过）
// 用法: node docs/.vitepress/add-description.mjs
// 提取规则: 正文第一个普通段落；无段落则回退引用行(>)；仍无则跳过并列清单
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MAX = 100 // 中文字符上限

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.vitepress' || e.name === 'node_modules' || e.name === 'dist') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

function cleanMd(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/~~([^~]*)~~/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text) {
  const arr = Array.from(text)
  if (arr.length <= MAX + 10) return text
  const cut = arr.slice(0, MAX).join('')
  const last = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('！'), cut.lastIndexOf('？'), cut.lastIndexOf('；'))
  return last > 40 ? cut.slice(0, last + 1) : cut + '……'
}

// 预处理：移除 script/style 块、HTML 注释与行内标签（保留标签内文本），
// 避免把代码提取成 description
function preprocess(body) {
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
}

function extract(body) {
  const lines = preprocess(body).split(/\r?\n/)
  let quote = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line.startsWith('---') || line.startsWith('<!--')) continue
    if (line.startsWith('#')) continue
    if (line.startsWith('>')) { if (!quote) quote = line.replace(/^>\s*/, ''); continue }
    if (line.startsWith('|')) continue
    if (/^[-*+]\s/.test(line) || /^\d+[.、)\s]/.test(line)) continue
    if (line.startsWith('<') && line.endsWith('>')) continue
    let para = line
    let j = i + 1
    while (j < lines.length) {
      const nl = lines[j].trim()
      if (!nl || nl.startsWith('#') || nl.startsWith('---') || nl.startsWith('>') || nl.startsWith('|')) break
      if (/^[-*+]\s/.test(nl) || /^\d+[.、)\s]/.test(nl)) break
      para += ' ' + nl
      j++
    }
    const c = cleanMd(para)
    if (c) return truncate(c)
  }
  return quote ? truncate(cleanMd(quote)) : null
}

function yamlQuote(s) {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
}

const files = walk(ROOT)
let injected = 0, injectedNoFm = 0, skippedExisting = 0, skippedNoBody = 0
const noBody = []
const errors = []

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{200D}]/gu

for (const f of files) {
  let content
  try { content = fs.readFileSync(f, 'utf8') } catch { errors.push(f); continue }
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) {
    const h1 = content.match(/^#\s*(.+)$/m)?.[1]?.trim()
    const title = h1 ? h1.replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim() : null
    if (title) {
      const desc = extract(content)
      const fm = '---\ntitle: ' + yamlQuote(title) + (desc ? '\ndescription: ' + yamlQuote(desc) : '') + '\n---\n\n'
      fs.writeFileSync(f, fm + content, 'utf8')
      injectedNoFm++
    } else {
      skippedNoBody++; noBody.push(f.replace(ROOT, '') + '  [无 frontmatter 且无 H1]')
    }
    continue
  }
  const fm = m[1]
  if (/^description\s*:/m.test(fm)) { skippedExisting++; continue }
  const body = content.slice(m[0].length)
  const desc = extract(body)
  if (!desc) { skippedNoBody++; noBody.push(f.replace(ROOT, '')); continue }
  const newFm = fm + '\ndescription: ' + yamlQuote(desc)
  const newContent = content.slice(0, m.index) + '---\n' + newFm + '\n---\n' + content.slice(m.index + m[0].length)
  fs.writeFileSync(f, newContent, 'utf8')
  injected++
}

console.log(`注入 ${injected} · 补全无frontmatter ${injectedNoFm} · 已有跳过 ${skippedExisting} · 无正文跳过 ${skippedNoBody} · 错误 ${errors.length}`)

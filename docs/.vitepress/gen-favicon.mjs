/**
 * 生成 favicon 全套图标（无第三方依赖）
 * 输出到 docs/public/：favicon.svg / favicon-16.png / favicon-32.png / favicon-48.png / favicon.ico / apple-touch-icon.png
 *
 * 图形：与 logo.svg 同构（外环·宫殿·双柱·卷轴·中心日轮），
 * 深红印章底色 + 金色线条（"红底金印"中国风）。
 * 用法：node docs/.vitepress/gen-favicon.mjs
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

/* ---------------- PNG 编码器（8bit RGBA） ---------------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'ascii'), data])))
  return Buffer.concat([len, Buffer.from(type, 'ascii'), data, crc])
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6 // RGBA
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0 // filter: None
    rgba.copy(raw, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4)
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
}

/* ---------------- logo 几何（viewBox 200x200，与 logo.svg 同构） ---------------- */
const BG = [142, 35, 35]   // 深红 #8E2323
const FG = [240, 199, 94]  // 金 #F0C75E

function distToSeg(x, y, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay
  const l2 = dx * dx + dy * dy
  let t = l2 ? ((x - ax) * dx + (y - ay) * dy) / l2 : 0
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy))
}
function quadPoints(x0, y0, cx, cy, x1, y1, n = 96) {
  const pts = []
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t
    pts.push([u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1])
  }
  return pts
}
const SCROLL1 = quadPoints(20, 150, 100, 120, 180, 150)
const SCROLL2 = quadPoints(20, 170, 100, 140, 180, 170)
function minDistToPts(x, y, pts) {
  let m = Infinity
  for (const [px, py] of pts) {
    const d = (x - px) ** 2 + (y - py) ** 2
    if (d < m) m = d
  }
  return Math.sqrt(m)
}
function inGold(x, y) {
  const dC = Math.hypot(x - 100, y - 100)
  if (dC >= 79 && dC <= 91) return true                      // 外环（历史周期律）
  if (distToSeg(x, y, 30, 70, 100, 15) <= 6) return true     // 宫殿左檐
  if (distToSeg(x, y, 100, 15, 170, 70) <= 6) return true    // 宫殿右檐
  if (x >= 65 && x <= 83 && y >= 70 && y <= 135) return true // 左柱（武将）
  if (x >= 117 && x <= 135 && y >= 70 && y <= 135) return true // 右柱（谋臣）
  if (minDistToPts(x, y, SCROLL1) <= 6) return true          // 卷轴上沿
  if (minDistToPts(x, y, SCROLL2) <= 6) return true          // 卷轴下沿
  if (Math.hypot(x - 100, y - 75) <= 14) return true         // 中心日轮
  return false
}

function rasterize(size) {
  const S = 3 // 3x3 超采样抗锯齿
  const rgba = Buffer.alloc(size * size * 4)
  const scale = 200 / size
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let hit = 0
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          const x = (px + (sx + 0.5) / S) * scale
          const y = (py + (sy + 0.5) / S) * scale
          if (inGold(x, y)) hit++
        }
      }
      const cov = hit / (S * S)
      const i = (py * size + px) * 4
      rgba[i] = Math.round(BG[0] + (FG[0] - BG[0]) * cov)
      rgba[i + 1] = Math.round(BG[1] + (FG[1] - BG[1]) * cov)
      rgba[i + 2] = Math.round(BG[2] + (FG[2] - BG[2]) * cov)
      rgba[i + 3] = 255
    }
  }
  return rgba
}

/* ---------------- ICO 打包（内嵌 PNG，Vista+ 支持） ---------------- */
function packICO(pngs, sizes) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)
  const entries = []
  let offset = 6 + pngs.length * 16
  pngs.forEach((buf, i) => {
    const e = Buffer.alloc(16)
    e[0] = sizes[i] >= 256 ? 0 : sizes[i]
    e[1] = sizes[i] >= 256 ? 0 : sizes[i]
    e[2] = 0
    e[3] = 0
    e.writeUInt16LE(1, 4) // planes
    e.writeUInt16LE(32, 6) // bpp
    e.writeUInt32LE(buf.length, 8)
    e.writeUInt32LE(offset, 12)
    entries.push(e)
    offset += buf.length
  })
  return Buffer.concat([header, ...entries, ...pngs])
}

/* ---------------- 主流程 ---------------- */
const sizes = [16, 32, 48]
const pngs = sizes.map(s => encodePNG(s, s, rasterize(s)))
const apple = encodePNG(180, 180, rasterize(180))

writeFileSync(join(PUBLIC, 'favicon-16.png'), pngs[0])
writeFileSync(join(PUBLIC, 'favicon-32.png'), pngs[1])
writeFileSync(join(PUBLIC, 'favicon-48.png'), pngs[2])
writeFileSync(join(PUBLIC, 'favicon.ico'), packICO(pngs, sizes))
writeFileSync(join(PUBLIC, 'apple-touch-icon.png'), apple)

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="36" fill="#8E2323"/>
  <g stroke="#F0C75E" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="100" cy="100" r="85"/>
    <path d="M 30 70 L 100 15 L 170 70"/>
    <rect x="65" y="70" width="18" height="65"/>
    <rect x="117" y="70" width="18" height="65"/>
    <path d="M 20 150 Q 100 120 180 150"/>
    <path d="M 20 170 Q 100 140 180 170"/>
  </g>
  <circle cx="100" cy="75" r="14" fill="#F0C75E"/>
</svg>
`
writeFileSync(join(PUBLIC, 'favicon.svg'), faviconSvg)

console.log('favicon 生成完成:')
for (const f of ['favicon.svg', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png', 'favicon.ico', 'apple-touch-icon.png']) {
  console.log('  -', f)
}

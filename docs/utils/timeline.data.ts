// .vitepress/timeline.data.ts
import { createContentLoader } from 'vitepress'

// 时期卡片数据（5 个大时期，手工策展的聚合信息）
export interface Era {
  badge: string
  title: string
  desc: string
  range: string
  cls: string
}

export const eras: Era[] = [
  { badge: '🗿 上古', title: '传说与奠基', desc: '三皇五帝 · 夏 · 商 · 西周', range: '传说时代 — 前 771', cls: 'era-ancient' },
  { badge: '🏛️ 帝国', title: '大一统初立', desc: '春秋 · 战国 · 秦 · 两汉 · 新莽', range: '前 770 — 220', cls: 'era-imperial' },
  { badge: '⚔️ 分裂', title: '民族大融合', desc: '三国 · 两晋 · 十六国 · 南北朝', range: '220 — 589', cls: 'era-turbulent' },
  { badge: '🥇 盛世', title: '隋唐巅峰', desc: '隋 · 唐 · 五代十国', range: '581 — 960', cls: 'era-golden' },
  { badge: '📜 近世', title: '转型与鼎革', desc: '辽 · 宋 · 西夏 · 金 · 元 · 明 · 清', range: '907 — 1912', cls: 'era-late' }
]

// 朝代表格数据：加载单个朝代页面，按时期分组排序。
// 无 period 字段的页面（如 index.md）会被过滤掉。
export interface DynastyRow {
  url: string
  period: string
  name: string
  start: string
  end: string
  capital: string
  founder: string
  last: string
  keyword: string
}

const PERIOD_ORDER = ['上古', '春秋战国', '帝国初立', '分裂融合', '隋唐盛世', '宋元明清']

export default createContentLoader('dynasties/*.md', {
    transform(raw): DynastyRow[] {
        return raw
            .filter(({ frontmatter }) => frontmatter.period)
            .map(({ url, frontmatter }) => ({
                url,
                period: frontmatter.period,
                name: frontmatter.title,
                start: frontmatter.start,
                end: frontmatter.end,
                capital: frontmatter.capital || '—',
                founder: frontmatter.founder || '—',
                last: frontmatter.last || '—',
                keyword: frontmatter.keyword || ''
            }))
            .sort((a, b) => PERIOD_ORDER.indexOf(a.period) - PERIOD_ORDER.indexOf(b.period))
    }
})

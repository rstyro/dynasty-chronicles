<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { dynasties, mainLine, overviewChildren, periodSlugs } from '../../../utils/dynasties.generated.js'

const { page, frontmatter } = useData()

const route = computed(() => '/' + page.value.relativePath.replace(/\.md$/, ''))

const isDynastyPage = computed(() =>
  route.value.startsWith('/dynasties/') &&
  route.value !== '/dynasties/index' &&
  route.value !== '/dynasties/'
)

const current = computed(() => dynasties.find(item => item.url === route.value) || null)
const overview = computed(() => overviewChildren[route.value] || null)
const period = computed(() => frontmatter.value.period || current.value?.period || '')
const eraSlug = computed(() => periodSlugs[period.value] || '')

const span = computed(() => {
  const direct = mainLine.indexOf(route.value)
  if (direct >= 0) return [direct, direct]
  const children = overview.value
  if (!children?.length) return null
  const positions = children
    .map(url => mainLine.indexOf(url))
    .filter(index => index >= 0)
  if (!positions.length) return null
  return [Math.min(...positions), Math.max(...positions)]
})

const prev = computed(() => {
  if (!span.value) return null
  return dynasties.find(item => item.url === mainLine[span.value![0] - 1]) || null
})

const next = computed(() => {
  if (!span.value) return null
  return dynasties.find(item => item.url === mainLine[span.value![1] + 1]) || null
})

const samePeriod = computed(() => {
  const item = current.value
  if (!item) return []
  return dynasties.filter(other => {
    if (other.url === item.url || other.period !== item.period) return false
    if (item.startYear == null || item.endYear == null || other.startYear == null || other.endYear == null) return false
    return item.startYear < other.endYear && other.startYear < item.endYear
  }).slice(0, 6)
})

const PERIOD_RULES: [RegExp, string][] = [
  [/民国/, '近代·共和转型'],
  [/现代/, '当代·复兴之路'],
  [/三国|曹魏|蜀汉|孙吴|东汉末|三国初年/, '三国·两晋·十六国'],
  [/南北朝|南朝|北朝/, '南北朝·民族融合'],
  [/西晋|东晋|十六国/, '三国·两晋·十六国'],
  [/元|明|清/, '大一统皇朝'],
  [/五代|十国|北宋|南宋|西夏|辽|金/, '多民族政权并立'],
  [/隋|唐|武周|安史/, '隋唐盛世'],
  [/楚汉|秦|西汉|东汉|新/, '秦汉·大一统'],
  [/东周|春秋|战国/, '东周·诸侯割据'],
  [/上古|三皇|五帝|夏|商|西周/, '上古·文明起源'],
]

const DYNASTY_RULES: [RegExp, string][] = [
  [/民国/, 'republic'],
  [/现代/, 'prc'],
  [/明末清初/, 'ming'],
  [/清/, 'qing'],
  [/五代|十国/, 'wudai-shiguo'],
  [/北朝/, 'beichao'],
  [/南朝/, 'nanchao'],
  [/十六国/, 'sixteen-kingdoms'],
  [/楚汉/, 'chu-han'],
  [/新莽|^新$/, 'xin'],
  [/三皇|五帝|上古/, 'three-sovereigns'],
  [/西夏/, 'western-xia'],
  [/西周/, 'western-zhou'],
  [/春秋/, 'chunqiu'],
  [/战国/, 'zhanguo'],
  [/曹魏/, 'cao-wei'],
  [/蜀汉/, 'shu-han'],
  [/孙吴/, 'sun-wu'],
  [/西晋/, 'western-jin'],
  [/东晋/, 'eastern-jin'],
  [/隋/, 'sui'],
  [/唐|安史/, 'tang'],
  [/北宋/, 'northern-song'],
  [/南宋/, 'southern-song'],
  [/辽/, 'liao'],
  [/金/, 'jin-dynasty'],
  [/元/, 'yuan'],
  [/明/, 'ming'],
  [/夏/, 'xia'],
  [/商/, 'shang'],
  [/西汉/, 'western-han'],
  [/东汉/, 'eastern-han'],
  [/秦/, 'qin'],
]

const isFigureOrBattle = computed(() =>
  /^\/(figures|battles)\/[^/]+\//.test(route.value) &&
  !route.value.endsWith('/index')
)

const eraText = computed(() => {
  if (!isFigureOrBattle.value) return ''
  return String(frontmatter.value.era || frontmatter.value.dynasty || '').trim()
})

const contextPeriod = computed(() => {
  if (!eraText.value) return ''
  const hit = PERIOD_RULES.find(([re]) => re.test(eraText.value))
  return hit ? hit[1] : ''
})

const contextSlug = computed(() => periodSlugs[contextPeriod.value] || '')

const contextDynasty = computed(() => {
  if (!eraText.value) return null
  const hit = DYNASTY_RULES.find(([re]) => re.test(eraText.value))
  if (!hit) return null
  return dynasties.find(item => item.slug === hit[1]) || null
})
</script>

<template>
  <div v-if="isDynastyPage && (prev || next || eraSlug)" class="chrono-nav">
    <div class="chrono-main">
      <a v-if="prev" class="chrono-side" :href="withBase(prev.url)">
        <span class="chrono-label">← 上一朝</span>
        <span class="chrono-name">{{ prev.name }}</span>
      </a>
      <span v-else class="chrono-side chrono-empty" />

      <a v-if="eraSlug" class="chrono-era" :href="withBase('/history/' + eraSlug)">
        🧭 {{ period }}
      </a>

      <a v-if="next" class="chrono-side chrono-next" :href="withBase(next.url)">
        <span class="chrono-label">下一朝 →</span>
        <span class="chrono-name">{{ next.name }}</span>
      </a>
      <span v-else class="chrono-side chrono-empty" />
    </div>

    <div v-if="samePeriod.length" class="chrono-same">
      <span class="chrono-same-label">同期</span>
      <a v-for="item in samePeriod" :key="item.url" :href="withBase(item.url)">{{ item.name }}</a>
    </div>
  </div>

  <div v-else-if="!isDynastyPage && (contextPeriod || contextDynasty)" class="chrono-nav chrono-context">
    <span class="chrono-context-label">时代坐标</span>
    <a v-if="contextPeriod" class="chrono-era" :href="withBase('/history/' + contextSlug)">🧭 {{ contextPeriod }}</a>
    <a v-if="contextDynasty" class="chrono-context-link" :href="withBase(contextDynasty.url)">
      {{ contextDynasty.name }} →
    </a>
  </div>
</template>

<style scoped>
.chrono-nav {
  margin: 0 0 24px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.chrono-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.chrono-side {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 4px 8px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background 0.2s, color 0.2s;
}

.chrono-side:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
}

.chrono-next {
  text-align: right;
}

.chrono-empty {
  visibility: hidden;
}

.chrono-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.chrono-name {
  font-size: 0.92rem;
  font-weight: 600;
}

.chrono-era {
  flex-shrink: 0;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.chrono-same {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.78rem;
}

.chrono-same-label {
  color: var(--vp-c-text-3);
}

.chrono-same a {
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.chrono-same a:hover {
  color: var(--vp-c-brand-1);
}

.chrono-context {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.chrono-context-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.chrono-context-link {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  text-decoration: none;
}

.chrono-context-link:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .chrono-main {
    flex-wrap: wrap;
    justify-content: center;
  }
  .chrono-empty {
    display: none;
  }
}
</style>

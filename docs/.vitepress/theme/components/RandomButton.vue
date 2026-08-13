<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { ref } from 'vue'

const { site } = useData()
const spinning = ref(false)
let cache: string[] | null = null

async function goRandom() {
  if (cache) { pick(cache); return }
  spinning.value = true
  try {
    const res = await fetch(withBase('/random-pages.json'))
    if (!res.ok) throw new Error(String(res.status))
    const pages: string[] = await res.json()
    cache = pages
    pick(pages)
  } catch {
    alert('随机探索列表暂不可用，请先构建站点。')
  } finally {
    spinning.value = false
  }
}

function pick(pages: string[]) {
  const path = pages[Math.floor(Math.random() * pages.length)]
  window.location.href = withBase(path)
}
</script>

<template>
  <button type="button" class="vp-random-btn" title="随机探索" @click="goRandom" :disabled="spinning">
    <svg class="dice" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
    <span class="text">随机探索</span>
  </button>
</template>

<style scoped>
.vp-random-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
  padding: 0 12px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.vp-random-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.vp-random-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.dice { flex-shrink: 0; }
@media (max-width: 768px) {
  .text { display: none; }
  .vp-random-btn { padding: 0 8px; margin-left: 6px; }
}
</style>

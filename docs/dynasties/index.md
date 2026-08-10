---
title: 朝代总览
---

<script setup>
import { ref } from 'vue'

const dynasties = ref([
  { name: '三皇五帝', link: '/dynasties/three-sovereigns', period: '传说时代–前2070', capital: '—', keyword: '文明起源', desc: '燧人钻火、伏羲画卦、神农尝草——黄帝一统华夏，尧舜禅让天下。文明的曙光从这里升起。' },
  { name: '先秦', link: '/dynasties/pre-qin', period: '约前2070–前221', capital: '多都', keyword: '三代奠基', desc: '夏禹传子启家天下，商汤革命甲骨成文，周公分封礼乐兴邦。青铜铸鼎，诸子争鸣，华夏基因在此定型。' },
  { name: '秦', link: '/dynasties/qin', period: '前221–前207', capital: '咸阳', keyword: '书同文', desc: '奋六世余烈，振长策而御宇内。废分封、立郡县，车同轨、书同文，百代皆行秦政法。' },
  { name: '楚汉', link: '/dynasties/chu-han', period: '前206–前202', capital: '彭城/汉中', keyword: '楚汉争霸', desc: '鸿门宴上刀光剑影，暗度陈仓天下震动。霸王别姬乌江自刎，四载烽火铸就四百年大汉江山。' },
  { name: '汉', link: '/dynasties/han', period: '前202–220', capital: '长安/洛阳', keyword: '丝绸之路', desc: '明犯强汉者虽远必诛——文景养民、武帝拓疆、光武中兴。汉族之名由此而来，丝路驼铃横贯东西。' },
  { name: '三国', link: '/dynasties/sanguo', period: '220–280', capital: '洛阳/成都/建业', keyword: '群星闪耀', desc: '魏武挥鞭横槊赋诗，武侯出师鞠躬尽瘁，孙郎坐断东南战未休。短短一甲子，英雄辈出的浪漫时代。' },
  { name: '晋', link: '/dynasties/jin', period: '265–420', capital: '洛阳/建康', keyword: '衣冠南渡', desc: '三分归晋太康昙花，八王乱起五胡入华。洛水之畔玄风浩荡，建康城里门阀共天下。' },
  { name: '十六国', link: '/dynasties/sixteen-kingdoms', period: '304–439', capital: '—', keyword: '五胡乱华', desc: '匈奴鲜卑羯氐羌，你方唱罢我登场。血与火的熔炉中，新的民族正在诞生。' },
  { name: '南北朝', link: '/dynasties/nanbei-chao', period: '386–589', capital: '建康/洛阳/长安', keyword: '胡汉大融', desc: '南朝四百八十寺，北朝孝文改汉服。均田府兵出关中，隋唐盛世已在孕育之中。' },
  { name: '隋', link: '/dynasties/sui', period: '581–618', capital: '大兴', keyword: '大运河', desc: '开皇之治天下富足，大运河水贯通南北。科举取士打破门阀，可惜二世而亡为唐做嫁。' },
  { name: '唐', link: '/dynasties/tang', period: '618–907', capital: '长安', keyword: '万国来朝', desc: '贞观开元盛世巅峰，天可汗号令万邦。李白斗酒诗百篇，玄奘西行取真经——至今海外犹称唐人。' },
  { name: '五代十国', link: '/dynasties/wudai-shiguo', period: '907–960', capital: '—', keyword: '群雄割据', desc: '朱李石刘郭，梁唐晋汉周。五十三载换八姓十四帝，乱至极处方有英雄出。' },
  { name: '宋', link: '/dynasties/song', period: '960–1279', capital: '开封/临安', keyword: '文治巅峰', desc: '杯酒释兵权，与士大夫共天下。交子问世、活字排印，清明上河十里繁华。虽武功不振，文治登峰造极。' },
  { name: '辽', link: '/dynasties/liao', period: '907–1125', capital: '上京', keyword: '契丹王朝', desc: '大漠雄鹰耶律氏，南北面官治天下。澶渊一盟百年安，俄罗斯至今仍称中国为契丹。' },
  { name: '西夏', link: '/dynasties/western-xia', period: '1038–1227', capital: '兴庆', keyword: '党项王朝', desc: '贺兰山下党项兴，自创文字立国本。周旋于宋辽金之间二百载，终被蒙古铁蹄踏碎。' },
  { name: '金', link: '/dynasties/jin-dynasty', period: '1115–1234', capital: '中都/开封', keyword: '女真崛起', desc: '白山黑水出枭雄，灭辽克宋踞中原。猛安谋克半兵半农，卢沟晓月至今犹存金代石桥。' },
  { name: '元', link: '/dynasties/yuan', period: '1271–1368', capital: '大都', keyword: '蒙古铁骑', desc: '一代天骄成吉思汗，子孙马蹄踏遍欧亚。行省制度开先河，大都城中马可波罗惊叹东方繁华。' },
  { name: '明', link: '/dynasties/ming', period: '1368–1644', capital: '南京→北京', keyword: '七下西洋', desc: '驱逐胡虏恢复中华，天子守国门君王死社稷。郑和宝船下西洋，阳明心学照古今。' },
  { name: '清', link: '/dynasties/qing', period: '1644–1912', capital: '北京', keyword: '康乾盛世', desc: '白山黑水入中原，康雍乾三代拓疆定边。四库全书汇典籍，晚清变局三千年未有之大变。' },
])
</script>

<div class="page-container">

<!-- ===== 英雄区 ===== -->
<div class="hero">
  <div class="hero-sub">IMPERIUM SINICUM</div>
  <h1 class="hero-title">🏯 朝代总览</h1>
  <p class="hero-quote">"以铜为镜，可以正衣冠；以史为镜，可以知兴替；以人为镜，可以明得失。"</p>
  <p style="font-size:0.82rem;color:var(--vp-c-text-3)">—— 唐太宗 · 李世民</p>
  <div class="hero-divider"></div>
</div>

<!-- ===== 四维统计 ===== -->
<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-num">~4000</div>
    <div class="stat-label">年文明跨度</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">30</div>
    <div class="stat-label">个主要政权</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">7</div>
    <div class="stat-label">个历史时期</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">83</div>
    <div class="stat-label">个王朝（含割据）</div>
  </div>
</div>

<hr class="section-hr" />

<h2 class="section-heading">📜 历史时期速览</h2>

<div class="era-nav">
  <a href="/timeline" class="era-ancient">🗿 上古<br><small>传说–前771</small></a>
  <a href="/dynasties/spring-autumn" class="era-spring">🏛 春秋战国<br><small>前770–前221</small></a>
  <a href="/dynasties/qin" class="era-empire">🏛 帝国初立<br><small>前221–220</small></a>
  <a href="/dynasties/sanguo" class="era-split">⚔ 分裂融合<br><small>220–589</small></a>
  <a href="/dynasties/tang" class="era-gold">🥇 隋唐盛世<br><small>581–960</small></a>
  <a href="/dynasties/song" class="era-late">📜 宋元明清<br><small>907–1912</small></a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">🗿 上古 · 传说与三代</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(0,2)" :key="d.name" :href="d.link" class="dynasty-card">
    <div class="card-header">
      <h3>{{ d.name }}</h3>
      <span class="card-period">{{ d.period }}</span>
    </div>
    <div class="card-meta">
      <span><span class="meta-icon">🏙️</span> {{ d.capital }}</span>
    </div>
    <span class="card-tag">{{ d.keyword }}</span>
    <div class="card-desc">{{ d.desc }}</div>
  </a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">🏛️ 帝国初立 · 大一统</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(2,5)" :key="d.name" :href="d.link" class="dynasty-card">
    <div class="card-header">
      <h3>{{ d.name }}</h3>
      <span class="card-period">{{ d.period }}</span>
    </div>
    <div class="card-meta">
      <span><span class="meta-icon">🏙️</span> {{ d.capital }}</span>
    </div>
    <span class="card-tag">{{ d.keyword }}</span>
    <div class="card-desc">{{ d.desc }}</div>
  </a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">⚔️ 分裂融合 · 乱世英雄</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(5,9)" :key="d.name" :href="d.link" class="dynasty-card">
    <div class="card-header">
      <h3>{{ d.name }}</h3>
      <span class="card-period">{{ d.period }}</span>
    </div>
    <div class="card-meta">
      <span><span class="meta-icon">🏙️</span> {{ d.capital }}</span>
    </div>
    <span class="card-tag">{{ d.keyword }}</span>
    <div class="card-desc">{{ d.desc }}</div>
  </a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">🥇 隋唐盛世 · 巅峰时代</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(9,12)" :key="d.name" :href="d.link" class="dynasty-card">
    <div class="card-header">
      <h3>{{ d.name }}</h3>
      <span class="card-period">{{ d.period }}</span>
    </div>
    <div class="card-meta">
      <span><span class="meta-icon">🏙️</span> {{ d.capital }}</span>
    </div>
    <span class="card-tag">{{ d.keyword }}</span>
    <div class="card-desc">{{ d.desc }}</div>
  </a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">📜 宋元明清 · 近世转型</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(12,19)" :key="d.name" :href="d.link" class="dynasty-card">
    <div class="card-header">
      <h3>{{ d.name }}</h3>
      <span class="card-period">{{ d.period }}</span>
    </div>
    <div class="card-meta">
      <span><span class="meta-icon">🏙️</span> {{ d.capital }}</span>
    </div>
    <span class="card-tag">{{ d.keyword }}</span>
    <div class="card-desc">{{ d.desc }}</div>
  </a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">💡 兴衰之鉴</h2>

<div class="insight-grid">
  <div class="insight-card">
    <h4>🔁 王朝周期律</h4>
    <p>开国轻徭薄赋 → 中期积累矛盾 → 末期土地兼并、财政崩溃、民变四起 —— 几乎每个长命王朝都走不出这个循环。</p>
  </div>
  <div class="insight-card">
    <h4>⚔️ 北强南弱</h4>
    <p>长城以南的农耕政权，始终面临北方游牧民族的军事压力。从匈奴到蒙古，北方铁骑多次改写中国历史走向。</p>
  </div>
  <div class="insight-card">
    <h4>🌏 分合大势</h4>
    <p>"天下大势，分久必合，合久必分。" 中国历史上统一时期与分裂时期交替出现，但统一始终是主旋律。</p>
  </div>
  <div class="insight-card">
    <h4>📖 以史为鉴</h4>
    <p>每一个王朝的覆灭，都留给后人深刻的教训。治世之音安以乐，乱世之音怨以怒——民心永远是最大的政治。</p>
  </div>
</div>

</div>

<style scoped>
/* ===== 页面容器 ===== */
.page-container {
  max-width: 960px;
}

/* ===== 英雄区 ===== */
.hero {
  text-align: center;
  padding: 2.5rem 0 1rem;
}
.hero-sub {
  font-size: 0.85rem;
  letter-spacing: 0.4em;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}
.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin: 0.4rem 0 0.5rem;
  background: linear-gradient(135deg, #8b4513 0%, #b8860b 40%, #c0392b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-quote {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  max-width: 520px;
  margin: 0 auto 0.6rem;
  line-height: 1.7;
}
.hero-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #b8860b, #c0392b);
  margin: 0 auto 2rem;
  border-radius: 1px;
}

/* ===== 分隔线 ===== */
.section-hr {
  margin: 2rem 0 1.5rem;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
}

/* ===== 区域标题 ===== */
.section-heading {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.9rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

/* ===== 统计条 ===== */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0 0 2.5rem;
}
.stat-item {
  text-align: center;
  padding: 1rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}
.stat-num {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

/* ===== 时期导航 ===== */
.era-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.6rem;
  margin: 0 0 1rem;
}
.era-nav a {
  text-align: center;
  padding: 0.7rem 0.4rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}
.era-nav a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.era-ancient { border-top: 3px solid #8b6914; }
.era-spring  { border-top: 3px solid #6b8e23; }
.era-empire  { border-top: 3px solid #b22222; }
.era-split   { border-top: 3px solid #6a0dad; }
.era-gold    { border-top: 3px solid #daa520; }
.era-late    { border-top: 3px solid #2f4f4f; }
.era-ancient:hover { border-color: #8b6914; background: rgba(139,105,20,0.06); }
.era-spring:hover  { border-color: #6b8e23; background: rgba(107,142,35,0.06); }
.era-empire:hover  { border-color: #b22222; background: rgba(178,34,34,0.06); }
.era-split:hover   { border-color: #6a0dad; background: rgba(106,13,173,0.06); }
.era-gold:hover    { border-color: #daa520; background: rgba(218,165,32,0.06); }
.era-late:hover    { border-color: #2f4f4f; background: rgba(47,79,79,0.06); }

/* ===== 朝代卡片网格 ===== */
.dynasty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 0.9rem;
  margin-bottom: 1.2rem;
}
.dynasty-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.3rem 1.2rem;
  text-decoration: none;
  color: inherit;
  display: block;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;
}
.dynasty-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--vp-c-divider);
  transition: background 0.25s;
}
.dynasty-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand-1);
}
.dynasty-card:hover::before {
  background: var(--vp-c-brand-1);
}
.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.card-header h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
}
.card-period {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.card-meta {
  display: flex;
  gap: 0.8rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.55rem;
  flex-wrap: wrap;
}
.card-meta span {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.meta-icon { opacity: 0.6; }
.card-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.55rem;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}
.card-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

/* ===== 兴衰规律 ===== */
.insight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0 2.5rem;
}
.insight-card {
  padding: 1.2rem 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.insight-card h4 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}
.insight-card p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .hero-title { font-size: 1.8rem; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .era-nav { grid-template-columns: repeat(3, 1fr); }
  .dynasty-grid { grid-template-columns: 1fr; }
  .insight-grid { grid-template-columns: 1fr; }
}
</style>

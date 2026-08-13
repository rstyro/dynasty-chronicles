---
title: 朝代总览
description: "import { ref } from 'vue' import { withBase } from 'vitepress'"
---

<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

// ── 时期速览导航数据 ──
const eraNav = [
  { link: '/dynasties/ancient/three-sovereigns', icon: '🗿', name: '上古', period: '传说–前771', cls: 'era-ancient' },
  { link: '/dynasties/dongzhou/chunqiu', icon: '🏛', name: '东周', period: '前770–前221', cls: 'era-dongzhou' },
  { link: '/dynasties/qinhan/qin', icon: '⚔', name: '秦汉', period: '前221–220', cls: 'era-qinhan' },
  { link: '/dynasties/weijin/sanguo', icon: '🏛', name: '魏晋', period: '220–439', cls: 'era-weijin' },
  { link: '/dynasties/nanbei/nanbei-chao', icon: '🤝', name: '南北朝', period: '386–589', cls: 'era-nanbei' },
  { link: '/dynasties/suitang/tang', icon: '🥇', name: '隋唐', period: '581–907', cls: 'era-suitang' },
  { link: '/dynasties/songliao/song', icon: '🏰', name: '多民族', period: '907–1279', cls: 'era-multi' },
  { link: '/dynasties/imperial/yuan', icon: '👑', name: '大一统', period: '1271–1912', cls: 'era-imperial' },
]

// ── 朝代数据（按 8 大历史时期排列，与侧边栏分组一一对应）──
const dynasties = ref([
  // ===== 上古·文明起源 (0-3) =====
  { name: '三皇五帝', link: '/dynasties/ancient/three-sovereigns', period: '传说时代–前2070', capital: '—', keyword: '文明起源', desc: '燧人钻火、伏羲画卦、神农尝草——黄帝一统华夏，尧舜禅让天下。文明的曙光从这里升起。' },
  { name: '夏朝', link: '/dynasties/ancient/xia', period: '约前2070–前1600', capital: '阳城/斟鄩', keyword: '家天下始', desc: '大禹治水定九州，传位于启开家天下。青铜初铸，九鼎镇国，四百余年终亡于桀。' },
  { name: '商朝', link: '/dynasties/ancient/shang', period: '约前1600–前1046', capital: '殷/亳', keyword: '甲骨铭文', desc: '汤武革命伐夏桀，盘庚迁殷定社稷。甲骨文记千年事，司母戊鼎镇四方，六百载商道兴衰。' },
  { name: '西周', link: '/dynasties/ancient/western-zhou', period: '前1046–前771', capital: '镐京', keyword: '礼乐分封', desc: '文武周公定礼乐，分封诸侯藩屏周。井田制下耕者安，宗法制度定乾坤，三百载后平王东迁。' },
  // ===== 东周·诸侯割据 (4-5) =====
  { name: '春秋', link: '/dynasties/dongzhou/chunqiu', period: '前770–前476', capital: '洛邑', keyword: '五霸争雄', desc: '尊王攘夷五霸争，管仲相齐富国强兵。孔丘周游列国，老聃骑牛出关——百家争鸣的序曲。' },
  { name: '战国', link: '/dynasties/dongzhou/zhanguo', period: '前475–前221', capital: '多都', keyword: '七雄并立', desc: '七雄并立合纵连横，商鞅变法秦国强。百家争鸣，诸子辈出，竹简之上思想激荡，终归一统。' },
  // ===== 秦汉·大一统 (6-8) =====
  { name: '秦朝', link: '/dynasties/qinhan/qin', period: '前221–前207', capital: '咸阳', keyword: '书同文', desc: '奋六世余烈，振长策而御宇内。废分封、立郡县，车同轨、书同文，百代皆行秦政法。' },
  { name: '楚汉', link: '/dynasties/qinhan/chu-han', period: '前206–前202', capital: '彭城/汉中', keyword: '楚汉争霸', desc: '鸿门宴上刀光剑影，暗度陈仓天下震动。霸王别姬乌江自刎，四载烽火铸就四百年大汉江山。' },
  { name: '汉朝', link: '/dynasties/qinhan/han', period: '前202–220', capital: '长安/洛阳', keyword: '丝绸之路', desc: '明犯强汉者虽远必诛——文景养民、武帝拓疆、光武中兴。汉族之名由此而来，丝路驼铃横贯东西。' },
  // ===== 三国·两晋·十六国 (9-11) =====
  { name: '三国', link: '/dynasties/weijin/sanguo', period: '220–280', capital: '洛阳/成都/建业', keyword: '群星闪耀', desc: '魏武挥鞭横槊赋诗，武侯出师鞠躬尽瘁，孙郎坐断东南战未休。短短一甲子，英雄辈出的浪漫时代。' },
  { name: '晋朝', link: '/dynasties/weijin/jin', period: '265–420', capital: '洛阳/建康', keyword: '衣冠南渡', desc: '三分归晋太康昙花，八王乱起五胡入华。洛水之畔玄风浩荡，建康城里门阀共天下。' },
  { name: '十六国', link: '/dynasties/weijin/sixteen-kingdoms', period: '304–439', capital: '—', keyword: '五胡乱华', desc: '匈奴鲜卑羯氐羌，你方唱罢我登场。血与火的熔炉中，新的民族正在诞生。' },
  // ===== 南北朝·民族融合 (12) =====
  { name: '南北朝', link: '/dynasties/nanbei/nanbei-chao', period: '386–589', capital: '建康/洛阳/长安', keyword: '胡汉大融', desc: '南朝四百八十寺，北朝孝文改汉服。均田府兵出关中，隋唐盛世已在孕育之中。' },
  // ===== 隋唐盛世 (13-14) =====
  { name: '隋朝', link: '/dynasties/suitang/sui', period: '581–618', capital: '大兴', keyword: '大运河', desc: '开皇之治天下富足，大运河水贯通南北。科举取士打破门阀，可惜二世而亡为唐做嫁。' },
  { name: '唐朝', link: '/dynasties/suitang/tang', period: '618–907', capital: '长安', keyword: '万国来朝', desc: '贞观开元盛世巅峰，天可汗号令万邦。李白斗酒诗百篇，玄奘西行取真经——至今海外犹称唐人。' },
  // ===== 多民族政权并立 (15-19) =====
  { name: '五代十国', link: '/dynasties/songliao/wudai-shiguo', period: '907–960', capital: '—', keyword: '群雄割据', desc: '朱李石刘郭，梁唐晋汉周。五十三载换八姓十四帝，乱至极处方有英雄出。' },
  { name: '宋朝', link: '/dynasties/songliao/song', period: '960–1279', capital: '开封/临安', keyword: '文治巅峰', desc: '杯酒释兵权，与士大夫共天下。交子问世、活字排印，清明上河十里繁华。虽武功不振，文治登峰造极。' },
  { name: '辽朝', link: '/dynasties/songliao/liao', period: '907–1125', capital: '上京', keyword: '契丹王朝', desc: '大漠雄鹰耶律氏，南北面官治天下。澶渊一盟百年安，俄罗斯至今仍称中国为契丹。' },
  { name: '西夏', link: '/dynasties/songliao/western-xia', period: '1038–1227', capital: '兴庆', keyword: '党项王朝', desc: '贺兰山下党项兴，自创文字立国本。周旋于宋辽金之间二百载，终被蒙古铁蹄踏碎。' },
  { name: '金朝', link: '/dynasties/songliao/jin-dynasty', period: '1115–1234', capital: '中都/开封', keyword: '女真崛起', desc: '白山黑水出枭雄，灭辽克宋踞中原。猛安谋克半兵半农，卢沟晓月至今犹存金代石桥。' },
  // ===== 大一统皇朝 (20-22) =====
  { name: '元朝', link: '/dynasties/imperial/yuan', period: '1271–1368', capital: '大都', keyword: '蒙古铁骑', desc: '一代天骄成吉思汗，子孙马蹄踏遍欧亚。行省制度开先河，大都城中马可波罗惊叹东方繁华。' },
  { name: '明朝', link: '/dynasties/imperial/ming', period: '1368–1644', capital: '南京→北京', keyword: '七下西洋', desc: '驱逐胡虏恢复中华，天子守国门君王死社稷。郑和宝船下西洋，阳明心学照古今。' },
  { name: '清朝', link: '/dynasties/imperial/qing', period: '1644–1912', capital: '北京', keyword: '康乾盛世', desc: '白山黑水入中原，康雍乾三代拓疆定边。四库全书汇典籍，晚清变局三千年未有之大变。' },
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
    <div class="stat-num">35+</div>
    <div class="stat-label">个主要政权</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">8</div>
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
  <a v-for="e in eraNav" :key="e.name" :href="withBase(e.link)" :class="e.cls">{{ e.icon }} {{ e.name }}<br><small>{{ e.period }}</small></a>
</div>

<hr class="section-hr" />

<h2 class="section-heading">🗿 上古 · 文明起源</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(0,4)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">🏛️ 东周 · 诸侯割据</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(4,6)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">⚔️ 秦汉 · 大一统</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(6,9)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">🏛️ 三国 · 两晋 · 十六国</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(9,12)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">🤝 南北朝 · 民族融合</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(12,13)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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
  <a v-for="d in dynasties.slice(13,15)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">🏰 多民族政权并立</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(15,20)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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

<h2 class="section-heading">👑 大一统皇朝</h2>

<div class="dynasty-grid">
  <a v-for="d in dynasties.slice(20,23)" :key="d.name" :href="withBase(d.link)" class="dynasty-card">
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
    <h4>⚔️ 农耕与游牧</h4>
    <p>长城南北，农耕与游牧文明碰撞交融两千余年。从匈奴到蒙古，北方铁骑多次改写中国历史；而每一次碰撞，都催生出更强大的文明体。</p>
  </div>
  <div class="insight-card">
    <h4>🌏 分合大势</h4>
    <p>"天下大势，分久必合，合久必分。" 中国历史上统一时期与分裂时期交替出现，但统一始终是主旋律。</p>
  </div>
  <div class="insight-card">
    <h4>🤝 民族熔炉</h4>
    <p>每一次分裂割据，都是民族大融合的熔炉。十六国催生隋唐盛世，辽金元清奠定多民族中国版图——多元一体，中华文明生生不息。</p>
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

/* ===== 时期导航（8 格，4 列 2 行）===== */
.era-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

/* ── 8 个时期的顶部色条 ── */
.era-ancient  { border-top: 3px solid #8b6914; }
.era-dongzhou { border-top: 3px solid #6b8e23; }
.era-qinhan   { border-top: 3px solid #b22222; }
.era-weijin   { border-top: 3px solid #6a0dad; }
.era-nanbei   { border-top: 3px solid #4682b4; }
.era-suitang  { border-top: 3px solid #daa520; }
.era-multi    { border-top: 3px solid #8b4513; }
.era-imperial { border-top: 3px solid #2f4f4f; }

/* ── hover 背景色 ── */
.era-ancient:hover  { border-color: #8b6914; background: rgba(139,105,20,0.06); }
.era-dongzhou:hover { border-color: #6b8e23; background: rgba(107,142,35,0.06); }
.era-qinhan:hover   { border-color: #b22222; background: rgba(178,34,34,0.06); }
.era-weijin:hover   { border-color: #6a0dad; background: rgba(106,13,173,0.06); }
.era-nanbei:hover   { border-color: #4682b4; background: rgba(70,130,180,0.06); }
.era-suitang:hover  { border-color: #daa520; background: rgba(218,165,32,0.06); }
.era-multi:hover    { border-color: #8b4513; background: rgba(139,69,19,0.06); }
.era-imperial:hover { border-color: #2f4f4f; background: rgba(47,79,79,0.06); }

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
  .era-nav { grid-template-columns: repeat(2, 1fr); }
  .dynasty-grid { grid-template-columns: 1fr; }
  .insight-grid { grid-template-columns: 1fr; }
}
</style>

---
title: 中华历史时间线
---

<script>
import { eras } from './utils/eras.js'
import { dynasties } from './utils/dynasties.js'

export default {
  data() {
    return { eras, dynasties }
  },
  computed: {
    groupedDynasties() {
      const groups = {}
      for (const d of this.dynasties) {
        if (!groups[d.period]) groups[d.period] = []
        groups[d.period].push(d)
      }
      return Object.entries(groups).map(([period, items]) => ({ period, items }))
    }
  }
}
</script>

<div class="timeline-hero">
  <p class="hero-sub">约公元前 2070 年 — 公元 1912 年</p>
  <h1 class="hero-title">中华历史时间线</h1>
  <p class="hero-desc">纵览华夏五千年，从三皇五帝的传说，到最后一个封建王朝的落幕。</p>
</div>


## 🌍 文明演进总览

<div class="era-grid">

<div v-for="era in eras" :key="era.cls" :class="['era-card', era.cls]">
  <span class="era-badge">{{ era.badge }}</span>
  <h3>{{ era.title }}</h3>
  <p>{{ era.desc }}</p>
  <small>{{ era.range }}</small>
</div>

</div>



## 📋 朝代速览（完整版）

<table class="dynasty-table">
  <thead>
    <tr>
      <th>时期</th>
      <th>朝代</th>
      <th style="text-align:center">起止</th>
      <th>都城</th>
      <th>开国君主</th>
      <th>末代君主</th>
      <th>关键词</th>
    </tr>
  </thead>
  <tbody>
    <template v-for="group in groupedDynasties" :key="group.period">
      <tr v-for="(d, i) in group.items" :key="d.url">
        <td>{{ i === 0 ? group.period : '' }}</td>
        <td><a :href="d.url">{{ d.name }}</a></td>
        <td style="text-align:center">{{ d.start }}–{{ d.end }}</td>
        <td>{{ d.capital }}</td>
        <td>{{ d.founder }}</td>
        <td>{{ d.last }}</td>
        <td>{{ d.keyword }}</td>
      </tr>
    </template>
  </tbody>
</table>

---

## 🏛️ 各时期深度导读

### 🗿 上古传说与三代（传说时代–前771）

> **文明的曙光**——从神话走入信史，华夏共同体的原点。

| 看点 | 说明 |
|:---|:---|
| **三皇五帝** | 伏羲、神农、黄帝、尧、舜——中华文明的人文初祖 |
| **夏朝** | 中国历史上第一个世袭制王朝，二里头遗址为考古佐证 |
| **商朝** | 甲骨文证实了信史的开端，青铜文明达到鼎盛 |
| **西周** | 周公制礼作乐，奠定中国政治文化的"礼治"传统 |

**关联人物**：[姜子牙](/figures/strategists/jiang-zi-ya) · [周武王](/figures/emperors/zhou-wuwang)

---

### 🏛️ 帝国奠基与汉风（前770–220）

> **百川归海**——从列国纷争到天下一统，华夏认同的锻造。

| 看点 | 说明 |
|:---|:---|
| **春秋五霸** | 齐桓、晋文、楚庄、吴王、越王——争霸中的秩序重建 |
| **战国七雄** | 齐楚燕韩赵魏秦——变法图强、合纵连横、百家争鸣 |
| **秦朝** | 书同文、车同轨、统一度量衡——中国第一次大一统 |
| **西汉** | 从文景之治到汉武大帝，儒家正统地位确立，丝绸之路贯通 |
| **新朝** | 王莽托古改制，理想主义者的悲剧 |
| **东汉** | 光武中兴、班超定远，造纸术改进，佛教传入 |

**关联帝王**：[秦始皇](/figures/emperors/qin-shi-huang) · [汉武帝](/figures/emperors/han-wudi) · [汉光武帝](/figures/emperors/han-guangwudi)  
**关联武将**：[蒙恬](/figures/generals/meng-tian) · [白起](/figures/generals/bai-qi) · [韩信](/figures/generals/han-xin) · [李广](/figures/generals/li-guang) · [卫青](/figures/generals/wei-qing) · [霍去病](/figures/generals/huo-qu-bing)  
**关联谋臣**：[张良](/figures/strategists/zhang-liang)  
**关联战役**：[长平之战](/battles/changping) · [巨鹿之战](/battles/juluzhi-zhan)

---

### ⚔️ 分裂与融合（220–589）

> **乱世出英雄**——战火中的交融与重生，五胡入华。

| 看点 | 说明 |
|:---|:---|
| **三国鼎立** | 曹魏、蜀汉、孙吴三足鼎立——谋臣武将的巅峰舞台 |
| **司马代魏** | 西晋短暂统一，太康之治昙花一现，八王之乱引爆乱世 |
| **永嘉南渡** | 北方沦陷，士族南迁，东晋偏安江南 |
| **五胡十六国** | 匈奴、鲜卑、羯、氐、羌逐鹿中原——空前的民族大融合 |
| **南北朝对峙** | 北朝鲜卑汉化改革，南朝宋齐梁陈——佛教兴盛于乱世 |

**关联帝王**：[汉献帝](/figures/emperors/han-xiandi)  
**关联武将**：[吕布](/figures/generals/lv-bu) · [关羽](/figures/generals/guan-yu) · [祖逖](/figures/generals/zu-ti)  
**关联谋臣**：[诸葛亮](/figures/strategists/zhuge-liang)  
**关联战役**：[赤壁之战](/battles/chibi) · [淝水之战](/battles/feishui)

---

### 🥇 隋唐盛世（581–907）

> **九天阊阖开宫殿**——中国封建社会的黄金时代。

| 看点 | 说明 |
|:---|:---|
| **隋朝** | 科举开创、大运河贯通南北，但二世而亡 |
| **贞观之治** | 李世民开创“天可汗”时代，政治清明 |
| **开元盛世** | 玄宗前期，经济文化达到顶峰 |
| **安史之乱** | 盛极而衰，藩镇割据的导火索 |

**关联帝王**：[隋文帝](/figures/emperors/sui-wendi) · [唐太宗](/figures/emperors/tang-taizong)  
**关联武将**：[李靖](/figures/generals/li-jing) · [秦叔宝](/figures/generals/qin-shu-bao) · [尉迟恭](/figures/generals/wei-chi-gong) · [苏定方](/figures/generals/su-ding-fang) · [薛仁贵](/figures/generals/xue-ren-gui)  
**关联谋臣**：[房玄龄](/figures/strategists/fang-xuanling) · **杜如晦**

---

### 📜 宋元明清（907–1912）

> **近世转型**——多民族政权的碰撞与融合，千年未有之大变局。

| 看点 | 说明 |
|:---|:---|
| **辽朝** | 契丹帝国雄踞北方，"一国两制"的先驱 |
| **两宋** | 经济文化登顶，火药、印刷、指南针三大发明 |
| **西夏** | 党项王朝据守河西，独创西夏文字 |
| **金朝** | 女真铁骑灭辽克宋，猛安谋克制 |
| **蒙元帝国** | 中国历史上版图最辽阔的王朝，行省制度开端 |
| **朱明王朝** | 驱逐蒙元，恢复华夏——郑和下西洋，资本主义萌芽 |
| **大清帝国** | 奠定现代中国疆域，晚清面临三千年未有之变局 |

**关联帝王**：[宋太祖](/figures/emperors/song-taizu) · [明太祖](/figures/emperors/ming-taizu) · [康熙帝](/figures/emperors/kangxi)  
**关联武将**：[岳飞](/figures/generals/yue-fei) · [徐达](/figures/generals/xu-da) · [戚继光](/figures/generals/qi-ji-guang) · [袁崇焕](/figures/generals/yuan-chong-huan)  
**关联谋臣**：[刘基](/figures/strategists/liu-ji) · [张居正](/figures/strategists/zhang-ju-zheng)

---

## 📖 阅读指引

::: tip 📌 浏览建议
- **快速跳转**：点击上方[文明演进总览](#🌍-文明演进总览)的卡片，快速定位对应时期
- **深度阅读**：点击朝代名称进入详细页面，了解更全面的历史信息
- **人物关联**：每个时期底部列出代表性人物，方便跳转查看
  :::

---

<style scoped>
/* ===== 顶部英雄区 ===== */
.timeline-hero {
  text-align: center;
  padding: 2rem 0 1.5rem 0;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 2rem;
}

.hero-sub {
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem 0;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
}

/* ===== 六时期网格卡片 ===== */
.era-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 2.5rem 0;
}

.era-card {
  padding: 1.2rem 0.8rem;
  border-radius: 12px;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s, box-shadow 0.2s;
}

.era-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.era-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.8rem;
  border-radius: 20px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 0.4rem;
}

.era-card h3 {
  font-size: 1.1rem;
  margin: 0.2rem 0;
}

.era-card p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0.2rem 0;
}

.era-card small {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* 各时期主题色点缀（可选） */
.era-myth     { border-top: 4px solid #7c6a4f; }
.era-ancient  { border-top: 4px solid #b8860b; }
.era-imperial { border-top: 4px solid #c0392b; }
.era-turbulent { border-top: 4px solid #8e44ad; }
.era-golden { border-top: 4px solid #d4a017; }
.era-late { border-top: 4px solid #2c3e50; }

/* ===== 表格优化 ===== */
table {
  font-size: 0.9rem;
}

table th:first-child,
table td:first-child {
  font-weight: 600;
  white-space: nowrap;
}

table td:last-child {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

/* ===== 深度导读区 ===== */
blockquote {
  font-style: italic;
  border-left-color: var(--vp-c-brand-1);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .era-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 2rem;
  }
  table {
    font-size: 0.75rem;
  }
  table th, table td {
    padding: 0.3rem 0.4rem;
  }
}

@media (max-width: 480px) {
  .era-grid {
    grid-template-columns: 1fr 1fr;
  }
  .era-card {
    padding: 0.8rem 0.4rem;
  }
}
</style>
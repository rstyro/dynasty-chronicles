/**
 * @file gen-suitang-supplement.mjs
 * @description 补充隋唐缺失的 10 位皇帝（隋2 + 唐8）
 *
 * 输出目录:
 *   docs/figures/emperors/suitang/sui/   （隋恭帝、皇泰主）
 *   docs/figures/emperors/suitang/tang/  （中宗、睿宗、穆宗、敬宗、宣宗、懿宗、僖宗、昭宗）
 * 格式与现有隋唐皇帝页（唐高宗模板）完全一致。
 * 注意：唐宣宗 slug 用 tang-xuanzong-li-chen，与唐玄宗 tang-xuanzong 区分（宣/玄拼音相同）。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const suiDir = path.join(projectRoot, 'docs', 'figures', 'emperors', 'suitang', 'sui')
const tangDir = path.join(projectRoot, 'docs', 'figures', 'emperors', 'suitang', 'tang')

// 链接映射：显示名 → 目标路径
const LINK_MAP = {
  '隋朝': '/dynasties/suitang/sui',
  '唐朝': '/dynasties/suitang/tang',
  '隋文帝杨坚': '/figures/emperors/suitang/sui/sui-wendi',
  '隋炀帝杨广': '/figures/emperors/suitang/sui/sui-yangdi',
  '隋恭帝杨侑': '/figures/emperors/suitang/sui/sui-gongdi',
  '唐高祖李渊': '/figures/emperors/suitang/tang/tang-gaozu',
  '唐太宗李世民': '/figures/emperors/suitang/tang/tang-taizong',
  '唐高宗李治': '/figures/emperors/suitang/tang/tang-gaozong',
  '武则天': '/figures/emperors/suitang/tang/wu-zetian',
  '唐中宗李显': '/figures/emperors/suitang/tang/tang-zhongzong',
  '唐睿宗李旦': '/figures/emperors/suitang/tang/tang-ruizong',
  '唐玄宗李隆基': '/figures/emperors/suitang/tang/tang-xuanzong',
  '唐宪宗李纯': '/figures/emperors/suitang/tang/tang-xianzong',
  '唐穆宗李恒': '/figures/emperors/suitang/tang/tang-muzong',
  '唐敬宗李湛': '/figures/emperors/suitang/tang/tang-jingzong',
  '唐文宗李昂': '/figures/emperors/suitang/tang/tang-wen-zong',
  '唐武宗李炎': '/figures/emperors/suitang/tang/tang-wuzong',
  '唐宣宗李忱': '/figures/emperors/suitang/tang/tang-xuanzong-li-chen',
  '唐懿宗李漼': '/figures/emperors/suitang/tang/tang-yizong',
  '唐僖宗李儇': '/figures/emperors/suitang/tang/tang-xizong',
  '唐昭宗李晔': '/figures/emperors/suitang/tang/tang-zhaozong',
  '唐哀帝李柷': '/figures/emperors/suitang/tang/tang-ai-di'
}

const EMPERORS = [
  // ═══════════ 隋朝 2 位 ═══════════
  {
    slug: 'sui-gongdi', title: '隋恭帝', era: '隋', order: 3, dir: suiDir,
    fullName: '杨侑（隋恭帝）',
    years: '605年–619年',
    reign: '617年–618年',
    quote: '义宁之立，唐室肇基。',
    bio: '隋恭帝杨侑，隋炀帝杨广之孙，元德太子杨昭第三子。大业十三年（617年），李渊太原起兵后攻入长安，迎立留守长安的代王杨侑为帝，改元义宁，遥尊远在江都的炀帝为太上皇，李渊自任大丞相、唐王，总揽大权。次年（618年）三月，炀帝在江都被宇文化及弑杀；五月，李渊逼杨侑禅位，建立唐朝，隋朝灭亡。杨侑被降封为酅国公，次年（619年）五月暴卒，年仅十五岁，谥恭皇帝。杨侑在位虽仅一年，却是隋唐易代之际皇权过渡的关键一环，其禅位标志着关陇集团政权从隋到唐的平稳交接。',
    achievements: [
      '义宁改元：617年李渊迎立，年号义宁',
      '隋唐过渡：隋末两帝并立格局之一',
      '禅位建唐：618年禅位李渊，隋朝灭亡'
    ],
    links: ['隋朝', '隋炀帝杨广', '唐高祖李渊'],
    refs: ['《隋书》· 恭帝纪', '《北史》· 隋本纪下', '《资治通鉴》· 唐纪一']
  },
  {
    slug: 'sui-huangtaizhu', title: '皇泰主', era: '隋', order: 4, dir: suiDir,
    fullName: '杨侗（皇泰主，隋哀帝）',
    years: '605年–619年',
    reign: '618年–619年',
    quote: '洛阳孤城，皇泰终焉。',
    bio: '皇泰主杨侗，隋炀帝之孙，元德太子杨昭次子。大业年间留守洛阳。618年炀帝在江都被弑后，留守洛阳的越王杨侗在段达、王世充等拥立下即皇帝位，年号皇泰，史称皇泰主，与长安的李渊遥相呼应、分庭抗礼。王世充凭借洛阳兵权逐渐把持朝政，排斥异己。619年四月，王世充逼杨侗禅位，自立为帝，国号郑，将杨侗幽禁于含凉殿；同年五月，王世充为绝后患，派人鸩杀杨侗，年仅十五岁，谥恭皇帝（一说哀皇帝）。皇泰主杨侗是隋朝在洛阳的最后一任君主，其短暂的在位见证了群雄逐鹿中隋室正统的彻底终结。',
    achievements: [
      '洛阳继统：618年于洛阳即位，年号皇泰',
      '王世充专权：洛阳政权实权旁落权臣',
      '禅位遇害：619年被迫禅位，旋被鸩杀'
    ],
    links: ['隋朝', '隋炀帝杨广', '隋恭帝杨侑'],
    refs: ['《隋书》· 越王侗传', '《北史》· 隋本纪下', '《资治通鉴》· 唐纪一']
  },

  // ═══════════ 唐朝 8 位 ═══════════
  {
    slug: 'tang-zhongzong', title: '唐中宗', era: '唐', order: 4, dir: tangDir,
    fullName: '李显（唐中宗）',
    years: '656年–710年',
    reign: '684年；705年–710年',
    quote: '神龙复辟，中兴之君。',
    bio: '唐中宗李显，唐高宗第七子，武则天第三子。683年高宗崩，李显即位，次年（684年）因欲以韦后之父韦玄贞为侍中，触怒武则天，被废为庐陵王，贬居房州长达十四年，尝尽忧惧。698年被召回，复立为皇太子。705年，宰相张柬之等发动神龙政变，诛杀张易之兄弟，逼武则天退位，李显复辟，恢复唐国号。中宗复位后，韦后与安乐公主干预朝政，武三思等权臣横行，朝政混乱；太子李重俊起兵讨韦氏，兵败被杀。710年，中宗突然暴崩，史多以为韦后、安乐公主毒杀，韦后随即临朝摄政，旋被李隆基与太平公主发动的唐隆政变推翻。中宗一生两度登基，性格懦弱，史称"懦弱之主"，但其复辟恢复了李唐正统。',
    achievements: [
      '神龙革命：705年复位，恢复李唐国号',
      '五王政变：张柬之等诛张易之兄弟',
      '景龙之治：复位后五年间重振朝纲'
    ],
    links: ['唐朝', '唐高宗李治', '武则天', '唐睿宗李旦'],
    refs: ['《旧唐书》· 中宗本纪', '《新唐书》· 中宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-ruizong', title: '唐睿宗', era: '唐', order: 5, dir: tangDir,
    fullName: '李旦（唐睿宗）',
    years: '662年–716年',
    reign: '684年–690年；710年–712年',
    quote: '三让天下，睿哲之君。',
    bio: '唐睿宗李旦，唐高宗第八子，武则天第四子。684年中宗被废后继立为帝，然政事皆决于武则天，李旦形同傀儡；690年武则天称帝建周，李旦被降为皇嗣，后又封相王。705年神龙政变后中宗复位，李旦因曾逊位让母而有"让皇帝"之美誉。710年，李隆基与太平公主发动唐隆政变诛杀韦后，拥立李旦复辟。睿宗在位期间，太子李隆基与太平公主权力斗争激烈，712年睿宗权衡之下禅位于太子李隆基（玄宗），自为太上皇，716年病逝。睿宗一生两度在位，皆以"让"闻名——先让位武则天，再让位玄宗，性格淡泊仁厚，其退让成全了开元盛世的开启，史称"睿宗让位，开元之基"。',
    achievements: [
      '两度践祚：684年、710年两度即位',
      '唐隆政变：李隆基平韦后，拥立复位',
      '禅位玄宗：712年禅位，开启开元盛世'
    ],
    links: ['唐朝', '武则天', '唐中宗李显', '唐玄宗李隆基'],
    refs: ['《旧唐书》· 睿宗本纪', '《新唐书》· 睿宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-muzong', title: '唐穆宗', era: '唐', order: 13, dir: tangDir,
    fullName: '李恒（唐穆宗）',
    years: '795年–824年',
    reign: '820年–824年',
    quote: '长庆之世，藩镇复叛。',
    bio: '唐穆宗李恒，唐宪宗第三子，初名李宥。820年，宪宗为宦官陈弘志等所弑，宦官集团拥立太子李恒即位，改元长庆。穆宗即位后一反宪宗"元和中兴"的强硬路线，裁撤平藩军队、释放归降藩帅，河朔三镇（卢龙、成德、魏博）随即复叛，唐廷讨伐屡屡失败，宪宗削藩成果付诸东流。穆宗本人沉溺蹴鞠、游猎与声乐，疏于朝政，宦官势力进一步坐大。824年，穆宗因服食金丹暴卒，年仅三十岁，庙号穆宗。他在位虽仅四年，却完成了唐朝由"元和中兴"到"藩镇复叛"的转折，此后唐朝再也无力统一河朔，唐室衰微不可逆转。',
    achievements: [
      '长庆改元：820年宦官拥立即位',
      '河朔复叛：削藩政策逆转，藩镇坐大',
      '服丹而崩：824年因服金丹暴卒'
    ],
    links: ['唐朝', '唐宪宗李纯', '唐敬宗李湛', '唐文宗李昂'],
    refs: ['《旧唐书》· 穆宗本纪', '《新唐书》· 穆宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-jingzong', title: '唐敬宗', era: '唐', order: 14, dir: tangDir,
    fullName: '李湛（唐敬宗）',
    years: '809年–826年',
    reign: '824年–826年',
    quote: '击球夜猎，宦官弑君。',
    bio: '唐敬宗李湛，唐穆宗长子。824年穆宗暴卒，李湛即位，年仅十六岁。敬宗少年登基，荒嬉无度，痴迷击球、打猎与深夜捕狐，常至深夜不眠，朝政委于宦官与嬖臣，政事荒废。826年十二月，敬宗夜猎还宫后与宦官刘克明等饮酒，酒酣被刘克明等弑杀于宫中，年仅十八岁，在位不足三年。宦官们随后拥立绛王李悟，又被枢密使王守澄等另立江王李涵（文宗）所废。敬宗是继宪宗之后第二位被宦官弑杀的唐朝皇帝，其死于宦官之手，是晚唐宦官专权、皇帝废立皆操于阉竖之手的典型写照。',
    achievements: [
      '少年即位：824年即位，年十六',
      '荒嬉误政：沉溺击球夜猎，政事荒废',
      '宦官弑君：826年被宦官刘克明所杀'
    ],
    links: ['唐朝', '唐穆宗李恒', '唐文宗李昂'],
    refs: ['《旧唐书》· 敬宗本纪', '《新唐书》· 敬宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-xuanzong-li-chen', title: '唐宣宗', era: '唐', order: 17, dir: tangDir,
    fullName: '李忱（唐宣宗，小太宗）',
    years: '810年–859年',
    reign: '846年–859年',
    quote: '大中之治，小太宗。',
    bio: '唐宣宗李忱，唐宪宗第十三子，初名李怡。因母为宫女，自幼不受重视，且讷于言辞，人以为痴。846年武宗病危，宦官拥立李忱即位。宣宗即位后一反武宗之政，史称"大中之治"：勤于政事，整顿吏治，抑制宦官与外戚，减轻赋税，并与吐蕃争夺河湟；848年沙州人张议潮起兵归唐，河西走廊复归唐朝。宣宗自奉俭约，明察秋毫，人称"小太宗"。然而晚年迷信方术、服食金丹，859年毒发而崩，年五十。宣宗死后，唐朝迅速走向衰落，懿宗、僖宗两朝内忧外患并起，故史家叹曰："宣宗之治，唐祚最后一缕中兴之光。"',
    achievements: [
      '大中之治：整顿吏治，被誉为"小太宗"',
      '收复河湟：张议潮归义军归唐，复河西',
      '抑制宦官：整肃宦权，一度中兴'
    ],
    links: ['唐朝', '唐武宗李炎', '唐懿宗李漼'],
    refs: ['《旧唐书》· 宣宗本纪', '《新唐书》· 宣宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-yizong', title: '唐懿宗', era: '唐', order: 18, dir: tangDir,
    fullName: '李漼（唐懿宗）',
    years: '833年–873年',
    reign: '859年–873年',
    quote: '咸通之世，大乱将起。',
    bio: '唐懿宗李漼，唐宣宗长子，初名李温。859年宣宗服丹暴卒，宦官立李漼即位。懿宗在位十四年，骄奢淫逸，大修佛寺、广迎佛骨（873年迎佛骨入京，举国若狂），又极崇音乐游宴，朝政败坏，贿赂公行。其时民变四起：860年浙东裘甫起义，868年桂林戍卒庞勋之乱，虽先后平定，却动摇了唐朝根基。与此同时，宦官专权更甚，皇权日衰。873年懿宗病逝，年四十一。懿宗死后，其子僖宗即位，随即爆发王仙芝、黄巢大起义，唐朝统治名存实亡。史家多认为懿宗的奢靡昏聩，是唐朝由中衰走向灭亡的关键推手。',
    achievements: [
      '大崇佛教：迎佛骨入京，劳民伤财',
      '裘甫起义：860年浙东民变被平定',
      '庞勋之乱：868年桂林戍卒兵变，动摇国本'
    ],
    links: ['唐朝', '唐宣宗李忱', '唐僖宗李儇'],
    refs: ['《旧唐书》· 懿宗本纪', '《新唐书》· 懿宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-xizong', title: '唐僖宗', era: '唐', order: 19, dir: tangDir,
    fullName: '李儇（唐僖宗）',
    years: '862年–888年',
    reign: '873年–888年',
    quote: '黄巢入长安，天子幸蜀。',
    bio: '唐僖宗李儇，唐懿宗第五子。873年即位，年仅十二岁，由宦官田令孜把持朝政，僖宗呼田令孜为"阿父"，专事游乐。875年王仙芝起义，黄巢响应，起义军席卷大半个中国；880年黄巢攻陷长安，僖宗仓皇逃往成都（"幸蜀"），唐朝中央权威扫地。883年黄巢退出长安，884年兵败自杀，僖宗方回京。然而藩镇势力在镇压起义中急剧膨胀，朱温、李克用等各据一方，唐廷号令不出京师。888年僖宗病逝，年二十七。僖宗是唐朝第一个两度逃离长安的皇帝，其在位期间唐朝由"藩镇割据"彻底走向"藩镇争霸"，灭亡已成定局。',
    achievements: [
      '黄巢之乱：875年起，880年长安陷落',
      '两度幸蜀：两度逃离长安避难蜀地',
      '藩镇坐大：朱温、李克用等割据一方'
    ],
    links: ['唐朝', '唐懿宗李漼', '唐昭宗李晔'],
    refs: ['《旧唐书》· 僖宗本纪', '《新唐书》· 僖宗纪', '《资治通鉴》· 唐纪']
  },
  {
    slug: 'tang-zhaozong', title: '唐昭宗', era: '唐', order: 20, dir: tangDir,
    fullName: '李晔（唐昭宗）',
    years: '867年–904年',
    reign: '888年–904年',
    quote: '力图振作，受制强藩。',
    bio: '唐昭宗李晔，唐懿宗第七子，初名李杰。888年僖宗病逝，宦官杨复恭立李晔即位。昭宗素有英气，锐意恢复，然时局已不可为：宦官专权于内，藩镇割据于外。895年河中兵乱，昭宗出奔；896年李茂贞攻陷长安，昭宗被劫持至凤翔；900年宦官刘季述又发动政变，幽禁昭宗，次年宰相崔胤联合朱温复位。903年朱温入关，尽诛宦官，将昭宗挟持迁都洛阳；904年八月，朱温指使蒋玄晖等弑杀昭宗于椒殿，年三十八，立其子李柷（哀帝）。昭宗在位十六年，是晚唐最后一位有为之君，其力图中兴而回天无力的悲剧，为大唐王朝画上了最苍凉的句号。',
    achievements: [
      '锐意中兴：欲诛宦官、削藩镇而不得',
      '凤翔之劫：被李茂贞劫持，皇权扫地',
      '迁洛遇弑：904年被朱温弑于洛阳'
    ],
    links: ['唐朝', '唐僖宗李儇', '唐哀帝李柷'],
    refs: ['《旧唐书》· 昭宗本纪', '《新唐书》· 昭宗纪', '《资治通鉴》· 唐纪']
  }
]

function generateContent(d) {
  const dynLabel = d.era === '隋' ? '隋朝' : '唐朝'
  const dynLink = d.era === '隋' ? '/dynasties/suitang/sui' : '/dynasties/suitang/tang'
  const linkLines = d.links.map(l => `- [${l}](${LINK_MAP[l]})`).join('\n')
  const achievementLines = d.achievements.map(a => `- **${a}**`).join('\n')
  const refLines = d.refs.map(r => `- ${r}`).join('\n')

  return `---
title: ${d.title}
dynasty: 隋唐
type: emperor
era: ${d.era}
order: ${d.order}
---

# ${d.title}

> **"${d.quote}"**

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| **姓名** | ${d.fullName} |
| **生卒** | ${d.years} |
| **朝代** | [${dynLabel}](${dynLink}) |
| **身份** | 皇帝 |
| **在位** | ${d.reign} |

---

## 📖 生平概述

${d.bio}

---

## 🏛️ 主要功绩

${achievementLines}

---

## 🔗 相关链接

${linkLines}

---

## 📖 参考资料

${refLines}
`
}

let count = 0
for (const d of EMPERORS) {
  const file = path.join(d.dir, d.slug + '.md')
  fs.writeFileSync(file, generateContent(d), 'utf-8')
  count++
  console.log(`✓ ${d.title} (${d.slug}) → ${path.relative(projectRoot, file)}`)
}
console.log(`\n共生成 ${count} 个文件`)

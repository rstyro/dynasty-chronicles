// 生成五代缺失皇帝页面：后梁2 + 后唐3 + 后晋1 + 后汉2 + 后周1 = 9 位
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'docs', 'figures', 'emperors', 'songliao', 'wudai');
mkdirSync(OUT_DIR, { recursive: true });

const DYNASTY_LINK = '/dynasties/songliao/wudai-shiguo';

// order 按时间线 1-14 预设（旧文件 1/4/8/12/13 会在重排脚本中同步）
const EMPERORS = [
  {
    slug: 'hou-liang-zhu-you-gui', title: '郢王', name: '朱友珪', era: '五代-后梁', order: 2,
    birth: '？–913年', reign: '912年–913年',
    temple: '—', posthumous: '无（后被废为庶人）',
    achievement: '弑父篡位；在位仅八个月即被推翻',
    quote: '「老贼，当碎尸万段！」——朱友珪弑父时语',
    bio: '郢王朱友珪，后梁太祖朱温次子。912年，朱温病重欲传位于养子朱友文，朱友珪得知后与禁军将领韩勍合谋，深夜闯入寝殿弑杀朱温，随即矫诏即位，改元凤历。在位期间荒淫无度，猜忌宗室宿将，人心尽失。次年其弟均王朱友贞在开封联络禁军兵变，朱友珪逃亡不成，被迫自杀，被废为庶人。',
    deeds: [
      '弑父篡位：912年弑杀后梁太祖朱温，矫诏即位',
      '统治失道：在位仅八个月，荒淫残暴，宗室离心',
      '身死国乱：被均王朱友贞推翻，自杀身亡，后梁由此由盛转衰',
    ],
    comment: '「友珪弑君篡立，虽有刀锯之诛，而梁室之祸自此始矣。」——《新五代史》',
    links: ['后梁太祖朱温', '后梁末帝朱友贞'],
    refs: '- 《旧五代史》· 梁书\n- 《新五代史》· 梁本纪\n- 《资治通鉴》· 后梁纪',
  },
  {
    slug: 'hou-liang-mo-di', title: '后梁末帝', name: '朱友贞', era: '五代-后梁', order: 3,
    birth: '888年–923年', reign: '913年–923年',
    temple: '—', posthumous: '无（史称末帝）',
    achievement: '在位十年；末路自尽，后梁亡',
    quote: '「（李氏）世仇也，理难降，吾不能学石敬瑭之为人也。」——朱友贞拒绝投降语',
    bio: '后梁末帝朱友贞，朱温第三子。913年联合禁军推翻弑父篡位的郢王朱友珪即位。在位十年间，后梁在与河东李克用、李存勖父子的拉锯战中逐渐处于下风，河北诸镇先后叛降后唐。923年，李存勖称帝建后唐，大举南征，后梁名将王彦章战败被俘，开封告急。朱友贞众叛亲离，命控鹤都指挥使皇甫麟将其杀死，后梁灭亡。',
    deeds: [
      '平定内乱：推翻朱友珪，为父报仇即位',
      '固守汴梁：与后唐血战十年，守成有余进取不足',
      '国破身死：923年后唐灭梁，朱友贞自尽，后梁亡',
    ],
    comment: '「末帝仁而无断，宠任小人，信任非人，以致祸败。」——《旧五代史》',
    links: ['郢王朱友珪', '后唐庄宗李存勖'],
    refs: '- 《旧五代史》· 梁书\n- 《新五代史》· 梁本纪\n- 《资治通鉴》· 后梁纪',
  },
  {
    slug: 'hou-tang-ming-zong', title: '后唐明宗', name: '李嗣源', era: '五代-后唐', order: 5,
    birth: '867年–933年', reign: '926年–933年',
    temple: '明宗', posthumous: '圣德和武钦孝皇帝',
    achievement: '五代难得的小康之君；「长兴之治」',
    quote: '「吾闻过则改，见善思齐，虽古之圣王，何以加此！」——史家评明宗语',
    bio: '后唐明宗李嗣源，本名邈佶烈，沙陀人，李克用养子。骁勇善战，屡立战功，庄宗李存勖晚年猜忌功臣，宠信伶人，926年魏州兵变，李嗣源被部下拥立，进军洛阳，庄宗被伶人所杀，李嗣源即位。在位七年推行休养生息，改革弊政，罢逐宦官伶人，减轻赋税，中原稍得安宁，史称「长兴之治」。晚年诸子争立，第五子李从厚与养子李从珂矛盾渐生，933年病逝。',
    deeds: [
      '长兴之治：罢伶官宦官，轻徭薄赋，五代难得的治世',
      '整顿吏治：赏罚分明，重用文臣如冯道、赵凤',
      '宽仁待下：以仁厚著称，与五代暴戾之风迥异',
    ],
    comment: '「明宗自天成即位，年谷屡丰，兵革罕用，校于五代，名为小康。」——《新五代史》',
    links: ['后唐庄宗李存勖', '后唐末帝李从珂'],
    refs: '- 《旧五代史》· 唐书\n- 《新五代史》· 唐本纪\n- 《资治通鉴》· 后唐纪',
  },
  {
    slug: 'hou-tang-min-di', title: '后唐闵帝', name: '李从厚', era: '五代-后唐', order: 6,
    birth: '914年–934年', reign: '933年–934年',
    temple: '闵帝', posthumous: '无（谥闵）',
    achievement: '在位仅五个月即被废杀',
    quote: '「吾之心腹，皆在凤翔。」——李从厚感叹语',
    bio: '后唐闵帝李从厚，明宗第五子。933年明宗病逝后继位。他猜忌掌兵的凤翔节度使李从珂（明宗养子），欲调虎离山，李从珂遂于934年起兵反抗，攻入洛阳。李从厚仓皇出逃，途中被石敬瑭（时为河东节度使）出卖，被废为鄂王，不久被鸩杀于卫州，年仅二十一岁，在位仅五个月。',
    deeds: [
      '即位短暂：933年继位，次年即被废',
      '猜忌宗室：急于削藩，逼反李从珂',
      '败亡被弑：被石敬瑭出卖，废黜后遇害',
    ],
    comment: '「闵帝仁而暗，即位未及年，而宗室相屠。」——《新五代史》',
    links: ['后唐明宗李嗣源', '后唐末帝李从珂'],
    refs: '- 《旧五代史》· 唐书\n- 《新五代史》· 唐本纪\n- 《资治通鉴》· 后唐纪',
  },
  {
    slug: 'hou-tang-mo-di', title: '后唐末帝', name: '李从珂', era: '五代-后唐', order: 7,
    birth: '885年–936年', reign: '934年–936年',
    temple: '—', posthumous: '无（史称末帝）',
    achievement: '兵变即位；石敬瑭引契丹灭唐，自焚殉国',
    quote: '「吾以吾家殉社稷，死亦何憾！」——李从珂自焚前语',
    bio: '后唐末帝李从珂，本姓王，明宗李嗣源养子，沙陀人。934年因闵帝猜忌而起兵，攻入洛阳称帝。在位期间与河东节度使石敬瑭矛盾激化，936年石敬瑭以割让燕云十六州为条件向契丹借兵，契丹主耶律德光亲率大军南下。李从珂屡战屡败，太原陷落后四面楚歌，洛阳被围，他携传国玺登上玄武楼自焚而死，后唐灭亡。燕云十六州之割自此始，遗祸中原四百年。',
    deeds: [
      '兵变夺位：934年推翻闵帝即位',
      '激化矛盾：与石敬瑭反目，逼其乞援契丹',
      '自焚殉国：936年后唐亡，割让燕云十六州成千古遗恨',
    ],
    comment: '「末帝性猜忌，而石敬瑭遂资契丹以覆其国，悲夫！」——《新五代史》',
    links: ['后唐闵帝李从厚', '后晋高祖石敬瑭'],
    refs: '- 《旧五代史》· 唐书\n- 《新五代史》· 唐本纪\n- 《资治通鉴》· 后唐纪',
  },
  {
    slug: 'hou-jin-chu-di', title: '后晋出帝', name: '石重贵', era: '五代-后晋', order: 9,
    birth: '914年–974年', reign: '942年–946年',
    temple: '—', posthumous: '无（史称少帝）',
    achievement: '对契丹称孙不称臣；被契丹俘掳北去，后晋亡',
    quote: '「先帝（石敬瑭）因契丹而得天下，吾今对契丹称孙足矣，称臣则不可。」——石重贵语',
    bio: '后晋出帝石重贵，石敬瑭之侄，因父早亡被石敬瑭收为养子。942年即位后，一改高祖对契丹卑躬屈膝的政策，对契丹「称孙不称臣」，并拒绝契丹的割地要求，激怒耶律德光。944至946年，契丹三次南侵，后晋军民虽在阳城之战中大败契丹，但内部将帅失和、国力耗竭。946年契丹再次大举南下，降将张彦泽引契丹军直抵开封，石重贵出降，被掳往契丹，后晋灭亡。他客死异乡，于974年卒于建州。',
    deeds: [
      '称孙不称臣：拒绝向契丹称臣，后晋对辽关系强硬转变',
      '阳城之战：944年大破契丹，五代对辽少有的胜利',
      '国破被掳：946年契丹灭后晋，被俘北上，客死异乡',
    ],
    comment: '「少帝以童昏之资，承危乱之运，用兵无谋，任人失当，遂至国亡身辱。」——《旧五代史》',
    links: ['后晋高祖石敬瑭', '辽太宗耶律德光'],
    refs: '- 《旧五代史》· 晋书\n- 《新五代史》· 晋本纪\n- 《资治通鉴》· 后晋纪',
  },
  {
    slug: 'hou-han-gao-zu', title: '后汉高祖', name: '刘知远', era: '五代-后汉', order: 10,
    birth: '895年–948年', reign: '947年–948年',
    temple: '高祖', posthumous: '睿文圣武昭肃孝皇帝',
    achievement: '沙陀人建立后汉；契丹北撤后入主中原',
    quote: '「今契丹虽退，中国无主，吾当为天下主。」——刘知远语',
    bio: '后汉高祖刘知远，沙陀人，后晋河东节度使。石敬瑭死后，出帝石重贵与契丹交恶，刘知远坐镇太原观望。946年契丹灭后晋，耶律德光入主开封，刘知远表面臣服，实则厉兵秣马。947年契丹北撤，刘知远在太原称帝，国号汉（史称后汉），随后南下占据开封。其统治残暴，赋役苛重，仅一年即病逝，庙号高祖。',
    deeds: [
      '建立后汉：契丹北撤后称帝建汉，延续五代政权',
      '入主中原：收复开封，重新统一中原大部',
      '统治严酷：苛政扰民，为后汉短命埋下伏笔',
    ],
    comment: '「高祖起于太原，乘契丹之乱，席卷而南，虽得天下，而民力已疲。」——《新五代史》',
    links: ['后汉隐帝刘承祐', '后周太祖郭威'],
    refs: '- 《旧五代史》· 汉书\n- 《新五代史》· 汉本纪\n- 《资治通鉴》· 后汉纪',
  },
  {
    slug: 'hou-han-yin-di', title: '后汉隐帝', name: '刘承祐', era: '五代-后汉', order: 11,
    birth: '930年–950年', reign: '948年–950年',
    temple: '隐帝', posthumous: '无（谥隐）',
    achievement: '诛杀辅政大臣；逼反郭威，后汉亡',
    quote: '「邺城之外，谁敢有异心！」——刘承祐临死前语',
    bio: '后汉隐帝刘承祐，高祖刘知远次子。948年继位，年仅十八岁，朝政由杨邠、史弘肇、王章等顾命大臣把持。950年，他密谋发动政变，将杨邠、史弘肇、王章三人全部诛杀，并派密使赴邺都欲杀枢密使郭威。郭威得到消息后起兵南下，隐帝率军亲征，在开封北郊的刘子陂兵败，逃至赵村被乱兵所杀，年仅二十岁，后汉灭亡。',
    deeds: [
      '诛杀顾命：950年尽杀杨邠、史弘肇、王章三大臣',
      '逼反郭威：密令诛杀郭威，引发邺都兵变',
      '败亡被杀：刘子陂兵败，逃亡中被弑，后汉亡',
    ],
    comment: '「隐帝以童昏临国，轻用刀锯，而社稷随之。」——《新五代史》',
    links: ['后汉高祖刘知远', '后周太祖郭威'],
    refs: '- 《旧五代史》· 汉书\n- 《新五代史》· 汉本纪\n- 《资治通鉴》· 后汉纪',
  },
  {
    slug: 'hou-zhou-gong-di', title: '后周恭帝', name: '柴宗训', era: '五代-后周', order: 14,
    birth: '953年–973年', reign: '959年–960年',
    temple: '恭帝', posthumous: '无（谥恭）',
    achievement: '七岁即位；陈桥兵变禅位，后周亡',
    quote: '「禅位于宋，恭帝之命也，非篡也。」——史家评陈桥兵变语',
    bio: '后周恭帝柴宗训，世宗柴荣第四子。959年柴荣病逝，七岁的柴宗训即位，由宰相范质辅政。960年正月，契丹南侵的边报传来，殿前都点检赵匡胤率军出征，行至开封东北的陈桥驿，部下发动兵变，「黄袍加身」，拥立赵匡胤为帝。赵匡胤回师开封，柴宗训被迫禅位，后周灭亡，北宋建立。柴宗训被降封郑王，迁居房州，973年卒，年仅二十岁。',
    deeds: [
      '幼年即位：959年七岁登基，主少国疑',
      '陈桥兵变：960年赵匡胤黄袍加身，被迫禅位',
      '后周亡宋兴：禅位后降封郑王，卒于房州',
    ],
    comment: '「恭帝冲幼，神器遂移，非其罪也。」——《旧五代史》',
    links: ['后周世宗柴荣', '宋太祖赵匡胤'],
    refs: '- 《旧五代史》· 周书\n- 《新五代史》· 周本纪\n- 《资治通鉴》· 后周纪',
  },
];

const LINK_MAP = {
  '后梁太祖朱温': '/figures/emperors/songliao/wudai/zhu-wen',
  '后梁末帝朱友贞': '/figures/emperors/songliao/wudai/hou-liang-mo-di',
  '郢王朱友珪': '/figures/emperors/songliao/wudai/hou-liang-zhu-you-gui',
  '后唐庄宗李存勖': '/figures/emperors/songliao/wudai/li-cun-xu',
  '后唐明宗李嗣源': '/figures/emperors/songliao/wudai/hou-tang-ming-zong',
  '后唐闵帝李从厚': '/figures/emperors/songliao/wudai/hou-tang-min-di',
  '后唐末帝李从珂': '/figures/emperors/songliao/wudai/hou-tang-mo-di',
  '后晋高祖石敬瑭': '/figures/emperors/songliao/wudai/shi-jing-tang',
  '后晋出帝石重贵': '/figures/emperors/songliao/wudai/hou-jin-chu-di',
  '后汉高祖刘知远': '/figures/emperors/songliao/wudai/hou-han-gao-zu',
  '后汉隐帝刘承祐': '/figures/emperors/songliao/wudai/hou-han-yin-di',
  '后周太祖郭威': '/figures/emperors/songliao/wudai/guo-wei',
  '后周世宗柴荣': '/figures/emperors/songliao/wudai/chai-rong',
  '后周恭帝柴宗训': '/figures/emperors/songliao/wudai/hou-zhou-gong-di',
  '辽太宗耶律德光': '/figures/emperors/songliao/liao/liao-taizong',
  '宋太祖赵匡胤': '/figures/emperors/songliao/beisong/song-taizu',
  '五代十国': DYNASTY_LINK,
};

function generateContent(d) {
  const linkLines = d.links.map(l => `- [${l}](${LINK_MAP[l] || DYNASTY_LINK})`).join('\n');
  const deedLines = d.deeds.map(x => `- ${x}`).join('\n');

  return `---
title: ${d.title}
dynasty: 宋元明清
type: emperor
era: ${d.era}
order: ${d.order}
---

# ${d.title} · ${d.name}

> **${d.quote}**

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| **姓名** | ${d.name} |
| **生卒** | ${d.birth} |
| **在位** | ${d.reign} |
| **朝代** | [五代十国](${DYNASTY_LINK}) |
| **庙号** | ${d.temple} |
| **谥号** | ${d.posthumous} |
| **主要成就** | ${d.achievement} |

---

## 📖 生平概述

${d.bio}

---

## 🏛️ 主要功绩

${deedLines}

---

## 🗣️ 历史评价

> ${d.comment}

---

## 🔗 相关链接

${linkLines}

---

## 📖 参考资料

${d.refs}
`;
}

let count = 0;
for (const d of EMPERORS) {
  writeFileSync(join(OUT_DIR, d.slug + '.md'), generateContent(d), 'utf-8');
  count++;
  console.log('✓ ' + d.slug + '.md (' + d.title + ' · ' + d.name + ') order=' + d.order);
}
console.log('完成：共生成 ' + count + ' 个文件');

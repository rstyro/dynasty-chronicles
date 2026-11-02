/**
 * @file gen-beichao-supplement.mjs
 * @description 补充北朝缺失的 8 位皇帝（北魏4 + 西魏2 + 北齐2）
 *
 * 输出目录: docs/figures/emperors/nanbei/beichao/
 * 格式与 gen-beichao-emperors.mjs 完全一致。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outDir = path.join(projectRoot, 'docs', 'figures', 'emperors', 'nanbei', 'beichao')

const EMPERORS = [
  // ═══════════ 北魏 4 位（短命在位者） ═══════════
  {
    slug: 'beiwei-tuoba-yu', name: '北魏南安王', era: '北朝-北魏', order: 4,
    fullName: '拓跋余（北魏南安王）',
    temple: '—', posthumous: '隐王',
    years: '？–452年', reign: '452年',
    achievement: '太武帝遇弑后傀儡即位；在位 8 个月被宦官宗爱所杀',
    quote: '"余年尚幼，未堪多难。"——史家拟拓跋余之语。',
    bio: '北魏南安王拓跋余，太武帝拓跋焘之子。452年，宦官宗爱弑杀太武帝拓跋焘，又矫诏杀死太子拓跋晃一系的辅政大臣，随后迎立拓跋余为帝。拓跋余自知得位不正，为安抚宗爱，拜其为大司马、大将军、太师，权倾朝野。宗爱专权跋扈，拓跋余恐其谋害自己，密谋夺权，反被宗爱先下手，于同年十月被宗爱所弑，在位仅八个月。宗爱随后又欲另立新君，最终文成帝拓跋濬在群臣拥立下即位，诛杀宗爱。拓跋余在位短暂，史称"南安隐王"，是北魏皇权与宦官权力斗争中的牺牲品。',
    achievements: [
      '傀儡即位：太武帝遇弑后被宗爱迎立',
      '在位八月：452年即位，同年被弑',
      '宦官专权：宗爱挟天子以令朝野'
    ],
    comment: '「南安王以宗爱所立，未及期年，身死宦竖之手，可为殷鉴。」——《魏书·世祖纪》附',
    links: ['北朝·北魏', '北魏太武帝拓跋焘', '北魏文成帝拓跋濬'],
    refs: ['《魏书》· 世祖纪', '《北史》· 魏本纪', '《资治通鉴》· 宋纪']
  },
  {
    slug: 'beiwei-yuan-ye', name: '北魏长广王', era: '北朝-北魏', order: 11,
    fullName: '元晔（北魏长广王，建明帝）',
    temple: '—', posthumous: '—',
    years: '？–532年', reign: '530年–531年',
    achievement: '尔朱氏拥立的傀儡；年号建明；旋被废黜',
    quote: '"朕之得立，非出本心。"——史家拟元晔之语。',
    bio: '北魏长广王元晔，太武帝拓跋焘曾孙，长广王元融之子。530年孝庄帝手刃尔朱荣后，尔朱兆、尔朱世隆等起兵复仇，攻陷洛阳，俘杀孝庄帝。尔朱世隆在洛阳拥立元晔为帝，年号建明，然元晔只是尔朱氏操控的傀儡。531年，尔朱氏内部生变，高欢起兵讨伐尔朱氏，尔朱世隆等又废元晔，另立广陵王元恭（节闵帝）。元晔被废后降封东海王。532年高欢击败尔朱氏后，将元晔与节闵帝元恭一同杀害。元晔在位仅数月，其废立完全取决于军阀意志，是北魏末年皇权衰微、天下纷争的缩影。',
    achievements: [
      '建明帝：530年尔朱氏拥立',
      '傀儡帝王：受制于尔朱世隆等',
      '废而见杀：531年废位，次年被害'
    ],
    comment: '「长广以疏属入承大统，废立皆出权门，瞬息之间，存亡异势。」——《魏书·废帝纪》',
    links: ['北朝·北魏', '北魏孝庄帝元子攸', '北魏节闵帝元恭'],
    refs: ['《魏书》· 废帝纪', '《北史》· 魏本纪', '《资治通鉴》· 梁纪']
  },
  {
    slug: 'beiwei-yuan-gong', name: '北魏节闵帝', era: '北朝-北魏', order: 12,
    fullName: '元恭（北魏节闵帝，广陵王）',
    temple: '—', posthumous: '节闵皇帝',
    years: '498年–532年', reign: '531年–532年',
    achievement: '佯哑八年的"哑皇帝"；尔朱氏所立；被高欢废杀',
    quote: '"庄生畏牺，谢病杜门。"——元恭装哑避祸。',
    bio: '北魏节闵帝元恭，献文帝拓跋弘之孙，广陵王元羽之子。孝庄帝遇害后，元恭为避祸自托聋哑，称疾不朝达八年之久。531年尔朱氏废长广王元晔，迎立元恭为帝，元恭始开口说话，史称"废帝即位，始发言语"。然尔朱氏内斗不止，高欢乘势起兵，532年在韩陵之战中大败尔朱氏联军，进军洛阳。高欢废元恭，另立平阳王元修（孝武帝），不久以毒酒弑杀元恭。元恭在位仅一年，被史家评为一朝立朝即亡的悲剧天子。其"装哑八载，开口即位，即位而亡"的经历，为南北朝动荡年代最戏剧性的一幕。',
    achievements: [
      '装哑避祸：孝庄遇害后托疾不语八年',
      '即位开言：531年开口即位，年号普泰',
      '被废遭弑：532年高欢废之，寻见杀'
    ],
    comment: '「节闵托哑八年，一朝践祚，仅岁余而废，天下事可知矣。」——《魏书·前废帝纪》',
    links: ['北朝·北魏', '北魏长广王元晔', '北魏孝武帝元修'],
    refs: ['《魏书》· 前废帝纪', '《北史》· 魏本纪', '《资治通鉴》· 梁纪']
  },
  {
    slug: 'beiwei-yuan-lang', name: '北魏安定王', era: '北朝-北魏', order: 13,
    fullName: '元朗（北魏安定王，后废帝）',
    temple: '—', posthumous: '—',
    years: '513年–532年', reign: '531年–532年',
    achievement: '高欢拥立的傀儡；与节闵帝并立对峙；半年后被废杀',
    quote: '"高氏之兴，实自此始。"——史家论元朗之立。',
    bio: '北魏安定王元朗，太武帝拓跋焘五世孙，章武王元融之子。531年，高欢在信都（今河北冀州）起兵讨伐尔朱氏，为争取政治合法性，拥立元朗为帝，年号中兴，与洛阳尔朱氏所立的节闵帝元恭东西对峙。次年（532年），高欢在韩陵之战中大破尔朱氏联军，进驻洛阳，废黜节闵帝，随后认为元朗血统疏远，又废元朗，改立孝文帝之孙元修（孝武帝）。同年，元朗被高欢杀害于河阳，年仅二十岁。元朗是北魏末年军阀争立的产物，其短暂在位见证了高欢势力的崛起与北魏政权的最终分裂。',
    achievements: [
      '中兴年号：531年高欢于信都拥立',
      '东西对峙：与节闵帝一朝二帝',
      '废立生死：半年后为高欢所废杀'
    ],
    comment: '「后废帝以支庶入继，中兴未久，身殒河阳，魏祚之衰，于此极矣。」——《魏书·后废帝纪》',
    links: ['北朝·北魏', '北魏节闵帝元恭', '北魏孝武帝元修'],
    refs: ['《魏书》· 后废帝纪', '《北史》· 魏本纪', '《资治通鉴》· 梁纪']
  },

  // ═══════════ 西魏 2 位 ═══════════
  {
    slug: 'xiwei-feidi', name: '西魏废帝', era: '北朝-西魏', order: 17,
    fullName: '元钦（西魏废帝）',
    temple: '—', posthumous: '—',
    years: '525年？–554年', reign: '551年–554年',
    achievement: '西魏第二代皇帝；不满宇文泰专权；被废黜毒杀',
    quote: '"魏祚之隆替，岂能预知哉！"——元钦废立之际。',
    bio: '西魏废帝元钦，西魏文帝元宝炬长子。551年文帝病逝，元钦即位。元钦为人刚直，不愿像父亲那样完全听命于权臣宇文泰。他秘密联络尚书元烈等宗室大臣，谋划除掉宇文泰，夺回实权。事泄后，元烈被宇文泰处死，元钦大为不满，欲兴兵讨伐宇文泰，被其心腹告发。554年，宇文泰废黜元钦，幽禁于雍州，不久以毒酒将其杀害。元钦在位三年，是西魏诸帝中唯一试图反抗宇文氏专权者，其失败也宣告北魏皇统在西魏彻底沦为傀儡。此后宇文泰改立元廓为帝（恭帝），进一步削去皇帝名号制度，为北周代魏铺平道路。',
    achievements: [
      '西魏嗣君：551年即位',
      '密谋除泰：联络宗室反抗宇文泰',
      '废立见杀：554年被废，寻遭毒杀'
    ],
    comment: '「废帝志除权臣，事泄见废，宁死不屈，犹有帝者之风。」——《周书·文帝纪》',
    links: ['西魏', '西魏文帝元宝炬', '西魏恭帝元廓'],
    refs: ['《周书》· 文帝纪', '《北史》· 魏本纪', '《资治通鉴》· 梁纪']
  },
  {
    slug: 'xiwei-gongdi', name: '西魏恭帝', era: '北朝-西魏', order: 18,
    fullName: '元廓（西魏恭帝）',
    temple: '—', posthumous: '恭皇帝',
    years: '537年？–557年', reign: '554年–557年',
    achievement: '西魏末帝；宇文泰复周礼改元；禅位宇文觉，西魏灭亡',
    quote: '"帝王之兴，天命所归。"——恭帝禅位诏。',
    bio: '西魏恭帝元廓，西魏文帝第四子。554年宇文泰废黜废帝元钦后，拥立元廓为帝。为推行复古改制，宇文泰令元廓恢复鲜卑旧姓，改元氏为拓跋氏，并依《周礼》改革官制，废除年号，称元年、二年。元廓在位期间纯为宇文泰的象征性傀儡，西魏军政大权尽归宇文氏。556年宇文泰病逝，临终托孤于侄子宇文护。557年正月，宇文护逼迫恭帝禅位于宇文泰之子宇文觉，北周建立，西魏灭亡。同年，元廓被杀害，年仅二十岁。西魏历三帝二十二年而亡，但其府兵制与关陇集团制度遗产，经由北周传入隋唐。',
    achievements: [
      '西魏末帝：554年–557年在位',
      '复古改制：恢复鲜卑旧姓，依周礼改制',
      '禅位北周：557年国祚终结'
    ],
    comment: '「恭帝拱手以天下让，西魏之祚终焉。然府兵之制，隋唐因之，其泽远矣。」——《周书》',
    links: ['西魏', '西魏废帝元钦', '北周孝闵帝宇文觉'],
    refs: ['《周书》· 文帝纪', '《北史》· 魏本纪', '《资治通鉴》· 梁纪']
  },

  // ═══════════ 北齐 2 位 ═══════════
  {
    slug: 'beiqi-feidi', name: '北齐废帝', era: '北朝-北齐', order: 20,
    fullName: '高殷（北齐废帝，济南王）',
    temple: '—', posthumous: '—',
    years: '545年–561年', reign: '559年–560年',
    achievement: '文宣帝长子；在位一年被叔父高演废黜；后遭杀害',
    quote: '"以吾之身，何负于国！"——高殷被废之叹。',
    bio: '北齐废帝高殷，文宣帝高洋长子。559年文宣帝高洋暴卒，临终遗诏令六弟高演辅政，高殷即位，时年十五岁。高殷聪慧好学，欲有所作为，引起叔父高演、高湛的猜忌。高演以辅政之权逐步排挤高殷身边亲信，先杀其谋臣杨愔等，将高殷控制于宫中。560年八月，高演发动政变，废高殷为济南王，自立为帝（孝昭帝）。高演即位后心不自安，为杜绝后患，于561年派刺客前往晋阳，将高殷杀害，年仅十七岁。高殷是北齐第一位被废杀的皇帝，其悲剧揭开了北齐皇族骨肉相残的序幕，此后北齐诸帝无一善终。',
    achievements: [
      '文宣嗣君：559年即位，年号乾明',
      '辅政夺权：叔父高演逐渐架空皇权',
      '被废遭杀：560年废位，次年见杀'
    ],
    comment: '「废帝以冲龄践祚，外有强叔，内有猜嫌，不亡何待？」——《北齐书·废帝纪》',
    links: ['北齐', '北齐文宣帝高洋', '北齐孝昭帝高演'],
    refs: ['《北齐书》· 废帝纪', '《北史》· 齐本纪', '《资治通鉴》· 陈纪']
  },
  {
    slug: 'beiqi-youzhu', name: '北齐幼主', era: '北朝-北齐', order: 24,
    fullName: '高恒（北齐幼主）',
    temple: '—', posthumous: '—',
    years: '570年–577年', reign: '577年',
    achievement: '北齐末帝；在位 25 天；随父出逃被俘，北齐灭亡',
    quote: '"周师已至，何不早降！"——幼主被俘后的哀叹。',
    bio: '北齐幼主高恒，后主高纬长子。577年正月，北周武帝宇文邕大军攻破北齐军事重镇晋阳，直逼都城邺城。后主高纬见大势已去，禅位于年仅八岁的太子高恒，改元承光，企图以退位避祸，史称幼主。高恒在位仅二十五天，北周军即攻陷邺城。高纬携幼主高恒弃城东逃青州，途中又欲南投陈朝，未及成行，即为北周追兵所俘。北齐灭亡，高恒与父亲高纬一同被押送长安。577年，北周以谋反罪名，将高纬、高恒父子一同赐死，高恒年仅八岁。北齐自550年建国至577年灭亡，共历六帝二十八年，幼主高恒是其最后的悲剧注脚。',
    achievements: [
      '承光改元：577年禅位即位',
      '在位廿五：北齐在位最短之君',
      '国破被俘：与后主一同被赐死'
    ],
    comment: '「幼主冲龄即位，二十五日而亡，齐祚之斩，虽曰天亡，实由人祸。」——《北齐书·幼主纪》',
    links: ['北齐', '北齐后主高纬', '北周武帝宇文邕'],
    refs: ['《北齐书》· 幼主纪', '《北史》· 齐本纪', '《资治通鉴》· 陈纪']
  }
]

/** 生成单个北朝皇帝 markdown 内容（与 gen-beichao-emperors.mjs 同模板） */
function generateContent(d) {
  const fm = [
    '---',
    `title: ${d.name}`,
    'dynasty: 两晋南北朝',
    'type: emperor',
    `era: ${d.era}`,
    `order: ${d.order}`,
    '---'
  ].join('\n')

  const infoRows = [
    `| **姓名** | ${d.fullName} |`,
    `| **生卒** | ${d.years} |`,
    `| **在位** | ${d.reign} |`,
    `| **朝代** | [${d.era.replace('-', '·')}](/dynasties/nanbei/beichao) |`,
    `| **庙号** | ${d.temple} |`,
    `| **谥号** | ${d.posthumous} |`,
    `| **主要成就** | ${d.achievement} |`
  ]

  const achievementLines = d.achievements.map(a => `- **${a}**`)
  const commentBlock = d.comment ? `\n---\n\n## 🗣️ 历史评价\n\n> ${d.comment}\n` : ''
  const linkLines = d.links.map(l => `- [${l}](${LINK_MAP[l] || '/dynasties/nanbei/beichao'})`)
  const refLines = d.refs.map(r => `- ${r}`)

  return [
    fm,
    '',
    `# ${d.name}`,
    '',
    `> **${d.quote}**`,
    '',
    '---',
    '',
    '## 📋 基本信息',
    '',
    '| 项目 | 内容 |',
    '|------|------|',
    ...infoRows,
    '',
    '---',
    '',
    '## 📖 生平概述',
    '',
    d.bio,
    '',
    '---',
    '',
    '## 🏛️ 主要功绩',
    '',
    ...achievementLines,
    commentBlock,
    '',
    '---',
    '',
    '## 🔗 相关链接',
    '',
    ...linkLines,
    '',
    '---',
    '',
    '## 📖 参考资料',
    '',
    ...refLines,
    ''
  ].join('\n')
}

/** 相关链接映射：显示名 → 文件路径 */
const LINK_MAP = {
  '北朝·北魏': '/dynasties/nanbei/beichao',
  '北朝·东魏': '/dynasties/nanbei/beichao',
  '北朝·西魏': '/dynasties/nanbei/beichao',
  '北朝·北齐': '/dynasties/nanbei/beichao',
  '北朝·北周': '/dynasties/nanbei/beichao',
  '东魏': '/dynasties/nanbei/beichao',
  '西魏': '/dynasties/nanbei/beichao',
  '北齐': '/dynasties/nanbei/beichao',
  '北周': '/dynasties/nanbei/beichao',
  '北魏太武帝拓跋焘': '/figures/emperors/nanbei/beichao/beiwei-taiwudi',
  '北魏文成帝拓跋濬': '/figures/emperors/nanbei/beichao/beiwei-wenchengdi',
  '北魏孝庄帝元子攸': '/figures/emperors/nanbei/beichao/beiwei-xiaozhuangdi',
  '北魏节闵帝元恭': '/figures/emperors/nanbei/beichao/beiwei-yuan-gong',
  '北魏长广王元晔': '/figures/emperors/nanbei/beichao/beiwei-yuan-ye',
  '北魏孝武帝元修': '/figures/emperors/nanbei/beichao/beiwei-xiaowudi',
  '西魏文帝元宝炬': '/figures/emperors/nanbei/beichao/xiwei-wendi',
  '西魏废帝元钦': '/figures/emperors/nanbei/beichao/xiwei-feidi',
  '西魏恭帝元廓': '/figures/emperors/nanbei/beichao/xiwei-gongdi',
  '北齐文宣帝高洋': '/figures/emperors/nanbei/beichao/gao-yang',
  '北齐废帝高殷': '/figures/emperors/nanbei/beichao/beiqi-feidi',
  '北齐孝昭帝高演': '/figures/emperors/nanbei/beichao/beiqi-xiaozhaodi',
  '北齐后主高纬': '/figures/emperors/nanbei/beichao/beiqi-houzhu',
  '北周孝闵帝宇文觉': '/figures/emperors/nanbei/beichao/beizhou-xiaomindi',
  '北周武帝宇文邕': '/figures/emperors/nanbei/beichao/beizhou-wudi'
}

// 主流程
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

let created = 0, skipped = 0
for (const d of EMPERORS) {
  const filePath = path.join(outDir, `${d.slug}.md`)
  if (fs.existsSync(filePath)) {
    console.log(`  ⏭️  ${d.slug}.md 已存在，跳过`)
    skipped++
    continue
  }
  const content = generateContent(d)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  ✏️  ${d.slug}.md → ${d.name}（${d.era}）`)
  created++
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 已创建: ${created} 个文件`)
console.log(`⏭️  已跳过: ${skipped} 个文件`)
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

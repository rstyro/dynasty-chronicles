// 生成宋辽金缺失皇帝页面：北宋2 + 南宋3 + 辽4 + 金5 = 14 位
// 风格：beisong(精简版) / nansong(无历史评价版) / full(完整版)
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '..', 'docs', 'figures', 'emperors', 'songliao');

const SONG_LINK = '/dynasties/songliao/song';
const LIAO_LINK = '/dynasties/songliao/liao';
const JIN_LINK = '/dynasties/songliao/jin-dynasty';

const EMPERORS = [
  // ─── 北宋（精简版）───
  {
    slug: 'song-ying-zong', title: '宋英宗', name: '赵曙', style: 'beisong', dir: 'beisong', era: '北宋', order: 5,
    birth: '1032年–1067年', reign: '1063年–1067年',
    quote: '1063–1067 ｜ 仁宗养子入继大统——「濮议」之争，在位四年而崩。',
    bio: '宋英宗赵曙，太宗曾孙，濮王赵允让之子，因仁宗无子被养入宫中。1063年仁宗驾崩后继位。即位不久即与朝臣爆发「濮议」之争——为生父濮王赵允让的尊号问题，韩琦、欧阳修等主张称「皇考」，司马光、吕诲等主张称「皇伯」，引发两派激烈党争，最终以称「皇考」收场。在位四年，政治上沿袭仁宗旧政，用韩琦、曾公亮为相，国势平稳。1067年病逝，子神宗继位。',
    deeds: ['濮议之争：为生父尊号引发朝堂大辩论，欧阳修与司马光对垒', '承平守成：沿袭仁宗政策，韩琦、曾公亮辅政', '短祚而终：在位仅四年，三十四岁病逝'],
    refs: '- 《宋史》· 英宗本纪\n- 《续资治通鉴长编》',
  },
  {
    slug: 'song-zhe-zong', title: '宋哲宗', name: '赵煦', style: 'beisong', dir: 'beisong', era: '北宋', order: 7,
    birth: '1076年–1100年', reign: '1085年–1100年',
    quote: '1085–1100 ｜ 元祐更化后亲政——「绍圣绍述」，新法复行。',
    bio: '宋哲宗赵煦，神宗第六子。1085年十岁即位，由祖母宣仁太后高氏垂帘听政，启用司马光废除新法，尽贬新党，史称「元祐更化」。1093年高太后去世，哲宗亲政，改元绍圣，追复王安石新法，贬逐元祐党人，史称「绍圣绍述」。在位期间西夏求和、吐蕃请降，国势一度恢复。但他二十四岁早逝，无子，由弟徽宗赵佶继位，北宋国运急转直下。',
    deeds: ['元祐更化：年幼即位，高太后垂帘，司马光废新法', '绍圣绍述：亲政后复行新法，贬逐元祐党人', '武功恢复：西夏求和、青唐吐蕃内附'],
    refs: '- 《宋史》· 哲宗本纪\n- 《续资治通鉴长编》',
  },
  // ─── 南宋（nansong 版）───
  {
    slug: 'song-guang-zong', title: '宋光宗', name: '赵惇', style: 'nansong', dir: 'nansong', era: '南宋', order: 12,
    birth: '1147年–1200年', reign: '1189年–1194年',
    quote: '1189–1194 ｜ 惧内失明，禅位于子——南宋唯一被逼退位的皇帝。',
    bio: '宋光宗赵惇，孝宗第三子。1189年孝宗禅位于他。光宗惧内，皇后李凤娘悍妒跋扈，把持后宫，光宗长期忧郁成疾，精神失常。1194年孝宗驾崩，光宗称病不执丧礼，朝野哗然。宗室赵汝愚与外戚韩侂胄联合太皇太后，逼光宗禅位于其子赵扩（宁宗），尊光宗为太上皇。光宗因此成为中国历史上被逼退位的皇帝之一，退位后仍时常发病，1200年郁郁而终。',
    deeds: ['惧内之君：皇后李凤娘悍妒，光宗忧郁成疾', '称病不丧：孝宗驾崩不执丧礼，引发朝局危机', '被迫禅位：1194年被逼退位，尊为太上皇'],
    refs: '- 《宋史》· 光宗本纪\n- 《续资治通鉴长编》',
  },
  {
    slug: 'song-ning-zong', title: '宋宁宗', name: '赵扩', style: 'nansong', dir: 'nansong', era: '南宋', order: 13,
    birth: '1168年–1224年', reign: '1194年–1224年',
    quote: '1194–1224 ｜ 庆元党禁、开禧北伐——南宋由盛转衰的关键三十年。',
    bio: '宋宁宗赵扩，光宗次子。1194年因父亲被废而继位。在位三十年，前期韩侂胄专权：1195年制造「庆元党禁」，将理学定为「伪学」，朱熹等五十九人遭禁；1206年韩侂胄发动「开禧北伐」攻金，遭惨败，1207年韩侂胄被史弥远秘密处死，头颅送至金国，南宋签订屈辱的「嘉定和议」，岁币增至银绢各三十万。此后史弥远专权二十余年，南宋政治走向腐败。宁宗本人仁厚木讷，1124年病逝，无子。',
    deeds: ['庆元党禁：理学被禁为「伪学」，朱熹遭打击', '开禧北伐：1206年攻金惨败，韩侂胄被杀', '嘉定和议：增岁币求和，史弥远专权'],
    refs: '- 《宋史》· 宁宗本纪\n- 《续资治通鉴长编》',
  },
  {
    slug: 'song-duan-zong', title: '宋端宗', name: '赵昰', style: 'nansong', dir: 'nansong', era: '南宋', order: 17,
    birth: '1269年–1278年', reign: '1276年–1278年',
    quote: '1276–1278 ｜ 临安陷落后的流亡小朝廷——病逝硇洲，南宋余晖。',
    bio: '宋端宗赵昰，度宗长子。1276年元军破临安，恭帝出降，陆秀夫、张世杰、陈宜中拥赵昰在福州即位，是为端宗。元军随后南下，流亡政权辗转泉州、潮州、广州，一路逃亡海上，屡遭元军追击。1277年井澳之役，端宗在海上遭遇飓风，落水受惊成疾，1278年病逝于硇洲岛（今广东湛江），年仅九岁。其弟赵昺继位，翌年崖山海战，南宋亡。',
    deeds: ['临安陷落：1276年恭帝出降，赵昰福州即位', '海上流亡：辗转东南沿海，屡遭元军追击', '病逝硇洲：井澳飓风受惊成疾，九岁夭亡'],
    refs: '- 《宋史》· 瀛国公本纪\n- 《宋季三朝政要》',
  },
  // ─── 辽（完整版）───
  {
    slug: 'liao-shizong', title: '辽世宗', name: '耶律阮', style: 'full', dir: 'liao', era: '辽', order: 3,
    birth: '919年–951年', reign: '947年–951年',
    temple: '世宗', posthumous: '孝和庄宪皇帝',
    achievement: '东丹王耶律倍之子；皇位传承之争中的过渡皇帝',
    quote: '「世宗以英武之姿，承累世之业，虽享国日浅，而规模宏远。」——《辽史》',
    bio: '辽世宗耶律阮，太祖之孙，东丹王耶律倍长子。947年太宗耶律德光灭后晋北返途中病逝，耶律阮在镇阳被诸将拥立为帝。他仰慕汉文化，重用汉臣，推行汉化，引起契丹旧贵族的强烈不满。948年，叔父耶律李胡与太后述律平起兵争位，被世宗击败。951年，世宗率军南征后周，驻军归化州火神淀，其堂弟耶律察割发动叛乱，将世宗弑杀于帐中，享国仅五年。',
    deeds: ['拥立即位：947年太宗死后被诸将拥立为帝', '平定内乱：击败叔父耶律李胡与述律太后的争位之乱', '推行汉化：重用汉臣，仰慕中原文化', '遇弑而亡：951年被堂弟耶律察割弑于火神淀'],
    comment: '「世宗承太宗之业，而察割之祸作焉，君子是以知契丹之乱未已也。」——《辽史》',
    links: ['辽太宗耶律德光', '辽穆宗耶律璟'],
    refs: '- 《辽史》· 世宗本纪\n- 《资治通鉴》· 后汉纪',
  },
  {
    slug: 'liao-mu-zong', title: '辽穆宗', name: '耶律璟', style: 'full', dir: 'liao', era: '辽', order: 4,
    birth: '931年–969年', reign: '951年–969年',
    temple: '穆宗', posthumous: '孝安正敬皇帝',
    achievement: '嗜酒好杀被称「睡王」；被近侍弑杀',
    quote: '「穆宗荒耽于酒，畋猎无度，以至毙于逆臣之手，可胜叹哉。」——《辽史》',
    bio: '辽穆宗耶律璟，太宗长子。951年火神淀之变后，耶律察割弑世宗自立，耶律璟起兵讨平察割，被拥立为帝。穆宗嗜酒成癖，昼夜酣饮，每饮必醉，醉则睡，人称「睡王」。在位十八年，荒于政事，沉湎田猎，且动辄滥杀，杖毙、肢解近侍与奴隶无数，致使人心惶惶。969年，穆宗在怀州田猎，酒醉酣睡，被不堪虐待的近侍小哥、盥人花哥等六人弑杀于行宫。',
    deeds: ['讨平叛乱：951年平定察割之乱即位', '睡王之名：嗜酒好睡，荒于政事', '滥杀致祸：虐杀近侍，终被近侍弑杀'],
    comment: '「穆宗在位，民不堪命，而弑逆之祸，实其自取。」——《契丹国志》',
    links: ['辽世宗耶律阮', '辽景宗耶律贤'],
    refs: '- 《辽史》· 穆宗本纪\n- 《契丹国志》',
  },
  {
    slug: 'liao-jing-zong', title: '辽景宗', name: '耶律贤', style: 'full', dir: 'liao', era: '辽', order: 5,
    birth: '948年–982年', reign: '969年–982年',
    temple: '景宗', posthumous: '孝成康靖皇帝',
    achievement: '高粱河之战大败宋太宗；皇后萧绰开启女主临朝',
    quote: '「景宗承穆宗暴虐之余，赖萧后以兴文教，抚百姓，辽室赖以中兴。」——《辽史》',
    bio: '辽景宗耶律贤，世宗次子。969年穆宗被弑后继位。景宗体弱多病，军政大事多决于皇后萧绰（承天太后），辽国由此进入女主干政时期。在位期间，对内修明政治，减轻赋税；对外与北宋战争频繁。979年宋太宗亲征幽州，景宗遣耶律休哥、耶律斜轸驰援，高粱河一战大败宋军，宋太宗乘驴车仓皇南逃，辽军自此掌握对宋军事主动权。982年景宗病逝，遗诏军国大事听命于萧绰。',
    deeds: ['高粱河大捷：979年大败宋太宗亲征，宋太宗乘驴车逃走', '萧后辅政：皇后萧绰参决军国大事，女主临朝之始', '内修政理：减轻赋税，任用贤臣，辽室中兴'],
    comment: '「辽自景宗，得萧后之助，渐修文治，而宋室之患自此深矣。」——《宋史纪事本末》',
    links: ['辽穆宗耶律璟', '辽圣宗'],
    refs: '- 《辽史》· 景宗本纪\n- 《续资治通鉴长编》',
  },
  {
    slug: 'liao-xing-zong', title: '辽兴宗', name: '耶律宗真', style: 'full', dir: 'liao', era: '辽', order: 7,
    birth: '1016年–1055年', reign: '1031年–1055年',
    temple: '兴宗', posthumous: '神圣孝章皇帝',
    achievement: '亲征西夏河曲之战大败；重熙增币压北宋',
    quote: '「兴宗亲征西夏，丧师辱国，而反以增币得志于宋，辽之盛极而衰，自此始矣。」——《辽史》',
    bio: '辽兴宗耶律宗真，圣宗长子。1031年即位，前期由生母钦哀皇后萧耨斤摄政。亲政后，于1044年亲率大军征讨西夏，在河曲之战中遭李元昊重创，辽军大败，损失惨重，此为辽对西夏的罕见惨败。为弥补损失，1042年兴宗趁北宋西夏交战之机，陈兵边境，逼迫北宋增加岁币，史称「重熙增币」，宋岁增银绢各十万两匹。兴宗笃信佛教，好文艺，1055年病逝。',
    deeds: ['重熙增币：1042年以军事讹诈迫使北宋增岁币银绢各十万', '河曲之败：1044年亲征西夏大败，辽夏关系逆转', '崇佛好文：大兴佛寺，本人善丹青诗文'],
    comment: '「兴宗好文崇佛，而武备渐弛，辽之衰象已萌。」——《契丹国志》',
    links: ['辽圣宗', '辽道宗'],
    refs: '- 《辽史》· 兴宗本纪\n- 《宋史》· 仁宗本纪',
  },
  // ─── 金（完整版）───
  {
    slug: 'jin-xizong', title: '金熙宗', name: '完颜亶', style: 'full', dir: 'jin', era: '金', order: 3,
    birth: '1119年–1149年', reign: '1135年–1149年',
    temple: '熙宗', posthumous: '弘基缵武庄靖孝成皇帝',
    achievement: '天眷改制推行汉法；晚年诛戮宗室，被海陵王弑',
    quote: '「熙宗始用汉制，定官制，颁新律，而金之文治自此兴焉。」——《金史》',
    bio: '金熙宗完颜亶，太祖嫡孙，太宗养子。1135年太宗病逝后继位。他自幼受汉文化熏陶，即位后推行「天眷改制」：颁行官制，废女真勃极烈旧制，仿唐宋设立三省六部；颁行《皇统新律》；尊孔崇儒，设立国子监。金国政治制度由此走向汉化。然而皇统年间（1141-1149），他猜忌宗室勋贵，先后诛杀完颜宗弼（兀术）之子、完颜宗翰等一大批功臣宿将，又酗酒乱性，滥杀无辜。1149年，被完颜亮（海陵王）合谋弑杀，时年三十一岁。',
    deeds: ['天眷改制：废勃极烈制，立三省六部，颁《皇统新律》', '尊孔崇儒：立国子监，金国文治之始', '皇统大狱：猜忌宗室，诛戮功臣，为海陵所弑'],
    comment: '「熙宗之世，金用汉法，文教渐兴；然猜忌刻薄，卒以弑殒，悲夫。」——《金史》',
    links: ['金太宗', '海陵王'],
    refs: '- 《金史》· 熙宗本纪\n- 《大金国志》',
  },
  {
    slug: 'jin-zhang-zong', title: '金章宗', name: '完颜璟', style: 'full', dir: 'jin', era: '金', order: 6,
    birth: '1168年–1208年', reign: '1189年–1208年',
    temple: '章宗', posthumous: '宪天光运仁文义武神圣英孝皇帝',
    achievement: '明昌之治金朝文治巅峰；蒙金战争拉开序幕',
    quote: '「章宗在位二十年，承世宗治平之业，文物灿然，号称金之极盛。」——《金史》',
    bio: '金章宗完颜璟，世宗之孙。1189年即位。在位二十年，延续世宗「明昌之治」，推行汉化，提倡儒学，完善科举，修《大金集礼》《泰和律》，金朝文治达到巅峰。但后期重用外戚与佞臣，黄河三次大改道导致财政危机。1206年蒙古铁木真（成吉思汗）统一漠北，开始南下侵金，蒙金战争拉开序幕，金国自此由盛转衰。1208年章宗病逝，无子，由叔父完颜永济继位。',
    deeds: ['明昌之治：继承世宗治平之业，金朝文治巅峰', '完善典制：修《泰和律》，定《大金集礼》', '蒙金战争：1206年铁木真南侵，金国盛极而衰'],
    comment: '「章宗优于文治，而武功稍弛，遂使蒙古乘衅而起，金室之不振自此始。」——《金史》',
    links: ['金世宗', '金卫绍王'],
    refs: '- 《金史》· 章宗本纪\n- 《大金国志》',
  },
  {
    slug: 'jin-wei-shao-wang', title: '金卫绍王', name: '完颜永济', style: 'full', dir: 'jin', era: '金', order: 7,
    birth: '1168年–1213年', reign: '1208年–1213年',
    temple: '—', posthumous: '无（被削帝号，称卫绍王）',
    achievement: '在位时蒙古大举南侵；被权臣胡沙虎弑杀',
    quote: '「卫绍王宽厚而懦，当蒙古蜂起之秋，卒以身殉国。」——《金史》',
    bio: '金卫绍王完颜永济，世宗第七子，章宗叔父。1208年章宗无子病逝，永济被拥立为帝。1206年成吉思汗早已统一蒙古，永济即位后，成吉思汗轻蔑地说「中原天子是这种人，也配做皇帝」，于1211年发动大规模南侵，野狐岭一战歼灭金军主力四十万，金国精锐尽丧。永济昏聩无能，措置失当，1213年，权臣纥石烈执中（胡沙虎）发动政变，将永济弑杀于宫中，贬为东海郡侯。',
    deeds: ['蒙古南侵：1211年野狐岭大败，金军主力被歼', '统治无能：面对蒙古入侵措置失当', '被弑而亡：1213年被权臣胡沙虎弑杀'],
    comment: '「卫绍王以庸懦之资，当强敌压境之秋，其败亡宜矣。」——《金史》',
    links: ['金章宗', '金宣宗'],
    refs: '- 《金史》· 卫绍王本纪\n- 《元史》· 太祖本纪',
  },
  {
    slug: 'jin-xuan-zong', title: '金宣宗', name: '完颜珣', style: 'full', dir: 'jin', era: '金', order: 8,
    birth: '1163年–1223年', reign: '1213年–1223年',
    temple: '宣宗', posthumous: '继天兴统述道勤仁英武圣孝皇帝',
    achievement: '迁都汴京弃守中都；南攻南宋三面受敌',
    quote: '「宣宗南迁，弃燕京而都汴，金之势日蹙矣。」——《金史》',
    bio: '金宣宗完颜珣，章宗之兄。1213年胡沙虎弑卫绍王后拥立为帝。即位后蒙古大军兵临中都（今北京），宣宗向成吉思汗求和，纳公主、献金帛。1214年，宣宗惧怕蒙古再犯，决意迁都汴京（今开封），留下太子守中都。次年蒙古军攻破中都，金国祖宗陵寝之地尽失。此后宣宗推行「南攻北守」之策，连年南侵南宋，与南宋两败俱伤，又遭蒙古持续攻掠，三面受敌，国力衰竭。1223年病逝，金国败亡已成定局。',
    deeds: ['迁都汴京：1214年弃守中都南迁，金国大势已去', '中都沦陷：1215年蒙古破中都，金失龙兴之地', '南攻南宋：连年侵宋两败俱伤，三面受敌'],
    comment: '「宣宗南渡之后，谋国不臧，失地丧师，金之亡形具矣。」——《金史》',
    links: ['金卫绍王', '金哀宗'],
    refs: '- 《金史》· 宣宗本纪\n- 《元史》· 太祖本纪',
  },
  {
    slug: 'jin-mo-di', title: '金末帝', name: '完颜承麟', style: 'full', dir: 'jin', era: '金', order: 10,
    birth: '？–1234年', reign: '1234年（一天）',
    temple: '—', posthumous: '无（史称金末帝）',
    achievement: '在位不足一日；蔡州城破，战死阵前',
    quote: '「朕所以付卿者，岂得已哉！徒为朕死尔。」——金哀宗传位语',
    bio: '金末帝完颜承麟，金世祖之后裔，金哀宗完颜守绪的宗室。1233年，金哀宗在蒙古与南宋联军合围下退守蔡州（今河南汝南）。1234年正月，蔡州将破，哀宗深知亡国在即，不愿做亡国之君，遂传位于完颜承麟。承麟即位大典尚未结束，宋蒙联军已攻入城内。承麟率残部巷战，城破后战死于乱军之中，在位不足一日，是中国历史上在位时间最短的皇帝之一，金国就此灭亡。',
    deeds: ['临危受命：1234年蔡州将破时受禅即位', '城破战死：即位当日城陷，巷战阵亡', '金国灭亡：在位不足一日，金朝就此终结'],
    comment: '「金之亡也，承麟以一日之君，死社稷之难，虽亡国，犹有君焉。」——《金史》',
    links: ['金哀宗', '金宣宗'],
    refs: '- 《金史》· 哀宗本纪\n- 《元史》· 太宗本纪',
  },
];

const LINK_MAP = {
  '宋仁宗': '/figures/emperors/songliao/beisong/song-renzong',
  '宋神宗': '/figures/emperors/songliao/beisong/song-shenzong',
  '宋徽宗': '/figures/emperors/songliao/beisong/song-huizong',
  '宋孝宗': '/figures/emperors/songliao/nansong/song-xiaozong',
  '宋宁宗': '/figures/emperors/songliao/nansong/song-ning-zong',
  '辽太宗耶律德光': '/figures/emperors/songliao/liao/liao-taizong',
  '辽世宗耶律阮': '/figures/emperors/songliao/liao/liao-shizong',
  '辽穆宗耶律璟': '/figures/emperors/songliao/liao/liao-mu-zong',
  '辽景宗耶律贤': '/figures/emperors/songliao/liao/liao-jing-zong',
  '辽圣宗': '/figures/emperors/songliao/liao/liao-shengzong',
  '辽兴宗耶律宗真': '/figures/emperors/songliao/liao/liao-xing-zong',
  '辽道宗': '/figures/emperors/songliao/liao/liao-daozong',
  '金太宗': '/figures/emperors/songliao/jin/wan-yan-qi-mai',
  '金熙宗': '/figures/emperors/songliao/jin/jin-xizong',
  '海陵王': '/figures/emperors/songliao/jin/wan-yan-liang',
  '金世宗': '/figures/emperors/songliao/jin/wan-yan-yong',
  '金章宗': '/figures/emperors/songliao/jin/jin-zhang-zong',
  '金卫绍王': '/figures/emperors/songliao/jin/jin-wei-shao-wang',
  '金宣宗': '/figures/emperors/songliao/jin/jin-xuan-zong',
  '金哀宗': '/figures/emperors/songliao/jin/wan-yan-shouxu',
  '金末帝': '/figures/emperors/songliao/jin/jin-mo-di',
};

function renderBeisong(d) {
  const deedLines = d.deeds.map(x => `- ${x}`).join('\n');
  return `---
title: ${d.title}
dynasty: 宋元明清
type: emperor
era: ${d.era}
order: ${d.order}
---

# ${d.title}

> ${d.quote}

---

## 📖 生平

${d.bio}

---

## 📜 主要功绩

${deedLines}

---

## 📖 参考资料

${d.refs}
`;
}

function renderNansong(d) {
  const linkLines = `- [南宋](${SONG_LINK})`;
  const deedLines = d.deeds.map(x => `- **${x}**`).join('\n');
  return `---
title: ${d.title}
dynasty: 宋元明清
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
| **姓名** | ${d.name}（${d.title}） |
| **生卒** | ${d.birth} |
| **朝代** | [南宋](${SONG_LINK}) |
| **身份** | 皇帝 |
| **在位** | ${d.reign} |

---

## 📖 生平概述

${d.bio}

---

## 🏛️ 主要功绩

${deedLines}

---

## 🔗 相关链接

${linkLines}

---

## 📖 参考资料

${d.refs}
`;
}

function renderFull(d) {
  const linkLines = d.links.map(l => `- [${l}](${LINK_MAP[l] || '/dynasties/songliao/song'})`).join('\n');
  const deedLines = d.deeds.map(x => `- **${x}**`).join('\n');
  const eraLink = d.era === '辽' ? LIAO_LINK : JIN_LINK;
  const eraName = d.era === '辽' ? '辽朝' : '金朝';
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
| **朝代** | [${eraName}](${eraLink}) |
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
  const render = d.style === 'beisong' ? renderBeisong : (d.style === 'nansong' ? renderNansong : renderFull);
  writeFileSync(join(BASE, d.dir, d.slug + '.md'), render(d), 'utf-8');
  count++;
  console.log('✓ ' + d.dir + '/' + d.slug + '.md (' + d.title + ') style=' + d.style + ' order=' + d.order);
}
console.log('完成：共生成 ' + count + ' 个文件');

/**
 * @file fix-emperor-order.mjs
 * @description 为帝王目录下所有 markdown 文件添加 order 字段，实现按历史年代排序
 *
 * 帝王侧边栏的子分组内默认按拼音排序，导致历史顺序错乱
 * （如 唐太宗、唐玄宗、武则天 应为 唐太宗→武则天→唐玄宗）。
 * 本脚本为每个帝王文件添加 order 字段，确保侧边栏按历史在位顺序显示。
 *
 * 使用方式：node scripts/fix-emperor-order.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ── 路径设置 ────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const emperorsDir = path.join(projectRoot, 'docs', 'figures', 'emperors')

// ── 帝王排序映射表 ──────────────────────────────────────────
// key: 文件 slug，value: 历史在位顺序序号
// 按朝代分组，每个朝代内按在位先后排序

const EMPEROR_ORDER = {
  // ── 上古三皇五帝（按传说时代先后） ──
  // 三皇：燧人 → 伏羲 → 神农
  // 五帝：黄帝 → 颛顼 → 帝喾 → 尧 → 舜
  'suiren': 1,            // 燧人（三皇之首，钻木取火）
  'fuxi': 2,              // 伏羲（三皇之一，创八卦）
  'shennong': 3,          // 神农/炎帝（三皇之一，农耕医药）
  'huangdi': 4,           // 黄帝（五帝之首，华夏始祖）
  'zhuanxu': 5,           // 颛顼（五帝之一，绝地天通）
  'diku': 6,              // 帝喾（五帝之一，定节气）
  'yao': 7,               // 尧（五帝之一，禅让德政）
  'shun': 8,              // 舜（五帝之一，孝行禅让）

  // ── 夏（按在位先后，共17王） ──
  'yu': 1,                // 禹（开国，治水英雄）
  'xia-qi': 2,            // 启（家天下之始）
  'tai-kang': 3,          // 太康（太康失国）
  'zhong-kang': 4,        // 仲康（太康之弟，后羿拥立的傀儡）
  'xia-xiang': 5,         // 相（仲康之子，寒浞弑之，遗腹子少康）
  'shao-kang': 6,         // 少康（少康中兴）
  'xia-zhu': 7,           // 帝杼（发明甲铠，东征东海，武功极盛）
  'di-huai': 8,           // 帝槐（九夷来朝，承平守成）
  'di-mang': 9,           // 帝芒（沉祭黄河，开祭河之礼）
  'di-xie': 10,           // 帝泄（加封九夷爵命，怀柔四夷）
  'bu-jiang': 11,         // 不降（在位59年夏朝鼎盛，禅让弟扃）
  'di-jiong': 12,         // 帝扃（受兄禅让，守成持重）
  'di-jin': 13,           // 帝廑（迁居西河，夏道始衰）
  'kong-jia': 14,         // 孔甲（孔甲乱夏，四世而陨之始）
  'di-gao': 15,           // 帝皋（孔甲之子，承乱继统）
  'di-fa': 16,            // 帝发（夏桀之父，四世而陨之三世）
  'xia-jie': 17,          // 桀（末帝，鸣条之战亡夏）

  // ── 商（按在位先后，共30王） ──
  'tang-shang': 1,        // 汤（开国，成汤革命）
  'tai-ding': 2,          // 太丁（汤之子，先卒未立）
  'wai-bing': 3,          // 外丙（汤次子，在位3年）
  'zhong-ren': 4,         // 仲壬（汤三子，在位4年）
  'tai-jia': 5,           // 太甲（伊尹放太甲，太宗）
  'wo-ding': 6,           // 沃丁（太甲之子，以礼葬伊尹）
  'tai-geng': 7,          // 太庚（沃丁之弟，守成之君）
  'xiao-jia': 8,          // 小甲（太庚之子，殷道衰之始）
  'yong-ji': 9,           // 雍己（小甲之弟，殷道衰微之始）
  'tai-wu': 10,           // 太戊（雍己之弟，太戊中兴，中宗）
  'zhong-ding': 11,       // 仲丁（太戊之子，九世之乱始，迁都嚣）
  'wai-ren': 12,          // 外壬（仲丁之弟，九世之乱延续）
  'he-dan-jia': 13,       // 河亶甲（外壬之弟，河亶甲中兴，迁都相）
  'zu-yi': 14,            // 祖乙（河亶甲之子，祖乙中兴）
  'zu-xin': 15,           // 祖辛（祖乙之子，承中兴之业）
  'wo-jia': 16,           // 沃甲（祖辛之弟，九世之乱延续）
  'zu-ding': 17,          // 祖丁（祖辛之子，九世之乱延续）
  'nan-geng': 18,         // 南庚（沃甲之子，九世之乱末期，迁都奄）
  'yang-jia': 19,         // 阳甲（祖丁之子，九世之乱终）
  'pan-geng': 20,         // 盘庚（阳甲之弟，迁殷中兴）
  'xiao-xin': 21,         // 小辛（盘庚之弟，商道复衰）
  'xiao-yi': 22,          // 小乙（小辛之弟，为武丁中兴奠基）
  'wu-ding': 23,          // 武丁（武丁中兴，商朝鼎盛）
  'zu-geng': 24,          // 祖庚（武丁之子，承中兴之业）
  'zu-jia': 25,           // 祖甲（祖庚之弟，帝甲之乱）
  'lin-xin': 26,          // 廪辛（祖甲之子，商道益衰）
  'kang-ding': 27,        // 康丁（廪辛之弟，商道益衰）
  'wu-yi': 28,            // 武乙（康丁之子，射天挑战神权）
  'di-yi': 29,            // 帝乙（武乙之子，纣王之父，迁都朝歌）
  'shang-zhowang': 30,    // 商纣王（末帝，牧野之战亡商）

  // ── 西周（按在位先后，共13王） ──
  'zhou-wenwang': 1,      // 周文王（追尊，奠定灭商基础）
  'zhou-wuwang': 2,       // 周武王（开国，牧野灭商）
  'zhou-chengwang': 3,    // 周成王（周公摄政，成康之治）
  'zhou-kangwang': 4,     // 周康王（成康之治，刑错四十余年不用）
  'zhou-zhaowang': 5,     // 周昭王（南征荆楚，溺于汉水，西周转折）
  'zhou-muwang': 6,       // 周穆王（在位55年，穆天子西游，作吕刑）
  'zhou-gongwang': 7,     // 周共王（灭密国，守成之君）
  'zhou-yiwang': 8,       // 周懿王（迁都犬丘，王室遂微）
  'zhou-xiaowang': 9,     // 周孝王（封非子于秦，秦人始大）
  'zhou-yiwang2': 10,     // 周夷王（烹齐哀公，诸侯不朝）
  'zhou-liwang': 11,      // 周厉王（国人暴动，共和行政，前841确切纪年）
  'zhou-xuanwang': 12,    // 周宣王（宣王中兴，晚年独断）
  'zhou-youwang': 13,     // 周幽王（烽火戏诸侯，西周灭亡）

  // ── 东周（按在位先后，共25王） ──
  'zhou-pingwang': 1,     // 周平王（东迁洛邑，春秋战国之始）
  'zhou-huanwang': 2,     // 周桓王（繻葛之战中箭，王室威信扫地）
  'zhou-zhuangwang': 3,   // 周庄王（平定王子克之乱，齐桓公开始称霸）
  'zhou-xiwang': 4,       // 周僖王（葵丘会盟，齐桓公霸主地位确立）
  'zhou-huiwang': 5,      // 周惠王（王子颓之乱，晋楚争霸格局形成）
  'zhou-xiangwang': 6,    // 周襄王（城濮之战，践土之盟，天子沦为傀儡）
  'zhou-qingwang': 7,     // 周顷王（在位六年，王室经济困难）
  'zhou-kuangwang': 8,    // 周匡王（楚庄王问鼎中原，"在德不在鼎"）
  'zhou-dingwang': 9,     // 周定王（邲之战楚胜晋，弭兵之盟）
  'zhou-jianwang': 10,    // 周简王（鄢陵之战，弭兵运动兴起）
  'zhou-lingwang': 11,    // 周灵王（太子晋传说，弭兵之盟达成）
  'zhou-jingwang': 12,    // 周景王（铸大钱，与晋国争田）
  'zhou-daowang': 13,     // 周悼王（在位数月病逝，兄弟争立）
  'zhou-jingwang2': 14,   // 周敬王（王子朝之乱，老子西出函谷关）
  'zhou-yuanwang': 15,    // 周元王（越王勾践灭吴，战国时代开始）
  'zhou-zhendingwang': 16,// 周贞定王（三家分晋，战国七雄格局形成）
  'zhou-aiwang': 17,      // 周哀王（在位三月被弟弑杀）
  'zhou-siwang': 18,      // 周思王（弑兄自立，东西二周分治）
  'zhou-kaowang': 19,     // 周考王（弑兄自立，西周桓公之封）
  'zhou-weiliewang': 20,  // 周威烈王（三家分晋正式承认，《资治通鉴》始于此）
  'zhou-anwang': 21,      // 周安王（田氏代齐，吴起变法）
  'zhou-liewang': 22,     // 周烈王（田氏齐确立，秦献公即位）
  'zhou-xianwang': 23,    // 周显王（商鞅变法，苏秦合纵）
  'zhou-shenjingwang': 24,// 周慎靓王（合纵抗秦，秦惠文王称王）
  'zhou-nanwang': 25,     // 周赧王（末帝，债台高筑，秦取九鼎）

  // ── 秦 ──
  'qin-shi-huang': 1,     // 秦始皇
  'qin-ershi': 2,         // 秦二世

  // ── 西汉（按在位先后，共15帝） ──
  'han-gaozu': 1,         // 汉高祖（布衣天子，建立汉朝）
  'han-huidi': 2,         // 汉惠帝（萧规曹随，吕后称制）
  'han-shaodi-qian': 3,   // 前少帝（吕后临朝，废杀）
  'han-shaodi-hou': 4,    // 后少帝（诛诸吕，迎立文帝）
  'han-wendi': 5,         // 汉文帝（文景之治，仁政爱民）
  'han-jingdi': 6,        // 汉景帝（平定七国之乱，削藩集权）
  'han-wudi': 7,          // 汉武帝（雄才大略，北击匈奴）
  'han-zhaodi': 8,        // 汉昭帝（霍光辅政，昭宣中兴）
  'han-feidi': 9,         // 汉废帝（在位27天，海昏侯）
  'han-xuandi': 10,       // 汉宣帝（故剑情深，昭宣中兴）
  'han-yuandi': 11,       // 汉元帝（昭君出塞，西汉衰亡起）
  'han-chengdi': 12,      // 汉成帝（赵飞燕姐妹，王氏坐大）
  'han-aidi': 13,         // 汉哀帝（断袖之癖，限田令失败）
  'han-pingdi': 14,       // 汉平帝（王莽辅政，14岁暴卒）
  'han-ruziying': 15,     // 孺子婴（王莽摄政，西汉灭亡）

  // ── 新 ──
  'wang-mang': 1,         // 王莽

  // ── 东汉（按在位先后，共14帝） ──
  'han-guangwudi': 1,     // 汉光武帝（光武中兴，昆阳之战）
  'han-mingdi': 2,        // 汉明帝（永平求法，佛教东传，明章之治）
  'han-zhangdi': 3,       // 汉章帝（白虎观会议，明章之治）
  'han-he-di': 4,         // 汉和帝（永元之隆，诛窦宪，甘英使大秦）
  'han-shangdi': 5,       // 汉殇帝（出生百余日即位，夭折，最短命皇帝）
  'han-andi': 6,          // 汉安帝（邓太后临朝，亲政后清算邓氏）
  'han-shaodi-yi': 7,     // 少帝刘懿（北乡侯，在位七月而薨，十九侯政变）
  'han-shundi': 8,        // 汉顺帝（宦官十九侯拥立，梁氏专权开端）
  'han-chongdi': 9,       // 汉冲帝（两岁即位三岁夭折，梁冀专权）
  'han-zhidi': 10,        // 汉质帝（"此跋扈将军也"，被梁冀毒杀）
  'han-huandi': 11,       // 汉桓帝（灭梁冀，五侯乱政，第一次党锢之祸）
  'han-lingdi': 12,       // 汉灵帝（卖官鬻爵，黄巾起义，党锢之祸）
  'han-shaodi-bian': 13,  // 少帝刘辩（何进诛宦失败，董卓废杀）
  'han-xiandi': 14,       // 汉献帝（末帝，挟天子以令诸侯，禅位曹丕）

  // ── 三国-群雄（东汉末称帝/追尊为帝者，共3位） ──
  'cao-cao': 1,           // 曹操（魏武帝追尊，挟天子以令诸侯，曹魏奠基者）
  'yuan-shu': 2,          // 袁术（仲氏皇帝，197年淮南称帝，汉末唯一真正称帝的群雄）
  'sun-jian': 3,          // 孙坚（武烈帝追尊，江东猛虎，东吴奠基者）

  // ── 三国-曹魏（按在位先后，共5帝） ──
  'cao-pi': 1,            // 曹丕（魏文帝，220年代汉建魏，九品中正）
  'cao-rui': 2,           // 曹叡（魏明帝，抵御诸葛北伐，托孤失策）
  'cao-fang': 3,          // 曹芳（齐王，高平陵之变，司马氏专权之始）
  'cao-mao': 4,           // 曹髦（高贵乡公，"司马昭之心路人皆知"，讨司马昭被弑）
  'cao-huan': 5,          // 曹奂（魏元帝，禅位司马炎，曹魏灭亡）

  // ── 三国-蜀汉（共2帝） ──
  'liu-bei': 1,           // 刘备（汉昭烈帝，221年开国）
  'liu-chan': 2,          // 刘禅（后主，263年降魏，乐不思蜀）

  // ── 三国-孙吴（按在位先后，共4帝） ──
  'sun-quan': 1,          // 孙权（吴大帝，222年开国，在位52年）
  'sun-liang': 2,         // 孙亮（吴废帝，会稽王，被孙𬘭废）
  'sun-xiu': 3,           // 孙休（吴景帝，诛孙𬘭亲政，兴办国学）
  'sun-hao': 4,           // 孙晧（吴末帝，暴君，280年降晋亡国）

  // ── 西晋 ──
  'jin-wudi': 1,          // 晋武帝
  'jin-huidi': 2,         // 晋惠帝
  'jin-huai-di': 3,       // 晋怀帝（永嘉之乱青衣行酒）
  'jin-min-di': 4,        // 晋愍帝（末代，长安出降）

  // ── 东晋（按在位先后，共11帝） ──
  'jin-yuandi': 1,        // 晋元帝（南渡开国，王与马共天下）
  'jin-ming-di': 2,       // 晋明帝（平定王敦之乱，英年早逝）
  'jin-cheng-di': 3,      // 晋成帝（苏峻之乱后重建秩序，在位18年）
  'jin-kang-di': 4,       // 晋康帝（旁支继位，庾冰辅政，在位2年）
  'jin-mu-di': 5,         // 晋穆帝（桓温北伐最活跃时期，灭成汉）
  'jin-ai-di': 6,         // 晋哀帝（服丹药中毒身亡，24岁）
  'jin-fei-di': 7,        // 晋废帝（海西公，被桓温废黜）
  'jin-jian-wen-di': 8,   // 晋简文帝（桓温傀儡，在位8个月病逝）
  'jin-xiaowu-di': 9,     // 晋孝武帝（淝水之战当朝，被张贵人闷杀）
  'jin-an-di': 10,        // 晋安帝（弱智皇帝，被桓玄废立、刘裕缢杀）
  'jin-gong-di': 11,      // 晋恭帝（末代，禅让刘裕，东晋亡）

  // ── 十六国（按政权建立先后+在位顺序，共9位出名帝王） ──
  'liu-yuan': 1,          // 汉光文帝刘渊（汉赵/前赵开国，十六国首位，304年）
  'shi-le': 2,            // 后赵明帝石勒（后赵开国，319年）
  'shi-hu': 3,            // 后赵武帝石虎（后赵极盛到崩溃，334年）
  'mu-rong-huang': 4,     // 前燕文明帝慕容皝（前燕开国，337年）
  'fu-jian': 5,           // 前秦宣昭帝苻坚（统一北方，淝水之战，357年）
  'mu-rong-chui': 6,      // 后燕成武帝慕容垂（后燕开国，参合陂，384年）
  'yao-chang': 7,         // 后秦武昭帝姚苌（后秦开国，弑杀苻坚，384年）
  'yao-xing': 8,          // 后秦文桓帝姚兴（后秦鼎盛，鸠摩罗什译经，393年）
  'he-lian-bo-bo': 9,     // 胡夏武烈帝赫连勃勃（胡夏开国，统万城，407年）

  // ── 南朝（合并在同一侧边栏子分组「南朝」下，按朝代先后+帝序排，共24帝） ──
  // 南朝宋（8帝）
  'song-wudi': 1,         // 宋武帝（南朝宋开国，最早）
  'song-shaodi': 2,       // 宋少帝（刘义符，在位2年被废杀）
  'song-wendi': 3,        // 宋文帝（元嘉之治）
  'song-xiaowudi': 4,     // 宋孝武帝（大明改制）
  'song-qian-feidi': 5,   // 宋前废帝（刘子业，暴君）
  'song-mingdi': 6,       // 宋明帝（刘彧，泰始之治）
  'song-hou-feidi': 7,    // 宋后废帝（刘昱，苍梧王）
  'song-shundi': 8,       // 宋顺帝（刘准，南朝宋末代）
  // 南朝齐（7帝）
  'qi-gaodi': 9,          // 齐高帝（萧道成，南齐开国）
  'qi-wudi': 10,          // 齐武帝（永明之治）
  'qi-yulinwang': 11,     // 齐郁林王（萧昭业，荒唐腐化）
  'qi-hailingwang': 12,   // 齐海陵王（萧昭文，在位75天）
  'qi-mingdi': 13,        // 齐明帝（萧鸾，大杀宗室）
  'qi-donghunhou': 14,    // 齐东昏侯（萧宝卷，凿金为莲）
  'qi-hedi': 15,          // 齐和帝（萧宝融，南齐末代）
  // 南朝梁（4帝）
  'liang-wudi': 16,        // 梁武帝（菩萨皇帝，饿死台城）
  'liang-jiandi': 17,      // 梁简文帝（萧纲，宫体诗代表）
  'liang-yuandi': 18,      // 梁元帝（萧绎，江陵焚书）
  'liang-jingdi': 19,      // 梁敬帝（萧方智，南朝梁末代）
  // 南朝陈（5帝）
  'chen-wudi': 20,        // 陈武帝（陈霸先，南朝陈开国）
  'chen-wendi': 21,       // 陈文帝（陈蒨，天嘉之治）
  'chen-feidi': 22,       // 陈废帝（陈伯宗，在位2年被废）
  'chen-xuandi': 23,      // 陈宣帝（陈顼，太建北伐）
  'chen-shu-bao': 24,     // 陈后主（陈叔宝，玉树后庭花）

  // ── 北朝（合并在同一侧边栏子分组「北朝」下）
  'tuoba-gui': 1,         // 北魏道武帝（北魏开国，北朝最早）
  'beiwei-taiwudi': 2,    // 北魏太武帝
  'beiwei-xiaowendi': 3,  // 北魏孝文帝
  'gao-yang': 4,          // 北齐文宣帝高洋（北齐开国）
  'beizhou-wudi': 5,      // 北周武帝（北周灭北齐，北朝晚期）

  // ── 隋 ──
  'sui-wendi': 1,         // 隋文帝
  'sui-yangdi': 2,        // 隋炀帝

  // ── 唐 ──
  'tang-gaozu': 1,        // 唐高祖
  'tang-taizong': 2,      // 唐太宗
  'tang-gaozong': 3,      // 唐高宗
  'wu-zetian': 4,         // 武则天（武周）
  'tang-xuanzong': 5,     // 唐玄宗
  'tang-suzong': 6,       // 唐肃宗
  'tang-daizong': 7,      // 唐代宗
  'tang-de-zong': 8,      // 唐德宗（两税法/泾原兵变）
  'tang-shun-zong': 9,    // 唐顺宗（永贞革新/二王八司马）
  'tang-xianzong': 10,    // 唐宪宗
  'tang-wen-zong': 11,    // 唐文宗（甘露之变）
  'tang-wuzong': 12,      // 唐武宗
  'tang-ai-di': 13,       // 唐哀帝（末代，朱温所杀）

  // ── 五代（合并在同一侧边栏子分组「五代」下，按朝代更替顺序）
  'zhu-wen': 1,           // 朱温（后梁太祖，五代之始）
  'li-cun-xu': 2,         // 李存勖（后唐庄宗，灭后梁）
  'shi-jing-tang': 3,     // 石敬瑭（后晋高祖，割燕云）
  'guo-wei': 4,           // 郭威（后周太祖，代后汉建后周）
  'chai-rong': 5,         // 后周世宗柴荣（五代末帝）

  // ── 宋 ──
  'song-taizu': 1,        // 宋太祖
  'song-taizong': 2,      // 宋太宗
  'song-zhenzong': 3,     // 宋真宗（澶渊之盟）
  'song-renzong': 4,      // 宋仁宗
  'song-shenzong': 5,     // 宋神宗
  'song-huizong': 6,      // 宋徽宗
  'song-qinzong': 7,      // 宋钦宗（靖康之变）
  'song-gaozong': 8,      // 宋高宗
  'song-xiaozong': 9,     // 宋孝宗
  'song-lizong': 10,      // 宋理宗（联蒙灭金，理学正统）
  'song-du-zong': 11,     // 宋度宗（贾似道专权，襄樊陷落）
  'song-gong-di': 12,     // 宋恭帝赵㬎（大都出降，被送吐蕃为僧）
  'song-mo-di': 13,       // 宋末帝（崖山海战）

  // ── 辽 ──
  'liao-taizu': 1,        // 辽太祖耶律阿保机
  'liao-taizong': 2,      // 辽太宗耶律德光
  'liao-shengzong': 3,    // 辽圣宗（澶渊之盟，辽朝鼎盛）
  'liao-daozong': 4,      // 辽道宗（十香词冤案）
  'liao-tianzudi': 5,     // 天祚帝（辽朝末代）

  // ── 西夏 ──
  'xi-xia-jingzong': 1,   // 夏景宗李元昊
  'xi-xia-chongzong': 2,  // 夏崇宗李乾顺
  'xi-xia-renzong': 3,    // 夏仁宗李仁孝

  // ── 金 ──
  'wan-yan-a-gu-da': 1,   // 金太祖完颜阿骨打
  'wan-yan-qi-mai': 2,    // 金太宗完颜吴乞买
  'wan-yan-liang': 3,     // 海陵王完颜亮
  'wan-yan-yong': 4,      // 金世宗完颜雍（小尧舜）
  'wan-yan-shouxu': 5,    // 金哀宗完颜守绪

  // ── 元 ──
  'genghis-khan': 1,      // 成吉思汗
  'yuan-taizong': 2,      // 元太宗窝阔台
  'yuan-dingzong': 3,     // 元定宗贵由
  'yuan-xianzong': 4,     // 元宪宗蒙哥
  'hubilie': 5,           // 元世祖
  'yuan-chengzong': 6,    // 元成宗铁穆耳
  'yuan-renzong': 7,      // 元仁宗
  'yuan-yingzong': 8,     // 元英宗（南坡之变）
  'yuan-wenzong': 9,      // 元文宗
  'yuan-shundi': 10,      // 元顺帝（元朝末代）

  // ── 明 ──
  'ming-taizu': 1,        // 明太祖
  'jian-wen-di': 2,       // 建文帝（朱允炆）
  'ming-chengzu': 3,      // 明成祖
  'ming-renzong': 4,      // 明仁宗
  'ming-xuanzong': 5,     // 明宣宗
  'ming-yingzong': 6,     // 明英宗
  'ming-daizong': 7,      // 明代宗
  'ming-xianzong': 8,     // 明宪宗
  'ming-xiaozong': 9,     // 明孝宗
  'ming-wu-zong': 10,     // 明武宗（正德）
  'ming-shizong': 11,     // 明世宗
  'ming-muzong': 12,      // 明穆宗（隆庆开关）
  'ming-shenzong': 13,    // 明神宗
  'ming-guangzong': 14,   // 明光宗（一月天子）
  'ming-xizong': 15,      // 明熹宗（木匠皇帝）
  'chong-zhen': 16,       // 明思宗

  // ── 清 ──
  'nu-er-ha-chi': 1,      // 清太祖努尔哈赤（后金）
  'hong-taiji': 2,        // 清太宗皇太极
  'shunzhi': 3,           // 顺治帝
  'kangxi': 4,            // 康熙帝
  'yongzheng': 5,         // 雍正帝
  'qian-long': 6,         // 乾隆帝
  'jiaqing': 7,           // 嘉庆帝
  'daoguang': 8,          // 道光帝
  'xianfeng': 9,          // 咸丰帝
  'tongzhi': 10,          // 同治帝
  'guangxu': 11,          // 光绪帝
  'pu-yi': 12             // 宣统帝（溥仪）
}

// ── 构建 slug → 文件路径 的映射（支持子目录） ──────────────
// 扫描 emperors 目录及其所有子目录，建立 slug 到完整文件路径的映射。
// 这样无论 .md 文件直接放在 emperors/ 下，还是放在 emperors/xia/ 等子目录下，
// 都能被正确找到，便于按朝代分目录管理帝王文件。
function buildSlugMap(rootDir) {
  const slugMap = new Map()
  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        scan(fullPath)  // 递归扫描子目录
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        const slug = entry.name.replace(/\.md$/, '')
        slugMap.set(slug, fullPath)
      }
    }
  }
  scan(rootDir)
  return slugMap
}

// ── 主流程 ──────────────────────────────────────────────────

const slugMap = buildSlugMap(emperorsDir)
let updated = 0, skipped = 0, notFound = []

for (const [slug, order] of Object.entries(EMPEROR_ORDER)) {
  const filePath = slugMap.get(slug)

  if (!filePath || !fs.existsSync(filePath)) {
    notFound.push(slug)
    console.log(`  ⚠️  ${slug}.md — 文件不存在，跳过`)
    skipped++
    continue
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // 检查是否已有 order 字段
  if (/^order:\s*\d+/m.test(content)) {
    // 更新已有的 order 值
    content = content.replace(/^(order:\s*)\d+/m, `$1${order}`)
    console.log(`  🔄 ${slug}.md — 更新 order=${order}`)
  } else {
    // 在 era 字段后插入 order 字段
    content = content.replace(/^(era:\s*.+)$/m, `$1\norder: ${order}`)
    console.log(`  ✏️  ${slug}.md — 添加 order=${order}`)
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  updated++
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`✅ 已更新: ${updated} 个文件`)
console.log(`⏭️  已跳过: ${skipped} 个文件`)
if (notFound.length > 0) {
  console.log(`⚠️  未找到: ${notFound.join(', ')}`)
}
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
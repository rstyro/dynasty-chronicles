// dynasty data - manually curated, no createContentLoader needed
export const dynasties = [
  // ---- 上古 ----
  { period: '上古', name: '三皇五帝', start: '传说时代', end: '前2070', capital: '—', founder: '—', last: '—', keyword: '文明起源', url: '/dynasties/ancient/three-sovereigns' },
  { period: '上古', name: '夏朝', start: '前2070', end: '前1600', capital: '阳城', founder: '禹', last: '桀', keyword: '世袭开端', url: '/dynasties/ancient/xia' },
  { period: '上古', name: '商朝', start: '前1600', end: '前1046', capital: '殷', founder: '汤', last: '纣', keyword: '甲骨文', url: '/dynasties/ancient/shang' },
  { period: '上古', name: '西周', start: '前1046', end: '前771', capital: '镐京', founder: '周武王', last: '周幽王', keyword: '礼乐制度', url: '/dynasties/ancient/western-zhou' },

  // ---- 春秋战国 ----
  { period: '春秋战国', name: '春秋', start: '前770', end: '前476', capital: '洛邑', founder: '周平王', last: '周敬王', keyword: '春秋五霸', url: '/dynasties/dongzhou/chunqiu' },
  { period: '春秋战国', name: '战国', start: '前475', end: '前221', capital: '—', founder: '—', last: '—', keyword: '百家争鸣', url: '/dynasties/dongzhou/zhanguo' },

  // ---- 帝国初立 ----
  { period: '帝国初立', name: '秦朝', start: '前221', end: '前207', capital: '咸阳', founder: '秦始皇', last: '子婴', keyword: '书同文', url: '/dynasties/qinhan/qin' },
  { period: '帝国初立', name: '楚汉之争', start: '前206', end: '前202', capital: '彭城/汉中', founder: '项羽', last: '项羽', keyword: '楚汉争霸', url: '/dynasties/qinhan/chu-han' },
  { period: '帝国初立', name: '西汉', start: '前202', end: '9', capital: '长安', founder: '汉高祖', last: '孺子婴', keyword: '文景之治', url: '/dynasties/qinhan/western-han' },
  { period: '帝国初立', name: '新朝', start: '9', end: '23', capital: '常安', founder: '王莽', last: '王莽', keyword: '托古改制', url: '/dynasties/qinhan/xin' },
  { period: '帝国初立', name: '东汉', start: '25', end: '220', capital: '洛阳', founder: '汉光武帝', last: '汉献帝', keyword: '光武中兴', url: '/dynasties/qinhan/eastern-han' },

  // ---- 分裂融合 ----
  { period: '分裂融合', name: '曹魏', start: '220', end: '265', capital: '洛阳', founder: '曹丕', last: '曹奂', keyword: '三分天下', url: '/dynasties/weijin/cao-wei' },
  { period: '分裂融合', name: '蜀汉', start: '221', end: '263', capital: '成都', founder: '刘备', last: '刘禅', keyword: '汉室正统', url: '/dynasties/weijin/shu-han' },
  { period: '分裂融合', name: '孙吴', start: '222', end: '280', capital: '建业', founder: '孙权', last: '孙皓', keyword: '江东基业', url: '/dynasties/weijin/sun-wu' },
  { period: '分裂融合', name: '西晋', start: '265', end: '316', capital: '洛阳', founder: '晋武帝', last: '晋愍帝', keyword: '太康之治', url: '/dynasties/weijin/western-jin' },
  { period: '分裂融合', name: '东晋', start: '317', end: '420', capital: '建康', founder: '晋元帝', last: '晋恭帝', keyword: '衣冠南渡', url: '/dynasties/weijin/eastern-jin' },
  { period: '分裂融合', name: '十六国', start: '304', end: '439', capital: '—', founder: '—', last: '—', keyword: '五胡乱华', url: '/dynasties/weijin/sixteen-kingdoms' },
  { period: '分裂融合', name: '南朝', start: '420', end: '589', capital: '建康', founder: '刘裕', last: '陈叔宝', keyword: '江南开发', url: '/dynasties/nanbei/nanchao' },
  { period: '分裂融合', name: '北朝', start: '386', end: '581', capital: '平城/洛阳/长安', founder: '拓跋珪', last: '宇文阐', keyword: '胡汉融合', url: '/dynasties/nanbei/beichao' },

  // ---- 隋唐盛世 ----
  { period: '隋唐盛世', name: '隋朝', start: '581', end: '618', capital: '大兴', founder: '隋文帝', last: '隋炀帝', keyword: '大运河', url: '/dynasties/suitang/sui' },
  { period: '隋唐盛世', name: '唐朝', start: '618', end: '907', capital: '长安', founder: '唐高祖', last: '唐哀帝', keyword: '万国来朝', url: '/dynasties/suitang/tang' },
  { period: '隋唐盛世', name: '五代十国', start: '907', end: '960', capital: '—', founder: '—', last: '—', keyword: '群雄割据', url: '/dynasties/songliao/wudai-shiguo' },

  // ---- 宋元明清 ----
  { period: '宋元明清', name: '辽朝', start: '907', end: '1125', capital: '上京', founder: '耶律阿保机', last: '天祚帝', keyword: '契丹王朝', url: '/dynasties/songliao/liao' },
  { period: '宋元明清', name: '北宋', start: '960', end: '1127', capital: '开封', founder: '宋太祖', last: '宋钦宗', keyword: '澶渊之盟', url: '/dynasties/songliao/northern-song' },
  { period: '宋元明清', name: '西夏', start: '1038', end: '1227', capital: '兴庆', founder: '李元昊', last: '李睍', keyword: '党项王朝', url: '/dynasties/songliao/western-xia' },
  { period: '宋元明清', name: '金朝', start: '1115', end: '1234', capital: '中都/开封', founder: '完颜阿骨打', last: '金末帝', keyword: '女真崛起', url: '/dynasties/songliao/jin-dynasty' },
  { period: '宋元明清', name: '南宋', start: '1127', end: '1279', capital: '临安', founder: '宋高宗', last: '宋少帝', keyword: '偏安江南', url: '/dynasties/songliao/southern-song' },
  { period: '宋元明清', name: '元朝', start: '1271', end: '1368', capital: '大都', founder: '元世祖', last: '元顺帝', keyword: '蒙古铁骑', url: '/dynasties/imperial/yuan' },
  { period: '宋元明清', name: '明朝', start: '1368', end: '1644', capital: '南京→北京', founder: '明太祖', last: '明思宗', keyword: '七下西洋', url: '/dynasties/imperial/ming' },
  { period: '宋元明清', name: '清朝', start: '1644', end: '1912', capital: '北京', founder: '清世祖', last: '宣统帝', keyword: '康乾盛世', url: '/dynasties/imperial/qing' }
]

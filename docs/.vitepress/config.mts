import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "王朝编年史",
  description: "纵览华夏五千年——从夏商周到元明清，帝王将相、金戈铁马、文化瑰宝的数字方志",
  lang: 'zh-CN',
  assetsDir: 'assets',
  base: '/dynasty-chronicles/',
  
  // 本地搜索
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '时间线', link: '/timeline' },
      { text: '朝代', link: '/dynasties/' },
      { text: '人物', link: '/figures/' },
      { text: '战役', link: '/battles/' },
      { text: '文化', link: '/culture/' }
    ],

    sidebar: {
      '/dynasties/': [
        {
          text: '🏯 朝代',
          items: [
            { text: '朝代总览', link: '/dynasties/' }
          ]
        },
        {
          text: '🗿 上古',
          collapsed: false,
          items: [
            { text: '三皇五帝', link: '/dynasties/three-sovereigns' },
            { text: '先秦总览', link: '/dynasties/pre-qin' },
            { text: '夏朝', link: '/dynasties/xia' },
            { text: '商朝', link: '/dynasties/shang' },
            { text: '西周', link: '/dynasties/western-zhou' }
          ]
        },
        {
          text: '🏛️ 春秋战国',
          collapsed: false,
          items: [
            { text: '东周总览', link: '/dynasties/spring-autumn' },
            { text: '春秋', link: '/dynasties/chunqiu' },
            { text: '战国', link: '/dynasties/zhanguo' }
          ]
        },
        {
          text: '🏛️ 帝国初立',
          collapsed: false,
          items: [
            { text: '秦朝', link: '/dynasties/qin' },
            { text: '楚汉之争', link: '/dynasties/chu-han' },
            { text: '汉朝', link: '/dynasties/han', items: [
                { text: '西汉', link: '/dynasties/western-han' },
                { text: '新朝', link: '/dynasties/xin' },
                { text: '东汉', link: '/dynasties/eastern-han' }
              ] }
          ]
        },
        {
          text: '⚔️ 分裂融合',
          collapsed: false,
          items: [
            { text: '三国', link: '/dynasties/sanguo', items: [
                { text: '曹魏', link: '/dynasties/cao-wei' },
                { text: '蜀汉', link: '/dynasties/shu-han' },
                { text: '孙吴', link: '/dynasties/sun-wu' }
              ] },
            { text: '晋朝', link: '/dynasties/jin', items: [
                { text: '西晋', link: '/dynasties/western-jin' },
                { text: '东晋', link: '/dynasties/eastern-jin' }
              ] },
            { text: '十六国', link: '/dynasties/sixteen-kingdoms' },
            { text: '南北朝', link: '/dynasties/nanbei-chao', items: [
                { text: '南朝', link: '/dynasties/nanchao' },
                { text: '北朝', link: '/dynasties/beichao' }
              ] }
          ]
        },
        {
          text: '🥇 隋唐盛世',
          collapsed: false,
          items: [
            { text: '隋朝', link: '/dynasties/sui' },
            { text: '唐朝', link: '/dynasties/tang' },
            { text: '五代十国', link: '/dynasties/wudai-shiguo' }
          ]
        },
        {
          text: '📜 宋元明清',
          collapsed: false,
          items: [
            { text: '宋朝', link: '/dynasties/song', items: [
                { text: '辽朝', link: '/dynasties/liao' },
                { text: '北宋', link: '/dynasties/northern-song' },
                { text: '西夏', link: '/dynasties/western-xia' },
                { text: '金朝', link: '/dynasties/jin-dynasty' },
                { text: '南宋', link: '/dynasties/southern-song' }
              ] },
            { text: '元朝', link: '/dynasties/yuan' },
            { text: '明朝', link: '/dynasties/ming' },
            { text: '清朝', link: '/dynasties/qing' }
          ]
        }
      ],

      '/figures/': [
        {
          text: '👤 人物总览',
          items: [
            { text: '人物总览', link: '/figures/' }
          ]
        },
        {
          text: '👑 帝王',
          items: [
            { text: '帝王总览', link: '/figures/emperors/' },
            { text: '上古', collapsed: true, items: [
                { text: '禹', link: '/figures/emperors/yu' },
                { text: '汤', link: '/figures/emperors/tang-shang' },
                { text: '周武王', link: '/figures/emperors/zhou-wuwang' },
                { text: '周平王', link: '/figures/emperors/zhou-pingwang' },
                { text: '商纣王', link: '/figures/emperors/shang-zhowang' }
              ] },
            { text: '秦汉', collapsed: true, items: [
                { text: '秦始皇', link: '/figures/emperors/qin-shi-huang' },
                { text: '秦二世', link: '/figures/emperors/qin-ershi' },
                { text: '汉高祖', link: '/figures/emperors/han-gaozu' },
                { text: '汉武帝', link: '/figures/emperors/han-wudi' },
                { text: '汉光武帝', link: '/figures/emperors/han-guangwudi' },
                { text: '汉献帝', link: '/figures/emperors/han-xiandi' }
              ] },
            { text: '三国', collapsed: true, items: [
                { text: '曹操', link: '/figures/emperors/cao-cao' },
                { text: '刘备', link: '/figures/emperors/liu-bei' },
                { text: '孙权', link: '/figures/emperors/sun-quan' }
              ] },
            { text: '两晋南北朝', collapsed: true, items: [
                { text: '晋武帝', link: '/figures/emperors/jin-wudi' },
                { text: '晋惠帝', link: '/figures/emperors/jin-huidi' },
                { text: '北魏孝文帝', link: '/figures/emperors/beiwei-xiaowendi' },
                { text: '梁武帝', link: '/figures/emperors/liang-wudi' }
              ] },
            { text: '隋唐', collapsed: true, items: [
                { text: '隋文帝', link: '/figures/emperors/sui-wendi' },
                { text: '隋炀帝', link: '/figures/emperors/sui-yangdi' },
                { text: '唐太宗', link: '/figures/emperors/tang-taizong' },
                { text: '武则天', link: '/figures/emperors/wu-zetian' },
                { text: '唐玄宗', link: '/figures/emperors/tang-xuanzong' }
              ] },
            { text: '宋元明清', collapsed: true, items: [
                { text: '宋太祖', link: '/figures/emperors/song-taizu' },
                { text: '元世祖', link: '/figures/emperors/hubilie' },
                { text: '明太祖', link: '/figures/emperors/ming-taizu' },
                { text: '明成祖', link: '/figures/emperors/ming-chengzu' },
                { text: '明思宗', link: '/figures/emperors/chong-zhen' },
                { text: '康熙帝', link: '/figures/emperors/kangxi' },
                { text: '乾隆帝', link: '/figures/emperors/qian-long' },
                { text: '宣统帝', link: '/figures/emperors/pu-yi' }
              ] }
          ]
        },
        {
          text: '⚔️ 武将',
          items: [
            { text: '武将总览', link: '/figures/generals/' },
            { text: '先秦', collapsed: true, items: [
                { text: '孙武', link: '/figures/generals/sun-wu' },
                { text: '吴起', link: '/figures/generals/wu-qi' },
                { text: '白起', link: '/figures/generals/bai-qi' },
                { text: '王翦', link: '/figures/generals/wang-jian' },
                { text: '廉颇', link: '/figures/generals/lian-po' },
                { text: '李牧', link: '/figures/generals/li-mu' },
                { text: '蒙恬', link: '/figures/generals/meng-tian' }
              ] },
            { text: '秦汉', collapsed: true, items: [
                { text: '项羽', link: '/figures/generals/xiang-yu' },
                { text: '韩信', link: '/figures/generals/han-xin' },
                { text: '李广', link: '/figures/generals/li-guang' },
                { text: '卫青', link: '/figures/generals/wei-qing' },
                { text: '霍去病', link: '/figures/generals/huo-qu-bing' },
                { text: '班超', link: '/figures/generals/ban-chao' }
              ] },
            { text: '三国', collapsed: true, items: [
                { text: '吕布', link: '/figures/generals/lv-bu' },
                { text: '夏侯惇', link: '/figures/generals/xia-hou-dun' },
                { text: '夏侯渊', link: '/figures/generals/xia-hou-yuan' },
                { text: '曹仁', link: '/figures/generals/cao-ren' },
                { text: '张辽', link: '/figures/generals/zhang-liao' },
                { text: '徐晃', link: '/figures/generals/xu-huang' },
                { text: '张郃', link: '/figures/generals/zhang-he' },
                { text: '乐进', link: '/figures/generals/yue-jin' },
                { text: '于禁', link: '/figures/generals/yu-jin' },
                { text: '关羽', link: '/figures/generals/guan-yu' },
                { text: '张飞', link: '/figures/generals/zhang-fei' },
                { text: '赵云', link: '/figures/generals/zhao-yun' },
                { text: '马超', link: '/figures/generals/ma-chao' },
                { text: '黄忠', link: '/figures/generals/huang-zhong' },
                { text: '魏延', link: '/figures/generals/wei-yan' },
                { text: '姜维', link: '/figures/generals/jiang-wei' },
                { text: '周瑜', link: '/figures/generals/zhou-yu' },
                { text: '吕蒙', link: '/figures/generals/lv-meng' },
                { text: '陆逊', link: '/figures/generals/lu-xun' }
              ] },
            { text: '两晋南北朝', collapsed: true, items: [
                { text: '祖逖', link: '/figures/generals/zu-ti' },
                { text: '谢玄', link: '/figures/generals/xie-xuan' },
                { text: '陈庆之', link: '/figures/generals/chen-qing-zhi' }
              ] },
            { text: '隋唐', collapsed: true, items: [
                { text: '李靖', link: '/figures/generals/li-jing' },
                { text: '秦叔宝', link: '/figures/generals/qin-shu-bao' },
                { text: '尉迟恭', link: '/figures/generals/wei-chi-gong' },
                { text: '苏定方', link: '/figures/generals/su-ding-fang' },
                { text: '薛仁贵', link: '/figures/generals/xue-ren-gui' },
                { text: '郭子仪', link: '/figures/generals/guo-zi-yi' }
              ] },
            { text: '宋元明清', collapsed: true, items: [
                { text: '岳飞', link: '/figures/generals/yue-fei' },
                { text: '徐达', link: '/figures/generals/xu-da' },
                { text: '戚继光', link: '/figures/generals/qi-ji-guang' },
                { text: '袁崇焕', link: '/figures/generals/yuan-chong-huan' },
                { text: '郑成功', link: '/figures/generals/zheng-cheng-gong' }
              ] }
          ]
        },
        {
          text: '📜 谋臣',
          items: [
            { text: '谋臣总览', link: '/figures/strategists/' },
            { text: '先秦', collapsed: true, items: [
                { text: '姜子牙', link: '/figures/strategists/jiang-zi-ya' },
                { text: '管仲', link: '/figures/strategists/guan-zhong' },
                { text: '商鞅', link: '/figures/strategists/shang-yang' },
                { text: '孙膑', link: '/figures/strategists/sun-bin' },
                { text: '苏秦', link: '/figures/strategists/su-qin' },
                { text: '张仪', link: '/figures/strategists/zhang-yi' }
              ] },
            { text: '秦汉', collapsed: true, items: [
                { text: '张良', link: '/figures/strategists/zhang-liang' },
                { text: '萧何', link: '/figures/strategists/xiao-he' },
                { text: '陈平', link: '/figures/strategists/chen-ping' },
                { text: '诸葛亮', link: '/figures/strategists/zhuge-liang' }
              ] },
            { text: '两晋南北朝', collapsed: true, items: [
                { text: '王猛', link: '/figures/strategists/wang-meng' },
                { text: '谢安', link: '/figures/strategists/xie-an' }
              ] },
            { text: '隋唐', collapsed: true, items: [
                { text: '房玄龄', link: '/figures/strategists/fang-xuanling' },
                { text: '魏徵', link: '/figures/strategists/wei-zheng' },
                { text: '狄仁杰', link: '/figures/strategists/di-ren-jie' }
              ] },
            { text: '宋元明清', collapsed: true, items: [
                { text: '王安石', link: '/figures/strategists/wang-anshi' },
                { text: '刘基', link: '/figures/strategists/liu-ji' },
                { text: '张居正', link: '/figures/strategists/zhang-ju-zheng' }
              ] }
          ]
        }
      ],

      '/battles/': [
        {
          text: '⚔️ 战役总览',
          items: [
            { text: '战役总览', link: '/battles/' }
          ]
        },
        {
          text: '🗿 上古先秦',
          collapsed: true,
          items: [
            { text: '涿鹿之战', link: '/battles/zhuolu' },
            { text: '牧野之战', link: '/battles/muye' },
            { text: '城濮之战', link: '/battles/chengpu' },
            { text: '马陵之战', link: '/battles/maling' },
            { text: '长平之战', link: '/battles/changping' }
          ]
        },
        {
          text: '🏛️ 秦汉',
          collapsed: true,
          items: [
            { text: '巨鹿之战', link: '/battles/juluzhi-zhan' },
            { text: '垓下之战', link: '/battles/gaixia' },
            { text: '漠北之战', link: '/battles/mobei' },
            { text: '昆阳之战', link: '/battles/kunyang' },
            { text: '官渡之战', link: '/battles/guandu' }
          ]
        },
        {
          text: '⚔️ 三国',
          collapsed: true,
          items: [
            { text: '赤壁之战', link: '/battles/chibi' },
            { text: '夷陵之战', link: '/battles/yiling' }
          ]
        },
        {
          text: '🏯 两晋南北朝',
          collapsed: true,
          items: [
            { text: '淝水之战', link: '/battles/feishui' }
          ]
        },
        {
          text: '🥇 隋唐',
          collapsed: true,
          items: [
            { text: '虎牢关之战', link: '/battles/hulaoguan' },
            { text: '（待补充）', link: '' }
          ]
        },
        {
          text: '📜 宋元明清',
          collapsed: true,
          items: [
            { text: '采石矶之战', link: '/battles/caishiji' },
            { text: '崖山之战', link: '/battles/yashan' },
            { text: '鄱阳湖之战', link: '/battles/poyang' },
            { text: '土木堡之变', link: '/battles/tumubao' },
            { text: '萨尔浒之战', link: '/battles/sarhu' }
          ]
        }
      ],

      '/culture/': [
        {
          text: '📚 文化科技',
          items: [
            { text: '文化总览', link: '/culture/' },
            { text: '文学', link: '/culture/literature' },
            { text: '思想哲学', link: '/culture/philosophy' },
            { text: '科技发明', link: '/culture/inventions' },
            { text: '艺术', link: '/culture/art' }
          ]
        }
      ],

      '/timeline': [
        {
          text: '🕐 时间线',
          items: [
            { text: '历史时间线', link: '/timeline' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rstyro' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/rstyro/dynasty-chronicles/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 页脚
    footer: {
      message: '以史为镜，可以知兴替',
      copyright: `版权所有 © ${new Date().getFullYear()} 王朝编年史`
    },

    // 上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 大纲标题级别
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    // 文档页脚导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true
  }
})

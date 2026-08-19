import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar-gen.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "王朝编年史",
  description: "纵览华夏五千年——从夏商周到元明清，帝王将相、金戈铁马、文化瑰宝的数字方志",
  lang: 'zh-CN',
  assetsDir: 'assets',
  base: '/dynasty-chronicles/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/dynasty-chronicles/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/dynasty-chronicles/favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/dynasty-chronicles/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#8E2323' }],
  ],
  
  // 本地搜索
  themeConfig: {
    logo: '/logo.svg',
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
      {
        text: '人物',
        items: [
          { text: '人物总览', link: '/figures/' },
          { text: '帝王', link: '/figures/emperors/' },
          { text: '武将', link: '/figures/generals/' },
          { text: '谋臣', link: '/figures/strategists/' },
          { text: '科学家', link: '/figures/scientists/' },
          { text: '文学家', link: '/figures/writers/' },
        ]
      },
      { text: '战役', link: '/battles/' },
      { text: '文化', link: '/culture/' }
    ],
    // 侧边栏
    sidebar: generateSidebar(),

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

---
layout: home

hero:
  name: "王朝编年史"
  text: "纵览华夏五千年"
  tagline: 从夏商周至元明清，帝王将相、金戈铁马、文化瑰宝——一部中华文明的数字方志
  image:
    src: /logo.svg
    alt: 王朝编年史
  actions:
    - theme: brand
      text: 🕐 开始探索
      link: /timeline
    - theme: alt
      text: 🏯 朝代总览
      link: /dynasties/

features:
  - icon: 🏯
    title: 朝代更迭
    details: 从夏商周到元明清，完整梳理每一个朝代的兴衰脉络、制度创新与历史遗产
    link: /dynasties/
  - icon: ⚔️
    title: 著名战役
    details: 长平之战、巨鹿之战、赤壁之战、淝水之战……还原改变历史走向的关键战役
    link: /battles/
  - icon: 👤
    title: 帝王将相
    details: 秦始皇、汉武帝、唐太宗、白起、诸葛亮——走进那些改变历史进程的风云人物
    link: /figures/
  - icon: 📚
    title: 文化瑰宝
    details: 诗词歌赋、四大发明、百家争鸣——探寻延续五千年的中华文化根脉
    link: /culture/
description: ":root { --vp-home-hero-name-color: transparent; --vp-home-hero-name-background: -webkit-linear-gradi……"
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd6b2e 30%, #d44a2e);
}

.VPHomeHero .text {
  font-size: 2.5rem;
  letter-spacing: 0.1em;
}

.VPFeature {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.VPFeature:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
</style>

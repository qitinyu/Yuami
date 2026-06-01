// 尺素页面独立配置 - 可独立编辑
// 将尺素(首页)相关的内容和项目展示从config.ts分离至此
// 便于独立管理和维护

// ========== 项目展示 ==========
export const projects = [
  { name: '雨祁小窝',
    desc: '基于Astro-Mizuki的现代化个人博客',
    preview: 'https://yqamm.cc.cd',
    github: 'https://github.com/qitinyu/yuqi/' },

  { name: '雨祁云盘',
    desc: '基于openlist搭载cloudflared tunnle实现的网盘合集',
    preview: 'https://qitinyu.github.io/yq-twt/',
    github: 'https://github.com/qitinyu/yq-twt' },

  { name: '胡桃-手风琴',
    desc: 'HTML+CSS+JS 制作的简易网页',
    preview: 'https://qitinyu.github.io/hutao-sfq/',
    github: 'https://github.com/qitinyu/hutao-sfq' },

  { name: '雨祁导航',
    desc: 'HTML+CSS+JS 制作的网页导航',
    preview: 'https://qitinyu.github.io/YQ-nav/',
    github: 'https://github.com/qitinyu/YQ-nav' },

  { name: '雨祁-网页练习',
    desc: 'HTML+CSS+JS 制作的较完整网页练习',
    preview: 'https://yq-wz.pages.dev/',
    github: 'https://github.com/qitinyu/yq-wz' },

  { name: '雨祁-自学练习',
    desc: 'HTML+CSS+JS 制作的自学练习',
    preview: 'https://qitinyu.github.io/hutao-J/',
    github: 'https://github.com/qitinyu/hutao-J' },
];

// ========== 青衿打字机文字 ==========
export const typewriterTexts = [
  '这个世界五彩斑斓，而我依旧想要一个安静简约的地方存放躁动的心灵。',
  '生活不止眼前的代码，还有星辰与大海。',
  '生命绚烂，别被黑暗压垮。',
  '记录生活中的每一份美好与感动。',
];

// ========== 悟我(关于我)内容 ==========
export const aboutMe = {
  paragraphs: [
    '你好，欢迎来到我的个人主页。',
    '这个世界五彩斑斓，而我依旧想要一个安静简约的地方存放躁动的心灵。',
    '这里存放的，不仅是我的思考，还有对美好生活的向往。',
  ],
  links: [
    { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'fa-brands fa-github' },
    { name: '主站', url: 'https://yqamm.cc.cd', icon: 'fa-solid fa-globe' },
  ],
};

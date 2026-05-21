// Yuami Blog Configuration
export const siteConfig = {
  title: 'Yuami',
  subtitle: '生命绚烂，别被黑暗压垮',
  description: 'Yuami的个人博客 - 记录生活、思考与创造',
  url: 'https://yqamm.cc.cd',
  author: 'Yuami',
  email: '484894496@qq.com',
  themeColor: '#7D98F5',
  navItems: [
    { name: '尺素', path: '/' },
    { name: '轩窗', path: '/blog', children: [
      { name: '博文', path: '/blog' },
      { name: '旅记', path: '/travel' },
      { name: '回忆', path: '/memory' },
    ]},
    { name: '墨竹', path: '/bangumi', children: [
      { name: '番剧', path: '/bangumi' },
      { name: '闲游', path: '/game' },
      { name: 'LES', path: '/les' },
    ]},
    { name: '萍踪', path: '/friends', children: [
      { name: '友链', path: '/friends' },
      { name: '朋友圈', path: '/friends-circle' },
      { name: '关于', path: '/about' },
    ]},
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'fa-brands fa-github-alt' },
    { name: '米游社', url: 'https://www.miyoushe.com/sr/accountCenter/postList?id=227165994', icon: 'fa-brands fa-battle-net' },
    { name: 'B站', url: 'https://space.bilibili.com/3461582895974946', icon: 'fab fa-bilibili' },
    { name: 'QQ', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-A9MUAbpO68zcu1YAp11NiI3ir7WczLO', icon: 'fa-brands fa-qq' },
    { name: 'Email', url: 'mailto:484894496@qq.com', icon: 'fa-solid fa-envelope' },
  ],
  projects: [
    { name: '雨祁小窝', desc: '基于Astro-Mizuki的现代化个人博客', preview: 'https://yqamm.cc.cd', github: 'https://github.com/qitinyu/yuqi/' },
    { name: '胡桃-手风琴', desc: 'HTML+CSS+JS 制作的简易网页', preview: 'https://qitinyu.github.io/hutao-sfq/', github: 'https://github.com/qitinyu/hutao-sfq' },
    { name: '雨祁-导航', desc: 'HTML+CSS+JS 制作的网页导航', preview: 'https://qitinyu.github.io/YQ-nav/', github: 'https://github.com/qitinyu/YQ-nav' },
    { name: '提瓦特简介', desc: 'HTML+CSS+JS 制作的对于提瓦特大陆的简介', preview: 'https://qitinyu.github.io/yq-twt/', github: 'https://github.com/qitinyu/yq-twt' },
    { name: '雨祁-网页练习', desc: 'HTML+CSS+JS 制作的较完整网页练习', preview: 'https://qitinyu.github.io/yq-wz/', github: 'https://github.com/qitinyu/yq-wz' },
    { name: '雨祁-自学练习', desc: 'HTML+CSS+JS 制作的自学练习', preview: 'https://qitinyu.github.io/hutao-J/', github: 'https://github.com/qitinyu/hutao-J' },
  ],
  // Music player config - 网易云歌单
  music: {
    api: 'https://api.qijieya.cn/meting/',
    server: 'netease',
    type: 'playlist',
    id: '17863308200',
  },
  // Twikoo config (预留)
  twikoo: {
    envId: '', // 后期配置
    region: '',
  },
  // Umami config (预留)
  umami: {
    src: '',
    websiteId: '',
  },
  // Live2D 看板娘配置
  live2d: {
    enabled: true,
    modelPath: '/public/live2/models/jk/jk.cdi3.json',
    modelName: 'jk',
    position: 'left',
    bottom: 0,
    left: 10,
    right: 10,
    width: 280,
    height: 350,
    mobileOff: true,
  },
  // 站点统计配置
  // 注意：totalPosts、totalWords、lastEdit 会在构建时由页面组件自动从 content 动态计算
  // 这里只需设置 startDate
  siteStats: {
    startDate: '2026-05-21', // 站点创建日期，用于计算运行时长
  },
  // 站点推荐
  siteRecommendations: [
    { name: 'Astro 官方文档', url: 'https://docs.astro.build', desc: '现代静态站点生成框架' },
    { name: 'Font Awesome', url: 'https://fontawesome.com', desc: '海量图标库' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'Web 开发权威文档' },
  ],
};

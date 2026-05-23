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
    { name: '墨竹', path: '/anime', children: [
      { name: '番剧', path: '/anime' },
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
    envId: 'https://twikoo-nt.netlify.app/.netlify/functions/twikoo', // 后期配置
    region: 'gansu',
  },
  // Umami 统计配置
  // src 填写 Umami 脚本地址（如 https://cloud.umami.is/script.js），不是分享链接
  // websiteId 填写在 Umami 后台添加站点时获得的网站 ID
  umami: {
    src: 'https://cloud.umami.is/script.js',
    websiteId: '8fc5914d-67a8-4f9b-937d-a9c58df46d4a',
  },
  // Live2D 看板娘配置 (支持 moc3 格式)
  // 注意：路径以 / 开头，对应 public/ 目录（如 /live2/models/jk/ 对应 public/live2/models/jk/）
  live2d: {
    enabled: true,
    modelPath: '/live2/models/',
    modelName: 'wwa',
    position: 'left',
    bottom: 0,
    left: 10,
    right: 10,
    width: 300,
    height: 500,
    scale: 0.15,
    mobileOff: true,
    // 模型列表 - 支持多个模型切换（path 为 model3.json 的完整路径）
    modelList: [
      { name: 'wwa', path: '/live2/models/wwa/wwa.model3.json' },
      { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
      { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
      // 添加更多模型:
      // { name: 'haru', path: '/live2/models/haru/haru.model3.json' },
    ],
  },
  // 站点统计配置
  siteStats: {
    startDate: '2026-05-21', // 站点创建日期，用于计算运行时长
    totalPosts: 6,           // 总文章数（posts + diary）
    totalWords: 12000,       // 总字数（近似值）
    lastEdit: '2026-05-21',  // 最后编辑日期
  },
  // 站点公告
  siteAnnouncements: [
    { date: '2026-05-21', text: '博客功能持续更新中，欢迎反馈建议！' },
    { date: '2026-05-18', text: '博客正式上线，欢迎访问！' },
    { date: '2026-05-01', text: 'Yuami Blog v1.0 构建完成，基于 Astro 框架。' },
  ],
};

// Yuami Blog Configuration
export const siteConfig = {
  title: 'Yuami',
  subtitle: '生命绚烂，别被黑暗压垮',
  description: 'Yuami的个人博客 - 记录生活、思考与创造',
  url: 'https://8872388.xyz',

  // ========== 头像/Logo/图标配置 ==========
  avatar: '/home/avatar.webp',
  icon: '/home/icon.ico',
  logo: {
    image: '/home/logo.webp',
    text: 'Yuami',
  },

  author: 'Yuami',
  email: '484894496@qq.com',
  themeColor: '#7D98F5',

  // ========== 主题色切换功能 ==========
  themeColorPicker: {
    enabled: true,
  },

  // ========== 全局字体配置 ==========
  font: {
    fontFamily: "'朱雀仿宋', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '16px',
    fontFile: '/font/zqfs.woff2',
  },

  // ========== 全局阴影配置 ==========
  shadow: {
    sm: '0 2px 8px rgba(125, 152, 245, 0.08)',
    md: '0 4px 20px rgba(125, 152, 245, 0.12)',
    lg: '0 8px 40px rgba(125, 152, 245, 0.16)',
    hover: '0 8px 30px rgba(125, 152, 245, 0.2)',
  },

  // ========== 樱花飘落效果配置 ==========
  sakura: {
    enabled: true,
    petals: 30,
    minSize: 12,
    maxSize: 26,
    minDuration: 5,
    maxDuration: 10,
    color: '#ffb7c5',
    mobileOff: false,
  },

  // ========== 音乐播放器配置 ==========
  music: {
    enabled: true,
    api: 'https://api.qijieya.cn/meting/',
    server: 'netease',
    type: 'playlist',
    id: '17863308200',
  },

  // ========== 评论系统配置 ==========
  comment: {
    enable: true,
    system: 'twikoo',
    twikoo: {
      envId: 'https://netlify-nt.netlify.app/.netlify/functions/twikoo',
      lang: 'zh-CN',
      version: '1.7.10',
      cdn: 'https://s4.zstatic.net/npm/twikoo@{version}/dist/twikoo.min.js',
      fallbackCdn: 'https://registry.npmmirror.com/twikoo@{version}/files/dist/twikoo.min.js',
    },
    giscus: {
      repo: 'qitinyu/yuami-giscus',
      repoId: 'R_kgDOSmXsaA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOSmXsaM4C9uxi',
      mapping: 'pathname',
      strict: '1',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'noborder_light',
      lang: 'zh-CN',
      loading: 'lazy',
    },
  },

  // ========== 站点访问统计配置 ==========
  busuanzi: {
    enabled: true,
  },

  umami: {
    enabled: false,
    src: '',
    websiteId: '',
    widget: {
      enabled: false,
      shareToken: '',
      apiUrl: '',
    },
  },

  // ========== Live2D 看板娘配置 ==========
  live2d: {
    enabled: true,
    modelPath: '/live2/models/cmtt/',
    modelName: 'cmtt',
    position: 'left',
    bottom: 0,
    left: 10,
    right: 10,
    width: 300,
    height: 500,
    scale: 0.15,
    mobileOff: true,
    modelList: [
      { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
      { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
    ],
  },

  // ========== 站点统计配置 ==========
  siteStats: {
    enabled: true,
    startDate: '2026-05-21',
  },

  // ========== 站点公告 ==========
  siteAnnouncements: {
    enabled: true,
    items: [
      { date: '2026-06-11', text: '博客更新v2.0.4版，拾遗重构集成Twikoo、相册布局优化、翻页修复！' },
      { date: '2026-06-09', text: '博客更新v2.0.3版，重点修复toc目录样式和支持更多md语法！' },
    ],
  },

  // ========== 导航栏配置 ==========
  // enabled: 是否在导航栏显示该版块（true: 显示, false: 隐藏）
  // 注意：隐藏后页面仍可通过URL直接访问，只是不在导航栏展示
  navItems: [
    {
      name: '轩窗',
      path: '/home',
      enabled: true,
    },
    {
      name: '尺素',
      path: '/blog',
      enabled: true,
      children: [
        { name: '博文', path: '/blog', enabled: true },
        { name: '旅记', path: '/travel', enabled: true },
        { name: '回忆', path: '/memory', enabled: true },
      ],
    },
    {
      name: '墨竹',
      path: '/anime',
      enabled: true,
      children: [
        { name: '番剧', path: '/anime', enabled: true },
        { name: '闲游', path: '/game', enabled: true },
        { name: 'LES', path: '/les', enabled: true },
      ],
    },
    {
      name: '萍踪',
      path: '/friends',
      enabled: true,
      children: [
        { name: '友链', path: '/friends', enabled: true },
        { name: '朋友圈', path: '/friends-circle', enabled: true },
        { name: '关于', path: '/about', enabled: true },
      ],
    },
    {
      name: '琉璃',
      path: '/liuli',
      enabled: true,
      children: [
        { name: '拾遗', path: '/liuli', enabled: true },
        { name: '采云', path: '/liuli/openlist', enabled: true },
      ],
    },
  ],

  // ========== 琉璃板块配置 ==========
  liuli: {
    // 采云 - Open List 共享链接
    // 填入你的 Open List 地址，如 'https://alist.example.com'
    // 留空则显示未配置提示
    openListUrl: 'https://open.yqamma.eu.cc',
  },

  // ========== 社交链接 ==========
  socialLinks: [
    { name: 'GitHub',
      url: 'https://github.com/qitinyu',
      icon: 'fa-brands fa-github-alt' },
    { name: '米游社',
      url: 'https://www.miyoushe.com/sr/accountCenter/postList?id=227165994',
      icon: 'fa-brands fa-battle-net' },
    { name: 'B站',
      url: 'https://space.bilibili.com/3461582895974946',
      icon: 'fab fa-bilibili' },
    { name: 'QQ',
      url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-A9MUAbpO68zcu1YAp11NiI3ir7WczLO',
      icon: 'fa-brands fa-qq' },
    { name: 'Email',
      url: 'mailto:484894496@qq.com',
      icon: 'fa-solid fa-envelope' },
  ],

  // ========== 全局背景配置 ==========
  background: {
    enabled: true,
    mobile: [
       '/home/mobile/LES70.jpg',
    ],
    pc: [
       //'/home/pc/1.webp',
       '/home/pc/2.webp',
    ],
    interval: 3000,
  },

  // ========== 加载动画配置 ==========
  loadingAnimation: {
    enabled: true,
    type: 'gif',
    src: '/home/alxy.gif',
    minDuration: 300,
  },

  // ========== 引导页配置 ==========
  welcomePage: {
    enabled: true,
    backgroundImage: 'https://i.postimg.cc/TPqcm4zm/hu-tao55.jpg',
    avatar: '',
    title: '欢迎来到Yuami!',
    subtitle: 'Looking Forward To Meeting You Every Day!',
  },

  // ========== 轩窗(首页)轮播图配置 ==========
  xuanchuang: {
    carouselFixedText: '为世界所有美好而战',
    carouselImages: [
      '/home/lunbo/ht.webp',
      '/home/lunbo/alxy.webp',
      '/home/lunbo/qy.webp',
      '/home/lunbo/ysg.webp',
      '/home/lunbo/xh.webp',
    ],
    carouselInterval: 5000,
    carouselApiUrl: '',
  },

  // ========== 轩窗(首页)打字机文本配置 ==========
  typewriterTexts: [
    '这个世界五彩斑斓，而我依旧想要一个安静简约的地方存放躁动的心灵。',
    '生活不止眼前的代码，还有星辰与大海。',
    '生命绚烂，别被黑暗压垮。',
    '记录生活中的每一份美好与感动。',
  ],
};

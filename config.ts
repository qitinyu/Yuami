// Yuami Blog Configuration
export const siteConfig = {
  title: 'Yuami',
  subtitle: '生命绚烂，别被黑暗压垮',
  description: 'Yuami的个人博客 - 记录生活、思考与创造',
  url: 'https://8872388.xyz',

  // ========== 头像/Logo/图标配置 ==========
  // 头像 - 用于侧边栏个人信息展示
  avatar: '/home/avatar.webp',
  // 网站图标 - 浏览器标签栏图标 (favicon)
  icon: '/home/icon.ico',
  // Logo 配置 - 导航栏左上角显示
  // 支持三种模式:
  //   1. 只显示文字logo: logo: { text: 'Yuami' }
  //   2. 只显示图片logo: logo: { image: '/assets/logo.webp' }
  //   3. 同时显示图片和文字: logo: { image: '/assets/logo.webp', text: 'Yuami' }
  logo: {
    image: '/home/logo.webp',
    text: 'Yuami',
  },

  author: 'Yuami',
  email: '484894496@qq.com',
  themeColor: '#7D98F5',

  // ========== 主题色切换功能 ==========
  themeColorPicker: {
    enabled: true,  // true: 展示主题色切换图标并启用功能, false: 不展示且不启用
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
      // Twikoo 前端 CDN 版本配置
      // 修改 version 可升级前端版本，如 '1.7.10'
      // cdn 可替换为自定义 CDN 地址
      version: '1.7.10',
      cdn: 'https://s4.zstatic.net/npm/twikoo@{version}/dist/twikoo.min.js',
      // 备用 CDN（主 CDN 加载失败时使用）
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

  // ========== Umami 统计配置 ==========
  umami: {
    enabled: false,
    src: 'https://cloud.umami.is/script.js',
    websiteId: '8fc5914d-67a8-4f9b-937d-a9c58df46d4a',
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
      { date: '2026-05-30', text: '博客更新v1.0.8正式版，修复音乐播放器相关问题！' },
      { date: '2026-05-28', text: '博客更新1.0.7正式版，1.0.8beta正在完善！' },
      { date: '2026-05-24', text: 'Yuami 框架修缮。' },
    ],
  },

  // ========== 导航栏配置 ==========
  navItems: [
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
    { name: '尺素', path: '/home' },
  ],

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
  // enabled: 是否启用全屏背景图片
  // mobile: 移动端背景图片数组（填入1张时固定，填入多张时3秒轮播）
  // pc: PC端背景图片数组（填入1张时固定，填入多张时3秒轮播）
  // 可以填入随机图片API地址（如 https://api.example.com/random），
  // 此时无论pc和移动端均自由3秒轮播
  // 背景图片会根据设备自动适配（移动端用mobile，PC端用pc）
  background: {
    enabled: true,
    mobile: [
       'https://loliapi.com/acg',
       //'/public/home/mobile/ht.jpg'
    ],
    
    pc: [
      //'https://mu.baimu.live/img/fj/',
      '/public/home/pc/ht.png'
    ],
    interval: 5000, // 轮播间隔（毫秒），默认3秒
  },
};

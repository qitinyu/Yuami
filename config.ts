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
    // Umami统计组件展示配置（侧边栏Umami统计面板）
    widget: {
      enabled: true,  // 是否在侧边栏显示Umami统计面板
      apiUrl: 'https://cloud.umami.is/api/website/YHtHzeC7Rf9fF4eV/stats', 
      // Umami API地址，如 https://cloud.umami.is/api/websites/{websiteId}/stats
      // 如果不填apiUrl，则仅展示基础信息（需umami.enabled=true才有脚本注入）
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
      { date: '2026-06-05', text: '博客更新v2.0.1正式版，修复轩窗和背景图片相关问题！' },
      { date: '2026-06-03', text: '博客更新v2.0.1beta版，正式版正在完善！' },
    ],
  },

  // ========== 导航栏配置 ==========
  navItems: [
    { name: '轩窗', path: '/home' },
    { name: '尺素', path: '/blog', children: [
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
       '/home/mobile/ht.webp',
    ],
    pc: [
       '/home/pc/1.webp',
      // '/public/home/pc/2.webp',

    ],
    interval: 3000, // 轮播间隔（毫秒），默认3秒
  },

  // ========== 加载动画配置 ==========
  // enabled: 是否启用全局加载动画
  // type: 加载动画类型
  //   'gif'   - 自定义GIF/图片，需填写src为图片路径（如 /home/loading.gif）
  //   'online' - 在线加载样式，需填写src为在线CSS/动画URL
  //   'builtin' - 内置加载动画（默认旋转圆环），无需额外资源
  // src: 加载资源路径（gif/online类型必填，builtin类型忽略）
  // minDuration: 最小显示时长（毫秒），建议200-500ms，过长会影响体验
  loadingAnimation: {
    enabled: true,
    type: 'gif', // 'builtin' | 'gif' | 'online'
    src: '/home/glby.gif',         // gif类型: '/home/loading.gif' | online类型: CSS URL
    minDuration: 300,
  },

  // ========== 引导页配置 ==========
  // enabled: 是否启用引导页（访客最先看到的页面）
  // backgroundImage: 引导页背景图片路径
  //   支持本地路径（如 '/home/welcome-bg.webp'，图片放在 public/home/ 目录下）
  //   支持在线URL（如 'https://example.com/bg.jpg'）
  //   为空时使用默认渐变背景（亮色模式：紫蓝渐变，暗色模式：深蓝渐变）
  // avatar: 引导页头像图片（为空则使用全局avatar）
  // title: 引导页主标题
  // subtitle: 引导页副标题
  welcomePage: {
    enabled: true,
    backgroundImage: 'https://i.postimg.cc/TPqcm4zm/hu-tao55.jpg',  // ★ 更换引导页背景图片：填写路径如 '/home/welcome-bg.webp'
    avatar: '',           // 为空则使用全局avatar
    title: '欢迎来到Yuami',
    subtitle: 'Welcome to Yuami',
  },

  // ========== 轩窗(首页)轮播图配置 ==========
  // carouselFixedText: 轮播图上方的固定文字（第一行）
  // carouselImages: 轮播图片路径数组
  //   支持本地路径（如 '/home/blog/1.webp'）或在线图片URL
  //   填入目录路径（如 '/home/blog'）时，自动扫描该目录下的图片
  //   填入随机图片API地址时，每次轮播自动获取新图片
  // carouselInterval: 轮播间隔（毫秒），默认5秒
  // carouselApiUrl: 自定义图片API地址，优先级高于carouselImages
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
    carouselApiUrl: 
    '', 
    //https://tmini.net/api/bing-wallpaper
    // 如 '' ，留空则使用carouselImages,
  },

  // ========== 轩窗(首页)打字机文本配置 ==========
  // typewriterTexts: 打字机轮播文本数组（轮播图下方第二行文字）
  typewriterTexts: [
    '这个世界五彩斑斓，而我依旧想要一个安静简约的地方存放躁动的心灵。',
    '生活不止眼前的代码，还有星辰与大海。',
    '生命绚烂，别被黑暗压垮。',
    '记录生活中的每一份美好与感动。',
  ],
};

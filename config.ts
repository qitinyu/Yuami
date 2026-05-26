// Yuami Blog Configuration
export const siteConfig = {
  title: 'Yuami',
  subtitle: '生命绚烂，别被黑暗压垮',
  description: 'Yuami的个人博客 - 记录生活、思考与创造',
  url: 'https://8872388.xyz',
  author: 'Yuami',
  email: '484894496@qq.com',
  themeColor: '#7D98F5',

  // ========== 主题色切换功能 ==========
  themeColorPicker: {
    enabled: true,  // true: 展示主题色切换图标并启用功能, false: 不展示且不启用
  },

  // ========== 全局字体配置 ==========
  // 字体文件存放于 public/font/ 目录下
  // 修改 fontFamily 后请确保对应字体文件已放入 public/font/ 并在下方 fontFile 中声明
  font: {
    fontFamily: "'朱雀仿宋', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '16px',     // 基础字体大小（支持px/rem）
    fontFile: '/font/zqfs.woff2',  // 自定义字体文件路径（相对public目录）
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
    enabled: false,        // 开启/关闭樱花飘落效果（true: 开启, false: 关闭）
    petals: 25,           // 同时飘落的花瓣数量
    minSize: 10,          // 最小花瓣大小（px）
    maxSize: 22,          // 最大花瓣大小（px）
    minDuration: 6,       // 最短飘落时间（秒）
    maxDuration: 12,      // 最长飘落时间（秒）
    color: '#ffb7c5',     // 花瓣主色（支持任意CSS颜色值）
    mobileOff: false,     // 手机端是否关闭
  },

  // ========== 音乐播放器配置 ==========
  music: {
    api: 'https://api.qijieya.cn/meting/',
    server: 'netease',
    type: 'playlist',
    id: '17863308200',
  },

  // ========== Twikoo 评论配置 ==========
  twikoo: {
    envId: 'https://netlify-nt.netlify.app/.netlify/functions/twikoo',
    region: 'gansu',
  },

  // ========== Umami 统计配置 ==========
  umami: {
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
      { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
      { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
    ],
  },

  // ========== 站点统计配置 ==========
  siteStats: {
    startDate: '2026-05-21',
    totalPosts: 6,
    totalWords: 12000,
    lastEdit: '2026-05-21',
  },

  // ========== 站点公告 ==========
  siteAnnouncements: [
    { date: '2026-05-24', text: '博客发布v1.0.5版本，欢迎反馈建议！' },
    { date: '2026-05-21', text: '博客正式上线v1.0.3，欢迎访问！' },
    { date: '2026-05-20', text: 'Yuami Blog v1.0 构建完成，基于 Astro 框架。' },
  ],

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
    { name: '尺素', path: '/' },
  ],

  // ========== 社交链接 ==========
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'fa-brands fa-github-alt' },
    { name: '米游社', url: 'https://www.miyoushe.com/sr/accountCenter/postList?id=227165994', icon: 'fa-brands fa-battle-net' },
    { name: 'B站', url: 'https://space.bilibili.com/3461582895974946', icon: 'fab fa-bilibili' },
    { name: 'QQ', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-A9MUAbpO68zcu1YAp11NiI3ir7WczLO', icon: 'fa-brands fa-qq' },
    { name: 'Email', url: 'mailto:484894496@qq.com', icon: 'fa-solid fa-envelope' },
  ],

  // ========== 项目展示 ==========
  projects: [
    { name: '雨祁小窝', desc: '基于Astro-Mizuki的现代化个人博客', preview: 'https://yqamm.cc.cd', github: 'https://github.com/qitinyu/yuqi/' },
    { name: '胡桃-手风琴', desc: 'HTML+CSS+JS 制作的简易网页', preview: 'https://qitinyu.github.io/hutao-sfq/', github: 'https://github.com/qitinyu/hutao-sfq' },
    { name: '雨祁-导航', desc: 'HTML+CSS+JS 制作的网页导航', preview: 'https://qitinyu.github.io/YQ-nav/', github: 'https://github.com/qitinyu/YQ-nav' },
    { name: '提瓦特简介', desc: 'HTML+CSS+JS 制作的对于提瓦特大陆的简介', preview: 'https://qitinyu.github.io/yq-twt/', github: 'https://github.com/qitinyu/yq-twt' },
    { name: '雨祁-网页练习', desc: 'HTML+CSS+JS 制作的较完整网页练习', preview: 'https://qitinyu.github.io/yq-wz/', github: 'https://github.com/qitinyu/yq-wz' },
    { name: '雨祁-自学练习', desc: 'HTML+CSS+JS 制作的自学练习', preview: 'https://qitinyu.github.io/hutao-J/', github: 'https://github.com/qitinyu/hutao-J' },
  ],
};

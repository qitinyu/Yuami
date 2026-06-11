// 回忆（相册）数据配置 - 可独立编辑
// 每个相册独立配置：名称、简介、封面、加密、图片来源等

export interface AlbumConfig {
  /** 相册唯一ID，同时用于本地目录名（如 public/huiyi/{id}/） */
  id: string;
  /** 相册显示名称 */
  title: string;
  /** 相册简介 */
  desc: string;
  /** 封面图片路径（本地路径或URL，留空则自动使用第一张图片） */
  cover: string;
  /** 相册内照片总数（留0则自动统计） */
  count: number;
  /** 是否加密（加密后访客需输入密码才能查看相册内容，封面仍可显示） */
  encrypted: boolean;
  /** 加密密码（仅在 encrypted 为 true 时生效） */
  password: string;
  /**
   * 补充图片来源列表 - 主要用于添加URL在线图片
   * - 本地图片会自动从 cover 所在目录扫描，无需手动列出
   * - URL图片：以 http:// 或 https:// 开头的在线图片地址，会与本地扫描结果合并
   * - 本地路径：以 / 开头的目录或文件路径（通常不需要，因为会自动扫描 cover 目录）
   * - 如果留空数组 []，则仅使用 cover 目录自动扫描的本地图片
   * - 示例：images: ['https://example.com/extra.jpg'] 自动扫描本地 + 追加URL图片
   */
  images: string[];
}

export const albumList: AlbumConfig[] = [
  {
    id: '1',
    title: '胡桃',
    desc: '幽蝶能留一缕芳',
    cover: '/huiyi/胡桃/cover.webp',
    count: 12,
    encrypted: false,
    password: '',
    images: [
      'https://i.postimg.cc/TPqcm4zm/hu-tao55.jpg'
    ],  // 留空则仅使用 cover 目录自动扫描的本地图片
  },
  {
    id: '2',
    title: '原神',
    desc: '我们终将重逢',
    cover: '/huiyi/原神/cover.webp',
    count: 8,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '3',
    title: 'LES',
    desc: '她眼里的她',
    cover: '/huiyi/LES/cover.webp',
    count: 15,
    encrypted: true,
    password: '123456',
    images: [
      'https://i.postimg.cc/TPqcm4zm/hu-tao55.jpg'
    ],
  },
  {
    id: '4',
    title: '米哈游',
    desc: '技术宅拯救世界',
    cover: '/huiyi/米哈游/cover.webp',
    count: 20,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '5',
    title: '爱莉希雅',
    desc: '为世界所有美好而战',
    cover: '/huiyi/爱莉希雅/cover.webp',
    count: 10,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '6',
    title: '琪亚娜',
    desc: '每一场日落都不相同，却同样令人心动。',
    cover: '/huiyi/琪亚娜/cover.webp',
    count: 6,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '7',
    title: '青衣',
    desc: '味蕾上的旅行，每一口都是幸福。',
    cover: '/huiyi/青衣/cover.webp',
    count: 18,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '8',
    title: '星布谷地',
    desc: '一起种田吧',
    cover: '/huiyi/星布谷地/cover.webp',
    count: 9,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '9',
    title: '叶瞬光',
    desc: '三尺清风,斩尽红尘',
    cover: '/huiyi/叶瞬光/cover.webp',
    count: 14,
    encrypted: false,
    password: '',
    images: [],
  },
  {
    id: '10',
    title: '其他',
    desc: '其他相册',
    cover: '/huiyi/其他/cover.webp',
    count: 0,
    encrypted: false,
    password: '',
    images: [],
  },

  // ===== 加密相册示例 =====
  // {
  //   id: 'private-album',
  //   title: '私密相册',
  //   desc: '需要密码才能查看的相册。',
  //   cover: '/huiyi/private-album/cover.webp',
  //   count: 5,
  //   encrypted: true,
  //   password: '123456',
  //   images: [],
  // },
  // ===== URL图片相册示例 =====
  // {
  //   id: 'online-photos',
  //   title: '在线图片集',
  //   desc: '使用URL引用的在线图片。',
  //   cover: 'https://example.com/cover.jpg',
  //   count: 3,
  //   encrypted: false,
  //   password: '',
  //   images: [
  //     'https://example.com/photo1.jpg',
  //     'https://example.com/photo2.jpg',
  //     'https://example.com/photo3.jpg',
  //   ],
  // },
  // ===== 混合图片相册示例 =====
  // {
  //   id: 'mixed-album',
  //   title: '混合相册',
  //   desc: '本地图片和在线URL混合使用。',
  //   cover: '/huiyi/mixed-album/cover.webp',
  //   count: 0,
  //   encrypted: false,
  //   password: '',
  //   images: [
  //     'https://example.com/extra.jpg', // URL图片会追加到本地扫描结果中
  //   ],
  // },
];

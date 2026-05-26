// 页脚配置 - 可独立编辑备案信息、许可证等内容
export const footerConfig = {
  // 版权信息
  copyright: {
    year: 2026,
    owner: 'qitinyu',
    ownerUrl: 'https://github.com/qitinyu',
    siteUrl: 'https://yqamm.cc.cd',
    email: '484894496@qq.com',
  },
  // 技术信息
  powered: {
    framework: 'Astro',
    theme: 'Yuami',
    version: '1.0',
  },
  // 备案信息（可选，留空则不显示）
  icp: '',
  // 自定义额外行（可选，每行一段文字，支持 HTML）
  customLines: [] as string[],
};

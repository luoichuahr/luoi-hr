import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lười HR — AI cho dân Nhân Sự',
  tagline: 'Lazy, not stupid. Dùng AI để làm việc nhanh hơn.',
  favicon: 'img/favicon.ico',

  url: 'https://luoi-hr.vercel.app',
  baseUrl: '/',
  organizationName: 'luoichuahr',
  projectName: 'luoi-hr',
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'vi', locales: ['vi'] },

  plugins: [
    function chunkSplitter() {
      return {
        name: 'chunk-splitter',
        configureWebpack(config, isServer) {
          if (isServer) return {};
          return {
            optimization: {
              splitChunks: {
                chunks: 'all',
                cacheGroups: {
                  vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 10,
                    chunks: 'all',
                  },
                },
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    ['classic', ({
      docs: { sidebarPath: './sidebars.js' },
      blog: false,
      theme: { customCss: './src/css/custom.css' },
      gtag: process.env.NODE_ENV === 'production'
        ? { trackingID: 'G-KELJV9GYP2', anonymizeIP: true }
        : undefined,
    })],
  ],

  themeConfig: ({
    image: 'img/social-card.png',
    colorMode: { disableSwitch: true, respectPrefersColorScheme: true },
    navbar: {
      title: '🦥 Lười HR',
      logo: { alt: 'Lười HR Logo', src: 'img/logo.svg' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Bí Kíp Nhân sự',
        },
        {
          to: '/tools/ai-career-wingman',
          position: 'left',
          label: '✨ Tool tạo CV',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bí kíp',
          items: [{ label: 'Tất cả bài viết', to: '/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban' }],
        },
        {
          title: 'Liên hệ',
          items: [
            { label: 'Zalo', href: 'https://zalo.me/0967696836' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Lười HR — AI cho dân Nhân Sự`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;

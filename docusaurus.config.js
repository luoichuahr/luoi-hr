import {themes as prismThemes} from 'prism-react-renderer';
import {createSitemapItems} from './src/data/sitemap.js';

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
      sitemap: { createSitemapItems }, // logic ở src/data/sitemap.js
    })],
  ],

  themeConfig: ({
    image: 'img/social-card-v2.png',
    colorMode: { disableSwitch: true, respectPrefersColorScheme: true },
    navbar: {
      title: 'Lười HR',
      // Mascot thật, cắt từ static/img/logo.png (key visual gốc). Trước đây dùng
      // emoji 🦥 — mỗi hệ điều hành vẽ một kiểu, Windows ra con lười khác hẳn
      // mascot của thương hiệu.
      logo: { alt: 'Lười HR', src: 'img/logo-mark.png', width: 34, height: 34 },

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Bí Kíp Nhân sự',
        },
        // Mega menu: nội dung ở src/data/tools.js, type đăng ký ở
        // src/theme/NavbarItem/ComponentTypes.js. Không thêm item position:'right'
        // — widget GoogleTranslate là position:fixed mép phải, item sẽ chui xuống dưới.
        { type: 'custom-megaMenu', position: 'left' },
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

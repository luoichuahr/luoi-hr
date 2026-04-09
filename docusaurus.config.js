import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lười HR — AI cho dân Nhân Sự',
  tagline: 'Lazy, not stupid. Dùng AI để làm việc nhanh hơn.',
  favicon: 'img/favicon.ico',
  future: { v4: true },
  url: 'https://luoi-hr.vercel.app',
  baseUrl: '/',
  organizationName: 'luoichuahr',
  projectName: 'luoi-hr',
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'vi', locales: ['vi'] },

  presets: [
    ['classic', ({
      docs: { sidebarPath: './sidebars.js' },
      blog: false,
      theme: { customCss: './src/css/custom.css' },
    })],
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: '🦥 Lười HR',
      logo: { alt: 'Lười HR Logo', src: 'img/logo.svg' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Bí kíp AI',
        },
        {
          href: 'https://github.com/luoichuahr/luoi-hr',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bí kíp',
          items: [{ label: 'Tất cả bài viết', to: '/docs/intro' }],
        },
        {
          title: 'Liên hệ',
          items: [
            { label: 'Zalo', href: 'https://zalo.me/luoichuahr' },
            { label: 'GitHub', href: 'https://github.com/luoichuahr/luoi-hr' },
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

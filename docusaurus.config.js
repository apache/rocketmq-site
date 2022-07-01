const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'RocketMQ',
  tagline: '官方网站',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // i18n: {
  //   defaultLocale: 'zh',
  //   locales: ['zh','en'],
  //   localeConfigs: {
  //     zh: {
  //       label: '简体中文',
  //     },
  //     en: {
  //       label: 'English',
  //     },
  //   }
  // },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs', // Serve the docs at the site's root
          /* other docs plugin options */
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          blogTitle: 'RocketMQ 博客',
          blogDescription: '技术更新·线上下活动·用户案例',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',

        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'R2IYF7ETH7',
        apiKey: '599cec31baffa4868cae4e79f180729b',
        indexName: 'docsearch',
      },
      navbar: {
        title: 'RocketMQ',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/Apache_RocketMQ_logo.svg.png',

        },
        items: [
          {to: '/docs', label: '文档', position: 'right'},
          {to: '/blog', label: '博客', position: 'right'},
          // {
          //   href: 'https://github.com/apache/rocketmq',
          //   label: 'GitHub',
          //   position: 'right',
          // },
          {to: '/download', label: '下载', position: 'right'},
          {to: '/download', label: '社区', position: 'right'},
          //  {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          // {
          //   type: 'docsVersionDropdown',
          //   position:"right"
          // },
        ],
      },
      footer: {
        style: 'dark',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/Apache_RocketMQ_logo.svg.png',

        // },
        links: [
          
          {
            title: '社区',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/apache/rocketmq',
              },
              {
                label: '公众号',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Meetup',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'Changelog',
                href: 'https://github.com/apache/rocketmq',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/apache/rocketmq',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});

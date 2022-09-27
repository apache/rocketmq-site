const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "RocketMQ",
    tagline: "官方网站",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "facebook", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    i18n: {
      defaultLocale: 'zh',
      locales: ['zh','en'],
      localeConfigs: {
        zh: {
          label: '简体中文',
        },
        en: {
          label: 'English',
        },
      }
    },

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: "/docs/", // Serve the docs at the site's root
            /* other docs plugin options */
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl:
              "https://github.com/apache/rocketmq-site/tree/new-official-website",
              lastVersion: '5.0',
              versions: {
                current: {
                  label: '4.x',
                  path: '/4.x',
                  banner: 'none'
                },
                '5.0': {
                  label: '5.0'
                }
},
          },
          blog: {
            blogTitle: "RocketMQ 博客",
            blogDescription: "技术更新·线上下活动·用户案例",
            postsPerPage: "ALL",
            blogSidebarTitle: "All posts",
            blogSidebarCount: "ALL",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],
    plugins: [
      [
        "@docusaurus/plugin-content-blog",
        {
          /**
           * Required for any multi-instance plugin
           */
          id: "events",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "events",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./events",
        },
      ],
      [
        "@docusaurus/plugin-content-blog",
        {
          /**
           * Required for any multi-instance plugin
           */
          id: "release-notes",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "release-notes",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./release-notes",
        },
      ],
      [
        "@docusaurus/plugin-content-blog",
        {
          /**
           * Required for any multi-instance plugin
           */
          id: "news",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "news",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./news",
        },
      ],
      [
        '@docusaurus/plugin-client-redirects', {
          redirects: [
            {
              from: '/dowloading/releases/',
              to: '/download'
            },
            {
              from: '/year-archive/',
              to: '/release-notes'
            },
            {
              from: '/users/',
              to: '/blog'
            },
            {
              from: '/about/contact/',
              to: '/contact'
            },
            {
              from: '/about/origin/',
              to: '/origin'
            },
            {
              from: '/about/team/',
              to: '/team'
            },
            {
              from: '/about/rewards/',
              to: '/news'
            },
            {
              from: '/docs/rmq-arc',
              to: '/docs/领域模型/01main'
            },
            {
              from: '/docs/rmq-deployment/',
              to: '/docs/部署运维/15deploy'
            },
            {
              from: '/docs/motivation/',
              to: '/docs/'
            },
            {
              from: ['/docs/quickstart/', '/docs/quick-start'],
              to: '/docs/快速入门/02quickstart'
            },
            {
              from: '/docs/how-to-contribute/',
              to: '/docs/贡献指南/29how-to-contribute'
            },
            {
              from: '/docs/code-guidelines/',
              to: '/docs/贡献指南/30code-guidelines'
            },
            {
              from: '/docs/pull-request/',
              to: '/docs/贡献指南/31pull-request'
            },
            {
              from: '/docs/release-manual',
              to: '/docs/贡献指南/32release-manual'
            },
            {
              from: '/docs/cli-admin-tool/',
              to: '/docs/部署运维/16admintool'
            },
            {
              from: '/docs/system-config',
              to: '/docs/最佳实践/19JVMOS'
            },
            {
              from: '/docs/faq/',
              to: '/docs/最佳实践/22FAQ'
            },
            {
              from: '/docs/logappender-example/',
              to: '/docs/4.x/最佳实践/20log'
            },
            {
              from: '/docs/order-example/',
              to: '/docs/4.x/生产者/06message2'
            },
            {
              from: '/docs/schedule-example/',
              to: '/docs/4.x/生产者/07message3'
            },
            {
              from: '/docs/batch-example/',
              to: '/docs/4.x/生产者/08message4'
            },
            {
              from: '/docs/transaction-example/',
              to: '/docs/4.x/生产者/09message5'
            },
            {
              from: '/docs/cluster-deployment/',
              to: '/docs/4.x/参数配置/24server'
            },
            {
              from: '/docs/documentation/',
              to: '/docs/'
            },
            {
              from: '/docs/best-practice-consumer/',
              to: '/docs/4.x/最佳实践/15bestpractice'
            },
            {
              from: '/release_notes/',
              to: '/release-notes'
            },
          ]
        }
      ]
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        algolia: {
          appId: "R2IYF7ETH7",
          apiKey: "599cec31baffa4868cae4e79f180729b",
          indexName: "docsearch",
        },
        prism: {

          additionalLanguages: ["java"],
          theme: require('prism-react-renderer/themes/dracula'),
        },
        navbar: {
          title: "Apache RocketMQ",
        // hideOnScroll: true,
          logo: {
            alt: "My Site Logo",
            src: "img/Apache_RocketMQ_logo.svg.png",
          },

          items: [
            {
              href: 'https://github.com/apache/rocketmq',
              label: 'GitHub',
              position: 'right',
            },
            {
          type: 'localeDropdown',
          position: 'right',
        },
        // {
        //   type: "docsVersionDropdown",
        //   position: "right",
        //   // label: "版本",
        //   // position: "right",
        //   // items: [
        //   //   { to: "/docs/", label: "4.x" },
        //   //   { to: "/docs/5.0/介绍/02quickstart", label: "5.0" },

        //   //   // ... more items
        //   // ],
        // },
            // { to: "/docs/", label: "文档", position: "right" },
            {
              type: "dropdown",
              label: "文档",
              position: "right",
              items: [
                // { to: "/info", label: "项目信息" },
                { to: "/docs/", label: "5.0" },
                { to: "/docs/4.x/", label: "4.x" },
                
                // ... more items
              ],
            },
            { to: "/download", label: "下载", position: "right" },
            {
              type: "dropdown",
              label: "博客",
              position: "right",
              items: [
                { to: "/blog", label: "用户案例" },
                { to: "/events", label: "社区活动" },
                { to: "/release-notes", label: "版本变化" },
                { to: "/news", label: "RocketMQ新闻" },
                // ... more items
              ],
            },

            // {to: '/download', label: '社区', position: 'right'},

            {
              type: "dropdown",
              label: "社区",
              position: "right",
              items: [
                // { to: "/info", label: "项目信息" },
                { to: "/contact", label: "参与社区" },
                { to: "/origin", label: "项目起源" },
                { to: "/team", label: "贡献团队" },
                { to: "/docs/贡献指南/29how-to-contribute", label: "贡献说明" },
                // ... more items
              ],
            },

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
        // footer: {
        //   style: "dark",

        //   // logo: {
        //   //   alt: 'My Site Logo',
        //   //   src: 'img/Apache_RocketMQ_logo.svg.png',

        //   // },
        //   links: [
        //     {
        //       title: "社区",
        //       items: [
        //         {
        //           label: "Github",
        //           href: "https://github.com/apache/rocketmq",
        //         },
        //         {
        //           label: "公众号",
        //           href: "/contact",
        //         },
        //         {
        //           label: "Meetup",
        //           href: "/contact",
        //         },
        //       ],
        //     },
        //     {
        //       title: "更多",
        //       items: [
        //         {
        //           label: "博客",
        //           to: "/blog",
        //         },
        //         {
        //           label: "Changelog",
        //           href: "/release-notes",
        //         },
        //         {
        //           label: "GitHub",
        //           href: "https://github.com/apache/rocketmq",
        //         },
        //       ],
        //     },
        //   ],
        //   // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        // },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Learn',
              items: [
                {
                  label: 'Introduction',
                  to: '/docs/领域模型/01main',
                },
                {
                  label: 'Installation',
                  to: '/docs/快速入门/02quickstart',
                },
                {
                  label: 'Migration from 4.x to 5.0',
                  to: '/version',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/ApacheRocketMQ',
                },
                {
                  label: 'Github',
                  to: 'https://github.com/apache/rocketmq',
                },
                {
                  label: 'Help',
                  to: 'https://github.com/apache/rocketmq',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'Blog',
                  to: '/blog',
                },
                {
                  label: 'Changelog',
                  to: '/release-notes',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/apache/rocketmq',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/docusaurus',
                },

              ],
            },
            {
              title: 'Legal',
              // Please don't remove the privacy and terms, it's a legal
              // requirement.
              items: [
                {
                  label: 'Licenses',
                  href: 'https://www.apache.org/licenses/',
                },
                {
                  label: 'Security',
                  href: 'https://www.apache.org/security/',
                },
                {
                  label: 'Thanks',
                  href: 'https://www.apache.org/foundation/thanks.html',
                },
                {
                  label: 'Sponsorship',
                  href: 'https://www.apache.org/foundation/sponsorship.html',
                },
              ],
            },
          ],
          logo: {
            alt: 'Meta Open Source Logo',
            src: 'img/Apache_RocketMQ_logo.svg.png',
            href: 'https://rocketmq.apache.org/',
          },
          copyright: `Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);

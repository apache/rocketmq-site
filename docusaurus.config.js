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
              lastVersion: 'current',
              versions: {
                current: {
                  label: '4.x',
                  path: '',
                },
                '5.0': {
                  label: '5.0',
                  banner: 'unreleased'
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
          id: "second-blog",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "second-blog",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./second-blog",
        },
      ],
      [
        "@docusaurus/plugin-content-blog",
        {
          /**
           * Required for any multi-instance plugin
           */
          id: "third-blog",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "third-blog",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./third-blog",
        },
      ],
      [
        "@docusaurus/plugin-content-blog",
        {
          /**
           * Required for any multi-instance plugin
           */
          id: "forth-blog",
          /**
           * URL route for the blog section of your site.
           * *DO NOT* include a trailing slash.
           */
          routeBasePath: "forth-blog",
          /**
           * Path to data on filesystem relative to site dir.
           */
          path: "./forth-blog",
        },
      ],
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
                { to: "/docs/", label: "4.x" },
                { to: "/docs/5.0/", label: "5.0" },
                
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
                { to: "/second-blog", label: "社区活动" },
                { to: "/third-blog", label: "版本变化" },
                { to: "/forth-blog", label: "RocketMQ新闻" },
                // ... more items
              ],
            },
           
            // {
            //   href: 'https://github.com/apache/rocketmq',
            //   label: 'GitHub',
            //   position: 'right',
            // },

            // {to: '/download', label: '社区', position: 'right'},

            {
              type: "dropdown",
              label: "社区",
              position: "right",
              items: [
                // { to: "/info", label: "项目信息" },
                { to: "/contact", label: "参与社区" },
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
        //           href: "/third-blog",
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
                  to: '/docs/介绍/03whatis',
                },
                {
                  label: 'Installation',
                  to: '/docs/介绍/02quickstart',
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
                  to: '/third-blog',
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

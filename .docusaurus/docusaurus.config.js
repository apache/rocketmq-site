export default {
  "title": "RocketMQ",
  "tagline": "官方网站",
  "url": "https://your-docusaurus-test-site.com",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "organizationName": "facebook",
  "projectName": "docusaurus",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "routeBasePath": "/docs",
          "sidebarPath": "/Users/rhuen/Documents/Documents - Rhuen’s MacBook Pro/04 github/rocketmq-docs/rocketmq-site/sidebars.js",
          "editUrl": "https://github.com/facebook/docusaurus/edit/main/website/"
        },
        "blog": {
          "blogTitle": "RocketMQ 博客",
          "blogDescription": "技术更新·线上下活动·用户案例",
          "postsPerPage": "ALL",
          "blogSidebarTitle": "All posts",
          "blogSidebarCount": "ALL"
        },
        "theme": {
          "customCss": "/Users/rhuen/Documents/Documents - Rhuen’s MacBook Pro/04 github/rocketmq-docs/rocketmq-site/src/css/custom.css"
        }
      }
    ]
  ],
  "themeConfig": {
    "algolia": {
      "appId": "R2IYF7ETH7",
      "apiKey": "599cec31baffa4868cae4e79f180729b",
      "indexName": "docsearch",
      "contextualSearch": false,
      "searchParameters": {}
    },
    "navbar": {
      "title": "RocketMQ",
      "hideOnScroll": true,
      "logo": {
        "alt": "My Site Logo",
        "src": "img/Apache_RocketMQ_logo.svg.png"
      },
      "items": [
        {
          "to": "/docs",
          "label": "文档",
          "position": "right"
        },
        {
          "to": "/blog",
          "label": "博客",
          "position": "right"
        },
        {
          "to": "/download",
          "label": "下载",
          "position": "right"
        },
        {
          "to": "/download",
          "label": "社区",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "资料",
          "items": [
            {
              "label": "文档",
              "to": "/docs"
            },
            {
              "label": "视频",
              "to": "/docs"
            }
          ]
        },
        {
          "title": "社区",
          "items": [
            {
              "label": "Github",
              "href": "https://github.com/apache/rocketmq"
            },
            {
              "label": "公众号",
              "href": "https://discordapp.com/invite/docusaurus"
            },
            {
              "label": "Meetup",
              "href": "https://twitter.com/docusaurus"
            }
          ]
        },
        {
          "title": "更多",
          "items": [
            {
              "label": "博客",
              "to": "/blog"
            },
            {
              "label": "Changelog",
              "href": "https://github.com/apache/rocketmq"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/apache/rocketmq"
            }
          ]
        }
      ]
    },
    "prism": {
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      },
      "additionalLanguages": []
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "hideableSidebar": false
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};
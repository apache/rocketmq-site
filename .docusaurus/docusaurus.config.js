export default {
  "title": "RocketMQ",
  "tagline": "官方网站",
  "url": "https://your-docusaurus-test-site.com",
  "baseUrl": "/en/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "organizationName": "facebook",
  "projectName": "docusaurus",
  "i18n": {
    "defaultLocale": "zh",
    "locales": [
      "zh",
      "en"
    ],
    "localeConfigs": {
      "zh": {
        "label": "简体中文",
        "direction": "ltr"
      },
      "en": {
        "label": "English",
        "direction": "ltr"
      }
    }
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "routeBasePath": "/docs/",
          "sidebarPath": "/Users/rhuen/Documents/Documents - Rhuen’s MacBook Pro/04 github/rocketmq-docs/rocketmq-site/sidebars.js",
          "editUrl": "https://github.com/apache/rocketmq-site/tree/new-official-website",
          "lastVersion": "current",
          "versions": {
            "current": {
              "label": "4.x",
              "path": ""
            },
            "5.0": {
              "label": "5.0",
              "banner": "unreleased"
            }
          }
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
  "plugins": [
    [
      "@docusaurus/plugin-content-blog",
      {
        "id": "second-blog",
        "routeBasePath": "second-blog",
        "path": "./second-blog"
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        "id": "third-blog",
        "routeBasePath": "third-blog",
        "path": "./third-blog"
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        "id": "forth-blog",
        "routeBasePath": "forth-blog",
        "path": "./forth-blog"
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
    "navbar": {
      "title": "RocketMQ",
      "logo": {
        "alt": "My Site Logo",
        "src": "img/Apache_RocketMQ_logo.svg.png"
      },
      "items": [
        {
          "type": "localeDropdown",
          "position": "right",
          "dropdownItemsBefore": [],
          "dropdownItemsAfter": []
        },
        {
          "type": "docsVersionDropdown",
          "position": "right",
          "dropdownItemsBefore": [],
          "dropdownItemsAfter": []
        },
        {
          "to": "/docs/",
          "label": "Docs",
          "position": "right"
        },
        {
          "to": "/download",
          "label": "Download",
          "position": "right"
        },
        {
          "type": "dropdown",
          "label": "Blog",
          "position": "right",
          "items": [
            {
              "to": "/blog",
              "label": "User Cases"
            },
            {
              "to": "/second-blog",
              "label": "Activity"
            },
            {
              "to": "/third-blog",
              "label": "Change Log"
            },
            {
              "to": "/forth-blog",
              "label": "RocketMQ News"
            }
          ]
        },
        {
          "type": "dropdown",
          "label": "Community",
          "position": "right",
          "items": [
            {
              "to": "/contact",
              "label": "Join Community"
            },
            {
              "to": "/team",
              "label": "Contribute"
            },
            {
              "to": "/docs/贡献指南/29how-to-contribute",
              "label": "Contribute Instructions"
            }
          ]
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Learn",
          "items": [
            {
              "label": "Introduction",
              "to": "/docs/介绍/03whatis"
            },
            {
              "label": "Installation",
              "to": "/docs/介绍/02quickstart"
            },
            {
              "label": "Migration from 4.x to 5.0",
              "to": "/version"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Twitter",
              "href": "https://twitter.com/ApacheRocketMQ"
            },
            {
              "label": "Github",
              "to": "https://github.com/apache/rocketmq"
            },
            {
              "label": "Help",
              "to": "https://github.com/apache/rocketmq"
            }
          ]
        },
        {
          "title": "More",
          "items": [
            {
              "label": "Blog",
              "to": "/blog"
            },
            {
              "label": "Changelog",
              "to": "/changelog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/apache/rocketmq"
            },
            {
              "label": "Twitter",
              "href": "https://twitter.com/docusaurus"
            }
          ]
        },
        {
          "title": "Legal",
          "items": [
            {
              "label": "Licenses",
              "href": "https://www.apache.org/licenses/"
            },
            {
              "label": "Security",
              "href": "https://www.apache.org/security/"
            },
            {
              "label": "Thanks",
              "href": "https://www.apache.org/foundation/thanks.html"
            },
            {
              "label": "Sponsorship",
              "href": "https://www.apache.org/foundation/sponsorship.html"
            }
          ]
        }
      ],
      "logo": {
        "alt": "Meta Open Source Logo",
        "src": "img/Apache_RocketMQ_logo.svg.png",
        "href": "https://opensource.fb.com"
      },
      "copyright": "Copyright © 2022 The Apache Software Foundation. Licensed under the Apache License, Version 2.0."
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
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};
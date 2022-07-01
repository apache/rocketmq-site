
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog','802'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','e13'),
    exact: true
  },
  {
    path: '/blog/tags/用户案例',
    component: ComponentCreator('/blog/tags/用户案例','744'),
    exact: true
  },
  {
    path: '/blog/xiaohongshu',
    component: ComponentCreator('/blog/xiaohongshu','ab0'),
    exact: true
  },
  {
    path: '/components/Community',
    component: ComponentCreator('/components/Community','c05'),
    exact: true
  },
  {
    path: '/components/Feature',
    component: ComponentCreator('/components/Feature','e99'),
    exact: true
  },
  {
    path: '/components/Hero',
    component: ComponentCreator('/components/Hero','c5f'),
    exact: true
  },
  {
    path: '/components/Highlight',
    component: ComponentCreator('/components/Highlight','6f5'),
    exact: true
  },
  {
    path: '/components/LogoCarousel',
    component: ComponentCreator('/components/LogoCarousel','45e'),
    exact: true
  },
  {
    path: '/components/Robot',
    component: ComponentCreator('/components/Robot','7cc'),
    exact: true
  },
  {
    path: '/components/Section',
    component: ComponentCreator('/components/Section','4e6'),
    exact: true
  },
  {
    path: '/docs/tags',
    component: ComponentCreator('/docs/tags','0cc'),
    exact: true
  },
  {
    path: '/download',
    component: ComponentCreator('/download','e90'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search','251'),
    exact: true
  },
  {
    path: '/versions',
    component: ComponentCreator('/versions','b27'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','918'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/','768'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/02quickstart',
        component: ComponentCreator('/docs/02quickstart','007'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/03whatis',
        component: ComponentCreator('/docs/03whatis','390'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/04concept1',
        component: ComponentCreator('/docs/04concept1','25e'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/05message1',
        component: ComponentCreator('/docs/05message1','1b7'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/06message2',
        component: ComponentCreator('/docs/06message2','8cf'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/07message3',
        component: ComponentCreator('/docs/07message3','a1d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/08message4',
        component: ComponentCreator('/docs/08message4','08d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/09message5',
        component: ComponentCreator('/docs/09message5','aa0'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/10message6',
        component: ComponentCreator('/docs/10message6','4b7'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/11concept2',
        component: ComponentCreator('/docs/11concept2','5ea'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/12push',
        component: ComponentCreator('/docs/12push','8df'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/13pull',
        component: ComponentCreator('/docs/13pull','264'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/14pop',
        component: ComponentCreator('/docs/14pop','803'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/15deploy',
        component: ComponentCreator('/docs/15deploy','33f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/16admintool',
        component: ComponentCreator('/docs/16admintool','3a1'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/17Dashboard',
        component: ComponentCreator('/docs/17Dashboard','835'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/18Exporter',
        component: ComponentCreator('/docs/18Exporter','4cc'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/19JVMOS',
        component: ComponentCreator('/docs/19JVMOS','e0c'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/20log',
        component: ComponentCreator('/docs/20log','5e1'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/21subscribe',
        component: ComponentCreator('/docs/21subscribe','b89'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/22FAQ',
        component: ComponentCreator('/docs/22FAQ','48f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/23local',
        component: ComponentCreator('/docs/23local','540'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/24server',
        component: ComponentCreator('/docs/24server','26e'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/25streams',
        component: ComponentCreator('/docs/25streams','bcc'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/26Connnect',
        component: ComponentCreator('/docs/26Connnect','b0b'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/27EventBridge',
        component: ComponentCreator('/docs/27EventBridge','357'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/28MQTT',
        component: ComponentCreator('/docs/28MQTT','c96'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/29how-to-contribute',
        component: ComponentCreator('/docs/29how-to-contribute','1c9'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/30code-guidelines',
        component: ComponentCreator('/docs/30code-guidelines','c5f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/31pull-request',
        component: ComponentCreator('/docs/31pull-request','967'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/32release-manual',
        component: ComponentCreator('/docs/32release-manual','8f2'),
        exact: true,
        'sidebar': "docs"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];

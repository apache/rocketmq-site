
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
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
    component: ComponentCreator('/docs','192'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/','2e8'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/介绍/02quickstart',
        component: ComponentCreator('/docs/介绍/02quickstart','16d'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/介绍/03whatis',
        component: ComponentCreator('/docs/介绍/03whatis','7de'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/其他/25streams',
        component: ComponentCreator('/docs/其他/25streams','22f'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/其他/26Connnect',
        component: ComponentCreator('/docs/其他/26Connnect','7d5'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/其他/27EventBridge',
        component: ComponentCreator('/docs/其他/27EventBridge','50a'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/其他/28MQTT',
        component: ComponentCreator('/docs/其他/28MQTT','647'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/最佳实践/19JVMOS',
        component: ComponentCreator('/docs/最佳实践/19JVMOS','ef7'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/最佳实践/20log',
        component: ComponentCreator('/docs/最佳实践/20log','258'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/最佳实践/21subscribe',
        component: ComponentCreator('/docs/最佳实践/21subscribe','0fc'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/最佳实践/22FAQ',
        component: ComponentCreator('/docs/最佳实践/22FAQ','b96'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/参数配置/23local',
        component: ComponentCreator('/docs/参数配置/23local','deb'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/参数配置/24server',
        component: ComponentCreator('/docs/参数配置/24server','312'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/消费者/11concept2',
        component: ComponentCreator('/docs/消费者/11concept2','bcf'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/消费者/12push',
        component: ComponentCreator('/docs/消费者/12push','27d'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/消费者/13pull',
        component: ComponentCreator('/docs/消费者/13pull','fd7'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/消费者/14pop',
        component: ComponentCreator('/docs/消费者/14pop','314'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/04concept1',
        component: ComponentCreator('/docs/生产者/04concept1','e06'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/05message1',
        component: ComponentCreator('/docs/生产者/05message1','f5b'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/06message2',
        component: ComponentCreator('/docs/生产者/06message2','18a'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/07message3',
        component: ComponentCreator('/docs/生产者/07message3','25a'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/08message4',
        component: ComponentCreator('/docs/生产者/08message4','3e6'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/生产者/09message5',
        component: ComponentCreator('/docs/生产者/09message5','51c'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/贡献指南/29how-to-contribute',
        component: ComponentCreator('/docs/贡献指南/29how-to-contribute','fc3'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/贡献指南/30code-guidelines',
        component: ComponentCreator('/docs/贡献指南/30code-guidelines','b6b'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/贡献指南/31pull-request',
        component: ComponentCreator('/docs/贡献指南/31pull-request','ed4'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/贡献指南/32release-manual',
        component: ComponentCreator('/docs/贡献指南/32release-manual','037'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/部署与运维/15deploy',
        component: ComponentCreator('/docs/部署与运维/15deploy','627'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/部署与运维/16admintool',
        component: ComponentCreator('/docs/部署与运维/16admintool','9cf'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/部署与运维/17Dashboard',
        component: ComponentCreator('/docs/部署与运维/17Dashboard','6ae'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      },
      {
        path: '/docs/部署与运维/18Exporter',
        component: ComponentCreator('/docs/部署与运维/18Exporter','70e'),
        exact: true,
        'sidebar': "myAutogeneratedSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];

---
title: "Release Notes - Apache RocketMQ Dashboard - Version 2.0.0"
categories:
  - Release_Notes
tags:
  - RocketMQ_Dashboard

---
:::tip Download
* Source: [rocketmq-dashboard-2.0.0-source-release.zip](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.0.0/rocketmq-dashboard-2.0.0-source-release.zip) [[PGP](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.0.0/rocketmq-dashboard-2.0.0-source-release.zip.asc)] [[SHA512](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.0.0/rocketmq-dashboard-2.0.0-source-release.zip.sha512)]
  :::
<!--truncate-->
Apache RocketMQ Dashboard comes from [apache/rocketmq-externals](https://github.com/apache/rocketmq-externals), this is the first release of RocketMQ Dashboard.

Below is a summary of the issues addressed in the version 2.0.0 release of RocketMQ Dashboard. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-dashboard).

## What's Changed

### RocketMQ 5.x support
* [ISSUE #195] Support the new metrics of getTransferredTps for rocketmq5.x by @javens0601 in https://github.com/apache/rocketmq-dashboard/pull/197
* [ISSUE #179] Add topic message type by @guangdashao in https://github.com/apache/rocketmq-dashboard/pull/179
* [ISSUE #198] Support dashboard v4-v5 switch And query for v5 topic by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/198
* [ISSUE #204] Support FIFO-Type SubGroup Add、Update and Query For V5 by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/204
* [ISSUE #207] Proxy Support And ConsumerGroup Enhancement by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/207
* [ISSUE #208] Supplement UserGuide for RocketMQ 5.0 by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/208
* [ISSUE #222] Fixed the issue that normal messages in version v4 are not showed by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/222
* [ISSUE #223] Support Unspecified Topic Add & Update & Query by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/223
* [ISSUE #229] Support retryMaxTimes field set for consumer group by @1294566108 in https://github.com/apache/rocketmq-dashboard/pull/229
* [ISSUE #231] 5.x query message detail throw: Failed to query message by Id: xxx by @guyu0000 in https://github.com/apache/rocketmq-dashboard/pull/231

### Bug and improvement
* [ISSUE #22]Optimizing the ops page. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/23
* [ISSUE #10] add react module for dashboard by @RaymondCode in https://github.com/apache/rocketmq-dashboard/pull/12
* [ISSUE #25]Add filter in consumer list. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/26
* [ISSUE #33] Update README (use new docker image rocketmq-dashboard 1.0.0) by @StyleTang in https://github.com/apache/rocketmq-dashboard/pull/34
* [ISSUE #30]Added DLQ message management by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/31
* [ISSUE #28] add Html router for front-end by @StyleTang in https://github.com/apache/rocketmq-dashboard/pull/29
* [ISSUE #30]Supports batch resending and batch exporting dlq messages. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/37
* [ISSUE #38]update rocketmq version. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/39
* Fix typo by @4ops in https://github.com/apache/rocketmq-dashboard/pull/40
* [ISSUE #42]Fix deleteSubscriptionGroup not remove consumer offset. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/45
* [ISSUE #43]Give a tip when no message found with topic + time query. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/44
* [ISSUE #48] Fix query message bug by @zhiliatom in https://github.com/apache/rocketmq-dashboard/pull/49
* [ISSUE #48] Fix Normal User login after to tips:no permission by @StyleTang in https://github.com/apache/rocketmq-dashboard/pull/51
* [ISSUE #50]Modify the suffix of the interface name. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/52
* [ISSUE #58] enable the service to support multiple namesrvs by @cserwen in https://github.com/apache/rocketmq-dashboard/pull/59
* [ISSUE #60]Update SpringBoot version. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/61
* [ISSUE #54]Add filtering function when querying message consumption. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/56
* [ISSUE #55]Delete the corresponding DLQ and Retry Topic simultaneously when deleting the consumerGroup. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/57
* [ISSUE #62]Uses the YML format instead of the Properties format. by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/63
* [ISSUE #65] Configure the dlq message interface path in the authInterceptor by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/65
* [ISSUE #72]The batchResend and batchExport buttons are disabled when there is no dlq message by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/73
* [ISSUE #68]Use multithreading for topic data collection in collectTask by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/69
* [ISSUE #70] The rocketmq-dashboard supports ACL configuration by @xxd763795151 in https://github.com/apache/rocketmq-dashboard/pull/71
* [ISSUE #74]upgrade rocketmq version to 4.9.3 by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/75
* Configure the acl interface path in the authInterceptor by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/77
* [ISSUE #58]Supports adding namesrvAddr cluster management by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/66
* [ISSUE #82]Filter the system topic (clusterName+REPLY_TOPIC) when dashboard was making topic statistics by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/83
* [ISSUE #119] Fix flaky test in TopicControllerTest.java by @yannizhou05 in https://github.com/apache/rocketmq-dashboard/pull/120
* [ISSUE #111] Update log name by @Oliverwqcwrw in https://github.com/apache/rocketmq-dashboard/pull/112
* [ISSUE #123]Optimize groupList.query by @zhangjidi2016 in https://github.com/apache/rocketmq-dashboard/pull/124
* [ISSUE #149] updated lombok version in pom.xml by @Abhijeetmishr in https://github.com/apache/rocketmq-dashboard/pull/151
* [ISSUE #155] 5.1.0 rocketmq version update by @Abhijeetmishr in https://github.com/apache/rocketmq-dashboard/pull/155
* [ISSUE #148] Throwables.propagate is deprecated for making runtime exception more verbose by @Abhijeetmishr in https://github.com/apache/rocketmq-dashboard/pull/160
* [ISSUE #232] Remove unused imports for the checkstyle. by @guyu0000 in https://github.com/apache/rocketmq-dashboard/pull/232


## New Contributors
* @RaymondCode made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/12
* @4ops made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/40
* @zhiliatom made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/49
* @cserwen made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/59
* @xxd763795151 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/71
* @yannizhou05 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/120
* @Oliverwqcwrw made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/112
* @Abhijeetmishr made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/151
* @javens0601 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/197
* @guangdashao made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/179
* @1294566108 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/198
* @guyu0000 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/231

**Full Changelog**: https://github.com/apache/rocketmq-dashboard/compare/rocketmq-dashboard-1.0.0...rocketmq-dashboard-2.0.0

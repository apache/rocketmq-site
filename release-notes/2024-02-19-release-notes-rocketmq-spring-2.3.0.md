---
title: "Release Notes - Apache RocketMQ Spring - Version 2.3.0"
categories:
- Release_Notes
tags:
- RocketMQ_Spring
---
:::tip Download
* Source: [rocketmq-spring-all-2.3.0-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.3.0/rocketmq-spring-rocketmq-spring-all-2.3.0.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.0/rocketmq-spring-all-2.3.0-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.0/rocketmq-spring-rocketmq-spring-all-2.3.0.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.3.0 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).

## Feature
* [ISSUE #553] Integrate RocketMQ 5.0 gRPC client with Spring by @1294566108 in https://github.com/apache/rocketmq-spring/pull/554

## Bug
* [ISSUE #591] Fix bug when create rocketmq producer by @percyzhang in https://github.com/apache/rocketmq-spring/pull/591
* [ISSUE #610] Fix setRequestTimeout use Duration.ofDays by @panzhi33 in https://github.com/apache/rocketmq-spring/pull/621
* [ISSUE #625] Fix compile failed by @panzhi33 in https://github.com/apache/rocketmq-spring/pull/624
* [ISSUE #629] Exclude annotations-api to make spring-boot start normally by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/628
* [ISSUE #619] Fix the issue of sending message "No route information of this topic: xxx" when the producer does not configure the namespace by @aoshiguchen in https://github.com/apache/rocketmq-spring/pull/619

## Improvement
* [ISSUE #530] Upgrade rocketmq client version to 5.1.0 by @mxsm in https://github.com/apache/rocketmq-spring/pull/531
* [ISSUE #562] Bump spring-boot-autoconfigure from 2.5.9 to 2.5.15 in /rocketmq-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/562
* [ISSUE #539] Support SpringBoot 3.x by @imp2002 in https://github.com/apache/rocketmq-spring/pull/541
* [ISSUE #546] Fix ConsumeMessageService#updateCorePoolSize" not support increase coreSize by @crzbird in https://github.com/apache/rocketmq-spring/pull/547
* [ISSUE #551] Bump spring-core from 5.3.20 to 5.3.27 in /rocketmq-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/551
* [ISSUE #564] Modify the rules for license checker by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/563
* [ISSUE #544] Prepare for next development iteration and fix some syntax errors by @rupertw in https://github.com/apache/rocketmq-spring/pull/544
* [ISSUE #572] Upgrade rocketmq SDK version to 5.1.3 by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/573
* [ISSUE #575] Update application.properties by @Junior233 in https://github.com/apache/rocketmq-spring/pull/575
* [ISSUE #579] Bump org.springframework.boot:spring-boot-autoconfigure from 2.5.9 to 2.5.15 in /rocketmq-v5-client-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/579
* [ISSUE #600] Bump org.springframework.boot:spring-boot from 2.5.9 to 2.7.18 in /rocketmq-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/600
* [ISSUE #601] Bump org.springframework.boot:spring-boot from 2.5.15 to 2.7.18 in /rocketmq-v5-client-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/601
* [ISSUE #577] Bump org.springframework:spring-core from 5.3.20 to 5.3.27 in /rocketmq-v5-client-spring-boot-parent by @dependabot in https://github.com/apache/rocketmq-spring/pull/577
* [ISSUE #607] Bump jackson to 2.16.1 by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/606
* [ISSUE #612] Support Springboot 3.X by @accjiyun in https://github.com/apache/rocketmq-spring/pull/611
* [ISSUE #617] Change handleMessage to public by @leizhiyuan in https://github.com/apache/rocketmq-spring/pull/617
* [ISSUE #536] ListenerContainerConfiguration should be an automatic assembler by @lanpf in https://github.com/apache/rocketmq-spring/pull/537
* [ISSUE #622] Add config enableSsl by @panzhi33 in https://github.com/apache/rocketmq-spring/pull/623
* [ISSUE #627] Make v5 sample logs to output normally by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/626
* [ISSUE #631] Bump rocketmq version to 5.2.0 by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/630


## New Contributors
* @imp2002 made their first contribution in https://github.com/apache/rocketmq-spring/pull/541
* @crzbird made their first contribution in https://github.com/apache/rocketmq-spring/pull/547
* @rupertw made their first contribution in https://github.com/apache/rocketmq-spring/pull/544
* @Junior233 made their first contribution in https://github.com/apache/rocketmq-spring/pull/575
* @1294566108 made their first contribution in https://github.com/apache/rocketmq-spring/pull/554
* @accjiyun made their first contribution in https://github.com/apache/rocketmq-spring/pull/611
* @leizhiyuan made their first contribution in https://github.com/apache/rocketmq-spring/pull/617
* @percyzhang made their first contribution in https://github.com/apache/rocketmq-spring/pull/591
* @lanpf made their first contribution in https://github.com/apache/rocketmq-spring/pull/537
* @aoshiguchen made their first contribution in https://github.com/apache/rocketmq-spring/pull/619

**Full Changelog**: https://github.com/apache/rocketmq-spring/compare/rocketmq-spring-all-2.2.3...rocketmq-spring-all-2.3.0
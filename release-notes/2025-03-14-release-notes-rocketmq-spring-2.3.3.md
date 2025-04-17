---
title: "Release Notes - Apache RocketMQ Spring - Version 2.3.3"
categories:
- Release_Notes
tags:
- RocketMQ_Spring
---
:::tip Download
* Source: [rocketmq-spring-all-2.3.3-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.3.3/rocketmq-spring-rocketmq-spring-all-2.3.3.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.3/rocketmq-spring-all-2.3.3-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.3/rocketmq-spring-rocketmq-spring-all-2.3.3.zip.sha512)]
  :::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.3.3 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).

## What's Changed
* [ISSUE #705] Fix future in async send not complete by @qianye1001 in https://github.com/apache/rocketmq-spring/pull/706
* [ISSUE #708] fix sending delay message error with delayTime=0 by @francisoliverlee in https://github.com/apache/rocketmq-spring/pull/710
* Remove unnecessary catch blocks and log statements in syncSendGrpcMessage by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/711
* Optimize log output by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/712

## New Contributors
* @qianye1001 made their first contribution in https://github.com/apache/rocketmq-spring/pull/706

**Full Changelog**: https://github.com/apache/rocketmq-spring/compare/rocketmq-spring-all-2.3.2...rocketmq-spring-all-2.3.3
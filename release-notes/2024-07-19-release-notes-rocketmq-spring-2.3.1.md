---
title: "Release Notes - Apache RocketMQ Spring - Version 2.3.1"
categories:
- Release_Notes
tags:
- RocketMQ_Spring
---
:::tip Download
* Source: [rocketmq-spring-all-2.3.1-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.3.1/rocketmq-spring-rocketmq-spring-all-2.3.1.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.1/rocketmq-spring-all-2.3.1-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.3.1/rocketmq-spring-rocketmq-spring-all-2.3.1.zip.sha512)]
  :::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.3.1 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).

## What's Changed
* [ISSUE #632] Fix NPE caused by using @ ExtRocketMQTemplateConfiguration annotation extension to send messages by @lilinjiang in https://github.com/apache/rocketmq-spring/pull/634
* [ISSUE #632] Fix NPE caused by using @ ExtRocketMQTemplateConfiguration annotation extension to send messages in v5 by @lilinjiang in https://github.com/apache/rocketmq-spring/pull/639
* [ISSUE #637] Upgrade samples version to 2.3.1-SNAPSHOT by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/636
* [ISSUE #645] Bump rocketmq.spring.client.version to 5.0.6 by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/644
* [ISSUE #647] Exclude rocketmq-rocksdb due to the large size of this package by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/647
* [ISSUE #652] Update year to 2024 in NOTICE by @ShannonDing in https://github.com/apache/rocketmq-spring/pull/652
* [ISSUE #656] Set rocketmq-v5-client-spring-boot default awaitDuration to 5 by @drpmma in https://github.com/apache/rocketmq-spring/pull/657
* [ISSUE #650] Fix url and typo by @hakusai22 in https://github.com/apache/rocketmq-spring/pull/651
* [ISSUE #659] Fix RocketMQMessageListener TOPIC_PLACEHOLDER by @drpmma in https://github.com/apache/rocketmq-spring/pull/659
* [ISSUE #654] Support namespace for rocketmq-v5-client-spring-boot and rocketmq-spring-boot by @drpmma in https://github.com/apache/rocketmq-spring/pull/655
* [ISSUE #660] Add simple sample demo by @drpmma in https://github.com/apache/rocketmq-spring/pull/661
* [ISSUE #663] Update rocketmq client version to 5.0.7 in for rocketmq-v5-client by @drpmma in https://github.com/apache/rocketmq-spring/pull/664
* [ISSUE #662] Update DefaultRocketMQListenerContainer#getMessageType to protected by @ruansheng8 in https://github.com/apache/rocketmq-spring/pull/662
* [ISSUE #668] Upgrade rocketmq client version to 5.3.0 by @RongtongJin in https://github.com/apache/rocketmq-spring/pull/668

## New Contributors
* @lilinjiang made their first contribution in https://github.com/apache/rocketmq-spring/pull/634
* @drpmma made their first contribution in https://github.com/apache/rocketmq-spring/pull/657
* @hakusai22 made their first contribution in https://github.com/apache/rocketmq-spring/pull/651
* @ruansheng8 made their first contribution in https://github.com/apache/rocketmq-spring/pull/662

**Full Changelog**: https://github.com/apache/rocketmq-spring/compare/rocketmq-spring-all-2.3.0...rocketmq-spring-all-2.3.1
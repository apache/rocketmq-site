---
title: "Release Notes - Apache RocketMQ Client C# - Version 5.2.0"
categories:
  - Release_Notes
tags:
  - RocketMQ_Client_Csharp
---
:::tip Download
* Source: [rocketmq-client-csharp-5.2.0-rc1-source-release.zip](https://dist.apache.org/repos/dist/dev/rocketmq/rocketmq-clients/rocketmq-client-csharp/5.2.0-rc1/rocketmq-client-csharp-5.2.0-rc1-source-release.zip) [[PGP](https://dist.apache.org/repos/dist/dev/rocketmq/rocketmq-clients/rocketmq-client-csharp/5.2.0-rc1/rocketmq-client-csharp-5.2.0-rc1-source-release.zip.asc)] [[SHA512](https://dist.apache.org/repos/dist/dev/rocketmq/rocketmq-clients/rocketmq-client-csharp/5.2.0-rc1/rocketmq-client-csharp-5.2.0-rc1-source-release.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 5.2.0 release of Apache RocketMQ Client C#. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-clients/tree/master/csharp).

## What's Changed
* Fix the outdated badge by @aaron-ai in https://github.com/apache/rocketmq-clients/pull/520
* csharp: Add using to wrap HMACSHA1 instance by @catcherwong in https://github.com/apache/rocketmq-clients/pull/582
* replace nlog with Microsoft.Extensions.Logging by @eventhorizon-cli in https://github.com/apache/rocketmq-clients/pull/596
* Resolve the issue of obtaining the physical address of the network card by @sduo in https://github.com/apache/rocketmq-clients/pull/704
* csharp: Optimize the performance of the Hash algorithm and reduce allocations. by @InCerryGit in https://github.com/apache/rocketmq-clients/pull/690
* Optimize performance by leveraging new allocation reduction methods in .NET 5 by @colprog in https://github.com/apache/rocketmq-clients/pull/747
* [csharp] update TFM to net6 and net8 by @catcherwong in https://github.com/apache/rocketmq-clients/pull/799
* [ISSUE #776] Add push consumer for normal/fifo message, namespace support, reentrant message receiving support in C# SDK by @tsunghanjacktsai in https://github.com/apache/rocketmq-clients/pull/777
* Release C# client 5.2.0 by @tsunghanjacktsai in https://github.com/apache/rocketmq-clients/pull/839

## New Contributors
* @catcherwong made their first contribution in https://github.com/apache/rocketmq-clients/pull/582
* @eventhorizon-cli made their first contribution in https://github.com/apache/rocketmq-clients/pull/596
* @sduo made their first contribution in https://github.com/apache/rocketmq-clients/pull/704
* @InCerryGit made their first contribution in https://github.com/apache/rocketmq-clients/pull/690

**Full Changelog**: https://github.com/apache/rocketmq-clients/compare/csharp-5.1.1-rc1...csharp-5.2.0-rc1
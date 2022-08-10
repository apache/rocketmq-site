---
title: "Release Notes - Apache RocketMQ Spring - Version 2.1.1"
categories:
  - Release_Notes
tags:
 
  - RocketMQ_Sprint
  
---
:::tip Download
* Source: [rocketmq-spring-all-2.1.1-source-release.zip](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.1.1/rocketmq-spring-all-2.1.1-source-release.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.1.1/rocketmq-spring-all-2.1.1-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.1.1/rocketmq-spring-all-2.1.1-source-release.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.1.1 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).



    



## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/283'>ISSUE #282</a>] -  Upgrade RocketMQ client version to 4.7.1.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/265'>ISSUE #263</a>] -  Change the version of rocketmq client in the pom's file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/285'>ISSUE #285</a>] -  Upgrade jackson and fastjson version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/266'>ISSUE #262</a>] -  Support custom AsyncSenderExecutor when sending messages asynchronously.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/269'>ISSUE #271</a>] -  AccessKey and secretKey are wrong when create producer.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/247'>ISSUE #241</a>] -  Make the unit of consumeTimeout in rocketmq-spring consistent with rocketmq client.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/244'>ISSUE #242</a>] -  SyncSend batchMessage method without timeout param.
</li>
</ul>

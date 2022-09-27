---
title: "Release Notes - Apache RocketMQ Spring - Version 2.2.2"
categories:
- Release_Notes
tags:
- RocketMQ_Spring
---
:::tip Download
* Source: [rocketmq-spring-all-2.2.2-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.2.2/rocketmq-spring-rocketmq-spring-all-2.2.2.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.1/rocketmq-spring-all-2.2.1-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.2/rocketmq-spring-rocketmq-spring-all-2.2.2.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.2.2 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/219'>ISSUE #219</a>] -  Support to enable tls through configuration file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/389'>ISSUE #389</a>] -  Upgrade rocketmq-samples version to 2.2.2-SNAPSHOT.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/396'>ISSUE #396</a>] -  Support namespace in configuration file and annotation.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/402'>ISSUE #402</a>] -  Supplement rocketmq sync send message failed log out.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/404'>ISSUE #404</a>] -  Upgrade RocketMQ version to 4.9.2.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/417'>ISSUE #417</a>] -  Fix the instance name is too long.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/410'>ISSUE #410</a>] -  Chore: sample-version-sync.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/428'>ISSUE #428</a>] -  Upgrade spring-core and spring-boot due to cve.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/411'>ISSUE #411</a>] -  Support DELAY and WAIT properties in RocketMQHeaders.java, which can convert Spring-Message to Rocket-Message conveniently.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/419'>ISSUE #419</a>] -  Support consumption retry strategy configuration.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/429'>ISSUE #429</a>] -  The 'consumeThreadMax' in annotation @RocketMQMessageListener is not works well.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/436'>ISSUE #436</a>] -  Upgrade RocketMQ version to 4.9.3.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/435'>ISSUE #435</a>] -  Support Consumer Shutdown "awaitTerminationMillisWhenShutdown".
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/439'>ISSUE #439</a>] -  Fix the wrong comment description of the default value in the keepalivetime field of the RocketMQTransactionListener annotation.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/443'>ISSUE #443</a>] -  Update Spring to 5.3.18 to fix CVE cve-2022-22965 aka Spring4shell.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/365'>ISSUE #365</a>] -  WAIT_STORE_MSG_OK property parsing error.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/426'>ISSUE #426</a>] -  Fix deserialize LocalDateTime failed when using jdk8.
</li>
</ul>

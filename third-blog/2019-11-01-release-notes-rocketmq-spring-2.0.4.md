---
title: "Release Notes - Apache RocketMQ Spring - Version 2.0.4"
categories:
  - Release_Notes
tags:

  - RocketMQ_Spring

---

:::tip Download
* Source: [rocketmq-spring-all-2.0.4-source-release.zip](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.0.4/rocketmq-spring-all-2.0.4-source-release.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.0.4/rocketmq-spring-all-2.0.4-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.0.4/rocketmq-spring-all-2.0.4-source-release.zip.sha512)]
:::

<!--truncate-->
Below is a summary of the issues addressed in the version 2.0.4 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).





## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/87'>ISSUE #86</a>] -  Support to configure whether consumer listener is enabled through configuration file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/97'>ISSUE #96</a>] -  Support resolve  placeholder for listener.txProducerGroup.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/129'>ISSUE #103</a>] -  Support resolve placeholder for selectorExpression.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/137'>ISSUE #137</a>] -  Upgrade rocketmq dependency to 4.5.2.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/152'>ISSUE #152</a>] -  An enhancement about the convert in RocketMQTemplate.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/150'>ISSUE #81</a>] -  Fix RocketMQTemplate.syncSend collection type method signature.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/84'>ISSUE #83</a>] -  Fix addUserProperties will override headers from rocketmq.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/138'>ISSUE #107</a>] -  Fix the message was consumed twice because of the same instanceName.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/119'>ISSUE #117</a>] -  Fix timeout failed in syncSendOrderly.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/pull/164'>ISSUE #163</a>] -  Fix transactionProducer has incorrect namespace.
</li>
</ul>
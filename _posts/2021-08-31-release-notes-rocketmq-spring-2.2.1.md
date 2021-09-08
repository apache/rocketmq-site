---
title: "Release Notes - Apache RocketMQ Spring - Version 2.2.1"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the version 2.2.1 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).


<h2> Download the 2.2.1 release</h2>
    
* Source: [rocketmq-spring-all-2.2.1-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.2.1/rocketmq-spring-rocketmq-spring-all-2.2.1.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.1/rocketmq-spring-all-2.2.1-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.1/rocketmq-spring-rocketmq-spring-all-2.2.1.zip.sha512)]


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/385'>ISSUE #385</a>] -  Add message trace setting in ExtRocketMQConsumerConfiguration.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/381'>ISSUE #381</a>] -  Upgrade rocketmq version to 4.9.1.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/377'>ISSUE #377</a>] -  Add the replyTimeout configuration parameter.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/371'>ISSUE #371</a>] -  Add some asynchronous API for batch messages in RocketMQTemplate.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/378'>ISSUE #378</a>] -  Improve the comment of maxReconsumeTimes.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/366'>ISSUE #366</a>] -  The retry number of failed consumptions can be set.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/368'>ISSUE #368</a>] -  Upgrade starter version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/346'>ISSUE #346</a>] -  Enhance DefaultRocketMQListenerContainer doConvertMessage.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/340'>ISSUE #340</a>] -  Set enableMsgTrace default value to false.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/343'>ISSUE #343</a>] -  Sending batch messages orderly with RocketMQTemplate.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/335'>ISSUE #335</a>] -  Update rocketmq spring samples version.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/376'>ISSUE #376</a>] -  Fix the selectorExpression not resolve placeholders.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/339'>ISSUE #339</a>] -  Fix consumer do not consume message with the same instance name.
</li>
</ul>
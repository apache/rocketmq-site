---
title: "Release Notes - Apache RocketMQ Spring - Version 2.2.3"
categories:
- Release_Notes
tags:
- RocketMQ_Spring
---
:::tip Download
* Source: [rocketmq-spring-all-2.2.3-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-spring/2.2.3/rocketmq-spring-rocketmq-spring-all-2.2.3.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.3/rocketmq-spring-all-2.2.3-source-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.2.3/rocketmq-spring-rocketmq-spring-all-2.2.3.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.2.3 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/446'>ISSUE #446</a>] -  Correct typos in the document
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/461'>ISSUE #461</a>] -  Upgrade fastjson version to 1.2.83 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/460'>ISSUE #460</a>] -  Bump spring-core from 5.3.18 to 5.3.20 in /rocketmq-spring-boot-parent
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/450'>ISSUE #450</a>] -  Fix More than one client is created when consumer.group and consumer.topic is used in application.properties
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/471'>ISSUE #471</a>] -  Support instance name config in producer and consumer
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/477'>ISSUE #477</a>] -  change StandardEnvironment to ConfigurableEnvironment
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/444'>ISSUE #444</a>] -  Add default consumer namespace to DefaultRocketMQListener
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/481'>ISSUE #481</a>] -  Add defaultNamespace to both producer and consumer
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/479'>ISSUE #479</a>] -  Allow programmatic modify @RocketMQMessageListener annotation
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/484'>ISSUE #484</a>] -  Fix testExtRocketMQTemplate
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/496'>ISSUE #496</a>] -  Fix pull request template format not correct
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/494'>ISSUE #494</a>] -  Replace deprecated StringUtils.isEmpty method with StringUtils.hasLength
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/499'>ISSUE #499</a>] -  Add apache rat check exclude file 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/488'>ISSUE #488</a>] -  Upgrade RocketMQ version to 5.0.0 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/507'>ISSUE #507</a>] -  Support send oderly delay message for RocketMQTemplate 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/512'>ISSUE #512</a>] -  Go back and keep versions compatible 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/511'>ISSUE #511</a>] -  Polish the application.properties to solve the misunderstanding between push consumer and pull consumer
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/517'>ISSUE #517</a>] -  Remove travis CI and add license-checker workflow
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/506'>ISSUE #506</a>] -  Support send message with arbitrarily delay time 
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/520'>ISSUE #520</a>] -  Add syncSendDeliverTimeMills and syncSendDelayTimeMills API for RocketMQ 5.0 timer message
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/522'>ISSUE #522</a>] -  Format code and Optimization description
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/458'>ISSUE #458</a>] -  Fix the problem of cannot consume previous messages in broadcast consumption mode
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/486'>ISSUE #486</a>] -  The namespace configuration in the annotation cannot be read 
</li>
</ul>

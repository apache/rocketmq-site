---
title: "Release Notes - Apache RocketMQ Spring - Version 2.1.0"
categories:
  - Release_Notes
tags:
  - RocketMQ_Spring
 
---
:::tip
* Source: [rocketmq-spring-all-2.1.0-source-release.zip](https://archive.apache.org/dist/rocketmq/rocketmq-spring/2.1.0/rocketmq-spring-all-2.1.0-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-spring/2.1.0/rocketmq-spring-all-2.1.0-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-spring/2.1.0/rocketmq-spring-all-2.1.0-source-release.zip.sha512)]
:::

<!--truncate-->
Below is a summary of the issues addressed in the version 2.1.0 release of RocketMQ Spring. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-spring).



## New Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/208'>ISSUE #208</a>] -  Support request/reply model in rocketmq-spring.
</li>
</ul>


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/178'>ISSUE #178</a>] -  Refactor transaction message implementation.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/190'>ISSUE #190</a>] -  Delete useless code and ambiguous deprecated annotation about JacksonFallbackConfiguration.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/192'>ISSUE #192</a>] -  Upgrade rocketmq version to 4.6.0 and add unit tests.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/202'>ISSUE #202</a>] -  Refactor transaction auto configuration and enable extRocketMQTemplate send transactional messages.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/213'>ISSUE #213</a>] -  Polish readme file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/215'>ISSUE #215</a>] -  Polish the code and modify version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/211'>ISSUE #211</a>] -  Remove the limitation that ExtRocketMQTemplate can not keep the same nameserver as RocketMQTemplate.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/218'>ISSUE #218</a>] -  Fix spring scopeTarget will repeat consumer instance.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/151'>ISSUE #151</a>] -  Fix the Infinite loop in DefaultRocketMQListenerContainer.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/186'>ISSUE #186</a>] -  Fix selectorExpression cannot autoconfigure from configure file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-spring/issues/197'>ISSUE #197</a>] -  Solve the problem that RocketMQListener can not deserialize generic.
</li>
</ul>
---
title: "Motivation"
permalink: /docs/motivation/
modified: 2016-12-16T15:01:43-04:00
---

In the early stages, we constructed our distributed messaging middleware on the basis of ActiveMQ 5.x(less than 5.3). Our international business uses it for async communication, search, social network activity stream, data pipeline, even in our trade order process. As our trade business throughput rises more and more inconceivably, pressure originating from our messaging cluster also become more and more obvious.

{% include toc %}

# Why RocketMQ ?

Based on our observations and research, with more and more queues and virtual topics in use, ActiveMQ IO module becomes a bottleneck. In some cases, slower consumers can slow down the producers. We tried our best efforts to handle this problems through throttling, circuit breaker or degradation, but it cannot scale out gracefully. So we begin to focus on the popular messaging solution Kafka at that time. Unfortunately, Kafka can not meet our requirements such as low latency and high reliability, see [here](https://github.com/alibaba/RocketMQ/wiki/how_to_support_more_queues) for details.

In this context, we decided to innovate a new messaging middleware to handle a broad set of use cases, ranging from traditional publish/subscribe scenario to demandingly high volume realtime transaction system that tolerates no message loss. We also created a cornerstone product based on RocketMQ, a Platform as a Service (PaaS) product named the
[Alibaba Cloud Platform](https://intl.aliyun.com/). Today, more than 100 companies are using the RocketMQ open source version in their business solutions. We believe RocketMQ can benefit more people, so we would like to share it around the world.


The following are some different design between RocketMQ, ActiveMQ and Kafka（They are the apache's most popular messaging solutions according to [awesome-java](https://github.com/akullpp/awesome-java)):

# RocketMQ vs. ActiveMQ vs. Kafka


| Messaging Product|Client SDK| Protocol and Specification | Order Message  |Message Filter|Server Triggered Redelivery|Persistent Message|Retroactive Consumers|Message Priority|High Availability and Failover|Message Track|Configuration|Management and Operation Tools|
| -------|--------|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| ActiveMQ|Java, .NET, C++ etc. |Push model, support OpenWire, STOMP, AMQP, MQTT, JMS|Exclusive Consumer or Exclusive Queues can ensure ordering|Supported|Not Supported|Supports very fast persistence using JDBC along with a high performance journal，such as levelDB, kahaDB|Supported|Supported|Supported, depending on storage,if using kahadb it requires a ZooKeeper server|Not Supported|The default configuration is low level, user need to optimize the configuration parameters|Supported|
| Kafka      | Java, Scala etc.|Pull model, support TCP|Ensure ordering of messages within a partition|Supported, you can use Kafka Streams to filter messages|Not Supported|High performance file storage|Supported offset indicate|Not Supported|Supported, requires a ZooKeeper server|Not Supported|Kafka uses key-value pairs format for configuration. These values can be supplied either from a file or programmatically.|Supported, use terminal command to expose core metrics|
| RocketMQ      |Java, .NET, C++ |Pull model, support TCP, JMS|Ensure strict ordering of messages, have no hot spot problem,and can scale out gracefully|Supported, you can even upload yourself custom-built filter code snippets|Supported|High performance and low latency file storage|Supported timestamp and offset 2 indicates|Not Supported|Supported, Master-Slave model, without another kit|Supported|Work out of box,user only need to pay attention to a few configurations|Supported, rich web and terminal command to expose core metrics|
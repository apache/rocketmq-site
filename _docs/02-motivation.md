---
title: "Motivation"
permalink: /docs/motivation/
modified: 2016-12-16T15:01:43-04:00
---

At the early stages, we built our distributed messaging middleware on top of ActiveMQ 5.x(prior to 5.3). 
Our international business uses it in various scenarios including asynchronous communication, search, 
social network activity streaming, data pipeline, even the order management system. 

As our trade business mounts up, system pressure originating from messaging cluster becomes more and more obvious.

{% include toc %}

# Why RocketMQ ?

Based on our observations and research, when more and more queues and virtual topics are in use, ActiveMQ IO module
becomes a bottleneck. In some cases, slower consumers can slow down the producers. We tried our best efforts to handle 
this problems through throttling, circuit breaker or degradation, but it cannot yet scale out gracefully. So we begin 
to move our attention to Kafka, a popular messaging solution at the time. Unfortunately, Kafka cannot meet our 
requirements in terms of latency and reliability, see [here](/rocketmq/how-to-support-more-queues-in-rocketmq/) for details.

In this context, we decided to develop a new messaging middleware to meet a broad set of use cases, ranging from 
traditional publish/subscribe scenario to demandingly high volume real-time transaction system that tolerates no message loss.
We believe this solution can benefit more people, so we would like to make it publicly available to the open source community.
Today, more than a hundred companies besides Alibaba deploy RocketMQ in their business solutions. To further facilitate 
cloud service users, who pay more attention to their business development, we also developed a commercial PaaS product 
based on RocketMQ, [Alibaba Cloud Platform](https://intl.aliyun.com/). 


The following are some different design between RocketMQ, ActiveMQ and Kafka（They are the apache's most popular messaging solutions according to [awesome-java](https://github.com/akullpp/awesome-java)):

# RocketMQ vs. ActiveMQ vs. Kafka


| Messaging Product|Client SDK| Protocol and Specification | Order Message  |Message Filter|Server Triggered Redelivery|Persistent Message|Retroactive Consumers|Message Priority|High Availability and Failover|Message Track|Configuration|Management and Operation Tools|
| -------|--------|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| ActiveMQ|Java, .NET, C++ etc. |Push model, support OpenWire, STOMP, AMQP, MQTT, JMS|Exclusive Consumer or Exclusive Queues can ensure ordering|Supported|Not Supported|Supports very fast persistence using JDBC along with a high performance journal，such as levelDB, kahaDB|Supported|Supported|Supported, depending on storage,if using kahadb it requires a ZooKeeper server|Not Supported|The default configuration is low level, user need to optimize the configuration parameters|Supported|
| Kafka      | Java, Scala etc.|Pull model, support TCP|Ensure ordering of messages within a partition|Supported, you can use Kafka Streams to filter messages|Not Supported|High performance file storage|Supported offset indicate|Not Supported|Supported, requires a ZooKeeper server|Not Supported|Kafka uses key-value pairs format for configuration. These values can be supplied either from a file or programmatically.|Supported, use terminal command to expose core metrics|
| RocketMQ      |Java, .NET, C++ |Pull model, support TCP, JMS|Ensure strict ordering of messages, have no hot spot problem,and can scale out gracefully|Supported, you can even upload yourself custom-built filter code snippets|Supported|High performance and low latency file storage|Supported timestamp and offset 2 indicates|Not Supported|Supported, Master-Slave model, without another kit|Supported|Work out of box,user only need to pay attention to a few configurations|Supported, rich web and terminal command to expose core metrics|
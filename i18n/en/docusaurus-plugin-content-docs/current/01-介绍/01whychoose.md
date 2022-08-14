---
slug: /
---

# Why choose RocketMQ

## Why RocketMQ
During Ali's nascent days of RocketMQ, we used it for asynchronous communications, search, social networking activity flows, data pipelines, and trade processes. As our trade business throughput rose, the pressure originating from our messaging cluster became urgent.

According to our research, the ActiveMQ IO module reached a bottleneck as queue and virtual topic usage increased. We tried our best to solve this problem by throttling, circuit breaker or downgrading, but the results were not satisfactory. So we tried the popular messaging solution Kafka. unfortunately, Kafka could not meet our requirements, especially in terms of low latency and high reliability, as detailed here. In this case, we decided to invent a new messaging engine to handle a wider range of messaging use cases, covering from traditional pub/sub scenarios to high-volume, real-time, zero-error transaction systems.

Since its inception, Apache RocketMQ has been widely adopted by many enterprise developers and cloud vendors for its simple architecture, rich business functionality, and extreme scalability. After more than ten years of large-scale scenario polishing, RocketMQ has become the industry consensus as the preferred solution for financial-grade reliable business messages, and is widely used in business scenarios in Internet, big data, mobile Internet, IoT and other fields.



:::tip

The following table shows the comparison between RocketMQ, ActiveMQ and Kafka 

:::

## RocketMQ vs. ActiveMQ vs. Kafka

| Messaging Product|Client SDK| Protocol and Specification | Ordered Message  | Scheduled Message | Batched Message |BroadCast Message| Message Filter|Server Triggered Redelivery|Message Storage|Message Retroactive|Message Priority|High Availability and Failover|Message Track|Configuration|Management and Operation Tools|
| -------|--------|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| ActiveMQ|Java, .NET, C++ etc. |Push model, support OpenWire, STOMP, AMQP, MQTT, JMS|Exclusive Consumer or Exclusive Queues can ensure ordering|Supported|Not Supported|Supported|Supported|Not Supported|Supports very fast persistence using JDBC along with a high performance journal，such as levelDB, kahaDB|Supported|Supported|Supported, depending on storage,if using levelDB it requires a ZooKeeper server|Not Supported|The default configuration is low level, user need to optimize the configuration parameters|Supported|
| Kafka      | Java, Scala etc.|Pull model, support TCP|Ensure ordering of messages within a partition|Not Supported|Supported, with async producer|Not Supported|Supported, you can use Kafka Streams to filter messages|Not Supported|High performance file storage|Supported offset indicate|Not Supported|Supported, requires a ZooKeeper server|Not Supported|Kafka uses key-value pairs format for configuration. These values can be supplied either from a file or programmatically.|Supported, use terminal command to expose core metrics|
| RocketMQ      |Java, C++, Go |Pull model, support TCP, JMS, OpenMessaging|Ensure strict ordering of messages,and can scale out gracefully|Supported|Supported, with sync mode to avoid message loss|Supported|Supported, property filter expressions based on SQL92|Supported|High performance and low latency file storage|Supported timestamp and offset two indicates|Not Supported|Supported, Master-Slave model, without another kit|Supported|Work out of box,user only need to pay attention to a few configurations|Supported, rich web and terminal command to expose core metrics|

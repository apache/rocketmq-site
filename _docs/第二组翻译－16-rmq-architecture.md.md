![avatar](https://rocketmq.apache.org/assets/images/rmq-basic-arc.png) 
# 概述
Apache RocketMQ是一个分布式的消息和数据流平台，它具有低延迟、高性能和高可靠性、万亿级的容量和灵活的可扩展性。RocketMQ包含四个部分：nameserver, broker,生产者，消费者。每个部分都可以水平扩展从而消灭单点故障。RocketMQ的结构如上面的图片所示。
## name server集群
NameServer集群提供了轻量级的服务发现和路由。每个NameServer记录完整的路由信息，提供相应的读写服务，并支持快速存储扩展。
## broker集群
Broker集群通过提供轻量级topic和队列机制进行消息存储。brokers支持Push和Pull模型，包含容错机制(2个副本或3个副本)，提供极强的峰值处理能力，并且提供能够按照原始时间顺序堆积数以百万记的消息。此外，brokers还提供了灾难恢复、丰富的指标统计和警报机制，这些在传统的消息传递系统中都是缺乏的。
## 生产者集群
生产者集群支持分布式部署，分布式的生产者集群通过多种负载均衡策略将消息发送到broker集群中。发送过程支持快速失败，并且是低延迟的。
## 消费者集群
消费者集群也支持在pull和push模式下的分布式部署，它还支持集群消费和消息广播。它提供实时消息订阅机制，能够满足大多数消费者的需求。RocketMQ的网站为感兴趣的用户提供了一个简单的快速入门指南。
# NameServer
NameServer是一个功能齐全的服务器，主要包括两个功能：
* broker 管理，NameServer接受来自broker集群的注册信息并提供心跳检测机制来检查broker是否可用。
* 路由管理，每一个NameServer都持有关于broker集群和队列的全部路由信息，用来向客户端提供查询。

我们知道 ，rocketMQ客户端（生产者/消费者）会从NameServer查询队列的路由信息，客户端是如何知道NameServer的地址的呢？

有四种方式能够让客户端获取到NameServer的地址：
* 通过程序，像这样：```producer.serNamesrvAddr("ip:port")```
* java 配置项，用```rocketmq.namesrv.addr```
* 环境变量，用```NAMESRV_ADDR``` 
* HTTP端点

更多关于nameserver地址发现的详细信息请参考这里
# Broker Server
broker server服务负责消息的存储和传递，消息查询，高可用保障等等。

像下图所示，broker server有一些非常重要的子模块：

* 远程模块，broker的入口，处理从客户端发起的请求。
* 客户端管理，管理各个客户端（生产者/消费者），还有维护消费者的主题订阅。
* 存储服务，提供简单的api来存储或查询物理磁盘中的消息。
* HA高可用服务，提供主从broker之间的数据同步功能。
* 索引服务，通过特殊的key为消息建立索引，并提供消息快速查询的功能。

![avatar](https://rocketmq.apache.org/assets/images/rmq-basic-component.png) 

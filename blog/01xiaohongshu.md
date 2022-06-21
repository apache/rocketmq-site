---
title: 小红书消息中间件的运维实践与治理之路
description: 小红书消息中间件的运维实践与治理之路
slug: xiaohongshu
tags: [用户案例]
image: https://tva1.sinaimg.cn/large/e6c9d24egy1h3gas4ezy6j20sg0g0weu.jpg
hide_table_of_contents: false
---


<!--truncate-->

## 1. 消息队列业务场景与挑战

### 1.1 整体规模

下图展示了 RocketMQ 和 Kafka 的总体规模。其中峰值  TPS 的 8000w/s 一般出现在晚上下班以后的时间段，写入量达到50GB/s，每天新增2-3PB数据，节点数1200+个。

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3gaz0px0oj21c40bumyo.jpg
" alt="Example banner" />;

### 1.2 业务架构

虽然 RocketMQ 和 Kafka 的性能相似，但在使用场景上还是有所区别的。RocketMQ 丰富的业务特性更适用于在线业务场景，而 Kafka 的高吞吐性使其更偏向离线、近线业务。当然，在实际应用中也会有交叉使用的现象，有时在线业务也会使用 Kafka 解耦，有的流处理数据也会使用 RocketMQ 存储。

业务总体架构如下图所示，业务日志和APP用户行为打点类的内容会发给 Kafka，数据库增量日志、在线业务、线上数据交换等会发给 RocketMQ。Kafka 和 RocketMQ 中的数据会有一部分流入 flink 中构建实时数仓、离线数仓以及一些数据产品（如报表、监控，等），RocketMQ 中另一部分数据会用于在线业务APP异步解耦。



<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3gb1can0cj21c60no40y.jpg
" alt="Example banner" />;

### 1.3 稳定性挑战
a.   背景：
小红书整体收敛消息组件较晚，公司技术架构最大的目标是提升系统稳定性；

b.   挑战：
现存消息组件使用量极大，但没有稳定性保障；同时面临人手紧缺、时间紧，对MQ原理了解不深入的困境；

c.   策略：
先做监控，增强集群的可观测能力是了解其健康状况的最高效手段。

### 1.4 稳定性治理

除了监控告警，我们在稳定性治理方面还做了以下改造工作：
a.   引擎：资源隔离，新增监控打点等；
b.   平台：工单审核，权限管控，业务追溯；
c.   治理：针对集群可视化能力和集群可运维能力的建设；


<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3gb3mslkpj21680scabg.jpg
" alt="Example banner" />;
### 目录
[动机](#1)
[为什么选择RocketMQ?](#2)
[RocketMQ vs ActiveMQ vs Kafka](#3)

<h1 id="1">动机</h1>

在早期阶段，我们构建了基于ActiveMQ 5.x的分布式消息传递中间件（5.3之前）。我们的跨国业务将其用于异步通信，搜索，社交网络活动流，数据管道，甚至在其交易流程中。随着我们的贸易业务吞吐量的增加，我们的消息传递集群的压力也变得迫切。

<h1 id="2">为什么选择RocketMQ？</h1>

根据我们的研究，随着使用的队列和虚拟主题的增加，ActiveMQ IO模块成为瓶颈。我们尽力通过节流，断路器或降级解决这个问题，但效果不佳。因此，我们开始关注当时流行的消息传递解决方案Kafka。不幸的是，Kafka无法满足我们的要求，特别是在低延迟和高可靠性方面，详见[此处](https://rocketmq.apache.org/rocketmq/how-to-support-more-queues-in-rocketmq/)。

在这种情况下，我们决定发明一种新的消息传递引擎来处理更广泛的用例，从传统的发布/子场景到大容量的实时零容量容错事务系统。我们相信这个解决方案可能是有作用的的，所以我们希望将它开源给社区。如今，已有超过100家公司在其业务中使用RocketMQ的开源版本。我们还发布了基于RocketMQ的商业发行版，是一种名为[阿里巴巴云平台](https://www.alibabacloud.com/zh)的PaaS产品。

下表演示了RocketMQ，ActiveMQ和Kafka（根据[awesome-java](https://github.com/akullpp/awesome-java)的 Apache最流行的消息传递解决方案）之间的比较：

<h1 id="3">RocketMQ vs ActiveMQ vs Kafka</h1>

请注意，本文档由RocketMQ团队撰写。虽然理想状态是对技术和功能的进行公正无私地比较，但作者的专业知识和偏见显然有利于RocketMQ。

下表是一个方便的快速参考，可以一目了然地发现RocketMQ和和其最受欢迎的替代品之间的差异。


| 消息产品 | 客户端SDK | 协议和规范 | 订购消息 | 预定消息 | 批量消息 | 广播消息 | 邮件过滤器 | 服务器触发重新传递 | 消息存储 | 消息追溯 | 消息优先级 | 高可用性和故障转移 | 消息跟踪 | 配置 | 管理和操作工具 |
| :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ | :------ |
| ActiveMQ的 | Java，.NET，C ++等 | push模型，支持OpenWire，STOMP，AMQP，MQTT，JMS | 独家消费者或独家排队可以确保订购 | 支持 | 不支持 | 支持 | 支持 |不支持 | 使用JDBC和高性能日志（例如levelDB，kahaDB）支持非常快速的持久性 | 支持 | 支持 | 支持，根据存储，如果使用kahadb，则需要ZooKeeper服务器 | 不支持 | 默认配置为低级别，用户需要优化配置参数 | 支持 |
| Kafka | Java，Scala等 | pull模型，支持TCP | 确保在分区内对消息进行排序 | 不支持 | 支持，使用异步生产者 | 不支持 | 支持，您可以使用Kafka Streams过滤邮件 | 不支持 | 高性能文件存储 | 支持 偏移量表示 | 不支持 | 支持，需要ZooKeeper服务器 | 不支持 | Kafka使用键值对格式进行配置。可以从文件或以编程方式提供这些值。| 支持，使用terminal命令公开核心指标 |
| RocketMQ | Java，C ++，Go | pull模型，支持TCP，JMS，OpenMessaging | 确保严格的消息排序，并可以优雅地扩展 | 支持 | 支持，使用同步模式以避免消息丢失 | 支持 | 支持 基于SQL92的属性过滤器表达式 | 支持 | 高性能和低延迟的文件存储 | 支持 时间戳和2个偏移量 | 不支持 | 支持 Master-Slave模型，没有其他套件 | 支持 | 开箱即用，用户只需要注意几个配置 | 支持 丰富Web和终端命令，以公开核心指标 |

English version：[why RocketMQ](http://rocketmq.apache.org/docs/motivation/)



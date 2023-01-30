# 基本概念

本文介绍 Apache RocketMQ 的基本概念，以便您更好地理解和使用 Apache RocketMQ 。

## 主题（Topic）
Apache RocketMQ 中消息传输和存储的顶层容器，用于标识同一类业务逻辑的消息。主题通过TopicName来做唯一标识和区分。更多信息，请参见[主题（Topic）](../03-domainModel/02topic.md)。

## 消息类型（MessageType）
Apache RocketMQ 中按照消息传输特性的不同而定义的分类，用于类型管理和安全校验。 Apache RocketMQ 支持的消息类型有普通消息、顺序消息、事务消息和定时/延时消息。

## 消息队列（MessageQueue）
队列是 Apache RocketMQ 中消息存储和传输的实际容器，也是消息的最小存储单元。 Apache RocketMQ 的所有主题都是由多个队列组成，以此实现队列数量的水平拆分和队列内部的流式存储。队列通过QueueId来做唯一标识和区分。更多信息，请参见[队列（MessageQueue）](../03-domainModel/03messagequeue.md)。

## 消息（Message）
消息是 Apache RocketMQ 中的最小数据传输单元。生产者将业务数据的负载和拓展属性包装成消息发送到服务端，服务端按照相关语义将消息投递到消费端进行消费。更多信息，请参见[消息（Message）](../03-domainModel/04message.md)。

## 消息视图（MessageView）
消息视图是 Apache RocketMQ 面向开发视角提供的一种消息只读接口。通过消息视图可以读取消息内部的多个属性和负载信息，但是不能对消息本身做任何修改。

## 消息标签（MessageTag）
消息标签是Apache RocketMQ 提供的细粒度消息分类属性，可以在主题层级之下做消息类型的细分。消费者通过订阅特定的标签来实现细粒度过滤。更多信息，请参见[消息过滤](../04-featureBehavior/07messagefilter.md)。

## 消息位点（MessageQueueOffset）
消息是按到达Apache RocketMQ 服务端的先后顺序存储在指定主题的多个队列中，每条消息在队列中都有一个唯一的Long类型坐标，这个坐标被定义为消息位点。更多信息，请参见[消费进度管理](../04-featureBehavior/09consumerprogress.md)。

## 消费位点（ConsumerOffset）
一条消息被某个消费者消费完成后不会立即从队列中删除，Apache RocketMQ 会基于每个消费者分组记录消费过的最新一条消息的位点，即消费位点。更多信息，请参见[消费进度管理](../04-featureBehavior/09consumerprogress.md)。

## 消息索引（MessageKey）
消息索引是Apache RocketMQ 提供的面向消息的索引属性。通过设置的消息索引可以快速查找到对应的消息内容。

## 生产者（Producer）
生产者是Apache RocketMQ 系统中用来构建并传输消息到服务端的运行实体。生产者通常被集成在业务系统中，将业务消息按照要求封装成消息并发送至服务端。更多信息，请参见[生产者（Producer）](../03-domainModel/04producer.md)。

## 事务检查器（TransactionChecker）
Apache RocketMQ 中生产者用来执行本地事务检查和异常事务恢复的监听器。事务检查器应该通过业务侧数据的状态来检查和判断事务消息的状态。更多信息，请参见[事务消息](../04-featureBehavior/04transactionmessage.md)。

## 事务状态（TransactionResolution）
Apache RocketMQ 中事务消息发送过程中，事务提交的状态标识，服务端通过事务状态控制事务消息是否应该提交和投递。事务状态包括事务提交、事务回滚和事务未决。更多信息，请参见[事务消息](../04-featureBehavior/04transactionmessage.md)。

## 消费者分组（ConsumerGroup）
消费者分组是Apache RocketMQ 系统中承载多个消费行为一致的消费者的负载均衡分组。和消费者不同，消费者分组并不是运行实体，而是一个逻辑资源。在 Apache RocketMQ 中，通过消费者分组内初始化多个消费者实现消费性能的水平扩展以及高可用容灾。更多信息，请参见[消费者分组（ConsumerGroup）](../03-domainModel/07consumergroup.md)。

## 消费者（Consumer）
消费者是Apache RocketMQ 中用来接收并处理消息的运行实体。消费者通常被集成在业务系统中，从服务端获取消息，并将消息转化成业务可理解的信息，供业务逻辑处理。更多信息，请参见[消费者（Consumer）](../03-domainModel/08consumer.md)。

## 消费结果（ConsumeResult）
Apache RocketMQ 中PushConsumer消费监听器处理消息完成后返回的处理结果，用来标识本次消息是否正确处理。消费结果包含消费成功和消费失败。

## 订阅关系（Subscription）
订阅关系是Apache RocketMQ 系统中消费者获取消息、处理消息的规则和状态配置。订阅关系由消费者分组动态注册到服务端系统，并在后续的消息传输中按照订阅关系定义的过滤规则进行消息匹配和消费进度维护。更多信息，请参见[订阅关系（Subscription）](../03-domainModel/09subscription.md)。

## 消息过滤
消费者可以通过订阅指定消息标签（Tag）对消息进行过滤，确保最终只接收被过滤后的消息合集。过滤规则的计算和匹配在Apache RocketMQ
的服务端完成。更多信息，请参见[消息过滤](../04-featureBehavior/07messagefilter.md)。

## 重置消费位点
以时间轴为坐标，在消息持久化存储的时间范围内，重新设置消费者分组对已订阅主题的消费进度，设置完成后消费者将接收设定时间点之后，由生产者发送到Apache RocketMQ 服务端的消息。更多信息，请参见[重置消费位点](../04-featureBehavior/09consumerprogress.md)。

## 消息轨迹
在一条消息从生产者发出到消费者接收并处理过程中，由各个相关节点的时间、地点等数据汇聚而成的完整链路信息。通过消息轨迹，您能清晰定位消息从生产者发出，经由Apache RocketMQ 服务端，投递给消费者的完整链路，方便定位排查问题。

## 消息堆积
生产者已经将消息发送到Apache RocketMQ 的服务端，但由于消费者的消费能力有限，未能在短时间内将所有消息正确消费掉，此时在服务端保存着未被消费的消息，该状态即消息堆积。



## 事务消息
事务消息是Apache RocketMQ 提供的一种高级消息类型，支持在分布式场景下保障消息生产和本地事务的最终一致性。



## 定时/延时消息
定时/延时消息是Apache RocketMQ 提供的一种高级消息类型，消息被发送至服务端后，在指定时间后才能被消费者消费。通过设置一定的定时时间可以实现分布式场景的延时调度触发效果。


## 顺序消息
顺序消息是Apache RocketMQ 提供的一种高级消息类型，支持消费者按照发送消息的先后顺序获取消息，从而实现业务场景中的顺序处理。


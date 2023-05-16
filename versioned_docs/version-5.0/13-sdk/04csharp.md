# C# 客户端

## 版本说明
本章节介绍使用 Apache RocketMQ 5.0 gRPC 协议 C# SDK 收发消息。

:::info

- 本示例代码基于gRPC 协议 SDK 构建，因此需要服务端至少升级到5.0版本，并启用 gRPC Proxy 才可兼容。关于Proxy的部署参考[快速指南](../02-quickStart/01quickstart.md)。
- 如果您使用的是 Remoting 协议 SDK，建议参考之前4.x 版本的示例代码即可运行.如何识别您使用的 SDK 类型，参考[概览](./01overview.md)。

:::

## 示例代码
下面给出 Apache RocketMQ gRPC 协议 C# SDK的消息收发示例代码链接，完整代码工程和运行环境，参照[rocketmq-clients](https://github.com/apache/rocketmq-clients) 配置运行。


|**消息类型**|**发送消息示例**|**SimpleConsumer消费消息示例**|
|-----------|--------------|--------------------------|
| [普通消息](../04-featureBehavior/01normalmessage.md)                 |[ProducerNormalMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerNormalMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
| [顺序消息](../04-featureBehavior/03fifomessage.md)                 | [ProducerFifoMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerFifoMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
| [定时/延时消息](../04-featureBehavior/02delaymessage.md)              | [ProducerDelayMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerDelayMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs)  |
| [事务消息](../04-featureBehavior/04transactionmessage.md)                 |[ProducerTransactionMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerTransactionMessageExample.cs)   |[SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
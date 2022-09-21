# 订阅关系一致

## 前言

订阅关系是 RocketMQ 领域模型中非常重要的环节，用于表达消费者消费消息的控制元数据，完整的概念请参考[订阅关系模型](../03-领域模型/09subscription.md)。

订阅关系一致是指，同一个消费者组下所有消费者实例所订阅的Topic、Tag必须完全一致。如果订阅关系（消费者分组名-Topic-Tag）不一致，会导致消费消息紊乱，甚至消息丢失。

## 1  正确订阅关系示例

### 1.1 订阅的Topic一样，且过滤表达式一致

如下图所示，同一 ConsumerGroup 下的三个Consumer实例C1、C2和C3分别都订阅了TopicA，且订阅TopicA的Tag也都是Tag1，符合订阅关系一致原则。

![1658453577894-0e64b114-cb4a-4220-a09a-62bc1f2943c6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfsw9aaaj20ie0deq3i.jpg)


**正确示例代码一**

C1、C2、C3的订阅关系一致，即C1、C2、C3订阅消息的代码必须完全一致，代码示例如下：

```java
        PushConsumer consumer1 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer1.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));
        
        PushConsumer consumer2 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer2.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));
        
        PushConsumer consumer3 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer3.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));
```
:::info
RocketMQ 强调订阅关系一致，核心是指相同 ConsumerGroup 的每个 Consumer 之间一致，因为在服务端视角看来一个 Group 下的所有 Consumer 都应该是相同的副本逻辑。

强调订阅关系一致，并不是指一个 Consumer 不能订阅多个Topic，每个 Consumer 仍然可以按照需要订阅多个 Topic，但前提是相同消费者分组下的 Consumer 要一致。
:::


## 2 订阅关系不一致的排查

**问题描述**

在使用 Apache RocketMQ 时，可能会出现订阅关系不一致的情况，具体的问题现象如下：

- Apache RocketMQ 控制台中订阅关系是否一致显示为否。
- 消费者（Consumer）实例未收到订阅的消息。

**请参考以下步骤进行检查**

您可在消息Apache RocketMQ的控制台或者CLi工具查看指定Group的订阅关系是否一致。若查询结果不一致，请参见本文(3 常见订阅关系不一致问题)排查Consumer实例的消费代码。

1. 检查您Consumer实例中与订阅相关的配置代码，确保配置同一个 ConsumerGroup 的所有Consumer实例均订阅相同的Topic及Tag。
2. 使用控制台或者Cli命令ConsumerConnection 查看生效的订阅关系是否一致。
3. 测试并确认消息能够被预期的Consumer实例所消费。

## 3 常见订阅关系不一致问题

### 3.1 同一ConsumerGroup下的Consumer实例订阅的Topic不同（3.x、4.x SDK适用）

在早期3.x/4.x 版本的SDK中，如下图所示，同一 ConsumerGroup 下的三个Consumer实例C1、C2和C3分别订阅了TopicA、TopicB和TopicC，订阅的Topic不一致，不符合订阅关系一致性原则。
:::note
5.x版本SDK 已经支持同一个 ConsumerGroup 下的Consumer实例订阅不同的Topic。
:::
![image-20220722102131073](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfvy56ufj20oh0h9wfg.jpg)

### 3.2 同一 ConsumerGroup 下的 Consumer 实例订阅的Topic相同，但订阅的Tag不一致

如下图所示，同一 ConsumerGroup 下的三个Consumer实例C1、C2和C3分别都订阅了TopicA，但是C1订阅TopicA的Tag为**Tag1**，C2和C3订阅的TopicA的Tag为**Tag2**，订阅同一Topic的Tag不一致，不符合订阅关系一致性原则。

![image-20220722102926055](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfw59vm9j20o30gwwfh.jpg)

**错误示例代码二**

+ Consumer实例2-1：

  ```java
        PushConsumer consumer1 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer1.subscribe("TopicA", new FilterExpression("Tag1", FilterExpressionType.TAG));
  ```

  

+ Consumer实例2-2：

  ```java
        PushConsumer consumer2 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer2.subscribe("TopicA", new FilterExpression("Tag2", FilterExpressionType.TAG));
  ```

+ Consumer实例2-3：

  ```java
        PushConsumer consumer3 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
        consumer3.subscribe("TopicA", new FilterExpression("Tag2", FilterExpressionType.TAG));
  ```






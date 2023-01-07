# Consistent subscription relationship

## Introduction

Subscription relationships are a very important part of the RocketMQ domain model, used to express the control metadata for consumer consumption of messages. For a complete concept, please refer to [Subscription Relationship Model](../03-domainModel/09subscription.md).

Subscription relationships are consistent when all Consumer instances in the same consumer group have exactly the same subscriptions to Topic and Tag. If the subscription relationships (consumer group name-Topic-Tag) are not consistent, it can lead to confusion in consuming messages and even loss of messages.

## 1  Examples of correct subscription relationships

### 1.1  Topics subscribed to are the same and the filter expressions are consistent

As shown in the following figure, the three Consumer instances C1, C2, and C3 in the same ConsumerGroup have all subscribed to TopicA, and the subscriptions to TopicA's Tag are all Tag1, which meets the principle of subscription relationship consistency.

![1658453577894-0e64b114-cb4a-4220-a09a-62bc1f2943c6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfsw9aaaj20ie0deq3i.jpg)

**Correct example code   1:**

C1, C2, and C3's subscription relationships are consistent, meaning that C1, C2, and C3's code for subscribing to messages must be exactly the same, and the code example is as follows:

```java
PushConsumer consumer1 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
consumer1.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));

PushConsumer consumer2 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
consumer2.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));

PushConsumer consumer3 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
consumer3.subscribe("TopicA", new FilterExpression("TagA", FilterExpressionType.TAG));
```
:::info
RocketMQ emphasizes consistency in subscription relationships, which means that every Consumer within the same ConsumerGroup should be consistent, because from the perspective of the server, all Consumers in a Group should be the same logical copy.

Emphasis on consistency in subscription relationships does not mean that a Consumer cannot subscribe to multiple Topics, and each Consumer can still subscribe to multiple Topics as needed, but the premise is that Consumers within the same consumer group must be consistent.
:::


## 2 Troubleshooting inconsistent subscription relationships

**Problem description**

When using the RocketMQ version of the message queue, it is possible to have inconsistent subscription relationships. The specific problems are as follows:

- The consistency of subscription relationships in the RocketMQ version of the message queue console is displayed as no.
- Consumer instances do not receive subscribed messages.

**Please refer to the following steps for checking**

You can check whether the subscription relationship of the specified Group is consistent in the Apache RocketMQ console or CLi tool. If the query result is inconsistent, please refer to the common subscription relationship inconsistency problems in this article to troubleshoot the consumption code of the Consumer instance.

1. Check the configuration code related to subscription in your Consumer instance to ensure that all Consumer instances in the same ConsumerGroup subscribe to the same Topic and Tag.
2. Use the console or Cli command ConsumerConnection to check if the effective subscription relationship is consistent.
3. Test and confirm that the message can be consumed by the expected Consumer instance.

## 3 Common issues with inconsistent subscription relationships

### 3.1 In the same ConsumerGroup, the Consumer instances have different Topics subscribed to (applicable to 3.x, 4.x SDK)

In the early 3.x/4.x versions of the SDK, as shown in the following figure, three Consumer instances C1, C2, and C3 in the same ConsumerGroup have subscribed to TopicA, TopicB, and TopicC respectively, and their subscribed Topics are inconsistent, which does not conform to the principle of consistent subscription.
:::note
The 5.x version of the SDK now supports Consumer instances in the same ConsumerGroup subscribing to different topics.
:::
![image-20220722102131073](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfvy56ufj20oh0h9wfg.jpg)

### 3.2 Consumer instances in the same ConsumerGroup subscribe to the same topic, but the subscribed tags are different.

As shown in the following figure, the Consumer instances C1, C2, and C3 in the same ConsumerGroup all subscribe to TopicA, but C1 subscribes to Tag1 of TopicA, while C2 and C3 subscribe to Tag2 of TopicA. The subscribed tags of the same topic are inconsistent and do not conform to the consistency principle of subscription relationship.

![image-20220722102926055](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfw59vm9j20o30gwwfh.jpg)

**Error example code 2:**

+ Consumer example 2-1：

  ```java
  PushConsumer consumer1 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
  consumer1.subscribe("TopicA", new FilterExpression("Tag1", FilterExpressionType.TAG));
  ```

  

+ Consumer example 2-2：

  ```java
  PushConsumer consumer2 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
  consumer2.subscribe("TopicA", new FilterExpression("Tag2", FilterExpressionType.TAG));
  ```

+ Consumer example 2-3：

  ```java
  PushConsumer consumer3 = provider.newPushConsumerBuilder().setConsumerGroup("GroupA").build();
  consumer3.subscribe("TopicA", new FilterExpression("Tag2", FilterExpressionType.TAG));
  ```

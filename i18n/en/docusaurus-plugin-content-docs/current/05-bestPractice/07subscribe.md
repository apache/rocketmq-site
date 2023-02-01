# Consistent Subscription Relationship

## Introduction

Subscription relationship: a consumer group subscribes to a particular Tag of a Topic, this record is called a subscription relationship.

Consistent subscription relationship: all consumer instances in the same consumer group must have the exact same subscription to the Topic and Tag. If the subscription relationship (consumer group name-Topic-Tag) is not consistent, it can cause confusion when consuming messages and may even result in message loss.

## 1  Examples of correct subscription relationships

### 1.1 Subscribe to a Topic and subscribe to a Tag

As shown in the following figure, three Consumer instances C1, C2, and C3 in the same Group ID have all subscribed to TopicA, and the Tag of their subscription to TopicA is also Tag1, which conforms to the principle of consistent subscription.

![1658453577894-0e64b114-cb4a-4220-a09a-62bc1f2943c6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfsw9aaaj20ie0deq3i.jpg)

**Correct example code 1:**

The subscription relationships of C1, C2, and C3 are consistent, meaning the code for subscribing to messages for C1, C2, and C3 must be exactly the same, and the code example is as follows:

```java
    Properties properties = new Properties();
    properties.put(PropertyKeyConst.GROUP_ID, "GID_test_1");
    Consumer consumer = ONSFactory.createConsumer(properties);
    consumer.subscribe("TopicA", "Tag1", new MessageListener() {
        public Action consume(Message message, ConsumeContext context) {
            System.out.println(message.getMsgID());
            return Action.CommitMessage;
        }
    }); 
```

### 1.2 Subscribe to a Topic and subscribe to multiple Tags

As shown in the following figure, the three Consumer instances C1, C2, and C3 in the same Group ID have all subscribed to TopicB and have subscribed to Tag2 and Tag3 for TopicB, which means they have subscribed to all messages in TopicB with Tag2 or Tag3, and the order is consistent as Tag2||Tag3, meeting the principle of subscription relationship consistency.

![1658453865541-118b0cd0-d597-4a76-9561-ae765540567c](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfudl3awj20nt0gywfj.jpg)

**Correct  example code 2:**

The subscription relationships of C1, C2, and C3 are consistent, meaning the code for subscribing to messages for C1, C2, and C3 must be exactly the same, and the code example is as follows:

```java
    Properties properties = new Properties();
    properties.put(PropertyKeyConst.GROUP_ID, "GID_test_2");
    Consumer consumer = ONSFactory.createConsumer(properties);
    consumer.subscribe("TopicB", "Tag2||Tag3", new MessageListener() {
        public Action consume(Message message, ConsumeContext context) {
            System.out.println(message.getMsgID());
            return Action.CommitMessage;
        }
    });   
```

### 1.3 Subscribe to multiple Topics and subscribe to multiple Tags

As shown in the following figure, the three Consumer instances C1, C2, and C3 in the same Group ID have all subscribed to TopicA and TopicB, and their subscription to TopicA does not specify any Tag, which means they subscribe to all messages in TopicA, and their subscription to TopicB's Tag is Tag1 and Tag2, which means they subscribe to all messages in TopicB with Tag1 or Tag2, and the order is consistent as Tag1||Tag2, meeting the principle of subscription relationship consistency.

![1658454292557-c07fa0ac-81be-4aac-9c5b-342821c554a6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfutzsnbj20o40h4t9s.jpg)

**Correct example code 3:**

The subscription relationships of C1, C2, and C3 are consistent, meaning the code for subscribing to messages for C1, C2, and C3 must be exactly the same, and the code example is as follows：

```java
    Properties properties = new Properties();
    properties.put(PropertyKeyConst.GROUP_ID, "GID_test_3");
    Consumer consumer = ONSFactory.createConsumer(properties);
    consumer.subscribe("TopicA", "*", new MessageListener() {
        public Action consume(Message message, ConsumeContext context) {
            System.out.println(message.getMsgID());
            return Action.CommitMessage;
        }
    });     
    consumer.subscribe("TopicB", "Tag2||Tag3", new MessageListener() {
        public Action consume(Message message, ConsumeContext context) {
            System.out.println(message.getMsgID());
            return Action.CommitMessage;
        }
    });   
```

## 2 Troubleshooting inconsistent subscription relationships

**Problem description**

When using the RocketMQ version of the message queue, it is possible to have inconsistent subscription relationships. The specific problems are as follows:

- The consistency of subscription relationships in the RocketMQ version of the message queue console is displayed as no.
- Consumer instances do not receive subscribed messages.

**Please refer to the following steps for checking**

You can check the consistency of the subscription relationship of the specified Group on the Group Details page of the RocketMQ version of the message queue console. If the query result is inconsistent, please refer to section 3 of this article to troubleshoot the consumption code of the Consumer instance.

1. Check the configuration code related to subscription in your Consumer instance to ensure that all Consumer instances with the same Group ID subscribe to the same Topic and Tag.
2. Restart the client application.
3. Log in to the [RocketMQ version of the message queue console](https://ons.console.aliyun.com/) and click the instance list in the left navigation bar. Select your target instance and enter the instance details page.
4. Click Group Management in the left navigation bar, select the corresponding protocol, and then click Consumer Status to confirm that the consistency of the subscription relationship is displayed as Yes.
5. Test and confirm that the message can be consumed by the expected consumer instance.

## 3 Common issues with inconsistent subscription relationships

### 3.1  Consumer instances with the same Group ID subscribe to different Topics

As shown in the following figure, the three Consumer instances C1, C2, and C3 in the same Group ID have subscribed to TopicA, TopicB, and TopicC, respectively, and their subscriptions to the Topics are not the same, which does not meet the principle of subscription relationship consistency.

![image-20220722102131073](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfvy56ufj20oh0h9wfg.jpg)

**Error example code 1**

+ Consumer example 1-1：

  ```java
      Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_1");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicA", "*", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });
  ```

+ Consumer example 1-2：

  ```java
  Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_1");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicB", "*", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });
  ```

+ Consumer example 1-3：

  ```java
      Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_1");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicC", "*", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });
  ```

### 3.2 Consumer instances with the same Group ID subscribe to the same Topic, but their subscriptions to the Tag are different

As shown in the following figure, the three Consumer instances C1, C2, and C3 in the same Group ID have all subscribed to TopicA, but C1 subscribes to Tag1 for TopicA, C2 and C3 subscribe to Tag2 for TopicA, and the subscriptions to the same Topic's Tag are not the same, which does not meet the principle of subscription relationship consistency.

![image-20220722102926055](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfw59vm9j20o30gwwfh.jpg)

**Error example code 2**

+ Consumer example  2-1：

  ```java
      Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_2");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicA", "Tag1", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });  
  ```

  

+ Consumer example  2-2：

  ```java
      Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_2");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicA", "Tag2", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });  
  ```

+ Consumer example  2-3：

  ```java
      Properties properties = new Properties();
      properties.put(PropertyKeyConst.GROUP_ID, "GID_test_2");
      Consumer consumer = ONSFactory.createConsumer(properties);
      consumer.subscribe("TopicA", "Tag2", new MessageListener() {
          public Action consume(Message message, ConsumeContext context) {
              System.out.println(message.getMsgID());
              return Action.CommitMessage;
          }
      });  
  ```






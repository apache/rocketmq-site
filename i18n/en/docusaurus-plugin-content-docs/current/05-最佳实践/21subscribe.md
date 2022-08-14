# 订阅关系一致

## 前言

订阅关系：一个消费者组订阅一个 Topic 的某一个 Tag，这种记录被称为订阅关系。

订阅关系一致：同一个消费者组下所有消费者实例所订阅的Topic、Tag必须完全一致。如果订阅关系（消费者组名-Topic-Tag）不一致，会导致消费消息紊乱，甚至消息丢失。

## 1  正确订阅关系示例



### 1.1 订阅一个Topic且订阅一个Tag

如下图所示，同一Group ID下的三个Consumer实例C1、C2和C3分别都订阅了TopicA，且订阅TopicA的Tag也都是Tag1，符合订阅关系一致原则。

![1658453577894-0e64b114-cb4a-4220-a09a-62bc1f2943c6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfsw9aaaj20ie0deq3i.jpg)





**正确示例代码一**

C1、C2、C3的订阅关系一致，即C1、C2、C3订阅消息的代码必须完全一致，代码示例如下：

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

### 1.2 订阅一个Topic且订阅多个Tag

如下图所示，同一Group ID下的三个Consumer实例C1、C2和C3分别都订阅了TopicB，订阅TopicB的Tag也都是Tag2和Tag3，表示订阅TopicB中所有Tag为Tag2或Tag3的消息，且顺序一致都是Tag2||Tag3，符合订阅关系一致性原则。

![1658453865541-118b0cd0-d597-4a76-9561-ae765540567c](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfudl3awj20nt0gywfj.jpg)

**正确示例代码二**

C1、C2、C3的订阅关系一致，即C1、C2、C3订阅消息的代码必须完全一致，代码示例如下：

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

### 1.3 订阅多个Topic且订阅多个Tag

如下图所示，同一Group ID下的三个Consumer实例C1、C2和C3分别都订阅了TopicA和TopicB，且订阅的TopicA都未指定Tag，即订阅TopicA中的所有消息，订阅的TopicB的Tag都是Tag1和Tag2，表示订阅TopicB中所有Tag为Tag1或Tag2的消息，且顺序一致都是Tag1||Tag2，符合订阅关系一致原则。

![1658454292557-c07fa0ac-81be-4aac-9c5b-342821c554a6](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfutzsnbj20o40h4t9s.jpg)

**正确示例代码三**

C1、C2、C3的订阅关系一致，即C1、C2、C3订阅消息的代码必须完全一致，代码示例如下：

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

## 2 订阅关系不一致的排查

**问题描述**

在使用消息队列RocketMQ版实例时，可能会出现订阅关系不一致的情况，具体的问题现象如下：

- 消息队列RocketMQ版控制台中订阅关系是否一致显示为否。
- 消费者（Consumer）实例未收到订阅的消息。

**请参考以下步骤进行检查**

您可在消息消息队列RocketMQ版控制台Group 详情页面查看指定Group的订阅关系是否一致。若查询结果不一致，请参见本文(3 常见订阅关系不一致问题)排查Consumer实例的消费代码。

1. 检查您Consumer实例中与订阅相关的配置代码，确保配置同一个Group ID的所有Consumer实例均订阅相同的Topic及Tag。
2. 重启客户端应用。
3. 登录[消息队列RocketMQ版控制台](https://ons.console.aliyun.com/)，在左侧导航栏中单击实例列表，选择您的目标实例，进入实例详情页面。
4. 在左侧导航栏中单击Group管理，选择对应的协议后，单击消费者状态，确认订阅关系是否一致显示为是。
5. 测试并确认消息能够被预期的Consumer实例所消费。

## 3 常见订阅关系不一致问题

### 3.1 同一Group ID下的Consumer实例订阅的Topic不同

如下图所示，同一Group ID下的三个Consumer实例C1、C2和C3分别订阅了TopicA、TopicB和TopicC，订阅的Topic不一致，不符合订阅关系一致性原则。

![image-20220722102131073](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfvy56ufj20oh0h9wfg.jpg)

**错误示例代码一**

+ Consumer实例1-1：

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

+ Consumer实例1-2：

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

+ Consumer实例1-3：

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

### 3.2 同一Group ID下的Consumer实例订阅的Topic相同，但订阅的Tag不一致

如下图所示，同一Group ID下的三个Consumer实例C1、C2和C3分别都订阅了TopicA，但是C1订阅TopicA的Tag为**Tag1**，C2和C3订阅的TopicA的Tag为**Tag2**，订阅同一Topic的Tag不一致，不符合订阅关系一致性原则。

![image-20220722102926055](https://tva1.sinaimg.cn/large/e6c9d24egy1h4lfw59vm9j20o30gwwfh.jpg)

**错误示例代码二**

+ Consumer实例2-1：

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

  

+ Consumer实例2-2：

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

+ Consumer实例2-3：

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






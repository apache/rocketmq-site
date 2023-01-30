# Message Trace

## 1. Key attributes of message trace data
| Producer | Consumer | Broker |
| --- | --- | --- |
| Production instance information | Consumer instance information | Message Topic |
| Time of message sending | Delivery time and delivery round | Message store location |
| Success of message sending | Success of message consumption | Message key value |
| Time taken to send | Time taken to consume | Message tag value |

## 2. Cluster Deployment for Supporting Message Trace

### 2.1 Broker configuration file
Here is the content of the properties configuration file for enabling the message trace feature on the Broker ：
```
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH
storePathRootDir=/data/rocketmq/rootdir-a-m
storePathCommitLog=/data/rocketmq/commitlog-a-m
autoCreateSubscriptionGroup=true
## if msg tracing is open,the flag will be true
traceTopicEnable=true
listenPort=10911
brokerIP1=XX.XX.XX.XX1
namesrvAddr=XX.XX.XX.XX:9876
```

### 2.2 Normal mode
In  RocketMQ cluster, each Broker node is used to store message trace data collected and sent by the Client. Therefore, there is no requirement or limit on the number of Broker nodes in the RocketMQ cluster.

### 2.3 Physical IO isolation mode
For scenarios with a large amount of message trace data, you can choose one of the Broker nodes in the RocketMQ cluster to be dedicated to storing message traces, so that the physical IO of the user's ordinary message data is completely isolated from the message trace data and does not affect each other. In this mode, there are at least two Broker nodes in the RocketMQ cluster, and one of them is defined as the server that stores the message trace data.

### 2.4 Start the Broker with message trace enabled
`nohup sh mqbroker -c ../conf/2m-noslave/broker-a.properties &`

## 3. Save the topic definition for message trace
RocketMQ's message trace feature supports two ways of storing trace data：

### 3.1 System-level TraceTopic
By default, the message trace data is stored in the system-level TraceTopic (whose name is: **RMQ_SYS_TRACE_TOPIC**). This Topic is automatically created when the Broker node is started (as mentioned above, the **traceTopicEnable** switch variable must be set to **true** in the Broker side configuration file).

### 3.2 User-defined TraceTopic
If the user does not want to store the message trace data in the default system-level TraceTopic, they can also define and create a user-level Topic to save the trace (that is, create a regular Topic to store the message trace data). The next section will introduce how the Client interface supports user-defined TraceTopic.

## 4. The Client with Message Trace Practice
In order to minimize the transformation work of the user's business system using the RocketMQ message trace feature, the author designed to add a switch parameter (**enableMsgTrace**) to the original interface to enable or disable message trace, and added a custom parameter (**customizedTraceTopic**) to allow the user to store the message trace data in their own user-level Topic created.

### 4.1 Enable message trace when sending messages
```java
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName",true);
        producer.setNamesrvAddr("XX.XX.XX.XX1");
        producer.start();
            try {
                {
                    Message msg = new Message("TopicTest",
                        "TagA",
                        "OrderID188",
                        "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
                    SendResult sendResult = producer.send(msg);
                    System.out.printf("%s%n", sendResult);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
```

### 4.2 Enable message trace when subscribing to messages
```java
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_JODIE_1",true);
        consumer.subscribe("TopicTest", "*");
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
        consumer.setConsumeTimestamp("20181109221800");
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        consumer.start();
        System.out.printf("Consumer Started.%n");
```

### 4.3 Support custom storage message trace Topic
To support custom storage message trace Topic, modify the initialization of the DefaultMQProducer and DefaultMQPushConsumer instances as follows when sending and subscribing to messages.

```java
        ##Topic_test11111 needs to be created by the user in advance to store message traces:
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName",true,"Topic_test11111");
        ......

        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_JODIE_1",true,"Topic_test11111");
        ......
```

### 4.4 Use the mqadmin command to send and view traces
- Send message

  ```shell
  ./mqadmin sendMessage -m true --topic some-topic-name -n 127.0.0.1:9876 -p "your meesgae content"
  ```
- Query trace

  ```shell
  ./mqadmin QueryMsgTraceById -n 127.0.0.1:9876 -i "some-message-id"
  ```
- Query trace result

  ```
  RocketMQLog:WARN No appenders could be found for logger (io.netty.util.internal.PlatformDependent0).
  RocketMQLog:WARN Please initialize the logger system properly.
  #Type      #ProducerGroup       #ClientHost          #SendTime            #CostTimes #Status
  Pub        1623305799667        xxx.xxx.xxx.xxx       2021-06-10 14:16:40  131ms      success
  ```

  

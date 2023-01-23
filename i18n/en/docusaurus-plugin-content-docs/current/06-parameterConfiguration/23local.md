# Client configuration

In the RocketMQ Broker cluster, both producers and consumers are clients. This section mainly describes the common behavior configurations for producers and consumers.

### Client addressing method

RocketMQ allows clients to find the Name Server, and then find the Broker through the Name Server. There are multiple configuration methods, with priority from high to low, and higher priority will override lower priority.

- Specifying the Name Server address in the code, with multiple namesrv addresses separated by semicolons

  ```java
  producer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");  
  
  consumer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");
  ```

- Specifying the Name Server address in the Java startup parameters

  ```text
  -Drocketmq.namesrv.addr=192.168.0.1:9876;192.168.0.2:9876  
  ```

- Specifying the Name Server address in the environment variable

  ```shell
  export   NAMESRV_ADDR=192.168.0.1:9876;192.168.0.2:9876   
  ```

- HTTP static server addressing (default)

  After the client starts, it will periodically access a static HTTP server with the following address: ：<http://jmenv.tbsite.net:8080/rocketmq/nsaddr>，and the return content of this URL is as follows：

  ```text
  192.168.0.1:9876;192.168.0.2:9876   
  ```

The client defaults to accessing this HTTP server every 2 minutes and updating the local Name Server address. The URL is hard-coded in the code, and can be changed by modifying the /etc/hosts file. For example, adding the following configuration in /etc/hosts:

```text
10.232.22.67    jmenv.taobao.net   
```

It is recommended to use the HTTP static server addressing method, as it is simple to deploy the client and the Name Server cluster can be hot upgraded.

#### Client configuration

DefaultMQProducer, TransactionMQProducer, DefaultMQPushConsumer, and DefaultMQPullConsumer all extends from the ClientConfig class, which is a common configuration class for clients. The client's configuration is in the form of get and set methods, and each parameter can be configured with Spring or in the code. For example, the namesrvAddr parameter can be configured like this: producer.setNamesrvAddr("192.168.0.1:9876"), and other parameters are similar.

## ClientConfig configuration

| Name                            | Description                                                  | Parameter type | Default value                                                | Effective value | Importance |
| ------------------------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ | --------------- | ---------- |
| namesrvAddr                     | NameServer address                                           | String         | From -D system parameter rocketmq.namesrv.addr or environment variable.NAMESRV_ADDR |                 |            |
| instanceName                    | Client instance name                                         | String         | From -D system parameter rocketmq.client.name, otherwise it is DEFAULT |                 |            |
| clientIP                        | Client IP                                                    | String         | RemotingUtil.getLocalAddress()                               |                 |            |
| namespace                       | Client namespace                                             | String         |                                                              |                 |            |
| accessChannel                   | Setting up access channels                                   | AccessChannel  | LOCAL                                                        |                 |            |
| clientCallbackExecutorThreads   | The number of processor cores when the client communication layer receives a network request | int            | Runtime.getRuntime().availableProcessors()                   |                 |            |
| pollNameServerInterval          | Time interval for polling route information from NameServer  | int            | 30000, in milliseconds                                       |                 |            |
| heartbeatBrokerInterval         | Interval for regularly sending registration heartbeats to broker | int            | 30000, in milliseconds                                       |                 |            |
| persistConsumerOffsetInterval   | Applies to Consumer, the interval for persisting consumption progress | int            | 5000, in milliseconds                                        |                 |            |
| pullTimeDelayMillsWhenException | Delay time setting when pulling messages encounters an exception | long           | 1000, in milliseconds                                        |                 |            |
| unitName                        | Unit name                                                    | String         |                                                              |                 |            |
| unitMode                        | Unit mode                                                    | boolean        | false                                                        |                 |            |
| vipChannelEnabled               | Whether to enable vip netty channel for sending messages     | boolean        | From -D com.rocketmq.sendMessageWithVIPChannel parameter value, if not it is true |                 |            |
| useTLS                          | Whether to use TLS transport.                                | boolean        | From -D system parameter tls.enable, otherwise it is false.  |                 |            |
| mqClientApiTimeout              | Mq client api timeout setting                                | int            | 3000, in milliseconds                                        |                 |            |
| language                        | Client implementation language                               | LanguageCode   | LanguageCode.*JAVA*                                          |                 |            |

## DefaultMQProducer configuration

| Name                             | Description                                                  | Parameter type  | Default Value                              | Effective value | Importance |
| -------------------------------- | ------------------------------------------------------------ | --------------- | ------------------------------------------ | --------------- | ---------- |
| producerGroup                    | The name of the production group, the identifier of a class of Producers | String          | DEFAULT_PRODUCER                           |                 |            |
| createTopicKey                   | When sending a message, if the topic is not found, if you want to automatically create the topic, you need a key topic, and this value is the value of the key topic. | String          | TopicValidator.AUTO_CREATE_TOPIC_KEY_TOPIC |                 |            |
| defaultTopicQueueNums            | The default number of queues when creating a topic automatically | int             | 4                                          |                 |            |
| sendMsgTimeout                   | The default send timeout time                                | int             | 3000, in milliseconds                      |                 |            |
| compressMsgBodyOverHowmuc        | The threshold for message body compression                   | int             | 1024 * 4，4K                               |                 |            |
| retryTimesWhenSendFailed         | The number of internal retries for rocketmq if synchronous sending fails | int             | 2                                          |                 |            |
| retryTimesWhenSendAsyncFailed    | The number of internal retries for rocketmq if asynchronous sending fails | int             | 2                                          |                 |            |
| retryAnotherBrokerWhenNotStoreOK | If the sending result is not SEND_OK status, whether it should be treated as a failure and retried | boolean         | false                                      |                 |            |
| maxMessageSize                   | Client verification, the maximum message body size allowed to be sent | int             | 1024 * 1024 * 4，4M                        |                 |            |
| traceDispatcher                  | synchronous data transfer interface                          | TraceDispatcher | null                                       |                 |            |

## DefaultMQPushConsumer configuration

| Name                               | Description                                                  | Parameter type               | Default value                                                | Effective value | Importance |
| ---------------------------------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ | --------------- | ---------- |
| consumerGroup                      | The name of the consumer group, used to identify a class of consumers | String                       |                                                              |                 |            |
| messageModel                       | Consumption mode                                             | MessageModel                 | MessageModel.CLUSTERINGallocateMessageQueueStrategy          |                 |            |
| consumeFromWhere                   | Starting consumption point strategy                          | ConsumeFromWhere             | ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET                    |                 |            |
| consumeTimestamp                   | When using CONSUME_FROM_LAST_OFFSET, start consuming from which time point | String                       | Half an hour ago                                             |                 |            |
| allocateMessageQueueStrategy       | Load balancing strategy algorithm                            | AllocateMessageQueueStrategy | AllocateMessageQueueAveragely（Modulo average distribution.） |                 |            |
| subscription                       | Subscription relationship                                    | Map<String, String>          | {}                                                           |                 |            |
| messageListener                    | Message processing listener (callback)                       | MessageListener              | null                                                         |                 |            |
| offsetStore                        | Message consumption progress storage                         | OffsetStore                  | null                                                         |                 |            |
| consumeThreadMin                   | Core size of the consumer thread pool                        | int                          | 20                                                           |                 |            |
| consumeThreadMax                   | Maximum size of the consumer thread pool                     | int                          | 64                                                           |                 |            |
| adjustThreadPoolNumsThreshold      | Dynamic thread core number consumer accumulation threshold   | long                         | 100000                                                       |                 |            |
| consumeConcurrentlyMaxSpan         | In concurrent consumption, the maximum offset span allowed for a single consume queue, which will trigger flow control | int                          | 2000**pullInterval**                                         |                 |            |
| pullThresholdForQueue              | Consume queue flow control threshold                         | int                          | 100                                                          |                 |            |
| pullInterval                       | Pulling interval                                             | long                         | 0, in milliseconds                                           |                 |            |
| pullThresholdForTopic              | Topic-level flow control threshold                           | int                          | -1                                                           |                 |            |
| pullThresholdSizeForTopic          | Limit the topic-level cache message size                     | int                          | -1                                                           |                 |            |
| pullBatchSize                      | Maximum batch size for one pull                              | int                          | 32                                                           |                 |            |
| consumeMessageBatchMaxSize         | Maximum number of messages for batch consumption             | int                          | -1                                                           |                 |            |
| postSubscriptionWhenPull           | Whether to update the subscription relationship each time a pull is made | boolean                      | false                                                        |                 |            |
| unitMode                           | Subscription group unit                                      | boolean                      | false                                                        |                 |            |
| maxReconsumeTimes                  | The maximum number of times a message will be consumed before being delivered to the dead-letter queue if it fails | int                          | -1                                                           |                 |            |
| suspendCurrentQueueTimeMillis      | The time interval for consuming again if the serial consumption returns ROLLBACK or SUSPEND_CURRENT_QUEUE_A_MOMENT | long                         | 1000                                                         |                 |            |
| consumeTimeout                     | The longest timeout time for consumption                     | long                         | 15, in minutes                                               |                 |            |
| awaitTerminationMillisWhenShutdown | The longest wait time for messages when closing the consumer, 0 means no wait. | long                         | 0                                                            |                 |            |
| traceDispatcher                    | Asynchronous data transfer interface                         | TraceDispatcher              | null                                                         |                 |            |



## DefaultLitePullConsumer configuration

| Name                             | Description                                                  | Parameter type               | Default value                                                | Effective value | Importance |
| -------------------------------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ | --------------- | ---------- |
| consumerGroup                    | The name of the consumer group, used to identify a type of consumer | String                       |                                                              |                 |            |
| brokerSuspendMaxTimeMillis       | The maximum time that a connection will be suspended for in long polling by the broker | long                         | 20000, in milliseconds                                       |                 |            |
| consumerTimeoutMillisWhenSuspend | The maximum wait time for a response from the broker in long polling by the client | long                         | 30000, in milliseconds                                       |                 |            |
| consumerPullTimeoutMillis        | The socket timeout for pulling messages                      | long                         | 10000, in milliseconds                                       |                 |            |
| messageModel                     | The consumption mode                                         | MessageModel                 | MessageModel.CLUSTERING                                      |                 |            |
| messageQueueListener             | A listener for changes in the allocation of consume queues in load balancing | MessageQueueListener         |                                                              |                 |            |
| offsetStore                      | The message consumption progress storage                     | OffsetStore                  |                                                              |                 |            |
| allocateMessageQueueStrategy     | The load balancing strategy algorithm                        | AllocateMessageQueueStrategy | AllocateMessageQueueAveragely（Modulo average distribution.） |                 |            |
| unitMode                         | The unit of subscription group settings                      | boolean                      | false                                                        |                 |            |
| autoCommit                       | The setting for automatic commit of offset                   | boolean                      | true                                                         |                 |            |
| pullThreadNums                   | The number of pull threads set                               | int                          | 20                                                           |                 |            |
| MIN_AUTOCOMMIT_INTERVAL_MILLIS   | The minimum interval time for committing offset              | long                         | 1000, in milliseconds                                        |                 |            |
| autoCommitIntervalMillis         | The maximum interval time for committing offset              | long                         | 5000, in milliseconds                                        |                 |            |
| pullBatchSize                    | The maximum number of messages pulled each time              | long                         | 10                                                           |                 |            |
| pullThresholdForAll              | The threshold for flow control of consumed requests          | int                          | 10000                                                        |                 |            |
| consumeMaxSpan                   | The maximum offset span for consumption                      | int                          | 2000                                                         |                 |            |
| pullThresholdForQueue            | The queue level flow control threshold                       | int                          | 1000                                                         |                 |            |
| pullThresholdSizeForQueue        | The queue level limit on cached message size                 | int                          | 100MiB                                                       |                 |            |
| pollTimeoutMillis                | The polling timeout setting                                  | long                         | 5000, in milliseconds                                        |                 |            |
| topicMetadataCheckIntervalMillis | The interval for checking changes in topic metadata          | long                         | 30000, in milliseconds                                       |                 |            |
| consumeFromWhere                 | The consumption mode setting                                 | ConsumeFromWhere             | ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET                    |                 |            |
| consumeTimestamp                 | The time for backtracking consumption                        | String                       | The default consumption rollback time is half an hour ago.   |                 |            |
| traceDispatcher                  | The interface for asynchronous data transmission             | TraceDispatcher              | null                                                         |                 |            |
| enableMsgTrace                   | The flag for message tracing                                 | boolean                      | false                                                        |                 |            |
| customizedTraceTopic             | The name of the topic for message tracing                    | String                       |                                                              |                 |            |

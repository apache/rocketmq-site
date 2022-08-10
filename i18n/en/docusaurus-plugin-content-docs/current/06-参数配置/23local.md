# 客户端配置

 相对于RocketMQ的Broker集群，生产者和消费者都是客户端。本小节主要描述生产者和消费者公共的行为配置。

### 客户端寻址方式

RocketMQ可以令客户端找到Name Server, 然后通过Name Server再找到Broker。如下所示有多种配置方式，优先级由高到低，高优先级会覆盖低优先级。

- 代码中指定Name Server地址，多个namesrv地址之间用分号分割   

```java
producer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");  

consumer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");
```

- Java启动参数中指定Name Server地址

```text
-Drocketmq.namesrv.addr=192.168.0.1:9876;192.168.0.2:9876  
```

- 环境变量指定Name Server地址

```text
export   NAMESRV_ADDR=192.168.0.1:9876;192.168.0.2:9876   
```

- HTTP静态服务器寻址（默认）

客户端启动后，会定时访问一个静态HTTP服务器，地址如下：<http://jmenv.tbsite.net:8080/rocketmq/nsaddr>，这个URL的返回内容如下：

```text
192.168.0.1:9876;192.168.0.2:9876   
```

客户端默认每隔2分钟访问一次这个HTTP服务器，并更新本地的Name Server地址。URL已经在代码中硬编码，可通过修改/etc/hosts文件来改变要访问的服务器，例如在/etc/hosts增加如下配置：

```text
10.232.22.67    jmenv.taobao.net   
```

推荐使用HTTP静态服务器寻址方式，好处是客户端部署简单，且Name Server集群可以热升级。

#### 客户端配置

DefaultMQProducer、TransactionMQProducer、DefaultMQPushConsumer、DefaultMQPullConsumer都继承于ClientConfig类，ClientConfig为客户端的公共配置类。客户端的配置都是get、set形式，每个参数都可以用spring来配置，也可以在代码中配置，例如namesrvAddr这个参数可以这样配置，producer.setNamesrvAddr("192.168.0.1:9876")，其他参数同理。

## ClientConfig配置

| 名称                            | 描述                                           | 参数类型      | 默认值                                                       | 有效值 | 重要性 |
| ------------------------------- | ---------------------------------------------- | ------------- | ------------------------------------------------------------ | ------ | ------ |
| namesrvAddr                     | NameServer的地址列表                           | String        | 从-D系统参数rocketmq.namesrv.addr或环境变量。NAMESRV_ADDR    |        |        |
| instanceName                    | 客户端实例名称                                 | String        | 从-D系统参数rocketmq.client.name获取，否则就是DEFAULT        |        |        |
| clientIP                        | 客户端IP                                       | String        | RemotingUtil.getLocalAddress()                               |        |        |
| namespace                       | 客户端命名空间                                 | String        |                                                              |        |        |
| accessChannel                   | 设置访问通道                                   | AccessChannel | LOCAL                                                        |        |        |
| clientCallbackExecutorThreads   | 客户端通信层接收到网络请求的时候，处理器的核数 | int           | Runtime.getRuntime().availableProcessors()                   |        |        |
| pollNameServerInterval          | 轮询从NameServer获取路由信息的时间间隔         | int           | 30000，单位毫秒                                              |        |        |
| heartbeatBrokerInterval         | 定期发送注册心跳到broker的间隔                 | int           | 30000，单位毫秒                                              |        |        |
| persistConsumerOffsetInterval   | 作用于Consumer，持久化消费进度的间隔           | int           | 默认值5000，单位毫秒                                         |        |        |
| pullTimeDelayMillsWhenException | 拉取消息出现异常的延迟时间设置                 | long          | 1000，单位毫秒                                               |        |        |
| unitName                        | 单位名称                                       | String        |                                                              |        |        |
| unitMode                        | 单位模式                                       | boolean       | false                                                        |        |        |
| vipChannelEnabled               | 是否启用vip netty通道以发送消息                | boolean       | 从-D com.rocketmq.sendMessageWithVIPChannel参数的值，若无则是true |        |        |
| useTLS                          | 是否使用安全传输。                             | boolean       | 从-D系统参数tls.enable获取，否则就是false                    |        |        |
| mqClientApiTimeout              | mq客户端api超时设置                            | int           | 3000，单位毫秒                                               |        |        |
| language                        | 客户端实现语言                                 | LanguageCode  | LanguageCode.*JAVA*                                          |        |        |

## DefaultMQProducer配置

| 名称                             | 描述                                                         | 参数类型        | 默认值                                     | 有效值 | 重要性 |
| -------------------------------- | ------------------------------------------------------------ | --------------- | ------------------------------------------ | ------ | ------ |
| producerGroup                    | 生产组的名称，一类Producer的标识                             | String          | DEFAULT_PRODUCER                           |        |        |
| createTopicKey                   | 发送消息的时候，如果没有找到topic，若想自动创建该topic，需要一个key topic，这个值即是key topic的值 | String          | TopicValidator.AUTO_CREATE_TOPIC_KEY_TOPIC |        |        |
| defaultTopicQueueNums            | 自动创建topic的话，默认queue数量是多少                       | int             | 4                                          |        |        |
| sendMsgTimeout                   | 默认的发送超时时间                                           | int             | 3000，单位毫秒                             |        |        |
| compressMsgBodyOverHowmuc        | 消息body需要压缩的阈值                                       | int             | 1024 * 4，4K                               |        |        |
| retryTimesWhenSendFailed         | 同步发送失败的话，rocketmq内部重试多少次                     | int             | 2                                          |        |        |
| retryTimesWhenSendAsyncFailed    | 异步发送失败的话，rocketmq内部重试多少次                     | int             | 2                                          |        |        |
| retryAnotherBrokerWhenNotStoreOK | 发送的结果如果不是SEND_OK状态，是否当作失败处理而尝试重发    | boolean         | false                                      |        |        |
| maxMessageSize                   | 客户端验证，允许发送的最大消息体大小                         | int             | 1024 * 1024 * 4，4M                        |        |        |
| traceDispatcher                  | 异步传输数据接口                                             | TraceDispatcher | null                                       |        |        |

## DefaultMQPushConsumer配置

| 名称                               | 描述                                                         | 参数类型                     | 默认值                                              | 有效值 | 重要性 |
| ---------------------------------- | ------------------------------------------------------------ | ---------------------------- | --------------------------------------------------- | ------ | ------ |
| consumerGroup                      | 消费组的名称，用于标识一类消费者                             | String                       |                                                     |        |        |
| messageModel                       | 消费模式                                                     | MessageModel                 | MessageModel.CLUSTERINGallocateMessageQueueStrategy |        |        |
| consumeFromWhere                   | 启动消费点策略                                               | ConsumeFromWhere             | ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET           |        |        |
| consumeTimestamp                   | CONSUME_FROM_LAST_OFFSET的时候使用，从哪个时间点开始消费     | String                       | 半小时前                                            |        |        |
| allocateMessageQueueStrategy       | 负载均衡策略算法                                             | AllocateMessageQueueStrategy | AllocateMessageQueueAveragely（取模平均分配）       |        |        |
| subscription                       | 订阅关系                                                     | Map<String, String>          | {}                                                  |        |        |
| messageListener                    | 消息处理监听器（回调）                                       | MessageListener              | null                                                |        |        |
| offsetStore                        | 消息消费进度存储器                                           | OffsetStore                  | null                                                |        |        |
| consumeThreadMin                   | 消费线程池的core size                                        | int                          | 20                                                  |        |        |
| consumeThreadMax                   | 消费线程池的max size                                         | int                          | 64                                                  |        |        |
| adjustThreadPoolNumsThreshold      | 动态扩线程核数的消费堆积阈值                                 | long                         | 100000                                              |        |        |
| consumeConcurrentlyMaxSpan         | 并发消费下，单条consume queue队列允许的最大offset跨度，达到则触发流控 | int                          | 2000**pullInterval**                                |        |        |
| pullThresholdForQueue              | consume queue流控的阈值                                      | int                          | 100                                                 |        |        |
| pullInterval                       | 拉取的间隔                                                   | long                         | 0，单位毫秒                                         |        |        |
| pullThresholdForTopic              | 主题级别的流控制阈值                                         | int                          | -1                                                  |        |        |
| pullThresholdSizeForTopic          | 限制主题级别的缓存消息大小                                   | int                          | -1                                                  |        |        |
| pullBatchSize                      | 一次最大拉取的批量大小                                       | int                          | 32                                                  |        |        |
| consumeMessageBatchMaxSize         | 批量消费的最大消息条数                                       | int                          | -1                                                  |        |        |
| postSubscriptionWhenPull           | 每次拉取的时候是否更新订阅关系                               | boolean                      | false                                               |        |        |
| unitMode                           | 订阅组的单位                                                 | boolean                      | false                                               |        |        |
| maxReconsumeTimes                  | 一个消息如果消费失败的话，最多重新消费多少次才投递到死信队列 | int                          | -1                                                  |        |        |
| suspendCurrentQueueTimeMillis      | 串行消费使用，如果返回ROLLBACK或者SUSPEND_CURRENT_QUEUE_A_MOMENT，再次消费的时间间隔 | long                         | 1000                                                |        |        |
| consumeTimeout                     | 消费的最长超时时间                                           | long                         | 15，单位分钟                                        |        |        |
| awaitTerminationMillisWhenShutdown | 关闭使用者时等待消息的最长时间，0表示无等待。                | long                         | 0                                                   |        |        |
| traceDispatcher                    | 异步传输数据接口                                             | TraceDispatcher              | null                                                |        |        |



## DefaultLitePullConsumer配置

| 名称                             | 描述                                                     | 参数类型                     | 默认值                                        | 有效值 | 重要性 |
| -------------------------------- | -------------------------------------------------------- | ---------------------------- | --------------------------------------------- | ------ | ------ |
| consumerGroup                    | 消费组的名称，用于标识一类消费者                         | String                       |                                               |        |        |
| brokerSuspendMaxTimeMillis       | broker在长轮询下，连接最长挂起的时间                     | long                         | 20000，单位毫秒                               |        |        |
| consumerTimeoutMillisWhenSuspend | broker在长轮询下，客户端等待broker响应的最长等待超时时间 | long                         | 30000，单位毫秒                               |        |        |
| consumerPullTimeoutMillis        | pull的socket 超时时间                                    | long                         | 10000，单位毫秒                               |        |        |
| messageModel                     | 消费模式                                                 | MessageModel                 | MessageModel.CLUSTERING                       |        |        |
| messageQueueListener             | 负载均衡consume queue分配变化的通知监听器                | MessageQueueListener         |                                               |        |        |
| offsetStore                      | 消息消费进度存储器                                       | OffsetStore                  |                                               |        |        |
| allocateMessageQueueStrategy     | 负载均衡策略算法                                         | AllocateMessageQueueStrategy | AllocateMessageQueueAveragely（取模平均分配） |        |        |
| unitMode                         | 订阅组的单位设置                                         | boolean                      | false                                         |        |        |
| autoCommit                       | 自动提交偏移的标志设置                                   | boolean                      | true                                          |        |        |
| pullThreadNums                   | 拉取线程数设置                                           | int                          | 20                                            |        |        |
| MIN_AUTOCOMMIT_INTERVAL_MILLIS   | 最小提交偏移间隔时间                                     | long                         | 1000，单位为毫秒                              |        |        |
| autoCommitIntervalMillis         | 最大提交偏移间隔时间                                     | long                         | 5000，单位为毫秒                              |        |        |
| pullBatchSize                    | 每次拉出的信息的最大数量                                 | long                         | 10                                            |        |        |
| pullThresholdForAll              | 消耗请求的流量控制阈值                                   | int                          | 10000                                         |        |        |
| consumeMaxSpan                   | 消耗最大跨度偏移量                                       | int                          | 2000                                          |        |        |
| pullThresholdForQueue            | 队列级别的流量控制阈值                                   | int                          | 1000                                          |        |        |
| pullThresholdSizeForQueue        | 队列级别上限制缓存的消息大小                             | int                          | 100MiB                                        |        |        |
| pollTimeoutMillis                | 轮询超时设置                                             | long                         | 5000，以毫秒为单位                            |        |        |
| topicMetadataCheckIntervalMillis | 检查主题元数据变化的间隔时间                             | long                         | 30000，单位为毫秒                             |        |        |
| consumeFromWhere                 | 消费方式设置                                             | ConsumeFromWhere             | ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET     |        |        |
| consumeTimestamp                 | 回溯消费时间                                             | String                       | 默认回溯消耗时间为半小时前                    |        |        |
| traceDispatcher                  | 异步传输数据的接口                                       | TraceDispatcher              | null                                          |        |        |
| enableMsgTrace                   | 信息跟踪的标志                                           | boolean                      | false                                         |        |        |
| customizedTraceTopic             | 消息跟踪主题的名称                                       | String                       |                                               |        |        |

continue......
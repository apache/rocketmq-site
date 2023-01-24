# 服务端配置



## NameServer配置

| 名称               | 描述                                                         | 参数类型 | 默认值 | 有效值 | 重要性 |
| ------------------ | ------------------------------------------------------------ | -------- | ------ | ------ | ------ |
| rocketmqHome       | RocketMQ主目录，默认用户主目录                               | String   |        |        |        |
| namesrvAddr        | NameServer地址                                               | String   |        |        |        |
| kvConfigpath       | kv配置文件路径，包含顺序消息主题的配置信息                   | String   |        |        |        |
| configStorePath    | NameServer配置文件路径，建议使用-c指定NameServer配置文件路径 | String   |        |        |        |
| clusterTest        | 是否支持集群测试，默认为false                                | boolean  |        |        |        |
| orderMessageEnable | 是否支持顺序消息，默认为false                                | boolean  |        |        |        |
|                    |                                                              |          |        |        |        |



## 网络配置属性

| 名称                                   | 描述                                                         | 参数类型 | 默认值       | 有效值     | 重要性 |
| -------------------------------------- | ------------------------------------------------------------ | -------- | ------------ | ---------- | ------ |
| accessMessageInMemorymaxRatio          | 访问消息在内存中的比率                                       | int      | 40(%)        |            |        |
| adminBrokerThreadPoolNums              | 服务端处理控制台管理命令线程池线程数量                       | int      | 16           |            |        |
| autoCreateSubscriptionGroup            | 是否自动创建消费组                                           | boolean  | true         | true/false |        |
| autoCreateTopicEnable                  | 是否自动创建主题                                             | boolean  |              |            |        |
| bitMapLengthConsumeQueueExt            | ConsumeQueue扩展过滤bitmap大小                               | int      | 112          |            |        |
| brokerClusterName                      | Broker集群名称                                               | String   | TestCluster  |            |        |
| brokerFastFailureEnable                | 是否支持broker快速失败 如果为true表示会立即清除发送消息线程池，消息拉取线程池中排队任务 ，直接返回系统错误 | boolean  | true         |            |        |
| brokerId                               | brokerID 0表示主节点 大于0表示从节点                         | int      | 0            |            |        |
| brokerIP1                              | Broker服务地址                                               | String   |              |            |        |
| brokerIP2                              | BrokerHAIP地址，供slave同步消息的地址                        | String   |              |            |        |
| brokerName                             | Broker服务器名称morning服务器hostname                        | String   | broker-a     |            |        |
| brokerPermission                       | Broker权限 默认为6表示可读可写                               | int      | 6            |            |        |
| brokerRole                             | broker角色,分为 ASYNC_MASTER SYNC_MASTER, SLAVE              | enum     | ASYNC_MASTER |            |        |
| brokerTopicEnable                      | broker名称是否可以用做主体使用                               | boolean  |              |            |        |
| channelNotActiveInterval               |                                                              | long     |              |            |        |
| checkCRCOnRecover                      | 文件恢复时是否校验CRC                                        | boolean  |              |            |        |
| cleanFileForciblyEnable                | 是否支持强行删除过期文件                                     | boolean  |              |            |        |
| cleanResourceInterval                  | 清除过期文件线程调度频率                                     | int      |              |            |        |
| clientAsyncSemaphoreValue              | 客户端对invokeAsyncImpl方法的调用频率                        | int      |              |            |        |
| clientCallbackExecutorThreads          | 客户端执行回调线程数                                         | int      |              |            |        |
| clientChannelMaxIdleTimeSeconds        | 客户端每个channel最大等待时间                                | int      |              |            |        |
| clientCloseSocketIfTimeout             | 客户端关闭socket是否需要等待                                 | boolean  | false        |            |        |
| clientManagerThreadPoolQueueCapacity   | 客户端管理线程池任务队列初始大小                             | int      | 1000000      |            |        |
| clientManageThreadPoolNums             | 服务端处理客户端管理（心跳 注册 取消注册线程数量）           | int      | 32           |            |        |
| clientOnewaySemaphoreValue             | 客户端对invokeOnewayImpl方法的调用控制                       | int      |              |            |        |
| clientPooledByteBufAllocatorEnable     | 客户端池化内存是否开启                                       | boolean  |              |            |        |
| clientSocketRcvBufSize                 | 客户端socket接收缓冲区大小                                   | long     |              |            |        |
| clientSocketSndBufSize                 | 客户端socket发送缓冲区大小                                   | long     |              |            |        |
| clientWorkerThreads                    | worker线程数                                                 | int      |              |            |        |
| clusterTopicEnable                     | 集群名称是否可用在主题使用                                   | boolean  |              |            |        |
| commercialBaseCount                    |                                                              |          |              |            |        |
| commercialBigCount                     |                                                              |          |              |            |        |
| commercialEnable                       |                                                              |          |              |            |        |
| commercialTimerCount                   |                                                              |          |              |            |        |
| commitCommitLogLeastPages              | 一次提交至少需要脏页的数量,默认4页,针对 commitlog文件        | int      |              |            |        |
| commitCommitLogThoroughInterval        | Commitlog两次提交的最大间隔,如果超过该间隔,将忽略commitCommitLogLeastPages直接提交 | int      | 200          |            |        |
| commitIntervalCommitLog                | commitlog提交频率                                            | int      | 200          |            |        |
| compressedRegister                     | 是否开启消息压缩                                             | boolean  |              |            |        |
| connectTimeoutMillis                   | 链接超时时间                                                 | long     | 3000         |            |        |
| consumerFallbehindThreshold            | 消息消费堆积阈值默认16GB在disableConsumeifConsumeIfConsumerReadSlowly为true时生效 | long     | 17179869184  |            |        |
| consumerManagerThreadPoolQueueCapacity | 消费管理线程池任务队列大小                                   | int      | 1000000      |            |        |
| consumerManageThreadPoolNums           | 服务端处理消费管理 获取消费者列表 更新消费者进度查询消费进度等 | int      | 32           |            |        |
| debugLockEnable                        | 是否支持 PutMessage Lock锁打印信息                           | boolean  | false        |            |        |
| defaultQueryMaxNum                     | 查询消息默认返回条数,默认为32                                | int      | 32           |            |        |
| defaultTopicQueueNums                  | 主体在一个broker上创建队列数量                               | int      | 8            |            |        |
| deleteCommitLogFilesInterval           | 删除commitlog文件的时间间隔，删除一个文件后等一下再删除一个文件 | int      | 100          |            |        |
| deleteConsumeQueueFilesInterval        | 删除consumequeue文件时间间隔                                 | int      | 100          |            |        |
| deleteWhen                             | 磁盘文件空间充足情况下，默认每天什么时候执行删除过期文件，默认04表示凌晨4点 | string   | 04           |            |        |
| destroyMapedFileIntervalForcibly       | 销毁MappedFile被拒绝的最大存活时间，默认120s。清除过期文件线程在初次销毁mappedfile时，如果该文件被其他线程引用，引用次数大于0.则设置MappedFile的可用状态为false，并设置第一次删除时间，下一次清理任务到达时，如果系统时间大于初次删除时间加上本参数，则将ref次数一次减1000，直到引用次数小于0，则释放物理资源 | int      | 120000       |            |        |
| disableConsumeIfConsumerReadSlowly     | 如果消费组消息消费堆积是否禁用该消费组继续消费消息           | boolean  | false        |            |        |
| diskFallRecorded                       | 是否统计磁盘的使用情况,默认为true                            | boolean  | true         |            |        |
| diskMaxUsedSpaceRatio                  | commitlog目录所在分区的最大使用比例，如果commitlog目录所在的分区使用比例大于该值，则触发过期文件删除 | int      | 75           |            |        |
| duplicationEnable                      | 是否允许重复复制,默认为 false                                | boolean  | false        |            |        |
| enableCalcFilterBitMap                 | 是否开启比特位映射                                           | boolean  | false        |            |        |
| enableConsumeQueueExt                  | 是否启用ConsumeQueue扩展属性                                 | boolean  | false        |            |        |
| enablePropertyFilter                   | 是否支持根据属性过滤 如果使用基于标准的sql92模式过滤消息则改参数必须设置为true | boolean  | false        |            |        |
| endTransactionPoolQueueCapacity        | 处理提交和回滚消息线程池线程队列大小                         | int      |              |            |        |
| endTransactionThreadPoolNums           | 处理提交和回滚消息线程池                                     | int      | 24           |            |        |
| expectConsumerNumUseFilter             | 布隆过滤器参数                                               | int      | 32           |            |        |
| fastFailIfNoBufferInStorePool          | 从 transientStorepool中获取 ByteBuffer是否支持快速失败       | boolean  | false        |            |        |
| fetchNamesrvAddrByAddressServer        | 是否支持从服务器获取nameServer                               | boolean  | false        |            |        |
| fileReservedTime                       | 文件保留时间，默认72小时，表示非当前写文件最后一次更新时间加上filereservedtime小与当前时间，该文件将被清理 | String   | 120          |            |        |
| filterDataCleanTimeSpan                | 清除过滤数据的时间间隔                                       | long     | 86400000     |            |        |
| filterServerNums                       | broker服务器过滤服务器数量                                   | int      | 0            |            |        |
| filterSupportRetry                     | 消息过滤是否支持重试                                         | boolean  | false        |            |        |
| flushCommitLogLeastPages               | 一次刷盘至少需要脏页的数量，针对commitlog文件                | int      | 4            |            |        |
| flushCommitLogTimed                    | 表示await方法等待FlushIntervalCommitlog,如果为true表示使用Thread.sleep方法等待 | boolean  | false        |            |        |
| flushConsumeQueueLeastPages            | 一次刷盘至少需要脏页的数量,默认2页,针对 Consume文件          | int      | 2            |            |        |
| flushConsumeQueueThoroughInterval      | Consume两次刷盘的最大间隔,如果超过该间隔,将忽略              | int      | 60000        |            |        |
| flushConsumerOffsetHistoryInterval     | fushConsumeQueueLeastPages直接刷盘                           | int      | 60000        |            |        |
| flushConsumerOffsetInterval            | 持久化消息消费进度 consumerOffse.json文件的频率ms            | int      | 5000         |            |        |
| flushDelayOffsetInterval               | 延迟队列拉取进度刷盘间隔。默认10s                            | long     | 10000        |            |        |
| flushDiskType                          | 刷盘方式,默认为 ASYNC_FLUSH(异步刷盘),可选值SYNC_FLUSH(同步刷盘) | enum     | ASYNC_FLUSH  |            |        |
| flushIntervalCommitLog                 | commitlog刷盘频率                                            | int      | 500          |            |        |
| flushIntervalConsumeQueue              | consumuQueue文件刷盘频率                                     | int      | 1000         |            |        |
| flushLeastPagesWhenWarmMapedFile       | 用字节0填充整个文件的,每多少页刷盘一次。默认4096页,异步刷盘模式生效 | int      | 4096         |            |        |


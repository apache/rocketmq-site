# Server Configuration



## NameServer configuration

| Name               | Description                                                  | Parameter type | Default value | Effective value | Importance |
| ------------------ | ------------------------------------------------------------ | -------------- | ------------- | --------------- | ---------- |
| rocketmqHome       | RocketMQ main directory, default user main directory         | String         |               |                 |            |
| namesrvAddr        | NameServer address                                           | String         |               |                 |            |
| kvConfigpath       | KV configuration file path, including configuration information for ordered message topics | String         |               |                 |            |
| configStorePath    | NameServer configuration file path, it is recommended to use the -c option to specify the NameServer configuration file path | String         |               |                 |            |
| clusterTest        | Whether or not cluster testing is supported, default is false | boolean        |               |                 |            |
| orderMessageEnable | Whether or not ordered messages are supported, default is false | boolean        |               |                 |            |
|                    |                                                              |                |               |                 |            |



## Network configuration properties

| Name                                   | Description                                                  | Parameter type | Default value | Effective value | Importance |
| -------------------------------------- | ------------------------------------------------------------ | -------------- | ------------- | --------------- | ---------- |
| accessMessageInMemorymaxRatio          | The ratio of accessing messages in memory                    | int            | 40(%)         |                 |            |
| adminBrokerThreadPoolNums              | The number of threads in the server's processing control console management command thread pool | int            | 16            |                 |            |
| autoCreateSubscriptionGroup            | Whether or not to automatically create consumer groups       | boolean        | true          | true/false      |            |
| autoCreateTopicEnable                  | Whether or not to automatically create topics                | boolean        |               |                 |            |
| bitMapLengthConsumeQueueExt            | The size of the extended filter bitmap for ConsumeQueue      | int            | 112           |                 |            |
| brokerClusterName                      | Broker cluster name                                          | String         | TestCluster   |                 |            |
| brokerFastFailureEnable                | Whether or not to support broker fast failure. If true, it means that the sending message thread pool and message pulling thread pool will immediately clear the queued tasks and return a system error | boolean        | true          |                 |            |
| brokerId                               | BrokerID, 0 represents the main node, greater than 0 represents the slave node | int            | 0             |                 |            |
| brokerIP1                              | Broker service address                                       | String         |               |                 |            |
| brokerIP2                              | Broker HAIP address, used for slave message synchronization  | String         |               |                 |            |
| brokerName                             | Broker server name, morning server hostname                  | String         | broker-a      |                 |            |
| brokerPermission                       | Broker permissions, default is 6, meaning read-write         | int            | 6             |                 |            |
| brokerRole                             | Broker role, divided into ASYNC_MASTER, SYNC_MASTER, SLAVE   | enum           | ASYNC_MASTER  |                 |            |
| brokerTopicEnable                      | Whether or not broker name can be used as a subject          | boolean        |               |                 |            |
| channelNotActiveInterval               |                                                              | long           |               |                 |            |
| checkCRCOnRecover                      | Whether or not to verify CRC during file recovery            | boolean        |               |                 |            |
| cleanFileForciblyEnable                | Whether or not to support forced deletion of expired files   | boolean        |               |                 |            |
| cleanResourceInterval                  | Clear expired file thread scheduling frequency               | int            |               |                 |            |
| clientAsyncSemaphoreValue              | The frequency of client calls to invokeAsyncImpl method      | int            |               |                 |            |
| clientCallbackExecutorThreads          | The number of client callback threads                        | int            |               |                 |            |
| clientChannelMaxIdleTimeSeconds        | The maximum waiting time for each channel of the client      | int            |               |                 |            |
| clientCloseSocketIfTimeout             | Whether or not the client needs to wait when closing the socket | boolean        | false         |                 |            |
| clientManagerThreadPoolQueueCapacity   | The initial size of the client management thread pool task queue | int            | 1000000       |                 |            |
| clientManageThreadPoolNums             | The number of threads for server to process client management (heartbeat, registration, unregistration) | int            | 32            |                 |            |
| clientOnewaySemaphoreValue             | The control of client calls to invokeOnewayImpl method.      | int            |               |                 |            |
| clientPooledByteBufAllocatorEnable     | Whether client pooling memory enabled                        | boolean        |               |                 |            |
| clientSocketRcvBufSize                 | Size of client socket receive buffer                         | long           |               |                 |            |
| clientSocketSndBufSize                 | Size of client socket send buffer                            | long           |               |                 |            |
| clientWorkerThreads                    | Number of worker threads                                     | int            |               |                 |            |
| clusterTopicEnable                     | Whether cluster name is available for topic use              | boolean        |               |                 |            |
| commercialBaseCount                    |                                                              |                |               |                 |            |
| commercialBigCount                     |                                                              |                |               |                 |            |
| commercialEnable                       |                                                              |                |               |                 |            |
| commercialTimerCount                   |                                                              |                |               |                 |            |
| commitCommitLogLeastPages              | Minimum number of dirty pages required for one commit, default 4 pages, for commitlog file | int            |               |                 |            |
| commitCommitLogThoroughInterval        | Maximum interval between two commits of Commitlog, if exceeded, commitCommitLogLeastPages will be ignored and submitted directly | int            | 200           |                 |            |
| commitIntervalCommitLog                | Commitlog commit frequency                                   | int            | 200           |                 |            |
| compressedRegister                     | Whether message compression is enabled                       | boolean        |               |                 |            |
| connectTimeoutMillis                   | Connection timeout time                                      | long           | 3000          |                 |            |
| consumerFallbehindThreshold            | Message consumption piling threshold, default 16GB, effective when disableConsumeifConsumeIfConsumerReadSlowly is true | long           | 17179869184   |                 |            |
| consumerManagerThreadPoolQueueCapacity | Size of consumer management thread pool task queue           | int            | 1000000       |                 |            |
| consumerManageThreadPoolNums           | Server processing consumer management, getting consumer list, updating consumer progress, querying consumption progress, etc. | int            | 32            |                 |            |
| debugLockEnable                        | Whether PutMessage Lock lock print information is supported  | boolean        | false         |                 |            |
| defaultQueryMaxNum                     | Default number of messages returned for query, default 32    | int            | 32            |                 |            |
| defaultTopicQueueNums                  | Number of queues created on a broker for a subject           | int            | 8             |                 |            |
| deleteCommitLogFilesInterval           | Time interval for deleting commitlog files, delete one file and then wait for another file | int            | 100           |                 |            |
| deleteConsumeQueueFilesInterval        | Time interval for deleting consumequeue files                | int            | 100           |                 |            |
| deleteWhen                             | Under the condition of sufficient disk file space, what time of day to perform deleting expired files by default, 04 means 4am | string         | 04            |                 |            |
| destroyMapedFileIntervalForcibly       | Maximum survival time of MappedFile that is rejected, default 120s. When the clear expired file thread first destroys the mappedfile, if the file is referenced by other threads, the reference count is greater than 0, the availability status of the MappedFile is set to false, and the first delete time is set. The next clear task arrives, if the system time is greater than the initial delete time plus this parameter, the ref count is reduced by 1000 once, until the reference count is less than 0, then release the physical resource | int            | 120000        |                 |            |
| disableConsumeIfConsumerReadSlowly     | Whether to disable the consumer group from continuing to consume messages if the consumer group message consumption is piled up | boolean        | false         |                 |            |
| diskFallRecorded                       | Whether to count the disk usage, default is true             | boolean        | true          |                 |            |
| diskMaxUsedSpaceRatio                  | Maximum usage ratio of the partition where the commitlog directory is located, if the usage ratio of the partition where the commitlog directory is located is greater than this value, the expired file deletion is triggered | int            | 75            |                 |            |
| duplicationEnable                      | Whether to allow duplicate replication, default is false     | boolean        | false         |                 |            |
| enableCalcFilterBitMap                 | Whether to enable bit mapping.                               | boolean        | false         |                 |            |
| enableConsumeQueueExt                  | Whether to enable ConsumeQueue extended attributes           | boolean        | false         |                 |            |
| enablePropertyFilter                   | Whether filtering messages based on attributes is supported. If filtering messages based on standard SQL92 mode is used, this parameter must be set to true. | boolean        | false         |                 |            |
| endTransactionPoolQueueCapacity        | Size of thread queue for processing commit and rollback messages thread pool | int            |               |                 |            |
| endTransactionThreadPoolNums           | Processing commit and rollback message thread pool           | int            | 24            |                 |            |
| expectConsumerNumUseFilter             | Bloom filter parameters                                      | int            | 32            |                 |            |
| fastFailIfNoBufferInStorePool          | Whether fast failure is supported when getting ByteBuffer from transientStorepool | boolean        | false         |                 |            |
| fetchNamesrvAddrByAddressServer        | Whether to support getting NameServer from server            | boolean        | false         |                 |            |
| fileReservedTime                       | File retention time, default 72 hours, meaning that if the last update time of a non-current write file plus filereservedtime is less than the current time, the file will be cleared | String         | 120           |                 |            |
| filterDataCleanTimeSpan                | Time interval for clearing filter data                       | long           | 86400000      |                 |            |
| filterServerNums                       | Number of filter servers for broker server                   | int            | 0             |                 |            |
| filterSupportRetry                     | Whether message filtering supports retries                   | boolean        | false         |                 |            |
| flushCommitLogLeastPages               | Minimum number of dirty pages required for one flush, for commitlog file | int            | 4             |                 |            |
| flushCommitLogTimed                    | Indicates whether to wait for FlushIntervalCommitlog using the Thread.sleep method if await is true | boolean        | false         |                 |            |
| flushConsumeQueueLeastPages            | Minimum number of dirty pages required for one flush, default 2 pages, for Consume file | int            | 2             |                 |            |
| flushConsumeQueueThoroughInterval      | Maximum interval between two flushs of Consume, if exceeded, will be ignored. | int            | 60000         |                 |            |
| flushConsumerOffsetHistoryInterval     | ushConsumeQueueLeastPages flush directly                     | int            | 60000         |                 |            |
| flushConsumerOffsetInterval            | Frequency of persisting message consumption progress in consumerOffse.json file (ms) | int            | 5000          |                 |            |
| flushDelayOffsetInterval               | Interval for flushing delay queue pull progress, default 10s | long           | 10000         |                 |            |
| flushDiskType                          | Flush mode, default is ASYNC_FLUSH (asynchronous flush), optional value SYNC_FLUSH (synchronous flush) | enum           | ASYNC_FLUSH   |                 |            |
| flushIntervalCommitLog                 | Commitlog flush frequency                                    | int            | 500           |                 |            |
| flushIntervalConsumeQueue              | ConsumuQueue file flush frequency                            | int            | 1000          |                 |            |
| flushLeastPagesWhenWarmMapedFile       | How often to fill the entire file with bytes 0, every x pages. Default 4096 pages, effective for asynchronous flush mode. | int            | 4096          |                 |            |


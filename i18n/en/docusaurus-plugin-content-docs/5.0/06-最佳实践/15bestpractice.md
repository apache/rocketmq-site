# 基本最佳实践

## 生产者

###  发送消息注意事项

#### Tag的使用

一个应用尽可能用一个Topic，而消息子类型则可以用tags来标识。tags可以由应用自由设置，只有生产者在发送消息设置了tags，消费方在订阅消息时才可以利用tags通过broker做消息过滤，5.x SDK 可以调用messageBuilder.setTag("messageTag")，历史版本可以调用 message.setTags("messageTag")。  

#### Keys的使用

每个消息在业务层面一般建议映射到业务的唯一标识并设置到keys字段，方便将来定位消息丢失问题。服务器会为每个消息创建索引（哈希索引），应用可以通过topic、key来查询这条消息内容，以及消息被谁消费。由于是哈希索引，请务必保证key尽可能唯一，这样可以避免潜在的哈希冲突。常见的设置策略使用订单Id、用户Id、请求Id等比较离散的唯一标识来处理。

#### 日志的打印

消息发送成功或者失败要打印消息日志，用于业务排查问题。Send消息方法只要不抛异常，就代表发送成功。
### 消息发送失败处理方式

Producer的send方法本身支持内部重试，5.x SDK的重试逻辑参考[发送重试策略](../04-功能行为/05sendretrypolicy.md)：

以上策略也是在一定程度上保证了消息可以发送成功。如果业务要求消息发送不能丢，仍然需要对可能出现的异常做兜底，比如调用send同步方法发送失败时，则尝试将消息存储到db，然后由后台线程定时重试，确保消息一定到达Broker。

上述DB重试方式为什么没有集成到MQ客户端内部做，而是要求应用自己去完成，主要基于以下几点考虑：首先，MQ的客户端设计为无状态模式，方便任意的水平扩展，且对机器资源的消耗仅仅是cpu、内存、网络。其次，如果MQ客户端内部集成一个KV存储模块，那么数据只有同步落盘才能较可靠，而同步落盘本身性能开销较大，所以通常会采用异步落盘，又由于应用关闭过程不受MQ运维人员控制，可能经常会发生 kill -9 这样暴力方式关闭，造成数据没有及时落盘而丢失。第三，Producer所在机器的可靠性较低，一般为虚拟机，不适合存储重要数据。综上，建议重试过程交由应用来控制。

## 消费者

### 消费过程幂等

RocketMQ 无法避免消息重复（Exactly-Once），所以如果业务对消费重复非常敏感，务必要在业务层面进行去重处理。可以借助关系数据库进行去重。首先需要确定消息的唯一键，可以是msgId，也可以是消息内容中的唯一标识字段，例如订单Id等。在消费之前判断唯一键是否在关系数据库中存在。如果不存在则插入，并消费，否则跳过。（实际过程要考虑原子性问题，判断是否存在可以尝试插入，如果报主键冲突，则插入失败，直接跳过）

msgId一定是全局唯一标识符，但是实际使用中，可能会存在相同的消息有两个不同msgId的情况（消费者主动重发、因客户端重投机制导致的重复等），这种情况就需要使业务字段进行重复消费。

### 消费速度慢的处理方式

### 提高消费并行度

绝大部分消息消费行为都属于 IO 密集型，即可能是操作数据库，或者调用 RPC，这类消费行为的消费速度在于后端数据库或者外系统的吞吐量，通过增加消费并行度，可以提高总的消费吞吐量，但是并行度增加到一定程度，反而会下降。所以，应用必须要设置合理的并行度。 如下有几种修改消费并行度的方法：

- 同一个 ConsumerGroup 下，通过增加 Consumer 实例数量来提高并行度。可以通过加机器，或者在已有机器启动多个进程的方式。
- 提高单个 Consumer 的消费并行线程，5.x PushConsumer SDK 可以通过PushConsumerBuilder.setConsumptionThreadCount() 设置线程数，SimpleConsumer可以由业务线程自由增加并发，底层线程安全；历史版本SDK PushConsumer可以通过修改参数 consumeThreadMin、consumeThreadMax实现。

### 批量方式消费

某些业务流程如果支持批量方式消费，则可以很大程度上提高消费吞吐量，例如订单扣款类应用，一次处理一个订单耗时 1 s，一次处理 10 个订单可能也只耗时 2 s，这样即可大幅度提高消费的吞吐量。建议使用5.x SDK的SimpleConsumer，每次接口调用设置批次大小，一次性拉取消费多条消息。

### 重置位点跳过非重要消息

发生消息堆积时，如果消费速度一直追不上发送速度，如果业务对数据要求不高的话，可以选择丢弃不重要的消息。建议使用重置位点功能直接调整消费位点到指定时刻或者指定位置。

#### 优化每条消息消费过程     

举例如下，某条消息的消费过程如下：

- 根据消息从 DB 查询【数据 1】
- 根据消息从 DB 查询【数据 2】
- 复杂的业务计算
- 向 DB 插入【数据 3】
- 向 DB 插入【数据 4】

这条消息的消费过程中有4次与 DB的 交互，如果按照每次 5ms 计算，那么总共耗时 20ms，假设业务计算耗时 5ms，那么总过耗时 25ms，所以如果能把 4 次 DB 交互优化为 2 次，那么总耗时就可以优化到 15ms，即总体性能提高了 40%。所以应用如果对时延敏感的话，可以把DB部署在SSD硬盘，相比于SCSI磁盘，前者的RT会小很多。

### 消费打印日志

如果消息量较少，建议在消费入口方法打印消息，消费耗时等，方便后续排查问题。

```java
   new MessageListener() {
        @Override
        public ConsumeResult consume(MessageView messageView) {
            LOGGER.info("Consume message={}", messageView);
            //Do your consume process
            return ConsumeResult.SUCCESS;
            }
    }
```

如果能打印每条消息消费耗时，那么在排查消费慢等线上问题时，会更方便。但如果线上环境TPS很高，不建议开启，避免日志太多影响性能。

## Broker

###  Broker 角色
  Broker 角色分为 ASYNC_MASTER（异步主机）、SYNC_MASTER（同步主机）以及SLAVE（从机）。如果对消息的可靠性要求比较严格，可以采用 SYNC_MASTER加SLAVE的部署方式。如果对消息可靠性要求不高，可以采用ASYNC_MASTER加SLAVE的部署方式。如果只是测试方便，则可以选择仅ASYNC_MASTER或仅SYNC_MASTER的部署方式。
### FlushDiskType
 SYNC_FLUSH（同步刷新）相比于ASYNC_FLUSH（异步处理）会损失很多性能，但是也更可靠，所以需要根据实际的业务场景做好权衡。
### Broker 配置

| 参数名                           | 默认值                        | 说明                                                         |
| -------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| listenPort                    | 10911              | 接受客户端连接的监听端口 |
| namesrvAddr       | null                         | nameServer 地址     |
| brokerIP1 | 网卡的 InetAddress                         | 当前 broker 监听的 IP  |
| brokerIP2 | 跟 brokerIP1 一样                         | 存在主从 broker 时，如果在 broker 主节点上配置了 brokerIP2 属性，broker 从节点会连接主节点配置的 brokerIP2 进行同步  |
| brokerName        | null                         | broker 的名称                           |
| brokerClusterName                     | DefaultCluster                  | 本 broker 所属的 Cluser 名称           |
| brokerId             | 0                              | broker id, 0 表示 master, 其他的正整数表示 slave                                                 |
| storePathCommitLog                      | $HOME/store/commitlog/                              | 存储 commit log 的路径                                                |
| storePathConsumerQueue                   | $HOME/store/consumequeue/                              | 存储 consume queue 的路径                                              |
| mapedFileSizeCommitLog     | 1024 * 1024 * 1024(1G) | commit log 的映射文件大小                                       |​ 
| deleteWhen     | 04 | 在每天的什么时间删除已经超过文件保留时间的 commit log                                        |​ 
| fileReserverdTime     | 72 | 以小时计算的文件保留时间                                        |​ 
| brokerRole     | ASYNC_MASTER | SYNC_MASTER/ASYNC_MASTER/SLAVE                                        |​ 
| flushDiskType     | ASYNC_FLUSH | SYNC_FLUSH/ASYNC_FLUSH SYNC_FLUSH 模式下的 broker 保证在收到确认生产者之前将消息刷盘。ASYNC_FLUSH 模式下的 broker 则利用刷盘一组消息的模式，可以取得更好的性能。                                       |​



# Producer最佳实践

一些写给使用者的实用提示。



## 发送状态 

在发送消息的时候，你会获得一个包含发送状态 `SendStatus` 的发送结果 `SendResult` 。首先，我们假设消息的`isWaitStoreMsgOK` 被配置为：`isWaitStoreMsgOK = true`（默认配置）。因为如果不这样配置的话，那么我们会在发送没有异常的情况下始终得到发送成功 `SEND_OK` 的发送状态。下边是关于每个状态的描述：



### `FLUSH_DISK_TIMEOUT`

如果 Broker 设置 `MessageStoreConfig` 的属性 `FlushDiskType` 为： `FlushDiskType = SYNC_FLUSH` （默认配置是 `ASYNC_FLUSH` ），并且Broker没有在 `syncFlushTimeout` 参数配置的时间内（默认是5秒钟）完成刷盘的操作，那么消息发送将会获得这个返回状态。



### `FLUSH_SLAVE_TIMEOUT`

如果 Broker 的角色是 `SYNC_MASTER` （默认是 `ASYNC_MASTER` ），并且从 Broker 没有在 `syncFlushTimeout` 参数配置的时间内（默认是5秒钟）完成同步，那么消息发送将会获得这个返回状态。



### `SLAVE_NOT_AVAILABLE`

如果 Broker 的角色是 `SYNC_MASTER` （默认是 `ASYNC_MASTER` ），但是从 Broker 没有被配置，那么消息发送将会获得这个返回状态。



### `SEND_OK`

`SEND_OK` 并不意味着就一定是可靠的。要确保消息不丢失，你还应启用 `SYNC_MASTER` 或者 `SYNC_FLUSH` 选项。



### 消息重复或消息丢失

如果你发送消息后返回的结果是 `FLUSH_DISK_TIMEOUT`,  `FLUSH_SLAVE_TIMEOUT`，并且 Broker 这时正好挂掉了，那么你会发现刚发送的消息丢失了。这种情况下你会有两个选择：第一种是无为而治，但是这样做会导致消息的丢失；第二种是重发一次，但是这可能会引起消息的重复。通常情况下，我们建议重发一次，并且找到一个方法来处理因为重复发送而导致的重复消费问题。当然如果你觉得消息丢失也不是什么大问题的话也可以不这么做。但是请记住当你得到的状态是`SLAVE_NOT_AVAILABLE` 的时候，重复发送就没有作用了。如果确实收到了这种发送结果的话，应该将上下文记录下来，并向集群管理员报告。



## 超时

客户端发送请求到 Broker，然后等待响应，如果经过最大等待时间后仍然没等到响应，客户端会抛出一个远程超时的异常`RemotingTimeoutException`。默认的等待时间是3秒。如果要设置超时时间参数，你可以使用`send（msg, timeout)` 方法来代替 `send(msg)` 方法。请注意，我们并不建议你设置太小的超时时间，因为 Broker 还需要一些时间去进行刷盘或者主从同步的操作。除此之外，如果超时时间的值超过 `syncFlushTimeout` 很多，那么该值可能最终影响不大，因为 Broker 可能在超时之前就已经返回 `FLUSH_SLAVE_TIMEOUT` 或 `FLUSH_DISK_TIMEOUT` 的状态了。



## 消息的大小

我们建议消息的大小不要超过512k。



## 异步发送

默认的发送函数 `send(msg)` 会保持阻塞直到响应信息的返回。所以如果你关注性能，那么我们建议你使用 `seng(msg,callback)` 这个方法，它会异步地返回响应信息。



## 生产者组

通常来讲，生产者组是没有任何影响的。但是当你需要处理一些复杂事务的时候，你就需要对它关注一下了。默认情况下，你只能在同一个 JVM 中创建一个具有相同生产者组的生产者，这样的方式其实就能够满足需求了。



## 线程安全

生产者是线程安全的，你可以在业务解决方案中尽情的使用它。



## 性能

如果你要在 JVM 中使用超过一个生产者来处理大数据的话，我们建议：
- 用少量的生产者异步发送（3~5个就足够了）
- 通过调用`setInstanceName`为每个生产者设置实例名称

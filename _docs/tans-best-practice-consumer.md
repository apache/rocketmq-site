 # 消费者最佳实践

一些有用的用户提示。


## 消费者群体和订阅

首先应当注意，不同的消费者群体可以独立地使用同一个队列集合，并且每个消费者群体都有自己的消费偏移量。请确保同一组内的每个消费者订阅同一个队列集合。



## 消息监听

### 有序

消费者将锁定每个消息队列以确保它被按顺序依次使用，这种方式会导致性能下降，但当你关心消息顺序时则会很有用。我们建议返回ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT来替换抛出异常。

### 并发

顾名思义，Consumer将并行使用这些消息。我们建议使用并发以获得良好的性能。我们建议返回ConsumeConcurrentlyStatus.RECONSUME_LATER来替换抛出异常。

### 消费状态

【reconsume】--->【consume】

对于MessageListenerConcurrently类，你可以返回RECONSUME_LATER来告诉消费者你现在不能使用它并希望稍后【消费】它。然后，你可以继续消费其他消息。对于MessageListenerOrderly类而言，因为关注顺序，所以不能跳过消息，但是你可以通过返回SUSPEND_CURRENT_QUEUE_A_MOMENT来告诉消费者等待片刻。

### 阻塞

我们不建议阻塞监听器，因为它会阻塞线程池，最终可能会导致消费进程阻塞。



## 线程数

消费者在内部使用ThreadPoolExecutor类处理消费，因此你可以通过setConsumeThreadMin方法或setConsumeThreadMax方法进行更改。



## ConsumeFromWhere

新的消费者群体被建立时，这个消费者群体是否需要消费已经存在于Broker中的历史消息，这是由ConsumeFromWhere决定的。CONSUME_FROM_LAST_OFFSET将忽略历史消息，并消费之后生成的任何内容。CONSUME_FROM_FIRST_OFFSET将使用Broker中存在的每条消息，你还可以使用CONSUME_FROM_TIMESTAMP来使用在指定时间戳之后生成的消息。



## 重复

许多情况都可能导致重复，例如：

- 生产者重新发送消息（例如，在FLUSH_SLAVE_TIMEOUT的情况下）
- 消费者在偏移量未及时更新到Broker时关闭系统。

因此，如果你的应用程序无法容忍重复，你可能需要做一些额外工作来处理这个问题，例如检查数据库的主键。



 **更新:** 2016年12月25日

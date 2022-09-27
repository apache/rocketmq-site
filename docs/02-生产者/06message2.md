# 顺序消息发送

## 顺序消息介绍
顺序消息是一种对消息发送和消费顺序有严格要求的消息。

对于一个指定的Topic，消息严格按照先进先出（FIFO）的原则进行消息发布和消费，即先发布的消息先消费，后发布的消息后消费。在 Apache RocketMQ 中支持分区顺序消息，如下图所示。我们可以按照某一个标准对消息进行分区（比如图中的ShardingKey），同一个ShardingKey的消息会被分配到同一个队列中，并按照顺序被消费。

需要注意的是 RocketMQ 消息的顺序性分为两部分，生产顺序性和消费顺序性。只有同时满足了生产顺序性和消费顺序性才能达到上述的FIFO效果。

**生产顺序性：** RocketMQ 通过生产者和服务端的协议保障单个生产者串行地发送消息，并按序存储和持久化。如需保证消息生产的顺序性，则必须满足以下条件：
- 单一生产者： 消息生产的顺序性仅支持单一生产者，不同生产者分布在不同的系统，即使设置相同的分区键，不同生产者之间产生的消息也无法判定其先后顺序。
- 串行发送：生产者客户端支持多线程安全访问，但如果生产者使用多线程并行发送，则不同线程间产生的消息将无法判定其先后顺序。

满足以上条件的生产者，将顺序消息发送至服务端后，会保证设置了同一分区键的消息，按照发送顺序存储在同一队列中。服务端顺序存储逻辑如下：

![顺序消息发送](../picture/顺序消息发送.png)

顺序消息的应用场景也非常广泛，在有序事件处理、撮合交易、数据实时增量同步等场景下，异构系统间需要维持强一致的状态同步，上游的事件变更需要按照顺序传递到下游进行处理。

例如创建订单的场景，需要保证同一个订单的生成、付款和发货，这三个操作被顺序执行。如果是普通消息，订单A的消息可能会被轮询发送到不同的队列中，不同队列的消息将无法保持顺序，而顺序消息发送时将ShardingKey相同（同一订单号）的消息序路由到一个逻辑队列中。
![顺序消息场景一](../picture/顺序消息示例一.png)

## 顺序消息示例代码

顺序消息的代码如下所示：

```java
public class Producer {
    public static void main(String[] args) throws UnsupportedEncodingException {
        try {
            DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
            producer.start();

            String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
            for (int i = 0; i < 100; i++) {
                int orderId = i % 10;
                Message msg =
                    new Message("TopicTest", tags[i % tags.length], "KEY" + i,
                        ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
                SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
                    @Override
                    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
                        Integer id = (Integer) arg;
                        int index = id % mqs.size();
                        return mqs.get(index);
                    }
                }, orderId);

                System.out.printf("%s%n", sendResult);
            }

            producer.shutdown();
        } catch (MQClientException | RemotingException | MQBrokerException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

这里的区别主要是调用了```SendResult send(Message msg, MessageQueueSelector selector, Object arg)```方法，MessageQueueSelector 是队列选择器，arg 是一个 Java Object 对象，可以传入作为消息发送分区的分类标准。

:::tip
MessageQueueSelector的接口如下：

```java
public interface MessageQueueSelector {
    MessageQueue select(final List<MessageQueue> mqs, final Message msg, final Object arg);
}
```

其中 mqs 是可以发送的队列，msg是消息，arg是上述send接口中传入的Object对象，返回的是该消息需要发送到的队列。上述例子里，是以orderId作为分区分类标准，对所有队列个数取余，来对将相同orderId的消息发送到同一个队列中。

生产环境中建议选择最细粒度的分区键进行拆分，例如，将订单ID、用户ID作为分区键关键字，可实现同一终端用户的消息按照顺序处理，不同用户的消息无需保证顺序。
:::


## 顺序消息的一致性

如果一个Broker掉线，那么此时队列总数是否会发化？

如果发生变化，那么同一个 ShardingKey 的消息就会发送到不同的队列上，造成乱序。如果不发生变化，那消息将会发送到掉线Broker的队列上，必然是失败的。因此 Apache RocketMQ 提供了两种模式，如果要保证严格顺序而不是可用性，创建 Topic 是要指定 ```-o``` 参数（--order）为true，表示顺序消息:

```shell
$ sh bin/mqadmin updateTopic -c DefaultCluster -t TopicTest -o true -n 127.0.0.1:9876
create topic to 127.0.0.1:10911 success.
TopicConfig [topicName=TopicTest, readQueueNums=8, writeQueueNums=8, perm=RW-, topicFilterType=SINGLE_TAG, topicSysFlag=0, order=true, attributes=null]
```

其次要保证NameServer中的配置 ```orderMessageEnable``` 和 ```returnOrderTopicConfigToBroker``` 必须是 true。如果上述任意一个条件不满足，则是保证可用性而不是严格顺序。

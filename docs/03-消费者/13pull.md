# Pull消费

在RocketMQ中有两种Pull方式，一种是比较原始`Pull Consumer`，它不提供相关的订阅方法，需要调用pull方法时指定队列进行拉取，并需要自己更新位点。另一种是`Lite Pull Consumer`，它提供了Subscribe和Assign两种方式，使用起来更加方便。

## Pull Consumer

Pull Consumer示例如下

```javascript
public class PullConsumerTest {
  public static void main(String[] args) throws MQClientException {
    DefaultMQPullConsumer consumer = new DefaultMQPullConsumer("please_rename_unique_group_name_5");
    consumer.setNamesrvAddr("127.0.0.1:9876");
    consumer.start();
    try {
      MessageQueue mq = new MessageQueue();
      mq.setQueueId(0);
      mq.setTopic("TopicTest");
      mq.setBrokerName("jinrongtong-MacBook-Pro.local");
      long offset = 26;
      PullResult pullResult = consumer.pull(mq, "*", offset, 32);
      if (pullResult.getPullStatus().equals(PullStatus.FOUND)) {
        System.out.printf("%s%n", pullResult.getMsgFoundList());
        consumer.updateConsumeOffset(mq, pullResult.getNextBeginOffset());
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    consumer.shutdown();
  }
}
```

首先需要初始化`DefaultMQPullConsumer`并启动，然后构造需要拉取的队列`MessageQueue`，除了构造外也可以如下所示调用`fetchSubscribeMessageQueues`方法获取某个Topic的所有队列，然后挑选队列进行拉取。

```java
Set<MessageQueue> queueSet =  consumer.fetchSubscribeMessageQueues("TopicTest");
```

找到或者构造完队列之后，调用pull方法就可以进行拉取，需要传入拉取的队列，过滤表达式，拉取的位点，最大拉取消息条数等参数。拉取完成后会返回拉取结果`PullResult`，PullResult中的PullStatus表示结果状态，如下所示

```javascript
public enum PullStatus {
    /**
     * Founded
     */
    FOUND,
    /**
     * No new message can be pull
     */
    NO_NEW_MSG,
    /**
     * Filtering results can not match
     */
    NO_MATCHED_MSG,
    /**
     * Illegal offset,may be too big or too small
     */
    OFFSET_ILLEGAL
}
```

FOUND表示拉取到消息，NO_NEW_MSG表示没有发现新消息，NO_MATCHED_MSG表示没有匹配的消息，OFFSET_ILLEGAL表示传入的拉取位点是非法的，有可能偏大或偏小。如果拉取状态是FOUND，我们可以通过`pullResult`的`getMsgFoundList`方法获取拉取到的消息列表。最后，如果消费完成，通过`updateConsumeOffset`方法更新消费位点。

## Lite Pull Consumer

Lite Pull Consumer是RocketMQ 4.6.0推出的Pull Consumer，相比于原始的Pull Consumer更加简单易用，它提供了Subscribe和Assign两种模式，Subscribe模式示例如下

```javascript
public class LitePullConsumerSubscribe {
    public static volatile boolean running = true;
    public static void main(String[] args) throws Exception {
        DefaultLitePullConsumer litePullConsumer = new DefaultLitePullConsumer("lite_pull_consumer_test");
        litePullConsumer.subscribe("TopicTest", "*");
        litePullConsumer.setPullBatchSize(20);
        litePullConsumer.start();
        try {
            while (running) {
                List<MessageExt> messageExts = litePullConsumer.poll();
                System.out.printf("%s%n", messageExts);
            }
        } finally {
            litePullConsumer.shutdown();
        }
    }
}
```

首先还是初始化`DefaultLitePullConsumer`并设置`ConsumerGroupName`，调用subscribe方法订阅topic并启动。与Push Consumer不同的是，`LitePullConsumer`拉取消息调用的是轮询poll接口，如果能拉取到消息则返回对应的消息列表，否则返回null。通过`setPullBatchSize`可以设置每一次拉取的最大消息数量，此外如果不额外设置，`LitePullConsumer`默认是自动提交位点。在subscribe模式下，同一个消费组下的多个`LitePullConsumer`会负载均衡消费，与PushConsumer一致。

如下是Assign模式的示例
```javascript
public class LitePullConsumerAssign {
    public static volatile boolean running = true;
    public static void main(String[] args) throws Exception {
        DefaultLitePullConsumer litePullConsumer = new DefaultLitePullConsumer("please_rename_unique_group_name");
        litePullConsumer.setAutoCommit(false);
        litePullConsumer.start();
        Collection<MessageQueue> mqSet = litePullConsumer.fetchMessageQueues("TopicTest");
        List<MessageQueue> list = new ArrayList<>(mqSet);
        List<MessageQueue> assignList = new ArrayList<>();
        for (int i = 0; i < list.size() / 2; i++) {
            assignList.add(list.get(i));
        }
        litePullConsumer.assign(assignList);
        litePullConsumer.seek(assignList.get(0), 10);
        try {
            while (running) {
                List<MessageExt> messageExts = litePullConsumer.poll();
                System.out.printf("%s %n", messageExts);
                litePullConsumer.commitSync();
            }
        } finally {
            litePullConsumer.shutdown();
        }
    }
}
```

Assign模式一开始仍然是初始化`DefaultLitePullConsumer`，这里我们采用手动提交位点的方式，因此设置AutoCommit为false，然后启动consumer。与Subscribe模式不同的是，Assign模式下没有自动的负载均衡机制，需要用户自行指定需要拉取的队列，因此在例子中，先用fetchMessageQueues获取了Topic下的队列，再取前面的一半队列进行拉取，示例中还调用了seek方法，将第一个队列拉取的位点设置从10开始。紧接着进入循环不停地调用poll方法拉取消息，拉取到消息后调用commitSync方法手动提交位点。
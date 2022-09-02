# Pull Consume

There are two kinds of Pull methods in RocketMQ. One is the more primitive `Pull Consumer`, which does not provide related subscription methods, but specifies the queue to pull when calling the pull method, and needs to update the offset itself. The other is the `Lite Pull Consumer`, which provides two ways to Subscribe and Assign, and is more convenient to use.

## Pull Consumer

The Pull Consumer example is as follows:

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

First, it needs to be initialized `DefaultMQPullConsumer` and started, then it constructs the queue to be pulled `MessageQueue`, besides constructing it, it can also call the `fetchSubscribeMessageQueues` method as shown below to get all the queues of a certain Topic and then pick the queue to be pulled.

```java
Set<MessageQueue> queueSet =  consumer.fetchSubscribeMessageQueues("TopicTest");
```

After finding or constructing the queue, call the pull method to perform the pull, and pass in the parameters such as the queue to be pulled, the filter expression, the loci to be pulled, and the maximum number of messages to be pulled. The `PullResult` will be returned after the pull is completed, and the PullStatus in the PullResult indicates the result status, as shown below:

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

FOUND means the message was pulled, NO_NEW_MSG means no new message was found, NO_MATCHED_MSG means no matching message, OFFSET_ILLEGAL means the incoming pull loci are illegal and may be large or small. If the pull status is FOUND, we can get the list of pulled messages via the `getMsgFoundList` method of `PullResult`. Finally, if the consumption is complete, the consumption loci are updated via the `updateConsumeOffset` method.

## Lite Pull Consumer

Lite Pull Consumer is a Pull Consumer introduced in RocketMQ 4.6.0, which is simpler to use than the original Pull Consumer and provides two modes, Subscribe and Assign. The Subscribe pattern example is as follows:

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

First of all, initialize `DefaultLitePullConsumer` and set `ConsumerGroupName`, call subscribe method to subscribe to the topic and start it. Unlike Push Consumer, `LitePullConsumer` pulls messages by polling the poll interface and returns the corresponding message list if it can pull the message, otherwise it returns null. The maximum number of messages per pull can be set with `setPullBatchSize`, and `LitePullConsumer` automatically commits the bit by default if not set additionally. In subscribe mode, multiple ` LitePullConsumer` under the same consumer group are load-balanced for consumption, consistent with PushConsumer.

The following is an example of the Assign pattern:

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

Assign mode still initializes `DefaultLitePullConsumer` at the beginning, here we use manual submission of loci, so set AutoCommit to false and then start the consumer. Unlike Subscribe mode, Assign mode does not have an automatic load balancing mechanism and requires the user to specify the queue to be pulled. Therefore, in the example, the queue under Topic is first fetched with fetchMessageQueues, and then half of the previous queue is fetched. The example also calls the seek method, which sets the loci in the first queue to be fetched from 10. Immediately after entering the loop keep calling the poll method to pull messages, and after pulling the messages call the commitSync method to manually submit the loci.

---
title: "Quick Start"
permalink: /docs/order-example/
excerpt: "How to send and receive ordered messages in Apache RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---


{% include toc %}


## Order Message 
To send and subscribe to order messages, use Java MQ SDK 1.2.7 and above. The sequential message is a kind of message type which is provided by MQ according to the order, which is suitable for the news release and consumption according to the principle of fifo. 

For more information, please refer to the sequential message file. 
The global order message and the partition order message send and receive the way to be the same basically, please refer to the following example code specifically. 

#### Send message sample code 

```java
try {
    MQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
    producer.start();

    String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
    for (int i = 0; i < 100; i++) {
        int orderId = i % 10;
        Message msg =
            new Message("TopicTestjjj", tags[i % tags.length], "KEY" + i,
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
```


#### Subscription message sample code 

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_3");

consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);

consumer.subscribe("TopicTest", "TagA || TagC || TagD");

consumer.registerMessageListener(new MessageListenerOrderly() {

    AtomicLong consumeTimes = new AtomicLong(0);
    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs,
                                               ConsumeOrderlyContext context) {
        context.setAutoCommit(false);
        System.out.printf(Thread.currentThread().getName() + " Receive New Messages: " + msgs + "%n");
        this.consumeTimes.incrementAndGet();
        if ((this.consumeTimes.get() % 2) == 0) {
            return ConsumeOrderlyStatus.SUCCESS;
        } else if ((this.consumeTimes.get() % 3) == 0) {
            return ConsumeOrderlyStatus.ROLLBACK;
        } else if ((this.consumeTimes.get() % 4) == 0) {
            return ConsumeOrderlyStatus.COMMIT;
        } else if ((this.consumeTimes.get() % 5) == 0) {
            context.setSuspendCurrentQueueTimeMillis(3000);
            return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
        }
        return ConsumeOrderlyStatus.SUCCESS;

    }
});

consumer.start();

System.out.printf("Consumer Started.%n");
```


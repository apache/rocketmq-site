---
title: "Broadcasting"
permalink: /docs/broadcast-example/
excerpt: "How to send broadcast messages in Apache RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---

{% include toc %}

#### What is Broadcasting
Broadcasting is when sending a meeage to a topic,all subscribers of the topic will receive the message even if they are in the same consumer group.If you want all subscribers in a group receive all the messages in a topic,broadcasting is a good choice.

#### How to use

##### First,Produce message as before

```java
DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName");

producer.start();

for (int i = 0; i < 10000000; i++){
    try {
        {
            Message msg = new Message("TopicTest",
                "TagA",
                "OrderID188",
                "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
            SendResult sendResult = producer.send(msg);
            System.out.printf("%s%n", sendResult);
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}
producer.shutdown();
```

##### Second,Consume message in Broadcast mode

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_1");

consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);

//set to broadcast mode
consumer.setMessageModel(MessageModel.BROADCASTING);

consumer.subscribe("TopicTest", "TagA || TagC || TagD");

consumer.registerMessageListener(new MessageListenerConcurrently() {

    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
        ConsumeConcurrentlyContext context) {
        System.out.printf(Thread.currentThread().getName() + " Receive New Messages: " + msgs + "%n");
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});

consumer.start();
System.out.printf("Broadcast Consumer Started.%n");
```

Enjoy it.

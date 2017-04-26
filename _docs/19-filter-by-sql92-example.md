---
title: "Filter By SQL92 Example "
permalink: /docs/filter-by-sql92-example/
excerpt: "How to filter messages by SQL92 in Apache RocketMQ."
modified: 2017-04-26T16:35:00-04:00
---


{% include toc %}

In most cases, tag is simple and useful to select message as you want.For example:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

Consumer will recieve messages that contains TAGA or TAGB or TAGC. But the limitation is that one message only could has one tag, this may be not suitable for more sophisticated scenarios.At this time, you could use sql expression to select messages.

### Principle

SQL feature could do some calculation through the properties you put in messages when sending. Under the grammars defined by RocketMQ, you can implement some interesting logic as you want. Here is an example:

<pre>
------------
| message  |
|----------|  a > 5 AND b = 'abc'
| a = 10   |  --------------------> Gotten
| b = 'abc'|
| c = true |
------------
------------
| message  |
|----------|   a > 5 AND b = 'abc'
| a = 1    |  --------------------> Missed
| b = 'abc'|
| c = true |
------------
</pre>

### Grammars

RocketMQ only defines some basic grammars to support this feature. Not enough ? You could also extend it easily.

1. Numeric comparison, like `>`, `>=`, `<`, `<=`, `BETWEEN`, `=`;
2. Character comparison, like `=`, `<>`, `IN`;
3. `IS NULL` or `IS NOT NULL`;
4. Logical `AND`, logical `OR`, logical `NOT`;

Constant type are:

1. Numeric, like 123, 3.1415;
2. Character, like 'abc', must be maked with single quotes;
3. `NULL`, special constant;
4. Boolean, `TRUE` or `FALSE`;

### Interface

Only push consumer could select messages by SQL92.The interface is:

`public void subscribe(final String topic, final MessageSelector messageSelector)`

### Examples

You can put properties in message through method `putUserProperty` when sending.

```java
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
try {
    producer.start();
} catch (MQClientException e) {
    e.printStackTrace();
    return;
}

Message msg = new Message("TopicTest",
    tag,
    ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET)
);
// Set some properties.
msg.putUserProperty("a", String.valueOf(i));

SendResult sendResult = producer.send(msg);
   
producer.shutdown();
```

Use `MessageSelector.bySql` to select messages through SQL92 when consuming.

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_4");

try {
	// only subsribe messages have property a, also a >=0 and a <= 3
    consumer.subscribe("TopicTest", MessageSelector.bySql("a between 0 and 3");
} catch (MQClientException e) {
    e.printStackTrace();
    return;
}

consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();
```
 

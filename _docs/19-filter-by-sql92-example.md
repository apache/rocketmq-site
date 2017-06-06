---
title: "Filter Example "
permalink: /docs/filter-by-sql92-example/
excerpt: "How to filter messages by SQL92 in Apache RocketMQ."
modified: 2017-04-26T16:35:00-04:00
---

In most cases, tag is a simple and useful design to select message you want. For example:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

{% include toc %}

The consumer will recieve messages that contains TAGA or TAGB or TAGC. But the limitation is that one message only can have one tag, and this may not work for sophisticated scenarios. In this case, you can use SQL expression to filter out messages.

### Principle

SQL feature could do some calculation through the properties you put in when sending messages. Under the grammars defined by RocketMQ, you can implement some interesting logic. Here is an example:

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

RocketMQ only defines some basic grammars to support this feature. You could also extend it easily.

1. Numeric comparison, like `>`, `>=`, `<`, `<=`, `BETWEEN`, `=`;
2. Character comparison, like `=`, `<>`, `IN`;
3. `IS NULL` or `IS NOT NULL`;
4. Logical `AND`, `OR`, `NOT`;

Constant types are:

1. Numeric, like 123, 3.1415;
2. Character, like 'abc', must be made with single quotes;
3. `NULL`, special constant;
4. Boolean, `TRUE` or `FALSE`;

### Usage constraints

Only push consumer could select messages by SQL92. The interface is:

`public void subscribe(final String topic, final MessageSelector messageSelector)`

### Producer example

You can put properties in message through method `putUserProperty` when sending.

```java
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
producer.start();

Message msg = new Message("TopicTest",
    tag,
    ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET)
);
// Set some properties.
msg.putUserProperty("a", String.valueOf(i));

SendResult sendResult = producer.send(msg);
   
producer.shutdown();
```

### Consumer example

Use `MessageSelector.bySql` to select messages through SQL92 when consuming.

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_4");

// only subsribe messages have property a, also a >=0 and a <= 3
consumer.subscribe("TopicTest", MessageSelector.bySql("a between 0 and 3");

consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();
```
 

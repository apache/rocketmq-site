---
title: "Simple Message Example"
permalink: /docs/simple-example/
excerpt: "How to send simple message to reduce pull in RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---



{% include toc %}

Use Rocketmq to send ordinary messages have three ways: reliable synchronous transmission, reliable
asynchronous transmission, one-way (Oneway) send. 

This paper introduces the principle of
each implementation, the use of the scene and the similarities and differences between the
three implementations, and provides a code example for reference
Reliable synchronous transmission
Principle: synchronous transmission refers to the sender of the message issued after the
data are received after the recipient sends back a packet should be made under the mode of
communication
Application scenarios: this way the application of the scene is very extensive, such as
important notification messages, SMS notification, SMS marketing system, etc..

```java
public class Producer {
    public static void main(String[] args) throws MQClientException,
        InterruptedException {
         /*
         * Instantiate with a producer group name.
         */
        DefaultMQProducer producer = new
            DefaultMQProducer("please_rename_unique_group_name");
         /*
         * Specify name server addresses.
         * <p/>
         *
         * Alternatively, you may specify name server addresses via exporting
        environmental variable: NAMESRV_ADDR
         * <pre>
         * {@code
         * producer.setNamesrvAddr("name-server1-ip:9876;name-server2-ip:9876");
         * }
         * </pre>
         */
         /*
         * Launch the instance.
         */
        producer.start();
        for (int i = 0; i < 1000; i++) {
            try {
                 /*
                 * Create a message instance, specifying topic, tag and message
                body.
                 */
                Message msg = new Message("TopicTest" /* Topic */,
                    "TagA" /* Tag */,
                    ("Hello RocketMQ " +
                        i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
                );
                 /*
                 * Call send message to deliver message to one of brokers.
                 */
                SendResult sendResult = producer.send(msg);
                System.out.printf("%s%n", sendResult);
            } catch (Exception e) {
                e.printStackTrace();
                Thread.sleep(1000);
            }
        }
         /*
         * Shut down once the producer instance is not longer in use.
         */
        producer.shutdown();
    }
}

```
#### Reliable asynchronous transmission
Principle: asynchronous transmission refers to the sender sends the data, not the receiver
back to respond, and then send the next packet communication. Asynchronous send MQ,
users need to realize asynchronous callback interface (SendCallback), in the implementation
of asynchronous send message to the application server, without waiting for a response can
be returned directly to the receiving server, through the callback interface response, and
response to the server for processing results.


Applications: asynchronous transmission is generally used to link time-consuming, RT
response time sensitive business scenarios, such as user video upload after notification to
start transcoding, the transcoding after push notification transcoding results.

```java
public class AsyncProducer {
    public static void main(String[] args) throws MQClientException,
        InterruptedException, UnsupportedEncodingException {
        DefaultMQProducer producer = new DefaultMQProducer("Jodie_Daily_test");
        producer.start();
        producer.setRetryTimesWhenSendAsyncFailed(0);
        for (int i = 0; i < 10000000; i++) {
            try {
                final int index = i;
                Message msg = new Message("Jodie_topic_1023",
                    "TagA",
                    "OrderID188",
                    "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
                producer.send(msg, new SendCallback() {
                    @Override
                    public void onSuccess(SendResult sendResult) {
                        System.out.printf("%-10d OK %s %n", index,
                            sendResult.getMsgId());
                    }
                    @Override
                    public void onException(Throwable e) {
                        System.out.printf("%-10d Exception %s %n", index, e);
                        e.printStackTrace();
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        producer.shutdown();
    }
}
```

Unidirectional (Oneway) transmission
Principle: one-way (Oneway) to send the message is only responsible for sending the
message, do not wait for the server to respond and no callback function to trigger, that is,
send the request does not wait for a reply. The process of sending messages in this way
takes a very short time, usually at the microsecond level.
Application scenarios: for some very short, but not high reliability requirements of the scene,
such as log collection.

```java
public class producerOneWay {
    public static void main(String[] args) throws MQClientException,
        InterruptedException, MQClientException {
         /*
         * Instantiate with a producer group name.
         */
        DefaultMQProducer producer = new
            DefaultMQProducer("please_rename_unique_group_name");
         /*
         * Specify name server addresses.
         * <p/>
         *
         * Alternatively, you may specify name server addresses via exporting
        environmental variable: NAMESRV_ADDR
         * <pre>
         * {@code
         * producer.setNamesrvAddr("name-server1-ip:9876;name-server2-ip:9876");
         * }
         * </pre>
         */
         /*
         * Launch the instance.
         */
        producer.start();
        for (int i = 0; i < 1000; i++) {
            try {
                 /*
                 * Create a message instance, specifying topic, tag and message
                body.
                 */
                Message msg = new Message("TopicTest" /* Topic */,
                    "TagA" /* Tag */,
                    ("Hello RocketMQ " +
                        i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
                );
                 /*
                 * Call send message to deliver message to one of brokers.
                 */
                producer.sendOneway(msg);
            } catch (Exception e) {
                e.printStackTrace();
                Thread.sleep(1000);
            }
        }
         /*
         * Shut down once the producer instance is not longer in use.
         */
        producer.shutdown();
    }
}

```
---
title: "Schedule example"
permalink: /docs/schedule-example/
excerpt: "How to use schedule component to reduce pull in RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---



{% include toc %}


### What is scheduled message?

Scheduled messages differ from normal messages in that they won't be delivered until a provided time later.

### Application

1. Start consumer to wait for incoming subscribed messages
    
    ```java
    import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
    import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
    import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
    import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
    import org.apache.rocketmq.common.message.MessageExt;
    import java.util.List;
    
    public class ScheduledMessageConsumer {
    
        public static void main(String[] args) throws Exception {
            // Instantiate message consumer
            DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ExampleConsumer");
            // Subscribe topics
            consumer.subscribe("TestTopic", "*");
            // Register message listener
            consumer.registerMessageListener(new MessageListenerConcurrently() {
                @Override
                public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> messages, ConsumeConcurrentlyContext context) {
                    for (MessageExt message : messages) {
                        // Print approximate delay time period
                        System.out.println("Receive message[msgId=" + message.getMsgId() + "] "
                                + (System.currentTimeMillis() - message.getStoreTimestamp()) + "ms later");
                    }
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                }
            });
            // Launch consumer
            consumer.start();
        }
    }
    ```


2. Send scheduled messages
    
    ```java
    import org.apache.rocketmq.client.producer.DefaultMQProducer;
    import org.apache.rocketmq.common.message.Message;
    
    public class ScheduledMessageProducer {
    
        public static void main(String[] args) throws Exception {
            // Instantiate a producer to send scheduled messages
            DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
            // Launch producer
            producer.start();
            int totalMessagesToSend = 100;
            for (int i = 0; i < totalMessagesToSend; i++) {
                Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
                // This message will be delivered to consumer 10 seconds later.
                message.setDelayTimeLevel(3);
                // Send the message
                producer.send(message);
            }
    
            // Shutdown producer after use.
            producer.shutdown();
        }
        
    }
    ```

3. Verification 
    
    You should see messages are consumed about 10 seconds later than their storing time. 
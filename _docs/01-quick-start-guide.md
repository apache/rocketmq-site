---
title: "Quick Start"
permalink: /docs/quick-start/
excerpt: "How to quickly install and setup Apache RocketMQ."
modified: 2016-12-16T15:01:43-04:00
---

This quick start guide is to give detailed instructions, helping you setup RocketMQ messaging system on a single local machine and send/receive the very first message.

{% include toc %}

# Prerequisite

   The following softwares are assumed installed:
   1. 64bit OS, best to have Linux/Unix/Mac;
   1. 64bit JDK 1.7+; 
   1. Maven 3.2.x
   1. Git 

# Clone & Build

```shell
  > git clone https://github.com/alibaba/RocketMQ.git
  > cd RocketMQ
  > sh install.sh
  > cd devenv
```

 
# Start Name Server
```shell
  > nohup sh bin/mqnamesrv &
  > tail -f ~/logs/rocketmqlogs/namesrv.log
  The Name Server boot success...
```  

# Start Broker
```shell 
  > nohup sh bin/mqbroker -n localhost:9876 &
  > tail -f ~/logs/rocketmqlogs/broker.log 
  The broker[%s, 172.30.30.233:10911] boot success...
```
  you may need to pay attention to the broker ip, for that the broker will not use the loopback network interface, So you should make sure you have connected to other network.


# Send & Receive Messages

Before sending/receiving messages, we need to tell clients where name servers are located. RocketMQ provides multiple ways to achieve this. For simplicity, we use environment variable `NAMESRV_ADDR`

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh com.alibaba.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh com.alibaba.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

# Code Example

## prepare 
```
<dependency>
    <groupId>com.alibaba.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>3.5.8</version>
</dependency>
```

## Producer

```java
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.common.message.Message;
import com.alibaba.rocketmq.remoting.common.RemotingHelper;
public class Producer { 
    public static void main(String[] args) throws MQClientException, InterruptedException {
        DefaultMQProducer producer = new DefaultMQProducer("YOUR_PRODUCER_GROUP"); // (1)
        producer.setNamesrvAddr("localhost:9876"); //(2) set name server explicitly
        producer.start(); // (3)
        for (int i = 0; i < 1000; i++) {
            try {
                Message msg = new Message("TopicTest",// topic // (4)
                        "TagA",// tag (5)
                        ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET)// body (6)
                        );
                SendResult sendResult = producer.send(msg); // (7)
                System.out.println(sendResult);
            } catch (Exception e) {
                e.printStackTrace();
                Thread.sleep(1000);
            }
        }
        producer.shutdown();
    }
}
```

## Consumer 

```java 
import com.alibaba.rocketmq.client.consumer.DefaultMQPushConsumer;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.common.consumer.ConsumeFromWhere;
import com.alibaba.rocketmq.common.message.MessageExt;
import java.util.List;

public class Consumer {
    public static void main(String[] args) throws InterruptedException, MQClientException {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("YOUR_CONSUMER_GROUP"); // (1)
        consumer.setNamesrvAddr("localhost:9876"); // (2)
        consumer.subscribe("TopicTest"/*topic*/, "*"/*tag,* means all tags*/); // (3)
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET); // (4)
        consumer.registerMessageListener(new MessageListenerConcurrently() {
                    @Override
                    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                        System.out.println(Thread.currentThread().getName() + " Receive New Messages: " + msgs);
                        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                    }
                }); //(5)
        consumer.start(); //(6)
        System.out.println("Consumer Started.");
    }
}
```

# Docker Compose Deployment of RocketMQ

This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker-compose and complete simple message sending and receiving.

:::tip SYSTEM REQUIREMENTS

1. 64-bit operating system
2. 64-bit JDK 1.8+

:::
## 1.Configure broker.conf
```shell
# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" > broker.conf
```

## 2.Configure docker-compose
To quickly start and run the RockerMQ cluster, you can use the following template to create a docker-compose.yml file by modifying or adding configurations in the environment section.
```text
version: '3.8'

services:
  namesrv:
    image: apache/rocketmq:4.9.6
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    networks:
      - rocketmq
    command: sh mqnamesrv

  broker:
    image: apache/rocketmq:4.9.6
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
      - 10912:10912
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    volumes:
      - ./broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf
    depends_on:
      - namesrv
    networks:
      - rocketmq
    command: sh mqbroker -c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf

networks:
  rocketmq:
    driver: bridge
```

## 3.Start RocketMQ
Start all defined services according to the docker-compose.yml file.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
docker-compose up -d
```

</TabItem>
<TabItem value="Windows" label="Windows" default>

```code
docker-compose -p rocketmq_project up -d
```
</TabItem>
</Tabs>

## 4.Send and Receive Messages with Tools
```shell
# Enter the broker container
$ docker exec -it rmqbroker bash

$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 5.Send and Receive Messages with SDK

We can also try to use the client sdk to send and receive messages.

1. Create a java project.

2. Add sdk dependency to pom.xml

   ```
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client</artifactId>
       <version>4.9.6</version>
   </dependency>
   ```

3. In the created Java project, create and run a program to send a simple message. Apache RocketMQ can send messages in three ways: **synchronous, asynchronous, and one-way transmission**. Here we use the synchronous mode as an example:

   ```java
   import org.apache.rocketmq.client.producer.DefaultMQProducer;
   import org.apache.rocketmq.client.producer.SendResult;
   import org.apache.rocketmq.common.message.Message;
   
   public class ProducerExample {
       public static void main(String[] args) throws Exception {
           // Create producer instance and set the producer group name
           DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
           // Set the Name Server address (replace with actual Name Server address)
           producer.setNamesrvAddr("localhost:9876");
           producer.start();
   
           try {
               // Create a message instance, specifying the topic, tag, and message body
               Message msg = new Message("TestTopic", "TagA", ("Hello RocketMQ").getBytes());
               // Send the message and get the send result
               SendResult sendResult = producer.send(msg);
               System.out.println("Message sent: " + new String(msg.getBody()));
               System.out.println("Send result: " + sendResult);
           } catch (Exception e) {
               e.printStackTrace();
               System.out.println("Message sending failed.");
           } finally {
               // Shutdown the producer
               producer.shutdown();
           }
       }
   }
   ```

4. In the created Java project, create and run a program to subscribe to simple messages. Apache RocketMQ has two consumption modes: **Push and Pull**. Here we use the Push mode as an example.

   ```java
   import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
   import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
   import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
   import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
   import org.apache.rocketmq.common.message.MessageExt;
   
   import java.util.List;
   
   public class ConsumerExample {
       public static void main(String[] args) throws Exception {
           // Create consumer instance and set the consumer group name
           DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
           // Set the Name Server address (replace with actual Name Server address)
           consumer.setNamesrvAddr("localhost:9876");
           // Subscribe to the specified topic and tag (* means all tags)
           consumer.subscribe("TestTopic", "*");
   
           // Register message listener
           consumer.registerMessageListener(new MessageListenerConcurrently() {
               @Override
               public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                   for (MessageExt msg : msgs) {
                       System.out.println("Received message: " + new String(msg.getBody()));
                   }
                   return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
               }
           });
   
           // Start the consumer
           consumer.start();
           System.out.println("Consumer started.");
       }
   }
   ```

## 6.Stop All Services

```shell
docker-compose down
```
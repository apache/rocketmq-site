# Docker Deployment of RocketMQ 4.X

This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker and complete simple message sending and receiving.

:::tip System Requirements

1. 64-bit operating system
2. 64-bit JDK 1.8+

:::

## 1. Pull RocketMQ Image

Here, we take the RocketMQ 4.9.6 version image from [dockerhub](https://hub.docker.com/r/apache/rocketmq/tags) as an example to introduce the deployment process.

```shell
docker pull apache/rocketmq:4.9.6
```

## 2. Create a Shared Network for Containers

RocketMQ involves multiple services and requires multiple containers. Creating a Docker network facilitates communication between containers.

```shell
docker network create rocketmq
```

## 3. Start NameServer

```shell
# Start NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --net rocketmq apache/rocketmq:4.9.6 sh mqnamesrv

# Verify if NameServer started successfully
docker logs -f rmqnamesrv
```

:::info

We can see **'The Name Server boot success..'，** indicating that the NameServer has started successfully.

:::

## 4. Start Broker

After the NameServer starts successfully, we start the Broker.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" >broker.conf

# Start Broker
docker run -d \
--name rmqbroker \
--net rocketmq \
-p 10912:10912 -p 10911:10911 -p 10909:10909 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
-v ./broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf \
apache/rocketmq:4.9.6 sh mqbroker \
-c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf

# Verify if Broker started successfully
docker logs rmqbroker
```
</TabItem>
<TabItem value="Windows" label="Windows">

```code
# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" >broker.conf

# Start Broker
docker run -d ^
--name rmqbroker ^
--net rocketmq ^
-p 10912:10912 -p 10911:10911 -p 10909:10909 ^
-e "NAMESRV_ADDR=rmqnamesrv:9876" ^
-v %cd%\broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf ^
apache/rocketmq:4.9.6 sh mqbroker ^
-c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf

# Verify if Broker started successfully
docker logs rmqbroker
```

</TabItem>

</Tabs>


:::info

We can see **'The broker boot success..'，** indicating that the Broker has started successfully.

:::

:::note

At this point, a single-node replica RocketMQ cluster has been deployed. We can use scripts for simple message sending and receiving.

:::

## 5. Test Message Sending and Receiving with Tools

```shell
# Enter the broker container
$ docker exec -it rmqbroker bash

$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 6. Test Message Sending and Receiving with SDK

After testing with tools, we can try sending and receiving messages using the SDK. Here, we use the Java SDK as an example to introduce the process.

1. Create a Java project in IDEA.

2. Add the following dependencies to the *pom.xml* file to introduce the Java library.

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


## 7. Stop the Containers
After completing the experiment, we can stop the containers as follows:
```shell
# Stop the NameServer container
docker stop rmqnamesrv

# Stop the Broker container
docker stop rmqbroker
```
# Docker-compose 部署 RocketMQ

这一节介绍如何使用Docker-compose快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统
2. 64位 JDK 1.8+

:::
## 1.配置 broker.conf
```shell
# 配置 broker 的IP地址
echo "brokerIP1=127.0.0.1" > broker.conf
```

## 2.编写docker-compose
为了快速启动并运行 RockerMQ 集群，您可以使用以下模板通过修改或添加环境部分中的配置来创建 docker-compose.yml 文件。
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

## 3.启动RocketMQ集群
根据 docker-compose.yml 文件启动所有定义的服务。

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

## 4.工具测试消息收发
```shell
# 进入broker容器
$ docker exec -it rmqbroker bash

$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 5.SDK测试消息收发

工具测试完成后，我们可以尝试使用 SDK 收发消息，这里以 Java SDK 为例介绍一下消息收发过程。

1. 在IDEA中创建一个Java工程。

2. 在 *pom.xml* 文件中添加以下依赖引入Java依赖库

   ```
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client</artifactId>
       <version>4.9.6</version>
   </dependency>
   ```

3. 在已创建的Java工程中，创建发送普通消息程序并运行，Apache RocketMQ可用于以三种方式发送消息：**同步、异步和单向传输**，这里以同步模式为示例：

   ```java
   import org.apache.rocketmq.client.producer.DefaultMQProducer;
   import org.apache.rocketmq.client.producer.SendResult;
   import org.apache.rocketmq.common.message.Message;
   
   public class ProducerExample {
       public static void main(String[] args) throws Exception {
           // 创建生产者实例，并设置生产者组名
           DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
           // 设置 Name Server 地址，此处为示例，实际使用时请替换为真实的 Name Server 地址
           producer.setNamesrvAddr("localhost:9876");
           producer.start();
   
           try {
               // 创建消息实例，指定 topic、Tag和消息体
               Message msg = new Message("TestTopic", "TagA", ("Hello RocketMQ").getBytes());
               // 发送消息并获取发送结果
               SendResult sendResult = producer.send(msg);
               System.out.println("Message sent: " + new String(msg.getBody()));
               System.out.println("Send result: " + sendResult);
           } catch (Exception e) {
               e.printStackTrace();
               System.out.println("Message sending failed.");
           } finally {
               // 关闭生产者
               producer.shutdown();
           }
       }
   }
   ```

4. 在已创建的Java工程中，创建订阅普通消息程序并运行。Apache RocketMQ 有两种消费模式：**Push和Pull**，这里以Push消费为示例。

   ```java
   import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
   import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
   import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
   import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
   import org.apache.rocketmq.common.message.MessageExt;
   
   import java.util.List;
   
   public class ConsumerExample {
       public static void main(String[] args) throws Exception {
           // 创建消费者实例，并设置消费者组名
           DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
           // 设置 Name Server 地址，此处为示例，实际使用时请替换为真实的 Name Server 地址
           consumer.setNamesrvAddr("localhost:9876");
           // 订阅指定的主题和标签（* 表示所有标签）
           consumer.subscribe("TestTopic", "*");
   
           // 注册消息监听器
           consumer.registerMessageListener(new MessageListenerConcurrently() {
               @Override
               public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                   for (MessageExt msg : msgs) {
                       System.out.println("Received message: " + new String(msg.getBody()));
                   }
                   return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
               }
           });
   
           // 启动消费者
           consumer.start();
           System.out.println("Consumer started.");
       }
   }
   ```

## 6.停止所有服务

```shell
docker-compose down
```
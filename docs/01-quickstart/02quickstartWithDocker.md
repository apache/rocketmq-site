# Docker 部署 RocketMQ

这一节介绍如何使用Docker快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统
2. 64位 JDK 1.8+

:::



## 1.拉取RocketMQ镜像

这里以[dockerhub](https://hub.docker.com/r/apache/rocketmq/tags)上 RocketMQ 4.9.6 版本的镜像为例，介绍部署过程。

```shell
docker pull apache/rocketmq:4.9.6
```

## 2.创建容器共享网络

RocketMQ中有多个服务，需要创建多个容器，创建 docker 网络便于容器间相互通信。

```shell
docker network create rocketmq
```

## 3.启动NameServer

```shell
# 启动NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --net rocketmq apache/rocketmq:4.9.6 sh mqnamesrv

# 验证NameServer是否启动成功
docker logs -f rmqnamesrv
```

:::info

我们可以看到 **'The Name Server boot success..'，** 表示NameServer 已成功启动。

:::

## 4.启动Broker

NameServer成功启动后，我们启动Broker。


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
# 配置 Broker 的 IP 地址
echo "brokerIP1=127.0.0.1" >broker.conf

# 启动 Broker
docker run -d \
--name rmqbroker \
--net rocketmq \
-p 10912:10912 -p 10911:10911 -p 10909:10909 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
-v ./broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf \
apache/rocketmq:4.9.6 sh mqbroker \
-c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf

# 验证 Broker 是否启动成功
docker logs rmqbroker
```
</TabItem>
<TabItem value="Windows" label="Windows">

```code
# 配置 Broker 的 IP 地址
echo "brokerIP1=127.0.0.1" >broker.conf

# 启动 Broker
docker run -d ^
--name rmqbroker ^
--net rocketmq ^
-p 10912:10912 -p 10911:10911 -p 10909:10909 ^
-e "NAMESRV_ADDR=rmqnamesrv:9876" ^
-v %cd%\broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf ^
apache/rocketmq:4.9.6 sh mqbroker ^
-c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf

# 验证 Broker 是否启动成功
docker logs rmqbroker
```

</TabItem>

</Tabs>




:::info

我们可以看到 **'The broker boot success..'，** 表示 Broker 已成功启动。

:::

:::note

至此，一个单节点副本的 RocketMQ 集群已经部署起来了，我们可以利用脚本进行简单的消息收发。

:::

## 5.工具测试消息收发

```shell
# 进入broker容器
$ docker exec -it rmqbroker bash

$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 6.SDK测试消息收发

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


## 7. 停止容器
完成实验后，我们可以通过以下方式停止容器
```shell
# 停止 NameServer 容器
docker stop rmqnamesrv

# 停止 Broker 容器
docker stop rmqbroker
```

 

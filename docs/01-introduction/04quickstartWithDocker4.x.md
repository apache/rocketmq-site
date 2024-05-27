# Docker 部署 RocketMQ 4.X

这一节介绍如何使用Docker快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统，推荐 Linux/Unix/macOS
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

## 3.创建映射目录并给予权限

```shell
# 创建映射目录
mkdir -p  /docker/rocketmq/broker/logs
mkdir -p  /docker/rocketmq/broker/store
mkdir -p  /docker/rocketmq/nameserver/logs
mkdir -p  /docker/rocketmq/conf

# 给予权限
chmod -R 777 /docker/rocketmq
```

## 3.启动NameServer

```shell
# 启动NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --network rocketmq \
-v /docker/rocketmq/nameserver/logs/:/home/rocketmq/logs \
apache/rocketmq:4.9.6 sh mqnamesrv

# 验证NameServer是否启动成功
docker logs -f rmqnamesrv
```

:::info

我们可以看到 **'The Name Server boot success..'，** 表示NameServer 已成功启动。

:::

## 4.启动Broker

NameServer成功启动后，我们启动Broker。

```shell
# 创建配置文件broker.conf
vim /docker/rocketmq/conf/broker.conf
```

```text
# 集群名称
brokerClusterName = DefaultCluster
# 节点名称
brokerName = broker-a
# broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 
brokerId = 0
# 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04
deleteWhen = 04
# 以小时计算的文件保留时间 默认值72小时
fileReservedTime = 48
# Broker角色
brokerRole = ASYNC_MASTER
# 刷盘方式
flushDiskType = ASYNC_FLUSH
# 此处为示例，实际使用时请替换为真实的 Broker 地址
brokerIP1 = 127.0.0.1
```

```shell
# 启动Broker
docker run -d \
--name rmqbroker \
--network rocketmq \
-p 10912:10912 -p 10911:10911 -p 10909:10909 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
-v /docker/rocketmq/broker/logs:/home/rocketmq/logs \
-v /docker/rocketmq/conf:/home/rocketmq/conf \
apache/rocketmq:4.9.6 sh mqbroker -n rmqnamesrv:9876 autoCreateTopicEnable=true \
-c /home/rocketmq/conf/broker.conf

# 验证Broker是否启动成功
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/broker.log"
```

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

工具测试完成后，我们可以尝试使用 SDK 收发消息。这里以 Java SDK 为例介绍一下消息收发过程，可以从 [rocketmq-clients](https://github.com/apache/rocketmq-clients) 中参阅更多细节。

1. 在IDEA中创建一个Java工程。

2. 在 *pom.xml* 文件中添加以下依赖引入Java依赖库

   ```
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client</artifactId>
       <version>4.9.6</version>
   </dependency>
   ```

3. 在已创建的Java工程中，创建发送普通消息程序并运行，示例代码如下：

   ```java
   import org.apache.rocketmq.client.producer.DefaultMQProducer;
   import org.apache.rocketmq.client.producer.SendResult;
   import org.apache.rocketmq.common.message.Message;
   
   public class ProducerExample {
       public static void main(String[] args) throws Exception {
           // 创建生产者实例，并设置生产者组名
           DefaultMQProducer producer = new DefaultMQProducer("Test");
           // 设置 Name Server 地址，此处为示例，实际使用时请替换为真实的 Name Server 地址
           producer.setNamesrvAddr("localhost:9876");
           producer.start();
   
           try {
               // 创建消息实例，指定 topic 和消息体，tag 留空
               Message msg = new Message("TestTopic", "", ("Hello RocketMQ").getBytes());
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

4. 在已创建的Java工程中，创建订阅普通消息程序并运行。Apache RocketMQ 支持[SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)和[PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)两种消费者类型，您可以选择以下任意一种方式订阅消息。

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
           DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("TestGroup");
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


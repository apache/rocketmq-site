# 快速开始

这一节介绍如何快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统，推荐 Linux/Unix/macOS
2. 64位 JDK 1.8+

:::

## 1.下载安装Apache RocketMQ

:::tip RocketMQ下载

RocketMQ 的安装包分为两种，二进制包和源码包。 点击[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-source-release.zip) 下载 Apache RocketMQ 5.0.0的源码包。你也可以从[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-bin-release.zip) 下载到二进制包。二进制包是已经编译完成后可以直接运行的，源码包是需要编译后运行的，

:::

这里以在Linux环境下利用社区5.0.0的源码包为例，介绍RocketMQ安装过程。

解压5.0.0的源码包并编译构建二进制可执行文件

```shell
$ unzip rocketmq-all-5.0.0-source-release.zip
$ cd rocketmq-all-5.0.0-source-release/
$ mvn -Prelease-all -DskipTests clean install -U
$ cd distribution/target/rocketmq-5.0.0/rocketmq-5.0.0
```
## 2. 启动NameServer

安装完RocketMQ包后，我们启动NameServer

```shell
### 启动namesrv
$ nohup sh bin/mqnamesrv &
 
### 验证namesrv是否启动成功
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

:::info

我们可以在namesrv.log 中看到 **'The Name Server boot success..'，** 表示NameServer 已成功启动。

:::



## 3. 启动Broker+Proxy

NameServer成功启动后，我们启动Broker和Proxy，5.x 版本下我们建议使用 Local 模式部署，即 Broker 和 Proxy 同进程部署。5.x 版本也支持 Broker 和 Proxy 分离部署以实现更灵活的集群能力。详情参考[部署教程](../05-deploymentOperations/15deploy.md)。

```shell
### 先启动broker
$ nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &

### 验证broker是否启动成功, 比如, broker的ip是192.168.1.2 然后名字是broker-a
$ tail -f ~/logs/rocketmqlogs/broker_default.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

:::info

我们可以在 broker_default.log 中看到“The broker[brokerName,ip:port] boot success..”，这表明 broker 已成功启动。

:::

:::note

至此，一个单节点副本的 RocketMQ 集群已经部署起来了，我们可以利用脚本进行简单的消息收发。

:::

## 4. 工具测试消息收发

在进行工具测试消息收发之前，我们需要告诉客户端NameServer的地址，RocketMQ有多种方式在客户端中设置NameServer地址，这里我们利用环境变量`NAMESRV_ADDR`

```shell
$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 5. SDK测试消息收发

工具测试完成后，我们可以尝试使用 SDK 收发消息。这里以 Java SDK 为例介绍一下消息收发过程，可以从 <a href='https://github.com/apache/rocketmq-clients'>rocketmq-clients</a> 中参阅更多细节。

1. 在IDEA中创建一个Java工程。

2. 在 *pom.xml* 文件中添加以下依赖引入Java依赖库，将 `rocketmq-client-java-version` 替换成 <a href='https://search.maven.org/search?q=g:org.apache.rocketmq%20AND%20a:rocketmq-client-java'>最新的版本</a>.

   ```xml
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client-java</artifactId>
       <version>${rocketmq-client-java-version}</version>
   </dependency> 
   ```

3. 通过mqadmin创建 Topic。

   ```shell
   $ sh bin/mqadmin updatetopic -n localhost:9876 -t TestTopic
   ```

4. 在已创建的Java工程中，创建发送普通消息程序并运行，示例代码如下：

   ```java
   import org.apache.rocketmq.client.apis.*;
   import org.apache.rocketmq.client.apis.consumer.ConsumeResult;
   import org.apache.rocketmq.client.apis.consumer.MessageListener;
   import org.apache.rocketmq.client.apis.consumer.SimpleConsumer;
   import org.apache.rocketmq.client.apis.message.Message;
   import org.apache.rocketmq.client.apis.message.MessageBuilder;
   import org.apache.rocketmq.client.apis.message.MessageView;
   import org.apache.rocketmq.client.apis.producer.Producer;
   import org.apache.rocketmq.client.apis.producer.SendReceipt;
   import java.time.Duration;
   import java.util.List;
   public class ProducerExample {
       public static void main(String[] args) throws ClientException {
           //接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8081;xxx:8081。
           String endpoint = "localhost:8081";
           //消息发送的目标Topic名称，需要提前创建。
           String topic = "TestTopic";
           ClientServiceProvider provider = ClientServiceProvider.loadService();
           ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);
           ClientConfiguration configuration = builder.build();
           //初始化Producer时需要设置通信配置以及预绑定的Topic。
           Producer producer = provider.newProducerBuilder()
                   .setTopics(topic)
                   .setClientConfiguration(configuration)
                   .build();
           //普通消息发送。
           Message message = provider.newMessageBuilder()
                   .setTopic(topic)
                   //设置消息索引键，可根据关键字精确查找某条消息。
                   .setKeys("messageKey")
                   //设置消息Tag，用于消费端根据指定Tag过滤消息。
                   .setTag("messageTag")
                   //消息体。
                   .setBody("messageBody".getBytes())
                   .build();
           try {
               //发送消息，需要关注发送结果，并捕获失败等异常。
               SendReceipt sendReceipt = producer.send(message);
               System.out.println(sendReceipt.getMessageId());
           } catch (ClientException e) {
               e.printStackTrace();
           }
       }
   }
   ```


4. 在已创建的Java工程中，创建订阅普通消息程序并运行。Apache RocketMQ 支持[SimpleConsumer](../04-featureBehavior/06consumertype.md)和[PushConsumer](../04-featureBehavior/06consumertype.md)两种消费者类型，您可以选择以下任意一种方式订阅消息。

   ```java
   import org.apache.rocketmq.client.apis.*;
   import org.apache.rocketmq.client.apis.consumer.ConsumeResult;
   import org.apache.rocketmq.client.apis.consumer.FilterExpression;
   import org.apache.rocketmq.client.apis.consumer.FilterExpressionType;
   import org.apache.rocketmq.client.apis.consumer.PushConsumer;
   
   import java.io.IOException;
   import java.util.Collections;
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   
   public class PushConsumerExample {
       private static final Logger LOGGER = LoggerFactory.getLogger(PushConsumerExample.class);
   
       private PushConsumerExample() {
       }
   
       public static void main(String[] args) throws ClientException, IOException, InterruptedException {
           final ClientServiceProvider provider = ClientServiceProvider.loadService();
           //接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8081;xxx:8081。
           String endpoints = "localhost:8081";
           ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
                   .setEndpoints(endpoints)
                   .build();
           //订阅消息的过滤规则，表示订阅所有Tag的消息。
   	    String tag = "*";
           FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
           //为消费者指定所属的消费者分组，Group需要提前创建。
   	    String consumerGroup = "Your ConsumerGroup";
           //指定需要订阅哪个目标Topic，Topic需要提前创建。
           String topic = "TestTopic";
   	    //初始化PushConsumer，需要绑定消费者分组ConsumerGroup、通信参数以及订阅关系。
           PushConsumer pushConsumer = provider.newPushConsumerBuilder()
                   .setClientConfiguration(clientConfiguration)
                   //设置消费者分组。
                   .setConsumerGroup(consumerGroup)
                   //设置预绑定的订阅关系。
                   .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
                   //设置消费监听器。
   		        .setMessageListener(messageView -> {
                       //处理消息并返回消费结果。
                       // LOGGER.info("Consume message={}", messageView);
                       System.out.println("Consume message!!");
                       return ConsumeResult.SUCCESS;
                   })
                   .build();
           Thread.sleep(Long.MAX_VALUE);
           //如果不需要再使用PushConsumer，可关闭该进程。
           //pushConsumer.close();
       }
   }
   ```

## 6. 关闭服务器

完成实验后，我们可以通过以下方式关闭服务

```shell
$ sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker with proxy enable OK(36695)


$ sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```


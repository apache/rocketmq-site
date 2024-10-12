# Docker 部署 RocketMQ

这一节介绍如何使用Docker快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统
2. 64位 JDK 1.8+

:::

## 1.拉取RocketMQ镜像
这里以[dockerhub](https://hub.docker.com/r/apache/rocketmq/tags)上 RocketMQ 5.3.1 版本的镜像为例，介绍部署过程。

```shell
docker pull apache/rocketmq:5.3.1
```

## 2.创建容器共享网络
RocketMQ 中有多个服务，需要创建多个容器，创建 docker 网络便于容器间相互通信。

```shell
docker network create rocketmq
```

## 3.启动NameServer

```shell
# 启动 NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --network rocketmq apache/rocketmq:5.3.1 sh mqnamesrv

# 验证 NameServer 是否启动成功
docker logs -f rmqnamesrv
```
:::info

我们可以看到 **'The Name Server boot success..'，** 表示NameServer 已成功启动。

:::

## 4.启动 Broker+Proxy
NameServer 成功启动后，我们启动 Broker 和 Proxy。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
# 配置 Broker 的IP地址
echo "brokerIP1=127.0.0.1" > broker.conf

# 启动 Broker 和 Proxy
docker run -d \
--name rmqbroker \
--network rocketmq \
-p 10912:10912 -p 10911:10911 -p 10909:10909 \
-p 8080:8080 -p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
-v ./broker.conf:/home/rocketmq/rocketmq-5.3.1/conf/broker.conf \
apache/rocketmq:5.3.1 sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.1/conf/broker.conf

# 验证 Broker 是否启动成功
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/proxy.log"
```
</TabItem>
<TabItem value="Windows" label="Windows">

```code
# 配置 Broker 的 IP 地址
echo "brokerIP1=127.0.0.1" > broker.conf

# 启动 Broker 和 Proxy
docker run -d ^
--name rmqbroker ^
--net rocketmq ^
-p 10912:10912 -p 10911:10911 -p 10909:10909 ^
-p 8080:8080 -p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" ^
-v %cd%\broker.conf:/home/rocketmq/rocketmq-5.3.1/conf/broker.conf ^
apache/rocketmq:5.3.1 sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.1/conf/broker.conf

# 验证 Broker 是否启动成功
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/proxy.log"
```

</TabItem>

</Tabs>


:::info

我们可以看到 **'The broker boot success..'，** 表示 Broker 已成功启动。

:::

:::note

至此，一个单节点副本的 RocketMQ 集群已经部署起来了，我们可以利用脚本进行简单的消息收发。

:::

## 5.SDK测试消息收发

工具测试完成后，我们可以尝试使用 SDK 收发消息。这里以 Java SDK 为例介绍一下消息收发过程，可以从 [rocketmq-clients](https://github.com/apache/rocketmq-clients) 中参阅更多细节。

1. 在IDEA中创建一个Java工程。

2. 在 *pom.xml* 文件中添加以下依赖引入Java依赖库，将 `rocketmq-client-java-version` 替换成 <a href='https://search.maven.org/search?q=g:org.apache.rocketmq%20AND%20a:rocketmq-client-java'>最新的版本</a>.

   ```xml
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client-java</artifactId>
       <version>${rocketmq-client-java-version}</version>
   </dependency> 
   ```

3. 进入broker容器，通过mqadmin创建 Topic。

   ```shell
   $ docker exec -it rmqbroker bash
   $ sh mqadmin updatetopic -t TestTopic -c DefaultCluster
   ```

4. 在已创建的Java工程中，创建发送普通消息程序并运行，示例代码如下：

   ```java
   import org.apache.rocketmq.client.apis.ClientConfiguration;
   import org.apache.rocketmq.client.apis.ClientConfigurationBuilder;
   import org.apache.rocketmq.client.apis.ClientException;
   import org.apache.rocketmq.client.apis.ClientServiceProvider;
   import org.apache.rocketmq.client.apis.message.Message;
   import org.apache.rocketmq.client.apis.producer.Producer;
   import org.apache.rocketmq.client.apis.producer.SendReceipt;
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   
   public class ProducerExample {
       private static final Logger logger = LoggerFactory.getLogger(ProducerExample.class);
   
       public static void main(String[] args) throws ClientException {
           // 接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8080;xxx:8081
           // 此处为示例，实际使用时请替换为真实的 Proxy 地址和端口
           String endpoint = "localhost:8081";
           // 消息发送的目标Topic名称，需要提前创建。
           String topic = "TestTopic";
           ClientServiceProvider provider = ClientServiceProvider.loadService();
           ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);
           ClientConfiguration configuration = builder.build();
           // 初始化Producer时需要设置通信配置以及预绑定的Topic。
           Producer producer = provider.newProducerBuilder()
               .setTopics(topic)
               .setClientConfiguration(configuration)
               .build();
           // 普通消息发送。
           Message message = provider.newMessageBuilder()
               .setTopic(topic)
               // 设置消息索引键，可根据关键字精确查找某条消息。
               .setKeys("messageKey")
               // 设置消息Tag，用于消费端根据指定Tag过滤消息。
               .setTag("messageTag")
               // 消息体。
               .setBody("messageBody".getBytes())
               .build();
           try {
               // 发送消息，需要关注发送结果，并捕获失败等异常。
               SendReceipt sendReceipt = producer.send(message);
               logger.info("Send message successfully, messageId={}", sendReceipt.getMessageId());
           } catch (ClientException e) {
               logger.error("Failed to send message", e);
           }
           // producer.close();
       }
   }
   ```

5. 在已创建的Java工程中，创建订阅普通消息程序并运行。Apache RocketMQ 支持[SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)和[PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)两种消费者类型，您可以选择以下任意一种方式订阅消息。

```java
import java.io.IOException;
import java.util.Collections;
import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientException;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.consumer.ConsumeResult;
import org.apache.rocketmq.client.apis.consumer.FilterExpression;
import org.apache.rocketmq.client.apis.consumer.FilterExpressionType;
import org.apache.rocketmq.client.apis.consumer.PushConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PushConsumerExample {
    private static final Logger logger = LoggerFactory.getLogger(PushConsumerExample.class);

    private PushConsumerExample() {
    }

    public static void main(String[] args) throws ClientException, IOException, InterruptedException {
        final ClientServiceProvider provider = ClientServiceProvider.loadService();
        // 接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8080;xxx:8081
        // 此处为示例，实际使用时请替换为真实的 Proxy 地址和端口
        String endpoints = "localhost:8081";
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints(endpoints)
            .build();
        // 订阅消息的过滤规则，表示订阅所有Tag的消息。
        String tag = "*";
        FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
        // 为消费者指定所属的消费者分组，Group需要提前创建。
        String consumerGroup = "YourConsumerGroup";
        // 指定需要订阅哪个目标Topic，Topic需要提前创建。
        String topic = "TestTopic";
        // 初始化PushConsumer，需要绑定消费者分组ConsumerGroup、通信参数以及订阅关系。
        PushConsumer pushConsumer = provider.newPushConsumerBuilder()
            .setClientConfiguration(clientConfiguration)
            // 设置消费者分组。
            .setConsumerGroup(consumerGroup)
            // 设置预绑定的订阅关系。
            .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
            // 设置消费监听器。
            .setMessageListener(messageView -> {
                // 处理消息并返回消费结果。
                logger.info("Consume message successfully, messageId={}", messageView.getMessageId());
                return ConsumeResult.SUCCESS;
            })
            .build();
        Thread.sleep(Long.MAX_VALUE);
        // 如果不需要再使用 PushConsumer，可关闭该实例。
        // pushConsumer.close();
    }
}
```

## 6. 停止容器
完成实验后，我们可以通过以下方式停止容器。
```shell
# 停止 NameServer 容器
docker stop rmqnamesrv

# 停止 Broker 容器
docker stop rmqbroker
```

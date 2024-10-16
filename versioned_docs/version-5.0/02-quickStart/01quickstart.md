# 本地部署 RocketMQ

这一节介绍如何快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统，推荐 Linux/Unix/macOS
2. 64位 JDK 1.8+

:::

## 1.下载安装Apache RocketMQ

:::tip RocketMQ下载

RocketMQ 的安装包分为两种，二进制包和源码包。 点击[这里](https://dist.apache.org/repos/dist/release/rocketmq/5.3.1/rocketmq-all-5.3.1-source-release.zip) 下载 Apache RocketMQ 5.3.1的源码包。你也可以从[这里](https://dist.apache.org/repos/dist/release/rocketmq/5.3.1/rocketmq-all-5.3.1-bin-release.zip) 下载到二进制包。二进制包是已经编译完成后可以直接运行的，源码包是需要编译后运行的。

:::

这里以在Linux环境下利用社区5.3.1的源码包为例，介绍RocketMQ安装过程。

解压5.3.1的源码包并编译构建二进制可执行文件

```shell
$ unzip rocketmq-all-5.3.1-source-release.zip
$ cd rocketmq-all-5.3.1-source-release/
$ mvn -Prelease-all -DskipTests -Dspotbugs.skip=true clean install -U
$ cd distribution/target/rocketmq-5.3.1/rocketmq-5.3.1
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

NameServer成功启动后，我们启动Broker和Proxy。这里我们使用 Local 模式部署，即 Broker 和 Proxy 同进程部署。5.x 版本也支持 Broker 和 Proxy 分离部署以实现更灵活的集群能力。详情参考[部署教程](../05-deploymentOperations/01deploy.md)。

```shell
### 先启动broker
$ nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &

### 验证broker是否启动成功, 比如, broker的ip是192.168.1.2 然后名字是broker-a
$ tail -f ~/logs/rocketmqlogs/proxy.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

:::info

我们可以在 proxy.log 中看到“The broker[brokerName,ip:port] boot success..”，这表明 broker 已成功启动。

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
   $ sh bin/mqadmin updatetopic -n localhost:9876 -t TestTopic -c DefaultCluster
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
            // 接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8080;xxx:8081。
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


5. 在已创建的Java工程中，创建订阅普通消息程序并运行。Apache RocketMQ 支持[SimpleConsumer](../04-featureBehavior/06consumertype.md)和[PushConsumer](../04-featureBehavior/06consumertype.md)两种消费者类型，您可以选择以下任意一种方式订阅消息。

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
            // 接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8081;xxx:8081。
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

## 一些提示
### 1.关于slf4j 
在第5步中，创建发送普通消息的程序并运行时，可能会遇到以下错误`Could not find artifact org.slf4j:slf4j-api:jar:27.0.0-SNAPSHOT`
。这通常意味着Maven无法在其配置的仓库中找到指定的依赖版本，尤其对于SNAPSHOT这样通常不稳定且可能频繁更改的版本。这时候，比较简单的解决方案是试试更早期的正式发布版本。

如果你使用slf4j-api版本2.0.x，还可能会遇到的报错是`SLF4J: No SLF4J providers were found.
SLF4J: Defaulting to no-operation (NOP) logger implementation`，这说明SLF4J在项目中没有找到任何日志实现。 
因为2.0.x版本的SLF4J本身只是一个日志门面（Facade），而不是一个日志实现。
所以解决方案是添加一个日志实现到pom.xml文件中，如slf4j-nop.jar、slf4j-simple.jar、slf4j-reload4j.jar、slf4j-jdk14.jar或logback-classic.jar。以下是一个示例：
```
  <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-simple</artifactId>
      <version>2.0.3</version>
  </dependency>
```
### 2.关于 the broker's disk is full 的问题
当客户端在尝试发送消息时，可能会遇到"InternalErrorException: service not available now. It may be caused by one of the following reasons: the broker's disk is full"。
你可能会疑惑，为什么会收到这样的提示，明明磁盘还有几十个 GB 的空间。这是因为这里的full，指的是空间占用率过高，而不是绝对意义上的空间不够。

如果你使用MAC OS系统，可以在终端运行`df -h` 检查磁盘各个分区的使用情况。
大概率你会发现/System/Volumes/Data这块分区的占用率很高，RocketMQ可能使用的正是这个几乎已满的分区，解决办法就是释放该分区的空间，直到占用率降低到合理的数值。

### 3.java.lang.RuntimeException: Lock failed,MQ already started
如果你已经执行了本文档中的第3步(启动Broker+Proxy)，但在后续过程中遇到了一些难以解决的问题，**一定要运行 第6步(关闭服务器) 来安全地关闭 nameserver 和 broker**。

如果你直接关闭终端强行退出，那么下次再次启动Broker+Proxy时，在broker的日志里，你会看到`Lock failed,MQ already started` 这个错误。
这通常意味着已经有一个RocketMQ Broker 的实例在运行，或者上一次运行的实例异常终止但没有正确释放锁文件。

为了解决这个问题，你需要：
1. 运行`ps aux | grep mqbroker` 确认是否真的有另一个Broker实例正在运行。如果你看到除了当前的grep mqbroker，还有其他无效的mqbroker进程，可以使用`kill`命令终止它。
2. 确认锁文件(lock)的具体地址并删除。

   锁文件位于RocketMQ的运行时数据存储(Store)目录，该目录的位置通常是在Broker的配置文件(也就是broker.conf) 中通过storePathRootDir参数指定的。
   如果没有指定，RocketMQ会使用一个默认的存储路径，该路径依赖于RocketMQ的安装和运行环境：
   ```  
   Linux / macOS：~/store 或 /home/{username}/store。
   Windows：C:\Users\{username}\store。
   ```
   如果你使用MacOS，可以直接在终端中运行以下命令来查找lock文件：
   ```
   find ~/store -name "lock" 2>/dev/null
   ``` 

# Quick Start

This section will describe steps to quickly deploy a RocketMQ cluster with a single node; Commands to send and receive messages to/from it are also included as proof of work.

:::tip SYSTEM REQUIREMENT

1. 64-bit OS，Linux/Unix/macOS is recommended
2. 64-bit JDK 1.8+

:::

## 1.Get Apache RocketMQ

:::tip Download RocketMQ

Apache RocketMQ is distributed both in binary and source packages.  Click [here](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-source-release.zip) to download Apache RocketMQ 5.0.0 source package. You may prefer [prebuilt binary package](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-bin-release.zip), which can be run directly since it has been compiled.

:::

The following instruction takes the application of RocketMQ 5.0.0 source package in Linux environment as an example in order to introduce the installation process of RocketMQ.

Extract the source package of RocketMQ 5.0.0, then compile and build the binary executables:

```shell
$ unzip rocketmq-all-5.0.0-source-release.zip
$ cd rocketmq-all-5.0.0-source-release/
$ mvn -Prelease-all -DskipTests clean install -U
$ cd distribution/target/rocketmq-5.0.0/rocketmq-5.0.0
```
## 2. Start NameServer

After the installation of RocketMQ, start the NameServer:


```shell
### start namesrv
$ nohup sh bin/mqnamesrv &
 
### verify namesrv 
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

:::info
Once we see **'The Name Server boot success..'** from namesrv.log, it means the NameServer has been started successfully.
:::



## 3. Start Broker and Proxy

After nameserver startup, we need start the broker and proxy. We recommend Local deployment mode, where Broker and Proxy are deployed in the same process. We also support cluster deployment mode. Learn more [Deployment introduction](../05-deploymentOperations/15deploy.md).

```shell
### start broker
$ nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &

### verify broker
$ tail -f ~/logs/rocketmqlogs/broker_default.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

:::info

Once we see “The broker[brokerName,ip:port] boot success..” from broker.log, it means the Broker has been started successfully.
:::

:::note

Thus far, a single-Master RocketMQ cluster has been deployed, and we are able to send and receive simple messages by scripts.

:::

## 4. Send and Receive Messages with tools

Before test with tools, we need set the nameserver address to system. like system environment variables `NAMESRV_ADDR`.

``` shell
$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 5. Send and Receive Messages with SDK

We can also try to use the client sdk to send and receive messages.

1. Create a java project.

2. Add sdk dependency to *pom.xml*.

   ```xml
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client-java</artifactId>
       <version>5.0.0</version>
   </dependency> 
   ```

3. Create topic by mqadmin cli tools.

   ```shell
   $ sh bin/mqadmin updatetopic -n localhost:9876 -t TestTopic
   ```

4. In the Java project you have created, create a program that sends messages and run it with the following code:

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
           String endpoint = "localhost:8081";
           String topic = "Your Topic";
           ClientServiceProvider provider = ClientServiceProvider.loadService();
           ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);
           ClientConfiguration configuration = builder.build();
           Producer producer = provider.newProducerBuilder()
                   .setTopics(topic)
                   .setClientConfiguration(configuration)
                   .build();
           Message message = provider.newMessageBuilder()
                   .setTopic(topic)
                   .setKeys("messageKey")
                   .setTag("messageTag")
                   .setBody("messageBody".getBytes())
                   .build();
           try {
               SendReceipt sendReceipt = producer.send(message);
               System.out.println(sendReceipt.getMessageId());
           } catch (ClientException e) {
               e.printStackTrace();
           }
       }
   }
   ```


5. In the Java project you have created, create a consumer demo program and run it. Apache RocketMQ support [SimpleConsumer](../04-featureBehavior/06consumertype.md) and [PushConsumer](../04-featureBehavior/06consumertype.md).

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
           String endpoints = "localhost:8081";
           ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
                   .setEndpoints(endpoints)
                   .build();
   	    String tag = "*";
           FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
   	    String consumerGroup = "Your ConsumerGroup";
           String topic = "Your Topic";
           PushConsumer pushConsumer = provider.newPushConsumerBuilder()
                   .setClientConfiguration(clientConfiguration)
                   .setConsumerGroup(consumerGroup)
                   .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
   		        .setMessageListener(messageView -> {
                       // LOGGER.info("Consume message={}", messageView);
                       System.out.println("Consume message!!");
                       return ConsumeResult.SUCCESS;
                   })
                   .build();
           Thread.sleep(Long.MAX_VALUE);
           //pushConsumer.close();
       }
   }
   ```

## 6. Shutdown Servers

After finishing the practice, we could shut down the service by the following commands.

```shell
$ sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

$ sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```
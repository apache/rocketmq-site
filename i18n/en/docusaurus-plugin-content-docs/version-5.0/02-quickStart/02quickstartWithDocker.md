# Run RocketMQ in Docker

This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker and complete simple message sending and receiving.

:::tip System Requirements

1. 64-bit operating system
2. 64-bit JDK 1.8+

:::

## 1.Pull RocketMQ Image
Here, we take the RocketMQ 5.3.1 version image from [dockerhub](https://hub.docker.com/r/apache/rocketmq/tags) as an example to introduce the deployment process.

```shell
docker pull apache/rocketmq:5.3.1
```

## 2.Create a Shared Network for Containers
RocketMQ involves multiple services and requires multiple containers. Creating a Docker network facilitates communication between containers.

```shell
docker network create rocketmq
```

## 3.Start NameServer

```shell
# Start NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --network rocketmq apache/rocketmq:5.3.1 sh mqnamesrv

# Verify if NameServer started successfully
docker logs -f rmqnamesrv
```
:::info

Once we see **'The Name Server boot success..'** from namesrv.log, it means the NameServer has been started successfully.

:::

## 4.Start Broker and Proxy
After nameserver startup, we proceed to start the Broker and Proxy.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" > broker.conf

# Start the Broker and Proxy
docker run -d \
--name rmqbroker \
--network rocketmq \
-p 10912:10912 -p 10911:10911 -p 10909:10909 \
-p 8080:8080 -p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
-v ./broker.conf:/home/rocketmq/rocketmq-5.3.1/conf/broker.conf \
apache/rocketmq:5.3.1 sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.1/conf/broker.conf

# Verify if Broker started successfully
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/proxy.log"
```
</TabItem>
<TabItem value="Windows" label="Windows">

```code
# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" > broker.conf

# Start the Broker and Proxy
docker run -d ^
--name rmqbroker ^
--net rocketmq ^
-p 10912:10912 -p 10911:10911 -p 10909:10909 ^
-p 8080:8080 -p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" ^
-v %cd%\broker.conf:/home/rocketmq/rocketmq-5.3.1/conf/broker.conf ^
apache/rocketmq:5.3.1 sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.1/conf/broker.conf

# Verify if Broker started successfully
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/proxy.log"
```

</TabItem>

</Tabs>


:::info

Once we see **'The broker[brokerName,ip:port] boot success..'** from proxy.log, it means the Broker has been started successfully.

:::

:::note

Thus far, a single-Master RocketMQ cluster has been deployed, and we are able to send and receive simple messages.

:::

## 5.Send and Receive Messages with SDK

We can also try to use the client sdk to send and receive messages, you can see more details from <a href='https://github.com/apache/rocketmq-clients'>rocketmq-clients</a>.

1. Create a java project.

2. Add sdk dependency to *pom.xml*, remember to replace the `rocketmq-client-java-version` with the <a href='https://search.maven.org/search?q=g:org.apache.rocketmq%20AND%20a:rocketmq-client-java'>latest release</a>.

   ```xml
   <dependency>
       <groupId>org.apache.rocketmq</groupId>
       <artifactId>rocketmq-client-java</artifactId>
       <version>${rocketmq-client-java-version}</version>
   </dependency> 
   ```

3. Enter the broker container and create a Topic using mqadmin.

   ```shell
   $ docker exec -it rmqbroker bash
   $ sh mqadmin updatetopic -t TestTopic -c DefaultCluster
   ```

4. In the created Java project, create and run a program to send a normal message. The sample code is as follows:

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
           // Endpoint address, set to the Proxy address and port list, usually xxx:8080;xxx:8081
           String endpoint = "localhost:8081";
           // The target topic name for message sending, which needs to be created in advance.
           String topic = "TestTopic";
           ClientServiceProvider provider = ClientServiceProvider.loadService();
           ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);
           ClientConfiguration configuration = builder.build();
           // When initializing Producer, communication configuration and pre-bound Topic need to be set.
           Producer producer = provider.newProducerBuilder()
               .setTopics(topic)
               .setClientConfiguration(configuration)
               .build();
           // Sending a normal message.
           Message message = provider.newMessageBuilder()
               .setTopic(topic)
               // Set the message index key, which can be used to accurately find a specific message.
               .setKeys("messageKey")
               // Set the message Tag, used by the consumer to filter messages by specified Tag.
               .setTag("messageTag")
               // Message body
               .setBody("messageBody".getBytes())
               .build();
           try {
               // Send the message, paying attention to the sending result and catching exceptions.
               SendReceipt sendReceipt = producer.send(message);
               logger.info("Send message successfully, messageId={}", sendReceipt.getMessageId());
           } catch (ClientException e) {
               logger.error("Failed to send message", e);
           }
           // producer.close();
       }
   }
   ```

5. In the created Java project, create and run a program to subscribe to normal messages. Apache RocketMQ supports both [SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype) and [PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype) types of consumers. You can choose either method to subscribe to messages.

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
        // Endpoint address, set to the Proxy address and port list, usually xxx:8080;xxx:8081
        String endpoints = "localhost:8081";
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints(endpoints)
            .build();
        // Subscription message filtering rule, indicating subscription to all Tag messages.
        String tag = "*";
        FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
        // Specify the consumer group the consumer belongs to, Group needs to be created in advance.
        String consumerGroup = "YourConsumerGroup";
        // Specify which target Topic to subscribe to, Topic needs to be created in advance.
        String topic = "TestTopic";
        // Initialize PushConsumer
        PushConsumer pushConsumer = provider.newPushConsumerBuilder()
            .setClientConfiguration(clientConfiguration)
            // Set the consumer group
            .setConsumerGroup(consumerGroup)
            // Set pre-bound subscription relationship
            .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
            // Set the message listener
            .setMessageListener(messageView -> {
                // Handle messages and return the consumption result
                logger.info("Consume message successfully, messageId={}", messageView.getMessageId());
                return ConsumeResult.SUCCESS;
            })
            .build();
        Thread.sleep(Long.MAX_VALUE);
        // If PushConsumer is no longer needed, this instance can be closed.
        // pushConsumer.close();
    }
}
```

## 6. Stop the Containers
After completing the experiment, we can stop the containers as follows.
```shell
# Stop the NameServer container
docker stop rmqnamesrv

# Stop the Broker container
docker stop rmqbroker
```
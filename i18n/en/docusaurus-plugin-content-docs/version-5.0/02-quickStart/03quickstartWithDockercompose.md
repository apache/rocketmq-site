# Run RocketMQ with Docker Compose

This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker-compose and complete simple message sending and receiving.

:::tip System Requirements

1. 64-bit operating system
2. 64-bit JDK 1.8+

:::

## 1. Write docker-compose

To quickly start and run the RocketMQ cluster, you can use the following template to create a docker-compose.yml file by modifying or adding configurations in the environment section.

```text
version: '3.8'
services:
  namesrv:
    image: apache/rocketmq:5.3.1
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    networks:
      - rocketmq
    command: sh mqnamesrv
  broker:
    image: apache/rocketmq:5.3.1
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
      - 10912:10912
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    depends_on:
      - namesrv
    networks:
      - rocketmq
    command: sh mqbroker
  proxy:
    image: apache/rocketmq:5.3.1
    container_name: rmqproxy
    networks:
      - rocketmq
    depends_on:
      - broker
      - namesrv
    ports:
      - 8080:8080
      - 8081:8081
    restart: on-failure
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    command: sh mqproxy
networks:
  rocketmq:
    driver: bridge
```

## 2.Start RocketMQ cluster
tart all defined services according to the docker-compose.yml file.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux" label="Linux" default >

```code
docker-compose up -d
```

</TabItem>
<TabItem value="Windows" label="Windows">

```code
docker-compose -p rockermq_project up -d
```

</TabItem>
</Tabs>

## 3.Send and Receive Messages with SDK
1. After testing with tools, we can try to send and receive messages using the SDK. Here is an example of using the Java SDK for message sending and receiving. More details can be found at [rocketmq-clients](https://github.com/apache/rocketmq-clients).

2. Add the following dependency to the pom.xml file to introduce the Java dependency library, replacing `rocketmq-client-java-version` with <a href='https://search.maven.org/search?q=g:org.apache.rocketmq%20AND%20a:rocketmq-client-java'>the latest version</a>.

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
           // The target Topic name for message sending, which needs to be created in advance.
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
               // Message body.
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
3. In the created Java project, create and run a program to subscribe to normal messages. Apache RocketMQ supports both [SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype) and [PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype) types of consumers. You can choose either method to subscribe to messages.

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
            // Set the consumer group.
            .setConsumerGroup(consumerGroup)
            // Set pre-bound subscription relationship.
            .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
            // Set the message listener.
            .setMessageListener(messageView -> {
                // Handle messages and return the consumption result.
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

## 4.Stop all services
```shell
docker-compose down
```

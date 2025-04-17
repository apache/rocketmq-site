# Run RocketMQ with Kubernetes

This section describes how to quickly deploy a single-node RocketMQ 5.x service in a Kubernetes and perform simple message sending and receiving.


:::tip SYSTEM REQUIREMENTS

- A running Kubernetes cluster
- Installed Helm 3.7.0+
- 64-bit JDK 1.8+

:::


## 1.Install Helm

Make sure Helm is installed on your system:

```bash
$ helm version
```

If Helm (version 3.7.0 or above) is not installed, you can install it using the following command:

```bash
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```



## 2.Download RocketMQ Helm Chart

```bash
$ helm pull oci://registry-1.docker.io/apache/rocketmq --version 0.0.1 
$ tar -zxvf rocketmq-0.0.1.tgz
```


## 3.Deploy RocketMQ

Use the Helm chart to deploy RocketMQ.

```yaml
# Modify the configuration in values.yaml
$ vim values.yaml
## values.yaml, adjust memory requests and limits in broker resources according to available memory size ##
  resources:
    limits:
      cpu: 2
      memory: 10Gi
    requests:
      cpu: 2
      memory: 10Gi
##values.yaml##
```

```bash
$ helm install rocketmq-demo ./rocketmq
# Check pod status
# If the parameters are normal, it indicates successful deployment
$ kubectl get pods -o wide -n default
NAME                                        READY   STATUS    RESTARTS       AGE    IP               NODE         NOMINATED NODE   READINESS GATES
rocketmq-demo-broker-0                      1/1     Running   0              6h3m   192.168.58.225   k8s-node02   <none>           <none>
rocketmq-demo-nameserver-757877747b-k669k   1/1     Running   0              6h3m   192.168.58.226   k8s-node02   <none>           <none>
rocketmq-demo-proxy-6c569bd457-wcg6g        1/1     Running   0              6h3m   192.168.85.227   k8s-node01   <none>           <none>
```


## 4.Validate Message Sending and Receiving

Use the JAVA SDK to test message sending and receiving (since the local network and the k8s network are not on the same internal network, you need to package the project locally and run it remotely. After packaging, copy the jar file from the target directory to the target server and execute java -jar jar file name). The specifics are as follows:

1）Create a Java project in IDE.

2）Add the following dependency to the pom.xml file to import the Java library:
```xml
 ...... 
    <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-client-java</artifactId>
            <version>5.0.7</version>
      </dependency>
    .....
```
3）Log into the pod (management tools are needed), or it can also be executed on the host
```bash
# Log into the pod
$ kubectl exec -ti rocketmq-demo-broker-0  -- /bin/bash

# Create Topic using mqadmin tools
$ sh mqadmin updatetopic  -t TestTopic -c DefaultCluster

# Create subscription group using mqadmin tools
$ sh mqadmin updateSubGroup -c DefaultCluster -g TestGroup
```
4）In the created Java project, create a program to send normal messages (ProducerDemo.java); the sample code is as follows:

```java
package com.rocketmq.producer;

import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientConfigurationBuilder;
import org.apache.rocketmq.client.apis.ClientException;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.message.Message;
import org.apache.rocketmq.client.apis.producer.Producer;
import org.apache.rocketmq.client.apis.producer.SendReceipt;

public class ProducerDemo {
    public static void main(String[] args) throws ClientException {
        // The endpoint address, which needs to be set to the address and port list of the Proxy; the following is the proxy address in the k8s environment.
        String endpoint = "192.168.85.227:8081";
        // The target Topic name for sending messages, which needs to be created in advance.
        String topic = "TestTopic";
        ClientServiceProvider provider = ClientServiceProvider.loadService();
        ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);
        ClientConfiguration configuration = builder.build();
        // When initializing the Producer, communication configuration and pre-bound Topic need to be set.
        Producer producer = provider.newProducerBuilder()
            .setTopics(topic)
            .setClientConfiguration(configuration)
            .build();
        // Sending normal messages.
        Message message = provider.newMessageBuilder()
            .setTopic(topic)
            // Set message index key for precise search of a specific message.
            .setKeys("messageKey")
            // Set message Tag for filtering messages based on specific tags on the consumer side.
            .setTag("messageTag")
            // Message body.
            .setBody("messageBody".getBytes())
            .build();
        try {
            // Send the message, you need to pay attention to the sending result and handle failures and other exceptions.
            SendReceipt sendReceipt = producer.send(message);
            System.out.println("Send message successfully, messageId=" + sendReceipt.getMessageId());
        } catch (ClientException e) {
        }
        // producer.close();
    }
}
```

5）In the created Java project, create a program to subscribe to normal messages (Consumer.java). Apache RocketMQ supports [SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype) and [PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype), here we use the PushConsumer.

```java

package com.rocketmq.consumer;

import java.io.IOException;
import java.util.Collections;
import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientException;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.consumer.ConsumeResult;
import org.apache.rocketmq.client.apis.consumer.FilterExpression;
import org.apache.rocketmq.client.apis.consumer.FilterExpressionType;
import org.apache.rocketmq.client.apis.consumer.PushConsumer;
import java.util.List;

public class Consumer {
    public static void main(String[] args) throws ClientException, IOException, InterruptedException {
        final ClientServiceProvider provider = ClientServiceProvider.loadService();
        // The endpoint address, which needs to be set to the address and port list of the Proxy; the following is the proxy address in the k8s environment.
        String endpoints = "192.168.85.227:8081";
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints(endpoints)
            .build();
        // The filter rule for subscribing to messages, indicating subscription to messages of all Tags.
        String tag = "*";
        FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
        // Specify the consumer group to which the consumer belongs; the Group needs to be created in advance.
        String consumerGroup = "TestGroup";
        // Specify which target Topic needs to be subscribed to; the Topic needs to be created in advance.
        String topic = "TestTopic";
        // Initialize PushConsumer, binding to the consumer group ConsumerGroup, communication parameters, and subscription relationship.
        PushConsumer pushConsumer = provider.newPushConsumerBuilder()
            .setClientConfiguration(clientConfiguration)
            // Set consumer group.
            .setConsumerGroup(consumerGroup)
            // Set pre-bound subscription relationship.
            .setSubscriptionExpressions(Collections.singletonMap(topic, filterExpression))
            // Set consumption listener.
            .setMessageListener(messageView -> {
                // Process the message and return the consumption result.
                System.out.println("Consume message successfully, messageId=" + messageView.getMessageId());
                return ConsumeResult.SUCCESS;
            })
            .build();
        Thread.sleep(Long.MAX_VALUE);
        // If you don't need to use PushConsumer anymore, you can close this instance.
        // pushConsumer.close();
    }
}

```

## 5.Release RocketMQ Resources

```bash
#Release all RocketMQ resources
$ helm uninstall rocketmq-demo
```


### QuickStart
本文介绍在kubernetesk环境下如何使用Helm快速部署一个单节点 RocketMQ-5.X 版本的服务，并完成简单的消息收发。

#### 前提条件

- 一个运行中的 `Kubernetes` 集群
- 已安装的 `Helm 3.7.0+ `
- 64位 `JDK 1.8+`

#### 第一步：安装 Helm

确保你的系统上已经安装了 Helm：
```bash
$ helm version
```

如果未安装 Helm（3.7.0以上版本），可以使用以下命令进行安装：
```bash
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

#### 第二步：下载 RocketMQ Helm 仓库

使用 Helm chart 部署 RocketMQ：

```bash
$ cd /opt/helm/
$ helm pull oci://registry-1.docker.io/apache/rocketmq --version 0.0.1
$ tar -zxvf rocketmq-0.0.1.tgz
```

#### 第三步：部署 RocketMQ
使用 Helm chart 部署 RocketMQ：

```yaml
$ vim values.yaml
##values.yaml, 例如将broker中默认-XX:MaxDirectMemorySize=8g等参数修改调整成适宜大小##
  jvmMemory: " -Xms1g -Xmx1g -Xmn512m -XX:MaxDirectMemorySize=1g "
  resources:
    limits:
      cpu: 2
      memory: 4Gi
    requests:
      cpu: 2
      memory: 2Gi
##values.yaml##
```

```bash
$ helm install rocketmq-demo ./rocketmq

#查看pod状态
$ kubectl get pods -o wide -n default
NAME                                        READY   STATUS    RESTARTS       AGE    IP               NODE         NOMINATED NODE   READINESS GATES
rocketmq-demo-broker-0                      1/1     Running   0              6h3m   192.168.58.225   k8s-node02   <none>           <none>
rocketmq-demo-nameserver-757877747b-k669k   1/1     Running   0              6h3m   192.168.58.226   k8s-node02   <none>           <none>
rocketmq-demo-proxy-6c569bd457-wcg6g        1/1     Running   3 (6h2m ago)   6h3m   192.168.85.227   k8s-node01   <none>           <none>
```

#### 第四步：验证消息发送和接收
使用JAVA SDK测试消息收发（由于本地网络和k8s网络不属于同一内网，需要将项目本地打包后放在远程运行），具体如下：

1）IDEA中创建一个Java工程。

2）在 *pom.xml* 文件中添加以下依赖引入Java依赖库：
```xml
 ...... 
    <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-client-java</artifactId>
            <version>5.0.7</version>
      </dependency>
    .....
```
3）使用mqadmin创建 Topic和消费者。
```bash
#登录pod内（需要管理工具），也可以在宿主机执行
$ kubectl exec -ti rocketmq-demo-broker-0  -- /bin/bash

#通过mqadmin创建Topic
$ sh mqadmin updatetopic  -t TestTopic -c DefaultCluster

#通过mqadmin创建消费者Group
$ sh mqadmin updateSubGroup -c DefaultCluster -g TestGroup
```
4）在已创建的Java工程中，创建发送普通消息程序 （ProducerDemo.java），示例代码如下：

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
        // 接入点地址，需要设置成Proxy的地址和端口列表，以下为k8s环境下rocketmq的proxy地址。
        String endpoint = "192.168.85.227:8081";
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
            System.out.println("Send message successfully, messageId="+sendReceipt.getMessageId());
        } catch (ClientException e) {

        }
        // producer.close();
    }
}
```
5）在已创建的Java工程中，创建订阅普通消息程序(Consumer.java)。Apache RocketMQ 支持[SimpleConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)和[PushConsumer](https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype)两种消费者类型 ，这里使用PushConsumers类型。

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
        // 接入点地址，需要设置成Proxy的地址和端口列表，以下为k8s环境下rocketmq的proxy地址。
        String endpoints = "192.168.85.227:8081";
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
                .setEndpoints(endpoints)
                .build();
        // 订阅消息的过滤规则，表示订阅所有Tag的消息。
        String tag = "*";
        FilterExpression filterExpression = new FilterExpression(tag, FilterExpressionType.TAG);
        // 为消费者指定所属的消费者分组，Group需要提前创建。
        String consumerGroup = "TestGroup";
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
                    System.out.println("Consume message successfully, messageId="+ messageView.getMessageId());
                    return ConsumeResult.SUCCESS;
                })
                .build();
        Thread.sleep(Long.MAX_VALUE);
        // 如果不需要再使用 PushConsumer，可关闭该实例。
        // pushConsumer.close();
    }
}
```

#### 第五步：释放rocketmq资源
``` bash
#释放所有rocketmq资源
$ helm uninstall rocketmq-demo
``` 

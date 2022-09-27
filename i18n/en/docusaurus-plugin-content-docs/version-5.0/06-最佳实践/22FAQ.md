# 常见问题解答

以下是关于RocketMQ项目的常见问题

## 1 基本

1. **为什么我们要使用 RocketMQ 而不是选择其他的产品？**

   请参考[为什么要选择RocketMQ](http://rocketmq.apache.org/docs/motivation/)

2. **我是否需要安装其他的软件才能使用 RocketMQ ，例如 ZooKeeper ？**

   不需要，RocketMQ 能够独立的运行。

## 2 使用

1. **新创建的 ConsumerGroup 从哪里开始消费消息？**

   1）5.x SDK，在首次上线时会从服务器中的最新消息开始消费，也就是从队列的尾部开始消费；再次重新启动后，会从最后一次的消费位置继续消费。 

   2）3.x/4.x SDK 则比较复杂，如果首次启动是在发送的消息在三天之内，那么消费者会从服务器中保存的第一条消息开始消费；如果发送的消息已经超过三天，则消费者会从服务器中的最新消息开始消费，也就是从队列的尾部开始消费。再次重新启动后，会从最后一次的消费位置继续消费。

3. **当消费失败的时候如何重新消费消息？**

   1）在集群模式下，消费的业务逻辑代码会返回消费失败状态，或者抛出异常，如果一条消息消费失败，则会按照设置的最大重试次数重试，之后该消息会被丢弃。

   2）在广播消费模式下，广播消费仍然保证消息至少被消费一次，但不提供重发的选项。

4. **当消费失败的时候如何找到失败的消息？**

   1）使用按时间的主题查询，可以查询到一段时间内的消息。

   2）使用主题和消息 ID 来准确查询消息。

   3）使用主题和消息的 Key 来准确查询所有消息 Key 相同的消息。

5. **消息只会被传递一次吗？**

   RocketMQ 确保所有消息至少传递一次。 在大多数情况下，消息不会重复。

6. **如何增加一个新的 Broker ？**

   1）启动一个新的 Broker 并将其注册到NameServer 中的 Broker 列表里。

   2）默认只自动创建内部系统 Topic 和 Consumer Group。 如果您希望在新节点上拥有您的业务主题和消费者组，请从现有的 Broker 中复制它们。 我们提供了管理工具和命令行来处理此问题。

## 3 配置相关

以下回答均为默认值，可通过配置修改。

1. **消息在服务器上可以保存多长时间？**

   存储的消息将最多保存 3 天，超过 3 天未使用的消息将被删除。

2. **消息体的大小限制是多少？**

   通常是256KB

3. **怎么设置消费者线程数？**

   当你启动消费者的时候，可以设置属性。不同版本的参数名不一样。

## 4 错误

1. **APPLY_TOPIC_URL**

   - **异常信息**

     ```java
     topic[xxx] not exist, apply first please!
     ```

   - **原因**

     1）Producer 发送消息或 Consumer 消费消息时，根据 Topic 获取路由信息失败，会出现这个异常。

   - **解决方案**

     1）确保 NameServer 确实包含 Topic 的路由信息。 您可以使用管理工具或 Web 控制台通过 TopicRoute 从 NameServer 查询路由信息；

     2）确保 Broker 和 Consumer 连接的是同一 NameServer 集群；

     3）确保主题的队列权限，对 Producer 是6(rw-)，或对 Consumer 至少是2(-w-)；

     如果找不到此主题，请通过管理工具命令 updateTopic 或 Web 控制台在 Broker 上创建它。

2. **NAME_SERVER_ADDR_NOT_EXIST_URL**

   - **异常信息**

     ```java
     No name server address, please set it
     ```
      或
     ```java
     connect to xxx failed, maybe the domain name xxx not bind in /etc/hosts
     ```

   - **原因**

     1）Producer 或 Consumer，获取 NameServer 地址信息异常。

   - **解决方案**

     1）请参考：[5.1 客户端寻址方式](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

3. **GROUP_NAME_DUPLICATE_URL**

   - **异常信息**

     ```java
     The producer group[xxx] has been created before, specify another name please.
     ```

   - **原因**

     1）相同名称的 Consumer Group 已经启动，注册失败。

   - **解决方案**

     1）新 Consumer Group 重命名；

     2）相同名称的 Consumer Group 正常关闭后，再启动；

4. **CLIENT_PARAMETER_CHECK_URL**

   - **异常信息**

     ```java
     consumerGroup can not equal ...
     ```
     或
     ```java
     allocateMessageQueueStrategy is null ...
     ```
     或
     ```java
     Long polling mode, the consumer consumerTimeoutMillisWhenSuspend must greater than brokerSuspendMaxTimeMillis ...
     ```

     除此之外，还有其他异常，不再一一列举。

   - **原因**

     1）Consumer 参数校验失败。

   - **解决方案**

     1）请参考： [5.2 客户端配置](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

5. **SUBSCRIPTION_GROUP_NOT_EXIST**

   - **异常信息**

     ```java
     subscription group not exist
     ```

   - **原因**

     1）Consumer Group 或 DleayQueue 获取订阅信息异常。

   - **解决方案**

     1）确保 Consumer 订阅 Topic 信息与 NameServer 中存在的 Topic 信息一致；

     2）确保 Broker 和 Consumer 连接的是同一 NameServer 集群；

     3）确保 Topic 的队列权限，对 Producer 是 6(rw-)，或对 Consumer 至少是 2(-w-)；

6. **CLIENT_SERVICE_NOT_OK**

   - **异常信息**

     ```java
     The xxx service state not OK, maybe started once
     ```

   - **原因**

     1）使用同一个 Producer/Consumer Group 在同一个JVM中启动多个 Producer/Consumer 实例可能会导致客户端无法启动。

   - **解决方案**

     1）确保一个 Producer/Consumer Group 对应的 JVM 只启动一个 Producer/Consumer 实例。

7. **NO_TOPIC_ROUTE_INFO**

   - **异常信息**

     ```java
     No route info of this topic:
     ```

   - **原因**

     1）将消息发送到一个路由信息对生产者不可用的主题时，就会发生这种情况。

   - **解决方案**

     1）确保生产者可以连接到名称服务器并且能够从中获取路由元信息；

     2）确保名称服务器确实包含主题的路由元信息。 您可以使用管理工具或 Web 控制台通过 TopicRoute 从名称服务器查询路由元信息；

     3）确保您的 Broker 将心跳发送到您的生产者正在连接的同一 NameServer 列表；

     4）确保主题的权限为6(rw-)，或至少为2(-w-)；

     如果找不到此主题，请通过管理工具命令updateTopic或Web控制台在Broker上创建它。

8. **LOAD_JSON_EXCEPTION**

   - **异常信息**

     ```java
     readLocalOffset Exception
     ```

   - **原因**

     1）消费者在广播模式下，加载本地 offsets.json 文件异常；

     2）损坏的 fastjson 文件也会导致同样的问题；

   - **解决方案**

     1）检查 fastjson 版本和 RocketMQ 使用版本是否一致；

     2）升级 fastjson 版本；

9. **SAME_GROUP_DIFFERENT_TOPIC**

   - **异常信息**

     ```java
     the consumer's group info/subscription not exist
     ```
   - **原因**
     1）Consumer 订阅 Topic 信息不存在.
   - **解决方案**
     1）检查 Consumer 所在的 Consumer Group 是否存在；
     2）检查 Consumer 订阅 Topic 是否存在；
10. **MQLIST_NOT_EXIST**
    - **异常信息**
      ```java
      Can not find Message Queue for this topic
      ```
    - **原因**
      1）对于Producer，根据 Topic 未能获取对应的 Queue 信息。
    - **解决方案**
      1）确保 Topic 已经正确配置 Queue 信息；
      2）确保 Topic 对应的 Queue 至少有2(-w-)权限；
11. **SEND_MSG_FAILED**
    - **异常信息**
      ```java
      Send [xxx] times, still failed, cost [xxx]ms, Topic: xxx, BrokersSent ...
      ```
    - **原因**
      1）Producer 消息发送异常。同步（SYNC）方式共发送3次，异步（ASYNC）和单向（ ONEWAY）发送1次。
    - **解决方案**
      1）Producer 发送消息，超时参数是否过小；
      2）确保 Broker 正常；
      3）确保 Producer 和 Broker 连接是否正常
12. **UNKNOWN_HOST_EXCEPTION**
    - **异常信息**
      ```java
      InetAddress java.net.InetAddress.getLocalHost() throws UnknownHostException
      ```
    - **原因**
    
      1）主机可能有很多网络接口，并且一个接口可能绑定到多个IP地址。
    
    - **解决方案**
    
      1）确保 host 对应的 IP 能够正常访问，使用 Ping 等网络命令检查网络情况；
      
      
## 5 其他  
1. Broker崩溃以后有什么影响？
   
   1）Master节点崩溃
   
   消息不能再发送到该 Broker 集群，但是如果您有另一个可用的 Broker 集群，那么在主题存在的条件下仍然可以发送消息。消息仍然可以从 Slave 节点消费。
   
   2）一些Slave节点崩溃
   
   只要有另一个工作的 Slave，就不会影响发送消息。 对消费消息也不会产生影响，除非消费者组设置为优先从该Slave消费。 默认情况下，消费者组从 Master 消费。
   
   3）所有 Slave 节点崩溃
   
   向 Master 发送消息不会有任何影响，但是，如果 Master是 SYNC_MASTER，Producer会得到一个 SLAVE_NOT_AVAILABLE ，表示消息没有发送给任何 Slave。 对消费消息也没有影响，除非消费者组设置为优先从 Slave 消费。 默认情况下，消费者组从 Master 消费。
# FAQs

Common questions about the RocketMQ project:

## 1 Basic

1. **Why should we use RocketMQ instead of choosing other products?**

   Please refer to[ why choose RocketMQ](http://rocketmq.apache.org/docs/motivation/)

2. **Do I need to install any other software in order to use RocketMQ, such as ZooKeeper?**

   No，RocketMQ can run on independent。

## 2 Use

1. **Where does the newly created ConsumerGroup start consuming messages?**

   1）When the 5.x SDK is first online, it will consume from the latest message on the server, starting from the tail of the queue. After restarting again, it    will continue to consume from the last consumption position.

   2）The 3.x/4.x SDK is more complicated. If the first start is within three days of the sent message, the consumer will start consuming from the first saved message on the server. If the sent message is more than three days, the consumer will start consuming from the latest message on the server, starting from the tail of the queue. After restarting again, it will continue to consume from the last consumption position.

2. **When consumption fails, how can the message be consumed again?**

   1）In cluster mode, the consumption business logic code will return a consumption failure status, or throw an exception. If a message consumption fails, it will be retried according to the maximum retry count set, and then the message will be discarded.

   2）In broadcast consumption mode, broadcast consumption still guarantees that the message is consumed at least once, but does not provide resend options.

3. **When consumption fails, how can the failed message be found?**

   1）Using a time-based topic query can query messages within a period of time.

   2）Use the topic and message ID to accurately query the message.

   3）Use the topic and message Key to accurately query all messages with the same message Key.

4. **Is the message only delivered once?**

   RocketMQ ensures that all messages are delivered at least once. In most cases, messages are not repeated.

5. **How can a new Broker be added?**

   1）Start a new Broker and register it in the Broker list of the NameServer.

   2）By default, only internal system Topics and Consumer Groups are automatically created. If you want to have your business topic and consumer group on the new node, copy them from the existing Broker. We provide management tools and command line to handle this.

## 3 Configuration dependent

The following answers are default values, which can be modified through configuration.

1. **How long can messages be saved on the server?**

   Messages will be stored for a maximum of 3 days. Messages that have not been used for more than 3 days will be deleted.

2. **What is the size limit for message bodies?**

   Typically, it is 256KB.

3. **How do you set the number of consumer threads?**

   When you start the consumer, you can set the property. The parameter name varies by version.

## 4 Error

1. **APPLY_TOPIC_URL**

   - **exception information**

     ```java
     topic[xxx] not exist, apply first please!
     ```

   - **reason**

     1）When a Producer sends a message or a Consumer consumes a message, this exception will occur if the routing information for the Topic cannot be obtained.

   - **solution**

     1）Make sure that the NameServer indeed contains the routing information for the Topic. You can use the management tool or the Web console to query the routing information from the NameServer through the TopicRoute;

     2）Make sure that the Broker and Consumer are connected to the same NameServer cluster;

     3）Make sure that the queue permissions for the topic are 6 (rw-) for the Producer or at least 2 (-w-) for the Consumer;

     If the topic cannot be found, create it on the Broker through the management tool command updateTopic or the Web console.

2. **NAME_SERVER_ADDR_NOT_EXIST_URL**

   - **exception information**

     ```java
     No name server address, please set it
     ```

      or

     ```java
     connect to xxx failed, maybe the domain name xxx not bind in /etc/hosts
     ```

   - **reason**

     1）Producer or Consumer, there is an error in obtaining the NameServer address information.

   - **solution**

     1）Please refer to：[5.1 Client addressing](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

3. **GROUP_NAME_DUPLICATE_URL**

   - **exception information**

     ```java
     The producer group[xxx] has been created before, specify another name please.
     ```

   - **reason**

     1）A Consumer Group with the same name has already been started and registration failed.

   - **solution**

     1）Rename a new Consumer Group.

     2）A Consumer Group with the same name was normally closed and then started again.

4. **CLIENT_PARAMETER_CHECK_URL**

   - **exception information**

     ```text
     consumerGroup can not equal ...
     ```

     or

     ```java
     allocateMessageQueueStrategy is null ...
     ```

     or

     ```java
     Long polling mode, the consumer consumerTimeoutMillisWhenSuspend must greater than brokerSuspendMaxTimeMillis ...
     ```

     In addition to the above exceptions, there may be other exceptions that are not listed here.

   - **reason**

     1）Consumer parameter verification failed.

   - **solution**

     1）Please refer to： [5.2  Client configuration](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

5. **SUBSCRIPTION_GROUP_NOT_EXIST**

   - **exception information**

     ```java
     subscription group not exist
     ```

   - **reason**

     1）If the Consumer Group or DleayQueue encounters an error while getting subscription information.

   - **solution**

     1）Ensure the Consumer's subscription to the Topic information is consistent with the Topic information in the NameServer.

     2）Make sure the Broker and Consumer are connected to the same NameServer cluster.

     3）Ensure the queue permissions for the Topic are 6 (rw-) for the Producer, or at least 2 (-w-) for the Consumer

6. **CLIENT_SERVICE_NOT_OK**

   - **exception information**

     ```java
     The xxx service state not OK, maybe started once
     ```

   - **reason**

     1）Starting multiple Producer/Consumer instances in the same JVM using the same Producer/Consumer Group may cause the client to fail to start.

   - **solution**

     1）Make sure only one Producer/Consumer instance is started for a given Producer/Consumer Group JVM.

7. **NO_TOPIC_ROUTE_INFO**

   - **exception information**

     ```java
     No route info of this topic:
     ```

   - **reason**

     1）If a message is sent to a topic that is not available to the producer，that's what happens.

   - **solution**

     1）Ensure the producer is able to connect to the name server and retrieve routing metadata from it.

     2）Ensure the name server contains routing metadata for the topic. You can use a management tool or the Web console to query the routing metadata from the name server using TopicRoute.

     3）Make sure your Broker is sending heartbeats to the same NameServer list that your producer is connected to.

     4）Ensure the topic has permission 6 (rw-), or at least 2 (-w-).

     If the topic is not found, create it on the Broker via the management tool command updateTopic or the Web console.

8. **LOAD_JSON_EXCEPTION**

   - **exception information**

     ```java
     readLocalOffset Exception
     ```

   - **reason**

     1）In broadcast mode, consumers have an error when loading the local offsets.json file.

     2）A damaged fastjson file can also cause the same problem.

   - **solution**

     1）Check if the fastjson version and RocketMQ version in use are consistent.

     2）Upgrade fastjson version.

9. **SAME_GROUP_DIFFERENT_TOPIC**

   - **exception information**

     ```java
     the consumer's group info/subscription not exist
     ```

   - **reason**
     1）Consumer subscription to Topic information does not exist.

   - **solution**
     
     1）Check if the Consumer Group where the Consumer belongs exists.
     
     2）Check if the Topic subscribed to by the Consumer exists.

10. **MQLIST_NOT_EXIST**

    - **exception information**

      ```java
      Can not find Message Queue for this topic
      ```

    - **reason**
      1）For the Producer, the corresponding Queue information could not be obtained based on the Topic.

    - **solution**
      
      1）Ensure that the Queue information has been correctly configured for the Topic.
      
      2）Ensure that the Queue corresponding to the Topic has at least 2 (-w-) permissions.

11. **SEND_MSG_FAILED**

    - **exception information**

      ```java
      Send [xxx] times, still failed, cost [xxx]ms, Topic: xxx, BrokersSent ...
      ```

    - **reason**
      1）The Producer message sending is abnormal. A total of 3 times are sent in SYNC mode, and 1 time is sent in ASYNC and ONEWAY.

    - **solution**
      1）Whether the timeout parameter of the Producer sending message is too small.
      
      2）Ensure that the Broker is normal.
      
      3）Ensure that the connection between the Producer and Broker is normal.

12. **UNKNOWN_HOST_EXCEPTION**

    - **exception information**

      ```java
      InetAddress java.net.InetAddress.getLocalHost() throws UnknownHostException
      ```

    - **reason**

      1）There may be many network interfaces on the host, and one interface may be bound to multiple IP addresses.

    - **solution**

      1）Ensure that the IP corresponding to the host can be accessed normally, and use network commands such as Ping to check the network situation.

      

## 5 Others  

1. What is the impact of the Broker crashing？

   1）Master node crashes

   Messages can no longer be sent to the Broker cluster, but if you have another available Broker cluster, messages can still be sent as long as the topic exists. Messages can still be consumed from the Slave node.

   2）Some Slave nodes crash

   Sending messages will not be affected as long as there is another working Slave. Consuming messages will not be affected unless the consumer group is set to consume from the Slave first. By default, the consumer group consumes from the Master.

   3）All Slave nodes crash

   Sending messages to the Master will not be affected, but if the Master is SYNC_MASTER, the Producer will get a SLAVE_NOT_AVAILABLE indicating that the message was not sent to any Slave. Consuming messages will not be affected unless the consumer group is set to consume from the Slave first. By default, the consumer group consumes from the Master.
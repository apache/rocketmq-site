# FAQs

The following are frequently asked questions about the RocketMQ project

## 1 Basics

1. **Why should we use RocketMQ instead of another product？**

   Please refer to the[Why RocketMQ](http://rocketmq.apache.org/docs/motivation/)

2. **Do I need to install any other software to use RocketMQ, e.g. ZooKeeper ？**

   No, RocketMQ can run independently.

## 2 Use

1. **Where does the newly created Consumer ID start consuming messages？**

   1）If the message sent is within three days, the consumer starts consuming the first message saved in the server.

   2）If the message sent is more than three days old, the consumer starts consuming the latest message in the server, which is at the end of the queue.

   3）If the consumer restarts, it starts consuming messages from the last consumption location.

2. **How do you re-consume messages when consumption fails?**

   1）In cluster mode, the consumed business logic code is returning Action.ReconsumeLater，NULL，or throw an exception，If a message fails to be consumed, it is retried up to 16 times, after which the message is discarded.

   2）In broadcast consumption mode, broadcast consumption still guarantees that the message will be consumed at least once, but does not provide the option to resend it.

3. **How to find the failure message when consume fails?**

   1）Using subject queries by time, you can query messages over a period of time。

   2）Use the subject and message ID to accurately query the message.

   3）Use the subject and message key to query exactly for messages with the same key across all messages.

4. **Will the message be delivered only once?**

   RocketMQ ensures that all messages are delivered at least once. In most cases, the message will not be repeated.

5. **How do I add a new Broker?**

   1）Start a new Broker and register it with the list of brokers in NameServer.

   2）By default, only internal system Topic and Consumer Group are automatically created. If you want to have your business topics and consumer groups on the new node, copy them from an existing Broker. We provide administrative tools and the command line to handle this.

## 3 Configuration

The following answers are the default values and can be modified through configuration.

1. **How long messages can be kept on the server？**

   Stored messages will be kept for a maximum of 3 days, and unused messages will be deleted after that.

2. **What is the size limit for the message body?**

   It is usually 256 KB

3. **How to set the number of consumer threads?**

   You can set the value of the ConsumeThreadNums property when you start the consumer，e.g.

   ```java
   consumer.setConsumeThreadMin(20);
   consumer.setConsumeThreadMax(20);
   ```

## 4 Error

1. **APPLY_TOPIC_URL**

    - **Error message**

      ```java
      topic[xxx] not exist, apply first please!
      ```

    - **Cause**

      1）This exception occurs when the Producer fails to obtain routing information according to the Topic when sending or consuming messages.

    - **Solution**

      1）Make sure that NameServer does contain routing information for the Topic. You can use the management tool or the Web console to query routing information from NameServer through TopicRoute;

      2）Ensure that the Broker and Consumer are connected to the same NameServer cluster;

      3）Ensure that the queue permissions of the topic are 6(rw-) for the Producer, or at least 2(-w-) for the Consumer;

      If this topic cannot be found, create it on the Broker with the administrative tool command updateTopic or the Web console.

2. **NAME_SERVER_ADDR_NOT_EXIST_URL**

    - **Error message**

      ```java
      No name server address, please set it
      ```
      or
      ```java
      connect to xxx failed, maybe the domain name xxx not bind in /etc/hosts
      ```

    - **Cause**

      1）The Producer or Consumer fails to obtain NameServer address information.

    - **Solution**

      1）Please refer to the：[5.1 Client addressing mode](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

3. **GROUP_NAME_DUPLICATE_URL**

    - **Error message**

      ```java
      The producer group[xxx] has been created before, specify another name please.
      ```

    - **Cause**

      1）The Consumer Group with the same name has been started, but the registration fails.

    - **Solution**

      1）New Consumer Group renamed;

      2）After a Consumer Group with the same name is closed, it can be started again.

4. **CLIENT_PARAMETER_CHECK_URL**

    - **Error message**

      ```java
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

      In addition, there are other exceptions, will not list them all.

    - **Cause**

      1）The Consumer parameter verification fails. 

    - **Solution**

      1）Please refer to the： [5.2 Client Configuration](https://github.com/apache/rocketmq/blob/develop/docs/cn/best_practice.md )

5. **SUBSCRIPTION_GROUP_NOT_EXIST**

    - **Error message**

      ```java
      subscription group not exist
      ```

    - **Cause**

      1）The Consumer Group or DelayQueue can't obtain subscription information.

    - **Solution**

      1）Ensure that the Consumer subscription Topic information is consistent with the existing Topic information in NameServer.

      2）Ensure that the Broker and Consumer are connected to the same NameServer cluster;

      3）Ensure that the queue permissions of the Topic are 6(rw-) for the Producer, or at least 2(-w-) for the Consumer;

6. **CLIENT_SERVICE_NOT_OK**

    - **Error message**

      ```java
      The xxx service state not OK, maybe started once
      ```

    - **Cause**

      1）Starting multiple Producer/Consumer instances in the same JVM using the same Producer/Consumer Group may cause the client to fail to start.

    - **Solution**

      1）Ensure that the JVM corresponding to a Producer/Consumer Group starts only one Producer/Consumer instance.

7. **NO_TOPIC_ROUTE_INFO**

    - **Error message**

      ```java
      No route info of this topic:
      ```

    - **Cause**

      1）This occurs when a message is sent to a topic whose routing information is not available to the producer.

    - **Solution**

      1）Ensure that producers can connect to NameServer and get routing meta-information from it;

      2）Make sure that NameServer does contain the routing meta-information for the topic. You can use the TopicRoute management tool or the Web console to query routing meta information from NameServer.

      3）Make sure that your Broker sends heartbeats to the same NameServer list that your producers are connecting to;

      4）Ensure that the subject has permissions of 6(rw-), or at least 2(-w-);

      If this topic cannot be found, create it on the Broker with the administrative tool command updateTopic or the Web console.

8. **LOAD_JSON_EXCEPTION**

    - **Error message**

      ```java
      readLocalOffset Exception
      ```

    - **Cause**

      1）The consumer failed to load the local offset.json file in broadcast mode.

      2）Corrupted fastjson files can cause the same problem;

    - **Solution**

      1）Check that the fastjson version is the same as the RocketMQ version.

      2）Update fastjson version;

9. **SAME_GROUP_DIFFERENT_TOPIC**

    - **Error message**

      ```java
      the consumer's group info/subscription not exist
      ```
    
    - **Cause**
   
      1）Consumer subscription Topic information does not exist.

    - **Solution**

    1）Check whether the Consumer Group to which the Consumer belongs exists.
    2）Check whether the Consumer subscription Topic exists;

10. **MQLIST_NOT_EXIST**

    - **Error message**
    
      ```java
      Can not find Message Queue for this topic
      ```
      
    - **Cause**
    
      1）For the Producer, the corresponding Queue information cannot be obtained according to the Topic.
    
    - **Solution**
    
      1）Ensure that Queue information is correctly configured for the Topic.
      2）Ensure that the Queue corresponding to the Topic has at least 2(-w-) permissions;
    
11. **SEND_MSG_FAILED**

    - **Error message**
    
      ```java
      Send [xxx] times, still failed, cost [xxx]ms, Topic: xxx, BrokersSent ...
      ```
      
    - **Cause**
    
      1）The Producer message is incorrectly sent. A total of three times are sent in SYNC mode and one time is sent in ASYNC and ONEWAY mode.
    
    - **Solution**
    
      1）The Producer sends messages and whether the timeout parameter is too small.
      2）Ensure that the Broker is working properly;
      3）Ensure that the Producer and Broker are properly connected
    
12. **UNKNOWN_HOST_EXCEPTION**

    - **Error message**
      ```java
      InetAddress java.net.InetAddress.getLocalHost() throws UnknownHostException
      ```
    - **Cause**

      1）A host may have many network interfaces, and an interface may be bound to multiple IP addresses.

    - **Solution**

      1）Ensure that the IP address corresponding to host can be accessed properly. Run the Ping command to check the network status.


## 5 Others

1. What are the effects of Broker crashes？

   1）The Master node crashes

   Messages can no longer be sent to this cluster of brokers, but if you have another cluster of brokers available, messages can still be sent in the presence of a topic. Messages can still be consumed from the Slave node.

   2）Some Slave nodes crashed

   As long as there is another working Slave, sending messages is not affected. Consumption messages are also not affected unless the consumer group is set to consume from this Slave preferentially. By default, the consumer group consumes from the Master.

   3）All Slave nodes crash

   Sending messages to the Master has no effect; however, if the Master is SYNC_MASTER, the Producer gets a SLAVE_NOT_AVAILABLE, indicating that the message is not being sent to any slaves. Consumption messages are also unaffected unless the consumer group is set to consume from the Slave preferentially. By default, the consumer group consumes from the Master.
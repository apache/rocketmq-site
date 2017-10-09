---
title: "The RoadMap of Apache RocketMQ"
permalink: /docs/roadmap/
modified: 2017-3-7T15:01:43-04:00
---

## 4.1.0~4.3.0-incubating RoadMap: 


### OpenMessaging 
OpenMessaging, which includes the establishment of industry guidelines and messaging, streaming specifications to provide a common framework for finance, e-commerce, IoT and big-data area. The design principles are the cloud-orientedness, simplicity, flexibility, and language independency in distributed heterogeneous environments. Conformance to these specifications allows the development of a heterogeneous messaging applications across all major platforms and operating systems. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-17)


{% include toc %} 


### Message Filtering 
So far, RocketMQ only supports message filtering feature by `TAG`, but one message can only own one tag, which is too limited to meet complex business requirements.


So, we want to define and implement a reasonable filter language based on a subset of the SQL 92 expression syntax to support customized message filtering. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-121) 


### Batch Messaging 

In order to use RocketMQ in big data related scenarios, batch messaging is necessary and will bring million-level TPS for RocketMQ. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-80), [PR](https://github.com/apache/rocketmq/pull/53)

### Consistent Hash Allocate Strategy(CHAS) 

Consumer clients use the average allocate strategy by far, which is very sensitive when clients register or unregister continuously.

A Consistent Hash allocate strategy is valuable for developers who care more about stabilization than averaging.

So we decided to support CHAS as an extra choice in consumer load balancing. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-67), [PR](https://github.com/apache/rocketmq/pull/67)

### Global Order Messaging 

As we know, messages in the same queue can be consumed sequentially. So we always send the congeneric messages to the same queue to guarantee ordering, which will cause hot-point issue. 

So it'd be cool if we can support a new global order messaging mechanism without the hot-point problem. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-122)

### Distributed Transaction Messaging 
Undoubtedly, transaction messaging is frequently used in most business.

But users have to implement transaction mechanism by themselves for now, so there is a potential need of a database implementation to solve the problem.
 
Now we can support distributed transaction messaging to make it convenient for the users and help them handle complex business. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-123)

### Non-Redundant Message Delivery Mechanism 

The duplicated messages will impose extra cost if user needs non-repeating messages.

In most cases, user needs to store the consume records to determine if a message is duplicated, and the store stage should guarantee consistency. So we need to support a strict and non-redundant message delivery mechanism. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-124)

### Intellective HA Architecture 

RocketMQ uses master-slave as HA architecture, which has low latency and high throughput, but this program needs human intervention to recover from abnormal situations.
  
So, we want to support a multi-replication high availability／reliability mechanism, without human intervention. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-125) 

### Docker Image 
Provide a docker image for easy deployment and management, optimize for the latest version. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-126) 

### MQTT 
MQTT is a machine-to-machine (M2M)/"Internet of Things" connectivity protocol, which has been widely used in IoT. Support MQTT, give RocketMQ the power to connect everything. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-127) 

## 4.4.0+ RoadMap: 

1. Support more application layer protocol: WebSocket, HTTP2, etc. 
2. Support more native language SDK: PHP, Python, .Net, Node, Go, etc. The chosen programming languages are based on the investigation of many cloud platforms.
3. Support advanced message queuing protocol(AMQP). 

## RocketMQ Externals 

RocketMQ, as a message-oriented middleware, plays a connector role in distributed environment, so in order to embrace the ecological preferably, RocketMQ community needs a series of external projects to integrate with other excellent projects. 

1. rocketmq-console, provide a ops dashboard for RocketMQ. [REPO](https://github.com/apache/rocketmq-externals/tree/master/rocketmq-console) 
2. rocketmq-jms, provide a new client to support JMS 2.0. [REPO](https://github.com/apache/rocketmq-externals/tree/master/rocketmq-jms) 
3. rocketmq-flume-ng, integrate RocketMQ with Apache Flume.[REPO](https://github.com/apache/rocketmq-externals/tree/master/rocketmq-flume), [FLUME-JIRA](https://issues.apache.org/jira/browse/FLUME-3058) 
4. rocketmq-storm, integrate RocketMQ with storm. [REPO](https://github.com/rocketmq/rocketmq-storm) 
5. rocketmq-ignite, integrate RocketMQ with ignite. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-41), [IGNITE-JIRA](https://issues.apache.org/jira/browse/IGNITE-4539) 
6. rocketmq-spark, integrate RocketMQ with spark. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-81) 
7. rocketmq-flink, integrate RocketMQ with flink. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-82) 
8. rocketmq-distributedlog integrate RocketMQ with distributedlog. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-21) 
9. rocketmq-spring, provide a adapter for spring and spring-boot. [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ-120) 

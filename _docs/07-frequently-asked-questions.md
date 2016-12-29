---
title: "Frequently Asked Questions"
permalink: /docs/faq/
modified: 2016-12-27T15:18:43-04:00
---
The following questions are frequently asked with regard to the RocketMQ project in general. If you have further questions, make sure to consult the documentation or ask the community.

{% include toc %}
 
## General
### 1. Why create rocketmq project instead of selecting other products?
In some cases, slower consumers can slow down the producers. We tried our best efforts to handle this problems through throttling, circuit breaker or degradation, but it cannot scale out gracefully. So we begin to focus on the popular messaging solution Kafka at that time. Unfortunately, Kafka can not meet our requirements such as low latency and high reliability. So we decided to innovate a new messaging middleware to handle a broad set of use cases, ranging from traditional publish/subscribe scenario to demandingly high volume realtime transaction system that tolerates no message loss.

### 2. Do I have to install other softewares, such as zookeeper, to use RocketMQ?
No. RocketMQ can run without any other softeware, you can run broker server and name server indepentently. Aslo, the topic can be created by using command, such as sh mqadmin updatetopic etc. After creating successfully, you enjoy yourself with RocketMQ.

## Usage
### 1. Where does the newly created Consumer ID start consuming messages?
 
1. If the topic sends a message within three days, then the consumer start consume message from the first message saved in the server.
2. If the topic sends a message in three days ago, the consumer start consume message from the latest message in the server, in other words, starting to consume the message queue tail.
3. If such consumer is the second reboot, then start to consumer message from the last consumption location.

### 2. How to reconsume message when consumption fails?
	1.Cluster consumption pattern
	The consumer business logic code return Action.ReconsumerLater, or NULL, or throws an exception, the message will go up to 16 times retry procedure, if still fail to retry 16 times, then such message descarded.
	
	2.Broadcast consumption pattern
	The broadcaset consumption still ensures that a message is consumered at least once, but it is consumed fail without retry.
	

### 3. How to deal with consume message failed?

1. Use topic query by the time range, you can query to a period of time Topic received all the messages.
2. Using Topic and Message Id to accurately query the message.
3. Using Topic and Message Key accurately query a class of messages with the same Message Key.


### 4. Delivery exactly once?

In most cases, the message is not repeated. As a distributed message middleware, in the network jitter, application processing timeout and other abnormal circumstances, can not guarantee that the message is not repeated, but can ensure that the message is not lost.

### 5. How to add a new broker?

1. Start up a new broker and make it register to the same list of name servers.
2. On default, only internally system topics and consumer groups are created automatically. If you would like to have your business topic and consumer groups on the new node, remember to replicate them from the existing broker. You may turn to admin tool command to achieve this.

## Configuration related
### 1. How long the message is saved on the server?

Stored messages are saved for up to 3 days, and messages that are not consumed for more than 3 days will be deleted.

### 2. What is the length limit for message Body?
Generally 256KB, but can be modified by configuration.

### 3. How to set the number of consumer threads?
When you start Consumer, set a ConsumeThreadNums property, example as follow.

    properties.put(PropertyKeyConst.ConsumeThreadNums,20);

## Errors
### 1. Start producer or consumer failed and producer group or consumer repeat?
Reason：In the same JVM inside using the same Producer ID/Consumer ID launched multiple instances of Producer/Consumer, it may cause the client to start failure.

Solution: Ensure that a JVM corresponds to a Producer ID/Consumer ID starts only with a Producer/Consumer instance.

### 2. In broadcast mode, consumer start loading json file failed?
Reason: Fastjson version is too low to cause the broadcast consumer to load a local offsets.json file failed, which causing the consumer boot failure.

Solution: Fastjson version will be upgraded to rocketmq client dependent version, to ensure that the local offsets.json can be normal loading. By default offsets.json file is in /home/{user}/.rocketmq_offsets.

### 3. What if a broker crashes?
    
    1. Master crashes
       Messages can no longer be sent to this broker set, but if you have another broker set available, messages can be still sent there given the topic is present.Messages can still be consumed from slaves.
    2. One slaves crashes
       As long as there is another working slave, no impact on writing messages;No impact on consuming messages except when the consumer group is set to consume from this slave preferably. By default, it is from master.
    3. All slaves crash
       No impact on writing messages on master, but if master is a SYNC_MASTER, the producer will get a result of SLAVE_NOT_AVAILABLE indicating that the message is not replicated to any slaves.No impact on consuming messages except that if the consumer group is set to consume from slave preferably. By default, it is from master.

### 4. Producer complains "No Topic Route Info", how to diagnose?
This happens when you are trying to send message to a topic whose route info is not available to the producer.
	
1. Confirm the producer can connect to a name server and capable of fetching routing meta info from it.
2. Confirm that name servers do contain routing meta info of the topic. You may query the routing meta info from name server through topicRoute of admin tools or web console.
3. Confirm your brokers are sending heartbeats to the same list of name servers your producer is connecting to.
4. Confirm that the topic's perm is 6(rw-), or at least 2(-w-).

If you can't find this topic, create it via admin tools command updateTopic or web console on a broker. 


## Features
### 1. What kind of consumption pattern does RocketMQ provide?
In RocketMQ, it providers two types of consumption patterns, such as Clustering consumption patterns and broadcasting consumption patterns. See the documentation on cluster patterns for details.

### 2. How many kinds of message type are supported?
There are several types of messages that are currently supported in rocketmq，such as common message, timed message, transaction message, sequential message and delay message. User can select the appropriate message type according to the needs of the business.

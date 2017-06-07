---
title: "Frequently Asked Questions"
permalink: /docs/faq/
modified: 2016-12-27T15:18:43-04:00
---
The following questions are frequently asked with regard to the RocketMQ project in general.
 
## General
### 1. Why did we create rocketmq project instead of selecting other products?
Please refer to [Why RocketMQ](/docs/motivation/)

### 2. Do I have to install other softewares, such as zookeeper, to use RocketMQ?
No. RocketMQ can run independently.

## Usage
### 1. Where does the newly created Consumer ID start consuming messages?
 
1. If the topic sends a message within three days, then the consumer start consuming messages from the first message saved in the server.
2. If the topic sends a message three days ago, the consumer starts to consume messages from the latest message in the server, in other words, starting from the tail of message queue.
3. If such consumer is rebooted, then it starts to consume messages from the last consumption location.

### 2. How to reconsume message when consumption fails?
	1.Cluster consumption pattern
	The consumer business logic code returns Action.ReconsumerLater, NULL, or throws an exception, if a message failed to be consumed, it will retry for up to 16 times, after that, the message would be descarded.
	
	2.Broadcast consumption pattern
	The broadcaset consumption still ensures that a message is consumered at least once, but no resend option is provided.
	

### 3. How to deal with message consumption failure?

1. Using topic query by time, you can query messages within a period of time.
2. Using Topic and Message Id to accurately query the message.
3. Using Topic and Message Key accurately query a class of messages with the same Message Key.


### 4. Are messages delivered exactly once?

In most cases, the messages are not repeated, but RocketMQ can ensure that the message is not lost.

### 5. How to add a new broker?

1. Start up a new broker and register it to the same list of name servers.
2. By default, only internal system topics and consumer groups are created automatically. If you would like to have your business topic and consumer groups on the new node, please replicate them from the existing broker. Admin tool and command lines are provided to handle this.

## Configuration related
### 1. How long are the messages saved on the server?

Stored messages are will be saved for up to 3 days, and messages that are not consumed for more than 3 days will be deleted.

### 2. What is the size limit for message Body?
Generally 256KB, but it can be modified by configuration.

### 3. How to set the number of consumer threads?
When you start Consumer, set a ConsumeThreadNums property, example is as follows:

    properties.put(PropertyKeyConst.ConsumeThreadNums,20);

## Errors
### 1. If you start a producer or consumer failed and the error message is producer group or consumer repeat?
Reason：Using the same Producer ID/Consumer ID launched multiple instances of Producer/Consumer in the same JVM may cause the client fail to start.

Solution: Make sure that a JVM corresponding to one Producer ID/Consumer ID starts only with one Producer/Consumer instance.

### 2. If consumer failed to start loading json file in broadcast mode?
Reason: Fastjson version is too low to allow the broadcast consumer to load local offsets.json, causing the consumer boot failure.

Solution: Fastjson version has to be upgraded to rocketmq client dependent version to ensure that the local offsets.json can be loaded. By default offsets.json file is in /home/{user}/.rocketmq_offsets.

### 3. What if a broker crashes?
    
    1. Master crashes
       Messages can no longer be sent to this broker set, but if you have another broker set available, messages can be still sent there given the topic is present. Messages can still be consumed from slaves.
    2. One slaves crashes
       As long as there is another working slave, there will be no impact on sending messages. There will also be no impact on consuming messages except when the consumer group is set to consume from this slave preferably. By default, comsumer group consumes from master.
    3. All slaves crash
       There will be no impact on sending messages on master, but if master is a SYNC_MASTER, the producer will get a result of SLAVE_NOT_AVAILABLE indicating that the message is not sent to any slaves. There will also be no impact on consuming messages except that if the consumer group is set to consume from slave preferably. By default, comsumer group consumes from master.

### 4. Producer complains "No Topic Route Info", how to diagnose?
This happens when you are trying to send messages to a topic whose routing info is not available to the producer.
	
1. Make sure that the producer can connect to a name server and is capable of fetching routing meta info from it.
2. Make sure that name servers do contain routing meta info of the topic. You may query the routing meta info from name server through topicRoute using admin tools or web console.
3. Make sure your brokers are sending heartbeats to the same list of name servers your producer is connecting to.
4. Make sure that the topic's perm is 6(rw-), or at least 2(-w-).

If you can't find this topic, create it via admin tools command updateTopic or web console on a broker. 


## Features
### 1. What kind of consumption pattern does RocketMQ provide?
RocketMQ providers two types of consumption patterns: Clustering consumption patterns and broadcasting consumption patterns. See the documentation on cluster patterns for details.

### 2. How many kinds of message type are supported?
There are several types of messages that are currently supported in rocketmq，such as common messages, timed messages, transaction messages, sequential messages and delay messages. You can choose the appropriate message type according your business.

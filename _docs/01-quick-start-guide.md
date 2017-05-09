---
title: "Quick Start"
permalink: /docs/quick-start/
excerpt: "How to quickly install and setup Apache RocketMQ."
modified: 2016-12-29T15:01:43-04:00
---

This quick start guide is to give detailed instructions, helping you setup RocketMQ messaging system on a single local machine and send/receive the very first message.

{% include toc %}

# Prerequisite

   The following softwares are assumed installed:
   1. 64bit OS, Linux/Unix/Mac is recommended;
   1. 64bit JDK 1.7+; 
   1. Maven 3.2.x
   1. Git 

# Clone & Build

```shell
  > git clone -b develop https://github.com/apache/incubator-rocketmq.git
  > cd incubator-rocketmq
  > mvn -Prelease-all -DskipTests clean package install -U
  > cd distribution/target/apache-rocketmq
```

 
# Start Name Server

```shell
  > nohup sh bin/mqnamesrv &
  > tail -f ~/logs/rocketmqlogs/namesrv.log
  The Name Server boot success...
```  

# Start Broker

```shell 
  > nohup sh bin/mqbroker -n localhost:9876 &
  > tail -f ~/logs/rocketmqlogs/broker.log 
  The broker[%s, 172.30.30.233:10911] boot success...
```
  you may need to pay attention to the broker ip, for that the broker will not use the loopback network interface, So you should make sure you have connected to other network.


# Send & Receive Messages

Before sending/receiving messages, we need to tell clients where name servers are located. RocketMQ provides multiple ways to achieve this. For simplicity, we use environment variable `NAMESRV_ADDR`

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

# Shutdown Servers

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```

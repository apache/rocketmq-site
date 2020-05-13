---
title: "Quick Start"
permalink: /docs/quick-start/
excerpt: "How to quickly install and setup Apache RocketMQ."
modified: 2020-02-13T15:01:43-04:00
---

This quick start guide is a detailed instruction of setting up RocketMQ messaging system on your local machine to send 
and receive messages.

More Details:
* English：[https://github.com/apache/rocketmq/tree/master/docs/en](https://github.com/apache/rocketmq/tree/master/docs/en)
* Chinese：[https://github.com/apache/rocketmq/tree/master/docs/cn](https://github.com/apache/rocketmq/tree/master/docs/cn)
{% include toc %}

# Prerequisite

   The following softwares are assumed installed:
   1. 64bit OS, Linux/Unix/Mac is recommended;
   1. 64bit JDK 1.8+; 
   1. Maven 3.2.x;
   1. Git;
   1. 4g+ free disk for Broker server

# Download & Build from Release

Click [here](https://archive.apache.org/dist/rocketmq/4.7.0/rocketmq-all-4.7.0-source-release.zip) to download the 4.7.0 source release. Also you could download a binary release from [here](http://rocketmq.apache.org/release_notes/release-notes-4.7.0/).

Now execute the following commands to unpack 4.7.0 source release and build the binary artifact.

```shell
  > unzip rocketmq-all-4.7.0-source-release.zip
  > cd rocketmq-all-4.7.0/
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/rocketmq-4.7.0/rocketmq-4.7.0
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


# Send & Receive Messages

Before sending/receiving messages, we need to tell clients the location of name servers. RocketMQ provides multiple ways to achieve this. For simplicity, we use environment variable `NAMESRV_ADDR`

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

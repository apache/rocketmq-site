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
* 中文：[https://github.com/apache/rocketmq/tree/master/docs/cn](https://github.com/apache/rocketmq/tree/master/docs/cn)
{% include toc %}

# Prerequisite

   The following softwares are assumed installed:
   1. 64bit OS, Linux/Unix/Mac is recommended;(Windows user see guide below)
   1. 64bit JDK 1.8+; 
   1. Maven 3.2.x;
   1. Git;
   1. 4g+ free disk for Broker server

# Download & Build from Release

Click [here](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.1/rocketmq-all-4.9.1-source-release.zip) to download the 4.9.1 source release. Also you could download a binary release from [here](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.1/rocketmq-all-4.9.1-bin-release.zip).

Now execute the following commands to unpack 4.9.1 source release and build the binary artifact.

```shell
  > unzip rocketmq-all-4.9.1-source-release.zip
  > cd rocketmq-all-4.9.1/
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/rocketmq-4.9.1/rocketmq-4.9.1
```
# Linux 
 
## Start Name Server

```shell
  > nohup sh bin/mqnamesrv &
  > tail -f ~/logs/rocketmqlogs/namesrv.log
  The Name Server boot success...
```  

## Start Broker

```shell 
  > nohup sh bin/mqbroker -n localhost:9876 &
  > tail -f ~/logs/rocketmqlogs/broker.log 
  The broker[%s, 172.30.30.233:10911] boot success...
```


## Send & Receive Messages

Before sending/receiving messages, we need to tell clients the location of name servers. RocketMQ provides multiple ways to achieve this. For simplicity, we use environment variable `NAMESRV_ADDR`

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## Shutdown Servers

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```


# Windows 

The guide is working for windows 10 , please make sure you have powershell installed.

Download latest binary release. and extract zip file into your local disk. Such as: `D:\rocketmq`

## Add Environment Variables

You need set environment variables
1. From the desktop, right click the Computer icon.
2. Choose Properties from the context menu.
3. Click the Advanced system settings link.
4. Click Environment Variables. 
5. Then add or change Environment Variables.

```bash
ROCKETMQ_HOME="D:\rocketmq"
NAMESRV_ADDR="localhost:9876"
```

Or just in the openning powershell, type the needed environment variables.

```bash
$Env:ROCKETMQ_HOME="D:\rocketmq"
$Env:NAMESRV_ADDR="localhost:9876"
```

If you choose the powershell way. you should do it for every new open powershell window.

## Start Name Server

Open new powershell window, after set the correct environment variable. then change directory to rocketmq type and run:

```bash
.\bin\mqnamesrv.cmd
```

## Start Broker

Open new powershell window, after set the correct environment variable. then change directory to rocketmq type and run:

```bash
.\bin\mqbroker.cmd -n localhost:9876 autoCreateTopicEnable=true
```

## Send & Receive Messages

### Send Messages

Open new powershell window, after set the correct environment variable. then change directory to rocketmq type and run:

```bash
.\bin\tools.cmd  org.apache.rocketmq.example.quickstart.Producer
```
### Receive Messages

Then you will see messages produced. and now we can try consumer messages.

Open new powershell window, after set the correct environment variable. then change directory to rocketmq type and run:


```bash
.\bin\tools.cmd  org.apache.rocketmq.example.quickstart.Consumer
```

## Shutdown Servers

Normally, you can just closed these powershell windows. (Do not do it at production environment)

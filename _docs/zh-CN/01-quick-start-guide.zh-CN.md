---
title: "快速入门"
locale: zh-CN
permalink: /docs/quick-start/zh-CN
excerpt: "如何快速地安装和设置 Apache RocketMQ。"
modified: 2018-06-14T16:55:00+08:00
---

这篇快速入门指南详细地说明了如何在你的本地服务器上架设 RocketMQ 消息系统，以及用它来发送和接收消息的过程。

{% include toc %}

# 必要条件

   假设下列软件已经安装：
   1. 64位操作系统，推荐使用 Linux/Unix/Mac；
   2. 64位 JDK 1.8+；
   3. Maven 3.2.x；
   4. Git 

# 由正式版下载并编译

点击 [这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.2.0/rocketmq-all-4.2.0-source-release.zip) 下载 4.2.0 正式版的源码。你也可以从 [这里](http://rocketmq.apache.org/release_notes/release-notes-4.2.0/) 下载已经编译好的正式版可执行文件。

然后执行下列命令来解压 4.2.0 正式版源码并编译。

```shell
  > unzip rocketmq-all-4.2.0-source-release.zip
  > cd rocketmq-all-4.2.0/
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/apache-rocketmq
```

 
# 启动 Name 服务器

```shell
  > nohup sh bin/mqnamesrv &
  > tail -f ~/logs/rocketmqlogs/namesrv.log
  The Name Server boot success...
```  

# 启动 Broker

```shell 
  > nohup sh bin/mqbroker -n localhost:9876 &
  > tail -f ~/logs/rocketmqlogs/broker.log 
  The broker[%s, 172.30.30.233:10911] boot success...
```


# 发送和接收消息

在发送和接收消息之前，我们需要告诉客户端 Name 服务器的地址。RocketMQ 提供多种方式来实现这个目的。最简单的，我们使用环境变量 `NAMESRV_ADDR`。

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

# 关闭服务器

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```

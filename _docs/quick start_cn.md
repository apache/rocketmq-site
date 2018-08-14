### 目录
[快速开始](#1)
[条件](#2)
[从发布下载到构建](#3)
[启动名称服务器](#4)
[启动broker](#5)
[发送和接收消息](#6)
[关掉服务器](#7)

<h1 id="1">快速开始</h1>

这个快速入门指南对在本地计算机上设置RocketMQ消息传递系统发送和接收消息做了一个详细说明。

<h1 id="2">条件</h1>

需要安装以下软件：

1. 建议使用64位操作系统，Linux / Unix / Mac;
2. 64位JDK 1.8+;
3. Maven 3.2.x.
4. git

<h1 id="3">从发布下载到构建</h1>

单击[此处](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.0/rocketmq-all-4.3.0-source-release.zip)下载4.3.0源代码版本。您也可以从[这里](http://rocketmq.apache.org/release_notes/release-notes-4.3.0/)下载二进制版本。

现在执行以下命令来解压缩4.3.0版本源码并构建二进制artifact文件。

```shell
> unzip rocketmq-all-4.3.0-source-release.zip
> cd rocketmq-all-4.3.0/
> mvn -Prelease-all -DskipTests clean install -U
> cd distribution/target/apache-rocketmq
```

<h1 id="4">启动名称服务器</h1>
```shell
> nohup sh bin/mqnamesrv &
> tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

<h1 id="5">启动broker</h1>

```shell
> nohup sh bin/mqbroker -n localhost:9876 &
> tail -f ~/logs/rocketmqlogs/broker.log 
The broker[%s, 172.30.30.233:10911] boot success...
```

<h1 id="6">发送和接收消息</h1>

在发送/接收消息之前，我们需要告诉客户端名称服务器的位置。RocketMQ提供了多种方法来实现这一目标。为了简单一点，我们使用环境变量`NAMESRV_ADDR`

```shell
> export NAMESRV_ADDR=localhost:9876
> sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
SendResult [sendStatus=SEND_OK, msgId= ...

> sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

<h1 id="7">关掉服务器</h1>

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```

English version: [quick start](http://rocketmq.apache.org/docs/quick-start/)
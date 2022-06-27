# 快速开始

这一节介绍如何快速部署一个单Master RocketMQ集群，并完成简单的消息收发。

**（1）下载Apache RocketMQ**

RocketMQ的安装包分为两种，二进制包和源码包。点击[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-source-release.zip) 下载Apache RocketMQ 4.9.4的源码包。你也可以从[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip) 下载到二进制包。二进制包是已经编译完成后可以直接运行的，源码包是需要编译后运行的，以在Linux环境下利用社区4.9.4的源码包为例，我们介绍RocketMQ安装过程

解压4.9.4的源码包并编译构建二进制可执行文件

```shell
  > unzip rocketmq-all-4.9.4-source-release.zip
  > cd rocketmq-all-4.9.4-source-release/
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/rocketmq-4.9.4/rocketmq-4.9.4
```
**（2）启动NameServer**

安装完RocketMQ包后，我们启动NameServer

```shell
### 启动namesrv
$ nohup sh bin/mqnamesrv &
 
### 验证namesrv是否启动成功
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

我们可以在namesrv.log 中看到'The Name Server boot success..'，表示NameServer 已成功启动。

**（3）启动Broker**

NameServer成功启动后，我们启动Broker

```shell
### 先启动broker
$ nohup sh bin/mqbroker -n localhost:9876 &

### 验证broker是否启动成功, 比如, broker的ip是192.168.1.2 然后名字是broker-a
$ tail -f ~/logs/rocketmqlogs/Broker.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

我们可以在 Broker.log 中看到“The broker[brokerName,ip:port] boot success..”，这表明 broker 已成功启动。

至此，一个单Master的RocketMQ集群已经部署起来了，我们可以利用脚本进行简单的消息收发。

**（4）消息收发**

在进行消息收发之前，我们需要告诉客户端NameServer的地址，RocketMQ有多种方式在客户端中设置NameServer地址，这里我们利用环境变量`NAMESRV_ADDR`

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

**（5）关闭服务器**

完成实验后，我们可以通过以下方式关闭服务

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```


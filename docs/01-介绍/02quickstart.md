# 快速开始

这一节介绍如何快速部署一个单 Master RocketMQ 集群，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统，推荐 Linux/Unix/macOS
2. 64位 JDK 1.8+

:::

## 1.下载安装Apache RocketMQ

:::tip RocketMQ下载

RocketMQ 的安装包分为两种，二进制包和源码包。

点击[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-source-release.zip) 下载 Apache RocketMQ 5.0.0的源码包。你也可以从[这里](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0/rocketmq-all-5.0.0-bin-release.zip) 下载到二进制包。二进制包是已经编译完成后可以直接运行的，源码包是需要编译后运行的，

:::

这里以在Linux环境为例，介绍RocketMQ安装过程。

解压下载的源码包并编译构建二进制可执行文件

```shell
$ mvn -Prelease-all -DskipTests clean install -U
$ cd distribution/target/rocketmq-5.0.0/rocketmq-5.0.0
```
## 2. 启动NameServer

安装完RocketMQ包后，我们启动NameServer

```shell
### 启动namesrv
$ nohup sh bin/mqnamesrv &
 
### 验证namesrv是否启动成功
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

:::info

我们可以在namesrv.log 中看到 **'The Name Server boot success..'，** 表示NameServer 已成功启动。

:::

## 3. 启动Broker

NameServer成功启动后，我们启动Broker

```shell
### 先启动broker
$ nohup sh bin/mqbroker -n localhost:9876 &

### 验证broker是否启动成功, 比如, broker的ip是192.168.1.2 然后名字是broker-a
$ tail -f ~/logs/rocketmqlogs/Broker.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

:::info

我们可以在 Broker.log 中看到“The broker[brokerName,ip:port] boot success..”，这表明 broker 已成功启动。

:::

:::note

至此，一个单Master的RocketMQ集群已经部署起来了，我们可以利用脚本进行简单的消息收发。

:::

## 4. 消息收发 

在进行消息收发之前，我们需要告诉客户端NameServer的地址，RocketMQ有多种方式在客户端中设置NameServer地址，这里我们利用环境变量`NAMESRV_ADDR`

``` shell
$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```



## 5. 关闭服务器

完成实验后，我们可以通过以下方式关闭服务

```shell
$ sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

$ sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```


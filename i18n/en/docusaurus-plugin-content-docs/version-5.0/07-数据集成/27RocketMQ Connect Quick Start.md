# 快速开始

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

# 快速开始

单机模式下[rocketmq-connect-sample]作为 demo

rocketmq-connect-sample的主要作用是从源文件中读取数据发送到RocketMQ集群 然后从Topic中读取消息，写入到目标文件

## 1.准备

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x或以上版本;
4. 启动 [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);
5. 创建测试Topic
> sh ${ROCKETMQ_HOME}/bin/mqadmin updateTopic -t fileTopic -n localhost:9876 -c DefaultCluster -r 8 -w 8


**tips** : ${ROCKETMQ_HOME} 位置说明

>bin-release.zip 版本：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip 版本：/rocketmq-all-4.9.4-source-release/distribution


## 2.构建Connect

```
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

## 3.运行Worker

```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```
**tips**: 可修改 /bin/runconnect.sh 适当调整 JVM Parameters Configuration

>JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m"

runtime启动成功：

>The standalone worker boot success.

查看启动日志文件：

>tail -100f ~/logs/rocketmqconnect/connect_runtime.log

ctrl + c 退出日志

## 4.启动source connector

当前目录创建测试文件 test-source-file.txt
```
touch test-source-file.txt

echo "Hello \r\nRocketMQ\r\n Connect" >> test-source-file.txt

curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSourceConnector -d '{"connector.class":"org.apache.rocketmq.connect.file.FileSourceConnector","filename":"test-source-file.txt","connect.topicname":"fileTopic"}'
```

看到以下日志说明 file source connector 启动成功了

>tail -100f ~/logs/rocketmqconnect/connect_runtime.log
>
>2019-07-16 11:18:39 INFO pool-7-thread-1 - **Source task start**, config:{"properties":{"source-record-...

#### source connector配置说明

| key               | nullable | default              | description              |
|-------------------| -------- | ---------------------|--------------------------|
| connector.class   | false    |                      | 实现 Connector接口的类名称（包含包名） |
| filename          | false    |                      | 数据源文件名称                  |
| connect.topicname | false    |                      | 同步文件数据所需topic            |


## 5.启动sink connector

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSinkConnector -d '{"connector.class":"org.apache.rocketmq.connect.file.FileSinkConnector","filename":"test-sink-file.txt","connect.topicnames":"fileTopic"}'

cat test-sink-file.txt
```


> tail -100f ~/logs/rocketmqconnect/connect_runtime.log

看到以下日志说明file sink connector 启动成功了

> 2019-07-16 11:24:58 INFO pool-7-thread-2 - **Sink task start**, config:{"properties":{"source-record-...

如果 test-sink-file.txt 生成并且与 source-file.txt 内容一样，说明整个流程正常运行。
文件内容可能顺序不一样，这主要是因为RocketMQ发到不同queue时，接收不同queue消息顺序可能也不一致导致的，是正常的。

#### sink connector配置说明

| key                | nullable | default | description                                                                            |
|--------------------| -------- | ------- | -------------------------------------------------------------------------------------- |
| connector.class    | false    |         | 实现Connector接口的类名称（包含包名）                                                  |
| filename           | false    |         | sink拉去的数据保存到文件                                               |
| connect.topicnames | false    |         | sink需要处理数据消息topics                                             |

```  
注：source/sink配置文件说明是以rocketmq-connect-sample为demo，不同source/sink connector配置有差异，请以具体sourc/sink connector 为准
```

## 6.停止connector

```shell
GET请求  
http://(your worker ip):(port)/connectors/(connector name)/stop

停止demo中的两个connector
curl     http://127.0.0.1:8082/connectors/fileSinkConnector/stop
curl     http://127.0.0.1:8082/connectors/fileSourceConnector/stop
    
```
看到以下日志说明connector停止成功了

>**Source task stop**, config:{"properties":{"source-record-converter":"org.apache.rocketmq.connect.runtime.converter.JsonConverter","filename":"/home/zhoubo/IdeaProjects/my-new3-rocketmq-externals/rocketmq-connect/rocketmq-connect-runtime/source-file.txt","task-class":"org.apache.rocketmq.connect.file.FileSourceTask","topic":"fileTopic","connector-class":"org.apache.rocketmq.connect.file.FileSourceConnector","update-timestamp":"1564765189322"}}

## 7.停止Worker进程

```
sh bin/connectshutdown.sh
```

## 8.日志目录

>${user.home}/logs/rocketmqconnect

## 9.配置文件

持久化配置文件默认目录 /tmp/storeRoot

| key                  | description               |
|----------------------|---------------------------|
| connectorConfig.json | connector配置持久化文件          |
| position.json        | source connect数据处理进度持久化文件 |
| taskConfig.json      | task配置持久化文件               |
| offset.json          | sink connect数据消费进度持久化文件   |
| connectorStatus.json | connector 状态持久化文件         |
| taskStatus.json      | task 状态持久化文件              |

## 10.配置说明

可根据使用情况修改 [RESTful](https://restfulapi.cn/) 端口，storeRoot 路径，Nameserver 地址等信息

文件位置：work 启动目录下 conf/connect-standalone.conf

```shell
#current cluster node uniquely identifies
workerId=DEFAULT_WORKER_1

# Http prot for user to access REST API
httpPort=8082

# Local file dir for config store
storePathRootDir=/home/connect/storeRoot

#需要修改为自己的rocketmq nameserver 接入点
# RocketMQ namesrvAddr
namesrvAddr=127.0.0.1:9876  

#用于加载Connector插件，类似于jvm启动加载jar包或者class类，这里目录目录用于放Connector相关的实现插件，
支持文件和目录
# Source or sink connector jar file dir
pluginPaths=rocketmq-connect-sample/target/rocketmq-connect-sample-0.0.1-SNAPSHOT.jar

# 补充：将 Connector 相关实现插件保存到指定文件夹 
# pluginPaths=/usr/local/connector-plugins/*
```
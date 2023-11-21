# 快速开始

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

# 快速开始

本教程将采用单机模式启动一个RocketMQ Connector示例工程rocketmq-connect-sample，来帮助你了解连接器的工作原理。
示例工程中提供了源端连接器，作用是从源文件中读取数据然后发送到RocketMQ集群。
同时提供了目的端连接器，作用是从RocketMQ集群中读取消息然后写入目的端文件。 

## 1.准备

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x或以上版本;
4. 启动 RocketMQ。使用[RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) 或
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/)版本均可;

**说明**：RocketMQ具备自动创建Topic和Group的功能，在发送消息或订阅消息时，如果相应的Topic或Group不存在，RocketMQ会自动创建它们。因此不需要提前创建Topic和Group。

## 2.构建Connector

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U
```

## 3.运行Worker

```shell
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

**注意**：conf/connect-standalone.conf中包含了RocketMQ连接地址等配置，需要根据使用情况进行修改，具体参见[9.配置文件说明](#9配置文件说明)。

**tips**: 可修改 docker/connect/bin/runconnect.sh 适当调整 JVM 启动参数 

>JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m"

查看启动日志文件：
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

runtime若启动成功则日志文件中能看到如下打印内容：
>The standalone worker boot success.

要退出tail -f命令的日志追踪模式，您可以按下 Ctrl + C 组合键。

## 4.启动source connector

初始化创建源端文件 test-source-file.txt 并写入测试数据。
注意：不能有空行，source connector会持续读取源端文件，每读取到一行数据就会转换为消息体发送到RocketMQ，供sink connector消费。
```shell
mkdir -p /Users/YourUsername/rocketmqconnect/
cd /Users/YourUsername/rocketmqconnect/
touch test-source-file.txt

echo "Hello \r\nRocketMQ\r\n Connect" >> test-source-file.txt
```

启动Source Connector
```shell
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSourceConnector -d '{
	"connector.class": "org.apache.rocketmq.connect.file.FileSourceConnector",
	"filename": "/Users/YourUsername/rocketmqconnect/test-source-file.txt",
	"connect.topicname": "fileTopic"
}'
```

curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"org.apache.rocketmq.connect.file.FileSourceConnector","filename":"/Users/YourUsername/rocketmqconnect/test-source-file.txt","connect.topicname":"fileTopic"}}

看到以下日志说明 file source connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector fileSourceConnector and set target state STARTED successed!!

#### source connector配置说明

| key               | nullable | default              | description              |
|-------------------| -------- | ---------------------|--------------------------|
| connector.class   | false    |                      | 实现 Connector接口的类名称（包含包名） |
| filename          | false    |                      | 数据源端文件名称（建议使用绝对路径）       |
| connect.topicname | false    |                      | 同步文件数据所使用的RocketMQ topic |


## 5.启动sink connector

```shell
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSinkConnector -d '{
	"connector.class": "org.apache.rocketmq.connect.file.FileSinkConnector",
	"filename": "/Users/YourUsername/rocketmqconnect/test-sink-file.txt",
	"connect.topicnames": "fileTopic"
}'
```

curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"org.apache.rocketmq.connect.file.FileSinkConnector","filename":"/Users/YourUsername/rocketmqconnect/test-sink-file.txt","connect.topicnames":"fileTopic"}}

看到以下日志说明file sink connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```
> Start connector fileSinkConnector and set target state STARTED successed!!

查看sink connector是否将数据写入了目的端文件：
```shell
cat /Users/YourUsername/rocketmqconnect/test-sink-file.txt
```

如果生成了 test-sink-file.txt 文件，并且与 source-file.txt 内容一样则说明整个流程正常运行。
注意：文件内容可能顺序不一样，这主要是因为RocketMQ发到不同queue时，接收不同queue消息顺序可能也不一致导致的，是正常现象。

#### sink connector配置说明

| key                | nullable | default | description                            |
|--------------------| -------- | ------- |----------------------------------------|
| connector.class    | false    |         | 实现Connector接口的类名称（包含包名）                |
| filename           | false    |         | sink消费RocketMQ数据后保存到的目的端文件名称（建议使用绝对路径） |
| connect.topicnames | false    |         | sink需要处理数据消息topics                     |

```  
注：source/sink配置文件说明是以rocketmq-connect-sample为demo，不同source/sink connector配置有差异，请以具体sourc/sink connector 为准
```

## 6.停止connector

```shell
GET请求  
http://(your worker ip):(port)/connectors/(connector name)/stop

停止demo中的两个connector
curl http://127.0.0.1:8082/connectors/fileSinkConnector/stop
curl http://127.0.0.1:8082/connectors/fileSourceConnector/stop
```

curl请求返回status:200则表示停止成功，返回样例：
>{"status":200,"body":"Connector [fileSinkConnector] deleted successfully"}

看到以下日志说明file sink connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_default.log
```
> Completed shutdown for connectorName:fileSinkConnector

## 7.停止Worker进程

```
sh bin/connectshutdown.sh
```

## 8.日志目录
查看日志目录（下面2个命令是等价的）
```
ls $HOME/logs/rocketmqconnect
ls ~/logs/rocketmqconnect
```


## 9.配置文件说明

connect-standalone.conf配置文件中， 配置了 [RESTful](https://restfulapi.cn/) 端口，storeRoot 路径，Nameserver 地址等信息，可根据需要进行修改。

配置说明：

```shell
#current cluster node uniquely identifies
workerId=DEFAULT_WORKER_1

# Http prot for user to access REST API
httpPort=8082

# Local file dir for config store
storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

#需要修改为自己的rocketmq nameserver 接入点
# RocketMQ namesrvAddr
namesrvAddr=127.0.0.1:9876  

#用于加载Connector插件，类似于jvm启动加载jar包或者class类，这里目录目录用于放Connector相关的实现插件，
支持文件和目录。本工程已默认包含 rocketmq-connect-sample 的代码，因此无需添加。
# Source or sink connector jar file dir
pluginPaths=
```

持久化文件说明：
单机模式（standalone）下，RocketMQ Connect 会把同步位点信息持久化到本地文件目录storePathRootDir，持久化文件包括：

| key                  | description               |
|----------------------|---------------------------|
| connectorConfig.json | connector配置持久化文件          |
| position.json        | source connect数据处理进度持久化文件 |
| taskConfig.json      | task配置持久化文件               |
| offset.json          | sink connect数据消费进度持久化文件   |
| connectorStatus.json | connector 状态持久化文件         |
| taskStatus.json      | task 状态持久化文件              |

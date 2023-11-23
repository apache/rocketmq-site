# 快速开始

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

# 快速开始

本教程将采用单机模式启动一个RocketMQ Connector示例工程rocketmq-connect-sample，来帮助你了解连接器的工作原理。
示例工程中提供了源端连接器，作用是从源文件中读取数据然后发送到RocketMQ集群。
同时提供了目的端连接器，作用是从RocketMQ集群中读取消息然后写入目的端文件。 

## 1.准备：启动RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x或以上版本;
4. 启动 RocketMQ。使用[RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) 或
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/)版本均可;
5. 工具测试 RocketMQ 消息收发是否正常。详见[RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) 或
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/)文档。
   
这里利用环境变量NAMESRV_ADDR来告诉工具客户端RocketMQ的NameServer地址为localhost:9876

```shell
#$ cd distribution/target/rocketmq-4.9.7/rocketmq-4.9.7
$ cd distribution/target/rocketmq-5.1.4/rocketmq-5.1.4

$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

**说明**：RocketMQ具备自动创建Topic和Group的功能，在发送消息或订阅消息时，如果相应的Topic或Group不存在，RocketMQ会自动创建它们。因此不需要提前创建Topic和Group。

## 2.构建Connector Runtime

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

**注意**：本工程已默认包含 rocketmq-connect-sample 的代码，因此无需单独构建 rocketmq-connect-sample 插件。

## 3.单机模式运行 Connector Worker

### 修改配置
`connect-standalone.conf`中配置了RocketMQ连接地址等信息，需要根据使用情况进行修改，具体参见[9.配置文件说明](#9配置文件说明)。

```
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

单机模式（standalone）下，RocketMQ Connect 会把同步位点信息持久化到本地文件目录 storePathRootDir
>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

如果想重置同步位点，则需要删除持久化的位点信息文件
```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

### 采用单机模式启动Connector Worker

```shell
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

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

### 创建源端文件并写入测试数据

```shell
mkdir -p /Users/YourUsername/rocketmqconnect/
cd /Users/YourUsername/rocketmqconnect/
touch test-source-file.txt

echo "Hello \r\nRocketMQ\r\n Connect" >> test-source-file.txt
```
**注意**：不能有空行（demo程序遇到空行会报错）。source connector会持续读取源端文件，每读取到一行数据就会转换为消息体发送到RocketMQ，供sink connector消费。

### 启动Source Connector
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

继续向源端文件 test-source-file.txt 中写入测试数据，
```shell
cd /Users/YourUsername/rocketmqconnect/

echo "Say Hi to\r\nRMQ Connector\r\nAgain" >> test-source-file.txt

# Wait a few seconds, check if rocketmq-connect replicate data to sink file succeed 
sleep 10
cat /Users/YourUsername/rocketmqconnect/test-sink-file.txt
```

**注意**：文件内容可能顺序不一样，这是因为 `rocketmq-connect-sample` 向RocketMQ Topic中收发消息时，使用的消息类型是普通消息，区别于顺序消息，消费普通消息时是不保证顺序的。


#### sink connector配置说明

| key                | nullable | default | description                            |
|--------------------| -------- | ------- |----------------------------------------|
| connector.class    | false    |         | 实现Connector接口的类名称（包含包名）                |
| filename           | false    |         | sink消费RocketMQ数据后保存到的目的端文件名称（建议使用绝对路径） |
| connect.topicnames | false    |         | sink需要处理数据消息topics                     |

**注意**：source/sink配置文件说明是以rocketmq-connect-sample为demo，不同source/sink connector配置有差异，请以具体sourc/sink connector 为准

## 6.停止connector
RESTFul 命令格式 `http://(your worker ip):(port)/connectors/(connector name)/stop`

停止demo中的两个connector
```shell
curl http://127.0.0.1:8082/connectors/fileSinkConnector/stop
curl http://127.0.0.1:8082/connectors/fileSourceConnector/stop
```

curl请求返回status:200则表示停止成功，返回样例：
>{"status":200,"body":"Connector [fileSinkConnector] deleted successfully"}

看到以下日志说明file sink connector 停止成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_default.log
```
> Completed shutdown for connectorName:fileSinkConnector

## 7.停止Worker进程

```shell
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT
sh bin/connectshutdown.sh
```

## 8.日志目录
查看日志目录（下面2个命令是等价的）
```shell
ls $HOME/logs/rocketmqconnect
ls ~/logs/rocketmqconnect
```

## 9.配置文件说明

connect-standalone.conf配置文件中， 配置了 [RESTful](https://restfulapi.cn/) 端口，storeRoot 路径，Nameserver 地址等信息，可根据需要进行修改。

配置文件样例：

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

# 插件地址，用于Worker加载Source/Sink Connector插件
# rocketmq-connect 工程已默认包含 rocketmq-connect-sample 模块，因此这里无需配置。
pluginPaths=
```

storePathRootDir配置说明：

单机模式（standalone）下，RocketMQ Connect 会把同步位点信息持久化到本地文件目录 storePathRootDir，持久化文件包括

| key                  | description               |
|----------------------|---------------------------|
| connectorConfig.json | connector配置持久化文件          |
| position.json        | source connect数据处理进度持久化文件 |
| taskConfig.json      | task配置持久化文件               |
| offset.json          | sink connect数据消费进度持久化文件   |
| connectorStatus.json | connector 状态持久化文件         |
| taskStatus.json      | task 状态持久化文件              |

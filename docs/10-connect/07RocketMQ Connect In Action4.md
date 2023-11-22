# RocketMQ Connect实战4

SFTP Server(文件数据) -> RocketMQ Connect -> SFTP Server(文件)

## 准备

### 启动RocketMQ

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

### 构建 Connector Runtime

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

### 构建 SFTP Connector Plugin

```
cd $RMQ_CONNECT_HOME/connectors/rocketmq-connect-sftp/

mvn clean package -Dmaven.test.skip=true
```

将 SFTP RocketMQ Connector 编译好的包放入Runtime加载的Plugin目录
```
mkdir -p /Users/YourUsername/rocketmqconnect/connector-plugins
cp target/rocketmq-connect-sftp-0.0.1-SNAPSHOT-jar-with-dependencies.jar /Users/YourUsername/rocketmqconnect/connector-plugins
```

### 单机模式运行 Connector Worker

`connect-standalone.conf`中配置了RocketMQ连接地址等信息，需要根据使用情况进行修改

```
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

示例配置信息如下
```
workerId=standalone-worker
storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

## Http port for user to access REST API
httpPort=8082

# Rocketmq namesrvAddr
namesrvAddr=localhost:9876

# RocketMQ acl
aclEnable=false
#accessKey=rocketmq
#secretKey=12345678

clusterName="DefaultCluster"

# 插件地址，用于Worker加载Source/Sink Connector插件
pluginPaths=/Users/YourUsername/rocketmqconnect/connector-plugins
```

单机模式（standalone）下，RocketMQ Connect 会把同步位点信息持久化到本地文件目录 storePathRootDir
>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

如果想重置同步位点，则需要删除持久化的位点信息文件
```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

采用单机模式启动Connector Worker
```
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

### 搭建 SFTP 服务器
SFTP（SSH File Transfer Protocol）是一个文件传输协议，用于在计算机之间进行安全的文件传输。SFTP建立在SSH连接之上，它是通过SSH（Secure Shell）协议进行加密和身份验证的。

这里为了方便演示，使用 MAC OS 自带的 SFTP 服务（只需开启“远程登录”即可访问），详细参见[允许远程电脑访问你的 Mac](https://support.apple.com/zh-cn/guide/mac-help/mchlp1066/mac)文档。

### 创建源端测试文件

创建源端测试文件 source.txt ，并写入测试数据

```
mkdir -p /Users/YourUsername/rocketmqconnect/sftp-test/

cd /Users/YourUsername/rocketmqconnect/sftp-test/

touch source.txt

echo '张三|100000202211290001|20221129001|30000.00|2022-11-28|03:00:00|7.00
李四|100000202211290002|20221129002|40000.00|2022-11-28|04:00:00|9.00
赵五|100000202211290003|20221129003|50000.00|2022-11-28|05:00:00|12.00' >> source.txt
```

登录 SFTP 服务，验证是否能正常访问。输入下面命令，输入密码后即可进入SFTP服务器
```shell
# sftp -P port YourUsername@hostname
sftp -P 22 YourUsername@127.0.0.1
```
**说明**：由于是本机MAC OS提供的SFTP服务，所以地址是 127.0.0.1， 端口是默认的22。

```shell
sftp> cd /Users/YourUsername/rocketmqconnect/sftp-test/
sftp> ls source.txt
sftp> bye
```

## 启动Connector

### 启动 SFTP source connector

运行以下命令启动 SFTP source connector，connector将会连接到SFTP服务读取source.txt文件，
每读取文件中的一行内容，就会解析并封装成通用的ConnectRecord对象，发送到RocketMQ Topic当中，
供Sink Connector进行消费。

```shell
curl -X POST --location "http://localhost:8082/connectors/SftpSourceConnector" --http1.1 \
    -H "Host: localhost:8082" \
    -H "Content-Type: application/json" \
    -d '{
          "connector.class": "org.apache.rocketmq.connect.http.sink.SftpSourceConnector",
          "host": "127.0.0.1",
          "port": 22,
          "username": "YourUsername",
          "password": "yourPassword",
          "filePath": "/Users/YourUsername/rocketmqconnect/sftp-test/source.txt",
          "connect.topicname": "sftpTopic",
          "fieldSeparator": "|",
          "fieldSchema": "username|idCardNo|orderNo|orderAmount|trxDate|trxTime|profit"
        }'
```

curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"...

看到以下日志说明 file source connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector SftpSourceConnector and set target state STARTED successed!!

### 启动 SFTP sink connector

运行以下命令启动 SFTP sink connector，connector将会订阅RocketMQ Topic的数据进行消费，
并将每个消息转换为一行文字内容，然后通过SFTP协议写入到sink.txt文件中去。

```shell
curl -X POST --location "http://localhost:8082/connectors/SftpSinkConnector" --http1.1 \
    -H "Host: localhost:8082" \
    -H "Content-Type: application/json" \
    -d '{
          "connector.class": "org.apache.rocketmq.connect.http.sink.SftpSinkConnector",
          "host": "127.0.0.1",
          "port": 22,
          "username": "YourUsername",
          "password": "yourPassword",
          "filePath": "/Users/YourUsername/rocketmqconnect/sftp-test/sink.txt",
          "connect.topicnames": "sftpTopic",
          "fieldSeparator": "|",
          "fieldSchema": "username|idCardNo|orderNo|orderAmount|trxDate|trxTime|profit"
        }'
```

curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"...

看到以下日志说明 file source connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector SftpSinkConnector and set target state STARTED successed!!


查看sink connector是否将数据写入了目的端文件：
```shell
cat /Users/YourUsername/rocketmqconnect/sftp-test/sink.txt
```

如果生成了 sink.txt 文件，并且与 source.txt 内容一样则说明整个流程正常运行。

继续向源端文件 source.txt 中写入测试数据，
```shell
cd /Users/YourUsername/rocketmqconnect/sftp-test/

echo '张三x|100000202211290001|20221129001|30000.00|2022-11-28|03:00:00|7.00
李四x|100000202211290002|20221129002|40000.00|2022-11-28|04:00:00|9.00
赵五x|100000202211290003|20221129003|50000.00|2022-11-28|05:00:00|12.00' >> source.txt

# Wait a few seconds, check if rocketmq-connect replicate data to sink file succeed 
sleep 10
cat /Users/YourUsername/rocketmqconnect/sftp-test/sink.txt
```

**注意**：文件内容可能顺序不一样，这主要是因为RocketMQ发到不同queue时，接收不同queue消息顺序可能也不一致导致的，是正常现象。

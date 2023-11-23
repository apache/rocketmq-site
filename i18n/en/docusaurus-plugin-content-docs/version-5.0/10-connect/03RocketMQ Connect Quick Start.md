# RocketMQ Connect  Quick Start

# Quick Start

This tutorial will start a RocketMQ Connector example project "rocketmq-connect-sample" in standalone mode to help you understand the working principle of connectors.
The example project provides a source connector that reads data from source files and sends it to the RocketMQ cluster.
It also provides a sink connector that reads messages from the RocketMQ cluster and writes them to destination files.

## 1. Preparation: Start RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x+;
4. Start RocketMQ. Either [RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) or
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/) 5.x version can be used;
5. Test RocketMQ message sending and receiving using the tool.

Here, use the environment variable NAMESRV_ADDR to inform the tool client of the NameServer address of RocketMQ as localhost:9876.

```shell
#$ cd distribution/target/rocketmq-4.9.7/rocketmq-4.9.7
$ cd distribution/target/rocketmq-5.1.4/rocketmq-5.1.4

$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

**Note**: RocketMQ has the feature of automatically creating Topic and Group. When sending or subscribing to messages,
if the corresponding Topic or Group does not exist, RocketMQ will automatically create them. Therefore,
there is no need to create Topic and Group in advance.

## 2. Build Connector Runtime
```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

**Note**: The project already includes the code for rocketmq-connect-sample by default,
so there is no need to build the rocketmq-connect-sample plugin separately.

## 3. Run Connector Worker in Standalone Mode

### Modify Configuration
Modify the `connect-standalone.conf` file to configure the RocketMQ connection
address and other information. Please refer to [9. Configuration File Instructions](#9-configuration-file-instructions) for details.
```
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

In standalone mode, RocketMQ Connect persists the synchronization checkpoint information
to the local file directory storePathRootDir.

>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

If you want to reset the synchronization checkpoint, you need to delete the persisted
checkpoint file.

```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

### Start Connector Worker in Standalone Mode

```shell
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

**tips**: You can modify `docker/connect/bin/runconnect.sh` to adjust JVM startup
parameters as needed.

>JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m"

To view the startup log file:

```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

If the runtime starts successfully, you will see the following print in the log file:

>The standalone worker boot success.

To exit the log tracking mode of `tail -f` command, you can press the `Ctrl + C` key combination.

## 4. Start Source Connector

### Create Source File and Write Test Data

```shell
mkdir -p /Users/YourUsername/rocketmqconnect/
cd /Users/YourUsername/rocketmqconnect/
touch test-source-file.txt

echo "Hello \r\nRocketMQ\r\n Connect" >> test-source-file.txt
```
**Note**: There should be no empty lines (the demo program will throw an error if it
encounters empty lines). The source connector will continuously read the source file
and convert each line of data into a message body to be sent to RocketMQ for consumption
by the sink connector.

### Start Source Connector

```shell
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSourceConnector -d '{
	"connector.class": "org.apache.rocketmq.connect.file.FileSourceConnector",
	"filename": "/Users/YourUsername/rocketmqconnect/test-source-file.txt",
	"connect.topicname": "fileTopic"
}'
```

If the curl request returns status 200, it indicates successful creation. Example response:
>{"status":200,"body":{"connector.class":"org.apache.rocketmq.connect.file.FileSourceConnector","filename":"/Users/YourUsername/rocketmqconnect/test-source-file.txt","connect.topicname":"fileTopic"}}

View the log file:
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

If you see the following log, it means the file source connector has started successfully:
>Start connector fileSourceConnector and set target state STARTED successed!!


#### Source Connector Configuration Instructions

| key               | nullable | default | description                                                  |
| ----------------- | -------- | ------- | ------------------------------------------------------------ |
| connector.class   | false    |         | The class name (including the package name) that implements the Connector interface |
| filename          | false    |         | The name of the source file (recommended to use absolute path)      |
| connect.topicname | false    |         | Topic required for synchronizing file data                   |


## 5. Start sink connector

```shell
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSinkConnector -d '{
	"connector.class": "org.apache.rocketmq.connect.file.FileSinkConnector",
	"filename": "/Users/YourUsername/rocketmqconnect/test-sink-file.txt",
	"connect.topicnames": "fileTopic"
}'
```

If the curl request returns status 200, it indicates successful creation. Example response:
>{"status":200,"body":{"connector.class":"org.apache.rocketmq.connect.file.FileSinkConnector","filename":"/Users/YourUsername/rocketmqconnect/test-sink-file.txt","connect.topicnames":"fileTopic"}}

View the log file:
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

If you see the following log, it means the file sink connector has started successfully:
> Start connector fileSinkConnector and set target state STARTED successed!!

Check if the sink connector has written data to the destination file:
```shell
cat /Users/YourUsername/rocketmqconnect/test-sink-file.txt
```

If the test-sink-file.txt file is generated and its content is the same as the
test-source-file.txt, it means the entire process is running correctly.

Continue writing test data to the source file test-source-file.txt:
```shell
cd /Users/YourUsername/rocketmqconnect/

echo "Say Hi to\r\nRMQ Connector\r\nAgain" >> test-source-file.txt

# Wait a few seconds, check if rocketmq-connect replicate data to sink file succeed 
sleep 10
cat /Users/YourUsername/rocketmqconnect/test-sink-file.txt
```

**Note**: The order of file contents may vary because the `rocketmq-connect-sample` uses `normal message` when
sending and receiving messages to/from a RocketMQ topic. This is different from `ordered message`, and consuming
`normal messages` does not guarantee the order.

#### sink connector configuration instructions

| key                | nullable | default | description                                                  |
| ------------------ | -------- | ------- | ------------------------------------------------------------ |
| connector.class    | false    |         | The class name (including the package name) that implements the Connector interface |
| filename           | false    |         | The sink pulls data and saves it to a file(recommended to use absolute path)     |
| connect.topicnames | false    |         | The topics of the data messages that the sink needs to process |


**Tips**：The configuration file instructions for the sample rocketmq-connect-sample are for reference only, different source/sink connectors have different configurations, please refer to the specific source/sink connector.

## 6. Stop connector
The RESTful command format for stopping connectors is
`http://(your worker ip):(port)/connectors/(connector name)/stop`

To stop the two connectors in the demo, you can use the following commands:
```shell
curl http://127.0.0.1:8082/connectors/fileSinkConnector/stop
curl http://127.0.0.1:8082/connectors/fileSourceConnector/stop
```

If the curl request returns a status of 200, it indicates successful stopping of the connectors.
Example response:
>{"status":200,"body":"Connector [fileSinkConnector] deleted successfully"}

If you see the following log message, it means the file sink connector has been
successfully shut down:

```shell
tail -100f ~/logs/rocketmqconnect/connect_default.log
```
> Completed shutdown for connectorName:fileSinkConnector

## 7. Stop the Worker process

```shell
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT
sh bin/connectshutdown.sh
```

## 8. Log directory

You can use the following commands to view the log directory:

```shell
ls $HOME/logs/rocketmqconnect
ls ~/logs/rocketmqconnect
```

## 9. Configuration File Instructions

Modify the RESTful port, storeRoot path, Nameserver address, and other information based on your usage.

Here is an example of a configuration file:

```shell
#current cluster node uniquely identifies
workerId=DEFAULT_WORKER_1

# Http prot for user to access REST API
httpPort=8082

# Local file dir for config store
storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

#You need to modify it to your own rocketmq nameserver endpoint.
# RocketMQ namesrvAddr
namesrvAddr=127.0.0.1:9876  

# Plugin path for loading Source/Sink Connectors
# The rocketmq-connect project already includes the rocketmq-connect-sample module by default, so no configuration is needed here.
pluginPaths=
```

Explanation of storePathRootDir configuration:

In standalone mode, RocketMQ Connect persists the synchronization checkpoint information
to the local file directory specified by storePathRootDir. The persistent files include:


| key                  | description                                               |
| -------------------- | --------------------------------------------------------- |
| connectorConfig.json | Connector configuration persistence files                 |
| position.json        | Source connect data processing progress persistence files |
| taskConfig.json      | Task configuration persistence files                      |
| offset.json          | Sink connect data consumption progress persistence files  |
| connectorStatus.json | Connector status persistence files                        |
| taskStatus.json      | Task status persistence files                             |


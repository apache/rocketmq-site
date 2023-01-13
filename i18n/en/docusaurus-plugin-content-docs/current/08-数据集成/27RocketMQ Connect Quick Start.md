# RocketMQ Connect  Quick Start

# Quick Start

In standalone mode, [rocketmq-connect-sample] serves as a demo.

The main purpose of rocketmq-connect-sample is to read data from a source file and send it to a RocketMQ cluster, and then read messages from the Topic and write them to a target file.

## 1. Prepare

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x+;
4. Start [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);
5. Create test Topic

> sh ${ROCKETMQ_HOME}/bin/mqadmin updateTopic -t fileTopic -n localhost:9876 -c DefaultCluster -r 8 -w 8

**tips** : ${ROCKETMQ_HOME} locational instructions

>bin-release.zip  version：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip version：/rocketmq-all-4.9.4-source-release/distribution


## 2. Build Connect

```
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

## 3. Run Worker

```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```

**tips**: The JVM Parameters Configuration can be adjusted in /bin/runconnect.sh as needed.

>JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m"

runtime start successful：

>The standalone worker boot success.

View the startup log files.

>tail -100f ~/logs/rocketmqconnect/connect_runtime.log

`ctrl + c`  exit log

## 4. Start source connector

Create a test file named test-source-file.txt in the current directory.

```
touch test-source-file.txt

echo "Hello \r\nRocketMQ\r\n Connect" >> test-source-file.txt

curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSourceConnector -d '{"connector.class":"org.apache.rocketmq.connect.file.FileSourceConnector","filename":"test-source-file.txt","connect.topicname":"fileTopic"}'
```

If you see the following log message, it means the file source connector has started successfully.

>tail -100f ~/logs/rocketmqconnect/connect_runtime.log
>
>2019-07-16 11:18:39 INFO pool-7-thread-1 - **Source task start**, config:{"properties":{"source-record-...

#### source connector configuration instructions

| key               | nullable | default | description                                                  |
| ----------------- | -------- | ------- | ------------------------------------------------------------ |
| connector.class   | false    |         | The class name (including the package name) that implements the Connector interface |
| filename          | false    |         | source file name                                             |
| connect.topicname | false    |         | Topic required for synchronizing file data                   |


## 5. Start sink connector

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/fileSinkConnector -d '{"connector.class":"org.apache.rocketmq.connect.file.FileSinkConnector","filename":"test-sink-file.txt","connect.topicnames":"fileTopic"}'

cat test-sink-file.txt
```


> tail -100f ~/logs/rocketmqconnect/connect_runtime.log

If you see the following log message, it means the file sink connector has started successfully.

> 2019-07-16 11:24:58 INFO pool-7-thread-2 - **Sink task start**, config:{"properties":{"source-record-...

If test-sink-file.txt is generated and its content is the same as source-file.txt, it means that the entire process is running normally.

The file contents may be in a different order, which is normal because the order of messages received from different queues in RocketMQ may also be inconsistent.

#### sink connector configuration instructions

| key                | nullable | default | description                                                  |
| ------------------ | -------- | ------- | ------------------------------------------------------------ |
| connector.class    | false    |         | The class name (including the package name) that implements the Connector interface |
| filename           | false    |         | The sink pulls data and saves it to a file.                  |
| connect.topicnames | false    |         | The topics of the data messages that the sink needs to process. |

```  
Tips：The configuration file instructions for the sample rocketmq-connect-sample are for reference only, different source/sink connectors have different configurations, please refer to the specific source/sink connector.
```

## 6. Stop connector

```shell
#GET request  
http://(your worker ip):(port)/connectors/(connector name)/stop

#Stopping the two connectors in the demo
curl     http://127.0.0.1:8082/connectors/fileSinkConnector/stop
curl     http://127.0.0.1:8082/connectors/fileSourceConnector/stop
    
```

Seeing the following log message indicates that the connector has been successfully stopped.

>**Source task stop**, config:{"properties":{"source-record-converter":"org.apache.rocketmq.connect.runtime.converter.JsonConverter","filename":"/home/zhoubo/IdeaProjects/my-new3-rocketmq-externals/rocketmq-connect/rocketmq-connect-runtime/source-file.txt","task-class":"org.apache.rocketmq.connect.file.FileSourceTask","topic":"fileTopic","connector-class":"org.apache.rocketmq.connect.file.FileSourceConnector","update-timestamp":"1564765189322"}}

## 7. Stopping the Worker process

```
sh bin/connectshutdown.sh
```

## 8. Log directory

>${user.home}/logs/rocketmqconnect

## 9. Configuration file

The default directory for persistent configuration files is /tmp/storeRoot.

| key                  | description                                               |
| -------------------- | --------------------------------------------------------- |
| connectorConfig.json | Connector configuration persistence files                 |
| position.json        | Source connect data processing progress persistence files |
| taskConfig.json      | Task configuration persistence files                      |
| offset.json          | Sink connect data consumption progress persistence files  |
| connectorStatus.json | Connector status persistence files                        |
| taskStatus.json      | Task status persistence files                             |

## 10. Configuration Instructions

Modify the RESTful port, storeRoot path, Nameserver address, and other information based on your usage.

The file location is in the conf/connect-standalone.conf under the work startup directory.

```shell
#current cluster node uniquely identifies
workerId=DEFAULT_WORKER_1

# Http prot for user to access REST API
httpPort=8082

# Local file dir for config store
storePathRootDir=/home/connect/storeRoot

#You need to modify it to your own rocketmq nameserver endpoint.
# RocketMQ namesrvAddr
namesrvAddr=127.0.0.1:9876  

#This is used for loading Connector plugins, similar to how JVM loads jar packages or classes at startup. This directory is used for placing Connector-related implementation plugins and supports both files and directories.
# Source or sink connector jar file dir
pluginPaths=rocketmq-connect-sample/target/rocketmq-connect-sample-0.0.1-SNAPSHOT.jar

# Addition : put the Connector-related implementation plugins in the specified folder.
# pluginPaths=/usr/local/connector-plugins/*
```
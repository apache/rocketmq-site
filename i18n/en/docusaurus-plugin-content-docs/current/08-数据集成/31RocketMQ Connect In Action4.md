# RocketMQ Connect in Action 4

SFTP Server(file data) -> RocketMQ Connect

## Preparation

### Start RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x+;
4. Start [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);



**Tips** : ${ROCKETMQ_HOME} locational instructions

>bin-release.zip version：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip version：/rocketmq-all-4.9.4-source-release/distribution


### Start Connect


#### **Compiling Connector Plugin**

RocketMQ Connector SFTP

```
$ cd rocketmq-connect/connectors/rocketmq-connect-sftp/
$ mvn clean package -Dmaven.test.skip=true
```

Move the compiled RocketMQ Connector SFTP package into the Runtime loading directory. The command is as follows:

```
mkdir -p /usr/local/connector-plugins
cp target/rocketmq-connect-sftp-0.0.1-SNAPSHOT-jar-with-dependencies.jar /usr/local/connector-plugins
```

#### Start Connect Runtime

```
cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

Modify the configuration `connect-standalone.conf`, the main configuration is as follows

```
$ cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT
$ vim conf/connect-standalone.conf
```

```
workerId=standalone-worker
storePathRootDir=/tmp/storeRoot

## Http port for user to access REST API
httpPort=8082

# Rocketmq namesrvAddr
namesrvAddr=localhost:9876

# RocketMQ acl
aclEnable=false
accessKey=rocketmq
secretKey=12345678

autoCreateGroupEnable=false
clusterName="DefaultCluster"

# Core configuration, configure the plugin directory that was previously compiled here.
# Source or sink connector jar file dir,The default value is rocketmq-connect-sample
pluginPaths=/usr/local/connector-plugins
```


```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```

### Set up an SFTP server

Use the built-in SFTP server on MAC OS.

[Allow remote computers to access your Mac](https://support.apple.com/zh-cn/guide/mac-help/mchlp1066/mac)

### Test data

Log in to the SFTP server and place a file called source.txt with specific contents in the user directory, for example: /path/to/.

```text
zhangsan|100000202211290001|20221129001|30000.00|2022-11-28|03:00:00|7.00
lisi|100000202211290002|20221129002|40000.00|2022-11-28|04:00:00|9.00
zhaowu|100000202211290003|20221129003|50000.00|2022-11-28|05:00:00|12.00
```

## Start Connector

### Start SFTP source connector

Synchronize the SFTP file: source.txt
Purpose: by logging into the SFTP server, parsing the file and encapsulating it into a generic ConnectRecord object, sending it to the RocketMQ Topic.

```shell
curl -X POST --location "http://localhost:8082/connectors/SftpSourceConnector" --http1.1 \
    -H "Host: localhost:8082" \
    -H "Content-Type: application/json" \
    -d "{
          \"connector.class\": \"org.apache.rocketmq.connect.http.sink.SftpSourceConnector\",
          \"host\": \"127.0.0.1\",
          \"port\": 22,
          \"username\": \"wencheng\",
          \"password\": \"1617\",
          \"filePath\": \"/Users/wencheng/Documents/source.txt\",
          \"connect.topicname\": \"sftpTopic\",
          \"fieldSeparator\": \"|\",
          \"fieldSchema\": \"username|idCardNo|orderNo|orderAmount|trxDate|trxTime|profit\"
        }"
```

After running the above commands, the file data on the SFTP server will be organized into data in the specified format, and written to MQ. Afterwards, it can be consumed by the sink connector or other business systems.

### Start SFTP sink connector

Purpose: by consuming the data in the Topic, use the SFTP protocol to write to the target file.

```shell
curl -X POST --location "http://localhost:8082/connectors/SftpSinkConnector" --http1.1 \
    -H "Host: localhost:8082" \
    -H "Content-Type: application/json" \
    -d "{
          \"connector.class\": \"org.apache.rocketmq.connect.http.sink.SftpSinkConnector\",
          \"host\": \"127.0.0.1\",
          \"port\": 22,
          \"username\": \"wencheng\",
          \"password\": \"1617\",
          \"filePath\": \"/Users/wencheng/Documents/sink.txt\",
          \"connect.topicnames\": \"sftpTopic\",
          \"fieldSeparator\": \"|\",
          \"fieldSchema\": \"username|idCardNo|orderNo|orderAmount|trxDate|trxTime|profit\"
        }"
```

# RocketMQ Connect in Action 4

SFTP Server (File Data) -> RocketMQ Connect -> SFTP Server (File)

## Preparation

### Start RocketMQ

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

### Build Connector Runtime

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

### Build SFTP Connector Plugin

```
cd $RMQ_CONNECT_HOME/connectors/rocketmq-connect-sftp/

mvn clean package -Dmaven.test.skip=true
```

Put the compiled jar of the SFTP RocketMQ Connector into the Plugin directory for runtime loading.

```
mkdir -p /Users/YourUsername/rocketmqconnect/connector-plugins
cp target/rocketmq-connect-sftp-0.0.1-SNAPSHOT-jar-with-dependencies.jar /Users/YourUsername/rocketmqconnect/connector-plugins
```

### Run Connector Worker in Standalone Mode

Modify the `connect-standalone.conf` file to configure the RocketMQ connection
address and other information.

```
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

Example configuration information is as follows:
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

# Plugin path for loading Source/Sink Connectors
pluginPaths=/Users/YourUsername/rocketmqconnect/connector-plugins
```

In standalone mode, RocketMQ Connect persistently stores the synchronization checkpoint information 
in the local file directory specified by storePathRootDir.

>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

If you want to reset the synchronization checkpoint, you need to delete the persisted checkpoint information files.
```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

To start Connector Worker in standalone mode:
```
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

### Set up an SFTP server

SFTP (SSH File Transfer Protocol) is a file transfer protocol used for secure file transfers between computers. 
SFTP is built on top of the SSH (Secure Shell) protocol and utilizes encryption and authentication.

We will use the built-in SFTP service in macOS (by enabling "Remote Login" access). 
For detailed instructions, please refer to the 
[Allow a remote computer to access your Mac](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac)document.

### Create Source Test File
Create a test file named `source.txt` and write some test data to it:

```shell
mkdir -p /Users/YourUsername/rocketmqconnect/sftp-test/

cd /Users/YourUsername/rocketmqconnect/sftp-test/

touch source.txt

echo 'John Doe|100000202211290001|20221129001|30000.00|2022-11-28|03:00:00|7.00
Jane Smith|100000202211290002|20221129002|40000.00|2022-11-28|04:00:00|9.00
Bob Johnson|100000202211290003|20221129003|50000.00|2022-11-28|05:00:00|12.00' >> source.txt
```

Log in to the SFTP service to verify that you can access it normally. Enter the following command, then enter your 
password :
```shell
# sftp -P port YourUsername@hostname
sftp -P 22 YourUsername@127.0.0.1
```
**Note**: Since this is the SFTP service provided by your local MAC OS, the address is `127.0.0.1` and the port is the default 22.

```shell
sftp> cd /Users/YourUsername/rocketmqconnect/sftp-test/
sftp> ls source.txt
sftp> bye
```

## Start Connector

### Start SFTP Source Connector

Run the following command to start the SFTP source connector. This connector will connect to the 
SFTP service to read from the `source.txt` file. For each line of text in the file, the connector 
will parse and package the contents into a generic ConnectRecord object, which will then be sent 
to a RocketMQ topic for consumption by sink connectors.

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

If the curl request returns status: 200, it indicates that the connector was successfully 
created. An example response would look like this:
```json
{"status":200,"body":{"connector.class":"...
```

To confirm that the file source connector has started successfully, run the following command:
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector SftpSourceConnector and set target state STARTED successed!!

### Start SFTP Sink Connector

Run the following command to start the SFTP sink connector. This connector will subscribe to the RocketMQ topic 
to consume messages and convert each one into a single line of text, which will then be written to the destination 
file `sink.txt` using the SFTP protocol:

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

If the curl request returns status: 200, it indicates that the connector was successfully 
created. An example response would look like this:
```json
{"status":200,"body":{"connector.class":"...
```

Check the logs to confirm successful startup of the SFTP sink connector:
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector SftpSinkConnector and set target state STARTED successed!!

Confirm that the data has been written to the destination file by running the following command:
```shell
cat /Users/YourUsername/rocketmqconnect/sftp-test/sink.txt
```

If the `sink.txt` file has been generated and its contents match those of the `source.txt` file, the entire process is working correctly.

Write more test data to the `source.txt` file to continue testing:
```shell
cd /Users/YourUsername/rocketmqconnect/sftp-test/

echo 'John Doe|100000202211290001|20221129001|30000.00|2022-11-28|03:00:00|7.00
Jane Smith|100000202211290002|20221129002|40000.00|2022-11-28|04:00:00|9.00
Bob Johnson|100000202211290003|20221129003|50000.00|2022-11-28|05:00:00|12.00' >> source.txt

# Wait a few seconds to give the connector time to replicate data to the sink file.
sleep 10

cat /Users/YourUsername/rocketmqconnect/sftp-test/sink.txt
```

**Note**: The order of file contents may vary because the `rocketmq-connect-sftp` uses `normal message` when
sending and receiving messages to/from a RocketMQ topic. This is different from `ordered message`, and consuming
`normal messages` does not guarantee the order.
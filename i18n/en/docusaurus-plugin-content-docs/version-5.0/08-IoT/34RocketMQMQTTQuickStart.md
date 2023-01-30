# RocketMQ MQTT QuickStart

## System Requirements

- 64-bit operating system, Linux/Unix/macOS recommended
- 64-bit JDK 1.8+

## Deployment Instructions

Since the RocketMQ-MQTT project relies on the underlying multi-queue distribution of RocketMQ, RocketMQ supports this feature from version 4.9.3, so you need to confirm that the version of RocketMQ is upgraded to 4.9.3 or later, and ensure that the following configuration items are enabled:

```text
enableLmq = true 
enableMultiDispatch = true
```

For the deployment of RocketMQ-MQTT, refer to the project description, download the project release version or build it directly from the source code.

```text
git clone https://github.com/apache/rocketmq-mqtt
cd rocketmq-mqtt 
mvn -Prelease-all -DskipTests clean install -U 
cd distribution/target/ 
cd bin
sh mqtt.sh start
```

## Configuration instructions

```text
username=xxx    // Authorization verification account configuration
secretKey=xxx    // Authorization verification account configuration
NAMESRV_ADDR=xxx  //namesrv access point
eventNotifyRetryTopic=xx   //notify retry topic, created in advance
clientRetryTopic=xx  //Client message retry topic, created in advance
```

Other launch configuration reference projects [README.md](https://github.com/apache/rocketmq-mqtt/blob/main/README.md)

## Example Description

The basic code is provided in the project engineering code, see the code [example](https://github.com/apache/rocketmq-mqtt/tree/main/mqtt-example)

```text
MqttConsumer.java  // MQTT client initiates subscription message
MqttProducer.java   // MQTT client starts publishing messages
RocketMQConsumer.java // RocketMQ client starts subscription message
RocketMQProducer.java  // RocketMQ client starts publishing messages
```
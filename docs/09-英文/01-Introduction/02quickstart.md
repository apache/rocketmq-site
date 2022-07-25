# Quickstart

This section will introduce the method of quickly building and deploying a single-Master RocketMQ cluster to complete simple message sending and receiving.

:::tip System Requirement

1. 64-bit OS，Linux/Unix/macOS is recommended
2. 64-bit JDK 1.8+

:::

## 1. Get Apache RocketMQ

:::tip Download RocketMQ

RocketMQ's installation is divided into two types: binary and source. Click [here](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-source-release.zip) to download Apache RocketMQ 4.9.4 source package, or download the binary package from [here](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip). The binary package can be run directly since it has been compiled, and the source package needs to be compiled and run.

:::

The following instruction takes the application of RocketMQ 4.9.4 source package in Linux environment as an example in order to introduce the installation process of RocketMQ.

Extract the source package of RocketMQ 4.9.4, then compile and build the binary executables:

```shell
  > unzip rocketmq-all-4.9.4-source-release.zip
  > cd rocketmq-all-4.9.4-source-release/
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/rocketmq-4.9.4/rocketmq-4.9.4
```

## 2. Start the NameServer

After the installation of RocketMQ, start the NameServer:

```shell
### Start the namesrv service
$ nohup sh bin/mqnamesrv &
 
### Verify that the namesrv service is started successfully
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

:::info

Once we see **'The Name Server boot success..'** from namesrv.log, it means the NameServer has been started successfully.

:::

## 3. Start the Broker

Start the Broker after the NameServer has been launched:

```shell
### Start the broker service
$ nohup sh bin/mqbroker -n localhost:9876 &

### Verify that the broker service is started successfully, for example, the broker's ip is 192.168.1.2 and the name is broker-a
$ tail -f ~/logs/rocketmqlogs/broker.log 
The broker[broker-a,192.169.1.2:10911] boot success...
```

:::info

Once we see “The broker[brokerName,ip:port] boot success..” from broker.log, it means the Broker has been started successfully.

:::

:::note

Thus far, a single-Master RocketMQ cluster has been deployed, and we are able to send and receive simple messages by scripts.

:::

## 4. Send and Receive Messages

Before sending and receiving messages, the clients need to identify the address of the NameServer. RocketMQ has multiple ways to set the NameServer address on the client side. One of them is to modify the environment variable `NAMESRV_ADDR` :

``` shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 5. Shutdown Servers

After finishing the practice, we could shut down the service by the following commands:

```shell
> sh bin/mqshutdown broker
The mqbroker(36695) is running...
Send shutdown request to mqbroker(36695) OK

> sh bin/mqshutdown namesrv
The mqnamesrv(36664) is running...
Send shutdown request to mqnamesrv(36664) OK
```
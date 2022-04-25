---
title: "Deployment"
permalink: /docs/rmq-deployment/
excerpt: "How to deploy the Apache RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---

{% include toc %}

This section introduces production-ready deployment solution. Generally speaking, we are deploying a resilient RocketMQ cluster having no single point of failure.

### Prerequisite
Before starting this section, make sure you have read Quick Start section, and are familiar with the core concepts and components of RocketMQ.

#### Production-ready Deployment
##### Name Server
To ensure the cluster can still function when one instance crashes, two or more name server instances are recommended. As long as there is one name server instance alive, the whole cluster remains in service.

Name server follows the share-nothing design paradigm. Brokers send heartbeat data to all name servers. Producers and consumers can query meta data from any of name servers available while sending / consuming messages.

#### Broker
Brokers can be divided into two categories according to their roles: master and slave. Master brokers provide RW access while slave brokers only accept read access.

To deploy a high-availability RocketMQ cluster with no single point of failure, a series of broker sets should be deployed. A broker set contains one master with brokerId set to 0 and several slaves with non-zero brokerIDs. All the brokers in one set have the same brokerName. In serious scenarios, we should have at least two brokers in one broker set. Each topic resides in two or more brokers.

### Configuration
When deploying a RocketMQ cluster, recommended configuration is listed below:

##### Broker configuration

| Property Name        | Default value           | Details  |
| ----------------- |:------------------:| ---------------:|
| listenPort      | 10911 | listen port for client |
| namesrvAddr      | null      |   name server address |
| brokerIP1    | InetAddress for network interface  | Should be configured if having multiple addresses |
| brokerName | null | broker name |
| brokerClusterName | DefaultCluster |this broker belongs to which cluster |
| brokerId | 0 |broker id, 0 means master, positive integers mean slave |
| storePathCommitLog | $HOME/store/commitlog/ |file path for commit log |
| storePathConsumerQueue |  $HOME/store/consumequeue/ | file path for consume queue |
| mappedFileSizeCommitLog | 1024 * 1024 * 1024(1G) | mapped file size for commit log |
| deleteWhen | 04 |When to delete the commitlog which is out of the reserve time |
| fileReservedTime | 72 |The number of hours to keep a commitlog before deleting it |
| brokerRole | ASYNC_MASTER |SYNC_MASTER/ASYNC_MASTER/SLAVE |
| flushDiskType | ASYNC_FLUSH |{SYNC_FLUSH/ASYNC_FLUSH}. Broker of SYNC_FLUSH mode flushes each message onto disk before acknowledging producer. Broker of ASYNC_FLUSH mode, on the other hand, takes advantage of group-committing, achieving better performance.|

### CLI Admin Tool
RocketMQ provides a CLI(command-line interface) admin tool belt to query, manage and diagnose various issues.

#### How To Get
The admin tool is shipped along with RocketMQ. Either you download a pre-built binary version or build from source by yourself, you already have it.

In case you need the source code, the rocketmq-tools module contains its source code.

#### How to use
The Admin Tool is very easy to use. Here, for demonstration purpose, *nix environment is assumed.

Change directory to ${PACKAGE}/bin, command bash mqadmin, you should see the following help menu:

```java 
The most commonly used mqadmin commands are:
   updateTopic          Update or create topic
   deleteTopic          Delete topic from broker and NameServer
   updateSubGroup       Update or create subscription group
   deleteSubGroup       Delete subscription group from broker
   updateBrokerConfig   Update broker's config
   updateTopicPerm      Update topic perm
   topicRoute           Examine topic route info
   topicStatus          Examine topic Status info
   topicClusterList     get cluster info for topic
   brokerStatus         Fetch broker runtime status data
   queryMsgById         Query Message by Id
   queryMsgByKey        Query Message by Key
   queryMsgByUniqueKey  Query Message by Unique key
   queryMsgByOffset     Query Message by offset
   queryMsgByUniqueKey  Query Message by Unique key
   printMsg             Print Message Detail
   sendMsgStatus        Send msg to broker
   brokerConsumeStats   Fetch broker consume stats data
   producerConnection   Query producer's socket connection and client version
   consumerConnection   Query consumer's socket connection, client version and subscription
   consumerProgress     Query consumers's progress, speed
   consumerStatus       Query consumer's internal data structure
   cloneGroupOffset     Clone offset from other group
   clusterList          List all of clusters
   topicList            Fetch all topic list from name server
   updateKvConfig       Create or update KV config
   deleteKvConfig       Delete KV config
   wipeWritePerm        Wipe write perm of broker in all name server
   resetOffsetByTime    Reset consumer offset by timestamp(without client restart)
   updateOrderConf      Create or update or delete order conf
   cleanExpiredCQ       Clean expired ConsumeQueue on broker.
   cleanUnusedTopic     Clean unused topic on broker
   startMonitoring      Start Monitoring
   statsAll             Topic and Consumer tps stats
   syncDocs             Synchronize wiki and issue to github.com
   allocateMQ           Allocate MQ
   checkMsgSendRT       Check message send response time
   clusterRT            List All clusters Message Send RT

```
See 'mqadmin help <command>' for more information on a specific command. 
If you want to get more information about a specific command like 'clusterList', just type bash mqadmin help clusterList and you will see:

```java
usage: mqadmin clusterList [-h] [-i <arg>] [-m] [-n <arg>]
 -h,--help                Print help
 -i,--interval <arg>      specify intervals numbers, it is in seconds
 -m,--moreStats           Print more stats
 -n,--namesrvAddr <arg>   Name server address list, eg: '192.168.0.1:9876;192.168.0.2:9876'
```

### Replication mode
To make sure that no successfully published message will be lost, RocketMQ provides a Replication mode to gain stronger durability and higher availability with two replication ways: Sync & Async.

##### Replication: Sync / Async Broker

Like many replication system, sync brokers wait until commit log is replicated to the slave before acknowledging. Async brokers, instead, return immediately after messages are processed on master.

##### How to configure
There are three pre-built configurations shipped with the distribution of RocketMQ under conf folder for your reference:

```java
2m-2s-sync
2m-2s-async
2m-noslave
```
Note: all configurations uses ASYNC_FLUSH.

#### Deployment
Take the deployment of 2m-2s-sync as example. First, start up two name servers as is shown in the Quick Start section. Assume their IPs are 192.168.0.2 and 192.168.0.3.

Then start the brokers(Assume binary RocketMQ is at /home/rocketmq/dist)

```java
>cd /home/rocketmq/dist/bin
>bash mqbroker -c ../conf/2m-2s-sync/broker-a.properties -n 192.168.0.2:9876;192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-a-s.properties -n 192.168.0.2:9876;192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-b.properties -n 192.168.0.2:9876;192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-b-s.properties -n 192.168.0.2:9876;192.168.0.3:9876
How to verify
Execute the following command to verify according to the CLI section:
> bash mqadmin clusterlist
```


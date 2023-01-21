# DLedger

## DLedger Quick Deployment

### Preface
DLedger is a set of distributed log storage components based on Raft protocol. When deploying RocketMQ, you can choose to use DLedger to replace the native replica storage mechanism. This document is mainly introduced for how to build and deploy auto failover RocketMQ cluster based on DLedger.

### 1. Build from source code
The build phase is divided into two parts, DLedger should be built first, and then build RocketMQ.

#### 1.1 Build DLedger

```shell
$ git clone https://github.com/openmessaging/dledger.git
$ cd dledger
$ mvn clean install -DskipTests
```

#### 1.2 Build RocketMQ

```shell
$ git clone https://github.com/apache/rocketmq.git
$ cd rocketmq
$ git checkout -b store_with_dledger origin/store_with_dledger
$ mvn -Prelease-all -DskipTests clean install -U
```

### 2. Quick Deployment

After building successfully

```shell
#{rocketmq-version} replace with rocketmq actual version. example: 5.0.0-SNAPSHOT
$ cd distribution/target/rocketmq-{rocketmq-version}/rocketmq-{rocketmq-version}
$ sh bin/dledger/fast-try.sh start
```

If the above commands executed successfully, then check cluster status by using mqadmin operation commands.

```shell
$ sh bin/mqadmin clusterList -n 127.0.0.1:9876
```

If everything goes well, the following content will appear:

![ClusterList](https://img.alicdn.com/5476e8b07b923/TB11Z.ZyCzqK1RjSZFLXXcn2XXa)

（BID is 0 indicate Master, the others are Follower）

After the startup is successful, producer can produce message, and then test failover scenario.

Execute the following command to stop the cluster quickly:

```shell
$ sh bin/dledger/fast-try.sh stop
```

Quick deployment, default configuration is in directory conf/dledger, default storage path is /tmp/rmqstore.


### 3. Failover

After the successful deployment, kill the Leader process(as the above example, kill process that binds port 30931), then wait for 10 seconds, use clusterList command to check cluster status, and you could find that the Leader has been switched to another node.

## Dledger cluster deployment

This document introduces how to deploy auto failover RocketMQ-on-DLedger Group.

RocketMQ-on-DLedger Group is a broker group with **same name**, needs at least 3 nodes, elect a Leader by Raft algorithm automatically, the others as Follower, replicating data between Leader and Follower for system high available. 
RocketMQ-on-DLedger Group can failover automatically, and maintains consistent. 
RocketMQ-on-DLedger Group can scale up horizontal, that is, can deploy any RocketMQ-on-DLedger Groups providing services external.  

### 1. New cluster deployment

#### 1.1 Write the configuration
Each RocketMQ-on-DLedger Group needs at least 3 machines.(assuming 3 in this document) 
write 3 configuration files, advising refer to the directory of conf/dledger 's example configuration file. 
key configuration items:  

| name                      | meaning                                                      | example                                                  |
| ------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| enableDLegerCommitLog     | whether enable DLedger                                       | true                                                     |
| dLegerGroup               | DLedger Raft Group's name, advising maintain consistent to brokerName | RaftNode00                                               |
| dLegerPeers               | DLedger Group's nodes port infos, each node's configuration stay consistent in the same group. | n0-127.0.0.1:40911;n1-127.0.0.1:40912;n2-127.0.0.1:40913 |
| dLegerSelfId              | node id, must belongs to dLegerPeers; each node is unique in the same group. | n0                                                       |
| sendMessageThreadPoolNums | the count of sending thread, advising set equal to the cpu cores. | 16                                                       |

The following presents an example configuration conf/dledger/broker-n0.conf.  

```
brokerClusterName = RaftCluster
brokerName=RaftNode00
listenPort=30911
namesrvAddr=127.0.0.1:9876
storePathRootDir=/tmp/rmqstore/node00
storePathCommitLog=/tmp/rmqstore/node00/commitlog
enableDLegerCommitLog=true
dLegerGroup=RaftNode00
dLegerPeers=n0-127.0.0.1:40911;n1-127.0.0.1:40912;n2-127.0.0.1:40913
## must be unique
dLegerSelfId=n0
sendMessageThreadPoolNums=16
```

### 1.2 Start Broker

Startup stays consistent with the old version.

`nohup sh bin/mqbroker -c conf/dledger/xxx-n0.conf & `  
`nohup sh bin/mqbroker -c conf/dledger/xxx-n1.conf & `  
`nohup sh bin/mqbroker -c conf/dledger/xxx-n2.conf & `  


## 2. Upgrade old cluster

If old cluster deployed in Master mode, then each Master needs to be transformed into a RocketMQ-on-DLedger Group.  
If old cluster deployed in Master-Slave mode, then each Master-Slave group needs to be transformed into a RocketMQ-on-DLedger Group.

### 2.1 Kill old Broker

Execute kill command, or call `bin/mqshutdown broker`.

### 2.2 Check old Commitlog

Each node in RocketMQ-on-DLedger group is compatible with old Commitlog, but Raft replicating process works on the adding message only. So, to avoid occurring exceptions, old Commitlog must be consistent.
If old cluster deployed in Master-Slave mode, it maybe inconsistent after shutdown. Advising use md5sum to check at least 2 recently Commitlog file, if occur inconsistent, maintain consistent by copy.

Although RocketMQ-on-DLedger Group can deployed with 2 nodes, it lacks failover ability(at least 3 nodes can tolerate one node fail).
Make sure that both Master and Slave's Commitlog is consistent, then prepare 3 machines, copy old Commitlog from Master to this 3 machines(BTW, copy the config directory).

Then, go ahead to set configurations.

### 2.3 Modify configuration

Refer to New cluster deployment.

### 2.4 Restart Broker 

Refer to New cluster deployment.
# Deployment Method

In the Apache RocketMQ 5.0 version, basic message sending and receiving is completed, including the NameServer, Broker, and Proxy components. In the 5.0 version, the Proxy and Broker can be divided into Local mode and Cluster mode according to actual requirements. Generally, if there are no special requirements or if you follow the approach of smoothly upgrading from earlier versions, you can use Local mode.

- In Local mode, the Broker and Proxy are deployed in the same process, and you can run it by simply adding a Proxy configuration based on the original Broker configuration.
- In Cluster mode, the Broker and Proxy are deployed separately, that is, in addition to the existing cluster, you can deploy the Proxy separately.

## Deployment Scenarios and Use Constraints

## Deployment in Local Mode

Since the Proxy and Broker are deployed in the same process in Local mode, the Proxy is stateless, so the main cluster configuration can still be based on the Broker.

### Single Node Single Replica Mode

:::caution
This method carries a high risk, as there is only one node for the Broker, and if the Broker restarts or goes down, the entire service will be unavailable. It is not recommended in online environments, but can be used for local testing.
:::

#### Start NameServer

```bash
### Start Name Server first
$ nohup sh mqnamesrv &
 
### Verify that the Name Server has started successfully.
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

#### Start Broker+Proxy

```bash

$ nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &

### Verify that the Broker has started successfully, for example, the broker IP is 192.168.1.2, and the name is broker-A
$ tail -f ~/logs/rocketmqlogs/broker_default.log 
The broker[xxx, 192.169.1.2:10911] boot success...
```

### Multiple Node (Cluster) Single Replica Mode

All nodes in a cluster are deployed with the Master role, and no Slave replicas are deployed, such as 2 Masters or 3 Masters. The advantages and disadvantages of this mode are as follows:

- Advantages: Simple configuration, a single Master's downtime or restart has no effect on the application, and when the disk is configured as RAID10, even if the machine goes down irrecoverably, the message will not be lost due to the reliability of the RAID10 disk (asynchronous disk flush loses a small amount of messages, synchronous disk flush does not lose a single message), and has the highest performance;
- Disadvantages: During a single machine's downtime, messages that have not been consumed on this machine cannot be subscribed before the machine recovers, and message timeliness will be affected.

### Start NameServer

The NameServer needs to start before the Broker, and if it is used in a production environment, it is recommended to start 3 NameServers for general-scale clusters to ensure high availability. The start commands for each node are the same, as follows:

```bash
### Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify that the Name Server has started successfully.
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

#### Start Broker+Proxy cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-a.properties --enable-proxy &
 
### On machine A, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-b.properties --enable-proxy &

...
```

:::note

The above start command is used in the case of a single NameServer. For a cluster with multiple NameServers, the address list after `-n` in the Broker start command is separated by semicolons, such as `192.168.1.1:9876;192.161.2:9876`.

:::

## Multiple Node (Cluster) Multiple Replica Mode - Asynchronous Replication

Each Master is configured with a Slave, and there are multiple Master-Slave pairs. HA uses asynchronous replication, and there is a brief message delay (millisecond level) between the primary and secondary. The advantages and disadvantages of this mode are as follows:

- Advantages: Even if the disk is damaged, very few messages are lost, and message timeliness is not affected. At the same time, after the Master goes down, consumers can still consume from the Slave, and this process is transparent to the application and does not require manual intervention, and the performance is almost the same as the multiple Master mode;
- Disadvantages: A small number of messages will be lost in the event of a Master outage or disk damage.

#### Start NameServer

```bash
### Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify that the Name Server has started successfully.
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

#### Start Broker+Proxy cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a.properties --enable-proxy &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b.properties --enable-proxy &
 
### On machine C, start the first slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a-s.properties --enable-proxy &
 
### On machine D, start the second slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b-s.properties --enable-proxy &
```

### Multiple Node (Cluster) Multiple Replica Mode - Synchronous Dual Write

Each Master is configured with a Slave, and there are multiple Master-Slave pairs. HA uses synchronous dual write, which means that only if both primary and secondary write succeed, it returns success to the application. The advantages and disadvantages of this mode are as follows:

- Advantages: Both data and service have no single point of failure, and there is no delay in messages in the event of a Master outage, and both service availability and data availability are very high;
- Disadvantages: Performance is slightly lower than asynchronous replication mode (about 10% lower), the RT for sending a single message is slightly higher, and in the current version, after the primary node goes down, the standby cannot automatically switch to the primary.

#### Start NameServer

```bash
###  Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify tha Name Server has started successfully
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

#### Start Broker+Proxy cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a.properties --enable-proxy &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b.properties --enable-proxy &
 
### On machine C, start the first slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a-s.properties --enable-proxy &
 
### On machine D, start the second slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b-s.properties --enable-proxy &
```
:::tip
The pairing of the above Broker and Slave is done by specifying the same BrokerName parameter. The BrokerId of the Master must be 0, and the BrokerId of the Slave must be a number greater than 0. In addition, multiple Slaves can be mounted on another Master, and multiple Slaves under the same Master are distinguished by specifying different BrokerIds. $ROCKETMQ_HOME refers to the RocketMQ installation directory, and this environment variable needs to be set by the user.
:::

## Deployment in Cluster Mode

In Cluster mode, the Broker and Proxy are deployed separately, and I can deploy the Proxy after the NameServer and Broker have been started.

In Cluster mode, a Proxy cluster and a Broker cluster have a one-to-one correspondence, and the `rocketMQClusterName` can be configured in the Proxy's configuration file `rmq-proxy.json`.

### Start NameServer

```bash
### Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify tha Name Server has started successfully
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

### Start Broker

#### Single node single replica mode 

:::caution
This method has a higher risk because the Broker has only one node. If the Broker restarts or goes down, the entire service will be unavailable. It is not recommended for use in a production environment, but can be used for local testing.
:::

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 &
```

#### Multiple node (cluster) single replica mode

In this mode, all nodes in a cluster are deployed as Master roles, without deploying any Slave replicas, such as 2 Masters or 3 Masters. The advantages and disadvantages of this mode are as follows:

- Advantages: Simple configuration, single Master downtime or restart has no impact on the application, and when the disk is configured as RAID10, even if the machine goes down and cannot be recovered, due to the reliability of RAID10 disks, messages will not be lost (asynchronous flush disk loses a small amount of messages, synchronous flush disk does not lose any messages), and the performance is the highest;
- Disadvantages: During the downtime of a single machine, the messages on this machine that have not been consumed cannot be subscribed before the machine recovers, and the real-time nature of the messages will be affected.

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-a.properties &
 
### On machine B, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-b.properties &

...
```

:::note

The above startup command is used in the case of a single NameServer. For a cluster of multiple NameServers, the address list following the `-n` in the Broker startup command can be separated by semicolons, for example `192.168.1.1:9876;192.161.2:9876`.

:::

#### Multiple Node (Cluster) Multiple Replica Mode - Asynchronous Replication

Each Master is configured with one Slave, and there are multiple Master-Slave pairs. HA uses asynchronous replication, with a brief delay (millisecond level) between the primary and the standby. The advantages and disadvantages of this mode are as follows:

- Advantages: Even if the disk is damaged, the loss of messages is very small, and the timeliness of messages is not affected. In addition, after the Master goes down, consumers can still consume from the Slave, and this process is transparent to the application and does not require manual intervention. The performance is almost the same as in the multiple Master mode.
- Disadvantages: In the event of a Master crash or disk damage, a small number of messages will be lost.

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a.properties &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b.properties &
 
### On machine C, start the first Slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a-s.properties &
 
### On machine B, start the second Slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b-s.properties &
```

#### Multiple Node (Cluster) Multiple Replica Mode - Synchronous Dual Write

Each Master is configured with one Slave, and there are multiple Master-Slave pairs. HA uses synchronous dual write, which only returns success to the application if both the primary and the standby have written successfully. The advantages and disadvantages of this mode are as follows:

- Advantages: Both data and service are free from single point failures. In the event of a Master crash, there is no delay in messages, and both the availability of the service and the availability of the data are very high.
- Disadvantages: Performance is slightly lower than in the asynchronous replication mode (about 10% lower), RT for sending a single message is slightly higher, and in the current version, the standby cannot automatically switch to the primary after the primary node goes down.

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a.properties &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b.properties &
 
### On machine C, start the first Slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a-s.properties &
 
### On machine B, start the second Slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b-s.properties &
```
:::tip
The pairing of Broker and Slave is done by specifying the same BrokerName parameter. The BrokerId of the Master must be 0, and the BrokerId of the Slave must be a number greater than 0. In addition, multiple Slaves can be mounted under one Master, and multiple Slaves under the same Master are distinguished by specifying different BrokerIds. $ROCKETMQ_HOME refers to the RocketMQ installation directory, which needs to be set by the user as an environment variable.
:::

### Start Proxy

Multiple Proxies can be started on multiple machines. 

```shell
### On machine A start the first Proxy, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqproxy -n 192.168.1.1:9876 &

### On machine B start the second Proxy, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqproxy -n 192.168.1.1:9876 &

### On machine C start the third Proxy, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh bin/mqproxy -n 192.168.1.1:9876 &
```

If you need to specify a configuration file, you can use `-pc` or `--proxyConfigPath` to specify it.

```shell
### custom config file
$ nohup sh bin/mqproxy -n 192.168.1.1:9876 -pc /path/to/proxyConfig.json &
```


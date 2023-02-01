# Deployment Method

## Single Master mode

:::caution
This mode carries a higher risk, as a restart or failure of the Broker will result in the entire service being unavailable. It is not recommended in online environments, but can be used for local testing.
:::

### Start NameServer

```bash
### Start Name Server first
$ nohup sh mqnamesrv &
 
### Verify if the Name Server has started successfully
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

### Start Broker

```bash
### Start Broker
$ nohup sh bin/mqbroker -n localhost:9876 &

### Verify that the Broker has started successfully, for example, the broker IP is 192.168.1.2, and the name is broker-a
$ tail -f ~/logs/rocketmqlogs/Broker.log 
The broker[broker-a, 192.169.1.2:10911] boot success...
```

## Multiple master mode

The advantages and disadvantages of a cluster which is full of masters without slaves (e.g. 2 or 3 masters) is as follows:

- Advantages: simple configuration, no impact on the application when a single master is restarted or down, when the disk is configured as RAID10, even if the machine is down and cannot be recovered, due to the reliability of RAID10 disks, messages will not be lost (asynchronous flush loses a small number of messages, synchronous flush does not lose a single message), and the performance is the highest;
- Disadvantages: During the downtime of a single machine, the messages that have not been consumed on this machine are not available for subscription before the machine is recovered, and the real-time nature of the messages will be affected.

### Start NameServer

NameServer needs to start before Broker, and if used in a production environment, it is recommended to start 3 NameServers for general scale clusters, and the start commands for each node are the same, as follows:

```bash
### Start Name Server first
$ nohup sh mqnamesrv &
 
### Verify if the Name Server has started successfully
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

### Start Broker cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-a.properties &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-noslave/broker-b.properties &

...
```

:::note

The above startup command is used in the case of a single NameServer. For clusters with multiple NameServers, the address list after the `-n` in the Broker startup command can be separated by semicolons, for example `192.168.1.1:9876;192.161.2:9876`.

:::

## Multiple Master-Multiple Slave mode-asynchronous replication

Each Master is configured with one Slave, resulting in multiple Master-Slave pairs. In this High Availability (HA) setup, there is a brief message delay (in the milliseconds range) due to asynchronous replication. The advantages and disadvantages of this mode are as follows:

- Advantages: In the event of disk damage, the number of lost messages is minimal and the real-time nature of messages is not affected. Additionally, even if the Master goes down, consumers can still consume from the Slave, and this process is transparent to the application and does not require manual intervention, with performance being almost the same as the Multiple Master mode.

- Disadvantages: In the event of a Master outage or disk damage, a small number of messages may be lost.

### Start NameServer

```bash
### Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify that the Name Server has started successfully.
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

### Start Broker cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a.properties &
 
### On machine B, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b.properties &
 
### On machine C, start the first slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a-s.properties &
 
### On machine D, start the second slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b-s.properties &
```

## Multiple Master-Multiple Slave mode-synchronous dual writes

Each Master is configured with one Slave, resulting in multiple Master-Slave pairs. In this High Availability (HA) setup, synchronous dual writes are used, meaning that success is only returned to the application if both the Master and the Slave write successfully. The advantages and disadvantages of this mode are as follows:

- Advantages: There are no single points of failure for either data or service, and in the event of a Master outage, there is no message delay and both service availability and data availability are very high.

- Disadvantages: Performance is slightly lower than the asynchronous replication mode (about 10% lower), the round-trip time for sending a single message is slightly higher, and in the current version, the standby cannot automatically switch to the primary after the primary node goes down.

### Start NameServer

```bash
### Start NameServer first
$ nohup sh mqnamesrv &
 
### Verify that the Name Server has started successfully.
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

### Start Broker cluster

```bash
### On machine A, start the first Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a.properties &
 
### On machine A, start the second Master, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b.properties &
 
### On machine C, start the first slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a-s.properties &
 
### On machine D, start the second slave, for example, the IP of the NameServer is: 192.168.1.1
$ nohup sh mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b-s.properties &
```
:::tip
The pairing of the above Broker and Slave is done by specifying the same BrokerName parameter. The BrokerId of the Master must be 0, and the BrokerId of the Slave must be a number greater than 0. In addition, multiple Slaves can be mounted under one Master, and multiple Slaves under the same Master are distinguished by specifying different BrokerIds. $ROCKETMQ_HOME refers to the RocketMQ installation directory, which the user needs to set as an environment variable.
:::
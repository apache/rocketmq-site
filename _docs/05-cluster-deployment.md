---
title: "Cluster Configuration and Deployment"
permalink: /docs/cluster-deployment/
modified: 2016-12-16T15:01:43-04:00
---

# Prerequisite

Before starting this section, make sure you have read Quick Start section, in which core concepts and components of RocketMQ are introduced.

{% include toc %}

# Introduction

This section is to introduce deployment solution that may be considered production ready.  Generally speaking, we are deploying a resilient RocketMQ cluster having no single point of failure.

# Name Server

To ensure the cluster can still operate normally when name server instance crashes, two or more name server instances are recommended.  As long as there is one name server instance alive, the whole cluster remains serving.

Name server follows share-nothing design paradigm. Brokers send heartbeat data to all name servers. Producers and consumers may query meta data from any one of name servers available while sending / consuming messages.

# Broker

Brokers can be divided into two categories according to their roles: master and slave. Master brokers can read and write while slave brokers can only read messages replicated from master. Master brokers have brokerID=0; brokerID of slave is non-zero.

Brokers may also be grouped by the brokerName property. Slave brokers find their master through brokerName. One master broker along with zero, one or multiple slave brokers is called a broker set.

In serious scenarios, we should have at least two broker sets. Each topic, as you guess,  resides in two or more broker sets.


# Disk Flush Type: SYNC_FLUSH / ASYNC_FLUSH

Each broker can be configured to be sync or async in terms of IO flushing strategy. To put it simply, if your business tolerates none message loss at extreme scenarios like OS crash or power loss, SYNC_FLUSH mode is recommended. Broker of SYNC_FLUSH mode would flush each message it receives onto disk before acknowledging producer. Obviously, throughout of this mode is highly dependent on IOPS of your hard disk. 

Broker of ASYNC_FLUSH mode, on the other hand, takes advantage of group-committing: only flushes dirty page caches to disk periodically or when count of dirty page caches reaches certain amount. Hence, the latter yields better performance.

# Replication: Sync / Async Broker

Similar to many replication system, sync brokers await until commit log is replicated to a slave before acknowledging. Async brokers, instead, return immediately after messages are processed on master. 

# Configuration

There are three pre-built configurations shipped with the distribution of RocketMQ under conf folder for your reference:

1. 2m-2s-sync
1. 2m-2s-async
1. 2m-noslave

Note: all configurations uses ASYNC_FLUSH. 

# Deployment Example

For example, We want to have a cluster with 2 name servers, 2 broker sets with general purpose:
for this example, we choose `2m-2s-sync`
Assuming binary RocketMQ is at `/home/rocketmq/dist`

1. Start up two name servers as is shown in Quick Start guide. Assume their IPs are 192.168.0.2 and 192.168.0.3.

2. Start brokers

   `cd /home/rocketmq/dist/bin`

   `bash mqbroker -c ../conf/2m-2s-sync/broker-a.properties -n 192.168.0.2:9876,192.168.0.3:9876`

   `bash mqbroker -c ../conf/2m-2s-sync/broker-a-s.properties -n 192.168.0.2:9876,192.168.0.3:9876`

   `bash mqbroker -c ../conf/2m-2s-sync/broker-b.properties -n 192.168.0.2:9876,192.168.0.3:9876`

   `bash mqbroker -c ../conf/2m-2s-sync/broker-b-s.properties -n 192.168.0.2:9876,192.168.0.3:9876`

3. Verify

   Execute the following command to verify

   `bash mqadmin clusterList`

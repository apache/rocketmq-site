---
title: "RocketMQ Architecture"
permalink: /docs/rmq-arc/
excerpt: "The main Architecture of Apache RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---


{% include toc %}


![](/assets/images/rmq-basic-arc.png)

# Overview

Apache RocketMQ is a distributed messaging and streaming platform with low latency, high performance and reliability, trillion-level capacity and flexible scalability. It consists of four parts: name servers, brokers, producers and consumers. Each of them can be horizontally extended without a single Point of Failure. As shown in screenshot above.



**NameServer Cluster**

Name Servers provide lightweight service discovery and routing. Each Name Server records full routing information, provides corresponding reading and writing service, and supports fast storage expansion.

**Broker Cluster**

Brokers take care of message storage by providing lightweight TOPIC and QUEUE mechanisms. They support the Push and Pull model, contains fault tolerance mechanism (2 copies or 3 copies), and provides strong padding of peaks and capacity of accumulating hundreds of billion messages in their original time order. In addition, Brokers provide disaster recovery, rich metrics statistics, and alert mechanisms, all of which are lacking in traditional messaging systems.

**Producer Cluster**

Producers support distributed deployment. Distributed Producers send messages to the Broker cluster through multiple load balancing modes. The sending processes support fast failure and have low latency.

**Consumer Cluster**

Consumers support distributed deployment in the Push and Pull model as well. It also supports cluster consumption and message broadcasting. It provides real-time message subscription mechanism and can meet most consumer requirements. 
RocketMQ’s website provides a simple quick-start guide to interested users.

# NameServer

NameServer is a fully functional server, which mainly includes two features:

* Broker Management, **NameServer** accepts the register from Broker cluster and provides heartbeat mechanism to check whether a broker is alive.
* Routing Management, each NameServer will hold whole routing info about the broker cluster and the **queue** info for clients query.

As we know, RocketMQ clients(Producer/Consumer) will query the queue routing info from NameServer, but how do clients find NameServer address?

There are four methods to feed NameServer address list to clients:

* Programmatic Way, like `producer.setNamesrvAddr("ip:port")`.
* Java Options, use `rocketmq.namesrv.addr`.
* Environment Variable, use `NAMESRV_ADDR`.
* HTTP Endpoint.

More details about how to find NameServer address please refer to [here](/rocketmq/four-methods-to-feed-name-server-address-list/).

# Broker Server

Broker server is responsible for message store and delivery, message query, HA guarantee, and so on.

As shown in image below, Broker server has several important sub modules:

* Remoting Module, the entry of broker, handles the requests from clients.
* Client Manager, manages the clients (Producer/Consumer) and maintains topic subscription of consumer.
* Store Service, provides simple APIs to store or query message in physical disk.
* HA Service, provides data sync feature between master broker and slave broker.
* Index Service, builds index for messages by specified key and provides quick message query.

![](/assets/images/rmq-basic-component.png)


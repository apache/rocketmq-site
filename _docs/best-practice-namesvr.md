---
title: "Best Practice For NameServer"
permalink: /docs/best-practice-namesvr/
modified: 2016-12-24T15:01:43-04:00
---

In Apache RocketMQ, name servers are designed to coordinate each component of the distributed system
and the coordination is mainly achieved through managing topic routing information.

{% include toc %}

Management consists of two parts:
- Brokers periodically renew meta data kept in every name server.
- Name servers are serving clients, including producers, consumers and command line clients with the latest routing information.

Therefore, before launching brokers and clients, we need to tell them how to reach name servers by feeding them with a name server address list.
In Apache RocketMQ, this can be done in four ways.

## Programmatic Way

For brokers, we can specify `namesrvAddr=name-server-ip1:port;name-server-ip2:port` in broker configuration file.

For producers and consumers, we can feed name server address list to them as follows:

```java
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
producer.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");

DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
consumer.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");
```

If you use admin command line from shell, you can also specify this way:

```bash
sh mqadmin command-name -n name-server-ip1:port;name-server-ip2:port -X OTHER-OPTION
```

A simple example is:
`sh mqadmin -n localhost:9876 clusterList`
assuming to query cluster info on the name server node.

If you have integrated admin tool into your own dashboard, you can:

```java
DefaultMQAdminExt defaultMQAdminExt = new DefaultMQAdminExt("please_rename_unique_group_name");
defaultMQAdminExt.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");
```
    
    
## Java Options

Name server address list may also be fed to your application through specifying the sequel java option 
`rocketmq.namesrv.addr` before launching.
    
## Environment Variable

You can export `NAMESRV_ADDR` environment variable. Brokers and clients will examine and use its value if set.
    
    
## HTTP Endpoint

If you do not specify name server address list using previously mentioned methods, Apache RocketMQ will access
 the following HTTP end point to acquire and update name server address list every two minutes with initial delay of
 ten seconds.

By default, the end point is:

`http://jmenv.tbsite.net:8080/rocketmq/nsaddr`

You may override `jmenv.tbsite.net` using this Java option: `rocketmq.namesrv.domain`,
You may also override `nsaddr` part using this Java option: `rocketmq.namesrv.domain.subgroup`

If you are running Apache RocketMQ in production, this method is recommended because it gives you maximum flexibility
 -- you can dynamically add or remove name server nodes without necessity of rebooting your brokers and clients 
 according to your name servers' system load.
     
     
##  Priority

Methods introduced first take precedence over the latter ones: <br>
`Programmatic Way > Java Options > Environment Variable > HTTP Endpoint`



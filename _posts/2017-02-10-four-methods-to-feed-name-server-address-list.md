---
title: "Four Methods to Feed Name Server Address List"
categories:
  - RocketMQ
tags:
  - RocketMQ
  - Name Server
---

Apache RocketMQ is a distributed system that each components should be properly coordinated to work smoothly. Name 
servers are designed to take much of this responsibility through managing topic route information.

The management, roughly speaking, consists two parts. The first one is that brokers report to name servers on meta data
of themselves and topics they have. The second is serving clients, including producer, consumer and command line
 executables these meta data.

As a result, before launching brokers and clients, we need to feed name server address list to them. Apache RocketMQ 
provides four methods to achieve this goal.

1. Programmatic Way

   For broker, we may specify `namesrvAddr=name-server-ip1:port;name-server-ip2:port` in broker configuration file.
   
   For producers and consumers, we may feed name server address list to them as follows:
   
   `
   DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
   producer.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");`
   
   `
   DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
   consumer.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");`
   
   If you use admin command line from shell, you may specify this way:
   `sh mqadmin command-name -n name-server-ip1:port;name-server-ip2:port -x other-options`
   
   a simple example is:
   `sh mqadmin -n localhost:9876 clusterList`
   assuming to query cluster info on the name server node.
   
   If integrating admin tool into your own dashboard, you may
   `DefaultMQAdminExt defaultMQAdminExt = new DefaultMQAdminExt("please_rename_unique_group_name");
    defaultMQAdminExt.setNamesrvAddr("name-server1-ip:port;name-server2-ip:port");`
    
    
2. Java Options

    Name server address list may also be fed to your application through specifying the sequel java option 
    `rocketmq.namesrv.addr` before launching.
    
3. Environment Variable

   A third method is via environment variable: you can export `NAMESRV_ADDR` environment variable. Brokers and clients 
   will examine and use its value if set.
    
    
4. HTTP Endpoint

    If you do not specify name server address list using previously mentioned methods, Apache RocketMQ will access
     the following HTTP end point to acquire and update name server address list every two minutes with initial delay of
     ten seconds.
    
    On default, the end point is:
    
    `http://jmenv.tbsite.net:8080/rocketmq/nsaddr`
    
    You may override `jmenv.tbsite.net` by this java option: `rocketmq.namesrv.domain`,
    You may also override `nsaddr` part by this java option: `rocketmq.namesrv.domain.subgroup`
    
    This method is recommended because it gives you maximum flexibility, aka, you can dynamically add or 
    remove name server node without necessity of rebooting your brokers and clients according to your name servers'
    system load.
     
     
*  Priority

    Methods introduced first take precedence over the latter, namely,
    Programmatic Way > Java Options > Environment Variable > HTTP Endpoint
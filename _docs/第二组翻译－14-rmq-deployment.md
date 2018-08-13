[toc]
# 部署
这一部分介绍生产环境部署方案。概括来说，我们要部署一个没有单点故障的弹性RocketMQ集群。
## 必要条件
在开始之前，确定你已经阅读过快速上手部分，并熟知RocketMq的核心概念和组件。
### 生产准备环境部署
### Name Server
为了确保集群在一个实例崩溃时仍然可以运行，建议使用两个或两个以上的name server实例，只要集群中有一个实例是可用的，整个集群就可以持续提供服务。

Name Server遵从share-nothing设计方式。Brokers发送心跳数据到所有name server.当要发送或者消费消息时，生产者和消费者可以从任何一台可用的Name server服务查询到信息。
### Broker
根据它们的角色，brokers可以分为两类：master（主）和slave（从）。master同时提供读写服务，而slave只提供读服务。

为了部署一个没有单点故障的高可用RocketMQ集群，需要部署一系列的broker集合。一个broker集合包含一个brokerId为0的master和多个brokerId不为0的slave。这个broker集合的主从broker需要配置相同的brokerName。极端情况下，一个broker集群中至少部署两个broker。每个topic都存在于两个或多个broker中。
## 配置
当你部署一个rocketMQ集群时，推荐配置如下表所示：
### broker配置

| 属性名称 | 默认名称 | 详细描述 |
| -------- | -------- | -------- |
| listenPort | 10911 | 客户端连接的端口 |
| namesrvAddr | null | name server的地址 |
| brokerIP1 | 网址 | 如果有多个地址，需要配置多个 |
| brokerName | null | 代理名称 |
| brokerClusterName  | DefaultCluster | 描述这个broker属于哪个集群 |
| brokerId | 0 | 代理id，0代表主，正数代表从 |
| storePathCommitLog | $HOME/store/commitlog/ | 提交日志的存放路径 |
| storePathConsumerQueue | $HOME/store/consumequeue/ | 消费队列的存放路径 |
| mapedFileSizeCommitLog | 1024 * 1024 * 1024(1G) | 提交日志的映射文件大小 |
| deleteWhen | 04 | 何时删除已超出保留时间的commitlog文件 |
| fileReserverdTime | 72 | commitlog删除之前，保存多少小时 |
| brokerRole | ASYNC_MASTER | broker的角色，同步主(SYNC_MASTER)/异步主(ASYNC_MASTER)/从(SLAVE) |
| flushDiskType | ASYNC_FLUSH | 刷磁盘的模式：同步模式(SYNC_FLUSH)会在响应每次生产者前写入磁盘，异步模式(ASYNC_FLUSH)会提高处理生产者组的提交处理能力 |
## 命令行管理工具
RocketMQ提供了一个命令行管理工具，用于查询、管理和诊断各种问题。
### 如何获得
这个工具和RocketMQ放到了一起，无论你是下载的是编译好的版本还是自己编译，你的环境中都已经有了这个工具。

如果你需要源码，rocketmq-tools模块包含它自己的源码。
### 如何使用
使用管理工具非常简单。为了演示，我们假设你已经在*nix环境中。

切换到${PACKAGE}/bin目录，输入bash mqadmin，你会看到如下帮助菜单：

```
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
有关特定命令的信息请使用bash mqadmin help进行查看，如果你想知道更多的关于某个具体命令的信息，比如clusterList，你只需要输入bash mqadmin help clusterList，你会看到：
```
usage: mqadmin clusterList [-h] [-i <arg>] [-m] [-n <arg>]
 -h,--help                Print help
 -i,--interval <arg>      specify intervals numbers, it is in seconds
 -m,--moreStats           Print more stats
 -n,--namesrvAddr <arg>   Name server address list, eg: 192.168.0.1:9876;192.168.0.2:9876
```
## 复制模式
为了确保不会丢失发布成功的消息，RocketMQ提供同步和异步两种复制方式来增强消息的可靠性与高可用性。
### 复制：同步/异步broker
像许多复制系统一样，同步模式的broker会等待直到slave对提交日志完成复制再确认，相反，异步模式的broker会在mater节点处理成功后立即返回结果。
### 如何配置
在conf文件夹下，随RocketMQ的分发，有三种预先构建的配置供您参考：

```
2m-2s-sync
2m-2s-async
2m-noslave
```
注意：所有的配置采用异步模式ASYNC_FLUSH
### 部署
拿2m-2s-sync的部署来举例说明，首先按照在快速开始部分介绍的内容启动两个name server。假设它们的ip分别为192.168.0.2 和 192.168.0.3。

然后启动brokers（假设编译好的RocketMQ在目录 /home/rocketmq/dist下）

```
>cd /home/rocketmq/dist/bin
>bash mqbroker -c ../conf/2m-2s-sync/broker-a.properties -n 192.168.0.2:9876,192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-a-s.properties -n 192.168.0.2:9876,192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-b.properties -n 192.168.0.2:9876,192.168.0.3:9876
>bash mqbroker -c ../conf/2m-2s-sync/broker-b-s.properties -n 192.168.0.2:9876,192.168.0.3:9876
How to verify
Execute the following command to verify according to the CLI section:
> bash mqadmin clusterlist
```
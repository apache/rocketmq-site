# RocketMQ Promethus Exporter

## 介绍


`Rocketmq-exporter` 是用于监控 RocketMQ broker 端和客户端所有相关指标的系统，通过 `mqAdmin` 从 broker 端获取指标值后封装成 87 个 cache。
:::caution
过去版本曾是 87 个 concurrentHashMap，由于 Map 不会删除过期指标，所以一旦有 label 变动就会生成一个新的指标，旧的无用指标无法自动删除，久而久之造成内存溢出。而使用 Cache 结构可可以实现过期删除，且过期时间可配置。
:::

`Rocketmq-expoter` 获取监控指标的流程如下图所示，Expoter 通过 MQAdminExt 向 MQ 集群请求数据，请求到的数据通过 MetricService 规范化成 Prometheus 需要的格式，然后通过 /metics 接口暴露给 Promethus。
<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h4l5ui30u2j21dy0u076k.jpg"></img>



### Metric 结构

`Metric` 类位于 `org.apache.rocketmq.expoter.model.metrics` 包下，实质上是一些实体类，每个实体类代表一类指标, 总共 14 个 Metric 类。这些类作为 87 个 Cache 的 key， 用不同的 label 值进行区分。


:::note 实体类中包含了 label 的三个维度：broker、consumer、producer
- **broker 相关 metric 类有**: BrokerRuntimeMetric、BrokerMetric、DLQTopicOffsetMetric、TopicPutNumMetric

- **消费者相关类有**: ConsumerRuntimeConsumeFailedMsgsMetric 、ConsumerRuntimeConsumeFailedTPSMetric 、ConsumerRuntimeConsumeOKTPSMetric、ConsumerRuntimeConsumeRTMetric、ConsumerRuntimePullRTMetric、ConsumerRuntimePullTPSMetric、ConsumerCountMetric、ConsumerMetric、ConsumerTopicDiffMetric

- **生产者相关 metric 类有**: ProducerMetric 
:::

### Prometheus 拉取 metrics 的过程

`RocketMQ-exporter` 项目和 `Prometheus` 相当于服务器和客户端的关系，RocketMQ-exporter 项目引入了 Prometheus 的 client 包，该包中规定了需要获取的信息的类型即项目中的 MetricFamilySamples 类，Prometheus 向 expoter 请求 metrics，expoter 将信息封装成相应的类型之后返回给 Prometheus。

rocketmq-expoter 项目启动后，会获取 rocketmq 的各项 metrics 收集到 mfs 对象中，当浏览器或 Prometheus 访问相应的接口时，会通过 service 将 mfs 对象中的 samples 生成 Prometheus 所支持的格式化数据。主要包含以下步骤：

浏览器通过访问 ip:5557/metrics，会调用 RMQMetricsController 类下的 metrics 方法，其中 ip 为 rocketmq-expoter 项目运行的主机 ip

```java
private void metrics(HttpServletResponse response) throws IOException {
    StringWriter writer = new StringWriter();
    metricsService.metrics(writer);
    response.setHeader("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
    response.getOutputStream().print(writer.toString());
}
```

通过新建 StringWriter 对象用于收集 metrics 指标，调用 MetricsService 类中的方法 metrics 将 expoter 中提取到的指标收集到 writer 对象中，最后将收集到的指标输出到网页上。

收集到的指标格式为:

```javascript
<metric name>{<label name>=<label value>, ...} <metric value>
```

如：

```javascript
rocketmq_group_diff{group="rmq_group_test_20220114",topic="fusion_console_tst",countOfOnlineConsumers="0",msgModel="1",} 23.0
```

### MetricCollectTask 类中的 5 个定时任务

MetricCollectTask 类中有 5 个定时任务，分别为 collectTopicOffset、collectConsumerOffset、collectBrokerStatsTopic、collectBrokerStats 和 collectBrokerRuntimeStats。用于收集消费位点信息以及 Broker 状态信息等。其 cron 表达式为：cron: 15 0/1 \* \* \* ?，表示每分钟会收集一次。其核心功能是通过 mqAdminExt 对象从集群中获取 broker 中的信息，然后将其添加到对应的 87 个监控指标中，以 collectTopicOffset 为例：

1. 首先初始化TopicList对象，通过mqAdminExt.fetchAllTopicList()方法获取到集群的所有topic信息。


```java
   ```java
    TopicList topicList = null;
    try {  topicList = mqAdminExt.fetchAllTopicList();
} catch (Exception ex) {
        log.error(String.format("collectTopicOffset-exception comes getting topic list from namesrv, address is %s",
            JSON.toJSONString(mqAdminExt.getNameServerAddressList())));
        return;
    }
```

2. 将 topic 加入到 topicSet 中，循环遍历每一个 topic，通过 mqAdminExt.examineTopicStats(topic)函数来检查 topic 状态。

```java
    Set < String > topicSet = topicList != null ? topicList.getTopicList() : null;
 for (String topic: topicSet) {
     TopicStatsTable topicStats = null;
     try {
         topicStats = mqAdminExt.examineTopicStats(topic);
     } catch (Exception ex) {
         log.error(String.format("collectTopicOffset-getting topic(%s) stats error. the namesrv address is %s",
             topic,
             JSON.toJSONString(mqAdminExt.getNameServerAddressList())));
         continue;}
```

3. 初始化 topic 状态 set，用于用于按 broker 划分的 topic 信息位点的 hash 表 brokerOffsetMap，以及一个用于按 broker 名字为 key 的用于存储更新时间戳的 hash 表 brokerUpdateTimestampMap。

```java
        Set<Map.Entry<MessageQueue, TopicOffset>> topicStatusEntries = topicStats.getOffsetTable().entrySet();
        HashMap<String, Long> brokerOffsetMap = new HashMap<>();
        HashMap<String, Long> brokerUpdateTimestampMap = new HashMap<>();
        for (Map.Entry<MessageQueue, TopicOffset> topicStatusEntry : topicStatusEntries) {
            MessageQueue q = topicStatusEntry.getKey();
            TopicOffset offset = topicStatusEntry.getValue();
            if (brokerOffsetMap.containsKey(q.getBrokerName())) {
                brokerOffsetMap.put(q.getBrokerName(), brokerOffsetMap.get(q.getBrokerName()) + offset.getMaxOffset());
            } else {
                brokerOffsetMap.put(q.getBrokerName(), offset.getMaxOffset());
            }
            if (brokerUpdateTimestampMap.containsKey(q.getBrokerName())) {
                if (offset.getLastUpdateTimestamp() > brokerUpdateTimestampMap.get(q.getBrokerName())) {
                    brokerUpdateTimestampMap.put(q.getBrokerName(), offset.getLastUpdateTimestamp());
                }
            } else {
                brokerUpdateTimestampMap.put(q.getBrokerName(),
                offset.getLastUpdateTimestamp());
            }
        }

```

4. 最后通过遍历 brokerOffsetMap 中的每一项，通过调用 metricsService 获取到 metricCollector 对象，调用 RMQMetricsCollector 类中的 addTopicOffsetMetric 方法，将相应的值添加到 RMQMetricsCollector 类中 87 个指标对应的其中一个指标的 cache 中。

```java
 Set<Map.Entry<String, Long>> brokerOffsetEntries = brokerOffsetMap.entrySet();
        for (Map.Entry<String, Long> brokerOffsetEntry : brokerOffsetEntries) {
            metricsService.getCollector().addTopicOffsetMetric(clusterName, brokerOffsetEntry.getKey(), topic,
                brokerUpdateTimestampMap.get(brokerOffsetEntry.getKey()), brokerOffsetEntry.getValue());
        }
    }
    log.info("topic offset collection task finished...." + (System.currentTimeMillis() - start));
}
```

### Rocketmq-exporter 收集指标流程图

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h4l64nrfwrj20oz0btmze.jpg"></img>

## 快速开始

### 配置 `application.yml`

`application.yml` 中重要的配置主要有:

- server.port 设置 promethus 监听 rocketmq-exporter 的端口, 默认为 5557

- rocketmq.config.webTelemetryPath 配置 promethus 获取指标的路径,默认为 /metrics ，使用默认值即可.

- rocketmq.config.enableACL 如果 RocketMQ 集群开启了 ACL 验证,需要配置为 true, 并在 accessKey 和 secretKey 中配置相应的 ak, sk.

- rocketmq.config.outOfTimeSeconds 用于配置存储指标和相应的值的过期时间,若超过该时间,cache 中的 key 对应的节点没有发生写更改,则会进行删除.一般配置为 60s 即可(根据 promethus 获取指标的时间间隔进行合理配置,只要保证过期时间大于等于 promethus 收集指标的时间间隔即可)

- task._.cron 配置 exporter 从 broker 拉取指标的定时任务的时间间隔,默认值为"15 0/1 _ \* \* ?" 每分钟的 15s 拉取一次指标.

### 启动 exporter 项目

### 按照 promethus 官网配置启动

配置 promethus 的 static_config: -targets 为 exporter 的启动 IP 和端口,如: localhost:5557

### 访问 promethus 页面

本地启动默认为: localhost:9090 ,则可对收集到的指标值进行查看,如下图所示:

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h4l66aaa7tj215y0bzwi0.jpg"></img>


:::tip
为了达到更好的可视化效果,观察指标值变化趋势, promethus 搭配 grafana 效果更佳哦!
:::



## 可观测性指标

可观测性指标主要包括两个大类: 服务端指标和客户端指标, 服务端指标由服务端直接生成, 客户端指标在客户端产生, 由服务端通过 rpc 请求客户端获取到. 客户端指标又可细分为生产端指标和消费端指标.所有 87 个可观测性指标及其主要含义如下:

<details><summary>服务端指标</summary>

### 服务端指标

| 指标名称                                                     | 含义                                                  | 对应Broker指标名                      |
| ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------- |
| rocketmq_broker_tps                                          | Broker级别的生产TPS                                   |                                       |
| rocketmq_broker_qps                                          | Broker级别的消费QPS                                   |                                       |
| rocketmq_broker_commitlog_diff                               | Broker组从节点同步落后消息size                        |                                       |
| rocketmq_brokeruntime_pmdt_0ms                               | 服务端开始处理写请求到完成写入的耗时（0ms）           | putMessageDistributeTime              |
| rocketmq_brokeruntime_pmdt_0to10ms                           | 服务端开始处理写请求到完成写入的耗时（0~10ms）        |                                       |
| rocketmq_brokeruntime_pmdt_10to50ms                          | 服务端开始处理写请求到完成写入的耗时（10~50ms）       |                                       |
| rocketmq_brokeruntime_pmdt_50to100ms                         | 服务端开始处理写请求到完成写入的耗时（50~100ms）      |                                       |
| rocketmq_brokeruntime_pmdt_100to200ms                        | 服务端开始处理写请求到完成写入的耗时（100~200ms）     |                                       |
| rocketmq_brokeruntime_pmdt_200to500ms                        | 服务端开始处理写请求到完成写入的耗时（200~500ms）     |                                       |
| rocketmq_brokeruntime_pmdt_500to1s                           | 服务端开始处理写请求到完成写入的耗时（500~1000ms）    |                                       |
| rocketmq_brokeruntime_pmdt_1to2s                             | 服务端开始处理写请求到完成写入的耗时（1~2s）          |                                       |
| rocketmq_brokeruntime_pmdt_2to3s                             | 服务端开始处理写请求到完成写入的耗时（2~3s）          |                                       |
| rocketmq_brokeruntime_pmdt_3to4s                             | 服务端开始处理写请求到完成写入的耗时（3~4s）          |                                       |
| rocketmq_brokeruntime_pmdt_4to5s                             | 服务端开始处理写请求到完成写入的耗时（4~5s）          |                                       |
| rocketmq_brokeruntime_pmdt_5to10s                            | 服务端开始处理写请求到完成写入的耗时（5~10s）         |                                       |
| rocketmq_brokeruntime_pmdt_10stomore                         | 服务端开始处理写请求到完成写入的耗时（> 10s）         |                                       |
| rocketmq_brokeruntime_dispatch_behind_bytes                  | 到现在为止，未被分发（构建索引之类的操作）的消息bytes | dispatchBehindBytes                   |
| rocketmq_brokeruntime_put_message_size_total                 | broker写入消息size的总和                              | putMessageSizeTotal                   |
| rocketmq_brokeruntime_put_message_average_size               | broker写入消息的平均大小                              | putMessageAverageSize                 |
| rocketmq_brokeruntime_remain_transientstore_buffer_numbs     | TransientStorePool 中队列的容量                       | remainTransientStoreBufferNumbs       |
| rocketmq_brokeruntime_earliest_message_timestamp             | broker存储的消息最早的时间戳                          | earliestMessageTimeStamp              |
| rocketmq_brokeruntime_putmessage_entire_time_max             | broker自运行以来，写入消息耗时的最大值                | putMessageEntireTimeMax               |
| rocketmq_brokeruntime_start_accept_sendrequest_time          | 开始接受发送请求的时间                                | startAcceptSendRequestTimeStamp       |
| rocketmq_brokeruntime_putmessage_times_total                 | broker写入消息的总次数                                | putMessageTimesTotal                  |
| rocketmq_brokeruntime_getmessage_entire_time_max             | broker自启动以来，处理消息拉取的最大耗时              | getMessageEntireTimeMax               |
| rocketmq_brokeruntime_pagecache_lock_time_mills              |                                                       | pageCacheLockTimeMills                |
| rocketmq_brokeruntime_commitlog_disk_ratio                   | commitLog所在磁盘的使用比例                           | commitLogDiskRatio                    |
| rocketmq_brokeruntime_dispatch_maxbuffer                     | broker没有计算，一直为0                               | dispatchMaxBuffer                     |
| rocketmq_brokeruntime_pull_threadpoolqueue_capacity          | 处理拉取请求线程池队列的容量                          | pullThreadPoolQueueCapacity           |
| rocketmq_brokeruntime_send_threadpoolqueue_capacity          | 处理发送请求线程池队列的容量                          | sendThreadPoolQueueCapacity           |
| rocketmq_brokeruntime_query_threadpool_queue_capacity        | 处理查询请求线程池队列的容量                          | queryThreadPoolQueueCapacity          |
| rocketmq_brokeruntime_pull_threadpoolqueue_size              | 处理拉取请求线程池队列的实际size                      | pullThreadPoolQueueSize               |
| rocketmq_brokeruntime_query_threadpoolqueue_size             | 处理查询请求线程池队列的实际size                      | queryThreadPoolQueueSize              |
| rocketmq_brokeruntime_send_threadpool_queue_size             | 处理send请求线程池队列的实际size                      | sendThreadPoolQueueSize               |
| rocketmq_brokeruntime_pull_threadpoolqueue_headwait_timemills | 处理拉取请求线程池队列的队头任务等待时间              | pullThreadPoolQueueHeadWaitTimeMills  |
| rocketmq_brokeruntime_query_threadpoolqueue_headwait_timemills | 处理查询请求线程池队列的队头任务等待时间              | queryThreadPoolQueueHeadWaitTimeMills |
| rocketmq_brokeruntime_send_threadpoolqueue_headwait_timemills | 处理发送请求线程池队列的队头任务等待时间              | sendThreadPoolQueueHeadWaitTimeMills  |
| rocketmq_brokeruntime_msg_gettotal_yesterdaymorning          | 到昨晚12点为止，读取消息的总次数                      | msgGetTotalYesterdayMorning           |
| rocketmq_brokeruntime_msg_puttotal_yesterdaymorning          | 到昨晚12点为止，写入消息的总次数                      | msgPutTotalYesterdayMorning           |
| rocketmq_brokeruntime_msg_gettotal_todaymorning              | 到今晚12点为止，读取消息的总次数                      | msgGetTotalTodayMorning               |
| rocketmq_brokeruntime_msg_puttotal_todaymorning              | 到昨晚12点为止，写入消息的总次数                      | putMessageTimesTotal                  |
| rocketmq_brokeruntime_msg_put_total_today_now                | 每个broker到现在为止，写入的消息次数                  | msgPutTotalTodayNow                   |
| rocketmq_brokeruntime_msg_gettotal_today_now                 | 每个broker到现在为止，读取的消息次数                  | msgGetTotalTodayNow                   |
| rocketmq_brokeruntime_commitlogdir_capacity_free             | commitLog所在目录的可用空间                           | commitLogDirCapacity                  |
| rocketmq_brokeruntime_commitlogdir_capacity_total            | commitLog所在目录的总空间                             |                                       |
| rocketmq_brokeruntime_commitlog_maxoffset                    | commitLog的最大offset                                 | commitLogMaxOffset                    |
| rocketmq_brokeruntime_commitlog_minoffset                    | commitLog的最小offset                                 | commitLogMinOffset                    |
| rocketmq_brokeruntime_remain_howmanydata_toflush             |                                                       | remainHowManyDataToFlush              |
| rocketmq_brokeruntime_getfound_tps600                        | 600s内getMessage时get到消息的平均TPS                  | getFoundTps                           |
| rocketmq_brokeruntime_getfound_tps60                         | 60s内getMessage时get到消息的平均TPS                   |                                       |
| rocketmq_brokeruntime_getfound_tps10                         | 10s内getMessage时get到消息的平均TPS                   |                                       |
| rocketmq_brokeruntime_gettotal_tps600                        | 600s内getMessage次数的平均TPS                         | getTotalTps                           |
| rocketmq_brokeruntime_gettotal_tps60                         | 60s内getMessage次数的平均TPS                          |                                       |
| rocketmq_brokeruntime_gettotal_tps10                         | 10s内getMessage次数的平均TPS                          |                                       |
| rocketmq_brokeruntime_gettransfered_tps600                   |                                                       | getTransferedTps                      |
| rocketmq_brokeruntime_gettransfered_tps60                    |                                                       |                                       |
| rocketmq_brokeruntime_gettransfered_tps10                    |                                                       |                                       |
| rocketmq_brokeruntime_getmiss_tps600                         | 600s内getMessage时没有get到消息的平均TPS              | getMissTps                            |
| rocketmq_brokeruntime_getmiss_tps60                          | 60s内getMessage时没有get到消息的平均TPS               |                                       |
| rocketmq_brokeruntime_getmiss_tps10                          | 10s内getMessage时没有get到消息的平均TPS               |                                       |
| rocketmq_brokeruntime_put_tps600                             | 600s内写入消息次数的平均TPS                           | putTps                                |
| rocketmq_brokeruntime_put_tps60                              | 60s内写入消息次数的平均TPS                            |                                       |
| rocketmq_brokeruntime_put_tps10                              | 10s内写入消息次数的平均TPS                            |                                       |

| 指标名称                                                     | 含义                                                  | 对应Broker指标名                      |
| ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------- |
| rocketmq_broker_tps                                          | Broker级别的生产TPS                                   |                                       |
| rocketmq_broker_qps                                          | Broker级别的消费QPS                                   |                                       |
| rocketmq_broker_commitlog_diff                               | Broker组从节点同步落后消息size                        |                                       |
| rocketmq_brokeruntime_pmdt_0ms                               | 服务端开始处理写请求到完成写入的耗时（0ms）           | putMessageDistributeTime              |
| rocketmq_brokeruntime_pmdt_0to10ms                           | 服务端开始处理写请求到完成写入的耗时（0~10ms）        |                                       |
| rocketmq_brokeruntime_pmdt_10to50ms                          | 服务端开始处理写请求到完成写入的耗时（10~50ms）       |                                       |
| rocketmq_brokeruntime_pmdt_50to100ms                         | 服务端开始处理写请求到完成写入的耗时（50~100ms）      |                                       |
| rocketmq_brokeruntime_pmdt_100to200ms                        | 服务端开始处理写请求到完成写入的耗时（100~200ms）     |                                       |
| rocketmq_brokeruntime_pmdt_200to500ms                        | 服务端开始处理写请求到完成写入的耗时（200~500ms）     |                                       |
| rocketmq_brokeruntime_pmdt_500to1s                           | 服务端开始处理写请求到完成写入的耗时（500~1000ms）    |                                       |
| rocketmq_brokeruntime_pmdt_1to2s                             | 服务端开始处理写请求到完成写入的耗时（1~2s）          |                                       |
| rocketmq_brokeruntime_pmdt_2to3s                             | 服务端开始处理写请求到完成写入的耗时（2~3s）          |                                       |
| rocketmq_brokeruntime_pmdt_3to4s                             | 服务端开始处理写请求到完成写入的耗时（3~4s）          |                                       |
| rocketmq_brokeruntime_pmdt_4to5s                             | 服务端开始处理写请求到完成写入的耗时（4~5s）          |                                       |
| rocketmq_brokeruntime_pmdt_5to10s                            | 服务端开始处理写请求到完成写入的耗时（5~10s）         |                                       |
| rocketmq_brokeruntime_pmdt_10stomore                         | 服务端开始处理写请求到完成写入的耗时（> 10s）         |                                       |
| rocketmq_brokeruntime_dispatch_behind_bytes                  | 到现在为止，未被分发（构建索引之类的操作）的消息bytes | dispatchBehindBytes                   |
| rocketmq_brokeruntime_put_message_size_total                 | broker写入消息size的总和                              | putMessageSizeTotal                   |
| rocketmq_brokeruntime_put_message_average_size               | broker写入消息的平均大小                              | putMessageAverageSize                 |
| rocketmq_brokeruntime_remain_transientstore_buffer_numbs     | TransientStorePool 中队列的容量                       | remainTransientStoreBufferNumbs       |
| rocketmq_brokeruntime_earliest_message_timestamp             | broker存储的消息最早的时间戳                          | earliestMessageTimeStamp              |
| rocketmq_brokeruntime_putmessage_entire_time_max             | broker自运行以来，写入消息耗时的最大值                | putMessageEntireTimeMax               |
| rocketmq_brokeruntime_start_accept_sendrequest_time          | 开始接受发送请求的时间                                | startAcceptSendRequestTimeStamp       |
| rocketmq_brokeruntime_putmessage_times_total                 | broker写入消息的总次数                                | putMessageTimesTotal                  |
| rocketmq_brokeruntime_getmessage_entire_time_max             | broker自启动以来，处理消息拉取的最大耗时              | getMessageEntireTimeMax               |
| rocketmq_brokeruntime_pagecache_lock_time_mills              |                                                       | pageCacheLockTimeMills                |
| rocketmq_brokeruntime_commitlog_disk_ratio                   | commitLog所在磁盘的使用比例                           | commitLogDiskRatio                    |
| rocketmq_brokeruntime_dispatch_maxbuffer                     | broker没有计算，一直为0                               | dispatchMaxBuffer                     |
| rocketmq_brokeruntime_pull_threadpoolqueue_capacity          | 处理拉取请求线程池队列的容量                          | pullThreadPoolQueueCapacity           |
| rocketmq_brokeruntime_send_threadpoolqueue_capacity          | 处理发送请求线程池队列的容量                          | sendThreadPoolQueueCapacity           |
| rocketmq_brokeruntime_query_threadpool_queue_capacity        | 处理查询请求线程池队列的容量                          | queryThreadPoolQueueCapacity          |
| rocketmq_brokeruntime_pull_threadpoolqueue_size              | 处理拉取请求线程池队列的实际size                      | pullThreadPoolQueueSize               |
| rocketmq_brokeruntime_query_threadpoolqueue_size             | 处理查询请求线程池队列的实际size                      | queryThreadPoolQueueSize              |
| rocketmq_brokeruntime_send_threadpool_queue_size             | 处理send请求线程池队列的实际size                      | sendThreadPoolQueueSize               |
| rocketmq_brokeruntime_pull_threadpoolqueue_headwait_timemills | 处理拉取请求线程池队列的队头任务等待时间              | pullThreadPoolQueueHeadWaitTimeMills  |
| rocketmq_brokeruntime_query_threadpoolqueue_headwait_timemills | 处理查询请求线程池队列的队头任务等待时间              | queryThreadPoolQueueHeadWaitTimeMills |
| rocketmq_brokeruntime_send_threadpoolqueue_headwait_timemills | 处理发送请求线程池队列的队头任务等待时间              | sendThreadPoolQueueHeadWaitTimeMills  |
| rocketmq_brokeruntime_msg_gettotal_yesterdaymorning          | 到昨晚12点为止，读取消息的总次数                      | msgGetTotalYesterdayMorning           |
| rocketmq_brokeruntime_msg_puttotal_yesterdaymorning          | 到昨晚12点为止，写入消息的总次数                      | msgPutTotalYesterdayMorning           |
| rocketmq_brokeruntime_msg_gettotal_todaymorning              | 到今晚12点为止，读取消息的总次数                      | msgGetTotalTodayMorning               |
| rocketmq_brokeruntime_msg_puttotal_todaymorning              | 到昨晚12点为止，写入消息的总次数                      | putMessageTimesTotal                  |
| rocketmq_brokeruntime_msg_put_total_today_now                | 每个broker到现在为止，写入的消息次数                  | msgPutTotalTodayNow                   |
| rocketmq_brokeruntime_msg_gettotal_today_now                 | 每个broker到现在为止，读取的消息次数                  | msgGetTotalTodayNow                   |
| rocketmq_brokeruntime_commitlogdir_capacity_free             | commitLog所在目录的可用空间                           | commitLogDirCapacity                  |
| rocketmq_brokeruntime_commitlogdir_capacity_total            | commitLog所在目录的总空间                             |                                       |
| rocketmq_brokeruntime_commitlog_maxoffset                    | commitLog的最大offset                                 | commitLogMaxOffset                    |
| rocketmq_brokeruntime_commitlog_minoffset                    | commitLog的最小offset                                 | commitLogMinOffset                    |
| rocketmq_brokeruntime_remain_howmanydata_toflush             |                                                       | remainHowManyDataToFlush              |
| rocketmq_brokeruntime_getfound_tps600                        | 600s内getMessage时get到消息的平均TPS                  | getFoundTps                           |
| rocketmq_brokeruntime_getfound_tps60                         | 60s内getMessage时get到消息的平均TPS                   |                                       |
| rocketmq_brokeruntime_getfound_tps10                         | 10s内getMessage时get到消息的平均TPS                   |                                       |
| rocketmq_brokeruntime_gettotal_tps600                        | 600s内getMessage次数的平均TPS                         | getTotalTps                           |
| rocketmq_brokeruntime_gettotal_tps60                         | 60s内getMessage次数的平均TPS                          |                                       |
| rocketmq_brokeruntime_gettotal_tps10                         | 10s内getMessage次数的平均TPS                          |                                       |
| rocketmq_brokeruntime_gettransfered_tps600                   |                                                       | getTransferedTps                      |
| rocketmq_brokeruntime_gettransfered_tps60                    |                                                       |                                       |
| rocketmq_brokeruntime_gettransfered_tps10                    |                                                       |                                       |
| rocketmq_brokeruntime_getmiss_tps600                         | 600s内getMessage时没有get到消息的平均TPS              | getMissTps                            |
| rocketmq_brokeruntime_getmiss_tps60                          | 60s内getMessage时没有get到消息的平均TPS               |                                       |
| rocketmq_brokeruntime_getmiss_tps10                          | 10s内getMessage时没有get到消息的平均TPS               |                                       |
| rocketmq_brokeruntime_put_tps600                             | 600s内写入消息次数的平均TPS                           | putTps                                |
| rocketmq_brokeruntime_put_tps60                              | 60s内写入消息次数的平均TPS                            |                                       |
| rocketmq_brokeruntime_put_tps10                              | 10s内写入消息次数的平均TPS                            |                                       |

</details>

<details><summary>生产端指标</summary>

### 生产端指标 



| 指标名称                             | 含义                                     |
| ------------------------------------ | ---------------------------------------- |
| rocketmq_producer_offset             | topic当前时间的最大offset                |
| rocketmq_topic_retry_offset          | 重试Topic当前时间的最大offset            |
| rocketmq_topic_dlq_offset            | 死信Topic当前时间的最大offset            |
| rocketmq_producer_tps                | Topic在一个Broker组上的生产TPS           |
| rocketmq_producer_message_size       | Topic在一个Broker组上的生产消息大小的TPS |
| rocketmq_queue_producer_tps          | 队列级别生产TPS                          |
| rocketmq_queue_producer_message_size | 队列级别生产消息大小的TPS                |

</details>

<details><summary>消费端指标</summary>
### 消费端指标



| 指标名称                                | 含义                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| rocketmq_group_diff                     | 消费组消息堆积消息数                                         |
| rocketmq_group_retrydiff                | 消费组重试队列堆积消息数                                     |
| rocketmq_group_dlqdiff                  | 消费组死信队列堆积消息数                                     |
| rocketmq_group_count                    | 消费组内消费者个数                                           |
| rocketmq_client_consume_fail_msg_count  | 过去1h消费者消费失败的次数                                   |
| rocketmq_client_consume_fail_msg_tps    | 消费者消费失败的TPS                                          |
| rocketmq_client_consume_ok_msg_tps      | 消费者消费成功的TPS                                          |
| rocketmq_client_consume_rt              | 消息从拉取到被消费的时间                                     |
| rocketmq_client_consumer_pull_rt        | 客户端拉取消息的时间                                         |
| rocketmq_client_consumer_pull_tps       | 客户端拉取消息的TPS                                          |
| rocketmq_consumer_tps                   | 每个Broker组上订阅组的消费TPS                                |
| rocketmq_group_consume_tps              | 订阅组当前消费TPS（对rocketmq_consumer_tps按broker聚合）     |
| rocketmq_consumer_offset                | 订阅组在一个broker组上当前的消费Offset                       |
| rocketmq_group_consume_total_offset     | 订阅组当前消费的Offset（对rocketmq_consumer_offset按broker聚合） |
| rocketmq_consumer_message_size          | 订阅组在一个broker组上消费消息大小的TPS                      |
| rocketmq_send_back_nums                 | 订阅组在一个broker组上消费失败，写入重试消息的次数           |
| rocketmq_group_get_latency_by_storetime | 消费组消费延时，exporter get到消息后与当前时间相减           |

</details>
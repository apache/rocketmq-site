---
title: "Release Notes - Apache RocketMQ - Version 4.9.0"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.9.0 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.9.0 release</h2>
    
* Source: [rocketmq-all-4.9.0-source-release.zip](https://archive.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-source-release.zip.sha512)]
* Binary: [rocketmq-all-4.9.0-bin-release.zip](https://archive.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.0/rocketmq-all-4.9.0-bin-release.zip.sha512)]

## Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2860'>ISSUE-2860</a>] -  Support producer and cunsumer opentracing.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2833'>ISSUE-2833</a>] -  Support trace for TranscationProducer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2556'>ISSUE-2556</a>] -  Support Lite pull consumer messaging trace.
</li>
</ul>

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2133'>ISSUE-2133</a>] -  RMQ_SYS_TRANS_OP_HALF_TOPIC be deleted after delete topic/group.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2328'>ISSUE-2328</a>] -  The broker instance failed to start due to ACL parameter error.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2615'>ISSUE-2615</a>] -  Add property of benchmark's producer that specifies how many messages to send.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2683'>ISSUE-2683</a>] -  Add delay message stats to brokerStatsManager.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2698'>ISSUE-2698</a>] -  TopicRouteSubCommand enhancement.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2730'>ISSUE-2730</a>] -  Fix Multiple instances in the same application share MQClientInstance.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2863'>ISSUE-2863</a>] -  Fix the problem of potential NPE in ACL plain.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2801'>ISSUE-2801</a>] -  The Order Message sending demo in example project cannot set namesrv addres.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2816'>ISSUE-2816</a>] -  Fix messageArrivingListener NPE.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2735'>ISSUE-2735</a>] -  QueryMsgByUniqueKey tool should return all messages with same unique key.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2868'>ISSUE-2868</a>] -  Broker DLQ message lack ORIGIN_MESSAGE_ID field.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2872'>ISSUE-2872</a>] -  Remove log files produced by integration test.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2904'>ISSUE-2904</a>] -  Fix unit test stability.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2911'>ISSUE-2911</a>] -  Fastjson version is too old.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2935'>ISSUE-2935</a>] -  Simple attack cause broker fail to start.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2650'>ISSUE-2650</a>] -  Unit case often failed by ci.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2607'>ISSUE-2607</a>] -  Set benchmark`s consumer isSuffixEnable defautl false and update help info.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2708'>ISSUE-2708</a>] -  Client may submit wrong offset when network instability.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2732'>ISSUE-2732</a>] -  Fix message loss problem when rebalance with LitePullConsumer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2783'>ISSUE-2783</a>] -  Fix ThreadLocalIndex getAndIncrement return value may only have two values.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2811'>ISSUE-2811</a>] -  The wrong topic was consumed in the DefaultMessageStoreTest test program.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2865'>ISSUE-2865</a>] -  Fix Batch message send bug in Dledger Mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2921'>ISSUE-2921</a>] -  Fix a bug in trace when consuming message.
</li>
</ul>


## Document and code style improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2947'>ISSUE-2947</a>] -  Operation doc mistake. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2920'>ISSUE-2920</a>] -  Improve PushConsumer&OpenTracing test stability. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2855'>ISSUE-2855</a>] -  Incorrect description of document images.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2745'>ISSUE-2745</a>] -  Request-Reply docs.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2849'>ISSUE-2849</a>] -  maven checkstyle failed.
</li>
</ul>          
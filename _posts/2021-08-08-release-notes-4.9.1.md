---
title: "Release Notes - Apache RocketMQ - Version 4.9.1"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.9.1 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.9.1 release</h2>
    
* Source: [rocketmq-all-4.9.1-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.1/rocketmq-all-4.9.1-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.1/rocketmq-all-4.9.1-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.1/rocketmq-all-4.9.1-source-release.zip.sha512)]
* Binary: [rocketmq-all-4.9.1-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.1/rocketmq-all-4.9.1-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.1/rocketmq-all-4.9.1-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.1/rocketmq-all-4.9.1-bin-release.zip.sha512)]

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/3199'>ISSUE-3199</a>] -  Two timed task for RequestFutureTable.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3196'>ISSUE-3196</a>] -  Check if "requestHeader" is null before "requestHeader.getTopic()".
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3185'>ISSUE-3185</a>] -  Remove the arm machine test in travis ci.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3177'>ISSUE-3177</a>] -  UpdateAclConfig in all brokers.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3030'>ISSUE-3030</a>] -  Remove the -Xmn JVM parameter when using G1.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3162'>ISSUE-3162</a>] -  Add msgTraceEnable config in transaction producer benchmark.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part B]Improve produce performance in M/S mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part C]Improve produce performance in M/S mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part D]Improve produce performance in M/S mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part E]Improve produce performance in M/S mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part G] Optimise parse performance for SendMessageRequestHeaderV2.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3128'>ISSUE-3128</a>] -  Fix the delete global white addresses.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3089'>ISSUE-3089</a>] -  Fix Print log format is incorrect in NettyRemotingAbstract class.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3099'>ISSUE-3099</a>] -  Fix the incorrect judegment  'writePos - lastCommittedPosition > commitLeastPages'.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3130'>ISSUE-3130</a>] -  Add trace format test case.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3123'>ISSUE-3123</a>] -  Fix namesrv endpoint.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3109'>ISSUE-3109</a>] -  AdminBrokerProcess do not reply anything in default case.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/603'>ISSUE-603</a>] -  Log exception stack.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3068'>ISSUE-3068</a>] -  Remove jaeger tracing dependency in release.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3046'>ISSUE-3046</a>] -  Polish lite pull consumer code style.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3031'>ISSUE-3031</a>] -  Upgrade netty-all dependency version to 4.1.65.Final.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3023'>ISSUE-3023</a>] -  Fix the inconsistency of putMessageDistributeTime statistics.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3021'>ISSUE-3021</a>] -  Improve the comment of maxReconsumeTimes.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3009'>ISSUE-3009</a>] -  Test(benchmark): support delay message test.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3004'>ISSUE-3004</a>] -  Fix AsyncTraceDispatcher unique groupName.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2988'>ISSUE-2988</a>] -  Fix fail to send trace of last message before shutting down producer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2883'>ISSUE-2883</a>] -  [Part F] Improve produce performance in M/S mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2873'>ISSUE-2873</a>] -  Add benchmark for batch message.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2715'>ISSUE-2715</a>] -  Make netty parameter configure by system property.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2055'>ISSUE-2055</a>] -  Fix NPE in SendMessageProcessor.handleRetryAndDLQ.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/3175'>ISSUE-3175</a>] -  UpdateAclConfig cause broker fail to start.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2708'>ISSUE-2708</a>] -  Fix offset rollback when fetch offset from broker exception.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3066'>ISSUE-3066</a>] -  Producing a ghost consumer at frequently start and stop consumers in one process.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3118'>ISSUE-3118</a>] -  Type conversion exception occurs when batch message sending triggers pending full.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3019'>ISSUE-3019</a>] -  Fixed bug with batch-sent message statistics.
</li>
</ul>


## Document and code style improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/3097'>ISSUE-3097</a>] -  Docs remove obsolete/error configuration. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3059'>ISSUE-3059</a>] -  Fix the English version of Example_Transaction.md. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3055'>ISSUE-3055</a>] -  Add some doc of the API_Reference_DefaultMQProducer of English. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3042'>ISSUE-3042</a>] -  Add SyncProducer Example.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3037'>ISSUE-3037</a>] -  Add a Chinese version of Deployment.md.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3063'>ISSUE-3063</a>] -  Add Chinese version of Example_Delay.md.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3061'>ISSUE-3061</a>] -  Add different send examples and chinese version of FAQ.md.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3033'>ISSUE-3033</a>] -  Looking at the Chinese document, I found that the subtraction operation.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2997'>ISSUE-2997</a>] -  Add a Chinese version of Configuration_System.md.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2990'>ISSUE-2990</a>] -  Add message tracing switch in sendMessage command of mqadmin, and add document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3154'>ISSUE-3154</a>] -  Delete the unuse code.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3144'>ISSUE-3144</a>] -  Fix spell error.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3109'>ISSUE-3110</a>] -  Fix: remove useless code.
</li>
</ul>          
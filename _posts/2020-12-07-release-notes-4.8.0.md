---
title: "Release Notes - Apache RocketMQ - Version 4.8.0"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.8.0 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.8.0 release</h2>
    
* Source: [rocketmq-all-4.8.0-source-release.zip](https://archive.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-source-release.zip.sha512)]
* Binary: [rocketmq-all-4.8.0-bin-release.zip](https://archive.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.8.0/rocketmq-all-4.8.0-bin-release.zip.sha512)]

## Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/1846'>ISSUE-1846</a>] -  Change into pipeline manner to improve performance in dledger model .
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/690'>ISSUE-690</a>] -  Support batch messages in dledger mode.
</li>
</ul>

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/1678'>ISSUE-1678</a>] -  Use thread safe CopyOnWriteArrayList for registerBrokerResultList.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1904'>ISSUE-1904</a>] -  Print warn log when flush timeout .
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2082'>ISSUE-2082</a>] -  Use StringBuilder instead of StringBuffer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2067'>ISSUE-2067</a>] -  Add logs when collecting disk space usage.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2146'>ISSUE-2146</a>] -  Add benchmark shutdown script and polish the benchmark.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2162'>ISSUE-2162</a>] -  Polish the description getBrokerConfig help info.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2180'>ISSUE-2180</a>] -  Polish the name server start script.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2170'>ISSUE-2170</a>] -  Use thread safe vector in BrokerOuterAPI.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1870'>ISSUE-1870</a>] -  Add Support for Java 9+ and compatible to previous Java version.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2217'>ISSUE-2217</a>] -  Upgrade dledger version.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2233'>ISSUE-2233</a>] -  Add Broker info in MQBrokerException for troubleshooting.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2245'>ISSUE-2245</a>] -  Expose config defaultBrokerId and connectBrokerByUser for DefaultLitePullConsumer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2223'>ISSUE-2223</a>] -  Polish the selectOneMessageQueue method.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2239'>ISSUE-2239</a>] -  Add clientId in warn logs of MQClientInstance.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2300'>ISSUE-2300</a>] -  Support acl and msg trace in benchmark.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2152'>ISSUE-2152</a>] -  Add isRunning method in DefaultLitePullConsumer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1770'>ISSUE-1770</a>] -  Add a query message trace command in mqadmin tool.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2152'>ISSUE-2152</a>] -  Use mock style in unit test for time-consuming.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2219'>ISSUE-2219</a>] -  Add some asynchronous API for batch messages.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2334'>ISSUE-2334</a>] -  Polish the log and response remark when service not available.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2325'>ISSUE-2325</a>] -  Use CopyOnWriteArrayList to avoid possible thread safety issues.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2366'>ISSUE-2366</a>] -  Polish transaction producer start script in benchmark.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2412'>ISSUE-2412</a>] -  Support adding tag when producing messages in benchmark.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2468'>ISSUE-2468</a>] -  Polish the DefaultLayout SimpleDateFormat pattern.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2491'>ISSUE-2491</a>] -  Temporary fix on Mac OS when pid greater than short type max value.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/1473'>ISSUE-1473</a>] -  Fix wrong trace message's clientHost.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1576'>ISSUE-1576</a>] -  Fix wrong logic in selectMessageQueue.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2165'>ISSUE-2165</a>] -  Slave read enable not work sometimes when cluster deployed on DLedger mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2165'>ISSUE-2172</a>] -  ArrayIndexOutOfBoundsException may throw when getRemoteAddressStrategy method.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2280'>ISSUE-2280</a>] -  Disk ratio return -1.0 when cluster deployed on DLedger mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2330'>ISSUE-2330</a>] -  Consumer can not extract user-define properties when using batch messages.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2338'>ISSUE-2338</a>] -  The parameter commitLeastPages is never used.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2374'>ISSUE-2374</a>] -  Fix the error in ip check.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2378'>ISSUE-2378</a>] -  NPE may throw when consumer shutdown in the ClientRemotingProcessor.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2421'>ISSUE-2421</a>] -  SelectMessageQueueByHash throw exception while hashcode is Integer.MIN.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2477'>ISSUE-2477</a>] -  The allocate method of AllocateMessageQueueByMachineRoom return error result.
</li>
</ul>


## Document and code style improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/1435'>ISSUE-1435</a>] -  Fix document error about discarded mqadmin subcommand. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2192'>ISSUE-2192</a>] -  Typo fix in DefaultMQProducerImpl class. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2190'>ISSUE-2190</a>] -  Fix import mistakes in RocketMQ_Example.md.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2171'>ISSUE-2171</a>] -  Fix spell error in acl module.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2196'>ISSUE-2196</a>] -  Fix spell error and remove redundant code in acl module.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2176'>ISSUE-2176</a>] -  Remove redundant parameters in method.
</li>
<li>[<a href='https://github.com/apache/rocketmq/pull/2202'>ISSUE-2202</a>] -  Typo fix in README document. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2231'>ISSUE-2231</a>] -  Polish the format for user guide document. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/pull/2258'>ISSUE-2258</a>] -  Add a recommendation to PR template.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2272'>ISSUE-2272</a>] -  Typo fix in client consumer module.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2283'>ISSUE-2283</a>] -  Fix the spelling mistake in ProducerManager and some code optimization.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2299'>ISSUE-2299</a>] -  Typo fix in filter example document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2402'>ISSUE-2402</a>] -  Add directory for rocketmq example document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2415'>ISSUE-2415</a>] -  Delete useless code in client module.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2488'>ISSUE-2488</a>] -  Writing style optimization in architecture document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2459'>ISSUE-2459</a>] -  Fix the error in best practice document.
</li>
</ul>          
---
title: "Release Notes - Apache RocketMQ - Version 4.9.4"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.9.4 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.

<h2> Download the 4.9.4 release</h2>
    
* Source: [rocketmq-all-4.9.4-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.4/rocketmq-all-4.9.4-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.4/rocketmq-all-4.9.4-source-release.zip.sha512)]
* Binary: [rocketmq-all-4.9.4-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip.sha512)]

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/4426'>ISSUE-4426</a>] - [ISSUE-4426] - fix ACL issue when sending messages back</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4455'>ISSUE-4455</a>] - [ISSUE-4455] - add a schedule task to update namesrv address</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4349'>ISSUE-4349</a>] - [ISSUE-4349] - fix negative index when index reach Integer.MAX_VALUE</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3906'>ISSUE-3906</a>] - [ISSUE-3906] - Mark stream-related request by RequestType</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4419'>ISSUE-4419</a>] - [ISSUE-4419] - Upgrade maven-checkstyle-plugin to 3.1.2</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4416'>ISSUE-4416</a>] - [ISSUE-4416] - Update dledger version to 0.2.6</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4410'>ISSUE-4410</a>] - [ISSUE-4410] - Optimize method org.apache.rocketmq.common.message.MessageDecoder#messageProperties2String, remove useless check</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4391'>ISSUE-4391</a>] - [ISSUE-4391] - optimize for printObjectProperties</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4067'>ISSUE-4067</a>] - [ISSUE-4067] - fix: Add TLS configuration documents.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4377'>ISSUE-4377</a>] - [ISSUE-4377] - Unnecessary null check before method call</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4372'>ISSUE-4372</a>] - [ISSUE-4372] - Make it compile with Java9+</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4365'>ISSUE-4365</a>] - [ISSUE-4365] - acl PlainPermissionManager key file paths set to same</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4362'>ISSUE-4362</a>] - [ISSUE-4362] - remove redundancy group name check of null in method org.apache.rocketmq.client.impl.producer.DefaultMQProducerImpl#checkConfig</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4323'>ISSUE-4323</a>] - [ISSUE-4323] - Transaction example add the default NamesrvAddr</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4323'>ISSUE-4323</a>] - [ISSUE-4323] - tracemessage example add the default NamesrvAddr</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4323'>ISSUE-4323</a>] - [ISSUE-4323] - Schedule example add the default NamesrvAddr</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4323'>ISSUE-4323</a>] - [ISSUE-4323] - Optimized namespace example code</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4226'>ISSUE-4226</a>] - [ISSUE-4226] - Message length exceeds the maximum length when sendback</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4332'>ISSUE-4332</a>] - [ISSUE-4332] - Remove duplicate code</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4323'>ISSUE-4323</a>] - [ISSUE-4323] - Quickstart adds the default NamesrvAddr</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4320'>ISSUE-4320</a>] - [ISSUE-4320] - Anonymous new PrivilegedAction can be replaced with lambda</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4320'>ISSUE-4396</a>] - [ISSUE-4396] - Support get all producer on one broker</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4318'>ISSUE-4318</a>] - [ISSUE-4318] - make some variables to be final in IndexHeader</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4317'>ISSUE-4317</a>] - [ISSUE-4317] - Fix for statement does not loop</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2435'>ISSUE-2435</a>] - [ISSUE-2435] - Solve the problem that DefaultMQProducer#request() sends messages and waits for timeout synchronously</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3962'>ISSUE-3962</a>] - [ISSUE-3962] - Fix variable name in MappedFile#isAbleToCommit()</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4310'>ISSUE-4310</a>] - [ISSUE-4310] - Optimize serviceProvider's code</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4304'>ISSUE-4304</a>] - [ISSUE-4304] - Fix license check failures</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4286'>ISSUE-4286</a>] - [ISSUE-4286] - add link of rocketmq-site to readme</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4284'>ISSUE-4284</a>] - [ISSUE-4284] - Add protocols to readme and delete the description of language clients</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4270'>ISSUE-4270</a>] - [ISSUE-4270] - Log parameter error and optimize code</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4263'>ISSUE-4263</a>] - [ISSUE-4263] - Delete topic route info based on cluster when delete topic.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4254'>ISSUE-4254</a>] - [ISSUE-4254] - use function computeIfAbsent replace if</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4237'>ISSUE-4237</a>] - [ISSUE-4237] - REMOVE unnecessary final modifier</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4239'>ISSUE-4239</a>] - [ISSUE-4239] - Use function computeIfAbsent replace if</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4216'>ISSUE-4216</a>] - [ISSUE-4216] - fix HmacSHA1 not available when use benchmark</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4203'>ISSUE-4203</a>] - [ISSUE-4203] - Support zstd/lz4 compression to improve send/receive performance</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4211'>ISSUE-4211</a>] - [ISSUE-4211] - Fix diskMaxUsedSpaceRatio does not take effect in dLedger</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4187'>ISSUE-4187</a>] - [ISSUE-4187] - Support async publish in producer benchmark</li>

<li>[<a href='https://github.com/apache/rocketmq/issues/4308'>ISSUE-4308</a>] - [ISSUE-4308] - Make some variables to be final in brokerController</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4251'>ISSUE-4251</a>] - [ISSUE-4251] - Add batch flag</li>

<li>[<a href='https://github.com/apache/rocketmq/issues/4185'>ISSUE-4185</a>] - [ISSUE-4185] - Explicit type argument can be replaced with <></li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4183'>ISSUE-4183</a>] - [ISSUE-4183] - When the reportSlaveMaxOffset method fails, end the current loop early</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4181'>ISSUE-4181</a>] - [ISSUE-4181] - Prevent int overflow in TraceContext</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4099'>ISSUE-4099</a>] - [ISSUE-4099] - Optimized the performance of sending traceMessage in AsyncTraceDispatcher</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4175'>ISSUE-4175</a>] - [ISSUE-4175] - Prevent update topic on slave</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4165'>ISSUE-4165</a>] - [ISSUE-4165] - add new line in sendMsgStatus</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4147'>ISSUE-4147</a>] - [ISSUE-4147] - javadoc: Fix the problem described in the warning message prompted by the IDE.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4145'>ISSUE-4145</a>] - [ISSUE-4145] - docs: Add 'at most once' feature in the feature documents.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4130'>ISSUE-4130</a>] - [ISSUE-4130] - Remove the exception which will never be thrown by method from method signature</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3914'>ISSUE-3914</a>] - [ISSUE-3914] - Support multi dirs storage in DLedger</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4110'>ISSUE-4110</a>] - [ISSUE-4110] - Update dledger version to 0.2.4</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4107'>ISSUE-4107</a>] - [ISSUE-4107] - rocketmq-tools should not depend on rocketmq-store</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4098'>ISSUE-4098</a>] - [ISSUE-4098] - Optimized the algorithm of trace message send.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4058'>ISSUE-4058</a>] - [ISSUE-4058] - DLedgerCommitLog support LMQ</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4048'>ISSUE-4048</a>] - [ISSUE-4048] - Make storePathCommitLog base on storePathRootDir</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4033'>ISSUE-4033</a>] - [ISSUE-4033] - fix async deliver msg will resend forever when serivce not avliable</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4040'>ISSUE-4040</a>] - [ISSUE-4040] - Unnecessary  toString methods deleted</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4037'>ISSUE-4037</a>] - [ISSUE-4037] - Add DeleteExpiredCommitLogSubCommand</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4035'>ISSUE-4035</a>] - [ISSUE-4035] - rename some commands</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4125'>ISSUE-4125</a>] - [ISSUE-4125] - Anonymous new Runnable() can be replaced with lambda</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4028'>ISSUE-4028</a>] - [ISSUE-4028] - wrong log output</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4025'>ISSUE-4025</a>] - [ISSUE-4025] - acl not work after changed</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4151'>ISSUE-4151</a>] - [ISSUE-4151] - Add option p to the updateGlobalWhiteAddr command</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/4000'>ISSUE-4000</a>] - [ISSUE-4000] - Fix the warn log input in command tools</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3985'>ISSUE-3985</a>] - [ISSUE-3985] - Remove shuffle operation before sorting the list of 'FaultItem'.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3964'>ISSUE-3964</a>] - [ISSUE-3964] - Introduce jmh test for RemotingCommand</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3950'>ISSUE-3950</a>] - [ISSUE-3950] - Anonymous new Callable()  replaced with lambda</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3922'>ISSUE-3922</a>] - [ISSUE-3922] - Fix bugs in ACL modification</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3911'>ISSUE-3911</a>] - [ISSUE-3911] - Fix ThreadLocalIndexTest does not actually assert the value</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3900'>ISSUE-3900</a>] - [ISSUE-3900] - Fix that wrong dir is created when using mult-dirs storage</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3898'>ISSUE-3898</a>] - [ISSUE-3898] - fix the spell in MQClientAPIImpl</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3896'>ISSUE-3896</a>] - [ISSUE-3896] - fix log format error</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3890'>ISSUE-3890</a>] - [ISSUE-3890] - add 'brokerAddress' param for ConsumerConnectionSubCommand</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3882'>ISSUE-3882</a>] - [ISSUE-3882] - Nameserver change modify topicQueueTable in RouteInfoManager</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3877'>ISSUE-3877</a>] - [ISSUE-3877] - Remove unnecessary Exception thrown by MQClientAPIImpl#createSubscriptionGroup</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3875'>ISSUE-3875</a>] - [ISSUE-3875] - fix unable to delete last acl account.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/23'>ISSUE-23</a>] - [ISSUE-23] - solve error Algorithm HmacSHA1 not available when your java_home is not found</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2993'>ISSUE-2993</a>] - [ISSUE-2993] - fix testTruncateCQ on Windows by releasing mapped files.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3859'>ISSUE-3859</a>] - [ISSUE-3859] - enhance the cal of latency for putting message</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3804'>ISSUE-3804</a>] - [ISSUE-3804] - Commit consumption offset with specific MessageQueue.</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3699'>ISSUE-3699</a>] - [ISSUE-3699] - fix unit test</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3966'>ISSUE-3966</a>] - [ISSUE-3966] - Fix using wrong offset when deliver in ScheduleService</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3942'>ISSUE-3942</a>] - [ISSUE-3942] - If both acl and message trace are enabled and the default topic RMQ_SYS_TRACE_TOPIC is used for message trace, you don't need to add the PUB permission of RMQ_SYS_TRACE_TOPIC topic to the acl config</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3894'>ISSUE-3894</a>] - [ISSUE-3894] - Refactor RouteInfoManager unit test</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3585'>ISSUE-3585</a>] - [ISSUE-3585] - [Part B] Improve encode/decode performance</li>
</ul>



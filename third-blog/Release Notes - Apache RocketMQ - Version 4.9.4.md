---
title: Release Notes - Apache RocketMQ - Version 4.9.4
description: Release Notes - Apache RocketMQ - Version 4.9.4
hide_table_of_contents: false
---
<!--truncate-->
Below is a summary of the issues addressed in the 4.9.4 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to Quick Start.

Download the 4.9.4 release
Source: rocketmq-all-4.9.4-source-release.zip [PGP] [SHA512]
Binary: rocketmq-all-4.9.4-bin-release.zip [PGP] [SHA512]
Improvement
[ISSUE-4426] - [ISSUE-4426] - fix ACL issue when sending messages back
[ISSUE-4455] - [ISSUE-4455] - add a schedule task to update namesrv address
[ISSUE-4349] - [ISSUE-4349] - fix negative index when index reach Integer.MAX_VALUE
[ISSUE-3906] - [ISSUE-3906] - Mark stream-related request by RequestType
[ISSUE-4419] - [ISSUE-4419] - Upgrade maven-checkstyle-plugin to 3.1.2
[ISSUE-4416] - [ISSUE-4416] - Update dledger version to 0.2.6
[ISSUE-4410] - [ISSUE-4410] - Optimize method org.apache.rocketmq.common.message.MessageDecoder#messageProperties2String, remove useless check
[ISSUE-4391] - [ISSUE-4391] - optimize for printObjectProperties
[ISSUE-4067] - [ISSUE-4067] - fix: Add TLS configuration documents.
[ISSUE-4377] - [ISSUE-4377] - Unnecessary null check before method call
[ISSUE-4372] - [ISSUE-4372] - Make it compile with Java9+
[ISSUE-4365] - [ISSUE-4365] - acl PlainPermissionManager key file paths set to same
[ISSUE-4362] - [ISSUE-4362] - remove redundancy group name check of null in method org.apache.rocketmq.client.impl.producer.DefaultMQProducerImpl#checkConfig
[ISSUE-4323] - [ISSUE-4323] - Transaction example add the default NamesrvAddr
[ISSUE-4323] - [ISSUE-4323] - tracemessage example add the default NamesrvAddr
[ISSUE-4323] - [ISSUE-4323] - Schedule example add the default NamesrvAddr
[ISSUE-4323] - [ISSUE-4323] - Optimized namespace example code
[ISSUE-4226] - [ISSUE-4226] - Message length exceeds the maximum length when sendback
[ISSUE-4332] - [ISSUE-4332] - Remove duplicate code
[ISSUE-4323] - [ISSUE-4323] - Quickstart adds the default NamesrvAddr
[ISSUE-4320] - [ISSUE-4320] - Anonymous new PrivilegedAction can be replaced with lambda
[ISSUE-4396] - [ISSUE-4396] - Support get all producer on one broker
[ISSUE-4318] - [ISSUE-4318] - make some variables to be final in IndexHeader
[ISSUE-4317] - [ISSUE-4317] - Fix for statement does not loop
[ISSUE-2435] - [ISSUE-2435] - Solve the problem that DefaultMQProducer#request() sends messages and waits for timeout synchronously
[ISSUE-3962] - [ISSUE-3962] - Fix variable name in MappedFile#isAbleToCommit()
[ISSUE-4310] - [ISSUE-4310] - Optimize serviceProvider's code
[ISSUE-4304] - [ISSUE-4304] - Fix license check failures
[ISSUE-4286] - [ISSUE-4286] - add link of rocketmq-site to readme
[ISSUE-4284] - [ISSUE-4284] - Add protocols to readme and delete the description of language clients
[ISSUE-4270] - [ISSUE-4270] - Log parameter error and optimize code
[ISSUE-4263] - [ISSUE-4263] - Delete topic route info based on cluster when delete topic.
[ISSUE-4254] - [ISSUE-4254] - use function computeIfAbsent replace if
[ISSUE-4237] - [ISSUE-4237] - REMOVE unnecessary final modifier
[ISSUE-4239] - [ISSUE-4239] - Use function computeIfAbsent replace if
[ISSUE-4216] - [ISSUE-4216] - fix HmacSHA1 not available when use benchmark
[ISSUE-4203] - [ISSUE-4203] - Support zstd/lz4 compression to improve send/receive performance
[ISSUE-4211] - [ISSUE-4211] - Fix diskMaxUsedSpaceRatio does not take effect in dLedger
[ISSUE-4187] - [ISSUE-4187] - Support async publish in producer benchmark
[ISSUE-4308] - [ISSUE-4308] - Make some variables to be final in brokerController
[ISSUE-4251] - [ISSUE-4251] - Add batch flag
[ISSUE-4185] - [ISSUE-4185] - Explicit type argument can be replaced with 
[ISSUE-4183] - [ISSUE-4183] - When the reportSlaveMaxOffset method fails, end the current loop early
[ISSUE-4181] - [ISSUE-4181] - Prevent int overflow in TraceContext
[ISSUE-4099] - [ISSUE-4099] - Optimized the performance of sending traceMessage in AsyncTraceDispatcher
[ISSUE-4175] - [ISSUE-4175] - Prevent update topic on slave
[ISSUE-4165] - [ISSUE-4165] - add new line in sendMsgStatus
[ISSUE-4147] - [ISSUE-4147] - javadoc: Fix the problem described in the warning message prompted by the IDE.
[ISSUE-4145] - [ISSUE-4145] - docs: Add 'at most once' feature in the feature documents.
[ISSUE-4130] - [ISSUE-4130] - Remove the exception which will never be thrown by method from method signature
[ISSUE-3914] - [ISSUE-3914] - Support multi dirs storage in DLedger
[ISSUE-4110] - [ISSUE-4110] - Update dledger version to 0.2.4
[ISSUE-4107] - [ISSUE-4107] - rocketmq-tools should not depend on rocketmq-store
[ISSUE-4098] - [ISSUE-4098] - Optimized the algorithm of trace message send.
[ISSUE-4058] - [ISSUE-4058] - DLedgerCommitLog support LMQ
[ISSUE-4048] - [ISSUE-4048] - Make storePathCommitLog base on storePathRootDir
[ISSUE-4033] - [ISSUE-4033] - fix async deliver msg will resend forever when serivce not avliable
[ISSUE-4040] - [ISSUE-4040] - Unnecessary toString methods deleted
[ISSUE-4037] - [ISSUE-4037] - Add DeleteExpiredCommitLogSubCommand
[ISSUE-4035] - [ISSUE-4035] - rename some commands
[ISSUE-4125] - [ISSUE-4125] - Anonymous new Runnable() can be replaced with lambda
[ISSUE-4028] - [ISSUE-4028] - wrong log output
[ISSUE-4025] - [ISSUE-4025] - acl not work after changed
[ISSUE-4151] - [ISSUE-4151] - Add option p to the updateGlobalWhiteAddr command
[ISSUE-4000] - [ISSUE-4000] - Fix the warn log input in command tools
[ISSUE-3985] - [ISSUE-3985] - Remove shuffle operation before sorting the list of 'FaultItem'.
[ISSUE-3964] - [ISSUE-3964] - Introduce jmh test for RemotingCommand
[ISSUE-3950] - [ISSUE-3950] - Anonymous new Callable() replaced with lambda
[ISSUE-3922] - [ISSUE-3922] - Fix bugs in ACL modification
[ISSUE-3911] - [ISSUE-3911] - Fix ThreadLocalIndexTest does not actually assert the value
[ISSUE-3900] - [ISSUE-3900] - Fix that wrong dir is created when using mult-dirs storage
[ISSUE-3898] - [ISSUE-3898] - fix the spell in MQClientAPIImpl
[ISSUE-3896] - [ISSUE-3896] - fix log format error
[ISSUE-3890] - [ISSUE-3890] - add 'brokerAddress' param for ConsumerConnectionSubCommand
[ISSUE-3882] - [ISSUE-3882] - Nameserver change modify topicQueueTable in RouteInfoManager
[ISSUE-3877] - [ISSUE-3877] - Remove unnecessary Exception thrown by MQClientAPIImpl#createSubscriptionGroup
[ISSUE-3875] - [ISSUE-3875] - fix unable to delete last acl account.
[ISSUE-23] - [ISSUE-23] - solve error Algorithm HmacSHA1 not available when your java_home is not found
[ISSUE-2993] - [ISSUE-2993] - fix testTruncateCQ on Windows by releasing mapped files.
[ISSUE-3859] - [ISSUE-3859] - enhance the cal of latency for putting message
[ISSUE-3804] - [ISSUE-3804] - Commit consumption offset with specific MessageQueue.
[ISSUE-3699] - [ISSUE-3699] - fix unit test
[ISSUE-3966] - [ISSUE-3966] - Fix using wrong offset when deliver in ScheduleService
[ISSUE-3942] - [ISSUE-3942] - If both acl and message trace are enabled and the default topic RMQ_SYS_TRACE_TOPIC is used for message trace, you don't need to add the PUB permission of RMQ_SYS_TRACE_TOPIC topic to the acl config
[ISSUE-3894] - [ISSUE-3894] - Refactor RouteInfoManager unit test
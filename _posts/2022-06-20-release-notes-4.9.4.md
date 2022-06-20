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
* [ISSUE #3887 ] fix validate fail after update acl by @yuz10 in https://github.com/apache/rocketmq/pull/3888
* [ISSUE #3898]fix the spell in MQClientAPIImpl by @zhangjidi2016 in https://github.com/apache/rocketmq/pull/3899
* [ISSUE #3890] add 'brokerAddress' param for ConsumerConnectionSubCommand by @MatrixHB in https://github.com/apache/rocketmq/pull/3891
* [ISSUE #3877] Remove unnecessary Exception thrown by MQClientAPIImpl#createSubscriptionGroup by @HScarb in https://github.com/apache/rocketmq/pull/3880
* [ISSUE #2993] fix testTruncateCQ on Windows by releasing mapped files. by @HScarb in https://github.com/apache/rocketmq/pull/3865
* [ISSUE #3859] enhance the cal of latency for putting message by @cserwen in https://github.com/apache/rocketmq/pull/3862
* [ISSUE #3911] Fix ThreadLocalIndexTest does not actually assert the value by @HScarb in https://github.com/apache/rocketmq/pull/3912
* [ISSUE #3875]  fix unable to delete last acl account. by @yuz10 in https://github.com/apache/rocketmq/pull/3876
* [ISSUE #3918] readme add rocketmq dashboard link by @cserwen in https://github.com/apache/rocketmq/pull/3919
* [ISSUE #3915] readme add rocketmq connect link by @odbozhou in https://github.com/apache/rocketmq/pull/3916
* [ISSUE #3900] Fix that wrong dir is created when using mult-dirs storage by @cserwen in https://github.com/apache/rocketmq/pull/3901
* [#3903] Add topic validation, forbid sending message to system topic  by @sunxi92 in https://github.com/apache/rocketmq/pull/3904
* fix some docs error by @Hen1ng in https://github.com/apache/rocketmq/pull/3926
* [ISSUE #3896] fix log format error by @panzhi33 in https://github.com/apache/rocketmq/pull/3897
* Improve Issue Template by @lizhanhui in https://github.com/apache/rocketmq/pull/3932
* Add language code for Rust by @lizhanhui in https://github.com/apache/rocketmq/pull/3931
* [ISSUE #3561] fix by @ymingxu in https://github.com/apache/rocketmq/pull/3936
* Update best_practice.md by @HMYDK in https://github.com/apache/rocketmq/pull/3939
* [ISSUE #3950] Anonymous new Callable()  replaced with lambda by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/3951
* [ISSUE #3957] fix #3957 LmqConsumerOffsetManager deserialize error by @tianliuliu in https://github.com/apache/rocketmq/pull/3958
* docs: Add the link to Apache RocketMQ MQTT in the readme.md by @XiaoyiPeng in https://github.com/apache/rocketmq/pull/3971
* fix a flaky test by @MundaneImmortal in https://github.com/apache/rocketmq/pull/3959
* [ISSUE# 3966] Fix using wrong offset when deliver in ScheduleService by @RongtongJin in https://github.com/apache/rocketmq/pull/3967
* [ISSUE #3882]Nameserver change modify `topicQueueTable` in `RouteInfoManager` by @WJL3333 in https://github.com/apache/rocketmq/pull/3881
* [ISSUE #3955] delete useless check by @ferrirW in https://github.com/apache/rocketmq/pull/3956
* [ISSUE#3983] Duplicated warn log in class DefaultMQProducerImpl is unnecessary. by @XiaoyiPeng in https://github.com/apache/rocketmq/pull/3984
* [ISSUE #3985] Remove shuffle operation before sorting the list of 'FaultItem'. by @XiaoyiPeng in https://github.com/apache/rocketmq/pull/3986
* [#3942]If both acl and message trace are enabled and the default topic RMQ_SYS_TRACE_TOPIC is used for message trace, you don't need to add the PUB permission of RMQ_SYS_TRACE_TOPIC topic to the acl config. by @sunxi92 in https://github.com/apache/rocketmq/pull/3943
* [ISSUE #4000]Fix the warn log input in command tools by @zhangjidi2016 in https://github.com/apache/rocketmq/pull/4001
* Add shutdown script for batchproducer.sh by @humkum in https://github.com/apache/rocketmq/pull/4015
* [ISSUE #4002]Optimize some mqadmin command execution results output by @zhangjidi2016 in https://github.com/apache/rocketmq/pull/4003
* [ISSUE #3924] It may be better to change the method StoreStatsService#initPutMessageDistributeTime() to private. by @XiaoyiPeng in https://github.com/apache/rocketmq/pull/3925
* fix docs error by @Hen1ng in https://github.com/apache/rocketmq/pull/4023
* [ISSUE #4028] wrong log output by @panzhi33 in https://github.com/apache/rocketmq/pull/4029
* [ISSUE #4004] Initialize deliverPendingTable, When the ScheduleService is started by @HScarb in https://github.com/apache/rocketmq/pull/4032
* [ISSUE #4040] Unnecessary  toString methods deleted by @hjl11 in https://github.com/apache/rocketmq/pull/4041
* [Minor] RemotingCommandException is not thrown in a method by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4030
* [ISSUE #4048] Make storePathCommitLog base on storePathRootDir by @HScarb in https://github.com/apache/rocketmq/pull/4049
* [ISSUE #4053] NamesrvController code optimization by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4027
* [ISSUE #4054] fix doc format by @Git-Yang in https://github.com/apache/rocketmq/pull/4055
* [ISSUE #4050] fix origin messsage id missing from dead leetter meessage by @Git-Yang in https://github.com/apache/rocketmq/pull/4051
* fix clusterRT and checkMsgSendRT  by @meateggmilk in https://github.com/apache/rocketmq/pull/4047
* [ISSUE #3699] fix unit test by @Git-Yang in https://github.com/apache/rocketmq/pull/3700
* [ISSUE #4035] rename some commands by @yuz10 in https://github.com/apache/rocketmq/pull/4036
* [ISSUE #4048] Make storePathCommitLog base on storePathRootDir by @HScarb in https://github.com/apache/rocketmq/pull/4057
* [Document] Update user_guide.md: Fix for link. by @dugenkui03 in https://github.com/apache/rocketmq/pull/4085
* [ISSUE #4110] Update dledger version to 0.2.4 by @RongtongJin in https://github.com/apache/rocketmq/pull/4111
* [ISSUE #4125] Anonymous new Runnable() can be replaced with lambda by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4031
* Fixed typo in getStartIndex method in RocketMQ_Example.md file by @zfs9521 in https://github.com/apache/rocketmq/pull/4012
* [ISSUE #3940]Optimize AllocateMessageQueueStrategy by @zhangjidi2016 in https://github.com/apache/rocketmq/pull/3941
* [ISSUE #4129] Fix typo in CommitLog.java by @drgnchan in https://github.com/apache/rocketmq/pull/4126
* Bump junit from 4.12 to 4.13.1 in /test by @dependabot in https://github.com/apache/rocketmq/pull/4119
* fix some error by @Hen1ng in https://github.com/apache/rocketmq/pull/4136
* [ISSUE #4155] fix system property setting causing data conflicts in acl test by @caigy in https://github.com/apache/rocketmq/pull/4156
* [ISSUE #4150] Fix spelling problem on docs/en by @gogodjzhu in https://github.com/apache/rocketmq/pull/4141
* [ISSUE #4033] fix async deliver msg will resend forever when serivce not avliable by @Git-Yang in https://github.com/apache/rocketmq/pull/4045
* Optimize the logic of MessageDecoder#decodeMessageId method by @BurningCN in https://github.com/apache/rocketmq/pull/4082
* [ISSUE #4103] Simplify string-list-join in `Message` by @dugenkui03 in https://github.com/apache/rocketmq/pull/4104
* Replace Charset.forName("UTF-8") with StandardCharsets.UTF_8 by @6U-U9 in https://github.com/apache/rocketmq/pull/4024
* MINOR:cleanup code by @Kvicii in https://github.com/apache/rocketmq/pull/4013
* Remove file lock related code snippets in index file by @BurningCN in https://github.com/apache/rocketmq/pull/4135
* [ISSUE #4123] Explicit type argument can be replaced with <> for RouteInfoManager by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4124
* [ISSUE #4175] Prevent update topic on slave by @HScarb in https://github.com/apache/rocketmq/pull/4176
* [ISSUE #4160]remove the final modifier of a method which is already in a final class by @xyjForCoding in https://github.com/apache/rocketmq/pull/4163
* [ISSUE #4165] add new line in sendMsgStatus by @yuz10 in https://github.com/apache/rocketmq/pull/4166
* [ISSUE #4185] Explicit type argument can be replaced with <> by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4186
* [ISSUE #4127]  [BrokerOuterAPI] Anonymous new Runnable() can be replaced with lambda by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4128
* [ISSUE #4187]Support async publish in producer benchmark by @HScarb in https://github.com/apache/rocketmq/pull/4188
* [ISSUE #4183] When the reportSlaveMaxOffset method fails, end the current loop early by @BurningCN in https://github.com/apache/rocketmq/pull/4184
* [ISSUE #4181] Prevent int overflow in `TraceContext` by @dugenkui03 in https://github.com/apache/rocketmq/pull/4182
* [ISSUE #3914] Support multi dirs storage in DLedger by @cserwen in https://github.com/apache/rocketmq/pull/4122
* [ISSUE #4147] javadoc: Fix the problem described in the warning message prompted by the IDE. by @XiaoyiPeng in https://github.com/apache/rocketmq/pull/4148
* [ISSUE #4107] rocketmq-tools should not depend on rocketmq-store by @yuz10 in https://github.com/apache/rocketmq/pull/4108
* update cn design doc by @samz406 in https://github.com/apache/rocketmq/pull/4205
* [Optimization] Replace Timer to ScheduleExecutorService by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4208
* [ISSUE 3585] [Part B] Improve encode/decode performance by @areyouok in https://github.com/apache/rocketmq/pull/3588
* [ISSUE #4099]Optimized the performance of sending traceMessage in `AsyncTraceDispatcher` by @dugenkui03 in https://github.com/apache/rocketmq/pull/4180
* [Docs] Add squash guide and apache contributors guide link in CONTRIBUTING by @ferrirW in https://github.com/apache/rocketmq/pull/4221
* [ISSUE #4130] Remove the exception which will never be thrown by method from method signature by @dugenkui03 in https://github.com/apache/rocketmq/pull/4132
* format code KVConfigManager by @123monkey in https://github.com/apache/rocketmq/pull/4222
* [ISSUE #4211] Fix diskMaxUsedSpaceRatio does not take effect in dLedger by @cserwen in https://github.com/apache/rocketmq/pull/4212
* [ISSUE #4215] OFFSET_OVERFLOW_BADLY will lead to consumption from begin, a large number of repeated consumption by @iamqq23ue in https://github.com/apache/rocketmq/pull/4219
* [ISSUE #4237] REMOVE unnecessary final modifier by @yuancheng314 in https://github.com/apache/rocketmq/pull/4238
* [ISSUE #4239] Use function computeIfAbsent replace if by @MinXie1209 in https://github.com/apache/rocketmq/pull/4231
* [Optimization] Remove redundant queue by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4240
* [ISSUE #4216] fix HmacSHA1 not available when use benchmark by @francisoliverlee in https://github.com/apache/rocketmq/pull/4217
* [ISSUE #4203] Support zstd/lz4 compression to improve send/receive performance by @ferrirW in https://github.com/apache/rocketmq/pull/4213
* [ISSUE-#4251]Add batch flag by @dongeforever in https://github.com/apache/rocketmq/pull/4252
* [ISSUE #3857] refact getPublishTopicList method and subscriptions method redundant code by @xichaodong in https://github.com/apache/rocketmq/pull/3879
* [ISSUE #4254] use function computeIfAbsent replace if  by @MinXie1209 in https://github.com/apache/rocketmq/pull/4255
* [ISSUE #4227] fix ACL tests on Windows by @HScarb in https://github.com/apache/rocketmq/pull/4278
* [ISSUE #4284] Add protocols to readme and delete the description of language clients by @123liuziming in https://github.com/apache/rocketmq/pull/4285
* [ISSUE #4286] add link of rocketmq-site to readme by @logicalee in https://github.com/apache/rocketmq/pull/4288
* [ISSUE #4291] Add  some description text to README by @hyl-xidian in https://github.com/apache/rocketmq/pull/4294
* [ISSUE #4283] add an description in readme.  by @TuringLiu in https://github.com/apache/rocketmq/pull/4293
* fix: delete a feature in Readme by @Jacob-Mr-Yang in https://github.com/apache/rocketmq/pull/4298
* [ISSUE #4304] Fix license check failures by @caigy in https://github.com/apache/rocketmq/pull/4305
* [ISSUE #4310] Optimize serviceProvider's code by @hzh0425 in https://github.com/apache/rocketmq/pull/4311
* [ISSUE #3962] Fix variable name in MappedFile#isAbleToCommit() by @tsunghanjacktsai in https://github.com/apache/rocketmq/pull/4312
* [ISSUE # 4308] Make some variables to be final in brokerController by @hzh0425 in https://github.com/apache/rocketmq/pull/4309
* Fix typo in the broker's log path by @gobbq in https://github.com/apache/rocketmq/pull/4307
* [ISSUE #4315] Optimize ha module's code by @hzh0425 in https://github.com/apache/rocketmq/pull/4316
* [ISSUE #4320] Anonymous new PrivilegedAction can be replaced with lambda by @hzh0425 in https://github.com/apache/rocketmq/pull/4321
* [ISSUE #4332] Remove duplicate code by @coderbruis in https://github.com/apache/rocketmq/pull/4331
* [ISSUE #4317] Fix for statement does not loop by @coderbruis in https://github.com/apache/rocketmq/pull/4314
* [ISSUE #4318]make some variables to be final in IndexHeader by @hzh0425 in https://github.com/apache/rocketmq/pull/4319
* [ISSUE #4287]add detail descriptions to readme by @xyjForCoding in https://github.com/apache/rocketmq/pull/4295
* [ISSUE #4292] Add description to the community list of README file by @terrance-swn in https://github.com/apache/rocketmq/pull/4296
* [ISSUE #4289] Add some detail descriptions to README by @wzgliang in https://github.com/apache/rocketmq/pull/4303
* Add a rough guide for quick start by @gobbq in https://github.com/apache/rocketmq/pull/4302
* [ISSUE #4327] Init collection size by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4214
* [ISSUE #4326] Optimized code by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4258
* [ISSUE #4325] Remove redundant exception to improve readability by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4279
* [ISSUE #4335] Replace deprecated api by @Oliverwqcwrw in https://github.com/apache/rocketmq/pull/4336
* [ISSUE #4323] Optimized openmessaging example code by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4347
* [ISSUE #3804]Commit consumption offset with specific MessageQueue. by @ni-ze in https://github.com/apache/rocketmq/pull/3838
* [ISSUE #4362] remove redundancy group name check of null in method org.apache.rocketmq.client.impl.producer.DefaultMQProducerImpl#checkConfig by @GLBB in https://github.com/apache/rocketmq/pull/4363
* Formatting code of maven dependencies management by @aaron-ai in https://github.com/apache/rocketmq/pull/4371
* [ISSUE #4372] Make it compile with Java9+ by @aaron-ai in https://github.com/apache/rocketmq/pull/4373
* [ISSUE #4067] fix: Add TLS configuration documents. by @chris-joys in https://github.com/apache/rocketmq/pull/4387
* [ISSUE #4391]optimize for printObjectProperties by @dugenkui03 in https://github.com/apache/rocketmq/pull/4392
* [ISSUE #4323] Schedule example add the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4352
* [ISSUE #4226] Message length exceeds the maximum length when sendback by @ni-ze in https://github.com/apache/rocketmq/pull/4338
* Something in docs may cause confusion by @Dios314 in https://github.com/apache/rocketmq/pull/4403
* [iSSUE-4396] Support get all producer on one broker by @francisoliverlee in https://github.com/apache/rocketmq/pull/4395
* [ISSUE #4410] Optimize method org.apache.rocketmq.common.message.MessageDecoder#messageProperties2String, remove useless check by @GLBB in https://github.com/apache/rocketmq/pull/4411
* [ISSUE #4323] Optimized namespace example code by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4346
* [ISSUE #2435] Solve the problem that DefaultMQProducer#request() sends messages and waits for timeout synchronously by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4313
* [ISSUE #4323] Quickstart adds the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4322
* [ISSUE #4323] Batch example add the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4328
* [ISSUE #4323] Broadcast example add the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4344
* [ISSUE #4323] tracemessage example add the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4353
* [ISSUE #4323] Transaction example add the default NamesrvAddr by @li-xiao-shuang in https://github.com/apache/rocketmq/pull/4354
* [ISSUE #23] solve error Algorithm HmacSHA1 not available when your java_home is not found by @TianMing2018 in https://github.com/apache/rocketmq/pull/3869
* [ISSUE #4416] Update dledger version to 0.2.6 by @RongtongJin in https://github.com/apache/rocketmq/pull/4417
* [ISSUE #4377]Unnecessary null check before method call by @coderbruis in https://github.com/apache/rocketmq/pull/4378
* [ISSUE #4365]  acl PlainPermissionManager key file paths set to same by @fulln in https://github.com/apache/rocketmq/pull/4366
* [ISSUE #4263]Delete topic route info based on cluster when delete topic. by @sunxi92 in https://github.com/apache/rocketmq/pull/4268
* [ISSUE #4419] Upgrade maven-checkstyle-plugin to 3.1.2 by @drpmma in https://github.com/apache/rocketmq/pull/4420
* [#4151]Add option p to the updateGlobalWhiteAddr command. by @sunxi92 in https://github.com/apache/rocketmq/pull/4152
* Let name server generate valid JSON response when process topic route queries by @lizhanhui in https://github.com/apache/rocketmq/pull/4432
* [ISSUE #4349] fix negative index when index reach Integer.MAX_VALUE by @Wushiyii in https://github.com/apache/rocketmq/pull/4447
* [ISSUE #4455] add a schedule task to update namesrv address by @cserwen in https://github.com/apache/rocketmq/pull/4456
* [ISSUE #4426]fix ACL issue when sending messages back  by @caigy in https://github.com/apache/rocketmq/pull/4457
* [ISSUE #4037] Add DeleteExpiredCommitLogSubCommand by @HScarb in https://github.com/apache/rocketmq/pull/4038
* [ISSUE #4058] DLedgerCommitLog support LMQ by @chaiyx in https://github.com/apache/rocketmq/pull/4059
* Generate legal JSON response conditionally by @lizhanhui in https://github.com/apache/rocketmq/pull/4473
* [ISSUE #3906] Mark stream-related request by RequestType by @drpmma in https://github.com/apache/rocketmq/pull/4430

## Bug
* [Issue #3922] Fix bugs in ACL modification by @caigy in https://github.com/apache/rocketmq/pull/3927
* fix mac 12+ slow bug by @luky116 in https://github.com/apache/rocketmq/pull/4010
* Bugfix DefaultMessageStore#getEarliestMessageTime() bug in Dledger mode by @HScarb in https://github.com/apache/rocketmq/pull/4168


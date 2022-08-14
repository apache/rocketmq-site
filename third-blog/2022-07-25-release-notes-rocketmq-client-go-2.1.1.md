---
title: "Release Notes - Apache RocketMQ Client Go- Version 2.1.1"
categories:
  - Release_Notes
tags:
  - RocketMQ_Client_Go
---
:::tip Download
* Source: [rocketmq-client-go-2.1.1-source-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-go/2.1.1/rocketmq-client-go-2.1.1-source-release.tar.gz) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-client-go/2.1.1/rocketmq-client-go-2.1.1-source-release.tar.gz.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-client-go/2.1.1/rocketmq-client-go-2.1.1-source-release.tar.gz.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the version 2.1.1 release of RocketMQ Client Go. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-go).

 

## What's Changed
* [[ISSUE #644]](https://github.com/apache/rocketmq-client-go/pull/645) Fix the zlibWriterPools doesn't work leads to high memory usage.
* [[ISSUE #640]](https://github.com/apache/rocketmq-client-go/pull/639) fix PullInterval unit. 
* [[ISSUE #643]](https://github.com/apache/rocketmq-client-go/pull/643) fix crash on selecting queue. 
* [[ISSUE #635]](https://github.com/apache/rocketmq-client-go/pull/636) Improving decoding performance for remoting commands. 
* [[ISSUE #662]](https://github.com/apache/rocketmq-client-go/pull/665) Fix the usage bug of namespace. 
* [[ISSUE #651]](https://github.com/apache/rocketmq-client-go/pull/652) fix an issue where a map read operation was not protected by the lock.
* [[ISSUE #678]](https://github.com/apache/rocketmq-client-go/pull/677) optimizing goroutine of Stat creation. 
* [[ISSUE #680]](https://github.com/apache/rocketmq-client-go/pull/680) wrap topic with namespace when unsubscribe. 
* [[ISSUE #585]](https://github.com/apache/rocketmq-client-go/pull/586) Fix the wrong StoreHost and GroupName with consume trace message. 
* [[ISSUE #614]](https://github.com/apache/rocketmq-client-go/pull/642) Fix go routine leaks when consumer close with msg channel blocked.
* [[ISSUE #694]](https://github.com/apache/rocketmq-client-go/pull/689) Fix typos.
* [[ISSUE #683]](https://github.com/apache/rocketmq-client-go/pull/684) request parameter type error fix. 
* [[ISSUE #695]](https://github.com/apache/rocketmq-client-go/pull/641) Feat: support IPV6. 
* [[ISSUE #631]](https://github.com/apache/rocketmq-client-go/pull/632) Support Consuming from Slave. 
* [[ISSUE #688]](https://github.com/apache/rocketmq-client-go/pull/697) fix: type assert panic. 
* [[ISSUE #698]](https://github.com/apache/rocketmq-client-go/pull/691) fix: call cancel() as soon as possible to release the resources associatd with context.
* [[ISSUE #637]](https://github.com/apache/rocketmq-client-go/pull/700) Fix filter lookback interface for utils.ClientIP. 
* [[ISSUE #659]](https://github.com/apache/rocketmq-client-go/pull/660) make consumeMessageBatchMaxSize default value consistent with java client. 
* [[ISSUE #701]](https://github.com/apache/rocketmq-client-go/pull/702) Fix  timeout of SendAsync. 
* [[ISSUE #704]](https://github.com/apache/rocketmq-client-go/pull/704) add missing log level fatal. 
* [[ISSUE #681]](https://github.com/apache/rocketmq-client-go/pull/682) feat(internal): support reset consumer offset. 
* [[ISSUE #710]](https://github.com/apache/rocketmq-client-go/pull/709) Fix send duplicate message in trace interceptor. 
* [[ISSUE #595]](https://github.com/apache/rocketmq-client-go/pull/706) Update go.mod. 
* [[ISSUE #699]](https://github.com/apache/rocketmq-client-go/pull/714) Fix the bug caused by master broker node is down. 
* [[ISSUE #712]](https://github.com/apache/rocketmq-client-go/pull/712) fix push_consumer#unsubscribe unsubscribe retry. 
* [[ISSUE #716]](https://github.com/apache/rocketmq-client-go/pull/717) Fix the bug caused in HA cluster in pull_consumer.
* [[ISSUE #720]](https://github.com/apache/rocketmq-client-go/pull/720) set subversion when buildSubscriptionData. 
* [[ISSUE #722]](https://github.com/apache/rocketmq-client-go/pull/723) fix the bug caused by failover in consumer. 
* [[ISSUE #735]](https://github.com/apache/rocketmq-client-go/pull/708) centralized management errors. 
* [[ISSUE #731]](https://github.com/apache/rocketmq-client-go/pull/732) Optimize the update offset logic.                                           
* [[ISSUE #650]](https://github.com/apache/rocketmq-client-go/pull/693) fix: correctly mark messages to be reconsumed.                                 
* [[ISSUE #744]](https://github.com/apache/rocketmq-client-go/pull/743) check multiple topics in one batch.                                     
* [[ISSUE #752]](https://github.com/apache/rocketmq-client-go/pull/753) change argument to pointer-like to avoid allocations.                     
* [[ISSUE #757]](https://github.com/apache/rocketmq-client-go/pull/758) Fix GetHeader type conflict.                                                
* [[ISSUE #726]](https://github.com/apache/rocketmq-client-go/pull/756) feat: replace fmt to rlog.                                                  
* [[ISSUE #759]](https://github.com/apache/rocketmq-client-go/pull/765) Change ResetOffsetBody response parse method to support fastjson schema.    
* [[ISSUE #775]](https://github.com/apache/rocketmq-client-go/pull/775) update gjson for security problem.                                           
* [[ISSUE #778]](https://github.com/apache/rocketmq-client-go/pull/779) Build instance name with nanosecond.                                          
* [[ISSUE #788]](https://github.com/apache/rocketmq-client-go/pull/788) Refactor the client instance struct，converge the namesrv module.          
* [[ISSUE #806]](https://github.com/apache/rocketmq-client-go/pull/805) Fix the feature that GetNamesrv.                              
* [[ISSUE #807]](https://github.com/apache/rocketmq-client-go/pull/808) fix code style.                                              
* [[ISSUE #816]](https://github.com/apache/rocketmq-client-go/pull/816) fix long time block when remote endpoint crash.                
* [[ISSUE #818]](https://github.com/apache/rocketmq-client-go/pull/679) fix msg.Body compressed cause error in transaction message processing. 
* [[ISSUE #824]](https://github.com/apache/rocketmq-client-go/pull/824) fix queueMaxSpanFlowControlTimes not change.             
* [[ISSUE #828]](https://github.com/apache/rocketmq-client-go/pull/829) Support rlog rotate.                                     
* [[ISSUE #827]](https://github.com/apache/rocketmq-client-go/pull/826) Support get consumerRunningInfo return goroutine stack. 
* [[ISSUE #825]](https://github.com/apache/rocketmq-client-go/pull/825) fix some params for consumer can not be changed.         
* [[ISSUE #810]](https://github.com/apache/rocketmq-client-go/pull/809) fix async producer example.
* [[ISSUE #803]](https://github.com/apache/rocketmq-client-go/pull/803) Feat/rpc request.                                      
* [[ISSUE #832]](https://github.com/apache/rocketmq-client-go/pull/833) Client may submit wrong offset when network instability.          
* [[ISSUE #823]](https://github.com/apache/rocketmq-client-go/pull/841) fix: panic problem caused by json-iterator in go1.18.                   
* [[ISSUE #773]](https://github.com/apache/rocketmq-client-go/pull/773) fix(sendOneWay): fix stack overflow caused by recursive calls.         
* [[ISSUE #852]](https://github.com/apache/rocketmq-client-go/pull/852) bugfix rebalance is not paused after suspend and rebalance not trigge. 
* [[ISSUE #858]](https://github.com/apache/rocketmq-client-go/pull/858) feat: exchange messages_utils dir.                                    
* [[ISSUE #857]](https://github.com/apache/rocketmq-client-go/pull/857) selectMessageQueue nil *internal.TopicPublishInfo.                      
* [[ISSUE #774]](https://github.com/apache/rocketmq-client-go/pull/856) Avoid cancel context too early cause trace data fail.                 
* [[ISSUE #628]](https://github.com/apache/rocketmq-client-go/pull/629) takeMessages sleep max 5s.                                             
* [[ISSUE #819]](https://github.com/apache/rocketmq-client-go/pull/820) Fix sis.samplingInSeconds and sis.printAtMinutes() running in different goroutines cause DATA RACE. 
* [[ISSUE #783]](https://github.com/apache/rocketmq-client-go/pull/783) Maybe can remove some useless code in encodeBatch(). 
* [[ISSUE #847]](https://github.com/apache/rocketmq-client-go/pull/837) fix primitive.WithMethod ctx transfer. 
* [[ISSUE #840]](https://github.com/apache/rocketmq-client-go/pull/834) consumer consume include tag according to accumulation. 
* [[ISSUE #813]](https://github.com/apache/rocketmq-client-go/pull/812) Fix bug when get `mqadmin consumerStatus` can't get consume status. 
* [[ISSUE #851]](https://github.com/apache/rocketmq-client-go/pull/851) compare slice length directly.                        
* [[ISSUE #814]](https://github.com/apache/rocketmq-client-go/pull/814) fix pullThresholdSizeForTopic invalid.                  
* [[ISSUE #849]](https://github.com/apache/rocketmq-client-go/pull/849) add some methods for pushConsumer.               
* [[ISSUE #843]](https://github.com/apache/rocketmq-client-go/pull/844) fix request offset will not be changed in some case. 
* [[ISSUE #854]](https://github.com/apache/rocketmq-client-go/pull/854) a little improvement use chan instead.                
* [[ISSUE #797]](https://github.com/apache/rocketmq-client-go/pull/860) Fix msg lost if consumer crash when send msg back failed. 
* [[ISSUE #754]](https://github.com/apache/rocketmq-client-go/pull/859) close msgCh when pq dropped.
* [[ISSUE #780]](https://github.com/apache/rocketmq-client-go/pull/865) avoid sendmessage back with origin message body in request.              
* [[ISSUE #728]](https://github.com/apache/rocketmq-client-go/pull/729) client shutdown abnormally.                                             
* [[ISSUE #864]](https://github.com/apache/rocketmq-client-go/pull/868) update rlog to 1.9.0 to fix CVE-2022-29526 in golang.org/x/sys.      
* [[ISSUE #869]](https://github.com/apache/rocketmq-client-go/pull/867) Fix: Consumer api comments.                                     
* [[ISSUE #790]](https://github.com/apache/rocketmq-client-go/pull/866) use uber atomic lib to avoid atomic value data race. 
* [[ISSUE #870]](https://github.com/apache/rocketmq-client-go/pull/871) add license header for some new files. 
* [[ISSUE #872]](https://github.com/apache/rocketmq-client-go/pull/873) fix code coverage shell error in travis ci yml. 

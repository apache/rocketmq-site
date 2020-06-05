---
title: "Release Notes - Apache RocketMQ - Version 4.7.1"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.7.1 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.7.1 release</h2>
    
* Source: [rocketmq-all-4.7.1-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.7.1/rocketmq-all-4.7.1-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.7.1/rocketmq-all-4.7.1-source-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.7.1/rocketmq-all-4.7.1-source-release.zip.sha512)]
* Binary: [rocketmq-all-4.7.1-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.7.1/rocketmq-all-4.7.1-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.7.1/rocketmq-all-4.7.1-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/4.7.1/rocketmq-all-4.7.1-bin-release.zip.sha512)]


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2065'>ISSUE-2065</a>] -  Fix Fastjson version for RCE problem.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2044'>ISSUE-2044</a>] -  Fix DefaultLitePullConsumerImpl NPE.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2042'>ISSUE-2042</a>] -  Select a new namesrv when the old one removed from namesrvAddrList.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2036'>ISSUE-2036</a>] -  Skip the null value in messageProperties2String method.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2025'>ISSUE-2025</a>] -  Polish the code in MQClientAPIImpl#processSendResponse method.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2020'>ISSUE-2020</a>] -  Replace notify blocks with existing method wakeup in ServiceThread.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2007'>ISSUE-2007</a>] -  Upgrade fastjson version to prevent serious security problem.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2003'>ISSUE-2003</a>] -  Delete useless code about DatagramSocket.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1992'>ISSUE-1992</a>] -  Polish the log in Broker2Client.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1988'>ISSUE-1988</a>] -  Fix the issue that can not update messageDelay correctly with mqadmin updateBrokerConfig command.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1978'>ISSUE-1978</a>] -  Fix MessageExt#getBornHostString null pointer exception.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1976'>ISSUE-1976</a>] -  System topic should add permission checking globally.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1950'>ISSUE-1950</a>] -  Fix DefaultMQProducer didn't shutdown completely.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1931'>ISSUE-1931</a>] -  Fix the issue of duplicate doAfterRpcHooks.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1912'>ISSUE-1912</a>] -  Polish the commited offset logic for the lite default pull consumer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1906'>ISSUE-1906</a>] -  BooleanConstantExpression might lead to class loading deadlock.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1895'>ISSUE-1895</a>] -  The flush disk timeout exception needs to be exposed.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1879'>ISSUE-1879</a>] -  GroupTransferService may be blocked by ResponseCallback in SYNC_MASTER mode.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1878'>ISSUE-1878</a>] -  Add unit test about cleaning index file.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1859'>ISSUE-1859</a>] -  Add codecov report for tests.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1807'>ISSUE-1807</a>] -  Fix indexslotNum statistical error.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1689'>ISSUE-1689</a>] -  StatsItem not remove after group or topic be removed.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1400'>ISSUE-1400</a>] -  Disk space detection is blocked when it cost too much time to delete files.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/729'>ISSUE-729</a>] -  Check ChannelHandlerContext whether is null.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/1901'>ISSUE-1901</a>] -  Create reply message fail because property[CLUSTER] is null.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/705'>ISSUE-705</a>] -  WaitNotifyObject class has a wake up bug.
</li>
</ul>

## Document and code style improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/2054'>ISSUE-2054</a>] -  Fix typo error in RocketMQ_Example.md. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2053'>ISSUE-2053</a>] -  Add @Override for RMQOrderListener. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2035'>ISSUE-2035</a>] -  Fix typo error in RequestResponseFuture. 
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2034'>ISSUE-2034</a>] -  Correct the Java doc for MessageListenerOrderly.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2011'>ISSUE-2011</a>] -  Add english README.md document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/2006'>ISSUE-2006</a>] -  Add request-reply document.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1971'>ISSUE-1971</a>] -  Polish ConsumerFilterManager comment.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1964'>ISSUE-1964</a>] -  Fix document error about admin tool.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1883'>ISSUE-1883</a>] -  Fix document error about WipeWritePermSubCommand.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1866'>ISSUE-1866</a>] -  Fix document error about transaction message.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1857'>ISSUE-1857</a>] -  Refactor the code in DefaultMQProducerImpl.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1741'>ISSUE-1741</a>] -  Rename takeMessags to takeMessages.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1574'>ISSUE-1574</a>] -  Fix spell mistake in request code.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/1505'>ISSUE-1505</a>] -  Fix the ListSplitter of batch sample in docs.
</li>
</ul>
                                        
            



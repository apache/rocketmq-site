---
title: "Release Notes - Apache RocketMQ Client CPP- Version 1.2.4"
categories:
  - Release_Notes
tags:
 
  - RocketMQ_Client_CPP

---
:::tip Download
* Source: [rocketmq-client-cpp-1.2.4-source-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-source-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-source-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-1.2.4-bin-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-bin-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-bin-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.4/rocketmq-client-cpp-1.2.4-bin-release.tar.gz.sha512)]
:::

<!--truncate-->
Below is a summary of the issues addressed in the version 1.2.4 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).


<h2> Download the 1.2.4 release</h2>
    

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/188'>ISSUE-188</a>] -  feat(producer): add method for orderly message sending by shardingkey.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/190'>ISSUE-190</a>] -  feat(consumer): add set max cache size for consumer c-style apis.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/193'>ISSUE-193</a>] -  feat(producer): Support user data in async callback.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/199'>ISSUE-199</a>] -  feat(transaction): add transaction message for C APIs.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/165'>ISSUE-165</a>] -  optimize transport layer.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/171'>ISSUE-171</a>] -  replace boost::thread::hardware_concurrency with std version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/195'>ISSUE-195</a>] -  style(example):format the code style in example.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/201'>ISSUE-201</a>] -  feat(errorno): add new error no for transaction producer.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/178'>ISSUE-178</a>] -  fixed typo bug in DefaultMQPushConsumer::getConsumerRunningInfo. 
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/183'>ISSUE-183</a>] -  remove boost from StringIdMaker, and fixed some bugs.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/186'>ISSUE-186</a>] -  fix: skip compressing if message is a batch one.
</li>
</ul>
                                        
            



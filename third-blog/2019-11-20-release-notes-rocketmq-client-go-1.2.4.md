---
title: "Release Notes - Apache RocketMQ Client Go- Version 1.2.4"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---
:::tip Download
* Source: [rocketmq-client-go-1.2.4-source-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-go/1.2.4/rocketmq-client-go-1.2.4-source-release.tar.gz) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-client-go/1.2.4/rocketmq-client-go-1.2.4-source-release.tar.gz.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-client-go/1.2.4/rocketmq-client-go-1.2.4-source-release.tar.gz.sha512)]
:::
<!--truncate-->
Below is a summary of the issues addressed in the version 1.2.4 release of RocketMQ Client Go. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-go).


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/222'>ISSUE-222</a>] -  feat(producer): support lite producer to send message by sharding key.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/225'>ISSUE-225</a>] -  feat(consumer): add set max cachesize api to support simple flow-control.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/261'>ISSUE-261</a>] -  feat(transaction): add transaction producer message.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/251'>ISSUE-251</a>] -  delete useless GroupName and make subscribe method correct.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/246'>ISSUE-246</a>] -  fix(travis):remove unnecessary script in travis.yml. 
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/248'>ISSUE-248</a>] -  fix(golint): fix warnings for golint check.
</li>
</ul>
                                        
            



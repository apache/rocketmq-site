---
title: "Release Notes - Apache RocketMQ Client CPP- Version 2.0.0"
categories:
  - Release_Notes
tags:
  - RocketMQ_Client_CPP
  
---
:::tip Download
* Source: [rocketmq-client-cpp-2.0.0-source-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-source-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-source-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-2.0.0-bin-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-bin-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-bin-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.0.0/rocketmq-client-cpp-2.0.0-bin-release.tar.gz.sha512)]
:::
<!--truncate-->
Below is a summary of the issues addressed in the version 2.0.0 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).



  

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/206'>ISSUE-206</a>] -  refactor(rebalance): use smart_ptr to manage pullrequest and refactor rebalancing process.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/207'>ISSUE-207</a>] -  feat(namespace): add namespace support.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/214'>ISSUE-214</a>] -  test(unittest): refactor some unitests.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/222'>ISSUE-222</a>] -  refactor(client): add timer to clean the offline brokers and and test case for it.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/225'>ISSUE-225</a>] -  feat(protocol): try to use command v2 to send messages.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/227'>ISSUE-227</a>] -  refactor(memleak): remove mem leak in the factory schedule task.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/230'>ISSUE-230</a>] -  feat(version): add maxConsumerTimes to support higher client version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/232'>ISSUE-232</a>] -  feat(callback): use start pointer to manager callbacks.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/233'>ISSUE-233</a>] -  refactor(consumer): remove event if consumer service shutdown.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/235'>ISSUE-235</a>] -  feat(interface): remove boost in header file and examples.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/236'>ISSUE-236</a>] -  style(apis): remove unnessary comments in the CPP head files.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/238'>ISSUE-238</a>] -  feat(package): add rpm build and dpkg build script.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/209'>ISSUE-209</a>] -  fix(consumer): fix the issue that message will be lost if sent back to broker failed.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/210'>ISSUE-210</a>] -  fix(consumer): the message was sent back to broker error when it be consumed failed.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/213'>ISSUE-213</a>] -  fix(producer): fix the issue that it will coredump in DestroyProducer function when the producer shutdown.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/220'>ISSUE-220</a>] -  chore(notice): update the year to 2020 in notice file.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/223'>ISSUE-223</a>] -  style(protocol): remove unnessary printing in the protocol decode file and add some test cases for it.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/228'>ISSUE-228</a>] -  style(protocol): feat(libevent): update libevent to v2.1.11 to avoid get mutex time out.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/237'>ISSUE-237</a>] -  fix(build): fix variable in build script.
</li>
</ul>
                                        
            



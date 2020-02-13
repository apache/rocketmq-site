---
title: "Release Notes - Apache RocketMQ Client CPP- Version 1.2.5"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the version 1.2.5 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).


<h2> Download the 1.2.5 release</h2>
    
* Source: [rocketmq-client-cpp-1.2.5-source-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-source-release.tar.gz) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-source-release.tar.gz.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-1.2.5-bin-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-bin-release.tar.gz) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-bin-release.tar.gz.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.5/rocketmq-client-cpp-1.2.5-bin-release.tar.gz.sha512)]

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/206'>ISSUE-206</a>] -  refactor(rebalance): use smart_ptr to manage pull request.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/207'>ISSUE-207</a>] -  feat(namespace): add name space support.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/214'>ISSUE-214</a>] -  fix(unittest): refactor some unitests.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/222'>ISSUE-222</a>] -  feat(client): add timer to clean off line broker and test case.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/225'>ISSUE-225</a>] -  fix(send): try to use command v2 to send messages.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/227'>ISSUE-227</a>] -  feat(memleak): remove mem leak in factory schedule task.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/230'>ISSUE-230</a>] -  feat(version): add maxConsumerTimes to support higher client version.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/232'>ISSUE-232</a>] -  feat(callback): use start pointer to manager callbacks.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/233'>ISSUE-233</a>] -  feat(consumer): remove event if consumer service shutdown.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/235'>ISSUE-235</a>] -  feat(interface): remove boost in header file and examples.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/236'>ISSUE-236</a>] -  feat(apis):refactor apis for CPP styles.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/238'>ISSUE-238</a>] -  feat(package): add rpm build and dpkg build script.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/209'>ISSUE-209</a>] -  fix(consumer): fix the issue that msg lost when send back to broker failed. 
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/210'>ISSUE-210</a>] -  fix(consumer): send back error when consuming failed.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/213'>ISSUE-213</a>] -  fix(producer) crash in DestroyProducer shutdown.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/223'>ISSUE-223</a>] -  fix(protocol): delete string print in header decode and open test cases.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/228'>ISSUE-228</a>] -  feat(libevent): update libevent to v2.1.11 to avoid get mutex time out.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/237'>ISSUE-237</a>] -  fix(build): fix variable in build script.
</li>
</ul>
                                        
            



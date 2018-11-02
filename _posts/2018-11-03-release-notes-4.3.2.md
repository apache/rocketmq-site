---
title: "Release Notes - Apache RocketMQ - Version 4.3.2"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.3.2 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.3.2 release</h2>
    
* Source: [rocketmq-all-4.3.2-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-source-release.zip.asc)] [[MD5](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-source-release.zip.md5)] [[SHA1](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-source-release.zip.sha1)]
* Binary: [rocketmq-all-4.3.2-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip.asc)] [[MD5](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip.md5)] [[SHA1](https://www.apache.org/dist/rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip.sha1)]

## New Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/462'>ISSUE-462</a>] -  Add the python [client](https://github.com/apache/rocketmq-client-python), which is based on the encapsulation of the C interface.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/488'>ISSUE-488</a>] -  Add the C/C++ [client](https://github.com/apache/rocketmq-client-cpp). A bunch of other client will be built on top of it, including Python, node.js, go .The C/C++ Client with robust high performance support for produce, pull/push consumer, etc.
</li>
</ul>



## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/411'>ISSUE-411</a>] -  Fixed ClassCastException when get the instance of the store.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/461'>ISSUE-461</a>] -  Purge filterserv related code in client.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/478'>ISSUE-478</a>] -  Polish async send message sample.
</li>
</ul>

## Bug

<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/406'>ISSUE-406</a>] -  Fixed the NPE issue occurred when getting the storehost using admin tool.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/433'>ISSUE-433</a>] -  Fixed the issue that Integration-test can not be executed when run "mvn clean install".
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/439'>ISSUE-439</a>] -  Fixed the issue that ConsumeMessageCommand -g setting.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/447'>ISSUE-447</a>] -  Fix the issue that checkLocalTransaction method does not take effect.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/490'>ISSUE-490</a>] -  Fix the issue that testGetLocalInetAddress failure on some versions of the server.
</li>
</ul>
                                        
            



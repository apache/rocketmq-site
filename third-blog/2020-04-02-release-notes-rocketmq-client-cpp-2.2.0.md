---
title: "Release Notes - Apache RocketMQ Client CPP- Version 2.2.0"
categories:
  - Release_Notes
tags:

  - RocketMQ_Client_CPP

---
:::tip Download
* Source: [rocketmq-client-cpp-2.2.0-source-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-source-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-source-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-2.2.0-bin-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-bin-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-bin-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.2.0/rocketmq-client-cpp-2.2.0-bin-release.tar.gz.sha512)]
:::
<!--truncate-->
Below is a summary of the issues addressed in the version 2.2.0 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).
   


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/273'>ISSUE-273</a>] -  Use OpenSSL to add support for SSL communication with the server .
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/291'>ISSUE-291</a>] -  Use separate factory for trace producer of push consumer.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/284'>ISSUE-284</a>] -  Fix the issue that sometime the log in rebalance will cause core dump.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/286'>ISSUE-286</a>] -  Add null pointer check before push consumer shutdown.
</li>
</ul>
                                        
            



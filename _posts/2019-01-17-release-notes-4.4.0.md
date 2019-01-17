---
title: "Release Notes - Apache RocketMQ - Version 4.4.0"
categories:
  - Release_Notes
tags:
  - Release_Notes
  - RocketMQ
  - Version
---

Below is a summary of the issues addressed in the 4.4.0 release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 4.4.0 release</h2>
    
* Source: [rocketmq-all-4.4.0-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.4.0/rocketmq-all-4.4.0-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-source-release.zip.asc)] [[MD5](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-source-release.zip.md5)] [[SHA1](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-source-release.zip.sha1)]
* Binary: [rocketmq-all-4.4.0-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.4.0/rocketmq-all-4.4.0-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-bin-release.zip.asc)] [[MD5](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-bin-release.zip.md5)] [[SHA1](https://www.apache.org/dist/rocketmq/4.4.0/rocketmq-all-4.4.0-bin-release.zip.sha1)]

## New Fearture
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/403'>ISSUE-403</a>] -  Support the ACL standard for RocketMQ.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/502'>ISSUE-502</a>] -  Support SQL92 filter in pull comsumer.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/525'>ISSUE-525</a>] -  Support message track.
</li>
</ul>

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/571'>ISSUE-571</a>] -  Polish max body size to exactly 64K.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/582'>ISSUE-582</a>] -  Update asynchronous send thread pool from callback executor to an exclusive one.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/512'>ISSUE-512</a>] -  Fixed the issue that RocketMQ option -p can not print config items.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/544'>ISSUE-544</a>] -  Fixed transactional message will be lost under extreme condition.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/556'>ISSUE-556</a>] -  Fixed the issue that epoll native selector start error in broker.
</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/604'>ISSUE-604</a>] -  Fixed the issue that semaphore was raised when asyn invoke timeout.
</li>
</ul>
                                        
            



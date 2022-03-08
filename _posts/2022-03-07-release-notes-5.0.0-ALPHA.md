---
title: "Release Notes - Apache RocketMQ - Version 5.0.0-ALPHA"
categories:
- Release_Notes
tags:
- Release_Notes
- RocketMQ
- Version
---

Below is a summary of the issues addressed in the 5.0.0-ALPHA release of RocketMQ. For full documentation of the release, a guide to get started, please refer to <a href='/docs/quick-start/'>Quick Start</a>.


<h2> Download the 5.0.0-ALPHA release</h2>

* Source: [rocketmq-all-5.0.0-ALPHA-source-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-ALPHA-source-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-bin-release.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-ALPHA-source-release.zip.sha512)]
* Binary: [rocketmq-all-5.0.0-ALPHA-bin-release.zip](https://www.apache.org/dyn/closer.cgi?path=rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-ALPHA-bin-release.zip) [[PGP](https://www.apache.org/dist/rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-ALPHA-bin-release.zip.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/5.0.0-ALPHA/rocketmq-all-5.0.0-ALPHA-bin-release.zip.sha512)]

## Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq/wiki/RIP-26-Improve-Batch-Message-Processing-Throughput'>RIP-26</a>] - Improve Batch Message Processing Throughput.
</li>
<li>[<a href='https://github.com/apache/rocketmq/tree/5.0.0-alpha/docs/cn/statictopic'>RIP-21</a>] - Support static topic.
</li>
</ul>

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq/issues/3521'>ISSUE-3521</a>] - Fix the risk of memory overflow caused by excessive popShareQueueNum</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3755'>ISSUE-3755</a>] - Change the log level to warn when ack failed</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3498'>ISSUE-3498</a>] - Make messages in reviveTopic more evenly written to different queues</li>
<li>[<a href='https://github.com/apache/rocketmq/issues/3708'>ISSUE-3708</a>] - Add CorrectLogicOffsetService to periodically correct min logic offset</li>
</ul>




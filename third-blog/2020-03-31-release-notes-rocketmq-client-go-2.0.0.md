---
title: "Release Notes - Apache RocketMQ Client Go- Version 2.0.0"
categories:
  - Release_Notes
tags:

  - RocketMQ_Client_Go

---
:::tip Download
    
* Source: [rocketmq-client-go-2.0.0-source-release.tar.gz](https://www.apache.org/dyn/closer.cgi?path=rocketmq/rocketmq-client-go/2.0.0/rocketmq-client-go-2.0.0-source-release.tar.gz) [[PGP](https://www.apache.org/dist/rocketmq/rocketmq-client-go/2.0.0/rocketmq-client-go-2.0.0-source-release.tar.gz.asc)] [[SHA512](https://www.apache.org/dist/rocketmq/rocketmq-client-go/2.0.0/rocketmq-client-go-2.0.0-source-release.tar.gz.sha512)]
:::

<!--truncate-->
Below is a summary of the issues addressed in the version 2.0.0 release of RocketMQ Client Go. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-go).


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pulls?q=is%3Apr+is%3Aclosed+milestone%3ANative-0.9.0'>FEATURE-1</a>] -  Features in 2.0.0-alpha1.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pulls?q=is%3Apr+is%3Aclosed+milestone%3ANative-2.0.0-alpha2'>FEATURE-2</a>] -  Features in 2.0.0-alpha2.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pulls?q=is%3Apr+is%3Aclosed+milestone%3ANative-2.0.0-alpha3'>FEATURE-3</a>] -  Features in 2.0.0-alpha3.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pulls?q=is%3Apr+is%3Aclosed+milestone%3A2.0.0-RC1'>FEATURE-4</a>] -  Features in 2.0.0-rc1.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pulls?q=is%3Apr+is%3Aclosed+milestone%3A2.0.0-RC2'>FEATURE-5</a>] -  Features in 2.0.0-rc2.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/438'>ISSUE-438</a>] -  Add WithNameServerDomain for producer opt. 
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/437'>ISSUE-437</a>] -  Fix the issue that can not consume the messages in the retry topic.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/445'>ISSUE-445</a>] -  UpdateNameServerAddress shoule be called before producer start to avoid to lead to a panic.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/449'>ISSUE-449</a>] -  Correct msgid using unique id.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/450'>ISSUE-450</a>] -  Ignore eof error when conn closed.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-go/pull/462'>ISSUE-462</a>] -  Fix the trace message was send failed.
</li>
</ul>
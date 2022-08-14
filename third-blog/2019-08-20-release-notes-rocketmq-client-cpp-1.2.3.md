---
title: "Release Notes - Apache RocketMQ Client CPP- Version 1.2.3"
categories:
  - Release_Notes
tags:
  - RocketMQ_Client_CPP

---
:::tip Download
* Source: [rocketmq-client-cpp-1.2.3-source-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-source-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-source-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-1.2.3-bin-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-bin-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-bin-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/1.2.3/rocketmq-client-cpp-1.2.3-bin-release.tar.gz.sha512)]
:::
<!--truncate-->
Below is a summary of the issues addressed in the version 1.2.3 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).




## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/139'>ISSUE-139</a>] -  Export send batch messages api in c style.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/154'>ISSUE-154</a>] -  Support transaction message.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/138'>ISSUE-138</a>] -  Support getting error code and error message when C api returns.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/140'>ISSUE-140</a>] -  Fix build warnings in namespace util.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/143'>ISSUE-143</a>] -  Replace unsigned int by auto to save string::size_type.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/157'>ISSUE-157</a>] -  Remove two unused functionalities, removeDropedPullRequestOpaque and deleteOpaqueForDropPullRequest.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/159'>ISSUE-159</a>] -  Update unit test case for response future.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/160'>ISSUE-160</a>] -  Optimize BatchMessage detection in producer send kernel.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/127'>ISSUE-127</a>] -  Support muti-threads compile in build.sh.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/167'>ISSUE-167</a>] -  Support 64bit boost library on windows.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/172'>ISSUE-172</a>] -  Remove useless code and fix compile warnings.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/179'>ISSUE-179</a>] -  Modify deploy shell to package license and notice file.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/59'>ISSUE-59</a>] -  Fix infinite loop on tcp transport connect. 
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/152'>ISSUE-152</a>] -  Resolve the bug without encode batch flag when send batch message.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/156'>ISSUE-156</a>] -  Use io-thread pool and work-thread pool in network callback to resolve deadlock in block-request.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/175'>ISSUE-175</a>] -  Fix the death lock on pull request process of orderly consumer.
</li>
</ul>
                                        
            



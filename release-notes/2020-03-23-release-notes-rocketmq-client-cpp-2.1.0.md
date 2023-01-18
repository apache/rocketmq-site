---
title: "Release Notes - Apache RocketMQ Client CPP- Version 2.1.0"
categories:
  - Release_Notes
tags:

  - RocketMQ_Client_CPP

---
:::tip Download
* Source: [rocketmq-client-cpp-2.1.0-source-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-source-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-source-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-source-release.tar.gz.sha512)]
* Binary: [rocketmq-client-cpp-2.1.0-bin-release.tar.gz](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-bin-release.tar.gz) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-bin-release.tar.gz.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-client-cpp/2.1.0/rocketmq-client-cpp-2.1.0-bin-release.tar.gz.sha512)]
:::
<!--truncate-->
Below is a summary of the issues addressed in the version 2.1.0 release of RocketMQ Client CPP. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-client-cpp).

  


## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/276'>ISSUE-276</a>] -  Add trace message for pub and sub.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/281'>ISSUE-281</a>] -  Add trace message shift for C style APIs.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/274'>ISSUE-274</a>] -  Fix the heap-use-after-free risk caused by direct deconstruction when it is not used after initialization.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/254'>ISSUE-254</a>] -  Add the script to package static lib on macOS.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/256'>ISSUE-256</a>] -  Update jsoncpp to 0.10.7 in order to fix build error by gcc7+.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/257'>ISSUE-257</a>] -  Add asan/lsan support, and formatting code.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/261'>ISSUE-261</a>] -  Add api to get SDK versions.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/242'>ISSUE-242</a>] -  Add some test cases for default producer implement.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/244'>ISSUE-244</a>] -  Add missed license header in some files.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/251'>ISSUE-251</a>] -  Remove warnings in header files.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/252'>ISSUE-252</a>] -  Use userdata to cache the local checker callback.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/258'>ISSUE-258</a>] -  Add regionId support in the send result.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/260'>ISSUE-260</a>] -  Add sharding key in the message property.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/265'>ISSUE-265</a>] -  Use dynamic cpu cores to compile code.
</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/283'>ISSUE-283</a>] -  Send message back failed some time because the timeout was set too short.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/246'>ISSUE-246</a>] -  Fix the issue that failed to select transaction producer to call local state checker.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/248'>ISSUE-248</a>] -  Fix variable check error in the build script.
</li>
<li>[<a href='https://github.com/apache/rocketmq-client-cpp/pull/241'>ISSUE-241</a>] -  Fix heap-buffer-overflow risk issues.
</li>

</ul>
                                        
            



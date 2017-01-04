---
title: "How to Support More Queues in RocketMQ?"
categories:
  - RocketMQ
tags:
  - RocketMQ
  - Queue
  - Partition
  - Message Oriented Middleware
---

# Summary

Kafka is a distributed streaming platform, which was born from [logging aggregation cases](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying). It does not need too high concurrency. In some large scale cases in alibaba, we found that the original model has been unable to meet our actual needs. So, we developed a messaging middleware, named RocketMQ, which can handle a broad set of use cases, ranging from traditional publish/subscribe scenario to demandingly high volume realtime transaction system that tolerates no message loss. Now, in alibaba, RocketMQ clusters process more than 500 billion events every day, provide services for more than 3000 core applications.

{% include toc %}

# Partition design in kafka
1. Producer parallelism of writing is bounded by the number of partitions.
2. The degree of consumer consumption parallelism, is also bounded by the number of partitions being consumed. Assuming that the number of partitions is 20, the maximum number of concurrent consuming consumers is 20.
3. Each topic consists of a fixed number of partitions. Partition number determines the maximum number of topics that single broker may have without significantly affecting performance.

More details please refer to [here](http://www.confluent.io/blog/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/).

## Why Kafka can't support more partitions
1. Each partition stores the whole message data. Although each partition is orderly written to the disk, as number of concurrently writing partitions increases, writing become random in the perspective of operating system.
2. Due to the scattered data files, it is difficult to use the Linux IO Group Commit mechanism.

# How to support more partition in RocketMQ?

![screenshot](/assets/images/blog/rocketmq-queues.png)


1. All message data are stored in commit log files. All writes are completely sequential whilst reads are random.
2. ConsumeQueue stores the actual user consumption location information, which are also flushed to disk in sequential manner.

> pros：

1. Each consume queue is lightweight and contains limited amount of meta data.
2. Access to disk is totally sequential, which avoids disk lock contention, and will not incur high disk IO wait when a large number of queues has been created.

> cons：

1. Message consumption will first read consume queue, then commit log. This process brings in certain cost in worst cases.
2. Commit log and consume queues need to be logically consistent, which introduces extra complexities to programming model.

> Design Motivation：

1. Random read. Read as much as possible to increase the page cache hit rate, and reduce read IO operations. So large memory is still preferable. If massive messages are accumulated, would the read performance degrade badly? The answer is negative, reasons are as follows:
	- Even if size of the message is only 1KB, the system will read more data in advance, see [PAGECACHE prefetch](https://en.wikipedia.org/wiki/Cache_prefetching) for reference. This means for the sequel data read, it is access to main memory that will be carried out instead of slow disk IO read.
	- Random access CommitLog from disk. If set the I/O scheduler to NOOP in case of SSD, the read qps will be greatly accelerated thus much faster than other elevator scheduler algorithm.
2. Given ConsumeQueue stores fixed-size metadata only, which is mainly used to record consuming progress, random read is well supported. Taking advantage of page cache prefetch, accessing ConsumeQueue is as efficiently fast as accessing main memory, even if it's in the case of massive message accumulation. As a result，ConsumeQueue will NOT bring in noticeable penalty to the read performance.
3. CommitLog stores virtually all information, including the message data. Similar to redo log of relational database, consume queues, message key indexes and all other required data can be completely recovered as long as commit log exists..

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
2. The degree of consumer consumption parallelism, also is bounded by the number of partitions being consumed. Assuming that the number of partitions is 20, then the maximum concurrent consumption of Consumer is 20.
3. Each Topic consists of a number of fixed number of partitions. Partition number determines the number of Topic that single Broker can support.

More details please refer to [here](http://www.confluent.io/blog/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/).

## Why Kafka can't support more partitions
1. Each partition stores the whole message data, although each partition is written to the disk is in order, but a number of sequential partition writing  at the same time from the aspect of operating system become a random writing.
2. Due to the scattered data files, it is difficult to use the linux IO Group Commit mechanism.

# How to support more partition in RocketMQ?

![screenshot](/assets/images/blog/rocketmq-queues.png)


1. All message data are stored in CommmitLog files. Complete sequential writing and random read.
2. ConsumeQueue stores the actual user consumption location information, they are flushed to disk in sequential mode.

> pros：

1. A very small amount of data on a single consume queue. Lightweight.
2. Sequential access in disk, avoid disk lock contention, and not incur high disk iowait when more and more queues created.

> cons：

1. Message consumption will read ConsumeQueue firstly, then read CommitLog if not found.This process brings a certain cost in the worst cases.
2. CommitLog and ConsumeQueue must be keep completely consistent, increasing the complexity of programming model.

> Design Motivation：

1. Random read. Read as much as possible to increase the PAGECACHE hit rate, and reduce read io operations. So bigger memory is still better. If too much message accumulation happened, whether the read performance will fall very badly? the answer is negative, reasons are as follows:
	- [PAGECACHE prefetch](https://en.wikipedia.org/wiki/Cache_prefetching), even if the 1K message, the system will read more data in advance. You may hit the memory in the next read operation.
	- Random access CommitLog from disk. If set the I/O scheduler to noop in SSD, the read qps will greatly accelerate than others scheduler algorithm.
2. Because ConsumeQueue stores little information, mainly associated with consumption locations.also, supports random read. Under PAGECACHE prefetch control, read performance almost keep consistent with the main memory, even if in the message accumulation cases. In this particular case，ConsumeQueue will not hinder the read performance.
3. CommitLog stores all the meta information, including the message data. similar db's redolog. So as long as CommitLog exists, even if the ConsumeQueue data is lost, data can be recovered.

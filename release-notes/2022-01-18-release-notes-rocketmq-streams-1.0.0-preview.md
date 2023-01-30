---
title: "Release Notes - Apache RocketMQ Streams - Version 1.0.0-preview"
categories:
    - Release_Notes
tags:

    - RocketMQ_Streams
  
---
:::tip Download
* Source: [rocketmq-streams-1.0.0-preview.zip](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.0-preview/rocketmq-streams-1.0.0-preview.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.0-preview/rocketmq-streams-1.0.0-preview.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.0-preview/rocketmq-streams-1.0.0-preview.zip.sha512)]

:::
<!--truncate-->
Below is a summary of the issues addressed in the 1.0.0-preview release of RocketMQ Streams. For full documentation of the release, a guide to get started, please refer to <a href='https://github.com/apache/rocketmq-streams'>Quick Start</a>.




## Apache RocketMQ Streams

With the popularization and development of mobile internet and cloud computing technologies in all walks of life, big data computing has been deeply rooted in the hearts of the people, the most common ones are flink, spark, etc. These big data frameworks adopt a centralized Master-Slave architecture, which is heavy in dependence and deployment, and each task also has a large overhead and a large usage cost. RocketMQ Streams focuses on building a lightweight computing engine. Except for message queues, it has no additional dependencies. It has made a lot of optimizations on filtering scenarios. The performance is improved by 3-5 times and resources are saved by 50%-80%.

RocketMQ Streams is suitable for scenarios with large data volume -> high filtering -> light window computing. The core builds light resources and high performance advantages. It has great advantages in resource sensitive scenarios. The minimum 1core and 1g can be deployed. Recommended application scenarios (safe , Risk control, edge computing, message queue flow computing).



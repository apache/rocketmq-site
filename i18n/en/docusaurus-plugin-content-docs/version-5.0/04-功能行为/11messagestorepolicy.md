# Message storage and cleanup

This topic describes how Apache RocketMQ stores messages, including storage granularity, determination criteria, and processing policies.

## Background information

Based on the definition of [MessageQueue](../03-领域模型/03messagequeue.md) in Apache RocketMQ, messages are stored in queues in the order in which the messages are received by the broker. In theory, the number of messages that a queue can store is unlimited.

In actual deployment scenarios, messages cannot be permanently stored because the physical storage space of a broker is limited. Therefore, when you deploy messages, you need to answer three questions: What criteria are used to determine how to store messages on a broker? What granularity is used to manage the stored messages? What measures must be taken when message storage usage exceeds the limit? The message storage and cleanup mechanisms of Apache RocketMQ provide answers to the preceding questions.

You can better perform O\&M by using message storage and cleanup mechanisms based on the following aspects:

* SLA for storage: Storage duration refers to the time period in which users can obtain messages. This feature is suitable for scenarios in which a long consumption period is required, messages are accumulated, and fault recovery is required.

* Evaluation and control of storage costs: Apache RocketMQ stores messages on disks. You can evaluate storage space and reserve storage resources in advance.

## Message storage mechanism


**Working mechanism**

Each node of Apache RocketMQ stores messages for a specific period of time. This period of time, known as storage duration, is used to determine how long a message is stored. Messages that are within the storage duration are retained, while messages that exceed the duration limit are cleaned up, regardless of whether they are consumed.

The following section describes the items related to the message storage mechanism:

* Management granularity: Apache RocketMQ manages message storage duration based on nodes.

* Determination criterion: Message storage duration is used as the determination criterion. Compared with message quantity or size, storage duration can help you evaluate the values of messages in a more efficient manner.

* Whether message storage is related to consumption status: The message storage duration in Apache RocketMQ starts from the point in time when the message is produced and is not related to consumption status. You can simplify the message storage mechanism by using a unified calculation strategy.

The following figure shows how messages are stored in a queue.![消息存储](../picture/v5/cleanpolicy.png)

:::note 
**Management granularity**

Apache RocketMQ manages storage duration based on broker nodes due to the following reasons:

* Advantages of message storage: Apache RocketMQ manages physical data by using a unified two-level organization method that consists of physical log queues and lightweight logical queues. This method provides the benefits of ordered read and write operations, high throughput, and high performance. However, you cannot manage message storage based on topics or queues by using this method.

* Capacity assurance and data security: Even though Apache RocketMQ generates independent storage files based on topics or queues, the files share the same underlying storage medium. You can manage storage duration based on topics or queues in a flexible manner. The SLA for storage may not be fulfilled if the storage capacity of the cluster becomes insufficient. If you want to manage messages in a secure manner, the best way is to store messages by using different storage durations in different clusters.

:::


**Relationship between message storage and consumption status**

Apache RocketMQ manages message storage duration in a centralized manner, regardless of whether the messages are consumed.

Messages may be accumulated in a queue due to inactive consumers or abnormal consumption. There is no effective solution to this problem for the time being. If all messages that are not consumed are retained, the storage space is quickly used up. This affects the speed of read and write operations for new messages.

Consumers can manage messages based on storage duration to determine the lifecycle of each message. Consumers can consume a message any time during the storage duration, or consume the message multiple times by using the [Reset a consumer offset](./09consumerprogress.md) feature.


## Message cleanup mechanism

In Apache RocketMQ, the storage duration of a message is different from the actual storage duration. This is because messages are stored in local disks. When the local disk space becomes insufficient, the system forcibly deletes messages to ensure service stability. As a result, the actual storage duration is shorter than the specified storage duration.

The Apache RocketMQ storage system is developed based on the cloud-native technologies of Alibaba Cloud. This allows all instances to use storage space without imposing limits on storage capacity. All messages are stored based on their specified storage duration. You do not need to worry about the deletion of messages due to insufficient storage space.
## Usage notes 

**Increase the storage duration based on your business requirements**

Apache RocketMQ controls whether to retain messages based on storage duration. We recommend that you specify a longer storage duration based on your business requirements. A longer storage duration allows you more room to perform operations for emergency fault recovery, emergency troubleshooting, and message backtracking.

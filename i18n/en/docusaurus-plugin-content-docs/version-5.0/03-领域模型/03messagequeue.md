# MessageQueue 

This section describes the definition, model relationship, and internal attributes of message queues in Apache RocketMQ. This topic also provides version compatibility information and usage notes for message queues.

## Definition 


A queue is a container that is used to store and transmit messages in Apache RocketMQ. A queue is the smallest unit of storage for Apache RocketMQ messages.

A topic in Apache RocketMQ consists of multiple queues. This way, queues support horizontal partitioning and streaming storage.

Queues provide the following benefits:

* Ordered storageQueues are ordered in nature. Messages are stored in the same order in which they are queued. The earliest message is at the start of the queue and the latest message is at the end of the queue. Offsets are used to label the locations and the order of messages in a queue.

* Streaming operation semanticsThe queue-based storage in Apache RocketMQ allows consumers to read one or more messages from an offset. This helps implement features such as aggregate read and backtrack read. These features are not available in RabbitMQ or ActiveMQ.

  




## Model relationship

The following figure shows the position of queues in the domain model of Apache RocketMQ.![队列](../picture/v5/archiforqueue.png)

By default, Apache RocketMQ provides reliable message storage. All messages that are successfully delivered are persistently stored in queues. Messages are sent by the producer and received by the consumer client. Each message can be successfully delivered at least once.

The queue model of Apache RocketMQ is similar to the partition model of Kafka. In Apache RocketMQ, a queue is part of a topic. Messages are operated in queues even though they are managed by topic. For example, when a producer sends a message to a specific topic, the message is sent to a queue in the topic.

You can change the number of queues in Apache RocketMQ to scale out or scale in.

## Internal attributes

Read and write permissions

* Definition: whether data can be read from or written to the current queue.

* Values: defined by the broker. The following describes the enumerations:
  * 6: read and write. Messages can be written to and read from the current queue.

  * 4: read-only. Messages can be read from but not written to the current queue.

  * 2: write-only. Messages can be written to but not read from the current queue.

  * 0: The read or write status is unavailable. The current queue does not allow read or write operations.


* Constraint: The read and write permissions are related to O\&M operations. We recommend that you do not frequently modify the permissions.





## Behavior constraints

Each topic consists of one or more queues that are used to store messages. The number of queues in each topic is related to the message type and the region where the instance resides. The number of queues cannot be changed.

## Version compatibility

Queue names vary based on the versions of Apache RocketMQ brokers. The following describes the differences:

* Broker versions 3.x and 4.x: A queue name consists of the topic name, broker ID, and queue ID, and is bound to physical nodes.

* Broker versions 5.x: A queue name is a globally unique string that is assigned by the cluster, and is decoupled from physical nodes.




We recommend that you do not construct queue names or bind them to other operations. Otherwise, the queue names may fail to be resolved when the broker is updated.
## Usage notes

**Queue number setting**

You can specify the number of queues in Apache RocketMQ when you create or change a topic. We recommend that you configure a small number of queues and avoid adding queues that you do not require.

The following describes the issues that occur due to a large number of queues in a topic:

* **Increase in the volume of metadata in a cluster** Apache RocketMQ collects metrics and monitors data based on queues. A large number of queues may cause the volume of metadata to increase.



* **Overloaded client** Message reads and writes in Apache RocketMQ are performed based on queues. A large number of queues may generate empty polling requests that increase system load.


**Scenarios for adding queues**

* Load balancing of physical nodes

  Queues of each topic in Apache RocketMQ can be distributed to different service nodes. To ensure the load balancing of cluster traffic after the cluster is scaled out, we recommend that you add queues or migrate previous queues to the new service nodes.



* Performance bottleneck issue related to fifo messages

  In Apache RocketMQ broker versions 4.x, fifo messages take effect in only queues. As a result, the concurrency of fifo messages is based on the number of queues. We recommend that you increase the number of queues when a performance bottleneck issue occurs in the system.




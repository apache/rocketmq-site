# Concepts

This section describes the core concepts of Apache RocketMQ.

## Topic

A topic is a top-level container that is used in Apache RocketMQ to transfer and store messages that belong to the same business logic.Learn more [Topic](../03-领域模型/02topic.md).

## MessageType
Categories defined by message transfer characteristics for type management and security verification. Apache RocketMQ support NORMAL,FIFO,TRANSACTION and DELAY message type.

## MessageQueue

MessageQueue is a container that is used to store and transmit messages in Apache RocketMQ. MessageQueue is the smallest unit of storage for Apache RocketMQ messages. Learn more [MessageQueue](../03-领域模型/03messagequeue.md).

## Message

A message is the smallest unit of data transmission in Apache RocketMQ. A producer encapsulates the load and extended attributes of business data into messages and sends the messages to a Apache RocketMQ broker. Then, the broker delivers the messages to the consumer based on the relevant semantics. Learn more[Message](../03-领域模型/04message.md).

## MessageView

MessageView is read-only interface to message from a development perspective. The message view allows you to read multiple properties and payload information inside a message, but you cannot make any changes to the message itself.

## MessageTag
MessageTag is a fine-grained message classification property that allows message to be subdivided below the topic level. Consumers implement message filtering by subscribing to specific tags. Learn more [MessageFilter](../04-功能行为/07messagefilter.md).

## MessageOffset

Messages are stored in the queue in order of precedence, each message has a unique coordinate of type Long in the queue, which is defined as the message site. Learn more [Consumer progress management](../04-功能行为/09consumerprogress.md)。

## ConsumerOffset

A message is not removed from the queue immediately after it has been consumed by a consumer, Apache RocketMQ will record the last consumed message based on each consumer group. Learn more [Consumer progress management](../04-功能行为/09consumerprogress.md).

## MessageKey
MessageKey is The message-oriented index property. By setting the message index, you can quickly find the corresponding message content.

## Producer
A producer in Apache RocketMQ is a functional messaging entity that creates messages and sends them to the server. A producer is typically integrated on the business system and serves to encapsulate data as messages in Apache RocketMQ and send the messages to the server. Learn more [Producer](../03-领域模型/04producer.md)。

## TransactionChecker
Apache RocketMQ uses a transaction messaging mechanism that requires a producer to implement a transaction checker to ensure eventual consistency of transactions. Learn more[Transaction Message](../04-功能行为/04transactionmessage.md)。

## ConsumerGroup
A consumer group is a load balancing group that contains consumers that use the same consumption behaviors in Apache RocketMQ. Learn more [ConsumerGroup](../03-领域模型/07consumergroup.md)。

## Consumer
A consumer is an entity that receives and processes messages in Apache RocketMQ. Consumers are usually integrated in business systems. They obtain messages from Apache RocketMQ brokers and convert the messages into information that can be perceived and processed by business logic. Learn more [Consumer](../03-领域模型/08consumer.md)。

## Subscription
A subscription is the rule and status settings for consumers to obtain and process messages in Apache RocketMQ. Subscriptions are dynamically registered by consumer groups with brokers. Messages are then matched and consumed based on the filter rules defined by subscriptions. Learn more [Subscription](../03-领域模型/09subscription.md)。

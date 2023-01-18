# Sending retry and throttling policy

This topic describes the message sending retry mechanism and throttling mechanism of Apache RocketMQ.

## Background

**Message sending retry**

The sending retry mechanism of Apache RocketMQ answers the following questions:

* Can messages be sent if some nodes are faulty?

* Does a retry request block the call thread?

* What are the shortcomings of sending retry?

**Throttling**

The throttling mechanism of Apache RocketMQ answers the following questions:

* Under what circumstances is throttling triggered?

* What is the client behavior when throttling is triggered?

* How do I avoid triggering throttling and how do I handle unexpected throttling?


## Message sending retry

### Introduction to sending retry

When a producer client of Apache RocketMQ calls a broker to send a message, the call may fail due to reasons such as network failure or service exception. To ensure message reliability, Apache RocketMQ provides built-in logic in the client SDK to retry failed requests until the requests succeed.

Message sending retries are supported in both the synchronous and asynchronous sending modes.

**Trigger conditions**

Sending retry can be triggered by one of the following conditions:

* The call from the client fails or the request times out.
  * A network exception causes a connection failure or request timeout.

  * The connection is closed because the broker node is shut down or being restarted.

  * The request times out because the broker is running slowly.

* The broker returns an error code.
  * Logic error: an error caused by incorrect running logic.

  * Throttling: throttling triggered by excessive traffic.
  
:::note
For transaction messages, only [transparent retries](https://github.com/grpc/proposal/blob/master/A6-client-retries.md#transparent-retries) are performed. No retries are performed in network exception or timeout scenarios.
:::


### Retry process

You can specify the maximum number of retries on the producer when the producer initializes messages. When one of the preceding trigger conditions occurs, a producer client tries to send the message again until the message is sent or the maximum number of retries is reached. If the failure persists on the last retry, a call error is returned.

* Synchronous sending: The call thread is blocked until a retry succeeds or the last retry fails. If the last retry fails, the system returns an error code and an exception.

* Asynchronous sending: The call thread is not blocked. The call result is returned as an exception event or success event.


### Retry interval

* Messages are immediately retried upon failures, except when a retry is triggered by throttling.

* If a retry is triggered by throttling, the message is retried at intervals specified in the exponential backoff protocol. The exponential backoff algorithm uses the following parameters to control retry behavior:

  * INITIAL_BACKOFF: specifies the interval between the first failure and the first retry. Default value: 1 second.

  * MULTIPLIER : specifies the factor by which to multiply the interval after each failed retry. Default value: 1.6.

  * JITTER : specifies the factor by which to randomize intervals. Default value: 0.2.

  * MAX_BACKOFF: specifies the upper limit of an interval. Default value: 120 seconds.

  * MIN_CONNECT_TIMEOUT: specifies the minimum interval. Default value: 20 seconds.


The following algorithm is recommended:

  ```java
  ConnectWithBackoff()
    current_backoff = INITIAL_BACKOFF
    current_deadline = now() + INITIAL_BACKOFF
    while (TryConnect(Max(current_deadline, now() + MIN_CONNECT_TIMEOUT))!= SUCCESS)
      SleepUntil(current_deadline)
      current_backoff = Min(current_backoff * MULTIPLIER, MAX_BACKOFF)
      current_deadline = now() + current_backoff + UniformRandom(-JITTER * current_backoff, JITTER * current_backoff)
  ```



For more information, see [connection-backoff.md](https://github.com/grpc/grpc/blob/master/doc/connection-backoff.md).

### Limits

* Link blocking evaluation: From the retry mechanism, we can see that a producer can configure only the maximum number of retries in the retry process. If a system exception triggers the built-in retry logic of the SDK, the broker must wait for the final retry result, and the sending request link is blocked. Therefore, you must evaluate the timeout duration and maximum number of retries for each call to prevent retries from blocking links.

* Handling of final exceptions: The built-in sending retry mechanism of a Apache RocketMQ client does not ensure that the failed message is successfully sent. If the final retry still fails, the caller must capture the exception and provide redundancy protection to prevent inconsistency in message sending results.

* Duplicate messages: When a Apache RocketMQ producer client resends a message, the client does not know the processing result of the presumably failed message on the broker. As a result, duplicate messages may exist on the broker. Make sure that your business logic can properly handle such situations.


## Throttling

### Introduction to throttling

When the system capacity usage exceeds the threshold, a Apache RocketMQ broker rejects requests and returns an error to avoid over-burdening the underlying resources.
### Trigger conditions

The throttling mechanism of Apache RocketMQ is triggered by one of the following conditions:

* High storage pressure: As described in the Working mechanism section of [Consumer progress management](./09consumerprogress.md), a consumer group starts consuming messages from the maximum offset of the queue. If the consumer group is required to consume from an earlier moment, the storage pressure on the queue surges and throttling is triggered. This happens in backtracking scenarios, such as new business rollout.

* Excessive unconsumed messages on the broker: If consumers are unable to consume at the same rate messages are sent to them, requests pile up in the queue. If the number of messages piling up exceeds the threshold, throttling is triggered to alleviate burden on the downstream system.


### Behavior

When throttling is triggered, a producer client receives the following error message and an exception:

* reply-code:530

* reply-text:TOO_MANY_REQUESTS

Upon receiving these, the client retries the message according to the exponential backoff protocol. For more information, see [Message sending retry](#section-bcp-jf7-hud).

### Suggestions

Suggestions

* How to avoid triggering throttling: Use observable metrics to monitor the system capacity and scale the underlying resources accordingly.

* How to handle throttling: If throttling is triggered and the built-in retry process fails in the client, you can temporarily switch calls to another system. 


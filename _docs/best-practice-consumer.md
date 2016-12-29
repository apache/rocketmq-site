---
title: "Best Practice For Consumer"
permalink: /docs/best-practice-consumer/
modified: 2016-12-24T15:01:43-04:00
---

Some useful tips for users.

{% include toc %}
## Consumer Group and Subscriptions
The first thing you should be aware of is that different Consumer Group can consume the same topic independently, each of the group will have their own consuming offsets. 
And make sure each Consumer within the same Group to subscribe the same topics.
## MessageListener
### Orderly
The Consumer will lock each MessageQueue to make sure it is consumed one by one orderly. This will cause performance loss, but it is useful when you are care about the order of the messages.
It is not recommended to throw exception, you can return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT instead.
### Concurrently
As the name tells, the Consumer will consume the messages concurrently. It is recommended to use this for achieving good performance.
It is not recommended to throw exception, you can return ConsumeConcurrentlyStatus.RECONSUME_LATER instead.
### Consume Status
For MessageListenerConcurrently, you can return RECONSUME_LATER to tell the consumer that you can not consume it right now and want to reconsume it later. Then you can continue to consume other messages. 
For MessageListenerOrderly, as that you care about the order, so you can not jump over the message, but you can return SUSPEND_CURRENT_QUEUE_A_MOMENT to tell the consumer to hold on for a moment.
### Blocking
It is not recommend to block the Listener, for in return it will block the thread pool, and finally the consuming process may get stuck.
## Thread Number
The consumer use a ThreadPoolExecutor to process consuming internally. So you can tune it by using setConsumeThreadMin or setConsumeThreadMax.
## ConsumeFromWhere
When a new Consumer Group is established, it will need to decide whether it need to consume the historical messages which had already existed in the Broker. 
CONSUME_FROM_LAST_OFFSET will ignore the historical messages, and consume any newly produced.
CONSUME_FROM_FIRST_OFFSET will consume every message existed in the Broker.
You can also use CONSUME_FROM_TIMESTAMP to consume messages produced after the specified timestamp.
## Duplication
Many circumstances could cause duplication, such as:
* Producer resend messages(i.e, in case of FLUSH_SLAVE_TIMEOUT)
* Consumer shutdown with some offsets not updated to the Broker in time.


So you may need to do some external work to handle this if your application cannot tolerate. For example, you may check the primary key of your DB.


---
title: "Schedule example"
permalink: /docs/schedule-example/
excerpt: "How to use schedule component to reduce pull in RocketMQ."
modified: 2017-04-24T15:01:43-04:00
---



{% include toc %}


### What is mq schedule?
If you use `DefaultMQPullConsumer` to consume message,you have to fetch message manualy.There are some steps here to achieve this point.But with `MQPullConsumerScheduleService`,you will consume messages easily.

#### DefaultMQPullConsumer use case

> First fetch subscribed queues of a topic

```java
Set<MessageQueue> testTopic = consumer.fetchSubscribeMessageQueues("testTopic");
```

> Second chose a queue to fetch message,and save queue offset manually.

#### Use MQPullConsumerScheduleService consume message

```java
final MQPullConsumerScheduleService scheduleService = new MQPullConsumerScheduleService("GroupName1");

scheduleService.setMessageModel(MessageModel.CLUSTERING);
scheduleService.registerPullTaskCallback("TopicTest1", new PullTaskCallback() {

    @Override
    public void doPullTask(MessageQueue mq, PullTaskContext context) {
        MQPullConsumer consumer = context.getPullConsumer();
        try {

            long offset = consumer.fetchConsumeOffset(mq, false);
            if (offset < 0)
                offset = 0;

            PullResult pullResult = consumer.pull(mq, "*", offset, 32);
            System.out.printf("%s%n", offset + "\t" + mq + "\t" + pullResult);
            switch (pullResult.getPullStatus()) {
                case FOUND:
                    break;
                case NO_MATCHED_MSG:
                    break;
                case NO_NEW_MSG:
                case OFFSET_ILLEGAL:
                    break;
                default:
                    break;
            }
            consumer.updateConsumeOffset(mq, pullResult.getNextBeginOffset());

			//consume message auto
            context.setPullNextDelayTimeMillis(100);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
});

scheduleService.start();
```

#### Have fun with `MQPullConsumerScheduleService`.


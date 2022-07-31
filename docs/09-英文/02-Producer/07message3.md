# Delayed Message Sending

The delayed message sending means that when a message is sent to Apache RocketMQ, instead of delivering the message immediately, it would be delivered to the Consumer for consumption after delaying a certain period of time.

Apache RocketMQ supports a total of 18 levels of delayed delivery, the details are as follows:

| delay level | delay time | delay level | delay time |
|-------------------|------|-------------------|-------|
| 1                 | 1s   | 10                | 6min  |
| 2                 | 5s   | 11                | 7min  |
| 3                 | 10s  | 12                | 8min  |
| 4                 | 30s  | 13                | 9min  |
| 5                 | 1min | 14                | 10min |
| 6                 | 2min | 15                | 20min |
| 7                 | 3min | 16                | 30min |
| 8                 | 4min | 17                | 1h    |
| 9                 | 5min | 18                | 2h    |

The sample code for the delayed message sending is as follows:

```javascript {10,11}
public class ScheduledMessageProducer {
    public static void main(String[] args) throws Exception {
        // Instantiate a producer to send scheduled messages
        DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
        // Launch producer
        producer.start();
        int totalMessagesToSend = 100;
        for (int i = 0; i < totalMessagesToSend; i++) {
            Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
            // This message will be delivered to consumer 10 seconds later.
            message.setDelayTimeLevel(3);
            // Send the message
            producer.send(message);
        }
        
        // Shutdown producer after use.
        producer.shutdown();
    }
    
}
```
:::tip
The most important thing is to set the delay level for the message. In the sample code above, the delay level is set to 3, which means that after the sender sends the message, it would take 10s for the consumer to receive it.
:::
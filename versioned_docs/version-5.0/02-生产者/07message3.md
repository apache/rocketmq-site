# 延迟消息发送

延时消息是指消息发送到Apache RocketMQ后，并不期望立马投递这条消息，而是延迟一定时间后才投递到Consumer进行消费。

Apache RocketMQ 一共支持18个等级的延迟投递，具体时间如下：

| 投递等级（delay level） | 延迟时间 | 投递等级（delay level） | 延迟时间  |
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

延迟消息的示例代码如下：

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
这里最重要的是message中设置延迟等级，例子中设置的等级是3，也就是发送者发送后，10s后消费者才能收到消息。
:::
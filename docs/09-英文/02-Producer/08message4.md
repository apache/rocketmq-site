# Batch Message Sending

In the case of certain requirements on throughput, Apache RocketMQ can group messages into batches and send them. The approach can increase throughput rate and decrease the times of calls of API and network calls.

![batch](../../picture/batch.png)

```javascript {10,11,12,13}
public class SimpleBatchProducer {

    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("BatchProducerGroupName");
        producer.start();

        //If you just send messages of no more than 1MiB at a time, it is easy to use batch
        //Messages of the same batch should have: same topic, same waitStoreMsgOK and no schedule support
        String topic = "BatchTest";
        List<Message> messages = new ArrayList<>();
        messages.add(new Message(topic, "Tag", "OrderID001", "Hello world 0".getBytes()));
        messages.add(new Message(topic, "Tag", "OrderID002", "Hello world 1".getBytes()));
        messages.add(new Message(topic, "Tag", "OrderID003", "Hello world 2".getBytes()));

        producer.send(messages);
    }
}
```

:::note
This call is very simple, packaging the message as `Collection<Message> msgs` and passing it into the method as a parameter. Here are two points to notice. At first, the size of the batch message cannot exceed 1 MiB, otherwise, it needs to be split. Secondly, the topic of the message in the same batch must be the same.
:::
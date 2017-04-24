---
title: "Quick Start"
permalink: /docs/batch-example/
excerpt: "How to quickly install and setup Apache RocketMQ."
modified: 2016-12-29T15:01:43-04:00
---

{% include toc %}

## Batch Example
#### When to use batch
Batch is not for packaging but improving performance of small messages. So the messages of the same batch should act the same role, no more effort should be taken to split the batch.
No split has another important advantage, messages of the same batch should be sent atomically, that is all successfully or all unsuccessfully, of which the importance is self-evident.
So performance and atomicity are the original intentions, which will reflect on the usage constraints. 
That is to say, if you want to improve performance for small messages or to send messages atomically, batch is a nice solution for you.
#### Usage constraints
Performance and atomicity are worth  the following constraints:
messages of the same batch should have:

1. same topic: If they belong to different topics(internally the queues), then may be sent to different brokers, which will against atomicity.
2. same waitStoreMsgOK: also differences will against atomicity.
3. no delay level: If we care about the delay level, we need to decode the internal properties of every message, which will cause much performance loss.

And the most important, the total size, that is the sum of size of each message in one batch, should be no more than 1M.

#### How to use batch
If you just send several small messages in a time and do not need to worry about the size limit, it is easy to use batch:

```java
String topic = "BatchTest";
List<Message> messages = new ArrayList<>();
messages.add(new Message(topic, "TagA", "OrderID001", "Hello world 0".getBytes()));
messages.add(new Message(topic, "TagA", "OrderID002", "Hello world 1".getBytes()));
messages.add(new Message(topic, "TagA", "OrderID003", "Hello world 2".getBytes()));
try {
    producer.send(messages);
} catch (Exception e) {
    e.printStackTrace();
    //handle the error
}
    
```
#### Split into lists
The complexity only grow when you send large batch and you may not sure if it exceeds the size limit (1M).

At this time, you'd better split the lists:

```java
public class ListSplitter implements Iterator<List<Message>> {
    private final int SIZE_LIMIT = 1000 * 1000;
    private final List<Message> messages;
    private int currIndex;
    public ListSplitter(List<Message> messages) {
            this.messages = messages;
    }
    @Override public boolean hasNext() {
        return currIndex < messages.size();
    }
    @Override public List<Message> next() {
        int nextIndex = currIndex;
        int totalSize = 0;
        for (; nextIndex < messages.size(); nextIndex++) {
            Message message = messages.get(nextIndex);
            int tmpSize = message.getTopic().length() + message.getBody().length;
            Map<String, String> properties = message.getProperties();
            for (Map.Entry<String, String> entry : properties.entrySet()) {
                tmpSize += entry.getKey().length() + entry.getValue().length();
            }
            tmpSize = tmpSize + 20; //for log overhead
            if (tmpSize > SIZE_LIMIT) {
                //it is unexpected that single message exceeds the SIZE_LIMIT
                //here just let it go, otherwise it will block the splitting process
                if (nextIndex - currIndex == 0) {
                   //if the next sublist has no element, add this one and then break, otherwise just break
                   nextIndex++;  
                }
                break;
            }
            if (tmpSize + totalSize > SIZE_LIMIT) {
                break;
            } else {
                totalSize += tmpSize;
            }
    
        }
        List<Message> subList = messages.subList(currIndex, nextIndex);
        currIndex = nextIndex;
        return subList;
    }
}
//then you could split the large list into small ones:
ListSplitter splitter = new ListSplitter(messages);
while (splitter.hasNext()) {
   try {
       List<Message>  listItem = splitter.next();
       producer.send(listItem);
   } catch (Exception e) {
       e.printStackTrace();
       //handle the error
   }
}
```
#  Basic Best Practices

## Producer

###  Precautions for sending messages

#### The use of Tags

An application can be identified as a Topic, and message subtypes can be identified as tags. tags can be set freely by the application. Only when the producer sets tags when sending messages, the consumer can use tags to filter messages through the broker when subscribing  messages.
5.x SDK can call messageBuilder.setTag("messageTag") and historical versions can call message.setTags("messageTag"). 

#### The use of Keys

At the service level, it is recommended that each message be mapped to a unique service identifier and set to the keys field to locate message loss problems in the future. The server creates an index (hash index) for each message, and the application can query the content of the message by topic and key, and by whom the message was consumed. Since it is a hash index, make sure that the key is as unique as possible to avoid potential hash collisions. Common setup policies use discrete unique identifiers such as order Id, user Id, and request Id.

#### Printing Logs

If the message is sent successfully or fails, you need to print message logs for troubleshooting services. Send Indicates that the message is sent successfully as long as no exception is thrown.

### Handling method for message sending failure

The send method of the Producer itself supports internal retry,5.x Retry logic reference [Send retry policy](../04-featureBehavior/05sendretrypolicy.md)：

The above strategies also guarantee the success of message sending to a certain extent. If the business requires that the message be sent without loss, you still need to cover for possible exceptions, such as when the send synchronization method is called and fails to send, then try to store the message to the db and retry periodically by the background thread to ensure that the message reaches the Broker.

The reason why the above DB retry method is not integrated into the MQ client, but requires the application to complete by itself, is mainly based on the following considerations: First, the MQ client is designed as a stateless mode, convenient for arbitrary horizontal expansion, and the consumption of machine resources is only cpu, memory, network. Secondly, if the MQ client is internally integrated with a KV storage module, the data can only be reliable if the synchronous disk fall, and the synchronous disk fall itself has a large performance overhead, so it usually uses asynchronous disk fall, and because the application closure process is not controlled by MQ operation and maintenance personnel, it may often happen kill -9 such violent closure. Resulting in data not timely drop disk and loss. Third, the machine where the Producer resides has low reliability and is generally virtual machines, which are not suitable for storing important data. In summary, it is recommended that the retry process be controlled by the application.

## Consumer

### The consumption process is idempotent

RocketMQ cannot avoid message duplications (Exactly Once), so if the business is very sensitive to consumption duplications, it is important to de-process at the business level.
This can be done with the help of relational databases. You first need to determine a unique key for the message, either an msgId or a unique identifying field in the message content, such as an order id.
Determine if the unique key exists in the relational database before consumption. If not, insert and consume, otherwise skip. (The actual process should consider the atomicity problem, determine whether there is a primary key conflict, then the insertion failed, directly skip)

MsgId must be a globally unique identifier, but in practice, there may be cases where the same message has two different msgIds (consumer active retransmission, duplication due to client reinvestment mechanism, etc.), which necessitates repeated consumption of business fields.

### A slow process of consumption

### Increase consumption parallelism

The vast majority of message consumption is IO intensive, that is, it may be operating on a database or calling an RPC, and the rate of consumption for this type of consumption depends on the throughput of the back-end database or external system.
By increasing consumption parallelism, the total consumption throughput can be improved, but when the parallelism increases to a certain degree, it will decrease.
Therefore, the application must set a reasonable degree of parallelism. There are several ways to modify consumption parallelism:

- In the same ConsumerGroup, we increase the number of Consumer instances to improve parallelism (note that Consumer instances exceeding the subscription queue are invalid). You can add a machine, or start multiple processes on an existing machine.
- Improve the individual Consumer's consumption parallel threads, 5.x PushConsumer SDK can PushConsumerBuilder.setConsumptionThreadCount() sets the number of threads, SimpleConsumer is free to increase concurrency from business threads, and the underlying thread is safe; The historical SDK PushConsumer can be implemented by modifying parameters consumeThreadMin and consumeThreadMax.

### Consumption in bulk

If some business processes support bulk consumption, consumption throughput can be greatly improved. For example, the application of order deduction takes 1 s to process one order at a time, and it may only take 2 s to process 10 orders at a time, so the consumption throughput can be greatly improved. It is recommended to use SimpleConsumer from the 5.x SDK, set the batch size per interface call, and pull multiple messages at once.

### Reset site to skip non-important messages

In case of message pile-up, if the consumption rate cannot keep up with the delivery rate, and if the business is not demanding enough data, you can choose to discard unimportant messages. You are advised to use the reset site function to directly adjust the consumption site to a specified time or location.

#### Optimize the per-message consumption process     

For example, the consumption process of a message is as follows:

- Query [data 1] from DB according to message
- Query [data 2] from DB according to message
- Complex business calculations
- Insert [data 3] into DB
- Insert [data 4] into DB

There are four interactions with DB during the consumption of this message. If we calculate each interaction as 5ms, the total time is 20ms.
Assuming that the service computation takes 5ms, the total time is 25ms. Therefore, if the four DB interactions can be optimized to two, the total time can be optimized to 15ms, which means that the overall performance is improved by 40%.
Therefore, if the application is sensitive to delay, the DB can be deployed on SSD disks. Compared with SCSI disks, the RT of the former is much smaller.

### Consumption print log

If the number of messages is small, you are advised to print messages in the consumption entry method, which takes a long time to consume.

```java
   new MessageListener() {
        @Override
        public ConsumeResult consume(MessageView messageView) {
            LOGGER.info("Consume message={}", messageView);
            //Do your consume process
            return ConsumeResult.SUCCESS;
            }
    }
```

If you can print each message consuming time, it will be more convenient to troubleshoot online problems such as slow consumption.

## Broker

###  Broker Role

Broker roles are classified into ASYNC_MASTER, SYNC_MASTER, and SLAVE.
If you have strict requirements on message reliability, deploy SYNC_MASTER plus SLAVE.
If message reliability is not required, deploy ASYNC_MASTER plus SLAVE.
If testing is only convenient, you can select ASYNC_MASTER only or SYNC_MASTER only deployment.

### FlushDiskType

Compared with ASYNC_FLUSH, SYNC_FLUSH suffers from performance loss but is more reliable. Therefore, the trade-off must be made based on the actual service scenario.

### Broker Configuration

| Parameter              | Default                   | Description                                                                                                                                                                                                 |
|------------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| listenPort             | 10911                     | A listening port that accepts client connections                                                                                                                                                            |
| namesrvAddr            | null                      | nameServer address                                                                                                                                                                                          |
| brokerIP1              | The network InetAddress   | The IP address on which the broker is currently listening                                                                                                                                                   |
| brokerIP2              | same to brokerIP1         | When a master/slave broker exists, if the brokerIP2 property is configured on the broker master node, the broker slave node will connect to the brokerIP2 configured on the master node for synchronization |
| brokerName             | null                      | broker name                                                                                                                                                                                                 |
| brokerClusterName      | DefaultCluster            | The Cluser name to which this broker belongs                                                                                                                                                                                     |
| brokerId               | 0                         | broker id 0 indicates master, and other positive integers indicate slave                                                                                                                                                                 |
| storePathCommitLog     | $HOME/store/commitlog/    | Path to store the commit log                                                                                                                                                                                           |
| storePathConsumerQueue | $HOME/store/consumequeue/ | A path that consumes queue is stored                                                                                                                                                                                        |
| mapedFileSizeCommitLog | 1024 * 1024 * 1024(1G)    | commit log mapping file size                                                                                                                                                                                       |​ 
| deleteWhen             | 04                        | At what time of day should I delete the commit log whose file retention time has exceeded                                                                                                                                                                            |​ 
| fileReserverdTime      | 72                        | File retention time in hours                                                                                                                                                                                                |​ 
| brokerRole             | ASYNC_MASTER              | SYNC_MASTER/ASYNC_MASTER/SLAVE                                                                                                                                                                              |​ 
| flushDiskType          | ASYNC_FLUSH               | SYNC_FLUSH/ASYNC_FLUSH The broker in SYNC_FLUSH mode guarantees to flush messages before receiving the acknowledged producer. ASYNC_FLUSH brokers use the flush mode to flush a group of messages for better performance.                                                                                             |​

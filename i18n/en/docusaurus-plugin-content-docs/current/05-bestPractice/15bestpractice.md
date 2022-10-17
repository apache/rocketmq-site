# Basic Best Practices

## Producer

###  Precautions for sending messages

#### The use of Tags

An application can use a Topic, and message subtypes can be identified as tags. tags can be set freely by the application. Only when the producer sets tags when sending messages, the consumer can use tags to filter messages through the broker when subscribing to messages：message.setTags("TagA")。  

#### The use of Keys

The unique identifier of each message at the service level must be set to the keys field to locate message loss problems in the future. The server creates an index (hash index) for each message, and the application can query the content of the message by topic and key, and by whom the message was consumed. Since it is a hash index, make sure that the key is as unique as possible to avoid potential hash collisions.


```java
   // order Id   
   String orderId = "20034568923546";   
   message.setKeys(orderId);   
```
#### Printing Logs

The SendResult and key fields must be printed to print the message log if the message is sent successfully or failed. send Indicates that the message is sent successfully as long as no exception is thrown. There are multiple states for a successful send, defined in sendResult. Each state is described as follows:  

- **SEND_OK**

The message was sent successfully. Procedure Note that successful message delivery does not mean it is reliable. To ensure that no messages are lost, you should also enable the sync Master server or sync flush, which is SYNC_MASTER or SYNC_FLUSH.


- **FLUSH_DISK_TIMEOUT**

The message is sent successfully but disk flushing times out. At this point, the message has entered the server queue (memory), only the server downtime, the message will be lost. In the message storage configuration parameters, you can set the disk flushing mode and the synchronization flush time. If the Broker server is set to FlushDiskType=SYNC_FLUSH (asynchronous flush by default), if the Broker server does not flush disks during the synchronous flush time (5s by default), The state, flush timeout, will be returned.

- **FLUSH_SLAVE_TIMEOUT**

The message was sent successfully, but the server timed out when synchronizing the message to the Slave. At this point, the message has entered the server queue, only the server downtime, the message will be lost. If the role of the Broker server is SYNC_MASTER (ASYNC_MASTER by default) and the secondary Broker server does not complete synchronization with the primary server within the synchronization flush time (default: 5 seconds), This state is returned -- data synchronization to the Slave server has timed out.

- **SLAVE_NOT_AVAILABLE**

The message was successfully sent, but the Slave was unavailable. Procedure At this point, the message has entered the Master server queue, only the Master server downtime, the message will be lost. If the role of the Broker server is SYNC_MASTER (ASYNC_MASTER by default) but no slave Broker server is configured, the broker returns the status that no Slave server is available.


### Handling method for message sending failure

The send method of Producer itself supports internal retry. The retry logic is as follows:

- Retry a maximum of two times (2 times for synchronous and 0 times for asynchronous).
- If the delivery fails, it is routed to the next Broker. The total time for this method should not exceed the value set by sendMsgTimeout, which defaults to 10s.
- If it sends a message to the broker that generates a timeout exception, it will not be retried.

The above strategies also guarantee the success of message sending to a certain extent. If the service has high requirements on message reliability, you are advised to add retry logic. For example, if the send method fails to be invoked, the system tries to store the message to the db and retry periodically by the background thread to ensure that the message reaches the Broker.

The reason why the above db retry method is not integrated into the MQ client, but requires the application to complete by itself, is mainly based on the following considerations: First, the MQ client is designed as a stateless mode, convenient for arbitrary horizontal expansion, and the consumption of machine resources is only cpu, memory, network. Secondly, if the MQ client is internally integrated with a KV storage module, the data can only be reliable if the synchronous disk fall, and the synchronous disk fall itself has a large performance overhead, so it usually uses asynchronous disk fall, and because the application closure process is not controlled by MQ operation and maintenance personnel, it may often happen kill -9 such violent closure. Resulting in data not timely drop disk and loss. Third, the machine where the Producer resides has low reliability and is generally virtual machines, which are not suitable for storing important data. In summary, it is recommended that the retry process be controlled by the application.

### Select oneway to send
In general, a message is sent as follows:

- The client sends a request to the server
- The server handles the request
- The server returns a reply to the client

Therefore, the time taken to send a message is the sum of the above three steps. However, some scenarios require a very short time, but do not have high reliability requirements. For example, log collection applications can be invoked in oneway mode. On the client side, sending a request is only the cost of a system call of the operating system, that is, writing data to the socket buffer of the client, which usually takes microseconds.

## Client Configuration

In contrast to RocketMQ's cluster of brokers, both producers and consumers are clients. This section describes the behavior configuration common to producers and consumers.

### Client addressing mode

RocketMQ enables clients to find NameServer and then NameServer to find Broker. As shown in the following figure, the configuration mode ranges from high to low. The higher priority overrides the lower priority.

- The NameServer address is specified in the code, and multiple NameServer addresses are separated by semicolons   

```java
producer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");  

consumer.setNamesrvAddr("192.168.0.1:9876;192.168.0.2:9876");
```

- The NameServer address is specified in the Java startup parameter

```text
-Drocketmq.namesrv.addr=192.168.0.1:9876;192.168.0.2:9876  
```

- The environment variable specifies the NameServer address

```text
export   NAMESRV_ADDR=192.168.0.1:9876;192.168.0.2:9876   
```
- HTTP static server addressing (default)

After the client is started, it periodically accesses a static HTTP server with the following address:<http://jmenv.tbsite.net:8080/rocketmq/nsaddr>，The URL returns something like this:

```text
192.168.0.1:9876;192.168.0.2:9876   
```

By default, the client accesses the HTTP server every 2 minutes and updates the local NameServer address.
The URL is hardcoded in the code. You can change the server to be accessed by modifying the /etc/hosts file, for example, adding the following configuration to /etc/hosts:
```text
10.232.22.67    jmenv.taobao.net   
```

Static HTTP server addressing is recommended. It is easy to deploy clients and the NameServer cluster can be hot upgraded.

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
- Improve the consumption parallel thread of a single Consumer by modifying parameters consumeThreadMin and consumeThreadMax.

### Consumption in bulk

If some business processes support batch consumption, the consumption throughput can be greatly improved. For example, the application of order deduction takes 1 s to process one order at a time, and only 2 s to process 10 orders at a time. In this way, the consumption throughput can be greatly improved.
By setting the consumer consumeMessageBatchMaxSize return a parameter, the default is 1, namely consumption one message, for example, is set to N, so the number of messages every time consumption less than or equal to N.

### Skip non-important messages

In case of message pile-up, if the consumption rate cannot keep up with the delivery rate, and if the business is not demanding enough data, you can choose to discard unimportant messages.
For example, when a queue accumulates more than 100,000 messages, try to discard some or all of them so that you can quickly catch up with sending messages. Example code is as follows:

```java
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeConcurrentlyContext context) {
        long offset = msgs.get(0).getQueueOffset();
        String maxOffset =
                msgs.get(0).getProperty(Message.PROPERTY_MAX_OFFSET);
        long diff = Long.parseLong(maxOffset) - offset;
        if (diff > 100000) {
            // TODO Special handling of message stacking cases
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        }
        // TODO Normal consumption process
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }    
```


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
   public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeConcurrentlyContext context) {
        log.info("RECEIVE_MSG_BEGIN: " + msgs.toString());
        // TODO Normal consumption process
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }   
```

If you can print each message consuming time, it will be more convenient to troubleshoot online problems such as slow consumption.

### Other Consumption Tips

#### About consumers and subscriptions

The first thing to note is that different consumer groups can consume several topics independently, and each consumer group has its own consumption offset. Make sure that the subscription information of each consumer within the same group is consistent.

#### About Ordered Messages

Consumers will lock each message queue to ensure that they are consumed one by one, which causes performance degradation, but is useful when you are concerned about message order. We do not recommend throwing an exception, you can return ConsumeOrderlyStatus. SUSPEND_CURRENT_QUEUE_A_MOMENT instead.

#### About Concurrent consumption

As the name suggests, the consumer will concurrent consumption of these messages, it is recommended that you use it to get good performance, we do not recommend throwing an exception, you can return ConsumeConcurrentlyStatus.RECONSUME_LATER instead.

#### Consume Status is about consumption status

For concurrent consumption listeners, you can return RECONSUME_LATER to notify the consumer that the message cannot be consumed now and that it is expected to be consumed again later.
You can then continue consuming other messages. For an ordered message listener, you can't skip the message because you care about its order, but you can go back to SUSPEND_CURRENT_QUEUE_A_MOMENT and tell the consumer to wait.

#### About Blocking

Blocking listeners is not recommended because it blocks the thread pool and may eventually terminate the consuming process

#### About thread count Settings

Consumers use ThreadPoolExecutor to consume messages internally, so you can change it by setting setConsumeThreadMin or setConsumeThreadMax.

####  About the consumption position

When creating a new consumer group, you need to decide whether you want to consume the history messages already in the Broker. CONSUME_FROM_LAST_OFFSET will ignore the history messages and consume any messages generated later.
CONSUME_FROM_FIRST_OFFSET will consume every information that exists in the Broker. You can also use CONSUME_FROM_TIMESTAMP to consume messages generated after a specified timestamp.

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
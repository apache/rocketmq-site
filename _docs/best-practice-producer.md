---
title: "Best Practice For Producer"
permalink: /docs/best-practice-producer/
modified: 2016-12-24T15:01:43-04:00
---

Some useful tips for users.

{% include toc %}

## SendStatus  
When sending a message, you will get SendResult and it will contain the SendStatus. Firstly, we assume that Message's isWaitStoreMsgOK=true(default is true). If not, we will always get SEND_OK if no exception is thrown.
Follow are the descriptions about each status.
### FLUSH_DISK_TIMEOUT
If the Broker set MessageStoreConfig's FlushDiskType=SYNC_FLUSH(default is ASYNC_FLUSH), and the Broker dose not finish flushing disk within MessageStoreConfig's syncFlushTimeout(default is 5 secs), you will get such status.
### FLUSH_SLAVE_TIMEOUT
If the Broker's role is SYNC_MASTER(default is ASYNC_MASTER), and the slave Broker dose not finish synchronizing with the master within the MessageStoreConfig's syncFlushTimeout(default is 5 secs), you will get such status.
### SLAVE_NOT_AVAILABLE
If the Broker's role is SYNC_MASTER(default is ASYNC_MASTER), but no slave Broker is configured, you will get such status.
### SEND_OK
You should be aware that SEND_OK does not mean it is reliable. If you cannot tolerate message missing, you should also enable SYNC_MASTER or SYNC_FLUSH.
### Duplication or Missing
If you get FLUSH_DISK_TIMEOUT, FLUSH_SLAVE_TIMEOUT or SLAVE_NOT_AVAILABLE, and the Broker happens to shutdown right the moment, you may get your message missing.
At this time, you have two choices, one is letting it go, which may get message missing; another is resending, which may get message duplication.
Often we suggest resend and make a way to handle the duplication removal when consuming. Unless you feel it does not matter when some messages are missed.
## Timeout 
The Client send requests to Broker, and wait the responses, but if the max wait time is elapsed and no response is return, the Client will throw a RemotingTimeoutException.
The default wait time is 3 seconds.You can also pass timeout argument using send(msg, timeout) instead of send(msg).
Note that we do not suggest the value to be too small, for the Broker need some time to flush disk or synchronize with slave. Also the value may have little effect if it is too bigger than syncFlushTimeout for Broker may return a response with FLUSH_SLAVE_TIMEOUT or FLUSH_SLAVE_TIMEOUT before the timeout.
## Message Size
We suggest the message should be no more than 512K.
## Async Sending
Default send(msg) will block until the response is return. So if you care about performance, we suggest you use send(msg, callback) which will act in a async way. 
## Producer Group
Normally, the producer group has no effects. But if you use transaction, you should take care of it. 
In default, you can only create only one producer with the same producer group in the same JVM. Usually, this is enough.
## Thread Safety 
The producer is thread-safe, you can just use it in your business logic.
## Performance
If you want more than one producer in one JVM, maybe for big data processing, we suggest you:
* use async sending with a few producers(3~5 is enough)
* setInstanceName for each producer

  


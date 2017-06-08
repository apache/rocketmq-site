---
title: "Best Practice For Producer"
permalink: /docs/best-practice-producer/
modified: 2016-12-24T15:01:43-04:00
---

Some useful tips for users.

{% include toc %}

## SendStatus  
When sending a message, you will get SendResult which contains SendStatus. Firstly, we assume that Message's isWaitStoreMsgOK=true(default is true). If not, we will always get SEND_OK if no exception is thrown.
Below is a list of descriptions about each status:
### FLUSH_DISK_TIMEOUT
If the Broker set MessageStoreConfig's FlushDiskType=SYNC_FLUSH(default is ASYNC_FLUSH), and the Broker doesn't finish flushing the disk within MessageStoreConfig's syncFlushTimeout(default is 5 secs), you will get this status.
### FLUSH_SLAVE_TIMEOUT
If the Broker's role is SYNC_MASTER(default is ASYNC_MASTER), and the slave Broker doesn't finish synchronizing with the master within the MessageStoreConfig's syncFlushTimeout(default is 5 secs), you will get this status.
### SLAVE_NOT_AVAILABLE
If the Broker's role is SYNC_MASTER(default is ASYNC_MASTER), but no slave Broker is configured, you will get this status.
### SEND_OK
SEND_OK does not mean it is reliable. To make sure no message would be lost, you should also enable SYNC_MASTER or SYNC_FLUSH.
### Duplication or Missing
If you get FLUSH_DISK_TIMEOUT, FLUSH_SLAVE_TIMEOUT and the Broker happens to shutdown right the moment, you can find your message missing.
At this time, you have two choices, one is to let it go, which may cause this message to be lost; another is to resend the message, which may get message duplication.
Often we suggest resend and find a way to handle the duplication removal when consuming. Unless you feel it doesn't matter when some messages are lost.
But keep in mind that resending is useless when you get SLAVE_NOT_AVAILABLE. If this happens, you should keep the scene and alert the Cluster Manager.
## Timeout 
The Client sends requests to Broker, and wait for the responses, but if the max wait time has elapsed and no response is returned, the Client will throw a RemotingTimeoutException.
The default wait time is 3 seconds. You can also pass timeout argument using send(msg, timeout) instead of send(msg).
Note that we do not suggest the wait time to be too small, as the Broker needs some time to flush the disk or synchronize with slaves. Also the value may have little effect if it exceeds syncFlushTimeout by a lot as Broker may return a response with FLUSH_SLAVE_TIMEOUT or FLUSH_SLAVE_TIMEOUT before the timeout.
## Message Size
We suggest the size of message should be no more than 512K.
## Async Sending
Default send(msg) will block until the response is returned. So if you care about performance, we suggest you use send(msg, callback) which will act in the async way.
## Producer Group
Normally, the producer group has no effects. But if you are involved in a transaction, you should pay attention to it.
By default, you can only create only one producer with the same producer group in the same JVM, which is usually enough.
## Thread Safety 
The producer is thread-safe, you can just use it in your business solution.
## Performance
If you want more than one producer in one JVM for big data processing, we suggest:
* use async sending with a few producers (3~5 is enough)
* setInstanceName for each producer

  


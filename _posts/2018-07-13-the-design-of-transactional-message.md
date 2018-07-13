---
title: "The Design Of Transactional Message"
categories:
  - RocketMQ
tags:
  - RocketMQ
  - Transaction
  - Message Oriented Middleware
---


{% include toc %}
# Concept Introduction

>Half(Prepare) Message

Refers to a message that cannot be delivered temporarily. When a message is successfully sent to the MQ server, but the server did not receive the second acknowledgement of the message from the producer, then the message is marked as “temporarily undeliverable”. The message in this status is called a half message.

>Message Status Check 

Network disconnection or producer application restart may result in the loss of the second acknowledgement of a transactional message. When MQ server finds that a message remains a half message for a long time, it will send a request to the message producer, checking the final status of the message (Commit or Rollback).

# Execute Flow Chart  

![screenshot](/assets/images/blog/transaction-execute-flow.png)  
1. Producer send half message to MQ server.  
2. After send half message succeed, execute local transaction.  
3. Send commit or rollback message to MQ Server based on local transaction results.  
4. If commit/rollback message missed or producer pended during the execution of local transaction，MQ server will send check message to each producers in the same group to obtain transaction status.  
5. Producer reply commit/rollback message based on local transaction status.  
6. Committed message will be delivered to consumer but rolled back message will be discarded by MQ server.  


# Detailed Design
>Outline:  

![screenshot](/assets/images/blog/transaction-outline-design.png)  
Just as the figure shows, in order to mask the underlying implementation of storage, all transactional message operations focus on the transaction service interface.
RocketMQ provides a default implementation with its own storage system，and we used a transaction bridge to implement our transactional storage logic，instead of modify RocketMQ's storage layer directly. 

> Sending transactional message: 

![screenshot](/assets/images/blog/sending-transactional-message.png)  
This figure describes the timing relationships of sending transactional message. From this figure, we can clearly see that how transactional messages are committed in two phases.  

> Checking transactional message: 

![screenshot](/assets/images/blog/checking-transactional-message.png)  
This figure describes the checking logic for transactional messages，when MQ server finds that a message remains a half message for a long time，it will send a request to the message producer，to get the status of the current transaction.

> Design Motivation: 

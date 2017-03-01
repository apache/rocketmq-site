---
title: "Documentation"
permalink: /docs/documentation/
excerpt: "Apache RocketMQ Documentation"
modified: 2017-03-01T15:01:43-04:00
---

{% include toc %}

# Introduction

Quality documentation is critically important to develop and maintain a project. The better the documentation is, the 
easier it will be for other participants to understand and respond properly.

## API Documentation

The API is documented through javadoc comments. 

All classes, interfaces, methods and field variables should be documented. Public methods, in particular, should be 
commented fully -- method purpose, return value, parameters and exceptions.

Below is an example:

    /**
     * Send message in synchronous mode. This method returns only when the sending procedure totally completes.
     * </p>
     *
     * <strong>Warn:</strong> this method has internal retry-mechanism, that is, internal implementation will retry
     * {@link #retryTimesWhenSendFailed} times before claiming failure. As a result, multiple messages may potentially
     * delivered to broker(s). It's up to the application developers to resolve potential duplication issue.
     *
     * @param msg Message to send.
     * @return {@link SendResult} instance to inform senders details of the deliverable, say Message ID of the message,
     * {@link SendStatus} indicating broker storage/replication status, message queue sent to, etc.
     * @throws MQClientException if there is any client error.
     * @throws RemotingException if there is any network-tier error.
     * @throws MQBrokerException if there is any error with broker.
     * @throws InterruptedException if the sending thread is interrupted.
     */
    @Override
    public SendResult send(Message msg) throws MQClientException, RemotingException, MQBrokerException, InterruptedException {
        return this.defaultMQProducerImpl.send(msg);
    }


## Documentation Content

Every class and interface should have summary documentation, explaining its general function and purpose.  Additionally,
thread safety information should be included. If you are working on a class which represents a core concept, adding sample
usage is always a good practice.


When writing API documentation, please keep a professional tune: write in active voice, be as descriptive as possible. 
Keep in mind that the audience may be a developer who would use RocketMQ for the first time, or a contributor who just gets
 involved with the codebase. Either of them is not as familiar with Apache RocketMQ as you are.
 
 

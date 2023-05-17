# C# Client SDK

## Info

This section introduces sending and receiving messages using Apache RocketMQ 5.0 gRPC protocol C# SDK.

:::info

- This sample code is built based on the gRPC protocol SDK. Therefore, the server needs to be upgraded to at least version 5.0 and enable gRPC Proxy to be compatible. Please refer to the [quick start guide](../02-quickStart/01quickstart.md) for deploying Proxy.
- If you are using the Remoting protocol SDK, it is recommended to refer to the example code of the previous version 4.x for running. To identify the type of SDK you are using, please refer to the [overview](./01overview.md).


:::

## CodeExample
Here is the link to the sample code for message sending and receiving using the Apache RocketMQ gRPC protocol C# SDK. The complete code project and runtime environment can be found in the [rocketmq-clients](https://github.com/apache/rocketmq-clients) repository. Please refer to it for configuration and running.

|**MessageTypes**|**Producer Examples**|**SimpleConsumer Examples**|
|-----------|--------------|--------------------------|
| [NormalMessage](../04-featureBehavior/01normalmessage.md)                 |[ProducerNormalMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerNormalMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
| [FIFOMessage](../04-featureBehavior/03fifomessage.md)                 | [ProducerFifoMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerFifoMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
| [DelayMessage](../04-featureBehavior/02delaymessage.md)              | [ProducerDelayMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerDelayMessageExample.cs)| [SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs)  |
| [TransactionMessage](../04-featureBehavior/04transactionmessage.md)                 |[ProducerTransactionMessageExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/ProducerTransactionMessageExample.cs)   |[SimpleConsumerExample.cs](https://github.com/apache/rocketmq-clients/blob/master/csharp/examples/SimpleConsumerExample.cs) |
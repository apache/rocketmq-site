# C++ Client SDK

## Info

This section introduces sending and receiving messages using Apache RocketMQ 5.0 gRPC protocol C++ SDK.

:::info

- This sample code is built based on the gRPC protocol SDK. Therefore, the server needs to be upgraded to at least version 5.0 and enable gRPC Proxy to be compatible. Please refer to the [quick start guide](../02-quickStart/01quickstart.md) for deploying Proxy.
- If you are using the Remoting protocol SDK, it is recommended to refer to the example code of the previous version 4.x for running. To identify the type of SDK you are using, please refer to the [overview](./01overview.md).


:::

## CodeExample
Here is the link to the sample code for message sending and receiving using the Apache RocketMQ gRPC protocol C++ SDK. The complete code project and runtime environment can be found in the [rocketmq-clients](https://github.com/apache/rocketmq-clients) repository. Please refer to it for configuration and running.

|**MessageTypes**|**Producer Examples**|**PushConsumer Examples**|**SimpleConsumer Examples**|
|-----------|--------------|--------------------------|----------------------------|
| [NormalMessage](../04-featureBehavior/01normalmessage.md)                 |Sync Send Example:[ExampleProducer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleProducer.cpp)  <br/>Async Send Example:[ExampleProducerWithAsync.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleProducerWithAsync.cpp)   | [ExamplePushConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExamplePushConsumer.cpp) |[ExampleSimpleConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleSimpleConsumer.cpp)   |
| [FIFOMessage](../04-featureBehavior/03fifomessage.md)                 | [ExampleProducerWithFifoMessage.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleProducerWithFifoMessage.cpp)                                                                                                                             | [ExamplePushConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExamplePushConsumer.cpp) |[ExampleSimpleConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleSimpleConsumer.cpp)   |
| [DelayMessage](../04-featureBehavior/02delaymessage.md)              | [ExampleProducerWithTimedMessage.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleProducerWithTimedMessage.cpp)                                                                                                                         | [ExamplePushConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExamplePushConsumer.cpp) |[ExampleSimpleConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleSimpleConsumer.cpp)   |
| [TransactionMessage](../04-featureBehavior/04transactionmessage.md)                 |[ExampleProducerWithTransactionalMessage.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleProducerWithTransactionalMessage.cpp)                                                                                                     | [ExamplePushConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExamplePushConsumer.cpp) |[ExampleSimpleConsumer.cpp](https://github.com/apache/rocketmq-clients/blob/master/cpp/examples/ExampleSimpleConsumer.cpp)    |
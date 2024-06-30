# Overview

This section introduces the evolution history, selection comparison, and best practices of the Apache RocketMQ 5.x client SDK.

## History and Choice

Since its inception, the Apache RocketMQ project has evolved to the current version 5.x. Currently, rocketmq mainly supporting two series of client SDKs based on differences in underlying communication protocols, namely the Remoting protocol and the gRPC protocol.

As the default communication protocol between early components, the Remoting protocol has an embedded client SDK that has been evolving and iterating in sync with the main repository. The Remoting protocol SDK has always been bound with the server code version iteration and mainly supports Java-based languages.

The gRPC protocol was newly introduced in version 5.0, aimed at evolving a more lightweight, standardized, and easily extensible client-server communication protocol with mainstream cloud native technologies. The gRPC protocol SDK evolves as an independent repository [ RocketMQ Clients ](https://github.com/apache/rocketmq-clients), supporting languages such as Java/C++/.NET/Go/Rust. There is a relatively decoupled relationship between the client and the server, following the RocketMQ API protocol interface agreement.

:::tip

How to quickly distinguish whether the SDK used is the Remoting protocol or the gRPC protocol?

Method 1: Check the repository coordinates
- For Java language: If the repository coordinate is rocketmq-client, it is the Remoting protocol. If it is rocketmq-client-java, it is the gRPC protocol.
- For other languages: Other gRPC languages are also named in the format of rocketmq-client-{language}.

Method 2: Check the keywords
- If the code package or classpath contains the keyword 'remoting', it is the Remoting protocol. Otherwise, it is the gRPC protocol SDK.

:::

The comparison between the Remoting protocol SDK and the gRPC protocol SDK, please refer to the following:

| **Contrast term** |                                                                                                                                                                                       **Remoting SDK**                                                                                                                                                                                       |                                                                                                                                           **gRPC SDK**                                                                                                                                           |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Multi-language support   | Java/Go                                                                                                                                                                                                                                                                                                                                                                               | Java/C/C++/.NET/Go/Rust <br></br>Details for [Link](https://github.com/apache/rocketmq-clients)                                                                                                                                                                                                                                                                        |
| Feature and Interface  |Producer<br/>PushConsumer<br></br>PullConsumer<br></br>LitePullConsumer<br></br>Admin                                                                                                                                                                                                                                          | Producer<br/>PushConsumer（Only Java）<br></br>SimpleConsumer<br></br>PullConsumer（working）                                                                                                                                                           |
| Compatible version    | Support 4.x and 5.x server                                                                                                                                                                                                                                                                                                                                                                       | Only support server versions 5.0                                                                                                                                                                                                                                               |
| Evolution     | The Remoting protocol is mainly used for communication evolution of internal components within the server                                                                                                                                |The gRPC protocol is the preferred lightweight multi-language client, and subsequent promotion will gradually fill in all capabilities


## Remoting SDK

The Remoting protocol SDK, as the initial SDK evolution of Apache RocketMQ, uses the Remoting communication protocol of internal components of RocketMQ. It's used for communication of internal components of services and also supports API communication for client message sending and control operations.

### SDK Info

The currently supported programming languages and code repositories are as follows:

| **Language** |**ReleaseNote** |**SDK Repo** |
|---------|---------|---------|
|Java|[ReleaseNote from main repo](https://github.com/apache/rocketmq/releases)|[Main repo](https://github.com/apache/rocketmq)|
|Go|[ReleaseNote from main repo](https://github.com/apache/rocketmq-client-go/releases)|[Main repo](https://github.com/apache/rocketmq-client-go)|

### Features
Waiting updates.


## gRPC SDK
The gRPC protocol SDK, introduced in Apache RocketMQ version 5.0, aims to provide a cloud-native, robust client solution for all major programming languages, including Java, C++, C#, Golang, JavaScript, and Rust. The gRPC SDK adheres to the [rocketmq-apis](https://github.com/apache/rocketmq-apis) constraints and uses Protocol Buffers and gRPC to replace the old protocol in version 4.x.

The gRPC SDK has the following advantages over the earlier Remoting protocol SDK:
- More concise interface design, easier to understand and less prone to error.
- Better interface design with clear parameters and exception types.
- Immutable interface design to avoid business exceptions caused by parameter and information leakage.
- Better support for multiple languages, as the gRPC protocol has the advantage of supporting multiple languages and enables lower cost evolution to achieve consistent behavior in multiple language SDKs.

Want the detailed design thinking and evolutionary direction, refer to [RIP-37: New and Unified APIs](https://docs.qq.com/doc/DUkNwdkdQUU15V1Fr) and [RIP-39: Support gRPC protocol](https://shimo.im/docs/gXqmeEPYgdUw5bqo).

### SDK Info

The currently supported programming languages and code repositories, refer to [rocketmq-clients](https://github.com/apache/rocketmq-clients#features-and-status).


### Features
Waiting updates.


## FAQ
The following sections list some recommended selection strategies for certain scenarios.

1. **Can gRPC SDK be used with a server version of 4.x?**

   No, gRPC SDK is only supported by server versions equal to or greater than 5.0. It is recommended to first smoothly upgrade the server to version 5.0 and then replace the SDK.

2. **Is it necessary to modify the code when switching from Remoting SDK to gRPC SDK?**

   Yes, it is necessary. The client API of gRPC SDK has been redesigned and is not compatible with the Remoting SDK API. Therefore, it is necessary to modify the code accordingly.

3. **What's the best choice of sdk when use rocketmq in new system？**

   If a new business system is integrating with RocketMQ, it is recommended to use gRPC SDK, as it provides a better user experience and support for multiple language environments.
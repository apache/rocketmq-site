# 概览

本节文档介绍 Apache RocketMQ 5.x 版本的客户端SDK演进历程、选型对比和最佳实践。

## 演进历程 & 选型对比

Apache RocketMQ 项目自诞生之初演进到当前5.x版本，根据底层通信协议的差异主要支持两个系列的客户端SDK，分别是**Remoting协议**和**gRPC协议**。

**Remoting 协议**作为早期组件间默认通信协议，内置的客户端SDK一直和主仓库同步演进和迭代。**Remoting 协议** SDK 一直以绑定仓库的方式伴随服务端代码版本迭代，主要支持Java为主的语言。

**gRPC 协议**自 5.0 版本全新推出，旨在以云原生主流技术演进更加**轻量、标准、易扩展**的客户端服务端通信协议。**gRPC 协议** SDK 是以独立仓库[ RocketMQ Clients ](https://github.com/apache/rocketmq-clients)方式演进，支持Java/C++/.NET/Go/Rust等语言。客户端和服务端之间相对解耦，遵循[ RocketMQ API ](https://github.com/apache/rocketmq-apis) 协议接口约定。

:::tip

如何快速区分使用的SDK是 Remoting 协议还是 gRPC 协议？

方法一：判断仓库坐标
- Java语言：仓库坐标如果是 rocketmq-client 则是Remoting协议，坐标如果是rocketmq-client-java 则是gRPC协议。
- 其他语言：gRPC的其他语言也是以rocketmq-client-{language}的格式命名。

方法二：查看关键字
- 查看代码包、类路径中包含remoting关键字则是Remoting协议，否则是gRPC 协议SDK。

:::

关于 Remoting 协议 SDK 和 gRPC 协议 SDK 的对比参考如下：

| **对比项** |                                                                                                                                                                                       **Remoting 协议 SDK**                                                                                                                                                                                       |                                                                                                                                           **gRPC 协议 SDK**                                                                                                                                           |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 多语言支持   | Java为主，其他语言为第三方仓库实现                                                                                                                                                                                                                                                                                                                                                                               | Java/C/C++/.NET/Go/Rust，其他语言迭代中<br></br>详情参考[链接](https://github.com/apache/rocketmq-clients)                                                                                                                                                                                                                                                                        |
| 接口范围  |Producer<br/>PushConsumer<br></br>PullConsumer<br></br>LitePullConsumer<br></br>Admin                                                                                                                                                                                                                                          | Producer<br/>PushConsumer（仅Java）<br></br>SimpleConsumer<br></br>PullConsumer（进行中）                                                                                                                                                           |
| 兼容版本    | 兼容4.x、5.x版本服务端                                                                                                                                                                                                                                                                                                                                                                       | 仅支持5.x 版本服务端                                                                                                                                                                                                                                               |
| 演进方向     | Remoting协议主要作为服务端内部组件通信演进                                                                                                                                  |gRPC协议作为轻量化多语言客户端首选，后续逐步推广补齐所有能力


## Remoting 协议 SDK

### SDK仓库
Remoting 协议 SDK 作为 Apache RocketMQ 最初演进的 SDK，使用 RocketMQ 内部组件的 Remoting 通信协议，一方面用于服务内部组件的通信、一方面也支持客户端收发消息和管控操作的API通信。
Remoting 协议 SDK 和服务端主仓库同步演进迭代。目前支持的开发语言和代码仓库详情如下：

| **语言** |**ReleaseNote** |**SDK仓库** |
|---------|---------|---------|
|Java|[主仓库版本列表](https://github.com/apache/rocketmq/releases)|[主仓库地址](https://github.com/apache/rocketmq)|
|Go|[主仓库版本列表](https://github.com/apache/rocketmq-client-go/releases)|[主仓库地址](https://github.com/apache/rocketmq-client-go)|

### 支持特性列表
待补充

## gRPC 协议 SDK
gRPC 协议 SDK 自Apache RocketMQ 5.0 版本，旨在提供包含 Java，C++，C#，Golang，JavaScript，Rust 在内的所有主流编程语言的云原生的健壮的客户端解决方案。gRPC SDK 遵从 [rocketmq-apis](https://github.com/apache/rocketmq-apis) 约束，使用 Protocol Buffers 和 gRPC 替代了 4.x 的旧有协议。

gRPC SDK 相比早期Remoting 协议 SDK 具备如下优势：
- 接口简洁性更好，易理解，不易错误使用。
- 接口确定性设计更完善，参数、异常类型明确。
- 接口不可变性设计，避免透传、漏传参数和信息导致的业务异常。
- 多语言支持更完善，由于gRPC协议的多语言优势，可以更低成本演进出行为一致的多语言sdk。
详细的设计思考和演进方向，参考[RIP-37: New and Unified APIs](https://shimo.im/docs/m5kv92OeRRU8olqX) 和 [RIP-39: Support gRPC protocol](https://shimo.im/docs/gXqmeEPYgdUw5bqo)。

目前支持的开发语言和代码仓库详情如下：

| **语言** |**ReleaseNote** |**SDK仓库** |
|---------|---------|---------|
|Java|[主仓库版本列表](https://github.com/apache/rocketmq-clients/releases)|[主仓库地址](https://github.com/apache/rocketmq-clients)|
|C++|[主仓库版本列表](https://github.com/apache/rocketmq-clients/releases)|[主仓库地址](https://github.com/apache/rocketmq-clients)|
|.NET|[主仓库版本列表](https://github.com/apache/rocketmq-clients/releases)|[主仓库地址](https://github.com/apache/rocketmq-clients)|
|Go|[主仓库版本列表](https://github.com/apache/rocketmq-clients/releases)|[主仓库地址](https://github.com/apache/rocketmq-clients)|
|Rust|[主仓库版本列表](https://github.com/apache/rocketmq-clients/releases)|[主仓库地址](https://github.com/apache/rocketmq-clients)|
|PHP/NodeJS/Python|开发中|[主仓库地址](https://github.com/apache/rocketmq-clients)|

### 支持特性列表
待补充


## 选型问题建议
以下章节列出一些场景场景下，推荐的选型策略。

1. **服务端版本是4.x版本，是否可以使用gRPC SDK ？**

   不支持，gRPC SDK 仅支持版本大于等于5.0的服务端，建议先平滑升级服务端到5.0再更换SDK。

2. **从 Remoting SDK 更换到 gRPC SDK 是否需要修改代码？**

   需要，gRPC SDK 重新优化设计了客户端API，和Remoting SDK API 并不兼容，因此需要对照修改代码。

3. **新业务使用 RocketMQ 推荐使用什么SDK？**

   全新的业务系统接入 RocketMQ，推荐使用gRPC SDK，可以获得更好的使用体验和多语言环境支持。
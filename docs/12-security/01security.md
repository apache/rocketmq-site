# 安全

## 安全模型

Apache RocketMQ 项目自身提供了 ACL、TLS 等安全特性，但最终的安全效果仍取决于运维人员对 **网络、主机、账户与数据** 的整体防护。

### 1. 认证与授权（ACL）

- 自 RocketMQ 4.4.0 起支持 ACL 1.0
- 5.3.0 起引入安全性更高的 **ACL 2.0**
- 5.3.3 移除了 ACL 1.0
- 建议所有使用 Apache RocketMQ ACL 的用户迁移到 **ACL 2.0**

### 2. 控制台 (Dashboard) 与可观测组件暴露

RocketMQ Dashboard 及部分可观测组件（例如 RocketMQ Prometheus Exporter）默认不启用强认证，任何可访问 HTTP 端口的用户都可读取集群元数据。强烈建议：

- Dashboard 监听地址 绑定至内网或受信任 VPC
- 在 网关 / Ingress / 反向代理 上配置 ACL / IP 白名单
- 如需公网运维，务必叠加 VPN、HTTP Basic/OAuth 鉴权或 WAF

> 否则可能导致信息泄露风险，该风险属于部署方责任而非 RocketMQ 漏洞。

### 3. 传输加密与数据加密

- 客户端与服务端可通过 TLS 加密通信，若数据中包含敏感信息可以开启
- 消息体由业务定义，RocketMQ 不会解析或持久化解密后的内容
- 若消息包含敏感信息，应在业务侧进行字段或整体加密，避免明文落盘

### 4. 序列化与反序列化风险

- RocketMQ 仅传输字节数组，不做对象反序列化
- 消费端若需反序列化，应选用安全格式（如 JSON-Binding、Protobuf 等），并对不可信数据进行校验

### 5. SDK 与版本管理

- 始终使用官方最新稳定版客户端，以获得最新漏洞修复与改进

### 6. 日志管理

- 请妥善保管 RocketMQ 相关日志（包括 Broker、Namesrver、Proxy、Client等），避免敏感信息泄漏

## 安全策略

Apache RocketMQ 是 Apache Software Foundation（ASF）旗下项目，遵循 ASF 的漏洞处理流程。

### 漏洞报告

如果你发现了新的安全漏洞，请遵循 ASF 官方的漏洞报告流程进行私下披露与提交：
https://apache.org/security/#reporting-a-vulnerability

为便于评估与修复，建议在报告中包含：受影响的组件/版本、复现步骤、影响说明，以及 PoC（如有）。

> 请勿在修复发布前通过公开 Issue、邮件列表或社交媒体披露可被立即利用的细节。

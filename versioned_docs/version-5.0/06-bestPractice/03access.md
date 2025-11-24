# 访问控制 2.0

:::info 版本说明

本文档介绍的是 **访问控制 2.0（ACL 2.0）**，适用于 **RocketMQ 5.3.0** 及以上版本。

- 如果您使用的是 **RocketMQ 4.x、5.0-5.2 或 5.3.0-5.3.2** 版本，请参考 [ACL 1.0 文档](./07access-1.0)
- **从 RocketMQ 5.3.3 开始，ACL 1.0 已不再支持**，建议升级到 ACL 2.0
- 如果您正在从 ACL 1.0 迁移到 2.0，请查看本文档的 [ACL 1.0 迁移](#acl-10迁移到acl-20) 章节

:::

:::danger 安全提示

⚠️ **本文档中的所有用户名、密码仅作为示例使用，切勿在生产环境中直接使用！**

生产环境部署时，请务必：
- 使用强密码（至少16位，包含大小写字母、数字和特殊字符）
- 严格控制超级用户的使用范围
- 妥善保管认证凭证，不要明文提交到代码仓库

:::

## 简介

### 什么是访问控制 2.0？

访问控制 2.0（ACL 2.0）是Apache RocketMQ的访问控制列表(Access Control List)升级版本，提供了完善的身份认证(Authentication)和权限授权(Authorization)机制，用于保护RocketMQ集群的数据安全。

### 核心特性

- **双重安全机制**：支持认证和授权独立配置
- **灵活的资源匹配**：支持完全匹配、前缀匹配和通配符匹配
- **精细化权限控制**：覆盖集群、命名空间、Topic、Group等多种资源类型
- **多种策略选择**：提供无状态和有状态两种认证授权策略
- **组件间安全通信**：支持Broker、Proxy、NameServer等组件间的访问控制

### 核心概念

| 概念 | 说明 |
|------|------|
| **用户(User)** | 访问RocketMQ资源的主体，分为超级用户(Super)和普通用户(Normal) |
| **资源(Resource)** | 需要访问控制的对象，如Cluster、Namespace、Topic、Group |
| **操作(Action)** | 对资源执行的动作，如Pub、Sub、Create、Update、Delete、Get、List |
| **决策(Decision)** | 授权结果，Allow(允许)或Deny(拒绝) |
| **环境(Environment)** | 访问环境信息，如来源IP地址 |

---

## 快速开始

### 5分钟快速体验

本节将帮助您在5分钟内快速启动一个带ACL的RocketMQ集群。

> **前提条件**:
> - RocketMQ版本 ≥ 5.3.0
> - 已完成RocketMQ的基本安装
>
> **版本检查**:
> ```bash
> # 查看RocketMQ版本
> sh bin/mqbroker -v
> ```

> **说明**：本示例使用存算一体架构（单Broker模式），适合快速体验和测试环境。生产环境部署请参考[配置说明](#配置说明)章节。

#### 第1步：配置Broker

编辑 `conf/broker.conf` 文件，添加以下配置：

```properties
# 启用认证
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider

# 启用授权
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider

# 初始化管理员用户（首次启动自动创建）
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}

# 组件间认证凭证（用于Broker主从同步、集群内部通信等）
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

> **配置说明**:
> - 只需配置必填项即可快速启动，其他配置项都有默认值
> - 生产环境建议配置 `authenticationStrategy` 和 `authorizationStrategy` 为有状态策略以提升性能

#### 第2步：启动集群

```bash
# 1. 启动NameServer
nohup sh bin/mqnamesrv &

# 2. 启动Broker（使用上述配置文件）
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf &
```

#### 第3步：配置mqadmin工具

启用ACL后，需要配置mqadmin工具的认证凭证才能执行管理命令。

编辑 `conf/tools.yml` 文件：

```yaml
# 使用初始化的管理员用户凭证
accessKey: rocketmq
secretKey: 12345678
```

#### 第4步：创建业务用户和授权

```bash
# 创建生产者用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u producer_user \
  -p producer123 \
  -t Normal

# 授予Topic发送权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user \
  -r Topic:TestTopic \
  -a Pub \
  -d Allow
```

#### 第5步：验证配置

使用Java客户端发送一条测试消息：

```java
SessionCredentials credentials = new SessionCredentials("producer_user", "producer123");
StaticSessionCredentialsProvider credentialsProvider = 
    new StaticSessionCredentialsProvider(credentials);

ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
    .setEndpoints("127.0.0.1:10911")
    .setCredentialProvider(credentialsProvider)
    .build();
// ... 创建Producer并发送消息
```

✅ 恭喜！您已经成功启动了带ACL的RocketMQ集群。

### 不同部署架构配置

RocketMQ支持两种部署架构，根据您的场景选择合适的配置方案。

#### 存算一体架构

Broker同时负责计算和存储，适合中小规模集群和测试环境。

**配置示例**：

```properties
# broker.conf
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy

authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy

initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

#### 存算分离架构（推荐）

Proxy负责计算和认证授权，Broker仅负责存储和元数据管理，适合大规模生产环境。

**Broker配置** (`broker.conf`):

```properties
# Broker只作为元数据提供者，不处理客户端认证授权
authenticationEnabled = false
authorizationEnabled = false

# 配置元数据提供者
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider

# 初始化管理员用户
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
```

**Proxy配置** (`rmq-proxy.json`):

```json
{
  "authenticationEnabled": true,
  "authenticationProvider": "org.apache.rocketmq.auth.authentication.provider.DefaultAuthenticationProvider",
  "authenticationMetadataProvider": "org.apache.rocketmq.proxy.auth.ProxyAuthenticationMetadataProvider",
  "authenticationStrategy": "org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy",
  
  "authorizationEnabled": true,
  "authorizationProvider": "org.apache.rocketmq.auth.authorization.provider.DefaultAuthorizationProvider",
  "authorizationMetadataProvider": "org.apache.rocketmq.proxy.auth.ProxyAuthorizationMetadataProvider",
  "authorizationStrategy": "org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy"
}
```

**启动顺序**:

```bash
# 1. 启动NameServer
nohup sh bin/mqnamesrv &

# 2. 启动Broker（存储节点）
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf &

# 3. 启动Proxy（计算节点）
nohup sh bin/mqproxy -n localhost:9876 -pc conf/rmq-proxy.json &
```

---

## 配置说明

### 认证配置参数

| 参数名称 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `authenticationEnabled` | boolean | `false` | 是否启用认证 |
| `authenticationProvider` | String | `org.apache.rocketmq.auth.authentication.provider.DefaultAuthenticationProvider` | 认证提供者实现类（可不配置，使用默认值） |
| `authenticationMetadataProvider` | String | - | 认证元数据提供者实现类<br/>**必填项** |
| `authenticationStrategy` | String | `org.apache.rocketmq.auth.authentication.strategy.StatelessAuthenticationStrategy` | 认证策略（可不配置，使用默认值）<br/>生产环境建议配置有状态策略：<br/>`org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy` |
| `initAuthenticationUser` | JSON | - | **推荐配置**：系统初始化用户（首次启动自动创建）<br/>格式：`{"username":"xxx","password":"xxx"}`<br/>不配置则需手动创建管理员用户 |
| `innerClientAuthenticationCredentials` | JSON | - | **视情况配置**：组件间认证凭证，用于Broker主从同步、Proxy访问Broker、Controller选举等集群内部通信场景。<br/>格式：`{"accessKey":"xxx","secretKey":"xxx"}`<br/>⚠️如有组件间通信，所有组件必须配置完全相同的凭证 |
| `authenticationWhitelist` | String | - | 认证白名单（IP列表，逗号分隔） |

### 授权配置参数

| 参数名称 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `authorizationEnabled` | boolean | `false` | 是否启用授权 |
| `authorizationProvider` | String | `org.apache.rocketmq.auth.authorization.provider.DefaultAuthorizationProvider` | 授权提供者实现类（可不配置，使用默认值） |
| `authorizationMetadataProvider` | String | - | 授权元数据提供者实现类<br/>**必填项** |
| `authorizationStrategy` | String | `org.apache.rocketmq.auth.authorization.strategy.StatelessAuthorizationStrategy` | 授权策略（可不配置，使用默认值）<br/>生产环境建议配置有状态策略：<br/>`org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy` |
| `authorizationWhitelist` | String | - | 授权白名单（IP列表，逗号分隔） |

### 缓存配置参数

| 参数名称 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `userCacheMaxNum` | int | `1000` | 用户缓存最大数量 |
| `userCacheExpiredSecond` | int | `600` | 用户缓存过期时间(秒) |
| `userCacheRefreshSecond` | int | `60` | 用户缓存刷新时间(秒) |
| `aclCacheMaxNum` | int | `1000` | ACL缓存最大数量 |
| `aclCacheExpiredSecond` | int | `600` | ACL缓存过期时间(秒) |
| `aclCacheRefreshSecond` | int | `60` | ACL缓存刷新时间(秒) |
| `statefulAuthenticationCacheMaxNum` | int | `10000` | 有状态认证缓存最大数量 |
| `statefulAuthenticationCacheExpiredSecond` | int | `60` | 有状态认证缓存过期时间(秒) |
| `statefulAuthorizationCacheMaxNum` | int | `10000` | 有状态授权缓存最大数量 |
| `statefulAuthorizationCacheExpiredSecond` | int | `60` | 有状态授权缓存过期时间(秒) |

### 认证授权策略

#### 无状态策略 (Stateless) - 默认策略

- **特点**：每个请求都进行完整的认证和授权检查
- **优势**：安全性高，权限变更立即生效
- **劣势**：性能开销较大
- **适用场景**：安全要求极高的环境
- **默认值**：✅ 系统默认使用此策略

**配置示例**:

```properties
# 以下为默认值，可不配置
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatelessAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatelessAuthorizationStrategy
```

#### 有状态策略 (Stateful) - 生产环境推荐

- **特点**：首次请求进行认证授权，后续请求使用缓存结果
- **优势**：性能开销小，吞吐量高
- **劣势**：权限变更有延迟（缓存过期后生效）
- **适用场景**：高吞吐量场景，生产环境推荐
- **推荐使用**：⭐ 生产环境建议显式配置此策略

**配置示例**:

```properties
# 生产环境推荐配置
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy
```

---

## 用户管理

### 用户类型说明

| 用户类型 | 说明 | 权限范围 | 使用场景 |
|---------|------|---------|---------|
| **Super** | 超级用户 | 拥有所有资源的所有权限，无需单独授权 | 系统管理员、运维人员 |
| **Normal** | 普通用户 | 需要显式授权才能访问资源 | 业务应用、服务 |

### mqadmin工具配置

使用mqadmin命令行工具前，需要配置管理员凭证。

**配置文件**: `conf/tools.yml`

```yaml
# 使用超级用户的用户名和密码
accessKey: rocketmq
secretKey: 12345678
```

**验证配置**:

```bash
# 测试mqadmin工具是否能正常连接
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
```

### 用户管理命令

#### 创建用户

```bash
# 创建普通用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p password -t Normal

# 创建超级用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster -u rocketmq -p 12345678 -t Super
```

#### 更新用户

```bash
# 修改用户密码
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p newpassword

# 修改用户类型
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -t Super
```

#### 查询用户

```bash
# 查询用户详情
sh bin/mqadmin getUser -n 127.0.0.1:9876 -c DefaultCluster -u username

# 查询用户列表
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster

# 查询用户列表（带过滤）
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster -f producer
```

#### 删除用户

```bash
sh bin/mqadmin deleteUser -n 127.0.0.1:9876 -c DefaultCluster -u username
```

### 命令参数说明

| 参数 | 必填 | 说明 | 默认值 |
|------|------|------|--------|
| `-n` | 是 | NameServer地址 | - |
| `-c` | 否 | 集群名称（与`-b`二选一） | - |
| `-b` | 否 | Broker地址（与`-c`二选一） | - |
| `-u` | 是 | 用户名 | - |
| `-p` | 否 | 密码（创建/更新时使用） | - |
| `-t` | 否 | 用户类型：Super或Normal | Normal |
| `-f` | 否 | 过滤条件（查询时使用） | - |

---

## 权限管理

### 核心概念

#### 资源类型

| 资源类型 | 格式 | 示例 | 说明 |
|---------|------|------|------|
| **Any** | `*` | `*` | 所有资源 |
| **Cluster** | `Cluster:集群名` | `Cluster:DefaultCluster` | 集群级资源 |
| **Namespace** | `Namespace:命名空间` | `Namespace:test` | 命名空间 |
| **Topic** | `Topic:主题名` | `Topic:TestTopic` | 消息主题 |
| **Group** | `Group:消费组名` | `Group:TestGroup` | 消费者组 |

#### 资源匹配模式

| 匹配模式 | 说明 | 示例 | 匹配结果 |
|---------|------|------|---------|
| **完全匹配(LITERAL)** | 精确匹配资源名称 | `Topic:OrderTopic` | 仅匹配`Topic:OrderTopic` |
| **前缀匹配(PREFIXED)** | 匹配指定前缀的资源 | `Topic:Order*` | 匹配`Topic:OrderTopic`、`Topic:OrderDLQTopic`等 |
| **通配符匹配(ANY)** | 匹配该类型的所有资源 | `Topic:*` | 匹配所有Topic |

#### 操作类型

| 操作 | 说明 | 适用资源 |
|------|------|---------|
| **Pub** | 发布消息 | Topic |
| **Sub** | 订阅消息 | Topic, Group |
| **Create** | 创建资源 | Cluster, Namespace, Topic, Group |
| **Update** | 更新资源 | Cluster, Namespace, Topic, Group |
| **Delete** | 删除资源 | Cluster, Namespace, Topic, Group |
| **Get** | 查询资源详情 | Cluster, Namespace, Topic, Group |
| **List** | 查询资源列表 | Cluster, Namespace, Topic, Group |
| **All** | 所有操作 | 所有资源 |

#### 决策类型

| 决策 | 说明 |
|------|------|
| **Allow** | 允许执行操作 |
| **Deny** | 拒绝执行操作（优先级高于Allow） |


### 权限优先级规则

当多个权限策略匹配同一请求时，按以下优先级确定最终结果。

#### 优先级规则

|| 资源优先级（高→低） | 决策优先级 |
||------------------|----------|
|| 1. 具体资源类型 > 任意资源类型(`*`)<br/>2. 完全匹配 > 前缀匹配 > 通配符匹配<br/>3. 长资源名 > 短资源名 | **Deny > Allow**<br/>（拒绝优先级高于允许） |

#### 优先级示例

|| 策略 | 资源定义 | 操作 | 决策 | 优先级 |
||------|---------|------|------|--------|
|| 1 | `Topic:test-abc-1` | Pub,Sub | Deny | 最高 |
|| 2 | `Topic:test-abc` | Pub,Sub | Allow | 高 |
|| 3 | `Topic:test-*` | Pub,Sub | Allow | 中 |
|| 4 | `Topic:*` | Pub,Sub | Allow | 低 |
|| 5 | `*` | All | Deny | 最低 |

**匹配结果**：

|| 访问资源 | 匹配策略 | 最终决策 |
||---------|---------|---------|
|| `Topic:test-abc-1` | 策略1（完全匹配） | ❌ Deny |
|| `Topic:test-abc` | 策略2（完全匹配） | ✅ Allow |
|| `Topic:test-123` | 策略3（前缀匹配） | ✅ Allow |
|| `Topic:other` | 策略4（通配符匹配） | ✅ Allow |
|| `Group:TestGroup` | 策略5（任意资源） | ❌ Deny |

### 权限管理命令

#### 创建权限

**基本用法示例**：

```bash
# 示例1：授予单个Topic的发布权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -d Allow

# 示例2：授予单个Topic的订阅权限（需要同时指定Topic和Group）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:consumer_user -r Topic:TestTopic,Group:TestGroup -a Sub -d Allow

# 示例3：授予多个操作权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user -r Topic:TestTopic -a Create,Update,Delete,Get,List -d Allow
```

**资源匹配模式示例**：

```bash
# 示例4：完全匹配 - 精确匹配资源名称
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:OrderTopic -a Pub,Sub -d Allow

# 示例5：前缀匹配 - 匹配所有order_开头的Topic
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:order_* -a Pub -d Allow

# 示例6：通配符匹配 - 匹配所有Topic
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:monitor_user -r Topic:* -a Get,List -d Allow

# 示例7：匹配所有资源类型
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:super_admin -r * -a All -d Allow
```

**IP白名单示例**：

```bash
# 示例8：限制单个IP访问
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -i 192.168.1.100 -d Allow

# 示例9：限制IP段访问（CIDR格式）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:internal_user -r Topic:InternalTopic -a Pub,Sub -i 192.168.1.0/24 -d Allow

# 示例10：不限制IP（不指定-i参数）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:public_user -r Topic:PublicTopic -a Pub -d Allow
```

**拒绝策略示例**：

```bash
# 示例11：拒绝访问敏感Topic
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:SensitiveTopic -a Pub,Sub -d Deny

# 示例12：先授予大部分权限，再拒绝特定资源（Deny优先级更高）
# 第一步：授予所有Topic访问权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:* -a Pub,Sub -d Allow
# 第二步：拒绝敏感Topic（会覆盖上面的Allow）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:SensitiveTopic -a Pub,Sub -d Deny
```

**集群管理权限示例**：

```bash
# 示例13：授予集群查询权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:monitor_user -r Cluster:DefaultCluster -a Get,List -d Allow

# 示例14：授予Topic管理权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:topic_admin -r Topic:* -a Create,Update,Delete,Get,List -d Allow

# 示例15：授予Group管理权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:group_admin -r Group:* -a Create,Update,Delete,Get,List -d Allow
```

#### 更新权限

```bash
sh bin/mqadmin updateAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub,Sub -d Allow
```

#### 查询权限

```bash
# 查询用户的所有权限
sh bin/mqadmin getAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user

# 查询所有权限列表
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster

# 查询权限列表（带过滤条件）
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user -r Topic:TestTopic
```

#### 删除权限

```bash
# 删除用户的所有权限
sh bin/mqadmin deleteAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user

# 删除用户对特定资源的权限
sh bin/mqadmin deleteAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user -r Topic:TestTopic
```

### 命令参数说明

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `-n` | 是 | NameServer地址 | `127.0.0.1:9876` |
| `-c` | 否 | 集群名称（与`-b`二选一） | `DefaultCluster` |
| `-b` | 否 | Broker地址（与`-c`二选一） | `192.168.1.1:10911` |
| `-s` | 是 | 主体名称 | `User:producer_user` |
| `-r` | 否 | 资源定义（多个用逗号分隔） | `Topic:TestTopic`<br/>`Topic:*`<br/>`Topic:Order*,Group:Order*` |
| `-a` | 否 | 操作类型（多个用逗号分隔） | `Pub`<br/>`Pub,Sub`<br/>`Create,Update,Delete` |
| `-i` | 否 | IP白名单（支持IP或IP段） | `192.168.1.100`<br/>`192.168.1.0/24` |
| `-d` | 否 | 决策结果 | `Allow` 或 `Deny` |


---

## 客户端使用

### Java客户端配置

#### Maven依赖

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client-java</artifactId>
    <version>5.3.4</version>
</dependency>
```

### 消息生产者

```java
import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.SessionCredentials;
import org.apache.rocketmq.client.apis.StaticSessionCredentialsProvider;
import org.apache.rocketmq.client.apis.producer.Producer;
import org.apache.rocketmq.client.apis.message.Message;

public class ProducerWithACL {
    public static void main(String[] args) throws Exception {
        // 1. 创建凭证提供者
        SessionCredentials credentials = new SessionCredentials(
            "producer_user",  // AccessKey (用户名)
            "producer123"     // SecretKey (密码)
        );
        StaticSessionCredentialsProvider credentialsProvider = 
            new StaticSessionCredentialsProvider(credentials);
        
        // 2. 配置客户端
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints("127.0.0.1:8081")  // Proxy地址或Broker地址
            .setCredentialProvider(credentialsProvider)
            .build();
        
        // 3. 创建生产者
        ClientServiceProvider provider = ClientServiceProvider.loadService();
        Producer producer = provider.newProducerBuilder()
            .setClientConfiguration(clientConfiguration)
            .setTopics("TestTopic")
            .build();
        
        // 4. 发送消息
        Message message = provider.newMessageBuilder()
            .setTopic("TestTopic")
            .setBody("Hello RocketMQ with ACL".getBytes())
            .build();
        
        producer.send(message);
        System.out.println("消息发送成功");
        
        // 5. 关闭生产者
        producer.close();
    }
}
```

### 消息消费者

```java
import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.SessionCredentials;
import org.apache.rocketmq.client.apis.StaticSessionCredentialsProvider;
import org.apache.rocketmq.client.apis.consumer.PushConsumer;
import org.apache.rocketmq.client.apis.consumer.FilterExpression;
import org.apache.rocketmq.client.apis.consumer.FilterExpressionType;
import org.apache.rocketmq.client.apis.consumer.ConsumeResult;

import java.util.Collections;

public class ConsumerWithACL {
    public static void main(String[] args) throws Exception {
        // 1. 创建凭证提供者
        SessionCredentials credentials = new SessionCredentials(
            "consumer_user",  // AccessKey (用户名)
            "consumer123"     // SecretKey (密码)
        );
        StaticSessionCredentialsProvider credentialsProvider = 
            new StaticSessionCredentialsProvider(credentials);
        
        // 2. 配置客户端
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints("127.0.0.1:8081")
            .setCredentialProvider(credentialsProvider)
            .build();
        
        // 3. 创建消费者
        ClientServiceProvider provider = ClientServiceProvider.loadService();
        FilterExpression filterExpression = new FilterExpression("*", FilterExpressionType.TAG);
        
        PushConsumer consumer = provider.newPushConsumerBuilder()
            .setClientConfiguration(clientConfiguration)
            .setConsumerGroup("TestGroup")
            .setSubscriptionExpressions(Collections.singletonMap("TestTopic", filterExpression))
            .setMessageListener(messageView -> {
                System.out.println("接收消息: " + new String(messageView.getBody().array()));
                return ConsumeResult.SUCCESS;
            })
            .build();
        
        System.out.println("消费者启动成功");
        
        // 保持运行
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

### Spring Boot集成

```yaml
# application.yml
rocketmq:
  name-server: 127.0.0.1:9876
  producer:
    group: producer-group
    access-key: producer_user
    secret-key: producer123
  consumer:
    group: consumer-group
    access-key: consumer_user
    secret-key: consumer123
    topics:
      - TestTopic
```

---

## 常见场景

### 场景1：生产者和消费者分离

**需求**: 生产者只能发送消息，消费者只能消费消息

```bash
# 创建生产者用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u producer_user -p producer123 -t Normal

# 创建消费者用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u consumer_user -p consumer123 -t Normal

# 授予生产者发送权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -d Allow

# 授予消费者消费权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:consumer_user -r Topic:TestTopic,Group:TestGroup -a Sub -d Allow
```

### 场景2：按业务模块划分权限

**需求**: 不同业务模块使用不同的Topic前缀，各模块用户只能访问自己的Topic

```bash
# 创建订单模块用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u order_service -p order123 -t Normal

# 授予订单模块权限（可以访问所有order_开头的Topic）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:order_* -a Pub,Sub -d Allow

# 创建支付模块用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u payment_service -p payment123 -t Normal

# 授予支付模块权限（可以访问所有payment_开头的Topic）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:payment_service -r Topic:payment_* -a Pub,Sub -d Allow
```

### 场景3：IP白名单限制

**需求**: 只允许特定IP段的机器访问

```bash
# 创建用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u internal_user -p internal123 -t Normal

# 授予权限，但限制只能从内网IP访问
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:internal_user \
  -r Topic:InternalTopic \
  -a Pub,Sub \
  -i 192.168.1.0/24,10.0.0.0/8 \
  -d Allow
```

### 场景4：管理员权限

**需求**: 管理员需要管理Topic和Group的创建、更新、删除

```bash
# 创建管理员用户
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u admin_user -p admin_user123 -t Normal

# 授予集群管理权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Cluster:DefaultCluster \
  -a Create,Update,Delete,Get,List \
  -d Allow

# 授予所有Topic的管理权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Topic:* \
  -a Create,Update,Delete,Get,List \
  -d Allow

# 授予所有Group的管理权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Group:* \
  -a Create,Update,Delete,Get,List \
  -d Allow
```

### 场景5：拒绝访问敏感Topic

**需求**: 明确拒绝某些用户访问敏感Topic

```bash
# 授予用户访问大部分Topic的权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user \
  -r Topic:* \
  -a Pub,Sub \
  -d Allow

# 拒绝访问敏感Topic（Deny优先级高于Allow）
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user \
  -r Topic:SensitiveTopic \
  -a Pub,Sub \
  -d Deny
```

---

## 故障排查

### 常见错误

#### 1. mqadmin工具执行命令失败

**错误信息**:
```
CODE: 17  DESC: No user
或
CODE: 16  DESC: Authentication failed
```

**可能原因**:
- 未配置 `conf/tools.yml` 文件
- `tools.yml` 中的凭证配置错误
- 配置的用户不是超级用户

**解决方案**:
```bash
# 1. 检查 tools.yml 文件是否存在
ls conf/tools.yml

# 2. 配置管理员凭证
cat > conf/tools.yml << EOF
accessKey: rocketmq
secretKey: 12345678
EOF

# 3. 验证配置
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
```

#### 2. 客户端认证失败

**错误信息**:
```
[AUTHENTICATION] User:xxx is authenticated failed with Signature = xxx
```

**可能原因**:
- 用户名或密码错误
- 用户不存在
- 用户被禁用

**排查步骤**:
```bash
# 1. 检查用户是否存在
sh bin/mqadmin getUser -n 127.0.0.1:9876 -c DefaultCluster -u username

# 2. 检查客户端配置的用户名密码是否正确

# 3. 重置用户密码
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p newpassword
```

#### 3. 授权失败

**错误信息**:
```
[AUTHORIZATION] Subject = User:xxx is Deny Action = Pub from sourceIp = xxx on resource = Topic:xxx
```

**可能原因**:
- 用户没有对应资源的权限
- IP不在白名单内
- 存在Deny规则

**排查步骤**:
```bash
# 1. 检查用户的权限配置
sh bin/mqadmin getAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:username

# 2. 检查是否有Deny规则
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:username

# 3. 授予相应权限
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:username -r Topic:TestTopic -a Pub -d Allow
```

#### 4. 组件间通信失败

**错误信息**:
```
Slave Broker connect to Master failed
或
Proxy connect to Broker failed
```

**可能原因**:
- `innerClientAuthenticationCredentials` 配置错误
- 不同组件间的认证凭证不一致
- Master/Slave的凭证配置不匹配

**解决方案**:
```bash
# 检查所有组件的配置是否一致
grep "innerClientAuthenticationCredentials" conf/*.conf conf/*.json

# 修改为统一的凭证
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

### 查看审计日志

认证和授权的所有操作都会记录在Broker/Proxy的日志中。

**查看认证日志**:
```bash
grep "AUTHENTICATION" logs/rocketmqlogs/broker.log

# 认证成功示例
# [AUTHENTICATION] User:producer_user is authenticated success with Signature = xxx

# 认证失败示例
# [AUTHENTICATION] User:producer_user is authenticated failed with Signature = xxx
```

**查看授权日志**:
```bash
grep "AUTHORIZATION" logs/rocketmqlogs/broker.log

# 授权成功示例
# [AUTHORIZATION] Subject = User:producer_user is Allow Action = Pub from sourceIp = 192.168.1.100 on resource = Topic:TestTopic

# 授权失败示例
# [AUTHORIZATION] Subject = User:producer_user is Deny Action = Sub from sourceIp = 192.168.1.100 on resource = Topic:TestTopic
```

---

## 最佳实践

### 1. 用户管理

✅ **推荐做法**:
- 为不同的应用或服务创建独立的用户
- 使用强密码（至少8位，包含字母和数字）
- 超级用户仅用于系统初始化和紧急运维

❌ **避免做法**:
- 多个应用共享同一个用户
- 使用弱密码（如123456）
- 在生产环境大量使用超级用户

### 2. 权限配置

✅ **推荐做法**:
- 遵循最小权限原则，只授予必要的权限
- 使用前缀匹配简化同类资源的权限管理
- 对敏感资源使用Deny规则进行保护
- 生产者只授予Pub权限，消费者只授予Sub权限

❌ **避免做法**:
- 给所有用户授予`*`资源的All权限
- 过度使用通配符匹配
- 忽略IP白名单配置

### 3. 策略选择

**选择无状态策略的场景**:
- 金融、支付等对安全要求极高的场景
- 权限变更需要立即生效的场景
- 低吞吐量场景

**选择有状态策略的场景**:
- 电商、日志等高吞吐量场景
- 权限变更不频繁的场景
- 对性能要求较高的场景

### 4. 生产环境部署调优

在生产环境部署时，除了基本配置外（参考[快速开始](#快速开始)），还需要关注以下参数调优。

#### 存算一体架构调优

```properties
# broker.conf
# 基本配置
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}

# 生产环境性能调优：使用有状态策略（默认为无状态）
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy

# 缓存配置（根据用户数量和QPS调整）
userCacheMaxNum = 5000
userCacheExpiredSecond = 3600
userCacheRefreshSecond = 300
aclCacheMaxNum = 5000
aclCacheExpiredSecond = 3600
aclCacheRefreshSecond = 300
statefulAuthenticationCacheMaxNum = 20000
statefulAuthenticationCacheExpiredSecond = 60
statefulAuthorizationCacheMaxNum = 20000
statefulAuthorizationCacheExpiredSecond = 60
```

#### 存算分离架构调优（推荐）

**Broker配置** (`broker.conf`):

```properties
# Broker仅作为元数据提供者
authenticationEnabled = false
authorizationEnabled = false
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
```

**Proxy配置** (`rmq-proxy.json`):

```json
{
  "authenticationEnabled": true,
  "authenticationProvider": "org.apache.rocketmq.auth.authentication.provider.DefaultAuthenticationProvider",
  "authenticationMetadataProvider": "org.apache.rocketmq.proxy.auth.ProxyAuthenticationMetadataProvider",
  "authenticationStrategy": "org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy",
  
  "authorizationEnabled": true,
  "authorizationProvider": "org.apache.rocketmq.auth.authorization.provider.DefaultAuthorizationProvider",
  "authorizationMetadataProvider": "org.apache.rocketmq.proxy.auth.ProxyAuthorizationMetadataProvider",
  "authorizationStrategy": "org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy",
  
  "userCacheMaxNum": 5000,
  "userCacheExpiredSecond": 3600,
  "userCacheRefreshSecond": 300,
  "aclCacheMaxNum": 5000,
  "aclCacheExpiredSecond": 3600,
  "aclCacheRefreshSecond": 300,
  "statefulAuthenticationCacheMaxNum": 20000,
  "statefulAuthenticationCacheExpiredSecond": 60,
  "statefulAuthorizationCacheMaxNum": 20000,
  "statefulAuthorizationCacheExpiredSecond": 60
}
```

**调优建议**:

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| `userCacheMaxNum` | 用户数 × 1.5 | 避免频繁加载用户数据 |
| `aclCacheMaxNum` | 用户数 × 1.5 | 避免频繁加载权限数据 |
| `statefulAuthenticationCacheMaxNum` | 连接数 × 2 | 缓存每个连接的认证结果 |
| `statefulAuthorizationCacheMaxNum` | 连接数 × 资源数 × 2 | 缓存每个连接对每个资源的授权结果 |

### 5. ACL 1.0迁移到ACL 2.0

**迁移步骤**:

```bash
# 1. 备份ACL 1.0配置
cp conf/plain_acl.yml conf/plain_acl.yml.backup

# 2. 在Broker配置中启用迁移
echo "migrateAuthFromV1Enabled = true" >> conf/broker.conf

# 3. 启用ACL 2.0
cat >> conf/broker.conf << EOF
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
EOF

# 4. 重启Broker（迁移会在启动时自动执行）
sh bin/mqbroker -n localhost:9876 -c conf/broker.conf

# 5. 验证迁移结果
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster

# 6. 迁移成功后，关闭迁移开关
# migrateAuthFromV1Enabled = false

# 7. 删除旧配置文件（可选）
rm conf/plain_acl.yml
```

**注意事项**:
- ACL 1.0的IP白名单不会迁移（行为不一致）
- 已存在的用户和权限不会被覆盖
- 建议在测试环境先验证迁移效果
- 迁移成功后建议删除 `plain_acl.yml` 文件，避免混淆

### 6. 扩容新Broker

当集群扩容新Broker时，需要同步用户和权限数据。

**从旧Broker拷贝所有用户到新Broker**：

```bash
# 拷贝所有用户
sh bin/mqadmin copyUser -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911

# 拷贝所有权限
sh bin/mqadmin copyAcl -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911
```

**从旧Broker拷贝特定用户到新Broker**：

```bash
# 拷贝特定用户
sh bin/mqadmin copyUser -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911 -u producer_user

# 拷贝该用户的权限
sh bin/mqadmin copyAcl -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911 -s User:producer_user
```

### 7. 监控和告警

**建议监控指标**:
- 认证失败次数
- 授权拒绝次数
- 缓存命中率
- 用户数量
- ACL规则数量

**日志监控脚本示例**:
```bash
#!/bin/bash
# 监控认证失败次数
auth_fail_count=$(grep "authenticated failed" logs/rocketmqlogs/broker.log | wc -l)
if [ $auth_fail_count -gt 100 ]; then
    echo "告警：认证失败次数过多: $auth_fail_count"
fi

# 监控授权拒绝次数
authz_deny_count=$(grep "is Deny" logs/rocketmqlogs/broker.log | wc -l)
if [ $authz_deny_count -gt 100 ]; then
    echo "告警：授权拒绝次数过多: $authz_deny_count"
fi
```
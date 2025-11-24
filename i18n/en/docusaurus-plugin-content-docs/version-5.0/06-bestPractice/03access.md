# Access Control 2.0

:::info Version Notice

This document describes **Access Control 2.0 (ACL 2.0)**, applicable to **RocketMQ 5.3.0** and above.

- If you are using **RocketMQ 4.x, 5.0-5.2, or 5.3.0-5.3.2**, please refer to [ACL 1.0 Documentation](./07access-1.0)
- **Starting from RocketMQ 5.3.3, ACL 1.0 is no longer supported**. It is recommended to upgrade to ACL 2.0
- If you are migrating from ACL 1.0 to 2.0, please refer to the [ACL 1.0 Migration](#migrating-from-acl-10-to-acl-20) section

:::

:::danger Security Notice

⚠️ **All usernames and passwords in this document are for demonstration purposes only. DO NOT use them in production environments!**

For production deployment, please ensure:
- Use strong passwords (at least 16 characters, including uppercase, lowercase, numbers, and special characters)
- Strictly control the scope of super user usage
- Properly secure authentication credentials and do not commit them in plain text to code repositories

:::

## Introduction

### What is Access Control 2.0?

Access Control 2.0 (ACL 2.0) is an upgraded version of Apache RocketMQ's Access Control List, providing comprehensive authentication and authorization mechanisms to protect the data security of RocketMQ clusters.

### Core Features

- **Dual Security Mechanisms**: Supports independent configuration of authentication and authorization
- **Flexible Resource Matching**: Supports exact match, prefix match, and wildcard match
- **Fine-grained Permission Control**: Covers multiple resource types including Cluster, Namespace, Topic, and Group
- **Multiple Strategy Options**: Provides stateless and stateful authentication/authorization strategies
- **Inter-component Secure Communication**: Supports access control between components such as Broker, Proxy, and NameServer

### Core Concepts

| Concept | Description |
|---------|-------------|
| **User** | Entity accessing RocketMQ resources, divided into Super users and Normal users |
| **Resource** | Objects requiring access control, such as Cluster, Namespace, Topic, Group |
| **Action** | Operations performed on resources, such as Pub, Sub, Create, Update, Delete, Get, List |
| **Decision** | Authorization result, Allow or Deny |
| **Environment** | Access environment information, such as source IP address |

---

## Quick Start

### 5-Minute Quick Experience

This section helps you quickly start a RocketMQ cluster with ACL enabled in 5 minutes.

> **Prerequisites**:
> - RocketMQ version ≥ 5.3.0
> - RocketMQ basic installation completed
>
> **Version Check**:
> ```bash
> # Check RocketMQ version
> sh bin/mqbroker -v
> ```

> **Note**: This example uses integrated storage-compute architecture (single Broker mode), suitable for quick experience and testing environments. For production deployment, refer to the [Configuration](#configuration) section.

#### Step 1: Configure Broker

Edit the `conf/broker.conf` file and add the following configuration:

```properties
# Enable authentication
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider

# Enable authorization
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider

# Initialize admin user (auto-created on first startup)
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}

# Inter-component authentication credentials (for Broker master-slave sync, internal cluster communication, etc.)
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

> **Configuration Notes**:
> - Only required items need to be configured for quick start; other items have default values
> - For production environments, it is recommended to configure `authenticationStrategy` and `authorizationStrategy` to stateful strategy for better performance

#### Step 2: Start Cluster

```bash
# 1. Start NameServer
nohup sh bin/mqnamesrv &

# 2. Start Broker (using the above configuration file)
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf &
```

#### Step 3: Configure mqadmin Tool

After enabling ACL, you need to configure authentication credentials for the mqadmin tool to execute management commands.

Edit the `conf/tools.yml` file:

```yaml
# Use the initialized admin user credentials
accessKey: rocketmq
secretKey: 12345678
```

#### Step 4: Create Business Users and Grant Permissions

```bash
# Create producer user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u producer_user \
  -p producer123 \
  -t Normal

# Grant Topic publish permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user \
  -r Topic:TestTopic \
  -a Pub \
  -d Allow
```

#### Step 5: Verify Configuration

Send a test message using Java client:

```java
SessionCredentials credentials = new SessionCredentials("producer_user", "producer123");
StaticSessionCredentialsProvider credentialsProvider = 
    new StaticSessionCredentialsProvider(credentials);

ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
    .setEndpoints("127.0.0.1:10911")
    .setCredentialProvider(credentialsProvider)
    .build();
// ... Create Producer and send message
```

✅ Congratulations! You have successfully started a RocketMQ cluster with ACL enabled.

### Different Deployment Architecture Configurations

RocketMQ supports two deployment architectures. Choose the appropriate configuration based on your scenario.

#### Integrated Storage-Compute Architecture

Broker handles both computation and storage, suitable for small to medium-scale clusters and testing environments.

**Configuration Example**:

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

#### Separated Storage-Compute Architecture (Recommended)

Proxy handles computation and authentication/authorization, while Broker only handles storage and metadata management. Suitable for large-scale production environments.

**Broker Configuration** (`broker.conf`):

```properties
# Broker only acts as metadata provider, does not handle client authentication/authorization
authenticationEnabled = false
authorizationEnabled = false

# Configure metadata providers
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider

# Initialize admin user
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
```

**Proxy Configuration** (`rmq-proxy.json`):

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

**Startup Sequence**:

```bash
# 1. Start NameServer
nohup sh bin/mqnamesrv &

# 2. Start Broker (storage node)
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf &

# 3. Start Proxy (compute node)
nohup sh bin/mqproxy -n localhost:9876 -pc conf/rmq-proxy.json &
```

---

## Configuration

### Authentication Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `authenticationEnabled` | boolean | `false` | Whether to enable authentication |
| `authenticationProvider` | String | `org.apache.rocketmq.auth.authentication.provider.DefaultAuthenticationProvider` | Authentication provider implementation class (optional, uses default) |
| `authenticationMetadataProvider` | String | - | Authentication metadata provider implementation class<br/>**Required** |
| `authenticationStrategy` | String | `org.apache.rocketmq.auth.authentication.strategy.StatelessAuthenticationStrategy` | Authentication strategy (optional, uses default)<br/>Production recommendation: stateful strategy<br/>`org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy` |
| `initAuthenticationUser` | JSON | - | **Recommended**: System initialization user (auto-created on first startup)<br/>Format: `{"username":"xxx","password":"xxx"}`<br/>If not configured, admin user must be created manually |
| `innerClientAuthenticationCredentials` | JSON | - | **Conditional**: Inter-component authentication credentials for Broker master-slave sync, Proxy-Broker access, Controller election, etc.<br/>Format: `{"accessKey":"xxx","secretKey":"xxx"}`<br/>⚠️ All components must use identical credentials if inter-component communication exists |
| `authenticationWhitelist` | String | - | Authentication whitelist (comma-separated IP list) |

### Authorization Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `authorizationEnabled` | boolean | `false` | Whether to enable authorization |
| `authorizationProvider` | String | `org.apache.rocketmq.auth.authorization.provider.DefaultAuthorizationProvider` | Authorization provider implementation class (optional, uses default) |
| `authorizationMetadataProvider` | String | - | Authorization metadata provider implementation class<br/>**Required** |
| `authorizationStrategy` | String | `org.apache.rocketmq.auth.authorization.strategy.StatelessAuthorizationStrategy` | Authorization strategy (optional, uses default)<br/>Production recommendation: stateful strategy<br/>`org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy` |
| `authorizationWhitelist` | String | - | Authorization whitelist (comma-separated IP list) |

### Cache Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `userCacheMaxNum` | int | `1000` | Maximum user cache size |
| `userCacheExpiredSecond` | int | `600` | User cache expiration time (seconds) |
| `userCacheRefreshSecond` | int | `60` | User cache refresh time (seconds) |
| `aclCacheMaxNum` | int | `1000` | Maximum ACL cache size |
| `aclCacheExpiredSecond` | int | `600` | ACL cache expiration time (seconds) |
| `aclCacheRefreshSecond` | int | `60` | ACL cache refresh time (seconds) |
| `statefulAuthenticationCacheMaxNum` | int | `10000` | Maximum stateful authentication cache size |
| `statefulAuthenticationCacheExpiredSecond` | int | `60` | Stateful authentication cache expiration time (seconds) |
| `statefulAuthorizationCacheMaxNum` | int | `10000` | Maximum stateful authorization cache size |
| `statefulAuthorizationCacheExpiredSecond` | int | `60` | Stateful authorization cache expiration time (seconds) |

### Authentication and Authorization Strategies

#### Stateless Strategy - Default

- **Characteristics**: Performs complete authentication and authorization check for every request
- **Advantages**: High security, permission changes take effect immediately
- **Disadvantages**: Higher performance overhead
- **Use Cases**: Environments with extremely high security requirements
- **Default**: ✅ System uses this strategy by default

**Configuration Example**:

```properties
# Default values, can be omitted
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatelessAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatelessAuthorizationStrategy
```

#### Stateful Strategy - Recommended for Production

- **Characteristics**: First request performs authentication/authorization, subsequent requests use cached results
- **Advantages**: Lower performance overhead, higher throughput
- **Disadvantages**: Permission changes have delay (takes effect after cache expires)
- **Use Cases**: High throughput scenarios, recommended for production environments
- **Recommendation**: ⭐ Explicitly configure this strategy for production environments

**Configuration Example**:

```properties
# Recommended for production
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy
```

---

## User Management

### User Type Description

| User Type | Description | Permission Scope | Use Case |
|-----------|-------------|------------------|----------|
| **Super** | Super user | Has all permissions on all resources, no separate authorization needed | System administrator, operations personnel |
| **Normal** | Normal user | Requires explicit authorization to access resources | Business applications, services |

### mqadmin Tool Configuration

Before using the mqadmin command-line tool, configure admin credentials.

**Configuration File**: `conf/tools.yml`

```yaml
# Use super user's username and password
accessKey: rocketmq
secretKey: 12345678
```

**Verify Configuration**:

```bash
# Test if mqadmin tool can connect normally
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
```

### User Management Commands

#### Create User

```bash
# Create normal user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p password -t Normal

# Create super user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster -u rocketmq -p 12345678 -t Super
```

#### Update User

```bash
# Update user password
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p newpassword

# Update user type
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -t Super
```

#### Query User

```bash
# Query user details
sh bin/mqadmin getUser -n 127.0.0.1:9876 -c DefaultCluster -u username

# Query user list
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster

# Query user list with filter
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster -f producer
```

#### Delete User

```bash
sh bin/mqadmin deleteUser -n 127.0.0.1:9876 -c DefaultCluster -u username
```

### Command Parameters

| Parameter | Required | Description | Default |
|-----------|----------|-------------|---------|
| `-n` | Yes | NameServer address | - |
| `-c` | No | Cluster name (choose one with `-b`) | - |
| `-b` | No | Broker address (choose one with `-c`) | - |
| `-u` | Yes | Username | - |
| `-p` | No | Password (used for create/update) | - |
| `-t` | No | User type: Super or Normal | Normal |
| `-f` | No | Filter condition (used for query) | - |

---

## Permission Management

### Core Concepts

#### Resource Types

| Resource Type | Format | Example | Description |
|---------------|--------|---------|-------------|
| **Any** | `*` | `*` | All resources |
| **Cluster** | `Cluster:cluster_name` | `Cluster:DefaultCluster` | Cluster-level resource |
| **Namespace** | `Namespace:namespace` | `Namespace:test` | Namespace |
| **Topic** | `Topic:topic_name` | `Topic:TestTopic` | Message topic |
| **Group** | `Group:group_name` | `Group:TestGroup` | Consumer group |

#### Resource Matching Modes

| Matching Mode | Description | Example | Match Result |
|---------------|-------------|---------|--------------|
| **Exact Match (LITERAL)** | Exact resource name match | `Topic:OrderTopic` | Matches only `Topic:OrderTopic` |
| **Prefix Match (PREFIXED)** | Matches resources with specified prefix | `Topic:Order*` | Matches `Topic:OrderTopic`, `Topic:OrderDLQTopic`, etc. |
| **Wildcard Match (ANY)** | Matches all resources of the type | `Topic:*` | Matches all Topics |

#### Action Types

| Action | Description | Applicable Resources |
|--------|-------------|---------------------|
| **Pub** | Publish messages | Topic |
| **Sub** | Subscribe messages | Topic, Group |
| **Create** | Create resource | Cluster, Namespace, Topic, Group |
| **Update** | Update resource | Cluster, Namespace, Topic, Group |
| **Delete** | Delete resource | Cluster, Namespace, Topic, Group |
| **Get** | Query resource details | Cluster, Namespace, Topic, Group |
| **List** | Query resource list | Cluster, Namespace, Topic, Group |
| **All** | All operations | All resources |

#### Decision Types

| Decision | Description |
|----------|-------------|
| **Allow** | Allow operation |
| **Deny** | Deny operation (higher priority than Allow) |


### Permission Priority Rules

When multiple permission policies match the same request, the final result is determined by the following priority.

#### Priority Rules

|| Resource Priority (High→Low) | Decision Priority |
||------------------------------|------------------|
|| 1. Specific resource type > Any resource type (`*`)<br/>2. Exact match > Prefix match > Wildcard match<br/>3. Longer resource name > Shorter resource name | **Deny > Allow**<br/>(Deny has higher priority than Allow) |

#### Priority Example

|| Policy | Resource Definition | Action | Decision | Priority |
||--------|-------------------|--------|----------|----------|
|| 1 | `Topic:test-abc-1` | Pub,Sub | Deny | Highest |
|| 2 | `Topic:test-abc` | Pub,Sub | Allow | High |
|| 3 | `Topic:test-*` | Pub,Sub | Allow | Medium |
|| 4 | `Topic:*` | Pub,Sub | Allow | Low |
|| 5 | `*` | All | Deny | Lowest |

**Match Results**:

|| Access Resource | Matched Policy | Final Decision |
||----------------|----------------|----------------|
|| `Topic:test-abc-1` | Policy 1 (exact match) | ❌ Deny |
|| `Topic:test-abc` | Policy 2 (exact match) | ✅ Allow |
|| `Topic:test-123` | Policy 3 (prefix match) | ✅ Allow |
|| `Topic:other` | Policy 4 (wildcard match) | ✅ Allow |
|| `Group:TestGroup` | Policy 5 (any resource) | ❌ Deny |

### Permission Management Commands

#### Create Permission

**Basic Usage Examples**:

```bash
# Example 1: Grant publish permission for a single Topic
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -d Allow

# Example 2: Grant subscribe permission for a single Topic (need to specify both Topic and Group)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:consumer_user -r Topic:TestTopic,Group:TestGroup -a Sub -d Allow

# Example 3: Grant multiple operation permissions
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user -r Topic:TestTopic -a Create,Update,Delete,Get,List -d Allow
```

**Resource Matching Mode Examples**:

```bash
# Example 4: Exact match - precise resource name match
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:OrderTopic -a Pub,Sub -d Allow

# Example 5: Prefix match - matches all Topics starting with order_
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:order_* -a Pub -d Allow

# Example 6: Wildcard match - matches all Topics
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:monitor_user -r Topic:* -a Get,List -d Allow

# Example 7: Match all resource types
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:super_admin -r * -a All -d Allow
```

**IP Whitelist Examples**:

```bash
# Example 8: Restrict single IP access
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -i 192.168.1.100 -d Allow

# Example 9: Restrict IP range access (CIDR format)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:internal_user -r Topic:InternalTopic -a Pub,Sub -i 192.168.1.0/24 -d Allow

# Example 10: No IP restriction (do not specify -i parameter)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:public_user -r Topic:PublicTopic -a Pub -d Allow
```

**Deny Policy Examples**:

```bash
# Example 11: Deny access to sensitive Topic
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:SensitiveTopic -a Pub,Sub -d Deny

# Example 12: Grant most permissions first, then deny specific resources (Deny has higher priority)
# Step 1: Grant access to all Topics
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:* -a Pub,Sub -d Allow
# Step 2: Deny sensitive Topic (overrides above Allow)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user -r Topic:SensitiveTopic -a Pub,Sub -d Deny
```

**Cluster Management Permission Examples**:

```bash
# Example 13: Grant cluster query permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:monitor_user -r Cluster:DefaultCluster -a Get,List -d Allow

# Example 14: Grant Topic management permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:topic_admin -r Topic:* -a Create,Update,Delete,Get,List -d Allow

# Example 15: Grant Group management permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:group_admin -r Group:* -a Create,Update,Delete,Get,List -d Allow
```

#### Update Permission

```bash
sh bin/mqadmin updateAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub,Sub -d Allow
```

#### Query Permission

```bash
# Query all permissions of a user
sh bin/mqadmin getAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user

# Query all permission list
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster

# Query permission list with filter
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user -r Topic:TestTopic
```

#### Delete Permission

```bash
# Delete all permissions of a user
sh bin/mqadmin deleteAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user

# Delete user's permission for specific resource
sh bin/mqadmin deleteAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:producer_user -r Topic:TestTopic
```

### Command Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `-n` | Yes | NameServer address | `127.0.0.1:9876` |
| `-c` | No | Cluster name (choose one with `-b`) | `DefaultCluster` |
| `-b` | No | Broker address (choose one with `-c`) | `192.168.1.1:10911` |
| `-s` | Yes | Subject name | `User:producer_user` |
| `-r` | No | Resource definition (comma-separated) | `Topic:TestTopic`<br/>`Topic:*`<br/>`Topic:Order*,Group:Order*` |
| `-a` | No | Action type (comma-separated) | `Pub`<br/>`Pub,Sub`<br/>`Create,Update,Delete` |
| `-i` | No | IP whitelist (supports IP or IP range) | `192.168.1.100`<br/>`192.168.1.0/24` |
| `-d` | No | Decision result | `Allow` or `Deny` |


---

## Client Usage

### Java Client Configuration

#### Maven Dependency

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client-java</artifactId>
    <version>5.3.4</version>
</dependency>
```

### Message Producer

```java
import org.apache.rocketmq.client.apis.ClientConfiguration;
import org.apache.rocketmq.client.apis.ClientServiceProvider;
import org.apache.rocketmq.client.apis.SessionCredentials;
import org.apache.rocketmq.client.apis.StaticSessionCredentialsProvider;
import org.apache.rocketmq.client.apis.producer.Producer;
import org.apache.rocketmq.client.apis.message.Message;

public class ProducerWithACL {
    public static void main(String[] args) throws Exception {
        // 1. Create credentials provider
        SessionCredentials credentials = new SessionCredentials(
            "producer_user",  // AccessKey (username)
            "producer123"     // SecretKey (password)
        );
        StaticSessionCredentialsProvider credentialsProvider = 
            new StaticSessionCredentialsProvider(credentials);
        
        // 2. Configure client
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints("127.0.0.1:8081")  // Proxy or Broker address
            .setCredentialProvider(credentialsProvider)
            .build();
        
        // 3. Create producer
        ClientServiceProvider provider = ClientServiceProvider.loadService();
        Producer producer = provider.newProducerBuilder()
            .setClientConfiguration(clientConfiguration)
            .setTopics("TestTopic")
            .build();
        
        // 4. Send message
        Message message = provider.newMessageBuilder()
            .setTopic("TestTopic")
            .setBody("Hello RocketMQ with ACL".getBytes())
            .build();
        
        producer.send(message);
        System.out.println("Message sent successfully");
        
        // 5. Close producer
        producer.close();
    }
}
```

### Message Consumer

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
        // 1. Create credentials provider
        SessionCredentials credentials = new SessionCredentials(
            "consumer_user",  // AccessKey (username)
            "consumer123"     // SecretKey (password)
        );
        StaticSessionCredentialsProvider credentialsProvider = 
            new StaticSessionCredentialsProvider(credentials);
        
        // 2. Configure client
        ClientConfiguration clientConfiguration = ClientConfiguration.newBuilder()
            .setEndpoints("127.0.0.1:8081")
            .setCredentialProvider(credentialsProvider)
            .build();
        
        // 3. Create consumer
        ClientServiceProvider provider = ClientServiceProvider.loadService();
        FilterExpression filterExpression = new FilterExpression("*", FilterExpressionType.TAG);
        
        PushConsumer consumer = provider.newPushConsumerBuilder()
            .setClientConfiguration(clientConfiguration)
            .setConsumerGroup("TestGroup")
            .setSubscriptionExpressions(Collections.singletonMap("TestTopic", filterExpression))
            .setMessageListener(messageView -> {
                System.out.println("Received message: " + new String(messageView.getBody().array()));
                return ConsumeResult.SUCCESS;
            })
            .build();
        
        System.out.println("Consumer started successfully");
        
        // Keep running
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

### Spring Boot Integration

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

## Common Scenarios

### Scenario 1: Separate Producer and Consumer

**Requirement**: Producer can only send messages, consumer can only consume messages

```bash
# Create producer user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u producer_user -p producer123 -t Normal

# Create consumer user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u consumer_user -p consumer123 -t Normal

# Grant producer publish permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:producer_user -r Topic:TestTopic -a Pub -d Allow

# Grant consumer subscribe permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:consumer_user -r Topic:TestTopic,Group:TestGroup -a Sub -d Allow
```

### Scenario 2: Permissions by Business Module

**Requirement**: Different business modules use different Topic prefixes, each module can only access its own Topics

```bash
# Create order module user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u order_service -p order123 -t Normal

# Grant order module permission (can access all Topics starting with order_)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:order_service -r Topic:order_* -a Pub,Sub -d Allow

# Create payment module user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u payment_service -p payment123 -t Normal

# Grant payment module permission (can access all Topics starting with payment_)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:payment_service -r Topic:payment_* -a Pub,Sub -d Allow
```

### Scenario 3: IP Whitelist Restriction

**Requirement**: Only allow specific IP ranges to access

```bash
# Create user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u internal_user -p internal123 -t Normal

# Grant permission but restrict to internal IP access only
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:internal_user \
  -r Topic:InternalTopic \
  -a Pub,Sub \
  -i 192.168.1.0/24,10.0.0.0/8 \
  -d Allow
```

### Scenario 4: Administrator Permission

**Requirement**: Administrator needs to manage Topic and Group creation, update, deletion

```bash
# Create admin user
sh bin/mqadmin createUser -n 127.0.0.1:9876 -c DefaultCluster \
  -u admin_user -p admin_user123 -t Normal

# Grant cluster management permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Cluster:DefaultCluster \
  -a Create,Update,Delete,Get,List \
  -d Allow

# Grant all Topic management permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Topic:* \
  -a Create,Update,Delete,Get,List \
  -d Allow

# Grant all Group management permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:admin_user \
  -r Group:* \
  -a Create,Update,Delete,Get,List \
  -d Allow
```

### Scenario 5: Deny Access to Sensitive Topic

**Requirement**: Explicitly deny certain users from accessing sensitive Topics

```bash
# Grant user access to most Topics
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user \
  -r Topic:* \
  -a Pub,Sub \
  -d Allow

# Deny access to sensitive Topic (Deny has higher priority than Allow)
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:normal_user \
  -r Topic:SensitiveTopic \
  -a Pub,Sub \
  -d Deny
```

---

## Troubleshooting

### Common Errors

#### 1. mqadmin Tool Command Execution Failed

**Error Message**:
```
CODE: 17  DESC: No user
or
CODE: 16  DESC: Authentication failed
```

**Possible Causes**:
- `conf/tools.yml` file not configured
- Credentials in `tools.yml` are incorrect
- Configured user is not a super user

**Solution**:
```bash
# 1. Check if tools.yml file exists
ls conf/tools.yml

# 2. Configure admin credentials
cat > conf/tools.yml << EOF
accessKey: rocketmq
secretKey: 12345678
EOF

# 3. Verify configuration
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
```

#### 2. Client Authentication Failed

**Error Message**:
```
[AUTHENTICATION] User:xxx is authenticated failed with Signature = xxx
```

**Possible Causes**:
- Incorrect username or password
- User does not exist
- User is disabled

**Troubleshooting Steps**:
```bash
# 1. Check if user exists
sh bin/mqadmin getUser -n 127.0.0.1:9876 -c DefaultCluster -u username

# 2. Verify client configuration has correct username and password

# 3. Reset user password
sh bin/mqadmin updateUser -n 127.0.0.1:9876 -c DefaultCluster -u username -p newpassword
```

#### 3. Authorization Failed

**Error Message**:
```
[AUTHORIZATION] Subject = User:xxx is Deny Action = Pub from sourceIp = xxx on resource = Topic:xxx
```

**Possible Causes**:
- User does not have permission for the resource
- IP not in whitelist
- Deny rule exists

**Troubleshooting Steps**:
```bash
# 1. Check user's permission configuration
sh bin/mqadmin getAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:username

# 2. Check if Deny rules exist
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster -s User:username

# 3. Grant appropriate permission
sh bin/mqadmin createAcl -n 127.0.0.1:9876 -c DefaultCluster \
  -s User:username -r Topic:TestTopic -a Pub -d Allow
```

#### 4. Inter-component Communication Failed

**Error Message**:
```
Slave Broker connect to Master failed
or
Proxy connect to Broker failed
```

**Possible Causes**:
- `innerClientAuthenticationCredentials` misconfigured
- Inconsistent authentication credentials between components
- Master/Slave credential configuration mismatch

**Solution**:
```bash
# Check if all component configurations are consistent
grep "innerClientAuthenticationCredentials" conf/*.conf conf/*.json

# Modify to unified credentials
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

### View Audit Logs

All authentication and authorization operations are logged in Broker/Proxy logs.

**View Authentication Logs**:
```bash
grep "AUTHENTICATION" logs/rocketmqlogs/broker.log

# Authentication success example
# [AUTHENTICATION] User:producer_user is authenticated success with Signature = xxx

# Authentication failure example
# [AUTHENTICATION] User:producer_user is authenticated failed with Signature = xxx
```

**View Authorization Logs**:
```bash
grep "AUTHORIZATION" logs/rocketmqlogs/broker.log

# Authorization success example
# [AUTHORIZATION] Subject = User:producer_user is Allow Action = Pub from sourceIp = 192.168.1.100 on resource = Topic:TestTopic

# Authorization failure example
# [AUTHORIZATION] Subject = User:producer_user is Deny Action = Sub from sourceIp = 192.168.1.100 on resource = Topic:TestTopic
```

---

## Best Practices

### 1. User Management

✅ **Recommended Practices**:
- Create independent users for different applications or services
- Use strong passwords (at least 8 characters, including letters and numbers)
- Super users should only be used for system initialization and emergency operations

❌ **Avoid**:
- Multiple applications sharing the same user
- Using weak passwords (e.g., 123456)
- Excessive use of super users in production

### 2. Permission Configuration

✅ **Recommended Practices**:
- Follow the principle of least privilege, grant only necessary permissions
- Use prefix matching to simplify permission management for similar resources
- Use Deny rules to protect sensitive resources
- Producers should only be granted Pub permission, consumers should only be granted Sub permission

❌ **Avoid**:
- Granting all users All permission on `*` resource
- Excessive use of wildcard matching
- Ignoring IP whitelist configuration

### 3. Strategy Selection

**Choose Stateless Strategy for**:
- Finance, payment, and other scenarios with extremely high security requirements
- Scenarios where permission changes need to take effect immediately
- Low throughput scenarios

**Choose Stateful Strategy for**:
- E-commerce, logging, and other high throughput scenarios
- Scenarios where permission changes are infrequent
- Scenarios with high performance requirements

### 4. Production Environment Deployment Tuning

For production deployment, in addition to basic configuration (refer to [Quick Start](#quick-start)), pay attention to the following parameter tuning.

#### Integrated Storage-Compute Architecture Tuning

```properties
# broker.conf
# Basic configuration
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}

# Production performance tuning: use stateful strategy (default is stateless)
authenticationStrategy = org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy
authorizationStrategy = org.apache.rocketmq.auth.authorization.strategy.StatefulAuthorizationStrategy

# Cache configuration (adjust based on number of users and QPS)
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

#### Separated Storage-Compute Architecture Tuning (Recommended)

**Broker Configuration** (`broker.conf`):

```properties
# Broker only acts as metadata provider
authenticationEnabled = false
authorizationEnabled = false
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
```

**Proxy Configuration** (`rmq-proxy.json`):

```json
{
  "authenticationEnabled": true,
  "authenticationProvider": "org.apache.rocketmq.auth.authentication.provider.DefaultAuthenticationProvider",
  "authenticationMetadataProvider": "org.apache.rocketmq.proxy.auth.ProxyAuthenticationMetadataProvider",
  "authenticationStrategy": "org.apache.rocketmq.auth.authentication.strategy.StatefulAuthenticationStrategy",
  "innerClientAuthenticationCredentials": "{\"accessKey\":\"rocketmq\", \"secretKey\":\"12345678\"}",
  
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

**Tuning Recommendations**:

| Parameter | Recommended Value | Description |
|-----------|------------------|-------------|
| `userCacheMaxNum` | Number of users × 1.5 | Avoid frequent loading of user data |
| `aclCacheMaxNum` | Number of users × 1.5 | Avoid frequent loading of permission data |
| `statefulAuthenticationCacheMaxNum` | Number of connections × 2 | Cache authentication result for each connection |
| `statefulAuthorizationCacheMaxNum` | Number of connections × resources × 2 | Cache authorization result for each connection on each resource |

### 5. Migrating from ACL 1.0 to ACL 2.0

**Migration Steps**:

```bash
# 1. Backup ACL 1.0 configuration
cp conf/plain_acl.yml conf/plain_acl.yml.backup

# 2. Enable migration in Broker configuration
echo "migrateAuthFromV1Enabled = true" >> conf/broker.conf

# 3. Enable ACL 2.0
cat >> conf/broker.conf << EOF
authenticationEnabled = true
authenticationMetadataProvider = org.apache.rocketmq.auth.authentication.provider.LocalAuthenticationMetadataProvider
authorizationEnabled = true
authorizationMetadataProvider = org.apache.rocketmq.auth.authorization.provider.LocalAuthorizationMetadataProvider
initAuthenticationUser = {"username":"rocketmq","password":"12345678"}
innerClientAuthenticationCredentials = {"accessKey":"rocketmq","secretKey":"12345678"}
EOF

# 4. Restart Broker (migration will execute automatically on startup)
sh bin/mqbroker -n localhost:9876 -c conf/broker.conf

# 5. Verify migration results
sh bin/mqadmin listUser -n 127.0.0.1:9876 -c DefaultCluster
sh bin/mqadmin listAcl -n 127.0.0.1:9876 -c DefaultCluster

# 6. After successful migration, disable migration switch
# migrateAuthFromV1Enabled = false

# 7. Delete old configuration file (optional)
rm conf/plain_acl.yml
```

**Notes**:
- ACL 1.0 IP whitelist will not be migrated (behavior inconsistency)
- Existing users and permissions will not be overwritten
- It is recommended to verify migration results in test environment first
- After successful migration, it is recommended to delete `plain_acl.yml` file to avoid confusion

### 6. Expanding New Broker

When expanding the cluster with new Brokers, you need to synchronize user and permission data.

**Copy all users from old Broker to new Broker**:

```bash
# Copy all users
sh bin/mqadmin copyUser -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911

# Copy all permissions
sh bin/mqadmin copyAcl -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911
```

**Copy specific user from old Broker to new Broker**:

```bash
# Copy specific user
sh bin/mqadmin copyUser -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911 -u producer_user

# Copy permissions for this user
sh bin/mqadmin copyAcl -n 127.0.0.1:9876 -f 192.168.0.1:10911 -t 192.168.0.2:10911 -s User:producer_user
```

### 7. Monitoring and Alerting

**Recommended Monitoring Metrics**:
- Authentication failure count
- Authorization denial count
- Cache hit rate
- User count
- ACL rule count

**Log Monitoring Script Example**:
```bash
#!/bin/bash
# Monitor authentication failure count
auth_fail_count=$(grep "authenticated failed" logs/rocketmqlogs/broker.log | wc -l)
if [ $auth_fail_count -gt 100 ]; then
    echo "Alert: Too many authentication failures: $auth_fail_count"
fi

# Monitor authorization denial count
authz_deny_count=$(grep "is Deny" logs/rocketmqlogs/broker.log | wc -l)
if [ $authz_deny_count -gt 100 ]; then
    echo "Alert: Too many authorization denials: $authz_deny_count"
fi
```
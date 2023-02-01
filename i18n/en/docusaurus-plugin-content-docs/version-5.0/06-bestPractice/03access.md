# Access Control

## 1. Introduction to access control features

access control (ACL) mainly provides advanced access control functions at the Topic resource level for RocketMQ. When using RocketMQ access control, users can inject user name and password parameters into the  client to achieve signature, and the server can implement permission management and verification of various resources through access control parameters.

:::info

ACL control will increase the complexity of deployment process and operation and maintenance management while enhancing cluster access control security. It is generally only recommended for use in scenarios where the network environment is not secure, business data is sensitive, and multiple departments and tenants are mixed. If the production cluster itself is a private cluster and is not accessed by external departments and tenants, it can be turned off.

:::

## 2. Definition and attribute values of access control

### 2.1 Permission definition

The definition of access access control for RocketMQ Topic resources is mainly as shown in the following table, divided into the following four categories:

| Permission | Definition            |
| ---------- | --------------------- |
| DENY       | reject                |
| ANY        | PUB or SUB permission |
| PUB        | send permission       |
| SUB        | subscribe permission  |

### 2.2 Key attributes of permission definitions

| Field                      | Value                        | Definition                             |
| -------------------------- | ---------------------------- | -------------------------------------- |
| globalWhiteRemoteAddresses | \*;192.168.\*.\*;192.168.0.1 | Global IP whitelist                    |
| accessKey                  | string                       | Access Key                             |
| secretKey                  | string                       | Secret Key                             |
| whiteRemoteAddress         | \*;192.168.\*.\*;192.168.0.1 | User IP whitelist                      |
| admin                      | true;false                   | Whether it is an administrator account |
| defaultTopicPerm           | DENY;PUB;SUB;PUB\|SUB        | default Topic permission               |
| defaultGroupPerm           | DENY;PUB;SUB;PUB\|SUB        | defalutl ConsumerGroup permission      |
| topicPerms                 | topic=permission             | Permissions for each Topic             |
| groupPerms                 | group=permission             | Permissions for each Consumer Group    |

Refer to the **distribution/conf/plain_acl.yml** configuration file for specific information.

## 3. Deployment of clusters supporting access control

After defining the permission attributes in the **distribution/conf/plain_acl.yml** configuration file as described above, you can turn on the ACL feature of the RocketMQ cluster by turning on the **aclEnable** switch variable. Here is the properties configuration file content for enabling the ACL feature on the Broker：

```
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH
storePathRootDir=/data/rocketmq/rootdir-a-m
storePathCommitLog=/data/rocketmq/commitlog-a-m
autoCreateSubscriptionGroup=true
## if acl is open,the flag will be true
aclEnable=true
listenPort=10911
brokerIP1=XX.XX.XX.XX1
namesrvAddr=XX.XX.XX.XX:9876
```

## 4. Main process of access control

The main process of ACL is divided into two parts, mainly including permission parsing and permission verification.

### 4.1 Permission parsing

The Broker parses the client's RequestCommand request and gets the attributes fields that need to be authenticated, mainly including:

1. AccessKey: Similar to a username, it refers to the user subject and corresponds to the permission data.
2. Signature: A string obtained by the client signing with the SecretKey, which the server then verifies with the SecretKey.

### 4.2 Permission verification

The permission verification logic on the Broker side is mainly divided into the following steps:

1. Check if it hits the global IP whitelist; if it is, it is considered to have passed the verification; otherwise, go to 2.
2. Check if it hits the user IP whitelist; if it is, it is considered to have passed the verification; otherwise, go to 3.
3. Verify the signature, if the verification fails, throw an exception; if it passes, go to 4.
4. Verify the permissions required by the user request against the permissions owned by the user; if it fails, throw an exception.

The verification of the required permissions for the user needs to pay attention to the following content:

1.  Special requests such as UPDATE_AND_CREATE_TOPIC can only be operated by the admin account.
2.  For a certain resource, if there is an explicit configuration permission, the configured permission is used; if there is no explicit configuration    permission, the default permission is used.

## 5. Hot reload modified access control definitions

The default implementation of RocketMQ's access control storage is based on the yml configuration file. Users can dynamically modify the properties of the access control definition without restarting the Broker service node.

## 6. Usage limits for access control

1. If ACL is enabled together with high availability deployment (Master/Slave architecture), you need to set the global whitelist information in the distribution/conf/plain_acl.yml configuration file on the Broker Master node, that is, set the IP address of the Slave node to the global whitelist in the plain_acl.yml configuration file on the Master node.
2. If ACL is enabled together with high availability deployment (multi-replica Dledger architecture), because the primary node will be automatically selected in the Dledger Group when a node goes down, you need to set the whitelist in the plain_acl.yml configuration file of all Broker nodes in the Dledger Group to the IP address of all Broker nodes.

## 7. ACL mqadmin configuration management commands

### 7.1 Update the value of the "account" attribute in the ACL configuration file

An example of this command is as follows：

```shell
$ sh mqadmin updateAclConfig -n 192.168.1.2:9876 -b 192.168.12.134:10911 -a RocketMQ -s 1234567809123 -t topicA=DENY,topicD=SUB -g groupD=DENY,groupB=SUB
```

Explain:  If it does not exist, it will be created in the ACL Config YAML configuration file; if it exists, it will update the corresponding "accounts" attribute; if the specified cluster name is specified, the command will be executed on each broker node in the cluster; otherwise, the command will be executed on a single broker node.

| Parameter | Value                     | Definition                                                   |
| --------- | ------------------------- | ------------------------------------------------------------ |
| n         | eg:192.168.1.2:9876       | Namesrv address (required)                                   |
| c         | eg:DefaultCluster         | Specify cluster name(Choose one with the broker address)     |
| b         | eg:192.168.12.134:10911   | Specify broker address(Choose one with the cluster name)     |
| a         | eg:RocketMQ               | Access Key value(required)                                   |
| s         | eg:1234567809123          | Secret Key value(optional)                                   |
| m         | eg:true                   | Whether it is an administrator account (optional)            |
| w         | eg:192.168.0.*            | whiteRemoteAddress,user IP whitelist (optional)              |
| i         | eg:DENY;PUB;SUB;PUB\|SUB  | defaultTopicPerm,default Topic permissions (optional)        |
| u         | eg:DENY;PUB;SUB;PUB\|SUB  | defaultGroupPerm,default Consumer Group permissions (optional) |
| t         | eg:topicA=DENY,topicD=SUB | topicPerms,permissions for each Topic (optional)             |
| g         | eg:groupD=DENY,groupB=SUB | groupPerms,permissions for each Consumer Group (optional)    |

### 7.2 Delete the corresponding "account" in the ACL configuration file

An example of this command is as follows：

```shell
$ sh mqadmin deleteAccessConfig -n 192.168.1.2:9876 -c DefaultCluster -a RocketMQ
```

Explain: If the specified cluster name is specified, the command will be executed on each broker node in the cluster; otherwise, the command will be executed on a single broker node. The parameter "a" is the value of the Access Key, which is used to identify the unique account ID, so the account ID can be specified in the command parameter.

| Parameter | Value                   | Definition                                               |
| --------- | ----------------------- | -------------------------------------------------------- |
| n         | eg:192.168.1.2:9876     | namesrv address(required)                                |
| c         | eg:DefaultCluster       | Specify cluster name(Choose one with the broker address) |
| b         | eg:192.168.12.134:10911 | Specify broker address(Choose one with the cluster name) |
| a         | eg:RocketMQ             | Access Key value(required)                               |


### 7.3 Update the global whitelist in the ACL configuration file

An example of this command is as follows：

```shell
sh mqadmin updateGlobalWhiteAddr -n 192.168.1.2:9876 -b 192.168.12.134:10911 -g 10.10.154.1,10.10.154.2
```

Explain: If the specified cluster name is specified, the command will be executed on each broker node in the cluster; otherwise, the command will be executed on a single broker node. The parameter "g" is the value of the global IP whitelist, which is used to update the "globalWhiteRemoteAddresses" field attribute value in the ACL configuration file.

| Parameter | Value                      | Definition                                               |
| --------- | -------------------------- | -------------------------------------------------------- |
| n         | eg:192.168.1.2:9876        | namesrv address(required)                                |
| c         | eg:DefaultCluster          | Specify cluster name(Choose one with the broker address) |
| b         | eg:192.168.12.134:10911    | Specify broker address(Choose one with the cluster name) |
| g         | eg:10.10.154.1,10.10.154.2 | Global IP whitelist(required)                            |

### 7.4 Query the ACL configuration file version information of the cluster Broker

An example of this command is as follows：

```shell
sh mqadmin clusterAclConfigVersion -n 192.168.1.2:9876 -c DefaultCluster
```

Explain: If the specified cluster name is specified, the command will be executed on each broker node in the cluster; otherwise, the command will be executed on a single broker node.

| Parameter | Value                   | Definition                                               |
| --------- | ----------------------- | -------------------------------------------------------- |
| n         | eg:192.168.1.2:9876     | namesrv address(required)                                |
| c         | eg:DefaultCluster       | Specify cluster name(Choose one with the broker address) |
| b         | eg:192.168.12.134:10911 | Specify broker address(Choose one with the cluster name) |

### 7.5 Query the entire contents of the ACL configuration file of the cluster Broker

An example of this command is as follows：

```shell
sh mqadmin getAccessConfigSubCommand -n 192.168.1.2:9876 -c DefaultCluster
```

Explain: If the specified cluster name is specified, the command will be executed on each broker node in the cluster; Otherwise, the command is executed on a single broker node.

| Parameter | Value                   | Definition                                               |
| --------- | ----------------------- | -------------------------------------------------------- |
| n         | eg:192.168.1.2:9876     | namesrv address(required)                                |
| c         | eg:DefaultCluster       | Specify cluster name(Choose one with the broker address) |
| b         | eg:192.168.12.134:10911 | Specify broker address(Choose one with the cluster name) |

**Special attention**: The problem of abnormal data synchronization of Broker under Master/Slave and Dledger modes after Acl authentication is enabled has been fixed in the [4.5.1] version of the community. The specific PR link is: https://github.com/apache/rocketmq/pull/1149
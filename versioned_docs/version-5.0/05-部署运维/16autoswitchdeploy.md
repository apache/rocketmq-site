# 主备自动切换模式部署

![架构图](../picture/controller架构.png)

该文档主要介绍如何部署支持自动主从切换的 RocketMQ 集群，其架构如上图所示，主要增加支持自动主从切换的 Controller 组件，其可以独立部署也可以内嵌在 NameServer 中。

:::tip 参考
详细可参考 [设计思想](https://github.com/apache/rocketmq/blob/develop/docs/cn/controller/design.md) 和 [快速开始](https://github.com/apache/rocketmq/blob/develop/docs/cn/controller/quick_start.md)
:::

## Controller 部署

Controller 组件提供选主能力，若需要保证 Controller 具备容错能力，Controller 部署需要三副本及以上（遵循 Raft 的多数派协议）。

:::tip 注意
Controller 若只部署单副本也能完成 Broker Failover，但若该单点 Controller 故障，会影响切换能力，但不会影响存量集群的正常收发。
:::

Controller 部署有两种方式。一种是嵌入于 NameServer 进行部署，可以通过配置 enableControllerInNamesrv 打开（可以选择性打开，并不强制要求每一台 NameServer 都打开），在该模式下，NameServer 本身能力仍然是无状态的，也就是内嵌模式下若 NameServer 挂掉多数派，只影响切换能力，不影响原来路由获取等功能。另一种是独立部署，需要单独部署 Controller 组件。

### Controller 嵌入 NameServer 部署

嵌入 NameServer 部署时只需要在 NameServer 的配置文件中设置 enableControllerInNamesrv=true，并填上 Controller 的配置即可。

```
enableControllerInNamesrv = true
controllerDLegerGroup = group1
controllerDLegerPeers = n0-127.0.0.1:9877;n1-127.0.0.1:9878;n2-127.0.0.1:9879
controllerDLegerSelfId = n0
controllerStorePath = /home/admin/DledgerController
enableElectUncleanMaster = false
notifyBrokerRoleChanged = true
```

参数解释：

- enableControllerInNamesrv：Nameserver 中是否开启 controller，默认 false。
- controllerDLegerGroup：DLedger Raft Group 的名字，同一个 DLedger Raft Group 保持一致即可。
- controllerDLegerPeers：DLedger Group 内各节点的端口信息，同一个 Group 内的各个节点配置必须要保证一致。
- controllerDLegerSelfId：节点 id，必须属于 controllerDLegerPeers 中的一个；同 Group 内各个节点要唯一。
- controllerStorePath：controller 日志存储位置。controller 是有状态的，controller 重启或宕机需要依靠日志来恢复数据，该目录非常重要，不可以轻易删除。
- enableElectUncleanMaster：是否可以从 SyncStateSet 以外选举 Master，若为 true，可能会选取数据落后的副本作为 Master 而丢失消息，默认为 false。
- notifyBrokerRoleChanged：当 Broker 副本组上角色发生变化时是否主动通知，默认为 true。

参数设置完成后，指定配置文件启动 Nameserver 即可。

```bash
nohup sh bin/mqnamesrv -c namesrv.conf &
```

### Controller 独立部署

独立部署执行以下脚本即可

```shell
nohup sh bin/mqcontroller -c controller.conf &
```
mqcontroller 脚本在源码包 distribution/bin/mqcontroller，配置参数与内嵌模式相同。

:::caution 注意
独立部署Controller后，仍然需要单独部署NameServer提供路由发现能力
:::

## Broker 部署

Broker 启动方法与之前相同，增加以下参数

- enableControllerMode：Broker controller 模式的总开关，只有该值为 true，自动主从切换模式才会打开。默认为 false。
- controllerAddr：controller 的地址，多个 controller 中间用分号隔开。例如`controllerAddr = 127.0.0.1:9877;127.0.0.1:9878;127.0.0.1:9879`
- syncBrokerMetadataPeriod：向 controller 同步 Broker 副本信息的时间间隔。默认 5000（5s）。
- checkSyncStateSetPeriod：检查 SyncStateSet 的时间间隔，检查 SyncStateSet 可能会 shrink SyncState。默认5000（5s）。
- syncControllerMetadataPeriod：同步 controller 元数据的时间间隔，主要是获取 active controller 的地址。默认10000（10s）。
- haMaxTimeSlaveNotCatchup：表示 Slave 没有跟上 Master 的最大时间间隔，若在 SyncStateSet 中的 slave 超过该时间间隔会将其从 SyncStateSet 移除。默认为 15000（15s）。
- storePathEpochFile：存储 epoch 文件的位置。epoch 文件非常重要，不可以随意删除。默认在 store 目录下。
- allAckInSyncStateSet：若该值为 true，则一条消息需要复制到 SyncStateSet 中的每一个副本才会向客户端返回成功，可以保证消息不丢失。默认为 false。
- syncFromLastFile：若 slave 是空盘启动，是否从最后一个文件进行复制。默认为 false。
- asyncLearner：若该值为 true，则该副本不会进入 SyncStateSet，也就是不会被选举成 Master，而是一直作为一个 learner 副本进行异步复制。默认为false。
- inSyncReplicas：需保持同步的副本组数量，默认为1，allAckInSyncStateSet=true 时该参数无效。
- minInSyncReplicas：最小需保持同步的副本组数量，若 SyncStateSet 中副本个数小于 minInSyncReplicas 则 putMessage 直接返回 PutMessageStatus.IN_SYNC_REPLICAS_NOT_ENOUGH，默认为1。

在Controller模式下，Broker配置必须设置 enableControllerMode=true，并填写 controllerAddr，并以下面命令启动：

```shell
nohup sh bin/mqbroker -c broker.conf &
```

:::caution 注意
自动主备切换模式下Broker无需指定brokerId和brokerRole，其由Controller组件进行分配
:::

## 兼容性

该模式未对任何客户端层面 API 进行新增或修改，不存在客户端的兼容性问题。

Nameserver 本身能力未做任何修改，Nameserver 不存在兼容性问题。如开启 enableControllerInNamesrv 且 controller 参数配置正确，则开启 controller 功能。

Broker若设置 enableControllerMode=false，则仍然以之前方式运行。若设置 enableControllerMode=true，则需要部署 controller 且参数配置正确才能正常运行。

具体行为如下表所示：

|                             | 旧版 Nameserver | 旧版 Nameserver+独立部署 Controller | 新版 Nameserver 开启 controller功能 | 新版 Nameserver 关闭 controller 功能 |
|-----------------------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| 旧版 Broker                   | 正常运行，无法切换     | 正常运行，无法切换                     | 正常运行，无法切换                     | 正常运行，无法切换                      |
| 新版 Broker 开启 Controller 模式  | 无法正常上线        | 正常运行，可以切换                     | 正常运行，可以切换                     | 无法正常上线                         |
| 新版 Broker 不开启 Controller 模式 | 正常运行，无法切换     | 正常运行，无法切换                     | 正常运行，无法切换                     | 正常运行，无法切换                      |

## 升级注意事项

从上述兼容性表述可以看出，NameServer 正常升级即可，无兼容性问题。在不想升级 Nameserver 情况，可以独立部署 Controller 组件来获得切换能力。

针对 Broker 升级，分为两种情况：

（1）Master-Slave 部署升级成 Controller 切换架构

可以带数据进行原地升级，对于每组 Broker，停机主、备 Broker，**保证主、备的 CommitLog 对齐**（可以在升级前禁写该组 Broker 一段时间，或则通过拷贝方式保证一致），升级包后重新启动即可。

:::caution 注意
若主备 CommitLog 不对齐，需要保证主上线以后再上线备，否则可能会因为数据截断而丢失消息。
:::

（2）原 DLedger 模式升级到 Controller 切换架构

由于原 DLedger 模式消息数据格式与 Master-Slave 下数据格式存在区别，不提供带数据原地升级的路径。在部署多组 Broker 的情况下，可以禁写某一组 Broker 一段时间（只要确认存量消息被全部消费即可，比如根据消息的保存时间来决定），然后清空 store 目录下除 config/topics.json、subscriptionGroup.json 下（保留 topic 和订阅关系的元数据）的其他文件后，进行空盘升级。

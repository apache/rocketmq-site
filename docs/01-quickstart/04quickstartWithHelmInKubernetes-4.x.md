### QuickStart

本⽂介绍在kubernetesk环境下如何使⽤Helm快速部署⼀个单节点 RocketMQ-4.x版本的服务，并完成简单的消息收发。



#### 前提条件

- 一个运行中的 `Kubernetes` 集群
- 已安装的 `Helm 3.7.0+`
- 64位 `JDK 1.8+`



#### 第一步：安装 Helm

确保你的系统上已经安装了 Helm：

```bash
$ helm version
```

如果未安装 Helm（3.7.0以上版本），可以使用以下命令进行安装：

```bash
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```



#### 第二步：下载 RocketMQ Helm 仓库

```bash
$ cd /opt/helm/
$ helm pull oci://registry-1.docker.io/apache/rocketmq --version 0.0.1
$ tar -zxvf rocketmq-0.0.1.tgz
```



#### 第三步：部署 RocketMQ

使⽤ Helm chart 部署 RocketMQ。

```bash
#修改values.yaml中的配置（根据实际需求修改相关配置信息，如镜像版本，资源⼤⼩、副本数等，同时禁用proxy、controller功能）
$ helm install rocketmq-demo ./rocketmq  //修改镜像tag为4.9.6
#查看pod状态
$ kubectl get pods -o wide -n default
NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE   IP                NODE         NOMINATED NODE   READINESS GATES
default       rocketmq-demo-broker-0                      0/1     Running   0          19s   192.168.58.228    k8s-node02   <none>           <none>
default       rocketmq-demo-nameserver-6678bb86f6-62s5d   0/1     Running   0          19s   192.168.85.229    k8s-node01   <none>           <none>
```



#### 第四步：验证消息发送和接收

使用tools工具测试验证消息发送和接收。

``` bash
#登录pod内（需要管理工具），也可以在宿主机执行
$ kubectl exec -ti rocketmq-demo-broker-0  -- /bin/bash

#通过mqadmin创建 Topic
$ sh mqadmin updatetopic -t TopicTest -c DefaultCluster

#发送消息（pod内操作）
$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
SendResult [sendStatus=SEND_OK, msgId=7F00000100E60F6F4D334B52982103E7, offsetMsgId=C0A83AE400002A9F000000000002ECD2, messageQueue=MessageQueue [topic=TopicTest, brokerName=rocketmq-demo-broker-0, queueId=2], queueOffset=124]

#接收消息（pod内操作）
$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
ConsumeMessageThread_please_rename_unique_group_name_4_16 Receive New Messages: [MessageExt [brokerName=rocketmq-demo-broker-0, queueId=2, storeSize=192, queueOffset=124, sysFlag=0, bornTimestamp=1723734104097, bornHost=/192.168.58.228:40492, storeTimestamp=1723734104097, storeHost=/192.168.58.228:10911, msgId=C0A83AE400002A9F000000000002ECD2, commitLogOffset=191698, bodyCRC=638172955, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={MIN_OFFSET=0, MAX_OFFSET=125, CONSUME_START_TIME=1723734158990, UNIQ_KEY=7F00000100E60F6F4D334B52982103E7, CLUSTER=DefaultCluster, TAGS=TagA}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 57, 57], transactionId='null'}]]
```



#### 第五步：释放*rocketmq*资源

```bash
#释放所有rocketmq资源
$ helm uninstall rocketmq-demo
```


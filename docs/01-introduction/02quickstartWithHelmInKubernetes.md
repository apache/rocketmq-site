### QuickStart

#### 前提条件

- 一个运行中的 `Kubernetes` 集群
- 已安装并配置好的 `kubectl`
- 已安装的 `Helm`

#### 第一步：安装 Helm

确保你的系统上已经安装了 Helm：

```bash
$ helm version
```

如果未安装 Helm，可以使用以下命令进行安装：

```bash
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

#### 第二步：添加 RocketMQ Helm 仓库

添加 RocketMQ 的 Helm chart 仓库：

```bash
$ helm repo add rocketmq-repo https://helm-charts.itboon.top/rocketmq
$ helm repo update rocketmq-repo
```

#### 第三步：部署 RocketMQ

使用 Helm chart 部署 RocketMQ：

##### 关闭持久化存储：

```bash
#这里关闭持久化存储，仅演示部署效果
$ helm upgrade --install rocketmq \
  --namespace rocketmq-demo \
  --create-namespace \
  --set broker.persistence.enabled="false" \
  rocketmq-repo/rocketmq

#查看pod状态
$ kubectl get pods -o wide -n rocketmq-demo
```



##### 开启持久化存储：

```bash
## 这里开启持久化存储（部署2个master节点，0副本），使用宿主机磁盘存储（线上环境不推荐），仅演示部署效果 ##

#创建storageClass
$ touch storageClass.yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:                                                                                                                                                                      
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer

$ kubectl apply -f storageClass.yaml

#创建pv，用于master一个节点
$ touch pv-local.yaml 
apiVersion: v1
kind: PersistentVolume
metadata:
  name: broker-storage
spec:
  capacity:
    storage: 20Gi  # 替换为你的存储大小
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /mnt/data  # 替换为你的宿主机目录
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - k8s-node1   # 替换为你的节点名称
          - k8s-node2  # 替换为你的节点名称
          - k8s-node3  # 替换为你的节点名称

$ kubectl apply -f pv-local.yaml  

#创建pv，用于master另一个节点
$ touch pv2-local.yaml 
apiVersion: v1
kind: PersistentVolume
metadata:
  name: broker-storage-2
spec:
  capacity:
    storage: 20Gi    # 替换为你的存储大小
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /mnt/data    # 替换为你的宿主机目录
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - k8s-node1   # 替换为你的节点名称
          - k8s-node2  # 替换为你的节点名称
          - k8s-node3  # 替换为你的节点名称
        
$ kubectl apply -f pv2-local.yaml 

#查看pvc是否与pv绑定
$ kubectl get pvc -n rocketmq-demo

#查看pod状态
$ kubectl get pods -o wide -n rocketmq-demo
```



#### 第四步：验证消息发送和接收
使用工具测试验证消息发送和接收。

```bash
#登录pod内（需要管理工具），也可以在宿主机执行
$ kubectl exec -ti rocketmq-broker-master-0 -n rocketmq-demo -- /bin/bash

####发送消息（pod内操作），使用Producer默认发送1000条####
$ ./tools.sh org.apache.rocketmq.example.quickstart.Producer
SendResult [sendStatus=SEND_OK, msgId=AC1FDA4E02483AF49F1C02E4637003E7, offsetMsgId=AC1D833700002A9F0000000000075ADD, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-g1, queueId=1], queueOffset=499]

####接收消息（pod内操作）####
$ ./tools.sh org.apache.rocketmq.example.quickstart.Consumer
ConsumeMessageThread_please_rename_unique_group_name_4_12 Receive New Messages: [MessageExt [brokerName=broker-g1, queueId=1, storeSize=241, queueOffset=499, sysFlag=0, bornTimestamp=1717248522096, bornHost=/172.31.218.78:43132, storeTimestamp=1717248522100, storeHost=/172.29.131.55:10911, msgId=AC1D833700002A9F0000000000075ADD, commitLogOffset=482013, bodyCRC=638172955, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1717248522104, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FDA4E02483AF49F1C02E4637003E7, CLUSTER=rocketmq-helm, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 57, 57], transactionId='null'}]] 
```






更多详细的配置和选项，请参考 [RocketMQ Helm Chart 文档](https://github.com/itboon/rocketmq-helm)。

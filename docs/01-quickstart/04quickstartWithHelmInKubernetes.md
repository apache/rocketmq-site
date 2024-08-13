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



#### 第四步：验证安装

现在你可以使用客户端工具连接到 RocketMQ 进行消息的发送和接收。





更多详细的配置和选项，请参考 [RocketMQ Helm Chart 文档](https://github.com/itboon/rocketmq-helm)。
# Run RocketMQ with Kubernetes

This section describes how to quickly deploy a single-node RocketMQ 4.x service in a Kubernetes and perform simple message sending and receiving.


:::tip SYSTEM REQUIREMENTS

- A running Kubernetes cluster
- Installed Helm 3.7.0+
- 64-bit JDK 1.8+

:::


## 1.Install Helm

Make sure Helm is installed on your system:

```bash
$ helm version
```

If Helm (version 3.7.0 or above) is not installed, you can install it using the following command:

```bash
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```



## 2.Download RocketMQ Helm Chart

```bash
$ helm pull oci://registry-1.docker.io/apache/rocketmq --version 0.0.1 
$ tar -zxvf rocketmq-0.0.1.tgz
```


## 3.Deploy RocketMQ

Use the Helm chart to deploy RocketMQ.

```yaml
# Modify the configuration in values.yaml (adjust relevant configuration information according to actual needs, such as image version, resource size, number of replicas, etc., while disabling proxy and controller features)
$ vim values.yaml
## In values.yaml, modify parameters such as limits and requests in broker's resources to suitable sizes, and change the image tag to 4.9.6 ##
  resources:
    limits:
      cpu: 2
      memory: 10Gi
    requests:
      cpu: 2
      memory: 10Gi
##values.yaml##
```

```bash
$ helm install rocketmq-demo ./rocketmq
# Check pod status
# If the parameters are normal, it indicates successful deployment
$ kubectl get pods -o wide -n default
NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE   IP                NODE         NOMINATED NODE   READINESS GATES
default       rocketmq-demo-broker-0                      0/1     Running   0          19s   192.168.58.228    k8s-node02   <none>           <none>
default       rocketmq-demo-nameserver-6678bb86f6-62s5d   0/1     Running   0          19s   192.168.85.229    k8s-node01   <none>           <none>
```


## 4.Validate Message Sending and Receiving

Use tools to test and validate message sending and receiving.

``` bash
# Log into the pod (requires management tools), or you can execute on the host
$ kubectl exec -ti rocketmq-demo-broker-0  -- /bin/bash

# Create Topic via mqadmin
$ sh mqadmin updatetopic -t TopicTest -c DefaultCluster

# Send message (execute within the pod)
$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
SendResult [sendStatus=SEND_OK, msgId=7F00000100E60F6F4D334B52982103E7, offsetMsgId=C0A83AE400002A9F000000000002ECD2, messageQueue=MessageQueue [topic=TopicTest, brokerName=rocketmq-demo-broker-0, queueId=2], queueOffset=124]

# Receive message (execute within the pod)
$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
ConsumeMessageThread_please_rename_unique_group_name_4_16 Receive New Messages: [MessageExt [brokerName=rocketmq-demo-broker-0, queueId=2, storeSize=192, queueOffset=124, sysFlag=0, bornTimestamp=1723734104097, bornHost=/192.168.58.228:40492, storeTimestamp=1723734104097, storeHost=/192.168.58.228:10911, msgId=C0A83AE400002A9F000000000002ECD2, commitLogOffset=191698, bodyCRC=638172955, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={MIN_OFFSET=0, MAX_OFFSET=125, CONSUME_START_TIME=1723734158990, UNIQ_KEY=7F00000100E60F6F4D334B52982103E7, CLUSTER=DefaultCluster, TAGS=TagA}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 57, 57], transactionId='null'}]]
```


## 5.Release RocketMQ Resources

```bash
#Release all RocketMQ resources
$ helm uninstall rocketmq-demo
```


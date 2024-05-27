# Docker-compose 部署 RocketMQ 4.X

这一节介绍如何使用Docker-compose快速部署一个单节点单副本 RocketMQ 服务，并完成简单的消息收发。

:::tip 系统要求

1. 64位操作系统，推荐 Linux/Unix/macOS
2. 64位 JDK 1.8+

:::
## 1.创建映射目录
```shell
# 创建映射目录
mkdir -p  /docker/rocketmq/broker/logs
mkdir -p  /docker/rocketmq/broker/store
mkdir -p  /docker/rocketmq/nameserver/logs
mkdir -p  /docker/rocketmq/conf

# 给予权限
chmod -R 777 /docker/rocketmq
```
## 2.创建配置文件
```shell
# 创建配置文件broker.conf
vim /docker/rocketmq/conf/broker.conf
```
```text
# 集群名称
brokerClusterName = DefaultCluster
# 节点名称
brokerName = broker-a
# broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 
brokerId = 0
# 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04
deleteWhen = 04
# 以小时计算的文件保留时间 默认值72小时
fileReservedTime = 48
# Broker角色
brokerRole = ASYNC_MASTER
# 刷盘方式
flushDiskType = ASYNC_FLUSH
# Broker服务地址
brokerIP1 = xxx.xxx.xxx.xxx
```

## 3.编写docker-compose
为了快速启动并运行 RockerMQ 集群，您可以使用以下模板通过修改或添加环境部分中的配置来创建 docker-compose.yml 文件。
```text
version: '3.8'

services:
  rmqnamesrv:
    image: apache/rocketmq:4.9.6
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    volumes:
      - /docker/rocketmq/nameserver/logs:/home/rocketmq/logs
    networks:
      - rocketmq
    command: sh mqnamesrv

  rmqbroker:
    image: apache/rocketmq:4.9.6
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
      - 10912:10912
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    volumes:
      - /docker/rocketmq/broker/logs:/home/rocketmq/logs
      - /docker/rocketmq/broker/store:/home/rocketmq/store
      - /docker/rocketmq/conf:/home/rocketmq/conf
    depends_on:
      - rmqnamesrv
    networks:
      - rocketmq
    command: sh mqbroker -c /home/rocketmq/conf/broker.conf

networks:
  rocketmq:
    driver: bridge
```
## 4.启动RocketMQ集群
根据docker-compose.yml文件启动所有定义的服务。

```shell
docker-compose up -d
```

## 5.工具测试消息收发
```shell
# 进入broker容器
$ docker exec -it rmqbroker bash

$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

## 6.停止所有服务
```shell
docker-compose down
```
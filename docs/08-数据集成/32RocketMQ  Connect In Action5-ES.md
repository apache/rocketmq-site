# RocketMQ Connect实战5

Elsticsearch Source  -  >RocketMQ Connect  ->  Elasticsearch Sink

## 准备

### 启动RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x或以上版本;
4. 启动 [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);



**tips** : ${ROCKETMQ_HOME} 位置说明

>bin-release.zip 版本：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip 版本：/rocketmq-all-4.9.4-source-release/distribution


### 启动Connect


#### Connector插件编译

Elasticsearch RocketMQ Connector
```
$ cd rocketmq-connect/connectors/rocketmq-connect-elasticsearch/
$ mvn clean package -Dmaven.test.skip=true
```

将 Elasticsearch RocketMQ Connector 编译好的包放入Runtime加载目录。命令如下：
```
mkdir -p /usr/local/connector-plugins
cp rocketmq-connect-elasticsearch/target/rocketmq-connect-elasticsearch-1.0.0-jar-with-dependencies.jar /usr/local/connector-plugins
```


#### 启动Connect Runtime

```
cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

修改配置`connect-standalone.conf` ，重点配置如下
```
$ cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT
$ vim conf/connect-standalone.conf
```

```
workerId=standalone-worker
storePathRootDir=/tmp/storeRoot

## Http port for user to access REST API
httpPort=8082

# Rocketmq namesrvAddr
namesrvAddr=localhost:9876

# RocketMQ acl
aclEnable=false
accessKey=rocketmq
secretKey=12345678

autoCreateGroupEnable=false
clusterName="DefaultCluster"

# 核心配置，将之前编译好elasticsearch包的插件目录配置在此；
# Source or sink connector jar file dir,The default value is rocketmq-connect-sample
pluginPaths=/usr/local/connector-plugins
```


```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```

### Elasticsearch镜像

使用 docker 搭建环境 Elasticsearch 数据库
```
# starting a elasticsearch instance
docker run --name my-elasticsearch -p 9200:9200 -p 9300:9300 -e  "ES_JAVA_OPTS=-Xms1g -Xmx1g"  -d 74c2e0ec249c
```
### Kibana镜像

使用 docker 搭建环境 Kibana
```
docker run --name my-kibana -e ELASTICSEARCH_URL=http://192.168.0.101:9200 -p 5601:5601 -d 5dca66b41943
```


### 测试数据

通过 kibana Dev Tools 创建测试数据：参考 [console-ibana](https://www.elastic.co/guide/en/kibana/8.5/console-kibana.html#console-kibana);


源索引：connect_es

## 启动Connector

### 启动Elasticsearch source connector

同步源索引数据：connect_es
作用：通过解析 Elasticsearch 文档数据封装成通用的ConnectRecord对象，发送的RocketMQ Topic当中

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/elasticsearchSourceConnector -d  '{
  "connector.class":"org.apache.rocketmq.connect.elasticsearch.connector.ElasticsearchSourceConnector",
    "elasticsearchHost":"localhost",
    "elasticsearchPort":9200,
    "index":{
        "connect_es": {
            "primaryShards":1,
            "id":1
        }
    },
    "max.tasks":2,
    "connect.topicname":"ConnectEsTopic",
    "value.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter",
    "key.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter"
}'
```

### 启动 Elasticsearch sink connector

作用：通过消费Topic中的数据，写入到目标索引当中

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/ElasticsearchSinkConnector -d '{
  "connector.class":"org.apache.rocketmq.connect.elasticsearch.connector.ElasticsearchSinkConnector",
    "elasticsearchHost":"localhost",
    "elasticsearchPort":9202,
    "max.tasks":2,
    "connect.topicnames":"ConnectEsTopic",
    "value.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter",
    "key.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter"
}'

```

note：本地测试需要启动两个不同端口的Elasticsearch进程

以上两个Connector任务创建成功以后
通过访问sink指定的Elasticsearch是否包含数据

对源索引的新增数据
即可同步到目标索引当中



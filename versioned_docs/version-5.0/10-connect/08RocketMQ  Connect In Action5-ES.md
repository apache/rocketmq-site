# RocketMQ Connect实战5

Elasticsearch Source -> RocketMQ Connect ->  Elasticsearch Sink

## 准备

### 启动RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x或以上版本;
4. 启动 RocketMQ。使用[RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) 或
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/)版本均可;
5. 工具测试 RocketMQ 消息收发是否正常。详见[RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) 或
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/)文档。

这里利用环境变量NAMESRV_ADDR来告诉工具客户端RocketMQ的NameServer地址为localhost:9876

```shell
#$ cd distribution/target/rocketmq-4.9.7/rocketmq-4.9.7
$ cd distribution/target/rocketmq-5.1.4/rocketmq-5.1.4

$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

**说明**：RocketMQ具备自动创建Topic和Group的功能，在发送消息或订阅消息时，如果相应的Topic或Group不存在，RocketMQ会自动创建它们。因此不需要提前创建Topic和Group。

### 构建 Connector Runtime

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd  rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

### 构建 Elasticsearch Connector Plugin

```
cd $RMQ_CONNECT_HOME/connectors/rocketmq-connect-elasticsearch/

mvn clean package -Dmaven.test.skip=true
```

将 Elasticsearch RocketMQ Connector 编译好的包放入Runtime加载的Plugin目录
```
mkdir -p /Users/YourUsername/rocketmqconnect/connector-plugins
cp target/rocketmq-connect-elasticsearch-1.0.0-jar-with-dependencies.jar /Users/YourUsername/rocketmqconnect/connector-plugins
```

### 单机模式运行 Connector Worker

`connect-standalone.conf`中配置了RocketMQ连接地址等信息，需要根据使用情况进行修改

```
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

示例配置信息如下
```
workerId=standalone-worker
storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

## Http port for user to access REST API
httpPort=8082

# Rocketmq namesrvAddr
namesrvAddr=localhost:9876

# RocketMQ acl
aclEnable=false
#accessKey=rocketmq
#secretKey=12345678

clusterName="DefaultCluster"

# 插件地址，用于Worker加载Source/Sink Connector插件
pluginPaths=/Users/YourUsername/rocketmqconnect/connector-plugins
```

单机模式（standalone）下，RocketMQ Connect 会把同步位点信息持久化到本地文件目录 storePathRootDir
>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

如果想重置同步位点，则需要删除持久化的位点信息文件
```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

采用单机模式启动Connector Worker
```
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

### 搭建 Elasticsearch 服务

Elasticsearch是一个开源的实时分布式搜索和分析引擎。

这里为了方便演示，使用 docker 搭建 2个 Elasticsearch 数据库，分别作为 Connector 连接的源和目的端ES数据库。
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.1

docker run --name es1 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  -v /Users/YourUsername/rocketmqconnect/es/es1_data:/usr/share/elasticsearch/data \
  -d docker.elastic.co/elasticsearch/elasticsearch:7.15.1

docker run --name es2 -p 9201:9200 -p 9301:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  -v /Users/YourUsername/rocketmqconnect/es/es2_data:/usr/share/elasticsearch/data \
  -d docker.elastic.co/elasticsearch/elasticsearch:7.15.1
```

**docker命令说明**：
- --name es2: 为容器指定一个名称，本例中为es2。
- -p 9201:9200 -p 9301:9300: 将Elasticsearch的HTTP端口9200和传输端口9300分别映射到主机的9201和9301端口，以便可以通过主机访问Elasticsearch服务。
- -e "discovery.type=single-node": 设置Elasticsearch的发现类型为单节点模式，这对于单机部署非常适用。
- -v /Users/YourUsername/rocketmqconnect/es/es2_data:/usr/share/elasticsearch/data: 将主机上的一个目录挂载到容器内的/usr/share/elasticsearch/data目录，用于持久化存储Elasticsearch数据。

通过以上命令，您可以运行一个带有自定义配置和数据存储的Elasticsearch容器，并且可以通过主机的9200端口访问其HTTP API。这是在本地开发或测试环境中运行独立的Elasticsearch实例的常见方式。


查看ES日志，查看启动是否有报错
```
docker logs -f es1

docker logs -f es2
```

使用curl命令检查Elasticsearch是否正常

```
# check es1
curl -XGET http://localhost:9200

# check es2
curl -XGET http://localhost:9201
```

如果成功连接并且Elasticsearch已正常启动，您将看到与Elasticsearch相关的信息和版本号的JSON响应。

### 搭建 Kibana 服务

Kibana是一个开源的数据可视化工具，用于对Elasticsearch中存储的数据进行搜索、分析和可视化展示。
它提供了丰富的图表、图形和仪表盘等功能，使用户能够以直观的方式理解和探索数据。

这里为了方便演示，使用 docker 搭建 2个 Kibana 服务，分别连接前面搭建的2个ES数据库。

```
docker pull docker.elastic.co/kibana/kibana:7.15.1

docker run --name kibana1 --link es1:elasticsearch -p 5601:5601 -d docker.elastic.co/kibana/kibana:7.15.1

docker run --name kibana2 --link es2:elasticsearch -p 5602:5601 -d docker.elastic.co/kibana/kibana:7.15.1

```
**docker命令说明**：
- --name kibana2: 为容器指定一个名称，本例中为kibana2。
- --link es2:elasticsearch: 将容器链接到另一个名为es2的Elasticsearch容器。这将允许Kibana实例连接和与Elasticsearch进行通信。
- -p 5602:5601: 将Kibana的默认端口5601映射到主机的5602端口，以便可以通过主机访问Kibana的用户界面。
- -d: 在后台运行容器。

通过以上命令，您可以在Docker容器中启动一个独立的Kibana实例，并将其连接到另一个正在运行的Elasticsearch实例。
这样，您可以通过浏览器访问主机的5601、5602端口，来分别访问Kibana1、Kibana2控制台。

查看Kibana日志，查看启动是否有报错
```
docker logs -f kibana1

docker logs -f kibana2
```

使用浏览器访问 kibana 控制台，地址
- kibana1: http://localhost:5601
- kibana2：http://localhost:5602

如果控制台页面能正常打开，则说明Kibana已正常启动。

### 向源端ES写入测试数据
Kibana 的 Dev Tools 可以帮助您在 Kibana 中与 Elasticsearch 进行直接的交互和操作，执行各种查询和操作，并分析和理解返回的数据。
参见文档 [console-kibana](https://www.elastic.co/guide/en/kibana/8.9/console-kibana.html)。

#### 批量写入测试数据
浏览器访问Kibana1控制台，左侧菜单找到Dev Tools，进入页面后输入如下命令写入测试数据
```
POST /_bulk
{ "index" : { "_index" : "connect_es" } }
{ "id": "1", "field1": "value1", "field2": "value2" }
{ "index" : { "_index" : "connect_es" } }
{ "id": "2", "field1": "value3", "field2": "value4" }
```
**说明**：
- connect_es：数据的索引名称
- id/field1/field2：数据中的字段名称，1、value1、value2 分别是字段的值。

**注意**：`rocketmq-connect-elasticsearch` 存在一个限制，就是数据中必须要一个可用于 >= 比较运算的字段（字符串 或 数字），该字段会被用于记录同步的位点信息。
上面的示例中 `id` 字段，就是一个全局唯一、自增的数值类型字段。

#### 查数据
查询索引下的数据：
```
GET /connect_es/_search
{
  "size": 100
}
```

若无数据，则返回示例为：
```
{
  "error" : {
    ... 
    "type" : "index_not_found_exception",
    "reason" : "no such index [connect_es]",
    "resource.type" : "index_or_alias",
    "resource.id" : "connect_es",
    "index_uuid" : "_na_",
    "index" : "connect_es"
  },
  "status" : 404
}
```

若有数据，则返回示例为：

```
{
  ...
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "connect_es",
        "_type" : "_doc",
        "_id" : "_dx49osBb46Z9cN4hYCg",
        "_score" : 1.0,
        "_source" : {
          "id" : "1",
          "field1" : "value1",
          "field2" : "value2"
        }
      },
      {
        "_index" : "connect_es",
        "_type" : "_doc",
        "_id" : "_tx49osBb46Z9cN4hYCg",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "field1" : "value3",
          "field2" : "value4"
        }
      }
    ]
  }
}

```

#### 删除数据
如果因重复测试等原因，需要删除索引下的数据，则可使用如下命令
```
DELETE /connect_es
```

## 启动Connector

### 启动Elasticsearch source connector

运行以下命令启动 ES source connector，connector将会连接到ES读取 connect_es 索引下的文档数据，
并解析 Elasticsearch 文档数据封装成通用的ConnectRecord对象，发送到RocketMQ Topic当中， 供Sink Connector进行消费。

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

**说明**：启动命令中指定了源端ES要同步的索引为 connect_es ，以及 索引下自增的字段为 id ，并从id=1开始拉取数据。


curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"...

看到以下日志说明 file source connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector elasticsearchSourceConnector and set target state STARTED successed!!


### 启动 Elasticsearch sink connector
运行以下命令启动 ES sink connector，connector将会订阅RocketMQ Topic的数据进行消费，
并将每个消息转换为文档数据写入到目的端ES当中。

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/elasticsearchSinkConnector -d '{
  "connector.class":"org.apache.rocketmq.connect.elasticsearch.connector.ElasticsearchSinkConnector",
    "elasticsearchHost":"localhost",
    "elasticsearchPort":9201,
    "max.tasks":2,
    "connect.topicnames":"ConnectEsTopic",
    "value.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter",
    "key.converter":"org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter"
}'
```
**说明**：启动命令中指定了目的端ES地址和端口，对应之前docker启动的es2。


curl请求返回status:200则表示创建成功，返回样例：
>{"status":200,"body":{"connector.class":"...

看到以下日志说明 file source connector 启动成功了
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector elasticsearchSinkConnector and set target state STARTED successed!!

查看sink connector是否将数据写入了目的端ES的索引当中：
1. 浏览器访问 Kibana2 控制台地址 http://localhost:5602
2. Kibana2 Dev Tools 页面，查询索引下的数据，若跟源端 es1 中的数据一致则说明Connector运行正常。
```
GET /connect_es/_search
{
  "size": 100
}
```




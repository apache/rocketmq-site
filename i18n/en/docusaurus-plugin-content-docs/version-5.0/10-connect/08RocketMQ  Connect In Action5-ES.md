# RocketMQ Connect in Action 5

Elsticsearch Source  -  >RocketMQ Connect  ->  Elasticsearch Sink

## preparatory work

### Start RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x or later;
4. Start [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);



**tips** : ${ROCKETMQ_HOME} Position Description

>bin-release.zip version：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip versioon：/rocketmq-all-4.9.4-source-release/distribution


### Start Connect


#### Connector plugin compilation

Elasticsearch RocketMQ Connector
```
$ cd rocketmq-connect/connectors/rocketmq-connect-elasticsearch/
$ mvn clean package -Dmaven.test.skip=true
```

Move the compiled Elasticsearch RocketMQ Connector package into the Runtime load directory. The command is as follows:
```
mkdir -p /usr/local/connector-plugins
cp rocketmq-connect-elasticsearch/target/rocketmq-connect-elasticsearch-1.0.0-jar-with-dependencies.jar /usr/local/connector-plugins
```


#### Start Connect Runtime

```
cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

Update `connect-standalone.conf` ，Key configurations are as follows:
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

# Core configuration where the plugin directory where you compiled the elasticsearch package is located
# Source or sink connector jar file dir,The default value is rocketmq-connect-sample
pluginPaths=/usr/local/connector-plugins
```


```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```

### Elasticsearch Image

Use docker to build the Elasticsearch database
```
# starting a elasticsearch instance
docker run --name my-elasticsearch -p 9200:9200 -p 9300:9300 -e  "ES_JAVA_OPTS=-Xms1g -Xmx1g"  -d 74c2e0ec249c
```
### Kibana Image

Use docker to build the Kibana environment
```
docker run --name my-kibana -e ELASTICSEARCH_URL=http://192.168.0.101:9200 -p 5601:5601 -d 5dca66b41943
```


### test data

Create test data with kibana Dev Tools: reference [console-ibana](https://www.elastic.co/guide/en/kibana/8.5/console-kibana.html#console-kibana);


Source Index：connect_es

## Start Connector

### Start Elasticsearch source connector

Synchronizing source index data: connect_es
effect：Send a RocketMQ Topic by parsing Elasticsearch document data and wrapping it into a generic ConnectRecord object

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

### Start Elasticsearch sink connector

effect：Data is written to the target index by consuming the Topic

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

note：Local testing requires you to start the Elasticsearch process on two different ports

After the two Connector tasks are successfully created Whether the Elasticsearch specified by accessing sink contains data

New data added to the source index can be synchronized to the target index


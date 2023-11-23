# RocketMQ Connect in Action 5

Elasticsearch Source -> RocketMQ Connect ->  Elasticsearch Sink

## preparatory work

### Start RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x+;
4. Start RocketMQ. Either [RocketMQ 4.x](https://rocketmq.apache.org/docs/4.x/) or
   [RocketMQ 5.x](https://rocketmq.apache.org/docs/quickStart/01quickstart/) 5.x version can be used;
5. Test RocketMQ message sending and receiving using the tool.

Here, use the environment variable NAMESRV_ADDR to inform the tool client of the NameServer address of RocketMQ as localhost:9876.

```shell
#$ cd distribution/target/rocketmq-4.9.7/rocketmq-4.9.7
$ cd distribution/target/rocketmq-5.1.4/rocketmq-5.1.4

$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```

**Note**: RocketMQ has the feature of automatically creating Topic and Group. When sending or subscribing to messages,
if the corresponding Topic or Group does not exist, RocketMQ will automatically create them. Therefore,
there is no need to create Topic and Group in advance.

Here's the English translation of the content:

### Building the Connector Runtime

Clone the repository and build the RocketMQ Connect project:

```shell
git clone https://github.com/apache/rocketmq-connect.git

cd rocketmq-connect

export RMQ_CONNECT_HOME=`pwd`

mvn -Prelease-connect -Dmaven.test.skip=true clean install -U
```

### Build Elasticsearch Connector Plugin
Build the Elasticsearch RocketMQ Connector plugin:

```shell
cd $RMQ_CONNECT_HOME/connectors/rocketmq-connect-elasticsearch/

mvn clean package -Dmaven.test.skip=true
```

Copy the compiled Elasticsearch RocketMQ Connector plugin JAR file into the plugin directory used by the runtime:

```shell
mkdir -p /Users/YourUsername/rocketmqconnect/connector-plugins

cp target/rocketmq-connect-elasticsearch-1.0.0-jar-with-dependencies.jar /Users/YourUsername/rocketmqconnect/connector-plugins
```

### Run Connector Worker in Standalone Mode

Modify the `connect-standalone.conf` file to configure the RocketMQ connection
address and other information.

```shell
cd $RMQ_CONNECT_HOME/distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

vim conf/connect-standalone.conf
```

Example configuration information is as follows:
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

# Plugin path for loading Source/Sink Connectors
pluginPaths=/Users/YourUsername/rocketmqconnect/connector-plugins
```

In standalone mode, RocketMQ Connect persistently stores the synchronization checkpoint information
in the local file directory specified by storePathRootDir.

>storePathRootDir=/Users/YourUsername/rocketmqconnect/storeRoot

If you want to reset the synchronization checkpoint, delete the persistence files:
```shell
rm -rf /Users/YourUsername/rocketmqconnect/storeRoot/*
```

To start Connector Worker in standalone mode:
```
sh bin/connect-standalone.sh -c conf/connect-standalone.conf &
```

### Set Up Elasticsearch Services

Elasticsearch is an open-source search and analytics engine.

We'll use two separate Docker instances of Elasticsearch to serve as our source and destination databases:

```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.1

docker run --name es1 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \  
-v /Users/YourUsername/rocketmqconnect/es/es1_data:/usr/share/elasticsearch/data \  
-d docker.elastic.co/elasticsearch/elasticsearch:7.15.1 

docker run --name es2 -p 9201:9200 -p 9301:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \ 
-v /Users/YourUsername/rocketmqconnect/es/es2_data:/usr/share/elasticsearch/data \ 
-d docker.elastic.co/elasticsearch/elasticsearch:7.15.1
```

Explanation of Docker commands:

- `--name es2`: Specifies a name for the container, e.g., `es2`.
- `-p 9201:9200 -p 9301:9300`: Maps ports 9200 and 9300 on the Elasticsearch container to host ports 9201 and 9301 so that the Elasticsearch service can be accessed via the host.
- `-e discovery.type=single-node`: configures Elasticsearch to work on a single node without discovering other nodes in a cluster, suitable for single-server deployment.
- `-v /Users/YourUsername/rocketmqconnect/es/es2_data:/usr/share/elasticsearch/data`: Mounts a directory on the host to `/usr/share/elasticsearch/data` within the container for persistent storage of Elasticsearch data.

This runs a custom-configured instance of Elasticsearch with persistent data storage on a container accessible through port 9200 on the host machine, making it useful for development or testing environments on a local machine.

View the Elasticsearch logs:

```
docker logs -f es1

docker logs -f es2
```

Verify that Elasticsearch has started successfully:

```
# Check Elasticsearch instance 1
curl -XGET http://localhost:9200

# Check Elasticsearch instance 2
curl -XGET http://localhost:9201
```

A successful connection and correct operation will result in JSON responses containing information
about Elasticsearch and its version number.

### Set Up Kibana Services
Kibana is an open-source data visualization tool that allows users to interactively explore
and understand data stored within Elasticsearch clusters. It offers rich features such as charts, graphs, and dashboards.

For convenience, we'll set up two separate instances of Kibana in Docker and link them to
our previously established Elasticsearch containers using the following command:

```
docker pull docker.elastic.co/kibana/kibana:7.15.1

docker run --name kibana1 --link es1:elasticsearch -p 5601:5601 -d docker.elastic.co/kibana/kibana:7.15.1

docker run --name kibana2 --link es2:elasticsearch -p 5602:5601 -d docker.elastic.co/kibana/kibana:7.15.1
```

Explanation of Docker Commands:
- `--name kibana2`: Assigns a name to the new container, e.g., kibana2
- `--link es2:elasticsearch`: Links the container to another named Elasticsearch instance (in this case, 'es2'). This enables communication between Kibana and Elasticsearch.
- `-p 5602:5601`: Maps Kibana's default port (5601) to the same port on the host machine to make it accessible through the browser.
- `-d`: runs the Docker container in detached mode.

Once the container has launched, you can monitor its log output:

```
docker logs -f kibana1

docker logs -f kibana2
```


To access Kibana console pages, simply visit following addresses in your browser
- kibana1: http://localhost:5601
- kibana2：http://localhost:5602

If they load correctly, it indicates successful startup of the respective Kibana instances.

### Write Test Data to the Source Elasticsearch
Kibana's Dev Tools can help you interact and operate directly with Elasticsearch in Kibana.
You can execute various queries and operations, analyze and understand the returned data.
Refer to the documentation  [console-kibana](https://www.elastic.co/guide/en/kibana/8.9/console-kibana.html).

#### Bulk Write Test Data
Access the Kibana1 console through the browser, find Dev Tools from the left menu,
and enter the following commands on the page to write test data:

```
POST /_bulk
{ "index" : { "_index" : "connect_es" } }
{ "id": "1", "field1": "value1", "field2": "value2" }
{ "index" : { "_index" : "connect_es" } }
{ "id": "2", "field1": "value3", "field2": "value4" }
```

**Note**:
- connect_es: The index name for the data.
- id/field1/field2: These are field names, and 1, value1, value2 represent the values for the fields.

**Note**: There is a limitation in `rocketmq-connect-elasticsearch`, which requires a field in the data that
can be used for >= comparison operations (string or number). This field will be used to record the
synchronization checkpoint. In the above example, the `id` field is a globally unique, incrementing numerical field.

#### Query Data
To query data within an index, use the following command:
```
GET /connect_es/_search
{
  "size": 100
}
```

If there is no data available, the response will be:
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

If there is data available, the response will be:
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

#### Delete Data

If you need to delete data within an index due to repeated testing or other reasons, you can use the following command:

```
DELETE /connect_es
```

## Start Connector

### Start Elasticsearch Source Connector
Run the following command to start the ES source connector. The connector will connect to Elasticsearch
and read document data from the connect_es index. It will parse the Elasticsearch document data and
package it into a generic ConnectRecord object, which will be sent to a RocketMQ topic for consumption by the Sink Connector.

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

**Note**: The startup command specifies that the source ES should synchronize the connect_es index,
and the incrementing field in the index is id. Data will be fetched starting from id=1.

If the curl request returns status:200, it indicates a successful creation, and the sample response will be:
>{"status":200,"body":{"connector.class":"...

If you see the following logs, it indicates that the file source connector has started successfully.
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector elasticsearchSourceConnector and set target state STARTED successed!!

### Start Elasticsearch Sink Connector
Run the following command to start the ES sink connector. The connector will subscribe to data from
the RocketMQ topic and consume it. It will convert each message into document data and write it to the destination ES.

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

**Note**: The startup command specifies the address and port of the destination ES, which corresponds to
the previously started ES2 in Docker.

If the curl request returns status:200, it indicates a successful creation, and the sample response will be:

>{"status":200,"body":{"connector.class":"...

If you see the following logs, it indicates that the file source connector has started successfully:
```shell
tail -100f ~/logs/rocketmqconnect/connect_runtime.log
```

>Start connector elasticsearchSinkConnector and set target state STARTED successed!!

To check if the sink connector has written data to the destination ES index:

1. Access the Kibana2 console address in the browser: http://localhost:5602
2. In the Kibana2 Dev Tools page, query the data within the index. If it matches the data in the source ES1, it means the connector is running properly.

```
GET /connect_es/_search
{
  "size": 100
}
```




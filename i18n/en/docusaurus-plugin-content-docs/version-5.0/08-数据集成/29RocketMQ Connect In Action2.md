# RocketMQ Connect in Action 2

PostgreSQL Source(CDC)  -  >RocketMQ Connect  ->  MySQL Sink(JDBC)

## Preparation

### Start RocketMQ

1. Linux/Unix/Mac
2. 64bit JDK 1.8+;
3. Maven 3.2.x+;
4. Start [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);

**tips** : ${ROCKETMQ_HOME} locational instructions

>bin-release.zip version：/rocketmq-all-4.9.4-bin-release
>
>source-release.zip version：/rocketmq-all-4.9.4-source-release/distribution


### Start Connect


#### Compiling Connector Plugin

Debezium RocketMQ Connector

```
$ cd rocketmq-connect/connectors/rocketmq-connect-debezium/
$ mvn clean package -Dmaven.test.skip=true
```

Move the compiled Debezium PostgreSQL RocketMQ Connector package into the Runtime loading directory. The command is as follows ：

```
mkdir -p /usr/local/connector-plugins
cp rocketmq-connect-debezium-postgresql/target/rocketmq-connect-debezium-postgresql-0.0.1-SNAPSHOT-jar-with-dependencies.jar /usr/local/connector-plugins
```

JDBC Connector

Move the compiled JDBC Connector package into the Runtime loading directory. The command is as follows：

```
$ cd rocketmq-connect/connectors/rocketmq-connect-jdbc/
$ mvn clean package -Dmaven.test.skip=true
cp rocketmq-connect-jdbc/target/rocketmq-connect-jdbc-0.0.1-SNAPSHOT-jar-with-dependencies.jar /usr/local/connector-plugins

```

#### Start Connect Runtime

```
cd  rocketmq-connect

mvn -Prelease-connect -DskipTests clean install -U

```

Modify the configuration `connect-standalone.conf`, the main configuration is as follows

```shell
$ cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT
$ vim conf/connect-standalone.conf
```

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

# Core configuration, configure the plugin directory of the previously compiled debezium package here
# Source or sink connector jar file dir,The default value is rocketmq-connect-sample
pluginPaths=/usr/local/connector-plugins
```


```
cd distribution/target/rocketmq-connect-0.0.1-SNAPSHOT/rocketmq-connect-0.0.1-SNAPSHOT

sh bin/connect-standalone.sh -c conf/connect-standalone.conf &

```

### Postgres image

Use debezium's Postgres docker environment to set up the Postgres database

```
# starting a pg instance
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=start_data_engineer -e POSTGRES_PASSWORD=password debezium/postgres:14

# bash into postgres instance
docker exec -ti postgres /bin/bash
```

Postgres information
Port：5432
Aaccount：start_data_engineer/password
Synchronize original database：bank.holding
Target database table：bank1.holding

### MySQL image

Use debezium's MySQL docker environment to set up the MySQL database.

```
docker run -it --rm --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=debezium -e MYSQL_USER=mysqluser -e MYSQL_PASSWORD=mysqlpw quay.io/debezium/example-mysql:1.9
```

MySQL information

Port：3306

Account：root/debezium


### Test data

Log in to the database with the start_data_engineer/password account

Source database table：bank.holding

```
CREATE SCHEMA bank;
SET search_path TO bank,public;
CREATE TABLE bank.holding (
                              holding_id int,
                              user_id int,
                              holding_stock varchar(8),
                              holding_quantity int,
                              datetime_created timestamp,
                              datetime_updated timestamp,
                              primary key(holding_id)
);
ALTER TABLE bank.holding replica identity FULL;
insert into bank.holding values (1000, 1, 'VFIAX', 10, now(), now());
\q
insert into bank.holding values (1000, 1, 'VFIAX', 10, now(), now());
insert into bank.holding values (1001, 2, 'SP500', 1, now(), now());
insert into bank.holding values (1003, 3, 'SP500', 1, now(), now());
update bank.holding set holding_quantity = 300 where holding_id=1000;

```

Target database table：bank1.holding

```
create database bank1;
CREATE TABLE holding (
                          holding_id int,
                          user_id int,
                          holding_stock varchar(8),
                          holding_quantity int,
                          datetime_created bigint,
                          datetime_updated bigint,
                          primary key(holding_id)
);

```

## Start Connector

### Start Debezium source connector

Synchronize original table data：bank.holding
Purpose: Parse Postgres binlog and encapsulate it into a common ConnectRecord object, which is sent to the RocketMQ Topic.

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/postgres-connector -d  '{
  "connector.class": "org.apache.rocketmq.connect.debezium.postgres.DebeziumPostgresConnector",
  "max.task": "1",
  "connect.topicname": "debezium-postgres-source-01",
  "kafka.transforms": "Unwrap",
  "kafka.transforms.Unwrap.delete.handling.mode": "none",
  "kafka.transforms.Unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
  "kafka.transforms.Unwrap.add.headers": "op,source.db,source.table",
  "database.history.skip.unparseable.ddl": true,
  "database.server.name": "bankserver1",
  "database.port": 5432,
  "database.hostname": "database ip",
  "database.connectionTimeZone": "UTC",
  "database.user": "start_data_engineer",
  "database.dbname": "start_data_engineer",
  "database.password": "password",
  "table.whitelist": "bank.holding",
  "key.converter": "org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter",
  "value.converter": "org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter"
}'
```

### Start JDBC sink connector

Purpose: Consume data from the Topic and write it to the target table through JDBC protocol.

```
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8082/connectors/jdbcmysqlsinktest201 -d '{
  "connector.class": "org.apache.rocketmq.connect.jdbc.connector.JdbcSinkConnector",
  "max.task": "2",
  "connect.topicnames": "debezium-postgres-source-01",
  "connection.url": "jdbc:mysql://database ip:3306/bank1",
  "connection.user": "root",
  "connection.password": "debezium",
  "pk.fields": "holding_id",
  "table.name.from.header": "true",
  "pk.mode": "record_key",
  "insert.mode": "UPSERT",
  "db.timezone": "UTC",
  "table.types": "TABLE",
  "errors.deadletterqueue.topic.name": "dlq-topic",
  "errors.log.enable": "true",
  "errors.tolerance": "ALL",
  "delete.enabled": "true",
  "key.converter": "org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter",
  "value.converter": "org.apache.rocketmq.connect.runtime.converter.record.json.JsonConverter"
}'

```

After the creation of the above two Connector tasks, log in to the database using the start_data_engineer/password account.

Any add, delete, or modification made to the source database table `bankholding` will be synced to the target table `bank1.holding`.


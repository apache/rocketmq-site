# 日志配置

客户端日志用于记录客户端运行过程中的异常，帮助快速定位和修复问题。本文介绍 RocketMQ 的客户端日志的打印方式，以及默认和自定义配置。 

## 打印客户端日志 
RocketMQ 的 TCP Java SDK 基于 SLF4J 接口编程。 
- 针对 JavaSDK1.7.8.Final 版本及以上 

RocketMQ 的 Java SDK 1.7.8.Final 已内置了日志实现，无需在客户端应用中添加日志实现依赖 即可打印 RocketMQ 客户端日志。 
RocketMQ客户端日志的默认配置和如何修改默认配置，请参见下文的客户端日志配置部分。 
- 针对 JavaSDK1.7.8.Final  以下 

RocketMQ 的Java SDK 1.7.8.Final 以下的旧版本不支持 log4j2，只支持 log4j、logback。您需要 在 pom.xml 配置文件 或者 lib 中添加对应的日志实现依赖来打印 RocketMQ 客户端日志。 

### 方式一: 依赖 log4j 作为日志实现 
依赖log4j或logback作为日志实现的示例代码如下所示。

```xml
<dependency> 
  <groupId>org.slf4j</groupId> 
  <artifactId>jcl-over-slf4j</artifactId> 
  <version>1.7.7</version>
</dependency> 
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.7.7</version>
</dependency> 
<dependency>
  <groupId>log4j</groupId> 
  <artifactId>log4j</artifactId>
  <version>1.2.17</version> 
</dependency>
```

使用 log4j 属性配置文件时，配置如下。

```properties
log4j.appender.mq=org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender 
log4j.appender.mq.Tag=yourTag 
log4j.appender.mq.Topic=yourLogTopic 
log4j.appender.mq.ProducerGroup=yourLogGroup 
log4j.appender.mq.NameServerAddress=yourRocketmqNameserverAddress 
log4j.appender.mq.layout=org.apache.log4j.PatternLayout 
log4j.appender.mq.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-4r [%t] (%F:%L) %-5p - %m%n 
```

使用 log4j xml 配置文件时，将其配置为这样并添加一个异步附加程序：
```xml
<appender name="mqAppender1" class="org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender">
    <param name="Tag" value="yourTag" />
    <param name="Topic" value="yourLogTopic" />
    <param name="ProducerGroup" value="yourLogGroup" />
    <param name="NameServerAddress" value="yourRocketmqNameserverAddress"/>
    <layout class="org.apache.log4j.PatternLayout">
        <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss}-%p %t %c - %m%n" />
    </layout>
</appender>

<appender name="mqAsyncAppender1" class="org.apache.log4j.AsyncAppender">
    <param name="BufferSize" value="1024" />
    <param name="Blocking" value="false" />
    <appender-ref ref="mqAppender1"/>
</appender>
```
使用 log4j2 时，配置为 this。如果你想要 noneblock，只需为 ref 配置一个 asyncAppender。

```xml
<RocketMQ name="rocketmqAppender" producerGroup="yourLogGroup" nameServerAddress="yourRocketmqNameserverAddress"
     topic="yourLogTopic" tag="yourTag">
    <PatternLayout pattern="%d [%p] hahahah %c %m%n"/>
</RocketMQ>
```

### 方式二: 依赖 logback 作为日志实现 

```xml
<dependency> 
  <groupId>ch.qos.logback</groupId> 
  <artifactId>logback-core</artifactId> 
  <version>1.1.2</version>
</dependency> 
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId> 
  <version>1.1.2</version> 
</dependency>
```

```xml
<dependency> 
  <groupId>ch.qos.logback</groupId> 
  <artifactId>logback-core</artifactId> 
  <version>1.1.2</version>
</dependency> 
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId> 
  <version>1.1.2</version> 
</dependency>
```
:::tip
应用中同时依赖log4j和logback的日志实现会造成日志冲突导致客户端日志打印混乱。确保 应用只依赖其中一个日志实现，是正确打印RocketMQ客户端日志的前提条件，建议通过```mvn 
clean dependency:tree | grep log```命令排查。 
:::

## 客户端日志配置

RocketMQ 客户端支持自定义日志保存路径、日志级别以及保存历史日志文件的最大个数。考虑到日志传输以及阅读的便利性，暂不允许自定义单个日志文件大小，仍保持默认的64 MB。各参数的配置说明如下：

| 参数                          | 说明                                                         | 配置参数                        | 自定义取值                                                   |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------ |
| 日志保存路径                  | 请确保应用进程有对该路径写的权限，否则日志 不会打印。        | rocketmq.client.logRoot         | 可自定义为您需要将日志文件保存到本地的路径。请确保您的应用进程有该路径的写权限，否则日志无法打印。 |
| 保存历史日志文件的最大个数    | 支持1到100之前的数值;若输入的值超出该范围 或格式错误，则系统默认保存10个。 | rocketmq.client.logFileMaxIndex | 取值如下：**ERROR****WARN****INFO****DEBUG**                 |
| 日志级别                      | 支持ERROR、WARN、INFO、DEBUG中任何一 种，不匹配默认INFO。    | rocketmq.client.logLevel        | 取值范围：1~100。若设置的值超出该范围或格式错误，则以系统默认值（10个）为准。 |
| 单个文件日志大小              | 支持以bytes为单位指定                                        | rocketmq.client.logFileMaxSize  | 取值在0~1GB, 默认1GB, 建议64 MB                              |
| logback是否使用父级logger打印 | children-logger是否使用 rootLogger配置的appender进行输出     | rocketmq.client.log.additive    | true/false                                                   |
| 使用项目的slf4j实现记录日志   | 如果需要实现记录日志 则为true                                | rocketmq.client.logUseSlf4j     | true/flase                                                   |

## 默认配置

请确保应用进程有对该路径写的权限，否则日志 不会打印。 支持 1 到 100 之前的数值;若输入的值超出该范围 或格式错误，则系统默认保存10个。 支持 ERROR、WARN、INFO、DEBUG 中任何一 种，不匹配默认 INFO。 

RocketMQ 客户端启动后，会按照如下的默认配置生成日志文件 :						

-  日志保存路径:/{user.home}/logs/rocketmqlogs/ 其中{user.home}是指启动当前Java进程的用 户的根目录				
-  保存历史日志文件的最大个数:10个  						
-  日志级别:INFO  						
-  单个日志文件大小:  1GB						

## 自定义配置

如果需要进行自定义配置 参考 ClientLogger的静态变量定义, 参数意义对齐上文客户端配置。

```java
    public static final String CLIENT_LOG_USESLF4J = "rocketmq.client.logUseSlf4j";
    public static final String CLIENT_LOG_ROOT = "rocketmq.client.logRoot";
    public static final String CLIENT_LOG_MAXINDEX = "rocketmq.client.logFileMaxIndex";
    public static final String CLIENT_LOG_FILESIZE = "rocketmq.client.logFileMaxSize";
    public static final String CLIENT_LOG_LEVEL = "rocketmq.client.logLevel";
    public static final String CLIENT_LOG_ADDITIVE = "rocketmq.client.log.additive";
    public static final String CLIENT_LOG_FILENAME = "rocketmq.client.logFileName";
    public static final String CLIENT_LOG_ASYNC_QUEUESIZE = "rocketmq.client.logAsyncQueueSize";
    public static final String ROCKETMQ_CLIENT_APPENDER_NAME = "RocketmqClientAppender";

    private static final InternalLogger CLIENT_LOGGER;

    private static final boolean CLIENT_USE_SLF4J;

    //private static Appender rocketmqClientAppender = null;

    static {
        CLIENT_USE_SLF4J = Boolean.parseBoolean(System.getProperty(CLIENT_LOG_USESLF4J, "false"));
        if (!CLIENT_USE_SLF4J) {
            InternalLoggerFactory.setCurrentLoggerType(InnerLoggerFactory.LOGGER_INNER);
            CLIENT_LOGGER = createLogger(LoggerName.CLIENT_LOGGER_NAME);
            createLogger(LoggerName.COMMON_LOGGER_NAME);
            createLogger(RemotingHelper.ROCKETMQ_REMOTING);
        } else {
            CLIENT_LOGGER = InternalLoggerFactory.getLogger(LoggerName.CLIENT_LOGGER_NAME);
        }
    }
```


## 示例

以下是一个简单示例

在启动脚本中或者IDE的VM options中添加如下系统参数: 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux示例" label="Linux示例" default >

```
-Drocketmq.client.logRoot=/home/admin/logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20  -Drocketmq.client.logFileMaxSize=67108864
```
</TabItem>
<TabItem value="windows示例" label="windows示例">

```
-Drocketmq.client.logRoot=D:\logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20 -Drocketmq.client.logFileMaxSize=67108864
```

</TabItem>

</Tabs>
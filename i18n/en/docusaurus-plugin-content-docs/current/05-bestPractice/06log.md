# Logging Confituration

Client logs are used to record exceptions that occur during the client's operation, helping to quickly locate and fix problems. This article introduces the way to print RocketMQ client logs and the default and custom configurations.

## Printing Client Log
RocketMQ's TCP Java SDK is programmed using the SLF4J interface.
- For Java SDK version 1.7.8.Final and above

RocketMQ's Java SDK version 1.7.8.Final already has built-in log implementation and no log implementation dependency needs to be added in the client application to print RocketMQ client logs. For more information on default configuration and how to change it, refer to the client log configuration section below.
- For Java SDK version 1.7.8.Final and below

Older versions of RocketMQ's Java SDK prior to version 1.7.8.Final do not support log4j2 and only support log4j and logback. You will need to add the corresponding log implementation dependency in the pom.xml configuration file or in the lib to print RocketMQ client logs.

### 1: Depend on log4j as the log implementation
Example code for depending on log4j or logback as the log implementation is shown below.

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

When using log4j property configuration file, configure it as follows.

```properties
log4j.appender.mq=org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender 
log4j.appender.mq.Tag=yourTag 
log4j.appender.mq.Topic=yourLogTopic 
log4j.appender.mq.ProducerGroup=yourLogGroup 
log4j.appender.mq.NameServerAddress=yourRocketmqNameserverAddress 
log4j.appender.mq.layout=org.apache.log4j.PatternLayout 
log4j.appender.mq.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-4r [%t] (%F:%L) %-5p - %m%n 
```

When using log4j xml configuration file, configure it as such and add an asynchronous appender:
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
When using log4j2, configure it as this. If you want noneblock, simply configure a asyncAppender for ref.

```xml
<RocketMQ name="rocketmqAppender" producerGroup="yourLogGroup" nameServerAddress="yourRocketmqNameserverAddress"
     topic="yourLogTopic" tag="yourTag">
    <PatternLayout pattern="%d [%p] hahahah %c %m%n"/>
</RocketMQ>
```

### 2: Depend on logback as the log implementation

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
Having both log4j and logback log implementations in the application will cause log conflicts and result in confusion in client log printing. Make sure the application only depends on one log implementation, which is the prerequisite for correctly printing RocketMQ client logs. It is recommended to check this using the command **`mvn clean dependency:tree | grep log`**.
:::

## Client log configuration

The RocketMQ client supports customizing the log save path, log level, and maximum number of historical log files to save. To ensure convenience in log transfer and reading, customizing the size of a single log file is currently not allowed and remains at the default of 64 MB. The configuration instructions for each parameter are as follows:

| Parameter                                             | Explain                                                      | Configuration parameter         | Custom value                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------ |
| Log save path                                         | Please make sure that the application process has write permission to the specified path, otherwise the log will not be printed. | rocketmq.client.logRoot         | You can customize the path where you want to save the log files locally. Please make sure that your application process has write permission to that path, otherwise the log will not be printed. |
| Maximum number of historical log files to save        | The supported value range is between 1 to 100; if the input value is outside of this range or in the wrong format, the system will default to saving 10 logs. | rocketmq.client.logFileMaxIndex | The value range is 1~100. If the value set is out of range or in the wrong format, the default value (10) will be used. |
| Log level                                             | The supported log levels are ERROR, WARN, INFO, DEBUG, if no match is found the default is INFO. | rocketmq.client.logLevel        | Values：**ERROR WARN INFO DEBUG**                            |
| Size of a single log file                             | Support specifying in bytes                                  | rocketmq.client.logFileMaxSize  | The value range is 0~1GB, the default is 1GB, it is recommended to use 64 MB |
| Whether to use parent logger to print logback         | Whether children-logger use the appender configured by rootLogger for output | rocketmq.client.log.additive    | true/false                                                   |
| Use the project's slf4j implementation to record logs | If need to implement log recording, set it to true           | rocketmq.client.logUseSlf4j     | true/flase                                                   |

## Default configuration

Please make sure that the application process has write permission to the specified path, otherwise the log will not be printed. The supported value range is between 1 to 100; if the input value is outside of this range or in the wrong format, the system will default to saving 10 logs. The supported log levels are ERROR, WARN, INFO, DEBUG, if no match is found the default is INFO.

When the RocketMQ client starts, log files will be generated according to the following default configuration:

-  Log save path: `/{user.home}/logs/rocketmqlogs/`, where `{user.home}` refers to the root directory of the user who starts the current Java process
-  Maximum number of historical log files to save: 10
-  Log level: INFO
-  Size of a single log file: 1GB		

## Custom configuration

If need to customize the configuration, refer to the static variable definition of ClientLogger, and the parameter meaning aligns with the client configuration above.

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


## Example

Below is a simple example

Add the following system parameters in the startup script or IDE's VM options:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Linux Example" label="Linux Example" default >

```
-Drocketmq.client.logRoot=/home/admin/logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20  -Drocketmq.client.logFileMaxSize=67108864
```
</TabItem>
<TabItem value="windows Example" label="windows Example">

```
-Drocketmq.client.logRoot=D:\logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20 -Drocketmq.client.logFileMaxSize=67108864
```

</TabItem>

</Tabs>
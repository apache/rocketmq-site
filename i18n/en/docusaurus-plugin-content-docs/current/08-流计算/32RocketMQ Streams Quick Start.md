# RocketMQ Streams 快速开始

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)


## RocketMQ Streams工程中运行
参考RocketMQ Streams工程rocketmq-streams-examples中文档：[examples](https://github.com/apache/rocketmq-streams/tree/main/rocketmq-streams-examples)

rocketmq-streams-examples模块下程序可以直接运行（某些例子需要启动RocketMQ）。

## RocketMQ Streams以SDK方式被应用依赖
### 环境准备
- 64bit JDK 1.8及以上
- Maven 3.2及以上
- 本地启动RocketMQ，[启动文档](https://rocketmq.apache.org/docs/quick-start/)

### 构建RocketMQ Streams

```shell
git clone https://github.com/apache/rocketmq-streams.git
cd rocketmq-streams
mvn clean -DskipTests install -U
```
### 添加pom依赖

```xml
 <dependencies>
    <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-streams-clients</artifactId>
          <!--替换成最新版本-->
        <version>${version}</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.2.1</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <minimizeJar>false</minimizeJar>
                        <shadedArtifactAttached>true</shadedArtifactAttached>
                        <artifactSet>
                            <includes>
                                <include>org.apache.rocketmq:rocketmq-streams-clients</include>
                            </includes>
                        </artifactSet>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### 编写流计算程序
```java
public class Demo{
    private static String topicName = "topic-1";
    private static String groupName = "groupName-1";

    public static void main(String[] args) {
        DataStreamSource source = StreamBuilder.dataStream("namespace", "pipeline");
       
        source.fromRocketmq(
                        topicName,
                        groupName,
                        NAMESRV_ADDRESS
                )
                .map(message -> JSONObject.parseObject((String) message))
                .filter(message -> ((JSONObject) message).getInteger("score") > 90)
                .selectFields("name", "subject")
                .toPrint()
                .start();

    }
}
```

### 向RocketMQ topic-1中写入数据并观察结果
如果向topic-1中写入的数据如下：
```xml
{"name":"张三","class":"3","subject":"数学","score":90}
{"name":"张三","class":"3","subject":"历史","score":81}
{"name":"张三","class":"3","subject":"英语","score":91}
{"name":"张三","class":"3","subject":"语文","score":70}
{"name":"张三","class":"3","subject":"政治","score":84}
{"name":"张三","class":"3","subject":"地理","score":99}
{"name":"李四","class":"3","subject":"数学","score":76}
{"name":"李四","class":"3","subject":"历史","score":83}
{"name":"李四","class":"3","subject":"英语","score":82}
{"name":"李四","class":"3","subject":"语文","score":92}
{"name":"李四","class":"3","subject":"政治","score":97}
{"name":"李四","class":"3","subject":"地理","score":89}
{"name":"王五","class":"3","subject":"数学","score":86}
{"name":"王五","class":"3","subject":"历史","score":88}
{"name":"王五","class":"3","subject":"英语","score":86}
{"name":"王五","class":"3","subject":"语文","score":93}
{"name":"王五","class":"3","subject":"政治","score":99}
{"name":"王五","class":"3","subject":"地理","score":88}
```
得到结果如下：
```xml
{"subject":"政治","name":"王五"}
{"subject":"地理","name":"张三"}
{"subject":"语文","name":"李四"}
{"subject":"语文","name":"王五"}
{"subject":"英语","name":"张三"}
{"subject":"政治","name":"李四"}
```


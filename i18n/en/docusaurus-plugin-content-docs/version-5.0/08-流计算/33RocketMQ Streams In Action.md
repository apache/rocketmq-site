# RocketMQ Streams 实战


## 背景
分布式链路追踪能实时、准确的追踪每一次请求经过的服务节点和每个节点的耗时，能帮忙快速定位错误根因，因此被广泛地运用在智能运维领域。那么，如何将分布式链路追踪系统产生的数据实时、准确的计算展示出来，
就成为搭建分布式链路追踪系统的关键所在。

分布式链路追踪系统中有下面几个核心概念：
- traceId：唯一对应一次请求。
- span：一次请求中某两个关键方法之间的调用，一次请求只有一个traceId，但是可以有多个span。
  - spanId： 唯一标识一个span；
  - parentSpanId：标识当前span的上一个span的spanId是多少；
  
运用上述概念，将一次请求中所产生的数据，处理成请求拓扑图或者链式调用图。由于分布式链路追踪系统产生的数量大、处理延迟要求低（延迟太高的请求链路信息对排查线上问题帮助会减弱），批量处理已经不能满足要求，必须使用流计算。

输入数据如下所示，需要将下列数据处理成一个调用链。
```json
{
    "empty":false,
    "labels":[
        "68e51083e737a3f7d9c9e7ab34b1f6a7"
    ],
    "spanIndex":{
        "0.1.1":{
            "appId":"1_1@811c06548ae3a13",
            "clientAppId":"1_1@10b8d040e1d0f78",
            "clientIp":"xx.xxx.xxx.xx",
            "elapsed":1,
            "httpStatusCode":"",
            "kind":"sr",
            "orgId":"1",
            "parentSpanId":"0.1",
            "resultCode":"0",
            "serverAppId":"1_1@811c06548ae3a13",
            "serverIp":"xx.xxx.xxx.xx",
            "spanId":"0.1.1",
            "timestamp":1657511940232,
            "traceId":"ea1bef7f5a16575119402287990d0018"
        }
    },
    "traceId":"ea1bef7f5a16575119402287990d0018"
}
```
```json
{
    "empty":false,
    "labels":[
        "68e51083e737a3f7d9c9e7ab34b1f6a7"
    ],
    "spanIndex":{
        "0.1":{
            "appId":"1_1@10b8d040e1d0f78",
            "clientAppId":"1_1@a48b12f3ecc3d60",
            "clientIp":"xx.xxx.xxx.xx",
            "elapsed":14,
            "httpStatusCode":"200",
            "kind":"sr",
            "orgId":"1",
            "parentSpanId":"0",
            "resultCode":"0",
            "serverAppId":"1_1@10b8d040e1d0f78",
            "serverIp":"xx.xxx.xxx.xx",
            "spanId":"0.1",
            "timestamp":1657511940232,
            "traceId":"ea1bef7f5a16575119402287990d0018"
        }
    },
    "traceId":"ea1bef7f5a16575119402287990d0018"
}
```
```json
{
    "empty":false,
    "labels":[
        "e118372a87c3d7af811e08c6eea829c6"
    ],
    "spanIndex":{
        "0":{
            "appId":"1_1@a48b12f3ecc3d60",
            "clientAppId":"",
            "clientIp":"",
            "elapsed":20,
            "httpStatusCode":"200",
            "kind":"sr",
            "orgId":"1",
            "parentSpanId":"",
            "resultCode":"0",
            "serverAppId":"1_1@a48b12f3ecc3d60",
            "serverIp":"xx.xxx.xxx.xx",
            "spanId":"0",
            "timestamp":1657511940228,
            "traceId":"ea1bef7f5a16575119402287990d0018"
        }
    },
    "traceId":"ea1bef7f5a16575119402287990d0018"
}
```
```json
{
    "empty":false,
    "labels":[
        "68e51083e737a3f7d9c9e7ab34b1f6a7"
    ],
    "spanIndex":{
        "0.1.2":{
            "appId":"1_1@811c06548ae3a13",
            "clientAppId":"1_1@10b8d040e1d0f78",
            "clientIp":"xx.xxx.xxx.xx",
            "elapsed":5,
            "httpStatusCode":"",
            "kind":"sr",
            "orgId":"1",
            "parentSpanId":"0.1",
            "resultCode":"0",
            "serverAppId":"1_1@811c06548ae3a13",
            "serverIp":"xx.xxx.xxx.xx",
            "spanId":"0.1.2",
            "timestamp":1657511940234,
            "traceId":"ea1bef7f5a16575119402287990d0018"
        }
    },
    "traceId":"ea1bef7f5a16575119402287990d0018"
}
```

上述数据经过一定简化，去掉不必要字段，也只有一个traceId，实际生产中会同时存在多个traceId，但是处理原理一样。为了得到调用链，需要先对traceId进行分组，
分组之后，同一组内数据traceId相同，需要对多个span按照调用顺序进行排序，最后输出。这样的输出结果中就包含了一次调用的所有span，可以清晰地标识出这次请求每个span
节点耗时多久，如果请求有错误发生，也会知道错误发生在哪里。下面展示RocketMQ Streams是如何处理这些数据的。


## 搭建集群

### 启动RocketMQ

- Linux/Unix/Mac 
- 64bit JDK 1.8+; 
- Maven 3.2.x或以上版本; 
- 启动 [RocketMQ](https://rocketmq.apache.org/docs/quick-start/);

### 本地安装RocketMQ-streams

```shell
git clone https://github.com/apache/rocketmq-streams.git
cd rocketmq-streams
mvn clean -DskipTests install -U
```

### 构建流计算程序

- 新建IDE工程
- 添加pom依赖
```xml
 <dependencies>
    <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-streams-clients</artifactId>
          <!--替换成本地install的rocketmq-streams-->
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



- 编写流计算程序
```java
public class UserTest {
    public static void main(String[] args) {
        DataStreamSource source = StreamBuilder.dataStream("namespace", "pipeline");

      source.fromRocketmq(
                      "traceTopic",
                      "traceGroup",
                      true,
                      "127.0.0.1:9876")
              .map((message -> {
                JSONObject spanIndex = (JSONObject) ((JSONObject) message).get("spanIndex");
                JSONObject span = (JSONObject) spanIndex.getInnerMap().values().stream().findFirst().get();

                Object spanId = span.get("spanId");
                Object parentSpanId = span.get("parentSpanId");

                ((JSONObject) message).put("spanId", spanId);
                ((JSONObject) message).put("parentSpanId", parentSpanId);

                return message;
              }))
              .window(SessionWindow.of(Time.seconds(5)))
              .groupBy("traceId")
              //同一traceId中，原始数据中的spanIndex字段数据，放在一起形成新的字段traceList，达到一个traceId包含属于该trace的多个span的目的。
              .addUDAF(new TestUDAF(), "traceList", "spanIndex")
              .setLocalStorageOnly(true)
              .toDataStream()
              .forEach(new ForEachFunction<JSONObject>() {
                  @Override
                  public void foreach(JSONObject data) {
                      //对同一trace中的span进行排序，使span顺序符合请求发生顺序
                      JSONArray traceList = (JSONArray) data.get("traceList");
                      HashMap<String, Object> totalMap = new HashMap<>();
  
                      Iterator<Object> iterator = traceList.stream().iterator();
                      while (iterator.hasNext()) {
                          String next = (String) iterator.next();
                          JSONObject spanItem = JSON.parseObject(next);
    
                          Set<String> keySet = spanItem.keySet();
                          for (String key : keySet) {
                            totalMap.put(key, spanItem);
                          }
                      }
  
                      ArrayList<String> temp = new ArrayList<>(totalMap.keySet());
                      Collections.sort(temp);
  
                      traceList.clear();
                      for (String sortKey : temp) {
                          traceList.add(totalMap.get(sortKey));
                      }
                  }
              })
              .toPrint(1)
              .with(WindowStrategy.highPerformance())
              .start();
    }
}
```

```java
public class TestUDAF implements IAccumulator<List<String>, TestUDAF.Trace> {
    public static class Trace {
        public List<String> result = new ArrayList<>();
    }

    @Override
    public Trace createAccumulator() {
        return new Trace();
    }

    @Override
    public List<String> getValue(Trace accumulator) {
        return accumulator.result;
    }

    @Override
    public void accumulate(Trace accumulator, Object... parameters) {
        if (parameters == null || parameters.length == 0) {
            return;
        }
        if (parameters.length != 1) {
            throw new IllegalArgumentException("parameters length must be one");
        }

        JSONObject param = (JSONObject) parameters[0];
        String result = param.toJSONString();

        if (accumulator == null) {
            accumulator = new Trace();
        }

        accumulator.result.add(result);
    }

    @Override
    public void merge(Trace accumulator, Iterable<Trace> its) {

    }

    @Override
    public void retract(Trace accumulator, String... parameters) {

    }
    
}
```

- 输出结果：
  结果中，一条数据包含一个trace，即一次请求所产生的数据，请求中多个span按照请求发生顺序排列。
```json
{
    "traceId":"ea1bef7f5a16575119402287990d0018",
    "start_time":"2022-10-08 15:56:22",
    "traceList":[
        {
            "0":{
                "traceId":"ea1bef7f5a16575119402287990d0018",
                "kind":"sr",
                "resultCode":"0",
                "clientAppId":"",
                "parentSpanId":"",
                "orgId":"1",
                "elapsed":20,
                "spanId":"0",
                "appId":"1_1@a48b12f3ecc3d60",
                "clientIp":"",
                "serverAppId":"1_1@a48b12f3ecc3d60",
                "serverIp":"xx.xxx.xxx.xx",
                "httpStatusCode":"200",
                "timestamp":1657511940228
            }
        },
        {
            "0.1":{
                "traceId":"ea1bef7f5a16575119402287990d0018",
                "kind":"sr",
                "resultCode":"0",
                "clientAppId":"1_1@a48b12f3ecc3d60",
                "parentSpanId":"0",
                "orgId":"1",
                "elapsed":14,
                "spanId":"0.1",
                "appId":"1_1@10b8d040e1d0f78",
                "clientIp":"xx.xxx.xxx.xx",
                "serverAppId":"1_1@10b8d040e1d0f78",
                "serverIp":"xx.xxx.xxx.xx",
                "httpStatusCode":"200",
                "timestamp":1657511940232
            }
        },
        {
            "0.1.1":{
                "traceId":"ea1bef7f5a16575119402287990d0018",
                "kind":"sr",
                "resultCode":"0",
                "clientAppId":"1_1@10b8d040e1d0f78",
                "parentSpanId":"0.1",
                "orgId":"1",
                "elapsed":1,
                "spanId":"0.1.1",
                "appId":"1_1@811c06548ae3a13",
                "clientIp":"xx.xxx.xxx.xx",
                "serverAppId":"1_1@811c06548ae3a13",
                "serverIp":"xx.xxx.xxx.xx",
                "httpStatusCode":"",
                "timestamp":1657511940232
            }
        },
        {
            "0.1.2":{
                "traceId":"ea1bef7f5a16575119402287990d0018",
                "kind":"sr",
                "resultCode":"0",
                "clientAppId":"1_1@10b8d040e1d0f78",
                "parentSpanId":"0.1",
                "orgId":"1",
                "elapsed":5,
                "spanId":"0.1.2",
                "appId":"1_1@811c06548ae3a13",
                "clientIp":"xx.xxx.xxx.xx",
                "serverAppId":"1_1@811c06548ae3a13",
                "serverIp":"xx.xxx.xxx.xx",
                "httpStatusCode":"",
                "timestamp":1657511940234
            }
        }
    ],
    "fire_time":"2022-10-08 15:56:29",
    "end_time":"2022-10-08 15:56:29"
}
```
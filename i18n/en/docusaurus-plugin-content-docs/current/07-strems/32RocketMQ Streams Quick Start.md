# RocketMQ Streams Quick Start


## Run in the RocketMQ Streams project
Refer to the RocketMQ Streams project rocketmq-streams-examples module for programs that can be run directly. Steps to run the example:
* Start RocketMQ 5.0 or above locally.
* Use mqAdmin to create the data source topic in the example.
* Start the example.
* Write appropriate data to the source topic of RocketMQ (as determined by the example).

## RocketMQ Streams is applied as a dependency in SDK form
### Prepare the environment
- 64bit JDK 1.8+
- Maven 3.2+
- Start RocketMQ locally，[Startup documentation](https://rocketmq.apache.org/docs/quick-start/)

### Build RocketMQ Streams


### Add pom dependency

```xml
 <dependencies>
    <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-streams</artifactId>
            <!-- Modify as needed -->
        <version>1.1.0</version>
    </dependency>
</dependencies>
```

### Write stream computing program
```java
public class WordCount {
    public static void main(String[] args) {
        StreamBuilder builder = new StreamBuilder("wordCount");

        builder.source("sourceTopic", total -> {
                    String value = new String(total, StandardCharsets.UTF_8);
                    return new Pair<>(null, value);
                })
                .flatMap((ValueMapperAction<String, List<String>>) value -> {
                    String[] splits = value.toLowerCase().split("\\W+");
                    return Arrays.asList(splits);
                })
                .keyBy(value -> value)
                .count()
                .toRStream()
                .print();

        TopologyBuilder topologyBuilder = builder.build();

        Properties properties = new Properties();
        properties.put(MixAll.NAMESRV_ADDR_PROPERTY, "127.0.0.1:9876");

        RocketMQStream rocketMQStream = new RocketMQStream(topologyBuilder, properties);

        final CountDownLatch latch = new CountDownLatch(1);

        Runtime.getRuntime().addShutdownHook(new Thread("wordcount-shutdown-hook") {
            @Override
            public void run() {
                rocketMQStream.stop();
                latch.countDown();
            }
        });

        try {
            rocketMQStream.start();
            latch.await();
        } catch (final Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }
}
```

### Write data to the RocketMQ sourceTopic and observe the results
If the data written to the sourceTopic is as follows: each line of data is sent as a message;
```xml
"To be, or not to be,--that is the question:--",
"Whether 'tis nobler in the mind to suffer",
"The slings and arrows of outrageous fortune",
"Or to take arms against a sea of troubles,",
"And by opposing end them?--To die,--to sleep,--",
"No more; and by a sleep to say we end",
"The heartache, and the thousand natural shocks",
"That flesh is heir to,--'tis a consummation",
```
Count the frequency of words, and the calculation results are as follows:
```xml
(key=to, value=1)
(key=be, value=1)
(key=or, value=1)
(key=not, value=1)
(key=to, value=2)
(key=be, value=2)
(key=that, value=1)
(key=is, value=1)
(key=the, value=1)
(key=whether, value=1)
(key=tis, value=1)
(key=nobler, value=1)
(key=mind, value=1)
(key=against, value=1)
(key=troubles, value=1)
(key=slings, value=1)
(key=die, value=1)
(key=natural, value=1)
(key=flesh, value=1)
(key=sea, value=1)
(key=fortune, value=1)
(key=shocks, value=1)
(key=consummation, value=1)
(key=to, value=3)
(key=to, value=4)
(key=to, value=5)
(key=say, value=1)
(key=end, value=1)
(key=end, value=2)
(key=to, value=6)
(key=to, value=7)
(key=to, value=8)
(key=or, value=2)
(key=them, value=1)
(key=take, value=1)
(key=arms, value=1)
(key=of, value=1)
(key=and, value=1)
(key=of, value=2)
(key=and, value=2)
(key=by, value=1)
(key=sleep, value=1)
(key=and, value=3)
(key=by, value=2)
(key=sleep, value=2)
(key=and, value=4)
(key=that, value=2)
(key=arrows, value=1)
(key=heir, value=1)
(key=question, value=1)
(key=is, value=2)
(key=the, value=2)
(key=suffer, value=1)
(key=a, value=1)
(key=the, value=3)
(key=no, value=1)
(key=a, value=2)
(key=opposing, value=1)
(key=the, value=4)
(key=the, value=5)
(key=a, value=3)
(key=in, value=1)
(key=more, value=1)
(key=heartache, value=1)
(key=outrageous, value=1)
(key=we, value=1)
(key=thousand, value=1)
(key=tis, value=2)
```


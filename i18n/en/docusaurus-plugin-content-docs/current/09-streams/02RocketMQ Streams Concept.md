# RocketMQ Streams Core Concept

## Domain model

### StreamBuilder

![img_2.png](..\picture\33rocketmq-streams\领域模型-1.png)

* An instance of StreamBuilder has 1 to N pipelines, where a pipeline represents a data processing path.
* A pipeline can contain 1 to N processing nodes, called GroupNodes. 
* An instance of StreamBuilder also has a TopologyBuilder, which can construct data processors. 
* Each JobId corresponds to one instance of StreamBuilder.

### RocketMQStream

![img_2.png](..\picture\33rocketmq-streams\领域模型-2.png)

* An instance of RocketMQStream has a TopologyBuilder for building topologies
* An instance of RocketMQStream can instantiate 1 to N worker threads
* Each thread, represented by a WorkerThread instance, contains an engine
* An engine contains all the logic for executing data processing and includes a consumer instance, a producer instance, and a StateStore instance.

### Stream Processing Instance

A Stream Processing Instance represents a process running RocketMQ Streams;

* An instance of Stream Processing contains one StreamBuilder, one RocketMQStream, one topology, and one or multiple pipelines.


## StreamBuilder

+ ```StreamBuilder(jobId)``` build instance；
+ ```<OUT> RStream<OUT> source(topicName, deserializer) ``` define source topic and deserialization method；


## RStream

+ ```<K> GroupedStream<K, T> keyBy(selectAction)``` group the data by specific field；
+ ```<O> RStream<O> map(mapperAction)``` transform data one-to-one；
+ ```RStream<T> filter(predictor)``` filter the data
+ ```<VR> RStream<T> flatMap(mapper)```transform data one-to-many；
+ ```<T2> JoinedStream<T, T2> join(rightStream)``` Perform a two-stream join；
+ ```sink(topicName, serializer)``` output the results to a specific topic；


## GroupedStream

Operations on data that has the same key

+ ```<OUT> GroupedStream<K, Integer> count(selectAction)``` counts the number of data entries that contain a certain field.
+ ```GroupedStream<K, V> min(selectAction)``` calculates the minimum value of a certain field.
+ ```GroupedStream<K, V> max(selectAction)``` calculates the maximum value of a certain field.
+ ```GroupedStream<K, ? extends Number> sum(selectAction)``` calculates the sum of a certain field.
+ ```GroupedStream<K, V> filter(predictor)``` filters a certain field.
+ ```<OUT> GroupedStream<K, OUT> map(valueMapperAction)``` performs one-to-one data transformation.
+ ```<OUT> GroupedStream<K, OUT> aggregate(accumulator)``` performs aggregate operations on the data, and supports second-order aggregation, such as adding data before a window triggers and calculating results when the window triggers.
+ ```WindowStream<K, V> window(windowInfo)``` defines a window for the stream.
+ ```GroupedStream<K, V> addGraphNode(name, supplier)``` adds a custom operator to the stream processing topology at a low-level interface.
+ ```RStream<V> toRStream()``` converts to RStream, only converting in terms of interface and not affecting the data.
+ ```sink(topicName, serializer)``` writes the results to a topic in a custom serialization format.


## WindowStream

Operations on data that has been divided into windows

+ ```WindowStream<K, Integer> count()``` counts the number of data entries in the window.
+ ```WindowStream<K, V> filter(predictor)``` filters the data in the window.
+ ```<OUT> WindowStream<K, OUT> map(mapperAction)``` performs one-to-one data transformation on the data in the window.
+ ```<OUT> WindowStream<K, OUT> aggregate(aggregateAction)```  performs many-to-one data transformation on the data in the window.
+ ```<OUT> WindowStream<K, OUT> aggregate(accumulator)``` performs aggregate operations on the data in the window, and supports second-order aggregation, such as adding data before a window triggers and calculating results when the window triggers.
+ ```void sink(topicName, serializer)``` writes the results to a topic in a custom serialization format.


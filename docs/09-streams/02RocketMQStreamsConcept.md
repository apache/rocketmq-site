# RocketMQ Streams 核心概念

## 领域模型

### StreamBuilder
![img_2.png](../picture/33rocketmq-streams/领域模型-1.png)
  
* 一个StreamBuilder实例，有1到N个pipeline，pipeline表示一个数据处理路径；
* 一个pipeline可以含有1到N个处理节点GroupNode；
* 一个StreamBuilder实例，有一个TopologyBuilder，TopologyBuilder可构建出数据处理器processor； 
* 一个JobId对应一个StreamBuilder实例。

### RocketMQStream
![img_2.png](../picture/33rocketmq-streams/领域模型-2.png)

* 一个RocketMQStream实例，有一个拓扑构建器TopologyBuilder； 
* 一个RocketMQStream实例，可实例化1到N个worker线程; 
* 每个线程WorkerThread实例，包含一个engine； 
* 一个engine包含执行数据处理的所有逻辑，包含一个consumer实例、一个producer实例、一个StateStore实例;

### 流处理实例
流处理实例表示一个运行RocketMQ Streams的进程；

* 一个流处理实例包含一个StreamBuilder，一个RocketMQStream，一个拓扑图，一到多个pipeline；


## StreamBuilder
+ ```StreamBuilder(jobId)``` 构建实例；
+ ```<OUT> RStream<OUT> source(topicName, deserializer) ``` 定义source topic 和反序列化方式；


## RStream
+ ```<K> GroupedStream<K, T> keyBy(selectAction)``` 按照特定字段分组；
+ ```<O> RStream<O> map(mapperAction)``` 对数据进行一对一转化；
+ ```RStream<T> filter(predictor)``` 对数据进行过滤
+ ```<VR> RStream<T> flatMap(mapper)```对数据进行一对多转化；
+ ```<T2> JoinedStream<T, T2> join(rightStream)``` 双流Join；
+ ```sink(topicName, serializer)``` 将结果输出到特定topic；


## GroupedStream
对含有相同Key的数据进行操作
+ ```<OUT> GroupedStream<K, Integer> count(selectAction)``` 统计含有某个字段数据的个数；
+ ```GroupedStream<K, V> min(selectAction)``` 对某个字段统计最小值；
+ ```GroupedStream<K, V> max(selectAction)``` 对某个字段统计最大值；
+ ```GroupedStream<K, ? extends Number> sum(selectAction)``` 对某个字段统计和；
+ ```GroupedStream<K, V> filter(predictor)``` 对某个字段进行过滤；
+ ```<OUT> GroupedStream<K, OUT> map(valueMapperAction)``` 对数据进行一对一转化；
+ ```<OUT> GroupedStream<K, OUT> aggregate(accumulator)``` 对数据进行聚合操作，且聚合支持二阶聚合，例如在窗口未触发时添加数据，在窗口触发时计算结果这类算子；
+ ```WindowStream<K, V> window(windowInfo)``` 对窗口划定window；
+ ```GroupedStream<K, V> addGraphNode(name, supplier)``` 底层接口，向流处理拓扑中增加自定义算子；
+ ```RStream<V> toRStream()``` 转化为RStream，只是在接口形式上转化，对数据无任何操作；
+ ```sink(topicName, serializer)``` 按照自定义序列化形式将结果写出到topic；


## WindowStream
对被划分window的数据进行操作
+ ```WindowStream<K, Integer> count()``` 统计窗口内数据个数；
+ ```WindowStream<K, V> filter(predictor)``` 过滤窗口内数据；
+ ```<OUT> WindowStream<K, OUT> map(mapperAction)``` 对窗口内数据一对一转化；
+ ```<OUT> WindowStream<K, OUT> aggregate(aggregateAction)``` 对窗口内数据多对一转化；
+ ```<OUT> WindowStream<K, OUT> aggregate(accumulator)``` 对数据进行聚合操作，且聚合支持二阶聚合，例如在窗口未触发时添加数据，在窗口触发时计算结果这类算子；
+ ```void sink(topicName, serializer)``` 按照自定义序列化形式将结果写出到topic；



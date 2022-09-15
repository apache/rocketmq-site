# Admin Tool

:::tip 注意

1. 执⾏命令⽅法：./mqadmin {command} {args}
2. ⼏乎所有命令都需要配置 -n 表⽰ NameServer 地址，格式为 ip:port
3. ⼏乎所有命令都可以通过 -h 获取帮助
4. 如果既有 Broker 地址（-b）配置项又有 clusterName（-c）配置项，则优先以
   Broker 地址执⾏命令，如果不配置 Broker 地址，则对集群中所有主机执⾏命令，只
   ⽀持⼀个 Broker 地址。-b 格式为 ip:port，port 默认是 10911
5. 在 tools 下可以看到很多命令，但并不是所有命令都能使⽤，只有在
   MQAdminStartup 中初始化的命令才能使⽤，你也可以修改这个类，增加或⾃定义
   命令
6. 由于版本更新问题，少部分命令可能未及时更新，遇到错误请直接阅读相关命令源码
:::



## Topic 相关
<details><summary>Topic 相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={185} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={132} style={{ height: "99.0pt" }}>
      <td
        rowSpan={8}
        height={593}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "444.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        updateTopic
      </td>
      <td
        rowSpan={8}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        创建更新Topic配置
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -b
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Broker 地址，表示 topic 所在 Broker，只支持单台Broker，地址为ip:port
      </td>
    </tr>
    <tr height={132} style={{ height: "99.0pt" }}>
      <td
        height={132}
        className="xl65"
        width={149}
        style={{ height: "99.0pt", width: "112pt" }}
      >
        -c
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        cluster 名称，表示 topic 所在集群（集群可通过 clusterList 查询）
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h-
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={76} style={{ height: "57.0pt" }}>
      <td
        height={76}
        className="xl65"
        width={149}
        style={{ height: "57.0pt", width: "112pt" }}
      >
        -p
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        指定新topic的读写权限( W=2|R=4|WR=6 )
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={149}
        style={{ height: "29.0pt", width: "112pt" }}
      >
        -r
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        可读队列数（默认为 8）
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={149}
        style={{ height: "29.0pt", width: "112pt" }}
      >
        -w
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        可写队列数（默认为 8）
      </td>
    </tr>
    <tr height={95} style={{ height: "71.0pt" }}>
      <td
        height={95}
        className="xl65"
        width={149}
        style={{ height: "71.0pt", width: "112pt" }}
      >
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称（名称只能使用字符 ^[a-zA-Z0-9_-]+$ ）
      </td>
    </tr>
    <tr height={132} style={{ height: "99.0pt" }}>
      <td
        rowSpan={4}
        height={307}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "230.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        deleteTopic
      </td>
      <td
        rowSpan={4}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        删除Topic
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -c
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        cluster 名称，表示删除某集群下的某个 topic （集群 可通过 clusterList
        查询）
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={95} style={{ height: "71.0pt" }}>
      <td
        height={95}
        className="xl65"
        width={149}
        style={{ height: "71.0pt", width: "112pt" }}
      >
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称（名称只能使用字符 ^[a-zA-Z0-9_-]+$ ）
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={3}
        height={287}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "215.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        topicList
      </td>
      <td
        rowSpan={3}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        查看 Topic 列表信息
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={207} style={{ height: "155.0pt" }}>
      <td
        height={207}
        className="xl65"
        width={149}
        style={{ height: "155.0pt", width: "112pt" }}
      >
        -c
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        不配置-c只返回topic列表，增加-c返回clusterName, topic,
        consumerGroup信息，即topic的所属集群和订阅关系，没有参数
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={3}
        height={103}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "77.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        topicRoute
      </td>
      <td
        rowSpan={3}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        查看 Topic 路由信息
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={3}
        height={103}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "77.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        topicStatus
      </td>
      <td
        rowSpan={3}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        查看 Topic 消息队列offset
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={3}
        height={103}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "77.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        topicClusterList
      </td>
      <td
        rowSpan={3}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        查看 Topic 所在集群列表
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={6}
        height={518}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "380pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        updateTopicPerm
      </td>
      <td
        rowSpan={6}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        更新 Topic 读写权限
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={132} style={{ height: "99.0pt" }}>
      <td
        height={132}
        className="xl65"
        width={149}
        style={{ height: "99.0pt", width: "112pt" }}
      >
        -b
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Broker 地址，表示 topic 所在 Broker，只支持单台Broker，地址为ip:port
      </td>
    </tr>
    <tr height={76} style={{ height: "57.0pt" }}>
      <td
        height={76}
        className="xl65"
        width={149}
        style={{ height: "57.0pt", width: "112pt" }}
      >
        -p
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        指定新 topic 的读写权限( W=2|R=4|WR=6 )
      </td>
    </tr>
    <tr height={207} style={{ height: "155.0pt" }}>
      <td
        height={207}
        className="xl65"
        width={149}
        style={{ height: "155.0pt", width: "112pt" }}
      >
        -c
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        cluster 名称，表示 topic 所在集群（集群可通过 clusterList
        查询），-b优先，如果没有-b，则对集群中所有Broker执行命令
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={5}
        height={199}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "149.0pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        updateOrderConf
      </td>
      <td
        rowSpan={5}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        从NameServer上创建、删除、获取特定命名空间的kv配置，目前还未启用
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic，键
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={149}
        style={{ height: "29.0pt", width: "112pt" }}
      >
        -v
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        orderConf，值
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -m
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        method，可选get、put、delete
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={4}
        height={198}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt",
          height: "140pt",
          borderTop: "none",
          width: "122pt"
        }}
      >
        allocateMQ
      </td>
      <td
        rowSpan={4}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        以平均负载算法计算消费者列表负载消息队列的负载结果
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={95} style={{ height: "71.0pt" }}>
      <td
        height={95}
        className="xl65"
        width={149}
        style={{ height: "71.0pt", width: "112pt" }}
      >
        -i
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        ipList，用逗号分隔，计算这些ip去负载Topic的消息队列
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={4}
        height={142}
        className="xl68"
        width={163}
        style={{
          borderBottom: "1.0pt solid black",
          height: "106.0pt",
          borderTop: "1.0pt",
          width: "122pt"
        }}
      >
        statsAll
      </td>
      <td
        rowSpan={4}
        className="xl70"
        width={135}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "101pt" }}
      >
        打印Topic订阅关系、TPS、积累量、24h读写总量等信息
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={149}
        style={{ height: "43.0pt", width: "112pt" }}
      >
        -n
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={149}
        style={{ height: "29.0pt", width: "112pt" }}
      >
        -a
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        是否只打印活跃topic
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={149}
        style={{ height: "17.0pt", width: "112pt" }}
      >
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        指定topic
      </td>
    </tr>
  </tbody>
</table>

</details>

## 集群相关

<details><summary>集群相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={185} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={207} style={{ height: "155.0pt" }}>
      <td
        rowSpan={4}
        height={326}
        className="xl67"
        width={177}
        style={{
          borderBottom: "1.0pt",
          height: "244.0pt",
          borderTop: "none",
          width: "133pt"
        }}
      >
        <span style={{ msoSpacerun: "yes" }}> </span>clusterList
      </td>
      <td
        rowSpan={4}
        className="xl70"
        width={175}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "131pt" }}
      >
        查看集群信息，集群、BrokerName、BrokerId、TPS等信息
      </td>
      <td className="xl65" width={177} style={{ width: "133pt" }}>
        -m
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        打印更多信息 (增加打印出如下信息 #InTotalYest, #OutTotalYest,
        #InTotalToday ,#OutTotalToday)
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        -h
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={177}
        style={{ height: "43.0pt", width: "133pt" }}
      >
        -n
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={177}
        style={{ height: "29.0pt", width: "133pt" }}
      >
        -i
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        打印间隔，单位秒
      </td>
    </tr>
    <tr height={95} style={{ height: "71.0pt" }}>
      <td
        rowSpan={8}
        height={391}
        className="xl67"
        width={177}
        style={{
          borderBottom: "1.0pt",
          height: "292.0pt",
          borderTop: "none",
          width: "133pt"
        }}
      >
        clusterRT
      </td>
      <td
        rowSpan={8}
        className="xl70"
        width={175}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "131pt" }}
      >
        发送消息检测集群各Broker RT。消息发往${"{"}BrokerName{"}"} Topic。
      </td>
      <td className="xl65" width={177} style={{ width: "133pt" }}>
        -a
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        amount，每次探测的总数，RT = 总时间 / amount
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={177}
        style={{ height: "29.0pt", width: "133pt" }}
      >
        -s
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        消息大小，单位B
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        -c
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        探测哪个集群
      </td>
    </tr>
    <tr height={76} style={{ height: "57.0pt" }}>
      <td
        height={76}
        className="xl65"
        width={177}
        style={{ height: "57.0pt", width: "133pt" }}
      >
        -p
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        是否打印格式化日志，以|分割，默认不打印
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl65"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        -h
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={177}
        style={{ height: "29.0pt", width: "133pt" }}
      >
        -m
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        所属机房，打印使用
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl65"
        width={177}
        style={{ height: "29.0pt", width: "133pt" }}
      >
        -i
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        发送间隔，单位秒
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl65"
        width={177}
        style={{ height: "43.0pt", width: "133pt" }}
      >
        -n
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
  </tbody>
</table>

</details>

## Broker相关

<details><summary>Broker 相关参数</summary>


<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={185} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={128} style={{ height: "96.0pt" }}>
      <td
        rowSpan={3}
        height={208}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "156.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgById
      </td>
      <td
        rowSpan={3}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据offsetMsgId查询msg，如果使用开源控制台，应使用offsetMsgId，此命令还有其他参数，具体作用请阅读QueryMsgByIdSubCommand。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        msgId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={4}
        height={126}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "94.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByKey
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据消息 Key 查询消息
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        msgKey
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={225} style={{ height: "169.0pt" }}>
      <td
        rowSpan={6}
        height={390}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "292.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByOffset
      </td>
      <td
        rowSpan={6}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据 Offset 查询消息
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Broker 名称，（这里需要注意 填写的是 Broker 的名称，不是 Broker
        的地址，Broker 名称可以在 clusterList 查到）
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        query 队列 id
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -o
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        offset 值
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={47}>
      <td
        rowSpan={6}
        height={209}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "156.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByUniqueKey
      </td>
      <td
        rowSpan={6}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据msgId查询，msgId不同于offsetMsgId，区别详见常见运维问题。-g，-d配合使用，查到消息后尝试让特定的消费者消费消息并返回消费结果
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        uniqe msg id
      </td>
    </tr>
    <tr height={36} style={{ height: "27.0pt" }}>
      <td
        height={36}
        className="xl67"
        width={87}
        style={{ height: "27.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        consumerGroup
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        clientId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={5}
        height={149}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "111.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        checkMsgSendRT
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        检测向topic发消息的RT，功能类似clusterRT
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>{" "}
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -a
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        探测次数
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消息大小
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={8}
        height={218}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "162.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        sendMessage
      </td>
      <td
        rowSpan={8}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        发送一条消息，可以根据配置发往特定Message Queue，或普通发送。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -p
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        body，消息体
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        keys
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        tags
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={10}
        height={312}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "232.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        consumeMessage
      </td>
      <td
        rowSpan={10}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        消费消息。可以根据offset、开始&amp;结束时间戳、消息队列消费消息，配置不同执行不同消费逻辑，详见ConsumeMessageCommand。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -o
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        从offset开始消费
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式详见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费多少条消息
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={8}
        height={282}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "210.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        printMsg
      </td>
      <td
        rowSpan={8}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        从Broker消费消息并打印，可选时间段
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        字符集，例如UTF-8
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        subExpress，过滤表达式
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式参见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -e
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息体
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={12}
        height={390}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "290.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        printMsgByQueue
      </td>
      <td
        rowSpan={12}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        类似printMsg，但指定Message Queue
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -a
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        字符集，例如UTF-8
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        subExpress，过滤表达式
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式参见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -e
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -p
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息体
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -f
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否统计tag数量并打印
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={7}
        height={410}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "307.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        resetOffsetByTime
      </td>
      <td
        rowSpan={7}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        按时间戳重置offset，Broker和consumer都会重置
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        重置为此时间戳对应的offset
      </td>
    </tr>
    <tr height={188} style={{ height: "141.0pt" }}>
      <td
        height={188}
        className="xl67"
        width={87}
        style={{ height: "141.0pt", width: "65pt" }}
      >
        -f
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否强制重置，如果false，只支持回溯offset，如果true，不管时间戳对应offset与consumeOffset关系
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否重置c++客户端offset
      </td>
    </tr>
  </tbody>
</table>


</details>

## 消息相关
<details><summary>消息相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={185} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={128} style={{ height: "96.0pt" }}>
      <td
        rowSpan={3}
        height={208}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "156.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgById
      </td>
      <td
        rowSpan={3}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据offsetMsgId查询msg，如果使用开源控制台，应使用offsetMsgId，此命令还有其他参数，具体作用请阅读QueryMsgByIdSubCommand。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        msgId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={4}
        height={126}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "94.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByKey
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据消息 Key 查询消息
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        msgKey
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={225} style={{ height: "169.0pt" }}>
      <td
        rowSpan={6}
        height={390}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "292.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByOffset
      </td>
      <td
        rowSpan={6}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据 Offset 查询消息
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Broker 名称，（这里需要注意 填写的是 Broker 的名称，不是 Broker
        的地址，Broker 名称可以在 clusterList 查到）
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        query 队列 id
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -o
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        offset 值
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic 名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={47}>
      <td
        rowSpan={6}
        height={209}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "156.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        queryMsgByUniqueKey
      </td>
      <td
        rowSpan={6}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        根据msgId查询，msgId不同于offsetMsgId，区别详见常见运维问题。-g，-d配合使用，查到消息后尝试让特定的消费者消费消息并返回消费结果
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        uniqe msg id
      </td>
    </tr>
    <tr height={36} style={{ height: "27.0pt" }}>
      <td
        height={36}
        className="xl67"
        width={87}
        style={{ height: "27.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        consumerGroup
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        clientId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={5}
        height={149}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "111.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        checkMsgSendRT
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        检测向topic发消息的RT，功能类似clusterRT
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>{" "}
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -a
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        探测次数
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消息大小
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={8}
        height={218}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "162.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        sendMessage
      </td>
      <td
        rowSpan={8}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        发送一条消息，可以根据配置发往特定Message Queue，或普通发送。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -p
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        body，消息体
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        keys
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        tags
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={10}
        height={312}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "232.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        consumeMessage
      </td>
      <td
        rowSpan={10}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        消费消息。可以根据offset、开始&amp;结束时间戳、消息队列消费消息，配置不同执行不同消费逻辑，详见ConsumeMessageCommand。
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -o
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        从offset开始消费
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式详见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费多少条消息
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={8}
        height={282}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "210.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        printMsg
      </td>
      <td
        rowSpan={8}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        从Broker消费消息并打印，可选时间段
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        字符集，例如UTF-8
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        subExpress，过滤表达式
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式参见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -e
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息体
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={12}
        height={390}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "290.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        printMsgByQueue
      </td>
      <td
        rowSpan={12}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        类似printMsg，但指定Message Queue
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        queueId
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -a
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        BrokerName
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        字符集，例如UTF-8
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        subExpress，过滤表达式
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        开始时间戳，格式参见-h
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -e
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        结束时间戳
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -p
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印消息体
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -f
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否统计tag数量并打印
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={7}
        height={410}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "307.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        resetOffsetByTime
      </td>
      <td
        rowSpan={7}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        按时间戳重置offset，Broker和consumer都会重置
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        重置为此时间戳对应的offset
      </td>
    </tr>
    <tr height={188} style={{ height: "141.0pt" }}>
      <td
        height={188}
        className="xl67"
        width={87}
        style={{ height: "141.0pt", width: "65pt" }}
      >
        -f
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否强制重置，如果false，只支持回溯offset，如果true，不管时间戳对应offset与consumeOffset关系
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否重置c++客户端offset
      </td>
    </tr>
  </tbody>
</table>

</details>

## 消费相关

<details><summary>消费相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={200} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        rowSpan={4}
        height={158}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "110pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        consumerProgress
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        查看订阅组消费状态，可以查看具体的client IP的消息积累量
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者所属组名
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否打印client IP
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={105} style={{ msoHeightSource: "userset", height: "79.0pt" }}>
      <td
        rowSpan={5}
        height={260}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "195.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        consumerStatus
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        查看消费者状态，包括同一个分组中是否都是相同的订阅，分析Process
        Queue是否堆积，返回消费者jstack结果，内容较多，使用者参见ConsumerStatusSubCommand
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={36} style={{ height: "27.0pt" }}>
      <td
        height={36}
        className="xl67"
        width={87}
        style={{ height: "27.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        consumer group
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        clientId
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否执行jstack
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        rowSpan={5}
        height={181}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "135.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        getConsumerStatus
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        获取 Consumer 消费进度
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者所属组名
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        查询主题
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Consumer 客户端 ip
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={13}
        height={761}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "569.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        updateSubGroup
      </td>
      <td
        rowSpan={13}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        更新或创建订阅关系
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Broker地址
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        集群名称
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组名称
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        分组是否允许消费
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -m
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否从最小offset开始消费
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        是否是广播模式
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -q
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        重试队列数量
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -r
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        最大重试次数
      </td>
    </tr>
    <tr height={207} style={{ height: "155.0pt" }}>
      <td
        height={207}
        className="xl67"
        width={87}
        style={{ height: "155.0pt", width: "65pt" }}
      >
        -i
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        当slaveReadEnable开启时有效，且还未达到从slave消费时建议从哪个BrokerId消费，可以配置备机id，主动从备机消费
      </td>
    </tr>
    <tr height={132} style={{ height: "99.0pt" }}>
      <td
        height={132}
        className="xl67"
        width={87}
        style={{ height: "99.0pt", width: "65pt" }}
      >
        -w
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        如果Broker建议从slave消费，配置决定从哪个slave消费，配置BrokerId，例如1
      </td>
    </tr>
    <tr height={76} style={{ height: "57.0pt" }}>
      <td
        height={76}
        className="xl67"
        width={87}
        style={{ height: "57.0pt", width: "65pt" }}
      >
        -a
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        当消费者数量变化时是否通知其他消费者负载均衡
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={5}
        height={165}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "123.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        deleteSubGroup
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        从Broker删除订阅关系
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Broker地址
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -c
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        集群名称
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        height={39}
        className="xl67"
        width={87}
        style={{ height: "29.0pt", width: "65pt" }}
      >
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者分组名称
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={6}
        height={172}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "120pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        cloneGroupOffset
      </td>
      <td
        rowSpan={6}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        在目标群组中使用源群组的offset
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        源消费者组
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -d
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        目标消费者组
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        topic名称
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -o
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        暂未使用
      </td>
    </tr>
  </tbody>
</table>

</details>

## 连接相关

<details><summary>连接相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <colgroup>
    <col width={177} />
    <col width={175} />
    <col width={177} />
    <col width={185} />
  </colgroup>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        rowSpan={3}
        height={119}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "89.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        consumerConnec tion
      </td>
      <td
        rowSpan={3}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        查询 Consumer 的网络连接
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        消费者所属组名
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={39} style={{ height: "29.0pt" }}>
      <td
        rowSpan={4}
        height={142}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "106.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        producerConnec tion
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        查询 Producer 的网络连接
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        生产者所属组名
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -t
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        主题名称
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
  </tbody>
</table>

</details>

## NameServer 相关
<details><summary>连接相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={21} style={{ height: "16.0pt" }}>
      <td
        rowSpan={5}
        height={143}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "100pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        updateKvConfig
      </td>
      <td
        rowSpan={5}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        更新NameServer的kv配置，目前还未使用
      </td>
      <td className="xl75" width={87} style={{ width: "65pt" }}>
        -s
      </td>
      <td className="xl76" width={87} style={{ width: "65pt" }}>
        命名空间
      </td>
    </tr>
    <tr height={21} style={{ height: "16.0pt" }}>
      <td
        height={21}
        className="xl75"
        width={87}
        style={{ height: "16.0pt", width: "65pt" }}
      >
        -k
      </td>
      <td className="xl75" width={87} style={{ width: "65pt" }}>
        key
      </td>
    </tr>
    <tr height={21} style={{ height: "16.0pt" }}>
      <td
        height={21}
        className="xl75"
        width={87}
        style={{ height: "16.0pt", width: "65pt" }}
      >
        -v
      </td>
      <td className="xl75" width={87} style={{ width: "65pt" }}>
        value
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        rowSpan={4}
        height={126}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "94.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        deleteKvConfig
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        删除NameServer的kv配置
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        命名空间
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        key
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        height={57}
        className="xl67"
        width={87}
        style={{ height: "43.0pt", width: "65pt" }}
      >
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={2}
        height={80}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "60.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        getNamesrvConfig
      </td>
      <td
        rowSpan={2}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        获取NameServer配置
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={4}
        height={126}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "94.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        updateNamesrvConfig
      </td>
      <td
        rowSpan={4}
        className="xl72"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        修改NameServer配置
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -k
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        key
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -v
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        value
      </td>
    </tr>
  </tbody>
</table>

</details>

## 其他
<details><summary>连接相关参数</summary>

<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        名称
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        含义
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        命令选项
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        说明
      </td>
    </tr>
    <tr height={57} style={{ height: "43.0pt" }}>
      <td
        rowSpan={2}
        height={80}
        className="xl69"
        width={87}
        style={{
          borderBottom: "1.0pt",
          height: "60.0pt",
          borderTop: "none",
          width: "65pt"
        }}
      >
        startMonitoring
      </td>
      <td
        rowSpan={2}
        className="xl71"
        width={87}
        style={{ borderBottom: "1.0pt", borderTop: "none", width: "65pt" }}
      >
        开启监控进程，监控消息误删、重试队列消息数等
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer 服务地址，格式 ip:port
      </td>
    </tr>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl67"
        width={87}
        style={{ height: "17.0pt", width: "65pt" }}
      >
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        打印帮助
      </td>
    </tr>
  </tbody>
</table>

</details>
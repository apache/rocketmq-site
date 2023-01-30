# Admin Tool

:::tip Notice

1. To execute a command: `./mqadmin {command} {args}`
2. Most commands require the configuration of the NameServer address with the `-n` flag, in the format `ip:port`
3. Most commands can get help with the `-h` flag
4. If both the Broker address (`-b`) and the clusterName (`-c`) are configured, the command will be executed using the Broker address. If the Broker address is not configured, the command will be executed on all hosts in the cluster. Only one Broker address is supported, in the format `ip:port`, where the port is 10911 by default.
5. In the `tools` directory, you can see many commands, but not all of them can be used. Only those initialized in `MQAdminStartup` can be used. You can also modify this class to add or define your own commands.
6. Some commands may not have been updated due to version updates, and may cause errors. In this case, please read the relevant command source code.

:::



## Topic-related

<details><summary>Topic-related parameters</summary>



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
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Create/update topic configuration
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -b
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Broker address, representing the Broker where the topic is located. Only a single Broker is supported, with the address in the format ip:port.
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
        Cluster name, representing the cluster where the topic is located (the cluster can be queried with the clusterList command).
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
        Print help
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
        NameServer address，format ip:port
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
        Specify the read-write permissions for the new topic( W=2|R=4|WR=6 )
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
        Number of readable queues（default is 8）
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
        Number of writable queues（default is 8）
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
        Topic name (the name can only use the characters ^[a-zA-Z0-9_-]+$ ）
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
       Delete Topic
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -c
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Cluster name, representing the deletion of a specific topic under a certain cluster (the cluster can be queried with the clusterList command).
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
        Print help
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
        NameServer address，format ip:port
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
        topic name (the name can only use the characters ^[a-zA-Z0-9_-]+$ ）
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
        Query topic list information
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Print help
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
        Without the -c flag, only the topic list is returned. Adding -c returns the clusterName, topic, and consumerGroup information, i.e. the cluster that the topic belongs to and the subscription relationship. There are no parameters.
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
        NameServer address，format ip:port
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
        Query topic routing information
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic name
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
        Print help
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
        NameServer address，format ip:port
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
        Query topic message queue offsets
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic name
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
        Print help
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
        NameServer address，format ip:port
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
        Query list of clusters where the topic is located
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic name
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
        Print help
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
        NameServer address，format ip:port
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
        Update topic read-write permissions
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic name
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
        Print help
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
        NameServer address，format ip:port
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
        Broker address, representing the Broker where the topic is located. Only a single Broker is supported, with the address in the format ip:port.
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
        Specify the read-write permissions for the new topic( W=2|R=4|WR=6 )
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
        Cluster name, representing the cluster where the topic is located (the cluster can be queried with the clusterList command). The -b flag takes precedence. If there is no -b flag, the command will be executed on all Brokers in the cluster.
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
        Create, delete, and get specific kv configurations from the NameServer. This feature is currently not available.
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Print help
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
        NameServer address，format ip:port
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
        topic,key
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
        orderConf,value
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
        method，optional get、put、delete
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
        Calculate the load results of the message queue for the consumer list using an average load algorithm.
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -t
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        topic name
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
        Print help
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
        NameServer address，format ip:port
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
        ipList,separated by commas, calculates the message queue load for these IPs for the topic.
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
        Print information about the topic's subscriptions, TPS, accumulation, 24-hour total read-write volume, etc.
      </td>
      <td className="xl65" width={149} style={{ width: "112pt" }}>
        -h
      </td>
      <td className="xl66" width={159} style={{ width: "119pt" }}>
        Print help
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
        NameServer address，format ip:port
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
        Print only active topics
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
        Specify topic
      </td>
    </tr>
  </tbody>
</table>


</details>

## Cluster-related

<details><summary>Cluster-related parameters</summary>



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
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
         Definition 
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
         Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Query cluster information, including the cluster, BrokerName, BrokerId, TPS, and other information.
      </td>
      <td className="xl65" width={177} style={{ width: "133pt" }}>
        -m
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        Print more information (additional information printed includes: #InTotalYest, #OutTotalYest,#InTotalToday ,#OutTotalToday)
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
        Print help
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
        NameServer address，format ip:port
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
        Print interval, in seconds.
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
        Send a message to test the RT of each Broker in the cluster. The message is sent to the${"{"}BrokerName{"}"} Topic。
      </td>
      <td className="xl65" width={177} style={{ width: "133pt" }}>
        -a
      </td>
      <td className="xl66" width={185} style={{ width: "139pt" }}>
        amount,the total number of probes each time. RT = total time / amount
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
        Message size，Unit: B
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
        Which cluster to probe
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
        Whether to print formatted logs, separated by |, default is not printed.
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
        Print help
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
        Belonging datacenter, for printing purposes.
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
        Send interval,in seconds.
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
        NameServer address，format ip:port
      </td>
    </tr>
  </tbody>
</table>


</details>

## Broker-related

<details><summary>Broker-related parameters</summary>



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
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
         Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Query the msg based on offsetMsgId. If using the open source console, offsetMsgId should be used. This command has additional parameters, for more information on their function, please read QueryMsgByIdSubCommand.
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
        Print help
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
        NameServer address，format ip:port
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
        Query message based on message key.
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
        Topic name
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
        Print help
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
        NameServer address，format ip:port
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
        Query message based on offset.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
Broker name (note that the name of the Broker, not its address, should be entered here. The Broker name can be found using the clusterList command).
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
        query queue id
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
        offset value
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
        topic name
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
        Print help
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
        NameServer address,format ip:port
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
Query based on msgId. msgId is different from offsetMsgId, for more information see common operations issues. -g and -d are used together, after finding the message, try to let a specific consumer consume the message and return the consumption result.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address，format ip:port
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
        topic name
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
        Check the RT of sending messages to a topic. The function is similar to clusterRT.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Number of probes
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
        message size
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
        Send a message, which can be sent to a specific message queue based on configuration, or a normal send.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        message body
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
        Consume messages. Messages can be consumed based on offset, start & end timestamps, and message queues. Different configurations execute different consumption logic, see ConsumeMessageCommand for more information.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Consume from offset
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
        Consumer group
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Consume a certain number of messages
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
        Consume messages from Broker and print them, optional time period.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Character set, e.g. UTF-8
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
        subExpress,filter expression
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Whether to print the message body.
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
        Similar to printMsg, but for a specific message queue.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Character set, e.g. UTF-8
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
        subExpress, filter expression
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Whether to print the message body.
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
        Whether to print the message body.
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
        Whether to count and print the number of tags
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
Reset offset based on timestamp, both Broker and consumer will be reset.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address, format ip:port
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
        Consumer group
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
        topic name
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
        Reset to the offset corresponding to this timestamp.
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
		Whether to force reset. If false, only backward offset is supported. If true, regardless of the relationship between the timestamp-corresponding offset and consumeOffset.
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
        Whether to reset the offset for the C++ client.
      </td>
    </tr>
  </tbody>
</table>


</details>

## Message-related

<details><summary>Message-related parameters</summary>

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
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        To query a message by its offset message ID (offsetMsgId), you can use the offsetMsgId command if using an open source console. This command has additional parameters, the specific function of which can be found by reading the QueryMsgByIdSubCommand.
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
        Print help
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
        NameServer address,format ip:port
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
        Query a message by key.
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
        Topic name
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
        Print help
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
        NameServer address,format ip:port
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
        Query a message by offset
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -b
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
       Broker name (Note that this should be the name of the Broker, not the address. The name of the Broker can be found in clusterList.)
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
        query queue id
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
        offset value
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
        topic name
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
        Print help
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
        NameServer address,format ip:port
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
        Query based on msgId. Note that msgId is different from offsetMsgId. For more information, see Common Operations and Maintenance Issues. Use -g and -d together to try to have a specific consumer consume the message and return the consumption result once the message has been found.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Check the RT (round-trip time) for sending messages to a topic. This function is similar to clusterRT.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Number of probes.
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
        Message size
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
Send a message, which can be sent to a specific Message Queue according to configuration or sent normally.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        body，message body
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
        Consume messages. Messages can be consumed based on offset, start & end timestamps, and message queue. Different configurations will execute different consumption logic. See ConsumeMessageCommand for more information.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Consume from a specified offset.
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
        Consumer group
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Consume a specified number of messages.
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
        Consume and print messages from the Broker within a specified time period.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Character set, e.g. UTF-8
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
        subExpress，filter expression
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Whether to print message body
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
        Similar to printMsg, but specifies a Message Queue.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        topic name
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
        Character set, e.g. UTF-8
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
        subExpress,filter expression
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
        Start timestamp, see -h for format.
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
        End timestamp
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
        Whether to print the message
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
        Whether to print the message body
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
        Whether to count and print the number of tags
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
        Resetting the offset by timestamp will reset both the broker and the consumer.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address, format ip:port
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
        Consumer group
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
        topic name
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
        Reset to the offset corresponding to this timestamp.
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
        Whether to force reset. If false, only backward offset is supported. If true, the relationship between the timestamp corresponding offset and consumeOffset is ignored.
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
        Whether to reset the offset for the C++ client.
      </td>
    </tr>
  </tbody>
</table>

</details>

## Consume-related

<details><summary>Consume-related parameters</summary>
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
        style={{ height: "17.0pt", width: "133pt" }}>
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definitation
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
Consumer group consumption status, including specific client IP's message accumulation.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        consumer group name
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
        Whether to print the client IP.
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
        Pirnt help
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
        NameServer address,format ip:port
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
        Consumer status refers to the status of a consumer, including whether all consumers in the same group have the same subscriptions, whether the Process Queue is stacking up, and the jstack result of the consumer. The information returned by this command is extensive, and users should refer to the ConsumerStatusSubCommand for more details.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -h
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Print help
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
        NameServer address,format ip:port
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
        Whether to execute jstack
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
        Get Consumer consumption progress
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Consumer group name
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
        Query topic
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
        Consumer client ip
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
        NameServer address,format ip:port
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
        Print help
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
        Update or create a subscription relationship.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address,format ip:port
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
        Print help
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
        Broker address
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
        Cluster name
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
        Consumer group name
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
        whether the group is allowed to consume
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
        Whether to start consuming from the smallest offset.
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
        Whether it is broadcast mode.
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
         Number of retry queues.
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
         Maximum number of retries
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
        When slaveReadEnable is turned on and it has not yet reached the point where it is recommended to consume from the slave, it is possible to configure the standby machine id to actively consume from the standby machine.
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
        If the Broker suggests consuming from the slave, the configuration determines which slave to consume from. The BrokerId can be configured, for example 1.
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
        Whether other consumers are notified of load balancing when the number of consumers changes.
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
        To remove a subscription from a Broker
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address，format ip:port
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
        Print help
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
        Broker address
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
        Cluster name
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
        Counsumer group name
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
        Using the offsets from the source consumer group in the target consumer group.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address,format ip:port
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
        Print help
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
        Source consumer group
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
        Target consumer group
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
        topicname
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
        Not currently in use.
      </td>
    </tr>

  </tbody>
</table>


</details>

## Connection-related

<details><summary>Connection-related parameters</summary>
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
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Query consumer network connections.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Name of consumer group.
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
        NameServer address，format ip:port
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
        Print help
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
        Query producer network connections.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -g
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Name of producer group.
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
        topic name
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
        NameServer address,format ip:port
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
        Print help
      </td>
    </tr>
  </tbody>
</table>



</details>

## NameServer-related

<details><summary>Connection-related parameters</summary>
<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Update NameServer KV configuration, currently not in use.
      </td>
      <td className="xl75" width={87} style={{ width: "65pt" }}>
        -s
      </td>
      <td className="xl76" width={87} style={{ width: "65pt" }}>
        Name space
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
        NameServer address,format ip:port
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
        Print help
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
        Delete NameServer KV configuration.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -s
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        Name space
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
        NameServer address,format ip:port
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
        Print help
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
        Get NameServer configuration.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address,format ip:port
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
        Print help
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
        Modify NameServer configuration.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address,format ip:port
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
        Print help
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

## Others

<details><summary>Connection-related parameters</summary>
<table border={0} cellPadding={0} cellSpacing={0} width={714}>
  <tbody>
    <tr height={23} style={{ height: "17.0pt" }}>
      <td
        height={23}
        className="xl63"
        width={177}
        style={{ height: "17.0pt", width: "133pt" }}
      >
        Name
      </td>
      <td className="xl64" width={175} style={{ width: "131pt" }}>
        Definition
      </td>
      <td className="xl64" width={177} style={{ width: "133pt" }}>
        Command options 
      </td>
      <td className="xl64" width={185} style={{ width: "139pt" }}>
        Explain
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
        Start the monitoring process to monitor events such as message deletion errors and the number of messages in the retry queue.
      </td>
      <td className="xl67" width={87} style={{ width: "65pt" }}>
        -n
      </td>
      <td className="xl68" width={87} style={{ width: "65pt" }}>
        NameServer address,format ip:port
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
        Print help
      </td>
    </tr>
  </tbody>
</table>



</details>
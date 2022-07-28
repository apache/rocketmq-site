# mqadmin tool


> Notice：
>
> 1. Execution method：`./mqadmin {command} {args}`
> 2. To indicate the  address of nameserver，all the commands needs to be configured with `-n`. General format is `ip:port`
> 3. Get help with `-h` argument for all commands
> 4. If both broker address `-b` and cluster name `-c` can be configured，take broker address as a priority to command. If the Broker address is not configured，execute commands for all the host in the cluster. `-b` config support only one Broker address. The format is `ip:port` and the port will default to 10911
> 5. Although many commands can be seen under mqadmin tool，only commands initialized in MQAdminStartup can be used. Otherwise，you can modify this class by adding or customizing commands
> 6. Due to version updates, a few commands may not be updated in time. If encountering errors, you can read the related command source code



## Topic command



<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=132 style='height:99.0pt'>
  <td rowspan=8 height=593 class=xl68 width=163 style='border-bottom:1.0pt;
  height:444.0pt;border-top:none;width:122pt'>updateTopic</td>
  <td rowspan=8 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>create/update topic</td>
  <td class=xl65 width=149 style='width:112pt'>-b</td>
  <td class=xl66 width=159 style='width:119pt'>The address of applied broker. General format is `ip:port`. Only a single broker can be applied. </td>
 </tr>
 <tr height=132 style='height:99.0pt'>
  <td height=132 class=xl65 width=149 style='height:99.0pt;width:112pt'>-c</td>
  <td class=xl66 width=159 style='width:119pt'>The name of applied cluster(It can be queried with `clusterList` command).</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 class=xl65 width=149 style='height:57.0pt;width:112pt'>-p</td>
  <td class=xl66 width=159 style='width:119pt'>Specify permission for the new topic( W=2|R=4|WR=6 )</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=149 style='height:29.0pt;width:112pt'>-r</td>
  <td class=xl66 width=159 style='width:119pt'>The number of readable queues (default: 8)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=149 style='height:29.0pt;width:112pt'>-w</td>
  <td class=xl66 width=159 style='width:119pt'>The number of writable queues (default 8)</td>
 </tr>
 <tr height=95 style='height:71.0pt'>
  <td height=95 class=xl65 width=149 style='height:71.0pt;width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name(supported character ^[a-zA-Z0-9_-]+$)</td>
 </tr>
 <tr height=132 style='height:99.0pt'>
  <td rowspan=4 height=307 class=xl68 width=163 style='border-bottom:1.0pt;
  height:230.0pt;border-top:none;width:122pt'>deleteTopic</td>
  <td rowspan=4 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:1.0pt;width:101pt'>delete topic</td>
  <td class=xl65 width=149 style='width:112pt'>-c</td>
  <td class=xl66 width=159 style='width:119pt'>The name of the cluster, whose topic is deleted(It can be queried with `clusterList` command)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=95 style='height:71.0pt'>
  <td height=95 class=xl65 width=149 style='height:71.0pt;width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name(supported character ^[a-zA-Z0-9_-]+$).</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=3 height=287 class=xl68 width=163 style='border-bottom:1.0pt;
  height:215.0pt;border-top:none;width:122pt'>topicList</td>
  <td rowspan=3 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>query topic list</td>
  <td class=xl65 width=149 style='width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=207 style='height:155.0pt'>
  <td height=207 class=xl65 width=149 style='height:155.0pt;width:112pt'>-c</td>
  <td class=xl66 width=159 style='width:119pt'>The name of applied cluster. With the additional argument `-c`, it will return the topic name，the related cluster name and the consumer group subscribing. Otherwise, return the list of topic name</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=3 height=103 class=xl68 width=163 style='border-bottom:1.0pt;
  height:77.0pt;border-top:none;width:122pt'>topicRoute</td>
  <td rowspan=3 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>query topic router information</td>
  <td class=xl65 width=149 style='width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=3 height=103 class=xl68 width=163 style='border-bottom:1.0pt;
  height:77.0pt;border-top:none;width:122pt'>topicStatus</td>
  <td rowspan=3 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>query the queue offset of topic</td>
  <td class=xl65 width=149 style='width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=3 height=103 class=xl68 width=163 style='border-bottom:1.0pt;
  height:77.0pt;border-top:none;width:122pt'>topicClusterList</td>
  <td rowspan=3 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>query the cluster list of topic</td>
  <td class=xl65 width=149 style='width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=6 height=518 class=xl68 width=163 style='border-bottom:1.0pt;
  height:380pt;border-top:none;width:122pt'>updateTopicPerm</td>
  <td rowspan=6 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>update the permission of topic </td>
  <td class=xl65 width=149 style='width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=132 style='height:99.0pt'>
  <td height=132 class=xl65 width=149 style='height:99.0pt;width:112pt'>-b</td>
  <td class=xl66 width=159 style='width:119pt'>The address of broker, support only one broker. The format is `ip:port`.</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 class=xl65 width=149 style='height:57.0pt;width:112pt'>-p</td>
  <td class=xl66 width=159 style='width:119pt'>set the permission of the created topic( W=2|R=4|WR=6 )</td>
 </tr>
 <tr height=207 style='height:155.0pt'>
  <td height=207 class=xl65 width=149 style='height:155.0pt;width:112pt'>-c</td>
  <td class=xl66 width=159 style='width:119pt'>Cluster name. If both broker address `-b` and cluster name `-c` can be configured，take broker address as a priority to command. If the Broker address is not configured，execute commands for all the host in the cluster.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=5 height=199 class=xl68 width=163 style='border-bottom:1.0pt;
  height:149.0pt;border-top:none;width:122pt'>updateOrderConf</td>
  <td rowspan=5 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>create, delete or get a specific namespace config from nameserver.</td>
  <td class=xl65 width=149 style='width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>topic，Key</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=149 style='height:29.0pt;width:112pt'>-v</td>
  <td class=xl66 width=159 style='width:119pt'>orderConf，Value</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-m</td>
  <td class=xl66 width=159 style='width:119pt'>Method. Option valus: get, put and delete</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=4 height=198 class=xl68 width=163 style='border-bottom:1.0pt;
  height:140pt;border-top:none;width:122pt'>allocateMQ</td>
  <td rowspan=4 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>rebalance message queues between consumer list with the average load algorithm</td>
  <td class=xl65 width=149 style='width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=95 style='height:71.0pt'>
  <td height=95 class=xl65 width=149 style='height:71.0pt;width:112pt'>-i</td>
  <td class=xl66 width=159 style='width:119pt'>Ip list，splitted with commas. Rebalance the topic queues with the ip list</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=4 height=142 class=xl68 width=163 style='border-bottom:1.0pt solid black;
  height:106.0pt;border-top:1.0pt;width:122pt'>statsAll</td>
  <td rowspan=4 class=xl70 width=135 style='border-bottom:1.0pt;
  border-top:none;width:101pt'>get the consumer group, accumulation, TPS and other statistics of the topics</td>
  <td class=xl65 width=149 style='width:112pt'>-h</td>
  <td class=xl66 width=159 style='width:119pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=149 style='height:43.0pt;width:112pt'>-n</td>
  <td class=xl66 width=159 style='width:119pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=149 style='height:29.0pt;width:112pt'>-a</td>
  <td class=xl66 width=159 style='width:119pt'>Whether to print only active topics</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=149 style='height:17.0pt;width:112pt'>-t</td>
  <td class=xl66 width=159 style='width:119pt'>Topic name</td>
 </tr>
</table>




## Cluster command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=207 style='height:155.0pt'>
  <td rowspan=4 height=326 class=xl67 width=177 style='border-bottom:1.0pt;
  height:244.0pt;border-top:none;width:133pt'><span
  style='mso-spacerun:yes'> </span>clusterList</td>
  <td rowspan=4 class=xl70 width=175 style='border-bottom:1.0pt;
  border-top:none;width:131pt'>query the information of cluster, such as cluster name, broker name、broker ID、TPS and so on.</td>
  <td class=xl65 width=177 style='width:133pt'>-m</td>
  <td class=xl66 width=185 style='width:139pt'>Print more information(such as #InTotalYest,
  #OutTotalYest, #InTotalToday ,#OutTotalToday)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=177 style='height:17.0pt;width:133pt'>-h</td>
  <td class=xl66 width=185 style='width:139pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=177 style='height:43.0pt;width:133pt'>-n</td>
  <td class=xl66 width=185 style='width:139pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=177 style='height:29.0pt;width:133pt'>-i</td>
  <td class=xl66 width=185 style='width:139pt'>Print interval(seconds)</td>
 </tr>
 <tr height=95 style='height:71.0pt'>
  <td rowspan=8 height=391 class=xl67 width=177 style='border-bottom:1.0pt;
  height:292.0pt;border-top:none;width:133pt'>clusterRT</td>
  <td rowspan=8 class=xl70 width=175 style='border-bottom:1.0pt;
  border-top:none;width:131pt'>Check broker RT through sending message to specific topic.</td>
  <td class=xl65 width=177 style='width:133pt'>-a</td>
  <td class=xl66 width=185 style='width:139pt'>Message amount(default 100)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=177 style='height:29.0pt;width:133pt'>-s</td>
  <td class=xl66 width=185 style='width:139pt'>Message size(default 128Byte)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=177 style='height:17.0pt;width:133pt'>-c</td>
  <td class=xl66 width=185 style='width:139pt'>Cluster name(default display all cluster)</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 class=xl65 width=177 style='height:57.0pt;width:133pt'>-p</td>
  <td class=xl66 width=185 style='width:139pt'>Print as tlog(default false)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl65 width=177 style='height:17.0pt;width:133pt'>-h</td>
  <td class=xl66 width=185 style='width:139pt'>Get help information.</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=177 style='height:29.0pt;width:133pt'>-m</td>
  <td class=xl66 width=185 style='width:139pt'>Machine room name(default noname)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl65 width=177 style='height:29.0pt;width:133pt'>-i</td>
  <td class=xl66 width=185 style='width:139pt'>Print interval(default 10 seconds)</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl65 width=177 style='height:43.0pt;width:133pt'>-n</td>
  <td class=xl66 width=185 style='width:139pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
</table>


## Broker command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=6 height=206 class=xl69 width=191 style='border-bottom:1.0pt;
  height:154.0pt;border-top:none;width:143pt'>updateBrokerConfig</td>
  <td rowspan=6 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>update broker config</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Cluster name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-k</td>
  <td class=xl68 width=87 style='width:65pt'>Key</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-v</td>
  <td class=xl68 width=87 style='width:65pt'>Value</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=3 height=137 class=xl69 width=191 style='border-bottom:1.0pt;
  height:103.0pt;border-top:none;width:143pt'>brokerStatus</td>
  <td rowspan=3 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>query broker statistical information and status</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=6 height=256 class=xl69 width=191 style='border-bottom:1.0pt;
  height:192.0pt;border-top:none;width:143pt'>brokerConsumeStats</td>
  <td rowspan=6 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>query the consume status, such as topic, group name, broker name, queue Id, tiemstamp and so on</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Request timeout Millis</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-l</td>
  <td class=xl68 width=87 style='width:65pt'>Threshold of diff. When exceeding the threshold value, it will be printed.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-o</td>
  <td class=xl68 width=87 style='width:65pt'>Order topic(default false)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=2 height=114 class=xl69 width=191 style='border-bottom:1.0pt;
  height:86.0pt;border-top:none;width:143pt'>getBrokerConfig</td>
  <td rowspan=2 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>get broker config</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=3 height=137 class=xl69 width=191 style='border-bottom:1.0pt;
  height:103.0pt;border-top:none;width:143pt'>wipeWritePerm</td>
  <td rowspan=3 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>wipe broker's write permission from nameserver.</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=4 height=160 class=xl69 width=191 style='border-bottom:1.0pt;
  height:120.0pt;border-top:none;width:143pt'>cleanExpiredCQ</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>clean the expired consume queue of broker.</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Cluster name</td>
 </tr>
 <tr height=88 style='mso-height-source:userset;height:66.0pt'>
  <td rowspan=4 height=191 class=xl69 width=191 style='border-bottom:1.0pt;
  height:143.0pt;border-top:none;width:143pt'>cleanUnusedTopic</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>clean unused topic of broker and release the consume queue in memory.</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Cluster name</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=5 height=199 class=xl69 width=191 style='border-bottom:1.0pt;
  height:149.0pt;border-top:none;width:143pt'>sendMsgStatus</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>send message to broker and get the send result and RT.</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Message size(Default 128 byte)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Send message count(default 50)</td>
 </tr>
</table>


## Message command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
<tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=128 style='height:96.0pt'>
  <td rowspan=3 height=208 class=xl69 width=87 style='border-bottom:1.0pt;
  height:156.0pt;border-top:none;width:65pt'>queryMsgById</td>
  <td rowspan=3 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Query message by offsetMsgId.</td>
  <td class=xl67 width=87 style='width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>Message ID(offsetMsgId)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=4 height=126 class=xl69 width=87 style='border-bottom:1.0pt;
  height:94.0pt;border-top:none;width:65pt'>queryMsgByKey</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Query the message by message Key</td>
  <td class=xl67 width=87 style='width:65pt'>-k</td>
  <td class=xl67 width=87 style='width:65pt'>Message key</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=225 style='height:169.0pt'>
  <td rowspan=6 height=390 class=xl69 width=87 style='border-bottom:1.0pt;
  height:292.0pt;border-top:none;width:65pt'>queryMsgByOffset</td>
  <td rowspan=6 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Query message by offset</td>
  <td class=xl67 width=87 style='width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker name(It can be query through clusterList command)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-i</td>
  <td class=xl68 width=87 style='width:65pt'>Queue ID</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-o</td>
  <td class=xl68 width=87 style='width:65pt'>Offset value</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=47>
  <td rowspan=6 height=209 class=xl69 width=87 style='border-bottom:1.0pt;
  height:156.0pt;border-top:none;width:65pt'>queryMsgByUniqueKey</td>
  <td rowspan=6 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Query message by unique message ID. unique message ID is different from offsetMsgId.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>Uniqe message ID</td>
 </tr>
 <tr height=36 style='height:27.0pt'>
  <td height=36 class=xl67 width=87 style='height:27.0pt;width:65pt'>-g</td>
  <td class=xl67 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-d</td>
  <td class=xl67 width=87 style='width:65pt'>Client ID</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=5 height=149 class=xl69 width=87 style='border-bottom:1.0pt
  height:111.0pt;border-top:none;width:65pt'>checkMsgSendRT</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Check the RT of sending message to specific cluster.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-a</td>
  <td class=xl68 width=87 style='width:65pt'>Try times</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Message size(byte)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=8 height=218 class=xl69 width=87 style='border-bottom:1.0pt;
  height:162.0pt;border-top:none;width:65pt'>sendMessage</td>
  <td rowspan=8 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Send one message to specific queue or random broker queue.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-p</td>
  <td class=xl68 width=87 style='width:65pt'>Message body</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-k</td>
  <td class=xl67 width=87 style='width:65pt'>Keys</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl67 width=87 style='width:65pt'>Tags</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-b</td>
  <td class=xl67 width=87 style='width:65pt'>Broker name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>Queue ID</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=10 height=312 class=xl69 width=87 style='border-bottom:1.0pt;
  height:232.0pt;border-top:none;width:65pt'>consumeMessage</td>
  <td rowspan=10 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Consume message according to offset, begin-timestamp, end-timestamp and queue ID and so on.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-b</td>
  <td class=xl67 width=87 style='width:65pt'>Broker name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-o</td>
  <td class=xl68 width=87 style='width:65pt'>Queue offset</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>Queue Id</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Begin timestamp</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-d</td>
  <td class=xl68 width=87 style='width:65pt'>End timestamp</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Message count</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=8 height=282 class=xl69 width=87 style='border-bottom:1.0pt;
  height:210.0pt;border-top:none;width:65pt'>printMsg</td>
  <td rowspan=8 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Consume broker message and print.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>CharsetName(eg: UTF-8,GBK)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Subscribe Expression(eg: TagA || TagB)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Begin timestamp[currentTimeMillis|yyyy-MM-dd#HH:mm:ss:SSS]</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-e</td>
  <td class=xl68 width=87 style='width:65pt'>End timestamp[currentTimeMillis|yyyy-MM-dd#HH:mm:ss:SSS]</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-d</td>
  <td class=xl68 width=87 style='width:65pt'>Print message body</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=12 height=390 class=xl69 width=87 style='border-bottom:1.0pt;
  height:290.0pt;border-top:none;width:65pt'>printMsgByQueue</td>
  <td rowspan=12 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Consume specific queue message and print.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>Queue Id</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-a</td>
  <td class=xl67 width=87 style='width:65pt'>Broker name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>CharsetName(eg: UTF-8,GBK)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Subscribe Expression(eg: TagA || TagB)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Begin timestamp[currentTimeMillis|yyyy-MM-dd#HH:mm:ss:SSS]</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-e</td>
  <td class=xl68 width=87 style='width:65pt'>End timestamp[currentTimeMillis|yyyy-MM-dd#HH:mm:ss:SSS]</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-p</td>
  <td class=xl68 width=87 style='width:65pt'>Print msg. eg: true | false(default)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-d</td>
  <td class=xl68 width=87 style='width:65pt'>Print body. eg: true | false(default)</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-f</td>
  <td class=xl68 width=87 style='width:65pt'>Calculate by tag. eg: true | false(default)</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=7 height=410 class=xl69 width=87 style='border-bottom:1.0pt;
  height:307.0pt;border-top:none;width:65pt'>resetOffsetByTime</td>
  <td rowspan=7 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Reset the offset of broker and consumer by timestamp</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Set the timestamp[now|currentTimeMillis|yyyy-MM-dd#HH:mm:ss:SSS]</td>
 </tr>
 <tr height=188 style='height:141.0pt'>
  <td height=188 class=xl67 width=87 style='height:141.0pt;width:65pt'>-f</td>
  <td class=xl68 width=87 style='width:65pt'>Set the force rollback by timestamp switch[true|false]</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Reset c++ client offset</td>
 </tr>
</table>


## Consumer comand

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
<tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td rowspan=4 height=158 class=xl69 width=87 style='border-bottom:1.0pt;
  height:110pt;border-top:none;width:65pt'>consumerProgress</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt;
  border-top:none;width:65pt'>Query consumer group informastion, such as subscriptions, client IP, consume offset and so on.</td>
  <td class=xl67 width=87 style='width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Print client IP</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=105 style='mso-height-source:userset;height:79.0pt'>
  <td rowspan=5 height=260 class=xl69 width=87 style='border-bottom:1.0pt;
  height:195.0pt;border-top:none;width:65pt'>consumerStatus</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>Get the consume status，such as accumulation status of message queue, subscriptions status in the same group, consumer's jstack info.</td>
  <td class=xl67 width=87 style='width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=36 style='height:27.0pt'>
  <td height=36 class=xl67 width=87 style='height:27.0pt;width:65pt'>-g</td>
  <td class=xl67 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-i</td>
  <td class=xl67 width=87 style='width:65pt'>The consumer's client ID</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Run jstack command in the consumer progress</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td rowspan=5 height=181 class=xl69 width=87 style='border-bottom:1.0pt
  height:135.0pt;border-top:none;width:65pt'>getConsumerStatus</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>get the consumer progress</td>
  <td class=xl67 width=87 style='width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-i</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer client ip</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=13 height=761 class=xl69 width=87 style='border-bottom:1.0pt
  height:569.0pt;border-top:none;width:65pt'>updateSubGroup</td>
  <td rowspan=13 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>udpate/create subscription</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Cluster name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Consume enable</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-m</td>
  <td class=xl68 width=87 style='width:65pt'>Consume from min enable</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-d</td>
  <td class=xl68 width=87 style='width:65pt'>Consume broadcast enable</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-q</td>
  <td class=xl68 width=87 style='width:65pt'>Retry queue numbers</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-r</td>
  <td class=xl68 width=87 style='width:65pt'>Retry max times</td>
 </tr>
 <tr height=207 style='height:155.0pt'>
  <td height=207 class=xl67 width=87 style='height:155.0pt;width:65pt'>-i</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer from which broker ID. It is available when the slaveReadEnable is turned on and the condition of consuming from slave broker is not met.</td>
 </tr>
 <tr height=132 style='height:99.0pt'>
  <td height=132 class=xl67 width=87 style='height:99.0pt;width:65pt'>-w</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer from which broker ID when consume slowly.</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 class=xl67 width=87 style='height:57.0pt;width:65pt'>-a</td>
  <td class=xl68 width=87 style='width:65pt'>Notify others when consumer IDs change</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=5 height=165 class=xl69 width=87 style='border-bottom:1.0pt
  height:123.0pt;border-top:none;width:65pt'>deleteSubGroup</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>Delete subscription of the broker</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-b</td>
  <td class=xl68 width=87 style='width:65pt'>Broker address</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-c</td>
  <td class=xl68 width=87 style='width:65pt'>Cluster name</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td height=39 class=xl67 width=87 style='height:29.0pt;width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=6 height=172 class=xl69 width=87 style='border-bottom:1.0pt
  height:120pt;border-top:none;width:65pt'>cloneGroupOffset</td>
  <td rowspan=6 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>Clone the consumer offset from soure group to destination group</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Source consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-d</td>
  <td class=xl68 width=87 style='width:65pt'>Destination consumer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-o</td>
  <td class=xl68 width=87 style='width:65pt'>Unsupported yet</td>
 </tr>
</table>




## Connection command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
<tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td rowspan=3 height=119 class=xl69 width=87 style='border-bottom:1.0pt
  height:89.0pt;border-top:none;width:65pt'>consumerConnection</td>
  <td rowspan=3 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>query the connection information of consumer</td>
  <td class=xl67 width=87 style='width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>Consumer group</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=39 style='height:29.0pt'>
  <td rowspan=4 height=142 class=xl69 width=87 style='border-bottom:1.0pt
  height:106.0pt;border-top:none;width:65pt'>producerConnection</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>query the connection information of producer</td>
  <td class=xl67 width=87 style='width:65pt'>-g</td>
  <td class=xl68 width=87 style='width:65pt'>producer group</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-t</td>
  <td class=xl68 width=87 style='width:65pt'>Topic name</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
</table>




## Nameserver command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
<tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=21 style='height:16.0pt'>
  <td rowspan=5 height=143 class=xl69 width=87 style='border-bottom:1.0pt
  height:100pt;border-top:none;width:65pt'>updateKvConfig</td>
  <td rowspan=5 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>Update the kv config of nameserver, unsupported yet</td>
  <td class=xl75 width=87 style='width:65pt'>-s</td>
  <td class=xl76 width=87 style='width:65pt'>Namespace</td>
 </tr>
 <tr height=21 style='height:16.0pt'>
  <td height=21 class=xl75 width=87 style='height:16.0pt;width:65pt'>-k</td>
  <td class=xl75 width=87 style='width:65pt'>Key</td>
 </tr>
 <tr height=21 style='height:16.0pt'>
  <td height=21 class=xl75 width=87 style='height:16.0pt;width:65pt'>-v</td>
  <td class=xl75 width=87 style='width:65pt'>Value</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td rowspan=4 height=126 class=xl69 width=87 style='border-bottom:1.0pt
  height:94.0pt;border-top:none;width:65pt'>deleteKvConfig</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>delete the kv config of nameserver</td>
  <td class=xl67 width=87 style='width:65pt'>-s</td>
  <td class=xl68 width=87 style='width:65pt'>Namespace</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-k</td>
  <td class=xl67 width=87 style='width:65pt'>key</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td height=57 class=xl67 width=87 style='height:43.0pt;width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=2 height=80 class=xl69 width=87 style='border-bottom:1.0pt
  height:60.0pt;border-top:none;width:65pt'>getNamesrvConfig</td>
  <td rowspan=2 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>Get the nameserver config</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=4 height=126 class=xl69 width=87 style='border-bottom:1.0pt
  height:94.0pt;border-top:none;width:65pt'>updateNamesrvConfig</td>
  <td rowspan=4 class=xl72 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>update the nameserver config</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-k</td>
  <td class=xl67 width=87 style='width:65pt'>Key</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-v</td>
  <td class=xl67 width=87 style='width:65pt'>Value</td>
 </tr>
</table>




## Other command

<table border=2 cellpadding=0 cellspacing=0 width=714>
 <col width=177>
 <col width=175>
 <col width=177>
 <col width=185>
<tr height=23 style='height:17.0pt'>
  <td height=23 class=xl63 width=177 style='height:17.0pt;width:133pt'>Command</td>
  <td class=xl64 width=175 style='width:131pt'>Function</td>
  <td class=xl64 width=177 style='width:133pt'>Argument</td>
  <td class=xl64 width=185 style='width:139pt'>Comment</td>
 </tr>
 <tr height=57 style='height:43.0pt'>
  <td rowspan=2 height=80 class=xl69 width=87 style='border-bottom:1.0pt
  height:60.0pt;border-top:none;width:65pt'>startMonitoring</td>
  <td rowspan=2 class=xl71 width=87 style='border-bottom:1.0pt
  border-top:none;width:65pt'>start the monitoring process to monitor the message number in the retry queue and so on.</td>
  <td class=xl67 width=87 style='width:65pt'>-n</td>
  <td class=xl68 width=87 style='width:65pt'>The address of nameserver. General format is `ip:port`.</td>
 </tr>
 <tr height=23 style='height:17.0pt'>
  <td height=23 class=xl67 width=87 style='height:17.0pt;width:65pt'>-h</td>
  <td class=xl68 width=87 style='width:65pt'>Get help information.</td>
 </tr>
</table>

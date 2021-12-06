---
title: "CLI Admin Tool"
permalink: /docs/cli-admin-tool/
modified: 2016-12-16T15:01:43-04:00
---

RocketMQ provides a CLI admin tool belt to query, manage and diagnose various issues.

{% include toc %}

# Prerequisite 

Make sure you have walked through [Quick Start](/docs/quick-start/) and [Core Concept](/docs/core-concept/) sections.


# How To Get it

The admin tool is shipped along with RocketMQ. Whether you download a pre-built binary version or build from source by yourself, you have the tool with the package.

If you want to look at the source code, please refer to [rocketmq-tools module](https://github.com/apache/rocketmq/tree/master/tools)

# How to use

The Admin Tool is very user friendly. Here, for demonstration purpose, *nix environment is assumed.

Change directory to ${PACKAGE}/bin, command `bash mqadmin`, you should see the following help menu.

    The most commonly used mqadmin commands are:
       updateTopic          Update or create topic
       deleteTopic          Delete topic from broker and NameServer.
       updateSubGroup       Update or create subscription group
       deleteSubGroup       Delete subscription group from broker.
       updateBrokerConfig   Update broker's config
       updateTopicPerm      Update topic perm
       topicRoute           Examine topic route info
       topicStatus          Examine topic Status info
       topicClusterList     Get cluster info for topic
       brokerStatus         Fetch broker runtime status data
       queryMsgById         Query Message by Id
       queryMsgByKey        Query Message by Key
       queryMsgByUniqueKey  Query Message by Unique key
       queryMsgByOffset     Query Message by offset
       queryMsgByUniqueKey  Query Message by Unique key
       printMsg             Print Message Detail
       sendMsgStatus        Send msg to broker.
       brokerConsumeStats   Fetch broker consume stats data
       producerConnection   Query producer's socket connection and client version
       consumerConnection   Query consumer's socket connection, client version and subscription
       consumerProgress     Query consumers's progress, speed
       consumerStatus       Query consumer's internal data structure
       cloneGroupOffset     Clone offset from other group.
       clusterList          List all of clusters
       topicList            Fetch all topic list from name server
       updateKvConfig       Create or update KV config.
       deleteKvConfig       Delete KV config.
       wipeWritePerm        Wipe write perm of broker in all name server
       resetOffsetByTime    Reset consumer offset by timestamp(without client restart).
       updateOrderConf      Create or update or delete order conf
       cleanExpiredCQ       Clean expired ConsumeQueue on broker.
       cleanUnusedTopic     Clean unused topic on broker.
       startMonitoring      Start Monitoring
       statsAll             Topic and Consumer tps stats
       syncDocs             Synchronize wiki and issue to github.com
       allocateMQ           Allocate MQ
       checkMsgSendRT       Check message send response time
       clusterRT            List All clusters Message Send RT
    
    See 'mqadmin help <command>' for more information on a specific command.


As you see, the most commonly used commands are listed with a brief description. To get detailed manual of each command, `bash mqadmin help <command>`. For example, command `bash mqadmin help clusterList` will bring out the following help text:

    usage: mqadmin clusterList [-h] [-i <arg>] [-m] [-n <arg>]
     -h,--help                Print help
     -i,--interval <arg>      specify intervals numbers, it is in seconds
     -m,--moreStats           Print more stats
     -n,--namesrvAddr <arg>   Name server address list, eg: '192.168.0.1:9876;192.168.0.2:9876'


The help text lists possible options and interpretation of each option. 


# Command Manual
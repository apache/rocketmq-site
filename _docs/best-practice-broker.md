---
title: "Best Practice For Broker"
permalink: /docs/best-practice-broker/
modified: 2016-12-24T15:01:43-04:00
---

Some useful tips for users.

{% include toc %}

## Broker Role
Broker Role is ASYNC_MASTER, SYNC_MASTER or SLAVE.
If you cannot tolerate message missing, we suggest you deploy SYNC_MASTER and attach a SLAVE to it.
If you feel ok about missing, but you want the Broker to be always available, you may deploy ASYNC_MASTER with SLAVE.
If you just want to make it easy, you may only need a ASYNC_MASTER without SLAVE.
## FlushDiskType
ASYNC_FLUSH is recommended, for SYNC_FLUSH is expensive and will cause too much performance loss. If you want reliability, we recommend you use SYNC_MASTER with SLAVE.
## ReentrantLock vs CAS
to be finished
## os.sh
to be finished



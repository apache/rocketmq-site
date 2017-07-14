---
title: "RocketMQ JVM/Linux Configuration"
permalink: /docs/system-config/
modified: 2017-7-14T15:01:43-04:00
---

This is an introduction for configuring RocketMQ broker JVM/OS parameters. It points out certain specified configurations that should be thinking about before deploying RocketMQ cluster.

{% include toc %}

# JVM Options

The latest released version of JDK 1.8 is recommended, with server compiler and a 8g heap. Set the same Xms and Xmx value to prevent the JVM from resizing the heap for better performance. A simple JVM configurations looks like this: 

```
-server -Xms8g -Xmx8g -Xmn4g
```

If you don't care about the boot time of RocketMQ broker, pre-touch the Java heap to make sure that every page will be allocated during JVM initialization is a better choice. Those who don't care about the boot time can enable it:

```
-XX:+AlwaysPreTouch
```

Disable biased locking may reduce JVM pauses: 

```
-XX:-UseBiasedLocking
```

As for garbage collection, G1 collector with JDK 1.8 is recommended:

```
-XX:+UseG1GC -XX:G1HeapRegionSize=16m -XX:G1ReservePercent=25 -XX:InitiatingHeapOccupancyPercent=30
```

These GC options looks a little aggressive, but it's proved to have good performance in our production environment.

Don't set a too small value for `-XX:MaxGCPauseMillis`, otherwise JVM will use a small young generation to achieve this goal which will cause very frequent minor GC.

And use rolling GC log file is recommended:

```
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=30m
```

If write GC file will increase latency of broker, consider redirect GC log file to a memory file system:

```
-Xloggc:/dev/shm/mq_gc_%p.log
```

# Linux Kernel Parameters

There is a `os.sh` script that lists a lot of kernel parameters in folder `bin` which can be used for production use with minor changes. Below parameters need attention, and more details please refer to documentation for /proc/sys/vm/*[1].

**vm.extra_free_kbytes**, tells the VM to keep extra free memory between the threshold where background reclaim (kswapd) kicks in, and the threshold where direct reclaim (by allocating processes) kicks in. RocketMQ uses this parameter to avoid high latency in memory allocation.

**vm.min_free_kbytes**, if you set this to lower than 1024KB, your system will
become subtly broken, and prone to deadlock under high loads. 

**vm.max_map_count**, limits the maximum number of memory map areas a process
may have. RocketMQ will use mmap to load CommitLog and ConsumeQueue, so set a bigger value for this parameter is recommended.

**vm.swappiness**, define how aggressive the kernel will swap memory pages. Higher values will increase agressiveness, lower values decrease the amount of swap. 10 for this value to avoid swap latency is recommended.

**File descriptor limits**, RocketMQ needs open file descriptors for files(CommitLog and ConsumeQueue) and network connections. We recommend set 655350 for file descriptors.

**Disk scheduler**, the deadline I/O scheduler is recommended for RocketMQ, which attempts to provide a guaranteed latency for requests[2].


# Reference
1. https://www.kernel.org/doc/Documentation/sysctl/vm.txt
2. https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/ch06s04s02.html
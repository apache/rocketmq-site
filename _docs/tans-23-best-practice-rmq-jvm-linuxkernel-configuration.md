# RocketMQ JVM/Linux配置

本文是配置RocketMQ代理JVM/OS参数的简介。它指出了在部署RocketMQ集群之前应该考虑的某些指定配置。


## JVM选项

推荐使用最新发布的JDK 1.8版本，包括服务器编译器和一个8g堆。通过设置相同的Xms和Xmx值来防止JVM调整堆大小以获得更好的性能。简单的JVM配置如下所示：

```
-server -Xms8g -Xmx8g -Xmn4g
```

如果您不关心RocketMQ代理的启动时间，还有一种更好的选择，就是通过预触摸Java堆以确保在JVM初始化期间每个页面都将被分配。那些不关心启动时间的人可以启用它：
```
-XX:+AlwaysPreTouch
```

禁用偏置锁定可能会减少JVM暂停：
```
-XX:-UseBiasedLocking
```

至于垃圾回收，建议使用带JDK 1.8的G1收集器：
```
-XX:+UseG1GC -XX:G1HeapRegionSize=16m -XX:G1ReservePercent=25 -XX:InitiatingHeapOccupancyPercent=30
```
这些GC选项看起来有点激进，但事实证明它在我们的生产环境中具有良好的性能。

不要把`-XX:MaxGCPauseMillis`的值设置太小，否则JVM将使用一个小的年轻代来实现这个目标，这将导致非常频繁的minor GC。

建议使用rolling GC日志文件：
```
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=30m
```
如果写入GC文件会增加代理的延迟，可以考虑将GC日志文件重定向到内存文件系统：

```
-Xloggc:/dev/shm/mq_gc_%p.log123
```



## Linux内核参数

`os.sh`脚本在`bin`文件夹中列出了许多内核参数，可以进行微小的更改然后用于生产用途。下面的参数需要注意，更多细节请参考/proc/sys/vm/*[1]的文档。

**vm.extra_free_kbytes**，告诉VM在后台回收（kswapd）启动的阈值与直接回收（通过分配进程）的阈值之间保留额外的可用内存.RocketMQ使用此参数来避免内存分配中的长延迟。

**vm.min_free_kbytes**，如果将其设置为低于1024KB，将会巧妙的将系统破坏，并且系统在高负载下容易出现死锁。

**vm.max_map_count**，限制一个进程可能具有的最大内存映射区域数。RocketMQ将使用mmap加载CommitLog和ConsumeQueue，因此建议将为此参数设置较大的值。
【agressiveness】—->【aggressiveness】

**vm.swappiness**，定义内核交换内存页面的积极程度。较高的值会增加攻击性，较低的值会减少交换量。建议将值设置为10来避免交换延迟。

**File descriptor limits**，RocketMQ需要为文件（CommitLog和ConsumeQueue）和网络连接打开文件描述符。我们建议设置文件描述符的值为655350。

**Disk scheduler**，RocketMQ建议使用I/O截止时间调度器，它试图为请求提供有保证的延迟[2]。



## 参考

1. [https://www.kernel.org/doc/Documentation/sysctl/vm.txt](https://www.kernel.org/doc/Documentation/sysctl/vm.txt)
2. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/ch06s04s02.html](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/ch06s04s02.html)



**更新：** 2017年7月15日 

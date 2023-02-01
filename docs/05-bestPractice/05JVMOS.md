# JVM/OS配置


本小节主要介绍系统（JVM/OS）相关的配置。

## 1 JVM选项

推荐使用最新发布的 JDK 1.8 版本。通过设置相同的 Xms 和 Xmx 值来防止 JVM 调整堆大小以获得更好的性能。生产环境 JVM 配置如下所示：

```text
-server -Xms8g -Xmx8g 
```

当 JVM 是默认 8 字节对齐，建议配置最大堆内存不要超过 32 G，否则会影响 JVM 的指针压缩技术，浪费内存。

如果您不关心 RocketMQ Broker 的启动时间，还有一种更好的选择，就是通过 “预触摸” Java 堆以确保在JVM初始化期间每个页面都将被分配。那些不关心启动时间的人可以启用它：

```text
-XX:+AlwaysPreTouch  
```

禁用偏置锁定可能会减少 JVM 暂停：

```text
-XX:-UseBiasedLocking   
```

垃圾回收，建议使用 JDK 1.8 自带的 G1 收集器：

```text
-XX:+UseG1GC 
-XX:G1HeapRegionSize=16m   
-XX:G1ReservePercent=25 
-XX:InitiatingHeapOccupancyPercent=30
```

这些 GC 选项看起来有点激进，但事实证明它在我们的生产环境中具有良好的性能。

另外不要把 -XX:MaxGCPauseMillis 的值设置太小，否则 JVM 将使用一个小的年轻代来实现这个目标，这将导致非常频繁的 minor GC，所以建议使用 rolling GC 日志文件：

```text
-XX:+UseGCLogFileRotation   
-XX:NumberOfGCLogFiles=5 
-XX:GCLogFileSize=30m
```

如果写入 GC 文件会增加代理的延迟，可以考虑将 GC 日志文件重定向到内存文件系统：

```text
-Xloggc:/dev/shm/mq_gc_%p.log123   
```

## 2 Linux内核参数

 os.sh 脚本在 bin 文件夹中列出了许多内核参数，可以进行微小的更改然后用于生产用途。下面的参数需要注意，更多细节请参考 /proc/sys/vm/*的 [文档](https://www.kernel.org/doc/Documentation/sysctl/vm.txt)

- **vm.extra_free_kbytes**  告诉 VM 在后台回收（kswapd）启动的阈值与直接回收（通过分配进程）的阈值之间保留额外的可用内存。RocketMQ 使用此参数来避免内存分配中的长延迟。（与具体内核版本相关）
- **vm.min_free_kbytes**  如果将其设置为低于 1024 KB，将会巧妙的将系统破坏，并且系统在高负载下容易出现死锁。
- **vm.max_map_count**  限制一个进程可能具有的最大内存映射区域数。RocketMQ 将使用 MMAP 加载 CommitLog 和 ConsumeQueue，因此建议将为此参数设置较大的值。
- **vm.swappiness**  定义内核交换内存页面的积极程度。较高的值会增加攻击性，较低的值会减少交换量。建议将值设置为 10 来避免交换延迟。
- **File descriptor limits**  RocketMQ 需要为文件（ CommitLog 和 ConsumeQueue ）和网络连接打开文件描述符。我们建议设置文件描述符的值为 655350。
- [Disk scheduler](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/ch06s04s02.html)  RocketMQ建议使用I/O截止时间调度器，它试图为请求提供有保证的延迟。

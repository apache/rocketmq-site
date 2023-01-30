# JVM/OS Configuration

This section focuses on system (JVM/OS) related configuration.

## 1.JVM Options

The latest release of JDK 1.8 is recommended. Prevent the JVM from adjusting the heap size for better performance by setting the same Xms and Xmx values. The production JVM configuration is as follows:

```text
-server -Xms8g -Xmx8g -Xmn4g 
```

When the JVM is 8-byte aligned by default, it is recommended that the maximum heap memory not exceed 32 G. Otherwise, the pointer compression technology of the JVM will be affected and memory will be wasted.

If you don't care about the startup time of the RocketMQ Broker, a better option is to "pre-touch" the Java heap to ensure that every page will be allocated during JVM initialization. Those who don't care about startup time can enable it:

```text
-XX:+AlwaysPreTouch  
```

Disabling bias locking may reduce JVM pauses:

```text
-XX:-UseBiasedLocking   
```

Garbage collection, we recommend using the G1 collector that came with JDK 1.8:

```text
-XX:+UseG1GC 
-XX:G1HeapRegionSize=16m   
-XX:G1ReservePercent=25 
-XX:InitiatingHeapOccupancyPercent=30
```

These GC options may seem aggressive, but they proved to perform well in our production environment.

Also, don't set the value of -XX:MaxGCPauseMillis too small, or the JVM will use a small young generation to achieve this goal, which will result in very frequent minor GCS, so rolling GC log files are recommended:

```text
-XX:+UseGCLogFileRotation   
-XX:NumberOfGCLogFiles=5 
-XX:GCLogFileSize=30m
```

If writing to GC files increases the agent's latency, consider redirecting GC log files to the in-memory file system:

```text
-Xloggc:/dev/shm/mq_gc_%p.log123   
```

## 2.Linux Kernel Parameters

The os.sh script lists many kernel parameters in the bin folder, which can be changed slightly and then used for production purposes. Note the following parameters, for more details, see [Documentation](https://www.kernel.org/doc/Documentation/sysctl/vm.txt) in /proc/sys/vm/*

- **vm.extra_free_kbytes**  The VM is told to keep extra available memory between the threshold at which background reclamation (kswapd) starts and the threshold at which it is directly reclaimed (by allocating processes). RocketMQ uses this parameter to avoid long delays in memory allocation. (depending on the kernel version)
- **vm.min_free_kbytes**  If it is set below 1024 KB, it will subtly break the system, and the system is prone to deadlock under high load.
- **vm.max_map_count**  Limits the maximum number of memory mapped regions that a process can have. RocketMQ will load CommitLog and ConsumeQueue using MMAP, so it is recommended to set this parameter to a large value.
- **vm.swappiness**  Defines how aggressively the kernel swaps memory pages. Higher values increase aggression, lower values decrease exchange volume. A value of 10 is recommended to avoid exchange delays.
- **File descriptor limits**  RocketMQ needs to open file descriptors for files (CommitLog and ConsumeQueue) and network connections. We recommend setting the file descriptor value to 655350.
- [Disk scheduler](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/ch06s04s02.html)  RocketMQ recommends the use of an I/O deadline scheduler, which attempts to provide a guaranteed delay for requests.
# 事务消息发送

## 事务消息介绍

在一些对数据一致性有强需求的场景，可以用 Apache RocketMQ  事务消息来解决，从而保证上下游数据的一致性。

![事务消息示例一](../picture/事务消息示例一.png)

以电商交易场景为例，用户支付订单这一核心操作的同时会涉及到下游物流发货、积分变更、购物车状态清空等多个子系统的变更。当前业务的处理分支包括：
- 主分支订单系统状态更新：由未支付变更为支付成功。
- 物流系统状态新增：新增待发货物流记录，创建订单物流记录。
- 积分系统状态变更：变更用户积分，更新用户积分表。
- 购物车系统状态变更：清空购物车，更新用户购物车记录。

![事务消息示例一](../picture/事务示例二.png)

使用普通消息和订单事务无法保证一致的原因，本质上是由于普通消息无法像单机数据库事务一样，具备提交、回滚和统一协调的能力。 而基于 RocketMQ 的分布式事务消息功能，在普通消息基础上，支持二阶段的提交能力。将二阶段提交和本地事务绑定，实现全局提交结果的一致性。

![事务消息1](../picture/事务消息1.png)

事务消息发送分为两个阶段。第一阶段会发送一个**半事务消息**，半事务消息是指暂不能投递的消息，生产者已经成功地将消息发送到了 Broker，但是Broker 未收到生产者对该消息的二次确认，此时该消息被标记成“暂不能投递”状态，如果发送成功则执行本地事务，并根据本地事务执行成功与否，向 Broker 半事务消息状态（commit或者rollback），半事务消息只有 commit 状态才会真正向下游投递。如果由于网络闪断、生产者应用重启等原因，导致某条事务消息的二次确认丢失，Broker 端会通过扫描发现某条消息长期处于“半事务消息”时，需要主动向消息生产者询问该消息的最终状态（Commit或是Rollback）。这样最终保证了本地事务执行成功，下游就能收到消息，本地事务执行失败，下游就收不到消息。总而保证了上下游数据的一致性。

整个事务消息的详细交互流程如下图所示：

![事务消息2](../picture/事务消息2.png)

## 事务消息步骤

事务消息**发送**步骤如下：

1. 生产者将半事务消息发送至 `RocketMQ Broker`。
2. `RocketMQ Broker` 将消息持久化成功之后，向生产者返回 Ack 确认消息已经发送成功，此时消息暂不能投递，为半事务消息。
3. 生产者开始执行本地事务逻辑。
4. 生产者根据本地事务执行结果向服务端提交二次确认结果（Commit或是Rollback），服务端收到确认结果后处理逻辑如下：
- 二次确认结果为Commit：服务端将半事务消息标记为可投递，并投递给消费者。
- 二次确认结果为Rollback：服务端将回滚事务，不会将半事务消息投递给消费者。
5. 在断网或者是生产者应用重启的特殊情况下，若服务端未收到发送者提交的二次确认结果，或服务端收到的二次确认结果为Unknown未知状态，经过固定时间后，服务端将对消息生产者即生产者集群中任一生产者实例发起消息回查。

6. :::note 需要注意的是，服务端仅仅会按照参数尝试指定次数，超过次数后事务会强制回滚，因此未决事务的回查时效性非常关键，需要按照业务的实际风险来设置 :::

事务消息**回查**步骤如下：
7. 生产者收到消息回查后，需要检查对应消息的本地事务执行的最终结果。
8. 生产者根据检查得到的本地事务的最终状态再次提交二次确认，服务端仍按照步骤4对半事务消息进行处理。

## 示例代码

示例代码如下：

```java
public class TransactionProducer {
    public static void main(String[] args) throws MQClientException, InterruptedException {
        TransactionListener transactionListener = new TransactionListenerImpl();
        TransactionMQProducer producer = new TransactionMQProducer("please_rename_unique_group_name");
        ExecutorService executorService = new ThreadPoolExecutor(2, 5, 100, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(2000), new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread thread = new Thread(r);
                thread.setName("client-transaction-msg-check-thread");
                return thread;
            }
        });

        producer.setExecutorService(executorService);
        producer.setTransactionListener(transactionListener);
        producer.start();

        String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
        for (int i = 0; i < 10; i++) {
            try {
                Message msg =
                    new Message("TopicTest", tags[i % tags.length], "KEY" + i,
                        ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
                SendResult sendResult = producer.sendMessageInTransaction(msg, null);
                System.out.printf("%s%n", sendResult);

                Thread.sleep(10);
            } catch (MQClientException | UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }

        for (int i = 0; i < 100000; i++) {
            Thread.sleep(1000);
        }
        producer.shutdown();
    }

    static class TransactionListenerImpl implements TransactionListener {
        private AtomicInteger transactionIndex = new AtomicInteger(0);

        private ConcurrentHashMap<String, Integer> localTrans = new ConcurrentHashMap<>();

        @Override
        public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
            int value = transactionIndex.getAndIncrement();
            int status = value % 3;
            localTrans.put(msg.getTransactionId(), status);
            return LocalTransactionState.UNKNOW;
        }

        @Override
        public LocalTransactionState checkLocalTransaction(MessageExt msg) {
            Integer status = localTrans.get(msg.getTransactionId());
            if (null != status) {
                switch (status) {
                    case 0:
                        return LocalTransactionState.UNKNOW;
                    case 1:
                        return LocalTransactionState.COMMIT_MESSAGE;
                    case 2:
                        return LocalTransactionState.ROLLBACK_MESSAGE;
                    default:
                        return LocalTransactionState.COMMIT_MESSAGE;
                }
            }
            return LocalTransactionState.COMMIT_MESSAGE;
        }
    }
}
```

事务消息的发送不再使用 DefaultMQProducer，而是使用 `TransactionMQProducer` 进行发送，上述的例子中设置了事务回查的线程池，如果不设置也会默认生成一个，最重要的是需要实现 `TransactionListener` 接口，并传入 `TransactionMQProducer`。

:::note

TransactionListener接口的定义如下：

````java
public interface TransactionListener {
    /**
     * When send transactional prepare(half) message succeed, this method will be invoked to execute local transaction.
     *
     * @param msg Half(prepare) message
     * @param arg Custom business parameter
     * @return Transaction state
     */
    LocalTransactionState executeLocalTransaction(final Message msg, final Object arg);

    /**
     * When no response to prepare(half) message. broker will send check message to check the transaction status, and this
     * method will be invoked to get local transaction status.
     *
     * @param msg Check message
     * @return Transaction state
     */
    LocalTransactionState checkLocalTransaction(final MessageExt msg);
}
````
:::

`executeLocalTransaction` 是半事务消息发送成功后，执行本地事务的方法，具体执行完本地事务后，可以在该方法中返回以下三种状态：

- `LocalTransactionState.COMMIT_MESSAGE`：提交事务，允许消费者消费该消息
- `LocalTransactionState.ROLLBACK_MESSAGE`：回滚事务，消息将被丢弃不允许消费。
- `LocalTransactionState.UNKNOW`：暂时无法判断状态，等待固定时间以后Broker端根据回查规则向生产者进行消息回查。

`checkLocalTransaction`是由于二次确认消息没有收到，Broker端回查事务状态的方法。回查规则：本地事务执行完成后，若Broker端收到的本地事务返回状态为LocalTransactionState.UNKNOW，或生产者应用退出导致本地事务未提交任何状态。则Broker端会向消息生产者发起事务回查，第一次回查后仍未获取到事务状态，则之后每隔一段时间会再次回查。

:::caution

此外，需要注意的是事务消息的生产组名称 ProducerGroupName不能随意设置。事务消息有回查机制，回查时Broker端如果发现原始生产者已经崩溃崩溃，则会联系同一生产者组的其他生产者实例回查本地事务执行情况以Commit或Rollback半事务消息。

:::
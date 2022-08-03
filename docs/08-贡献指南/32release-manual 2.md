# 发布手册

## 1. 前言

#### 1.1 Apache 版本发布文档

参考以下链接，了解 ASF 版本发布流程：

* [Apache Release Guide](http://www.apache.org/dev/release-publishing)
* [Apache Release Policy](http://www.apache.org/dev/release.html)
* [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 PGP 签名

遵循 Apache 版本发布指南，对发布版本签名，用户也可据此判断下载的版本是否被篡改。

创建 ```pgp``` 密钥用于版本签名，使用 **\<your Apache ID\>@apache.org** 作为密钥 USER-ID

详情可参考  [Apache Releases Signing documentation](https://infra.apache.org/release-signing)，[Cryptography with OpenPGP](http://www.apache.org/dev/openpgp.html)

生成密钥的简要流程：

* 通过 `gpg --gen-key` 生成一个新的 ```gpg``` 密钥, 设置密钥长度为 4096 并设置永不过期
* 通过 `gpg --keyserver keys.openpgp.org --send-key <your key id>` 上传密钥到公钥服务器
* 通过 `gpg --armor --export <your key id> >> gpgapachekey.txt` 导出公钥到文本文件
* 获得其他 committer 签名的密钥 ( 可选 )
* 将生成的密钥添加到 [KEYS file](https://dist.apache.org/repos/dist/dev/rocketmq/KEYS) (由 release manager 上传至 svn 仓库)

**Tips:** 需要设置默认公钥, 若有多个公钥，请修改 `~/.gnupg/gpg.conf` 

参考示例：

```shell
[root@localhost ~]# gpg --gen-key
gpg (GnuPG) 2.0.22; Copyright (C) 2013 Free Software Foundation, Inc.
...
# 密钥生成目录
gpg: directory `/root/.gnupg' created
gpg: new configuration file `/root/.gnupg/gpg.conf' created
gpg: WARNING: options in `/root/.gnupg/gpg.conf' are not yet active during this run
gpg: keyring `/root/.gnupg/secring.gpg' created
gpg: keyring `/root/.gnupg/pubring.gpg' created
Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection?
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.
# 设置 USER-ID
Real name: rocketmq
Email address: rocketmq@apache.org
Comment: rocketmq
You selected this USER-ID:
    "rocketmq (rocketmq) <rocketmq@apache.org>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

...
gpg: /root/.gnupg/trustdb.gpg: trustdb created
gpg: key 7DE280AF marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
pub   4096R/7DE280AF 2022-07-05
      Key fingerprint = 421D C10E 9CC3 D261 9F89  C777 86BB 17AA 7DE2 80AF
uid                  rocketmq (rocketmq) <rocketmq@apache.org>
sub   4096R/65B9828A 2022-07-05
```

生成的公钥和私钥地址：

```shell
gpg: keyring `/root/.gnupg/secring.gpg' created
gpg: keyring `/root/.gnupg/pubring.gpg' created
```

将生成的公钥和私钥转化为 ASCII 形式：

```shell
gpg --armor --output /root/gpgtest/public-key.txt --export 7DE280AF
gpg --armor --output /root/gpgtest/private-key.txt --export-secret-keys 7DE280AF
```

查看密钥列表：

```shell
[root@localhost ~]# gpg --list-keys
/root/.gnupg/pubring.gpg
------------------------
pub   4096R/7DE280AF 2022-07-05
uid                  rocketmq (rocketmq) <rocketmq@apache.org>
sub   4096R/65B9828A 2022-07-05
```

上传公钥到公钥服务器

```shell
[root@localhost gpgtest]# gpg --keyserver keys.openpgp.org --send-key 7DE280AF
gpg: sending key 7DE280AF to hkp server keys.openpgp.org
```

#### 1.3 POM 配置

配置 POM 文件，以便将版本部署到 ASF Nexus 仓库。

① 添加 Apache POM 继承默认设置

```XML
<parent>
    <groupId>org.apache</groupId>
    <artifactId>apache</artifactId>
    <version>XX</version>
</parent>
```

② Maven 配置文件 ```settings.xml``` 中添加密钥信息

```xml
<settings>
    <profiles>
        <profile>
            <id>signed_release</id>
            <properties>
                <mavenExecutorId>forked-path</mavenExecutorId>
                <gpg.keyname>yourKeyName</gpg.keyname>
                <deploy.url>https://dist.apache.org/repos/dist/dev/rocketmq/</deploy.url>
            </properties>
        </profile>
    </profiles>
    <servers>
        <!-- To publish a snapshot of some part of Maven -->
        <server>
            <id>apache.snapshots.https</id>
            <username>yourApacheID</username>
            <!-- Use the password encryption by maven -->
            <password>yourApachePassword</password>
        </server>
        <!-- To stage a release of some part of Maven -->
        <server>
            <id>apache.releases.https</id>
            <username>yourApacheID</username>
            <password>yourApachePassword</password>
        </server>
        <server>
            <id>gpg.passphrase</id>
            <passphrase>yourKeyPassword</passphrase>
        </server>
    </servers>
</settings>
```

**Tips:** 推荐使用 [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) 加密 ```gpg.passphrase``` 

③ 构建 Artifacts 并签名

```shell
mvn clean install -Papache-release
```

#### 1.4 处理 issues

解决与该发布版本相关的 JIRA issues 和 GitHub issues

检查 MQVsersion 是否与发布版本一致。

#### 1.5 发布 Release Notes

通过 [RocketMQ JIRA](https://issues.apache.org/jira/browse/ROCKETMQ/) 生成 Release Notes，推送到 [rocketmq-site](https://github.com/apache/rocketmq-site), 并添加链接至版本选举邮件。

## 2.构建 Source Release

使用 [Maven Release plugin](https://maven.apache.org/maven-release/maven-release-plugin/) 版本发布插件，发布 Artifact 至 ASF Nexus 暂存库，完成版本验证和版本投票后，拷贝至 Apache SVN 版本库。

#### 2.1 检查 RocketMQ  版本

确认 MQVersion 版本，若与 `release-4.5.0` 形式不符或版本不一致，修改至正确并推送到 ```develop  ```分支。

```java
public static final int CURRENT_VERSION = Version.V4_5_0.ordinal();
```

#### 2.2 暂存至 ASF Nexus 仓库

切换至 ```develop``` 分支，确认与该版本相关的 GitHub PRs 均已合并。

① 配置 pom.xml 文件

```xml
<scm>
    <url>git@github.com:apache/rocketmq.git</url>
    <connection>scm:git:git@github.com:apache/rocketmq.git</connection>
    <developerConnection>scm:git:git@github.com:apache/rocketmq.git</developerConnection>
    <tag>rocketmq-all-x.x.x</tag>
</scm>
```

② maven release plugin

```shell
mvn release:clean
mvn release:prepare
mvn release:perform
```

执行以下流程将生成的 Artifacts 放入暂存库：

1. `mvn clean release:clean`：清除构建失败及丢弃的版本
2. `mvn release:prepare -Psigned_release -Darguments="-DskipTests"`：根据 ```SCM``` 属性更新 tag
3. `mvn -Psigned_release release:perform -Darguments="-DskipTests"`：将生成 artifacts 暂存到 [Nexus repo](https://repository.apache.org/#stagingRepositories)。可添加 ```-DdryRun=true``` 参数执行预演

执行完上述流程可在 [Nexus staging repo](https://repository.apache.org/#stagingRepositories) 或本地分支的 ```target``` 目录下找到预发布版本的 Artifacts 

**Tips:** 只发布源码版本，仅需要保留源码和相关 jar 文件，Nexus GUI 中右键 ```delete``` 其余 artifact

#### 2.3 rc 版本文件

- 预发布版本投票通过前会暂存在 [/dev/rocketmq](https://dist.apache.org/repos/dist/dev/rocketmq/) ，存放于 ```x.x.x-rcx/``` 目录下，需要提供的文件如下：

> rocketmq-all-x1.x2.x3-bin-release.zip  
>
> rocketmq-all-x1.x2.x3-bin-release.zip.asc  
>
> rocketmq-all-x1.x2.x3-bin-release.zip.sha512  
>
> rocketmq-all-x1.x2.x3-source-release.zip  
>
> rocketmq-all-x1.x2.x3-source-release.zip.asc  
>
> rocketmq-all-x1.x2.x3-source-release.zip.sha512  

通过 ```gpg``` 指令生成签名文件和验证文件：

- 生成 ```asc``` 文件

```
gpg --clearsign rocketmq-all-x1.x2.x3-bin-release.zip
gpg --clearsign rocketmq-all-x1.x2.x3-source-release.zip
```

- 生成 ```sha512``` 文件

```
gpg --print-md SHA512 rocketmq-all-x1.x2.x3-bin-release.zip > rocketmq-all-x1.x2.x3-bin-release.zip.sha512
gpg --print-md SHA512 rocketmq-all-x1.x2.x3-source-release.zip >  rocketmq-all-x1.x2.x3-source-release.zip.sha512
```

**Tips:** 源码版本和二进制版本应以 `rocketmq-all` 开头，以便使用 Docker 构建 <a target="_blank" href="https://github.com/apache/rocketmq-docker/blob/a2672f62cc5171263ffc856ab5657291efba1912/image-build/Dockerfile-centos#L58-L59">RocketMQ Docker Build</a>

#### 2.4 回滚并重试

若执行 staging 过程出现问题，按照如下流程进行回滚：

- 删除在 2.2 步骤中创建的 tag

  - 列出所有 tag ，并找到最新创建的

  ```
  git tag -ln
  ```
  
  - 删除本地仓库的 tag, 

  ```
  git tag -d rocketmq-all-x1.x2.x3
  ```
  
  - 推送更新至 GitHub

  ```
  git push origin :refs/tags/rocketmq-all-x1.x2.x3
  ```
  
- 删除 2.2 步骤中开发分支的提交记录

  - 列出 git 日志

  ```
  git log
  ```

  - 找到最新的提交记录，标注类似如下：

  > des1: [maven-release-plugin] prepare release rocketmq-all-4.9.2]  
  >
  > des2: [maven-release-plugin] prepare for next development iteration]

  - 删除 commits

  ```
  git reset --hard commit-id
  git push origin HEAD --force
  ```
  
- 删除 [Nexus](https://repository.apache.org/#welcome) 中待回退版本
  
- 回退至步骤 2.1 重做

## 3.构建 binary release

二进制版本和源码版本使用相同的代码分支构建，需要注意操作系统版本。

有些依赖，比如 ```netty tc-native``` 对操作系统敏感。

* 确保 checkout 至预发布版本分支
* 确保所有单元测试均可通过 `mvn clean install`
* 确保所有集成测试均可通过 `mvn clean install -Pit-test`

成功构建后，同样需要生成 .asc 文件和 .sha512 文件，完成验证和投票后，最终并拷贝到 [svn](https://dist.apache.org/repos/dist/release/rocketmq/) 仓库。


## 4. 版本验证

#### 4.1 binary release 验证清单

 *   检查构建依赖包的操作系统，netty-tcnative 操作系统敏感
 *   确保许可证为 Apache V2   
 *   若引入了第三方依赖，需要更新 NOTICE
 *   提取压缩文件检查版本是否正确
 *   验证 ASC 签名, SHA512 摘要
 *   运行 Quick-Start 启动 nameserver 和 broker
 *   运行 clusterList 命令检查版本是否正确
 *   确保没有 nohup.out 文件

#### 4.2 source release 验证清单

 * 确保许可证为 Apache V2   
 * 若引入了第三方依赖，需要更新 NOTICE
 * 提取压缩文件检查版本是否正确
 * 验证 ASC 签名, SHA512 摘要
 * 编译源码，运行 Quick-Start 启动 nameserver 和 broker
 * 运行 clusterList 命令判断版本是否正确

#### 4.3 验证工具

按照下面的流程验证 GPG 签名、SHA512 摘要

1. 下载发布版本的依赖包, ```.asc``` 文件，```.sha512``` 文件
2. 在 Unix 系统上执行如下指令：

  ```shell
  for file in `find . -type f -iname '*.asc'`
  do
      gpg --verify ${file} 
  done
  ```

  or

  ```shell
  gpg --verify rocketmq-all-%version-number%-source-release.zip.asc rocketmq-all-%version-number%-bin-release.zip
  ```

出现 ```Good signature``` 说明签名正确

  ```text
  gpg: Good signature from ... gpg: Signature made ...
  ```

3. 根据 SHA512 进行版本一致性验证

  ```shell
  gpg --print-md SHA512 rocketmq-all-%version-number%-source-release.zip 
  gpg --print-md SHA512 rocketmq-all-%version-number%-bin-release.zip 
  ```

## 5. 关闭 staging repo

预发布版本完成清单验证后, 关闭 Nexus 暂存库，准备进行版本选举。

选择 Nexus 上的 `orgapacherocketmq-XXX` 待发布版本，点击 ```Close``` 图标，关闭暂存库。

关闭之前，Nexus 会进行一些系列的签名验证和文本校验。

校验通过, Nexus 会关闭仓库并提供暂存库URL，在选举邮件中标注为：The staging repo

若校验失败，修复 issues 回滚并重新执行版本发布流程。

若以上工作均已完备，使用 SVN 拷贝至 [/dev/rocketmq](https://dist.apache.org/repos/dist/dev/rocketmq/) Apache 远程仓库。

## 6. 版本选举

RocketMQ 社区通过 **dev@rocketmq.apache.org** 邮件列表进行版本选举。

参考 [voting process](http://www.apache.org/foundation/voting.html)，了解Apache 投票流程。

### 6.1 社区投票

邮件列表：[dev list](mailto:dev@rocketmq.apache.org)

邮件主题：**[VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** 

> Hello RocketMQ Community,  
>
> This is the vote for \<release version\> of Apache RocketMQ.  
>
> ${A brief introduction to RocketMQ and the features of this release.}
>
> **The artifacts:**  
>
> https://dist.apache.org/repos/dist/dev/rocketmq/${release version}
>
> **The staging repo:**  
>
> https://repository.apache.org/content/repositories/orgapacherocketmq-XXX/
>
> **Git tag for the release:**  
>
> \<link to the tag of GitHub repo\>  
>
> **Hash for the release tag:**  
>
> \<Hash value of the release tag\>  
>
> **Release Notes:**  
>
> \<insert link to the rocketmq release notes\>  
>
> The artifacts have been signed with Key : \<ID of signing key\>, which can be found in the keys file:  
>
> https://dist.apache.org/repos/dist/dev/rocketmq/KEYS  
>
> The vote will be open for at least 72 hours or until necessary number of votes are reached.  
>
> Please vote accordingly:  
>
> [ ] +1  approve    
>
> [ ] +0  no opinion    
>
> [ ] -1  disapprove with the reason    
>
> Thanks,  
>
> The Apache RocketMQ Team  

**Tips:** Hash for the release tag:  可使用 commit id 

### 6.2 结果公示

72 小时后，若至少有 3 票通过而没有反对票，则发送如下邮件庆祝版本发布

邮件主题：**[RESULT][VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** 

> Hello RocketMQ Community,  
>
> The Apache RocketMQ `<release version>` vote is now closed and has passed with [number] binding +1s, [number] non-binding +1s and no 0 or -1:  
>
> **Binding votes +1s:**  
>
> User Name (Apache ID)    
>
> User Name (Apache ID)    
>
> User Name (Apache ID)    
>
> ....
>
> **Non-binding votes +1s:**  
>
> User Name (Apache ID) 
>
>
> ....  
>
> The release will be published soon.  
>
> Thanks,   
>
> The Apache RocketMQ Team

若投票未通过, 修复 issues, 回滚, 增加 RC 的编号，重新启动版本发布流程，重新发起版本投票流程

更新邮件主题：**[RESTART][VOTE][#\]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>**


## 7. 版本发布

Apache RocketMQ PPMC 投票通过后, 发布版本到 Maven Nexus 仓库和 Apache 版本仓库

1. 发布到 Nexus 仓库, 选择暂存区的  **orgapacherocketmq-XXX** 点击 `Release` 图标发布
2. 发布到 Apache 版本仓库, 使用 SVN 拷贝版本至 [/release/rocketmq](https://dist.apache.org/repos/dist/release/rocketmq/) 
3. 合并 [Apache RocketMQ](https://github.com/apache/rocketmq) ```develop``` 分支至 ```master``` 分支
4. 添加 release notes 到 [Releases · apache/rocketmq](https://github.com/apache/rocketmq/releases) 
5. 创建新分支，并命名为 `release-x.x.x` 
6. 更新 [apache/rocketmq-site](https://github.com/apache/rocketmq-site) 官网主页
   - 添加 release note，参考 [4.9.3 release notes](https://github.com/apache/rocketmq-site/commit/4b662a197a0a77fd460614df9e231e6ffdd7c622) 
   - 更新 release note，参考 [docs updates for 4.9.3](https://github.com/apache/rocketmq-site/commit/0fd4d231c06f1d641a0cc30f8ffe22775043e89d)


## 8. 版本公示

邮件列表：**announce@apache.org**, **users@rocketmq.apache.org**, 

​				 **private@rocketmq.apache.org**, **dev@rocketmq.apache.org** 

邮件主题： **[ANNOUNCE] Release Apache RocketMQ \<release-version\>**

> Hi all,
>
> The Apache RocketMQ team would like to announce the release of Apache RocketMQ \<release version\>.  
>
> ${A brief introduction to RocketMQ and the features of this release.}
>
> More details regarding Apache RocketMQ can be found at:  
>
> http://rocketmq.apache.org/  
>
> The release artifacts can be downloaded here:  
>
> https://dist.apache.org/repos/dist/release/rocketmq/${release-version}  
>
> The release notes can be found here:  
>
> \<insert link to the rocketmq release notes\>  
>
> Thanks,  
>
> The Apache RocketMQ Team  

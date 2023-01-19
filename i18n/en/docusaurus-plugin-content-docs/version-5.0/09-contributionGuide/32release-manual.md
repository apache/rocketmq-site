# Release manual

## 1. Introduction

#### 1.1 Apache release documentation

Refer to the following link to understand the ASF release process：

* [Apache Release Guide](http://www.apache.org/dev/release-publishing)
* [Apache Release Policy](http://www.apache.org/dev/release.html)
* [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 PGP signature

Follow the Apache release guidelines to sign the release version, users can also use this to determine if the downloaded version has been tampered with.

Create a `pgp` key for version signing, use **\<your Apache ID\>@apache.org** as the USER-ID for the key

For more details, refer to [Apache Releases Signing documentation](https://infra.apache.org/release-signing)，[Cryptography with OpenPGP](http://www.apache.org/dev/openpgp.html)

Brief process for generating a key：

* Generate a new `gpg` key using `gpg --gen-key`, set the key length to 4096 and set it to never expire
* Upload the key to the public key server using `gpg --keyserver keys.openpgp.org --send-key <your key id>`
* Export the public key to a text file using `gpg --armor --export <your key id> >> gpgapachekey.txt`
* Obtain the keys of other committers for signing (optional)
* Add the generated key to the [KEYS file](https://dist.apache.org/repos/dist/dev/rocketmq/KEYS) (uploaded to the svn repository by the release manager)

:::tip

Set the default public key. If you have multiple public keys, modify `~/.gnupg/gpg.conf`.

:::

Refer to the example：

```shell
[root@localhost ~]# gpg --gen-key
gpg (GnuPG) 2.0.22; Copyright (C) 2013 Free Software Foundation, Inc.
...
# secret key generation directory
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
# set USER-ID
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

The generated public and private key addresses：

```shell
gpg: keyring `/root/.gnupg/secring.gpg' created
gpg: keyring `/root/.gnupg/pubring.gpg' created
```

Convert the generated public and private keys to ASCII form：

```shell
gpg --armor --output /root/gpgtest/public-key.txt --export 7DE280AF
gpg --armor --output /root/gpgtest/private-key.txt --export-secret-keys 7DE280AF
```

View the key list：

```shell
[root@localhost ~]# gpg --list-keys
/root/.gnupg/pubring.gpg
------------------------
pub   4096R/7DE280AF 2022-07-05
uid                  rocketmq (rocketmq) <rocketmq@apache.org>
sub   4096R/65B9828A 2022-07-05
```

Upload the public key to the public key server

```shell
[root@localhost gpgtest]# gpg --keyserver keys.openpgp.org --send-key 7DE280AF
gpg: sending key 7DE280AF to hkp server keys.openpgp.org
```

#### 1.3 POM setting

Configure the POM file to deploy the version to the ASF Nexus repository.

① Add Apache POM inheritance default settings

```XML
<parent>
    <groupId>org.apache</groupId>
    <artifactId>apache</artifactId>
    <version>XX</version>
</parent>
```

② Add key information to the Maven configuration file `settings.xml`.

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

:::tip

It is recommended to use [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) to encrypt `gpg.passphrase`.

:::

③ Build artifacts and sign

```shell
mvn clean install -Papache-release
```

#### 1.4 Deal with issues

Resolve JIRA issues and GitHub issues related to this release version.

Check that MQVersion is consistent with the released version.

#### 1.5 Release Notes

Generate Release Notes through [RocketMQ JIRA](https://issues.apache.org/jira/browse/ROCKETMQ/) and push to [rocketmq-site](https://github.com/apache/rocketmq-site), adding a link to the version voting email.

## 2. Build Source Release

Use the [Maven Release plugin](https://maven.apache.org/maven-release/maven-release-plugin/) version release plugin to release the Artifact to the ASF Nexus staging repository, and after version validation and version voting, copy it to the Apache SVN version repository.

#### 2.1 Check RocketMQ  version

Confirm the MQVersion version and modify it to the correct form if it does not match the `release-4.5.0` form or is inconsistent, and push it to the `develop` branch.

```java
public static final int CURRENT_VERSION = Version.V4_5_0.ordinal();
```

#### 2.2 Staging in the ASF Nexus repository

1. Switch to the `develop` branch and confirm that all GitHub PRs related to this version have been merged.

① Configure the `pom.xml` file

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

Follow this process to place the generated Artifacts in the staging repository.：

1. `mvn clean release:clean`: Clear failed builds and discarded versions.
2. `mvn release:prepare -Psigned_release -Darguments="-DskipTests"`：Update the tag based on the `SCM` property.
3. `mvn -Psigned_release release:perform -Darguments="-DskipTests"`：Stage the generated artifacts to the [Nexus repo](https://repository.apache.org/#stagingRepositories). You can add the `-DdryRun=true` parameter to perform a dry run.

After completing the above process, you can find the pre-release version Artifacts in the `target` directory of the local branch or in the [Nexus staging repo](https://repository.apache.org/#stagingRepositories).

:::tip

To only release the source code version, only keep the source code and related jar files, and use the `delete` option in the Nexus GUI to delete the other artifacts.

:::

#### 2.3 rc version files

- Before the pre-release version vote is passed, it will be staged in [/dev/rocketmq](https://dist.apache.org/repos/dist/dev/rocketmq/) and stored in the `x.x.x-rcx/` directory. The following files are required：

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

Generate signature and verification files using the `gpg` command：

- Generate `asc` file

  ```
  gpg --clearsign rocketmq-all-x1.x2.x3-bin-release.zip
  gpg --clearsign rocketmq-all-x1.x2.x3-source-release.zip
  ```

- Generate `sha512` file

  ```
  gpg --print-md SHA512 rocketmq-all-x1.x2.x3-bin-release.zip > rocketmq-all-x1.x2.x3-bin-release.zip.sha512
  gpg --print-md SHA512 rocketmq-all-x1.x2.x3-source-release.zip >  rocketmq-all-x1.x2.x3-source-release.zip.sha512
  ```

:::tip

The source code and binary versions should begin with `rocketmq-all` to facilitate the <a target="_blank" href="https://github.com/apache/rocketmq-docker/blob/a2672f62cc5171263ffc856ab5657291efba1912/image-build/Dockerfile-centos#L58-L59">RocketMQ Docker Build</a>.

:::

#### 2.4 Roll back and retry

If there are problems with the staging process, roll back according to the following process：

- Delete the tag created in step 2.2

  - List all tags and find the most recently created one

    ```
    git tag -ln
    ```

  - Delete the tag from the local repository

    ```
    git tag -d rocketmq-all-x1.x2.x3
    ```

  - Push the update to GitHub

    ```
    git push origin :refs/tags/rocketmq-all-x1.x2.x3
    ```

- Delete the commit records in the development branch from step 2.2

  - List the git log

    ```
    git log
    ```

  - Find the most recent commit record and label it as follows：

    > des1: [maven-release-plugin] prepare release rocketmq-all-4.9.2]  
    >
    > des2: [maven-release-plugin] prepare for next development iteration]

  - Delete commits

    ```
    git reset --hard commit-id
    git push origin HEAD --force
    ```

- Delete the version to be rolled back in [Nexus](https://repository.apache.org/#welcome)

- Roll back to step 2.1 and redo

## 3. Build binary release

Both the binary and source code versions are built from the same code branch, but you should be aware of the operating system version.

Some dependencies, such as `netty tc-native`, are sensitive to the operating system.

* Make sure you check out the pre-release version branch
* Make sure all unit tests pass with `mvn clean install`
* Make sure all integration tests pass with `mvn clean install -Pit-test`

After successful build, you also need to generate .asc and .sha512 files, and after verification and voting, finally copy them to the [svn](https://dist.apache.org/repos/dist/release/rocketmq/) repository.


## 4. Version Verification

#### 4.1 Binary Release Verification Checklist

 *   Check the operating system for the build dependencies, netty-tcnative is sensitive to the operating system
 *   Ensure the license is Apache V2  
 *   If third-party dependencies are introduced, update the NOTICE
 *   Extract the compressed file to check that the version is correct
 *   Validate the ASC signature, SHA512 digest
 *   Run the Quick-Start to start the nameserver and broker
 *   Run the clusterList command to check that the version is correct
 *   Make sure there are no nohup.out files

#### 4.2 Source Release Verification Checklist

 * Ensure the license is Apache V2
 * If third-party dependencies are introduced, update the NOTICE
 * Extract the compressed file to check that the version is correct
 * Validate the ASC signature, SHA512 digest
 * Compile the source code and run the Quick-Start to start the nameserver and broker
 * Run the clusterList command to check the version is correct

#### 4.3 Verification tool

Follow the steps below to verify the GPG signature and SHA512 digest.

1. Download the release packages, the `.asc` file, and the `.sha512` file.

2. On a Unix system, run the following command：

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

   If you see `Good signature`, the signature is correct.

   ```
   gpg: Good signature from ... gpg: Signature made ...
   ```

3. Verify the consistency of the version based on the SHA512.

   ```shell
   gpg --print-md SHA512 rocketmq-all-%version-number%-source-release.zip 
   gpg --print-md SHA512 rocketmq-all-%version-number%-bin-release.zip 
   ```

## 5. Close staging repo

1. After the pre-release version has completed the checklist verification, close the Nexus staging repository and prepare for the version election.
2. Select the `orgapacherocketmq-XXX` pending release version on Nexus and click the `Close` icon to close the staging repository.
3. Before closing, Nexus will perform a series of signature verifications and text checks.
4. If the verification is successful, Nexus will close the repository and provide the staging repository URL, which is marked as "The staging repo" in the election email.
5. If the verification fails, fix the issues, roll back, and re-execute the release process.
6. If all of the above work is complete, use SVN to copy it to the [/dev/rocketmq](https://dist.apache.org/repos/dist/dev/rocketmq/) Apache remote repository.

## 6. Version election

The RocketMQ community conducts version elections through the **[dev@rocketmq.apache.org](mailto:dev@rocketmq.apache.org)** email list.

Refer to the [voting process](http://www.apache.org/foundation/voting.html) to understand the Apache voting process.

### 6.1 Community voting

Email list：[dev list](mailto:dev@rocketmq.apache.org)

Email topic：**[VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** 

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

:::tip

Hash for the release tag: You can use the commit id.

:::

### 6.2 Result announced

After 72 hours, if there are at least 3 votes in favor and no votes against, send the following email to celebrate the release of the version.

Email topic：**[RESULT][VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** 

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

If the vote does not pass, fix the issues, roll back, increase the RC number, restart the release process, and re-initiate the version voting process.

Update email topic：**[RESTART][VOTE][#\]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>**


## 7. Release version

After the Apache RocketMQ PMC vote passes, release the version to the Maven Nexus repository and the Apache version repository.

1. Publish to Nexus repository, select the **orgapacherocketmq-XXX** in the staging area and click the `Release` icon to publish.
2. Publish to the Apache version repository, use SVN to copy the version to [/release/rocketmq](https://dist.apache.org/repos/dist/release/rocketmq/)
3. Merge the `develop` branch of [Apache RocketMQ](https://github.com/apache/rocketmq) into the `master` branch.
4. Add release notes to [Releases · apache/rocketmq](https://github.com/apache/rocketmq/releases).
5. Create a new branch and name it `release-x.x.x`.
6. Update [apache/rocketmq-site](https://github.com/apache/rocketmq-site) Official Website Home Page
   - Add release note，refer to  [4.9.3 release notes](https://github.com/apache/rocketmq-site/commit/4b662a197a0a77fd460614df9e231e6ffdd7c622) 
   - Update release note，refer to [docs updates for 4.9.3](https://github.com/apache/rocketmq-site/commit/0fd4d231c06f1d641a0cc30f8ffe22775043e89d)


## 8. Version announcement

Email list：**announce@apache.org**, **users@rocketmq.apache.org**, 

​				 **private@rocketmq.apache.org**, **dev@rocketmq.apache.org** 

Email topic： **[ANNOUNCE] Release Apache RocketMQ \<release-version\>**

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

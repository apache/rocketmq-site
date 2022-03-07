---
title: "Release Manual"
permalink: /docs/release-manual
excerpt: "Apache RocketMQ Release Manual"
modified: 2017-02-7T15:01:43-04:00
---

{% include toc %}

This is a guide to make a released version of Apache RocketMQ. Please follow the steps below:

## 1. Preliminaries
#### 1.1 Apache Release Documentation
The release documentations provided by The ASF can be found here:

* [Apache Release Guide](http://www.apache.org/dev/release-publishing)
* [Apache Release Policy](http://www.apache.org/dev/release.html)
* [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 Code Signing Key
Create a code signing gpg key for release signing, use **\<your Apache ID\>@apache.org** as your primary ID for the code signing key. See [Apache Release Signing documentation](https://www.apache.org/dev/release-signing) for more details.

* Create new pgp key. Please refer to [here](http://www.apache.org/dev/openpgp.html) on how to use gpg key.
* Generate a new key via `gpg --full-generate-key`, and answer 4096 bits with no expiration time.
* Upload your key to a public key server by `gpg --keyserver keys.openpgp.org --send-key <your key id>`. you can search your key after uploaded. (`your key id`'s string length is 8).
* Export your public key to a file by `gpg --armor --export <your key id> >> gpgapachekey.txt`.
* Get the key signed by other committers(Optional).
* Add the key to the RocketMQ [KEYS file](https://dist.apache.org/repos/dist/dev/rocketmq/KEYS). ([KEYS file] managed by svn)

**Tips:** If you have more than one key in your gpg, set the code signing key to `~/.gnupg/gpg.conf` as default key is recommended.
 
#### 1.3 Prepare Your Maven Settings
Make sure your Maven settings.xml file contains the following:

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

**Tips:** It is highly recommended to use [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) for your passwords.

#### 1.4 Cleanup Issues
Cleanup JIRA issues or Github Issues related to this release version, and check all the issues has been marked with right version in the `FixVersion` field.

Also, remember to check the current version of MQVersion, which should be equal to this released version.

#### 1.5 Publish the Release Notes
Generate the release notes via [RocketMQ JIRA](https://issues.apache.org/jira/browse/ROCKETMQ/) and publish it to the [rocketmq-site](https://github.com/apache/rocketmq-site), there is a [release notes](https://rocketmq.apache.org/release_notes/release-notes-4.6.1/) available for reference, include the link to the release notes in the voting emails.


## 2.Build the Source Release Candidate
In this process, you need to use maven release plugin to release the artifact to maven repository. And also, copy them to the svn repository.

#### 2.1 Check the MQVersion
Remember to check the current version of MQVersion again, which should be equal to this released version like `release-4.5.0`. change it and push to branch `develop` if not right.
```java
  public static final int CURRENT_VERSION = Version.V4_5_0.ordinal();
```
#### 2.2 Release to the maven repository

Make sure that you are in the develop branch, and Github PRs related to this release version are merged.
Perform the following to generate and stage the artifacts:

1. `mvn clean release:clean`
2. `mvn release:prepare -Psigned_release -Darguments="-DskipTests"`, answer the correct release version(use the default, the version in pom, just enter), SCM release tag(use the default, the branch name, just enter), and the new development version(increate the version by 1.0, if you release 4.2.0, then the next version should be 4.3.0).
3. `mvn -Psigned_release release:perform -Darguments="-DskipTests"`, generate the artifacts and push them to the [Nexus repo](https://repository.apache.org/#stagingRepositories). If you would like to perform a dry run first (without pushing the artifacts to the repo), add the arg -DdryRun=true.

Now, the candidate release artifacts can be found in the [Nexus staging repo](https://repository.apache.org/#stagingRepositories) and in the `target` folder of your local branch.

**Tips:** If you are performing a source-only release, please remove all artifacts from the staging repo besides the .zip file containing the source and the javadocs jar file. In the Nexus GUI, you can right click on each artifact to be deleted and then select `Delete`.

#### 2.3 Checkout release branch, build rc files and self-verify them
- build rc files
Checkout a new branch from the target branch(master or develop) according to the release tag with its name equal to the release version, like `release-4.5.0`.  
build source and binary file by <a href="https://rocketmq.apache.org/docs/quick-start/" target="_blank">quick-start</a> and sign&hash them, at last you would get files like:  
> rocketmq-all-x1.x2.x3-bin-release.zip  
> rocketmq-all-x1.x2.x3-bin-release.zip.asc  
> rocketmq-all-x1.x2.x3-bin-release.zip.sha512  
> rocketmq-all-x1.x2.x3-source-release.zip  
> rocketmq-all-x1.x2.x3-source-release.zip.asc  
> rocketmq-all-x1.x2.x3-source-release.zip.sha512  

- sign files(generate `asc` file)
```
gpg --clearsign rocketmq-all-x1.x2.x3-bin-release.zip
gpg --clearsign rocketmq-all-x1.x2.x3-source-release.zip
```
- generate hash(generate `sha512` file)
```
gpg --print-md SHA512 rocketmq-all-x1.x2.x3-bin-release.zip > rocketmq-all-x1.x2.x3-bin-release.zip.sha512
gpg --print-md SHA512 rocketmq-all-x1.x2.x3-source-release.zip >  rocketmq-all-x1.x2.x3-source-release.zip.sha512
```
- self-verify sign and hash  
goto 4, after self-verify, continue 2.4

**Tips:** Source file folder and binary folder names should start with `rocketmq-all` for be nice to <a target="_blank" href="https://github.com/apache/rocketmq-docker/blob/a2672f62cc5171263ffc856ab5657291efba1912/image-build/Dockerfile-centos#L58-L59">RocketMQ Docker Build</a>

#### 2.4 Rollback and Retry (visit github using github token)
If the staging process encounter problem, you may need to rollback:
- 1. Delete the tag created in 2.2
  - list all tags and find latest tag created by you
  ```
  git tag -ln
  ```
  
  - delete the tag locally
  ```
  git tag -d rocketmq-all-x1.x2.x3
  ```

  - push update to github
  ```
  git push origin :refs/tags/rocketmq-all-x1.x2.x3
  ```

- 2. Delete 2 commits in branch develop created in 2.2
  - list all git logs
  ```
  git log
  ```
  
  - find 2 lastest commits who's comments as bellow
  > des1: [maven-release-plugin] prepare release rocketmq-all-4.9.2]  
  > des2: [maven-release-plugin] prepare for next development iteration]
  - delete the 2 commits. (`143a34185b84aed5bc1224b353af340aa1e3df0fg` would be kept)
  ```
  git reset --hard 143a34185b84aed5bc1224b353af340aa1e3df0fg
  git push origin HEAD --force
  ```
- 3. drop staged-repos created by you in maven repo
repo url : <a href="https://repository.apache.org/#stagingRepositories">https://repository.apache.org/#stagingRepositories</a>

- 4. redo from 2.1

## 3.Build the Binary Release Candidate
Checkout the code to be released(must be the same as the source branch), and build the binary artifact.
Be aware of the os version, for some dependency is os sensitive, such as netty tc-native.

* Make sure that your are in the candidate release branch.
* Make sure that all the unit tests can pass via `mvn clean install`.
* Make sure that all the integration tests can pass via `mvn clean install -Pit-test`.

After the successful building, remember to sign the artifact(PGP and SHA512 signatures are required), and copy them to the svn repository, you could refer to [svn repository](https://dist.apache.org/repos/dist/release/rocketmq/) .


## 4. Validate the Release Candidate

#### 4.1 check list for binary release:

 *   check the os on which to build the artifact, for the netty tc-native is os sensitive
 *   check LICENSE, should be Apache V2   
 *   check NOTICE, should have a notice for third-party dependency if necessary
 *   extract the zip and check if the binary version is correct
 *   verify the asc(PGP sign), SHA512
 *   start nameserver and broker according to the quick-start 
 *   run clusterList command to see if the version is correct
 *   make sure there is no nohup.out in the binary files

#### 4.2 check list for source release:
 
 * check LICENSE, should be Apache V2   
 * check NOTICE, should have a notice for third-party dependency if necessary
 * extract the zip and check if the source version is correct
 * verify the asc(PGP sign),SHA512
 * build the source, start nameserver and broker according to the quick-start
 * run clusterList command to see if the version is correct


#### 4.3 verify tools
Please follow the steps below to verify the checksums and PGP signatures:

1. Download the release artifacts, PGP signature file, SHA512 hash files.
2. On unix platforms the following command can be executed:
  
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
  Check the output to ensure it only contains good signatures:
  
  ```text
  gpg: Good signature from ... gpg: Signature made ...
  ```

3. Compare SHA512 hash generated by the below command with the downloaded hash files.

  ```shell
  gpg --print-md SHA512 rocketmq-all-%version-number%-source-release.zip 
  gpg --print-md SHA512 rocketmq-all-%version-number%-bin-release.zip 
  ```

## 5. Release the Staging Artifacts
If the release candidate passes the validation checklist, close the staging repository in Nexus by selecting the staging repository `orgapacherocketmq-XXX` and clicking on the `Close` icon.

Nexus will now run through a series of checksum and signature validations.

If the checks are passed, Nexus will close the repository and produce a URL to the closed staging repo (which contains the candidate artifacts). Include this URL in the voting email so that folks can find the staged candidate release artifacts.

If the checks aren't passed, fix the issues then go back and restart the release process.

If everything is ok, use svn to copy the candidate release artifacts to RocketMQ repo: https://dist.apache.org/repos/dist/dev/rocketmq/${release-version}.

## 6. Vote on the Release

Release voting must successfully pass within the Apache RocketMQ community via the **dev@rocketmq.apache.org** mailing list.

General information regarding the Apache voting process can be found [here](http://www.apache.org/foundation/voting.html).

#### 6.1 Apache RocketMQ Community Vote
To vote on a candidate release, send an email to the [dev list](mailto:dev@rocketmq.apache.org) with subject **[VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** and body:

> Hello RocketMQ Community,  
>
> This is the vote for \<release version\> of Apache RocketMQ.  
> ${A brief introduction to RocketMQ and the features of this release.}
>
> **The artifacts:**  
> https://dist.apache.org/repos/dist/dev/rocketmq/${release version}
>
> **The staging repo:**  
> https://repository.apache.org/content/repositories/orgapacherocketmq-XXX/
>
> **Git tag for the release:**  
> \<link to the tag of GitHub repo\>  
>
> **Hash for the release tag:**  
> \<Hash value of the release tag\>  
>
> **Release Notes:**  
> \<insert link to the rocketmq release notes\>  
>
> The artifacts have been signed with Key : \<ID of signing key\>, which can be found in the keys file:  
> https://dist.apache.org/repos/dist/dev/rocketmq/KEYS  
>
> The vote will be open for at least 72 hours or until necessary number of votes are reached.  
>
> Please vote accordingly:  
>
> [ ] +1  approve    
> [ ] +0  no opinion    
> [ ] -1  disapprove with the reason    
>
> Thanks,  
> The Apache RocketMQ Team  

Once 72 hours has passed (which is generally preferred) and/or at least three +1 (binding) votes have been cast with no -1 (binding) votes, send an email closing the vote and congratulate the release candidate. Please use the subject: **[RESULT][VOTE]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>** :

> Hello RocketMQ Community,  
>
> The Apache RocketMQ <release version> vote is now closed and has passed with [number] binding +1s, [number] non-binding +1s and no 0 or -1:  
>
> **Binding votes +1s:**  
> User Name (Apache ID)    
> User Name (Apache ID)    
> User Name (Apache ID)    
> ....
>
> **Non-binding votes +1s:**  
> User Name (Apache ID)  
> ....  
>
> The release will be published soon.  
>
> Thanks,   
> The Apache RocketMQ Team

If we do not pass the VOTE, fix the related issues, go back, restart the release process and increase RC number. When we call a new vote, we must use the updated mail subject: **[RESTART][VOTE][#\<Attempt Number\>]: Release Apache RocketMQ \<release-version\> RC\<RC Number\>**

## 7. Publish the Release
Once the Apache RocketMQ PPMC votes pass, publish the release artifacts to the Nexus Maven repository and to the Apache release repository.

1. Publish the Maven Artifacts, release the Maven artifacts in Nexus by selecting the staging repository **orgapacherocketmq-XXX** and clicking on the `Release` icon.
2. Publish the Artifacts to the Apache Release Repository, use svn copy candidate release artifacts to https://dist.apache.org/repos/dist/release/rocketmq/${release-version}
3. Merge branch `develop` to branch `master` on https://github.com/apache/rocketmq
4. Publish release package on github on https://github.com/apache/rocketmq/releases

## 8. Announce the Release
Send an email to **announce@apache.org**, **users@rocketmq.apache.org**, **private@rocketmq.apache.org**, and **dev@rocketmq.apache.org** with the subject **[ANNOUNCE] Release Apache RocketMQ \<release-version\>** and a body along the lines of:

> Hi all,
>
> The Apache RocketMQ team would like to announce the release of Apache RocketMQ \<release version\>.  
>
> ${A brief introduction to RocketMQ and the features of this release.}
>
> More details regarding Apache RocketMQ can be found at:  
> http://rocketmq.apache.org/  
>
> The release artifacts can be downloaded here:  
> https://dist.apache.org/repos/dist/release/rocketmq/${release-version}  
>
> The release notes can be found here:  
> \<insert link to the rocketmq release notes\>  
>
> Thanks,  
> The Apache RocketMQ Team  


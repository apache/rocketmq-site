---
title: "Mastering Component Compatible Dependency"
categories:
  - Maven
tags:
  - Compatibility
  - Dependency
  - Java
  - Maven
---

This article mainly includes three parts.at first,I will introduce compatibility principle(more details see [here](http://blog.csdn.net/fengjia10/article/details/7799227)) briefly.followed by a detailed elaborating about Java component compatible dependency,including the interface-oriented programming,single component signature protection,single component compatibility protection and multi-component compatibility compile time checking.Finally is the review and prospect,especially about **Dependency Mediator** project.

{% include toc %}

# Compatibility

what is compatibility？it is also the key to understanding the compatible dependency.Compatibility, often catch our eyes through two forms,**binary compatibility**,that means they can run the same executable code, typically machine code for a general purpose computer CPU.within the framework of Release-to-Release Binary Compatibility in SOM (Forman, Conner, Danforth, and Raper, Proceedings of OOPSLA '95), Java programming language binaries are binary compatible under all relevant transformations that the authors identify (with some caveats with respect to the addition of instance variables). here is a list of some important binary compatible changes that the Java programming language supports:

* Reimplementing existing methods, constructors, and initializers to improve performance.
* Changing methods or constructors to return values on inputs for which they previously either threw exceptions that normally should not occur or failed by going into an infinite loop or causing a deadlock.
* Adding new fields, methods, or constructors to an existing class or interface.
* Deleting private fields, methods, or constructors of a class.
* When an entire package is updated, deleting default (package-only) access fields, methods, or constructors of classes and interfaces in the package.
* Reordering the fields, methods, or constructors in an existing type declaration.
* Moving a method upward in the class hierarchy.
* Reordering the list of direct superinterfaces of a class or interface.
* Inserting new class or interface types in the type hierarchy.

Generally,java language is **upwards binary-compatible** with previous version,such as Java SE 6 is upwards binary-compatible with J2SE 5.0 except for some minor incompatibilities.You can get details from [here](http://www.oracle.com/technetwork/java/javase/compatibility-137541.html#binary).

Another compatibility form,we call it **source compatibility**,meaning that recompilation is necessary.Java language does not support downward source compatibility. Such as if source files use new language features or Java SE platform APIs, they will not be usable with an earlier version of the Java platform. Usually it will throw similar error like this:

```java
java.lang.UnsupportedClassVersionError: com.alibaba.mq.core.MessageConsumer :
         Unsupported major.minor version 51.0
         at java.lang.ClassLoader.defineClass1(Native Method)
         at java.lang.ClassLoader.defineClassCond(Unknown Source)
```

Java language source compatibility policy is as follows,except for any incompatibilities listed further below:

* Maintenance releases (such as 1.7.25, 1.7.26) do not introduce any new language features or APIs. They will maintain source-compatibility with each other.
* Functionality releases and major releases (such as 1.4.0,5.0,6.0,7.0,8.0) maintain upwards but not downwards source-compatibility.

Let's sum up before going on:

* Document those incompatibility cases as much as possible, even some rare circumstances and corner cases. 
* Recommend developer to provide facilities that alert developers to the impact of changes on pre-existing binaries that cannot be recompiled.
* Generally speaking,Binary Compatibility problems may occur in the following situations:
 * **Replacing the old with the new**,such as the Java platform Profiling Architecture in the Java SE6,JVMDI was removed and JVMPI was disabled in Java SE 6.
 * **Combinatorial resolution**,such as Non class files have been moved from rt.jar in Java SE 6.if -Xbootclasspath:<path to rt.jar> is specified,and request any resource files will fail since these resources now reside in a different jar file called resources.jar.
 * **Behavior change**,such as Java SE 6 will throw an OverlappingFileLockException,if the application attempts to lock the overlapping region other instances of FileChannel that has been locked, in order to realize the backward compatibility, it provides disableSystemWideOverlappingFileLockCheck system properties. again, also in Java SE 6, jar will preserve file modification dates and times during extract, through the sun.tools.jar.useExtractionTime=true to achieve backward compatibility.
 * **Structure change**,this is also the key problem to solve in **Dependency Mediator** project. generally speaking,modification and deletion belonging to incompatible operations.and more attentions must be paid in the RPC service maintenance, more detailed description,please refer to an [article](http://blog.csdn.net/fengjia10/article/details/7799227) I wrote before. also you can read the the thirteenth chapter of Java language specification.

# Component Compatible Dependency

This article don't talk about **dependency analysis** and **dependency decoupling**,if you care these topics,please read [Dependency Analysis and the Modularisation of Java Programs](http://java.dzone.com/articles/dependency-analysis-and-1).highly recommending you try to dive into open source project [Architecture Explorer](http://xplrarc.massey.ac.nz/),through bcel technology,analyzing and measuring component's dependency relationship.but in my opinion,[Jdepend](http://clarkware.com/software/JDepend.html) was surely the most distinguished tool in dependency analysis and dependency decoupling area.it traverses Java class file directories and generates design quality metrics for each Java package,also allows you to automatically measure the quality of a design in terms of its extensibility, reusability, and maintainability to manage package dependencies effectively.

Let's return,ask yourself，have you ever been disturbed by the following problems?

* Your service depend a volatile service,volatile means your service depending neither an abstract class nor a interface,this class update at irregular intervals,you often encountered errors such as **NoSuchMethodError**,**NoSuchFieldError** and **NoClassDefFoundError** etc.
* You are developing a new feature,but this feature can not backward compatible with previous version,
what should you do ? How do you give a incompatible list in your release report.
* Java language library is a superb collection of beautiful things,how do you make a rational dependency exclusion and effective mediate various dependency problems when developing.

It is the time to introduce the key idea - **Mediating Components Compatible Dependency**.Specifically,it includs the following basic principles:

* Interface-oriented programming
* Single component signature protection
* Single component compatibility protection
* Multi-component compatibility compile time checking

## Interface-oriented programming

Interface-oriented programming,It's easier said than done.I will cite SLF4J design philosophy explain this principle.

Differing from commons logging,SLF4J use **static binder technology** so as to avoid notorious [classloader problem](http://articles.qos.ch/classloader.html),every concrete log implementation must 
have a class named StaticLoggerBinder and implementing SLF4J spi LoggerFactoryBinder.thus you just depend SLF4J api,not concerned about underlying implementation.some people may asking,why choose SLF4J not commons logging，I can also depend commons logging api but not concret implementation？it's not performance but classloader problem.JCL discovery process relies on classloader hacks to find the logging framework at runtime but this mechanism leads to numerous problems including unexpected behavior,hard to debug classloading problems resulting in increased complexity.This is nicely captured by Ceki (the author of Log4J, SLF4J and Logback) in Think again before adopting the commons-logging API (which also mentions memory leaks problems observed with JCL).and this is why SLF4J, which uses static bindings, has been created. Let's see.how to find the concrete realizations in SLF4J:
    
```java
// We need to use the name of the StaticLoggerBinder class, but we can't reference
// the class itself.
private static String STATIC_LOGGER_BINDER_PATH = "org/slf4j/impl/StaticLoggerBinder.class";
 /**
  * It is LoggerFactory's responsibility to track version changes and manage
  * the compatibility list.
  * It is assumed that all versions in the 1.6 are mutually compatible.
  */
static private final String[] API_COMPATIBILITY_LIST = new String[]{"1.6", "1.7"};

// private constructor prevents instantiation
private LoggerFactory() {}
private final static void versionSanityCheck() {
 try {
    String requested = StaticLoggerBinder.REQUESTED_API_VERSION;
    boolean match = false;
    for (int i = 0; i < API_COMPATIBILITY_LIST.length; i++) {
      if (requested.startsWith(API_COMPATIBILITY_LIST[i])) {
          match = true;
      }
     }
    if (!match) {
      Util.report("The requested version " + requested
           + " by your slf4j binding is not compatible with "
           + Arrays.asList(API_COMPATIBILITY_LIST).toString());
      Util.report("See " + VERSION_MISMATCH + " for further details.");
    }
} catch (java.lang.NoSuchFieldError nsfe) {
 // given our large user base and SLF4J's commitment to backward
 // compatibility, we cannot cry here. Only for implementations
 // which willingly declare a REQUESTED_API_VERSION field do we
 // emit compatibility warnings.
} catch (Throwable e) {
 // we should never reach here
 Util.report("Unexpected problem occured during version sanity check", e);
  }
}
```

you can use these skills at your library.just Let others depend on your interface package,detecting certain implementation statically.

If you have developed an old version library,naming it as 2.x.x.next version,you hope to refactor some implementations,how to process multi-version compatibility?here is a skill from maven dependency plugin:


```java
String hint = isMaven31() ? "maven31" : isMaven2x() ? "maven2" : "maven3";

/**
* Check the current Maven version to see if it's Maven 2.x.
*/
protected static boolean isMaven2x()
{
   return !canFindCoreClass( "org.apache.maven.project.DependencyResolutionRequest" ); // Maven 3 specific
}

/**
* Check the current Maven version to see if it's Maven 3.1.
*/
protected static boolean isMaven31()
{
   return canFindCoreClass( "org.eclipse.aether.artifact.Artifact" ); // Maven 3.1 specific
}
```

## Single component signature protection

Secondly,Single component signature protection,you can using [Animal Sniffer project](http://mojo.codehaus.org/animal-sniffer/) as well-known Guava library,Animal Sniffer provides tools to assist verifying that classes compiled with a newer JDK/API are compatible with an older JDK/API.

```java
<plugin>
   <groupId>org.codehaus.mojo</groupId>
   <artifactId>animal-sniffer-maven-plugin</artifactId>
   <configuration>
     <signature>
       <groupId>org.codehaus.mojo.signature</groupId>
       <artifactId>java16-sun</artifactId>
       <version>1.0</version>
     </signature>
   </configuration>
   <executions>
     <execution>
       <id>check-java16-sun</id>
       <phase>test</phase>
       <goals>
         <goal>check</goal>
       </goals>
     </execution>
   </executions>
 </plugin>
```

So from now on, when you performing a mvn test or mvn install operation. If there is an incompatibility in one of the projects, you would find some output like this:

```java
[INFO] [animal-sniffer:check {execution: check-java-api}]
[INFO] Checking unresolved references to org.codehaus.mojo.signature:java16-sun:1.0
[ERROR] Undefined reference: java/lang/String.contains(Ljava/lang/CharSequence;)Z in /home/admin/workspace/kafka/target/classes/org/kafka/tools...Producer.class
```

More details please see [here](http://blog.gvsig.org/2011/07/25/hunting-api-incompatibilities-with-the-animal-sniffer-project/).


## Single component compatibility protection

If your a SOA develper,you almost concerned with single component compatibility protection.[Clirr project] (http://clirr.sourceforge.net/) may be your best choice.Clirr is a tool that checks Java libraries for binary and source compatibility with older releases. Basically you give it two sets of jar files and Clirr dumps out a list of changes in the public api. The Clirr Ant task can be configured to break the build if it detects incompatible api changes. In a continuous integration process Clirr can automatically prevent accidental introduction of binary or source compatibility problems.

How to use it？just add some config snippets in your pom :

```java
<plugin>
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>clirr-maven-plugin</artifactId>
  <version>2.6.1</version>
</plugin>
```

then,run `mvn clirr:check`,output may be like this:

```java
[INFO] --- clirr-maven-plugin:2.6.1:check (default-cli) @ cmq.common ---
[INFO] artifact com.alibaba.intl.base.cmq:cmq.common: checking for updates from b2bmirror-all
[INFO] Comparing to version: 2.0.1
[ERROR] 7005: com.alibaba.mq.client.CompletionListener: Parameter 1 of 'public void onCompletion(com.alibaba.mq.model.CommonMessage)' has changed its type to   com.alibaba.mq.common.CommonMessage
[ERROR] 7005: com.alibaba.mq.client.CompletionListener: Parameter 1 of 'public void onException(com.alibaba.mq.model.CommonMessage, java.lang.Exception)' has changed its type to com.alibaba.mq.common.CommonMessage
[ERROR] 7005: com.alibaba.mq.client.MessageProducer: Parameter 1 of 'public com.alibaba.mq.client.CommonResult send(com.alibaba.mq.model.CommonMessage)' has changed its type to com.alibaba.mq.common.CommonMessage
[ERROR] 7005: com.alibaba.mq.client.MessageProducer: Parameter 1 of 'public com.alibaba.mq.client.CommonResult send(com.alibaba.mq.model.CommonMessage, com.alibaba.mq.client.CompletionListener)' has changed its type to com.alibaba.mq.common.CommonMessage
```



Some inspiration in **Dependency Mediator** project just come from here.more topics about compatible,you can reference from series article [Evolving Java-based APIs](http://wiki.eclipse.org/index.php/Evolving_Java-based_APIs)

## Multi-component compatibility compile time checking

Last but not least,Multi-component compatibility compile time checking.it's the time to formally recommend project **Dependency Mediator**.

unlike karaf and other lightness modular technology(like osgi,class names do not need to be unique,but the combination of class names and their defining ClassLoader must to be unique),**Dependency Mediator** try to remedy component dependency conflicting problem before the runtime rather than using customized [classLoader](http://www.onjava.com/pub/a/onjava/2005/04/13/dependencies.html) to agree with the coexistence of different version components,thus avoid some well-konwn errors,such as **NoSuchMethodError**,**NoSuchFieldError** and **NoClassDefFoundError** etc.

What is the principle of **Dependency Mediator**？**Dependency Mediator** try to mediate various component conflicting problems.It uses jar or class as the smallest component unit,that is ComponentEntry:

```java
public class ComponentEntry implements Comparable<ComponentEntry> {
  /**
   * Similar file name
   */
  private String   pathName;
  /**
   * Component name ,such as fully-qualified class name or jar name
   */
  private String   name;
  /**
   * Name of the jar which contains this entry,this field may be null
   */
  private String   jarName;
  /**
   * Jar entry meta info,if it is a jar file,this field may be null
   */
  private JarEntry entry;
  ....
```

It could scan directory(also including classpath,if you set system property scanClasspath) and POM.if it happen to jar,but you setting checkJars to false,it could detect inner MANIFEST file,using **Build-Jdk** and **Built-By** properties to decide whether duplicated jars.thus,output only report whether including duplicated jar.but if you 
setting checkJars to true or nothing to do with this property,it will further analyzes whether existing incompatible cases.

It also provides a maven plugin,if your project is a web project,you must run mvn insall before next step. Maven plugin also comply with the latest annotation mojo api rather than version 2.x.x doclet api.

**Dependency Mediator** take advantage of **nearest definition** dependency mediation strategy. this determines what version of a dependency will be used when multiple versions of an artifact are encountered. **nearest definition**,means that it will use the version of the closest dependency to your project in the tree of dependencies. You can always guarantee a version by declaring it explicitly in your project's POM. Note that if two dependency versions are at the same depth in the dependency tree, until Maven 2.0.8 it was not defined which one would win, but since Maven 2.0.9 it's the order in the declaration that counts: the first declaration wins.
**nearest definition** means that the version used will be the closest one to your project in the tree of dependencies, eg. if dependencies for A, B, and C are defined as A -> B -> C -> D 2.0 and A -> E -> D 1.0, then D 1.0 will be used when building A because the path from A to D through E is shorter. You could explicitly add a dependency to D 2.0 in A to force the use of D 2.0.

If you consider the dependency hierarchy as a binary tree structure,Undoubtedly,**nearest definition** means the **minimum depth**. so if you put some higher version dependency library after lower version one(may be transitive dependency),you will face incompatible conflicting problems.Such as :

```java
[WARNING] Founded conflicting dependency component:org.apache.thrift:libthrift:jar Resolved version is org.apache.thrift:libthrift:jar:0.8.0:compile But found conflicting artifact org.apache.thrift:libthrift:0.9.1
```

In this case,you could fix this problem through place libthrift 0.9.1 before the library imported through transitive dependency.

of course,all the establishment must meet a premise,that is:
* **Functionality releases and major releases(such as 1.4.x, 1.5.x,2.x.x,3.x.x) have source compatibility problems.**

In **Dependency Mediator** 2.0 version,you could customize version differentiation strategy,not limited the aformentioned.by the way, also in 2.0,I will improvement compatible dependency mediator, please wait and see.

# Summary

Through this article, you almost calculated the evolution process of the **Dependency Mediator** project.in my opinion,integration with the maven enforcer plugin may be a better choice.After all,I hope **Dependency Mediator** can keep sustainable development.I would try and donate this project to codehaus in the near future.

If you have better idea or improving suggestion, please contact <dev@rocketmq.apache.org>.

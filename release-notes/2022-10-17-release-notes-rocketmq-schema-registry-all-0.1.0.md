---
title: "Release Notes - Apache RocketMQ Schema Registry - Version 0.1.0"
categories:
- Release_Notes
tags:
- RocketMQ_Schema_Registry
---
:::tip Download
* Source: [rocketmq-streams-1.0.1-preview.zip](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.1-preview/rocketmq-streams-1.0.1-preview.zip) [[PGP](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.1-preview/rocketmq-streams-1.0.1-preview.zip.asc)] [[SHA512](https://archive.apache.org/dist/rocketmq/rocketmq-streams/1.0.1-preview/rocketmq-streams-1.0.1-preview.zip.sha512)]
:::
<!--truncate-->

Below is a summary of the issues addressed in the 0.1.0 release of RocketMQ Schema Registry. For full documentation of the release, a guide to get started, please refer to <a href='https://github.com/apache/rocketmq-schema-registry/tree/rocketmq-schema-registry-all-0.1.0'>Quick Start</a>.


## Feature
<ul>
<li>[<a href='https://github.com/apache/rocketmq/wiki/RIP-42-Support-Schema-Registry'>RIP-42</a>] - Support Schema Registry</li>
</ul>

## Improvement
<ul>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/2'>ISSUE-2</a>] - [ISSUE-2] - SchemaController optimize</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/3'>ISSUE-3</a>] - [ISSUE-3] - Optimize the cache refresh mechanism</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/6'>ISSUE-6</a>] - [ISSUE-6] - Add a http client for rocketmq-schema-registry</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/28'>ISSUE-28</a>] - [ISSUE-28] - Support all the compatibility strategies for schema evolution</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/29'>ISSUE-29</a>] - [ISSUE-29] - Support JSON schema</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/39'>ISSUE-39</a>] - [ISSUE-39] - Support idl parse when get schema</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/43'>ISSUE-43</a>] - [ISSUE-43] - Prevents the same schema updated successfully</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/48'>ISSUE-48</a>] - [ISSUE-48] - Each registry node should use different consumerGroup</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/issues/61'>ISSUE-61</a>] - [ISSUE-61] - Should provide an interface to obtain the schema by ID</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/66'>PR-66</a>] - [PR-66] - optimize SDK before 1.0.0 release</li>
</ul>

## Bug
<ul>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/21'>PR-21</a>] - [PR-21] - fix http client parse exception failed</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/20'>PR-20</a>] - [PR-20] - serializer error and fix long buffer capacity</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/23'>PR-23</a>] - [PR-23] - fix some problems when testing the SchemaRegistryClient</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/35'>PR-35</a>] - [PR-35] - fix pom file warning</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/51'>PR-51</a>] - [PR-51] - Fix avro parse NPE</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/54'>PR-54</a>] - [PR-54] - Avro serde should support T extends record except a specific record type</li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/69'>PR-69</a>] - [PR-69] - unify the response code 200 if operation success </li>
<li>[<a href='https://github.com/apache/rocketmq-schema-registry/pull/20'>PR-20</a>] - [PR-20] - serializer error and fix long buffer capacity</li>
</ul>

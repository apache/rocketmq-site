---
title: "Release Notes - Apache RocketMQ Dashboard - Version 2.1.0"
categories:
  - Release_Notes
tags:
  - RocketMQ_Dashboard

---
:::tip Download
* Source: [rocketmq-dashboard-2.1.0-source-release.zip](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.1.0/rocketmq-dashboard-2.1.0-source-release.zip) [[PGP](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.1.0/rocketmq-dashboard-2.1.0-source-release.zip.asc)] [[SHA512](https://dist.apache.org/repos/dist/release/rocketmq/rocketmq-dashboard/2.1.0/rocketmq-dashboard-2.1.0-source-release.zip.sha512)]
  :::
<!--truncate-->
Apache RocketMQ Dashboard comes from [apache/rocketmq-externals](https://github.com/apache/rocketmq-externals), this is the first release of RocketMQ Dashboard.

Below is a summary of the issues addressed in the version 2.1.0 release of RocketMQ Dashboard. For full documentation of the release, a guide to get started, please refer to [Quick Start](https://github.com/apache/rocketmq-dashboard).

## What's Changed
* [ISSUE #169] duplicate message in the topic tab message list in the message menu for rocketmq5.x  by @boomboomxx in https://github.com/apache/rocketmq-dashboard/pull/202
* remove rocketmq-broker dependency by @yuz10 in https://github.com/apache/rocketmq-dashboard/pull/249
* Bump snakeyaml from 1.30 to 1.32 by @dependabot[bot] in https://github.com/apache/rocketmq-dashboard/pull/130
* remove rocketmq-namesrv dependency by @yuz10 in https://github.com/apache/rocketmq-dashboard/pull/254
* [ISSUE #268] front js check is v5 'false' will be true fix (界面切换v4后topic列不出来) by @iamgd67 in https://github.com/apache/rocketmq-dashboard/pull/269
* [ISSUE #274] fix:Failed to find messages older than 3 days using message ID by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/275
* [[ISSUE #279] fix: align top navigation bar styles  by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/280
* [ISSUE #281 #274 #285 #287] Speeds up topic and consumer queries, adds caching, and fixes delay/dead-letter topic mix-up by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/286
* fix: Add consumer global refresh and fix the problem by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/291
* fix: Solve the null pointer after a single refresh of the consumer #295 by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/296
* Merge branch 'refactor' of github.com:apache/rocketmq-dashboard into refactor by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/307
* [RIP-78-1]: Add part of refactored front-end files by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/309
* [RIP-78-2]: Add part of refactored front-end files by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/310
* [RIP-78-3]: Add part of refactored front-end files by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/311
* [RIP-78-4][ISSUES #308#304]: Add part of refactored front-end files by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/312
* [RIP-78-5]: Add refactored backend files by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/313
* [ISSUE #315]: Add acl2.0 cluster support by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/316
* [RIP-78-6][ISSUES#308]: delete the old ui by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/314
* [ISSUE #323]: fix Maven packaging error by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/324
* [ISSUE #319] Store the username in localStorage by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/320
* [ISSUE #321] Fix interface permission verification  by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/322
* [ISSUE #317] Removed useless topic cache by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/318
* [ISSUE #325] Unified page display format. by @hexueyuan in https://github.com/apache/rocketmq-dashboard/pull/326
* [ISSUE #331] Fix failing tests by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/335
* [Enhancement] Format code and update the doc by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/334
* [Enhancement] Add configuration options for login information, supporting ACL or file storage by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/333
* [Enhancement] Add Frontend Proxy Component Support by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/336
* [ISSUE #337] Restrict write permissions and update the doc by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/338
* [Enhancement] ACL can add rules in clusters by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/340
* [ISSUE #341] Add url parameter transcoding by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/342
* #docs fix wrong port by @TianMing2018 in https://github.com/apache/rocketmq-dashboard/pull/343
* [ISSUE #346] fix request error when logging in using the configuration file by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/347
* [ISSUE #344] fix maven package display errors and npm i failed by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/345
* Use `provided` scope for `lombok` by @strangelookingnerd in https://github.com/apache/rocketmq-dashboard/pull/350
* [ISSUE #348] fix Some interaction issues with the consumer interface by @Crazylychee in https://github.com/apache/rocketmq-dashboard/pull/349

## New Contributors
* @boomboomxx made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/202
* @yuz10 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/249
* @dependabot[bot] made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/130
* @iamgd67 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/269
* @hexueyuan made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/326
* @TianMing2018 made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/343
* @strangelookingnerd made their first contribution in https://github.com/apache/rocketmq-dashboard/pull/350

**Full Changelog**: https://github.com/apache/rocketmq-dashboard/compare/rocketmq-dashboard-2.0.0...rocketmq-dashboard-2.1.0
# pull-request

本文将引导您通过 Git 管理仓库和处理开发流程

# Git 基础

① 复刻 [apache/rocketmq](https://github.com/apache/rocketmq) 仓库到 Github 远程仓库

![1656576515110](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656576515110.png)

② 自行安装 Git 并克隆到本地仓库

```shell
git clone https://github.com/apache/rocketmq.git
```

克隆到本地仓库会默认以```origin```命名远程仓库，并以GitHub仓库作为默认远程仓库

③ 在本地仓库执行更改

```shell
git checkout -b ROCKETMQ-xxxx	# 创建新分支并切换到该分支下
git add /dir/fileName.xxx	# 添加dir目录下 fileName.xxx 文件到暂存区
git commit -a -m "fileName"	# 添加暂存区 fileName 到仓库中
git push origin ROCKETMQ-xxxx	# 推送本地仓库ROCKETMQ-xxxx至 fork 的远程仓库
```

④ 添加远程仓库

```shell
git remote add apache https://github.com/apache/rocketmq.git	# git remote add [远程仓库名] [远程仓库地址]
```

⑤ 获取远程仓库代码

```shell
git fetch apache master
```

⑥ 变基至远程仓库

```shell
git rebase apache/master
```

# 创建 PR

创建 PR 前，请先做如下确认：

1. 已经创建与此对应的 Github issue，并附有清晰的问题描述
2. 修改内容符合 Coding Guidelines 编程规范【此处附链接】
3. 提交内容具备完整的测试用例，以便通过 [apache/rocketmq - Travis CI](https://travis-ci.org/github/apache/rocketmq) 等工具在 ARM64 架构下完成自动集成

如下：以提交PR 至 new-official-website 为例说明 PR 流程

在本地仓库修改完毕后，将该分支推送到 Github 远程仓库

```shell
git checkout new-official-website	# 切换至 new-official-website 分支
git push origin new-official-website	# 推送 new-official-website 分支 至远程仓库
```

① 在 Github 远程仓库上切换至本地修改的分支 new-official-website

![1656576449012](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656576449012.png)

② 创建合并请求，切换到执行更改的分支后，点击 Contribute 下的 Open pull request

![1656576385381](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656576385381.png)

③ 选择 compare across forks选择待合入仓库的 base, 和更改仓库待比较分支 compare

![1656580236831](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656580236831.png)



下面这个是 

两者其他地方均没有什么区别，区别可能在于  forks

base : apache/rocketmq，不能切换，除非你正在与列表中的 committers 协作？这里有点问题

这里 head deatched 似乎不是哪个问题

请先得到分支创建者的许可再提交PR，应该是合入的时候，或者说删掉这句话，因为 合并是 committer 做的

后面这句说的意识是，通过 compare across fork 的方式

head repository ：通过 fork 复刻的 github 远程仓库

compare : xxx拉取的分支

【这部分：先上图片，然后介绍这四个关键字】好好阅读下 GitHub Docs

这部分主要是把上面两幅图里面的四个关键词说明白，另外简单提及一下 compare across forks

base repository :

head repository :

base :

compare : 

为啥会提交失败呢？

④ 填写首字母大写的摘要，并在 Write 标签下简要描述 PR 内容

![1656589498318](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656589498318.png)

⑤ 点击 "Create pull request" ，请求合并该分支

![1656589565022](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656589565022.png)

⑥ 至此，PR 已经在 apache/rocketmq 远程仓库上可见，所有协作者都可以 Review 该PR 并提供建议

![1656589670761](C:\Users\tp\AppData\Roaming\Typora\typora-user-images\1656589670761.png)

​	你可以根据评论在本地完成修改并进行多次提交。拉取分支和提交修改的相关信息会同步展示在 PR 页面、	    

​	RocketMQ 的邮件列表中，仓库维护者会及时发现 PR 的变更信息

6. 若确定修改完毕，可以将该 PR 合并到 apache/rocketmq

拉取的请求会被放到 apache/rocketmq 的 Github 镜像上，你需要为此 PR 选择目标分支

拉取的请求和提交的问题会经 ccommitters 进行 review，审查通过会合并此 PR 到目标分支



# 列出 PR 提交信息

这部分其实就是上面的清单描述

详细列出 PR 的变更日志，可以让社区成员更方便快捷地与您协作【这部分再修改一下】

使用```-[x]```标记已完成的清单项目，你可以参考 [demo pull request](https://github.com/apache/rocketmq/pull/152) 



# 合并 PR

开源项目的分支合并工作由仓库维护者完成，你可以继续了解下面的流程以备后续使用。

请先阅读  [GitHub PR merging locally](https://docs.github.com/cn/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally) ，你可能需要将待合并分支 fetch 到本地，在此基础上拉取新分支并修改，以解决合并冲突或在此基础上进行完善。

拉取的待合并分支可能包含多次提交，建议使用 ```--squash``` 指令压缩为一次 commit

```shell
git checkout master      # switch to local master branch
git pull apache master   # fast-forward to current remote HEAD
git pull --squash https://github.com/cuser/rocketmq.git ROCKETMQ-xxxx  # merge to master
```

合并前务必要解决合并冲突，并确保提交到基线分支

若已完成对预合并分支的所有处理工作，再次切换到基线分支完成合并

```shell
git checkout master      # switch to local master branch
git pull apache master   # fast-forward to current remote HEAD
git merge --squash ROCKETMQ-xxxx
```

进行常规的补丁检查，使用内置的测试用例构建项目，并请务必修改 changelog 

若上述工作均已完成，可以执行下面的指令提交合并，回馈开发者分支状态，并关闭 PR

```shell
git commit --author="contributor_name <contributor_email>" -a -m "ROCKETMQ-XXXX description closes apache/rocketmq#ZZ"
```

ROCKETMQ-XXXX ：是什么？需要全部大写

#ZZ ：Github 上的 PR 编号

关闭 PR 的详情，请参考 [关闭议题 - GitHub Docs](https://docs.github.com/cn/issues/tracking-your-work-with-issues/closing-an-issue) 

将合并后的分支推送到 apache 远程镜像

```shell
git push apache master
```

执行上述指令，需要先得到 Apache 的授权，PR 被提交后，会保留到 GitHub 远程仓库，你可以推到自己的远程仓库上

```shell
git push origin master
```

关于合并修改的建议：squash 会导致远程分支的信息丢失，这段应该在说合并冲突，即针对同一分支多次提交相同的 PR



# 拒绝合并

拒绝 PR ：仅发布空提交到 master's HEAD

```SHELL
git commit --allow-empty -m "ROCKETMQ-XXXX closes apache/rocketmq#ZZ *Won't fix*"
git push apache master
```

仅关闭 Github 上编号 #ZZ 的 PR，且不合并到主仓库













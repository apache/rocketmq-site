---
title: "如何管理PR"
permalink: /docs/pull-request/CN
modified: 2018-08-14T10:05:43-04:00
---

本页面将指导您完成git的设置和提交的过程。

{% include toc %}

# 贡献者如何设置git
首先，fork github上的apache/rocketmq分支到你个人的github账户下，按照如下的步骤克隆下来:

    git clone https://github.com/<your_github_name>/rocketmq.git

在本地克隆会设置`origin`指向github上的远程fork，并作为默认的远程。现在你可以创建自己的PR。

有时需要更新本地主干(为了合并到开发分支)。为此，你必须为RocketMQ镜像添加remote，如下所示，

    git remote add apache https://github.com/apache/rocketmq.git

通过`git fetch`和`git rebase`更新你本地的主干，例如:

    git fetch apache master
    git rebase apache/master

# 分支上的一些工作

    git commit -a -m "doingsomework"
    git push origin ROCKETMQ-xxxx # notice pushing to **origin** not **apache**

一旦你准备好提交到apache remote，你可以直接合并和推送他们，否则总是在创建一个PR.

# 如何创建一个PR(提交者)
把你的分支推送到Github上:

    git checkout ROCKETMQ-xxxx
    git push origin ROCKETMQ-xxxx

1. 到你的github ROCKETMQ-xxxx分支下。因为你是从github的apache/rocketmq中fork出来的。默认所有的PR都将转到apache/master下。
2. 点击绿色的“Compare,review,and create pull request”按钮。如果PR不正确你可以编辑to和from。除非你和列表中某一个提交者合作，否则“base fork”应该是apache/rocketmq，并且”base”将会是主干。其次，除非得到分支拥有者的允许，否则不要提交一个PR到任何其他分支下。“head fork”将是你fork的仓库，“compare”将是你ROCKETMQ-xxxx的分支。
3. 点击”Create pull request”按钮将所有请求命名为”ROCKETMQ-xxxx”。这将会把PR的注释与邮件列表和issue评论关联起来。
4. 从现在开始，已存在于github的apache/rocketmq上的PR。您就可以直接在那里评论界面进行的评论。
5. 如果你希望别人review自己的代码或者想要和别人分享，请在评论中写一个注释，不要担心你的PR会自动合并——你以后会这样做的。PR是绑定到你的分支上，因此你可以回复评论，修复问题，然后从本地仓库提交它们。它们将出现在PR页面上，并被镜像到Github的issue和邮件列表中。
6. 如果你满意并希望将其推送到Apache的远程仓库时，就可以合并此PR。

# 如何创建一个PR(贡献者)
在你创建一个PR之前，确保
1. 创建了相应的[Github issue](https://github.com/apache/rocketmq/issues)，并且有一个清晰的问题的描述
2. 确保你遵循了[代码规范](https://rocketmq.apache.org/docs/code-guidelines/)
3. 你所提交的所有内容都有单元测试
更多有关创建PR的信息，请查看[GitHub PR文档](https://help.github.com/articles/creating-a-pull-request/)。

PR会发回到github上的apache/rocketmq仓库，通过Github UI，你可以选择master分支作为PR的目标。
你的PR将会被提交者审查和评论，其中的issue也可以被讨论。当所有审查人员都同意这个PR，那么它将会被合并。

# PR检查清单
每一个PR都应该遵循[检查表](https://github.com/apache/rocketmq/blob/master/.github/PULL_REQUEST_TEMPLATE.md)，以帮助我们快速和容易地合并你地贡献。
记住使用–[x]在检查列表中标记一个已经完成的事项，这儿有一个[PR的案例](https://github.com/apache/rocketmq/pull/152)可以作为你的参考。

# 合并PR(自己的或贡献者的)
首先阅读[本地合并的GitHub PR文档](https://help.github.com/articles/checking-out-pull-requests-locally/)。 请记住，PR等同于一个可能有多个提交历史的远程github分支。在这种情况下，建议将每个问题的远程提交历史记录合并压缩成一次，而不是合并到多个贡献者的提交中。为了达到这个目标同时可以关闭PR，推荐使用squash提交。​合并PR相当于拉取一个贡献者的分支。

    git checkout master      # switch to local master branch
    git pull apache master   # fast-forward to current remote HEAD
    git pull --squash https://github.com/cuser/rocketmq.git ROCKETMQ-xxxx  # merge to master

--squash选项确保将所有PR历史记录压缩为单个提交，并允许提交者使用他/她自己的信息。有关--squash选项的更多信息，请参阅git help for merge或pull。在这个例子中，我们假设贡献者的Github handle是“cuser”，PR分支名称是“ROCKETMQ-xxxx”。接下来，如果PR不同步的话，就要解决所有的冲突，或者要求贡献者在master之上进行rebase。

如果你已经准备好合并你自己的PR，由于你已经有一个工作中的本地副本，你只需要进行merge操作（而不是pull）。这个副本就是用来创建PR的分支。

    git checkout master      # switch to local master branch
    git pull apache master   # fast-forward to current remote HEAD
    git merge --squash ROCKETMQ-xxxx

请运行常规补丁检查，在启用测试的情况下进行构建，有需要时也可以更改CHANGELOG。如果满足所有要求，您就可以使用以下方法提交压缩请求：

    git commit --author="contributor_name <contributor_email>" -a -m "ROCKETMQ-XXXX description closes apache/rocketmq#ZZ

ROCKETMQ-XXXX全部大写，ZZ是apache / rocketmq仓库上的pull请求号。包含“closes apache / rocketmq #ZZ”命令将自动关闭PR。 更多信息可以在[GitHub PR关闭文档](https://help.github.com/articles/closing-issues-via-commit-messages/)里找到。紧接着，推送到apache：

    git push apache master

（这需要Apache处理权限）。 一旦被push，PR将被镜像到github。 同时为了更新你自己github上的版本，需要再push一次：

    git push origin master

squash合并的注意事项：由于squash丢弃了远程分支历史记录，因此难以合并来自同一远程分支的重复PR。这里的工作流意味着每个新PR都会以新的rebase分支开始。相对于提交者，贡献者知道这个更重要，因为如果新的PR不能合并，github会在开始的时候发出警告。请注意假的 PRs（基于相同的源分支）。

# 关闭一个PR并拒绝提交(对提交者来说)
如果我们想拒绝一个PR（关闭并且拒绝提交），我们只要在主干的HEAD上发布一个空的commit，同时不要合并这个PR：

    git commit --allow-empty -m "ROCKETMQ-XXXX closes apache/rocketmq#ZZ *Won't fix*"
    git push apache master

这将会在github上关闭请求号为ZZ的PR，并且不会进行合并操作，也不会在主干仓库里作任何代码修改。
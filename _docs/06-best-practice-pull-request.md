---
title: "Best Practice in Pull Request"
permalink: /docs/pull-request/
modified: 2016-12-24T15:01:43-04:00
---

There are several ways to setup Git for committers and contributors.<br />
Contributors can safely setup Git any way they choose but committers should take extra care since they can push new commits to the master at Apache and various policies there make backing out mistakes problematic. Therefore all but very small changes should go through a PR, even for committers.<br />
To keep the commit history clean take note of the use of `--squash` when merging into apache/master.

{% include toc %}

# Git setup for Contributors
First of all, fork github’s `apache/incubator-rocketmq` to your own account on github and clone it as follows,

    git clone https://github.com/<your_github_name>/incubator-rocketmq.git

Cloning this locally will set up `origin` to point to your remote fork on github as the default remote.
Now you can create your pull requests.

You will need to update a local master sometimes (to merge to your development branches sometimes).
For this, you have to add remote for Apache Ignite mirror as follow,

    git remote add upstream https://github.com/apache/incubator-rocketmq.git

# Git setup for Committers
In addition to contributors' configurations, committers will have to attach the apache git repo:

    git remote add apache https://git-wip-us.apache.org/repos/asf/incubator-rocketmq.git
    
To check your remote setup, issue

    git remote -v
    
You should see something like this:

    origin    https://github.com/<your_github_name>/incubator-rocketmq.git (fetch)
    origin    https://github.com/<your_github_name>/incubator-rocketmq.git (push)
    upstream  https://github.com/apache/incubator-rocketmq.git (fetch)
    upstream  https://github.com/apache/incubator-rocketmq.git (push)
    apache    https://git-wip-us.apache.org/repos/asf/incubator-rocketmq.git (fetch)
    apache    https://git-wip-us.apache.org/repos/asf/incubator-rocketmq.git (push)
    
Now if you want to experiment with a branch everything, by default, points to your github account because 'origin' is default. You can work as normal using only github until you are ready to merge with the apache remote. Some conventions will integrate with Apache JIRA ticket numbers.

    git checkout -b ROCKETMQ-xxxx #xxxx typically is a JIRA ticket number
    
# Do some work on the branch

    git commit -a -m "doing some work"
    git push origin ROCKETMQ-xxxx # notice pushing to **origin** not **apache**
    
Once you are ready to commit to the apache remote you can merge and push them directly or better yet create a PR.

# How to create a PR (committers)

Push your branch to Github:

    git checkout ROCKETMQ-xxxx
    git push origin ROCKETMQ-xxxx
    
1. Go to your ROCKETMQ-xxxx branch on Github. Since you forked it from Github's apache/incubator-rocketmq. it will default any PR to go to apache/master.

2. Click the green "Compare, review, and create pull request" button.You can edit the to and from for the PR if it isn't correct. The "base fork" should be apache/incubator-rocketmq unless you are collaborating separately with one of the committers on the list. The "base" will be master. Don't submit a PR to one of the other branches unless you know what you are doing. The "head fork" will be your forked repo and the "compare" will be your ROCKETMQ-xxxx branch.
3. Click the "Create pull request" button and name the request "ROCKETMQ-xxxx" all caps. This will connect the comments of the PR to the mailing list and JIRA comments.
4. From now on the PR lives on github's apache/incubator-rocketmq. You use the commenting UI there.
5. If you are looking for a review or sharing with someone else say so in the comments but don't worry about automated merging of your PR--you will have to do that later. The PR is tied to your branch so you can respond to comments, make fixes, and commit them from your local repo. They will appear on the PR page and be mirrored to Jira and the mailing list.
6. When you are satisfied and want to push it to Apache's remote repo proceed with Merging a PR

# How to create a PR (contributors)
Create pull requests: [GitHub PR docs](https://help.github.com/articles/creating-a-pull-request/).

_Make sure you follow_ [Coding Guidelines]{http://rocketmq.apache.org/docs/code-guidelines/} _before you create a pull request._

Pull requests are made to `apache/incubator-rocketmq` repository on Github. In the Github UI you should pick the master branch to target the PR as described for committers. This will be reviewed and commented on so the merge is not automatic. This can be used for discussing a contributions in progress.

# Merging a PR (yours or contributors)
Start with reading [GitHub PR merging locally](https://help.github.com/articles/checking-out-pull-requests-locally/). Remember that pull requests are equivalent to a remote github branch with potentially a multitude of commits. In this case it is recommended to squash remote commit history to have one commit per issue, rather than merging in a multitude of contributor's commits. In order to do that, as well as close the PR at the same time, it is recommended to use squash commits.
Merging pull requests are equivalent to a "pull" of a contributor's branch:

    git checkout master      # switch to local master branch
    git pull apache master   # fast-forward to current remote HEAD
    git pull --squash https://github.com/cuser/incubator-rocketmq.git ROCKETMQ-xxxx  # merge to master
    
--squash ensures all PR history is squashed into single commit, and allows committer to use his/her own message. Read git help for merge or pull for more information about --squash option. In this example we assume that the contributor's Github handle is "cuser" and the PR branch name is "ROCKETMQ-xxxx". Next, resolve conflicts, if any, or ask a contributor to rebase on top of master, if PR went out of sync.

If you are ready to merge your own (committer's) PR you probably only need to merge (not pull), since you have a local copy that you've been working on. This is the branch that you used to create the PR.

    git checkout master      # switch to local master branch
    git pull apache master   # fast-forward to current remote HEAD
    git merge --squash ROCKETMQ-xxxx
    
Remember to run regular patch checks, build with tests enabled, and change CHANGELOG.
If everything is fine, you now can commit the squashed request along the lines

    git commit --author="contributor_name <contributor_email>" -a -m "ROCKETMQ-XXXX description closes apache/incubator-rocketmq#ZZ"
    
ROCKETMQ-XXXX is all caps and where ZZ is the pull request number on apache/incubator-rocketmq repository. Including "closes apache/incubator-rocketmq#ZZ" will close the PR automatically. More information is found here [GitHub PR closing docs.](https://help.github.com/articles/closing-issues-via-commit-messages/).
Next, push to git-wip-us.apache.org:

    git push apache master
    
(this will require Apache handle credentials).
The PR, once pushed, will get mirrored to github. To update your github version push there too:

    git push origin master
    
Note on squashing: Since squash discards remote branch history, repeated PRs from the same remote branch are difficult for merging. The workflow implies that every new PR starts with a new rebased branch. This is more important for contributors to know, rather than for committers, because if new PR is not mergeable, github would warn to begin with. Anyway, watch for dupe PRs (based on same source branches). This is a bad practice.

# Closing a PR without committing (for committers)
When we want to reject a PR (close without committing), we can just issue an empty commit on master's HEAD without merging the PR:

    git commit --allow-empty -m "ROCKETMQ-XXXX closes apache/incubator-rocketmq#ZZ *Won't fix*"
    git push apache master
    
that should close PR ZZ on github mirror without merging and any code modifications in the master repository.more detail please refer to RocketMQ PR https://github.com/apache/incubator-rocketmq/pull/15


# Apache/github integration features

Read [infra blog](https://blogs.apache.org/infra/entry/improved_integration_between_apache_and). Comments and PRs with RocketMQ issue handles should post to mailing lists and JIRA. RocketMQ issue handles must in the form ROCKETMQ-YYYYY (all capitals). Usually it makes sense to file a JIRA issue first, and then create a PR with description
ROCKETMQ-YYYY: <jira-issue-description>
In this case all subsequent comments will automatically be copied to jira without having to mention JIRA issue explicitly in each comment of the PR.

# Best Practises

## Avoiding accidentally committing private branches to the ASF repo

Its dangerously easy —especially when using IDEs— to accidentally commit changes to the ASF repo, be it direct to the trunk, branch-2 or other standard branch on which you are developing, or to a private branch you had intended to keep on github (or a private repo).

Committers can avoid this by having the directory in which they develop code set up with read only access to the ASF repository on github, without the apache repository added. A separate directory should be set up with write access to the ASF repository as well as read access to your other repositories. Merging operations and pushes back to the ASF repo are done from this directory —so isolated from all local development.

If you accidentally commit a patch to an ASF branch, do not attempt to roll back the branch and force out a new update. Simply commit and push out a new patch revoking the change.

If you do accidentally commit a branch to the ASF repo, the infrastructure team can delete it —but they cannot stop it propagating to github and potentially being visible. Try not to do that.



---
title: "How to create Pull Request"
permalink: /docs/create-pull-request/
modified: 2016-12-24T15:01:43-04:00
---

This page guides you through the pull request creation process.

{% include toc %}

# Git setup for Contributors
First of all, fork github’s `apache/rocketmq` to your own account on github and clone it as follows,

    git clone https://github.com/<your_github_name>/rocketmq.git

Cloning this locally will set up `origin` to point to your remote fork on github as the default remote.
Now you can create your pull requests.

You will need to update a local master sometimes (to merge to your development branches sometimes).
For this, you have to add remote for RocketMQ mirror as follows,

    git remote add upstream https://github.com/apache/rocketmq.git

and update your local master via `git fetch` followed by `git rebase`, for instance:
    git fetch upstream master
    git rebase upstream/master

# Git setup for Committers
In addition to contributors' configurations, committers will have to attach the apache git repo:

    git remote add apache https://git-wip-us.apache.org/repos/asf/rocketmq.git

To check your remote setup, issue

    git remote -v

You should see something like this:

    origin    https://github.com/<your_github_name>/rocketmq.git (fetch)
    origin    https://github.com/<your_github_name>/rocketmq.git (push)
    upstream  https://github.com/apache/rocketmq.git (fetch)
    upstream  https://github.com/apache/rocketmq.git (push)
    apache    https://git-wip-us.apache.org/repos/asf/rocketmq.git (fetch)
    apache    https://git-wip-us.apache.org/repos/asf/rocketmq.git (push)

Now if you want to experiment with a branch everything, by default, points to your github account because 'origin' is default. You can work as normal using only github until you are ready to merge with the apache remote. Some conventions will integrate with Apache JIRA ticket numbers.

    git checkout -b ROCKETMQ-xxxx #xxxx typically is a JIRA ticket number

_To ensure the code quality of the master branch, all but minor changes should go through pull requests reviewed by peer committers._

# Do some work on the branch

    git commit -a -m "doing some work"
    git push origin ROCKETMQ-xxxx # notice pushing to **origin** not **apache**

Once you are ready to commit to the apache remote you can merge and push them directly, otherwise always create a PR.

# How to create a PR (committers)

Push your branch to Github:

    git checkout ROCKETMQ-xxxx
    git push origin ROCKETMQ-xxxx

1. Go to your ROCKETMQ-xxxx branch on Github. Since you forked it from Github's apache/rocketmq. By default all PR will go to apache/master.

2. Click the green "Compare, review, and create pull request" button. You can edit the to and from for the PR if it isn't correct. The "base fork" should be apache/rocketmq unless you are collaborating with one of the committers on the list. The "base" will be master. Don't submit a PR to any other branches unless permitted by branch owner. The "head fork" will be your forked repo and the "compare" will be your ROCKETMQ-xxxx branch.
3. Click the "Create pull request" button and name the request "ROCKETMQ-xxxx" all caps. This will connect the comments of the PR to the mailing list and JIRA comments.
4. From now on the PR lives on github's apache/rocketmq. You can use the commenting UI there.
5. If you are looking for a review or wanting to share with someone else please write a note in the comments and don't worry about automated merging of your PR -- you will have to do that later. The PR is tied to your branch so you can respond to comments, make fixes, and commit them from your local repo. They will appear on the PR page and be mirrored to JIRA and the mailing list.
6. When you are satisfied and want to push it to Apache's remote repo, you can merge this PR.

# How to create a PR (contributors)
Before you create a pull request, make sure
1. A corresponding [JIRA](https://issues.apache.org/jira/browse/ROCKETMQ/) issue is created and has a clear problem description.
2. Make sure you follow [Coding Guidelines](/docs/code-guidelines/).
3. You have unit tests for everything you are about to commit.

For information about creating pull requests, please check [GitHub PR docs](https://help.github.com/articles/creating-a-pull-request/).

Pull requests are made to `apache/rocketmq` repository on Github.
In the Github UI you can pick the develop branch as target of the PR. <br />
You pull request will be reviewed and commented by committers, and issues can be discussed. When all reviewers are positive on the pull request, it will be merged.
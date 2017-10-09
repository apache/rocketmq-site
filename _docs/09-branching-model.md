---
title: "Branching Model"
permalink: /docs/branching-model
excerpt: "Apache RocketMQ Branching Model"
modified: 2017-02-7T15:01:43-04:00
---

{% include toc %}

A summary of RocketMQ branching model:

![](/assets/images/release-manual/14864364524873.jpg)


# The main branches

At the core, the development model is greatly inspired by existing models out there. The central repo holds two main branches with an infinite lifetime:

* master
* develop

The **master** branch at origin should be familiar to every Git user. Parallel to the master branch, another branch exists called **develop**.

We consider **origin/master** to be the main branch where the source code of HEAD always reflects a production-ready state.

We consider **origin/develop** to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”. This is where any automatic nightly builds are built from.

When the source code in the develop branch reaches a stable point and is ready to be released, all of the changes should be merged back into master somehow and then tagged with a release number. How this is done in detail will be discussed further on.

Therefore, each time when changes are merged back into master, this is a new production release by definition. We tend to be very strict at this, so that theoretically, we could use a Git hook script to automatically build and roll-out our software to our production servers everytime there was a commit on **master**.

![](/assets/images/release-manual/14864365609580.jpg)


# Supporting branches

Next to the main branches master and develop, our development model uses a variety of supporting branches to aid parallel development between team members, ease tracking of features, prepare for production releases and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

* Feature branches
* Release branches
* Hotfix branches

Each of these branches have a specific purpose and are bound to strict rules as to which branches may be their originating branch and which branches must be their merge targets. We will walk through them in a minute.

By no means are these branches “special” from a technical perspective. The branch types are categorized by how we use them. They are of course plain old Git branches.

## Feature branches

May branch off from:
> **develop**

Must merge back into:
> **develop**

Branch naming convention:
> anything except master, develop, release-\*, or hotfix-\*

Feature branches (or sometimes called topic branches) are used to develop new features for the upcoming or a distant future release. When starting development of a feature, the target release in which this feature will be incorporated may well be unknown at that point. The essence of a feature branch is that it exists as long as the feature is in development, but will eventually be merged back into **develop** (to definitely add the new feature to the upcoming release) or discarded (in case of a disappointing experiment).

Feature branches typically exist in developer repos only, not in **origin**.

![](/assets/images/release-manual/14864367062507.jpg)


### Creating a feature branch

When starting work on a new feature, branch off from the **develop** branch.

```shell
$ git checkout -b myfeature develop
Switched to a new branch "myfeature"
```
### Incorporating a finished feature on develop

Finished features may be merged into the **develop** branch to definitely add them to the upcoming release:

```shell
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
```

The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature. Compare:

![](/assets/images/release-manual/14864368514198.jpg)


In the latter case, it is impossible to see from the Git history which of the commit objects together have implemented a feature—you would have to manually read all the log messages. Reverting a whole feature (i.e. a group of commits), is a true headache in the latter situation, whereas it is easily done if the **--no-ff** flag was used.

Yes, it will create a few more (empty) commit objects, but the gain is much bigger than the cost.

## Release branches

May branch off from:
> **develop**

Must merge back into:
> **develop and master**

Branch naming convention:
> **release-***

Release branches support preparation of a new production release. They allow for last-minute dotting of i’s and crossing t’s. Furthermore, they allow for minor bug fixes and preparing meta-data for a release (version number, build dates, etc.). By doing all of this work on a release branch, the **develop** branch is cleared to receive features for the next big release.

The key moment to branch off a new release branch from **develop** is when develop (almost) reflects the desired state of the new release. At least all features that are targeted for the release-to-be-built must be merged in to develop at this point in time. All features targeted at future releases may not—they must wait until after the release branch is branched off.

It is exactly at the start of a release branch that the upcoming release gets assigned a version number—not any earlier. Up until that moment, the develop branch reflected changes for the “next release”, but it is unclear whether that “next release” will eventually become 0.3 or 1.0, until the release branch is started. That decision is made on the start of the release branch and is carried out by the project’s rules on version number bumping.

### Creating a release branch

Release branches are created from the develop branch:

```shell
$ git checkout -b release-4.2.0 develop
Switched to a new branch "release-4.2.0"
```

Please refer to [here](/docs/release-manual) for the following process.

After the Apache release process is done, remember to merge back into **develop** and **master** branches.

## Hotfix branches 

May branch off from:
> **master**

Must merge back into:
> **develop and master**

Branch naming convention:
> **hotfix-\***

Hotfix branches are very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

The essence is that work of team members (on the develop branch) can continue, while another person is preparing a quick production fix.
![](/assets/images/release-manual/14864376551544.jpg)

# References

[1] http://nvie.com/posts/a-successful-git-branching-model/



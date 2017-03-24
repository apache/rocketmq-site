## The correct posture of submitting a PR


### Fork the original repo
* fork the original repo, and clone it. 

> git clone  https://github.com/dongeforever/incubator-rocketmq.git

* add original remote repo

> git remote add apache https://github.com/apache/incubator-rocketmq.git

* show the remote repos

> git remote -v  
> apache	 https://github.com/apache/incubator-rocketmq.git (fetch)  
> apache	 https://github.com/apache/incubator-rocketmq.git (push)  
> origin	 https://github.com/dongeforever/incubator-rocketmq.git (fetch)  
> origin	 https://github.com/dongeforever/incubator-rocketmq.git (push)  

### Use a new branch to write your own code and commit
you'd better use a new branch for each PR, for it is convenient to manage your code and commits
> git checkout -b new_pr  
> git push -u origin new_pr


### [Important] rebase instead of merge
> git fetch apache  
> git rebase apache/develop  
> git push  

Note: if using merge, it will dirty the commits

the difference between rebase and merge can refer to:  
[https://www.atlassian.com/git/tutorials/merging-vs-rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)



### [Suggested]squash the commits
you can code and commit as usual. But when you think it is time to submit a PR, it is better to squash your commits into single one, for that others can easily identify your PR from the history commits.
you can squash as follows:
> gt reset \<the latest commit that dose not belong to you PR\>  
> git add --all  
> git commit -m "attach the issue or jira"  
> git push -f  


For example:  
> git log  

![](https://lh3.googleusercontent.com/-xYoltD_ZDhE/WNTONuq58WI/AAAAAAAAABo/zWZdGVxNVa8/I/14864352604541.jpg)

> git resset b4108d2d9d3b1522e45ac5e7ea37106f2135bfa0   
> git commit -m 'Add batch feature'  
> git log   

![](https://lh3.googleusercontent.com/-Pe_xYIiPAGE/WNTOOHEUd1I/AAAAAAAAABs/VfuT_wBQ5QI/I/14864353798102.jpg)
> git push -f 

 

### Attach jira or issue
For now, we have finished the preparations of a PR. It is time to create it. For apache projects, we could attach the jira issue using specific title like "[XXX] add something", such as "[ROCKETMQ-80] Add batch feature", the "XXX" represents the the name of the jira issue.
you could refer to:

[https://github.com/apache/incubator-rocketmq/pull/53](https://github.com/apache/incubator-rocketmq/pull/53)



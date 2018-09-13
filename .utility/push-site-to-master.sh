#!/bin/bash
if [ "$TRAVIS_REPO_SLUG" == "apache/rocketmq-site" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  echo -e "Publishing Apache RocketMQ site...\n"
  rm -rf $HOME/rocketmq-site-latest
  cp -R . $HOME/rocketmq-site-latest

  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git clone --quiet --branch=asf-site https://${GH_TOKEN}@github.com/apache/rocketmq-site asf-site > /dev/null

  cd asf-site
  git rm -rf .
  cp -Rf $HOME/rocketmq-site-latest/. .
  git add -f .
  git commit -m "Latest site on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to asf-site"
  git push -fq origin asf-site > /dev/null

  echo -e "Published rocketmq site to asf-site.\n"
  
fi

"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[855],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return s}});var n=r(67294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,a=e.originalType,i=e.parentName,u=d(e,["components","mdxType","originalType","parentName"]),m=p(r),s=l,g=m["".concat(i,".").concat(s)]||m[s]||c[s]||a;return r?n.createElement(g,o(o({ref:t},u),{},{components:r})):n.createElement(g,o({ref:t},u))}));function s(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=r.length,o=new Array(a);o[0]=m;var d={};for(var i in t)hasOwnProperty.call(t,i)&&(d[i]=t[i]);d.originalType=e,d.mdxType="string"==typeof e?e:l,o[1]=d;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},985:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return d},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return u},default:function(){return m}});var n=r(87462),l=r(63366),a=(r(67294),r(3905)),o=["components"],d={},i="Dledger",p={unversionedId:"\u6700\u4f73\u5b9e\u8df5/16dledger",id:"\u6700\u4f73\u5b9e\u8df5/16dledger",isDocsHomePage:!1,title:"Dledger",description:"Dledger\u5feb\u901f\u642d\u5efa",source:"@site/docs/05-\u6700\u4f73\u5b9e\u8df5/16dledger.md",sourceDirName:"05-\u6700\u4f73\u5b9e\u8df5",slug:"/\u6700\u4f73\u5b9e\u8df5/16dledger",permalink:"/en/docs/\u6700\u4f73\u5b9e\u8df5/16dledger",editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/docs/05-\u6700\u4f73\u5b9e\u8df5/16dledger.md",tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"\u57fa\u672c\u6700\u4f73\u5b9e\u8df5",permalink:"/en/docs/\u6700\u4f73\u5b9e\u8df5/15bestpractice"},next:{title:"\u6d88\u606f\u8f68\u8ff9",permalink:"/en/docs/\u6700\u4f73\u5b9e\u8df5/17messagetra"}},u=[{value:"Dledger\u5feb\u901f\u642d\u5efa",id:"dledger\u5feb\u901f\u642d\u5efa",children:[{value:"\u524d\u8a00",id:"\u524d\u8a00",children:[]},{value:"1. \u6e90\u7801\u6784\u5efa",id:"1-\u6e90\u7801\u6784\u5efa",children:[]},{value:"2. \u5feb\u901f\u90e8\u7f72",id:"2-\u5feb\u901f\u90e8\u7f72",children:[]},{value:"3. \u5bb9\u707e\u5207\u6362",id:"3-\u5bb9\u707e\u5207\u6362",children:[]}]},{value:"Dledger\u96c6\u7fa4\u642d\u5efa",id:"dledger\u96c6\u7fa4\u642d\u5efa",children:[{value:"1. \u65b0\u96c6\u7fa4\u90e8\u7f72",id:"1-\u65b0\u96c6\u7fa4\u90e8\u7f72",children:[]},{value:"2. \u65e7\u96c6\u7fa4\u5347\u7ea7",id:"2-\u65e7\u96c6\u7fa4\u5347\u7ea7",children:[]}]}],c={toc:u};function m(e){var t=e.components,r=(0,l.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"dledger"},"Dledger"),(0,a.kt)("h2",{id:"dledger\u5feb\u901f\u642d\u5efa"},"Dledger\u5feb\u901f\u642d\u5efa"),(0,a.kt)("h3",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,a.kt)("p",null,"\u8be5\u6587\u6863\u4e3b\u8981\u4ecb\u7ecd\u5982\u4f55\u5feb\u901f\u6784\u5efa\u548c\u90e8\u7f72\u57fa\u4e8e DLedger \u7684\u53ef\u4ee5\u81ea\u52a8\u5bb9\u707e\u5207\u6362\u7684 RocketMQ \u96c6\u7fa4\u3002"),(0,a.kt)("h3",{id:"1-\u6e90\u7801\u6784\u5efa"},"1. \u6e90\u7801\u6784\u5efa"),(0,a.kt)("p",null,"\u6784\u5efa\u5206\u4e3a\u4e24\u4e2a\u90e8\u5206\uff0c\u9700\u8981\u5148\u6784\u5efa DLedger\uff0c\u7136\u540e \u6784\u5efa RocketMQ"),(0,a.kt)("h4",{id:"11-\u6784\u5efa-dledger"},"1.1 \u6784\u5efa DLedger"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/openmessaging/openmessaging-storage-dledger.git\ncd openmessaging-storage-dledger\nmvn clean install -DskipTests\n")),(0,a.kt)("h4",{id:"12-\u6784\u5efa-rocketmq"},"1.2 \u6784\u5efa RocketMQ"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/apache/rocketmq.git\ncd rocketmq\ngit checkout -b store_with_dledger origin/store_with_dledger\nmvn -Prelease-all -DskipTests clean install -U\n")),(0,a.kt)("h3",{id:"2-\u5feb\u901f\u90e8\u7f72"},"2. \u5feb\u901f\u90e8\u7f72"),(0,a.kt)("p",null,"\u5728\u6784\u5efa\u6210\u529f\u540e"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cd distribution/target/apache-rocketmq\n\nsh bin/dledger/fast-try.sh start\n")),(0,a.kt)("p",null,"\u5982\u679c\u4e0a\u9762\u7684\u6b65\u9aa4\u6267\u884c\u6210\u529f\uff0c\u53ef\u4ee5\u901a\u8fc7 mqadmin \u8fd0\u7ef4\u547d\u4ee4\u67e5\u770b\u96c6\u7fa4\u72b6\u6001\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sh bin/mqadmin clusterList -n 127.0.0.1:9876\n")),(0,a.kt)("p",null,"\u987a\u5229\u7684\u8bdd\uff0c\u4f1a\u770b\u5230\u5982\u4e0b\u5185\u5bb9\uff1a"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img.alicdn.com/5476e8b07b923/TB11Z.ZyCzqK1RjSZFLXXcn2XXa",alt:"ClusterList"})),(0,a.kt)("p",null,"\uff08BID \u4e3a 0 \u7684\u8868\u793a Master\uff0c\u5176\u4f59\u90fd\u662f Follower\uff09"),(0,a.kt)("p",null,"\u542f\u52a8\u6210\u529f\uff0c\u73b0\u5728\u53ef\u4ee5\u5411\u96c6\u7fa4\u6536\u53d1\u6d88\u606f\uff0c\u5e76\u8fdb\u884c\u5bb9\u707e\u5207\u6362\u6d4b\u8bd5\u4e86\u3002"),(0,a.kt)("p",null,"\u5173\u95ed\u5feb\u901f\u96c6\u7fa4\uff0c\u53ef\u4ee5\u6267\u884c\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sh bin/dledger/fast-try.sh stop\n")),(0,a.kt)("p",null,"\u5feb\u901f\u90e8\u7f72\uff0c\u9ed8\u8ba4\u914d\u7f6e\u5728 conf/dledger \u91cc\u9762\uff0c\u9ed8\u8ba4\u7684\u5b58\u50a8\u8def\u5f84\u5728 /tmp/rmqstore\u3002"),(0,a.kt)("h3",{id:"3-\u5bb9\u707e\u5207\u6362"},"3. \u5bb9\u707e\u5207\u6362"),(0,a.kt)("p",null,"\u90e8\u7f72\u6210\u529f\uff0c\u6740\u6389 Leader \u4e4b\u540e\uff08\u5728\u4e0a\u9762\u7684\u4f8b\u5b50\u4e2d\uff0c\u6740\u6389\u7aef\u53e3 30931 \u6240\u5728\u7684\u8fdb\u7a0b\uff09\uff0c\u7b49\u5f85\u7ea6 10s \u5de6\u53f3\uff0c\u7528 clusterList \u547d\u4ee4\u67e5\u770b\u96c6\u7fa4\uff0c\u5c31\u4f1a\u53d1\u73b0 Leader \u5207\u6362\u5230\u53e6\u4e00\u4e2a\u8282\u70b9\u4e86\u3002"),(0,a.kt)("h2",{id:"dledger\u96c6\u7fa4\u642d\u5efa"},"Dledger\u96c6\u7fa4\u642d\u5efa"),(0,a.kt)("p",null,"\u672c\u90e8\u5206\u4e3b\u8981\u4ecb\u7ecd\u5982\u4f55\u90e8\u7f72\u81ea\u52a8\u5bb9\u707e\u5207\u6362\u7684 RocketMQ-on-DLedger Group\u3002"),(0,a.kt)("p",null,"RocketMQ-on-DLedger Group \u662f\u6307\u4e00\u7ec4",(0,a.kt)("strong",{parentName:"p"},"\u76f8\u540c\u540d\u79f0"),"\u7684 Broker\uff0c\u81f3\u5c11\u9700\u8981 3 \u4e2a\u8282\u70b9\uff0c\u901a\u8fc7 Raft \u81ea\u52a8\u9009\u4e3e\u51fa\u4e00\u4e2a Leader\uff0c\u5176\u4f59\u8282\u70b9 \u4f5c\u4e3a Follower\uff0c\u5e76\u5728 Leader \u548c Follower \u4e4b\u95f4\u590d\u5236\u6570\u636e\u4ee5\u4fdd\u8bc1\u9ad8\u53ef\u7528\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","RocketMQ-on-DLedger Group \u80fd\u81ea\u52a8\u5bb9\u707e\u5207\u6362\uff0c\u5e76\u4fdd\u8bc1\u6570\u636e\u4e00\u81f4\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","RocketMQ-on-DLedger Group \u662f\u53ef\u4ee5\u6c34\u5e73\u6269\u5c55\u7684\uff0c\u4e5f\u5373\u53ef\u4ee5\u90e8\u7f72\u4efb\u610f\u591a\u4e2a RocketMQ-on-DLedger Group \u540c\u65f6\u5bf9\u5916\u63d0\u4f9b\u670d\u52a1\u3002"),(0,a.kt)("h3",{id:"1-\u65b0\u96c6\u7fa4\u90e8\u7f72"},"1. \u65b0\u96c6\u7fa4\u90e8\u7f72"),(0,a.kt)("h4",{id:"11-\u7f16\u5199\u914d\u7f6e"},"1.1 \u7f16\u5199\u914d\u7f6e"),(0,a.kt)("p",null,"\u6bcf\u4e2a RocketMQ-on-DLedger Group \u81f3\u5c11\u51c6\u5907\u4e09\u53f0\u673a\u5668\uff08\u672c\u6587\u5047\u8bbe\u4e3a 3\uff09\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u7f16\u5199 3 \u4e2a\u914d\u7f6e\u6587\u4ef6\uff0c\u5efa\u8bae\u53c2\u8003 conf/dledger \u76ee\u5f55\u4e0b\u7684\u914d\u7f6e\u6587\u4ef6\u6837\u4f8b\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u5173\u952e\u914d\u7f6e\u4ecb\u7ecd\uff1a  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"name"),(0,a.kt)("th",{parentName:"tr",align:null},"\u542b\u4e49"),(0,a.kt)("th",{parentName:"tr",align:null},"\u4e3e\u4f8b"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"enableDLegerCommitLog"),(0,a.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u542f\u52a8 DLedger"),(0,a.kt)("td",{parentName:"tr",align:null},"true")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"dLegerGroup"),(0,a.kt)("td",{parentName:"tr",align:null},"DLedger Raft Group\u7684\u540d\u5b57\uff0c\u5efa\u8bae\u548c brokerName \u4fdd\u6301\u4e00\u81f4"),(0,a.kt)("td",{parentName:"tr",align:null},"RaftNode00")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"dLegerPeers"),(0,a.kt)("td",{parentName:"tr",align:null},"DLedger Group \u5185\u5404\u8282\u70b9\u7684\u7aef\u53e3\u4fe1\u606f\uff0c\u540c\u4e00\u4e2a Group \u5185\u7684\u5404\u4e2a\u8282\u70b9\u914d\u7f6e\u5fc5\u987b\u8981\u4fdd\u8bc1\u4e00\u81f4"),(0,a.kt)("td",{parentName:"tr",align:null},"n0-127.0.0.1:40911;n1-127.0.0.1:40912;n2-127.0.0.1:40913")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"dLegerSelfId"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8282\u70b9 id, \u5fc5\u987b\u5c5e\u4e8e\xa0dLegerPeers \u4e2d\u7684\u4e00\u4e2a\uff1b\u540c Group \u5185\u5404\u4e2a\u8282\u70b9\u8981\u552f\u4e00"),(0,a.kt)("td",{parentName:"tr",align:null},"n0")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sendMessageThreadPoolNums"),(0,a.kt)("td",{parentName:"tr",align:null},"\u53d1\u9001\u7ebf\u7a0b\u4e2a\u6570\uff0c\u5efa\u8bae\u914d\u7f6e\u6210 Cpu \u6838\u6570"),(0,a.kt)("td",{parentName:"tr",align:null},"16")))),(0,a.kt)("p",null,"\u8fd9\u91cc\u8d34\u51fa conf/dledger/broker-n0.conf \u7684\u914d\u7f6e\u4e3e\u4f8b\u3002  "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"brokerClusterName = RaftCluster\nbrokerName=RaftNode00\nlistenPort=30911\nnamesrvAddr=127.0.0.1:9876\nstorePathRootDir=/tmp/rmqstore/node00\nstorePathCommitLog=/tmp/rmqstore/node00/commitlog\nenableDLegerCommitLog=true\ndLegerGroup=RaftNode00\ndLegerPeers=n0-127.0.0.1:40911;n1-127.0.0.1:40912;n2-127.0.0.1:40913\n## must be unique\ndLegerSelfId=n0\nsendMessageThreadPoolNums=16\n")),(0,a.kt)("h4",{id:"12-\u542f\u52a8-broker"},"1.2 \u542f\u52a8 Broker"),(0,a.kt)("p",null,"\u4e0e\u8001\u7248\u672c\u7684\u542f\u52a8\u65b9\u5f0f\u4e00\u81f4\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"nohup sh bin/mqbroker -c conf/dledger/xxx-n0.conf & "),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"nohup sh bin/mqbroker -c conf/dledger/xxx-n1.conf & "),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"nohup sh bin/mqbroker -c conf/dledger/xxx-n2.conf & "),"  "),(0,a.kt)("h3",{id:"2-\u65e7\u96c6\u7fa4\u5347\u7ea7"},"2. \u65e7\u96c6\u7fa4\u5347\u7ea7"),(0,a.kt)("p",null,"\u5982\u679c\u65e7\u96c6\u7fa4\u91c7\u7528 Master \u65b9\u5f0f\u90e8\u7f72\uff0c\u5219\u6bcf\u4e2a Master \u90fd\u9700\u8981\u8f6c\u6362\u6210\u4e00\u4e2a RocketMQ-on-DLedger Group\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u5982\u679c\u65e7\u96c6\u7fa4\u91c7\u7528 Master-Slave \u65b9\u5f0f\u90e8\u7f72\uff0c\u5219\u6bcf\u4e2a Master-Slave \u7ec4\u90fd\u9700\u8981\u8f6c\u6362\u6210\u4e00\u4e2a RocketMQ-on-DLedger Group\u3002"),(0,a.kt)("h4",{id:"21-\u6740\u6389\u65e7\u7684-broker"},"2.1 \u6740\u6389\u65e7\u7684 Broker"),(0,a.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7 kill \u547d\u4ee4\u6765\u5b8c\u6210\uff0c\u4e5f\u53ef\u4ee5\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"bin/mqshutdown broker"),"\u3002"),(0,a.kt)("h4",{id:"22-\u68c0\u67e5\u65e7\u7684-commitlog"},"2.2 \u68c0\u67e5\u65e7\u7684 Commitlog"),(0,a.kt)("p",null,"RocketMQ-on-DLedger \u7ec4\u4e2d\u7684\u6bcf\u4e2a\u8282\u70b9\uff0c\u53ef\u4ee5\u517c\u5bb9\u65e7\u7684 Commitlog \uff0c\u4f46\u5176 Raft \u590d\u5236\u8fc7\u7a0b\uff0c\u53ea\u80fd\u9488\u5bf9\u65b0\u589e\u52a0\u7684\u6d88\u606f\u3002\u56e0\u6b64\uff0c\u4e3a\u4e86\u907f\u514d\u51fa\u73b0\u5f02\u5e38\uff0c\u9700\u8981\u4fdd\u8bc1 \u65e7\u7684 Commitlog \u662f\u4e00\u81f4\u7684\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u5982\u679c\u65e7\u7684\u96c6\u7fa4\u662f\u91c7\u7528 Master-Slave \u65b9\u5f0f\u90e8\u7f72\uff0c\u6709\u53ef\u80fd\u5728shutdown\u65f6\uff0c\u5176\u6570\u636e\u5e76\u4e0d\u662f\u4e00\u81f4\u7684\uff0c\u5efa\u8bae\u901a\u8fc7md5sum \u7684\u65b9\u5f0f\uff0c\u68c0\u67e5\u6700\u8fd1\u7684\u6700\u5c11 2 \u4e2a Commmitlog \u6587\u4ef6\uff0c\u5982\u679c\u53d1\u73b0\u4e0d\u4e00\u81f4\uff0c\u5219\u901a\u8fc7\u62f7\u8d1d\u7684\u65b9\u5f0f\u8fdb\u884c\u5bf9\u9f50\u3002  "),(0,a.kt)("p",null,"\u867d\u7136 RocketMQ-on-DLedger Group \u4e5f\u53ef\u4ee5\u4ee5 2 \u8282\u70b9\u65b9\u5f0f\u90e8\u7f72\uff0c\u4f46\u5176\u4f1a\u4e27\u5931\u5bb9\u707e\u5207\u6362\u80fd\u529b\uff082n + 1 \u539f\u5219\uff0c\u81f3\u5c11\u9700\u89813\u4e2a\u8282\u70b9\u624d\u80fd\u5bb9\u5fcd\u5176\u4e2d 1 \u4e2a\u5b95\u673a\uff09\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u6240\u4ee5\u5728\u5bf9\u9f50\u4e86 Master \u548c Slave \u7684 Commitlog \u4e4b\u540e\uff0c\u8fd8\u9700\u8981\u51c6\u5907\u7b2c 3 \u53f0\u673a\u5668\uff0c\u5e76\u628a\u65e7\u7684 Commitlog \u4ece Master \u62f7\u8d1d\u5230 \u7b2c 3 \u53f0\u673a\u5668\uff08\u8bb0\u5f97\u540c\u65f6\u62f7\u8d1d\u4e00\u4e0b config \u6587\u4ef6\u5939\uff09\u3002  "),(0,a.kt)("p",null,"\u5728 3 \u53f0\u673a\u5668\u51c6\u5907\u597d\u4e86\u4e4b\u540e\uff0c\u65e7 Commitlog \u6587\u4ef6\u4e5f\u4fdd\u8bc1\u4e00\u81f4\u4e4b\u540e\uff0c\u5c31\u53ef\u4ee5\u5f00\u59cb\u8d70\u4e0b\u4e00\u6b65\u4fee\u6539\u914d\u7f6e\u4e86\u3002"),(0,a.kt)("h4",{id:"23-\u4fee\u6539\u914d\u7f6e"},"2.3 \u4fee\u6539\u914d\u7f6e"),(0,a.kt)("p",null,"\u53c2\u8003\u65b0\u96c6\u7fa4\u90e8\u7f72\u3002"),(0,a.kt)("h4",{id:"24-\u91cd\u65b0\u542f\u52a8-broker"},"2.4 \u91cd\u65b0\u542f\u52a8 Broker"),(0,a.kt)("p",null,"\u53c2\u8003\u65b0\u96c6\u7fa4\u90e8\u7f72\u3002"))}m.isMDXComponent=!0}}]);
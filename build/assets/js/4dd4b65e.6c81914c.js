"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[8378],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return s}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(n),s=a,g=m["".concat(c,".").concat(s)]||m[s]||d[s]||l;return n?r.createElement(g,o(o({ref:t},u),{},{components:n})):r.createElement(g,o({ref:t},u))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},58215:function(e,t,n){var r=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},55064:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(67294),a=n(79443);var l=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},o=n(86010),i="tabItem_1uMI",c="tabItemActive_2DSg";var p=function(e){var t,n=e.lazy,a=e.block,p=e.defaultValue,u=e.values,d=e.groupId,m=e.className,s=r.Children.toArray(e.children),g=null!=u?u:s.map((function(e){return{value:e.props.value,label:e.props.label}})),k=null!=p?p:null==(t=s.find((function(e){return e.props.default})))?void 0:t.props.value,f=l(),v=f.tabGroupChoices,N=f.setTabGroupChoices,y=(0,r.useState)(k),b=y[0],h=y[1],L=[];if(null!=d){var I=v[d];null!=I&&I!==b&&g.some((function(e){return e.value===I}))&&h(I)}var E=function(e){var t=e.currentTarget,n=L.indexOf(t),r=g[n].value;h(r),null!=d&&(N(d,r),setTimeout((function(){var e,n,r,a,l,o,i,p;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,l=e.right,o=window,i=o.innerHeight,p=o.innerWidth,n>=0&&l<=p&&a<=i&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c),setTimeout((function(){return t.classList.remove(c)}),2e3))}),150))},O=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=L.indexOf(e.target)+1;n=L[r]||L[0];break;case"ArrowLeft":var a=L.indexOf(e.target)-1;n=L[a]||L[L.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},m)},g.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,className:(0,o.Z)("tabs__item",i,{"tabs__item--active":b===t}),key:t,ref:function(e){return L.push(e)},onKeyDown:O,onFocus:E,onClick:E},null!=n?n:t)}))),n?(0,r.cloneElement)(s.filter((function(e){return e.props.value===b}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},s.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==b})}))))}},79443:function(e,t,n){var r=(0,n(67294).createContext)(void 0);t.Z=r},36500:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return m},default:function(){return g}});var r=n(87462),a=n(63366),l=(n(67294),n(3905)),o=n(55064),i=n(58215),c=["components"],p={},u="\u65e5\u5fd7\u914d\u7f6e",d={unversionedId:"\u6700\u4f73\u5b9e\u8df5/20log",id:"version-5.0/\u6700\u4f73\u5b9e\u8df5/20log",isDocsHomePage:!1,title:"\u65e5\u5fd7\u914d\u7f6e",description:"\u5ba2\u6237\u7aef\u65e5\u5fd7\u7528\u4e8e\u8bb0\u5f55\u5ba2\u6237\u7aef\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u7684\u5f02\u5e38\uff0c\u5e2e\u52a9\u5feb\u901f\u5b9a\u4f4d\u548c\u4fee\u590d\u95ee\u9898\u3002\u672c\u6587\u4ecb\u7ecd RocketMQ \u7684\u5ba2\u6237\u7aef\u65e5\u5fd7\u7684\u6253\u5370\u65b9\u5f0f\uff0c\u4ee5\u53ca\u9ed8\u8ba4\u548c\u81ea\u5b9a\u4e49\u914d\u7f6e\u3002",source:"@site/versioned_docs/version-5.0/05-\u6700\u4f73\u5b9e\u8df5/20log.md",sourceDirName:"05-\u6700\u4f73\u5b9e\u8df5",slug:"/\u6700\u4f73\u5b9e\u8df5/20log",permalink:"/docs/5.0/\u6700\u4f73\u5b9e\u8df5/20log",editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/versioned_docs/version-5.0/05-\u6700\u4f73\u5b9e\u8df5/20log.md",tags:[],version:"5.0",frontMatter:{},sidebar:"version-5.0/myAutogeneratedSidebar",previous:{title:"JVM/OS\u914d\u7f6e",permalink:"/docs/5.0/\u6700\u4f73\u5b9e\u8df5/19JVMOS"},next:{title:"\u8ba2\u9605\u5173\u7cfb\u4e00\u81f4",permalink:"/docs/5.0/\u6700\u4f73\u5b9e\u8df5/21subscribe"}},m=[{value:"\u6253\u5370\u5ba2\u6237\u7aef\u65e5\u5fd7",id:"\u6253\u5370\u5ba2\u6237\u7aef\u65e5\u5fd7",children:[{value:"\u65b9\u5f0f\u4e00: \u4f9d\u8d56 log4j \u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0",id:"\u65b9\u5f0f\u4e00-\u4f9d\u8d56-log4j-\u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0",children:[]},{value:"\u65b9\u5f0f\u4e8c: \u4f9d\u8d56 logback \u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0",id:"\u65b9\u5f0f\u4e8c-\u4f9d\u8d56-logback-\u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0",children:[]}]},{value:"\u5ba2\u6237\u7aef\u65e5\u5fd7\u914d\u7f6e",id:"\u5ba2\u6237\u7aef\u65e5\u5fd7\u914d\u7f6e",children:[]},{value:"\u9ed8\u8ba4\u914d\u7f6e",id:"\u9ed8\u8ba4\u914d\u7f6e",children:[]},{value:"\u81ea\u5b9a\u4e49\u914d\u7f6e",id:"\u81ea\u5b9a\u4e49\u914d\u7f6e",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[]}],s={toc:m};function g(e){var t=e.components,n=(0,a.Z)(e,c);return(0,l.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u65e5\u5fd7\u914d\u7f6e"},"\u65e5\u5fd7\u914d\u7f6e"),(0,l.kt)("p",null,"\u5ba2\u6237\u7aef\u65e5\u5fd7\u7528\u4e8e\u8bb0\u5f55\u5ba2\u6237\u7aef\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u7684\u5f02\u5e38\uff0c\u5e2e\u52a9\u5feb\u901f\u5b9a\u4f4d\u548c\u4fee\u590d\u95ee\u9898\u3002\u672c\u6587\u4ecb\u7ecd RocketMQ \u7684\u5ba2\u6237\u7aef\u65e5\u5fd7\u7684\u6253\u5370\u65b9\u5f0f\uff0c\u4ee5\u53ca\u9ed8\u8ba4\u548c\u81ea\u5b9a\u4e49\u914d\u7f6e\u3002 "),(0,l.kt)("h2",{id:"\u6253\u5370\u5ba2\u6237\u7aef\u65e5\u5fd7"},"\u6253\u5370\u5ba2\u6237\u7aef\u65e5\u5fd7"),(0,l.kt)("p",null,"RocketMQ \u7684 TCP Java SDK \u57fa\u4e8e SLF4J \u63a5\u53e3\u7f16\u7a0b\u3002 "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u9488\u5bf9 JavaSDK1.7.8.Final \u7248\u672c\u53ca\u4ee5\u4e0a ")),(0,l.kt)("p",null,"RocketMQ \u7684 Java SDK 1.7.8.Final \u5df2\u5185\u7f6e\u4e86\u65e5\u5fd7\u5b9e\u73b0\uff0c\u65e0\u9700\u5728\u5ba2\u6237\u7aef\u5e94\u7528\u4e2d\u6dfb\u52a0\u65e5\u5fd7\u5b9e\u73b0\u4f9d\u8d56 \u5373\u53ef\u6253\u5370 RocketMQ \u5ba2\u6237\u7aef\u65e5\u5fd7\u3002\nRocketMQ\u5ba2\u6237\u7aef\u65e5\u5fd7\u7684\u9ed8\u8ba4\u914d\u7f6e\u548c\u5982\u4f55\u4fee\u6539\u9ed8\u8ba4\u914d\u7f6e\uff0c\u8bf7\u53c2\u89c1\u4e0b\u6587\u7684\u5ba2\u6237\u7aef\u65e5\u5fd7\u914d\u7f6e\u90e8\u5206\u3002 "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u9488\u5bf9 JavaSDK1.7.8.Final  \u4ee5\u4e0b ")),(0,l.kt)("p",null,"RocketMQ \u7684Java SDK 1.7.8.Final \u4ee5\u4e0b\u7684\u65e7\u7248\u672c\u4e0d\u652f\u6301 log4j2\uff0c\u53ea\u652f\u6301 log4j\u3001logback\u3002\u60a8\u9700\u8981 \u5728 pom.xml \u914d\u7f6e\u6587\u4ef6 \u6216\u8005 lib \u4e2d\u6dfb\u52a0\u5bf9\u5e94\u7684\u65e5\u5fd7\u5b9e\u73b0\u4f9d\u8d56\u6765\u6253\u5370 RocketMQ \u5ba2\u6237\u7aef\u65e5\u5fd7\u3002 "),(0,l.kt)("h3",{id:"\u65b9\u5f0f\u4e00-\u4f9d\u8d56-log4j-\u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0"},"\u65b9\u5f0f\u4e00: \u4f9d\u8d56 log4j \u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0"),(0,l.kt)("p",null,"\u4f9d\u8d56log4j\u6216logback\u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0\u7684\u793a\u4f8b\u4ee3\u7801\u5982\u4e0b\u6240\u793a\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"<dependency> \n  <groupId>org.slf4j</groupId> \n  <artifactId>jcl-over-slf4j</artifactId> \n  <version>1.7.7</version>\n</dependency> \n<dependency>\n  <groupId>org.slf4j</groupId>\n  <artifactId>slf4j-log4j12</artifactId>\n  <version>1.7.7</version>\n</dependency> \n<dependency>\n  <groupId>log4j</groupId> \n  <artifactId>log4j</artifactId>\n  <version>1.2.17</version> \n</dependency>\n")),(0,l.kt)("p",null,"\u4f7f\u7528 log4j \u5c5e\u6027\u914d\u7f6e\u6587\u4ef6\u65f6\uff0c\u914d\u7f6e\u5982\u4e0b\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"log4j.appender.mq=org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender \nlog4j.appender.mq.Tag=yourTag \nlog4j.appender.mq.Topic=yourLogTopic \nlog4j.appender.mq.ProducerGroup=yourLogGroup \nlog4j.appender.mq.NameServerAddress=yourRocketmqNameserverAddress \nlog4j.appender.mq.layout=org.apache.log4j.PatternLayout \nlog4j.appender.mq.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-4r [%t] (%F:%L) %-5p - %m%n \n")),(0,l.kt)("p",null,"\u4f7f\u7528 log4j xml \u914d\u7f6e\u6587\u4ef6\u65f6\uff0c\u5c06\u5176\u914d\u7f6e\u4e3a\u8fd9\u6837\u5e76\u6dfb\u52a0\u4e00\u4e2a\u5f02\u6b65\u9644\u52a0\u7a0b\u5e8f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'<appender name="mqAppender1" class="org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender">\n    <param name="Tag" value="yourTag" />\n    <param name="Topic" value="yourLogTopic" />\n    <param name="ProducerGroup" value="yourLogGroup" />\n    <param name="NameServerAddress" value="yourRocketmqNameserverAddress"/>\n    <layout class="org.apache.log4j.PatternLayout">\n        <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss}-%p %t %c - %m%n" />\n    </layout>\n</appender>\n\n<appender name="mqAsyncAppender1" class="org.apache.log4j.AsyncAppender">\n    <param name="BufferSize" value="1024" />\n    <param name="Blocking" value="false" />\n    <appender-ref ref="mqAppender1"/>\n</appender>\n')),(0,l.kt)("p",null,"\u4f7f\u7528 log4j2 \u65f6\uff0c\u914d\u7f6e\u4e3a this\u3002\u5982\u679c\u4f60\u60f3\u8981 noneblock\uff0c\u53ea\u9700\u4e3a ref \u914d\u7f6e\u4e00\u4e2a asyncAppender\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'<RocketMQ name="rocketmqAppender" producerGroup="yourLogGroup" nameServerAddress="yourRocketmqNameserverAddress"\n     topic="yourLogTopic" tag="yourTag">\n    <PatternLayout pattern="%d [%p] hahahah %c %m%n"/>\n</RocketMQ>\n')),(0,l.kt)("h3",{id:"\u65b9\u5f0f\u4e8c-\u4f9d\u8d56-logback-\u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0"},"\u65b9\u5f0f\u4e8c: \u4f9d\u8d56 logback \u4f5c\u4e3a\u65e5\u5fd7\u5b9e\u73b0"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"<dependency> \n  <groupId>ch.qos.logback</groupId> \n  <artifactId>logback-core</artifactId> \n  <version>1.1.2</version>\n</dependency> \n<dependency>\n  <groupId>ch.qos.logback</groupId>\n  <artifactId>logback-classic</artifactId> \n  <version>1.1.2</version> \n</dependency>\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"<dependency> \n  <groupId>ch.qos.logback</groupId> \n  <artifactId>logback-core</artifactId> \n  <version>1.1.2</version>\n</dependency> \n<dependency>\n  <groupId>ch.qos.logback</groupId>\n  <artifactId>logback-classic</artifactId> \n  <version>1.1.2</version> \n</dependency>\n")),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u5e94\u7528\u4e2d\u540c\u65f6\u4f9d\u8d56log4j\u548clogback\u7684\u65e5\u5fd7\u5b9e\u73b0\u4f1a\u9020\u6210\u65e5\u5fd7\u51b2\u7a81\u5bfc\u81f4\u5ba2\u6237\u7aef\u65e5\u5fd7\u6253\u5370\u6df7\u4e71\u3002\u786e\u4fdd \u5e94\u7528\u53ea\u4f9d\u8d56\u5176\u4e2d\u4e00\u4e2a\u65e5\u5fd7\u5b9e\u73b0\uff0c\u662f\u6b63\u786e\u6253\u5370RocketMQ\u5ba2\u6237\u7aef\u65e5\u5fd7\u7684\u524d\u63d0\u6761\u4ef6\uff0c\u5efa\u8bae\u901a\u8fc7",(0,l.kt)("inlineCode",{parentName:"p"},"mvn \nclean dependency:tree | grep log"),"\u547d\u4ee4\u6392\u67e5\u3002 "))),(0,l.kt)("h2",{id:"\u5ba2\u6237\u7aef\u65e5\u5fd7\u914d\u7f6e"},"\u5ba2\u6237\u7aef\u65e5\u5fd7\u914d\u7f6e"),(0,l.kt)("p",null,"RocketMQ \u5ba2\u6237\u7aef\u652f\u6301\u81ea\u5b9a\u4e49\u65e5\u5fd7\u4fdd\u5b58\u8def\u5f84\u3001\u65e5\u5fd7\u7ea7\u522b\u4ee5\u53ca\u4fdd\u5b58\u5386\u53f2\u65e5\u5fd7\u6587\u4ef6\u7684\u6700\u5927\u4e2a\u6570\u3002\u8003\u8651\u5230\u65e5\u5fd7\u4f20\u8f93\u4ee5\u53ca\u9605\u8bfb\u7684\u4fbf\u5229\u6027\uff0c\u6682\u4e0d\u5141\u8bb8\u81ea\u5b9a\u4e49\u5355\u4e2a\u65e5\u5fd7\u6587\u4ef6\u5927\u5c0f\uff0c\u4ecd\u4fdd\u6301\u9ed8\u8ba4\u768464 MB\u3002\u5404\u53c2\u6570\u7684\u914d\u7f6e\u8bf4\u660e\u5982\u4e0b\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u53c2\u6570"),(0,l.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"),(0,l.kt)("th",{parentName:"tr",align:null},"\u914d\u7f6e\u53c2\u6570"),(0,l.kt)("th",{parentName:"tr",align:null},"\u81ea\u5b9a\u4e49\u53d6\u503c"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"\u65e5\u5fd7\u4fdd\u5b58\u8def\u5f84"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bf7\u786e\u4fdd\u5e94\u7528\u8fdb\u7a0b\u6709\u5bf9\u8be5\u8def\u5f84\u5199\u7684\u6743\u9650\uff0c\u5426\u5219\u65e5\u5fd7 \u4e0d\u4f1a\u6253\u5370\u3002"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.logRoot"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53ef\u81ea\u5b9a\u4e49\u4e3a\u60a8\u9700\u8981\u5c06\u65e5\u5fd7\u6587\u4ef6\u4fdd\u5b58\u5230\u672c\u5730\u7684\u8def\u5f84\u3002\u8bf7\u786e\u4fdd\u60a8\u7684\u5e94\u7528\u8fdb\u7a0b\u6709\u8be5\u8def\u5f84\u7684\u5199\u6743\u9650\uff0c\u5426\u5219\u65e5\u5fd7\u65e0\u6cd5\u6253\u5370\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"\u4fdd\u5b58\u5386\u53f2\u65e5\u5fd7\u6587\u4ef6\u7684\u6700\u5927\u4e2a\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u63011\u5230100\u4e4b\u524d\u7684\u6570\u503c;\u82e5\u8f93\u5165\u7684\u503c\u8d85\u51fa\u8be5\u8303\u56f4 \u6216\u683c\u5f0f\u9519\u8bef\uff0c\u5219\u7cfb\u7edf\u9ed8\u8ba4\u4fdd\u5b5810\u4e2a\u3002"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.logFileMaxIndex"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53d6\u503c\u5982\u4e0b\uff1a",(0,l.kt)("strong",{parentName:"td"},"ERROR**"),"WARN*",(0,l.kt)("strong",{parentName:"td"},"*INFO**"),"DEBUG**")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"\u65e5\u5fd7\u7ea7\u522b"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u6301ERROR\u3001WARN\u3001INFO\u3001DEBUG\u4e2d\u4efb\u4f55\u4e00 \u79cd\uff0c\u4e0d\u5339\u914d\u9ed8\u8ba4INFO\u3002"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.logLevel"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53d6\u503c\u8303\u56f4\uff1a1~100\u3002\u82e5\u8bbe\u7f6e\u7684\u503c\u8d85\u51fa\u8be5\u8303\u56f4\u6216\u683c\u5f0f\u9519\u8bef\uff0c\u5219\u4ee5\u7cfb\u7edf\u9ed8\u8ba4\u503c\uff0810\u4e2a\uff09\u4e3a\u51c6\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"\u5355\u4e2a\u6587\u4ef6\u65e5\u5fd7\u5927\u5c0f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u6301\u4ee5bytes\u4e3a\u5355\u4f4d\u6307\u5b9a"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.logFileMaxSize"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53d6\u503c\u57280~1GB, \u9ed8\u8ba41GB, \u5efa\u8bae64 MB")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"logback\u662f\u5426\u4f7f\u7528\u7236\u7ea7logger\u6253\u5370"),(0,l.kt)("td",{parentName:"tr",align:null},"children-logger\u662f\u5426\u4f7f\u7528 rootLogger\u914d\u7f6e\u7684appender\u8fdb\u884c\u8f93\u51fa"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.log.additive"),(0,l.kt)("td",{parentName:"tr",align:null},"true/false")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"\u4f7f\u7528\u9879\u76ee\u7684slf4j\u5b9e\u73b0\u8bb0\u5f55\u65e5\u5fd7"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u9700\u8981\u5b9e\u73b0\u8bb0\u5f55\u65e5\u5fd7 \u5219\u4e3atrue"),(0,l.kt)("td",{parentName:"tr",align:null},"rocketmq.client.logUseSlf4j"),(0,l.kt)("td",{parentName:"tr",align:null},"true/flase")))),(0,l.kt)("h2",{id:"\u9ed8\u8ba4\u914d\u7f6e"},"\u9ed8\u8ba4\u914d\u7f6e"),(0,l.kt)("p",null,"\u8bf7\u786e\u4fdd\u5e94\u7528\u8fdb\u7a0b\u6709\u5bf9\u8be5\u8def\u5f84\u5199\u7684\u6743\u9650\uff0c\u5426\u5219\u65e5\u5fd7 \u4e0d\u4f1a\u6253\u5370\u3002 \u652f\u6301 1 \u5230 100 \u4e4b\u524d\u7684\u6570\u503c;\u82e5\u8f93\u5165\u7684\u503c\u8d85\u51fa\u8be5\u8303\u56f4 \u6216\u683c\u5f0f\u9519\u8bef\uff0c\u5219\u7cfb\u7edf\u9ed8\u8ba4\u4fdd\u5b5810\u4e2a\u3002 \u652f\u6301 ERROR\u3001WARN\u3001INFO\u3001DEBUG \u4e2d\u4efb\u4f55\u4e00 \u79cd\uff0c\u4e0d\u5339\u914d\u9ed8\u8ba4 INFO\u3002 "),(0,l.kt)("p",null,"RocketMQ \u5ba2\u6237\u7aef\u542f\u52a8\u540e\uff0c\u4f1a\u6309\u7167\u5982\u4e0b\u7684\u9ed8\u8ba4\u914d\u7f6e\u751f\u6210\u65e5\u5fd7\u6587\u4ef6 :\t\t\t\t\t\t"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u65e5\u5fd7\u4fdd\u5b58\u8def\u5f84:/{user.home}/logs/rocketmqlogs/ \u5176\u4e2d{user.home}\u662f\u6307\u542f\u52a8\u5f53\u524dJava\u8fdb\u7a0b\u7684\u7528 \u6237\u7684\u6839\u76ee\u5f55\t\t\t\t"),(0,l.kt)("li",{parentName:"ul"},"\u4fdd\u5b58\u5386\u53f2\u65e5\u5fd7\u6587\u4ef6\u7684\u6700\u5927\u4e2a\u6570:10\u4e2a  \t\t\t\t\t\t"),(0,l.kt)("li",{parentName:"ul"},"\u65e5\u5fd7\u7ea7\u522b:INFO  \t\t\t\t\t\t"),(0,l.kt)("li",{parentName:"ul"},"\u5355\u4e2a\u65e5\u5fd7\u6587\u4ef6\u5927\u5c0f:  1GB\t\t\t\t\t\t")),(0,l.kt)("h2",{id:"\u81ea\u5b9a\u4e49\u914d\u7f6e"},"\u81ea\u5b9a\u4e49\u914d\u7f6e"),(0,l.kt)("p",null,"\u5982\u679c\u9700\u8981\u8fdb\u884c\u81ea\u5b9a\u4e49\u914d\u7f6e \u53c2\u8003 ClientLogger\u7684\u9759\u6001\u53d8\u91cf\u5b9a\u4e49, \u53c2\u6570\u610f\u4e49\u5bf9\u9f50\u4e0a\u6587\u5ba2\u6237\u7aef\u914d\u7f6e\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'    public static final String CLIENT_LOG_USESLF4J = "rocketmq.client.logUseSlf4j";\n    public static final String CLIENT_LOG_ROOT = "rocketmq.client.logRoot";\n    public static final String CLIENT_LOG_MAXINDEX = "rocketmq.client.logFileMaxIndex";\n    public static final String CLIENT_LOG_FILESIZE = "rocketmq.client.logFileMaxSize";\n    public static final String CLIENT_LOG_LEVEL = "rocketmq.client.logLevel";\n    public static final String CLIENT_LOG_ADDITIVE = "rocketmq.client.log.additive";\n    public static final String CLIENT_LOG_FILENAME = "rocketmq.client.logFileName";\n    public static final String CLIENT_LOG_ASYNC_QUEUESIZE = "rocketmq.client.logAsyncQueueSize";\n    public static final String ROCKETMQ_CLIENT_APPENDER_NAME = "RocketmqClientAppender";\n\n    private static final InternalLogger CLIENT_LOGGER;\n\n    private static final boolean CLIENT_USE_SLF4J;\n\n    //private static Appender rocketmqClientAppender = null;\n\n    static {\n        CLIENT_USE_SLF4J = Boolean.parseBoolean(System.getProperty(CLIENT_LOG_USESLF4J, "false"));\n        if (!CLIENT_USE_SLF4J) {\n            InternalLoggerFactory.setCurrentLoggerType(InnerLoggerFactory.LOGGER_INNER);\n            CLIENT_LOGGER = createLogger(LoggerName.CLIENT_LOGGER_NAME);\n            createLogger(LoggerName.COMMON_LOGGER_NAME);\n            createLogger(RemotingHelper.ROCKETMQ_REMOTING);\n        } else {\n            CLIENT_LOGGER = InternalLoggerFactory.getLogger(LoggerName.CLIENT_LOGGER_NAME);\n        }\n    }\n')),(0,l.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e2a\u7b80\u5355\u793a\u4f8b"),(0,l.kt)("p",null,"\u5728\u542f\u52a8\u811a\u672c\u4e2d\u6216\u8005IDE\u7684VM options\u4e2d\u6dfb\u52a0\u5982\u4e0b\u7cfb\u7edf\u53c2\u6570: "),(0,l.kt)(o.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"Linux\u793a\u4f8b",label:"Linux\u793a\u4f8b",default:!0,mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"-Drocketmq.client.logRoot=/home/admin/logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20  -Drocketmq.client.logFileMaxSize=67108864\n"))),(0,l.kt)(i.Z,{value:"windows\u793a\u4f8b",label:"windows\u793a\u4f8b",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"-Drocketmq.client.logRoot=D:\\logs -Drocketmq.client.logLevel=WARN -Drocketmq.client.logFileMaxIndex=20 -Drocketmq.client.logFileMaxSize=67108864\n")))))}g.isMDXComponent=!0},86010:function(e,t,n){function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function a(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}n.d(t,{Z:function(){return a}})}}]);
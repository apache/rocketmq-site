"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[2038],{15680:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>m});var a=n(96540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},g=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),p=c(n),d=r,m=p["".concat(l,".").concat(d)]||p[d]||u[d]||s;return n?a.createElement(m,i(i({ref:t},g),{},{components:n})):a.createElement(m,i({ref:t},g))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<s;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},99492:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var a=n(58168),r=(n(96540),n(15680));const s={},i="Core Concept",o={unversionedId:"producer/01concept1",id:"producer/01concept1",title:"Core Concept",description:"Introduction to the basic concepts of the Producer section, including Message, Tag, Keys, Message Queue and Producer.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/02-producer/01concept1.md",sourceDirName:"02-producer",slug:"/producer/01concept1",permalink:"/docs/4.x/producer/01concept1",draft:!1,editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/docs/02-producer/01concept1.md",tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"Run RocketMQ with Docker Compose",permalink:"/docs/4.x/quickstart/03quickstartWithDockercompose"},next:{title:"Simple Message Sending",permalink:"/docs/4.x/producer/02message1"}},l={},c=[{value:"Message",id:"message",level:2},{value:"When to use Topic/Tag?",id:"when-to-use-topictag",level:3},{value:"Keys",id:"keys",level:2},{value:"Message Queue",id:"message-queue",level:2},{value:"Producer",id:"producer",level:2}],g={toc:c},p="wrapper";function u(e){let{components:t,...s}=e;return(0,r.yg)(p,(0,a.A)({},g,s,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"core-concept"},"Core Concept"),(0,r.yg)("p",null,"Introduction to the basic concepts of the Producer section, including ",(0,r.yg)("strong",{parentName:"p"},"Message, Tag, Keys, Message Queue and Producer"),"."),(0,r.yg)("h2",{id:"message"},"Message"),(0,r.yg)("p",null,"The composition of RocketMQ messages is simple, as shown in the following figure."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"topic"),": the topic of the message to be sent."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"body"),": the storage content of the message."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"properties"),": the message properties."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"transactionId"),": the id of the transaction message.")),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("ul",{parentName:"admonition"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Tag: Whether it is RocketMQ Tag filtering or delayed message feature, etc., the capabilities of Properties will be used.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Keys: The server will create a hash index based on Keys. You are able to query messages based on Topic and Keys in the Console after setting. Please ensure that the keys (e.g. order number, product ID, etc) are unique since it is a hash index.\n:::"))),(0,r.yg)("center",null,(0,r.yg)("img",{src:"../picture/Message.png",width:"500"})),(0,r.yg)("p",{parentName:"admonition"},"The properties that could be set in the Message include:"),(0,r.yg)("table",{parentName:"admonition"},(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"Field"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Required"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"Topic"),(0,r.yg)("td",{parentName:"tr",align:null},"null"),(0,r.yg)("td",{parentName:"tr",align:null},"Required"),(0,r.yg)("td",{parentName:"tr",align:null},"Topic name to which the message belongs.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"Body"),(0,r.yg)("td",{parentName:"tr",align:null},"null"),(0,r.yg)("td",{parentName:"tr",align:null},"Required"),(0,r.yg)("td",{parentName:"tr",align:null},"Message body.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"Tags"),(0,r.yg)("td",{parentName:"tr",align:null},"null"),(0,r.yg)("td",{parentName:"tr",align:null},"Optional"),(0,r.yg)("td",{parentName:"tr",align:null},"Message tag, which is for filtering in server. Currently only one per message is supported.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"Keys"),(0,r.yg)("td",{parentName:"tr",align:null},"null"),(0,r.yg)("td",{parentName:"tr",align:null},"Optional"),(0,r.yg)("td",{parentName:"tr",align:null},"Keywords representing the message.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"Flag"),(0,r.yg)("td",{parentName:"tr",align:null},"0"),(0,r.yg)("td",{parentName:"tr",align:null},"Optional"),(0,r.yg)("td",{parentName:"tr",align:null},"Completely set by the client, RocketMQ does not intervene.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"DelayTimeLevel"),(0,r.yg)("td",{parentName:"tr",align:null},"0"),(0,r.yg)("td",{parentName:"tr",align:null},"Optional"),(0,r.yg)("td",{parentName:"tr",align:null},"Message delay level, 0 means no delay, greater than 0 will delay a specific time before it will be consumed.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"WaitStoreMsgOK"),(0,r.yg)("td",{parentName:"tr",align:null},"true"),(0,r.yg)("td",{parentName:"tr",align:null},"Optional"),(0,r.yg)("td",{parentName:"tr",align:null},"Indicates whether the response is returned after the server is flushed.")))),(0,r.yg)("h2",{parentName:"admonition",id:"tag"},"Tag"),(0,r.yg)("p",{parentName:"admonition"},"Topic and Tag are both business identifiers for classification. The difference is that Topic is a first-level classification, and Tag can be regarded as a second-level classification. Tag can be used to achieve message filtering in Topic.")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Topic\uff1aMessage topic, which categorizes different business messages through Topic."),(0,r.yg)("li",{parentName:"ul"},"Tag\uff1aMessage tag, which is used to further distinguish the message under a topic. This is the property that the message carries when it is sent from the producer.\n:::")),(0,r.yg)("p",null,"The relationship between Topic and Tag is shown in the following figure."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"Tag",src:n(35338).A,width:"1574",height:"472"})),(0,r.yg)("h3",{id:"when-to-use-topictag"},"When to use Topic/Tag?"),(0,r.yg)("p",null,"It can be determined from the following aspects:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Whether the message types are consistent: Such as simple messages, transaction messages, timed (delayed) messages, and ordered messages. Different message types use different Topics, which cannot be distinguished by Tags.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Whether the business is related: The messages that are not directly related, such as Taobao messages and  JD Logistics messages, are distinguished by different Topics. In contrast, the messages belonging to Tmall transaction, including electrical order, women's clothing order, cosmetics order messages could be distinguished by Tags.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Whether the message priority is identical\uff1aFor example, as logistics message, Hema must be delivered within an hour, Tmall supermarket must be delivered within 24 hours, and Taobao logistics is relatively slower. Messages with different priorities could be distinguished by different topics.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},'Whether the message volume is equivalent: Some business messages are small in volume but require high real-time performance. If they stay under the same Topic with trillion-level messages, it may be "starve" due to the long waiting time. Therefore, it is necessary to split messages of different volumes into different Topics.'))),(0,r.yg)("p",null,"In general, you can choose to create multiple Topics, or create multiple Tags under a single Topic for message classification. There is no necessary connection between messages under different Topics, and Tags are used to distinguish interrelated messages under the same topic, such as the complete sets and subsets, or the sequence of processes."),(0,r.yg)("h2",{id:"keys"},"Keys"),(0,r.yg)("p",null,"Each message of Apache RocketMQ can place a unique identification \u2014\u2014 Keys field at the business level, which is convenient for locating the problem of message loss in the future. The broker side will create an index (hash index) for each message so that the client can query the content of the message through Topic and Key, as well as who consumes the message. Since it is a hash index, please make sure that the key is as unique as possible to avoid potential hash collisions."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},'   // Order Id\n   String orderId = "20034568923546";\n   message.setKeys(orderId);\n')),(0,r.yg)("h2",{id:"message-queue"},"Message Queue"),(0,r.yg)("p",null,"To support high concurrency and horizontal expansion, Topic needs to be partitioned, which is called Message Queue in RocketMQ. A Topic may have multiple queues and may be distributed on different Brokers."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"MessageQueue",src:n(23850).A,width:"1390",height:"1152"})),(0,r.yg)("p",null,"In general, a message will only exist in one of the queues under a Topic if it is not sent repeatedly (e.g., a client resents messages since the server does not respond). The message will be stored in a queue according to the principle of FIFO (First In, First Out). Each message will have its own position, and each queue will calculate the total number of the messages, which is called MaxOffset; the position corresponding to the starting point of the queue is called MinOffset. Message Queue can improve the concurrency of message production and consumption."),(0,r.yg)("h2",{id:"producer"},"Producer"),(0,r.yg)("p",null,"The Producer is the sender of the message. Apache RocketMQ owns rich message types and is able to support various scenarios."),(0,r.yg)("p",null,"For instance, an order will be closed due to the payment timeout in an e-commerce transaction, so a delayed message should be sent when the order is created. This message will be delivered to the Consumer after 30 minutes. After receiving the message, the Consumer needs to determine whether the corresponding order has been paid. If the payment is not completed, the order will be closed. If the payment has been completed, then ignore it."),(0,r.yg)("p",null,"In the e-commerce scenario, the business requires the messages of the same order to be kept in strict sequence, the ordered messages could therefore be applied."),(0,r.yg)("p",null,"In the log processing scenario, a relatively large sending delay is acceptable, but it has a high throughput requirement. It is expected that millions of logs need to be processed within a second. In this case, the batch messages could be sent."),(0,r.yg)("p",null,"In the bank deduction scenarios, in order to keep the upstream deduction operation consistent with the downstream SMS notification, transaction messages could be utilized."),(0,r.yg)("p",null,"The next section will introduce the sending of various types of messages."))}u.isMDXComponent=!0},23850:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/MessageQueue-fb79728bdee77764e50382620552495d.png"},35338:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/Tag-d3d114dcf3f174d165a3749d34c27f7a.png"}}]);
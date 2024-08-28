"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[1496],{15680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>g});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),i=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=i(n),d=a,g=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(g,s(s({ref:t},u),{},{components:n})):r.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[m]="string"==typeof e?e:a,s[1]=c;for(var i=2;i<o;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},19365:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(96540),a=n(20053);const o={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:n,className:s}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(o.tabItem,s),hidden:n},t)}},11470:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(58168),a=n(96540),o=n(20053),s=n(23104),c=n(56347),l=n(57485),i=n(31682),u=n(89466);function m(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,i.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const r=(0,c.W6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=p(e),[s,c]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[l,i]=g({queryString:n,groupId:r}),[m,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,u.Dv)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),y=(()=>{const e=l??m;return d({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{y&&c(y)}),[y]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);c(e),i(e),h(e)}),[i,h,o]),tabValues:o}}var y=n(92303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:c,selectValue:l,tabValues:i}=e;const u=[],{blockElementScrollPositionUntilNextRender:m}=(0,s.a_)(),p=e=>{const t=e.currentTarget,n=u.indexOf(t),r=i[n].value;r!==c&&(m(t),l(r))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},t)},i.map((e=>{let{value:t,label:n,attributes:s}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:c===t?0:-1,"aria-selected":c===t,key:t,ref:e=>u.push(e),onKeyDown:d,onClick:p},s,{className:(0,o.A)("tabs__item",f.tabItem,s?.className,{"tabs__item--active":c===t})}),n??t)})))}function b(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function v(e){const t=h(e);return a.createElement("div",{className:(0,o.A)("tabs-container",f.tabList)},a.createElement(k,(0,r.A)({},e,t)),a.createElement(b,(0,r.A)({},e,t)))}function w(e){const t=(0,y.A)();return a.createElement(v,(0,r.A)({key:String(t)},e))}},91130:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>g,frontMatter:()=>c,metadata:()=>i,toc:()=>m});var r=n(58168),a=(n(96540),n(15680)),o=n(11470),s=n(19365);const c={},l="Run RocketMQ with Docker Compose",i={unversionedId:"quickstart/03quickstartWithDockercompose",id:"quickstart/03quickstartWithDockercompose",title:"Run RocketMQ with Docker Compose",description:"This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker-compose and complete simple message sending and receiving.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/01-quickstart/03quickstartWithDockercompose.md",sourceDirName:"01-quickstart",slug:"/quickstart/03quickstartWithDockercompose",permalink:"/docs/4.x/quickstart/03quickstartWithDockercompose",draft:!1,editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/docs/01-quickstart/03quickstartWithDockercompose.md",tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"Run RocketMQ in Docker",permalink:"/docs/4.x/quickstart/02quickstartWithDocker"},next:{title:"04quickstartWithHelmInKubernetes-4.x",permalink:"/docs/4.x/quickstart/04quickstartWithHelmInKubernetes-4.x"}},u={},m=[{value:"1.Configure broker.conf",id:"1configure-brokerconf",level:2},{value:"2.Configure docker-compose",id:"2configure-docker-compose",level:2},{value:"3.Start RocketMQ",id:"3start-rocketmq",level:2},{value:"4.Send and Receive Messages with Tools",id:"4send-and-receive-messages-with-tools",level:2},{value:"5.Send and Receive Messages with SDK",id:"5send-and-receive-messages-with-sdk",level:2},{value:"6.Stop All Services",id:"6stop-all-services",level:2}],p={toc:m},d="wrapper";function g(e){let{components:t,...n}=e;return(0,a.yg)(d,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"run-rocketmq-with-docker-compose"},"Run RocketMQ with Docker Compose"),(0,a.yg)("p",null,"This section introduces how to quickly deploy a single-node, single-replica RocketMQ service using Docker-compose and complete simple message sending and receiving."),(0,a.yg)("admonition",{title:"SYSTEM REQUIREMENTS",type:"tip"},(0,a.yg)("ol",{parentName:"admonition"},(0,a.yg)("li",{parentName:"ol"},"64-bit operating system"),(0,a.yg)("li",{parentName:"ol"},"64-bit JDK 1.8+"))),(0,a.yg)("h2",{id:"1configure-brokerconf"},"1.Configure broker.conf"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},'# Configure the broker\'s IP address\necho "brokerIP1=127.0.0.1" > broker.conf\n')),(0,a.yg)("h2",{id:"2configure-docker-compose"},"2.Configure docker-compose"),(0,a.yg)("p",null,"To quickly start and run the RockerMQ cluster, you can use the following template to create a docker-compose.yml file by modifying or adding configurations in the environment section."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"version: '3.8'\n\nservices:\n  namesrv:\n    image: apache/rocketmq:4.9.6\n    container_name: rmqnamesrv\n    ports:\n      - 9876:9876\n    networks:\n      - rocketmq\n    command: sh mqnamesrv\n\n  broker:\n    image: apache/rocketmq:4.9.6\n    container_name: rmqbroker\n    ports:\n      - 10909:10909\n      - 10911:10911\n      - 10912:10912\n    environment:\n      - NAMESRV_ADDR=rmqnamesrv:9876\n    volumes:\n      - ./broker.conf:/home/rocketmq/rocketmq-4.9.6/conf/broker.conf\n    depends_on:\n      - namesrv\n    networks:\n      - rocketmq\n    command: sh mqbroker -c /home/rocketmq/rocketmq-4.9.6/conf/broker.conf\n\nnetworks:\n  rocketmq:\n    driver: bridge\n")),(0,a.yg)("h2",{id:"3start-rocketmq"},"3.Start RocketMQ"),(0,a.yg)("p",null,"Start all defined services according to the docker-compose.yml file."),(0,a.yg)(o.A,{mdxType:"Tabs"},(0,a.yg)(s.A,{value:"Linux",label:"Linux",default:!0,mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-code"},"docker-compose up -d\n"))),(0,a.yg)(s.A,{value:"Windows",label:"Windows",default:!0,mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-code"},"docker-compose -p rocketmq_project up -d\n")))),(0,a.yg)("h2",{id:"4send-and-receive-messages-with-tools"},"4.Send and Receive Messages with Tools"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},"# Enter the broker container\n$ docker exec -it rmqbroker bash\n\n$ sh tools.sh org.apache.rocketmq.example.quickstart.Producer\n SendResult [sendStatus=SEND_OK, msgId= ...\n\n$ sh tools.sh org.apache.rocketmq.example.quickstart.Consumer\n ConsumeMessageThread_%d Receive New Messages: [MessageExt...\n")),(0,a.yg)("h2",{id:"5send-and-receive-messages-with-sdk"},"5.Send and Receive Messages with SDK"),(0,a.yg)("p",null,"We can also try to use the client sdk to send and receive messages."),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a java project.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Add sdk dependency to pom.xml"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre"},"<dependency>\n    <groupId>org.apache.rocketmq</groupId>\n    <artifactId>rocketmq-client</artifactId>\n    <version>4.9.6</version>\n</dependency>\n"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"In the created Java project, create and run a program to send a simple message. Apache RocketMQ can send messages in three ways: ",(0,a.yg)("strong",{parentName:"p"},"synchronous, asynchronous, and one-way transmission"),". Here we use the synchronous mode as an example:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-java"},'import org.apache.rocketmq.client.producer.DefaultMQProducer;\nimport org.apache.rocketmq.client.producer.SendResult;\nimport org.apache.rocketmq.common.message.Message;\n\npublic class ProducerExample {\n    public static void main(String[] args) throws Exception {\n        // Create producer instance and set the producer group name\n        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");\n        // Set the Name Server address (replace with actual Name Server address)\n        producer.setNamesrvAddr("localhost:9876");\n        producer.start();\n\n        try {\n            // Create a message instance, specifying the topic, tag, and message body\n            Message msg = new Message("TestTopic", "TagA", ("Hello RocketMQ").getBytes());\n            // Send the message and get the send result\n            SendResult sendResult = producer.send(msg);\n            System.out.println("Message sent: " + new String(msg.getBody()));\n            System.out.println("Send result: " + sendResult);\n        } catch (Exception e) {\n            e.printStackTrace();\n            System.out.println("Message sending failed.");\n        } finally {\n            // Shutdown the producer\n            producer.shutdown();\n        }\n    }\n}\n'))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"In the created Java project, create and run a program to subscribe to simple messages. Apache RocketMQ has two consumption modes: ",(0,a.yg)("strong",{parentName:"p"},"Push and Pull"),". Here we use the Push mode as an example."),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-java"},'import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;\nimport org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;\nimport org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;\nimport org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;\nimport org.apache.rocketmq.common.message.MessageExt;\n\nimport java.util.List;\n\npublic class ConsumerExample {\n    public static void main(String[] args) throws Exception {\n        // Create consumer instance and set the consumer group name\n        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");\n        // Set the Name Server address (replace with actual Name Server address)\n        consumer.setNamesrvAddr("localhost:9876");\n        // Subscribe to the specified topic and tag (* means all tags)\n        consumer.subscribe("TestTopic", "*");\n\n        // Register message listener\n        consumer.registerMessageListener(new MessageListenerConcurrently() {\n            @Override\n            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {\n                for (MessageExt msg : msgs) {\n                    System.out.println("Received message: " + new String(msg.getBody()));\n                }\n                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;\n            }\n        });\n\n        // Start the consumer\n        consumer.start();\n        System.out.println("Consumer started.");\n    }\n}\n')))),(0,a.yg)("h2",{id:"6stop-all-services"},"6.Stop All Services"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-shell"},"docker-compose down\n")))}g.isMDXComponent=!0}}]);
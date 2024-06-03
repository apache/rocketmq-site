"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[2815],{15680:(e,r,t)=>{t.d(r,{xA:()=>s,yg:()=>d});var a=t(96540);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),c=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},s=function(e){var r=c(e.components);return a.createElement(i.Provider,{value:r},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},g=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=c(t),g=n,d=p["".concat(i,".").concat(g)]||p[g]||m[g]||o;return t?a.createElement(d,l(l({ref:r},s),{},{components:t})):a.createElement(d,l({ref:r},s))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,l=new Array(o);l[0]=g;var u={};for(var i in r)hasOwnProperty.call(r,i)&&(u[i]=r[i]);u.originalType=e,u[p]="string"==typeof e?e:n,l[1]=u;for(var c=2;c<o;c++)l[c]=t[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},19365:(e,r,t)=>{t.d(r,{A:()=>l});var a=t(96540),n=t(20053);const o={tabItem:"tabItem_Ymn6"};function l(e){let{children:r,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,n.A)(o.tabItem,l),hidden:t},r)}},11470:(e,r,t)=>{t.d(r,{A:()=>N});var a=t(58168),n=t(96540),o=t(20053),l=t(23104),u=t(56347),i=t(57485),c=t(31682),s=t(89466);function p(e){return function(e){return n.Children.map(e,(e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:r,label:t,attributes:a,default:n}}=e;return{value:r,label:t,attributes:a,default:n}}))}function m(e){const{values:r,children:t}=e;return(0,n.useMemo)((()=>{const e=r??p(t);return function(e){const r=(0,c.X)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,t])}function g(e){let{value:r,tabValues:t}=e;return t.some((e=>e.value===r))}function d(e){let{queryString:r=!1,groupId:t}=e;const a=(0,u.W6)(),o=function(e){let{queryString:r=!1,groupId:t}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:r,groupId:t});return[(0,i.aZ)(o),(0,n.useCallback)((e=>{if(!o)return;const r=new URLSearchParams(a.location.search);r.set(o,e),a.replace({...a.location,search:r.toString()})}),[o,a])]}function y(e){const{defaultValue:r,queryString:t=!1,groupId:a}=e,o=m(e),[l,u]=(0,n.useState)((()=>function(e){let{defaultValue:r,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!g({value:r,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:r,tabValues:o}))),[i,c]=d({queryString:t,groupId:a}),[p,y]=function(e){let{groupId:r}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(r),[a,o]=(0,s.Dv)(t);return[a,(0,n.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:a}),v=(()=>{const e=i??p;return g({value:e,tabValues:o})?e:null})();(0,n.useLayoutEffect)((()=>{v&&u(v)}),[v]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!g({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);u(e),c(e),y(e)}),[c,y,o]),tabValues:o}}var v=t(92303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function f(e){let{className:r,block:t,selectedValue:u,selectValue:i,tabValues:c}=e;const s=[],{blockElementScrollPositionUntilNextRender:p}=(0,l.a_)(),m=e=>{const r=e.currentTarget,t=s.indexOf(r),a=c[t].value;a!==u&&(p(r),i(a))},g=e=>{let r=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;r=s[t]??s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;r=s[t]??s[s.length-1];break}}r?.focus()};return n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":t},r)},c.map((e=>{let{value:r,label:t,attributes:l}=e;return n.createElement("li",(0,a.A)({role:"tab",tabIndex:u===r?0:-1,"aria-selected":u===r,key:r,ref:e=>s.push(e),onKeyDown:g,onClick:m},l,{className:(0,o.A)("tabs__item",b.tabItem,l?.className,{"tabs__item--active":u===r})}),t??r)})))}function h(e){let{lazy:r,children:t,selectedValue:a}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(r){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return n.createElement("div",{className:"margin-top--md"},o.map(((e,r)=>(0,n.cloneElement)(e,{key:r,hidden:e.props.value!==a}))))}function k(e){const r=y(e);return n.createElement("div",{className:(0,o.A)("tabs-container",b.tabList)},n.createElement(f,(0,a.A)({},e,r)),n.createElement(h,(0,a.A)({},e,r)))}function N(e){const r=(0,v.A)();return n.createElement(k,(0,a.A)({key:String(r)},e))}},81212:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>u,metadata:()=>c,toc:()=>p});var a=t(58168),n=(t(96540),t(15680)),o=t(11470),l=t(19365);const u={},i="\u521d\u8bc6RocketMQ",c={unversionedId:"introduction/02whatis",id:"introduction/02whatis",title:"\u521d\u8bc6RocketMQ",description:"\u6211\u4eec\u5e73\u65f6\u4f7f\u7528\u4e00\u4e9b\u4f53\u80b2\u65b0\u95fb\u8f6f\u4ef6\uff0c\u4f1a\u8ba2\u9605\u81ea\u5df1\u559c\u6b22\u7684\u4e00\u4e9b\u7403\u961f\u677f\u5757\uff0c\u5f53\u6709\u4f5c\u8005\u53d1\u8868\u6587\u7ae0\u5230\u76f8\u5173\u7684\u677f\u5757\uff0c\u6211\u4eec\u5c31\u80fd\u6536\u5230\u76f8\u5173\u7684\u65b0\u95fb\u63a8\u9001\u3002",source:"@site/docs/00-introduction/02whatis.md",sourceDirName:"00-introduction",slug:"/introduction/02whatis",permalink:"/zh/docs/4.x/introduction/02whatis",draft:!1,editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/docs/00-introduction/02whatis.md",tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"\u4e3a\u4ec0\u4e48\u9009\u62e9RocketMQ",permalink:"/zh/docs/4.x/"},next:{title:"\u672c\u5730\u90e8\u7f72 RocketMQ",permalink:"/zh/docs/4.x/quickstart/01quickstart"}},s={},p=[{value:"RocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\uff0c\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b",id:"rocketmq\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u4e00\u4e2a\u7b80\u5355\u7684pubsub\u6a21\u578b",level:2},{value:"RocketMQ \u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b",id:"rocketmq-\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b",level:2},{value:"RocketMQ\u7684\u90e8\u7f72\u6a21\u578b",id:"rocketmq\u7684\u90e8\u7f72\u6a21\u578b",level:2},{value:"\u751f\u4ea7\u8005 Producer",id:"\u751f\u4ea7\u8005-producer",level:3},{value:"<strong>\u6d88\u8d39\u8005 Consumer</strong>",id:"\u6d88\u8d39\u8005-consumer",level:3},{value:"\u540d\u5b57\u670d\u52a1\u5668 <strong>NameServer</strong>",id:"\u540d\u5b57\u670d\u52a1\u5668-nameserver",level:2},{value:"\u4ee3\u7406\u670d\u52a1\u5668 Broker",id:"\u4ee3\u7406\u670d\u52a1\u5668-broker",level:2},{value:"RocketMQ\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b",id:"rocketmq\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b",level:2},{value:"1. \u542f\u52a8NameServer",id:"1-\u542f\u52a8nameserver",level:3},{value:"2. \u542f\u52a8 Broker",id:"2-\u542f\u52a8-broker",level:3},{value:"3. \u521b\u5efa Topic",id:"3-\u521b\u5efa-topic",level:3},{value:"4. \u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f",id:"4-\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f",level:3},{value:"5. \u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f",id:"5-\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f",level:3}],m={toc:p},g="wrapper";function d(e){let{components:r,...u}=e;return(0,n.yg)(g,(0,a.A)({},m,u,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"\u521d\u8bc6rocketmq"},"\u521d\u8bc6RocketMQ"),(0,n.yg)("p",null,"\u6211\u4eec\u5e73\u65f6\u4f7f\u7528\u4e00\u4e9b\u4f53\u80b2\u65b0\u95fb\u8f6f\u4ef6\uff0c\u4f1a\u8ba2\u9605\u81ea\u5df1\u559c\u6b22\u7684\u4e00\u4e9b\u7403\u961f\u677f\u5757\uff0c\u5f53\u6709\u4f5c\u8005\u53d1\u8868\u6587\u7ae0\u5230\u76f8\u5173\u7684\u677f\u5757\uff0c\u6211\u4eec\u5c31\u80fd\u6536\u5230\u76f8\u5173\u7684\u65b0\u95fb\u63a8\u9001\u3002"),(0,n.yg)("p",null,"\u53d1\u5e03-\u8ba2\u9605\uff08Pub/Sub\uff09\u662f\u4e00\u79cd\u6d88\u606f\u8303\u5f0f\uff0c\u6d88\u606f\u7684\u53d1\u9001\u8005\uff08\u79f0\u4e3a\u53d1\u5e03\u8005\u3001\u751f\u4ea7\u8005\u3001Producer\uff09\u4f1a\u5c06\u6d88\u606f\u76f4\u63a5\u53d1\u9001\u7ed9\u7279\u5b9a\u7684\u63a5\u6536\u8005\uff08\u79f0\u4e3a\u8ba2\u9605\u8005\u3001\u6d88\u8d39\u8005\u3001Comsumer\uff09\u3002\u800cRocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u5c31\u662f\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b\u3002"),(0,n.yg)("admonition",{title:"\u76f8\u5173\u6982\u5ff5",type:"tip"},(0,n.yg)(o.A,{mdxType:"Tabs"},(0,n.yg)(l.A,{value:"\u751f\u4ea7\u8005",label:"\u751f\u4ea7\u8005",default:!0,mdxType:"TabItem"},"\u8d1f\u8d23\u751f\u4ea7\u6d88\u606f\uff0c\u4e00\u822c\u7531\u4e1a\u52a1\u7cfb\u7edf\u8d1f\u8d23\u751f\u4ea7\u6d88\u606f\u3002\u4e00\u4e2a\u6d88\u606f\u751f\u4ea7\u8005\u4f1a\u628a\u4e1a\u52a1\u5e94\u7528\u7cfb\u7edf\u91cc\u4ea7\u751f\u7684\u6d88\u606f\u53d1\u9001\u5230broker\u670d\u52a1\u5668\u3002RocketMQ\u63d0\u4f9b\u591a\u79cd\u53d1\u9001\u65b9\u5f0f\uff0c\u540c\u6b65\u53d1\u9001\u3001\u5f02\u6b65\u53d1\u9001\u3001\u987a\u5e8f\u53d1\u9001\u3001\u5355\u5411\u53d1\u9001\u3002",(0,n.yg)("p",{parentName:"admonition"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.yg)("a",{parentName:"p",href:"/zh/docs/4.x/producer/01concept1"},"\u751f\u4ea7\u8005")),"  "),(0,n.yg)(l.A,{value:"\u6d88\u8d39\u8005",label:"\u6d88\u8d39\u8005",mdxType:"TabItem"},"\u8d1f\u8d23\u6d88\u8d39\u6d88\u606f\uff0c\u4e00\u822c\u662f\u540e\u53f0\u7cfb\u7edf\u8d1f\u8d23\u5f02\u6b65\u6d88\u8d39\u3002\u4e00\u4e2a\u6d88\u606f\u6d88\u8d39\u8005\u4f1a\u4eceBroker\u670d\u52a1\u5668\u62c9\u53d6\u6d88\u606f\u3001\u5e76\u5c06\u5176\u63d0\u4f9b\u7ed9\u5e94\u7528\u7a0b\u5e8f\u3002\u4ece\u7528\u6237\u5e94\u7528\u7684\u89d2\u5ea6\u800c\u8a00\u63d0\u4f9b\u4e86\u4e24\u79cd\u6d88\u8d39\u5f62\u5f0f\uff1a\u62c9\u53d6\u5f0f\u6d88\u8d39\u3001\u63a8\u52a8\u5f0f\u6d88\u8d39\u3002",(0,n.yg)("p",{parentName:"admonition"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.yg)("a",{parentName:"p",href:"/zh/docs/4.x/consumer/01concept2"},"\u6d88\u8d39\u8005")),"  "),(0,n.yg)(l.A,{value:"\u6d88\u606f\u4e3b\u9898",label:"\u4e3b\u9898",mdxType:"TabItem"},"\u8868\u793a\u4e00\u7c7b\u6d88\u606f\u7684\u96c6\u5408\uff0c\u6bcf\u4e2a\u4e3b\u9898\u5305\u542b\u82e5\u5e72\u6761\u6d88\u606f\uff0c\u6bcf\u6761\u6d88\u606f\u53ea\u80fd\u5c5e\u4e8e\u4e00\u4e2a\u4e3b\u9898\uff0c\u662fRocketMQ\u8fdb\u884c\u6d88\u606f\u8ba2\u9605\u7684\u57fa\u672c\u5355\u4f4d\u3002",(0,n.yg)("p",{parentName:"admonition"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.yg)("a",{parentName:"p",href:"/zh/docs/4.x/producer/01concept1"},"\u57fa\u672c\u6982\u5ff5")),"  "))),(0,n.yg)("h2",{id:"rocketmq\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u4e00\u4e2a\u7b80\u5355\u7684pubsub\u6a21\u578b"},"RocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\uff0c\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b"),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"RocketMQ\u6982\u5ff5\u6a21\u578b",src:t(65053).A,width:"1487",height:"277"})),(0,n.yg)("admonition",{title:"\u57fa\u672c\u6d88\u606f\u7cfb\u7edf\u6a21\u578b",type:"note"},(0,n.yg)("p",{parentName:"admonition"},"\u4e0a\u56fe\u5c31\u662f\u4e00\u4e2a\u57fa\u672c\u7684\u6d88\u606f\u7cfb\u7edf\u6a21\u578b\uff0c\u5305\u62ec",(0,n.yg)("strong",{parentName:"p"},"\u751f\u4ea7\u8005 (Producer)"),"\uff0c",(0,n.yg)("strong",{parentName:"p"},"\u6d88\u8d39\u8005 (Consumer)"),"\uff0c\u4e2d\u95f4\u8fdb\u884c\u57fa\u4e8e",(0,n.yg)("strong",{parentName:"p"},"\u6d88\u606f\u4e3b\u9898\uff08Topic\uff09"),"\u7684\u6d88\u606f\u4f20\u9001\u3002")),(0,n.yg)("p",null,"\u5728",(0,n.yg)("strong",{parentName:"p"},"\u57fa\u4e8e\u4e3b\u9898"),"\u7684\u7cfb\u7edf\u4e2d\uff0c\u6d88\u606f\u88ab\u53d1\u5e03\u5230\u4e3b\u9898\u6216\u547d\u540d\u901a\u9053\u4e0a\u3002\u6d88\u8d39\u8005\u5c06\u6536\u5230\u5176\u8ba2\u9605\u4e3b\u9898\u4e0a\u7684\u6240\u6709\u6d88\u606f\uff0c\u751f\u4ea7\u8005\u8d1f\u8d23\u5b9a\u4e49\u8ba2\u9605\u8005\u6240\u8ba2\u9605\u7684\u6d88\u606f\u7c7b\u522b\u3002\u8fd9\u662f\u4e00\u4e2a\u57fa\u7840\u7684\u6982\u5ff5\u6a21\u578b\uff0c\u800c\u5728\u5b9e\u9645\u7684\u5e94\u7528\u4e2d\uff0c\u7ed3\u6784\u4f1a\u66f4\u590d\u6742\u3002\u4f8b\u5982\u4e3a\u4e86\u652f\u6301\u9ad8\u5e76\u53d1\u548c\u6c34\u5e73\u6269\u5c55\uff0c\u4e2d\u95f4\u7684\u6d88\u606f\u4e3b\u9898\u9700\u8981\u8fdb\u884c\u5206\u533a\uff0c\u540c\u4e00\u4e2aTopic\u4f1a\u6709\u591a\u4e2a\u751f\u4ea7\u8005\uff0c\u540c\u4e00\u4e2a\u4fe1\u606f\u4f1a\u6709\u591a\u4e2a\u6d88\u8d39\u8005\uff0c\u6d88\u8d39\u8005\u4e4b\u95f4\u8981\u8fdb\u884c\u8d1f\u8f7d\u5747\u8861\u7b49\u3002"),(0,n.yg)("h2",{id:"rocketmq-\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b"},"RocketMQ \u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b"),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"RocketMQ\u57fa\u672c\u6a21\u578b",src:t(84288).A,width:"1387",height:"695"})),(0,n.yg)("admonition",{title:"\u6269\u5c55\u7684\u6d88\u606f\u7cfb\u7edf\u6a21\u578b",type:"note"},(0,n.yg)("p",{parentName:"admonition"},"\u4e0a\u56fe\u5c31\u662f\u4e00\u4e2a\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b\uff0c\u5305\u62ec",(0,n.yg)("strong",{parentName:"p"},"\u4e24\u4e2a\u751f\u4ea7\u8005"),"\uff0c",(0,n.yg)("strong",{parentName:"p"},"\u4e24\u4e2a\u6d88\u606fTopic"),"\uff0c\u4ee5\u53ca",(0,n.yg)("strong",{parentName:"p"},"\u4e24\u7ec4\u6d88\u8d39\u8005 Comsumer"),"\u3002"),(0,n.yg)("p",{parentName:"admonition"},"\u5b58\u50a8\u6d88\u606fTopic\u7684 ",(0,n.yg)("strong",{parentName:"p"},"\u4ee3\u7406\u670d\u52a1\u5668"),"( ",(0,n.yg)("strong",{parentName:"p"},"Broker")," )\uff0c\u662f\u5b9e\u9645\u90e8\u7f72\u8fc7\u7a0b\u5bf9\u5e94\u7684\u4ee3\u7406\u670d\u52a1\u5668\u3002")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"\u4e3a\u4e86\u6d88\u606f\u5199\u5165\u80fd\u529b\u7684",(0,n.yg)("strong",{parentName:"p"},"\u6c34\u5e73\u6269\u5c55"),"\uff0cRocketMQ \u5bf9 Topic\u8fdb\u884c\u4e86\u5206\u533a\uff0c\u8fd9\u79cd\u64cd\u4f5c\u88ab\u79f0\u4e3a",(0,n.yg)("strong",{parentName:"p"},"\u961f\u5217"),"\uff08MessageQueue\uff09\u3002")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"\u4e3a\u4e86\u6d88\u8d39\u80fd\u529b\u7684",(0,n.yg)("strong",{parentName:"p"},"\u6c34\u5e73\u6269\u5c55"),"\uff0cConsumerGroup\u7684\u6982\u5ff5\u5e94\u8fd0\u800c\u751f\u3002"))),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("ul",{parentName:"admonition"},(0,n.yg)("li",{parentName:"ul"},"\u76f8\u540c\u7684ConsumerGroup\u4e0b\u7684\u6d88\u8d39\u8005\u4e3b\u8981\u6709\u4e24\u79cd\u8d1f\u8f7d\u5747\u8861\u6a21\u5f0f\uff0c\u5373",(0,n.yg)("strong",{parentName:"li"},"\u5e7f\u64ad\u6a21\u5f0f"),"\uff0c\u548c",(0,n.yg)("strong",{parentName:"li"},"\u96c6\u7fa4\u6a21\u5f0f"),"\uff08\u56fe\u4e2d\u662f\u6700\u5e38\u7528\u7684\u96c6\u7fa4\u6a21\u5f0f\uff09\u3002"),(0,n.yg)("li",{parentName:"ul"},"\u5728\u96c6\u7fa4\u6a21\u5f0f\u4e0b\uff0c\u540c\u4e00\u4e2a ConsumerGroup \u4e2d\u7684 Consumer \u5b9e\u4f8b\u662f\u8d1f\u8f7d\u5747\u8861\u6d88\u8d39\uff0c\u5982\u56fe\u4e2d ConsumerGroupA \u8ba2\u9605 TopicA\uff0cTopicA \u5bf9\u5e94 3\u4e2a\u961f\u5217\uff0c\u5219 GroupA \u4e2d\u7684 Consumer1 \u6d88\u8d39\u7684\u662f MessageQueue 0\u548c MessageQueue 1\u7684\u6d88\u606f\uff0cConsumer2\u662f\u6d88\u8d39\u7684\u662fMessageQueue2\u7684\u6d88\u606f\u3002"),(0,n.yg)("li",{parentName:"ul"},"\u5728\u5e7f\u64ad\u6a21\u5f0f\u4e0b\uff0c\u540c\u4e00\u4e2a ConsumerGroup \u4e2d\u7684\u6bcf\u4e2a Consumer \u5b9e\u4f8b\u90fd\u5904\u7406\u5168\u90e8\u7684\u961f\u5217\u3002\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5e7f\u64ad\u6a21\u5f0f\u4e0b\u56e0\u4e3a\u6bcf\u4e2a Consumer \u5b9e\u4f8b\u90fd\u9700\u8981\u5904\u7406\u5168\u90e8\u7684\u6d88\u606f\uff0c\u56e0\u6b64\u8fd9\u79cd\u6a21\u5f0f\u4ec5\u63a8\u8350\u5728\u901a\u77e5\u63a8\u9001\u3001\u914d\u7f6e\u540c\u6b65\u7c7b\u5c0f\u6d41\u91cf\u573a\u666f\u4f7f\u7528\u3002"))),(0,n.yg)("h2",{id:"rocketmq\u7684\u90e8\u7f72\u6a21\u578b"},"RocketMQ\u7684\u90e8\u7f72\u6a21\u578b"),(0,n.yg)("p",null,"Producer\u3001Consumer\u53c8\u662f\u5982\u4f55\u627e\u5230Topic\u548cBroker\u7684\u5730\u5740\u5462\uff1f\u6d88\u606f\u7684\u5177\u4f53\u53d1\u9001\u548c\u63a5\u6536\u53c8\u662f\u600e\u4e48\u8fdb\u884c\u7684\u5462\uff1f"),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"RocketMQ\u90e8\u7f72\u67b6\u6784",src:t(93598).A,width:"1342",height:"541"})),(0,n.yg)("p",null,"Apache RocketMQ \u90e8\u7f72\u67b6\u6784\u4e0a\u4e3b\u8981\u5206\u4e3a\u56db\u90e8\u5206:"),(0,n.yg)("h3",{id:"\u751f\u4ea7\u8005-producer"},"\u751f\u4ea7\u8005 Producer"),(0,n.yg)("p",null,"\u53d1\u5e03\u6d88\u606f\u7684\u89d2\u8272\u3002Producer\u901a\u8fc7 MQ \u7684\u8d1f\u8f7d\u5747\u8861\u6a21\u5757\u9009\u62e9\u76f8\u5e94\u7684 Broker \u96c6\u7fa4\u961f\u5217\u8fdb\u884c\u6d88\u606f\u6295\u9012\uff0c\u6295\u9012\u7684\u8fc7\u7a0b\u652f\u6301\u5feb\u901f\u5931\u8d25\u548c\u91cd\u8bd5\u3002"),(0,n.yg)("h3",{id:"\u6d88\u8d39\u8005-consumer"},(0,n.yg)("strong",{parentName:"h3"},"\u6d88\u8d39\u8005 Consumer")),(0,n.yg)("p",null,"\u6d88\u606f\u6d88\u8d39\u7684\u89d2\u8272\u3002"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"\u652f\u6301\u4ee5\u63a8\uff08push\uff09\uff0c\u62c9\uff08pull\uff09\u4e24\u79cd\u6a21\u5f0f\u5bf9\u6d88\u606f\u8fdb\u884c\u6d88\u8d39\u3002"),(0,n.yg)("li",{parentName:"ul"},"\u540c\u65f6\u4e5f\u652f\u6301",(0,n.yg)("strong",{parentName:"li"},"\u96c6\u7fa4\u65b9\u5f0f"),"\u548c\u5e7f\u64ad\u65b9\u5f0f\u7684\u6d88\u8d39\u3002"),(0,n.yg)("li",{parentName:"ul"},"\u63d0\u4f9b\u5b9e\u65f6\u6d88\u606f\u8ba2\u9605\u673a\u5236\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7528\u6237\u7684\u9700\u6c42\u3002")),(0,n.yg)("h2",{id:"\u540d\u5b57\u670d\u52a1\u5668-nameserver"},"\u540d\u5b57\u670d\u52a1\u5668 ",(0,n.yg)("strong",{parentName:"h2"},"NameServer")),(0,n.yg)("p",null,"NameServer\u662f\u4e00\u4e2a\u7b80\u5355\u7684 Topic \u8def\u7531\u6ce8\u518c\u4e2d\u5fc3\uff0c\u652f\u6301 Topic\u3001Broker \u7684\u52a8\u6001\u6ce8\u518c\u4e0e\u53d1\u73b0\u3002"),(0,n.yg)("p",null,"\u4e3b\u8981\u5305\u62ec\u4e24\u4e2a\u529f\u80fd\uff1a"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"Broker\u7ba1\u7406"),"\uff0cNameServer\u63a5\u53d7Broker\u96c6\u7fa4\u7684\u6ce8\u518c\u4fe1\u606f\u5e76\u4e14\u4fdd\u5b58\u4e0b\u6765\u4f5c\u4e3a\u8def\u7531\u4fe1\u606f\u7684\u57fa\u672c\u6570\u636e\u3002\u7136\u540e\u63d0\u4f9b\u5fc3\u8df3\u68c0\u6d4b\u673a\u5236\uff0c\u68c0\u67e5Broker\u662f\u5426\u8fd8\u5b58\u6d3b\uff1b"),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"\u8def\u7531\u4fe1\u606f\u7ba1\u7406"),"\uff0c\u6bcf\u4e2aNameServer\u5c06\u4fdd\u5b58\u5173\u4e8e Broker \u96c6\u7fa4\u7684\u6574\u4e2a\u8def\u7531\u4fe1\u606f\u548c\u7528\u4e8e\u5ba2\u6237\u7aef\u67e5\u8be2\u7684\u961f\u5217\u4fe1\u606f\u3002Producer\u548cConsumer\u901a\u8fc7NameServer\u5c31\u53ef\u4ee5\u77e5\u9053\u6574\u4e2aBroker\u96c6\u7fa4\u7684\u8def\u7531\u4fe1\u606f\uff0c\u4ece\u800c\u8fdb\u884c\u6d88\u606f\u7684\u6295\u9012\u548c\u6d88\u8d39\u3002")),(0,n.yg)("p",null,"NameServer\u901a\u5e38\u4f1a\u6709\u591a\u4e2a\u5b9e\u4f8b\u90e8\u7f72\uff0c\u5404\u5b9e\u4f8b\u95f4\u76f8\u4e92\u4e0d\u8fdb\u884c\u4fe1\u606f\u901a\u8baf\u3002Broker\u662f\u5411\u6bcf\u4e00\u53f0NameServer\u6ce8\u518c\u81ea\u5df1\u7684\u8def\u7531\u4fe1\u606f\uff0c\u6240\u4ee5\u6bcf\u4e00\u4e2aNameServer\u5b9e\u4f8b\u4e0a\u9762\u90fd\u4fdd\u5b58\u4e00\u4efd\u5b8c\u6574\u7684\u8def\u7531\u4fe1\u606f\u3002\u5f53\u67d0\u4e2aNameServer\u56e0\u67d0\u79cd\u539f\u56e0\u4e0b\u7ebf\u4e86\uff0c\u5ba2\u6237\u7aef\u4ecd\u7136\u53ef\u4ee5\u5411\u5176\u5b83NameServer\u83b7\u53d6\u8def\u7531\u4fe1\u606f\u3002"),(0,n.yg)("h2",{id:"\u4ee3\u7406\u670d\u52a1\u5668-broker"},"\u4ee3\u7406\u670d\u52a1\u5668 Broker"),(0,n.yg)("p",null,"Broker\u4e3b\u8981\u8d1f\u8d23\u6d88\u606f\u7684\u5b58\u50a8\u3001\u6295\u9012\u548c\u67e5\u8be2\u4ee5\u53ca\u670d\u52a1\u9ad8\u53ef\u7528\u4fdd\u8bc1\u3002"),(0,n.yg)("p",null,"NameServer\u51e0\u4e4e\u65e0\u72b6\u6001\u8282\u70b9\uff0c\u56e0\u6b64\u53ef\u96c6\u7fa4\u90e8\u7f72\uff0c\u8282\u70b9\u4e4b\u95f4\u65e0\u4efb\u4f55\u4fe1\u606f\u540c\u6b65\u3002Broker\u90e8\u7f72\u76f8\u5bf9\u590d\u6742\u3002"),(0,n.yg)("p",null,"\u5728 Master-Slave \u67b6\u6784\u4e2d\uff0cBroker \u5206\u4e3a Master \u4e0e Slave\u3002\u4e00\u4e2aMaster\u53ef\u4ee5\u5bf9\u5e94\u591a\u4e2aSlave\uff0c\u4f46\u662f\u4e00\u4e2aSlave\u53ea\u80fd\u5bf9\u5e94\u4e00\u4e2aMaster\u3002Master \u4e0e Slave \u7684\u5bf9\u5e94\u5173\u7cfb\u901a\u8fc7\u6307\u5b9a\u76f8\u540c\u7684BrokerName\uff0c\u4e0d\u540c\u7684BrokerId \u6765\u5b9a\u4e49\uff0cBrokerId\u4e3a0\u8868\u793aMaster\uff0c\u975e0\u8868\u793aSlave\u3002Master\u4e5f\u53ef\u4ee5\u90e8\u7f72\u591a\u4e2a\u3002"),(0,n.yg)("admonition",{title:"\u90e8\u7f72\u6a21\u578b\u5c0f\u7ed3",type:"note"},(0,n.yg)("ul",{parentName:"admonition"},(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"\u6bcf\u4e2a ",(0,n.yg)("strong",{parentName:"p"},"Broker")," \u4e0e ",(0,n.yg)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u6240\u6709\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u65f6\u6ce8\u518c Topic \u4fe1\u606f\u5230\u6240\u6709 NameServer\u3002")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Producer")," \u4e0e ",(0,n.yg)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u4e2a\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u671f\u4ece NameServer \u83b7\u53d6Topic\u8def\u7531\u4fe1\u606f\uff0c\u5e76\u5411\u63d0\u4f9b Topic  \u670d\u52a1\u7684 Master \u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u4e14\u5b9a\u65f6\u5411 Master \u53d1\u9001\u5fc3\u8df3\u3002Producer \u5b8c\u5168\u65e0\u72b6\u6001\u3002")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Consumer")," \u4e0e ",(0,n.yg)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u4e2a\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u671f\u4ece NameServer \u83b7\u53d6 Topic \u8def\u7531\u4fe1\u606f\uff0c\u5e76\u5411\u63d0\u4f9b Topic \u670d\u52a1\u7684 Master\u3001Slave \u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u4e14\u5b9a\u65f6\u5411 Master\u3001Slave\u53d1\u9001\u5fc3\u8df3\u3002Consumer \u65e2\u53ef\u4ee5\u4ece Master \u8ba2\u9605\u6d88\u606f\uff0c\u4e5f\u53ef\u4ee5\u4eceSlave\u8ba2\u9605\u6d88\u606f\u3002")))),(0,n.yg)("h2",{id:"rocketmq\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b"},"RocketMQ\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b"),(0,n.yg)("h3",{id:"1-\u542f\u52a8nameserver"},"1. \u542f\u52a8NameServer"),(0,n.yg)("p",null,"\u542f\u52a8NameServer\u3002NameServer\u542f\u52a8\u540e\u76d1\u542c\u7aef\u53e3\uff0c\u7b49\u5f85Broker\u3001Producer\u3001Consumer\u8fde\u63a5\uff0c\u76f8\u5f53\u4e8e\u4e00\u4e2a\u8def\u7531\u63a7\u5236\u4e2d\u5fc3\u3002"),(0,n.yg)("h3",{id:"2-\u542f\u52a8-broker"},"2. \u542f\u52a8 Broker"),(0,n.yg)("p",null,"\u542f\u52a8 Broker\u3002\u4e0e\u6240\u6709 NameServer \u4fdd\u6301\u957f\u8fde\u63a5\uff0c\u5b9a\u65f6\u53d1\u9001\u5fc3\u8df3\u5305\u3002\u5fc3\u8df3\u5305\u4e2d\u5305\u542b\u5f53\u524d Broker \u4fe1\u606f\u4ee5\u53ca\u5b58\u50a8\u6240\u6709 Topic \u4fe1\u606f\u3002\u6ce8\u518c\u6210\u529f\u540e\uff0cNameServer \u96c6\u7fa4\u4e2d\u5c31\u6709 Topic\u8ddfBroker \u7684\u6620\u5c04\u5173\u7cfb\u3002"),(0,n.yg)("h3",{id:"3-\u521b\u5efa-topic"},"3. \u521b\u5efa Topic"),(0,n.yg)("p",null,"\u521b\u5efa Topic \u65f6\u9700\u8981\u6307\u5b9a\u8be5 Topic \u8981\u5b58\u50a8\u5728\u54ea\u4e9b Broker \u4e0a\uff0c\u4e5f\u53ef\u4ee5\u5728\u53d1\u9001\u6d88\u606f\u65f6\u81ea\u52a8\u521b\u5efaTopic\u3002"),(0,n.yg)("h3",{id:"4-\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f"},"4. \u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f"),(0,n.yg)("p",null,"\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f\u3002\u542f\u52a8\u65f6\u5148\u8ddf  NameServer \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u53f0\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5e76\u4ece NameServer \u4e2d\u83b7\u53d6\u5f53\u524d\u53d1\u9001\u7684 Topic\u5b58\u5728\u4e8e\u54ea\u4e9b Broker \u4e0a\uff0c\u8f6e\u8be2\u4ece\u961f\u5217\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u961f\u5217\uff0c\u7136\u540e\u4e0e\u961f\u5217\u6240\u5728\u7684 Broker\u5efa\u7acb\u957f\u8fde\u63a5\u4ece\u800c\u5411  Broker\u53d1\u6d88\u606f\u3002"),(0,n.yg)("h3",{id:"5-\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f"},"5. \u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f"),(0,n.yg)("p",null,"\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f\u3002\u8ddf\u5176\u4e2d\u4e00\u53f0NameServer\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u83b7\u53d6\u5f53\u524d\u8ba2\u9605Topic\u5b58\u5728\u54ea\u4e9bBroker\u4e0a\uff0c\u7136\u540e\u76f4\u63a5\u8ddfBroker\u5efa\u7acb\u8fde\u63a5\u901a\u9053\uff0c\u7136\u540e\u5f00\u59cb\u6d88\u8d39\u6d88\u606f\u3002"))}d.isMDXComponent=!0},84288:(e,r,t)=>{t.d(r,{A:()=>a});const a=t.p+"assets/images/RocketMQ\u57fa\u672c\u6a21\u578b-ebcf3458d04b36f47f4c9633c1e36bf7.png"},65053:(e,r,t)=>{t.d(r,{A:()=>a});const a=t.p+"assets/images/RocketMQ\u6982\u5ff5\u6a21\u578b-db2c246ff6aa79016f880e2ca7a447e7.png"},93598:(e,r,t)=>{t.d(r,{A:()=>a});const a=t.p+"assets/images/RocketMQ\u90e8\u7f72\u67b6\u6784-ee0435f80da5faecf47bca69b1c831cb.png"}}]);
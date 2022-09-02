"use strict";(self.webpackChunkrocketmq_docs=self.webpackChunkrocketmq_docs||[]).push([[8946],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),s=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(r),u=n,k=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return r?a.createElement(k,i(i({ref:t},p),{},{components:r})):a.createElement(k,i({ref:t},p))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8215:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(7294);const n=function(e){let{children:t,hidden:r,className:n}=e;return a.createElement("div",{role:"tabpanel",hidden:r,className:n},t)}},5064:(e,t,r)=>{r.d(t,{Z:()=>s});var a=r(7294),n=r(9443);const o=function(){const e=(0,a.useContext)(n.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e};var i=r(6010);const c="tabItem_vU9c",l="tabItemActive_cw6a";const s=function(e){var t;const{lazy:r,block:n,defaultValue:s,values:p,groupId:m,className:d}=e,u=a.Children.toArray(e.children),k=p??u.map((e=>({value:e.props.value,label:e.props.label}))),v=s??(null==(t=u.find((e=>e.props.default)))?void 0:t.props.value),{tabGroupChoices:N,setTabGroupChoices:h}=o(),[g,f]=(0,a.useState)(v),b=[];if(null!=m){const e=N[m];null!=e&&e!==g&&k.some((t=>t.value===e))&&f(e)}const w=e=>{const t=e.currentTarget,r=b.indexOf(t),a=k[r].value;f(a),null!=m&&(h(m,a),setTimeout((()=>{(function(e){const{top:t,left:r,bottom:a,right:n}=e.getBoundingClientRect(),{innerHeight:o,innerWidth:i}=window;return t>=0&&n<=i&&a<=o&&r>=0})(t)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(l),setTimeout((()=>t.classList.remove(l)),2e3))}),150))},M=e=>{var t;let r=null;switch(e.key){case"ArrowRight":{const t=b.indexOf(e.target)+1;r=b[t]||b[0];break}case"ArrowLeft":{const t=b.indexOf(e.target)-1;r=b[t]||b[b.length-1];break}}null==(t=r)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},d)},k.map((e=>{let{value:t,label:r}=e;return a.createElement("li",{role:"tab",tabIndex:g===t?0:-1,"aria-selected":g===t,className:(0,i.Z)("tabs__item",c,{"tabs__item--active":g===t}),key:t,ref:e=>b.push(e),onKeyDown:M,onFocus:w,onClick:w},r??t)}))),r?(0,a.cloneElement)(u.filter((e=>e.props.value===g))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},u.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==g})))))}},9443:(e,t,r)=>{r.d(t,{Z:()=>a});const a=(0,r(7294).createContext)(void 0)},6451:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>c,metadata:()=>s,toc:()=>p});var a=r(7462),n=(r(7294),r(3905)),o=r(5064),i=r(8215);const c={},l="\u521d\u8bc6RocketMQ",s={unversionedId:"\u4ecb\u7ecd/03whatis",id:"version-5.0/\u4ecb\u7ecd/03whatis",isDocsHomePage:!1,title:"\u521d\u8bc6RocketMQ",description:"\u6211\u4eec\u5e73\u65f6\u4f7f\u7528\u4e00\u4e9b\u4f53\u80b2\u65b0\u95fb\u8f6f\u4ef6\uff0c\u4f1a\u8ba2\u9605\u81ea\u5df1\u559c\u6b22\u7684\u4e00\u4e9b\u7403\u961f\u677f\u5757\uff0c\u5f53\u6709\u4f5c\u8005\u53d1\u8868\u6587\u7ae0\u5230\u76f8\u5173\u7684\u677f\u5757\uff0c\u6211\u4eec\u5c31\u80fd\u6536\u5230\u76f8\u5173\u7684\u65b0\u95fb\u63a8\u9001\u3002",source:"@site/versioned_docs/version-5.0/01-\u4ecb\u7ecd/03whatis.md",sourceDirName:"01-\u4ecb\u7ecd",slug:"/\u4ecb\u7ecd/03whatis",permalink:"/docs/5.0/\u4ecb\u7ecd/03whatis",editUrl:"https://github.com/apache/rocketmq-site/tree/new-official-website/versioned_docs/version-5.0/01-\u4ecb\u7ecd/03whatis.md",tags:[],version:"5.0",frontMatter:{},sidebar:"version-5.0/myAutogeneratedSidebar",previous:{title:"\u5feb\u901f\u5f00\u59cb",permalink:"/docs/5.0/\u4ecb\u7ecd/02quickstart"},next:{title:"\u57fa\u672c\u6982\u5ff5",permalink:"/docs/5.0/\u751f\u4ea7\u8005/04concept1"}},p=[{value:"RocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\uff0c\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b",id:"rocketmq\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u4e00\u4e2a\u7b80\u5355\u7684pubsub\u6a21\u578b",children:[]},{value:"RocketMQ \u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b",id:"rocketmq-\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b",children:[]},{value:"RocketMQ\u7684\u90e8\u7f72\u6a21\u578b",id:"rocketmq\u7684\u90e8\u7f72\u6a21\u578b",children:[{value:"\u751f\u4ea7\u8005 Producer",id:"\u751f\u4ea7\u8005-producer",children:[]},{value:"<strong>\u6d88\u8d39\u8005 Consumer</strong>",id:"\u6d88\u8d39\u8005-consumer",children:[]}]},{value:"\u540d\u5b57\u670d\u52a1\u5668 <strong>NameServer</strong>",id:"\u540d\u5b57\u670d\u52a1\u5668-nameserver",children:[]},{value:"\u4ee3\u7406\u670d\u52a1\u5668 Broker",id:"\u4ee3\u7406\u670d\u52a1\u5668-broker",children:[]},{value:"RocketMQ\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b",id:"rocketmq\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b",children:[{value:"1. \u542f\u52a8NameServer",id:"1-\u542f\u52a8nameserver",children:[]},{value:"2. \u542f\u52a8 Broker",id:"2-\u542f\u52a8-broker",children:[]},{value:"3. \u521b\u5efa Topic",id:"3-\u521b\u5efa-topic",children:[]},{value:"4. \u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f",id:"4-\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f",children:[]},{value:"5. \u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f",id:"5-\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f",children:[]}]}],m={toc:p};function d(e){let{components:t,...c}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,c,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\u521d\u8bc6rocketmq"},"\u521d\u8bc6RocketMQ"),(0,n.kt)("p",null,"\u6211\u4eec\u5e73\u65f6\u4f7f\u7528\u4e00\u4e9b\u4f53\u80b2\u65b0\u95fb\u8f6f\u4ef6\uff0c\u4f1a\u8ba2\u9605\u81ea\u5df1\u559c\u6b22\u7684\u4e00\u4e9b\u7403\u961f\u677f\u5757\uff0c\u5f53\u6709\u4f5c\u8005\u53d1\u8868\u6587\u7ae0\u5230\u76f8\u5173\u7684\u677f\u5757\uff0c\u6211\u4eec\u5c31\u80fd\u6536\u5230\u76f8\u5173\u7684\u65b0\u95fb\u63a8\u9001\u3002"),(0,n.kt)("p",null,"\u53d1\u5e03-\u8ba2\u9605\uff08Pub/Sub\uff09\u662f\u4e00\u79cd\u6d88\u606f\u8303\u5f0f\uff0c\u6d88\u606f\u7684\u53d1\u9001\u8005\uff08\u79f0\u4e3a\u53d1\u5e03\u8005\u3001\u751f\u4ea7\u8005\u3001Producer\uff09\u4f1a\u5c06\u6d88\u606f\u76f4\u63a5\u53d1\u9001\u7ed9\u7279\u5b9a\u7684\u63a5\u6536\u8005\uff08\u79f0\u4e3a\u8ba2\u9605\u8005\u3001\u6d88\u8d39\u8005\u3001Comsumer\uff09\u3002\u800cRocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u5c31\u662f\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b\u3002"),(0,n.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u76f8\u5173\u6982\u5ff5")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)(o.Z,{mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"\u751f\u4ea7\u8005",label:"\u751f\u4ea7\u8005",default:!0,mdxType:"TabItem"},"\u8d1f\u8d23\u751f\u4ea7\u6d88\u606f\uff0c\u4e00\u822c\u7531\u4e1a\u52a1\u7cfb\u7edf\u8d1f\u8d23\u751f\u4ea7\u6d88\u606f\u3002\u4e00\u4e2a\u6d88\u606f\u751f\u4ea7\u8005\u4f1a\u628a\u4e1a\u52a1\u5e94\u7528\u7cfb\u7edf\u91cc\u4ea7\u751f\u7684\u6d88\u606f\u53d1\u9001\u5230broker\u670d\u52a1\u5668\u3002RocketMQ\u63d0\u4f9b\u591a\u79cd\u53d1\u9001\u65b9\u5f0f\uff0c\u540c\u6b65\u53d1\u9001\u3001\u5f02\u6b65\u53d1\u9001\u3001\u987a\u5e8f\u53d1\u9001\u3001\u5355\u5411\u53d1\u9001\u3002",(0,n.kt)("p",{parentName:"div"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.kt)("a",{parentName:"p",href:"/docs/%E7%94%9F%E4%BA%A7%E8%80%85/04concept1"},"\u751f\u4ea7\u8005")),"  "),(0,n.kt)(i.Z,{value:"\u6d88\u8d39\u8005",label:"\u6d88\u8d39\u8005",mdxType:"TabItem"},"\u8d1f\u8d23\u6d88\u8d39\u6d88\u606f\uff0c\u4e00\u822c\u662f\u540e\u53f0\u7cfb\u7edf\u8d1f\u8d23\u5f02\u6b65\u6d88\u8d39\u3002\u4e00\u4e2a\u6d88\u606f\u6d88\u8d39\u8005\u4f1a\u4eceBroker\u670d\u52a1\u5668\u62c9\u53d6\u6d88\u606f\u3001\u5e76\u5c06\u5176\u63d0\u4f9b\u7ed9\u5e94\u7528\u7a0b\u5e8f\u3002\u4ece\u7528\u6237\u5e94\u7528\u7684\u89d2\u5ea6\u800c\u8a00\u63d0\u4f9b\u4e86\u4e24\u79cd\u6d88\u8d39\u5f62\u5f0f\uff1a\u62c9\u53d6\u5f0f\u6d88\u8d39\u3001\u63a8\u52a8\u5f0f\u6d88\u8d39\u3002",(0,n.kt)("p",{parentName:"div"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.kt)("a",{parentName:"p",href:"/docs/%E6%B6%88%E8%B4%B9%E8%80%85/11concept2"},"\u6d88\u8d39\u8005")),"  "),(0,n.kt)(i.Z,{value:"\u6d88\u606f\u4e3b\u9898",label:"\u4e3b\u9898",mdxType:"TabItem"},"\u8868\u793a\u4e00\u7c7b\u6d88\u606f\u7684\u96c6\u5408\uff0c\u6bcf\u4e2a\u4e3b\u9898\u5305\u542b\u82e5\u5e72\u6761\u6d88\u606f\uff0c\u6bcf\u6761\u6d88\u606f\u53ea\u80fd\u5c5e\u4e8e\u4e00\u4e2a\u4e3b\u9898\uff0c\u662fRocketMQ\u8fdb\u884c\u6d88\u606f\u8ba2\u9605\u7684\u57fa\u672c\u5355\u4f4d\u3002",(0,n.kt)("p",{parentName:"div"},"\u66f4\u591a\u8be6\u89c1  \u27a1\ufe0f ",(0,n.kt)("a",{parentName:"p",href:"/docs/%E7%94%9F%E4%BA%A7%E8%80%85/04concept1"},"\u57fa\u672c\u6982\u5ff5")),"  ")))),(0,n.kt)("h2",{id:"rocketmq\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\u4e00\u4e2a\u7b80\u5355\u7684pubsub\u6a21\u578b"},"RocketMQ\u7684\u57fa\u7840\u6d88\u606f\u6a21\u578b\uff0c\u4e00\u4e2a\u7b80\u5355\u7684Pub/Sub\u6a21\u578b"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"RocketMQ\u6982\u5ff5\u6a21\u578b",src:r(6827).Z})),(0,n.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u57fa\u672c\u6d88\u606f\u7cfb\u7edf\u6a21\u578b")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"\u4e0a\u56fe\u5c31\u662f\u662f\u4e00\u4e2a\u57fa\u672c\u7684\u6d88\u606f\u7cfb\u7edf\u6a21\u578b\uff0c\u5305\u62ec",(0,n.kt)("strong",{parentName:"p"},"\u751f\u4ea7\u8005 (Producer)"),"\uff0c",(0,n.kt)("strong",{parentName:"p"},"\u6d88\u8d39\u8005 (Consumer)"),"\uff0c\u4e2d\u95f4\u8fdb\u884c\u57fa\u4e8e",(0,n.kt)("strong",{parentName:"p"},"\u6d88\u606f\u4e3b\u9898\uff08Topic\uff09"),"\u7684\u6d88\u606f\u4f20\u9001\u3002"))),(0,n.kt)("p",null,"\u5728",(0,n.kt)("strong",{parentName:"p"},"\u57fa\u4e8e\u4e3b\u9898"),"\u7684\u7cfb\u7edf\u4e2d\uff0c\u6d88\u606f\u88ab\u53d1\u5e03\u5230\u4e3b\u9898\u6216\u547d\u540d\u901a\u9053\u4e0a\u3002\u6d88\u8d39\u8005\u5c06\u6536\u5230\u5176\u8ba2\u9605\u7684\u4e3b\u9898\u4e0a\u7684\u6240\u6709\u6d88\u606f\uff0c\u751f\u4ea7\u8005\u8d1f\u8d23\u5b9a\u4e49\u8ba2\u9605\u8005\u6240\u8ba2\u9605\u7684\u6d88\u606f\u7c7b\u522b\u3002\u8fd9\u662f\u4e00\u4e2a\u57fa\u7840\u7684\u6982\u5ff5\u6a21\u578b\uff0c\u800c\u5728\u5b9e\u9645\u7684\u5e94\u7528\u4e2d\uff0c\u7ed3\u6784\u4f1a\u66f4\u590d\u6742\u3002\u4f8b\u5982\u4e3a\u4e86\u652f\u6301\u9ad8\u5e76\u53d1\u548c\u6c34\u5e73\u6269\u5c55\uff0c\u4e2d\u95f4\u7684\u6d88\u606f\u4e3b\u9898\u9700\u8981\u8fdb\u884c\u5206\u533a\uff0c\u540c\u4e00\u4e2aTopic\u4f1a\u6709\u591a\u4e2a\u751f\u4ea7\u8005\uff0c\u540c\u4e00\u4e2a\u4fe1\u606f\u4f1a\u6709\u591a\u4e2a\u6d88\u8d39\u8005\uff0c\u6d88\u8d39\u8005\u4e4b\u95f4\u8981\u8fdb\u884c\u8d1f\u8f7d\u5747\u8861\u7b49\u3002"),(0,n.kt)("h2",{id:"rocketmq-\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b"},"RocketMQ \u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"RocketMQ\u57fa\u672c\u6a21\u578b",src:r(3197).Z})),(0,n.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u6269\u5c55\u7684\u6d88\u606f\u7cfb\u7edf\u6a21\u578b")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"\u4e0a\u56fe\u5c31\u662f\u4e00\u4e2a\u6269\u5c55\u540e\u7684\u6d88\u606f\u6a21\u578b\uff0c\u5305\u62ec",(0,n.kt)("strong",{parentName:"p"},"\u4e24\u4e2a\u751f\u4ea7\u8005"),"\uff0c",(0,n.kt)("strong",{parentName:"p"},"\u4e24\u4e2a\u6d88\u606fTopic"),"\uff0c\u4ee5\u53ca",(0,n.kt)("strong",{parentName:"p"},"\u4e24\u7ec4\u6d88\u8d39\u8005 Comsumer"),"\u3002"),(0,n.kt)("p",{parentName:"div"},"\u5b58\u50a8\u6d88\u606fTopic\u7684 ",(0,n.kt)("strong",{parentName:"p"},"\u4ee3\u7406\u670d\u52a1\u5668"),"( ",(0,n.kt)("strong",{parentName:"p"},"Broker")," )\uff0c\u662f\u5b9e\u9645\u90e8\u7f72\u8fc7\u7a0b\u7684\u5bf9\u5e94\u7684\u4ee3\u7406\u670d\u52a1\u5668\u3002"))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u4e3a\u4e86",(0,n.kt)("strong",{parentName:"p"},"\u6c34\u5e73\u6269\u5c55"),"\uff0cRocketMQ \u5bf9 Topic\u8fdb\u884c\u4e86\u5206\u533a\uff0c\u8fd9\u79cd\u64cd\u4f5c\u88ab\u79f0\u4e3a",(0,n.kt)("strong",{parentName:"p"},"\u961f\u5217"),"\uff08MessageQueue\uff09\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u4e3a\u4e86",(0,n.kt)("strong",{parentName:"p"},"\u5e76\u53d1\u6d88\u8d39"),"\uff0cConsumer Group\u7684\u6982\u5ff5\u5e94\u8fd0\u800c\u751f\u3002"))),(0,n.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("ul",{parentName:"div"},(0,n.kt)("li",{parentName:"ul"},"Consumer\u4e3b\u8981\u6709\u4e24\u79cd\u6d88\u8d39\u65b9\u5f0f\uff0c\u5373",(0,n.kt)("strong",{parentName:"li"},"\u5e7f\u64ad\u6a21\u5f0f"),"\uff0c\u548c",(0,n.kt)("strong",{parentName:"li"},"\u96c6\u7fa4\u6a21\u5f0f"),"\uff08\u56fe\u4e2d\u662f\u6700\u5e38\u7528\u7684\u96c6\u7fa4\u6a21\u5f0f\uff09\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u540c\u4e00\u4e2a Consumer Group \u4e2d\u7684 Consumer \u5b9e\u4f8b\u662f\u8d1f\u8f7d\u5747\u8861\u6d88\u8d39\uff0c\u5982\u56fe\u4e2d ConsumerGroupA \u8ba2\u9605 TopicA\uff0cTopicA \u5bf9\u5e94 3\u4e2a\u961f\u5217\uff0c\u5219 GroupA \u4e2d\u7684 Consumer1 \u6d88\u8d39\u7684\u662f MessageQueue 0\u548c MessageQueue 1\u7684\u6d88\u606f\uff0cConsumer2\u662f\u6d88\u8d39\u7684\u662fMessageQueue2\u7684\u6d88\u606f\u3002")))),(0,n.kt)("h2",{id:"rocketmq\u7684\u90e8\u7f72\u6a21\u578b"},"RocketMQ\u7684\u90e8\u7f72\u6a21\u578b"),(0,n.kt)("p",null,"Producer\u3001Consumer\u53c8\u662f\u5982\u4f55\u627e\u5230Topic\u548cBroker\u7684\u5730\u5740\u5462\uff1f\u6d88\u606f\u7684\u5177\u4f53\u53d1\u9001\u548c\u63a5\u6536\u53c8\u662f\u600e\u4e48\u8fdb\u884c\u7684\u5462\uff1f"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"RocketMQ\u90e8\u7f72\u67b6\u6784",src:r(4674).Z})),(0,n.kt)("p",null,"Apache RocketMQ \u90e8\u7f72\u67b6\u6784\u4e0a\u4e3b\u8981\u5206\u4e3a\u56db\u90e8\u5206:"),(0,n.kt)("h3",{id:"\u751f\u4ea7\u8005-producer"},"\u751f\u4ea7\u8005 Producer"),(0,n.kt)("p",null,"\u53d1\u5e03\u6d88\u606f\u7684\u89d2\u8272\u3002Producer\u901a\u8fc7 MQ \u7684\u8d1f\u8f7d\u5747\u8861\u6a21\u5757\u9009\u62e9\u76f8\u5e94\u7684 Broker \u96c6\u7fa4\u961f\u5217\u8fdb\u884c\u6d88\u606f\u6295\u9012\uff0c\u6295\u9012\u7684\u8fc7\u7a0b\u652f\u6301\u5feb\u901f\u5931\u8d25\u548c\u91cd\u8bd5\u3002"),(0,n.kt)("h3",{id:"\u6d88\u8d39\u8005-consumer"},(0,n.kt)("strong",{parentName:"h3"},"\u6d88\u8d39\u8005 Consumer")),(0,n.kt)("p",null,"\u6d88\u606f\u6d88\u8d39\u7684\u89d2\u8272\u3002"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u652f\u6301\u4ee5\u63a8\uff08push\uff09\uff0c\u62c9\uff08pull\uff09\u4e24\u79cd\u6a21\u5f0f\u5bf9\u6d88\u606f\u8fdb\u884c\u6d88\u8d39\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u540c\u65f6\u4e5f\u652f\u6301",(0,n.kt)("strong",{parentName:"li"},"\u96c6\u7fa4\u65b9\u5f0f"),"\u548c\u5e7f\u64ad\u65b9\u5f0f\u7684\u6d88\u8d39"),(0,n.kt)("li",{parentName:"ul"},"\u63d0\u4f9b\u5b9e\u65f6\u6d88\u606f\u8ba2\u9605\u673a\u5236\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7528\u6237\u7684\u9700\u6c42\u3002")),(0,n.kt)("h2",{id:"\u540d\u5b57\u670d\u52a1\u5668-nameserver"},"\u540d\u5b57\u670d\u52a1\u5668 ",(0,n.kt)("strong",{parentName:"h2"},"NameServer")),(0,n.kt)("p",null,"NameServer\u662f \u4e00\u4e2a\u7b80\u5355\u7684 Topic \u8def\u7531\u6ce8\u518c\u4e2d\u5fc3\uff0c\u652f\u6301 Topic\u3001Broker \u7684\u52a8\u6001\u6ce8\u518c\u4e0e\u53d1\u73b0\u3002"),(0,n.kt)("p",null,"\u4e3b\u8981\u5305\u62ec\u4e24\u4e2a\u529f\u80fd\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Broker\u7ba1\u7406"),"\uff0cNameServer\u63a5\u53d7Broker\u96c6\u7fa4\u7684\u6ce8\u518c\u4fe1\u606f\u5e76\u4e14\u4fdd\u5b58\u4e0b\u6765\u4f5c\u4e3a\u8def\u7531\u4fe1\u606f\u7684\u57fa\u672c\u6570\u636e\u3002\u7136\u540e\u63d0\u4f9b\u5fc3\u8df3\u68c0\u6d4b\u673a\u5236\uff0c\u68c0\u67e5Broker\u662f\u5426\u8fd8\u5b58\u6d3b\uff1b"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u8def\u7531\u4fe1\u606f\u7ba1\u7406"),"\uff0c\u6bcf\u4e2aNameServer\u5c06\u4fdd\u5b58\u5173\u4e8e Broker \u96c6\u7fa4\u7684\u6574\u4e2a\u8def\u7531\u4fe1\u606f\u548c\u7528\u4e8e\u5ba2\u6237\u7aef\u67e5\u8be2\u7684\u961f\u5217\u4fe1\u606f\u3002Producer\u548cConsumer\u901a\u8fc7NameServer\u5c31\u53ef\u4ee5\u77e5\u9053\u6574\u4e2aBroker\u96c6\u7fa4\u7684\u8def\u7531\u4fe1\u606f\uff0c\u4ece\u800c\u8fdb\u884c\u6d88\u606f\u7684\u6295\u9012\u548c\u6d88\u8d39\u3002")),(0,n.kt)("p",null,"NameServer\u901a\u5e38\u4f1a\u6709\u591a\u4e2a\u5b9e\u4f8b\u90e8\u7f72\uff0c\u5404\u5b9e\u4f8b\u95f4\u76f8\u4e92\u4e0d\u8fdb\u884c\u4fe1\u606f\u901a\u8baf\u3002Broker\u662f\u5411\u6bcf\u4e00\u53f0NameServer\u6ce8\u518c\u81ea\u5df1\u7684\u8def\u7531\u4fe1\u606f\uff0c\u6240\u4ee5\u6bcf\u4e00\u4e2aNameServer\u5b9e\u4f8b\u4e0a\u9762\u90fd\u4fdd\u5b58\u4e00\u4efd\u5b8c\u6574\u7684\u8def\u7531\u4fe1\u606f\u3002\u5f53\u67d0\u4e2aNameServer\u56e0\u67d0\u79cd\u539f\u56e0\u4e0b\u7ebf\u4e86\uff0c\u5ba2\u6237\u7aef\u4ecd\u7136\u53ef\u4ee5\u5411\u5176\u5b83NameServer\u83b7\u53d6\u8def\u7531\u4fe1\u606f\u3002"),(0,n.kt)("h2",{id:"\u4ee3\u7406\u670d\u52a1\u5668-broker"},"\u4ee3\u7406\u670d\u52a1\u5668 Broker"),(0,n.kt)("p",null,"Broker\u4e3b\u8981\u8d1f\u8d23\u6d88\u606f\u7684\u5b58\u50a8\u3001\u6295\u9012\u548c\u67e5\u8be2\u4ee5\u53ca\u670d\u52a1\u9ad8\u53ef\u7528\u4fdd\u8bc1\u3002"),(0,n.kt)("p",null,"NameServer\u51e0\u4e4e\u65e0\u72b6\u6001\u8282\u70b9\uff0c\u56e0\u6b64\u53ef\u96c6\u7fa4\u90e8\u7f72\uff0c\u8282\u70b9\u4e4b\u95f4\u65e0\u4efb\u4f55\u4fe1\u606f\u540c\u6b65\u3002Broker\u90e8\u7f72\u76f8\u5bf9\u590d\u6742\u3002"),(0,n.kt)("p",null,"\u5728 Master-Slave \u67b6\u6784\u4e2d\uff0cBroker \u5206\u4e3a Master \u4e0e Slave\u3002\u4e00\u4e2aMaster\u53ef\u4ee5\u5bf9\u5e94\u591a\u4e2aSlave\uff0c\u4f46\u662f\u4e00\u4e2aSlave\u53ea\u80fd\u5bf9\u5e94\u4e00\u4e2aMaster\u3002Master \u4e0e Slave \u7684\u5bf9\u5e94\u5173\u7cfb\u901a\u8fc7\u6307\u5b9a\u76f8\u540c\u7684BrokerName\uff0c\u4e0d\u540c\u7684BrokerId \u6765\u5b9a\u4e49\uff0cBrokerId\u4e3a0\u8868\u793aMaster\uff0c\u975e0\u8868\u793aSlave\u3002Master\u4e5f\u53ef\u4ee5\u90e8\u7f72\u591a\u4e2a\u3002"),(0,n.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u90e8\u7f72\u6a21\u578b\u5c0f\u7ed3")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("ul",{parentName:"div"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u6bcf\u4e2a ",(0,n.kt)("strong",{parentName:"p"},"Broker")," \u4e0e ",(0,n.kt)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u6240\u6709\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u65f6\u6ce8\u518c Topic \u4fe1\u606f\u5230\u6240\u6709 NameServer\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},"Producer")," \u4e0e ",(0,n.kt)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u4e2a\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u671f\u4ece NameServer \u83b7\u53d6Topic\u8def\u7531\u4fe1\u606f\uff0c\u5e76\u5411\u63d0\u4f9b Topic  \u670d\u52a1\u7684 Master \u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u4e14\u5b9a\u65f6\u5411 Master \u53d1\u9001\u5fc3\u8df3\u3002Producer \u5b8c\u5168\u65e0\u72b6\u6001\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},"Consumer")," \u4e0e ",(0,n.kt)("strong",{parentName:"p"},"NameServer")," \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u4e2a\u8282\u70b9\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5b9a\u671f\u4ece NameServer \u83b7\u53d6 Topic \u8def\u7531\u4fe1\u606f\uff0c\u5e76\u5411\u63d0\u4f9b Topic \u670d\u52a1\u7684 Master\u3001Slave \u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u4e14\u5b9a\u65f6\u5411 Master\u3001Slave\u53d1\u9001\u5fc3\u8df3\u3002Consumer \u65e2\u53ef\u4ee5\u4ece Master \u8ba2\u9605\u6d88\u606f\uff0c\u4e5f\u53ef\u4ee5\u4eceSlave\u8ba2\u9605\u6d88\u606f\u3002"))))),(0,n.kt)("h2",{id:"rocketmq\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b"},"RocketMQ\u96c6\u7fa4\u5de5\u4f5c\u6d41\u7a0b"),(0,n.kt)("h3",{id:"1-\u542f\u52a8nameserver"},"1. \u542f\u52a8NameServer"),(0,n.kt)("p",null,"\u542f\u52a8NameServer\u3002NameServer\u542f\u52a8\u540e\u76d1\u542c\u7aef\u53e3\uff0c\u7b49\u5f85Broker\u3001Producer\u3001Consumer\u8fde\u63a5\uff0c\u76f8\u5f53\u4e8e\u4e00\u4e2a\u8def\u7531\u63a7\u5236\u4e2d\u5fc3\u3002"),(0,n.kt)("h3",{id:"2-\u542f\u52a8-broker"},"2. \u542f\u52a8 Broker"),(0,n.kt)("p",null,"\u542f\u52a8 Broker\u3002\u4e0e\u6240\u6709 NameServer \u4fdd\u6301\u957f\u8fde\u63a5\uff0c\u5b9a\u65f6\u53d1\u9001\u5fc3\u8df3\u5305\u3002\u5fc3\u8df3\u5305\u4e2d\u5305\u542b\u5f53\u524d Broker \u4fe1\u606f\u4ee5\u53ca\u5b58\u50a8\u6240\u6709 Topic \u4fe1\u606f\u3002\u6ce8\u518c\u6210\u529f\u540e\uff0cNameServer \u96c6\u7fa4\u4e2d\u5c31\u6709 Topic\u8ddfBroker \u7684\u6620\u5c04\u5173\u7cfb\u3002"),(0,n.kt)("h3",{id:"3-\u521b\u5efa-topic"},"3. \u521b\u5efa Topic"),(0,n.kt)("p",null,"\u521b\u5efa Topic \u65f6\u9700\u8981\u6307\u5b9a\u8be5 Topic \u8981\u5b58\u50a8\u5728\u54ea\u4e9b Broker \u4e0a\uff0c\u4e5f\u53ef\u4ee5\u5728\u53d1\u9001\u6d88\u606f\u65f6\u81ea\u52a8\u521b\u5efaTopic\u3002"),(0,n.kt)("h3",{id:"4-\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f"},"4. \u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f"),(0,n.kt)("p",null,"\u751f\u4ea7\u8005\u53d1\u9001\u6d88\u606f\u3002\u542f\u52a8\u65f6\u5148\u8ddf  NameServer \u96c6\u7fa4\u4e2d\u7684\u5176\u4e2d\u4e00\u53f0\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u5e76\u4ece NameServer \u4e2d\u83b7\u53d6\u5f53\u524d\u53d1\u9001\u7684 Topic\u5b58\u5728\u4e8e\u54ea\u4e9b Broker \u4e0a\uff0c\u8f6e\u8be2\u4ece\u961f\u5217\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u961f\u5217\uff0c\u7136\u540e\u4e0e\u961f\u5217\u6240\u5728\u7684 Broker\u5efa\u7acb\u957f\u8fde\u63a5\u4ece\u800c\u5411  Broker\u53d1\u6d88\u606f\u3002"),(0,n.kt)("h3",{id:"5-\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f"},"5. \u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f"),(0,n.kt)("p",null,"\u6d88\u8d39\u8005\u63a5\u53d7\u6d88\u606f\u3002\u8ddf\u5176\u4e2d\u4e00\u53f0NameServer\u5efa\u7acb\u957f\u8fde\u63a5\uff0c\u83b7\u53d6\u5f53\u524d\u8ba2\u9605Topic\u5b58\u5728\u54ea\u4e9bBroker\u4e0a\uff0c\u7136\u540e\u76f4\u63a5\u8ddfBroker\u5efa\u7acb\u8fde\u63a5\u901a\u9053\uff0c\u7136\u540e\u5f00\u59cb\u6d88\u8d39\u6d88\u606f\u3002"))}d.isMDXComponent=!0},6010:(e,t,r)=>{function a(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=a(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}r.d(t,{Z:()=>n});const n=function(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=a(e))&&(n&&(n+=" "),n+=t);return n}},3197:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/RocketMQ\u57fa\u672c\u6a21\u578b-ebcf3458d04b36f47f4c9633c1e36bf7.png"},6827:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/RocketMQ\u6982\u5ff5\u6a21\u578b-db2c246ff6aa79016f880e2ca7a447e7.png"},4674:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/RocketMQ\u90e8\u7f72\u67b6\u6784-ee0435f80da5faecf47bca69b1c831cb.png"}}]);
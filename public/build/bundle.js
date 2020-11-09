var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function s(){return Object.create(null)}function i(t){t.forEach(n)}function o(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function c(t,n,s,i){return t[1]&&i?e(s.ctx.slice(),t[1](i(n))):s.ctx}function a(t,e,n,s,i,o,l){const r=function(t,e,n,s){if(t[2]&&s){const i=t[2](s(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|i[s];return t}return e.dirty|i}return e.dirty}(e,s,i,o);if(r){const i=c(e,n,s,l);t.p(i,r)}}function u(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function f(t){return null==t?"":t}function m(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function v(){return h(" ")}function $(){return h("")}function b(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function k(t,e){t.value=null==e?"":e}function w(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function C(t,e,n){t.classList[n?"add":"remove"](e)}let j;function E(t){j=t}function S(){if(!j)throw new Error("Function called outside component initialization");return j}function _(){const t=S();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const i=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);s.slice().forEach((e=>{e.call(t,i)}))}}}function L(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t(e)))}const O=[],q=[],N=[],M=[],T=Promise.resolve();let I=!1;function P(){I||(I=!0,T.then(D))}function A(t){N.push(t)}function H(t){M.push(t)}let z=!1;const R=new Set;function D(){if(!z){z=!0;do{for(let t=0;t<O.length;t+=1){const e=O[t];E(e),J(e.$$)}for(E(null),O.length=0;q.length;)q.pop()();for(let t=0;t<N.length;t+=1){const e=N[t];R.has(e)||(R.add(e),e())}N.length=0}while(O.length);for(;M.length;)M.pop()();I=!1,z=!1,R.clear()}}function J(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const F=new Set;let G;function U(){G={r:0,c:[],p:G}}function V(){G.r||i(G.c),G=G.p}function W(t,e){t&&t.i&&(F.delete(t),t.i(e))}function B(t,e,n,s){if(t&&t.o){if(F.has(t))return;F.add(t),G.c.push((()=>{F.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function Q(t,e){const n={},s={},i={$$scope:1};let o=t.length;for(;o--;){const l=t[o],r=e[o];if(r){for(const t in l)t in r||(s[t]=1);for(const t in r)i[t]||(n[t]=r[t],i[t]=1);t[o]=r}else for(const t in l)i[t]=1}for(const t in s)t in n||(n[t]=void 0);return n}function X(t){return"object"==typeof t&&null!==t?t:{}}function Y(t,e,n){const s=t.$$.props[e];void 0!==s&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function K(t){t&&t.c()}function Z(t,e,s){const{fragment:l,on_mount:r,on_destroy:c,after_update:a}=t.$$;l&&l.m(e,s),A((()=>{const e=r.map(n).filter(o);c?c.push(...e):i(e),t.$$.on_mount=[]})),a.forEach(A)}function tt(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function et(e,n,o,l,r,c,a=[-1]){const u=j;E(e);const f=n.props||{},m=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:r,bound:s(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:s(),dirty:a,skip_bound:!1};let d=!1;if(m.ctx=o?o(e,f,((t,n,...s)=>{const i=s.length?s[0]:n;return m.ctx&&r(m.ctx[t],m.ctx[t]=i)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](i),d&&function(t,e){-1===t.$$.dirty[0]&&(O.push(t),P(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],m.update(),d=!0,i(m.before_update),m.fragment=!!l&&l(m.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);m.fragment&&m.fragment.l(t),t.forEach(p)}else m.fragment&&m.fragment.c();n.intro&&W(e.$$.fragment),Z(e,n.target,n.anchor),D()}E(u)}class nt{$destroy(){tt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const st=[];function it(t,e){return{subscribe:ot(t,e).subscribe}}function ot(e,n=t){let s;const i=[];function o(t){if(l(e,t)&&(e=t,s)){const t=!st.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),st.push(n,e)}if(t){for(let t=0;t<st.length;t+=2)st[t][0](st[t+1]);st.length=0}}}return{set:o,update:function(t){o(t(e))},subscribe:function(l,r=t){const c=[l,r];return i.push(c),1===i.length&&(s=n(o)||t),l(e),()=>{const t=i.indexOf(c);-1!==t&&i.splice(t,1),0===i.length&&(s(),s=null)}}}}function lt(e,n,s){const l=!Array.isArray(e),c=l?[e]:e,a=n.length<2;return it(s,(e=>{let s=!1;const u=[];let f=0,m=t;const d=()=>{if(f)return;m();const s=n(l?u[0]:u,e);a?e(s):m=o(s)?s:t},p=c.map(((t,e)=>r(t,(t=>{u[e]=t,f&=~(1<<e),s&&d()}),(()=>{f|=1<<e}))));return s=!0,d(),function(){i(p),m()}}))}function rt(t){let n,s,i;const o=[t[2]];var l=t[0];function r(t){let n={};for(let t=0;t<o.length;t+=1)n=e(n,o[t]);return{props:n}}return l&&(n=new l(r()),n.$on("routeEvent",t[7])),{c(){n&&K(n.$$.fragment),s=$()},m(t,e){n&&Z(n,t,e),d(t,s,e),i=!0},p(t,e){const i=4&e?Q(o,[X(t[2])]):{};if(l!==(l=t[0])){if(n){U();const t=n;B(t.$$.fragment,1,0,(()=>{tt(t,1)})),V()}l?(n=new l(r()),n.$on("routeEvent",t[7]),K(n.$$.fragment),W(n.$$.fragment,1),Z(n,s.parentNode,s)):n=null}else l&&n.$set(i)},i(t){i||(n&&W(n.$$.fragment,t),i=!0)},o(t){n&&B(n.$$.fragment,t),i=!1},d(t){t&&p(s),n&&tt(n,t)}}}function ct(t){let n,s,i;const o=[{params:t[1]},t[2]];var l=t[0];function r(t){let n={};for(let t=0;t<o.length;t+=1)n=e(n,o[t]);return{props:n}}return l&&(n=new l(r()),n.$on("routeEvent",t[6])),{c(){n&&K(n.$$.fragment),s=$()},m(t,e){n&&Z(n,t,e),d(t,s,e),i=!0},p(t,e){const i=6&e?Q(o,[2&e&&{params:t[1]},4&e&&X(t[2])]):{};if(l!==(l=t[0])){if(n){U();const t=n;B(t.$$.fragment,1,0,(()=>{tt(t,1)})),V()}l?(n=new l(r()),n.$on("routeEvent",t[6]),K(n.$$.fragment),W(n.$$.fragment,1),Z(n,s.parentNode,s)):n=null}else l&&n.$set(i)},i(t){i||(n&&W(n.$$.fragment,t),i=!0)},o(t){n&&B(n.$$.fragment,t),i=!1},d(t){t&&p(s),n&&tt(n,t)}}}function at(t){let e,n,s,i;const o=[ct,rt],l=[];function r(t,e){return t[1]?0:1}return e=r(t),n=l[e]=o[e](t),{c(){n.c(),s=$()},m(t,n){l[e].m(t,n),d(t,s,n),i=!0},p(t,[i]){let c=e;e=r(t),e===c?l[e].p(t,i):(U(),B(l[c],1,1,(()=>{l[c]=null})),V(),n=l[e],n||(n=l[e]=o[e](t),n.c()),W(n,1),n.m(s.parentNode,s))},i(t){i||(W(n),i=!0)},o(t){B(n),i=!1},d(t){l[e].d(t),t&&p(s)}}}function ut(){const t=window.location.href.indexOf("#/");let e=t>-1?window.location.href.substr(t+1):"/";const n=e.indexOf("?");let s="";return n>-1&&(s=e.substr(n+1),e=e.substr(0,n)),{location:e,querystring:s}}const ft=it(null,(function(t){t(ut());const e=()=>{t(ut())};return window.addEventListener("hashchange",e,!1),function(){window.removeEventListener("hashchange",e,!1)}})),mt=lt(ft,(t=>t.location));lt(ft,(t=>t.querystring));function dt(t,e,n){let{routes:s={}}=e,{prefix:i=""}=e,{restoreScrollState:o=!1}=e;class l{constructor(t,e){if(!e||"function"!=typeof e&&("object"!=typeof e||!0!==e._sveltesparouter))throw Error("Invalid component object");if(!t||"string"==typeof t&&(t.length<1||"/"!=t.charAt(0)&&"*"!=t.charAt(0))||"object"==typeof t&&!(t instanceof RegExp))throw Error('Invalid value for "path" argument');const{pattern:n,keys:s}=function(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var n,s,i,o,l=[],r="",c=t.split("/");for(c[0]||c.shift();i=c.shift();)"*"===(n=i[0])?(l.push("wild"),r+="/(.*)"):":"===n?(s=i.indexOf("?",1),o=i.indexOf(".",1),l.push(i.substring(1,~s?s:~o?o:i.length)),r+=~s&&!~o?"(?:/([^/]+?))?":"/([^/]+?)",~o&&(r+=(~s?"?":"")+"\\"+i.substring(o))):r+="/"+i;return{keys:l,pattern:new RegExp("^"+r+(e?"(?=$|/)":"/?$"),"i")}}(t);this.path=t,"object"==typeof e&&!0===e._sveltesparouter?(this.component=e.component,this.conditions=e.conditions||[],this.userData=e.userData,this.props=e.props||{}):(this.component=()=>Promise.resolve(e),this.conditions=[],this.props={}),this._pattern=n,this._keys=s}match(t){if(i)if("string"==typeof i&&t.startsWith(i))t=t.substr(i.length)||"/";else if(i instanceof RegExp){const e=t.match(i);e&&e[0]&&(t=t.substr(e[0].length)||"/")}const e=this._pattern.exec(t);if(null===e)return null;if(!1===this._keys)return e;const n={};let s=0;for(;s<this._keys.length;){try{n[this._keys[s]]=decodeURIComponent(e[s+1]||"")||null}catch(t){n[this._keys[s]]=null}s++}return n}async checkConditions(t){for(let e=0;e<this.conditions.length;e++)if(!await this.conditions[e](t))return!1;return!0}}const r=[];s instanceof Map?s.forEach(((t,e)=>{r.push(new l(e,t))})):Object.keys(s).forEach((t=>{r.push(new l(t,s[t]))}));let c=null,a=null,u={};const f=_();async function m(t,e){await(P(),T),f(t,e)}let d=null;var p;o&&(window.addEventListener("popstate",(t=>{d=t.state&&t.state.scrollY?t.state:null})),p=()=>{d?window.scrollTo(d.scrollX,d.scrollY):window.scrollTo(0,0)},S().$$.after_update.push(p));let g=null,h=null;return ft.subscribe((async t=>{g=t;let e=0;for(;e<r.length;){const s=r[e].match(t.location);if(!s){e++;continue}const i={route:r[e].path,location:t.location,querystring:t.querystring,userData:r[e].userData};if(!await r[e].checkConditions(i))return n(0,c=null),h=null,void m("conditionsFailed",i);m("routeLoading",Object.assign({},i));const o=r[e].component;if(h!=o){o.loading?(n(0,c=o.loading),h=o,n(1,a=o.loadingParams),n(2,u={}),m("routeLoaded",Object.assign({},i,{component:c,name:c.name}))):(n(0,c=null),h=null);const e=await o();if(t!=g)return;n(0,c=e&&e.default||e),h=o}return s&&"object"==typeof s&&Object.keys(s).length?n(1,a=s):n(1,a=null),n(2,u=r[e].props),void m("routeLoaded",Object.assign({},i,{component:c,name:c.name}))}n(0,c=null),h=null})),t.$$set=t=>{"routes"in t&&n(3,s=t.routes),"prefix"in t&&n(4,i=t.prefix),"restoreScrollState"in t&&n(5,o=t.restoreScrollState)},t.$$.update=()=>{32&t.$$.dirty&&(history.scrollRestoration=o?"manual":"auto")},[c,a,u,s,i,o,function(e){L(t,e)},function(e){L(t,e)}]}class pt extends nt{constructor(t){super(),et(this,t,dt,at,l,{routes:3,prefix:4,restoreScrollState:5})}}function gt(e){let n,s,o,l,r,c,a,u,h,$,y,C,j,E,S,_,L,O,q,N,M,T,I,P,A,H;return{c(){n=g("div"),s=g("div"),o=g("input"),l=v(),r=g("button"),r.textContent="Landing Page",c=v(),a=g("button"),a.textContent="Responsive Styling",u=v(),h=g("button"),h.textContent="Email",$=v(),y=g("button"),y.textContent="Grid",C=v(),j=g("div"),E=g("button"),E.textContent="Mobile - Portrait",S=v(),_=g("button"),_.textContent="Tablet",L=v(),O=g("button"),O.textContent="Desktop",q=v(),N=g("div"),M=g("div"),T=g("iframe"),x(o,"id","page"),x(o,"class","input svelte-kzs5bi"),x(o,"type","text"),x(r,"type","submit"),x(r,"class","button is-info is-long"),x(a,"type","submit"),x(a,"class","button is-info is-long"),x(h,"type","submit"),x(h,"class","button is-info is-long"),x(y,"type","submit"),x(y,"class","button is-info is-long"),x(s,"class","field svelte-kzs5bi"),x(E,"type","submit"),x(E,"class","button is-info is-long"),x(_,"type","submit"),x(_,"class","button is-info is-long"),x(O,"type","submit"),x(O,"class","button is-info is-long"),x(j,"class","buttons svelte-kzs5bi"),T.src!==(I=e[5])&&x(T,"src",I),x(T,"class","frame svelte-kzs5bi"),x(T,"title","desktop"),w(T,"width",e[0]+"px"),w(T,"height",e[2]+"px"),x(M,"class",P=f(e[4])+" svelte-kzs5bi"),w(M,"margin","auto"),w(M,"width",e[1]+"px"),w(M,"height",e[3]+"px"),x(N,"class","tester svelte-kzs5bi")},m(t,i){d(t,n,i),m(n,s),m(s,o),k(o,e[5]),m(s,l),m(s,r),m(s,c),m(s,a),m(s,u),m(s,h),m(s,$),m(s,y),m(n,C),m(n,j),m(j,E),m(j,S),m(j,_),m(j,L),m(j,O),m(n,q),m(n,N),m(N,M),m(M,T),A||(H=[b(o,"input",e[13]),b(r,"click",e[9]),b(a,"click",e[10]),b(h,"click",e[11]),b(y,"click",e[12]),b(E,"click",e[7]),b(_,"click",e[8]),b(O,"click",e[6])],A=!0)},p(t,[e]){32&e&&o.value!==t[5]&&k(o,t[5]),32&e&&T.src!==(I=t[5])&&x(T,"src",I),1&e&&w(T,"width",t[0]+"px"),4&e&&w(T,"height",t[2]+"px"),16&e&&P!==(P=f(t[4])+" svelte-kzs5bi")&&x(M,"class",P),2&e&&w(M,"width",t[1]+"px"),8&e&&w(M,"height",t[3]+"px")},i:t,o:t,d(t){t&&p(n),A=!1,i(H)}}}function ht(t,e,n){let s=370,i=s+30,o=720,l=o+210,r="portrait",c="/plain/media.html";return[s,i,o,l,r,c,function(){n(0,s=1510),n(1,i=s),n(2,o=850),n(3,l=o),n(4,r="desktop")},function(){n(0,s=370),n(1,i=s+30),n(2,o=720),n(3,l=o+210),n(4,r="portrait")},function(){n(0,s=768),n(1,i=s),n(2,o=850),n(3,l=o),n(4,r="tablet")},function(){n(5,c="/")},function(){n(5,c="/plain/media.html")},function(){n(5,c="/email.html")},function(){n(5,c="/#/grid")},function(){c=this.value,n(5,c)}]}class vt extends nt{constructor(t){super(),et(this,t,ht,gt,l,{})}}function $t(e){let n,s,i,o,l,r,c,a,u,f,$,b,k,w;return{c(){n=g("div"),s=g("div"),i=g("figure"),o=g("img"),r=v(),c=g("div"),a=g("div"),u=g("div"),f=g("p"),$=h(e[1]),b=v(),k=g("div"),w=h(e[2]),o.src!==(l=e[0])&&x(o,"src",l),x(o,"alt",e[1]),x(i,"class","image is-4by3"),x(s,"class","card-image"),x(f,"class","title is-4 svelte-honqdq"),x(u,"class","media-content"),x(a,"class","media"),x(k,"class","content"),x(c,"class","card-content"),x(n,"class","card svelte-honqdq")},m(t,e){d(t,n,e),m(n,s),m(s,i),m(i,o),m(n,r),m(n,c),m(c,a),m(a,u),m(u,f),m(f,$),m(c,b),m(c,k),m(k,w)},p(t,[e]){1&e&&o.src!==(l=t[0])&&x(o,"src",l),2&e&&x(o,"alt",t[1]),2&e&&y($,t[1]),4&e&&y(w,t[2])},i:t,o:t,d(t){t&&p(n)}}}function bt(t,e,n){let{img:s}=e,{title:i}=e,{desc:o}=e;return t.$$set=t=>{"img"in t&&n(0,s=t.img),"title"in t&&n(1,i=t.title),"desc"in t&&n(2,o=t.desc)},[s,i,o]}class xt extends nt{constructor(t){super(),et(this,t,bt,$t,l,{img:0,title:1,desc:2})}}function yt(e){let n,s,i,o,l,r,c,a,u,f,h,$,b,y,k,w,C,j;return h=new xt({props:{title:"Netflix Surfing",img:"/img/surf.png",desc:"What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix."}}),k=new xt({props:{title:"Election Mart",img:"/img/votenow.jpg",desc:"Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like."}}),{c(){n=g("div"),n.innerHTML='<div class="column is-2 is-success avatar svelte-ek7nr5"><figure class="image is-128x128" style="margin:auto"><img class="is-rounded" alt="Juston Points" src="/img/juston-hello.png"/></figure></div> \n        <div class="column is-two-third header svelte-ek7nr5"><div class="container" style="margin:auto;text-align:center"><h1 class="title">Juston Points</h1> \n            <div class="subtitle">A person</div></div></div>',s=v(),i=g("section"),i.innerHTML="<p>Hello, my name is Juston. I do not know what to say here, because I like letting my actions to do the talking. However, if I need to say something to get your attention, then I am awesome.</p> \n        <hr/> \n        <p>I enjoy projects where I can make an ineffcient task more effcient, and help the user acheive thier goal.</p>",o=v(),l=g("div"),r=g("div"),r.innerHTML='<div class="column is-10"><h2 class="title column">Sample Projects</h2></div> \n            <div class="column"><a href="#/prototypes" class="button svelte-ek7nr5" title="go to projects">View More Projects</a></div>',c=v(),a=g("div"),u=g("div"),f=g("a"),K(h.$$.fragment),$=v(),b=g("div"),y=g("a"),K(k.$$.fragment),w=v(),C=g("section"),C.innerHTML='<div class="container"><h3 class="svelte-ek7nr5">Quality Assurance</h3> \n        <div class="skills svelte-ek7nr5"><span class="tag svelte-ek7nr5">Test Cases</span> \n                <span class="tag svelte-ek7nr5">Selenium</span> \n                <span class="tag svelte-ek7nr5">Puppeteer</span> \n                <span class="tag svelte-ek7nr5">Cucumber</span> \n                <span class="tag svelte-ek7nr5">Jira</span></div> \n        <h3 class="svelte-ek7nr5">User Experience</h3> \n         <div class="skills svelte-ek7nr5"><span class="tag svelte-ek7nr5">Cognitive Psychology</span> \n                <span class="tag svelte-ek7nr5">Axure</span> \n                <span class="tag svelte-ek7nr5">Wireframes</span> \n                <span class="tag svelte-ek7nr5">Mockups</span> \n                <span class="tag svelte-ek7nr5">Research Methods</span></div> \n        <h3 class="svelte-ek7nr5">User Interface</h3> \n        <div class="skills svelte-ek7nr5"><span class="tag svelte-ek7nr5">HTML</span> \n                <span class="tag svelte-ek7nr5">CSS</span> \n                <span class="tag svelte-ek7nr5">Javascript</span> \n                <span class="tag svelte-ek7nr5">Svelete</span> \n                <span class="tag svelte-ek7nr5">Feathers</span> \n                <span class="tag svelte-ek7nr5">A-Frame</span></div> \n            <h3 class="svelte-ek7nr5">Backend</h3> \n            <div class="skills svelte-ek7nr5"><span class="tag svelte-ek7nr5">Node JS</span> \n                    <span class="tag svelte-ek7nr5">Loopback</span> \n                    <span class="tag svelte-ek7nr5">Sails</span> \n                    <span class="tag svelte-ek7nr5">Loopback</span> \n                    <span class="tag svelte-ek7nr5">Feathers</span></div></div>',x(n,"class","columns is-primary top svelte-ek7nr5"),x(i,"class","section svelte-ek7nr5"),x(r,"class","columns"),x(f,"href","https://rdwkn5.axshare.com/"),x(f,"target","_blank"),x(f,"desc","Open Netflix project"),x(u,"class","column is-half is-centered"),x(y,"href","https://q23yz8.axshare.com/"),x(y,"target","_blank"),x(y,"title","open election mart project"),x(b,"class","column is-half"),x(a,"class","columns is-multiline is-centered"),x(l,"class","section svelte-ek7nr5"),x(C,"class","section skill svelte-ek7nr5")},m(t,e){d(t,n,e),d(t,s,e),d(t,i,e),d(t,o,e),d(t,l,e),m(l,r),m(l,c),m(l,a),m(a,u),m(u,f),Z(h,f,null),m(a,$),m(a,b),m(b,y),Z(k,y,null),d(t,w,e),d(t,C,e),j=!0},p:t,i(t){j||(W(h.$$.fragment,t),W(k.$$.fragment,t),j=!0)},o(t){B(h.$$.fragment,t),B(k.$$.fragment,t),j=!1},d(t){t&&p(n),t&&p(s),t&&p(i),t&&p(o),t&&p(l),tt(h),tt(k),t&&p(w),t&&p(C)}}}class kt extends nt{constructor(t){super(),et(this,t,null,yt,l,{})}}function wt(e){let n,s,i,o,l,r,c,a,u,f,$,b=function(t){let e=0,n=0,s=0;4==t.length?(e="0x"+t[1]+t[1],n="0x"+t[2]+t[2],s="0x"+t[3]+t[3]):7==t.length&&(e="0x"+t[1]+t[2],n="0x"+t[3]+t[4],s="0x"+t[5]+t[6]);return"rgb("+ +e+","+ +n+","+ +s+")"}(e[0])+"";return{c(){n=g("div"),s=h(e[2]),i=v(),o=g("br"),l=h("\r\n        HEX : "),r=h(e[0]),c=v(),a=g("br"),u=v(),f=h(b),x(n,"class",$="color "+e[1]+" svelte-txruxf"),w(n,"background-color",e[0])},m(t,e){d(t,n,e),m(n,s),m(n,i),m(n,o),m(n,l),m(n,r),m(n,c),m(n,a),m(n,u),m(n,f)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Ct(t,n,s){let i=n.color||"grey",o="light"===n.text?"light":"dark",l=n.title||"";return t.$$set=t=>{s(3,n=e(e({},n),u(t)))},n=u(n),[i,o,l]}class jt extends nt{constructor(t){super(),et(this,t,Ct,wt,l,{})}}function Et(e){let n,s,i;return{c(){n=g("div"),s=h("JUSTON"),x(n,"class",i=f(e[0])+" svelte-fszxdf")},m(t,e){d(t,n,e),m(n,s)},p:t,i:t,o:t,d(t){t&&p(n)}}}function St(t,n,s){let i=n.type||"dark";return t.$$set=t=>{s(1,n=e(e({},n),u(t)))},n=u(n),[i]}class _t extends nt{constructor(t){super(),et(this,t,St,Et,l,{})}}function Lt(e){let n,s,i,o,l,r;return{c(){n=g("div"),s=g("figure"),i=g("img"),x(i,"class",o=f(e[0])+" svelte-yn2579"),x(i,"alt","Juston Points"),i.src!==(l="/img/juston-hello.png")&&x(i,"src","/img/juston-hello.png"),x(s,"class","image"),w(s,"margin","auto"),x(n,"class","column is-2 is-success avatar dark svelte-yn2579"),x(n,"style",r=e[1].style)},m(t,e){d(t,n,e),m(n,s),m(s,i)},p(t,[e]){2&e&&r!==(r=t[1].style)&&x(n,"style",r)},i:t,o:t,d(t){t&&p(n)}}}function Ot(t,n,s){let i="round"===(n.type||"round")?"is-rounded":null;return t.$$set=t=>{s(1,n=e(e({},n),u(t)))},[i,n=u(n)]}class qt extends nt{constructor(t){super(),et(this,t,Ot,Lt,l,{})}}function Nt(e){let n,s,i;return{c(){n=g("div"),s=h("the quick brown fox jumps over the lazy dog\r\n    THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\r\n    1234567890 !@#$%^&*"),x(n,"class",i=f(e[0])+" svelte-13znilp")},m(t,e){d(t,n,e),m(n,s)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Mt(t,n,s){let i=n.type||"dark";return t.$$set=t=>{s(1,n=e(e({},n),u(t)))},n=u(n),[i]}class Tt extends nt{constructor(t){super(),et(this,t,Mt,Nt,l,{})}}function It(e){let n,s,i,o,l,r,c,a,u,f,h,$,b,y,k,w,C,j,E,S,_,L,O,q,N,M,T,I,P,A,H,z,R,D,J,F,G,U,V,Q,X,Y,et,nt,st,it,ot,lt,rt,ct,at;return a=new _t({}),h=new _t({props:{type:"light"}}),C=new jt({props:{class:"column",color:"#325050",text:"light",title:"Dark Slate"}}),S=new jt({props:{class:"column",color:"#c8e6e6",text:"dark",title:"Slate"}}),O=new jt({props:{class:"column",color:"#f5ffff",text:"dark",title:"Light Slate"}}),M=new jt({props:{class:"column",color:"#b45032",text:"light",title:"Dark Orange"}}),P=new jt({props:{class:"column",color:"#dc8264",text:"dark",title:"Medium Orange"}}),z=new jt({props:{class:"column",color:"#fffafa",text:"dark",title:"Light Orange"}}),Q=new qt({}),et=new qt({props:{type:"square"}}),lt=new Tt({}),ct=new Tt({props:{type:"light"}}),{c(){n=g("section"),s=g("h1"),s.textContent="Style Guide",i=v(),o=g("h2"),o.textContent="Logo",l=v(),r=g("div"),c=g("div"),K(a.$$.fragment),u=v(),f=g("div"),K(h.$$.fragment),$=v(),b=g("h2"),b.textContent="Primary Color Palette",y=v(),k=g("div"),w=g("div"),K(C.$$.fragment),j=v(),E=g("div"),K(S.$$.fragment),_=v(),L=g("div"),K(O.$$.fragment),q=v(),N=g("div"),K(M.$$.fragment),T=v(),I=g("div"),K(P.$$.fragment),A=v(),H=g("div"),K(z.$$.fragment),R=v(),D=g("h2"),D.textContent="Brand Guide",J=v(),F=g("h3"),F.textContent="Avatar",G=v(),U=g("div"),V=g("div"),K(Q.$$.fragment),X=v(),Y=g("div"),K(et.$$.fragment),nt=v(),st=g("h2"),st.textContent="Font: Verdana, Geneva, sans-serif",it=v(),ot=g("div"),K(lt.$$.fragment),rt=v(),K(ct.$$.fragment),x(s,"class","title svelte-wthmi7"),x(o,"class","title"),x(c,"class","column is-full"),x(f,"class","column is-full"),x(r,"class","columns is-vcentered is-multiline"),x(b,"class","title"),x(w,"class","column is-one-third"),x(E,"class","column is-one-third"),x(L,"class","column is-one-third"),x(N,"class","column is-one-third"),x(I,"class","column is-one-third"),x(H,"class","column is-one-third"),x(k,"class","columns is-multiline"),x(D,"class","title"),x(F,"class","title"),x(V,"class","column"),x(Y,"class","column"),x(U,"class","columns is-multiline"),x(st,"class","title"),x(ot,"class","container"),x(n,"class","section")},m(t,e){d(t,n,e),m(n,s),m(n,i),m(n,o),m(n,l),m(n,r),m(r,c),Z(a,c,null),m(r,u),m(r,f),Z(h,f,null),m(n,$),m(n,b),m(n,y),m(n,k),m(k,w),Z(C,w,null),m(k,j),m(k,E),Z(S,E,null),m(k,_),m(k,L),Z(O,L,null),m(k,q),m(k,N),Z(M,N,null),m(k,T),m(k,I),Z(P,I,null),m(k,A),m(k,H),Z(z,H,null),m(n,R),m(n,D),m(n,J),m(n,F),m(n,G),m(n,U),m(U,V),Z(Q,V,null),m(U,X),m(U,Y),Z(et,Y,null),m(n,nt),m(n,st),m(n,it),m(n,ot),Z(lt,ot,null),m(ot,rt),Z(ct,ot,null),at=!0},p:t,i(t){at||(W(a.$$.fragment,t),W(h.$$.fragment,t),W(C.$$.fragment,t),W(S.$$.fragment,t),W(O.$$.fragment,t),W(M.$$.fragment,t),W(P.$$.fragment,t),W(z.$$.fragment,t),W(Q.$$.fragment,t),W(et.$$.fragment,t),W(lt.$$.fragment,t),W(ct.$$.fragment,t),at=!0)},o(t){B(a.$$.fragment,t),B(h.$$.fragment,t),B(C.$$.fragment,t),B(S.$$.fragment,t),B(O.$$.fragment,t),B(M.$$.fragment,t),B(P.$$.fragment,t),B(z.$$.fragment,t),B(Q.$$.fragment,t),B(et.$$.fragment,t),B(lt.$$.fragment,t),B(ct.$$.fragment,t),at=!1},d(t){t&&p(n),tt(a),tt(h),tt(C),tt(S),tt(O),tt(M),tt(P),tt(z),tt(Q),tt(et),tt(lt),tt(ct)}}}class Pt extends nt{constructor(t){super(),et(this,t,null,It,l,{})}}function At(e){let n,s,i,o,l,r,c,a,u,f,h,$,b,y,k,C,j,E,S,_,L,O;return u=new _t({}),b=new _t({props:{type:"light"}}),S=new qt({props:{style:"margin:auto"}}),{c(){n=g("h1"),n.textContent="Style Scape",s=v(),i=g("div"),o=g("div"),l=g("div"),r=g("div"),r.innerHTML='<figure style="width:500px;margin:auto;box-shadow: 15px 18px 10px #2f4f4f;" class="image"><img src="/img/debugsession.png" alt="code"/></figure>',c=v(),a=g("div"),K(u.$$.fragment),f=v(),h=g("br"),$=v(),K(b.$$.fragment),y=v(),k=g("div"),k.innerHTML='<div class="section svelte-1fkyjo2" style="background-color:#b45032;color:#fff"><div style="background-color:#fffafa;color:#000;margin-top:20px;padding:10px;width:100%">Nulla facilisi. Donec laoreet aliquet gravida. Quisque mauris quam, lacinia nec convallis in, egestas et arcu. Fusce at nisl ac odio porta viverra. Etiam quis lacinia ex, sed placerat velit. Phasellus ullamcorper nisl a magna scelerisque, ut fringilla ligula posuere. Morbi convallis enim eu dignissim tempus. Pellentesque a faucibus velit, suscipit gravida metus. Sed pharetra sit amet magna luctus mollis. Ut eleifend facilisis posuere. Nulla tristique fringilla elit, nec aliquet mauris consequat sit amet. Vivamus elementum luctus arcu eu semper. Pellentesque imperdiet, ex sed vestibulum ornare, sapien mi pretium odio, a convallis nisi metus ut erat.</div></div> \n        <div class="section svelte-1fkyjo2" style="background-color:#f5ffff"><div class="columns is-mobile is-gapless is-multiline"><div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/octocat.png" alt="github"/></figure></div> \n                <div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/svelte.png" alt="svelte"/></figure></div> \n                 <div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/html.png" alt="html"/></figure></div> \n                <div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/node.png" alt="node"/></figure></div> \n                <div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/react.png" alt="node"/></figure></div> \n                 <div class="column"><figure style="width:100px;margin:20px;" class="image"><img src="/img/axure.png" alt="node"/></figure></div></div></div>',C=v(),j=g("div"),E=g("div"),K(S.$$.fragment),_=v(),L=g("div"),L.innerHTML='<figure style="width:600px;margin:auto;box-shadow: 2px 3px 12px #000;" class="image"><img src="/img/screenshot.jpg" alt="old tools"/></figure>',x(n,"class","title"),x(r,"class","section svelte-1fkyjo2"),w(r,"background-color","#c8e6e6"),x(a,"class","section svelte-1fkyjo2"),w(a,"background-color","#dc8264"),x(l,"class","column"),x(k,"class","column"),x(E,"class","section svelte-1fkyjo2"),w(E,"background-color","#fffafa"),x(L,"class","section svelte-1fkyjo2"),w(L,"background-color","#325050"),w(L,"color","#fff"),x(j,"class","column"),x(o,"class","columns is-mobile is-gapless content"),x(i,"class","stylescape svelte-1fkyjo2")},m(t,e){d(t,n,e),d(t,s,e),d(t,i,e),m(i,o),m(o,l),m(l,r),m(l,c),m(l,a),Z(u,a,null),m(a,f),m(a,h),m(a,$),Z(b,a,null),m(o,y),m(o,k),m(o,C),m(o,j),m(j,E),Z(S,E,null),m(j,_),m(j,L),O=!0},p:t,i(t){O||(W(u.$$.fragment,t),W(b.$$.fragment,t),W(S.$$.fragment,t),O=!0)},o(t){B(u.$$.fragment,t),B(b.$$.fragment,t),B(S.$$.fragment,t),O=!1},d(t){t&&p(n),t&&p(s),t&&p(i),tt(u),tt(b),tt(S)}}}class Ht extends nt{constructor(t){super(),et(this,t,null,At,l,{})}}function zt(e){let n;return{c(){n=g("h1"),n.textContent="Settings",x(n,"class","title svelte-1cy1co8")},m(t,e){d(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class Rt extends nt{constructor(t){super(),et(this,t,null,zt,l,{})}}function Dt(e){let n;return{c(){n=g("h1"),n.textContent="Skills",x(n,"class","title svelte-t03rb6")},m(t,e){d(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class Jt extends nt{constructor(t){super(),et(this,t,null,Dt,l,{})}}function Ft(e){let n,s,i,o,l,r,c,a,u,f,h,$,b,y,k,w;return c=new xt({props:{title:"Netflix Surfing",img:"/img/surf.png",desc:"What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix."}}),h=new xt({props:{title:"Election Mart",img:"/img/votenow.jpg",desc:"Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like."}}),k=new xt({props:{title:"Cook Order",img:"/img/cook.jpg",desc:"What if a user could search for recipes, and order the ingredients at the touch of a button."}}),{c(){n=g("h1"),n.textContent="Projects",s=v(),i=g("div"),o=g("div"),l=g("div"),r=g("a"),K(c.$$.fragment),a=v(),u=g("div"),f=g("a"),K(h.$$.fragment),$=v(),b=g("div"),y=g("a"),K(k.$$.fragment),x(n,"class","title svelte-11ppaqw"),x(r,"href","https://rdwkn5.axshare.com/"),x(r,"target","_blank"),x(r,"desc","Open Netflix project"),x(l,"class","column is-one-third is-centered"),x(f,"href","https://q23yz8.axshare.com/"),x(f,"target","_blank"),x(f,"title","open election mart project"),x(u,"class","column is-one-third"),x(y,"href","https://ahiwt4.axshare.com/#id=8bnb1m&p=home"),x(y,"target","_blank"),x(y,"title","open cook order tab"),x(b,"class","column is-one-third"),x(o,"class","columns is-multiline is-centered"),x(i,"class","section")},m(t,e){d(t,n,e),d(t,s,e),d(t,i,e),m(i,o),m(o,l),m(l,r),Z(c,r,null),m(o,a),m(o,u),m(u,f),Z(h,f,null),m(o,$),m(o,b),m(b,y),Z(k,y,null),w=!0},p:t,i(t){w||(W(c.$$.fragment,t),W(h.$$.fragment,t),W(k.$$.fragment,t),w=!0)},o(t){B(c.$$.fragment,t),B(h.$$.fragment,t),B(k.$$.fragment,t),w=!1},d(t){t&&p(n),t&&p(s),t&&p(i),tt(c),tt(h),tt(k)}}}class Gt extends nt{constructor(t){super(),et(this,t,null,Ft,l,{})}}function Ut(t){let e,n,s;const i=t[5].default,o=function(t,e,n,s){if(t){const i=c(t,e,n,s);return t[0](i)}}(i,t,t[4],null);return{c(){e=g("div"),o&&o.c(),x(e,"style",n="color:#fff;"+t[1]+";"+t[0]+";"),x(e,"class","item svelte-1irqmhc")},m(t,n){d(t,e,n),o&&o.m(e,null),s=!0},p(t,[l]){o&&o.p&&16&l&&a(o,i,t,t[4],l,null,null),(!s||3&l&&n!==(n="color:#fff;"+t[1]+";"+t[0]+";"))&&x(e,"style",n)},i(t){s||(W(o,t),s=!0)},o(t){B(o,t),s=!1},d(t){t&&p(e),o&&o.d(t)}}}function Vt(t,e,n){let{$$slots:s={},$$scope:i}=e,{column:o}=e,{row:l}=e,r="",c="";return t.$$set=t=>{"column"in t&&n(2,o=t.column),"row"in t&&n(3,l=t.row),"$$scope"in t&&n(4,i=t.$$scope)},t.$$.update=()=>{8&t.$$.dirty&&n(0,r=0==l||null==l?"":`grid-row:${l};`),t.$$.dirty,4&t.$$.dirty&&n(1,c=0==o||null==o?"":`grid-column:${o};`)},[r,c,o,l,i,s]}class Wt extends nt{constructor(t){super(),et(this,t,Vt,Ut,l,{column:2,row:3})}}function Bt(t,e,n){const s=t.slice();return s[13]=e[n],s[14]=e,s[15]=n,s}function Qt(t){let e,n,s,o,l,r,c,a,u,f,$,w,C,j,E,S,_,L,O,q,N,M,T,I,P,A=t[13].name+"";function H(){t[7].call(w,t[14],t[15])}function z(){t[8].call(S,t[14],t[15])}function R(...e){return t[9](t[15],...e)}return{c(){e=g("p"),n=h(A),s=h(" ("),o=h(t[15]),l=h(")"),r=v(),c=g("br"),a=v(),u=g("div"),f=g("label"),f.textContent="Column",$=v(),w=g("input"),C=v(),j=g("label"),j.textContent="Row",E=v(),S=g("input"),_=v(),L=g("button"),L.textContent="Remove",O=v(),q=g("hr"),N=v(),M=g("div"),M.textContent="Duis bibendum, velit interdum laoreet bibendum, arcu lorem placerat ante, eget venenatis orci justo et dolor. Suspendisse risus libero, bibendum vitae hendrerit eget, vehicula eget lacus. Sed a nunc massa. Mauris enim arcu, molestie in arcu nec, vestibulum pulvinar augue. Nunc efficitur lorem ut ante luctus mattis. Integer finibus imperdiet molestie. Suspendisse viverra neque sit amet tortor dictum rhoncus. In",T=v(),x(f,"for","column2"),x(w,"id","column2"),x(w,"type","text"),x(w,"class","svelte-1155uys"),x(j,"for","row2"),x(S,"id","row2"),x(S,"type","text"),x(S,"class","svelte-1155uys")},m(i,p){d(i,e,p),m(e,n),m(e,s),m(e,o),m(e,l),d(i,r,p),d(i,c,p),d(i,a,p),d(i,u,p),m(u,f),m(u,$),m(u,w),k(w,t[13].column),m(u,C),m(u,j),m(u,E),m(u,S),k(S,t[13].row),m(u,_),m(u,L),d(i,O,p),d(i,q,p),d(i,N,p),d(i,M,p),d(i,T,p),I||(P=[b(w,"input",H),b(S,"input",z),b(L,"click",R)],I=!0)},p(e,s){t=e,2&s&&A!==(A=t[13].name+"")&&y(n,A),2&s&&w.value!==t[13].column&&k(w,t[13].column),2&s&&S.value!==t[13].row&&k(S,t[13].row)},d(t){t&&p(e),t&&p(r),t&&p(c),t&&p(a),t&&p(u),t&&p(O),t&&p(q),t&&p(N),t&&p(M),t&&p(T),I=!1,i(P)}}}function Xt(t){let e,n,s,i;function o(e){t[10].call(null,e,t[13])}function l(e){t[11].call(null,e,t[13])}let r={$$slots:{default:[Qt]},$$scope:{ctx:t}};return void 0!==t[13].column&&(r.column=t[13].column),void 0!==t[13].row&&(r.row=t[13].row),e=new Wt({props:r}),q.push((()=>Y(e,"column",o))),q.push((()=>Y(e,"row",l))),{c(){K(e.$$.fragment)},m(t,n){Z(e,t,n),i=!0},p(i,o){t=i;const l={};65538&o&&(l.$$scope={dirty:o,ctx:t}),!n&&2&o&&(n=!0,l.column=t[13].column,H((()=>n=!1))),!s&&2&o&&(s=!0,l.row=t[13].row,H((()=>s=!1))),e.$set(l)},i(t){i||(W(e.$$.fragment,t),i=!0)},o(t){B(e.$$.fragment,t),i=!1},d(t){tt(e,t)}}}function Yt(t){let e,n,s,o,l,r,c,a,u,f,h,$,y,C,j,E,S,_,L,O=t[1],q=[];for(let e=0;e<O.length;e+=1)q[e]=Xt(Bt(t,O,e));const N=t=>B(q[t],1,1,(()=>{q[t]=null}));return{c(){e=g("div"),n=g("label"),n.textContent="Name",s=v(),o=g("input"),l=v(),r=g("label"),r.textContent="Column",c=v(),a=g("input"),u=v(),f=g("label"),f.textContent="Row",h=v(),$=g("input"),y=v(),C=g("button"),C.textContent="Add Grid Item",j=v(),E=g("div");for(let t=0;t<q.length;t+=1)q[t].c();x(n,"for","name"),x(o,"id","name"),w(o,"width","200px"),x(o,"type","text"),x(o,"class","svelte-1155uys"),x(r,"for","column"),x(a,"id","column"),x(a,"type","text"),x(a,"class","svelte-1155uys"),x(f,"for","row"),x($,"id","row"),x($,"type","text"),x($,"class","svelte-1155uys"),x(e,"class","form svelte-1155uys"),x(E,"class","wrapper svelte-1155uys")},m(i,p){d(i,e,p),m(e,n),m(e,s),m(e,o),k(o,t[0].name),m(e,l),m(e,r),m(e,c),m(e,a),k(a,t[0].column),m(e,u),m(e,f),m(e,h),m(e,$),k($,t[0].row),m(e,y),m(e,C),d(i,j,p),d(i,E,p);for(let t=0;t<q.length;t+=1)q[t].m(E,null);S=!0,_||(L=[b(o,"input",t[4]),b(a,"input",t[5]),b($,"input",t[6]),b(C,"click",t[2])],_=!0)},p(t,[e]){if(1&e&&o.value!==t[0].name&&k(o,t[0].name),1&e&&a.value!==t[0].column&&k(a,t[0].column),1&e&&$.value!==t[0].row&&k($,t[0].row),10&e){let n;for(O=t[1],n=0;n<O.length;n+=1){const s=Bt(t,O,n);q[n]?(q[n].p(s,e),W(q[n],1)):(q[n]=Xt(s),q[n].c(),W(q[n],1),q[n].m(E,null))}for(U(),n=O.length;n<q.length;n+=1)N(n);V()}},i(t){if(!S){for(let t=0;t<O.length;t+=1)W(q[t]);S=!0}},o(t){q=q.filter(Boolean);for(let t=0;t<q.length;t+=1)B(q[t]);S=!1},d(t){t&&p(e),t&&p(j),t&&p(E),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(q,t),_=!1,i(L)}}}function Kt(t,e,n){let s={},i=[{name:"Header",column:"1/-1",row:""},{name:"Navigation",column:"1",row:"10/19"},{name:"Main Content",column:"2/-1",row:"2/19"},{name:"Highlights",column:"1",row:"2/5"},{name:"Footer",column:"1/-1",row:"20"}];function o(t){n(1,i=[...i.filter(((e,n)=>(console.log(n),n!==t)))])}return[s,i,function(t){i.push(s),n(1,i),n(0,s={})},o,function(){s.name=this.value,n(0,s)},function(){s.column=this.value,n(0,s)},function(){s.row=this.value,n(0,s)},function(t,e){t[e].column=this.value,n(1,i)},function(t,e){t[e].row=this.value,n(1,i)},(t,e)=>o(t),function(t,e){e.column=t,n(1,i)},function(t,e){e.row=t,n(1,i)}]}class Zt extends nt{constructor(t){super(),et(this,t,Kt,Yt,l,{})}}function te(e){let n,s;return n=new pt({props:{routes:e[0]}}),{c(){K(n.$$.fragment)},m(t,e){Z(n,t,e),s=!0},p:t,i(t){s||(W(n.$$.fragment,t),s=!0)},o(t){B(n.$$.fragment,t),s=!1},d(t){tt(n,t)}}}function ee(t){return[{"/sizetester":vt,"/landing":kt,"/styles":Pt,"/stylescape":Ht,"/settings":Rt,"/skills":Jt,"/prototypes":Gt,"/grid":Zt,"*":kt}]}class ne extends nt{constructor(t){super(),et(this,t,ee,te,l,{})}}function se(e){let n;return{c(){n=g("nav"),n.innerHTML='<div class="navbar-brand"><a class="navbar-item" href="/">JUSTON</a> \n    <a class="navbar-item" target="_blank" href="https://www.linkedin.com/in/juston-points-01828630">LinkedIn</a> \n          <a class="navbar-item" target="_blank" href="https://github.com/justonpoints">Github</a> \n          <hr class="navbar-divider"/> \n          <a class="navbar-item" href="mailto:justonpoints@gmail.com">Email</a></div>',x(n,"class","columns navbar is-primary top"),x(n,"role","navigation"),x(n,"aria-label","main navigation")},m(t,e){d(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class ie extends nt{constructor(t){super(),et(this,t,null,se,l,{})}}function oe(e){let n,s,o,l,r,c,a,u,f,$,k,w,j,E,S,_,L,O,q,N,M,T,I,P,A,H;return{c(){n=g("div"),s=h(e[1]),l=v(),r=g("div"),c=g("menu"),a=g("a"),a.textContent="Home",u=v(),f=g("a"),f.textContent="Projects",$=v(),k=g("a"),k.textContent="Style",w=v(),j=g("a"),j.textContent="Grid",E=v(),S=g("a"),S.textContent="Mobile Tester",_=v(),L=g("a"),L.textContent="Skills",O=v(),q=g("div"),N=h("Switch "),M=h(e[2]),T=v(),I=g("div"),I.textContent="Close",x(n,"class",o="floating-btn "+e[0]+" "+e[2]+" svelte-1psi10s"),x(a,"href","#/home"),x(a,"class","menu-item svelte-1psi10s"),C(a,"current","/home"===e[3]||"/"===e[3]),x(f,"href","#/prototypes"),x(f,"class","menu-item svelte-1psi10s"),C(f,"current","/prototypes"===e[3]),x(k,"href","#/styles"),x(k,"class","menu-item svelte-1psi10s"),C(k,"current","/styles"===e[3]),x(j,"href","#/grid"),x(j,"class","menu-item svelte-1psi10s"),C(j,"current","/grid"===e[3]),x(S,"href","#/sizetester"),x(S,"class","menu-item svelte-1psi10s"),C(S,"current","/sizetester"===e[3]),x(L,"href","#/skills"),x(L,"class","menu-item svelte-1psi10s"),C(L,"current","/skills"===e[3]),x(q,"class","menu-item svelte-1psi10s"),x(I,"class","menu-item close svelte-1psi10s"),x(c,"class","items-wrapper svelte-1psi10s"),x(r,"class",P="circular-menu "+e[0]+" "+e[2]+" svelte-1psi10s")},m(t,i){d(t,n,i),m(n,s),d(t,l,i),d(t,r,i),m(r,c),m(c,a),m(c,u),m(c,f),m(c,$),m(c,k),m(c,w),m(c,j),m(c,E),m(c,S),m(c,_),m(c,L),m(c,O),m(c,q),m(q,N),m(q,M),m(c,T),m(c,I),A||(H=[b(n,"click",e[4]),b(a,"click",e[4]),b(f,"click",e[4]),b(k,"click",e[4]),b(j,"click",e[4]),b(S,"click",e[4]),b(L,"click",e[4]),b(q,"click",e[5]),b(I,"click",e[4])],A=!0)},p(t,[e]){2&e&&y(s,t[1]),5&e&&o!==(o="floating-btn "+t[0]+" "+t[2]+" svelte-1psi10s")&&x(n,"class",o),8&e&&C(a,"current","/home"===t[3]||"/"===t[3]),8&e&&C(f,"current","/prototypes"===t[3]),8&e&&C(k,"current","/styles"===t[3]),8&e&&C(j,"current","/grid"===t[3]),8&e&&C(S,"current","/sizetester"===t[3]),8&e&&C(L,"current","/skills"===t[3]),4&e&&y(M,t[2]),5&e&&P!==(P="circular-menu "+t[0]+" "+t[2]+" svelte-1psi10s")&&x(r,"class",P)},i:t,o:t,d(t){t&&p(n),t&&p(l),t&&p(r),A=!1,i(H)}}}function le(t,e,n){let s;var i,o;i=mt,o=t=>n(6,s=t),t.$$.on_destroy.push(r(i,o));let l="",c="NAVIGATION HERE",a="right",u=s;return t.$$.update=()=>{64&t.$$.dirty&&n(3,u=s)},[l,c,a,u,function(){"active"===l?(n(0,l=""),n(1,c="MENU")):(n(0,l="active"),n(1,c="CLOSE"))},function(){n(2,a="left"===a?"right":"left")}]}class re extends nt{constructor(t){super(),et(this,t,le,oe,l,{})}}function ce(e){let n,s,i,o,l,r,c;return n=new re({}),i=new ie({}),r=new ne({}),{c(){K(n.$$.fragment),s=v(),K(i.$$.fragment),o=v(),l=g("main"),K(r.$$.fragment)},m(t,e){Z(n,t,e),d(t,s,e),Z(i,t,e),d(t,o,e),d(t,l,e),Z(r,l,null),c=!0},p:t,i(t){c||(W(n.$$.fragment,t),W(i.$$.fragment,t),W(r.$$.fragment,t),c=!0)},o(t){B(n.$$.fragment,t),B(i.$$.fragment,t),B(r.$$.fragment,t),c=!1},d(t){tt(n,t),t&&p(s),tt(i,t),t&&p(o),t&&p(l),tt(r)}}}return new class extends nt{constructor(t){super(),et(this,t,null,ce,l,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map

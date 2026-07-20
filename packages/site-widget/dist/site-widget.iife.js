var GranitSiteWidget=(function(H){"use strict";const Pt=[{label:"Нужен расчет",text:"Нужен расчет памятника с установкой"},{label:"Есть вопрос",text:"Здравствуйте, у меня есть вопрос по заказу"},{label:"Хочу каталог",text:"Хочу посмотреть каталог памятников"}],Ct=[{type:"call",label:"Позвонить",href:"tel:",icon:"phone"},{type:"open",label:"Написать",icon:"message"},{type:"prefill",label:"Расчет",text:"Нужен расчет памятника",icon:"calculator"}],Rt=15e3+5e3+1,L={apiBaseUrl:"",messagesPath:"/public/intake/site-widget/messages",timeoutMs:25e3,widgetInstanceId:"default",theme:"memorial-soft",position:"bottom-right",panelSize:"normal",mock:!1,initialState:"closed",persistOpenState:!1,storage:"local",quickReplySubmit:"prefill",showQuickActions:!0,showMobileActions:!0,showAttachmentSlot:!0,attachmentsEnabled:!1,collectPhoneAfterFirstMessage:!1,includeMessageTextInEvents:!1,maxMessageLength:1e3,launcherLabel:"Написать",headerTitle:"Поможем с заказом",headerStatus:"Онлайн",headerResponseTime:"обычно отвечаем за 2 минуты",introMessage:`Здравствуйте! 👋
Подскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.`,placeholder:"Напишите сообщение...",disclosureText:"Автоответ. Менеджер проверит детали и подтвердит условия.",footerNote:"Расчет бесплатный. Точную стоимость подтвердит менеджер после уточнения деталей.",phoneCaptureLabel:"Добавить телефон для ответа",phoneSavedLabel:"Телефон добавлен",phonePlaceholder:"+7 999 000-00-00",fallbackMessage:"Сообщение принято. Менеджер ответит после уточнения деталей.",disabledMessage:"Сообщение принято. Менеджер проверит детали и ответит вам.",errorMessage:"Не удалось отправить сообщение. Проверьте соединение и попробуйте еще раз.",retryLabel:"Повторить",sendLabel:"Отправить",attachLabel:"Добавить фото",resizeLabel:"Изменить размер виджета",closeLabel:"Закрыть виджет",minimizeLabel:"Свернуть виджет",phoneHref:void 0,privacyUrl:void 0,quickReplies:Pt,mobileActions:Ct},Le={"api-base-url":"apiBaseUrl","messages-path":"messagesPath","timeout-ms":"timeoutMs","widget-instance-id":"widgetInstanceId",theme:"theme",position:"position","panel-size":"panelSize",mock:"mock","initial-state":"initialState","persist-open-state":"persistOpenState",storage:"storage","quick-reply-submit":"quickReplySubmit","show-quick-actions":"showQuickActions","show-mobile-actions":"showMobileActions","show-attachment-slot":"showAttachmentSlot","attachments-enabled":"attachmentsEnabled","collect-phone-after-first-message":"collectPhoneAfterFirstMessage","include-message-text-in-events":"includeMessageTextInEvents","max-message-length":"maxMessageLength","launcher-label":"launcherLabel","header-title":"headerTitle","header-status":"headerStatus","header-response-time":"headerResponseTime","intro-message":"introMessage",placeholder:"placeholder","input-placeholder":"placeholder","disclosure-text":"disclosureText","footer-note":"footerNote","phone-capture-label":"phoneCaptureLabel","phone-saved-label":"phoneSavedLabel","phone-placeholder":"phonePlaceholder","fallback-message":"fallbackMessage","disabled-message":"disabledMessage","error-message":"errorMessage","retry-label":"retryLabel","send-label":"sendLabel","attach-label":"attachLabel","resize-label":"resizeLabel","close-label":"closeLabel","minimize-label":"minimizeLabel","phone-href":"phoneHref","privacy-url":"privacyUrl"},zt=[...Object.keys(Le),"config","quick-replies","mobile-actions","open"],Lt=new Set(["mock","persistOpenState","showQuickActions","showMobileActions","showAttachmentSlot","attachmentsEnabled","collectPhoneAfterFirstMessage","includeMessageTextInEvents"]),Ut=new Set(["timeoutMs","maxMessageLength"]);function me(s={}){const e={...L,...s},t=Ue(e.timeoutMs),i=qe(e.maxMessageLength,L.maxMessageLength,1e4);return{...e,apiBaseUrl:Gt(x(e.apiBaseUrl)),messagesPath:Vt(e.messagesPath),timeoutMs:t,widgetInstanceId:x(e.widgetInstanceId)||L.widgetInstanceId,theme:x(e.theme)||L.theme,position:Ht(e.position),panelSize:Ft(e.panelSize),mock:!!e.mock,initialState:Wt(e.initialState),persistOpenState:!!e.persistOpenState,storage:jt(e.storage),quickReplySubmit:Kt(e.quickReplySubmit),showQuickActions:!!e.showQuickActions,showMobileActions:!!e.showMobileActions,showAttachmentSlot:!!e.showAttachmentSlot,attachmentsEnabled:!!e.attachmentsEnabled,collectPhoneAfterFirstMessage:!!e.collectPhoneAfterFirstMessage,includeMessageTextInEvents:!!e.includeMessageTextInEvents,maxMessageLength:i,phoneHref:U(e.phoneHref),privacyUrl:U(e.privacyUrl),quickReplies:ge(e.quickReplies),mobileActions:fe(e.mobileActions,e.phoneHref)}}function Ue(s){const e=qe(s,L.timeoutMs,6e4);return Math.max(e,Rt)}function Oe(s){const e={...Dt(s),...Be(s.getAttribute("config"))};for(const[t,i]of Object.entries(Le)){if(!s.hasAttribute(t))continue;const o=s.getAttribute(t);o!=null&&(Lt.has(i)?e[i]=Nt(o):Ut.has(i)?e[i]=Number(o):e[i]=o)}return s.hasAttribute("quick-replies")&&(e.quickReplies=Bt(s.getAttribute("quick-replies")??"")),s.hasAttribute("mobile-actions")&&(e.mobileActions=qt(s.getAttribute("mobile-actions")??"")),me(e)}function Ot(s,e={}){const t=me(e);u(s,"api-base-url",t.apiBaseUrl),u(s,"messages-path",t.messagesPath),u(s,"timeout-ms",String(t.timeoutMs)),u(s,"widget-instance-id",t.widgetInstanceId),u(s,"theme",t.theme),u(s,"position",t.position),u(s,"panel-size",t.panelSize),u(s,"initial-state",t.initialState),u(s,"storage",t.storage),u(s,"quick-reply-submit",t.quickReplySubmit),u(s,"launcher-label",t.launcherLabel),u(s,"header-title",t.headerTitle),u(s,"header-status",t.headerStatus),u(s,"header-response-time",t.headerResponseTime),u(s,"intro-message",t.introMessage),u(s,"placeholder",t.placeholder),u(s,"disclosure-text",t.disclosureText),u(s,"footer-note",t.footerNote),u(s,"phone-capture-label",t.phoneCaptureLabel),u(s,"phone-saved-label",t.phoneSavedLabel),u(s,"phone-placeholder",t.phonePlaceholder),u(s,"fallback-message",t.fallbackMessage),u(s,"disabled-message",t.disabledMessage),u(s,"error-message",t.errorMessage),u(s,"retry-label",t.retryLabel),u(s,"send-label",t.sendLabel),u(s,"attach-label",t.attachLabel),u(s,"resize-label",t.resizeLabel),u(s,"close-label",t.closeLabel),u(s,"minimize-label",t.minimizeLabel),u(s,"phone-href",t.phoneHref),u(s,"privacy-url",t.privacyUrl),u(s,"max-message-length",String(t.maxMessageLength)),F(s,"mock",t.mock),F(s,"persist-open-state",t.persistOpenState),u(s,"show-quick-actions",String(t.showQuickActions)),u(s,"show-mobile-actions",String(t.showMobileActions)),u(s,"show-attachment-slot",String(t.showAttachmentSlot)),F(s,"attachments-enabled",t.attachmentsEnabled),F(s,"collect-phone-after-first-message",t.collectPhoneAfterFirstMessage),F(s,"include-message-text-in-events",t.includeMessageTextInEvents),(e.open||t.initialState==="open")&&s.setAttribute("open",""),t.quickReplies.length>0&&s.setAttribute("quick-replies",JSON.stringify(t.quickReplies)),t.mobileActions.length>0&&s.setAttribute("mobile-actions",JSON.stringify(t.mobileActions));for(const[i,o]of Object.entries(e.attributes??{}))s.setAttribute(i,o)}function Bt(s){const e=s.trim();if(!e)return[];const t=be(e);return Array.isArray(t)?ge(t):ge(e.split("|").map(i=>({label:i.trim(),text:i.trim()})).filter(i=>i.label))}function qt(s){const e=s.trim();if(!e)return[];const t=be(e);return Array.isArray(t)?fe(t):fe(e.split("|").map(i=>({type:"open",label:i.trim()})).filter(i=>i.label))}function ge(s=[]){return s.map(e=>{const t=x(e?.label),i=x(e?.text??e?.value??e?.label);return{label:t,text:i}}).filter(e=>e.label.length>0&&e.text.length>0).slice(0,6)}function fe(s=[],e){return s.map(t=>{const i=x(t?.label);if(i){if(t.type==="call"){const o=x(t.href||e||"tel:");return{type:"call",label:i,href:o,icon:U(t.icon)}}if(t.type==="link"){const o=x(t.href);return o?{type:"link",label:i,href:o,target:t.target==="_self"?"_self":"_blank",icon:U(t.icon)}:void 0}if(t.type==="prefill"){const o=x(t.text);return o?{type:"prefill",label:i,text:o,icon:U(t.icon)}:void 0}return{type:"open",label:i,icon:U(t.icon)}}}).filter(t=>!!t).slice(0,4)}function Dt(s){const e=s.querySelector?.('script[type="application/json"][data-site-widget-config]');return e?.textContent?Be(e.textContent):{}}function Be(s){if(!s?.trim())return{};const e=be(s);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function u(s,e,t){t&&t.length>0&&s.setAttribute(e,t)}function F(s,e,t){t?s.setAttribute(e,"true"):s.removeAttribute(e)}function Nt(s){const e=s.trim().toLowerCase();return e===""||e==="1"||e==="true"||e==="yes"}function Ht(s){const e=x(s);return e==="bottom-left"||e==="inline"?e:"bottom-right"}function Ft(s){const e=x(s);return e==="wide"||e==="fullscreen"?e:"normal"}function Wt(s){return x(s)==="open"?"open":"closed"}function jt(s){return x(s)==="memory"?"memory":"local"}function Kt(s){return x(s)==="auto"?"auto":"prefill"}function Vt(s){const e=x(s);return e?e.startsWith("/")?e:`/${e}`:L.messagesPath}function qe(s,e,t){const i=Number(s);return!Number.isInteger(i)||i<=0?e:Math.min(i,t)}function Gt(s){return s.replace(/\/+$/,"")}function U(s){return x(s)||void 0}function x(s){return String(s??"").trim()}function be(s){try{return JSON.parse(s)}catch{return}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=globalThis,ve=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),De=new WeakMap;let Ne=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ve&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=De.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&De.set(t,e))}return e}toString(){return this.cssText}};const Qt=s=>new Ne(typeof s=="string"?s:s+"",void 0,we),He=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1],s[0]);return new Ne(t,s,we)},Yt=(s,e)=>{if(ve)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),o=X.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},Fe=ve?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Qt(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Zt,defineProperty:Jt,getOwnPropertyDescriptor:Xt,getOwnPropertyNames:es,getOwnPropertySymbols:ts,getPrototypeOf:ss}=Object,ee=globalThis,We=ee.trustedTypes,is=We?We.emptyScript:"",os=ee.reactiveElementPolyfillSupport,W=(s,e)=>s,xe={toAttribute(s,e){switch(e){case Boolean:s=s?is:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},je=(s,e)=>!Zt(s,e),Ke={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:je};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;let O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ke){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Jt(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=Xt(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const c=o?.call(this);r?.call(this,n),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ke}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;const e=ss(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){const t=this.properties,i=[...es(t),...ts(t)];for(const o of i)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Fe(o))}else e!==void 0&&t.push(Fe(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:xe).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=i.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xe;this._$Em=o;const c=n.fromAttribute(t,r.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(e!==void 0){const n=this.constructor;if(o===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??je)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i){const{wrapped:n}=r,c=this[o];n!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,r,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[W("elementProperties")]=new Map,O[W("finalized")]=new Map,os?.({ReactiveElement:O}),(ee.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=globalThis,Ve=s=>s,te=ye.trustedTypes,Ge=te?te.createPolicy("lit-html",{createHTML:s=>s}):void 0,Qe="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,Ye="?"+I,rs=`<${Ye}>`,M=document,j=()=>M.createComment(""),K=s=>s===null||typeof s!="object"&&typeof s!="function",_e=Array.isArray,ns=s=>_e(s)||typeof s?.[Symbol.iterator]=="function",Se=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Je=/>/g,T=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,et=/"/g,tt=/^(?:script|style|textarea|title)$/i,st=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),f=st(1),y=st(2),k=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),it=new WeakMap,P=M.createTreeWalker(M,129);function ot(s,e){if(!_e(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ge!==void 0?Ge.createHTML(e):e}const as=(s,e)=>{const t=s.length-1,i=[];let o,r=e===2?"<svg>":e===3?"<math>":"",n=V;for(let c=0;c<t;c++){const a=s[c];let l,h,d=-1,g=0;for(;g<a.length&&(n.lastIndex=g,h=n.exec(a),h!==null);)g=n.lastIndex,n===V?h[1]==="!--"?n=Ze:h[1]!==void 0?n=Je:h[2]!==void 0?(tt.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=T):h[3]!==void 0&&(n=T):n===T?h[0]===">"?(n=o??V,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,l=h[1],n=h[3]===void 0?T:h[3]==='"'?et:Xe):n===et||n===Xe?n=T:n===Ze||n===Je?n=V:(n=T,o=void 0);const m=n===T&&s[c+1].startsWith("/>")?" ":"";r+=n===V?a+rs:d>=0?(i.push(l),a.slice(0,d)+Qe+a.slice(d)+I+m):a+I+(d===-2?c:m)}return[ot(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class G{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const c=e.length-1,a=this.parts,[l,h]=as(e,t);if(this.el=G.createElement(l,i),P.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(o=P.nextNode())!==null&&a.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const d of o.getAttributeNames())if(d.endsWith(Qe)){const g=h[n++],m=o.getAttribute(d).split(I),v=/([.?@])?(.*)/.exec(g);a.push({type:1,index:r,name:v[2],strings:m,ctor:v[1]==="."?cs:v[1]==="?"?hs:v[1]==="@"?ds:se}),o.removeAttribute(d)}else d.startsWith(I)&&(a.push({type:6,index:r}),o.removeAttribute(d));if(tt.test(o.tagName)){const d=o.textContent.split(I),g=d.length-1;if(g>0){o.textContent=te?te.emptyScript:"";for(let m=0;m<g;m++)o.append(d[m],j()),P.nextNode(),a.push({type:2,index:++r});o.append(d[g],j())}}}else if(o.nodeType===8)if(o.data===Ye)a.push({type:2,index:r});else{let d=-1;for(;(d=o.data.indexOf(I,d+1))!==-1;)a.push({type:7,index:r}),d+=I.length-1}r++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function B(s,e,t=s,i){if(e===k)return e;let o=i!==void 0?t._$Co?.[i]:t._$Cl;const r=K(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=o:t._$Cl=o),o!==void 0&&(e=B(s,o._$AS(s,e.values),o,i)),e}class ls{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??M).importNode(t,!0);P.currentNode=o;let r=P.nextNode(),n=0,c=0,a=i[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new q(r,r.nextSibling,this,e):a.type===1?l=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(l=new us(r,this,e)),this._$AV.push(l),a=i[++c]}n!==a?.index&&(r=P.nextNode(),n++)}return P.currentNode=M,o}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),K(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ns(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=G.createElement(ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const r=new ls(o,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=it.get(e.strings);return t===void 0&&it.set(e.strings,t=new G(e)),t}k(e){_e(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new q(this.O(j()),this.O(j()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=Ve(e).nextSibling;Ve(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(r===void 0)e=B(this,e,t,0),n=!K(e)||e!==this._$AH&&e!==k,n&&(this._$AH=e);else{const c=e;let a,l;for(e=r[0],a=0;a<r.length-1;a++)l=B(this,c[i+a],t,a),l===k&&(l=this._$AH[a]),n||=!K(l)||l!==this._$AH[a],l===p?e=p:e!==p&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}n&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class cs extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class hs extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class ds extends se{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=B(this,e,t,0)??p)===k)return;const i=this._$AH,o=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==p&&(i===p||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class us{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const ps={I:q},ms=ye.litHtmlPolyfillSupport;ms?.(G,q),(ye.litHtmlVersions??=[]).push("3.3.3");const gs=(s,e,t)=>{const i=t?.renderBefore??e;let o=i._$litPart$;if(o===void 0){const r=t?.renderBefore??null;i._$litPart$=o=new q(e.insertBefore(j(),r),r,void 0,t??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=globalThis;let Q=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gs(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};Q._$litElement$=!0,Q.finalized=!0,Ae.litElementHydrateSupport?.({LitElement:Q});const fs=Ae.litElementPolyfillSupport;fs?.({LitElement:Q}),(Ae.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bs={CHILD:2},rt=s=>(...e)=>({_$litDirective$:s,values:e});let nt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:vs}=ps,at=s=>s,lt=()=>document.createComment(""),Y=(s,e,t)=>{const i=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=i.insertBefore(lt(),o),n=i.insertBefore(lt(),o);t=new vs(r,n,s,s.options)}else{const r=t._$AB.nextSibling,n=t._$AM,c=n!==s;if(c){let a;t._$AQ?.(s),t._$AM=s,t._$AP!==void 0&&(a=s._$AU)!==n._$AU&&t._$AP(a)}if(r!==o||c){let a=t._$AA;for(;a!==r;){const l=at(a).nextSibling;at(i).insertBefore(a,o),a=l}}}return t},C=(s,e,t=s)=>(s._$AI(e,t),s),ws={},ct=(s,e=ws)=>s._$AH=e,xs=s=>s._$AH,$e=s=>{s._$AR(),s._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=(s,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(s[o],o);return i},ys=rt(class extends nt{constructor(s){if(super(s),s.type!==bs.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],r=[];let n=0;for(const c of s)o[n]=i?i(c,n):n,r[n]=t(c,n),n++;return{values:r,keys:o}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){const o=xs(s),{values:r,keys:n}=this.dt(e,t,i);if(!Array.isArray(o))return this.ut=n,r;const c=this.ut??=[],a=[];let l,h,d=0,g=o.length-1,m=0,v=r.length-1;for(;d<=g&&m<=v;)if(o[d]===null)d++;else if(o[g]===null)g--;else if(c[d]===n[m])a[m]=C(o[d],r[m]),d++,m++;else if(c[g]===n[v])a[v]=C(o[g],r[v]),g--,v--;else if(c[d]===n[v])a[v]=C(o[d],r[v]),Y(s,a[v+1],o[d]),d++,v--;else if(c[g]===n[m])a[m]=C(o[g],r[m]),Y(s,o[d],o[g]),g--,m++;else if(l===void 0&&(l=ht(n,m,v),h=ht(c,d,g)),l.has(c[d]))if(l.has(c[g])){const E=h.get(n[m]),ze=E!==void 0?o[E]:null;if(ze===null){const kt=Y(s,o[d]);C(kt,r[m]),a[m]=kt}else a[m]=C(ze,r[m]),Y(s,o[d],ze),o[E]=null;m++}else $e(o[g]),g--;else $e(o[d]),d++;for(;m<=v;){const E=Y(s,a[v+1]);C(E,r[m]),a[m++]=E}for(;d<=g;){const E=o[d++];E!==null&&$e(E)}return this.ut=n,ct(s,a),k}});function Z(s="id"){return`${s}_${dt()}`}function _s(s){return`site-widget:${Date.now()}:${dt()}`}function Ss(s){let e=2166136261;for(let t=0;t<s.length;t+=1)e^=s.charCodeAt(t),e=Math.imul(e,16777619);return`h${(e>>>0).toString(16).padStart(8,"0")}`}function dt(){const s=globalThis.crypto;if(s&&typeof s.randomUUID=="function")return s.randomUUID().replaceAll("-","");const e=new Uint8Array(16);return s&&typeof s.getRandomValues=="function"?(s.getRandomValues(e),Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")):`${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`}const ut=3,pt=5*1024*1024,mt=15*1024*1024,gt=24e6,As=[255,216,255],$s=[137,80,78,71,13,10,26,10],Es=[82,73,70,70],Is=[87,69,66,80];function Ms(s){if(ie(s,As))return"image/jpeg";if(ie(s,$s))return"image/png";if(ie(s,Es)&&ie(s,Is,8))return"image/webp"}function Ts(s,e){if(!e)return!1;const t=String(s??"").trim().toLowerCase();return t===""||t===e}function ks(s,e){if(!Number.isSafeInteger(s.sizeBytes)||s.sizeBytes<0)return{code:"invalid_image_size",actualBytes:s.sizeBytes};const t=e.length+1;if(t>ut)return{code:"too_many_images",maxCount:ut,actualCount:t};if(s.sizeBytes>pt)return{code:"image_too_large",maxBytes:pt,actualBytes:s.sizeBytes};const i=e.reduce((o,r)=>o+r.sizeBytes,s.sizeBytes);if(i>mt)return{code:"total_too_large",maxBytes:mt,actualBytes:i}}function Ps(s,e){if(!Number.isSafeInteger(s)||!Number.isSafeInteger(e)||s<=0||e<=0)return{code:"invalid_image_dimensions",width:s,height:e};const t=s*e;if(!Number.isSafeInteger(t)||t>gt)return{code:"too_many_pixels",maxPixels:gt,actualPixels:t}}function Cs(s){if(s.length===0)return"";const e=[...new Set(s.map(({error:i})=>Rs(i)))];return`${s.length===1?"Фото не добавлено":"Некоторые фото не добавлены"}: ${e.join("; ")}.`}function ie(s,e,t=0){return s.length<t+e.length?!1:e.every((i,o)=>s[t+o]===i)}function Rs(s){switch(s.code){case"invalid_image_size":return"не удалось определить размер файла";case"too_many_images":return`можно добавить не более ${s.maxCount} фото`;case"image_too_large":return`размер одного фото превышает ${ft(s.maxBytes)} МБ`;case"total_too_large":return`общий размер фото превышает ${ft(s.maxBytes)} МБ`;case"unsupported_image_type":return"поддерживаются только JPEG, PNG и WebP";case"mime_mismatch":return"тип файла не совпадает с его содержимым";case"decode_failed":return"одно из изображений не удалось прочитать";case"invalid_image_dimensions":return"не удалось определить разрешение изображения";case"too_many_pixels":return"разрешение одного фото слишком большое"}}function ft(s){return String(s/1048576)}class D extends Error{constructor(){super("Image selection is no longer current"),this.name="StaleImageSelectionError"}}class zs{constructor(e){this.draft=[],this.byMessageId=new Map,this.validationMessage="",this.validationRevision=0,this.enabled=!0,this.generation=0,this.pendingSelections=new Map,this.inFlightPreviewUrls=new Set,this.selectionQueue=Promise.resolve(),this.host=e,e.addController(this)}hostDisconnected(){this.clearAll()}getDraft(){return this.draft}getForMessage(e){return this.byMessageId.get(e)??[]}getValidationMessage(){return this.validationMessage}getValidationRevision(){return this.validationRevision}isProcessing(){for(const e of this.pendingSelections.values())if(e===this.generation)return!0;return!1}async whenIdle(){await this.selectionQueue.catch(()=>{})}setEnabled(e){const t=!!e;this.enabled!==t&&(this.enabled=t,t||this.clearAll())}selectFiles(e){const t=[...e],i=this.generation,o=Symbol("image-selection");this.pendingSelections.set(o,i),this.host.requestUpdate();let r=()=>{};const n=new Promise(c=>{r=c});return this.selectionQueue=this.selectionQueue.catch(()=>{}).then(async()=>{try{r(await this.processBatch(t,i))}catch{if(i!==this.generation||!this.enabled){r({accepted:0,rejected:t.length,validationMessage:""});return}const c="Фото не добавлено: одно из изображений не удалось прочитать.";this.validationMessage=c,this.validationRevision+=1,this.host.requestUpdate(),r({accepted:0,rejected:t.length,validationMessage:c})}finally{this.pendingSelections.delete(o),this.host.requestUpdate()}}),n}removeDraft(e){const t=this.draft.findIndex(r=>r.id===e);if(t<0)return;const i=this.draft[t];i&&this.revokePreview(i.previewUrl),this.draft=this.draft.filter(r=>r.id!==e),this.validationMessage="";const o=this.draft[t]?.id??this.draft[t-1]?.id;return this.host.requestUpdate(),o}transferDraftToMessage(e){if(this.draft.length===0)return;const t=this.byMessageId.get(e)??[];this.byMessageId.set(e,[...t,...this.draft]),this.draft=[],this.validationMessage="",this.host.requestUpdate()}removeMessageAttachments(e){const t=this.byMessageId.get(e);if(t){for(const i of t)this.revokePreview(i.previewUrl);this.byMessageId.delete(e),this.host.requestUpdate()}}clearAll(){const e=this.isProcessing();this.generation+=1,this.pendingSelections.clear(),this.selectionQueue=Promise.resolve();const t=new Set;for(const o of this.inFlightPreviewUrls)t.add(o);for(const o of this.draft)t.add(o.previewUrl);for(const o of this.byMessageId.values())for(const r of o)t.add(r.previewUrl);for(const o of t)this.revokePreview(o);this.inFlightPreviewUrls.clear();const i=e||t.size>0||this.draft.length>0||this.byMessageId.size>0||this.validationMessage;this.draft=[],this.byMessageId.clear(),this.validationMessage="",i&&this.host.requestUpdate()}async processBatch(e,t){if(!this.enabled||t!==this.generation||e.length===0)return{accepted:0,rejected:0,validationMessage:""};const i=t,o=()=>i===this.generation&&this.enabled,r=[],n=[],c=[...this.draft];for(const a of e){A(o);const l={file:a,sizeBytes:a.size},h=ks(l,c);if(h){n.push({candidate:l,error:h});continue}const d=await this.validateAndCreateAttachment(l,n,o);if(d){if(!o()){this.revokeInFlightPreview(d.previewUrl);break}r.push(d),c.push(d)}}if(!o()){for(const a of r)this.revokeInFlightPreview(a.previewUrl);return{accepted:0,rejected:e.length,validationMessage:""}}for(const a of r)this.inFlightPreviewUrls.delete(a.previewUrl);return this.draft=[...this.draft,...r],this.validationMessage=Cs(n),this.validationRevision+=1,this.host.requestUpdate(),{accepted:r.length,rejected:n.length,validationMessage:this.validationMessage}}async validateAndCreateAttachment(e,t,i){A(i);let o;try{const a=await Os(e.file.slice(0,12));A(i),o=Ms(new Uint8Array(a))}catch(a){if(a instanceof D)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}if(!o){t.push({candidate:e,error:{code:"unsupported_image_type"}});return}if(!Ts(e.file.type,o)){t.push({candidate:e,error:{code:"mime_mismatch",declaredMime:e.file.type,detectedMime:o}});return}let r;try{r=await Ls(e.file,a=>this.createInFlightPreview(a),a=>this.revokeInFlightPreview(a),i)}catch(a){if(a instanceof D)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}A(i);const n=Ps(r.width,r.height);if(n){t.push({candidate:e,error:n});return}let c;try{if(A(i),c=this.createInFlightPreview(e.file),!i())throw this.revokeInFlightPreview(c),new D}catch(a){if(a instanceof D)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}return{id:Z("img"),name:e.file.name,mimeType:o,sizeBytes:e.file.size,width:r.width,height:r.height,previewUrl:c,file:e.file}}revokePreview(e){try{URL.revokeObjectURL(e)}catch{}}createInFlightPreview(e){const t=URL.createObjectURL(e);return this.inFlightPreviewUrls.add(t),t}revokeInFlightPreview(e){this.inFlightPreviewUrls.delete(e)&&this.revokePreview(e)}}async function Ls(s,e,t,i){let o;if(typeof createImageBitmap=="function")try{A(i);const n=await createImageBitmap(s);try{return A(i),{width:n.width,height:n.height}}finally{n.close()}}catch(n){if(n instanceof D)throw n;o=n}if(A(i),typeof Image>"u"||typeof URL.createObjectURL!="function")throw o instanceof Error?o:new Error("No browser image decoder is available");A(i);const r=e(s);try{A(i);const n=new Image;return n.decoding="async",n.src=r,typeof n.decode=="function"?await n.decode():await Us(n),A(i),{width:n.naturalWidth,height:n.naturalHeight}}finally{t(r)}}function A(s){if(!s())throw new D}function Us(s){return new Promise((e,t)=>{s.addEventListener("load",()=>e(),{once:!0}),s.addEventListener("error",()=>t(new Error("Image decode failed")),{once:!0})})}async function Os(s){return typeof s.arrayBuffer=="function"?s.arrayBuffer():new Promise((e,t)=>{const i=new FileReader;i.addEventListener("load",()=>{i.result instanceof ArrayBuffer?e(i.result):t(new Error("Blob read returned no ArrayBuffer"))}),i.addEventListener("error",()=>t(i.error??new Error("Blob read failed"))),i.readAsArrayBuffer(s)})}const Ee=8,Ie=40,bt=180,R=.5,Bs=new Set(["ArrowUp","ArrowDown","Home","End","PageUp","PageDown"," ","Spacebar"]);class qs{constructor(e){this.items=[],this.mode="following-bottom",this.snapshot={mode:"following-bottom",canScrollStart:!1,canScrollEnd:!1,newItemCount:0},this.newItemCount=0,this.hasInitialPlacement=!1,this.observedRows=new Set,this.programmaticScroll=!1,this.pointerActive=!1,this.handleWheel=()=>this.releaseForUser(),this.handleTouchMove=()=>this.releaseForUser(),this.handleKeydown=t=>{if(!Bs.has(t.key))return;const i=t.target;i instanceof HTMLElement&&i!==this.viewport&&this.isInteractive(i)||this.releaseForUser()},this.handlePointerDown=t=>{this.pointerActive=t.target===this.viewport},this.handlePointerUp=()=>{this.pointerActive=!1},this.handleScroll=()=>{this.pointerActive&&!this.programmaticScroll&&this.releaseForUser();const t=this.viewport;t&&!this.programmaticScroll&&this.mode==="free-scrolling"&&this.distanceToEnd(t)<=Ee&&(this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0,this.mode="following-bottom",this.commitModeAttribute()),this.updateSnapshot()},this.handleWindowResize=()=>this.scheduleCommit(),this.host=e,e.addController(this)}hostUpdate(){this.hasLayout()&&(this.pendingLayoutAnchor=this.captureFirstVisible())}hostDisconnected(){this.disconnect()}hostConnected(){this.host.requestUpdate()}connect({root:e,viewport:t,content:i,tailSpacer:o}){if(this.viewport===t&&this.content===i&&this.tailSpacer===o){this.root=e,this.commitModeAttribute();return}this.detachElements(),this.root=e,this.viewport=t,this.content=i,this.tailSpacer=o,t.addEventListener("scroll",this.handleScroll,{passive:!0}),t.addEventListener("wheel",this.handleWheel,{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove,{passive:!0}),t.addEventListener("keydown",this.handleKeydown),t.addEventListener("pointerdown",this.handlePointerDown),t.addEventListener("pointerup",this.handlePointerUp),t.addEventListener("pointercancel",this.handlePointerUp),typeof ResizeObserver<"u"?(this.resizeObserver=new ResizeObserver(()=>this.scheduleCommit()),this.resizeObserver.observe(t),this.resizeObserver.observe(i),this.reconcileObservedRows()):typeof window<"u"&&window.addEventListener("resize",this.handleWindowResize),this.commitModeAttribute(),this.scheduleCommit()}reconcile(e){const t=e.map(r=>({id:r.id,scrollAnchor:!!r.scrollAnchor})),i=this.pendingReconcile?.previous??this.items,o=this.pendingReconcile?.layoutAnchor??this.pendingLayoutAnchor;this.pendingLayoutAnchor=void 0,this.items=t,this.pendingReconcile=o?{previous:i,next:t,layoutAnchor:o}:{previous:i,next:t},this.reconcileObservedRows(),this.scheduleCommit()}scrollToEnd(e={}){const t=this.viewport;if(!t||!this.hasLayout())return!1;this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0;const i=this.normalizeBehavior(e.behavior??"auto");return this.clearSettlingTimer(),this.mode=i==="smooth"?"settling-jump":"following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),i),this.updateSnapshot(),i==="smooth"&&(this.settlingTimer=globalThis.setTimeout(()=>{if(this.settlingTimer=void 0,this.mode!=="settling-jump")return;this.mode="following-bottom",this.commitModeAttribute();const o=this.viewport;o&&this.hasLayout()&&(this.performScroll(Math.max(0,o.scrollHeight-o.clientHeight),"auto"),this.scheduleCommit()),this.updateSnapshot()},bt)),!0}scrollToMessage(e,t={}){const i=this.viewport,o=this.findRow(e);if(!i||!o||!this.hasLayout())return!1;this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0,this.clearSettlingTimer(),this.mode="free-scrolling",this.commitModeAttribute();const r=i.getBoundingClientRect(),n=o.getBoundingClientRect(),c=i.scrollTop+n.top-r.top-Ie;return this.performScroll(Math.max(0,c),this.normalizeBehavior(t.behavior??"auto")),this.updateSnapshot(),!0}disconnect(){this.detachElements(),this.cancelFrame(),this.clearProgrammaticTimer(),this.clearSettlingTimer(),this.pendingReconcile=void 0,this.pendingLayoutAnchor=void 0,this.activeAnchorId=void 0,this.hasInitialPlacement=!1,this.pointerActive=!1,this.programmaticScroll=!1}getSnapshot(){return this.snapshot}scheduleCommit(){this.frameId===void 0&&(this.frameId=this.requestFrame(()=>{this.frameId=void 0;const e=this.pendingReconcile;this.pendingReconcile=void 0,this.commitReconcile(e??{previous:this.items,next:this.items})}))}commitReconcile(e){const t=this.viewport;if(!t||!this.content||!this.tailSpacer)return;if(!this.hasLayout()){this.updateSnapshot();return}if(e.next.length>0&&!this.hasInitialPlacement){this.hasInitialPlacement=!0,this.activeAnchorId=void 0,this.setTailHeight(0),this.mode="following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"),this.updateSnapshot();return}this.isPrepend(e.previous,e.next)&&e.layoutAnchor&&this.restoreLayoutAnchor(e.layoutAnchor);const i=this.getAppendedItems(e.previous,e.next),o=[...i].reverse().find(r=>r.scrollAnchor);o?this.startTurnAnchor(o.id):i.length>0?this.mode==="following-bottom"||this.mode==="settling-jump"?this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"):this.activeAnchorId?this.reconcileActiveAnchor():this.newItemCount+=i.length:this.mode==="following-bottom"||this.mode==="settling-jump"?this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"):this.activeAnchorId&&this.reconcileActiveAnchor(),this.updateSnapshot()}startTurnAnchor(e){const t=this.viewport,i=this.findRow(e);if(!t||!i||!this.tailSpacer)return;this.activeAnchorId=e,this.newItemCount=0,this.clearSettlingTimer(),this.mode="anchored-to-message",this.commitModeAttribute();const o=this.desiredScrollTop(i);this.setTailHeight(this.requiredTailHeight(o)),this.performScroll(o,"auto")}reconcileActiveAnchor(){const e=this.activeAnchorId?this.findRow(this.activeAnchorId):void 0;if(!e||!this.viewport){this.activeAnchorId=void 0,this.setTailHeight(0);return}const t=this.desiredScrollTop(e),i=this.requiredTailHeight(t);if(this.setTailHeight(i),this.mode==="anchored-to-message")if(i<=R)this.activeAnchorId=void 0,this.mode="following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,this.viewport.scrollHeight-this.viewport.clientHeight),"auto");else{const o=this.viewport.getBoundingClientRect(),r=e.getBoundingClientRect();Math.abs(r.top-o.top-Ie)>R&&this.performScroll(t,"auto")}else i<=R&&(this.activeAnchorId=void 0)}requiredTailHeight(e){const t=this.viewport,i=this.tailSpacer;if(!t||!i)return 0;const o=t.getBoundingClientRect(),r=i.getBoundingClientRect(),n=t.scrollTop+r.top-o.top;return Math.max(0,e+t.clientHeight-n)}desiredScrollTop(e){const t=this.viewport;if(!t)return 0;const i=t.getBoundingClientRect(),o=e.getBoundingClientRect();return Math.max(0,t.scrollTop+o.top-i.top-Ie)}restoreLayoutAnchor(e){const t=this.viewport,i=this.findRow(e.id);if(!t||!i)return;const o=t.getBoundingClientRect(),n=i.getBoundingClientRect().top-o.top-e.viewportTop;Math.abs(n)<=R||(this.markProgrammaticScroll("auto"),t.scrollTop+=n)}captureFirstVisible(){const e=this.viewport,t=this.content;if(!e||!t)return;const i=e.getBoundingClientRect();for(const o of t.querySelectorAll("[data-message-id]")){const r=o.getBoundingClientRect();if(r.bottom>i.top+R&&r.top<i.bottom-R)return{id:o.dataset.messageId??"",viewportTop:r.top-i.top}}}getAppendedItems(e,t){if(e.length===0)return t;const i=this.findSequenceStart(e,t);return i<0?[]:t.slice(i+e.length)}isPrepend(e,t){return e.length===0||t.length<=e.length?!1:this.findSequenceStart(e,t)>0}findSequenceStart(e,t){if(e.length===0)return 0;const i=t.length-e.length;for(let o=0;o<=i;o+=1)if(e.every((r,n)=>r.id===t[o+n]?.id))return o;return-1}releaseForUser(){this.clearProgrammaticTimer(),this.clearSettlingTimer(),this.programmaticScroll=!1,this.mode!=="free-scrolling"&&(this.mode="free-scrolling",this.commitModeAttribute(),this.updateSnapshot())}performScroll(e,t){const i=this.viewport;if(!i)return;const o=Math.max(0,i.scrollHeight-i.clientHeight),r=Math.min(Math.max(0,e),o);this.markProgrammaticScroll(t),typeof i.scrollTo=="function"?i.scrollTo({top:r,behavior:t}):i.scrollTop=r}markProgrammaticScroll(e){this.programmaticScroll=!0,this.clearProgrammaticTimer();const t=e==="smooth"?bt:0;this.programmaticClearTimer=globalThis.setTimeout(()=>{this.programmaticScroll=!1,this.programmaticClearTimer=void 0,this.updateSnapshot()},t)}updateSnapshot(){const e=this.viewport,t=e?{mode:this.mode,canScrollStart:e.scrollTop>Ee,canScrollEnd:this.distanceToEnd(e)>Ee,newItemCount:this.newItemCount}:{mode:this.mode,canScrollStart:!1,canScrollEnd:!1,newItemCount:this.newItemCount};t.mode===this.snapshot.mode&&t.canScrollStart===this.snapshot.canScrollStart&&t.canScrollEnd===this.snapshot.canScrollEnd&&t.newItemCount===this.snapshot.newItemCount||(this.snapshot=t,this.host.requestUpdate())}distanceToEnd(e){return Math.max(0,e.scrollHeight-e.clientHeight-e.scrollTop)}setTailHeight(e){const t=this.tailSpacer;if(!t)return;const i=Math.max(0,e),o=Number.parseFloat(t.style.height||"0")||0;Math.abs(o-i)<=R||(t.style.height=`${i}px`)}findRow(e){if(this.content)return[...this.content.querySelectorAll("[data-message-id]")].find(t=>t.dataset.messageId===e)}hasLayout(){const e=this.viewport;return!!(e&&e.clientHeight>0&&e.getClientRects().length>0)}normalizeBehavior(e){return e!=="smooth"?e:typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}isInteractive(e){return!!e.closest("button, a, input, textarea, select, [contenteditable='true']")}reconcileObservedRows(){if(!this.resizeObserver||!this.content)return;const e=new Set(this.content.querySelectorAll("[data-message-id]"));for(const t of this.observedRows)e.has(t)||this.resizeObserver.unobserve(t);for(const t of e)this.observedRows.has(t)||this.resizeObserver.observe(t);this.observedRows=e}commitModeAttribute(){this.root&&(this.root.dataset.scrollMode=this.mode),this.viewport&&(this.viewport.dataset.scrollMode=this.mode)}detachElements(){const e=this.viewport;e&&(e.removeEventListener("scroll",this.handleScroll),e.removeEventListener("wheel",this.handleWheel),e.removeEventListener("touchmove",this.handleTouchMove),e.removeEventListener("keydown",this.handleKeydown),e.removeEventListener("pointerdown",this.handlePointerDown),e.removeEventListener("pointerup",this.handlePointerUp),e.removeEventListener("pointercancel",this.handlePointerUp)),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,typeof window<"u"&&window.removeEventListener("resize",this.handleWindowResize),this.observedRows.clear(),this.root=void 0,this.viewport=void 0,this.content=void 0,this.tailSpacer=void 0}clearProgrammaticTimer(){this.programmaticClearTimer!==void 0&&(globalThis.clearTimeout(this.programmaticClearTimer),this.programmaticClearTimer=void 0)}clearSettlingTimer(){this.settlingTimer!==void 0&&(globalThis.clearTimeout(this.settlingTimer),this.settlingTimer=void 0)}requestFrame(e){return typeof requestAnimationFrame=="function"?requestAnimationFrame(e):globalThis.setTimeout(()=>e(performance.now()),0)}cancelFrame(){this.frameId!==void 0&&(typeof cancelAnimationFrame=="function"?cancelAnimationFrame(this.frameId):globalThis.clearTimeout(this.frameId),this.frameId=void 0)}}function Ds(s){const e=Hs(s.contact),t=Ns(s.environment.search),i=J({channel:"site_widget",page_url:s.environment.href,widget_instance_id:s.config.widgetInstanceId,page_title:s.environment.title,referrer_url:s.environment.referrer,utm:t}),o=J({locale:s.environment.locale,timezone:s.environment.timezone});return J({schema_version:"site_widget.v1",event_type:"site_widget.message_submitted",idempotency_key:s.idempotencyKey,submitted_at:s.environment.now,public_session_id:s.publicSessionId,source:i,contact:e&&Object.keys(e).length>0?e:void 0,message:{role:"visitor",text:s.text.trim()},visitor_context:Object.keys(o).length>0?o:void 0,consent:s.privacyPolicyAccepted?{privacy_policy:!0}:void 0})}function Ns(s=""){if(!s.trim())return;const e=new URLSearchParams(s.startsWith("?")?s.slice(1):s),t=J({source:e.get("utm_source")??void 0,medium:e.get("utm_medium")??void 0,campaign:e.get("utm_campaign")??void 0,term:e.get("utm_term")??void 0,content:e.get("utm_content")??void 0});return Object.keys(t).length>0?t:void 0}function Hs(s){if(s)return J({name:oe(s.name),phone:oe(s.phone),email:oe(s.email),preferred_contact:s.preferred_contact,city:oe(s.city)})}function oe(s){return s?.trim()||void 0}function J(s){for(const e of Object.keys(s)){const t=s[e];(t==null||t===""||typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length===0)&&delete s[e]}return s}function re({config:s,open:e=!1,now:t=new Date}){return{open:e,status:e?"open_idle":"closed",draft:"",contactPhone:"",contactCaptureOpen:!1,submitting:!1,pending:void 0,messages:[ae({role:"assistant",text:s.introMessage,createdAt:t.toISOString()})],visitorMessageCount:0,unreadCount:0}}function w(s,e,t){const i=Fs(s);switch(e.type){case"open":return{...i,open:!0,unreadCount:0,status:wt(i,t)};case"close":return{...i,open:!1,status:"closed"};case"draft.changed":{const o=String(e.value??"");return{...i,draft:o,status:i.open?o.trim()?"composing":wt(i,t):i.status}}case"contact.capture.toggled":return{...i,contactCaptureOpen:typeof e.open=="boolean"?e.open:!i.contactCaptureOpen};case"contact.phone.saved":return{...i,contactPhone:String(e.phone??"").trim(),contactCaptureOpen:!1};case"submit.started":{if(i.submitting||i.pending)return i;const o=String(e.text??"").trim(),r=String(e.idempotencyKey??"").trim();if(!o||!r)return i;const n=ae({role:"visitor",text:o,status:"pending"});return{...i,open:!0,status:"submitted_waiting",submitting:!0,draft:"",pending:{messageId:n.id,text:o,idempotencyKey:r},visitorMessageCount:i.visitorMessageCount+1,messages:[...i.messages,n]}}case"retry.started":return!i.pending||i.submitting?i:{...i,status:"submitted_waiting",submitting:!0,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"pending"}:o)};case"visitor.saved":return!i.pending||e.messageId!==i.pending.messageId?i:{...i,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"saved",publicMessageId:e.publicMessageId,acceptanceStatus:e.acceptanceStatus}:o)};case"visitor.mocked":return!i.pending||e.messageId!==i.pending.messageId?i:{...i,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"sent"}:o)};case"assistant.replied":{const o=String(e.text??"").trim(),r=o?[...i.messages,ae({role:"assistant",text:o,disclosure:!0,publicMessageId:e.publicMessageId,disclosureText:e.disclosureText})]:i.messages;return vt(i,r,"replied")}case"system.message":{const o=String(e.text??"").trim(),r=o?[...i.messages,ae({role:"system",text:o,systemKind:e.status})]:i.messages;return vt(i,r,e.status)}case"submit.failed":{if(!i.pending||e.messageId&&e.messageId!==i.pending.messageId)return i;const o=i.messages.map(r=>r.id===i.pending?.messageId?{...r,status:"error"}:r);return{...i,status:"error",submitting:!1,messages:o}}case"session.cleared":return t?re({config:t,open:i.open}):{...i,pending:void 0,submitting:!1};default:return i}}function ne(s,e){const t=s.trim();return t?t.length>e.maxMessageLength?"message_too_long":null:"empty_message"}function ae({role:s,text:e,status:t="sent",disclosure:i=!1,publicMessageId:o,acceptanceStatus:r,disclosureText:n,systemKind:c,createdAt:a=new Date().toISOString()}){return{id:Z("msg"),role:s,text:String(e??""),status:t,publicMessageId:o,acceptanceStatus:r,disclosure:i,disclosureText:n,systemKind:c,createdAt:a}}function vt(s,e,t){return{...s,status:t,submitting:!1,pending:void 0,messages:e,unreadCount:s.open?s.unreadCount:s.unreadCount+1}}function wt(s,e){const t=e?ne(s.draft,e):s.draft.trim()?null:"empty_message";return s.submitting?"submitted_waiting":s.status==="error"?"error":s.status==="replied"||s.status==="fallback"||s.status==="disabled"?s.status:s.draft.trim()&&!t?"composing":"open_idle"}function Fs(s){return{...s,draft:String(s.draft??""),contactPhone:String(s.contactPhone??""),submitting:!!s.submitting,messages:Array.isArray(s.messages)?s.messages:[],visitorMessageCount:Number.isInteger(s.visitorMessageCount)?s.visitorMessageCount:0,unreadCount:Number.isInteger(s.unreadCount)?s.unreadCount:0}}function Ws(s,e){const t=ne(s.draft,e),i=s.visitorMessageCount>0;return{...s,canSend:!s.submitting&&!s.pending&&!t,draftError:t,showQuickReplies:s.open&&e.showQuickActions&&e.quickReplies.length>0&&!s.submitting&&!i,showMobileActions:!s.open&&e.showMobileActions&&e.mobileActions.length>0,showContactTrigger:!e.collectPhoneAfterFirstMessage||i,contactLabel:s.contactPhone?e.phoneSavedLabel:e.phoneCaptureLabel,attachmentVisible:e.mock&&e.attachmentsEnabled&&e.showAttachmentSlot,attachmentDisabled:!1,status:s.status}}const xt="granit-site-widget",yt="granit-widget",js={opened:"open",closed:"close","response-received":"response"};function $(s,e,t,i={}){const o=Ks(i,t);le(s,`${xt}:${e}`,o),le(s,`${yt}:${e}`,o);const r=js[e];r&&(le(s,`${xt}:${r}`,o),le(s,`${yt}:${r}`,o))}function Ks(s,e){const t={...s,widgetInstanceId:s.widgetInstanceId??e.widgetInstanceId};if(typeof t.publicSessionId=="string"){const i=t.publicSessionId.trim();i&&(t.publicSessionIdHash=Ss(i)),delete t.publicSessionId}return e.includeMessageTextInEvents||(typeof t.messageText=="string"&&(t.messageLength=t.messageText.length),delete t.messageText),t}function le(s,e,t){s.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}function Vs(s=new Date){return{href:typeof window>"u"?"":window.location.href,search:typeof window>"u"?"":window.location.search,title:typeof document>"u"?void 0:document.title||void 0,referrer:typeof document>"u"?void 0:document.referrer||void 0,locale:typeof navigator>"u"?void 0:navigator.language||void 0,timezone:Gs(),now:s.toISOString()}}function Gs(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return}}const Qs=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;function _t(s){if(typeof s!="string")return;const e=s.trim().toLowerCase();return Qs.test(e)?e:void 0}function Me(s){return _t(s)}const St=new Set(["missing_openai_config","model_error","empty_model_response","unsafe_model_response","semantic_verifier_error","grounding_validation_failed","turn_timeout","agent_reply_blocked","ai_persistence_unconfirmed"]),Ys=["ok","schema_version","status","public_session_id","public_message_id","action","automation","message_to_user"],Zs=["status","next_step","conversation_state","disclosure","reply"],Js=["status","next_step","conversation_state","reason"],Xs=["status","next_step","reason"],ei=["status","next_step"],ti=["shown","version","text"],si=["public_message_id","sender_role","text"];function ii(s,e){const t=ce(s,"root");z(t,Ys,"root"),t.ok!==!0&&b("ok"),t.schema_version!=="site_widget.v1"&&b("schema_version");const i=oi(t.status);t.action!=="show_widget_saved"&&b("action");const o=Te(t.public_session_id,"public_session_id"),r=Te(t.public_message_id,"public_message_id"),n=N(t.message_to_user,"message_to_user"),c=ce(t.automation,"automation"),a=N(c.status,"automation.status"),l={source:"server",acceptanceStatus:i,action:"show_widget_saved",publicSessionId:o,publicMessageId:r,raw:s};if(a==="replied"){z(c,Zs,"automation"),c.next_step!=="ai_reply_shown"&&b("automation.next_step"),c.conversation_state!==void 0&&At(c.conversation_state,["ai_active","manager_pending"]);const h=ce(c.disclosure,"automation.disclosure");z(h,ti,"automation.disclosure"),h.shown!==!0&&b("automation.disclosure.shown"),ke(h.version,"automation.disclosure.version",120);const d=ke(h.text,"automation.disclosure.text",1e3),g=ce(c.reply,"automation.reply");z(g,si,"automation.reply");const m=Te(g.public_message_id,"automation.reply.public_message_id");m===r&&b("automation.reply.public_message_id_identity"),g.sender_role!=="ai_assistant"&&b("automation.reply.sender_role");const v=ke(g.text,"automation.reply.text",1e3);return{...l,status:"replied",replyText:v,replyPublicMessageId:m,disclosureText:d}}if(a==="degraded"){z(c,Js,"automation"),c.next_step!=="retry_available"&&b("automation.next_step"),At(c.conversation_state,["ai_active"]);const h=N(c.reason,"automation.reason");return St.has(h)||b("automation.reason"),{...l,status:"fallback",systemText:n.trim()||e.fallbackMessage,reason:h}}if(a==="fallback"){z(c,Xs,"automation"),c.next_step!=="manager_review"&&b("automation.next_step");const h=N(c.reason,"automation.reason");return St.has(h)||b("automation.reason"),{...l,status:"fallback",systemText:n.trim()||e.fallbackMessage,reason:h}}if(a==="disabled")return z(c,ei,"automation"),c.next_step!=="manager_review"&&b("automation.next_step"),{...l,status:"disabled",systemText:n.trim()||e.disabledMessage};b("automation.status")}function oi(s){return s==="accepted"||s==="replayed"?s:b("status")}function At(s,e){const t=N(s,"automation.conversation_state");return e.includes(t)||b("automation.conversation_state"),t}function Te(s,e){return _t(s)??b(e)}function ce(s,e){return typeof s=="object"&&s!==null&&!Array.isArray(s)?s:b(e)}function z(s,e,t){const i=new Set(e),o=Object.keys(s).find(r=>!i.has(r));o&&b(`${t}.${o}`)}function N(s,e){return typeof s=="string"?s:b(e)}function ke(s,e,t){const i=N(s,e);return i.length>t&&b(e),i.trim()||b(e)}function b(s){throw new Error(`Invalid site_widget.v1 response: ${s}`)}async function ri(s,e,t){if(t?.aborted)throw new DOMException("Aborted","AbortError");if(s.mock)return ni(s,e,t);if(!s.apiBaseUrl)throw new Error("apiBaseUrl is required when mock=false");const i=new AbortController,o=globalThis.setTimeout(()=>i.abort(),Ue(s.timeoutMs)),r=()=>i.abort();t?.aborted?i.abort():t?.addEventListener("abort",r,{once:!0});try{const n=await fetch(`${s.apiBaseUrl}${s.messagesPath}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e),credentials:"omit",signal:i.signal}),c=await ai(n);if(!n.ok)throw new Error(li(c)??`Widget request failed with HTTP ${n.status}`);const a=ii(c,s),l=Me(e.public_session_id);if(l&&a.publicSessionId!==l)throw new Error("Invalid site_widget.v1 response: public_session_id_mismatch");return a}finally{globalThis.clearTimeout(o),t?.removeEventListener("abort",r)}}async function ni(s,e,t){await ci(350,t);const i=e.message.text.toLowerCase();return i.includes("менеджер")||i.includes("позвон")?{source:"mock",status:"fallback",publicSessionId:e.public_session_id,systemText:"Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",reason:"manager_requested",raw:{mock:!0}}:i.includes("сто")||i.includes("цен")||i.includes("расчет")||i.includes("расчёт")?{source:"mock",status:"replied",publicSessionId:e.public_session_id,replyText:"Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",raw:{mock:!0}}:{source:"mock",status:"replied",publicSessionId:e.public_session_id,replyText:"Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",raw:{mock:!0}}}async function ai(s){if((s.headers.get("content-type")??"").includes("application/json"))return s.json();const t=await s.text();return t?{message:t}:void 0}function li(s){if(!s||typeof s!="object"||Array.isArray(s))return;const e=s;return typeof e.message=="string"?e.message:typeof e.error=="string"?e.error:void 0}function ci(s,e){return e?.aborted?Promise.reject(new DOMException("Aborted","AbortError")):new Promise((t,i)=>{const o=globalThis.setTimeout(()=>{e?.removeEventListener("abort",r),t()},s),r=()=>{globalThis.clearTimeout(o),i(new DOMException("Aborted","AbortError"))};e?.addEventListener("abort",r,{once:!0})})}function $t(s,e="local"){const t=`sw:${s}:public_session_id`,i=`sw:${s}:open_state`,o=`sw:${s}:panel_size`,r=e==="memory"?void 0:di();let n="",c,a;return{getPublicSessionId(){const l=Pe(r,t),h=Me(l||n);return h?(n=h,l&&l!==h&&he(r,t,h),h):(n="",l&&Et(r,t),"")},setPublicSessionId(l){const h=Me(l);h&&(n=h,he(r,t,h))},clearPublicSessionId(){n="",Et(r,t)},getOpenState(){const l=Pe(r,i);return l==="open"?!0:l==="closed"?!1:c},setOpenState(l){c=l,he(r,i,l?"open":"closed")},getPanelSize(){const l=Pe(r,o);return hi(l)?l:a},setPanelSize(l){a=l,he(r,o,l)}}}function hi(s){return s==="normal"||s==="wide"||s==="fullscreen"}function di(){try{return typeof window>"u"?void 0:window.localStorage}catch{return}}function Pe(s,e){try{return s?.getItem(e)||void 0}catch{return}}function he(s,e,t){try{s?.setItem(e,t)}catch{}}function Et(s,e){try{s?.removeItem(e)}catch{}}const ui=He`
  .message-root {
    align-items: flex-start;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    max-width: min(85%, var(--sw-message-max-width, 460px));
    min-width: 0;
  }

  .message-root--visitor {
    align-items: flex-end;
    align-self: flex-end;
  }

  .message {
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-message);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    color: var(--sw-color-text-primary);
    max-width: 100%;
    min-width: 0;
    padding: 12px 14px;
  }

  .message--visitor {
    background: var(--sw-color-surface-message-visitor);
    border-color: transparent;
    border-top-right-radius: 6px;
  }

  .message--assistant {
    border-top-left-radius: 6px;
  }

  .message--error {
    border-color: var(--sw-color-error);
  }

  .message__text {
    font-size: var(--sw-font-size-body);
    line-height: var(--sw-line-height-body);
    margin: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    word-break: normal;
  }

  .message-attachments {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    list-style: none;
    margin: 10px 0 0;
    max-width: 240px;
    padding: 0;
  }

  .message-attachment {
    border-radius: 9px;
    min-width: 0;
    overflow: hidden;
  }

  .message-attachment__preview {
    aspect-ratio: 1;
    background: var(--sw-color-surface-system);
    display: block;
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  .message-meta,
  .message-disclosure,
  .message-status-row {
    color: var(--sw-color-text-secondary);
    font-size: var(--sw-font-size-small);
    line-height: var(--sw-line-height-small);
  }

  .message-meta {
    margin-top: 5px;
    max-width: 100%;
  }

  .message-root--visitor .message-meta {
    align-self: flex-end;
    text-align: right;
  }

  .message-disclosure,
  .message-status-row,
  .message-status,
  .message-actions {
    align-items: center;
    display: flex;
  }

  .message-disclosure {
    gap: 6px;
  }

  .message-status-row {
    min-height: 32px;
  }

  .message-status-row--error,
  .message-status-row--error .message-actions,
  .message-status-row--error .retry-button {
    color: var(--sw-color-error);
  }

  .message-status,
  .message-actions {
    gap: 5px;
  }

  .message-status__spinner {
    animation: message-spinner 900ms linear infinite;
    display: inline-flex;
    margin-right: 5px;
  }

  .message-actions .retry-button {
    margin: 0;
    min-height: 44px;
    padding: 0 3px;
  }

  .marker {
    align-items: center;
    align-self: center;
    background: var(--sw-color-surface-system);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 999px;
    color: var(--sw-color-text-secondary);
    display: flex;
    font-size: var(--sw-font-size-small);
    gap: 8px;
    line-height: var(--sw-line-height-small);
    max-width: 94%;
    padding: 9px 13px;
    text-align: left;
  }

  .marker__icon {
    color: var(--sw-color-accent);
    display: inline-flex;
    flex: 0 0 auto;
  }

  .marker__text {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  @keyframes message-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`,pi=He`
  :host {
    --sw-color-accent: #8a6f55;
    --sw-color-accent-text: #ffffff;
    --sw-color-surface-panel: #fffdf9;
    --sw-color-surface-message-assistant: #ffffff;
    --sw-color-surface-message-visitor: #f1e7dd;
    --sw-color-surface-system: #f7f3ee;
    --sw-color-surface-control: #ffffff;
    --sw-color-border-soft: rgba(55, 48, 40, 0.1);
    --sw-color-text-primary: #2f2d2a;
    --sw-color-text-secondary: #716d67;
    --sw-color-text-muted: #766f68;
    --sw-color-online: #68c75a;
    --sw-color-error: #b84b3f;
    --sw-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --sw-font-size-title: 24px;
    --sw-font-size-body: 16px;
    --sw-font-size-small: 13px;
    --sw-font-size-action: 16px;
    --sw-font-weight-title: 650;
    --sw-font-weight-action: 560;
    --sw-line-height-body: 1.45;
    --sw-line-height-small: 1.35;
    --sw-radius-panel: 24px;
    --sw-radius-message: 16px;
    --sw-radius-button: 999px;
    --sw-radius-input: 999px;
    --sw-shadow-panel: 0 24px 80px rgba(28, 23, 18, 0.18);
    --sw-shadow-launcher: 0 14px 34px rgba(42, 32, 22, 0.18);
    --sw-shadow-rail: 0 12px 36px rgba(28, 23, 18, 0.12);
    --sw-motion-fast: 120ms;
    --sw-motion-panel: 180ms;
    --sw-motion-easing: cubic-bezier(0.2, 0, 0, 1);
    --sw-panel-normal-width: 520px;
    --sw-panel-wide-width: 640px;

    bottom: max(24px, env(safe-area-inset-bottom));
    color: var(--sw-color-text-primary);
    display: block;
    font-family: var(--sw-font-family);
    font-size: var(--sw-font-size-body);
    line-height: var(--sw-line-height-body);
    position: fixed;
    right: max(24px, env(safe-area-inset-right));
    z-index: 2147483000;
  }

  :host([position="bottom-left"]) {
    left: max(24px, env(safe-area-inset-left));
    right: auto;
  }

  :host([position="inline"]) {
    bottom: auto;
    left: auto;
    position: relative;
    right: auto;
    z-index: auto;
  }

  :host([theme="minimal-dark-accent"]) {
    --sw-color-accent: #3c342d;
    --sw-color-surface-panel: #ffffff;
    --sw-color-surface-message-visitor: #efefef;
    --sw-color-text-primary: #1f1f1f;
    --sw-radius-panel: 18px;
  }

  :host([theme="light-catalog"]) {
    --sw-color-accent: #647252;
    --sw-color-surface-panel: #fbfbf7;
    --sw-color-surface-message-visitor: #e9eee2;
    --sw-color-text-primary: #252821;
    --sw-radius-panel: 20px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  button,
  textarea,
  input {
    font: inherit;
  }

  button {
    color: inherit;
  }

  svg {
    display: block;
    flex-shrink: 0;
    pointer-events: none;
  }

  [hidden] {
    display: none !important;
  }

  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .launcher {
    align-items: center;
    background: var(--sw-color-accent);
    border: 0;
    border-radius: var(--sw-radius-button);
    box-shadow: var(--sw-shadow-launcher);
    color: var(--sw-color-accent-text);
    cursor: pointer;
    display: inline-flex;
    font-size: var(--sw-font-size-action);
    font-weight: var(--sw-font-weight-action);
    gap: 12px;
    min-height: 64px;
    min-width: 184px;
    padding: 0 24px;
    position: relative;
    transition:
      transform var(--sw-motion-fast) var(--sw-motion-easing),
      box-shadow var(--sw-motion-fast) var(--sw-motion-easing);
  }

  .launcher:hover {
    transform: translateY(-1px);
  }

  .launcher__badge {
    align-items: center;
    background: var(--sw-color-error);
    border: 2px solid var(--sw-color-accent-text);
    border-radius: 999px;
    color: #ffffff;
    display: inline-flex;
    font-size: 11px;
    height: 22px;
    justify-content: center;
    min-width: 22px;
    padding: 0 5px;
    position: absolute;
    right: -4px;
    top: -4px;
  }

  .panel {
    background: var(--sw-color-surface-panel);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-panel);
    box-shadow: var(--sw-shadow-panel);
    display: flex;
    flex-direction: column;
    height: min(680px, calc(100dvh - 48px));
    max-height: min(760px, calc(100vh - 48px));
    overflow: hidden;
    width: min(var(--sw-panel-normal-width), calc(100vw - 48px));
  }

  .header {
    align-items: center;
    border-bottom: 1px solid var(--sw-color-border-soft);
    display: grid;
    gap: 12px;
    grid-template-columns: 48px minmax(0, 1fr) auto;
    min-height: 94px;
    padding: 18px 20px;
  }

  .header > div:nth-child(2) {
    min-width: 0;
  }

  .header-actions {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  .header-actions [part~="minimize-button"] {
    display: none;
  }

  .brand-mark {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(35, 29, 22, 0.08);
    color: var(--sw-color-accent);
    display: inline-flex;
    height: 48px;
    justify-content: center;
    width: 48px;
  }

  .title {
    font-size: var(--sw-font-size-title);
    font-weight: var(--sw-font-weight-title);
    letter-spacing: 0;
    line-height: 1.12;
    margin: 0 0 6px;
    overflow-wrap: anywhere;
  }

  .status {
    align-items: center;
    color: var(--sw-color-text-secondary);
    display: flex;
    flex-wrap: wrap;
    font-size: var(--sw-font-size-small);
    gap: 8px;
    line-height: var(--sw-line-height-small);
  }

  .status__dot {
    background: var(--sw-color-online);
    border-radius: 50%;
    display: inline-block;
    height: 8px;
    width: 8px;
  }

  .icon-button,
  .attach-button,
  .send-button,
  .quick-reply,
  .contact-trigger,
  .phone-save,
  .retry-button,
  .attachment__remove,
  .jump-latest,
  .mobile-action {
    -webkit-tap-highlight-color: transparent;
  }

  .icon-button,
  .attach-button,
  .send-button {
    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    padding: 0;
  }

  .icon-button {
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    color: var(--sw-color-text-secondary);
    cursor: pointer;
    height: 44px;
    transition:
      background var(--sw-motion-fast) var(--sw-motion-easing),
      border-color var(--sw-motion-fast) var(--sw-motion-easing),
      color var(--sw-motion-fast) var(--sw-motion-easing);
    width: 44px;
  }

  .icon-button:hover {
    background: color-mix(in srgb, var(--sw-color-accent) 8%, var(--sw-color-surface-control));
    border-color: color-mix(in srgb, var(--sw-color-accent) 34%, var(--sw-color-border-soft));
    color: var(--sw-color-text-primary);
  }

  .panel[data-size="wide"] {
    --sw-message-max-width: 560px;

    width: min(var(--sw-panel-wide-width), calc(100vw - 48px));
  }

  .panel[data-size="fullscreen"] {
    --sw-message-max-width: 680px;

    border-radius: 18px;
    bottom: max(24px, env(safe-area-inset-bottom));
    height: auto;
    left: max(24px, env(safe-area-inset-left));
    max-height: none;
    position: fixed;
    right: max(24px, env(safe-area-inset-right));
    top: max(24px, env(safe-area-inset-top));
    width: auto;
  }

  .body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
    overflow: hidden;
    padding: 18px 20px 14px;
  }

  .message-scroller {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    position: relative;
  }

  .message-viewport {
    flex: 1;
    height: 100%;
    min-height: 0;
    outline: 0;
    overflow-anchor: none;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-right: 4px;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 11px;
    min-height: 100%;
  }

  .message-scroller__item {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    min-width: 0;
  }

  .message-scroller__tail {
    flex: 0 0 auto;
    min-height: 0;
  }

  .jump-latest {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-button);
    bottom: 8px;
    box-shadow: 0 8px 24px rgba(35, 29, 22, 0.12);
    color: var(--sw-color-text-primary);
    cursor: pointer;
    display: inline-flex;
    font-size: var(--sw-font-size-small);
    font-weight: var(--sw-font-weight-action);
    justify-content: center;
    min-height: 44px;
    padding: 0 16px;
    position: absolute;
    right: 12px;
    z-index: 1;
  }

  .quick-replies {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: nowrap;
    gap: 8px;
    max-width: 100%;
    overflow-x: auto;
    padding: 0 14px 3px 0;
    scrollbar-width: thin;
  }

  .quick-replies::after {
    content: "";
    flex: 0 0 10px;
  }

  .quick-reply {
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-button);
    cursor: pointer;
    font-size: var(--sw-font-size-action);
    min-height: 44px;
    padding: 0 18px;
    transition:
      border-color var(--sw-motion-fast) var(--sw-motion-easing),
      background var(--sw-motion-fast) var(--sw-motion-easing);
  }

  .quick-reply:hover {
    border-color: var(--sw-color-accent);
  }

  .composer-shell {
    border-top: 1px solid var(--sw-color-border-soft);
    flex: 0 0 auto;
    padding: 14px 20px 18px;
  }

  .composer {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-input);
    display: grid;
    gap: 10px;
    grid-template-columns: minmax(0, 1fr) 46px;
    min-height: 58px;
    padding: 7px 8px 7px 10px;
  }

  .composer:focus-within {
    border-color: var(--sw-color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--sw-color-accent) 24%, transparent);
  }

  .composer[data-attachments="true"] {
    grid-template-columns: 44px minmax(0, 1fr) 46px;
  }

  .attach-button {
    background: transparent;
    border: 0;
    color: var(--sw-color-accent);
    cursor: pointer;
    height: 44px;
    width: 44px;
  }

  .attach-button:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .attachment-validation {
    color: var(--sw-color-error);
    font-size: var(--sw-font-size-small);
    line-height: var(--sw-line-height-small);
    margin: 0 0 8px;
  }

  .attachment-list {
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0 0 10px;
    max-width: 100%;
    overflow-x: auto;
    padding: 0 0 2px;
  }

  .attachment {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 12px;
    display: grid;
    flex: 0 0 auto;
    gap: 6px;
    grid-template-columns: 44px minmax(42px, 1fr) 44px;
    min-width: 152px;
    overflow: hidden;
    padding: 4px;
  }

  .attachment__preview {
    background: var(--sw-color-surface-system);
    border-radius: 8px;
    display: block;
    height: 44px;
    object-fit: cover;
    width: 44px;
  }

  .attachment__details {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .attachment__label {
    font-size: var(--sw-font-size-small);
    font-weight: var(--sw-font-weight-action);
  }

  .attachment__size {
    color: var(--sw-color-text-secondary);
    font-size: 12px;
  }

  .attachment__remove {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 50%;
    color: var(--sw-color-text-secondary);
    cursor: pointer;
    display: inline-flex;
    height: 44px;
    justify-content: center;
    padding: 0;
    width: 44px;
  }

  .textarea {
    background: transparent;
    border: 0;
    color: var(--sw-color-text-primary);
    min-height: 44px;
    max-height: 118px;
    outline: 0;
    overflow-y: auto;
    padding: 10px 0;
    resize: none;
    width: 100%;
  }

  .textarea::placeholder {
    color: var(--sw-color-text-muted);
  }

  .send-button {
    background: var(--sw-color-accent);
    border: 0;
    color: var(--sw-color-accent-text);
    cursor: pointer;
    height: 46px;
    width: 46px;
  }

  .send-button:disabled {
    cursor: default;
    opacity: 0.45;
  }

  .retry-button {
    background: transparent;
    border: 0;
    color: var(--sw-color-error);
    cursor: pointer;
    margin-top: 10px;
    min-height: 36px;
    padding: 0;
    text-decoration: underline;
  }

  .contact-row {
    margin-top: 11px;
  }

  .contact-trigger {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--sw-color-accent);
    cursor: pointer;
    display: inline-flex;
    gap: 10px;
    min-height: 44px;
    padding: 0 4px;
  }

  .phone-capture {
    display: grid;
    gap: 8px;
    grid-template-columns: minmax(0, 1fr) auto;
    margin-top: 8px;
  }

  .phone-field {
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 12px;
    min-height: 44px;
    padding: 0 12px;
  }

  .phone-save {
    background: var(--sw-color-accent);
    border: 0;
    border-radius: 12px;
    color: var(--sw-color-accent-text);
    cursor: pointer;
    min-height: 44px;
    padding: 0 16px;
  }

  .footer-note {
    align-items: flex-start;
    border-top: 1px solid var(--sw-color-border-soft);
    color: var(--sw-color-text-secondary);
    display: flex;
    font-size: var(--sw-font-size-small);
    gap: 10px;
    line-height: var(--sw-line-height-small);
    margin-top: 14px;
    padding-top: 14px;
  }

  .mobile-actions {
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 20px;
    box-shadow: var(--sw-shadow-rail);
    display: none;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 16px;
    overflow: hidden;
    width: min(520px, calc(100vw - 24px));
  }

  .mobile-action {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--sw-color-text-primary);
    cursor: pointer;
    display: inline-flex;
    font-size: 15px;
    gap: 8px;
    justify-content: center;
    min-height: 72px;
    padding: 0 12px;
    text-decoration: none;
  }

  .mobile-action + .mobile-action {
    border-left: 1px solid var(--sw-color-border-soft);
  }

  .launcher:focus-visible,
  .icon-button:focus-visible,
  .quick-reply:focus-visible,
  .send-button:focus-visible,
  .attach-button:focus-visible,
  .mobile-action:focus-visible,
  .contact-trigger:focus-visible,
  .phone-field:focus-visible,
  .phone-save:focus-visible,
  .retry-button:focus-visible,
  .attachment__remove:focus-visible,
  .jump-latest:focus-visible {
    box-shadow: 0 0 0 2px var(--sw-color-surface-panel);
    outline: 3px solid var(--sw-color-accent);
    outline-offset: 3px;
  }

  .message-viewport:focus-visible {
    border-radius: 10px;
    outline: 3px solid var(--sw-color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    :host {
      bottom: max(12px, env(safe-area-inset-bottom));
      left: max(12px, env(safe-area-inset-left));
      right: max(12px, env(safe-area-inset-right));
    }

    .panel {
      border-radius: 22px;
      height: calc(100dvh - 24px);
      max-height: calc(100dvh - 24px);
      width: auto;
    }

    .mobile-actions {
      display: grid;
      width: 100%;
    }

    .launcher {
      min-height: 56px;
      min-width: 0;
    }

    .header {
      gap: 10px;
      grid-template-columns: 44px minmax(0, 1fr) auto;
      min-height: 92px;
      padding: 16px;
    }

    .header-actions {
      gap: 6px;
    }

    .brand-mark {
      height: 44px;
      width: 44px;
    }

    .title {
      font-size: 20px;
    }

    .icon-button {
      height: 44px;
      width: 44px;
    }

    .panel[data-size="wide"] {
      width: auto;
    }

    .panel[data-size="fullscreen"] {
      border-radius: 18px;
      bottom: max(8px, env(safe-area-inset-bottom));
      height: auto;
      left: max(8px, env(safe-area-inset-left));
      right: max(8px, env(safe-area-inset-right));
      top: max(8px, env(safe-area-inset-top));
      width: auto;
    }

    .body {
      padding: 14px 16px 12px;
    }

    .composer-shell {
      padding: 12px 16px 14px;
    }

    .quick-replies {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .quick-reply {
      flex: 0 0 auto;
      font-size: 15px;
    }

    .message__text {
      font-size: 15px;
    }

    .textarea,
    .phone-field {
      font-size: 16px;
    }

    .footer-note {
      margin-top: 10px;
      padding-top: 10px;
    }
  }

  @media (max-width: 480px) {
    .header {
      gap: 8px;
      grid-template-columns: 40px minmax(0, 1fr) auto;
    }

    .brand-mark {
      height: 40px;
      width: 40px;
    }

    .title {
      font-size: 18px;
    }

    .status {
      font-size: 12px;
      gap: 6px;
    }

    .header-actions {
      gap: 4px;
    }

  }

  @media (max-height: 500px) and (orientation: landscape) {
    .header {
      grid-template-columns: 40px minmax(0, 1fr) auto;
      min-height: 76px;
      padding: 10px 16px;
    }

    .brand-mark {
      height: 40px;
      width: 40px;
    }

    .title {
      font-size: 18px;
      margin-bottom: 3px;
    }

    .status {
      font-size: 12px;
      gap: 5px;
    }

    .body {
      gap: 6px;
      padding: 8px 16px;
    }

    .composer-shell {
      padding: 8px 16px 10px;
    }

    .contact-row,
    .phone-capture,
    .footer-note {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }
`;function _(s,e=22){const t={width:e,height:e};switch(s){case"send":return S(t,y`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);case"phone":return S(t,y`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`);case"calculator":return S(t,y`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`);case"close":return S(t,y`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);case"minus":return S(t,y`<path d="M5 12h14" />`);case"paperclip":return S(t,y`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);case"shield":return S(t,y`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`);case"brand":return S(t,y`<path d="m8 3 4 8 5-5 5 15H2Z" />`);case"plus":return S(t,y`<path d="M5 12h14" /><path d="M12 5v14" />`);case"maximize-2":case"expand":return S(t,y`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);case"minimize-2":case"shrink":return S(t,y`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);case"spark":return S(t,y`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`);case"loader":return S(t,y`<path d="M21 12a9 9 0 1 1-2.64-6.36" />`);case"message":default:return S(t,y`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`)}}function S(s,e){return y`<svg
    aria-hidden="true"
    width=${s.width}
    height=${s.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
  >
    ${e}
  </svg>`}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mi=rt(class extends nt{constructor(){super(...arguments),this.key=p}render(s,e){return this.key=s,e}update(s,[e,t]){return e!==this.key&&(ct(s),this.key=e),t}}),gi="image/jpeg,image/png,image/webp",It="Добавить фото";function fi({label:s=It,disabled:e=!1,onFilesSelected:t}){const i=s.trim()||It;return f`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${i}
      aria-label=${i}
      ?disabled=${e}
      @click=${wi}
    >
      ${_("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${gi}
      multiple
      hidden
      ?disabled=${e}
      @change=${o=>xi(o,t)}
    />
  `}function bi({attachments:s,validationMessage:e="",validationRevision:t=0,onRemove:i}){const o=e.trim();return f`
    ${o?mi(t,f`<p class="attachment-validation" role="alert" data-validation-revision=${t}>
            ${o}
          </p>`):p}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${yi(s.length)}
    </span>
    ${s.length>0?f`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${s.map((r,n)=>{const c=n+1;return f`
                <li class="attachment" part="attachment">
                  <img
                    class="attachment__preview"
                    part="attachment-preview"
                    src=${r.previewUrl}
                    alt=""
                    width=${de(r.width)}
                    height=${de(r.height)}
                    decoding="async"
                  />
                  <span class="attachment__details">
                    <span class="attachment__label">Фото ${c}</span>
                    <span class="attachment__size">${_i(r.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${r.id}
                    type="button"
                    aria-label=${`Удалить фото ${c}`}
                    @click=${()=>i(r.id)}
                  >
                    ${_("close",18)}
                  </button>
                </li>
              `})}
          </ul>
        `:p}
  `}function vi(s){return s.length===0?p:f`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${s.map((e,t)=>f`
          <li class="message-attachment" part="attachment">
            <img
              class="message-attachment__preview"
              part="attachment-preview"
              src=${e.previewUrl}
              alt=${`Фото ${t+1}`}
              width=${de(e.width)}
              height=${de(e.height)}
              decoding="async"
            />
          </li>
        `)}
    </ul>
  `}function wi(s){const e=s.currentTarget;if(!(e instanceof HTMLButtonElement))return;const t=e.nextElementSibling;t instanceof HTMLInputElement&&!t.disabled&&t.click()}function xi(s,e){const t=s.currentTarget;if(!(t instanceof HTMLInputElement))return;const i=t.files?Array.from(t.files):[];t.value="",i.length>0&&e(i)}function yi(s){return`Выбрано фото: ${s}`}function _i(s){const e=Math.max(0,Math.floor(s));return e<1024?`${e} Б`:e<1048576?`${Mt(e/1024)} КБ`:`${Mt(e/1048576)} МБ`}function Mt(s){const e=s>=10?0:1;return s.toFixed(e).replace(".",",")}function de(s){return Math.max(1,Math.floor(s))}function Si(s,e){return s.role==="system"?Mi(s):Ai(s,e)}function Ai(s,e){return f`<div
    class=${`message-root message-root--${s.role}`}
    part="message-root"
    data-message-id=${s.id}
    data-message-status=${s.status}
    data-public-message-id=${s.publicMessageId??p}
    data-acceptance-status=${s.acceptanceStatus??p}
  >
    ${$i(s,e)} ${Ei(s,e)}
  </div>`}function $i(s,e){return f`<article class=${Ti(s)} part=${`message message-${s.role} message-bubble`}>
    <p class="message__text">${s.text}</p>
    ${vi(e.images??[])}
  </article>`}function Ei(s,e){const t=s.status==="pending"||s.status==="saved"||s.status==="error";return!s.disclosure&&!t?p:f`<div class="message-meta" part="message-meta">
    ${s.disclosure?f`<div class="message-disclosure" part="message-disclosure">
          ${_("spark",16)}
          <span>${s.disclosureText??e.config.disclosureText}</span>
        </div>`:p}
    ${t?f`<div class=${`message-status-row message-status-row--${s.status}`}>
          <span class="message-status" part="message-status">
            ${s.status==="pending"?f`<span class="message-status__spinner" aria-hidden="true">${_("loader",14)}</span
                  >Отправляем…`:s.status==="saved"?"Сохранено":"Не отправлено"}
          </span>
          ${Ii(s,e)}
        </div>`:p}
  </div>`}function Ii(s,e){return s.status!=="error"?p:f`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${()=>e.onRetry(s.id)}
    >
      ${e.config.retryLabel}
    </button>
  </div>`}function Mi(s){return f`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${s.id}
    data-system-kind=${s.systemKind??"fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${_("shield",16)}</span>
    <span class="marker__text" part="marker-text">${s.text}</span>
  </div>`}function Ti(s){const e=["message",`message--${s.role}`];return s.status==="error"&&e.push("message--error"),e.join(" ")}const ue="granit-site-widget",ki=["normal","wide","fullscreen"],Pi=["normal","fullscreen"],Ci={normal:"обычный размер",wide:"широкий режим",fullscreen:"на весь экран"},Re=class Re extends Q{constructor(){super(...arguments),this.config=me(),this.state=re({config:this.config}),this.panelSize="normal",this.hasBooted=!1,this.publicSessionId="",this.operationEpoch=0,this.messageScroller=new qs(this),this.imageAttachments=new zs(this),this.sendMessageRequest=ri,this.panelId=Z("sw-panel"),this.titleId=Z("sw-title"),this.phoneCaptureId=Z("sw-phone"),this.cyclePanelSize=()=>{this.panelSize=this.getNextPanelSize(),this.sessionStore?.setPanelSize(this.panelSize),this.requestUpdate()},this.handleSubmit=e=>{e.preventDefault(),this.submitDraft()},this.handleInput=e=>{const t=e.currentTarget;this.state=w(this.state,{type:"draft.changed",value:t.value},this.config),this.requestUpdate()},this.handleTextareaKeydown=e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.submitDraft())},this.handlePanelKeydown=e=>{e.key==="Escape"&&(e.preventDefault(),this.close())},this.handleQuickReplyFocus=e=>{const t=e.currentTarget;t instanceof HTMLElement&&typeof t.scrollIntoView=="function"&&t.scrollIntoView({behavior:"auto",block:"nearest",inline:"nearest"})},this.toggleContactCapture=()=>{this.state=w(this.state,{type:"contact.capture.toggled"},this.config),this.requestUpdate(),this.updateComplete.then(()=>this.renderRoot.querySelector(".phone-field")?.focus())},this.handlePhoneInput=e=>{const t=e.currentTarget.value;this.state={...this.state,contactPhone:t}},this.handlePhoneKeydown=e=>{e.key==="Enter"&&(e.preventDefault(),this.savePhone())},this.savePhone=()=>{const e=this.state.contactPhone.trim();this.state=w(this.state,{type:"contact.phone.saved",phone:e},this.config),$(this,"phone-saved",this.config,{hasPhone:e.length>0}),this.requestUpdate()},this.retryPending=async e=>{if(!this.state.pending||this.state.submitting||e&&e!==this.state.pending.messageId)return;const t=this.state.pending,i=this.operationEpoch;this.state=w(this.state,{type:"retry.started"},this.config),this.requestUpdate(),await this.sendPending(t,i)},this.handleAttachmentFiles=async e=>{this.isPhotoPreviewEnabled()&&await this.imageAttachments.selectFiles(e)},this.handleRemoveAttachment=e=>{const t=this.imageAttachments.removeDraft(e);this.updateComplete.then(()=>{(t?[...this.renderRoot.querySelectorAll("[data-attachment-id]")].find(o=>o.dataset.attachmentId===t):this.renderRoot.querySelector(".attach-button"))?.focus()})}}static get observedAttributes(){return[...super.observedAttributes,...zt]}connectedCallback(){const e=this.hasBooted;super.connectedCallback(),this.boot(),e&&this.requestUpdate()}disconnectedCallback(){this.invalidateActiveWork(!0),super.disconnectedCallback()}attributeChangedCallback(e,t,i){if(t===i||!this.hasBooted)return;const o=this.config,r=this.isPhotoPreviewEnabled();this.config=Oe(this),this.syncHostAttributes();const n=this.isPhotoPreviewEnabled(),c=o.widgetInstanceId!==this.config.widgetInstanceId||o.storage!==this.config.storage,a=o.apiBaseUrl!==this.config.apiBaseUrl||o.messagesPath!==this.config.messagesPath||o.timeoutMs!==this.config.timeoutMs||o.mock!==this.config.mock,l=r!==n;if(c){const h=this.state.open;this.invalidateActiveWork(!1),this.imageAttachments.clearAll(),this.sessionStore=$t(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId(),this.panelSize=this.sessionStore.getPanelSize()??this.config.panelSize,this.state=re({config:this.config,open:h})}else(a||l)&&this.invalidateActiveWork(!0);this.imageAttachments.setEnabled(n),e==="panel-size"&&(this.panelSize=this.config.panelSize),e==="open"&&(this.state=w(this.state,this.hasAttribute("open")?{type:"open"}:{type:"close"},this.config)),this.requestUpdate()}open(){this.boot(),this.state=w(this.state,{type:"open"},this.config),this.hasAttribute("open")||this.setAttribute("open",""),this.persistOpenState(!0),$(this,"opened",this.config),this.requestUpdate(),this.focusInputSoon()}close(){this.boot(),this.state=w(this.state,{type:"close"},this.config),this.hasAttribute("open")&&this.removeAttribute("open"),this.persistOpenState(!1),$(this,"closed",this.config),this.requestUpdate(),this.focusLauncherSoon()}sendMessage(e){this.boot(),this.state=w(this.state,{type:"draft.changed",value:e},this.config),this.submitDraft()}clearSession(){this.invalidateActiveWork(!1),this.imageAttachments.clearAll(),this.state=w(this.state,{type:"session.cleared"},this.config),this.sessionStore?.clearPublicSessionId(),this.publicSessionId=this.sessionStore?.getPublicSessionId()??"",this.requestUpdate()}render(){const e=Ws(this.state,this.config),t=this.getEffectivePanelSize(),i=this.getPanelSizeButtonLabel(),o=t==="fullscreen"?"minimize-2":"maximize-2",r=this.messageScroller.getSnapshot(),n=this.isPhotoPreviewEnabled(),c=this.imageAttachments.isProcessing(),a=e.pending?e.messages.find(h=>h.id===e.pending?.messageId):void 0,l=a?.status==="error"?this.config.errorMessage:a?.status==="pending"?"Отправляем сообщение.":"";return f`
      <button
        class="launcher"
        part="launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded=${String(e.open)}
        aria-controls=${this.panelId}
        ?hidden=${e.open}
        @click=${()=>this.open()}
      >
        <span part="launcher-icon" aria-hidden="true">${_("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${e.unreadCount>0?f`<span class="launcher__badge" aria-label=${`${e.unreadCount} новых сообщений`}
              >${e.unreadCount}</span
            >`:p}
      </button>

      ${this.renderMobileActions(e.showMobileActions)}

      <section
        id=${this.panelId}
        class="panel"
        part="panel"
        data-size=${t}
        role="dialog"
        aria-modal="false"
        aria-labelledby=${this.titleId}
        ?hidden=${!e.open}
        @keydown=${this.handlePanelKeydown}
      >
        <header class="header" part="header">
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${_("brand",24)}</div>
          <div>
            <h2 id=${this.titleId} class="title" part="title">${this.config.headerTitle}</h2>
            <div class="status" part="status">
              <span class="status__dot" aria-hidden="true"></span>
              <span>${this.config.headerStatus}</span>
              <span aria-hidden="true">·</span>
              <span>${this.config.headerResponseTime}</span>
            </div>
          </div>
          <div class="header-actions" part="header-actions">
            <button
              class="icon-button"
              part="resize-button"
              type="button"
              aria-label=${i}
              title=${i}
              @click=${this.cyclePanelSize}
            >
              ${_(o)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${()=>this.close()}
            >
              ${_("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${()=>this.close()}
            >
              ${_("close")}
            </button>
          </div>
        </header>

        <div class="body" part="body">
          <div class="message-scroller">
            <div
              class="message-viewport"
              part="message-viewport"
              role="region"
              aria-label="Сообщения"
              tabindex="0"
            >
              <div
                class="messages"
                part="messages"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-busy=${String(e.submitting)}
              >
                ${ys(e.messages,h=>h.id,h=>f`<div
                    class="message-scroller__item"
                    data-message-id=${h.id}
                    data-scroll-anchor=${h.role==="visitor"?"true":p}
                  >
                    ${Si(h,{config:this.config,onRetry:this.retryPending,images:this.imageAttachments.getForMessage(h.id)})}
                  </div>`)}
                <div class="message-scroller__tail" aria-hidden="true"></div>
              </div>
            </div>
            ${r.canScrollEnd?f`<button
                  class="jump-latest"
                  part="jump-latest"
                  type="button"
                  @click=${()=>this.messageScroller.scrollToEnd({behavior:"smooth"})}
                >
                  ${r.newItemCount>0?"Новые сообщения":"К новым сообщениям"}
                </button>`:p}
          </div>

          ${e.showQuickReplies?f`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(h=>f`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${()=>this.handleQuickReply(h.text??h.value??h.label)}
                    @focus=${this.handleQuickReplyFocus}
                  >
                    ${h.label}
                  </button>`)}
              </div>`:p}
        </div>

        <div class="composer-shell" part="composer-shell">
          ${n?bi({attachments:this.imageAttachments.getDraft(),validationMessage:this.imageAttachments.getValidationMessage(),validationRevision:this.imageAttachments.getValidationRevision(),onRemove:this.handleRemoveAttachment}):p}
          <form
            class="composer"
            part="composer"
            data-attachments=${String(n)}
            @submit=${this.handleSubmit}
          >
            ${n?fi({label:this.config.attachLabel,disabled:c||e.submitting||!!e.pending,onFilesSelected:this.handleAttachmentFiles}):p}
            <label class="visually-hidden" for="granit-site-widget-message">${this.config.placeholder}</label>
            <textarea
              id="granit-site-widget-message"
              class="textarea"
              part="input textarea"
              rows="1"
              maxlength=${this.config.maxMessageLength}
              placeholder=${this.config.placeholder}
              aria-label=${this.config.placeholder}
              .value=${e.draft}
              ?disabled=${e.submitting}
              @input=${this.handleInput}
              @keydown=${this.handleTextareaKeydown}
            ></textarea>
            <button
              class="send-button"
              part="send-button"
              type="submit"
              aria-label=${this.config.sendLabel}
              ?disabled=${!e.canSend||c}
            >
              ${_("send")}
            </button>
          </form>

          ${e.showContactTrigger?f`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  aria-expanded=${String(e.contactCaptureOpen)}
                  aria-controls=${this.phoneCaptureId}
                  @click=${this.toggleContactCapture}
                >
                  ${_("plus",18)}
                  <span>${e.contactLabel}</span>
                </button>
              </div>
              <div
                id=${this.phoneCaptureId}
                class="phone-capture"
                part="phone-capture"
                ?hidden=${!e.contactCaptureOpen}
              >
                <label class="visually-hidden" for="granit-site-widget-phone">${this.config.phoneCaptureLabel}</label>
                <input
                  id="granit-site-widget-phone"
                  class="phone-field"
                  part="phone-field"
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder=${this.config.phonePlaceholder}
                  .value=${e.contactPhone}
                  @input=${this.handlePhoneInput}
                  @keydown=${this.handlePhoneKeydown}
                />
                <button class="phone-save" part="phone-save-button" type="button" @click=${this.savePhone}>OK</button>
              </div>`:p}

          <div class="footer-note" part="footer-note">
            <span aria-hidden="true">${_("shield",18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${l}</div>
        </div>
      </section>
    `}updated(){this.autoGrowTextarea();const e=this.renderRoot.querySelector(".message-scroller"),t=this.renderRoot.querySelector(".message-viewport"),i=this.renderRoot.querySelector(".messages"),o=this.renderRoot.querySelector(".message-scroller__tail");e&&t&&i&&o&&(this.messageScroller.connect({root:e,viewport:t,content:i,tailSpacer:o}),this.messageScroller.reconcile(this.state.messages.map(r=>({id:r.id,scrollAnchor:r.role==="visitor"}))))}boot(){if(this.hasBooted)return;this.config=Oe(this),this.syncHostAttributes(),this.sessionStore=$t(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId(),this.panelSize=this.sessionStore.getPanelSize()??this.config.panelSize,this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());const e=this.config.persistOpenState?this.sessionStore.getOpenState():void 0,t=this.hasAttribute("open")||(e??this.config.initialState==="open");this.state=re({config:this.config,open:t}),t&&!this.hasAttribute("open")&&this.setAttribute("open",""),this.hasBooted=!0,this.updateComplete.then(()=>{$(this,"ready",this.config),t&&this.focusInputSoon()})}syncHostAttributes(){this.getAttribute("theme")!==this.config.theme&&this.setAttribute("theme",this.config.theme),this.getAttribute("position")!==this.config.position&&this.setAttribute("position",this.config.position)}persistOpenState(e){this.config.persistOpenState&&this.sessionStore?.setOpenState(e)}getPanelSizeButtonLabel(){return`${this.config.resizeLabel}: ${Ci[this.getNextPanelSize()]}`}getNextPanelSize(){const e=this.getPanelSizeOrder(),t=e.includes(this.panelSize)?this.panelSize:"normal",i=e.indexOf(t);return e[(i+1)%e.length]??"normal"}getEffectivePanelSize(){return this.isMobileViewport()&&this.panelSize==="wide"?"normal":this.panelSize}getPanelSizeOrder(){return this.isMobileViewport()?Pi:ki}isMobileViewport(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(max-width: 767px)").matches}handleQuickReply(e){$(this,"action-clicked",this.config,{actionType:"quick-reply"}),this.state=w(this.state,{type:"draft.changed",value:e},this.config),this.requestUpdate(),this.config.quickReplySubmit==="auto"?this.submitDraft():this.focusInputSoon()}renderMobileActions(e){return e?f`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map(t=>this.renderMobileAction(t))}
    </nav>`:p}renderMobileAction(e){const t=e.icon??e.type;return e.type==="call"||e.type==="link"?f`<a
        class="mobile-action"
        part="mobile-action"
        href=${e.href}
        target=${e.type==="link"?e.target??"_blank":"_self"}
        rel=${e.type==="link"&&e.target!=="_self"?"noopener noreferrer":""}
        @click=${()=>$(this,"action-clicked",this.config,{actionType:e.type})}
      >
        ${_(t,20)}
        <span>${e.label}</span>
      </a>`:f`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${()=>this.handleMobileAction(e)}
    >
      ${_(t,20)}
      <span>${e.label}</span>
    </button>`}handleMobileAction(e){$(this,"action-clicked",this.config,{actionType:e.type}),this.open(),e.type==="prefill"&&(this.state=w(this.state,{type:"draft.changed",value:e.text},this.config),this.requestUpdate(),this.focusInputSoon())}async submitDraft(){if(!this.isConnected)return;const e=this.operationEpoch;let t=this.state.draft.trim();if(ne(t,this.config)||this.state.submitting||this.state.pending||this.isPhotoPreviewEnabled()&&this.imageAttachments.isProcessing()&&(await this.imageAttachments.whenIdle(),e!==this.operationEpoch||!this.isConnected||(t=this.state.draft.trim(),ne(t,this.config)||this.state.submitting||this.state.pending))||e!==this.operationEpoch||!this.isConnected)return;const i=_s(this.publicSessionId);this.state=w(this.state,{type:"submit.started",text:t,idempotencyKey:i},this.config);const o=this.state.pending;!o||o.idempotencyKey!==i||(this.isPhotoPreviewEnabled()&&this.imageAttachments.transferDraftToMessage(o.messageId),this.requestUpdate(),await this.sendPending(o,e))}async sendPending(e,t){this.abortController?.abort();const i=new AbortController;this.abortController=i;const{messageId:o,text:r,idempotencyKey:n}=e,c=()=>this.operationEpoch===t&&this.abortController===i&&!i.signal.aborted&&this.isConnected&&this.state.pending?.messageId===o&&this.state.pending.idempotencyKey===n;try{const a=Ds({config:this.config,text:r,publicSessionId:this.publicSessionId,idempotencyKey:n,contact:this.buildContact(),environment:Vs()});if($(this,"message-submitted",this.config,{idempotencyKey:n,publicSessionId:this.publicSessionId,messageText:r}),!c())return;const l=await this.sendMessageRequest(this.config,a,i.signal);if(!c())return;if(l.source==="server"){if(this.publicSessionId&&l.publicSessionId!==this.publicSessionId)throw new Error("Invalid site_widget.v1 response: public_session_id_mismatch");this.publicSessionId=l.publicSessionId,this.sessionStore?.setPublicSessionId(l.publicSessionId),this.state=w(this.state,{type:"visitor.saved",messageId:o,publicMessageId:l.publicMessageId,acceptanceStatus:l.acceptanceStatus},this.config)}else this.state=w(this.state,{type:"visitor.mocked",messageId:o},this.config);if(l.status==="replied"){if(!l.replyText)throw new Error("Widget replied response is missing reply text");this.state=w(this.state,{type:"assistant.replied",text:l.replyText,publicMessageId:l.source==="server"?l.replyPublicMessageId:void 0,disclosureText:l.source==="server"?l.disclosureText:void 0},this.config)}else{const h=l.status==="disabled"?"disabled":"fallback";this.state=w(this.state,{type:"system.message",text:l.systemText||this.config.fallbackMessage,status:h},this.config),$(this,"fallback-shown",this.config,{status:h,reason:l.status==="fallback"&&"reason"in l?l.reason??"":""})}$(this,"response-received",this.config,{status:l.status,acceptanceStatus:l.source==="server"?l.acceptanceStatus:"mock",reason:l.status==="fallback"&&"reason"in l?l.reason??"":""}),this.requestUpdate()}catch(a){if(a instanceof DOMException&&a.name==="AbortError"&&i.signal.aborted||!c())return;this.state=w(this.state,{type:"submit.failed",text:this.config.errorMessage,messageId:o},this.config),$(this,"error",this.config,{errorMessage:a instanceof Error?a.message:String(a)}),this.requestUpdate()}finally{this.abortController===i&&(this.abortController=void 0)}}invalidateActiveWork(e){this.operationEpoch+=1;const t=this.abortController;this.abortController=void 0,t?.abort(),e&&this.state.pending&&this.state.submitting&&(this.state=w(this.state,{type:"submit.failed",text:this.config.errorMessage,messageId:this.state.pending.messageId},this.config))}buildContact(){const e=this.state.contactPhone.trim();return e?{phone:e,preferred_contact:"phone"}:void 0}isPhotoPreviewEnabled(){return this.config.mock&&this.config.attachmentsEnabled&&this.config.showAttachmentSlot}autoGrowTextarea(){const e=this.renderRoot.querySelector(".textarea");e&&(e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,118)}px`)}async focusInputSoon(){await this.updateComplete,this.renderRoot.querySelector(".textarea")?.focus()}async focusLauncherSoon(){await this.updateComplete,this.renderRoot.querySelector(".launcher")?.focus()}};Re.styles=[pi,ui];let Ce=Re;function pe(s=ue){typeof window>"u"||!window.customElements||window.customElements.get(s)||window.customElements.define(s,Ce)}function Tt(s={}){if(typeof document>"u")throw new Error("mountSiteWidget requires a browser document");pe();const e=document.createElement(ue);Ot(e,s);const t=s.target??document.body;if(!t)throw new Error("mountSiteWidget target was not found");return t.appendChild(e),e}return pe(),typeof window<"u"&&(window.GranitSiteWidget={define:pe,mount:Tt,tagName:ue}),H.SITE_WIDGET_TAG_NAME=ue,H.defineSiteWidget=pe,H.mountSiteWidget=Tt,Object.defineProperty(H,Symbol.toStringTag,{value:"Module"}),H})({});
//# sourceMappingURL=site-widget.iife.js.map

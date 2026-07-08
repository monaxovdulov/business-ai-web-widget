var GranitSiteWidget=(function(L){"use strict";const P={apiBaseUrl:"",messagesPath:"/public/intake/site-widget/messages",timeoutMs:15e3,widgetInstanceId:"default",theme:"memorial-soft",position:"bottom-right",panelSize:"normal",mock:!1,initialState:"closed",persistOpenState:!1,storage:"local",quickReplySubmit:"prefill",showQuickActions:!0,showMobileActions:!0,showAttachmentSlot:!0,attachmentsEnabled:!1,collectPhoneAfterFirstMessage:!1,includeMessageTextInEvents:!1,maxMessageLength:1e3,launcherLabel:"Написать",headerTitle:"Поможем с заказом",headerStatus:"Онлайн",headerResponseTime:"обычно отвечаем за 2 минуты",introMessage:`Здравствуйте! 👋
Подскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.`,placeholder:"Напишите сообщение...",disclosureText:"Автоответ. Менеджер проверит детали и подтвердит условия.",footerNote:"Расчет бесплатный. Точную стоимость подтвердит менеджер после уточнения деталей.",phoneCaptureLabel:"Добавить телефон для ответа",phoneSavedLabel:"Телефон добавлен",phonePlaceholder:"+7 999 000-00-00",fallbackMessage:"Сообщение принято. Менеджер ответит после уточнения деталей.",disabledMessage:"Сообщение принято. Менеджер проверит детали и ответит вам.",errorMessage:"Не удалось отправить сообщение. Проверьте соединение и попробуйте еще раз.",retryLabel:"Повторить",sendLabel:"Отправить",attachLabel:"Вложения будут доступны позже",resizeLabel:"Изменить размер виджета",closeLabel:"Закрыть виджет",minimizeLabel:"Свернуть виджет",phoneHref:void 0,privacyUrl:void 0,quickReplies:[{label:"Нужен расчет",text:"Нужен расчет памятника с установкой"},{label:"Есть вопрос",text:"Здравствуйте, у меня есть вопрос по заказу"},{label:"Хочу каталог",text:"Хочу посмотреть каталог памятников"}],mobileActions:[{type:"call",label:"Позвонить",href:"tel:",icon:"phone"},{type:"open",label:"Написать",icon:"message"},{type:"prefill",label:"Расчет",text:"Нужен расчет памятника",icon:"calculator"}]},ye={"api-base-url":"apiBaseUrl","messages-path":"messagesPath","timeout-ms":"timeoutMs","widget-instance-id":"widgetInstanceId",theme:"theme",position:"position","panel-size":"panelSize",mock:"mock","initial-state":"initialState","persist-open-state":"persistOpenState",storage:"storage","quick-reply-submit":"quickReplySubmit","show-quick-actions":"showQuickActions","show-mobile-actions":"showMobileActions","show-attachment-slot":"showAttachmentSlot","attachments-enabled":"attachmentsEnabled","collect-phone-after-first-message":"collectPhoneAfterFirstMessage","include-message-text-in-events":"includeMessageTextInEvents","max-message-length":"maxMessageLength","launcher-label":"launcherLabel","header-title":"headerTitle","header-status":"headerStatus","header-response-time":"headerResponseTime","intro-message":"introMessage",placeholder:"placeholder","input-placeholder":"placeholder","disclosure-text":"disclosureText","footer-note":"footerNote","phone-capture-label":"phoneCaptureLabel","phone-saved-label":"phoneSavedLabel","phone-placeholder":"phonePlaceholder","fallback-message":"fallbackMessage","disabled-message":"disabledMessage","error-message":"errorMessage","retry-label":"retryLabel","send-label":"sendLabel","attach-label":"attachLabel","resize-label":"resizeLabel","close-label":"closeLabel","minimize-label":"minimizeLabel","phone-href":"phoneHref","privacy-url":"privacyUrl"},Ze=[...Object.keys(ye),"config","quick-replies","mobile-actions","open"],Ge=new Set(["mock","persistOpenState","showQuickActions","showMobileActions","showAttachmentSlot","attachmentsEnabled","collectPhoneAfterFirstMessage","includeMessageTextInEvents"]),Je=new Set(["timeoutMs","maxMessageLength"]);function te(t={}){const e={...P,...t},s=$e(e.timeoutMs,P.timeoutMs,6e4),i=$e(e.maxMessageLength,P.maxMessageLength,1e4);return{...e,apiBaseUrl:ct(f(e.apiBaseUrl)),messagesPath:lt(e.messagesPath),timeoutMs:s,widgetInstanceId:f(e.widgetInstanceId)||P.widgetInstanceId,theme:f(e.theme)||P.theme,position:it(e.position),panelSize:ot(e.panelSize),mock:!!e.mock,initialState:rt(e.initialState),persistOpenState:!!e.persistOpenState,storage:nt(e.storage),quickReplySubmit:at(e.quickReplySubmit),showQuickActions:!!e.showQuickActions,showMobileActions:!!e.showMobileActions,showAttachmentSlot:!!e.showAttachmentSlot,attachmentsEnabled:!!e.attachmentsEnabled,collectPhoneAfterFirstMessage:!!e.collectPhoneAfterFirstMessage,includeMessageTextInEvents:!!e.includeMessageTextInEvents,maxMessageLength:i,phoneHref:I(e.phoneHref),privacyUrl:I(e.privacyUrl),quickReplies:se(e.quickReplies),mobileActions:ie(e.mobileActions,e.phoneHref)}}function xe(t){const e={...tt(t),...ve(t.getAttribute("config"))};for(const[s,i]of Object.entries(ye)){if(!t.hasAttribute(s))continue;const o=t.getAttribute(s);o!=null&&(Ge.has(i)?e[i]=st(o):Je.has(i)?e[i]=Number(o):e[i]=o)}return t.hasAttribute("quick-replies")&&(e.quickReplies=Xe(t.getAttribute("quick-replies")??"")),t.hasAttribute("mobile-actions")&&(e.mobileActions=et(t.getAttribute("mobile-actions")??"")),te(e)}function Ye(t,e={}){const s=te(e);c(t,"api-base-url",s.apiBaseUrl),c(t,"messages-path",s.messagesPath),c(t,"timeout-ms",String(s.timeoutMs)),c(t,"widget-instance-id",s.widgetInstanceId),c(t,"theme",s.theme),c(t,"position",s.position),c(t,"panel-size",s.panelSize),c(t,"initial-state",s.initialState),c(t,"storage",s.storage),c(t,"quick-reply-submit",s.quickReplySubmit),c(t,"launcher-label",s.launcherLabel),c(t,"header-title",s.headerTitle),c(t,"header-status",s.headerStatus),c(t,"header-response-time",s.headerResponseTime),c(t,"intro-message",s.introMessage),c(t,"placeholder",s.placeholder),c(t,"disclosure-text",s.disclosureText),c(t,"footer-note",s.footerNote),c(t,"phone-capture-label",s.phoneCaptureLabel),c(t,"phone-saved-label",s.phoneSavedLabel),c(t,"phone-placeholder",s.phonePlaceholder),c(t,"fallback-message",s.fallbackMessage),c(t,"disabled-message",s.disabledMessage),c(t,"error-message",s.errorMessage),c(t,"retry-label",s.retryLabel),c(t,"send-label",s.sendLabel),c(t,"attach-label",s.attachLabel),c(t,"resize-label",s.resizeLabel),c(t,"close-label",s.closeLabel),c(t,"minimize-label",s.minimizeLabel),c(t,"phone-href",s.phoneHref),c(t,"privacy-url",s.privacyUrl),c(t,"max-message-length",String(s.maxMessageLength)),S(t,"mock",s.mock),S(t,"persist-open-state",s.persistOpenState),S(t,"show-quick-actions",s.showQuickActions),S(t,"show-mobile-actions",s.showMobileActions),S(t,"show-attachment-slot",s.showAttachmentSlot),S(t,"attachments-enabled",s.attachmentsEnabled),S(t,"collect-phone-after-first-message",s.collectPhoneAfterFirstMessage),S(t,"include-message-text-in-events",s.includeMessageTextInEvents),(e.open||s.initialState==="open")&&t.setAttribute("open",""),s.quickReplies.length>0&&t.setAttribute("quick-replies",JSON.stringify(s.quickReplies)),s.mobileActions.length>0&&t.setAttribute("mobile-actions",JSON.stringify(s.mobileActions));for(const[i,o]of Object.entries(e.attributes??{}))t.setAttribute(i,o)}function Xe(t){const e=t.trim();if(!e)return[];const s=oe(e);return Array.isArray(s)?se(s):se(e.split("|").map(i=>({label:i.trim(),text:i.trim()})).filter(i=>i.label))}function et(t){const e=t.trim();if(!e)return[];const s=oe(e);return Array.isArray(s)?ie(s):ie(e.split("|").map(i=>({type:"open",label:i.trim()})).filter(i=>i.label))}function se(t=[]){return t.map(e=>{const s=f(e?.label),i=f(e?.text??e?.value??e?.label);return{label:s,text:i}}).filter(e=>e.label.length>0&&e.text.length>0).slice(0,6)}function ie(t=[],e){return t.map(s=>{const i=f(s?.label);if(i){if(s.type==="call"){const o=f(s.href||e||"tel:");return{type:"call",label:i,href:o,icon:I(s.icon)}}if(s.type==="link"){const o=f(s.href);return o?{type:"link",label:i,href:o,target:s.target==="_self"?"_self":"_blank",icon:I(s.icon)}:void 0}if(s.type==="prefill"){const o=f(s.text);return o?{type:"prefill",label:i,text:o,icon:I(s.icon)}:void 0}return{type:"open",label:i,icon:I(s.icon)}}}).filter(s=>!!s).slice(0,4)}function tt(t){const e=t.querySelector?.('script[type="application/json"][data-site-widget-config]');return e?.textContent?ve(e.textContent):{}}function ve(t){if(!t?.trim())return{};const e=oe(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function c(t,e,s){s&&s.length>0&&t.setAttribute(e,s)}function S(t,e,s){s?t.setAttribute(e,"true"):t.removeAttribute(e)}function st(t){const e=t.trim().toLowerCase();return e===""||e==="1"||e==="true"||e==="yes"}function it(t){const e=f(t);return e==="bottom-left"||e==="inline"?e:"bottom-right"}function ot(t){const e=f(t);return e==="wide"||e==="fullscreen"?e:"normal"}function rt(t){return f(t)==="open"?"open":"closed"}function nt(t){return f(t)==="memory"?"memory":"local"}function at(t){return f(t)==="auto"?"auto":"prefill"}function lt(t){const e=f(t);return e?e.startsWith("/")?e:`/${e}`:P.messagesPath}function $e(t,e,s){const i=Number(t);return!Number.isInteger(i)||i<=0?e:Math.min(i,s)}function ct(t){return t.replace(/\/+$/,"")}function I(t){return f(t)||void 0}function f(t){return String(t??"").trim()}function oe(t){try{return JSON.parse(t)}catch{return}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis,re=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),Se=new WeakMap;let _e=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(re&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=Se.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Se.set(s,e))}return e}toString(){return this.cssText}};const ht=t=>new _e(typeof t=="string"?t:t+"",void 0,ne),Ae=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1],t[0]);return new _e(s,t,ne)},dt=(t,e)=>{if(re)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const i=document.createElement("style"),o=K.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}},ke=re?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return ht(s)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:pt,defineProperty:ut,getOwnPropertyDescriptor:ft,getOwnPropertyNames:gt,getOwnPropertySymbols:mt,getPrototypeOf:bt}=Object,F=globalThis,Ee=F.trustedTypes,wt=Ee?Ee.emptyScript:"",yt=F.reactiveElementPolyfillSupport,O=(t,e)=>t,ae={toAttribute(t,e){switch(e){case Boolean:t=t?wt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Me=(t,e)=>!pt(t,e),Pe={attribute:!0,type:String,converter:ae,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;let z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Pe){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,s);o!==void 0&&ut(this.prototype,e,o)}}static getPropertyDescriptor(e,s,i){const{get:o,set:r}=ft(this.prototype,e)??{get(){return this[s]},set(n){this[s]=n}};return{get:o,set(n){const h=o?.call(this);r?.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pe}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const e=bt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const s=this.properties,i=[...gt(s),...mt(s)];for(const o of i)this.createProperty(o,s[o])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,o]of s)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const o=this._$Eu(s,i);o!==void 0&&this._$Eh.set(o,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)s.unshift(ke(o))}else e!==void 0&&s.push(ke(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:ae).toAttribute(s,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,s){const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=i.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ae;this._$Em=o;const h=n.fromAttribute(s,r.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(e,s,i,o=!1,r){if(e!==void 0){const n=this.constructor;if(o===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??Me)(r,s)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??s??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i){const{wrapped:n}=r,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,r,h)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[O("elementProperties")]=new Map,z[O("finalized")]=new Map,yt?.({ReactiveElement:z}),(F.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=globalThis,Ie=t=>t,V=le.trustedTypes,ze=V?V.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ce="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+_,xt=`<${Te}>`,k=document,U=()=>k.createComment(""),R=t=>t===null||typeof t!="object"&&typeof t!="function",ce=Array.isArray,vt=t=>ce(t)||typeof t?.[Symbol.iterator]=="function",he=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Le=/-->/g,Oe=/>/g,E=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Re=/"/g,Ne=/^(?:script|style|textarea|title)$/i,qe=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),x=qe(1),m=qe(2),C=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Be=new WeakMap,M=k.createTreeWalker(k,129);function De(t,e){if(!ce(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ze!==void 0?ze.createHTML(e):e}const $t=(t,e)=>{const s=t.length-1,i=[];let o,r=e===2?"<svg>":e===3?"<math>":"",n=N;for(let h=0;h<s;h++){const a=t[h];let l,p,u=-1,$=0;for(;$<a.length&&(n.lastIndex=$,p=n.exec(a),p!==null);)$=n.lastIndex,n===N?p[1]==="!--"?n=Le:p[1]!==void 0?n=Oe:p[2]!==void 0?(Ne.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=E):p[3]!==void 0&&(n=E):n===E?p[0]===">"?(n=o??N,u=-1):p[1]===void 0?u=-2:(u=n.lastIndex-p[2].length,l=p[1],n=p[3]===void 0?E:p[3]==='"'?Re:Ue):n===Re||n===Ue?n=E:n===Le||n===Oe?n=N:(n=E,o=void 0);const A=n===E&&t[h+1].startsWith("/>")?" ":"";r+=n===N?a+xt:u>=0?(i.push(l),a.slice(0,u)+Ce+a.slice(u)+_+A):a+_+(u===-2?h:A)}return[De(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class q{constructor({strings:e,_$litType$:s},i){let o;this.parts=[];let r=0,n=0;const h=e.length-1,a=this.parts,[l,p]=$t(e,s);if(this.el=q.createElement(l,i),M.currentNode=this.el.content,s===2||s===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=M.nextNode())!==null&&a.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(Ce)){const $=p[n++],A=o.getAttribute(u).split(_),ee=/([.?@])?(.*)/.exec($);a.push({type:1,index:r,name:ee[2],strings:A,ctor:ee[1]==="."?_t:ee[1]==="?"?At:ee[1]==="@"?kt:Q}),o.removeAttribute(u)}else u.startsWith(_)&&(a.push({type:6,index:r}),o.removeAttribute(u));if(Ne.test(o.tagName)){const u=o.textContent.split(_),$=u.length-1;if($>0){o.textContent=V?V.emptyScript:"";for(let A=0;A<$;A++)o.append(u[A],U()),M.nextNode(),a.push({type:2,index:++r});o.append(u[$],U())}}}else if(o.nodeType===8)if(o.data===Te)a.push({type:2,index:r});else{let u=-1;for(;(u=o.data.indexOf(_,u+1))!==-1;)a.push({type:7,index:r}),u+=_.length-1}r++}}static createElement(e,s){const i=k.createElement("template");return i.innerHTML=e,i}}function T(t,e,s=t,i){if(e===C)return e;let o=i!==void 0?s._$Co?.[i]:s._$Cl;const r=R(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(t),o._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=o:s._$Cl=o),o!==void 0&&(e=T(t,o._$AS(t,e.values),o,i)),e}class St{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,o=(e?.creationScope??k).importNode(s,!0);M.currentNode=o;let r=M.nextNode(),n=0,h=0,a=i[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new B(r,r.nextSibling,this,e):a.type===1?l=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(l=new Et(r,this,e)),this._$AV.push(l),a=i[++h]}n!==a?.index&&(r=M.nextNode(),n++)}return M.currentNode=k,o}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=T(this,e,s),R(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):vt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=q.createElement(De(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(s);else{const r=new St(o,this),n=r.u(this.options);r.p(s),this.T(n),this._$AH=r}}_$AC(e){let s=Be.get(e.strings);return s===void 0&&Be.set(e.strings,s=new q(e)),s}k(e){ce(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,o=0;for(const r of e)o===s.length?s.push(i=new B(this.O(U()),this.O(U()),this,this.options)):i=s[o],i._$AI(r),o++;o<s.length&&(this._$AR(i&&i._$AB.nextSibling,o),s.length=o)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const i=Ie(e).nextSibling;Ie(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,o,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=s,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,s=this,i,o){const r=this.strings;let n=!1;if(r===void 0)e=T(this,e,s,0),n=!R(e)||e!==this._$AH&&e!==C,n&&(this._$AH=e);else{const h=e;let a,l;for(e=r[0],a=0;a<r.length-1;a++)l=T(this,h[i+a],s,a),l===C&&(l=this._$AH[a]),n||=!R(l)||l!==this._$AH[a],l===d?e=d:e!==d&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}n&&!o&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class _t extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class At extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class kt extends Q{constructor(e,s,i,o,r){super(e,s,i,o,r),this.type=5}_$AI(e,s=this){if((e=T(this,e,s,0)??d)===C)return;const i=this._$AH,o=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==d&&(i===d||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Et{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}}const Mt=le.litHtmlPolyfillSupport;Mt?.(q,B),(le.litHtmlVersions??=[]).push("3.3.3");const Pt=(t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(o===void 0){const r=s?.renderBefore??null;i._$litPart$=o=new B(e.insertBefore(U(),r),r,void 0,s??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis;class D extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pt(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}}D._$litElement$=!0,D.finalized=!0,de.litElementHydrateSupport?.({LitElement:D});const It=de.litElementPolyfillSupport;It?.({LitElement:D}),(de.litElementVersions??=[]).push("4.2.2");const zt="sws";function Ct(t="id"){return`${t}_${pe()}`}function Tt(t=zt){return`${t}_${pe()}`}function Lt(t){return`site-widget:${Ut(t)||"anonymous"}:${Date.now()}:${pe()}`}function Ot(t){let e=2166136261;for(let s=0;s<t.length;s+=1)e^=t.charCodeAt(s),e=Math.imul(e,16777619);return`h${(e>>>0).toString(16).padStart(8,"0")}`}function Ut(t){return String(t??"").trim().replace(/[^a-zA-Z0-9_.:-]/g,"_")}function pe(){const t=globalThis.crypto;if(t&&typeof t.randomUUID=="function")return t.randomUUID().replaceAll("-","");const e=new Uint8Array(16);return t&&typeof t.getRandomValues=="function"?(t.getRandomValues(e),Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")):`${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`}function Rt(t){const e=qt(t.contact),s=Nt(t.environment.search),i=H({channel:"site_widget",page_url:t.environment.href,widget_instance_id:t.config.widgetInstanceId,page_title:t.environment.title,referrer_url:t.environment.referrer,utm:s}),o=H({locale:t.environment.locale,timezone:t.environment.timezone});return H({schema_version:"site_widget.v1",event_type:"site_widget.message_submitted",idempotency_key:t.idempotencyKey,submitted_at:t.environment.now,public_session_id:t.publicSessionId,source:i,contact:e&&Object.keys(e).length>0?e:void 0,message:{role:"visitor",text:t.text.trim()},visitor_context:Object.keys(o).length>0?o:void 0,consent:t.privacyPolicyAccepted?{privacy_policy:!0}:void 0})}function Nt(t=""){if(!t.trim())return;const e=new URLSearchParams(t.startsWith("?")?t.slice(1):t),s=H({source:e.get("utm_source")??void 0,medium:e.get("utm_medium")??void 0,campaign:e.get("utm_campaign")??void 0,term:e.get("utm_term")??void 0,content:e.get("utm_content")??void 0});return Object.keys(s).length>0?s:void 0}function qt(t){if(t)return H({name:Z(t.name),phone:Z(t.phone),email:Z(t.email),preferred_contact:t.preferred_contact,city:Z(t.city)})}function Z(t){return t?.trim()||void 0}function H(t){for(const e of Object.keys(t)){const s=t[e];(s==null||s===""||typeof s=="object"&&!Array.isArray(s)&&Object.keys(s).length===0)&&delete t[e]}return t}function He({config:t,open:e=!1,now:s=new Date}){return{open:e,status:e?"open_idle":"closed",draft:"",contactPhone:"",contactCaptureOpen:!1,submitting:!1,pending:void 0,messages:[j({role:"assistant",text:t.introMessage,createdAt:s.toISOString()})],visitorMessageCount:0,unreadCount:0}}function g(t,e,s){const i=Bt(t);switch(e.type){case"open":return{...i,open:!0,unreadCount:0,status:We(i,s)};case"close":return{...i,open:!1,status:"closed"};case"draft.changed":{const o=String(e.value??"");return{...i,draft:o,status:i.open?o.trim()?"composing":We(i,s):i.status}}case"contact.capture.toggled":return{...i,contactCaptureOpen:typeof e.open=="boolean"?e.open:!i.contactCaptureOpen};case"contact.phone.saved":return{...i,contactPhone:String(e.phone??"").trim(),contactCaptureOpen:!1};case"submit.started":{if(i.submitting)return i;const o=String(e.text??"").trim(),r=String(e.idempotencyKey??"").trim();if(!o||!r)return i;const n=j({role:"visitor",text:o,status:"pending"});return{...i,open:!0,status:"submitted_waiting",submitting:!0,draft:"",pending:{messageId:n.id,text:o,idempotencyKey:r},visitorMessageCount:i.visitorMessageCount+1,messages:[...Dt(i.messages),n]}}case"retry.started":return i.pending?{...i,status:"submitted_waiting",submitting:!0,messages:i.messages.filter(o=>!(o.role==="system"&&o.status==="error")).map(o=>o.id===i.pending?.messageId?{...o,status:"pending"}:o)}:i;case"visitor.persisted":return{...i,messages:i.messages.map(o=>o.id===i.pending?.messageId||o.role==="visitor"&&o.text===e.text?{...o,status:"sent"}:o)};case"assistant.replied":{const o=String(e.text??"").trim(),r=o?[...i.messages,j({role:"assistant",text:o,disclosure:!0})]:i.messages;return je(i,r,"replied")}case"system.message":{const o=String(e.text??"").trim(),r=o?[...i.messages,j({role:"system",text:o})]:i.messages;return je(i,r,e.status)}case"submit.failed":{const o=String(e.text??"").trim(),r=i.messages.map(n=>n.id===i.pending?.messageId?{...n,status:"error"}:n);return{...i,status:"error",submitting:!1,messages:o?[...r,j({role:"system",text:o,status:"error"})]:r}}default:return i}}function ue(t,e){const s=t.trim();return s?s.length>e.maxMessageLength?"message_too_long":null:"empty_message"}function j({role:t,text:e,status:s="sent",disclosure:i=!1,createdAt:o=new Date().toISOString()}){return{id:Ct("msg"),role:t,text:String(e??""),status:s,disclosure:i,createdAt:o}}function je(t,e,s){return{...t,status:s,submitting:!1,pending:void 0,messages:e,unreadCount:t.open?t.unreadCount:t.unreadCount+1}}function We(t,e){const s=e?ue(t.draft,e):t.draft.trim()?null:"empty_message";return t.submitting?"submitted_waiting":t.status==="error"?"error":t.status==="replied"||t.status==="fallback"||t.status==="disabled"?t.status:t.draft.trim()&&!s?"composing":"open_idle"}function Bt(t){return{...t,draft:String(t.draft??""),contactPhone:String(t.contactPhone??""),submitting:!!t.submitting,messages:Array.isArray(t.messages)?t.messages:[],visitorMessageCount:Number.isInteger(t.visitorMessageCount)?t.visitorMessageCount:0,unreadCount:Number.isInteger(t.unreadCount)?t.unreadCount:0}}function Dt(t){return t.map(e=>({...e,status:e.status==="error"?"sent":e.status}))}function Ht(t,e){const s=ue(t.draft,e),i=t.visitorMessageCount>0;return{...t,canSend:!t.submitting&&!s,draftError:s,showQuickReplies:t.open&&e.showQuickActions&&e.quickReplies.length>0&&!t.submitting&&!i,showMobileActions:!t.open&&e.showMobileActions&&e.mobileActions.length>0,showContactTrigger:!e.collectPhoneAfterFirstMessage||i,contactLabel:t.contactPhone?e.phoneSavedLabel:e.phoneCaptureLabel,attachmentVisible:e.showAttachmentSlot,attachmentDisabled:!e.attachmentsEnabled,status:t.status}}const Ke="granit-site-widget",Fe="granit-widget",jt={opened:"open",closed:"close","response-received":"response"};function v(t,e,s,i={}){const o=Wt(i,s);G(t,`${Ke}:${e}`,o),G(t,`${Fe}:${e}`,o);const r=jt[e];r&&(G(t,`${Ke}:${r}`,o),G(t,`${Fe}:${r}`,o))}function Wt(t,e){const s={...t,widgetInstanceId:t.widgetInstanceId??e.widgetInstanceId};return typeof s.publicSessionId=="string"&&(s.publicSessionIdHash=Ot(s.publicSessionId),delete s.publicSessionId),e.includeMessageTextInEvents||(typeof s.messageText=="string"&&(s.messageLength=s.messageText.length),delete s.messageText),s}function G(t,e,s){t.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))}function Kt(t=new Date){return{href:typeof window>"u"?"":window.location.href,search:typeof window>"u"?"":window.location.search,title:typeof document>"u"?void 0:document.title||void 0,referrer:typeof document>"u"?void 0:document.referrer||void 0,locale:typeof navigator>"u"?void 0:navigator.language||void 0,timezone:Ft(),now:t.toISOString()}}function Ft(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return}}function Vt(t,e){const s=W(t)??{},i=W(s.automation)??{},o=b(i.status),r=b(s.public_session_id)??b(W(s.session)?.public_session_id)??b(s.publicSessionId);if(o==="replied"){const n=W(i.reply)??W(s.reply)??{},h=ge(n.persisted)??ge(n.is_persisted)??ge(i.reply_persisted),a=b(n.text)??b(n.body)??b(i.persisted_text);return a&&h!==!1?{status:"replied",publicSessionId:r,replyText:a,reason:b(i.reason),raw:t}:{status:"fallback",publicSessionId:r,systemText:fe(i,e.fallbackMessage),reason:b(i.reason),raw:t}}return o==="disabled"?{status:"disabled",publicSessionId:r,systemText:fe(i,e.disabledMessage),reason:b(i.reason),raw:t}:o==="fallback"?{status:"fallback",publicSessionId:r,systemText:fe(i,e.fallbackMessage),reason:b(i.reason),raw:t}:{status:"fallback",publicSessionId:r,systemText:e.fallbackMessage,raw:t}}function fe(t,e){return b(t.message)??b(t.display_message)??e}function W(t){if(typeof t=="object"&&t!==null&&!Array.isArray(t))return t}function b(t){return typeof t!="string"?void 0:t.trim()||void 0}function ge(t){if(typeof t=="boolean")return t;if(typeof t!="string")return;const e=t.trim().toLowerCase();if(e==="true"||e==="1"||e==="yes")return!0;if(e==="false"||e==="0"||e==="no")return!1}async function Qt(t,e,s){if(t.mock)return Zt(t,e);if(!t.apiBaseUrl)throw new Error("apiBaseUrl is required when mock=false");const i=new AbortController,o=globalThis.setTimeout(()=>i.abort(),t.timeoutMs),r=()=>i.abort();s?.addEventListener("abort",r,{once:!0});try{const n=await fetch(`${t.apiBaseUrl}${t.messagesPath}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e),credentials:"omit",signal:i.signal}),h=await Gt(n);if(!n.ok)throw new Error(Jt(h)??`Widget request failed with HTTP ${n.status}`);return Vt(h,t)}finally{globalThis.clearTimeout(o),s?.removeEventListener("abort",r)}}async function Zt(t,e){await Yt(350);const s=e.message.text.toLowerCase();return s.includes("менеджер")||s.includes("позвон")?{status:"fallback",publicSessionId:e.public_session_id,systemText:"Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",reason:"manager_requested",raw:{mock:!0}}:s.includes("сто")||s.includes("цен")||s.includes("расчет")||s.includes("расчёт")?{status:"replied",publicSessionId:e.public_session_id,replyText:"Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",raw:{mock:!0}}:{status:"replied",publicSessionId:e.public_session_id,replyText:"Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",raw:{mock:!0}}}async function Gt(t){if((t.headers.get("content-type")??"").includes("application/json"))return t.json();const s=await t.text();return s?{message:s}:void 0}function Jt(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t;return typeof e.message=="string"?e.message:typeof e.error=="string"?e.error:void 0}function Yt(t){return new Promise(e=>globalThis.setTimeout(e,t))}function Ve(t,e="local"){const s=`sw:${t}:public_session_id`,i=`sw:${t}:open_state`,o=`sw:${t}:panel_size`,r=e==="memory"?void 0:es();let n="",h,a;return{getPublicSessionId(){const l=me(r,s)||n;if(l)return l;const p=Tt();return n=p,J(r,s,p),p},setPublicSessionId(l){const p=l.trim();p&&(n=p,J(r,s,p))},clearPublicSessionId(){n="",ts(r,s)},getOpenState(){const l=me(r,i);return l==="open"?!0:l==="closed"?!1:h},setOpenState(l){h=l,J(r,i,l?"open":"closed")},getPanelSize(){const l=me(r,o);return Xt(l)?l:a},setPanelSize(l){a=l,J(r,o,l)}}}function Xt(t){return t==="normal"||t==="wide"||t==="fullscreen"}function es(){try{return typeof window>"u"?void 0:window.localStorage}catch{return}}function me(t,e){try{return t?.getItem(e)||void 0}catch{return}}function J(t,e,s){try{t?.setItem(e,s)}catch{}}function ts(t,e){try{t?.removeItem(e)}catch{}}const ss=Ae`
  .message {
    align-self: flex-start;
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-message);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    color: var(--sw-color-text-primary);
    max-width: min(85%, var(--sw-message-max-width, 460px));
    padding: 15px 17px;
  }

  .message--visitor {
    align-self: flex-end;
    background: var(--sw-color-surface-message-visitor);
    border-color: transparent;
    border-top-right-radius: 6px;
  }

  .message--assistant {
    border-top-left-radius: 6px;
  }

  .message--system {
    align-self: center;
    background: var(--sw-color-surface-system);
    color: var(--sw-color-text-secondary);
    max-width: 94%;
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

  .message__meta,
  .message__disclosure {
    color: var(--sw-color-text-secondary);
    font-size: var(--sw-font-size-small);
    line-height: var(--sw-line-height-small);
  }

  .message__meta {
    display: block;
    margin-top: 8px;
    text-align: right;
  }

  .message__disclosure {
    align-items: center;
    display: flex;
    gap: 6px;
    margin-top: 10px;
  }
`,is=Ae`
  :host {
    --sw-color-accent: #a98b6d;
    --sw-color-accent-text: #ffffff;
    --sw-color-surface-panel: #fffdf9;
    --sw-color-surface-message-assistant: #ffffff;
    --sw-color-surface-message-visitor: #f1e7dd;
    --sw-color-surface-system: #f7f3ee;
    --sw-color-surface-control: #ffffff;
    --sw-color-border-soft: rgba(55, 48, 40, 0.1);
    --sw-color-text-primary: #2f2d2a;
    --sw-color-text-secondary: #716d67;
    --sw-color-text-muted: #9b948c;
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
    --sw-color-accent: #7c8a6a;
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
    max-height: min(760px, calc(100vh - 48px));
    overflow: hidden;
    width: min(640px, calc(100vw - 48px));
  }

  .header {
    align-items: center;
    border-bottom: 1px solid var(--sw-color-border-soft);
    display: grid;
    gap: 14px;
    grid-template-columns: 52px minmax(0, 1fr) auto;
    min-height: 108px;
    padding: 24px 26px 22px;
  }

  .header-actions {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  .brand-mark {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(35, 29, 22, 0.08);
    color: var(--sw-color-accent);
    display: inline-flex;
    height: 52px;
    justify-content: center;
    width: 52px;
  }

  .title {
    font-size: var(--sw-font-size-title);
    font-weight: var(--sw-font-weight-title);
    letter-spacing: 0;
    line-height: 1.12;
    margin: 0 0 6px;
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

    width: min(860px, calc(100vw - 48px));
  }

  .panel[data-size="fullscreen"] {
    --sw-message-max-width: 680px;

    border-radius: 18px;
    height: calc(100dvh - 48px);
    inset: 24px;
    max-height: none;
    position: fixed;
    width: auto;
  }

  .body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 300px;
    overflow: hidden;
    padding: 24px 26px 18px;
  }

  .messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
    scroll-behavior: smooth;
  }

  .quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
    padding: 18px 26px 22px;
  }

  .composer {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-input);
    display: grid;
    gap: 10px;
    grid-template-columns: 40px minmax(0, 1fr) 46px;
    min-height: 58px;
    padding: 7px 8px 7px 12px;
  }

  .attach-button {
    background: transparent;
    border: 0;
    color: var(--sw-color-accent);
    cursor: pointer;
    height: 40px;
    width: 40px;
  }

  .attach-button:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .textarea {
    background: transparent;
    border: 0;
    color: var(--sw-color-text-primary);
    min-height: 40px;
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
  .retry-button:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--sw-color-accent) 35%, transparent);
    outline-offset: 3px;
  }

  @media (max-width: 767px) {
    :host {
      bottom: max(12px, env(safe-area-inset-bottom));
      left: 12px;
      right: 12px;
    }

    .panel {
      border-radius: 22px;
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
      grid-template-columns: 46px minmax(0, 1fr) auto;
      min-height: 92px;
      padding: 18px;
    }

    .header-actions {
      gap: 6px;
    }

    .brand-mark {
      height: 46px;
      width: 46px;
    }

    .title {
      font-size: 20px;
    }

    .icon-button {
      height: 40px;
      width: 40px;
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
      padding: 18px 18px 14px;
    }

    .composer-shell {
      padding: 14px 18px 18px;
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

    .icon-button {
      height: 38px;
      width: 38px;
    }

    .header-actions [part="minimize-button"] {
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
`;function y(t,e=22){const s={width:e,height:e};switch(t){case"send":return w(s,m`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);case"phone":return w(s,m`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`);case"calculator":return w(s,m`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`);case"close":return w(s,m`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);case"minus":return w(s,m`<path d="M5 12h14" />`);case"paperclip":return w(s,m`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);case"shield":return w(s,m`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`);case"brand":return w(s,m`<path d="m8 3 4 8 5-5 5 15H2Z" />`);case"plus":return w(s,m`<path d="M5 12h14" /><path d="M12 5v14" />`);case"maximize-2":case"expand":return w(s,m`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);case"minimize-2":case"shrink":return w(s,m`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);case"spark":return w(s,m`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`);case"message":default:return w(s,m`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`)}}function w(t,e){return m`<svg
    aria-hidden="true"
    width=${t.width}
    height=${t.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
  >
    ${e}
  </svg>`}function os(t,e){const s=t.status==="pending"?"Отправляем...":t.status==="error"?"Не отправлено":"",i=`message message-${t.role}`;return x`<article class=${rs(t)} part=${i}>
    <p class="message__text">${t.text}</p>
    ${t.disclosure?x`<div class="message__disclosure" part="message-disclosure">
          ${y("spark",16)}
          <span>${e.disclosureText}</span>
        </div>`:d}
    ${s?x`<small class="message__meta">${s}</small>`:d}
  </article>`}function rs(t){const e=["message",`message--${t.role}`];return t.status==="error"&&e.push("message--error"),e.join(" ")}const Y="granit-site-widget",ns=["normal","wide","fullscreen"],as=["normal","fullscreen"],ls={normal:"обычный размер",wide:"широкий режим",fullscreen:"на весь экран"},we=class we extends D{constructor(){super(...arguments),this.config=te(),this.state=He({config:this.config}),this.panelSize="normal",this.hasBooted=!1,this.publicSessionId="",this.cyclePanelSize=()=>{this.panelSize=this.getNextPanelSize(),this.sessionStore?.setPanelSize(this.panelSize),this.requestUpdate()},this.handleSubmit=e=>{e.preventDefault(),this.submitDraft()},this.handleInput=e=>{const s=e.currentTarget;this.state=g(this.state,{type:"draft.changed",value:s.value},this.config),this.requestUpdate()},this.handleTextareaKeydown=e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.submitDraft()),e.key==="Escape"&&(e.preventDefault(),this.close())},this.handlePanelKeydown=e=>{e.key==="Escape"&&(e.preventDefault(),this.close())},this.toggleContactCapture=()=>{this.state=g(this.state,{type:"contact.capture.toggled"},this.config),this.requestUpdate(),this.updateComplete.then(()=>this.renderRoot.querySelector(".phone-field")?.focus())},this.handlePhoneInput=e=>{const s=e.currentTarget.value;this.state={...this.state,contactPhone:s}},this.handlePhoneKeydown=e=>{e.key==="Enter"&&(e.preventDefault(),this.savePhone())},this.savePhone=()=>{const e=this.state.contactPhone.trim();this.state=g(this.state,{type:"contact.phone.saved",phone:e},this.config),v(this,"phone-saved",this.config,{hasPhone:e.length>0}),this.requestUpdate()},this.retryPending=async()=>{if(!this.state.pending)return;const{text:e,idempotencyKey:s}=this.state.pending;this.state=g(this.state,{type:"retry.started"},this.config),this.requestUpdate(),await this.sendPending(e,s)}}static get observedAttributes(){return[...super.observedAttributes,...Ze]}connectedCallback(){super.connectedCallback(),this.boot()}disconnectedCallback(){this.abortController?.abort(),super.disconnectedCallback()}attributeChangedCallback(e,s,i){if(s===i||!this.hasBooted)return;const o=this.config.widgetInstanceId,r=this.config.storage;this.config=xe(this),this.syncHostAttributes(),(o!==this.config.widgetInstanceId||r!==this.config.storage)&&(this.sessionStore=Ve(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId()),e==="panel-size"&&(this.panelSize=this.config.panelSize),e==="open"&&(this.state=g(this.state,this.hasAttribute("open")?{type:"open"}:{type:"close"},this.config)),this.requestUpdate()}open(){this.boot(),this.state=g(this.state,{type:"open"},this.config),this.hasAttribute("open")||this.setAttribute("open",""),this.persistOpenState(!0),v(this,"opened",this.config),this.requestUpdate(),this.focusInputSoon()}close(){this.boot(),this.state=g(this.state,{type:"close"},this.config),this.hasAttribute("open")&&this.removeAttribute("open"),this.persistOpenState(!1),v(this,"closed",this.config),this.requestUpdate(),this.focusLauncherSoon()}sendMessage(e){this.boot(),this.state=g(this.state,{type:"draft.changed",value:e},this.config),this.submitDraft()}clearSession(){this.sessionStore?.clearPublicSessionId(),this.publicSessionId=this.sessionStore?.getPublicSessionId()??""}render(){const e=Ht(this.state,this.config),s=this.getEffectivePanelSize(),i=this.getPanelSizeButtonLabel(),o=s==="fullscreen"?"minimize-2":"maximize-2";return x`
      <button
        class="launcher"
        part="launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded=${String(e.open)}
        ?hidden=${e.open}
        @click=${()=>this.open()}
      >
        <span part="launcher-icon" aria-hidden="true">${y("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${e.unreadCount>0?x`<span class="launcher__badge" aria-label=${`${e.unreadCount} новых сообщений`}
              >${e.unreadCount}</span
            >`:d}
      </button>

      ${this.renderMobileActions(e.showMobileActions)}

      <section
        class="panel"
        part="panel"
        data-size=${s}
        role="dialog"
        aria-modal="false"
        aria-label=${this.config.headerTitle}
        ?hidden=${!e.open}
        @keydown=${this.handlePanelKeydown}
      >
        <header class="header" part="header">
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${y("brand",24)}</div>
          <div>
            <h2 class="title" part="title">${this.config.headerTitle}</h2>
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
              ${y(o)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${()=>this.close()}
            >
              ${y("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${()=>this.close()}
            >
              ${y("close")}
            </button>
          </div>
        </header>

        <div class="body" part="body">
          <div class="messages" part="messages" role="log" aria-live="polite" aria-relevant="additions">
            ${e.messages.map(r=>os(r,this.config))}
          </div>

          ${e.showQuickReplies?x`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(r=>x`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${()=>this.handleQuickReply(r.text??r.value??r.label)}
                  >
                    ${r.label}
                  </button>`)}
              </div>`:d}
        </div>

        <div class="composer-shell" part="composer-shell">
          <form class="composer" part="composer" @submit=${this.handleSubmit}>
            <button
              class="attach-button"
              part="attach-button"
              type="button"
              title=${this.config.attachLabel}
              aria-label=${this.config.attachLabel}
              ?hidden=${!e.attachmentVisible}
              ?disabled=${e.attachmentDisabled}
            >
              ${y("paperclip")}
            </button>
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
              ?disabled=${!e.canSend}
            >
              ${y("send")}
            </button>
          </form>

          <button
            class="retry-button"
            part="retry-button"
            type="button"
            ?hidden=${!e.pending||e.submitting}
            @click=${this.retryPending}
          >
            ${this.config.retryLabel}
          </button>

          ${e.showContactTrigger?x`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  @click=${this.toggleContactCapture}
                >
                  ${y("plus",18)}
                  <span>${e.contactLabel}</span>
                </button>
              </div>
              <div class="phone-capture" part="phone-capture" ?hidden=${!e.contactCaptureOpen}>
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
              </div>`:d}

          <div class="footer-note" part="footer-note">
            <span aria-hidden="true">${y("shield",18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
        </div>
      </section>
    `}updated(){this.autoGrowTextarea(),this.scrollMessagesToBottom()}boot(){if(this.hasBooted)return;this.config=xe(this),this.syncHostAttributes(),this.sessionStore=Ve(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId(),this.panelSize=this.sessionStore.getPanelSize()??this.config.panelSize;const e=this.config.persistOpenState?this.sessionStore.getOpenState():void 0,s=this.hasAttribute("open")||(e??this.config.initialState==="open");this.state=He({config:this.config,open:s}),s&&!this.hasAttribute("open")&&this.setAttribute("open",""),this.hasBooted=!0,this.updateComplete.then(()=>{v(this,"ready",this.config),s&&this.focusInputSoon()})}syncHostAttributes(){this.getAttribute("theme")!==this.config.theme&&this.setAttribute("theme",this.config.theme),this.getAttribute("position")!==this.config.position&&this.setAttribute("position",this.config.position)}persistOpenState(e){this.config.persistOpenState&&this.sessionStore?.setOpenState(e)}getPanelSizeButtonLabel(){return`${this.config.resizeLabel}: ${ls[this.getNextPanelSize()]}`}getNextPanelSize(){const e=this.getPanelSizeOrder(),s=e.includes(this.panelSize)?this.panelSize:"normal",i=e.indexOf(s);return e[(i+1)%e.length]??"normal"}getEffectivePanelSize(){return this.isMobileViewport()&&this.panelSize==="wide"?"normal":this.panelSize}getPanelSizeOrder(){return this.isMobileViewport()?as:ns}isMobileViewport(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(max-width: 767px)").matches}handleQuickReply(e){v(this,"action-clicked",this.config,{actionType:"quick-reply"}),this.state=g(this.state,{type:"draft.changed",value:e},this.config),this.requestUpdate(),this.config.quickReplySubmit==="auto"?this.submitDraft():this.focusInputSoon()}renderMobileActions(e){return e?x`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map(s=>this.renderMobileAction(s))}
    </nav>`:d}renderMobileAction(e){const s=e.icon??e.type;return e.type==="call"||e.type==="link"?x`<a
        class="mobile-action"
        part="mobile-action"
        href=${e.href}
        target=${e.type==="link"?e.target??"_blank":"_self"}
        rel=${e.type==="link"&&e.target!=="_self"?"noopener noreferrer":""}
        @click=${()=>v(this,"action-clicked",this.config,{actionType:e.type})}
      >
        ${y(s,20)}
        <span>${e.label}</span>
      </a>`:x`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${()=>this.handleMobileAction(e)}
    >
      ${y(s,20)}
      <span>${e.label}</span>
    </button>`}handleMobileAction(e){v(this,"action-clicked",this.config,{actionType:e.type}),this.open(),e.type==="prefill"&&(this.state=g(this.state,{type:"draft.changed",value:e.text},this.config),this.requestUpdate(),this.focusInputSoon())}async submitDraft(){const e=this.state.draft.trim();if(ue(e,this.config)||this.state.submitting)return;const s=Lt(this.publicSessionId);this.state=g(this.state,{type:"submit.started",text:e,idempotencyKey:s},this.config),this.requestUpdate(),await this.sendPending(e,s)}async sendPending(e,s){this.abortController?.abort(),this.abortController=new AbortController;try{const i=Rt({config:this.config,text:e,publicSessionId:this.publicSessionId,idempotencyKey:s,contact:this.buildContact(),environment:Kt()});v(this,"message-submitted",this.config,{idempotencyKey:s,publicSessionId:this.publicSessionId,messageText:e});const o=await Qt(this.config,i,this.abortController.signal);if(o.publicSessionId&&(this.publicSessionId=o.publicSessionId,this.sessionStore?.setPublicSessionId(o.publicSessionId)),this.state=g(this.state,{type:"visitor.persisted",text:e},this.config),o.status==="replied"&&o.replyText)this.state=g(this.state,{type:"assistant.replied",text:o.replyText},this.config);else{const r=o.status==="disabled"?"disabled":"fallback";this.state=g(this.state,{type:"system.message",text:o.systemText||this.config.fallbackMessage,status:r},this.config),v(this,"fallback-shown",this.config,{status:r,reason:o.reason??""})}v(this,"response-received",this.config,{status:o.status,reason:o.reason??""}),this.requestUpdate()}catch(i){if(i instanceof DOMException&&i.name==="AbortError")return;this.state=g(this.state,{type:"submit.failed",text:this.config.errorMessage},this.config),v(this,"error",this.config,{errorMessage:i instanceof Error?i.message:String(i)}),this.requestUpdate()}}buildContact(){const e=this.state.contactPhone.trim();return e?{phone:e,preferred_contact:"phone"}:void 0}autoGrowTextarea(){const e=this.renderRoot.querySelector(".textarea");e&&(e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,118)}px`)}scrollMessagesToBottom(){const e=this.renderRoot.querySelector(".messages");e&&(e.scrollTop=e.scrollHeight)}async focusInputSoon(){await this.updateComplete,this.renderRoot.querySelector(".textarea")?.focus()}async focusLauncherSoon(){await this.updateComplete,this.renderRoot.querySelector(".launcher")?.focus()}};we.styles=[is,ss];let be=we;function X(t=Y){typeof window>"u"||!window.customElements||window.customElements.get(t)||window.customElements.define(t,be)}function Qe(t={}){if(typeof document>"u")throw new Error("mountSiteWidget requires a browser document");X();const e=document.createElement(Y);Ye(e,t);const s=t.target??document.body;if(!s)throw new Error("mountSiteWidget target was not found");return s.appendChild(e),e}return X(),typeof window<"u"&&(window.GranitSiteWidget={define:X,mount:Qe,tagName:Y}),L.SITE_WIDGET_TAG_NAME=Y,L.defineSiteWidget=X,L.mountSiteWidget=Qe,Object.defineProperty(L,Symbol.toStringTag,{value:"Module"}),L})({});
//# sourceMappingURL=site-widget.iife.js.map

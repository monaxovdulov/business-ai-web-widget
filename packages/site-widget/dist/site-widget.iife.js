var GranitSiteWidget=(function(K){"use strict";const Nt=[{label:"Нужен расчет",text:"Нужен расчет памятника с установкой"},{label:"Есть вопрос",text:"Здравствуйте, у меня есть вопрос по заказу"},{label:"Хочу каталог",text:"Хочу посмотреть каталог памятников"}],Ft=[{type:"call",label:"Позвонить",href:"tel:",icon:"phone"},{type:"open",label:"Написать",icon:"message"},{type:"prefill",label:"Расчет",text:"Нужен расчет памятника",icon:"calculator"}],jt=15e3+5e3+1,B={apiBaseUrl:"",messagesPath:"/public/intake/site-widget/messages",timeoutMs:25e3,widgetInstanceId:"default",theme:"memorial-soft",position:"bottom-right",panelSize:"normal",mock:!1,initialState:"closed",persistOpenState:!1,storage:"local",quickReplySubmit:"prefill",showQuickActions:!0,showMobileActions:!0,showAttachmentSlot:!0,attachmentsEnabled:!1,collectPhoneAfterFirstMessage:!1,includeMessageTextInEvents:!1,maxMessageLength:1e3,launcherLabel:"Написать",headerTitle:"Поможем с заказом",headerStatus:"Онлайн",headerResponseTime:"обычно отвечаем за 2 минуты",introMessage:`Здравствуйте! 👋
Подскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.`,placeholder:"Напишите сообщение...",disclosureText:"Автоответ. Менеджер проверит детали и подтвердит условия.",footerNote:"Расчет бесплатный. Точную стоимость подтвердит менеджер после уточнения деталей.",phoneCaptureLabel:"Добавить телефон для ответа",phoneSavedLabel:"Телефон добавлен",phonePlaceholder:"+7 999 000-00-00",fallbackMessage:"Сообщение принято. Менеджер ответит после уточнения деталей.",disabledMessage:"Сообщение принято. Менеджер проверит детали и ответит вам.",errorMessage:"Не удалось отправить сообщение. Проверьте соединение и попробуйте еще раз.",retryLabel:"Повторить",sendLabel:"Отправить",attachLabel:"Добавить фото",resizeLabel:"Изменить размер виджета",closeLabel:"Закрыть виджет",minimizeLabel:"Свернуть виджет",phoneHref:void 0,privacyUrl:void 0,quickReplies:Nt,mobileActions:Ft},Ke={"api-base-url":"apiBaseUrl","messages-path":"messagesPath","timeout-ms":"timeoutMs","widget-instance-id":"widgetInstanceId",theme:"theme",position:"position","panel-size":"panelSize",mock:"mock","initial-state":"initialState","persist-open-state":"persistOpenState",storage:"storage","quick-reply-submit":"quickReplySubmit","show-quick-actions":"showQuickActions","show-mobile-actions":"showMobileActions","show-attachment-slot":"showAttachmentSlot","attachments-enabled":"attachmentsEnabled","collect-phone-after-first-message":"collectPhoneAfterFirstMessage","include-message-text-in-events":"includeMessageTextInEvents","max-message-length":"maxMessageLength","launcher-label":"launcherLabel","header-title":"headerTitle","header-status":"headerStatus","header-response-time":"headerResponseTime","intro-message":"introMessage",placeholder:"placeholder","input-placeholder":"placeholder","disclosure-text":"disclosureText","footer-note":"footerNote","phone-capture-label":"phoneCaptureLabel","phone-saved-label":"phoneSavedLabel","phone-placeholder":"phonePlaceholder","fallback-message":"fallbackMessage","disabled-message":"disabledMessage","error-message":"errorMessage","retry-label":"retryLabel","send-label":"sendLabel","attach-label":"attachLabel","resize-label":"resizeLabel","close-label":"closeLabel","minimize-label":"minimizeLabel","phone-href":"phoneHref","privacy-url":"privacyUrl"},Wt=[...Object.keys(Ke),"config","quick-replies","mobile-actions","open"],Kt=new Set(["mock","persistOpenState","showQuickActions","showMobileActions","showAttachmentSlot","attachmentsEnabled","collectPhoneAfterFirstMessage","includeMessageTextInEvents"]),Vt=new Set(["timeoutMs","maxMessageLength"]);function ye(s={}){const e={...B,...s},t=xe(e.timeoutMs),i=Ye(e.maxMessageLength,B.maxMessageLength,1e4);return{...e,apiBaseUrl:rs(y(e.apiBaseUrl)),messagesPath:os(e.messagesPath),timeoutMs:t,widgetInstanceId:y(e.widgetInstanceId)||B.widgetInstanceId,theme:y(e.theme)||B.theme,position:Xt(e.position),panelSize:es(e.panelSize),mock:!!e.mock,initialState:ts(e.initialState),persistOpenState:!!e.persistOpenState,storage:ss(e.storage),quickReplySubmit:is(e.quickReplySubmit),showQuickActions:!!e.showQuickActions,showMobileActions:!!e.showMobileActions,showAttachmentSlot:!!e.showAttachmentSlot,attachmentsEnabled:!!e.attachmentsEnabled,collectPhoneAfterFirstMessage:!!e.collectPhoneAfterFirstMessage,includeMessageTextInEvents:!!e.includeMessageTextInEvents,maxMessageLength:i,phoneHref:D(e.phoneHref),privacyUrl:D(e.privacyUrl),quickReplies:Se(e.quickReplies),mobileActions:Ae(e.mobileActions,e.phoneHref)}}function xe(s){const e=Ye(s,B.timeoutMs,6e4);return Math.max(e,jt)}function Ve(s){const e={...Zt(s),...Ge(s.getAttribute("config"))};for(const[t,i]of Object.entries(Ke)){if(!s.hasAttribute(t))continue;const o=s.getAttribute(t);o!=null&&(Kt.has(i)?e[i]=Jt(o):Vt.has(i)?e[i]=Number(o):e[i]=o)}return s.hasAttribute("quick-replies")&&(e.quickReplies=Yt(s.getAttribute("quick-replies")??"")),s.hasAttribute("mobile-actions")&&(e.mobileActions=Qt(s.getAttribute("mobile-actions")??"")),ye(e)}function Gt(s,e={}){const t=ye(e);m(s,"api-base-url",t.apiBaseUrl),m(s,"messages-path",t.messagesPath),m(s,"timeout-ms",String(t.timeoutMs)),m(s,"widget-instance-id",t.widgetInstanceId),m(s,"theme",t.theme),m(s,"position",t.position),m(s,"panel-size",t.panelSize),m(s,"initial-state",t.initialState),m(s,"storage",t.storage),m(s,"quick-reply-submit",t.quickReplySubmit),m(s,"launcher-label",t.launcherLabel),m(s,"header-title",t.headerTitle),m(s,"header-status",t.headerStatus),m(s,"header-response-time",t.headerResponseTime),m(s,"intro-message",t.introMessage),m(s,"placeholder",t.placeholder),m(s,"disclosure-text",t.disclosureText),m(s,"footer-note",t.footerNote),m(s,"phone-capture-label",t.phoneCaptureLabel),m(s,"phone-saved-label",t.phoneSavedLabel),m(s,"phone-placeholder",t.phonePlaceholder),m(s,"fallback-message",t.fallbackMessage),m(s,"disabled-message",t.disabledMessage),m(s,"error-message",t.errorMessage),m(s,"retry-label",t.retryLabel),m(s,"send-label",t.sendLabel),m(s,"attach-label",t.attachLabel),m(s,"resize-label",t.resizeLabel),m(s,"close-label",t.closeLabel),m(s,"minimize-label",t.minimizeLabel),m(s,"phone-href",t.phoneHref),m(s,"privacy-url",t.privacyUrl),m(s,"max-message-length",String(t.maxMessageLength)),V(s,"mock",t.mock),V(s,"persist-open-state",t.persistOpenState),m(s,"show-quick-actions",String(t.showQuickActions)),m(s,"show-mobile-actions",String(t.showMobileActions)),m(s,"show-attachment-slot",String(t.showAttachmentSlot)),V(s,"attachments-enabled",t.attachmentsEnabled),V(s,"collect-phone-after-first-message",t.collectPhoneAfterFirstMessage),V(s,"include-message-text-in-events",t.includeMessageTextInEvents),(e.open||t.initialState==="open")&&s.setAttribute("open",""),t.quickReplies.length>0&&s.setAttribute("quick-replies",JSON.stringify(t.quickReplies)),t.mobileActions.length>0&&s.setAttribute("mobile-actions",JSON.stringify(t.mobileActions));for(const[i,o]of Object.entries(e.attributes??{}))s.setAttribute(i,o)}function Yt(s){const e=s.trim();if(!e)return[];const t=$e(e);return Array.isArray(t)?Se(t):Se(e.split("|").map(i=>({label:i.trim(),text:i.trim()})).filter(i=>i.label))}function Qt(s){const e=s.trim();if(!e)return[];const t=$e(e);return Array.isArray(t)?Ae(t):Ae(e.split("|").map(i=>({type:"open",label:i.trim()})).filter(i=>i.label))}function Se(s=[]){return s.map(e=>{const t=y(e?.label),i=y(e?.text??e?.value??e?.label);return{label:t,text:i}}).filter(e=>e.label.length>0&&e.text.length>0).slice(0,6)}function Ae(s=[],e){return s.map(t=>{const i=y(t?.label);if(i){if(t.type==="call"){const o=y(t.href||e||"tel:");return{type:"call",label:i,href:o,icon:D(t.icon)}}if(t.type==="link"){const o=y(t.href);return o?{type:"link",label:i,href:o,target:t.target==="_self"?"_self":"_blank",icon:D(t.icon)}:void 0}if(t.type==="prefill"){const o=y(t.text);return o?{type:"prefill",label:i,text:o,icon:D(t.icon)}:void 0}return{type:"open",label:i,icon:D(t.icon)}}}).filter(t=>!!t).slice(0,4)}function Zt(s){const e=s.querySelector?.('script[type="application/json"][data-site-widget-config]');return e?.textContent?Ge(e.textContent):{}}function Ge(s){if(!s?.trim())return{};const e=$e(s);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function m(s,e,t){t&&t.length>0&&s.setAttribute(e,t)}function V(s,e,t){t?s.setAttribute(e,"true"):s.removeAttribute(e)}function Jt(s){const e=s.trim().toLowerCase();return e===""||e==="1"||e==="true"||e==="yes"}function Xt(s){const e=y(s);return e==="bottom-left"||e==="inline"?e:"bottom-right"}function es(s){const e=y(s);return e==="wide"||e==="fullscreen"?e:"normal"}function ts(s){return y(s)==="open"?"open":"closed"}function ss(s){return y(s)==="memory"?"memory":"local"}function is(s){return y(s)==="auto"?"auto":"prefill"}function os(s){const e=y(s);return e?e.startsWith("/")?e:`/${e}`:B.messagesPath}function Ye(s,e,t){const i=Number(s);return!Number.isInteger(i)||i<=0?e:Math.min(i,t)}function rs(s){return s.replace(/\/+$/,"")}function D(s){return y(s)||void 0}function y(s){return String(s??"").trim()}function $e(s){try{return JSON.parse(s)}catch{return}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=globalThis,Ee=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),Qe=new WeakMap;let Ze=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ee&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Qe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Qe.set(t,e))}return e}toString(){return this.cssText}};const ns=s=>new Ze(typeof s=="string"?s:s+"",void 0,Ie),Je=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1],s[0]);return new Ze(t,s,Ie)},as=(s,e)=>{if(Ee)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),o=re.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},Xe=Ee?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ns(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:cs,defineProperty:ls,getOwnPropertyDescriptor:ds,getOwnPropertyNames:hs,getOwnPropertySymbols:us,getPrototypeOf:ps}=Object,ne=globalThis,et=ne.trustedTypes,ms=et?et.emptyScript:"",gs=ne.reactiveElementPolyfillSupport,G=(s,e)=>s,Me={toAttribute(s,e){switch(e){case Boolean:s=s?ms:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},tt=(s,e)=>!cs(s,e),st={attribute:!0,type:String,converter:Me,reflect:!1,useDefault:!1,hasChanged:tt};Symbol.metadata??=Symbol("metadata"),ne.litPropertyMetadata??=new WeakMap;let q=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=st){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&ls(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=ds(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const l=o?.call(this);r?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??st}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const e=ps(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const t=this.properties,i=[...hs(t),...us(t)];for(const o of i)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Xe(o))}else e!==void 0&&t.push(Xe(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return as(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:Me).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=i.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Me;this._$Em=o;const l=n.fromAttribute(t,r.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(e!==void 0){const n=this.constructor;if(o===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??tt)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i){const{wrapped:n}=r,l=this[o];n!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[G("elementProperties")]=new Map,q[G("finalized")]=new Map,gs?.({ReactiveElement:q}),(ne.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te=globalThis,it=s=>s,ae=Te.trustedTypes,ot=ae?ae.createPolicy("lit-html",{createHTML:s=>s}):void 0,rt="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+k,fs=`<${nt}>`,P=document,Y=()=>P.createComment(""),Q=s=>s===null||typeof s!="object"&&typeof s!="function",ke=Array.isArray,bs=s=>ke(s)||typeof s?.[Symbol.iterator]=="function",Pe=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,ct=/>/g,C=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,dt=/"/g,ht=/^(?:script|style|textarea|title)$/i,ut=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),b=ut(1),S=ut(2),R=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),pt=new WeakMap,z=P.createTreeWalker(P,129);function mt(s,e){if(!ke(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(e):e}const vs=(s,e)=>{const t=s.length-1,i=[];let o,r=e===2?"<svg>":e===3?"<math>":"",n=Z;for(let l=0;l<t;l++){const a=s[l];let c,d,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,d=n.exec(a),d!==null);)u=n.lastIndex,n===Z?d[1]==="!--"?n=at:d[1]!==void 0?n=ct:d[2]!==void 0?(ht.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=C):d[3]!==void 0&&(n=C):n===C?d[0]===">"?(n=o??Z,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?C:d[3]==='"'?dt:lt):n===dt||n===lt?n=C:n===at||n===ct?n=Z:(n=C,o=void 0);const g=n===C&&s[l+1].startsWith("/>")?" ":"";r+=n===Z?a+fs:h>=0?(i.push(c),a.slice(0,h)+rt+a.slice(h)+k+g):a+k+(h===-2?l:g)}return[mt(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const l=e.length-1,a=this.parts,[c,d]=vs(e,t);if(this.el=J.createElement(c,i),z.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=z.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(rt)){const u=d[n++],g=o.getAttribute(h).split(k),v=/([.?@])?(.*)/.exec(u);a.push({type:1,index:r,name:v[2],strings:g,ctor:v[1]==="."?_s:v[1]==="?"?ys:v[1]==="@"?xs:ce}),o.removeAttribute(h)}else h.startsWith(k)&&(a.push({type:6,index:r}),o.removeAttribute(h));if(ht.test(o.tagName)){const h=o.textContent.split(k),u=h.length-1;if(u>0){o.textContent=ae?ae.emptyScript:"";for(let g=0;g<u;g++)o.append(h[g],Y()),z.nextNode(),a.push({type:2,index:++r});o.append(h[u],Y())}}}else if(o.nodeType===8)if(o.data===nt)a.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf(k,h+1))!==-1;)a.push({type:7,index:r}),h+=k.length-1}r++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function H(s,e,t=s,i){if(e===R)return e;let o=i!==void 0?t._$Co?.[i]:t._$Cl;const r=Q(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=o:t._$Cl=o),o!==void 0&&(e=H(s,o._$AS(s,e.values),o,i)),e}class ws{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??P).importNode(t,!0);z.currentNode=o;let r=z.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new N(r,r.nextSibling,this,e):a.type===1?c=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(c=new Ss(r,this,e)),this._$AV.push(c),a=i[++l]}n!==a?.index&&(r=z.nextNode(),n++)}return z.currentNode=P,o}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class N{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=H(this,e,t),Q(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bs(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&Q(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=J.createElement(mt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const r=new ws(o,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=pt.get(e.strings);return t===void 0&&pt.set(e.strings,t=new J(e)),t}k(e){ke(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new N(this.O(Y()),this.O(Y()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=it(e).nextSibling;it(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(r===void 0)e=H(this,e,t,0),n=!Q(e)||e!==this._$AH&&e!==R,n&&(this._$AH=e);else{const l=e;let a,c;for(e=r[0],a=0;a<r.length-1;a++)c=H(this,l[i+a],t,a),c===R&&(c=this._$AH[a]),n||=!Q(c)||c!==this._$AH[a],c===p?e=p:e!==p&&(e+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class _s extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class ys extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class xs extends ce{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=H(this,e,t,0)??p)===R)return;const i=this._$AH,o=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==p&&(i===p||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ss{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){H(this,e)}}const As={I:N},$s=Te.litHtmlPolyfillSupport;$s?.(J,N),(Te.litHtmlVersions??=[]).push("3.3.3");const Es=(s,e,t)=>{const i=t?.renderBefore??e;let o=i._$litPart$;if(o===void 0){const r=t?.renderBefore??null;i._$litPart$=o=new N(e.insertBefore(Y(),r),r,void 0,t??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ce=globalThis;let X=class extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Es(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};X._$litElement$=!0,X.finalized=!0,Ce.litElementHydrateSupport?.({LitElement:X});const Is=Ce.litElementPolyfillSupport;Is?.({LitElement:X}),(Ce.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ms={CHILD:2},gt=s=>(...e)=>({_$litDirective$:s,values:e});let ft=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Ts}=As,bt=s=>s,vt=()=>document.createComment(""),ee=(s,e,t)=>{const i=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=i.insertBefore(vt(),o),n=i.insertBefore(vt(),o);t=new Ts(r,n,s,s.options)}else{const r=t._$AB.nextSibling,n=t._$AM,l=n!==s;if(l){let a;t._$AQ?.(s),t._$AM=s,t._$AP!==void 0&&(a=s._$AU)!==n._$AU&&t._$AP(a)}if(r!==o||l){let a=t._$AA;for(;a!==r;){const c=bt(a).nextSibling;bt(i).insertBefore(a,o),a=c}}}return t},L=(s,e,t=s)=>(s._$AI(e,t),s),ks={},wt=(s,e=ks)=>s._$AH=e,Ps=s=>s._$AH,Re=s=>{s._$AR(),s._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=(s,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(s[o],o);return i},Cs=gt(class extends ft{constructor(s){if(super(s),s.type!==Ms.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],r=[];let n=0;for(const l of s)o[n]=i?i(l,n):n,r[n]=t(l,n),n++;return{values:r,keys:o}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){const o=Ps(s),{values:r,keys:n}=this.dt(e,t,i);if(!Array.isArray(o))return this.ut=n,r;const l=this.ut??=[],a=[];let c,d,h=0,u=o.length-1,g=0,v=r.length-1;for(;h<=u&&g<=v;)if(o[h]===null)h++;else if(o[u]===null)u--;else if(l[h]===n[g])a[g]=L(o[h],r[g]),h++,g++;else if(l[u]===n[v])a[v]=L(o[u],r[v]),u--,v--;else if(l[h]===n[v])a[v]=L(o[h],r[v]),ee(s,a[v+1],o[h]),h++,v--;else if(l[u]===n[g])a[g]=L(o[u],r[g]),ee(s,o[h],o[u]),u--,g++;else if(c===void 0&&(c=_t(n,g,v),d=_t(l,h,u)),c.has(l[h]))if(c.has(l[u])){const I=d.get(n[g]),We=I!==void 0?o[I]:null;if(We===null){const Ht=ee(s,o[h]);L(Ht,r[g]),a[g]=Ht}else a[g]=L(We,r[g]),ee(s,o[h],We),o[I]=null;g++}else Re(o[u]),u--;else Re(o[h]),h++;for(;g<=v;){const I=ee(s,a[v+1]);L(I,r[g]),a[g++]=I}for(;h<=u;){const I=o[h++];I!==null&&Re(I)}return this.ut=n,wt(s,a),R}});function te(s="id"){return`${s}_${yt()}`}function Rs(s){return`site-widget:${Date.now()}:${yt()}`}function zs(s){let e=2166136261;for(let t=0;t<s.length;t+=1)e^=s.charCodeAt(t),e=Math.imul(e,16777619);return`h${(e>>>0).toString(16).padStart(8,"0")}`}function yt(){const s=globalThis.crypto;if(s&&typeof s.randomUUID=="function")return s.randomUUID().replaceAll("-","");const e=new Uint8Array(16);return s&&typeof s.getRandomValues=="function"?(s.getRandomValues(e),Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")):`${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`}const xt=3,St=5*1024*1024,At=15*1024*1024,$t=24e6,Ls=[255,216,255],Us=[137,80,78,71,13,10,26,10],Os=[82,73,70,70],Bs=[87,69,66,80];function Ds(s){if(le(s,Ls))return"image/jpeg";if(le(s,Us))return"image/png";if(le(s,Os)&&le(s,Bs,8))return"image/webp"}function qs(s,e){if(!e)return!1;const t=String(s??"").trim().toLowerCase();return t===""||t===e}function Hs(s,e){if(!Number.isSafeInteger(s.sizeBytes)||s.sizeBytes<0)return{code:"invalid_image_size",actualBytes:s.sizeBytes};const t=e.length+1;if(t>xt)return{code:"too_many_images",maxCount:xt,actualCount:t};if(s.sizeBytes>St)return{code:"image_too_large",maxBytes:St,actualBytes:s.sizeBytes};const i=e.reduce((o,r)=>o+r.sizeBytes,s.sizeBytes);if(i>At)return{code:"total_too_large",maxBytes:At,actualBytes:i}}function Ns(s,e){if(!Number.isSafeInteger(s)||!Number.isSafeInteger(e)||s<=0||e<=0)return{code:"invalid_image_dimensions",width:s,height:e};const t=s*e;if(!Number.isSafeInteger(t)||t>$t)return{code:"too_many_pixels",maxPixels:$t,actualPixels:t}}function Fs(s){if(s.length===0)return"";const e=[...new Set(s.map(({error:i})=>js(i)))];return`${s.length===1?"Фото не добавлено":"Некоторые фото не добавлены"}: ${e.join("; ")}.`}function le(s,e,t=0){return s.length<t+e.length?!1:e.every((i,o)=>s[t+o]===i)}function js(s){switch(s.code){case"invalid_image_size":return"не удалось определить размер файла";case"too_many_images":return`можно добавить не более ${s.maxCount} фото`;case"image_too_large":return`размер одного фото превышает ${Et(s.maxBytes)} МБ`;case"total_too_large":return`общий размер фото превышает ${Et(s.maxBytes)} МБ`;case"unsupported_image_type":return"поддерживаются только JPEG, PNG и WebP";case"mime_mismatch":return"тип файла не совпадает с его содержимым";case"decode_failed":return"одно из изображений не удалось прочитать";case"invalid_image_dimensions":return"не удалось определить разрешение изображения";case"too_many_pixels":return"разрешение одного фото слишком большое"}}function Et(s){return String(s/1048576)}class F extends Error{constructor(){super("Image selection is no longer current"),this.name="StaleImageSelectionError"}}class Ws{constructor(e){this.draft=[],this.byMessageId=new Map,this.validationMessage="",this.validationRevision=0,this.enabled=!0,this.generation=0,this.pendingSelections=new Map,this.inFlightPreviewUrls=new Set,this.selectionQueue=Promise.resolve(),this.host=e,e.addController(this)}hostDisconnected(){this.clearAll()}getDraft(){return this.draft}getForMessage(e){return this.byMessageId.get(e)??[]}getValidationMessage(){return this.validationMessage}getValidationRevision(){return this.validationRevision}isProcessing(){for(const e of this.pendingSelections.values())if(e===this.generation)return!0;return!1}async whenIdle(){await this.selectionQueue.catch(()=>{})}setEnabled(e){const t=!!e;this.enabled!==t&&(this.enabled=t,t||this.clearAll())}selectFiles(e){const t=[...e],i=this.generation,o=Symbol("image-selection");this.pendingSelections.set(o,i),this.host.requestUpdate();let r=()=>{};const n=new Promise(l=>{r=l});return this.selectionQueue=this.selectionQueue.catch(()=>{}).then(async()=>{try{r(await this.processBatch(t,i))}catch{if(i!==this.generation||!this.enabled){r({accepted:0,rejected:t.length,validationMessage:""});return}const l="Фото не добавлено: одно из изображений не удалось прочитать.";this.validationMessage=l,this.validationRevision+=1,this.host.requestUpdate(),r({accepted:0,rejected:t.length,validationMessage:l})}finally{this.pendingSelections.delete(o),this.host.requestUpdate()}}),n}removeDraft(e){const t=this.draft.findIndex(r=>r.id===e);if(t<0)return;const i=this.draft[t];i&&this.revokePreview(i.previewUrl),this.draft=this.draft.filter(r=>r.id!==e),this.validationMessage="";const o=this.draft[t]?.id??this.draft[t-1]?.id;return this.host.requestUpdate(),o}transferDraftToMessage(e){if(this.draft.length===0)return;const t=this.byMessageId.get(e)??[];this.byMessageId.set(e,[...t,...this.draft]),this.draft=[],this.validationMessage="",this.host.requestUpdate()}removeMessageAttachments(e){const t=this.byMessageId.get(e);if(t){for(const i of t)this.revokePreview(i.previewUrl);this.byMessageId.delete(e),this.host.requestUpdate()}}clearAll(){const e=this.isProcessing();this.generation+=1,this.pendingSelections.clear(),this.selectionQueue=Promise.resolve();const t=new Set;for(const o of this.inFlightPreviewUrls)t.add(o);for(const o of this.draft)t.add(o.previewUrl);for(const o of this.byMessageId.values())for(const r of o)t.add(r.previewUrl);for(const o of t)this.revokePreview(o);this.inFlightPreviewUrls.clear();const i=e||t.size>0||this.draft.length>0||this.byMessageId.size>0||this.validationMessage;this.draft=[],this.byMessageId.clear(),this.validationMessage="",i&&this.host.requestUpdate()}async processBatch(e,t){if(!this.enabled||t!==this.generation||e.length===0)return{accepted:0,rejected:0,validationMessage:""};const i=t,o=()=>i===this.generation&&this.enabled,r=[],n=[],l=[...this.draft];for(const a of e){M(o);const c={file:a,sizeBytes:a.size},d=Hs(c,l);if(d){n.push({candidate:c,error:d});continue}const h=await this.validateAndCreateAttachment(c,n,o);if(h){if(!o()){this.revokeInFlightPreview(h.previewUrl);break}r.push(h),l.push(h)}}if(!o()){for(const a of r)this.revokeInFlightPreview(a.previewUrl);return{accepted:0,rejected:e.length,validationMessage:""}}for(const a of r)this.inFlightPreviewUrls.delete(a.previewUrl);return this.draft=[...this.draft,...r],this.validationMessage=Fs(n),this.validationRevision+=1,this.host.requestUpdate(),{accepted:r.length,rejected:n.length,validationMessage:this.validationMessage}}async validateAndCreateAttachment(e,t,i){M(i);let o;try{const a=await Gs(e.file.slice(0,12));M(i),o=Ds(new Uint8Array(a))}catch(a){if(a instanceof F)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}if(!o){t.push({candidate:e,error:{code:"unsupported_image_type"}});return}if(!qs(e.file.type,o)){t.push({candidate:e,error:{code:"mime_mismatch",declaredMime:e.file.type,detectedMime:o}});return}let r;try{r=await Ks(e.file,a=>this.createInFlightPreview(a),a=>this.revokeInFlightPreview(a),i)}catch(a){if(a instanceof F)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}M(i);const n=Ns(r.width,r.height);if(n){t.push({candidate:e,error:n});return}let l;try{if(M(i),l=this.createInFlightPreview(e.file),!i())throw this.revokeInFlightPreview(l),new F}catch(a){if(a instanceof F)throw a;t.push({candidate:e,error:{code:"decode_failed"}});return}return{id:te("img"),name:e.file.name,mimeType:o,sizeBytes:e.file.size,width:r.width,height:r.height,previewUrl:l,file:e.file}}revokePreview(e){try{URL.revokeObjectURL(e)}catch{}}createInFlightPreview(e){const t=URL.createObjectURL(e);return this.inFlightPreviewUrls.add(t),t}revokeInFlightPreview(e){this.inFlightPreviewUrls.delete(e)&&this.revokePreview(e)}}async function Ks(s,e,t,i){let o;if(typeof createImageBitmap=="function")try{M(i);const n=await createImageBitmap(s);try{return M(i),{width:n.width,height:n.height}}finally{n.close()}}catch(n){if(n instanceof F)throw n;o=n}if(M(i),typeof Image>"u"||typeof URL.createObjectURL!="function")throw o instanceof Error?o:new Error("No browser image decoder is available");M(i);const r=e(s);try{M(i);const n=new Image;return n.decoding="async",n.src=r,typeof n.decode=="function"?await n.decode():await Vs(n),M(i),{width:n.naturalWidth,height:n.naturalHeight}}finally{t(r)}}function M(s){if(!s())throw new F}function Vs(s){return new Promise((e,t)=>{s.addEventListener("load",()=>e(),{once:!0}),s.addEventListener("error",()=>t(new Error("Image decode failed")),{once:!0})})}async function Gs(s){return typeof s.arrayBuffer=="function"?s.arrayBuffer():new Promise((e,t)=>{const i=new FileReader;i.addEventListener("load",()=>{i.result instanceof ArrayBuffer?e(i.result):t(new Error("Blob read returned no ArrayBuffer"))}),i.addEventListener("error",()=>t(i.error??new Error("Blob read failed"))),i.readAsArrayBuffer(s)})}const ze=8,Le=40,It=180,U=.5,Ys=new Set(["ArrowUp","ArrowDown","Home","End","PageUp","PageDown"," ","Spacebar"]);class Qs{constructor(e){this.items=[],this.mode="following-bottom",this.snapshot={mode:"following-bottom",canScrollStart:!1,canScrollEnd:!1,newItemCount:0},this.newItemCount=0,this.hasInitialPlacement=!1,this.observedRows=new Set,this.programmaticScroll=!1,this.pointerActive=!1,this.handleWheel=()=>this.releaseForUser(),this.handleTouchMove=()=>this.releaseForUser(),this.handleKeydown=t=>{if(!Ys.has(t.key))return;const i=t.target;i instanceof HTMLElement&&i!==this.viewport&&this.isInteractive(i)||this.releaseForUser()},this.handlePointerDown=t=>{this.pointerActive=t.target===this.viewport},this.handlePointerUp=()=>{this.pointerActive=!1},this.handleScroll=()=>{this.pointerActive&&!this.programmaticScroll&&this.releaseForUser();const t=this.viewport;t&&!this.programmaticScroll&&this.mode==="free-scrolling"&&this.distanceToEnd(t)<=ze&&(this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0,this.mode="following-bottom",this.commitModeAttribute()),this.updateSnapshot()},this.handleWindowResize=()=>this.scheduleCommit(),this.host=e,e.addController(this)}hostUpdate(){this.hasLayout()&&(this.pendingLayoutAnchor=this.captureFirstVisible())}hostDisconnected(){this.disconnect()}hostConnected(){this.host.requestUpdate()}connect({root:e,viewport:t,content:i,tailSpacer:o}){if(this.viewport===t&&this.content===i&&this.tailSpacer===o){this.root=e,this.commitModeAttribute();return}this.detachElements(),this.root=e,this.viewport=t,this.content=i,this.tailSpacer=o,t.addEventListener("scroll",this.handleScroll,{passive:!0}),t.addEventListener("wheel",this.handleWheel,{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove,{passive:!0}),t.addEventListener("keydown",this.handleKeydown),t.addEventListener("pointerdown",this.handlePointerDown),t.addEventListener("pointerup",this.handlePointerUp),t.addEventListener("pointercancel",this.handlePointerUp),typeof ResizeObserver<"u"?(this.resizeObserver=new ResizeObserver(()=>this.scheduleCommit()),this.resizeObserver.observe(t),this.resizeObserver.observe(i),this.reconcileObservedRows()):typeof window<"u"&&window.addEventListener("resize",this.handleWindowResize),this.commitModeAttribute(),this.scheduleCommit()}reconcile(e){const t=e.map(r=>({id:r.id,scrollAnchor:!!r.scrollAnchor})),i=this.pendingReconcile?.previous??this.items,o=this.pendingReconcile?.layoutAnchor??this.pendingLayoutAnchor;this.pendingLayoutAnchor=void 0,this.items=t,this.pendingReconcile=o?{previous:i,next:t,layoutAnchor:o}:{previous:i,next:t},this.reconcileObservedRows(),this.scheduleCommit()}scrollToEnd(e={}){const t=this.viewport;if(!t||!this.hasLayout())return!1;this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0;const i=this.normalizeBehavior(e.behavior??"auto");return this.clearSettlingTimer(),this.mode=i==="smooth"?"settling-jump":"following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),i),this.updateSnapshot(),i==="smooth"&&(this.settlingTimer=globalThis.setTimeout(()=>{if(this.settlingTimer=void 0,this.mode!=="settling-jump")return;this.mode="following-bottom",this.commitModeAttribute();const o=this.viewport;o&&this.hasLayout()&&(this.performScroll(Math.max(0,o.scrollHeight-o.clientHeight),"auto"),this.scheduleCommit()),this.updateSnapshot()},It)),!0}scrollToMessage(e,t={}){const i=this.viewport,o=this.findRow(e);if(!i||!o||!this.hasLayout())return!1;this.activeAnchorId=void 0,this.setTailHeight(0),this.newItemCount=0,this.clearSettlingTimer(),this.mode="free-scrolling",this.commitModeAttribute();const r=i.getBoundingClientRect(),n=o.getBoundingClientRect(),l=i.scrollTop+n.top-r.top-Le;return this.performScroll(Math.max(0,l),this.normalizeBehavior(t.behavior??"auto")),this.updateSnapshot(),!0}disconnect(){this.detachElements(),this.cancelFrame(),this.clearProgrammaticTimer(),this.clearSettlingTimer(),this.pendingReconcile=void 0,this.pendingLayoutAnchor=void 0,this.activeAnchorId=void 0,this.hasInitialPlacement=!1,this.pointerActive=!1,this.programmaticScroll=!1}getSnapshot(){return this.snapshot}scheduleCommit(){this.frameId===void 0&&(this.frameId=this.requestFrame(()=>{this.frameId=void 0;const e=this.pendingReconcile;this.pendingReconcile=void 0,this.commitReconcile(e??{previous:this.items,next:this.items})}))}commitReconcile(e){const t=this.viewport;if(!t||!this.content||!this.tailSpacer)return;if(!this.hasLayout()){this.updateSnapshot();return}if(e.next.length>0&&!this.hasInitialPlacement){this.hasInitialPlacement=!0,this.activeAnchorId=void 0,this.setTailHeight(0),this.mode="following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"),this.updateSnapshot();return}this.isPrepend(e.previous,e.next)&&e.layoutAnchor&&this.restoreLayoutAnchor(e.layoutAnchor);const i=this.getAppendedItems(e.previous,e.next),o=[...i].reverse().find(r=>r.scrollAnchor);o?this.startTurnAnchor(o.id):i.length>0?this.mode==="following-bottom"||this.mode==="settling-jump"?this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"):this.activeAnchorId?this.reconcileActiveAnchor():this.newItemCount+=i.length:this.mode==="following-bottom"||this.mode==="settling-jump"?this.performScroll(Math.max(0,t.scrollHeight-t.clientHeight),"auto"):this.activeAnchorId&&this.reconcileActiveAnchor(),this.updateSnapshot()}startTurnAnchor(e){const t=this.viewport,i=this.findRow(e);if(!t||!i||!this.tailSpacer)return;this.activeAnchorId=e,this.newItemCount=0,this.clearSettlingTimer(),this.mode="anchored-to-message",this.commitModeAttribute();const o=this.desiredScrollTop(i);this.setTailHeight(this.requiredTailHeight(o)),this.performScroll(o,"auto")}reconcileActiveAnchor(){const e=this.activeAnchorId?this.findRow(this.activeAnchorId):void 0;if(!e||!this.viewport){this.activeAnchorId=void 0,this.setTailHeight(0);return}const t=this.desiredScrollTop(e),i=this.requiredTailHeight(t);if(this.setTailHeight(i),this.mode==="anchored-to-message")if(i<=U)this.activeAnchorId=void 0,this.mode="following-bottom",this.commitModeAttribute(),this.performScroll(Math.max(0,this.viewport.scrollHeight-this.viewport.clientHeight),"auto");else{const o=this.viewport.getBoundingClientRect(),r=e.getBoundingClientRect();Math.abs(r.top-o.top-Le)>U&&this.performScroll(t,"auto")}else i<=U&&(this.activeAnchorId=void 0)}requiredTailHeight(e){const t=this.viewport,i=this.tailSpacer;if(!t||!i)return 0;const o=t.getBoundingClientRect(),r=i.getBoundingClientRect(),n=t.scrollTop+r.top-o.top;return Math.max(0,e+t.clientHeight-n)}desiredScrollTop(e){const t=this.viewport;if(!t)return 0;const i=t.getBoundingClientRect(),o=e.getBoundingClientRect();return Math.max(0,t.scrollTop+o.top-i.top-Le)}restoreLayoutAnchor(e){const t=this.viewport,i=this.findRow(e.id);if(!t||!i)return;const o=t.getBoundingClientRect(),n=i.getBoundingClientRect().top-o.top-e.viewportTop;Math.abs(n)<=U||(this.markProgrammaticScroll("auto"),t.scrollTop+=n)}captureFirstVisible(){const e=this.viewport,t=this.content;if(!e||!t)return;const i=e.getBoundingClientRect();for(const o of t.querySelectorAll("[data-message-id]")){const r=o.getBoundingClientRect();if(r.bottom>i.top+U&&r.top<i.bottom-U)return{id:o.dataset.messageId??"",viewportTop:r.top-i.top}}}getAppendedItems(e,t){if(e.length===0)return t;const i=this.findSequenceStart(e,t);return i<0?[]:t.slice(i+e.length)}isPrepend(e,t){return e.length===0||t.length<=e.length?!1:this.findSequenceStart(e,t)>0}findSequenceStart(e,t){if(e.length===0)return 0;const i=t.length-e.length;for(let o=0;o<=i;o+=1)if(e.every((r,n)=>r.id===t[o+n]?.id))return o;return-1}releaseForUser(){this.clearProgrammaticTimer(),this.clearSettlingTimer(),this.programmaticScroll=!1,this.mode!=="free-scrolling"&&(this.mode="free-scrolling",this.commitModeAttribute(),this.updateSnapshot())}performScroll(e,t){const i=this.viewport;if(!i)return;const o=Math.max(0,i.scrollHeight-i.clientHeight),r=Math.min(Math.max(0,e),o);this.markProgrammaticScroll(t),typeof i.scrollTo=="function"?i.scrollTo({top:r,behavior:t}):i.scrollTop=r}markProgrammaticScroll(e){this.programmaticScroll=!0,this.clearProgrammaticTimer();const t=e==="smooth"?It:0;this.programmaticClearTimer=globalThis.setTimeout(()=>{this.programmaticScroll=!1,this.programmaticClearTimer=void 0,this.updateSnapshot()},t)}updateSnapshot(){const e=this.viewport,t=e?{mode:this.mode,canScrollStart:e.scrollTop>ze,canScrollEnd:this.distanceToEnd(e)>ze,newItemCount:this.newItemCount}:{mode:this.mode,canScrollStart:!1,canScrollEnd:!1,newItemCount:this.newItemCount};t.mode===this.snapshot.mode&&t.canScrollStart===this.snapshot.canScrollStart&&t.canScrollEnd===this.snapshot.canScrollEnd&&t.newItemCount===this.snapshot.newItemCount||(this.snapshot=t,this.host.requestUpdate())}distanceToEnd(e){return Math.max(0,e.scrollHeight-e.clientHeight-e.scrollTop)}setTailHeight(e){const t=this.tailSpacer;if(!t)return;const i=Math.max(0,e),o=Number.parseFloat(t.style.height||"0")||0;Math.abs(o-i)<=U||(t.style.height=`${i}px`)}findRow(e){if(this.content)return[...this.content.querySelectorAll("[data-message-id]")].find(t=>t.dataset.messageId===e)}hasLayout(){const e=this.viewport;return!!(e&&e.clientHeight>0&&e.getClientRects().length>0)}normalizeBehavior(e){return e!=="smooth"?e:typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}isInteractive(e){return!!e.closest("button, a, input, textarea, select, [contenteditable='true']")}reconcileObservedRows(){if(!this.resizeObserver||!this.content)return;const e=new Set(this.content.querySelectorAll("[data-message-id]"));for(const t of this.observedRows)e.has(t)||this.resizeObserver.unobserve(t);for(const t of e)this.observedRows.has(t)||this.resizeObserver.observe(t);this.observedRows=e}commitModeAttribute(){this.root&&(this.root.dataset.scrollMode=this.mode),this.viewport&&(this.viewport.dataset.scrollMode=this.mode)}detachElements(){const e=this.viewport;e&&(e.removeEventListener("scroll",this.handleScroll),e.removeEventListener("wheel",this.handleWheel),e.removeEventListener("touchmove",this.handleTouchMove),e.removeEventListener("keydown",this.handleKeydown),e.removeEventListener("pointerdown",this.handlePointerDown),e.removeEventListener("pointerup",this.handlePointerUp),e.removeEventListener("pointercancel",this.handlePointerUp)),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,typeof window<"u"&&window.removeEventListener("resize",this.handleWindowResize),this.observedRows.clear(),this.root=void 0,this.viewport=void 0,this.content=void 0,this.tailSpacer=void 0}clearProgrammaticTimer(){this.programmaticClearTimer!==void 0&&(globalThis.clearTimeout(this.programmaticClearTimer),this.programmaticClearTimer=void 0)}clearSettlingTimer(){this.settlingTimer!==void 0&&(globalThis.clearTimeout(this.settlingTimer),this.settlingTimer=void 0)}requestFrame(e){return typeof requestAnimationFrame=="function"?requestAnimationFrame(e):globalThis.setTimeout(()=>e(performance.now()),0)}cancelFrame(){this.frameId!==void 0&&(typeof cancelAnimationFrame=="function"?cancelAnimationFrame(this.frameId):globalThis.clearTimeout(this.frameId),this.frameId=void 0)}}function Zs(s){const e=Xs(s.contact),t=Js(s.environment.search),i=se({channel:"site_widget",page_url:s.environment.href,widget_instance_id:s.config.widgetInstanceId,page_title:s.environment.title,referrer_url:s.environment.referrer,utm:t}),o=se({locale:s.environment.locale,timezone:s.environment.timezone});return se({schema_version:"site_widget.v2",event_type:"site_widget.message_submitted",idempotency_key:s.idempotencyKey,submitted_at:s.environment.now,public_session_id:s.publicSessionId,source:i,contact:e&&Object.keys(e).length>0?e:void 0,message:{role:"visitor",text:s.text.trim()},visitor_context:Object.keys(o).length>0?o:void 0,consent:s.privacyPolicyAccepted?{privacy_policy:!0}:void 0})}function Js(s=""){if(!s.trim())return;const e=new URLSearchParams(s.startsWith("?")?s.slice(1):s),t=se({source:e.get("utm_source")??void 0,medium:e.get("utm_medium")??void 0,campaign:e.get("utm_campaign")??void 0,term:e.get("utm_term")??void 0,content:e.get("utm_content")??void 0});return Object.keys(t).length>0?t:void 0}function Xs(s){if(s)return se({name:de(s.name),phone:de(s.phone),email:de(s.email),preferred_contact:s.preferred_contact,city:de(s.city)})}function de(s){return s?.trim()||void 0}function se(s){for(const e of Object.keys(s)){const t=s[e];(t==null||t===""||typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length===0)&&delete s[e]}return s}function he({config:s,open:e=!1,now:t=new Date}){return{open:e,status:e?"open_idle":"closed",draft:"",contactPhone:"",contactCaptureOpen:!1,submitting:!1,pending:void 0,awaitingAi:!1,conversationState:void 0,messages:[ie({role:"assistant",text:s.introMessage,createdAt:t.toISOString(),localKind:"intro"})],visitorMessageCount:0,unreadCount:0}}function w(s,e,t){const i=ei(s);switch(e.type){case"open":return{...i,open:!0,unreadCount:0,status:Tt(i,t)};case"close":return{...i,open:!1,status:"closed"};case"draft.changed":{const o=String(e.value??"");return{...i,draft:o,status:i.open?o.trim()?"composing":Tt(i,t):i.status}}case"contact.capture.toggled":return{...i,contactCaptureOpen:typeof e.open=="boolean"?e.open:!i.contactCaptureOpen};case"contact.phone.saved":return{...i,contactPhone:String(e.phone??"").trim(),contactCaptureOpen:!1};case"submit.started":{if(i.submitting||i.pending)return i;const o=String(e.text??"").trim(),r=String(e.idempotencyKey??"").trim();if(!o||!r)return i;const n=ie({role:"visitor",text:o,status:"pending"});return{...i,open:!0,status:"submitted_waiting",submitting:!0,draft:"",pending:{messageId:n.id,text:o,idempotencyKey:r},visitorMessageCount:i.visitorMessageCount+1,messages:[...i.messages,n]}}case"retry.started":return!i.pending||i.submitting?i:{...i,status:"submitted_waiting",submitting:!0,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"pending"}:o)};case"visitor.saved":return!i.pending||e.messageId!==i.pending.messageId?i:{...i,status:e.awaitingAi?"submitted_waiting":"open_idle",submitting:!1,pending:void 0,awaitingAi:!!e.awaitingAi,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"saved",publicMessageId:e.publicMessageId,acceptanceStatus:e.acceptanceStatus,createdAt:e.submittedAt??o.createdAt}:o)};case"visitor.mocked":return!i.pending||e.messageId!==i.pending.messageId?i:{...i,messages:i.messages.map(o=>o.id===i.pending?.messageId?{...o,status:"sent"}:o)};case"assistant.replied":{const o=String(e.text??"").trim(),r=i.messages.some(l=>l.disclosure),n=o?[...i.messages,ie({role:"assistant",text:o,disclosure:!r,publicMessageId:e.publicMessageId,disclosureText:e.disclosureText,catalogReferences:e.catalogReferences,createdAt:e.createdAt})]:i.messages;return Mt(i,n,"replied")}case"history.synced":return ti(i,e);case"system.message":{const o=String(e.text??"").trim(),r=o?[...i.messages,ie({role:"system",text:o,systemKind:e.status})]:i.messages;return Mt(i,r,e.status)}case"submit.failed":{if(!i.pending||e.messageId&&e.messageId!==i.pending.messageId)return i;const o=i.messages.map(r=>r.id===i.pending?.messageId?{...r,status:"error"}:r);return{...i,status:"error",submitting:!1,messages:o}}case"session.cleared":return t?he({config:t,open:i.open}):{...i,pending:void 0,submitting:!1,awaitingAi:!1};default:return i}}function ue(s,e){const t=s.trim();return t?t.length>e.maxMessageLength?"message_too_long":null:"empty_message"}function ie({role:s,text:e,status:t="sent",disclosure:i=!1,publicMessageId:o,acceptanceStatus:r,disclosureText:n,systemKind:l,catalogReferences:a,localKind:c,id:d,createdAt:h=new Date().toISOString()}){return{id:d??te("msg"),role:s,text:String(e??""),status:t,publicMessageId:o,acceptanceStatus:r,disclosure:i,disclosureText:n,systemKind:l,catalogReferences:a,localKind:c,createdAt:h}}function Mt(s,e,t){return{...s,status:t,submitting:!1,pending:void 0,awaitingAi:!1,messages:e,unreadCount:s.open?s.unreadCount:s.unreadCount+1}}function Tt(s,e){const t=e?ue(s.draft,e):s.draft.trim()?null:"empty_message";return s.submitting||s.awaitingAi?"submitted_waiting":s.status==="error"?"error":s.status==="replied"||s.status==="fallback"||s.status==="disabled"?s.status:s.draft.trim()&&!t?"composing":"open_idle"}function ei(s){return{...s,draft:String(s.draft??""),contactPhone:String(s.contactPhone??""),submitting:!!s.submitting,awaitingAi:!!s.awaitingAi,messages:Array.isArray(s.messages)?s.messages:[],visitorMessageCount:Number.isInteger(s.visitorMessageCount)?s.visitorMessageCount:0,unreadCount:Number.isInteger(s.unreadCount)?s.unreadCount:0}}function ti(s,e){const t=s.messages.find(u=>u.localKind==="intro"),i=s.messages.filter(u=>u.localKind!=="intro"&&!u.publicMessageId),o=new Map(s.messages.flatMap(u=>u.publicMessageId?[[u.publicMessageId,u]]:[]));let r=!1;const n=e.messages.map(u=>{const g=o.get(u.publicMessageId),v=u.senderRole!=="visitor",I=u.senderRole==="ai_assistant"&&!r;return I&&(r=!0),ie({id:g?.id??`server:${u.publicMessageId}`,role:v?"assistant":"visitor",text:u.text,status:v?"sent":"saved",publicMessageId:u.publicMessageId,acceptanceStatus:g?.acceptanceStatus??"accepted",disclosure:I,disclosureText:g?.disclosureText,catalogReferences:u.catalogReferences,createdAt:u.submittedAt})}),l=new Set(o.keys()),a=e.messages.filter(u=>u.senderRole!=="visitor"&&!l.has(u.publicMessageId)).length,c=[...t?[t]:[],...n,...i],d=e.messages.some(u=>u.senderRole!=="visitor"),h=e.awaitingAi?"submitted_waiting":e.conversationState==="manager_pending"||e.conversationState==="manager_active"?"fallback":d?"replied":"open_idle";return{...s,status:h,awaitingAi:e.awaitingAi,conversationState:e.conversationState,messages:c,visitorMessageCount:Math.max(s.visitorMessageCount,e.messages.filter(u=>u.senderRole==="visitor").length),unreadCount:s.open?s.unreadCount:s.unreadCount+a}}function si(s,e){const t=ue(s.draft,e),i=s.visitorMessageCount>0;return{...s,canSend:!s.submitting&&!s.pending&&!t,draftError:t,showQuickReplies:s.open&&e.showQuickActions&&e.quickReplies.length>0&&!s.submitting&&!i,showMobileActions:!s.open&&e.showMobileActions&&e.mobileActions.length>0,showContactTrigger:!e.collectPhoneAfterFirstMessage||i,contactLabel:s.contactPhone?e.phoneSavedLabel:e.phoneCaptureLabel,attachmentVisible:e.mock&&e.attachmentsEnabled&&e.showAttachmentSlot,attachmentDisabled:!1,status:s.status}}const kt="granit-site-widget",Pt="granit-widget",ii={opened:"open",closed:"close","response-received":"response"};function E(s,e,t,i={}){const o=oi(i,t);pe(s,`${kt}:${e}`,o),pe(s,`${Pt}:${e}`,o);const r=ii[e];r&&(pe(s,`${kt}:${r}`,o),pe(s,`${Pt}:${r}`,o))}function oi(s,e){const t={...s,widgetInstanceId:s.widgetInstanceId??e.widgetInstanceId};if(typeof t.publicSessionId=="string"){const i=t.publicSessionId.trim();i&&(t.publicSessionIdHash=zs(i)),delete t.publicSessionId}return e.includeMessageTextInEvents||(typeof t.messageText=="string"&&(t.messageLength=t.messageText.length),delete t.messageText),t}function pe(s,e,t){s.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}function ri(s=new Date){return{href:typeof window>"u"?"":window.location.href,search:typeof window>"u"?"":window.location.search,title:typeof document>"u"?void 0:document.title||void 0,referrer:typeof document>"u"?void 0:document.referrer||void 0,locale:typeof navigator>"u"?void 0:navigator.language||void 0,timezone:ni(),now:s.toISOString()}}function ni(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return}}const ai=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;function Ue(s){if(typeof s!="string")return;const e=s.trim().toLowerCase();return ai.test(e)?e:void 0}function me(s){return Ue(s)}const Oe=new Set(["missing_openai_config","model_error","empty_model_response","unsafe_model_response","semantic_verifier_error","grounding_validation_failed","turn_timeout","agent_reply_blocked","ai_persistence_unconfirmed","worker_failed","handoff"]),ci=["ok","schema_version","status","public_session_id","public_message_id","action","automation","message_to_user"],li=["status","next_step","conversation_state","disclosure","reply"],di=["status","next_step","conversation_state","reason"],hi=["status","next_step","reason"],ui=["status","next_step"],pi=["shown","version","text"],mi=["public_message_id","sender_role","text"],gi=["ok","schema_version","status","public_session_id","public_conversation_id","public_message_id","submitted_at","action","automation","message_to_user"],fi=["status","next_step","conversation_state","poll_after_ms"],bi=["status","next_step","conversation_state"],vi=["status","next_step","conversation_state"],wi=["status","next_step","conversation_state","reason"],_i=["status","next_step","conversation_state","reason"];function yi(s,e){const t=oe(s,"root");return t.schema_version==="site_widget.v2"?Si(t,s,e):xi(t,s,e)}function xi(s,e,t){$(s,ci,"root"),s.ok!==!0&&f("ok"),s.schema_version!=="site_widget.v1"&&f("schema_version");const i=Ct(s.status);s.action!=="show_widget_saved"&&f("action");const o=j(s.public_session_id,"public_session_id"),r=j(s.public_message_id,"public_message_id"),n=T(s.message_to_user,"message_to_user"),l=oe(s.automation,"automation"),a=T(l.status,"automation.status"),c={source:"server",acceptanceStatus:i,action:"show_widget_saved",publicSessionId:o,publicMessageId:r,raw:e};if(a==="replied"){$(l,li,"automation"),l.next_step!=="ai_reply_shown"&&f("automation.next_step"),l.conversation_state!==void 0&&O(l.conversation_state,["ai_active","manager_pending"]);const d=oe(l.disclosure,"automation.disclosure");$(d,pi,"automation.disclosure"),d.shown!==!0&&f("automation.disclosure.shown"),Be(d.version,"automation.disclosure.version",120);const h=Be(d.text,"automation.disclosure.text",1e3),u=oe(l.reply,"automation.reply");$(u,mi,"automation.reply");const g=j(u.public_message_id,"automation.reply.public_message_id");g===r&&f("automation.reply.public_message_id_identity"),u.sender_role!=="ai_assistant"&&f("automation.reply.sender_role");const v=Be(u.text,"automation.reply.text",1e3);return{...c,status:"replied",replyText:v,replyPublicMessageId:g,disclosureText:h}}if(a==="degraded"){$(l,di,"automation"),l.next_step!=="retry_available"&&f("automation.next_step"),O(l.conversation_state,["ai_active"]);const d=T(l.reason,"automation.reason");return Oe.has(d)||f("automation.reason"),{...c,status:"fallback",systemText:n.trim()||t.fallbackMessage,reason:d}}if(a==="fallback"){$(l,hi,"automation"),l.next_step!=="manager_review"&&f("automation.next_step");const d=T(l.reason,"automation.reason");return Oe.has(d)||f("automation.reason"),{...c,status:"fallback",systemText:n.trim()||t.fallbackMessage,reason:d}}if(a==="disabled")return $(l,ui,"automation"),l.next_step!=="manager_review"&&f("automation.next_step"),{...c,status:"disabled",systemText:n.trim()||t.disabledMessage};f("automation.status")}function Si(s,e,t){$(s,gi,"root"),s.ok!==!0&&f("ok","site_widget.v2");const i=Ct(s.status);s.action!=="show_widget_saved"&&f("action","site_widget.v2");const o=j(s.public_session_id,"public_session_id","site_widget.v2"),r=j(s.public_conversation_id,"public_conversation_id","site_widget.v2"),n=j(s.public_message_id,"public_message_id","site_widget.v2"),l=Ai(s.submitted_at,"submitted_at","site_widget.v2"),a=T(s.message_to_user,"message_to_user"),c=oe(s.automation,"automation"),d=T(c.status,"automation.status"),h={source:"server",acceptanceStatus:i,action:"show_widget_saved",publicSessionId:o,publicConversationId:r,publicMessageId:n,submittedAt:l,raw:e};if(d==="processing")return $(c,fi,"automation"),c.next_step!=="poll_history"&&f("automation.next_step","site_widget.v2"),O(c.conversation_state,["ai_active"]),{...h,status:"processing",pollAfterMs:$i(c.poll_after_ms,"automation.poll_after_ms",250,5e3)};if(d==="replied")return $(c,vi,"automation"),c.next_step!=="history_available"&&f("automation.next_step","site_widget.v2"),O(c.conversation_state,["ai_active","manager_pending"]),{...h,status:"processing",pollAfterMs:0};if(d==="disabled")return $(c,bi,"automation"),c.next_step!=="manager_review"&&f("automation.next_step","site_widget.v2"),O(c.conversation_state,["manager_pending"]),{...h,status:"disabled",systemText:a.trim()||t.disabledMessage};if(d==="degraded"){$(c,wi,"automation"),c.next_step!=="retry_or_manager"&&f("automation.next_step","site_widget.v2"),O(c.conversation_state,["ai_active"]);const u=Rt(c.reason,"site_widget.v2");return{...h,status:"fallback",systemText:a.trim()||t.fallbackMessage,reason:u}}if(d==="manager_pending"){$(c,_i,"automation"),c.next_step!=="manager_review"&&f("automation.next_step","site_widget.v2"),O(c.conversation_state,["manager_pending","manager_active"]);const u=Rt(c.reason,"site_widget.v2");return{...h,status:"fallback",systemText:a.trim()||t.fallbackMessage,reason:u}}f("automation.status","site_widget.v2")}function Ct(s){return s==="accepted"||s==="replayed"?s:f("status")}function O(s,e){const t=T(s,"automation.conversation_state");return e.includes(t)||f("automation.conversation_state"),t}function j(s,e,t="site_widget.v1"){return Ue(s)??f(e,t)}function oe(s,e){return typeof s=="object"&&s!==null&&!Array.isArray(s)?s:f(e)}function $(s,e,t){const i=new Set(e),o=Object.keys(s).find(r=>!i.has(r));o&&f(`${t}.${o}`)}function T(s,e){return typeof s=="string"?s:f(e)}function Be(s,e,t){const i=T(s,e);return i.length>t&&f(e),i.trim()||f(e)}function Ai(s,e,t){const i=T(s,e);return(!i||!Number.isFinite(Date.parse(i)))&&f(e,t),i}function $i(s,e,t,i){return(typeof s!="number"||!Number.isInteger(s)||s<t||s>i)&&f(e,"site_widget.v2"),s}function Rt(s,e){const t=T(s,"automation.reason");return Oe.has(t)||f("automation.reason",e),t}function f(s,e="site_widget.v1"){throw new Error(`Invalid ${e} response: ${s}`)}const Ei=["ok","schema_version","public_session_id","public_conversation_id","conversation_state","poll_after_ms","messages"],Ii=["public_message_id","sender_role","text","submitted_at","delivery_state","catalog_references","automation"],Mi=["kind","label","title","href","entity_id"],Ti=["status","reason"],ki=/^\/catalog\.html\?section=[a-z0-9-]+&entity=ent_[a-f0-9]+#block-[a-z0-9-]+$/;function Pi(s){const e=ge(s,"root");fe(e,Ei,"root"),e.ok!==!0&&_("ok"),e.schema_version!=="site_widget.history.v2"&&_("schema_version");const t=De(e.public_session_id,"public_session_id"),i=De(e.public_conversation_id,"public_conversation_id"),o=Li(e.conversation_state),r=e.poll_after_ms===void 0?void 0:Oi(e.poll_after_ms,"poll_after_ms",250,5e3);(!Array.isArray(e.messages)||e.messages.length>100)&&_("messages");const n=e.messages.map(Ci),l=new Set;for(const a of n)l.has(a.publicMessageId)&&_("messages.public_message_id_duplicate"),l.add(a.publicMessageId);return{publicSessionId:t,publicConversationId:i,conversationState:o,pollAfterMs:r,messages:n,raw:s}}function Ci(s,e){const t=`messages.${e}`,i=ge(s,t);fe(i,Ii,t);const o=i.sender_role;return o!=="visitor"&&o!=="ai_assistant"&&o!=="manager"&&_(`${t}.sender_role`),i.delivery_state!=="accepted"&&_(`${t}.delivery_state`),{publicMessageId:De(i.public_message_id,`${t}.public_message_id`),senderRole:o,text:W(i.text,`${t}.text`,4e3),submittedAt:Ui(i.submitted_at,`${t}.submitted_at`),deliveryState:"accepted",catalogReferences:Ri(i.catalog_references,t),automation:i.automation===void 0?void 0:zi(i.automation,`${t}.automation`)}}function Ri(s,e){return s===void 0?[]:((!Array.isArray(s)||s.length>8)&&_(`${e}.catalog_references`),s.map((t,i)=>{const o=`${e}.catalog_references.${i}`,r=ge(t,o);fe(r,Mi,o),r.kind!=="catalog_item"&&_(`${o}.kind`);const n=W(r.href,`${o}.href`,2048);ki.test(n)||_(`${o}.href`);const l=W(r.entity_id,`${o}.entity_id`,80);return/^ent_[a-f0-9]+$/.test(l)||_(`${o}.entity_id`),{kind:"catalog_item",label:W(r.label,`${o}.label`,240),title:W(r.title,`${o}.title`,160),href:n,entityId:l}}))}function zi(s,e){const t=ge(s,e);fe(t,Ti,e);const i=t.status;i!=="pending"&&i!=="processing"&&i!=="retrying"&&i!=="replied"&&i!=="degraded"&&i!=="blocked"&&i!=="failed"&&_(`${e}.status`);const o=t.reason===void 0?void 0:W(t.reason,`${e}.reason`,120);return{status:i,reason:o}}function Li(s){return s==="ai_active"||s==="manager_pending"||s==="manager_active"||s==="closed"?s:_("conversation_state")}function ge(s,e){return typeof s=="object"&&s!==null&&!Array.isArray(s)?s:_(e)}function fe(s,e,t){const i=new Set(e),o=Object.keys(s).find(r=>!i.has(r));o&&_(`${t}.${o}`)}function De(s,e){return Ue(s)??_(e)}function W(s,e,t){return(typeof s!="string"||s.length>t||!s.trim())&&_(e),s.trim()}function Ui(s,e){return(typeof s!="string"||!Number.isFinite(Date.parse(s)))&&_(e),s}function Oi(s,e,t,i){return(typeof s!="number"||!Number.isInteger(s)||s<t||s>i)&&_(e),s}function _(s){throw new Error(`Invalid site_widget.history.v2 response: ${s}`)}async function Bi(s,e,t){if(t?.aborted)throw new DOMException("Aborted","AbortError");if(s.mock)return qi(s,e,t);if(!s.apiBaseUrl)throw new Error("apiBaseUrl is required when mock=false");const i=new AbortController,o=globalThis.setTimeout(()=>i.abort(),xe(s.timeoutMs)),r=()=>i.abort();t?.aborted?i.abort():t?.addEventListener("abort",r,{once:!0});try{const n=await fetch(`${s.apiBaseUrl}${s.messagesPath}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e),credentials:"omit",signal:i.signal}),l=await zt(n);if(!n.ok)throw new Error(Lt(l)??`Widget request failed with HTTP ${n.status}`);const a=yi(l,s),c=me(e.public_session_id);if(c&&a.publicSessionId!==c)throw new Error("Invalid site_widget.v2 response: public_session_id_mismatch");return a}finally{globalThis.clearTimeout(o),t?.removeEventListener("abort",r)}}async function Di(s,e,t){const i=me(e);if(!i)throw new Error("Invalid site_widget.history.v2 request: public_session_id");if(!s.apiBaseUrl)throw new Error("apiBaseUrl is required when mock=false");if(t?.aborted)throw new DOMException("Aborted","AbortError");const o=new AbortController,r=globalThis.setTimeout(()=>o.abort(),Math.min(xe(s.timeoutMs),1e4)),n=()=>o.abort();t?.addEventListener("abort",n,{once:!0});try{const l=`/public/intake/site-widget/sessions/${encodeURIComponent(i)}/history`,a=await fetch(`${s.apiBaseUrl}${l}?schema_version=site_widget.history.v2`,{method:"GET",headers:{Accept:"application/json"},credentials:"omit",signal:o.signal}),c=await zt(a);if(!a.ok)throw new Error(Lt(c)??`Widget history failed with HTTP ${a.status}`);const d=Pi(c);if(d.publicSessionId!==i)throw new Error("Invalid site_widget.history.v2 response: public_session_id_mismatch");return d}finally{globalThis.clearTimeout(r),t?.removeEventListener("abort",n)}}async function qi(s,e,t){await Hi(350,t);const i=e.message.text.toLowerCase();return i.includes("менеджер")||i.includes("позвон")?{source:"mock",status:"fallback",publicSessionId:e.public_session_id,systemText:"Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",reason:"manager_requested",raw:{mock:!0}}:i.includes("сто")||i.includes("цен")||i.includes("расчет")||i.includes("расчёт")?{source:"mock",status:"replied",publicSessionId:e.public_session_id,replyText:"Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",raw:{mock:!0}}:{source:"mock",status:"replied",publicSessionId:e.public_session_id,replyText:"Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",raw:{mock:!0}}}async function zt(s){if((s.headers.get("content-type")??"").includes("application/json"))return s.json();const t=await s.text();return t?{message:t}:void 0}function Lt(s){if(!s||typeof s!="object"||Array.isArray(s))return;const e=s;return typeof e.message=="string"?e.message:typeof e.error=="string"?e.error:void 0}function Hi(s,e){return e?.aborted?Promise.reject(new DOMException("Aborted","AbortError")):new Promise((t,i)=>{const o=globalThis.setTimeout(()=>{e?.removeEventListener("abort",r),t()},s),r=()=>{globalThis.clearTimeout(o),i(new DOMException("Aborted","AbortError"))};e?.addEventListener("abort",r,{once:!0})})}function Ut(s,e="local"){const t=`sw:${s}:public_session_id`,i=`sw:${s}:open_state`,o=`sw:${s}:panel_size`,r=e==="memory"?void 0:Fi();let n="",l,a;return{getPublicSessionId(){const c=qe(r,t),d=me(c||n);return d?(n=d,c&&c!==d&&be(r,t,d),d):(n="",c&&Ot(r,t),"")},setPublicSessionId(c){const d=me(c);d&&(n=d,be(r,t,d))},clearPublicSessionId(){n="",Ot(r,t)},getOpenState(){const c=qe(r,i);return c==="open"?!0:c==="closed"?!1:l},setOpenState(c){l=c,be(r,i,c?"open":"closed")},getPanelSize(){const c=qe(r,o);return Ni(c)?c:a},setPanelSize(c){a=c,be(r,o,c)}}}function Ni(s){return s==="normal"||s==="wide"||s==="fullscreen"}function Fi(){try{return typeof window>"u"?void 0:window.localStorage}catch{return}}function qe(s,e){try{return s?.getItem(e)||void 0}catch{return}}function be(s,e,t){try{s?.setItem(e,t)}catch{}}function Ot(s,e){try{s?.removeItem(e)}catch{}}const ji=Je`
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

  .message-links {
    display: grid;
    gap: 7px;
    margin-top: 11px;
  }

  .message-link {
    align-items: center;
    background: color-mix(in srgb, var(--sw-color-accent) 9%, var(--sw-color-surface-control));
    border: 1px solid color-mix(in srgb, var(--sw-color-accent) 28%, var(--sw-color-border-soft));
    border-radius: 11px;
    color: var(--sw-color-text-primary);
    display: flex;
    font-size: 14px;
    font-weight: var(--sw-font-weight-action);
    gap: 10px;
    justify-content: space-between;
    line-height: 1.3;
    min-height: 44px;
    padding: 9px 11px;
    text-decoration: none;
  }

  .message-link:hover {
    border-color: var(--sw-color-accent);
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
    gap: 5px;
    min-height: 32px;
  }

  .message-time {
    color: var(--sw-color-text-muted);
    font-variant-numeric: tabular-nums;
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

  .date-separator {
    align-items: center;
    color: var(--sw-color-text-muted);
    display: flex;
    font-size: 12px;
    gap: 10px;
    justify-content: center;
    line-height: 1.3;
    margin: 3px 0;
    text-align: center;
  }

  .date-separator::before,
  .date-separator::after {
    background: var(--sw-color-border-soft);
    content: "";
    flex: 1;
    height: 1px;
  }

  .typing {
    align-items: center;
    align-self: flex-start;
    display: flex;
    gap: 8px;
  }

  .typing__avatar {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 50%;
    color: var(--sw-color-accent);
    display: inline-flex;
    height: 30px;
    justify-content: center;
    width: 30px;
  }

  .typing__dots {
    align-items: center;
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 14px 14px 14px 5px;
    display: inline-flex;
    gap: 4px;
    min-height: 36px;
    padding: 0 12px;
  }

  .typing__dots i {
    animation: typing-pulse 1.15s ease-in-out infinite;
    background: var(--sw-color-text-muted);
    border-radius: 50%;
    display: block;
    height: 5px;
    opacity: 0.35;
    width: 5px;
  }

  .typing__dots i:nth-child(2) {
    animation-delay: 140ms;
  }

  .typing__dots i:nth-child(3) {
    animation-delay: 280ms;
  }

  @keyframes message-spinner {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes typing-pulse {
    0%,
    60%,
    100% {
      opacity: 0.35;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`,Wi=Je`
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

  .message-link:focus-visible {
    border-radius: 11px;
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
`;function x(s,e=22){const t={width:e,height:e};switch(s){case"send":return A(t,S`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);case"phone":return A(t,S`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`);case"calculator":return A(t,S`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`);case"close":return A(t,S`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);case"minus":return A(t,S`<path d="M5 12h14" />`);case"paperclip":return A(t,S`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);case"shield":return A(t,S`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`);case"brand":return A(t,S`<path d="m8 3 4 8 5-5 5 15H2Z" />`);case"plus":return A(t,S`<path d="M5 12h14" /><path d="M12 5v14" />`);case"maximize-2":case"expand":return A(t,S`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);case"minimize-2":case"shrink":return A(t,S`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);case"spark":return A(t,S`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`);case"loader":return A(t,S`<path d="M21 12a9 9 0 1 1-2.64-6.36" />`);case"message":default:return A(t,S`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`)}}function A(s,e){return S`<svg
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
 */const Ki=gt(class extends ft{constructor(){super(...arguments),this.key=p}render(s,e){return this.key=s,e}update(s,[e,t]){return e!==this.key&&(wt(s),this.key=e),t}}),Vi="image/jpeg,image/png,image/webp",Bt="Добавить фото";function Gi({label:s=Bt,disabled:e=!1,onFilesSelected:t}){const i=s.trim()||Bt;return b`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${i}
      aria-label=${i}
      ?disabled=${e}
      @click=${Zi}
    >
      ${x("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${Vi}
      multiple
      hidden
      ?disabled=${e}
      @change=${o=>Ji(o,t)}
    />
  `}function Yi({attachments:s,validationMessage:e="",validationRevision:t=0,onRemove:i}){const o=e.trim();return b`
    ${o?Ki(t,b`<p class="attachment-validation" role="alert" data-validation-revision=${t}>
            ${o}
          </p>`):p}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${Xi(s.length)}
    </span>
    ${s.length>0?b`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${s.map((r,n)=>{const l=n+1;return b`
                <li class="attachment" part="attachment">
                  <img
                    class="attachment__preview"
                    part="attachment-preview"
                    src=${r.previewUrl}
                    alt=""
                    width=${ve(r.width)}
                    height=${ve(r.height)}
                    decoding="async"
                  />
                  <span class="attachment__details">
                    <span class="attachment__label">Фото ${l}</span>
                    <span class="attachment__size">${eo(r.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${r.id}
                    type="button"
                    aria-label=${`Удалить фото ${l}`}
                    @click=${()=>i(r.id)}
                  >
                    ${x("close",18)}
                  </button>
                </li>
              `})}
          </ul>
        `:p}
  `}function Qi(s){return s.length===0?p:b`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${s.map((e,t)=>b`
          <li class="message-attachment" part="attachment">
            <img
              class="message-attachment__preview"
              part="attachment-preview"
              src=${e.previewUrl}
              alt=${`Фото ${t+1}`}
              width=${ve(e.width)}
              height=${ve(e.height)}
              decoding="async"
            />
          </li>
        `)}
    </ul>
  `}function Zi(s){const e=s.currentTarget;if(!(e instanceof HTMLButtonElement))return;const t=e.nextElementSibling;t instanceof HTMLInputElement&&!t.disabled&&t.click()}function Ji(s,e){const t=s.currentTarget;if(!(t instanceof HTMLInputElement))return;const i=t.files?Array.from(t.files):[];t.value="",i.length>0&&e(i)}function Xi(s){return`Выбрано фото: ${s}`}function eo(s){const e=Math.max(0,Math.floor(s));return e<1024?`${e} Б`:e<1048576?`${Dt(e/1024)} КБ`:`${Dt(e/1048576)} МБ`}function Dt(s){const e=s>=10?0:1;return s.toFixed(e).replace(".",",")}function ve(s){return Math.max(1,Math.floor(s))}function to(s,e){return s.role==="system"?no(s):so(s,e)}function so(s,e){return b`<div
    class=${`message-root message-root--${s.role}`}
    part="message-root"
    data-message-id=${s.id}
    data-message-status=${s.status}
    data-public-message-id=${s.publicMessageId??p}
    data-acceptance-status=${s.acceptanceStatus??p}
  >
    ${io(s,e)} ${oo(s,e)}
  </div>`}function io(s,e){return b`<article class=${uo(s)} part=${`message message-${s.role} message-bubble`}>
    <p class="message__text">${s.text}</p>
    ${s.catalogReferences?.length?b`<div class="message-links" part="message-links">
          ${s.catalogReferences.map(t=>b`<a
              class="message-link"
              part="message-link"
              href=${t.href}
              target="_self"
              data-entity-id=${t.entityId}
            >
              ${t.label}
              <span aria-hidden="true">→</span>
            </a>`)}
        </div>`:p}
    ${Qi(e.images??[])}
  </article>`}function oo(s,e){const t=s.status==="pending"||s.status==="saved"||s.status==="error";return s.localKind==="intro"&&!s.disclosure&&!t?p:b`<div class="message-meta" part="message-meta">
    ${s.disclosure?b`<div class="message-disclosure" part="message-disclosure">
          ${x("spark",16)}
          <span>${s.disclosureText??e.config.disclosureText}</span>
        </div>`:p}
    <div class=${`message-status-row message-status-row--${s.status}`}>
      <time class="message-time" datetime=${s.createdAt}>${lo(s.createdAt)}</time>
      ${t?b`
          <span aria-hidden="true">·</span>
          <span class="message-status" part="message-status">
            ${s.status==="pending"?b`<span class="message-status__spinner" aria-hidden="true">${x("loader",14)}</span
                  >Отправляем…`:s.status==="saved"?"Принято":"Не отправлено"}
          </span>
          ${ro(s,e)}
        `:p}
    </div>
  </div>`}function ro(s,e){return s.status!=="error"?p:b`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${()=>e.onRetry(s.id)}
    >
      ${e.config.retryLabel}
    </button>
  </div>`}function no(s){return b`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${s.id}
    data-system-kind=${s.systemKind??"fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${x("shield",16)}</span>
    <span class="marker__text" part="marker-text">${s.text}</span>
  </div>`}function ao(s,e,t=new Date){if(s.localKind==="intro")return p;const i=He(s.createdAt),o=e&&e.localKind!=="intro"?He(e.createdAt):void 0;return!i||o&&Ne(i,o)?p:b`<div class="date-separator" part="date-separator" role="separator">
    <span>${ho(i,t)}</span>
  </div>`}function co(){return b`<div class="typing" part="typing-indicator" role="status" aria-label="AI-помощник печатает">
    <span class="typing__avatar" aria-hidden="true">${x("spark",16)}</span>
    <span class="typing__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="visually-hidden">AI-помощник печатает</span>
  </div>`}function lo(s){const e=He(s);return e?new Intl.DateTimeFormat("ru-RU",{hour:"2-digit",minute:"2-digit"}).format(e):""}function ho(s,e=new Date){if(Ne(s,e))return"Сегодня";const t=new Date(e);return t.setDate(t.getDate()-1),Ne(s,t)?"Вчера":new Intl.DateTimeFormat("ru-RU",{day:"numeric",month:"long",year:s.getFullYear()===e.getFullYear()?void 0:"numeric"}).format(s)}function He(s){const e=new Date(s);return Number.isFinite(e.getTime())?e:void 0}function Ne(s,e){return s.getFullYear()===e.getFullYear()&&s.getMonth()===e.getMonth()&&s.getDate()===e.getDate()}function uo(s){const e=["message",`message--${s.role}`];return s.status==="error"&&e.push("message--error"),e.join(" ")}const we="granit-site-widget",po=["normal","wide","fullscreen"],mo=["normal","fullscreen"],go={normal:"обычный размер",wide:"широкий режим",fullscreen:"на весь экран"},je=class je extends X{constructor(){super(...arguments),this.config=ye(),this.state=he({config:this.config}),this.panelSize="normal",this.hasBooted=!1,this.publicSessionId="",this.historyEpoch=0,this.operationEpoch=0,this.messageScroller=new Qs(this),this.imageAttachments=new Ws(this),this.sendMessageRequest=Bi,this.panelId=te("sw-panel"),this.titleId=te("sw-title"),this.phoneCaptureId=te("sw-phone"),this.cyclePanelSize=()=>{this.panelSize=this.getNextPanelSize(),this.sessionStore?.setPanelSize(this.panelSize),this.requestUpdate()},this.handleSubmit=e=>{e.preventDefault(),this.submitDraft()},this.handleInput=e=>{const t=e.currentTarget;this.state=w(this.state,{type:"draft.changed",value:t.value},this.config),this.requestUpdate()},this.handleTextareaKeydown=e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.submitDraft())},this.handlePanelKeydown=e=>{e.key==="Escape"&&(e.preventDefault(),this.close())},this.handleQuickReplyFocus=e=>{const t=e.currentTarget;t instanceof HTMLElement&&typeof t.scrollIntoView=="function"&&t.scrollIntoView({behavior:"auto",block:"nearest",inline:"nearest"})},this.toggleContactCapture=()=>{this.state=w(this.state,{type:"contact.capture.toggled"},this.config),this.requestUpdate(),this.updateComplete.then(()=>this.renderRoot.querySelector(".phone-field")?.focus())},this.handlePhoneInput=e=>{const t=e.currentTarget.value;this.state={...this.state,contactPhone:t}},this.handlePhoneKeydown=e=>{e.key==="Enter"&&(e.preventDefault(),this.savePhone())},this.savePhone=()=>{const e=this.state.contactPhone.trim();this.state=w(this.state,{type:"contact.phone.saved",phone:e},this.config),E(this,"phone-saved",this.config,{hasPhone:e.length>0}),this.requestUpdate()},this.retryPending=async e=>{if(!this.state.pending||this.state.submitting||e&&e!==this.state.pending.messageId)return;const t=this.state.pending,i=this.operationEpoch;this.state=w(this.state,{type:"retry.started"},this.config),this.requestUpdate(),await this.sendPending(t,i)},this.handleAttachmentFiles=async e=>{this.isPhotoPreviewEnabled()&&await this.imageAttachments.selectFiles(e)},this.handleRemoveAttachment=e=>{const t=this.imageAttachments.removeDraft(e);this.updateComplete.then(()=>{(t?[...this.renderRoot.querySelectorAll("[data-attachment-id]")].find(o=>o.dataset.attachmentId===t):this.renderRoot.querySelector(".attach-button"))?.focus()})}}static get observedAttributes(){return[...super.observedAttributes,...Wt]}connectedCallback(){const e=this.hasBooted;super.connectedCallback(),this.boot(),e&&this.requestUpdate()}disconnectedCallback(){this.invalidateActiveWork(!0),super.disconnectedCallback()}attributeChangedCallback(e,t,i){if(t===i||!this.hasBooted)return;const o=this.config,r=this.isPhotoPreviewEnabled();this.config=Ve(this),this.syncHostAttributes();const n=this.isPhotoPreviewEnabled(),l=o.widgetInstanceId!==this.config.widgetInstanceId||o.storage!==this.config.storage,a=o.apiBaseUrl!==this.config.apiBaseUrl||o.messagesPath!==this.config.messagesPath||o.timeoutMs!==this.config.timeoutMs||o.mock!==this.config.mock,c=r!==n;if(l){const d=this.state.open;this.invalidateActiveWork(!1),this.imageAttachments.clearAll(),this.sessionStore=Ut(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId(),this.panelSize=this.sessionStore.getPanelSize()??this.config.panelSize,this.state=he({config:this.config,open:d})}else(a||c)&&this.invalidateActiveWork(!0);this.imageAttachments.setEnabled(n),e==="panel-size"&&(this.panelSize=this.config.panelSize),e==="open"&&(this.state=w(this.state,this.hasAttribute("open")?{type:"open"}:{type:"close"},this.config)),this.requestUpdate()}open(){this.boot(),this.state=w(this.state,{type:"open"},this.config),this.hasAttribute("open")||this.setAttribute("open",""),this.persistOpenState(!0),E(this,"opened",this.config),this.requestUpdate(),this.focusInputSoon()}close(){this.boot(),this.state=w(this.state,{type:"close"},this.config),this.hasAttribute("open")&&this.removeAttribute("open"),this.persistOpenState(!1),E(this,"closed",this.config),this.requestUpdate(),this.focusLauncherSoon()}sendMessage(e){this.boot(),this.state=w(this.state,{type:"draft.changed",value:e},this.config),this.submitDraft()}clearSession(){this.invalidateActiveWork(!1),this.imageAttachments.clearAll(),this.state=w(this.state,{type:"session.cleared"},this.config),this.sessionStore?.clearPublicSessionId(),this.publicSessionId=this.sessionStore?.getPublicSessionId()??"",this.requestUpdate()}render(){const e=si(this.state,this.config),t=this.getEffectivePanelSize(),i=this.getPanelSizeButtonLabel(),o=t==="fullscreen"?"minimize-2":"maximize-2",r=this.messageScroller.getSnapshot(),n=this.isPhotoPreviewEnabled(),l=this.imageAttachments.isProcessing(),a=e.pending?e.messages.find(d=>d.id===e.pending?.messageId):void 0,c=a?.status==="error"?this.config.errorMessage:a?.status==="pending"?"Отправляем сообщение.":e.awaitingAi?"Сообщение принято. AI-помощник печатает.":"";return b`
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
        <span part="launcher-icon" aria-hidden="true">${x("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${e.unreadCount>0?b`<span class="launcher__badge" aria-label=${`${e.unreadCount} новых сообщений`}
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
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${x("brand",24)}</div>
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
              ${x(o)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${()=>this.close()}
            >
              ${x("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${()=>this.close()}
            >
              ${x("close")}
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
                aria-busy=${String(e.submitting||e.awaitingAi)}
              >
                ${Cs(e.messages,d=>d.id,(d,h)=>b`
                    ${ao(d,h>0?e.messages[h-1]:void 0)}
                    <div
                      class="message-scroller__item"
                      data-message-id=${d.id}
                      data-scroll-anchor=${d.role==="visitor"?"true":p}
                    >
                      ${to(d,{config:this.config,onRetry:this.retryPending,images:this.imageAttachments.getForMessage(d.id)})}
                    </div>
                  `)}
                ${e.awaitingAi?co():p}
                <div class="message-scroller__tail" aria-hidden="true"></div>
              </div>
            </div>
            ${r.canScrollEnd?b`<button
                  class="jump-latest"
                  part="jump-latest"
                  type="button"
                  @click=${()=>this.messageScroller.scrollToEnd({behavior:"smooth"})}
                >
                  ${r.newItemCount>0?"Новые сообщения":"К новым сообщениям"}
                </button>`:p}
          </div>

          ${e.showQuickReplies?b`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(d=>b`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${()=>this.handleQuickReply(d.text??d.value??d.label)}
                    @focus=${this.handleQuickReplyFocus}
                  >
                    ${d.label}
                  </button>`)}
              </div>`:p}
        </div>

        <div class="composer-shell" part="composer-shell">
          ${n?Yi({attachments:this.imageAttachments.getDraft(),validationMessage:this.imageAttachments.getValidationMessage(),validationRevision:this.imageAttachments.getValidationRevision(),onRemove:this.handleRemoveAttachment}):p}
          <form
            class="composer"
            part="composer"
            data-attachments=${String(n)}
            @submit=${this.handleSubmit}
          >
            ${n?Gi({label:this.config.attachLabel,disabled:l||e.submitting||!!e.pending,onFilesSelected:this.handleAttachmentFiles}):p}
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
              ?disabled=${!e.canSend||l}
            >
              ${x("send")}
            </button>
          </form>

          ${e.showContactTrigger?b`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  aria-expanded=${String(e.contactCaptureOpen)}
                  aria-controls=${this.phoneCaptureId}
                  @click=${this.toggleContactCapture}
                >
                  ${x("plus",18)}
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
            <span aria-hidden="true">${x("shield",18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${c}</div>
        </div>
      </section>
    `}updated(){this.autoGrowTextarea();const e=this.renderRoot.querySelector(".message-scroller"),t=this.renderRoot.querySelector(".message-viewport"),i=this.renderRoot.querySelector(".messages"),o=this.renderRoot.querySelector(".message-scroller__tail");e&&t&&i&&o&&(this.messageScroller.connect({root:e,viewport:t,content:i,tailSpacer:o}),this.messageScroller.reconcile(this.state.messages.map(r=>({id:r.id,scrollAnchor:r.role==="visitor"}))))}boot(){if(this.hasBooted)return;this.config=Ve(this),this.syncHostAttributes(),this.sessionStore=Ut(this.config.widgetInstanceId,this.config.storage),this.publicSessionId=this.sessionStore.getPublicSessionId(),this.panelSize=this.sessionStore.getPanelSize()??this.config.panelSize,this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());const e=this.config.persistOpenState?this.sessionStore.getOpenState():void 0,t=this.hasAttribute("open")||(e??this.config.initialState==="open");this.state=he({config:this.config,open:t}),t&&!this.hasAttribute("open")&&this.setAttribute("open",""),this.hasBooted=!0,this.publicSessionId&&!this.config.mock&&this.startHistoryPolling(0),this.updateComplete.then(()=>{E(this,"ready",this.config),t&&this.focusInputSoon()})}syncHostAttributes(){this.getAttribute("theme")!==this.config.theme&&this.setAttribute("theme",this.config.theme),this.getAttribute("position")!==this.config.position&&this.setAttribute("position",this.config.position)}persistOpenState(e){this.config.persistOpenState&&this.sessionStore?.setOpenState(e)}getPanelSizeButtonLabel(){return`${this.config.resizeLabel}: ${go[this.getNextPanelSize()]}`}getNextPanelSize(){const e=this.getPanelSizeOrder(),t=e.includes(this.panelSize)?this.panelSize:"normal",i=e.indexOf(t);return e[(i+1)%e.length]??"normal"}getEffectivePanelSize(){return this.isMobileViewport()&&this.panelSize==="wide"?"normal":this.panelSize}getPanelSizeOrder(){return this.isMobileViewport()?mo:po}isMobileViewport(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(max-width: 767px)").matches}handleQuickReply(e){E(this,"action-clicked",this.config,{actionType:"quick-reply"}),this.state=w(this.state,{type:"draft.changed",value:e},this.config),this.requestUpdate(),this.config.quickReplySubmit==="auto"?this.submitDraft():this.focusInputSoon()}renderMobileActions(e){return e?b`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map(t=>this.renderMobileAction(t))}
    </nav>`:p}renderMobileAction(e){const t=e.icon??e.type;return e.type==="call"||e.type==="link"?b`<a
        class="mobile-action"
        part="mobile-action"
        href=${e.href}
        target=${e.type==="link"?e.target??"_blank":"_self"}
        rel=${e.type==="link"&&e.target!=="_self"?"noopener noreferrer":""}
        @click=${()=>E(this,"action-clicked",this.config,{actionType:e.type})}
      >
        ${x(t,20)}
        <span>${e.label}</span>
      </a>`:b`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${()=>this.handleMobileAction(e)}
    >
      ${x(t,20)}
      <span>${e.label}</span>
    </button>`}handleMobileAction(e){E(this,"action-clicked",this.config,{actionType:e.type}),this.open(),e.type==="prefill"&&(this.state=w(this.state,{type:"draft.changed",value:e.text},this.config),this.requestUpdate(),this.focusInputSoon())}async submitDraft(){if(!this.isConnected)return;const e=this.operationEpoch;let t=this.state.draft.trim();if(ue(t,this.config)||this.state.submitting||this.state.pending||this.isPhotoPreviewEnabled()&&this.imageAttachments.isProcessing()&&(await this.imageAttachments.whenIdle(),e!==this.operationEpoch||!this.isConnected||(t=this.state.draft.trim(),ue(t,this.config)||this.state.submitting||this.state.pending))||e!==this.operationEpoch||!this.isConnected)return;const i=Rs(this.publicSessionId);this.state=w(this.state,{type:"submit.started",text:t,idempotencyKey:i},this.config);const o=this.state.pending;!o||o.idempotencyKey!==i||(this.isPhotoPreviewEnabled()&&this.imageAttachments.transferDraftToMessage(o.messageId),this.requestUpdate(),await this.sendPending(o,e))}async sendPending(e,t){this.abortController?.abort();const i=new AbortController;this.abortController=i;const{messageId:o,text:r,idempotencyKey:n}=e,l=()=>this.operationEpoch===t&&this.abortController===i&&!i.signal.aborted&&this.isConnected&&this.state.pending?.messageId===o&&this.state.pending.idempotencyKey===n;try{const a=Zs({config:this.config,text:r,publicSessionId:this.publicSessionId,idempotencyKey:n,contact:this.buildContact(),environment:ri()});if(E(this,"message-submitted",this.config,{idempotencyKey:n,publicSessionId:this.publicSessionId,messageText:r}),!l())return;const c=await this.sendMessageRequest(this.config,a,i.signal);if(!l())return;if(c.source==="server"){if(this.publicSessionId&&c.publicSessionId!==this.publicSessionId)throw new Error("Invalid site_widget.v2 response: public_session_id_mismatch");this.publicSessionId=c.publicSessionId,this.sessionStore?.setPublicSessionId(c.publicSessionId),this.state=w(this.state,{type:"visitor.saved",messageId:o,publicMessageId:c.publicMessageId,acceptanceStatus:c.acceptanceStatus,submittedAt:c.submittedAt,awaitingAi:c.status==="processing"},this.config)}else this.state=w(this.state,{type:"visitor.mocked",messageId:o},this.config);if(c.status==="processing")this.startHistoryPolling(c.pollAfterMs);else if(c.status==="replied"){if(!c.replyText)throw new Error("Widget replied response is missing reply text");this.state=w(this.state,{type:"assistant.replied",text:c.replyText,publicMessageId:c.source==="server"?c.replyPublicMessageId:void 0,disclosureText:c.source==="server"?c.disclosureText:void 0},this.config)}else{const d=c.status==="disabled"?"disabled":"fallback";this.state=w(this.state,{type:"system.message",text:c.systemText||this.config.fallbackMessage,status:d},this.config),E(this,"fallback-shown",this.config,{status:d,reason:c.status==="fallback"&&"reason"in c?c.reason??"":""})}E(this,"response-received",this.config,{status:c.status,acceptanceStatus:c.source==="server"?c.acceptanceStatus:"mock",reason:c.status==="fallback"&&"reason"in c?c.reason??"":""}),this.requestUpdate()}catch(a){if(a instanceof DOMException&&a.name==="AbortError"&&i.signal.aborted||!l())return;this.state=w(this.state,{type:"submit.failed",text:this.config.errorMessage,messageId:o},this.config),E(this,"error",this.config,{errorMessage:a instanceof Error?a.message:String(a)}),this.requestUpdate()}finally{this.abortController===i&&(this.abortController=void 0)}}invalidateActiveWork(e){this.operationEpoch+=1;const t=this.abortController;this.abortController=void 0,t?.abort(),this.historyEpoch+=1;const i=this.historyAbortController;this.historyAbortController=void 0,i?.abort(),e&&this.state.pending&&this.state.submitting&&(this.state=w(this.state,{type:"submit.failed",text:this.config.errorMessage,messageId:this.state.pending.messageId},this.config))}startHistoryPolling(e){if(!this.publicSessionId||this.config.mock||!this.isConnected)return;this.historyAbortController?.abort();const t=new AbortController,i=++this.historyEpoch;this.historyAbortController=t,this.pollHistory(i,t,e)}async pollHistory(e,t,i){let o=Math.max(0,i),r=0;for(;e===this.historyEpoch&&this.historyAbortController===t&&!t.signal.aborted&&this.isConnected;)try{o>0&&await fo(o,t.signal);const n=await Di(this.config,this.publicSessionId,t.signal);if(n.publicSessionId!==this.publicSessionId)throw new Error("Invalid site_widget.history.v2 response: public_session_id_mismatch");r=0;const l=n.pollAfterMs!==void 0||n.messages.some(a=>a.automation?.status==="pending"||a.automation?.status==="processing"||a.automation?.status==="retrying");if(this.state=w(this.state,{type:"history.synced",messages:n.messages,awaitingAi:l,conversationState:n.conversationState},this.config),!l){const a=[...n.messages].reverse().find(c=>c.automation&&(c.automation.status==="degraded"||c.automation.status==="failed"||c.automation.status==="blocked"));a?.automation?.status==="blocked"?this.state=w(this.state,{type:"system.message",text:this.config.disabledMessage,status:"disabled"},this.config):a&&(this.state=w(this.state,{type:"system.message",text:this.config.fallbackMessage,status:"fallback"},this.config))}if(this.requestUpdate(),!l)break;o=n.pollAfterMs??700}catch(n){if(t.signal.aborted||e!==this.historyEpoch)return;if(n instanceof Error&&n.message.includes("HTTP 404")){this.sessionStore?.clearPublicSessionId(),this.publicSessionId="",this.state=w(this.state,{type:"session.cleared"},this.config),this.requestUpdate();break}r+=1,o=Math.min(500*2**Math.min(r,3),4e3),r===1&&E(this,"error",this.config,{errorMessage:n instanceof Error?n.message:String(n)})}this.historyAbortController===t&&(this.historyAbortController=void 0)}buildContact(){const e=this.state.contactPhone.trim();return e?{phone:e,preferred_contact:"phone"}:void 0}isPhotoPreviewEnabled(){return this.config.mock&&this.config.attachmentsEnabled&&this.config.showAttachmentSlot}autoGrowTextarea(){const e=this.renderRoot.querySelector(".textarea");e&&(e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,118)}px`)}async focusInputSoon(){await this.updateComplete,this.renderRoot.querySelector(".textarea")?.focus()}async focusLauncherSoon(){await this.updateComplete,this.renderRoot.querySelector(".launcher")?.focus()}};je.styles=[Wi,ji];let Fe=je;function fo(s,e){return e.aborted?Promise.reject(new DOMException("Aborted","AbortError")):new Promise((t,i)=>{const o=globalThis.setTimeout(n,Math.max(0,s)),r=()=>{globalThis.clearTimeout(o),e.removeEventListener("abort",r),i(new DOMException("Aborted","AbortError"))};function n(){e.removeEventListener("abort",r),t()}e.addEventListener("abort",r,{once:!0})})}function _e(s=we){typeof window>"u"||!window.customElements||window.customElements.get(s)||window.customElements.define(s,Fe)}function qt(s={}){if(typeof document>"u")throw new Error("mountSiteWidget requires a browser document");_e();const e=document.createElement(we);Gt(e,s);const t=s.target??document.body;if(!t)throw new Error("mountSiteWidget target was not found");return t.appendChild(e),e}return _e(),typeof window<"u"&&(window.GranitSiteWidget={define:_e,mount:qt,tagName:we}),K.SITE_WIDGET_TAG_NAME=we,K.defineSiteWidget=_e,K.mountSiteWidget=qt,Object.defineProperty(K,Symbol.toStringTag,{value:"Module"}),K})({});
//# sourceMappingURL=site-widget.iife.js.map

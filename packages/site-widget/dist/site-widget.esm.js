const Wt = [
  { label: "Нужен расчет", text: "Нужен расчет памятника с установкой" },
  { label: "Есть вопрос", text: "Здравствуйте, у меня есть вопрос по заказу" },
  { label: "Хочу каталог", text: "Хочу посмотреть каталог памятников" }
], Vt = [
  { type: "call", label: "Позвонить", href: "tel:", icon: "phone" },
  { type: "open", label: "Написать", icon: "message" },
  { type: "prefill", label: "Расчет", text: "Нужен расчет памятника", icon: "calculator" }
], Gt = 15e3, Yt = 5e3, Qt = Gt + Yt, Zt = Qt + 1, Jt = 25e3, F = {
  apiBaseUrl: "",
  messagesPath: "/public/intake/site-widget/messages",
  timeoutMs: Jt,
  widgetInstanceId: "default",
  conversationScopeId: "",
  legacyConversationScopeIds: [],
  theme: "memorial-soft",
  position: "bottom-right",
  panelSize: "normal",
  mock: !1,
  initialState: "closed",
  persistOpenState: !1,
  storage: "local",
  quickReplySubmit: "prefill",
  showQuickActions: !0,
  showMobileActions: !0,
  showAttachmentSlot: !0,
  attachmentsEnabled: !1,
  collectPhoneAfterFirstMessage: !1,
  includeMessageTextInEvents: !1,
  maxMessageLength: 1e3,
  launcherLabel: "Написать",
  headerTitle: "Поможем с заказом",
  headerStatus: "Онлайн",
  headerResponseTime: "обычно отвечаем за 2 минуты",
  introMessage: `Здравствуйте!
Подскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.`,
  placeholder: "Напишите сообщение...",
  disclosureText: "Автоответ. Менеджер проверит детали и подтвердит условия.",
  footerNote: "Расчет бесплатный. Точную стоимость подтвердит менеджер после уточнения деталей.",
  phoneCaptureLabel: "Добавить телефон для ответа",
  phoneSavedLabel: "Телефон добавлен",
  phonePlaceholder: "+7 999 000-00-00",
  fallbackMessage: "Сообщение принято. Менеджер ответит после уточнения деталей.",
  disabledMessage: "Сообщение принято. Менеджер проверит детали и ответит вам.",
  errorMessage: "Не удалось отправить сообщение. Проверьте соединение и попробуйте еще раз.",
  retryLabel: "Повторить",
  sendLabel: "Отправить",
  attachLabel: "Добавить фото",
  resizeLabel: "Изменить размер виджета",
  closeLabel: "Закрыть виджет",
  minimizeLabel: "Свернуть виджет",
  phoneHref: void 0,
  privacyUrl: void 0,
  quickReplies: Wt,
  mobileActions: Vt
}, It = {
  "api-base-url": "apiBaseUrl",
  "messages-path": "messagesPath",
  "timeout-ms": "timeoutMs",
  "widget-instance-id": "widgetInstanceId",
  "conversation-scope-id": "conversationScopeId",
  theme: "theme",
  position: "position",
  "panel-size": "panelSize",
  mock: "mock",
  "initial-state": "initialState",
  "persist-open-state": "persistOpenState",
  storage: "storage",
  "quick-reply-submit": "quickReplySubmit",
  "show-quick-actions": "showQuickActions",
  "show-mobile-actions": "showMobileActions",
  "show-attachment-slot": "showAttachmentSlot",
  "attachments-enabled": "attachmentsEnabled",
  "collect-phone-after-first-message": "collectPhoneAfterFirstMessage",
  "include-message-text-in-events": "includeMessageTextInEvents",
  "max-message-length": "maxMessageLength",
  "launcher-label": "launcherLabel",
  "header-title": "headerTitle",
  "header-status": "headerStatus",
  "header-response-time": "headerResponseTime",
  "intro-message": "introMessage",
  placeholder: "placeholder",
  "input-placeholder": "placeholder",
  "disclosure-text": "disclosureText",
  "footer-note": "footerNote",
  "phone-capture-label": "phoneCaptureLabel",
  "phone-saved-label": "phoneSavedLabel",
  "phone-placeholder": "phonePlaceholder",
  "fallback-message": "fallbackMessage",
  "disabled-message": "disabledMessage",
  "error-message": "errorMessage",
  "retry-label": "retryLabel",
  "send-label": "sendLabel",
  "attach-label": "attachLabel",
  "resize-label": "resizeLabel",
  "close-label": "closeLabel",
  "minimize-label": "minimizeLabel",
  "phone-href": "phoneHref",
  "privacy-url": "privacyUrl"
}, Xt = [
  ...Object.keys(It),
  "config",
  "quick-replies",
  "mobile-actions",
  "legacy-conversation-scope-ids",
  "open"
], es = /* @__PURE__ */ new Set([
  "mock",
  "persistOpenState",
  "showQuickActions",
  "showMobileActions",
  "showAttachmentSlot",
  "attachmentsEnabled",
  "collectPhoneAfterFirstMessage",
  "includeMessageTextInEvents"
]), ts = /* @__PURE__ */ new Set(["timeoutMs", "maxMessageLength"]);
function qe(t = {}) {
  const e = { ...F, ...t }, s = He(e.timeoutMs), i = kt(e.maxMessageLength, F.maxMessageLength, 1e4), o = _(e.widgetInstanceId) || F.widgetInstanceId, n = _(e.conversationScopeId) || o;
  return {
    ...e,
    apiBaseUrl: ms(_(e.apiBaseUrl)),
    messagesPath: ps(e.messagesPath),
    timeoutMs: s,
    widgetInstanceId: o,
    conversationScopeId: n,
    legacyConversationScopeIds: ns(e.legacyConversationScopeIds, n),
    theme: _(e.theme) || F.theme,
    position: cs(e.position),
    panelSize: ls(e.panelSize),
    mock: !!e.mock,
    initialState: ds(e.initialState),
    persistOpenState: !!e.persistOpenState,
    storage: hs(e.storage),
    quickReplySubmit: us(e.quickReplySubmit),
    showQuickActions: !!e.showQuickActions,
    showMobileActions: !!e.showMobileActions,
    showAttachmentSlot: !!e.showAttachmentSlot,
    attachmentsEnabled: !!e.attachmentsEnabled,
    collectPhoneAfterFirstMessage: !!e.collectPhoneAfterFirstMessage,
    includeMessageTextInEvents: !!e.includeMessageTextInEvents,
    maxMessageLength: i,
    phoneHref: j(e.phoneHref),
    privacyUrl: j(e.privacyUrl),
    quickReplies: Ce(e.quickReplies),
    mobileActions: Pe(e.mobileActions, e.phoneHref)
  };
}
function He(t) {
  const e = kt(t, F.timeoutMs, 6e4);
  return Math.max(e, Zt);
}
function Ze(t) {
  const e = {
    ...rs(t),
    ...Mt(t.getAttribute("config"))
  };
  for (const [s, i] of Object.entries(It)) {
    if (!t.hasAttribute(s)) continue;
    const o = t.getAttribute(s);
    o != null && (es.has(i) ? e[i] = as(o) : ts.has(i) ? e[i] = Number(o) : e[i] = o);
  }
  return t.hasAttribute("quick-replies") && (e.quickReplies = is(t.getAttribute("quick-replies") ?? "")), t.hasAttribute("mobile-actions") && (e.mobileActions = os(t.getAttribute("mobile-actions") ?? "")), t.hasAttribute("legacy-conversation-scope-ids") && (e.legacyConversationScopeIds = Et(
    t.getAttribute("legacy-conversation-scope-ids") ?? ""
  )), qe(e);
}
function ss(t, e = {}) {
  const s = qe(e);
  g(t, "api-base-url", s.apiBaseUrl), g(t, "messages-path", s.messagesPath), g(t, "timeout-ms", String(s.timeoutMs)), g(t, "widget-instance-id", s.widgetInstanceId), g(t, "conversation-scope-id", s.conversationScopeId), g(t, "legacy-conversation-scope-ids", s.legacyConversationScopeIds.join(",")), g(t, "theme", s.theme), g(t, "position", s.position), g(t, "panel-size", s.panelSize), g(t, "initial-state", s.initialState), g(t, "storage", s.storage), g(t, "quick-reply-submit", s.quickReplySubmit), g(t, "launcher-label", s.launcherLabel), g(t, "header-title", s.headerTitle), g(t, "header-status", s.headerStatus), g(t, "header-response-time", s.headerResponseTime), g(t, "intro-message", s.introMessage), g(t, "placeholder", s.placeholder), g(t, "disclosure-text", s.disclosureText), g(t, "footer-note", s.footerNote), g(t, "phone-capture-label", s.phoneCaptureLabel), g(t, "phone-saved-label", s.phoneSavedLabel), g(t, "phone-placeholder", s.phonePlaceholder), g(t, "fallback-message", s.fallbackMessage), g(t, "disabled-message", s.disabledMessage), g(t, "error-message", s.errorMessage), g(t, "retry-label", s.retryLabel), g(t, "send-label", s.sendLabel), g(t, "attach-label", s.attachLabel), g(t, "resize-label", s.resizeLabel), g(t, "close-label", s.closeLabel), g(t, "minimize-label", s.minimizeLabel), g(t, "phone-href", s.phoneHref), g(t, "privacy-url", s.privacyUrl), g(t, "max-message-length", String(s.maxMessageLength)), Q(t, "mock", s.mock), Q(t, "persist-open-state", s.persistOpenState), g(t, "show-quick-actions", String(s.showQuickActions)), g(t, "show-mobile-actions", String(s.showMobileActions)), g(t, "show-attachment-slot", String(s.showAttachmentSlot)), Q(t, "attachments-enabled", s.attachmentsEnabled), Q(t, "collect-phone-after-first-message", s.collectPhoneAfterFirstMessage), Q(t, "include-message-text-in-events", s.includeMessageTextInEvents), (e.open || s.initialState === "open") && t.setAttribute("open", ""), s.quickReplies.length > 0 && t.setAttribute("quick-replies", JSON.stringify(s.quickReplies)), s.mobileActions.length > 0 && t.setAttribute("mobile-actions", JSON.stringify(s.mobileActions));
  for (const [i, o] of Object.entries(e.attributes ?? {}))
    t.setAttribute(i, o);
}
function is(t) {
  const e = t.trim();
  if (!e) return [];
  const s = Ne(e);
  return Array.isArray(s) ? Ce(s) : Ce(
    e.split("|").map((i) => ({ label: i.trim(), text: i.trim() })).filter((i) => i.label)
  );
}
function os(t) {
  const e = t.trim();
  if (!e) return [];
  const s = Ne(e);
  return Array.isArray(s) ? Pe(s) : Pe(
    e.split("|").map((i) => ({ type: "open", label: i.trim() })).filter((i) => i.label)
  );
}
function Et(t) {
  return t.split(",").map(_).filter(Boolean);
}
function ns(t, e) {
  const s = Array.isArray(t) ? t : typeof t == "string" ? Et(t) : [], i = [], o = /* @__PURE__ */ new Set([e]);
  for (const n of s) {
    const r = _(n);
    !r || o.has(r) || (o.add(r), i.push(r));
  }
  return i;
}
function Ce(t = []) {
  return t.map((e) => {
    const s = _(e?.label), i = _(e?.text ?? e?.value ?? e?.label);
    return { label: s, text: i };
  }).filter((e) => e.label.length > 0 && e.text.length > 0).slice(0, 6);
}
function Pe(t = [], e) {
  return t.map((s) => {
    const i = _(s?.label);
    if (i) {
      if (s.type === "call") {
        const o = _(s.href || e || "tel:");
        return { type: "call", label: i, href: o, icon: j(s.icon) };
      }
      if (s.type === "link") {
        const o = _(s.href);
        return o ? {
          type: "link",
          label: i,
          href: o,
          target: s.target === "_self" ? "_self" : "_blank",
          icon: j(s.icon)
        } : void 0;
      }
      if (s.type === "prefill") {
        const o = _(s.text);
        return o ? { type: "prefill", label: i, text: o, icon: j(s.icon) } : void 0;
      }
      return { type: "open", label: i, icon: j(s.icon) };
    }
  }).filter((s) => !!s).slice(0, 4);
}
function rs(t) {
  const e = t.querySelector?.('script[type="application/json"][data-site-widget-config]');
  return e?.textContent ? Mt(e.textContent) : {};
}
function Mt(t) {
  if (!t?.trim()) return {};
  const e = Ne(t);
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function g(t, e, s) {
  s && s.length > 0 && t.setAttribute(e, s);
}
function Q(t, e, s) {
  s ? t.setAttribute(e, "true") : t.removeAttribute(e);
}
function as(t) {
  const e = t.trim().toLowerCase();
  return e === "" || e === "1" || e === "true" || e === "yes";
}
function cs(t) {
  const e = _(t);
  return e === "bottom-left" || e === "inline" ? e : "bottom-right";
}
function ls(t) {
  const e = _(t);
  return e === "wide" || e === "fullscreen" ? e : "normal";
}
function ds(t) {
  return _(t) === "open" ? "open" : "closed";
}
function hs(t) {
  return _(t) === "memory" ? "memory" : "local";
}
function us(t) {
  return _(t) === "auto" ? "auto" : "prefill";
}
function ps(t) {
  const e = _(t);
  return e ? e.startsWith("/") ? e : `/${e}` : F.messagesPath;
}
function kt(t, e, s) {
  const i = Number(t);
  return !Number.isInteger(i) || i <= 0 ? e : Math.min(i, s);
}
function ms(t) {
  return t.replace(/\/+$/, "");
}
function j(t) {
  return _(t) || void 0;
}
function _(t) {
  return String(t ?? "").trim();
}
function Ne(t) {
  try {
    return JSON.parse(t);
  } catch {
    return;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, Fe = fe.ShadowRoot && (fe.ShadyCSS === void 0 || fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, je = Symbol(), Je = /* @__PURE__ */ new WeakMap();
let Tt = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== je) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (Fe && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = Je.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Je.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gs = (t) => new Tt(typeof t == "string" ? t : t + "", void 0, je), Ct = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new Tt(s, t, je);
}, fs = (t, e) => {
  if (Fe) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), o = fe.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, t.appendChild(i);
  }
}, Xe = Fe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return gs(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bs, defineProperty: vs, getOwnPropertyDescriptor: ws, getOwnPropertyNames: ys, getOwnPropertySymbols: _s, getPrototypeOf: xs } = Object, xe = globalThis, et = xe.trustedTypes, Ss = et ? et.emptyScript : "", As = xe.reactiveElementPolyfillSupport, ee = (t, e) => t, Re = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ss : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Pt = (t, e) => !bs(t, e), tt = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: Pt };
Symbol.metadata ??= Symbol("metadata"), xe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = tt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, s);
      o !== void 0 && vs(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: o, set: n } = ws(this.prototype, e) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const c = o?.call(this);
      n?.call(this, r), this.requestUpdate(e, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = xs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const s = this.properties, i = [...ys(s), ..._s(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) s.unshift(Xe(o));
    } else e !== void 0 && s.push(Xe(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return fs(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$ET(e, s) {
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Re).toAttribute(s, i.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, s) {
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Re;
      this._$Em = o;
      const c = r.fromAttribute(s, n.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, s, i, o = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? Pt)(n, s) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? s ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (s = void 0), this._$AL.set(e, s)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: r } = n, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, n, c);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[ee("elementProperties")] = /* @__PURE__ */ new Map(), N[ee("finalized")] = /* @__PURE__ */ new Map(), As?.({ ReactiveElement: N }), (xe.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, st = (t) => t, ve = Ke.trustedTypes, it = ve ? ve.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Rt = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, zt = "?" + P, $s = `<${zt}>`, B = document, ae = () => B.createComment(""), ce = (t) => t === null || typeof t != "object" && typeof t != "function", We = Array.isArray, Is = (t) => We(t) || typeof t?.[Symbol.iterator] == "function", Ie = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, nt = />/g, R = RegExp(`>|${Ie}(?:([^\\s"'>=/]+)(${Ie}*=${Ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, at = /"/g, Lt = /^(?:script|style|textarea|title)$/i, Ut = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), f = Ut(1), A = Ut(2), D = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), O = B.createTreeWalker(B, 129);
function Ot(t, e) {
  if (!We(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(e) : e;
}
const Es = (t, e) => {
  const s = t.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = Z;
  for (let c = 0; c < s; c++) {
    const a = t[c];
    let l, h, u = -1, d = 0;
    for (; d < a.length && (r.lastIndex = d, h = r.exec(a), h !== null); ) d = r.lastIndex, r === Z ? h[1] === "!--" ? r = ot : h[1] !== void 0 ? r = nt : h[2] !== void 0 ? (Lt.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = R) : h[3] !== void 0 && (r = R) : r === R ? h[0] === ">" ? (r = o ?? Z, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? R : h[3] === '"' ? at : rt) : r === at || r === rt ? r = R : r === ot || r === nt ? r = Z : (r = R, o = void 0);
    const m = r === R && t[c + 1].startsWith("/>") ? " " : "";
    n += r === Z ? a + $s : u >= 0 ? (i.push(l), a.slice(0, u) + Rt + a.slice(u) + P + m) : a + P + (u === -2 ? c : m);
  }
  return [Ot(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class le {
  constructor({ strings: e, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = e.length - 1, a = this.parts, [l, h] = Es(e, s);
    if (this.el = le.createElement(l, i), O.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = O.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Rt)) {
          const d = h[r++], m = o.getAttribute(u).split(P), v = /([.?@])?(.*)/.exec(d);
          a.push({ type: 1, index: n, name: v[2], strings: m, ctor: v[1] === "." ? ks : v[1] === "?" ? Ts : v[1] === "@" ? Cs : Se }), o.removeAttribute(u);
        } else u.startsWith(P) && (a.push({ type: 6, index: n }), o.removeAttribute(u));
        if (Lt.test(o.tagName)) {
          const u = o.textContent.split(P), d = u.length - 1;
          if (d > 0) {
            o.textContent = ve ? ve.emptyScript : "";
            for (let m = 0; m < d; m++) o.append(u[m], ae()), O.nextNode(), a.push({ type: 2, index: ++n });
            o.append(u[d], ae());
          }
        }
      } else if (o.nodeType === 8) if (o.data === zt) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(P, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += P.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const i = B.createElement("template");
    return i.innerHTML = e, i;
  }
}
function G(t, e, s = t, i) {
  if (e === D) return e;
  let o = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = ce(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = o : s._$Cl = o), o !== void 0 && (e = G(t, o._$AS(t, e.values), o, i)), e;
}
class Ms {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: i } = this._$AD, o = (e?.creationScope ?? B).importNode(s, !0);
    O.currentNode = o;
    let n = O.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new Y(n, n.nextSibling, this, e) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (l = new Ps(n, this, e)), this._$AV.push(l), a = i[++c];
      }
      r !== a?.index && (n = O.nextNode(), r++);
    }
    return O.currentNode = B, o;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
}
class Y {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, s, i, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && e?.nodeType === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = G(this, e, s), ce(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== D && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Is(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: s, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = le.createElement(Ot(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(s);
    else {
      const n = new Ms(o, this), r = n.u(this.options);
      n.p(s), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let s = ct.get(e.strings);
    return s === void 0 && ct.set(e.strings, s = new le(e)), s;
  }
  k(e) {
    We(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of e) o === s.length ? s.push(i = new Y(this.O(ae()), this.O(ae()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); e !== this._$AB; ) {
      const i = st(e).nextSibling;
      st(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Se {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, o, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = G(this, e, s, 0), r = !ce(e) || e !== this._$AH && e !== D, r && (this._$AH = e);
    else {
      const c = e;
      let a, l;
      for (e = n[0], a = 0; a < n.length - 1; a++) l = G(this, c[i + a], s, a), l === D && (l = this._$AH[a]), r ||= !ce(l) || l !== this._$AH[a], l === p ? e = p : e !== p && (e += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ks extends Se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Ts extends Se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Cs extends Se {
  constructor(e, s, i, o, n) {
    super(e, s, i, o, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = G(this, e, s, 0) ?? p) === D) return;
    const i = this._$AH, o = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== p && (i === p || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ps {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    G(this, e);
  }
}
const Rs = { I: Y }, zs = Ke.litHtmlPolyfillSupport;
zs?.(le, Y), (Ke.litHtmlVersions ??= []).push("3.3.3");
const Ls = (t, e, s) => {
  const i = s?.renderBefore ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = o = new Y(e.insertBefore(ae(), n), n, void 0, s ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis;
let te = class extends N {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ls(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return D;
  }
};
te._$litElement$ = !0, te.finalized = !0, Ve.litElementHydrateSupport?.({ LitElement: te });
const Us = Ve.litElementPolyfillSupport;
Us?.({ LitElement: te });
(Ve.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Os = { CHILD: 2 }, Bt = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Dt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, i) {
    this._$Ct = e, this._$AM = s, this._$Ci = i;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Bs } = Rs, lt = (t) => t, dt = () => document.createComment(""), J = (t, e, s) => {
  const i = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (s === void 0) {
    const n = i.insertBefore(dt(), o), r = i.insertBefore(dt(), o);
    s = new Bs(n, r, t, t.options);
  } else {
    const n = s._$AB.nextSibling, r = s._$AM, c = r !== t;
    if (c) {
      let a;
      s._$AQ?.(t), s._$AM = t, s._$AP !== void 0 && (a = t._$AU) !== r._$AU && s._$AP(a);
    }
    if (n !== o || c) {
      let a = s._$AA;
      for (; a !== n; ) {
        const l = lt(a).nextSibling;
        lt(i).insertBefore(a, o), a = l;
      }
    }
  }
  return s;
}, z = (t, e, s = t) => (t._$AI(e, s), t), Ds = {}, qt = (t, e = Ds) => t._$AH = e, qs = (t) => t._$AH, Ee = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (t, e, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = e; o <= s; o++) i.set(t[o], o);
  return i;
}, Hs = Bt(class extends Dt {
  constructor(t) {
    if (super(t), t.type !== Os.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, s) {
    let i;
    s === void 0 ? s = e : e !== void 0 && (i = e);
    const o = [], n = [];
    let r = 0;
    for (const c of t) o[r] = i ? i(c, r) : r, n[r] = s(c, r), r++;
    return { values: n, keys: o };
  }
  render(t, e, s) {
    return this.dt(t, e, s).values;
  }
  update(t, [e, s, i]) {
    const o = qs(t), { values: n, keys: r } = this.dt(e, s, i);
    if (!Array.isArray(o)) return this.ut = r, n;
    const c = this.ut ??= [], a = [];
    let l, h, u = 0, d = o.length - 1, m = 0, v = n.length - 1;
    for (; u <= d && m <= v; ) if (o[u] === null) u++;
    else if (o[d] === null) d--;
    else if (c[u] === r[m]) a[m] = z(o[u], n[m]), u++, m++;
    else if (c[d] === r[v]) a[v] = z(o[d], n[v]), d--, v--;
    else if (c[u] === r[v]) a[v] = z(o[u], n[v]), J(t, a[v + 1], o[u]), u++, v--;
    else if (c[d] === r[m]) a[m] = z(o[d], n[m]), J(t, o[u], o[d]), d--, m++;
    else if (l === void 0 && (l = ht(r, m, v), h = ht(c, u, d)), l.has(c[u])) if (l.has(c[d])) {
      const S = h.get(r[m]), q = S !== void 0 ? o[S] : null;
      if (q === null) {
        const de = J(t, o[u]);
        z(de, n[m]), a[m] = de;
      } else a[m] = z(q, n[m]), J(t, o[u], q), o[S] = null;
      m++;
    } else Ee(o[d]), d--;
    else Ee(o[u]), u++;
    for (; m <= v; ) {
      const S = J(t, a[v + 1]);
      z(S, n[m]), a[m++] = S;
    }
    for (; u <= d; ) {
      const S = o[u++];
      S !== null && Ee(S);
    }
    return this.ut = r, qt(t, a), D;
  }
});
function se(t = "id") {
  return `${t}_${Ht()}`;
}
function Ns(t) {
  return `site-widget:${Date.now()}:${Ht()}`;
}
function Fs(t) {
  let e = 2166136261;
  for (let s = 0; s < t.length; s += 1)
    e ^= t.charCodeAt(s), e = Math.imul(e, 16777619);
  return `h${(e >>> 0).toString(16).padStart(8, "0")}`;
}
function Ht() {
  const t = globalThis.crypto;
  if (t && typeof t.randomUUID == "function")
    return t.randomUUID().replaceAll("-", "");
  const e = new Uint8Array(16);
  return t && typeof t.getRandomValues == "function" ? (t.getRandomValues(e), Array.from(e, (s) => s.toString(16).padStart(2, "0")).join("")) : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
const ut = 3, pt = 5 * 1024 * 1024, mt = 15 * 1024 * 1024, gt = 24e6, js = [255, 216, 255], Ks = [137, 80, 78, 71, 13, 10, 26, 10], Ws = [82, 73, 70, 70], Vs = [87, 69, 66, 80];
function Gs(t) {
  if (pe(t, js)) return "image/jpeg";
  if (pe(t, Ks)) return "image/png";
  if (pe(t, Ws) && pe(t, Vs, 8)) return "image/webp";
}
function Ys(t, e) {
  if (!e) return !1;
  const s = String(t ?? "").trim().toLowerCase();
  return s === "" || s === e;
}
function Qs(t, e) {
  if (!Number.isSafeInteger(t.sizeBytes) || t.sizeBytes < 0)
    return { code: "invalid_image_size", actualBytes: t.sizeBytes };
  const s = e.length + 1;
  if (s > ut)
    return { code: "too_many_images", maxCount: ut, actualCount: s };
  if (t.sizeBytes > pt)
    return { code: "image_too_large", maxBytes: pt, actualBytes: t.sizeBytes };
  const i = e.reduce((o, n) => o + n.sizeBytes, t.sizeBytes);
  if (i > mt)
    return { code: "total_too_large", maxBytes: mt, actualBytes: i };
}
function Zs(t, e) {
  if (!Number.isSafeInteger(t) || !Number.isSafeInteger(e) || t <= 0 || e <= 0)
    return { code: "invalid_image_dimensions", width: t, height: e };
  const s = t * e;
  if (!Number.isSafeInteger(s) || s > gt)
    return { code: "too_many_pixels", maxPixels: gt, actualPixels: s };
}
function Js(t) {
  if (t.length === 0) return "";
  const e = [...new Set(t.map(({ error: i }) => Xs(i)))];
  return `${t.length === 1 ? "Фото не добавлено" : "Некоторые фото не добавлены"}: ${e.join("; ")}.`;
}
function pe(t, e, s = 0) {
  return t.length < s + e.length ? !1 : e.every((i, o) => t[s + o] === i);
}
function Xs(t) {
  switch (t.code) {
    case "invalid_image_size":
      return "не удалось определить размер файла";
    case "too_many_images":
      return `можно добавить не более ${t.maxCount} фото`;
    case "image_too_large":
      return `размер одного фото превышает ${ft(t.maxBytes)} МБ`;
    case "total_too_large":
      return `общий размер фото превышает ${ft(t.maxBytes)} МБ`;
    case "unsupported_image_type":
      return "поддерживаются только JPEG, PNG и WebP";
    case "mime_mismatch":
      return "тип файла не совпадает с его содержимым";
    case "decode_failed":
      return "одно из изображений не удалось прочитать";
    case "invalid_image_dimensions":
      return "не удалось определить разрешение изображения";
    case "too_many_pixels":
      return "разрешение одного фото слишком большое";
  }
}
function ft(t) {
  return String(t / (1024 * 1024));
}
class K extends Error {
  constructor() {
    super("Image selection is no longer current"), this.name = "StaleImageSelectionError";
  }
}
class ei {
  constructor(e) {
    this.draft = [], this.byMessageId = /* @__PURE__ */ new Map(), this.validationMessage = "", this.validationRevision = 0, this.enabled = !0, this.generation = 0, this.pendingSelections = /* @__PURE__ */ new Map(), this.inFlightPreviewUrls = /* @__PURE__ */ new Set(), this.selectionQueue = Promise.resolve(), this.host = e, e.addController(this);
  }
  hostDisconnected() {
    this.clearAll();
  }
  getDraft() {
    return this.draft;
  }
  getForMessage(e) {
    return this.byMessageId.get(e) ?? [];
  }
  getValidationMessage() {
    return this.validationMessage;
  }
  getValidationRevision() {
    return this.validationRevision;
  }
  isProcessing() {
    for (const e of this.pendingSelections.values())
      if (e === this.generation) return !0;
    return !1;
  }
  async whenIdle() {
    await this.selectionQueue.catch(() => {
    });
  }
  setEnabled(e) {
    const s = !!e;
    this.enabled !== s && (this.enabled = s, s || this.clearAll());
  }
  selectFiles(e) {
    const s = [...e], i = this.generation, o = Symbol("image-selection");
    this.pendingSelections.set(o, i), this.host.requestUpdate();
    let n = () => {
    };
    const r = new Promise((c) => {
      n = c;
    });
    return this.selectionQueue = this.selectionQueue.catch(() => {
    }).then(async () => {
      try {
        n(await this.processBatch(s, i));
      } catch {
        if (i !== this.generation || !this.enabled) {
          n({ accepted: 0, rejected: s.length, validationMessage: "" });
          return;
        }
        const c = "Фото не добавлено: одно из изображений не удалось прочитать.";
        this.validationMessage = c, this.validationRevision += 1, this.host.requestUpdate(), n({ accepted: 0, rejected: s.length, validationMessage: c });
      } finally {
        this.pendingSelections.delete(o), this.host.requestUpdate();
      }
    }), r;
  }
  removeDraft(e) {
    const s = this.draft.findIndex((n) => n.id === e);
    if (s < 0) return;
    const i = this.draft[s];
    i && this.revokePreview(i.previewUrl), this.draft = this.draft.filter((n) => n.id !== e), this.validationMessage = "";
    const o = this.draft[s]?.id ?? this.draft[s - 1]?.id;
    return this.host.requestUpdate(), o;
  }
  transferDraftToMessage(e) {
    if (this.draft.length === 0) return;
    const s = this.byMessageId.get(e) ?? [];
    this.byMessageId.set(e, [...s, ...this.draft]), this.draft = [], this.validationMessage = "", this.host.requestUpdate();
  }
  removeMessageAttachments(e) {
    const s = this.byMessageId.get(e);
    if (s) {
      for (const i of s) this.revokePreview(i.previewUrl);
      this.byMessageId.delete(e), this.host.requestUpdate();
    }
  }
  clearAll() {
    const e = this.isProcessing();
    this.generation += 1, this.pendingSelections.clear(), this.selectionQueue = Promise.resolve();
    const s = /* @__PURE__ */ new Set();
    for (const o of this.inFlightPreviewUrls) s.add(o);
    for (const o of this.draft) s.add(o.previewUrl);
    for (const o of this.byMessageId.values())
      for (const n of o) s.add(n.previewUrl);
    for (const o of s) this.revokePreview(o);
    this.inFlightPreviewUrls.clear();
    const i = e || s.size > 0 || this.draft.length > 0 || this.byMessageId.size > 0 || this.validationMessage;
    this.draft = [], this.byMessageId.clear(), this.validationMessage = "", i && this.host.requestUpdate();
  }
  async processBatch(e, s) {
    if (!this.enabled || s !== this.generation || e.length === 0)
      return { accepted: 0, rejected: 0, validationMessage: "" };
    const i = s, o = () => i === this.generation && this.enabled, n = [], r = [], c = [...this.draft];
    for (const a of e) {
      k(o);
      const l = { file: a, sizeBytes: a.size }, h = Qs(l, c);
      if (h) {
        r.push({ candidate: l, error: h });
        continue;
      }
      const u = await this.validateAndCreateAttachment(l, r, o);
      if (u) {
        if (!o()) {
          this.revokeInFlightPreview(u.previewUrl);
          break;
        }
        n.push(u), c.push(u);
      }
    }
    if (!o()) {
      for (const a of n) this.revokeInFlightPreview(a.previewUrl);
      return { accepted: 0, rejected: e.length, validationMessage: "" };
    }
    for (const a of n) this.inFlightPreviewUrls.delete(a.previewUrl);
    return this.draft = [...this.draft, ...n], this.validationMessage = Js(r), this.validationRevision += 1, this.host.requestUpdate(), {
      accepted: n.length,
      rejected: r.length,
      validationMessage: this.validationMessage
    };
  }
  async validateAndCreateAttachment(e, s, i) {
    k(i);
    let o;
    try {
      const a = await ii(e.file.slice(0, 12));
      k(i), o = Gs(new Uint8Array(a));
    } catch (a) {
      if (a instanceof K) throw a;
      s.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    if (!o) {
      s.push({ candidate: e, error: { code: "unsupported_image_type" } });
      return;
    }
    if (!Ys(e.file.type, o)) {
      s.push({
        candidate: e,
        error: {
          code: "mime_mismatch",
          declaredMime: e.file.type,
          detectedMime: o
        }
      });
      return;
    }
    let n;
    try {
      n = await ti(
        e.file,
        (a) => this.createInFlightPreview(a),
        (a) => this.revokeInFlightPreview(a),
        i
      );
    } catch (a) {
      if (a instanceof K) throw a;
      s.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    k(i);
    const r = Zs(n.width, n.height);
    if (r) {
      s.push({ candidate: e, error: r });
      return;
    }
    let c;
    try {
      if (k(i), c = this.createInFlightPreview(e.file), !i())
        throw this.revokeInFlightPreview(c), new K();
    } catch (a) {
      if (a instanceof K) throw a;
      s.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    return {
      id: se("img"),
      name: e.file.name,
      mimeType: o,
      sizeBytes: e.file.size,
      width: n.width,
      height: n.height,
      previewUrl: c,
      file: e.file
    };
  }
  revokePreview(e) {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }
  createInFlightPreview(e) {
    const s = URL.createObjectURL(e);
    return this.inFlightPreviewUrls.add(s), s;
  }
  revokeInFlightPreview(e) {
    this.inFlightPreviewUrls.delete(e) && this.revokePreview(e);
  }
}
async function ti(t, e, s, i) {
  let o;
  if (typeof createImageBitmap == "function")
    try {
      k(i);
      const r = await createImageBitmap(t);
      try {
        return k(i), { width: r.width, height: r.height };
      } finally {
        r.close();
      }
    } catch (r) {
      if (r instanceof K) throw r;
      o = r;
    }
  if (k(i), typeof Image > "u" || typeof URL.createObjectURL != "function")
    throw o instanceof Error ? o : new Error("No browser image decoder is available");
  k(i);
  const n = e(t);
  try {
    k(i);
    const r = new Image();
    return r.decoding = "async", r.src = n, typeof r.decode == "function" ? await r.decode() : await si(r), k(i), { width: r.naturalWidth, height: r.naturalHeight };
  } finally {
    s(n);
  }
}
function k(t) {
  if (!t()) throw new K();
}
function si(t) {
  return new Promise((e, s) => {
    t.addEventListener("load", () => e(), { once: !0 }), t.addEventListener("error", () => s(new Error("Image decode failed")), { once: !0 });
  });
}
async function ii(t) {
  return typeof t.arrayBuffer == "function" ? t.arrayBuffer() : new Promise((e, s) => {
    const i = new FileReader();
    i.addEventListener("load", () => {
      i.result instanceof ArrayBuffer ? e(i.result) : s(new Error("Blob read returned no ArrayBuffer"));
    }), i.addEventListener("error", () => s(i.error ?? new Error("Blob read failed"))), i.readAsArrayBuffer(t);
  });
}
const Me = 8, ke = 40, bt = 180, L = 0.5, oi = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", " ", "Spacebar"]);
class ni {
  constructor(e) {
    this.items = [], this.mode = "following-bottom", this.snapshot = {
      mode: "following-bottom",
      canScrollStart: !1,
      canScrollEnd: !1,
      newItemCount: 0
    }, this.newItemCount = 0, this.hasInitialPlacement = !1, this.observedRows = /* @__PURE__ */ new Set(), this.programmaticScroll = !1, this.pointerActive = !1, this.handleWheel = () => this.releaseForUser(), this.handleTouchMove = () => this.releaseForUser(), this.handleKeydown = (s) => {
      if (!oi.has(s.key)) return;
      const i = s.target;
      i instanceof HTMLElement && i !== this.viewport && this.isInteractive(i) || this.releaseForUser();
    }, this.handlePointerDown = (s) => {
      this.pointerActive = s.target === this.viewport;
    }, this.handlePointerUp = () => {
      this.pointerActive = !1;
    }, this.handleScroll = () => {
      this.pointerActive && !this.programmaticScroll && this.releaseForUser();
      const s = this.viewport;
      s && !this.programmaticScroll && this.mode === "free-scrolling" && this.distanceToEnd(s) <= Me && (this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0, this.mode = "following-bottom", this.commitModeAttribute()), this.updateSnapshot();
    }, this.handleWindowResize = () => this.scheduleCommit(), this.host = e, e.addController(this);
  }
  hostUpdate() {
    this.hasLayout() && (this.pendingLayoutAnchor = this.captureFirstVisible());
  }
  hostDisconnected() {
    this.disconnect();
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  connect({ root: e, viewport: s, content: i, tailSpacer: o }) {
    if (this.viewport === s && this.content === i && this.tailSpacer === o) {
      this.root = e, this.commitModeAttribute();
      return;
    }
    this.detachElements(), this.root = e, this.viewport = s, this.content = i, this.tailSpacer = o, s.addEventListener("scroll", this.handleScroll, { passive: !0 }), s.addEventListener("wheel", this.handleWheel, { passive: !0 }), s.addEventListener("touchmove", this.handleTouchMove, { passive: !0 }), s.addEventListener("keydown", this.handleKeydown), s.addEventListener("pointerdown", this.handlePointerDown), s.addEventListener("pointerup", this.handlePointerUp), s.addEventListener("pointercancel", this.handlePointerUp), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.scheduleCommit()), this.resizeObserver.observe(s), this.resizeObserver.observe(i), this.reconcileObservedRows()) : typeof window < "u" && window.addEventListener("resize", this.handleWindowResize), this.commitModeAttribute(), this.scheduleCommit();
  }
  reconcile(e) {
    const s = e.map((n) => ({ id: n.id, scrollAnchor: !!n.scrollAnchor })), i = this.pendingReconcile?.previous ?? this.items, o = this.pendingReconcile?.layoutAnchor ?? this.pendingLayoutAnchor;
    this.pendingLayoutAnchor = void 0, this.items = s, this.pendingReconcile = o ? { previous: i, next: s, layoutAnchor: o } : { previous: i, next: s }, this.reconcileObservedRows(), this.scheduleCommit();
  }
  scrollToEnd(e = {}) {
    const s = this.viewport;
    if (!s || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0;
    const i = this.normalizeBehavior(e.behavior ?? "auto");
    return this.clearSettlingTimer(), this.mode = i === "smooth" ? "settling-jump" : "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, s.scrollHeight - s.clientHeight), i), this.updateSnapshot(), i === "smooth" && (this.settlingTimer = globalThis.setTimeout(() => {
      if (this.settlingTimer = void 0, this.mode !== "settling-jump") return;
      this.mode = "following-bottom", this.commitModeAttribute();
      const o = this.viewport;
      o && this.hasLayout() && (this.performScroll(Math.max(0, o.scrollHeight - o.clientHeight), "auto"), this.scheduleCommit()), this.updateSnapshot();
    }, bt)), !0;
  }
  scrollToMessage(e, s = {}) {
    const i = this.viewport, o = this.findRow(e);
    if (!i || !o || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "free-scrolling", this.commitModeAttribute();
    const n = i.getBoundingClientRect(), r = o.getBoundingClientRect(), c = i.scrollTop + r.top - n.top - ke;
    return this.performScroll(Math.max(0, c), this.normalizeBehavior(s.behavior ?? "auto")), this.updateSnapshot(), !0;
  }
  disconnect() {
    this.detachElements(), this.cancelFrame(), this.clearProgrammaticTimer(), this.clearSettlingTimer(), this.pendingReconcile = void 0, this.pendingLayoutAnchor = void 0, this.activeAnchorId = void 0, this.hasInitialPlacement = !1, this.pointerActive = !1, this.programmaticScroll = !1;
  }
  getSnapshot() {
    return this.snapshot;
  }
  scheduleCommit() {
    this.frameId === void 0 && (this.frameId = this.requestFrame(() => {
      this.frameId = void 0;
      const e = this.pendingReconcile;
      this.pendingReconcile = void 0, this.commitReconcile(
        e ?? {
          previous: this.items,
          next: this.items
        }
      );
    }));
  }
  commitReconcile(e) {
    const s = this.viewport;
    if (!s || !this.content || !this.tailSpacer) return;
    if (!this.hasLayout()) {
      this.updateSnapshot();
      return;
    }
    if (e.next.length > 0 && !this.hasInitialPlacement) {
      this.hasInitialPlacement = !0, this.activeAnchorId = void 0, this.setTailHeight(0), this.mode = "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, s.scrollHeight - s.clientHeight), "auto"), this.updateSnapshot();
      return;
    }
    this.isPrepend(e.previous, e.next) && e.layoutAnchor && this.restoreLayoutAnchor(e.layoutAnchor);
    const i = this.getAppendedItems(e.previous, e.next), o = [...i].reverse().find((n) => n.scrollAnchor);
    o ? this.startTurnAnchor(o.id) : i.length > 0 ? this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, s.scrollHeight - s.clientHeight), "auto") : this.activeAnchorId ? this.reconcileActiveAnchor() : this.newItemCount += i.length : this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, s.scrollHeight - s.clientHeight), "auto") : this.activeAnchorId && this.reconcileActiveAnchor(), this.updateSnapshot();
  }
  startTurnAnchor(e) {
    const s = this.viewport, i = this.findRow(e);
    if (!s || !i || !this.tailSpacer) return;
    this.activeAnchorId = e, this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "anchored-to-message", this.commitModeAttribute();
    const o = this.desiredScrollTop(i);
    this.setTailHeight(this.requiredTailHeight(o)), this.performScroll(o, "auto");
  }
  reconcileActiveAnchor() {
    const e = this.activeAnchorId ? this.findRow(this.activeAnchorId) : void 0;
    if (!e || !this.viewport) {
      this.activeAnchorId = void 0, this.setTailHeight(0);
      return;
    }
    const s = this.desiredScrollTop(e), i = this.requiredTailHeight(s);
    if (this.setTailHeight(i), this.mode === "anchored-to-message")
      if (i <= L)
        this.activeAnchorId = void 0, this.mode = "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, this.viewport.scrollHeight - this.viewport.clientHeight), "auto");
      else {
        const o = this.viewport.getBoundingClientRect(), n = e.getBoundingClientRect();
        Math.abs(n.top - o.top - ke) > L && this.performScroll(s, "auto");
      }
    else i <= L && (this.activeAnchorId = void 0);
  }
  requiredTailHeight(e) {
    const s = this.viewport, i = this.tailSpacer;
    if (!s || !i) return 0;
    const o = s.getBoundingClientRect(), n = i.getBoundingClientRect(), r = s.scrollTop + n.top - o.top;
    return Math.max(0, e + s.clientHeight - r);
  }
  desiredScrollTop(e) {
    const s = this.viewport;
    if (!s) return 0;
    const i = s.getBoundingClientRect(), o = e.getBoundingClientRect();
    return Math.max(0, s.scrollTop + o.top - i.top - ke);
  }
  restoreLayoutAnchor(e) {
    const s = this.viewport, i = this.findRow(e.id);
    if (!s || !i) return;
    const o = s.getBoundingClientRect(), r = i.getBoundingClientRect().top - o.top - e.viewportTop;
    Math.abs(r) <= L || (this.markProgrammaticScroll("auto"), s.scrollTop += r);
  }
  captureFirstVisible() {
    const e = this.viewport, s = this.content;
    if (!e || !s) return;
    const i = e.getBoundingClientRect();
    for (const o of s.querySelectorAll("[data-message-id]")) {
      const n = o.getBoundingClientRect();
      if (n.bottom > i.top + L && n.top < i.bottom - L)
        return { id: o.dataset.messageId ?? "", viewportTop: n.top - i.top };
    }
  }
  getAppendedItems(e, s) {
    if (e.length === 0) return s;
    const i = this.findSequenceStart(e, s);
    return i < 0 ? [] : s.slice(i + e.length);
  }
  isPrepend(e, s) {
    return e.length === 0 || s.length <= e.length ? !1 : this.findSequenceStart(e, s) > 0;
  }
  findSequenceStart(e, s) {
    if (e.length === 0) return 0;
    const i = s.length - e.length;
    for (let o = 0; o <= i; o += 1)
      if (e.every((n, r) => n.id === s[o + r]?.id)) return o;
    return -1;
  }
  releaseForUser() {
    this.clearProgrammaticTimer(), this.clearSettlingTimer(), this.programmaticScroll = !1, this.mode !== "free-scrolling" && (this.mode = "free-scrolling", this.commitModeAttribute(), this.updateSnapshot());
  }
  performScroll(e, s) {
    const i = this.viewport;
    if (!i) return;
    const o = Math.max(0, i.scrollHeight - i.clientHeight), n = Math.min(Math.max(0, e), o);
    this.markProgrammaticScroll(s), typeof i.scrollTo == "function" ? i.scrollTo({ top: n, behavior: s }) : i.scrollTop = n;
  }
  markProgrammaticScroll(e) {
    this.programmaticScroll = !0, this.clearProgrammaticTimer();
    const s = e === "smooth" ? bt : 0;
    this.programmaticClearTimer = globalThis.setTimeout(() => {
      this.programmaticScroll = !1, this.programmaticClearTimer = void 0, this.updateSnapshot();
    }, s);
  }
  updateSnapshot() {
    const e = this.viewport, s = e ? {
      mode: this.mode,
      canScrollStart: e.scrollTop > Me,
      canScrollEnd: this.distanceToEnd(e) > Me,
      newItemCount: this.newItemCount
    } : {
      mode: this.mode,
      canScrollStart: !1,
      canScrollEnd: !1,
      newItemCount: this.newItemCount
    };
    s.mode === this.snapshot.mode && s.canScrollStart === this.snapshot.canScrollStart && s.canScrollEnd === this.snapshot.canScrollEnd && s.newItemCount === this.snapshot.newItemCount || (this.snapshot = s, this.host.requestUpdate());
  }
  distanceToEnd(e) {
    return Math.max(0, e.scrollHeight - e.clientHeight - e.scrollTop);
  }
  setTailHeight(e) {
    const s = this.tailSpacer;
    if (!s) return;
    const i = Math.max(0, e), o = Number.parseFloat(s.style.height || "0") || 0;
    Math.abs(o - i) <= L || (s.style.height = `${i}px`);
  }
  findRow(e) {
    if (this.content)
      return [...this.content.querySelectorAll("[data-message-id]")].find(
        (s) => s.dataset.messageId === e
      );
  }
  hasLayout() {
    const e = this.viewport;
    return !!(e && e.clientHeight > 0 && e.getClientRects().length > 0);
  }
  normalizeBehavior(e) {
    return e !== "smooth" ? e : typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }
  isInteractive(e) {
    return !!e.closest("button, a, input, textarea, select, [contenteditable='true']");
  }
  reconcileObservedRows() {
    if (!this.resizeObserver || !this.content) return;
    const e = new Set(this.content.querySelectorAll("[data-message-id]"));
    for (const s of this.observedRows)
      e.has(s) || this.resizeObserver.unobserve(s);
    for (const s of e)
      this.observedRows.has(s) || this.resizeObserver.observe(s);
    this.observedRows = e;
  }
  commitModeAttribute() {
    this.root && (this.root.dataset.scrollMode = this.mode), this.viewport && (this.viewport.dataset.scrollMode = this.mode);
  }
  detachElements() {
    const e = this.viewport;
    e && (e.removeEventListener("scroll", this.handleScroll), e.removeEventListener("wheel", this.handleWheel), e.removeEventListener("touchmove", this.handleTouchMove), e.removeEventListener("keydown", this.handleKeydown), e.removeEventListener("pointerdown", this.handlePointerDown), e.removeEventListener("pointerup", this.handlePointerUp), e.removeEventListener("pointercancel", this.handlePointerUp)), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, typeof window < "u" && window.removeEventListener("resize", this.handleWindowResize), this.observedRows.clear(), this.root = void 0, this.viewport = void 0, this.content = void 0, this.tailSpacer = void 0;
  }
  clearProgrammaticTimer() {
    this.programmaticClearTimer !== void 0 && (globalThis.clearTimeout(this.programmaticClearTimer), this.programmaticClearTimer = void 0);
  }
  clearSettlingTimer() {
    this.settlingTimer !== void 0 && (globalThis.clearTimeout(this.settlingTimer), this.settlingTimer = void 0);
  }
  requestFrame(e) {
    return typeof requestAnimationFrame == "function" ? requestAnimationFrame(e) : globalThis.setTimeout(() => e(performance.now()), 0);
  }
  cancelFrame() {
    this.frameId !== void 0 && (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(this.frameId) : globalThis.clearTimeout(this.frameId), this.frameId = void 0);
  }
}
function ri(t) {
  const e = ci(t.contact), s = ai(t.environment.search), i = ie({
    channel: "site_widget",
    page_url: t.environment.href,
    widget_instance_id: t.config.widgetInstanceId,
    page_title: t.environment.title,
    referrer_url: t.environment.referrer,
    utm: s
  }), o = ie({
    locale: t.environment.locale,
    timezone: t.environment.timezone
  });
  return ie({
    schema_version: "site_widget.v2",
    event_type: "site_widget.message_submitted",
    idempotency_key: t.idempotencyKey,
    submitted_at: t.environment.now,
    public_session_id: t.publicSessionId,
    source: i,
    contact: e && Object.keys(e).length > 0 ? e : void 0,
    message: {
      role: "visitor",
      text: t.text.trim()
    },
    visitor_context: Object.keys(o).length > 0 ? o : void 0,
    consent: t.privacyPolicyAccepted ? { privacy_policy: !0 } : void 0
  });
}
function ai(t = "") {
  if (!t.trim()) return;
  const e = new URLSearchParams(t.startsWith("?") ? t.slice(1) : t), s = ie({
    source: e.get("utm_source") ?? void 0,
    medium: e.get("utm_medium") ?? void 0,
    campaign: e.get("utm_campaign") ?? void 0,
    term: e.get("utm_term") ?? void 0,
    content: e.get("utm_content") ?? void 0
  });
  return Object.keys(s).length > 0 ? s : void 0;
}
function ci(t) {
  if (t)
    return ie({
      name: me(t.name),
      phone: me(t.phone),
      email: me(t.email),
      preferred_contact: t.preferred_contact,
      city: me(t.city)
    });
}
function me(t) {
  return t?.trim() || void 0;
}
function ie(t) {
  for (const e of Object.keys(t)) {
    const s = t[e];
    (s == null || s === "" || typeof s == "object" && !Array.isArray(s) && Object.keys(s).length === 0) && delete t[e];
  }
  return t;
}
function be({
  config: t,
  open: e = !1,
  now: s = /* @__PURE__ */ new Date()
}) {
  return {
    open: e,
    status: e ? "open_idle" : "closed",
    draft: "",
    contactPhone: "",
    contactCaptureOpen: !1,
    submitting: !1,
    pending: void 0,
    awaitingAi: !1,
    conversationState: void 0,
    messages: [
      oe({
        role: "assistant",
        text: t.introMessage,
        createdAt: s.toISOString(),
        localKind: "intro"
      })
    ],
    visitorMessageCount: 0,
    unreadCount: 0
  };
}
function w(t, e, s) {
  const i = li(t);
  switch (e.type) {
    case "open":
      return {
        ...i,
        open: !0,
        unreadCount: 0,
        status: wt(i, s)
      };
    case "close":
      return { ...i, open: !1, status: "closed" };
    case "draft.changed": {
      const o = String(e.value ?? "");
      return {
        ...i,
        draft: o,
        status: i.open ? o.trim() ? "composing" : wt(i, s) : i.status
      };
    }
    case "contact.capture.toggled":
      return {
        ...i,
        contactCaptureOpen: typeof e.open == "boolean" ? e.open : !i.contactCaptureOpen
      };
    case "contact.phone.saved":
      return {
        ...i,
        contactPhone: String(e.phone ?? "").trim(),
        contactCaptureOpen: !1
      };
    case "submit.started": {
      if (i.submitting || i.pending) return i;
      const o = String(e.text ?? "").trim(), n = String(e.idempotencyKey ?? "").trim();
      if (!o || !n) return i;
      const r = oe({ role: "visitor", text: o, status: "pending" });
      return {
        ...i,
        open: !0,
        status: "submitted_waiting",
        submitting: !0,
        draft: "",
        pending: {
          messageId: r.id,
          text: o,
          idempotencyKey: n
        },
        visitorMessageCount: i.visitorMessageCount + 1,
        messages: [...i.messages, r]
      };
    }
    case "retry.started":
      return !i.pending || i.submitting ? i : {
        ...i,
        status: "submitted_waiting",
        submitting: !0,
        messages: i.messages.map(
          (o) => o.id === i.pending?.messageId ? { ...o, status: "pending" } : o
        )
      };
    case "visitor.saved":
      return !i.pending || e.messageId !== i.pending.messageId ? i : {
        ...i,
        status: e.awaitingAi ? "submitted_waiting" : "open_idle",
        submitting: !1,
        pending: void 0,
        awaitingAi: !!e.awaitingAi,
        messages: i.messages.map(
          (o) => o.id === i.pending?.messageId ? {
            ...o,
            status: "saved",
            publicMessageId: e.publicMessageId,
            acceptanceStatus: e.acceptanceStatus,
            createdAt: e.submittedAt ?? o.createdAt
          } : o
        )
      };
    case "visitor.mocked":
      return !i.pending || e.messageId !== i.pending.messageId ? i : {
        ...i,
        messages: i.messages.map(
          (o) => o.id === i.pending?.messageId ? { ...o, status: "sent" } : o
        )
      };
    case "assistant.replied": {
      const o = String(e.text ?? "").trim(), n = i.messages.some((c) => c.disclosure), r = o ? [
        ...i.messages,
        oe({
          role: "assistant",
          text: o,
          disclosure: !n,
          publicMessageId: e.publicMessageId,
          disclosureText: e.disclosureText,
          catalogReferences: e.catalogReferences,
          createdAt: e.createdAt
        })
      ] : i.messages;
      return vt(i, r, "replied");
    }
    case "history.synced":
      return di(i, e);
    case "system.message": {
      const o = String(e.text ?? "").trim(), n = i.messages.some(
        (c) => c.role === "system" && c.systemKind === e.status && c.text === o
      ), r = o && !n ? [...i.messages, oe({ role: "system", text: o, systemKind: e.status })] : i.messages;
      return vt(i, r, e.status);
    }
    case "submit.failed": {
      if (!i.pending || e.messageId && e.messageId !== i.pending.messageId) return i;
      const o = i.messages.map(
        (n) => n.id === i.pending?.messageId ? { ...n, status: "error" } : n
      );
      return {
        ...i,
        status: "error",
        submitting: !1,
        messages: o
      };
    }
    case "session.cleared":
      return s ? be({ config: s, open: i.open }) : { ...i, pending: void 0, submitting: !1, awaitingAi: !1 };
    default:
      return i;
  }
}
function we(t, e) {
  const s = t.trim();
  return s ? s.length > e.maxMessageLength ? "message_too_long" : null : "empty_message";
}
function oe({
  role: t,
  text: e,
  status: s = "sent",
  disclosure: i = !1,
  publicMessageId: o,
  acceptanceStatus: n,
  disclosureText: r,
  systemKind: c,
  catalogReferences: a,
  localKind: l,
  id: h,
  createdAt: u = (/* @__PURE__ */ new Date()).toISOString()
}) {
  return {
    id: h ?? se("msg"),
    role: t,
    text: String(e ?? ""),
    status: s,
    publicMessageId: o,
    acceptanceStatus: n,
    disclosure: i,
    disclosureText: r,
    systemKind: c,
    catalogReferences: a,
    localKind: l,
    createdAt: u
  };
}
function vt(t, e, s) {
  return {
    ...t,
    status: s,
    submitting: !1,
    pending: void 0,
    awaitingAi: !1,
    messages: e,
    unreadCount: t.open ? t.unreadCount : t.unreadCount + 1
  };
}
function wt(t, e) {
  const s = e ? we(t.draft, e) : t.draft.trim() ? null : "empty_message";
  return t.submitting || t.awaitingAi ? "submitted_waiting" : t.status === "error" ? "error" : t.status === "replied" || t.status === "fallback" || t.status === "disabled" ? t.status : t.draft.trim() && !s ? "composing" : "open_idle";
}
function li(t) {
  return {
    ...t,
    draft: String(t.draft ?? ""),
    contactPhone: String(t.contactPhone ?? ""),
    submitting: !!t.submitting,
    awaitingAi: !!t.awaitingAi,
    messages: Array.isArray(t.messages) ? t.messages : [],
    visitorMessageCount: Number.isInteger(t.visitorMessageCount) ? t.visitorMessageCount : 0,
    unreadCount: Number.isInteger(t.unreadCount) ? t.unreadCount : 0
  };
}
function di(t, e) {
  const s = t.messages.find((d) => d.localKind === "intro"), i = t.messages.filter(
    (d) => d.localKind !== "intro" && !d.publicMessageId
  ), o = new Map(
    t.messages.flatMap(
      (d) => d.publicMessageId ? [[d.publicMessageId, d]] : []
    )
  );
  let n = !1;
  const r = e.messages.map((d) => {
    const m = o.get(d.publicMessageId), v = d.senderRole !== "visitor", S = d.senderRole === "ai_assistant" && !n;
    return S && (n = !0), oe({
      id: m?.id ?? `server:${d.publicMessageId}`,
      role: v ? "assistant" : "visitor",
      text: d.text,
      status: v ? "sent" : "saved",
      publicMessageId: d.publicMessageId,
      acceptanceStatus: m?.acceptanceStatus ?? "accepted",
      disclosure: S,
      disclosureText: m?.disclosureText,
      catalogReferences: d.catalogReferences,
      createdAt: d.submittedAt
    });
  }), c = new Set(o.keys()), a = e.messages.filter(
    (d) => d.senderRole !== "visitor" && !c.has(d.publicMessageId)
  ).length, l = [...s ? [s] : [], ...r, ...i], h = e.messages.some((d) => d.senderRole !== "visitor"), u = e.awaitingAi ? "submitted_waiting" : e.conversationState === "manager_pending" || e.conversationState === "manager_active" ? "fallback" : h ? "replied" : "open_idle";
  return {
    ...t,
    status: u,
    awaitingAi: e.awaitingAi,
    conversationState: e.conversationState,
    messages: l,
    visitorMessageCount: Math.max(
      t.visitorMessageCount,
      e.messages.filter((d) => d.senderRole === "visitor").length
    ),
    unreadCount: t.open ? t.unreadCount : t.unreadCount + a
  };
}
function hi(t, e) {
  const s = we(t.draft, e), i = t.visitorMessageCount > 0;
  return {
    ...t,
    canSend: !t.submitting && !t.pending && !s,
    draftError: s,
    showQuickReplies: t.open && e.showQuickActions && e.quickReplies.length > 0 && !t.submitting && !i,
    showMobileActions: !t.open && e.showMobileActions && e.mobileActions.length > 0,
    showContactTrigger: !e.collectPhoneAfterFirstMessage || i,
    contactLabel: t.contactPhone ? e.phoneSavedLabel : e.phoneCaptureLabel,
    attachmentVisible: e.mock && e.attachmentsEnabled && e.showAttachmentSlot,
    attachmentDisabled: !1,
    status: t.status
  };
}
const yt = "granit-site-widget", _t = "granit-widget", ui = {
  opened: "open",
  closed: "close",
  "response-received": "response"
};
function M(t, e, s, i = {}) {
  const o = pi(i, s);
  ge(t, `${yt}:${e}`, o), ge(t, `${_t}:${e}`, o);
  const n = ui[e];
  n && (ge(t, `${yt}:${n}`, o), ge(t, `${_t}:${n}`, o));
}
function pi(t, e) {
  const s = {
    ...t,
    widgetInstanceId: t.widgetInstanceId ?? e.widgetInstanceId
  };
  if (typeof s.publicSessionId == "string") {
    const i = s.publicSessionId.trim();
    i && (s.publicSessionIdHash = Fs(i)), delete s.publicSessionId;
  }
  return e.includeMessageTextInEvents || (typeof s.messageText == "string" && (s.messageLength = s.messageText.length), delete s.messageText), s;
}
function ge(t, e, s) {
  t.dispatchEvent(
    new CustomEvent(e, {
      bubbles: !0,
      composed: !0,
      detail: s
    })
  );
}
function mi(t = /* @__PURE__ */ new Date()) {
  return {
    href: typeof window > "u" ? "" : window.location.href,
    search: typeof window > "u" ? "" : window.location.search,
    title: typeof document > "u" ? void 0 : document.title || void 0,
    referrer: typeof document > "u" ? void 0 : document.referrer || void 0,
    locale: typeof navigator > "u" ? void 0 : navigator.language || void 0,
    timezone: gi(),
    now: t.toISOString()
  };
}
function gi() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return;
  }
}
const fi = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function Ge(t) {
  if (typeof t != "string") return;
  const e = t.trim().toLowerCase();
  return fi.test(e) ? e : void 0;
}
function ne(t) {
  return Ge(t);
}
const ze = /* @__PURE__ */ new Set([
  "missing_openai_config",
  "model_error",
  "empty_model_response",
  "unsafe_model_response",
  "semantic_verifier_error",
  "grounding_validation_failed",
  "turn_timeout",
  "agent_reply_blocked",
  "ai_persistence_unconfirmed",
  "worker_failed",
  "handoff"
]), bi = [
  "ok",
  "schema_version",
  "status",
  "public_session_id",
  "public_message_id",
  "action",
  "automation",
  "message_to_user"
], vi = ["status", "next_step", "conversation_state", "disclosure", "reply"], wi = ["status", "next_step", "conversation_state", "reason"], yi = ["status", "next_step", "reason"], _i = ["status", "next_step"], xi = ["shown", "version", "text"], Si = ["public_message_id", "sender_role", "text"], Ai = [
  "ok",
  "schema_version",
  "status",
  "public_session_id",
  "public_conversation_id",
  "public_message_id",
  "submitted_at",
  "action",
  "automation",
  "message_to_user"
], $i = ["status", "next_step", "conversation_state", "poll_after_ms"], Ii = ["status", "next_step", "conversation_state"], Ei = ["status", "next_step", "conversation_state"], Mi = ["status", "next_step", "conversation_state", "reason"], ki = ["status", "next_step", "conversation_state", "reason"];
function Ti(t, e) {
  const s = re(t, "root");
  return s.schema_version === "site_widget.v2" ? Pi(s, t, e) : Ci(s, t, e);
}
function Ci(t, e, s) {
  E(t, bi, "root"), t.ok !== !0 && b("ok"), t.schema_version !== "site_widget.v1" && b("schema_version");
  const i = Nt(t.status);
  t.action !== "show_widget_saved" && b("action");
  const o = V(t.public_session_id, "public_session_id"), n = V(t.public_message_id, "public_message_id"), r = T(t.message_to_user, "message_to_user"), c = re(t.automation, "automation"), a = T(c.status, "automation.status"), l = {
    source: "server",
    acceptanceStatus: i,
    action: "show_widget_saved",
    publicSessionId: o,
    publicMessageId: n,
    raw: e
  };
  if (a === "replied") {
    E(c, vi, "automation"), c.next_step !== "ai_reply_shown" && b("automation.next_step"), c.conversation_state !== void 0 && U(c.conversation_state, ["ai_active", "manager_pending"]);
    const h = re(c.disclosure, "automation.disclosure");
    E(h, xi, "automation.disclosure"), h.shown !== !0 && b("automation.disclosure.shown"), Te(h.version, "automation.disclosure.version", 120);
    const u = Te(h.text, "automation.disclosure.text", 1e3), d = re(c.reply, "automation.reply");
    E(d, Si, "automation.reply");
    const m = V(d.public_message_id, "automation.reply.public_message_id");
    m === n && b("automation.reply.public_message_id_identity"), d.sender_role !== "ai_assistant" && b("automation.reply.sender_role");
    const v = Te(d.text, "automation.reply.text", 1e3);
    return {
      ...l,
      status: "replied",
      replyText: v,
      replyPublicMessageId: m,
      disclosureText: u
    };
  }
  if (a === "degraded") {
    E(c, wi, "automation"), c.next_step !== "retry_available" && b("automation.next_step"), U(c.conversation_state, ["ai_active"]);
    const h = T(c.reason, "automation.reason");
    return ze.has(h) || b("automation.reason"), {
      ...l,
      status: "fallback",
      systemText: r.trim() || s.fallbackMessage,
      reason: h
    };
  }
  if (a === "fallback") {
    E(c, yi, "automation"), c.next_step !== "manager_review" && b("automation.next_step");
    const h = T(c.reason, "automation.reason");
    return ze.has(h) || b("automation.reason"), {
      ...l,
      status: "fallback",
      systemText: r.trim() || s.fallbackMessage,
      reason: h
    };
  }
  if (a === "disabled")
    return E(c, _i, "automation"), c.next_step !== "manager_review" && b("automation.next_step"), {
      ...l,
      status: "disabled",
      systemText: r.trim() || s.disabledMessage
    };
  b("automation.status");
}
function Pi(t, e, s) {
  E(t, Ai, "root"), t.ok !== !0 && b("ok", "site_widget.v2");
  const i = Nt(t.status);
  t.action !== "show_widget_saved" && b("action", "site_widget.v2");
  const o = V(t.public_session_id, "public_session_id", "site_widget.v2"), n = V(
    t.public_conversation_id,
    "public_conversation_id",
    "site_widget.v2"
  ), r = V(t.public_message_id, "public_message_id", "site_widget.v2"), c = Ri(t.submitted_at, "submitted_at", "site_widget.v2"), a = T(t.message_to_user, "message_to_user"), l = re(t.automation, "automation"), h = T(l.status, "automation.status"), u = {
    source: "server",
    acceptanceStatus: i,
    action: "show_widget_saved",
    publicSessionId: o,
    publicConversationId: n,
    publicMessageId: r,
    submittedAt: c,
    raw: e
  };
  if (h === "processing")
    return E(l, $i, "automation"), l.next_step !== "poll_history" && b("automation.next_step", "site_widget.v2"), U(l.conversation_state, ["ai_active"]), {
      ...u,
      status: "processing",
      pollAfterMs: zi(l.poll_after_ms, "automation.poll_after_ms", 250, 5e3)
    };
  if (h === "replied")
    return E(l, Ei, "automation"), l.next_step !== "history_available" && b("automation.next_step", "site_widget.v2"), U(l.conversation_state, ["ai_active", "manager_pending"]), { ...u, status: "processing", pollAfterMs: 0 };
  if (h === "disabled")
    return E(l, Ii, "automation"), l.next_step !== "manager_review" && b("automation.next_step", "site_widget.v2"), U(l.conversation_state, ["manager_pending"]), {
      ...u,
      status: "disabled",
      systemText: a.trim() || s.disabledMessage
    };
  if (h === "degraded") {
    E(l, Mi, "automation"), l.next_step !== "retry_or_manager" && b("automation.next_step", "site_widget.v2"), U(l.conversation_state, ["ai_active"]);
    const d = xt(l.reason, "site_widget.v2");
    return {
      ...u,
      status: "fallback",
      systemText: a.trim() || s.fallbackMessage,
      reason: d
    };
  }
  if (h === "manager_pending") {
    E(l, ki, "automation"), l.next_step !== "manager_review" && b("automation.next_step", "site_widget.v2"), U(l.conversation_state, ["manager_pending", "manager_active"]);
    const d = xt(l.reason, "site_widget.v2");
    return {
      ...u,
      status: "fallback",
      systemText: a.trim() || s.fallbackMessage,
      reason: d
    };
  }
  b("automation.status", "site_widget.v2");
}
function Nt(t) {
  return t === "accepted" || t === "replayed" ? t : b("status");
}
function U(t, e) {
  const s = T(t, "automation.conversation_state");
  return e.includes(s) || b("automation.conversation_state"), s;
}
function V(t, e, s = "site_widget.v1") {
  return Ge(t) ?? b(e, s);
}
function re(t, e) {
  return typeof t == "object" && t !== null && !Array.isArray(t) ? t : b(e);
}
function E(t, e, s) {
  const i = new Set(e), o = Object.keys(t).find((n) => !i.has(n));
  o && b(`${s}.${o}`);
}
function T(t, e) {
  return typeof t == "string" ? t : b(e);
}
function Te(t, e, s) {
  const i = T(t, e);
  return i.length > s && b(e), i.trim() || b(e);
}
function Ri(t, e, s) {
  const i = T(t, e);
  return (!i || !Number.isFinite(Date.parse(i))) && b(e, s), i;
}
function zi(t, e, s, i) {
  return (typeof t != "number" || !Number.isInteger(t) || t < s || t > i) && b(e, "site_widget.v2"), t;
}
function xt(t, e) {
  const s = T(t, "automation.reason");
  return ze.has(s) || b("automation.reason", e), s;
}
function b(t, e = "site_widget.v1") {
  throw new Error(`Invalid ${e} response: ${t}`);
}
const Li = [
  "ok",
  "schema_version",
  "public_session_id",
  "public_conversation_id",
  "conversation_state",
  "poll_after_ms",
  "messages"
], Ui = [
  "public_message_id",
  "sender_role",
  "text",
  "submitted_at",
  "delivery_state",
  "catalog_references",
  "automation"
], Oi = ["kind", "label", "title", "href", "entity_id"], Bi = ["status", "reason"], Di = /^\/catalog\.html\?section=[a-z0-9-]+&entity=ent_[a-f0-9]+#block-[a-z0-9-]+$/;
function qi(t) {
  const e = Ae(t, "root");
  $e(e, Li, "root"), e.ok !== !0 && x("ok"), e.schema_version !== "site_widget.history.v2" && x("schema_version");
  const s = Le(e.public_session_id, "public_session_id"), i = Le(
    e.public_conversation_id,
    "public_conversation_id"
  ), o = ji(e.conversation_state), n = e.poll_after_ms === void 0 ? void 0 : Wi(e.poll_after_ms, "poll_after_ms", 250, 5e3);
  (!Array.isArray(e.messages) || e.messages.length > 100) && x("messages");
  const r = e.messages.map(Hi), c = /* @__PURE__ */ new Set();
  for (const a of r)
    c.has(a.publicMessageId) && x("messages.public_message_id_duplicate"), c.add(a.publicMessageId);
  return {
    publicSessionId: s,
    publicConversationId: i,
    conversationState: o,
    pollAfterMs: n,
    messages: r,
    raw: t
  };
}
function Hi(t, e) {
  const s = `messages.${e}`, i = Ae(t, s);
  $e(i, Ui, s);
  const o = i.sender_role;
  return o !== "visitor" && o !== "ai_assistant" && o !== "manager" && x(`${s}.sender_role`), i.delivery_state !== "accepted" && x(`${s}.delivery_state`), {
    publicMessageId: Le(i.public_message_id, `${s}.public_message_id`),
    senderRole: o,
    text: W(i.text, `${s}.text`, 4e3),
    submittedAt: Ki(i.submitted_at, `${s}.submitted_at`),
    deliveryState: "accepted",
    catalogReferences: Ni(i.catalog_references, s),
    automation: i.automation === void 0 ? void 0 : Fi(i.automation, `${s}.automation`)
  };
}
function Ni(t, e) {
  return t === void 0 ? [] : ((!Array.isArray(t) || t.length > 8) && x(`${e}.catalog_references`), t.map((s, i) => {
    const o = `${e}.catalog_references.${i}`, n = Ae(s, o);
    $e(n, Oi, o), n.kind !== "catalog_item" && x(`${o}.kind`);
    const r = W(n.href, `${o}.href`, 2048);
    Di.test(r) || x(`${o}.href`);
    const c = W(n.entity_id, `${o}.entity_id`, 80);
    return /^ent_[a-f0-9]+$/.test(c) || x(`${o}.entity_id`), {
      kind: "catalog_item",
      label: W(n.label, `${o}.label`, 240),
      title: W(n.title, `${o}.title`, 160),
      href: r,
      entityId: c
    };
  }));
}
function Fi(t, e) {
  const s = Ae(t, e);
  $e(s, Bi, e);
  const i = s.status;
  i !== "pending" && i !== "processing" && i !== "retrying" && i !== "replied" && i !== "degraded" && i !== "blocked" && i !== "failed" && x(`${e}.status`);
  const o = s.reason === void 0 ? void 0 : W(s.reason, `${e}.reason`, 120);
  return { status: i, reason: o };
}
function ji(t) {
  return t === "ai_active" || t === "manager_pending" || t === "manager_active" || t === "closed" ? t : x("conversation_state");
}
function Ae(t, e) {
  return typeof t == "object" && t !== null && !Array.isArray(t) ? t : x(e);
}
function $e(t, e, s) {
  const i = new Set(e), o = Object.keys(t).find((n) => !i.has(n));
  o && x(`${s}.${o}`);
}
function Le(t, e) {
  return Ge(t) ?? x(e);
}
function W(t, e, s) {
  return (typeof t != "string" || t.length > s || !t.trim()) && x(e), t.trim();
}
function Ki(t, e) {
  return (typeof t != "string" || !Number.isFinite(Date.parse(t))) && x(e), t;
}
function Wi(t, e, s, i) {
  return (typeof t != "number" || !Number.isInteger(t) || t < s || t > i) && x(e), t;
}
function x(t) {
  throw new Error(`Invalid site_widget.history.v2 response: ${t}`);
}
async function Vi(t, e, s) {
  if (s?.aborted) throw new DOMException("Aborted", "AbortError");
  if (t.mock) return Yi(t, e, s);
  if (!t.apiBaseUrl) throw new Error("apiBaseUrl is required when mock=false");
  const i = new AbortController(), o = globalThis.setTimeout(() => i.abort(), He(t.timeoutMs)), n = () => i.abort();
  s?.aborted ? i.abort() : s?.addEventListener("abort", n, { once: !0 });
  try {
    const r = await fetch(`${t.apiBaseUrl}${t.messagesPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(e),
      credentials: "omit",
      signal: i.signal
    }), c = await Ft(r);
    if (!r.ok)
      throw new Error(jt(c) ?? `Widget request failed with HTTP ${r.status}`);
    const a = Ti(c, t), l = ne(e.public_session_id);
    if (l && a.publicSessionId !== l)
      throw new Error("Invalid site_widget.v2 response: public_session_id_mismatch");
    return a;
  } finally {
    globalThis.clearTimeout(o), s?.removeEventListener("abort", n);
  }
}
async function Gi(t, e, s) {
  const i = ne(e);
  if (!i) throw new Error("Invalid site_widget.history.v2 request: public_session_id");
  if (!t.apiBaseUrl) throw new Error("apiBaseUrl is required when mock=false");
  if (s?.aborted) throw new DOMException("Aborted", "AbortError");
  const o = new AbortController(), n = globalThis.setTimeout(
    () => o.abort(),
    Math.min(He(t.timeoutMs), 1e4)
  ), r = () => o.abort();
  s?.addEventListener("abort", r, { once: !0 });
  try {
    const c = `/public/intake/site-widget/sessions/${encodeURIComponent(i)}/history`, a = await fetch(
      `${t.apiBaseUrl}${c}?schema_version=site_widget.history.v2`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "omit",
        signal: o.signal
      }
    ), l = await Ft(a);
    if (!a.ok)
      throw new Error(jt(l) ?? `Widget history failed with HTTP ${a.status}`);
    const h = qi(l);
    if (h.publicSessionId !== i)
      throw new Error("Invalid site_widget.history.v2 response: public_session_id_mismatch");
    return h;
  } finally {
    globalThis.clearTimeout(n), s?.removeEventListener("abort", r);
  }
}
async function Yi(t, e, s) {
  await Qi(350, s);
  const i = e.message.text.toLowerCase();
  return i.includes("менеджер") || i.includes("позвон") ? {
    source: "mock",
    status: "fallback",
    publicSessionId: e.public_session_id,
    systemText: "Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",
    reason: "manager_requested",
    raw: { mock: !0 }
  } : i.includes("сто") || i.includes("цен") || i.includes("расчет") || i.includes("расчёт") ? {
    source: "mock",
    status: "replied",
    publicSessionId: e.public_session_id,
    replyText: "Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",
    raw: { mock: !0 }
  } : {
    source: "mock",
    status: "replied",
    publicSessionId: e.public_session_id,
    replyText: "Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",
    raw: { mock: !0 }
  };
}
async function Ft(t) {
  if ((t.headers.get("content-type") ?? "").includes("application/json")) return t.json();
  const s = await t.text();
  return s ? { message: s } : void 0;
}
function jt(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t;
  return typeof e.message == "string" ? e.message : typeof e.error == "string" ? e.error : void 0;
}
function Qi(t, e) {
  return e?.aborted ? Promise.reject(new DOMException("Aborted", "AbortError")) : new Promise((s, i) => {
    const o = globalThis.setTimeout(() => {
      e?.removeEventListener("abort", n), s();
    }, t), n = () => {
      globalThis.clearTimeout(o), i(new DOMException("Aborted", "AbortError"));
    };
    e?.addEventListener("abort", n, { once: !0 });
  });
}
function Zi(t, e = "local", s = {}) {
  const i = Ue(t) || "default", o = Ue(s.conversationScopeId) || i, n = Ji(
    s.legacyConversationScopeIds,
    o
  ), r = `sw:${o}:public_session_id`, c = `sw:${o}:legacy_session_migration_v1`, a = n.map(
    (y) => `sw:${y}:public_session_id`
  ), l = a.length > 0, h = `sw:${i}:open_state`, u = `sw:${i}:panel_size`, d = e === "memory" ? void 0 : eo();
  let m = "", v = !1, S, q;
  return {
    getPublicSessionId() {
      const y = X(d, r), C = ne(y || m);
      if (C)
        return m = C, y && y !== C && H(d, r, C), he(), C;
      if (m = "", y && St(d, r), de()) return "";
      for (const Kt of a) {
        const ue = ne(X(d, Kt));
        if (ue)
          return m = ue, H(d, r, ue), he(), ue;
      }
      return "";
    },
    setPublicSessionId(y) {
      const C = ne(y);
      C && (m = C, H(d, r, C), he());
    },
    clearPublicSessionId() {
      m = "", St(d, r), he();
    },
    getOpenState() {
      const y = X(d, h);
      return y === "open" ? !0 : y === "closed" ? !1 : S;
    },
    setOpenState(y) {
      S = y, H(d, h, y ? "open" : "closed");
    },
    getPanelSize() {
      const y = X(d, u);
      return Xi(y) ? y : q;
    },
    setPanelSize(y) {
      q = y, H(d, u, y);
    }
  };
  function de() {
    return l ? v || X(d, c) === "complete" : !1;
  }
  function he() {
    l && (v = !0, H(d, c, "complete"));
  }
}
function Ji(t, e) {
  const s = [], i = /* @__PURE__ */ new Set([e]);
  for (const o of t ?? []) {
    const n = Ue(o);
    !n || i.has(n) || (i.add(n), s.push(n));
  }
  return s;
}
function Ue(t) {
  return String(t ?? "").trim();
}
function Xi(t) {
  return t === "normal" || t === "wide" || t === "fullscreen";
}
function eo() {
  try {
    return typeof window > "u" ? void 0 : window.localStorage;
  } catch {
    return;
  }
}
function X(t, e) {
  try {
    return t?.getItem(e) || void 0;
  } catch {
    return;
  }
}
function H(t, e, s) {
  try {
    t?.setItem(e, s);
  } catch {
  }
}
function St(t, e) {
  try {
    t?.removeItem(e);
  } catch {
  }
}
const to = Ct`
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

  .message-status__checks {
    color: var(--sw-color-accent);
    display: inline-flex;
    font-weight: 700;
    letter-spacing: -2px;
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
`, so = Ct`
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
`;
function $(t, e = 22) {
  const s = {
    width: e,
    height: e
  };
  switch (t) {
    case "send":
      return I(s, A`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);
    case "phone":
      return I(
        s,
        A`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`
      );
    case "calculator":
      return I(
        s,
        A`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`
      );
    case "close":
      return I(s, A`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);
    case "minus":
      return I(s, A`<path d="M5 12h14" />`);
    case "paperclip":
      return I(s, A`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);
    case "shield":
      return I(
        s,
        A`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`
      );
    case "brand":
      return I(s, A`<path d="m8 3 4 8 5-5 5 15H2Z" />`);
    case "plus":
      return I(s, A`<path d="M5 12h14" /><path d="M12 5v14" />`);
    case "maximize-2":
    case "expand":
      return I(s, A`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);
    case "minimize-2":
    case "shrink":
      return I(s, A`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);
    case "spark":
      return I(
        s,
        A`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`
      );
    case "loader":
      return I(s, A`<path d="M21 12a9 9 0 1 1-2.64-6.36" />`);
    case "message":
    default:
      return I(s, A`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`);
  }
}
function I(t, e) {
  return A`<svg
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
  </svg>`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const io = Bt(class extends Dt {
  constructor() {
    super(...arguments), this.key = p;
  }
  render(t, e) {
    return this.key = t, e;
  }
  update(t, [e, s]) {
    return e !== this.key && (qt(t), this.key = e), s;
  }
}), oo = "image/jpeg,image/png,image/webp", At = "Добавить фото";
function no({
  label: t = At,
  disabled: e = !1,
  onFilesSelected: s
}) {
  const i = t.trim() || At;
  return f`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${i}
      aria-label=${i}
      ?disabled=${e}
      @click=${co}
    >
      ${$("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${oo}
      multiple
      hidden
      ?disabled=${e}
      @change=${(o) => lo(o, s)}
    />
  `;
}
function ro({
  attachments: t,
  validationMessage: e = "",
  validationRevision: s = 0,
  onRemove: i
}) {
  const o = e.trim();
  return f`
    ${o ? io(
    s,
    f`<p class="attachment-validation" role="alert" data-validation-revision=${s}>
            ${o}
          </p>`
  ) : p}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${ho(t.length)}
    </span>
    ${t.length > 0 ? f`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${t.map((n, r) => {
    const c = r + 1;
    return f`
                <li class="attachment" part="attachment">
                  <img
                    class="attachment__preview"
                    part="attachment-preview"
                    src=${n.previewUrl}
                    alt=""
                    width=${ye(n.width)}
                    height=${ye(n.height)}
                    decoding="async"
                  />
                  <span class="attachment__details">
                    <span class="attachment__label">Фото ${c}</span>
                    <span class="attachment__size">${uo(n.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${n.id}
                    type="button"
                    aria-label=${`Удалить фото ${c}`}
                    @click=${() => i(n.id)}
                  >
                    ${$("close", 18)}
                  </button>
                </li>
              `;
  })}
          </ul>
        ` : p}
  `;
}
function ao(t) {
  return t.length === 0 ? p : f`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${t.map(
    (e, s) => f`
          <li class="message-attachment" part="attachment">
            <img
              class="message-attachment__preview"
              part="attachment-preview"
              src=${e.previewUrl}
              alt=${`Фото ${s + 1}`}
              width=${ye(e.width)}
              height=${ye(e.height)}
              decoding="async"
            />
          </li>
        `
  )}
    </ul>
  `;
}
function co(t) {
  const e = t.currentTarget;
  if (!(e instanceof HTMLButtonElement)) return;
  const s = e.nextElementSibling;
  s instanceof HTMLInputElement && !s.disabled && s.click();
}
function lo(t, e) {
  const s = t.currentTarget;
  if (!(s instanceof HTMLInputElement)) return;
  const i = s.files ? Array.from(s.files) : [];
  s.value = "", i.length > 0 && e(i);
}
function ho(t) {
  return `Выбрано фото: ${t}`;
}
function uo(t) {
  const e = Math.max(0, Math.floor(t));
  return e < 1024 ? `${e} Б` : e < 1024 * 1024 ? `${$t(e / 1024)} КБ` : `${$t(e / (1024 * 1024))} МБ`;
}
function $t(t) {
  const e = t >= 10 ? 0 : 1;
  return t.toFixed(e).replace(".", ",");
}
function ye(t) {
  return Math.max(1, Math.floor(t));
}
function po(t, e) {
  return t.role === "system" ? vo(t) : mo(t, e);
}
function mo(t, e) {
  return f`<div
    class=${`message-root message-root--${t.role}`}
    part="message-root"
    data-message-id=${t.id}
    data-message-status=${t.status}
    data-public-message-id=${t.publicMessageId ?? p}
    data-acceptance-status=${t.acceptanceStatus ?? p}
  >
    ${go(t, e)} ${fo(t, e)}
  </div>`;
}
function go(t, e) {
  return f`<article class=${$o(t)} part=${`message message-${t.role} message-bubble`}>
    <p class="message__text">${t.text}</p>
    ${t.catalogReferences?.length ? f`<div class="message-links" part="message-links">
          ${t.catalogReferences.map(
    (s) => f`<a
              class="message-link"
              part="message-link"
              href=${s.href}
              target="_self"
              data-entity-id=${s.entityId}
            >
              ${s.label}
              <span aria-hidden="true">→</span>
            </a>`
  )}
        </div>` : p}
    ${ao(e.images ?? [])}
  </article>`;
}
function fo(t, e) {
  const s = t.status === "pending" || t.status === "saved" || t.status === "error", i = _o(t.createdAt), o = xo(t.createdAt);
  return t.localKind === "intro" && !t.disclosure && !s ? p : f`<div class="message-meta" part="message-meta">
    ${t.disclosure ? f`<div class="message-disclosure" part="message-disclosure">
          ${$("spark", 16)}
          <span>${t.disclosureText ?? e.config.disclosureText}</span>
        </div>` : p}
    ${i || s ? f`<div class=${`message-status-row message-status-row--${t.status}`}>
          ${i ? f`<time class="message-time" datetime=${t.createdAt} aria-label=${o}
                >${i}</time
              >` : p}
          ${s ? f`
                ${i ? f`<span aria-hidden="true">·</span>` : p}
                <span class="message-status" part="message-status">
                  ${t.status === "pending" ? f`<span class="message-status__checks" aria-hidden="true">✓</span
                        ><span>Отправлено</span>` : t.status === "saved" ? f`<span class="message-status__checks" aria-hidden="true">✓✓</span
                          ><span>Принято</span>` : "Не отправлено"}
                </span>
                ${bo(t, e)}
              ` : p}
        </div>` : p}
  </div>`;
}
function bo(t, e) {
  return t.status !== "error" ? p : f`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${() => e.onRetry(t.id)}
    >
      ${e.config.retryLabel}
    </button>
  </div>`;
}
function vo(t) {
  return f`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${t.id}
    data-system-kind=${t.systemKind ?? "fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${$("shield", 16)}</span>
    <span class="marker__text" part="marker-text">${t.text}</span>
  </div>`;
}
function wo(t, e, s = /* @__PURE__ */ new Date()) {
  if (t.localKind === "intro") return p;
  const i = _e(t.createdAt), o = e && e.localKind !== "intro" ? _e(e.createdAt) : void 0;
  return !i || o && Oe(i, o) ? p : f`<div class="date-separator" part="date-separator" role="separator">
    <span>${Ao(i, s)}</span>
  </div>`;
}
function yo() {
  return f`<div class="typing" part="typing-indicator" role="status" aria-label="AI-помощник печатает">
    <span class="typing__avatar" aria-hidden="true">${$("spark", 16)}</span>
    <span class="typing__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="visually-hidden">AI-помощник печатает</span>
  </div>`;
}
function _o(t) {
  const e = _e(t);
  return e ? new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(e) : "";
}
function xo(t) {
  const e = _e(t);
  return e ? new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(e) : "";
}
function So(t = /* @__PURE__ */ new Date()) {
  const e = new Date(t);
  return e.setHours(24, 0, 0, 50), Math.max(50, e.getTime() - t.getTime());
}
function Ao(t, e = /* @__PURE__ */ new Date()) {
  if (Oe(t, e)) return "Сегодня";
  const s = new Date(e);
  return s.setDate(s.getDate() - 1), Oe(t, s) ? "Вчера" : new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: t.getFullYear() === e.getFullYear() ? void 0 : "numeric"
  }).format(t);
}
function _e(t) {
  const e = new Date(t);
  return Number.isFinite(e.getTime()) ? e : void 0;
}
function Oe(t, e) {
  return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate();
}
function $o(t) {
  const e = ["message", `message--${t.role}`];
  return t.status === "error" && e.push("message--error"), e.join(" ");
}
const Ye = "granit-site-widget", Io = ["normal", "wide", "fullscreen"], Eo = ["normal", "fullscreen"], Mo = {
  normal: "обычный размер",
  wide: "широкий режим",
  fullscreen: "на весь экран"
}, Qe = class Qe extends te {
  constructor() {
    super(...arguments), this.config = qe(), this.state = be({ config: this.config }), this.panelSize = "normal", this.hasBooted = !1, this.publicSessionId = "", this.historyEpoch = 0, this.operationEpoch = 0, this.messageScroller = new ni(this), this.imageAttachments = new ei(this), this.sendMessageRequest = Vi, this.panelId = se("sw-panel"), this.titleId = se("sw-title"), this.phoneCaptureId = se("sw-phone"), this.cyclePanelSize = () => {
      this.panelSize = this.getNextPanelSize(), this.sessionStore?.setPanelSize(this.panelSize), this.requestUpdate();
    }, this.handleSubmit = (e) => {
      e.preventDefault(), this.submitDraft();
    }, this.handleInput = (e) => {
      const s = e.currentTarget;
      this.state = w(this.state, { type: "draft.changed", value: s.value }, this.config), this.requestUpdate();
    }, this.handleTextareaKeydown = (e) => {
      e.key === "Enter" && !e.shiftKey && (e.preventDefault(), this.submitDraft());
    }, this.handlePanelKeydown = (e) => {
      e.key === "Escape" && (e.preventDefault(), this.close());
    }, this.handleQuickReplyFocus = (e) => {
      const s = e.currentTarget;
      s instanceof HTMLElement && typeof s.scrollIntoView == "function" && s.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
    }, this.toggleContactCapture = () => {
      this.state = w(this.state, { type: "contact.capture.toggled" }, this.config), this.requestUpdate(), this.updateComplete.then(() => this.renderRoot.querySelector(".phone-field")?.focus());
    }, this.handlePhoneInput = (e) => {
      const s = e.currentTarget.value;
      this.state = { ...this.state, contactPhone: s };
    }, this.handlePhoneKeydown = (e) => {
      e.key === "Enter" && (e.preventDefault(), this.savePhone());
    }, this.savePhone = () => {
      const e = this.state.contactPhone.trim();
      this.state = w(this.state, { type: "contact.phone.saved", phone: e }, this.config), M(this, "phone-saved", this.config, { hasPhone: e.length > 0 }), this.requestUpdate();
    }, this.retryPending = async (e) => {
      if (!this.state.pending || this.state.submitting || e && e !== this.state.pending.messageId) return;
      const s = this.state.pending, i = this.operationEpoch;
      this.state = w(this.state, { type: "retry.started" }, this.config), this.requestUpdate(), await this.sendPending(s, i);
    }, this.handleAttachmentFiles = async (e) => {
      this.isPhotoPreviewEnabled() && await this.imageAttachments.selectFiles(e);
    }, this.handleRemoveAttachment = (e) => {
      const s = this.imageAttachments.removeDraft(e);
      this.updateComplete.then(() => {
        (s ? [...this.renderRoot.querySelectorAll("[data-attachment-id]")].find(
          (o) => o.dataset.attachmentId === s
        ) : this.renderRoot.querySelector(".attach-button"))?.focus();
      });
    };
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...Xt];
  }
  connectedCallback() {
    const e = this.hasBooted;
    super.connectedCallback(), this.boot(), this.scheduleDateRollover(), e && this.requestUpdate();
  }
  disconnectedCallback() {
    this.invalidateActiveWork(!0), this.clearDateRolloverTimer(), super.disconnectedCallback();
  }
  attributeChangedCallback(e, s, i) {
    if (s === i || !this.hasBooted) return;
    const o = this.config, n = this.isPhotoPreviewEnabled();
    this.config = Ze(this), this.syncHostAttributes();
    const r = this.isPhotoPreviewEnabled(), c = o.widgetInstanceId !== this.config.widgetInstanceId || o.conversationScopeId !== this.config.conversationScopeId || !ko(o.legacyConversationScopeIds, this.config.legacyConversationScopeIds) || o.storage !== this.config.storage, a = o.apiBaseUrl !== this.config.apiBaseUrl || o.messagesPath !== this.config.messagesPath || o.timeoutMs !== this.config.timeoutMs || o.mock !== this.config.mock, l = n !== r;
    if (c) {
      const h = this.state.open;
      this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.sessionStore = this.createConfiguredSessionStore(), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.state = be({ config: this.config, open: h });
    } else (a || l) && this.invalidateActiveWork(!0);
    this.imageAttachments.setEnabled(r), e === "panel-size" && (this.panelSize = this.config.panelSize), e === "open" && (this.state = w(this.state, this.hasAttribute("open") ? { type: "open" } : { type: "close" }, this.config)), this.requestUpdate();
  }
  open() {
    this.boot(), this.state = w(this.state, { type: "open" }, this.config), this.hasAttribute("open") || this.setAttribute("open", ""), this.persistOpenState(!0), M(this, "opened", this.config), this.requestUpdate(), this.focusInputSoon();
  }
  close() {
    this.boot(), this.state = w(this.state, { type: "close" }, this.config), this.hasAttribute("open") && this.removeAttribute("open"), this.persistOpenState(!1), M(this, "closed", this.config), this.requestUpdate(), this.focusLauncherSoon();
  }
  sendMessage(e) {
    this.boot(), this.state = w(this.state, { type: "draft.changed", value: e }, this.config), this.submitDraft();
  }
  clearSession() {
    this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.state = w(this.state, { type: "session.cleared" }, this.config), this.sessionStore?.clearPublicSessionId(), this.publicSessionId = this.sessionStore?.getPublicSessionId() ?? "", this.requestUpdate();
  }
  render() {
    const e = hi(this.state, this.config), s = this.getEffectivePanelSize(), i = this.getPanelSizeButtonLabel(), o = s === "fullscreen" ? "minimize-2" : "maximize-2", n = this.messageScroller.getSnapshot(), r = this.isPhotoPreviewEnabled(), c = this.imageAttachments.isProcessing(), a = e.pending ? e.messages.find((h) => h.id === e.pending?.messageId) : void 0, l = a?.status === "error" ? this.config.errorMessage : a?.status === "pending" ? "Сообщение отправлено из браузера." : e.awaitingAi ? "Сообщение принято. AI-помощник печатает." : "";
    return f`
      <button
        class="launcher"
        part="launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded=${String(e.open)}
        aria-controls=${this.panelId}
        ?hidden=${e.open}
        @click=${() => this.open()}
      >
        <span part="launcher-icon" aria-hidden="true">${$("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${e.unreadCount > 0 ? f`<span class="launcher__badge" aria-label=${`${e.unreadCount} новых сообщений`}
              >${e.unreadCount}</span
            >` : p}
      </button>

      ${this.renderMobileActions(e.showMobileActions)}

      <section
        id=${this.panelId}
        class="panel"
        part="panel"
        data-size=${s}
        role="dialog"
        aria-modal="false"
        aria-labelledby=${this.titleId}
        ?hidden=${!e.open}
        @keydown=${this.handlePanelKeydown}
      >
        <header class="header" part="header">
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${$("brand", 24)}</div>
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
              ${$(o)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${() => this.close()}
            >
              ${$("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${() => this.close()}
            >
              ${$("close")}
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
                aria-busy=${String(e.submitting || e.awaitingAi)}
              >
                ${Hs(
      e.messages,
      (h) => h.id,
      (h, u) => f`
                    ${wo(h, u > 0 ? e.messages[u - 1] : void 0)}
                    <div
                      class="message-scroller__item"
                      data-message-id=${h.id}
                      data-scroll-anchor=${h.role === "visitor" ? "true" : p}
                    >
                      ${po(h, {
        config: this.config,
        onRetry: this.retryPending,
        images: this.imageAttachments.getForMessage(h.id)
      })}
                    </div>
                  `
    )}
                ${e.awaitingAi ? yo() : p}
                <div class="message-scroller__tail" aria-hidden="true"></div>
              </div>
            </div>
            ${n.canScrollEnd ? f`<button
                  class="jump-latest"
                  part="jump-latest"
                  type="button"
                  @click=${() => this.messageScroller.scrollToEnd({ behavior: "smooth" })}
                >
                  ${n.newItemCount > 0 ? "Новые сообщения" : "К новым сообщениям"}
                </button>` : p}
          </div>

          ${e.showQuickReplies ? f`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(
      (h) => f`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${() => this.handleQuickReply(h.text ?? h.value ?? h.label)}
                    @focus=${this.handleQuickReplyFocus}
                  >
                    ${h.label}
                  </button>`
    )}
              </div>` : p}
        </div>

        <div class="composer-shell" part="composer-shell">
          ${r ? ro({
      attachments: this.imageAttachments.getDraft(),
      validationMessage: this.imageAttachments.getValidationMessage(),
      validationRevision: this.imageAttachments.getValidationRevision(),
      onRemove: this.handleRemoveAttachment
    }) : p}
          <form
            class="composer"
            part="composer"
            data-attachments=${String(r)}
            @submit=${this.handleSubmit}
          >
            ${r ? no({
      label: this.config.attachLabel,
      disabled: c || e.submitting || !!e.pending,
      onFilesSelected: this.handleAttachmentFiles
    }) : p}
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
              ?disabled=${!e.canSend || c}
            >
              ${$("send")}
            </button>
          </form>

          ${e.showContactTrigger ? f`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  aria-expanded=${String(e.contactCaptureOpen)}
                  aria-controls=${this.phoneCaptureId}
                  @click=${this.toggleContactCapture}
                >
                  ${$("plus", 18)}
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
              </div>` : p}

          <div class="footer-note" part="footer-note">
            <span aria-hidden="true">${$("shield", 18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${l}</div>
        </div>
      </section>
    `;
  }
  updated() {
    this.autoGrowTextarea();
    const e = this.renderRoot.querySelector(".message-scroller"), s = this.renderRoot.querySelector(".message-viewport"), i = this.renderRoot.querySelector(".messages"), o = this.renderRoot.querySelector(".message-scroller__tail");
    e && s && i && o && (this.messageScroller.connect({ root: e, viewport: s, content: i, tailSpacer: o }), this.messageScroller.reconcile(
      this.state.messages.map((n) => ({ id: n.id, scrollAnchor: n.role === "visitor" }))
    ));
  }
  boot() {
    if (this.hasBooted) return;
    this.config = Ze(this), this.syncHostAttributes(), this.sessionStore = this.createConfiguredSessionStore(), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());
    const e = this.config.persistOpenState ? this.sessionStore.getOpenState() : void 0, s = this.hasAttribute("open") || (e ?? this.config.initialState === "open");
    this.state = be({ config: this.config, open: s }), s && !this.hasAttribute("open") && this.setAttribute("open", ""), this.hasBooted = !0, this.publicSessionId && !this.config.mock && this.startHistoryPolling(0), this.updateComplete.then(() => {
      M(this, "ready", this.config), s && this.focusInputSoon();
    });
  }
  syncHostAttributes() {
    this.getAttribute("theme") !== this.config.theme && this.setAttribute("theme", this.config.theme), this.getAttribute("position") !== this.config.position && this.setAttribute("position", this.config.position);
  }
  createConfiguredSessionStore() {
    return Zi(this.config.widgetInstanceId, this.config.storage, {
      conversationScopeId: this.config.conversationScopeId,
      legacyConversationScopeIds: this.config.legacyConversationScopeIds
    });
  }
  persistOpenState(e) {
    this.config.persistOpenState && this.sessionStore?.setOpenState(e);
  }
  scheduleDateRollover() {
    this.clearDateRolloverTimer(), this.dateRolloverTimer = globalThis.setTimeout(() => {
      this.dateRolloverTimer = void 0, this.isConnected && (this.requestUpdate(), this.scheduleDateRollover());
    }, So());
  }
  clearDateRolloverTimer() {
    this.dateRolloverTimer !== void 0 && (globalThis.clearTimeout(this.dateRolloverTimer), this.dateRolloverTimer = void 0);
  }
  getPanelSizeButtonLabel() {
    return `${this.config.resizeLabel}: ${Mo[this.getNextPanelSize()]}`;
  }
  getNextPanelSize() {
    const e = this.getPanelSizeOrder(), s = e.includes(this.panelSize) ? this.panelSize : "normal", i = e.indexOf(s);
    return e[(i + 1) % e.length] ?? "normal";
  }
  getEffectivePanelSize() {
    return this.isMobileViewport() && this.panelSize === "wide" ? "normal" : this.panelSize;
  }
  getPanelSizeOrder() {
    return this.isMobileViewport() ? Eo : Io;
  }
  isMobileViewport() {
    return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 767px)").matches;
  }
  handleQuickReply(e) {
    M(this, "action-clicked", this.config, { actionType: "quick-reply" }), this.state = w(this.state, { type: "draft.changed", value: e }, this.config), this.requestUpdate(), this.config.quickReplySubmit === "auto" ? this.submitDraft() : this.focusInputSoon();
  }
  renderMobileActions(e) {
    return e ? f`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map((s) => this.renderMobileAction(s))}
    </nav>` : p;
  }
  renderMobileAction(e) {
    const s = e.icon ?? e.type;
    return e.type === "call" || e.type === "link" ? f`<a
        class="mobile-action"
        part="mobile-action"
        href=${e.href}
        target=${e.type === "link" ? e.target ?? "_blank" : "_self"}
        rel=${e.type === "link" && e.target !== "_self" ? "noopener noreferrer" : ""}
        @click=${() => M(this, "action-clicked", this.config, { actionType: e.type })}
      >
        ${$(s, 20)}
        <span>${e.label}</span>
      </a>` : f`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${() => this.handleMobileAction(e)}
    >
      ${$(s, 20)}
      <span>${e.label}</span>
    </button>`;
  }
  handleMobileAction(e) {
    M(this, "action-clicked", this.config, { actionType: e.type }), this.open(), e.type === "prefill" && (this.state = w(this.state, { type: "draft.changed", value: e.text }, this.config), this.requestUpdate(), this.focusInputSoon());
  }
  async submitDraft() {
    if (!this.isConnected) return;
    const e = this.operationEpoch;
    let s = this.state.draft.trim();
    if (we(s, this.config) || this.state.submitting || this.state.pending || this.isPhotoPreviewEnabled() && this.imageAttachments.isProcessing() && (await this.imageAttachments.whenIdle(), e !== this.operationEpoch || !this.isConnected || (s = this.state.draft.trim(), we(s, this.config) || this.state.submitting || this.state.pending)) || e !== this.operationEpoch || !this.isConnected) return;
    const i = Ns(this.publicSessionId);
    this.state = w(this.state, { type: "submit.started", text: s, idempotencyKey: i }, this.config);
    const o = this.state.pending;
    !o || o.idempotencyKey !== i || (this.isPhotoPreviewEnabled() && this.imageAttachments.transferDraftToMessage(o.messageId), this.requestUpdate(), await this.sendPending(o, e));
  }
  async sendPending(e, s) {
    this.abortController?.abort();
    const i = new AbortController();
    this.abortController = i;
    const { messageId: o, text: n, idempotencyKey: r } = e, c = () => this.operationEpoch === s && this.abortController === i && !i.signal.aborted && this.isConnected && this.state.pending?.messageId === o && this.state.pending.idempotencyKey === r;
    try {
      const a = ri({
        config: this.config,
        text: n,
        publicSessionId: this.publicSessionId,
        idempotencyKey: r,
        contact: this.buildContact(),
        environment: mi()
      });
      if (M(this, "message-submitted", this.config, {
        idempotencyKey: r,
        publicSessionId: this.publicSessionId,
        messageText: n
      }), !c()) return;
      const l = await this.sendMessageRequest(this.config, a, i.signal);
      if (!c()) return;
      if (l.source === "server") {
        if (this.publicSessionId && l.publicSessionId !== this.publicSessionId)
          throw new Error("Invalid site_widget.v2 response: public_session_id_mismatch");
        this.publicSessionId = l.publicSessionId, this.sessionStore?.setPublicSessionId(l.publicSessionId), this.state = w(
          this.state,
          {
            type: "visitor.saved",
            messageId: o,
            publicMessageId: l.publicMessageId,
            acceptanceStatus: l.acceptanceStatus,
            submittedAt: l.submittedAt,
            awaitingAi: l.status === "processing"
          },
          this.config
        );
      } else
        this.state = w(this.state, { type: "visitor.mocked", messageId: o }, this.config);
      if (l.status === "processing")
        this.startHistoryPolling(l.pollAfterMs);
      else if (l.status === "replied") {
        if (!l.replyText) throw new Error("Widget replied response is missing reply text");
        this.state = w(
          this.state,
          {
            type: "assistant.replied",
            text: l.replyText,
            publicMessageId: l.source === "server" ? l.replyPublicMessageId : void 0,
            disclosureText: l.source === "server" ? l.disclosureText : void 0
          },
          this.config
        );
      } else {
        const h = l.status === "disabled" ? "disabled" : "fallback";
        this.state = w(
          this.state,
          { type: "system.message", text: l.systemText || this.config.fallbackMessage, status: h },
          this.config
        ), M(this, "fallback-shown", this.config, {
          status: h,
          reason: l.status === "fallback" && "reason" in l ? l.reason ?? "" : ""
        });
      }
      M(this, "response-received", this.config, {
        status: l.status,
        acceptanceStatus: l.source === "server" ? l.acceptanceStatus : "mock",
        reason: l.status === "fallback" && "reason" in l ? l.reason ?? "" : ""
      }), this.requestUpdate();
    } catch (a) {
      if (a instanceof DOMException && a.name === "AbortError" && i.signal.aborted || !c()) return;
      this.state = w(
        this.state,
        { type: "submit.failed", text: this.config.errorMessage, messageId: o },
        this.config
      ), M(this, "error", this.config, {
        errorMessage: a instanceof Error ? a.message : String(a)
      }), this.requestUpdate();
    } finally {
      this.abortController === i && (this.abortController = void 0);
    }
  }
  invalidateActiveWork(e) {
    this.operationEpoch += 1;
    const s = this.abortController;
    this.abortController = void 0, s?.abort(), this.historyEpoch += 1;
    const i = this.historyAbortController;
    this.historyAbortController = void 0, i?.abort(), e && this.state.pending && this.state.submitting && (this.state = w(
      this.state,
      { type: "submit.failed", text: this.config.errorMessage, messageId: this.state.pending.messageId },
      this.config
    ));
  }
  startHistoryPolling(e) {
    if (!this.publicSessionId || this.config.mock || !this.isConnected) return;
    this.historyAbortController?.abort();
    const s = new AbortController(), i = ++this.historyEpoch;
    this.historyAbortController = s, this.pollHistory(i, s, e);
  }
  async pollHistory(e, s, i) {
    let o = Math.max(0, i), n = 0;
    for (; e === this.historyEpoch && this.historyAbortController === s && !s.signal.aborted && this.isConnected; )
      try {
        o > 0 && await To(o, s.signal);
        const r = await Gi(
          this.config,
          this.publicSessionId,
          s.signal
        );
        if (r.publicSessionId !== this.publicSessionId)
          throw new Error("Invalid site_widget.history.v2 response: public_session_id_mismatch");
        n = 0;
        const c = r.pollAfterMs !== void 0 || r.messages.some(
          (a) => a.automation?.status === "pending" || a.automation?.status === "processing" || a.automation?.status === "retrying"
        );
        if (this.state = w(
          this.state,
          {
            type: "history.synced",
            messages: r.messages,
            awaitingAi: c,
            conversationState: r.conversationState
          },
          this.config
        ), !c)
          if (r.conversationState === "manager_pending" || r.conversationState === "manager_active")
            this.state = w(
              this.state,
              { type: "system.message", text: this.config.disabledMessage, status: "disabled" },
              this.config
            );
          else {
            const a = [...r.messages].reverse().find(
              (l) => l.automation && (l.automation.status === "degraded" || l.automation.status === "failed" || l.automation.status === "blocked")
            );
            a?.automation?.status === "blocked" ? this.state = w(
              this.state,
              { type: "system.message", text: this.config.disabledMessage, status: "disabled" },
              this.config
            ) : a && (this.state = w(
              this.state,
              { type: "system.message", text: this.config.fallbackMessage, status: "fallback" },
              this.config
            ));
          }
        if (this.requestUpdate(), !c) break;
        o = r.pollAfterMs ?? 700;
      } catch (r) {
        if (s.signal.aborted || e !== this.historyEpoch) return;
        if (r instanceof Error && r.message.includes("HTTP 404")) {
          this.sessionStore?.clearPublicSessionId(), this.publicSessionId = "", this.state = w(this.state, { type: "session.cleared" }, this.config), this.requestUpdate();
          break;
        }
        n += 1, o = Math.min(500 * 2 ** Math.min(n, 3), 4e3), n === 1 && M(this, "error", this.config, {
          errorMessage: r instanceof Error ? r.message : String(r)
        });
      }
    this.historyAbortController === s && (this.historyAbortController = void 0);
  }
  buildContact() {
    const e = this.state.contactPhone.trim();
    return e ? { phone: e, preferred_contact: "phone" } : void 0;
  }
  isPhotoPreviewEnabled() {
    return this.config.mock && this.config.attachmentsEnabled && this.config.showAttachmentSlot;
  }
  autoGrowTextarea() {
    const e = this.renderRoot.querySelector(".textarea");
    e && (e.style.height = "auto", e.style.height = `${Math.min(e.scrollHeight, 118)}px`);
  }
  async focusInputSoon() {
    await this.updateComplete, this.renderRoot.querySelector(".textarea")?.focus();
  }
  async focusLauncherSoon() {
    await this.updateComplete, this.renderRoot.querySelector(".launcher")?.focus();
  }
};
Qe.styles = [so, to];
let Be = Qe;
function ko(t, e) {
  return t.length === e.length && t.every((s, i) => s === e[i]);
}
function To(t, e) {
  return e.aborted ? Promise.reject(new DOMException("Aborted", "AbortError")) : new Promise((s, i) => {
    const o = globalThis.setTimeout(r, Math.max(0, t)), n = () => {
      globalThis.clearTimeout(o), e.removeEventListener("abort", n), i(new DOMException("Aborted", "AbortError"));
    };
    function r() {
      e.removeEventListener("abort", n), s();
    }
    e.addEventListener("abort", n, { once: !0 });
  });
}
function De(t = Ye) {
  typeof window > "u" || !window.customElements || window.customElements.get(t) || window.customElements.define(t, Be);
}
function Co(t = {}) {
  if (typeof document > "u")
    throw new Error("mountSiteWidget requires a browser document");
  De();
  const e = document.createElement(Ye);
  ss(e, t);
  const s = t.target ?? document.body;
  if (!s) throw new Error("mountSiteWidget target was not found");
  return s.appendChild(e), e;
}
typeof window < "u" && (window.GranitSiteWidget = {
  define: De,
  mount: Co,
  tagName: Ye
}, De());
export {
  Be as GranitSiteWidgetElement,
  Ye as SITE_WIDGET_TAG_NAME,
  De as defineSiteWidget,
  Co as mountSiteWidget
};
//# sourceMappingURL=site-widget.esm.js.map

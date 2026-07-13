const $t = [
  { label: "Нужен расчет", text: "Нужен расчет памятника с установкой" },
  { label: "Есть вопрос", text: "Здравствуйте, у меня есть вопрос по заказу" },
  { label: "Хочу каталог", text: "Хочу посмотреть каталог памятников" }
], St = [
  { type: "call", label: "Позвонить", href: "tel:", icon: "phone" },
  { type: "open", label: "Написать", icon: "message" },
  { type: "prefill", label: "Расчет", text: "Нужен расчет памятника", icon: "calculator" }
], R = {
  apiBaseUrl: "",
  messagesPath: "/public/intake/site-widget/messages",
  timeoutMs: 15e3,
  widgetInstanceId: "default",
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
  introMessage: `Здравствуйте! 👋
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
  quickReplies: $t,
  mobileActions: St
}, at = {
  "api-base-url": "apiBaseUrl",
  "messages-path": "messagesPath",
  "timeout-ms": "timeoutMs",
  "widget-instance-id": "widgetInstanceId",
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
}, At = [
  ...Object.keys(at),
  "config",
  "quick-replies",
  "mobile-actions",
  "open"
], _t = /* @__PURE__ */ new Set([
  "mock",
  "persistOpenState",
  "showQuickActions",
  "showMobileActions",
  "showAttachmentSlot",
  "attachmentsEnabled",
  "collectPhoneAfterFirstMessage",
  "includeMessageTextInEvents"
]), Mt = /* @__PURE__ */ new Set(["timeoutMs", "maxMessageLength"]);
function $e(s = {}) {
  const e = { ...R, ...s }, t = Ce(e.timeoutMs, R.timeoutMs, 6e4), i = Ce(e.maxMessageLength, R.maxMessageLength, 1e4);
  return {
    ...e,
    apiBaseUrl: Bt(w(e.apiBaseUrl)),
    messagesPath: Ot(e.messagesPath),
    timeoutMs: t,
    widgetInstanceId: w(e.widgetInstanceId) || R.widgetInstanceId,
    theme: w(e.theme) || R.theme,
    position: Ct(e.position),
    panelSize: zt(e.panelSize),
    mock: !!e.mock,
    initialState: Rt(e.initialState),
    persistOpenState: !!e.persistOpenState,
    storage: Lt(e.storage),
    quickReplySubmit: Ut(e.quickReplySubmit),
    showQuickActions: !!e.showQuickActions,
    showMobileActions: !!e.showMobileActions,
    showAttachmentSlot: !!e.showAttachmentSlot,
    attachmentsEnabled: !!e.attachmentsEnabled,
    collectPhoneAfterFirstMessage: !!e.collectPhoneAfterFirstMessage,
    includeMessageTextInEvents: !!e.includeMessageTextInEvents,
    maxMessageLength: i,
    phoneHref: U(e.phoneHref),
    privacyUrl: U(e.privacyUrl),
    quickReplies: ve(e.quickReplies),
    mobileActions: we(e.mobileActions, e.phoneHref)
  };
}
function Te(s) {
  const e = {
    ...Pt(s),
    ...lt(s.getAttribute("config"))
  };
  for (const [t, i] of Object.entries(at)) {
    if (!s.hasAttribute(t)) continue;
    const r = s.getAttribute(t);
    r != null && (_t.has(i) ? e[i] = Tt(r) : Mt.has(i) ? e[i] = Number(r) : e[i] = r);
  }
  return s.hasAttribute("quick-replies") && (e.quickReplies = It(s.getAttribute("quick-replies") ?? "")), s.hasAttribute("mobile-actions") && (e.mobileActions = kt(s.getAttribute("mobile-actions") ?? "")), $e(e);
}
function Et(s, e = {}) {
  const t = $e(e);
  p(s, "api-base-url", t.apiBaseUrl), p(s, "messages-path", t.messagesPath), p(s, "timeout-ms", String(t.timeoutMs)), p(s, "widget-instance-id", t.widgetInstanceId), p(s, "theme", t.theme), p(s, "position", t.position), p(s, "panel-size", t.panelSize), p(s, "initial-state", t.initialState), p(s, "storage", t.storage), p(s, "quick-reply-submit", t.quickReplySubmit), p(s, "launcher-label", t.launcherLabel), p(s, "header-title", t.headerTitle), p(s, "header-status", t.headerStatus), p(s, "header-response-time", t.headerResponseTime), p(s, "intro-message", t.introMessage), p(s, "placeholder", t.placeholder), p(s, "disclosure-text", t.disclosureText), p(s, "footer-note", t.footerNote), p(s, "phone-capture-label", t.phoneCaptureLabel), p(s, "phone-saved-label", t.phoneSavedLabel), p(s, "phone-placeholder", t.phonePlaceholder), p(s, "fallback-message", t.fallbackMessage), p(s, "disabled-message", t.disabledMessage), p(s, "error-message", t.errorMessage), p(s, "retry-label", t.retryLabel), p(s, "send-label", t.sendLabel), p(s, "attach-label", t.attachLabel), p(s, "resize-label", t.resizeLabel), p(s, "close-label", t.closeLabel), p(s, "minimize-label", t.minimizeLabel), p(s, "phone-href", t.phoneHref), p(s, "privacy-url", t.privacyUrl), p(s, "max-message-length", String(t.maxMessageLength)), H(s, "mock", t.mock), H(s, "persist-open-state", t.persistOpenState), p(s, "show-quick-actions", String(t.showQuickActions)), p(s, "show-mobile-actions", String(t.showMobileActions)), p(s, "show-attachment-slot", String(t.showAttachmentSlot)), H(s, "attachments-enabled", t.attachmentsEnabled), H(s, "collect-phone-after-first-message", t.collectPhoneAfterFirstMessage), H(s, "include-message-text-in-events", t.includeMessageTextInEvents), (e.open || t.initialState === "open") && s.setAttribute("open", ""), t.quickReplies.length > 0 && s.setAttribute("quick-replies", JSON.stringify(t.quickReplies)), t.mobileActions.length > 0 && s.setAttribute("mobile-actions", JSON.stringify(t.mobileActions));
  for (const [i, r] of Object.entries(e.attributes ?? {}))
    s.setAttribute(i, r);
}
function It(s) {
  const e = s.trim();
  if (!e) return [];
  const t = Se(e);
  return Array.isArray(t) ? ve(t) : ve(
    e.split("|").map((i) => ({ label: i.trim(), text: i.trim() })).filter((i) => i.label)
  );
}
function kt(s) {
  const e = s.trim();
  if (!e) return [];
  const t = Se(e);
  return Array.isArray(t) ? we(t) : we(
    e.split("|").map((i) => ({ type: "open", label: i.trim() })).filter((i) => i.label)
  );
}
function ve(s = []) {
  return s.map((e) => {
    const t = w(e?.label), i = w(e?.text ?? e?.value ?? e?.label);
    return { label: t, text: i };
  }).filter((e) => e.label.length > 0 && e.text.length > 0).slice(0, 6);
}
function we(s = [], e) {
  return s.map((t) => {
    const i = w(t?.label);
    if (i) {
      if (t.type === "call") {
        const r = w(t.href || e || "tel:");
        return { type: "call", label: i, href: r, icon: U(t.icon) };
      }
      if (t.type === "link") {
        const r = w(t.href);
        return r ? {
          type: "link",
          label: i,
          href: r,
          target: t.target === "_self" ? "_self" : "_blank",
          icon: U(t.icon)
        } : void 0;
      }
      if (t.type === "prefill") {
        const r = w(t.text);
        return r ? { type: "prefill", label: i, text: r, icon: U(t.icon) } : void 0;
      }
      return { type: "open", label: i, icon: U(t.icon) };
    }
  }).filter((t) => !!t).slice(0, 4);
}
function Pt(s) {
  const e = s.querySelector?.('script[type="application/json"][data-site-widget-config]');
  return e?.textContent ? lt(e.textContent) : {};
}
function lt(s) {
  if (!s?.trim()) return {};
  const e = Se(s);
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function p(s, e, t) {
  t && t.length > 0 && s.setAttribute(e, t);
}
function H(s, e, t) {
  t ? s.setAttribute(e, "true") : s.removeAttribute(e);
}
function Tt(s) {
  const e = s.trim().toLowerCase();
  return e === "" || e === "1" || e === "true" || e === "yes";
}
function Ct(s) {
  const e = w(s);
  return e === "bottom-left" || e === "inline" ? e : "bottom-right";
}
function zt(s) {
  const e = w(s);
  return e === "wide" || e === "fullscreen" ? e : "normal";
}
function Rt(s) {
  return w(s) === "open" ? "open" : "closed";
}
function Lt(s) {
  return w(s) === "memory" ? "memory" : "local";
}
function Ut(s) {
  return w(s) === "auto" ? "auto" : "prefill";
}
function Ot(s) {
  const e = w(s);
  return e ? e.startsWith("/") ? e : `/${e}` : R.messagesPath;
}
function Ce(s, e, t) {
  const i = Number(s);
  return !Number.isInteger(i) || i <= 0 ? e : Math.min(i, t);
}
function Bt(s) {
  return s.replace(/\/+$/, "");
}
function U(s) {
  return w(s) || void 0;
}
function w(s) {
  return String(s ?? "").trim();
}
function Se(s) {
  try {
    return JSON.parse(s);
  } catch {
    return;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = globalThis, Ae = se.ShadowRoot && (se.ShadyCSS === void 0 || se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _e = Symbol(), ze = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== _e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ae && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ze.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ze.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qt = (s) => new ct(typeof s == "string" ? s : s + "", void 0, _e), ht = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new ct(t, s, _e);
}, Ht = (s, e) => {
  if (Ae) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = se.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, Re = Ae ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return qt(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nt, defineProperty: Dt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: jt, getOwnPropertySymbols: Wt, getPrototypeOf: Kt } = Object, le = globalThis, Le = le.trustedTypes, Vt = Le ? Le.emptyScript : "", Qt = le.reactiveElementPolyfillSupport, j = (s, e) => s, xe = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Vt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, dt = (s, e) => !Nt(s, e), Ue = { attribute: !0, type: String, converter: xe, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ??= Symbol("metadata"), le.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Dt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = Ft(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const l = r?.call(this);
      o?.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = Kt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const t = this.properties, i = [...jt(t), ...Wt(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(Re(r));
    } else e !== void 0 && t.push(Re(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
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
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : xe).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : xe;
      this._$Em = r;
      const l = n.fromAttribute(t, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, o) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[e]), i ??= n.getPropertyOptions(e), !((i.hasChanged ?? dt)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: n } = o, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[j("elementProperties")] = /* @__PURE__ */ new Map(), L[j("finalized")] = /* @__PURE__ */ new Map(), Qt?.({ ReactiveElement: L }), (le.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = globalThis, Oe = (s) => s, oe = Me.trustedTypes, Be = oe ? oe.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, pt = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + E, Gt = `<${ut}>`, C = document, G = () => C.createComment(""), Z = (s) => s === null || typeof s != "object" && typeof s != "function", Ee = Array.isArray, Zt = (s) => Ee(s) || typeof s?.[Symbol.iterator] == "function", de = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qe = /-->/g, He = />/g, I = RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ne = /'/g, De = /"/g, mt = /^(?:script|style|textarea|title)$/i, ft = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), g = ft(1), x = ft(2), z = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Fe = /* @__PURE__ */ new WeakMap(), T = C.createTreeWalker(C, 129);
function gt(s, e) {
  if (!Ee(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Be !== void 0 ? Be.createHTML(e) : e;
}
const Jt = (s, e) => {
  const t = s.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = N;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, h, d = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === N ? h[1] === "!--" ? n = qe : h[1] !== void 0 ? n = He : h[2] !== void 0 ? (mt.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = I) : h[3] !== void 0 && (n = I) : n === I ? h[0] === ">" ? (n = r ?? N, d = -1) : h[1] === void 0 ? d = -2 : (d = n.lastIndex - h[2].length, c = h[1], n = h[3] === void 0 ? I : h[3] === '"' ? De : Ne) : n === De || n === Ne ? n = I : n === qe || n === He ? n = N : (n = I, r = void 0);
    const m = n === I && s[l + 1].startsWith("/>") ? " " : "";
    o += n === N ? a + Gt : d >= 0 ? (i.push(c), a.slice(0, d) + pt + a.slice(d) + E + m) : a + E + (d === -2 ? l : m);
  }
  return [gt(s, o + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class J {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [c, h] = Jt(e, t);
    if (this.el = J.createElement(c, i), T.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = T.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(pt)) {
          const f = h[n++], m = r.getAttribute(d).split(E), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: b[2], strings: m, ctor: b[1] === "." ? Xt : b[1] === "?" ? es : b[1] === "@" ? ts : ce }), r.removeAttribute(d);
        } else d.startsWith(E) && (a.push({ type: 6, index: o }), r.removeAttribute(d));
        if (mt.test(r.tagName)) {
          const d = r.textContent.split(E), f = d.length - 1;
          if (f > 0) {
            r.textContent = oe ? oe.emptyScript : "";
            for (let m = 0; m < f; m++) r.append(d[m], G()), T.nextNode(), a.push({ type: 2, index: ++o });
            r.append(d[f], G());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ut) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(E, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += E.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function B(s, e, t = s, i) {
  if (e === z) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = Z(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = B(s, r._$AS(s, e.values), r, i)), e;
}
class Yt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
    T.currentNode = r;
    let o = T.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new q(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new ss(o, this, e)), this._$AV.push(c), a = i[++l];
      }
      n !== a?.index && (o = T.nextNode(), n++);
    }
    return T.currentNode = C, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = B(this, e, t), Z(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Zt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && Z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = J.createElement(gt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new Yt(r, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Fe.get(e.strings);
    return t === void 0 && Fe.set(e.strings, t = new J(e)), t;
  }
  k(e) {
    Ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new q(this.O(G()), this.O(G()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Oe(e).nextSibling;
      Oe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ce {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = B(this, e, t, 0), n = !Z(e) || e !== this._$AH && e !== z, n && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = B(this, l[i + a], t, a), c === z && (c = this._$AH[a]), n ||= !Z(c) || c !== this._$AH[a], c === u ? e = u : e !== u && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xt extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class es extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class ts extends ce {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = B(this, e, t, 0) ?? u) === z) return;
    const i = this._$AH, r = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ss {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const is = { I: q }, rs = Me.litHtmlPolyfillSupport;
rs?.(J, q), (Me.litHtmlVersions ??= []).push("3.3.3");
const os = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new q(e.insertBefore(G(), o), o, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis;
let W = class extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = os(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return z;
  }
};
W._$litElement$ = !0, W.finalized = !0, Ie.litElementHydrateSupport?.({ LitElement: W });
const ns = Ie.litElementPolyfillSupport;
ns?.({ LitElement: W });
(Ie.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const as = { CHILD: 2 }, bt = (s) => (...e) => ({ _$litDirective$: s, values: e });
let vt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ls } = is, je = (s) => s, We = () => document.createComment(""), D = (s, e, t) => {
  const i = s._$AA.parentNode, r = e === void 0 ? s._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(We(), r), n = i.insertBefore(We(), r);
    t = new ls(o, n, s, s.options);
  } else {
    const o = t._$AB.nextSibling, n = t._$AM, l = n !== s;
    if (l) {
      let a;
      t._$AQ?.(s), t._$AM = s, t._$AP !== void 0 && (a = s._$AU) !== n._$AU && t._$AP(a);
    }
    if (o !== r || l) {
      let a = t._$AA;
      for (; a !== o; ) {
        const c = je(a).nextSibling;
        je(i).insertBefore(a, r), a = c;
      }
    }
  }
  return t;
}, k = (s, e, t = s) => (s._$AI(e, t), s), cs = {}, wt = (s, e = cs) => s._$AH = e, hs = (s) => s._$AH, pe = (s) => {
  s._$AR(), s._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = (s, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(s[r], r);
  return i;
}, ds = bt(class extends vt {
  constructor(s) {
    if (super(s), s.type !== as.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(s, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], o = [];
    let n = 0;
    for (const l of s) r[n] = i ? i(l, n) : n, o[n] = t(l, n), n++;
    return { values: o, keys: r };
  }
  render(s, e, t) {
    return this.dt(s, e, t).values;
  }
  update(s, [e, t, i]) {
    const r = hs(s), { values: o, keys: n } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = n, o;
    const l = this.ut ??= [], a = [];
    let c, h, d = 0, f = r.length - 1, m = 0, b = o.length - 1;
    for (; d <= f && m <= b; ) if (r[d] === null) d++;
    else if (r[f] === null) f--;
    else if (l[d] === n[m]) a[m] = k(r[d], o[m]), d++, m++;
    else if (l[f] === n[b]) a[b] = k(r[f], o[b]), f--, b--;
    else if (l[d] === n[b]) a[b] = k(r[d], o[b]), D(s, a[b + 1], r[d]), d++, b--;
    else if (l[f] === n[m]) a[m] = k(r[f], o[m]), D(s, r[d], r[f]), f--, m++;
    else if (c === void 0 && (c = Ke(n, m, b), h = Ke(l, d, f)), c.has(l[d])) if (c.has(l[f])) {
      const M = h.get(n[m]), he = M !== void 0 ? r[M] : null;
      if (he === null) {
        const Pe = D(s, r[d]);
        k(Pe, o[m]), a[m] = Pe;
      } else a[m] = k(he, o[m]), D(s, r[d], he), r[M] = null;
      m++;
    } else pe(r[f]), f--;
    else pe(r[d]), d++;
    for (; m <= b; ) {
      const M = D(s, a[b + 1]);
      k(M, o[m]), a[m++] = M;
    }
    for (; d <= f; ) {
      const M = r[d++];
      M !== null && pe(M);
    }
    return this.ut = n, wt(s, a), z;
  }
});
function K(s = "id") {
  return `${s}_${xt()}`;
}
function ps(s) {
  return `site-widget:${Date.now()}:${xt()}`;
}
function us(s) {
  let e = 2166136261;
  for (let t = 0; t < s.length; t += 1)
    e ^= s.charCodeAt(t), e = Math.imul(e, 16777619);
  return `h${(e >>> 0).toString(16).padStart(8, "0")}`;
}
function xt() {
  const s = globalThis.crypto;
  if (s && typeof s.randomUUID == "function")
    return s.randomUUID().replaceAll("-", "");
  const e = new Uint8Array(16);
  return s && typeof s.getRandomValues == "function" ? (s.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("")) : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
const Ve = 3, Qe = 5 * 1024 * 1024, Ge = 15 * 1024 * 1024, Ze = 24e6, ms = [255, 216, 255], fs = [137, 80, 78, 71, 13, 10, 26, 10], gs = [82, 73, 70, 70], bs = [87, 69, 66, 80];
function vs(s) {
  if (Y(s, ms)) return "image/jpeg";
  if (Y(s, fs)) return "image/png";
  if (Y(s, gs) && Y(s, bs, 8)) return "image/webp";
}
function ws(s, e) {
  if (!e) return !1;
  const t = String(s ?? "").trim().toLowerCase();
  return t === "" || t === e;
}
function xs(s, e) {
  if (!Number.isSafeInteger(s.sizeBytes) || s.sizeBytes < 0)
    return { code: "invalid_image_size", actualBytes: s.sizeBytes };
  const t = e.length + 1;
  if (t > Ve)
    return { code: "too_many_images", maxCount: Ve, actualCount: t };
  if (s.sizeBytes > Qe)
    return { code: "image_too_large", maxBytes: Qe, actualBytes: s.sizeBytes };
  const i = e.reduce((r, o) => r + o.sizeBytes, s.sizeBytes);
  if (i > Ge)
    return { code: "total_too_large", maxBytes: Ge, actualBytes: i };
}
function ys(s, e) {
  if (!Number.isSafeInteger(s) || !Number.isSafeInteger(e) || s <= 0 || e <= 0)
    return { code: "invalid_image_dimensions", width: s, height: e };
  const t = s * e;
  if (!Number.isSafeInteger(t) || t > Ze)
    return { code: "too_many_pixels", maxPixels: Ze, actualPixels: t };
}
function $s(s) {
  if (s.length === 0) return "";
  const e = [...new Set(s.map(({ error: i }) => Ss(i)))];
  return `${s.length === 1 ? "Фото не добавлено" : "Некоторые фото не добавлены"}: ${e.join("; ")}.`;
}
function Y(s, e, t = 0) {
  return s.length < t + e.length ? !1 : e.every((i, r) => s[t + r] === i);
}
function Ss(s) {
  switch (s.code) {
    case "invalid_image_size":
      return "не удалось определить размер файла";
    case "too_many_images":
      return `можно добавить не более ${s.maxCount} фото`;
    case "image_too_large":
      return `размер одного фото превышает ${Je(s.maxBytes)} МБ`;
    case "total_too_large":
      return `общий размер фото превышает ${Je(s.maxBytes)} МБ`;
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
function Je(s) {
  return String(s / (1024 * 1024));
}
class O extends Error {
  constructor() {
    super("Image selection is no longer current"), this.name = "StaleImageSelectionError";
  }
}
class As {
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
    const t = !!e;
    this.enabled !== t && (this.enabled = t, t || this.clearAll());
  }
  selectFiles(e) {
    const t = [...e], i = this.generation, r = Symbol("image-selection");
    this.pendingSelections.set(r, i), this.host.requestUpdate();
    let o = () => {
    };
    const n = new Promise((l) => {
      o = l;
    });
    return this.selectionQueue = this.selectionQueue.catch(() => {
    }).then(async () => {
      try {
        o(await this.processBatch(t, i));
      } catch {
        if (i !== this.generation || !this.enabled) {
          o({ accepted: 0, rejected: t.length, validationMessage: "" });
          return;
        }
        const l = "Фото не добавлено: одно из изображений не удалось прочитать.";
        this.validationMessage = l, this.validationRevision += 1, this.host.requestUpdate(), o({ accepted: 0, rejected: t.length, validationMessage: l });
      } finally {
        this.pendingSelections.delete(r), this.host.requestUpdate();
      }
    }), n;
  }
  removeDraft(e) {
    const t = this.draft.findIndex((o) => o.id === e);
    if (t < 0) return;
    const i = this.draft[t];
    i && this.revokePreview(i.previewUrl), this.draft = this.draft.filter((o) => o.id !== e), this.validationMessage = "";
    const r = this.draft[t]?.id ?? this.draft[t - 1]?.id;
    return this.host.requestUpdate(), r;
  }
  transferDraftToMessage(e) {
    if (this.draft.length === 0) return;
    const t = this.byMessageId.get(e) ?? [];
    this.byMessageId.set(e, [...t, ...this.draft]), this.draft = [], this.validationMessage = "", this.host.requestUpdate();
  }
  removeMessageAttachments(e) {
    const t = this.byMessageId.get(e);
    if (t) {
      for (const i of t) this.revokePreview(i.previewUrl);
      this.byMessageId.delete(e), this.host.requestUpdate();
    }
  }
  clearAll() {
    const e = this.isProcessing();
    this.generation += 1, this.pendingSelections.clear(), this.selectionQueue = Promise.resolve();
    const t = /* @__PURE__ */ new Set();
    for (const r of this.inFlightPreviewUrls) t.add(r);
    for (const r of this.draft) t.add(r.previewUrl);
    for (const r of this.byMessageId.values())
      for (const o of r) t.add(o.previewUrl);
    for (const r of t) this.revokePreview(r);
    this.inFlightPreviewUrls.clear();
    const i = e || t.size > 0 || this.draft.length > 0 || this.byMessageId.size > 0 || this.validationMessage;
    this.draft = [], this.byMessageId.clear(), this.validationMessage = "", i && this.host.requestUpdate();
  }
  async processBatch(e, t) {
    if (!this.enabled || t !== this.generation || e.length === 0)
      return { accepted: 0, rejected: 0, validationMessage: "" };
    const i = t, r = () => i === this.generation && this.enabled, o = [], n = [], l = [...this.draft];
    for (const a of e) {
      A(r);
      const c = { file: a, sizeBytes: a.size }, h = xs(c, l);
      if (h) {
        n.push({ candidate: c, error: h });
        continue;
      }
      const d = await this.validateAndCreateAttachment(c, n, r);
      if (d) {
        if (!r()) {
          this.revokeInFlightPreview(d.previewUrl);
          break;
        }
        o.push(d), l.push(d);
      }
    }
    if (!r()) {
      for (const a of o) this.revokeInFlightPreview(a.previewUrl);
      return { accepted: 0, rejected: e.length, validationMessage: "" };
    }
    for (const a of o) this.inFlightPreviewUrls.delete(a.previewUrl);
    return this.draft = [...this.draft, ...o], this.validationMessage = $s(n), this.validationRevision += 1, this.host.requestUpdate(), {
      accepted: o.length,
      rejected: n.length,
      validationMessage: this.validationMessage
    };
  }
  async validateAndCreateAttachment(e, t, i) {
    A(i);
    let r;
    try {
      const a = await Es(e.file.slice(0, 12));
      A(i), r = vs(new Uint8Array(a));
    } catch (a) {
      if (a instanceof O) throw a;
      t.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    if (!r) {
      t.push({ candidate: e, error: { code: "unsupported_image_type" } });
      return;
    }
    if (!ws(e.file.type, r)) {
      t.push({
        candidate: e,
        error: {
          code: "mime_mismatch",
          declaredMime: e.file.type,
          detectedMime: r
        }
      });
      return;
    }
    let o;
    try {
      o = await _s(
        e.file,
        (a) => this.createInFlightPreview(a),
        (a) => this.revokeInFlightPreview(a),
        i
      );
    } catch (a) {
      if (a instanceof O) throw a;
      t.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    A(i);
    const n = ys(o.width, o.height);
    if (n) {
      t.push({ candidate: e, error: n });
      return;
    }
    let l;
    try {
      if (A(i), l = this.createInFlightPreview(e.file), !i())
        throw this.revokeInFlightPreview(l), new O();
    } catch (a) {
      if (a instanceof O) throw a;
      t.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    return {
      id: K("img"),
      name: e.file.name,
      mimeType: r,
      sizeBytes: e.file.size,
      width: o.width,
      height: o.height,
      previewUrl: l,
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
    const t = URL.createObjectURL(e);
    return this.inFlightPreviewUrls.add(t), t;
  }
  revokeInFlightPreview(e) {
    this.inFlightPreviewUrls.delete(e) && this.revokePreview(e);
  }
}
async function _s(s, e, t, i) {
  let r;
  if (typeof createImageBitmap == "function")
    try {
      A(i);
      const n = await createImageBitmap(s);
      try {
        return A(i), { width: n.width, height: n.height };
      } finally {
        n.close();
      }
    } catch (n) {
      if (n instanceof O) throw n;
      r = n;
    }
  if (A(i), typeof Image > "u" || typeof URL.createObjectURL != "function")
    throw r instanceof Error ? r : new Error("No browser image decoder is available");
  A(i);
  const o = e(s);
  try {
    A(i);
    const n = new Image();
    return n.decoding = "async", n.src = o, typeof n.decode == "function" ? await n.decode() : await Ms(n), A(i), { width: n.naturalWidth, height: n.naturalHeight };
  } finally {
    t(o);
  }
}
function A(s) {
  if (!s()) throw new O();
}
function Ms(s) {
  return new Promise((e, t) => {
    s.addEventListener("load", () => e(), { once: !0 }), s.addEventListener("error", () => t(new Error("Image decode failed")), { once: !0 });
  });
}
async function Es(s) {
  return typeof s.arrayBuffer == "function" ? s.arrayBuffer() : new Promise((e, t) => {
    const i = new FileReader();
    i.addEventListener("load", () => {
      i.result instanceof ArrayBuffer ? e(i.result) : t(new Error("Blob read returned no ArrayBuffer"));
    }), i.addEventListener("error", () => t(i.error ?? new Error("Blob read failed"))), i.readAsArrayBuffer(s);
  });
}
const ue = 8, me = 40, Ye = 180, P = 0.5, Is = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", " ", "Spacebar"]);
class ks {
  constructor(e) {
    this.items = [], this.mode = "following-bottom", this.snapshot = {
      mode: "following-bottom",
      canScrollStart: !1,
      canScrollEnd: !1,
      newItemCount: 0
    }, this.newItemCount = 0, this.hasInitialPlacement = !1, this.observedRows = /* @__PURE__ */ new Set(), this.programmaticScroll = !1, this.pointerActive = !1, this.handleWheel = () => this.releaseForUser(), this.handleTouchMove = () => this.releaseForUser(), this.handleKeydown = (t) => {
      if (!Is.has(t.key)) return;
      const i = t.target;
      i instanceof HTMLElement && i !== this.viewport && this.isInteractive(i) || this.releaseForUser();
    }, this.handlePointerDown = (t) => {
      this.pointerActive = t.target === this.viewport;
    }, this.handlePointerUp = () => {
      this.pointerActive = !1;
    }, this.handleScroll = () => {
      this.pointerActive && !this.programmaticScroll && this.releaseForUser();
      const t = this.viewport;
      t && !this.programmaticScroll && this.mode === "free-scrolling" && this.distanceToEnd(t) <= ue && (this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0, this.mode = "following-bottom", this.commitModeAttribute()), this.updateSnapshot();
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
  connect({ root: e, viewport: t, content: i, tailSpacer: r }) {
    if (this.viewport === t && this.content === i && this.tailSpacer === r) {
      this.root = e, this.commitModeAttribute();
      return;
    }
    this.detachElements(), this.root = e, this.viewport = t, this.content = i, this.tailSpacer = r, t.addEventListener("scroll", this.handleScroll, { passive: !0 }), t.addEventListener("wheel", this.handleWheel, { passive: !0 }), t.addEventListener("touchmove", this.handleTouchMove, { passive: !0 }), t.addEventListener("keydown", this.handleKeydown), t.addEventListener("pointerdown", this.handlePointerDown), t.addEventListener("pointerup", this.handlePointerUp), t.addEventListener("pointercancel", this.handlePointerUp), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.scheduleCommit()), this.resizeObserver.observe(t), this.resizeObserver.observe(i), this.reconcileObservedRows()) : typeof window < "u" && window.addEventListener("resize", this.handleWindowResize), this.commitModeAttribute(), this.scheduleCommit();
  }
  reconcile(e) {
    const t = e.map((o) => ({ id: o.id, scrollAnchor: !!o.scrollAnchor })), i = this.pendingReconcile?.previous ?? this.items, r = this.pendingReconcile?.layoutAnchor ?? this.pendingLayoutAnchor;
    this.pendingLayoutAnchor = void 0, this.items = t, this.pendingReconcile = r ? { previous: i, next: t, layoutAnchor: r } : { previous: i, next: t }, this.reconcileObservedRows(), this.scheduleCommit();
  }
  scrollToEnd(e = {}) {
    const t = this.viewport;
    if (!t || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0;
    const i = this.normalizeBehavior(e.behavior ?? "auto");
    return this.clearSettlingTimer(), this.mode = i === "smooth" ? "settling-jump" : "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), i), this.updateSnapshot(), i === "smooth" && (this.settlingTimer = globalThis.setTimeout(() => {
      if (this.settlingTimer = void 0, this.mode !== "settling-jump") return;
      this.mode = "following-bottom", this.commitModeAttribute();
      const r = this.viewport;
      r && this.hasLayout() && (this.performScroll(Math.max(0, r.scrollHeight - r.clientHeight), "auto"), this.scheduleCommit()), this.updateSnapshot();
    }, Ye)), !0;
  }
  scrollToMessage(e, t = {}) {
    const i = this.viewport, r = this.findRow(e);
    if (!i || !r || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "free-scrolling", this.commitModeAttribute();
    const o = i.getBoundingClientRect(), n = r.getBoundingClientRect(), l = i.scrollTop + n.top - o.top - me;
    return this.performScroll(Math.max(0, l), this.normalizeBehavior(t.behavior ?? "auto")), this.updateSnapshot(), !0;
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
    const t = this.viewport;
    if (!t || !this.content || !this.tailSpacer) return;
    if (!this.hasLayout()) {
      this.updateSnapshot();
      return;
    }
    if (e.next.length > 0 && !this.hasInitialPlacement) {
      this.hasInitialPlacement = !0, this.activeAnchorId = void 0, this.setTailHeight(0), this.mode = "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), "auto"), this.updateSnapshot();
      return;
    }
    this.isPrepend(e.previous, e.next) && e.layoutAnchor && this.restoreLayoutAnchor(e.layoutAnchor);
    const i = this.getAppendedItems(e.previous, e.next), r = [...i].reverse().find((o) => o.scrollAnchor);
    r ? this.startTurnAnchor(r.id) : i.length > 0 ? this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), "auto") : this.activeAnchorId ? this.reconcileActiveAnchor() : this.newItemCount += i.length : this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), "auto") : this.activeAnchorId && this.reconcileActiveAnchor(), this.updateSnapshot();
  }
  startTurnAnchor(e) {
    const t = this.viewport, i = this.findRow(e);
    if (!t || !i || !this.tailSpacer) return;
    this.activeAnchorId = e, this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "anchored-to-message", this.commitModeAttribute();
    const r = this.desiredScrollTop(i);
    this.setTailHeight(this.requiredTailHeight(r)), this.performScroll(r, "auto");
  }
  reconcileActiveAnchor() {
    const e = this.activeAnchorId ? this.findRow(this.activeAnchorId) : void 0;
    if (!e || !this.viewport) {
      this.activeAnchorId = void 0, this.setTailHeight(0);
      return;
    }
    const t = this.desiredScrollTop(e), i = this.requiredTailHeight(t);
    if (this.setTailHeight(i), this.mode === "anchored-to-message")
      if (i <= P)
        this.activeAnchorId = void 0, this.mode = "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, this.viewport.scrollHeight - this.viewport.clientHeight), "auto");
      else {
        const r = this.viewport.getBoundingClientRect(), o = e.getBoundingClientRect();
        Math.abs(o.top - r.top - me) > P && this.performScroll(t, "auto");
      }
    else i <= P && (this.activeAnchorId = void 0);
  }
  requiredTailHeight(e) {
    const t = this.viewport, i = this.tailSpacer;
    if (!t || !i) return 0;
    const r = t.getBoundingClientRect(), o = i.getBoundingClientRect(), n = t.scrollTop + o.top - r.top;
    return Math.max(0, e + t.clientHeight - n);
  }
  desiredScrollTop(e) {
    const t = this.viewport;
    if (!t) return 0;
    const i = t.getBoundingClientRect(), r = e.getBoundingClientRect();
    return Math.max(0, t.scrollTop + r.top - i.top - me);
  }
  restoreLayoutAnchor(e) {
    const t = this.viewport, i = this.findRow(e.id);
    if (!t || !i) return;
    const r = t.getBoundingClientRect(), n = i.getBoundingClientRect().top - r.top - e.viewportTop;
    Math.abs(n) <= P || (this.markProgrammaticScroll("auto"), t.scrollTop += n);
  }
  captureFirstVisible() {
    const e = this.viewport, t = this.content;
    if (!e || !t) return;
    const i = e.getBoundingClientRect();
    for (const r of t.querySelectorAll("[data-message-id]")) {
      const o = r.getBoundingClientRect();
      if (o.bottom > i.top + P && o.top < i.bottom - P)
        return { id: r.dataset.messageId ?? "", viewportTop: o.top - i.top };
    }
  }
  getAppendedItems(e, t) {
    if (e.length === 0) return t;
    const i = this.findSequenceStart(e, t);
    return i < 0 ? [] : t.slice(i + e.length);
  }
  isPrepend(e, t) {
    return e.length === 0 || t.length <= e.length ? !1 : this.findSequenceStart(e, t) > 0;
  }
  findSequenceStart(e, t) {
    if (e.length === 0) return 0;
    const i = t.length - e.length;
    for (let r = 0; r <= i; r += 1)
      if (e.every((o, n) => o.id === t[r + n]?.id)) return r;
    return -1;
  }
  releaseForUser() {
    this.clearProgrammaticTimer(), this.clearSettlingTimer(), this.programmaticScroll = !1, this.mode !== "free-scrolling" && (this.mode = "free-scrolling", this.commitModeAttribute(), this.updateSnapshot());
  }
  performScroll(e, t) {
    const i = this.viewport;
    if (!i) return;
    const r = Math.max(0, i.scrollHeight - i.clientHeight), o = Math.min(Math.max(0, e), r);
    this.markProgrammaticScroll(t), typeof i.scrollTo == "function" ? i.scrollTo({ top: o, behavior: t }) : i.scrollTop = o;
  }
  markProgrammaticScroll(e) {
    this.programmaticScroll = !0, this.clearProgrammaticTimer();
    const t = e === "smooth" ? Ye : 0;
    this.programmaticClearTimer = globalThis.setTimeout(() => {
      this.programmaticScroll = !1, this.programmaticClearTimer = void 0, this.updateSnapshot();
    }, t);
  }
  updateSnapshot() {
    const e = this.viewport, t = e ? {
      mode: this.mode,
      canScrollStart: e.scrollTop > ue,
      canScrollEnd: this.distanceToEnd(e) > ue,
      newItemCount: this.newItemCount
    } : {
      mode: this.mode,
      canScrollStart: !1,
      canScrollEnd: !1,
      newItemCount: this.newItemCount
    };
    t.mode === this.snapshot.mode && t.canScrollStart === this.snapshot.canScrollStart && t.canScrollEnd === this.snapshot.canScrollEnd && t.newItemCount === this.snapshot.newItemCount || (this.snapshot = t, this.host.requestUpdate());
  }
  distanceToEnd(e) {
    return Math.max(0, e.scrollHeight - e.clientHeight - e.scrollTop);
  }
  setTailHeight(e) {
    const t = this.tailSpacer;
    if (!t) return;
    const i = Math.max(0, e), r = Number.parseFloat(t.style.height || "0") || 0;
    Math.abs(r - i) <= P || (t.style.height = `${i}px`);
  }
  findRow(e) {
    if (this.content)
      return [...this.content.querySelectorAll("[data-message-id]")].find(
        (t) => t.dataset.messageId === e
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
    for (const t of this.observedRows)
      e.has(t) || this.resizeObserver.unobserve(t);
    for (const t of e)
      this.observedRows.has(t) || this.resizeObserver.observe(t);
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
function Ps(s) {
  const e = Cs(s.contact), t = Ts(s.environment.search), i = V({
    channel: "site_widget",
    page_url: s.environment.href,
    widget_instance_id: s.config.widgetInstanceId,
    page_title: s.environment.title,
    referrer_url: s.environment.referrer,
    utm: t
  }), r = V({
    locale: s.environment.locale,
    timezone: s.environment.timezone
  });
  return V({
    schema_version: "site_widget.v1",
    event_type: "site_widget.message_submitted",
    idempotency_key: s.idempotencyKey,
    submitted_at: s.environment.now,
    public_session_id: s.publicSessionId,
    source: i,
    contact: e && Object.keys(e).length > 0 ? e : void 0,
    message: {
      role: "visitor",
      text: s.text.trim()
    },
    visitor_context: Object.keys(r).length > 0 ? r : void 0,
    consent: s.privacyPolicyAccepted ? { privacy_policy: !0 } : void 0
  });
}
function Ts(s = "") {
  if (!s.trim()) return;
  const e = new URLSearchParams(s.startsWith("?") ? s.slice(1) : s), t = V({
    source: e.get("utm_source") ?? void 0,
    medium: e.get("utm_medium") ?? void 0,
    campaign: e.get("utm_campaign") ?? void 0,
    term: e.get("utm_term") ?? void 0,
    content: e.get("utm_content") ?? void 0
  });
  return Object.keys(t).length > 0 ? t : void 0;
}
function Cs(s) {
  if (s)
    return V({
      name: X(s.name),
      phone: X(s.phone),
      email: X(s.email),
      preferred_contact: s.preferred_contact,
      city: X(s.city)
    });
}
function X(s) {
  return s?.trim() || void 0;
}
function V(s) {
  for (const e of Object.keys(s)) {
    const t = s[e];
    (t == null || t === "" || typeof t == "object" && !Array.isArray(t) && Object.keys(t).length === 0) && delete s[e];
  }
  return s;
}
function ie({
  config: s,
  open: e = !1,
  now: t = /* @__PURE__ */ new Date()
}) {
  return {
    open: e,
    status: e ? "open_idle" : "closed",
    draft: "",
    contactPhone: "",
    contactCaptureOpen: !1,
    submitting: !1,
    pending: void 0,
    messages: [
      re({
        role: "assistant",
        text: s.introMessage,
        createdAt: t.toISOString()
      })
    ],
    visitorMessageCount: 0,
    unreadCount: 0
  };
}
function v(s, e, t) {
  const i = zs(s);
  switch (e.type) {
    case "open":
      return {
        ...i,
        open: !0,
        unreadCount: 0,
        status: et(i, t)
      };
    case "close":
      return { ...i, open: !1, status: "closed" };
    case "draft.changed": {
      const r = String(e.value ?? "");
      return {
        ...i,
        draft: r,
        status: i.open ? r.trim() ? "composing" : et(i, t) : i.status
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
      const r = String(e.text ?? "").trim(), o = String(e.idempotencyKey ?? "").trim();
      if (!r || !o) return i;
      const n = re({ role: "visitor", text: r, status: "pending" });
      return {
        ...i,
        open: !0,
        status: "submitted_waiting",
        submitting: !0,
        draft: "",
        pending: {
          messageId: n.id,
          text: r,
          idempotencyKey: o
        },
        visitorMessageCount: i.visitorMessageCount + 1,
        messages: [...i.messages, n]
      };
    }
    case "retry.started":
      return !i.pending || i.submitting ? i : {
        ...i,
        status: "submitted_waiting",
        submitting: !0,
        messages: i.messages.map(
          (r) => r.id === i.pending?.messageId ? { ...r, status: "pending" } : r
        )
      };
    case "visitor.persisted":
      return !i.pending || e.messageId && e.messageId !== i.pending.messageId ? i : {
        ...i,
        messages: i.messages.map(
          (r) => r.id === i.pending?.messageId ? { ...r, status: "sent" } : r
        )
      };
    case "assistant.replied": {
      const r = String(e.text ?? "").trim(), o = r ? [...i.messages, re({ role: "assistant", text: r, disclosure: !0 })] : i.messages;
      return Xe(i, o, "replied");
    }
    case "system.message": {
      const r = String(e.text ?? "").trim(), o = r ? [...i.messages, re({ role: "system", text: r, systemKind: e.status })] : i.messages;
      return Xe(i, o, e.status);
    }
    case "submit.failed": {
      if (!i.pending || e.messageId && e.messageId !== i.pending.messageId) return i;
      const r = i.messages.map(
        (o) => o.id === i.pending?.messageId ? { ...o, status: "error" } : o
      );
      return {
        ...i,
        status: "error",
        submitting: !1,
        messages: r
      };
    }
    case "session.cleared":
      return t ? ie({ config: t, open: i.open }) : { ...i, pending: void 0, submitting: !1 };
    default:
      return i;
  }
}
function ne(s, e) {
  const t = s.trim();
  return t ? t.length > e.maxMessageLength ? "message_too_long" : null : "empty_message";
}
function re({
  role: s,
  text: e,
  status: t = "sent",
  disclosure: i = !1,
  systemKind: r,
  createdAt: o = (/* @__PURE__ */ new Date()).toISOString()
}) {
  return {
    id: K("msg"),
    role: s,
    text: String(e ?? ""),
    status: t,
    disclosure: i,
    systemKind: r,
    createdAt: o
  };
}
function Xe(s, e, t) {
  return {
    ...s,
    status: t,
    submitting: !1,
    pending: void 0,
    messages: e,
    unreadCount: s.open ? s.unreadCount : s.unreadCount + 1
  };
}
function et(s, e) {
  const t = e ? ne(s.draft, e) : s.draft.trim() ? null : "empty_message";
  return s.submitting ? "submitted_waiting" : s.status === "error" ? "error" : s.status === "replied" || s.status === "fallback" || s.status === "disabled" ? s.status : s.draft.trim() && !t ? "composing" : "open_idle";
}
function zs(s) {
  return {
    ...s,
    draft: String(s.draft ?? ""),
    contactPhone: String(s.contactPhone ?? ""),
    submitting: !!s.submitting,
    messages: Array.isArray(s.messages) ? s.messages : [],
    visitorMessageCount: Number.isInteger(s.visitorMessageCount) ? s.visitorMessageCount : 0,
    unreadCount: Number.isInteger(s.unreadCount) ? s.unreadCount : 0
  };
}
function Rs(s, e) {
  const t = ne(s.draft, e), i = s.visitorMessageCount > 0;
  return {
    ...s,
    canSend: !s.submitting && !s.pending && !t,
    draftError: t,
    showQuickReplies: s.open && e.showQuickActions && e.quickReplies.length > 0 && !s.submitting && !i,
    showMobileActions: !s.open && e.showMobileActions && e.mobileActions.length > 0,
    showContactTrigger: !e.collectPhoneAfterFirstMessage || i,
    contactLabel: s.contactPhone ? e.phoneSavedLabel : e.phoneCaptureLabel,
    attachmentVisible: e.mock && e.attachmentsEnabled && e.showAttachmentSlot,
    attachmentDisabled: !1,
    status: s.status
  };
}
const tt = "granit-site-widget", st = "granit-widget", Ls = {
  opened: "open",
  closed: "close",
  "response-received": "response"
};
function S(s, e, t, i = {}) {
  const r = Us(i, t);
  ee(s, `${tt}:${e}`, r), ee(s, `${st}:${e}`, r);
  const o = Ls[e];
  o && (ee(s, `${tt}:${o}`, r), ee(s, `${st}:${o}`, r));
}
function Us(s, e) {
  const t = {
    ...s,
    widgetInstanceId: s.widgetInstanceId ?? e.widgetInstanceId
  };
  if (typeof t.publicSessionId == "string") {
    const i = t.publicSessionId.trim();
    i && (t.publicSessionIdHash = us(i)), delete t.publicSessionId;
  }
  return e.includeMessageTextInEvents || (typeof t.messageText == "string" && (t.messageLength = t.messageText.length), delete t.messageText), t;
}
function ee(s, e, t) {
  s.dispatchEvent(
    new CustomEvent(e, {
      bubbles: !0,
      composed: !0,
      detail: t
    })
  );
}
function Os(s = /* @__PURE__ */ new Date()) {
  return {
    href: typeof window > "u" ? "" : window.location.href,
    search: typeof window > "u" ? "" : window.location.search,
    title: typeof document > "u" ? void 0 : document.title || void 0,
    referrer: typeof document > "u" ? void 0 : document.referrer || void 0,
    locale: typeof navigator > "u" ? void 0 : navigator.language || void 0,
    timezone: Bs(),
    now: s.toISOString()
  };
}
function Bs() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return;
  }
}
const qs = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function Q(s) {
  if (typeof s != "string") return;
  const e = s.trim().toLowerCase();
  return qs.test(e) ? e : void 0;
}
function Hs(s, e) {
  const t = F(s) ?? {}, i = F(t.automation) ?? {}, r = _(i.status), o = Q(t.public_session_id) ?? Q(F(t.session)?.public_session_id) ?? Q(t.publicSessionId);
  if (r === "replied") {
    const n = F(i.reply) ?? F(t.reply) ?? {}, l = ge(n.persisted) ?? ge(n.is_persisted) ?? ge(i.reply_persisted), a = _(n.text) ?? _(n.body) ?? _(i.persisted_text);
    return a && l !== !1 ? {
      status: "replied",
      publicSessionId: o,
      replyText: a,
      reason: _(i.reason),
      raw: s
    } : {
      status: "fallback",
      publicSessionId: o,
      systemText: fe(i, e.fallbackMessage),
      reason: _(i.reason),
      raw: s
    };
  }
  return r === "disabled" ? {
    status: "disabled",
    publicSessionId: o,
    systemText: fe(i, e.disabledMessage),
    reason: _(i.reason),
    raw: s
  } : r === "fallback" ? {
    status: "fallback",
    publicSessionId: o,
    systemText: fe(i, e.fallbackMessage),
    reason: _(i.reason),
    raw: s
  } : {
    status: "fallback",
    publicSessionId: o,
    systemText: e.fallbackMessage,
    raw: s
  };
}
function fe(s, e) {
  return _(s.message) ?? _(s.display_message) ?? e;
}
function F(s) {
  if (typeof s == "object" && s !== null && !Array.isArray(s))
    return s;
}
function _(s) {
  return typeof s != "string" ? void 0 : s.trim() || void 0;
}
function ge(s) {
  if (typeof s == "boolean") return s;
  if (typeof s != "string") return;
  const e = s.trim().toLowerCase();
  if (e === "true" || e === "1" || e === "yes") return !0;
  if (e === "false" || e === "0" || e === "no") return !1;
}
async function Ns(s, e, t) {
  if (t?.aborted) throw new DOMException("Aborted", "AbortError");
  if (s.mock) return Ds(s, e, t);
  if (!s.apiBaseUrl) throw new Error("apiBaseUrl is required when mock=false");
  const i = new AbortController(), r = globalThis.setTimeout(() => i.abort(), s.timeoutMs), o = () => i.abort();
  t?.aborted ? i.abort() : t?.addEventListener("abort", o, { once: !0 });
  try {
    const n = await fetch(`${s.apiBaseUrl}${s.messagesPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(e),
      credentials: "omit",
      signal: i.signal
    }), l = await Fs(n);
    if (!n.ok)
      throw new Error(js(l) ?? `Widget request failed with HTTP ${n.status}`);
    const a = Hs(l, s);
    if (!a.publicSessionId)
      throw new Error("Widget response is missing a valid public_session_id");
    return a;
  } finally {
    globalThis.clearTimeout(r), t?.removeEventListener("abort", o);
  }
}
async function Ds(s, e, t) {
  await Ws(350, t);
  const i = e.message.text.toLowerCase();
  return i.includes("менеджер") || i.includes("позвон") ? {
    status: "fallback",
    publicSessionId: e.public_session_id,
    systemText: "Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",
    reason: "manager_requested",
    raw: { mock: !0 }
  } : i.includes("сто") || i.includes("цен") || i.includes("расчет") || i.includes("расчёт") ? {
    status: "replied",
    publicSessionId: e.public_session_id,
    replyText: "Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",
    raw: { mock: !0 }
  } : {
    status: "replied",
    publicSessionId: e.public_session_id,
    replyText: "Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",
    raw: { mock: !0 }
  };
}
async function Fs(s) {
  if ((s.headers.get("content-type") ?? "").includes("application/json")) return s.json();
  const t = await s.text();
  return t ? { message: t } : void 0;
}
function js(s) {
  if (!s || typeof s != "object" || Array.isArray(s)) return;
  const e = s;
  return typeof e.message == "string" ? e.message : typeof e.error == "string" ? e.error : void 0;
}
function Ws(s, e) {
  return e?.aborted ? Promise.reject(new DOMException("Aborted", "AbortError")) : new Promise((t, i) => {
    const r = globalThis.setTimeout(() => {
      e?.removeEventListener("abort", o), t();
    }, s), o = () => {
      globalThis.clearTimeout(r), i(new DOMException("Aborted", "AbortError"));
    };
    e?.addEventListener("abort", o, { once: !0 });
  });
}
function it(s, e = "local") {
  const t = `sw:${s}:public_session_id`, i = `sw:${s}:open_state`, r = `sw:${s}:panel_size`, o = e === "memory" ? void 0 : Vs();
  let n = "", l, a;
  return {
    getPublicSessionId() {
      const c = be(o, t), h = Q(c || n);
      return h ? (n = h, c && c !== h && te(o, t, h), h) : (n = "", c && rt(o, t), "");
    },
    setPublicSessionId(c) {
      const h = Q(c);
      h && (n = h, te(o, t, h));
    },
    clearPublicSessionId() {
      n = "", rt(o, t);
    },
    getOpenState() {
      const c = be(o, i);
      return c === "open" ? !0 : c === "closed" ? !1 : l;
    },
    setOpenState(c) {
      l = c, te(o, i, c ? "open" : "closed");
    },
    getPanelSize() {
      const c = be(o, r);
      return Ks(c) ? c : a;
    },
    setPanelSize(c) {
      a = c, te(o, r, c);
    }
  };
}
function Ks(s) {
  return s === "normal" || s === "wide" || s === "fullscreen";
}
function Vs() {
  try {
    return typeof window > "u" ? void 0 : window.localStorage;
  } catch {
    return;
  }
}
function be(s, e) {
  try {
    return s?.getItem(e) || void 0;
  } catch {
    return;
  }
}
function te(s, e, t) {
  try {
    s?.setItem(e, t);
  } catch {
  }
}
function rt(s, e) {
  try {
    s?.removeItem(e);
  } catch {
  }
}
const Qs = ht`
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
`, Gs = ht`
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
`;
function y(s, e = 22) {
  const t = {
    width: e,
    height: e
  };
  switch (s) {
    case "send":
      return $(t, x`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);
    case "phone":
      return $(
        t,
        x`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`
      );
    case "calculator":
      return $(
        t,
        x`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`
      );
    case "close":
      return $(t, x`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);
    case "minus":
      return $(t, x`<path d="M5 12h14" />`);
    case "paperclip":
      return $(t, x`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);
    case "shield":
      return $(
        t,
        x`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`
      );
    case "brand":
      return $(t, x`<path d="m8 3 4 8 5-5 5 15H2Z" />`);
    case "plus":
      return $(t, x`<path d="M5 12h14" /><path d="M12 5v14" />`);
    case "maximize-2":
    case "expand":
      return $(t, x`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);
    case "minimize-2":
    case "shrink":
      return $(t, x`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);
    case "spark":
      return $(
        t,
        x`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`
      );
    case "loader":
      return $(t, x`<path d="M21 12a9 9 0 1 1-2.64-6.36" />`);
    case "message":
    default:
      return $(t, x`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`);
  }
}
function $(s, e) {
  return x`<svg
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
  </svg>`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zs = bt(class extends vt {
  constructor() {
    super(...arguments), this.key = u;
  }
  render(s, e) {
    return this.key = s, e;
  }
  update(s, [e, t]) {
    return e !== this.key && (wt(s), this.key = e), t;
  }
}), Js = "image/jpeg,image/png,image/webp", ot = "Добавить фото";
function Ys({
  label: s = ot,
  disabled: e = !1,
  onFilesSelected: t
}) {
  const i = s.trim() || ot;
  return g`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${i}
      aria-label=${i}
      ?disabled=${e}
      @click=${ti}
    >
      ${y("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${Js}
      multiple
      hidden
      ?disabled=${e}
      @change=${(r) => si(r, t)}
    />
  `;
}
function Xs({
  attachments: s,
  validationMessage: e = "",
  validationRevision: t = 0,
  onRemove: i
}) {
  const r = e.trim();
  return g`
    ${r ? Zs(
    t,
    g`<p class="attachment-validation" role="alert" data-validation-revision=${t}>
            ${r}
          </p>`
  ) : u}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${ii(s.length)}
    </span>
    ${s.length > 0 ? g`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${s.map((o, n) => {
    const l = n + 1;
    return g`
                <li class="attachment" part="attachment">
                  <img
                    class="attachment__preview"
                    part="attachment-preview"
                    src=${o.previewUrl}
                    alt=""
                    width=${ae(o.width)}
                    height=${ae(o.height)}
                    decoding="async"
                  />
                  <span class="attachment__details">
                    <span class="attachment__label">Фото ${l}</span>
                    <span class="attachment__size">${ri(o.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${o.id}
                    type="button"
                    aria-label=${`Удалить фото ${l}`}
                    @click=${() => i(o.id)}
                  >
                    ${y("close", 18)}
                  </button>
                </li>
              `;
  })}
          </ul>
        ` : u}
  `;
}
function ei(s) {
  return s.length === 0 ? u : g`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${s.map(
    (e, t) => g`
          <li class="message-attachment" part="attachment">
            <img
              class="message-attachment__preview"
              part="attachment-preview"
              src=${e.previewUrl}
              alt=${`Фото ${t + 1}`}
              width=${ae(e.width)}
              height=${ae(e.height)}
              decoding="async"
            />
          </li>
        `
  )}
    </ul>
  `;
}
function ti(s) {
  const e = s.currentTarget;
  if (!(e instanceof HTMLButtonElement)) return;
  const t = e.nextElementSibling;
  t instanceof HTMLInputElement && !t.disabled && t.click();
}
function si(s, e) {
  const t = s.currentTarget;
  if (!(t instanceof HTMLInputElement)) return;
  const i = t.files ? Array.from(t.files) : [];
  t.value = "", i.length > 0 && e(i);
}
function ii(s) {
  return `Выбрано фото: ${s}`;
}
function ri(s) {
  const e = Math.max(0, Math.floor(s));
  return e < 1024 ? `${e} Б` : e < 1024 * 1024 ? `${nt(e / 1024)} КБ` : `${nt(e / (1024 * 1024))} МБ`;
}
function nt(s) {
  const e = s >= 10 ? 0 : 1;
  return s.toFixed(e).replace(".", ",");
}
function ae(s) {
  return Math.max(1, Math.floor(s));
}
function oi(s, e) {
  return s.role === "system" ? hi(s) : ni(s, e);
}
function ni(s, e) {
  return g`<div
    class=${`message-root message-root--${s.role}`}
    part="message-root"
    data-message-id=${s.id}
  >
    ${ai(s, e)} ${li(s, e)}
  </div>`;
}
function ai(s, e) {
  return g`<article class=${di(s)} part=${`message message-${s.role} message-bubble`}>
    <p class="message__text">${s.text}</p>
    ${ei(e.images ?? [])}
  </article>`;
}
function li(s, e) {
  const t = s.status === "pending" || s.status === "error";
  return !s.disclosure && !t ? u : g`<div class="message-meta" part="message-meta">
    ${s.disclosure ? g`<div class="message-disclosure" part="message-disclosure">
          ${y("spark", 16)}
          <span>${e.config.disclosureText}</span>
        </div>` : u}
    ${t ? g`<div class=${`message-status-row message-status-row--${s.status}`}>
          <span class="message-status" part="message-status">
            ${s.status === "pending" ? g`<span class="message-status__spinner" aria-hidden="true">${y("loader", 14)}</span
                  >Отправляем…` : "Не отправлено"}
          </span>
          ${ci(s, e)}
        </div>` : u}
  </div>`;
}
function ci(s, e) {
  return s.status !== "error" ? u : g`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${() => e.onRetry(s.id)}
    >
      ${e.config.retryLabel}
    </button>
  </div>`;
}
function hi(s) {
  return g`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${s.id}
    data-system-kind=${s.systemKind ?? "fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${y("shield", 16)}</span>
    <span class="marker__text" part="marker-text">${s.text}</span>
  </div>`;
}
function di(s) {
  const e = ["message", `message--${s.role}`];
  return s.status === "error" && e.push("message--error"), e.join(" ");
}
const yt = "granit-site-widget", pi = ["normal", "wide", "fullscreen"], ui = ["normal", "fullscreen"], mi = {
  normal: "обычный размер",
  wide: "широкий режим",
  fullscreen: "на весь экран"
}, ke = class ke extends W {
  constructor() {
    super(...arguments), this.config = $e(), this.state = ie({ config: this.config }), this.panelSize = "normal", this.hasBooted = !1, this.publicSessionId = "", this.operationEpoch = 0, this.messageScroller = new ks(this), this.imageAttachments = new As(this), this.sendMessageRequest = Ns, this.panelId = K("sw-panel"), this.titleId = K("sw-title"), this.phoneCaptureId = K("sw-phone"), this.cyclePanelSize = () => {
      this.panelSize = this.getNextPanelSize(), this.sessionStore?.setPanelSize(this.panelSize), this.requestUpdate();
    }, this.handleSubmit = (e) => {
      e.preventDefault(), this.submitDraft();
    }, this.handleInput = (e) => {
      const t = e.currentTarget;
      this.state = v(this.state, { type: "draft.changed", value: t.value }, this.config), this.requestUpdate();
    }, this.handleTextareaKeydown = (e) => {
      e.key === "Enter" && !e.shiftKey && (e.preventDefault(), this.submitDraft());
    }, this.handlePanelKeydown = (e) => {
      e.key === "Escape" && (e.preventDefault(), this.close());
    }, this.handleQuickReplyFocus = (e) => {
      const t = e.currentTarget;
      t instanceof HTMLElement && typeof t.scrollIntoView == "function" && t.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
    }, this.toggleContactCapture = () => {
      this.state = v(this.state, { type: "contact.capture.toggled" }, this.config), this.requestUpdate(), this.updateComplete.then(() => this.renderRoot.querySelector(".phone-field")?.focus());
    }, this.handlePhoneInput = (e) => {
      const t = e.currentTarget.value;
      this.state = { ...this.state, contactPhone: t };
    }, this.handlePhoneKeydown = (e) => {
      e.key === "Enter" && (e.preventDefault(), this.savePhone());
    }, this.savePhone = () => {
      const e = this.state.contactPhone.trim();
      this.state = v(this.state, { type: "contact.phone.saved", phone: e }, this.config), S(this, "phone-saved", this.config, { hasPhone: e.length > 0 }), this.requestUpdate();
    }, this.retryPending = async (e) => {
      if (!this.state.pending || this.state.submitting || e && e !== this.state.pending.messageId) return;
      const t = this.state.pending, i = this.operationEpoch;
      this.state = v(this.state, { type: "retry.started" }, this.config), this.requestUpdate(), await this.sendPending(t, i);
    }, this.handleAttachmentFiles = async (e) => {
      this.isPhotoPreviewEnabled() && await this.imageAttachments.selectFiles(e);
    }, this.handleRemoveAttachment = (e) => {
      const t = this.imageAttachments.removeDraft(e);
      this.updateComplete.then(() => {
        (t ? [...this.renderRoot.querySelectorAll("[data-attachment-id]")].find(
          (r) => r.dataset.attachmentId === t
        ) : this.renderRoot.querySelector(".attach-button"))?.focus();
      });
    };
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...At];
  }
  connectedCallback() {
    const e = this.hasBooted;
    super.connectedCallback(), this.boot(), e && this.requestUpdate();
  }
  disconnectedCallback() {
    this.invalidateActiveWork(!0), super.disconnectedCallback();
  }
  attributeChangedCallback(e, t, i) {
    if (t === i || !this.hasBooted) return;
    const r = this.config, o = this.isPhotoPreviewEnabled();
    this.config = Te(this), this.syncHostAttributes();
    const n = this.isPhotoPreviewEnabled(), l = r.widgetInstanceId !== this.config.widgetInstanceId || r.storage !== this.config.storage, a = r.apiBaseUrl !== this.config.apiBaseUrl || r.messagesPath !== this.config.messagesPath || r.timeoutMs !== this.config.timeoutMs || r.mock !== this.config.mock, c = o !== n;
    if (l) {
      const h = this.state.open;
      this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.sessionStore = it(this.config.widgetInstanceId, this.config.storage), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.state = ie({ config: this.config, open: h });
    } else (a || c) && this.invalidateActiveWork(!0);
    this.imageAttachments.setEnabled(n), e === "panel-size" && (this.panelSize = this.config.panelSize), e === "open" && (this.state = v(this.state, this.hasAttribute("open") ? { type: "open" } : { type: "close" }, this.config)), this.requestUpdate();
  }
  open() {
    this.boot(), this.state = v(this.state, { type: "open" }, this.config), this.hasAttribute("open") || this.setAttribute("open", ""), this.persistOpenState(!0), S(this, "opened", this.config), this.requestUpdate(), this.focusInputSoon();
  }
  close() {
    this.boot(), this.state = v(this.state, { type: "close" }, this.config), this.hasAttribute("open") && this.removeAttribute("open"), this.persistOpenState(!1), S(this, "closed", this.config), this.requestUpdate(), this.focusLauncherSoon();
  }
  sendMessage(e) {
    this.boot(), this.state = v(this.state, { type: "draft.changed", value: e }, this.config), this.submitDraft();
  }
  clearSession() {
    this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.state = v(this.state, { type: "session.cleared" }, this.config), this.sessionStore?.clearPublicSessionId(), this.publicSessionId = this.sessionStore?.getPublicSessionId() ?? "", this.requestUpdate();
  }
  render() {
    const e = Rs(this.state, this.config), t = this.getEffectivePanelSize(), i = this.getPanelSizeButtonLabel(), r = t === "fullscreen" ? "minimize-2" : "maximize-2", o = this.messageScroller.getSnapshot(), n = this.isPhotoPreviewEnabled(), l = this.imageAttachments.isProcessing(), a = e.pending ? e.messages.find((h) => h.id === e.pending?.messageId) : void 0, c = a?.status === "error" ? this.config.errorMessage : a?.status === "pending" ? "Отправляем сообщение." : "";
    return g`
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
        <span part="launcher-icon" aria-hidden="true">${y("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${e.unreadCount > 0 ? g`<span class="launcher__badge" aria-label=${`${e.unreadCount} новых сообщений`}
              >${e.unreadCount}</span
            >` : u}
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
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${y("brand", 24)}</div>
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
              ${y(r)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${() => this.close()}
            >
              ${y("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${() => this.close()}
            >
              ${y("close")}
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
                ${ds(
      e.messages,
      (h) => h.id,
      (h) => g`<div
                    class="message-scroller__item"
                    data-message-id=${h.id}
                    data-scroll-anchor=${h.role === "visitor" ? "true" : u}
                  >
                    ${oi(h, {
        config: this.config,
        onRetry: this.retryPending,
        images: this.imageAttachments.getForMessage(h.id)
      })}
                  </div>`
    )}
                <div class="message-scroller__tail" aria-hidden="true"></div>
              </div>
            </div>
            ${o.canScrollEnd ? g`<button
                  class="jump-latest"
                  part="jump-latest"
                  type="button"
                  @click=${() => this.messageScroller.scrollToEnd({ behavior: "smooth" })}
                >
                  ${o.newItemCount > 0 ? "Новые сообщения" : "К новым сообщениям"}
                </button>` : u}
          </div>

          ${e.showQuickReplies ? g`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(
      (h) => g`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${() => this.handleQuickReply(h.text ?? h.value ?? h.label)}
                    @focus=${this.handleQuickReplyFocus}
                  >
                    ${h.label}
                  </button>`
    )}
              </div>` : u}
        </div>

        <div class="composer-shell" part="composer-shell">
          ${n ? Xs({
      attachments: this.imageAttachments.getDraft(),
      validationMessage: this.imageAttachments.getValidationMessage(),
      validationRevision: this.imageAttachments.getValidationRevision(),
      onRemove: this.handleRemoveAttachment
    }) : u}
          <form
            class="composer"
            part="composer"
            data-attachments=${String(n)}
            @submit=${this.handleSubmit}
          >
            ${n ? Ys({
      label: this.config.attachLabel,
      disabled: l || e.submitting || !!e.pending,
      onFilesSelected: this.handleAttachmentFiles
    }) : u}
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
              ?disabled=${!e.canSend || l}
            >
              ${y("send")}
            </button>
          </form>

          ${e.showContactTrigger ? g`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  aria-expanded=${String(e.contactCaptureOpen)}
                  aria-controls=${this.phoneCaptureId}
                  @click=${this.toggleContactCapture}
                >
                  ${y("plus", 18)}
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
              </div>` : u}

          <div class="footer-note" part="footer-note">
            <span aria-hidden="true">${y("shield", 18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${c}</div>
        </div>
      </section>
    `;
  }
  updated() {
    this.autoGrowTextarea();
    const e = this.renderRoot.querySelector(".message-scroller"), t = this.renderRoot.querySelector(".message-viewport"), i = this.renderRoot.querySelector(".messages"), r = this.renderRoot.querySelector(".message-scroller__tail");
    e && t && i && r && (this.messageScroller.connect({ root: e, viewport: t, content: i, tailSpacer: r }), this.messageScroller.reconcile(
      this.state.messages.map((o) => ({ id: o.id, scrollAnchor: o.role === "visitor" }))
    ));
  }
  boot() {
    if (this.hasBooted) return;
    this.config = Te(this), this.syncHostAttributes(), this.sessionStore = it(this.config.widgetInstanceId, this.config.storage), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());
    const e = this.config.persistOpenState ? this.sessionStore.getOpenState() : void 0, t = this.hasAttribute("open") || (e ?? this.config.initialState === "open");
    this.state = ie({ config: this.config, open: t }), t && !this.hasAttribute("open") && this.setAttribute("open", ""), this.hasBooted = !0, this.updateComplete.then(() => {
      S(this, "ready", this.config), t && this.focusInputSoon();
    });
  }
  syncHostAttributes() {
    this.getAttribute("theme") !== this.config.theme && this.setAttribute("theme", this.config.theme), this.getAttribute("position") !== this.config.position && this.setAttribute("position", this.config.position);
  }
  persistOpenState(e) {
    this.config.persistOpenState && this.sessionStore?.setOpenState(e);
  }
  getPanelSizeButtonLabel() {
    return `${this.config.resizeLabel}: ${mi[this.getNextPanelSize()]}`;
  }
  getNextPanelSize() {
    const e = this.getPanelSizeOrder(), t = e.includes(this.panelSize) ? this.panelSize : "normal", i = e.indexOf(t);
    return e[(i + 1) % e.length] ?? "normal";
  }
  getEffectivePanelSize() {
    return this.isMobileViewport() && this.panelSize === "wide" ? "normal" : this.panelSize;
  }
  getPanelSizeOrder() {
    return this.isMobileViewport() ? ui : pi;
  }
  isMobileViewport() {
    return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 767px)").matches;
  }
  handleQuickReply(e) {
    S(this, "action-clicked", this.config, { actionType: "quick-reply" }), this.state = v(this.state, { type: "draft.changed", value: e }, this.config), this.requestUpdate(), this.config.quickReplySubmit === "auto" ? this.submitDraft() : this.focusInputSoon();
  }
  renderMobileActions(e) {
    return e ? g`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map((t) => this.renderMobileAction(t))}
    </nav>` : u;
  }
  renderMobileAction(e) {
    const t = e.icon ?? e.type;
    return e.type === "call" || e.type === "link" ? g`<a
        class="mobile-action"
        part="mobile-action"
        href=${e.href}
        target=${e.type === "link" ? e.target ?? "_blank" : "_self"}
        rel=${e.type === "link" && e.target !== "_self" ? "noopener noreferrer" : ""}
        @click=${() => S(this, "action-clicked", this.config, { actionType: e.type })}
      >
        ${y(t, 20)}
        <span>${e.label}</span>
      </a>` : g`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${() => this.handleMobileAction(e)}
    >
      ${y(t, 20)}
      <span>${e.label}</span>
    </button>`;
  }
  handleMobileAction(e) {
    S(this, "action-clicked", this.config, { actionType: e.type }), this.open(), e.type === "prefill" && (this.state = v(this.state, { type: "draft.changed", value: e.text }, this.config), this.requestUpdate(), this.focusInputSoon());
  }
  async submitDraft() {
    if (!this.isConnected) return;
    const e = this.operationEpoch;
    let t = this.state.draft.trim();
    if (ne(t, this.config) || this.state.submitting || this.state.pending || this.isPhotoPreviewEnabled() && this.imageAttachments.isProcessing() && (await this.imageAttachments.whenIdle(), e !== this.operationEpoch || !this.isConnected || (t = this.state.draft.trim(), ne(t, this.config) || this.state.submitting || this.state.pending)) || e !== this.operationEpoch || !this.isConnected) return;
    const i = ps(this.publicSessionId);
    this.state = v(this.state, { type: "submit.started", text: t, idempotencyKey: i }, this.config);
    const r = this.state.pending;
    !r || r.idempotencyKey !== i || (this.isPhotoPreviewEnabled() && this.imageAttachments.transferDraftToMessage(r.messageId), this.requestUpdate(), await this.sendPending(r, e));
  }
  async sendPending(e, t) {
    this.abortController?.abort();
    const i = new AbortController();
    this.abortController = i;
    const { messageId: r, text: o, idempotencyKey: n } = e, l = () => this.operationEpoch === t && this.abortController === i && !i.signal.aborted && this.isConnected && this.state.pending?.messageId === r && this.state.pending.idempotencyKey === n;
    try {
      const a = Ps({
        config: this.config,
        text: o,
        publicSessionId: this.publicSessionId,
        idempotencyKey: n,
        contact: this.buildContact(),
        environment: Os()
      });
      if (S(this, "message-submitted", this.config, {
        idempotencyKey: n,
        publicSessionId: this.publicSessionId,
        messageText: o
      }), !l()) return;
      const c = await this.sendMessageRequest(this.config, a, i.signal);
      if (!l()) return;
      if (c.publicSessionId && (this.publicSessionId = c.publicSessionId, this.sessionStore?.setPublicSessionId(c.publicSessionId)), this.state = v(this.state, { type: "visitor.persisted", text: o, messageId: r }, this.config), c.status === "replied" && c.replyText)
        this.state = v(this.state, { type: "assistant.replied", text: c.replyText }, this.config);
      else {
        const h = c.status === "disabled" ? "disabled" : "fallback";
        this.state = v(
          this.state,
          { type: "system.message", text: c.systemText || this.config.fallbackMessage, status: h },
          this.config
        ), S(this, "fallback-shown", this.config, {
          status: h,
          reason: c.reason ?? ""
        });
      }
      S(this, "response-received", this.config, {
        status: c.status,
        reason: c.reason ?? ""
      }), this.requestUpdate();
    } catch (a) {
      if (a instanceof DOMException && a.name === "AbortError" && i.signal.aborted || !l()) return;
      this.state = v(
        this.state,
        { type: "submit.failed", text: this.config.errorMessage, messageId: r },
        this.config
      ), S(this, "error", this.config, {
        errorMessage: a instanceof Error ? a.message : String(a)
      }), this.requestUpdate();
    } finally {
      this.abortController === i && (this.abortController = void 0);
    }
  }
  invalidateActiveWork(e) {
    this.operationEpoch += 1;
    const t = this.abortController;
    this.abortController = void 0, t?.abort(), e && this.state.pending && this.state.submitting && (this.state = v(
      this.state,
      { type: "submit.failed", text: this.config.errorMessage, messageId: this.state.pending.messageId },
      this.config
    ));
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
ke.styles = [Gs, Qs];
let ye = ke;
function fi(s = yt) {
  typeof window > "u" || !window.customElements || window.customElements.get(s) || window.customElements.define(s, ye);
}
function xi(s = {}) {
  if (typeof document > "u")
    throw new Error("mountSiteWidget requires a browser document");
  fi();
  const e = document.createElement(yt);
  Et(e, s);
  const t = s.target ?? document.body;
  if (!t) throw new Error("mountSiteWidget target was not found");
  return t.appendChild(e), e;
}
export {
  ye as GranitSiteWidgetElement,
  yt as SITE_WIDGET_TAG_NAME,
  fi as defineSiteWidget,
  xi as mountSiteWidget
};
//# sourceMappingURL=index.js.map

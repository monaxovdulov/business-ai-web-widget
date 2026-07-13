const $t = [
  { label: "Нужен расчет", text: "Нужен расчет памятника с установкой" },
  { label: "Есть вопрос", text: "Здравствуйте, у меня есть вопрос по заказу" },
  { label: "Хочу каталог", text: "Хочу посмотреть каталог памятников" }
], At = [
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
  mobileActions: At
}, ct = {
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
}, _t = [
  ...Object.keys(ct),
  "config",
  "quick-replies",
  "mobile-actions",
  "open"
], Mt = /* @__PURE__ */ new Set([
  "mock",
  "persistOpenState",
  "showQuickActions",
  "showMobileActions",
  "showAttachmentSlot",
  "attachmentsEnabled",
  "collectPhoneAfterFirstMessage",
  "includeMessageTextInEvents"
]), Et = /* @__PURE__ */ new Set(["timeoutMs", "maxMessageLength"]);
function $e(i = {}) {
  const e = { ...R, ...i }, t = Re(e.timeoutMs, R.timeoutMs, 6e4), s = Re(e.maxMessageLength, R.maxMessageLength, 1e4);
  return {
    ...e,
    apiBaseUrl: qt(w(e.apiBaseUrl)),
    messagesPath: Bt(e.messagesPath),
    timeoutMs: t,
    widgetInstanceId: w(e.widgetInstanceId) || R.widgetInstanceId,
    theme: w(e.theme) || R.theme,
    position: zt(e.position),
    panelSize: Rt(e.panelSize),
    mock: !!e.mock,
    initialState: Lt(e.initialState),
    persistOpenState: !!e.persistOpenState,
    storage: Ut(e.storage),
    quickReplySubmit: Ot(e.quickReplySubmit),
    showQuickActions: !!e.showQuickActions,
    showMobileActions: !!e.showMobileActions,
    showAttachmentSlot: !!e.showAttachmentSlot,
    attachmentsEnabled: !!e.attachmentsEnabled,
    collectPhoneAfterFirstMessage: !!e.collectPhoneAfterFirstMessage,
    includeMessageTextInEvents: !!e.includeMessageTextInEvents,
    maxMessageLength: s,
    phoneHref: U(e.phoneHref),
    privacyUrl: U(e.privacyUrl),
    quickReplies: ve(e.quickReplies),
    mobileActions: we(e.mobileActions, e.phoneHref)
  };
}
function ze(i) {
  const e = {
    ...Tt(i),
    ...ht(i.getAttribute("config"))
  };
  for (const [t, s] of Object.entries(ct)) {
    if (!i.hasAttribute(t)) continue;
    const r = i.getAttribute(t);
    r != null && (Mt.has(s) ? e[s] = Ct(r) : Et.has(s) ? e[s] = Number(r) : e[s] = r);
  }
  return i.hasAttribute("quick-replies") && (e.quickReplies = kt(i.getAttribute("quick-replies") ?? "")), i.hasAttribute("mobile-actions") && (e.mobileActions = Pt(i.getAttribute("mobile-actions") ?? "")), $e(e);
}
function It(i, e = {}) {
  const t = $e(e);
  p(i, "api-base-url", t.apiBaseUrl), p(i, "messages-path", t.messagesPath), p(i, "timeout-ms", String(t.timeoutMs)), p(i, "widget-instance-id", t.widgetInstanceId), p(i, "theme", t.theme), p(i, "position", t.position), p(i, "panel-size", t.panelSize), p(i, "initial-state", t.initialState), p(i, "storage", t.storage), p(i, "quick-reply-submit", t.quickReplySubmit), p(i, "launcher-label", t.launcherLabel), p(i, "header-title", t.headerTitle), p(i, "header-status", t.headerStatus), p(i, "header-response-time", t.headerResponseTime), p(i, "intro-message", t.introMessage), p(i, "placeholder", t.placeholder), p(i, "disclosure-text", t.disclosureText), p(i, "footer-note", t.footerNote), p(i, "phone-capture-label", t.phoneCaptureLabel), p(i, "phone-saved-label", t.phoneSavedLabel), p(i, "phone-placeholder", t.phonePlaceholder), p(i, "fallback-message", t.fallbackMessage), p(i, "disabled-message", t.disabledMessage), p(i, "error-message", t.errorMessage), p(i, "retry-label", t.retryLabel), p(i, "send-label", t.sendLabel), p(i, "attach-label", t.attachLabel), p(i, "resize-label", t.resizeLabel), p(i, "close-label", t.closeLabel), p(i, "minimize-label", t.minimizeLabel), p(i, "phone-href", t.phoneHref), p(i, "privacy-url", t.privacyUrl), p(i, "max-message-length", String(t.maxMessageLength)), H(i, "mock", t.mock), H(i, "persist-open-state", t.persistOpenState), p(i, "show-quick-actions", String(t.showQuickActions)), p(i, "show-mobile-actions", String(t.showMobileActions)), p(i, "show-attachment-slot", String(t.showAttachmentSlot)), H(i, "attachments-enabled", t.attachmentsEnabled), H(i, "collect-phone-after-first-message", t.collectPhoneAfterFirstMessage), H(i, "include-message-text-in-events", t.includeMessageTextInEvents), (e.open || t.initialState === "open") && i.setAttribute("open", ""), t.quickReplies.length > 0 && i.setAttribute("quick-replies", JSON.stringify(t.quickReplies)), t.mobileActions.length > 0 && i.setAttribute("mobile-actions", JSON.stringify(t.mobileActions));
  for (const [s, r] of Object.entries(e.attributes ?? {}))
    i.setAttribute(s, r);
}
function kt(i) {
  const e = i.trim();
  if (!e) return [];
  const t = Ae(e);
  return Array.isArray(t) ? ve(t) : ve(
    e.split("|").map((s) => ({ label: s.trim(), text: s.trim() })).filter((s) => s.label)
  );
}
function Pt(i) {
  const e = i.trim();
  if (!e) return [];
  const t = Ae(e);
  return Array.isArray(t) ? we(t) : we(
    e.split("|").map((s) => ({ type: "open", label: s.trim() })).filter((s) => s.label)
  );
}
function ve(i = []) {
  return i.map((e) => {
    const t = w(e?.label), s = w(e?.text ?? e?.value ?? e?.label);
    return { label: t, text: s };
  }).filter((e) => e.label.length > 0 && e.text.length > 0).slice(0, 6);
}
function we(i = [], e) {
  return i.map((t) => {
    const s = w(t?.label);
    if (s) {
      if (t.type === "call") {
        const r = w(t.href || e || "tel:");
        return { type: "call", label: s, href: r, icon: U(t.icon) };
      }
      if (t.type === "link") {
        const r = w(t.href);
        return r ? {
          type: "link",
          label: s,
          href: r,
          target: t.target === "_self" ? "_self" : "_blank",
          icon: U(t.icon)
        } : void 0;
      }
      if (t.type === "prefill") {
        const r = w(t.text);
        return r ? { type: "prefill", label: s, text: r, icon: U(t.icon) } : void 0;
      }
      return { type: "open", label: s, icon: U(t.icon) };
    }
  }).filter((t) => !!t).slice(0, 4);
}
function Tt(i) {
  const e = i.querySelector?.('script[type="application/json"][data-site-widget-config]');
  return e?.textContent ? ht(e.textContent) : {};
}
function ht(i) {
  if (!i?.trim()) return {};
  const e = Ae(i);
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function p(i, e, t) {
  t && t.length > 0 && i.setAttribute(e, t);
}
function H(i, e, t) {
  t ? i.setAttribute(e, "true") : i.removeAttribute(e);
}
function Ct(i) {
  const e = i.trim().toLowerCase();
  return e === "" || e === "1" || e === "true" || e === "yes";
}
function zt(i) {
  const e = w(i);
  return e === "bottom-left" || e === "inline" ? e : "bottom-right";
}
function Rt(i) {
  const e = w(i);
  return e === "wide" || e === "fullscreen" ? e : "normal";
}
function Lt(i) {
  return w(i) === "open" ? "open" : "closed";
}
function Ut(i) {
  return w(i) === "memory" ? "memory" : "local";
}
function Ot(i) {
  return w(i) === "auto" ? "auto" : "prefill";
}
function Bt(i) {
  const e = w(i);
  return e ? e.startsWith("/") ? e : `/${e}` : R.messagesPath;
}
function Re(i, e, t) {
  const s = Number(i);
  return !Number.isInteger(s) || s <= 0 ? e : Math.min(s, t);
}
function qt(i) {
  return i.replace(/\/+$/, "");
}
function U(i) {
  return w(i) || void 0;
}
function w(i) {
  return String(i ?? "").trim();
}
function Ae(i) {
  try {
    return JSON.parse(i);
  } catch {
    return;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, _e = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Me = Symbol(), Le = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Me) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (_e && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Le.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Le.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ht = (i) => new dt(typeof i == "string" ? i : i + "", void 0, Me), pt = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new dt(t, i, Me);
}, Nt = (i, e) => {
  if (_e) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = ie.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, Ue = _e ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ht(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Dt, defineProperty: Ft, getOwnPropertyDescriptor: jt, getOwnPropertyNames: Wt, getOwnPropertySymbols: Kt, getPrototypeOf: Vt } = Object, le = globalThis, Oe = le.trustedTypes, Qt = Oe ? Oe.emptyScript : "", Gt = le.reactiveElementPolyfillSupport, j = (i, e) => i, ye = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Qt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, ut = (i, e) => !Dt(i, e), Be = { attribute: !0, type: String, converter: ye, reflect: !1, useDefault: !1, hasChanged: ut };
Symbol.metadata ??= Symbol("metadata"), le.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Be) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Ft(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: o } = jt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const l = r?.call(this);
      o?.call(this, n), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Be;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = Vt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const t = this.properties, s = [...Wt(t), ...Kt(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(Ue(r));
    } else e !== void 0 && t.push(Ue(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : ye).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ye;
      this._$Em = r;
      const l = n.fromAttribute(t, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, o) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? ut)(o, t) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[j("elementProperties")] = /* @__PURE__ */ new Map(), L[j("finalized")] = /* @__PURE__ */ new Map(), Gt?.({ ReactiveElement: L }), (le.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, qe = (i) => i, oe = Ee.trustedTypes, He = oe ? oe.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, mt = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + E, Zt = `<${ft}>`, C = document, G = () => C.createComment(""), Z = (i) => i === null || typeof i != "object" && typeof i != "function", Ie = Array.isArray, Jt = (i) => Ie(i) || typeof i?.[Symbol.iterator] == "function", de = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, De = />/g, I = RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Fe = /'/g, je = /"/g, gt = /^(?:script|style|textarea|title)$/i, bt = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), g = bt(1), y = bt(2), z = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), We = /* @__PURE__ */ new WeakMap(), T = C.createTreeWalker(C, 129);
function vt(i, e) {
  if (!Ie(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return He !== void 0 ? He.createHTML(e) : e;
}
const Yt = (i, e) => {
  const t = i.length - 1, s = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = N;
  for (let l = 0; l < t; l++) {
    const a = i[l];
    let c, h, d = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === N ? h[1] === "!--" ? n = Ne : h[1] !== void 0 ? n = De : h[2] !== void 0 ? (gt.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = I) : h[3] !== void 0 && (n = I) : n === I ? h[0] === ">" ? (n = r ?? N, d = -1) : h[1] === void 0 ? d = -2 : (d = n.lastIndex - h[2].length, c = h[1], n = h[3] === void 0 ? I : h[3] === '"' ? je : Fe) : n === je || n === Fe ? n = I : n === Ne || n === De ? n = N : (n = I, r = void 0);
    const m = n === I && i[l + 1].startsWith("/>") ? " " : "";
    o += n === N ? a + Zt : d >= 0 ? (s.push(c), a.slice(0, d) + mt + a.slice(d) + E + m) : a + E + (d === -2 ? l : m);
  }
  return [vt(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class J {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [c, h] = Yt(e, t);
    if (this.el = J.createElement(c, s), T.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = T.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(mt)) {
          const f = h[n++], m = r.getAttribute(d).split(E), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: b[2], strings: m, ctor: b[1] === "." ? ei : b[1] === "?" ? ti : b[1] === "@" ? ii : ce }), r.removeAttribute(d);
        } else d.startsWith(E) && (a.push({ type: 6, index: o }), r.removeAttribute(d));
        if (gt.test(r.tagName)) {
          const d = r.textContent.split(E), f = d.length - 1;
          if (f > 0) {
            r.textContent = oe ? oe.emptyScript : "";
            for (let m = 0; m < f; m++) r.append(d[m], G()), T.nextNode(), a.push({ type: 2, index: ++o });
            r.append(d[f], G());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ft) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(E, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += E.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = C.createElement("template");
    return s.innerHTML = e, s;
  }
}
function B(i, e, t = i, s) {
  if (e === z) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const o = Z(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = B(i, r._$AS(i, e.values), r, s)), e;
}
class Xt {
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
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
    T.currentNode = r;
    let o = T.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new q(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new si(o, this, e)), this._$AV.push(c), a = s[++l];
      }
      n !== a?.index && (o = T.nextNode(), n++);
    }
    return T.currentNode = C, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = B(this, e, t), Z(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Jt(e) ? this.k(e) : this._(e);
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
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = J.createElement(vt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new Xt(r, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = We.get(e.strings);
    return t === void 0 && We.set(e.strings, t = new J(e)), t;
  }
  k(e) {
    Ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const o of e) r === t.length ? t.push(s = new q(this.O(G()), this.O(G()), this, this.options)) : s = t[r], s._$AI(o), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = qe(e).nextSibling;
      qe(e).remove(), e = s;
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
  constructor(e, t, s, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, t = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = B(this, e, t, 0), n = !Z(e) || e !== this._$AH && e !== z, n && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = B(this, l[s + a], t, a), c === z && (c = this._$AH[a]), n ||= !Z(c) || c !== this._$AH[a], c === u ? e = u : e !== u && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ei extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class ti extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class ii extends ce {
  constructor(e, t, s, r, o) {
    super(e, t, s, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = B(this, e, t, 0) ?? u) === z) return;
    const s = this._$AH, r = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class si {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const ri = { I: q }, oi = Ee.litHtmlPolyfillSupport;
oi?.(J, q), (Ee.litHtmlVersions ??= []).push("3.3.3");
const ni = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    s._$litPart$ = r = new q(e.insertBefore(G(), o), o, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ni(t, this.renderRoot, this.renderOptions);
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
W._$litElement$ = !0, W.finalized = !0, ke.litElementHydrateSupport?.({ LitElement: W });
const ai = ke.litElementPolyfillSupport;
ai?.({ LitElement: W });
(ke.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = { CHILD: 2 }, wt = (i) => (...e) => ({ _$litDirective$: i, values: e });
let yt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
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
const { I: ci } = ri, Ke = (i) => i, Ve = () => document.createComment(""), D = (i, e, t) => {
  const s = i._$AA.parentNode, r = e === void 0 ? i._$AB : e._$AA;
  if (t === void 0) {
    const o = s.insertBefore(Ve(), r), n = s.insertBefore(Ve(), r);
    t = new ci(o, n, i, i.options);
  } else {
    const o = t._$AB.nextSibling, n = t._$AM, l = n !== i;
    if (l) {
      let a;
      t._$AQ?.(i), t._$AM = i, t._$AP !== void 0 && (a = i._$AU) !== n._$AU && t._$AP(a);
    }
    if (o !== r || l) {
      let a = t._$AA;
      for (; a !== o; ) {
        const c = Ke(a).nextSibling;
        Ke(s).insertBefore(a, r), a = c;
      }
    }
  }
  return t;
}, k = (i, e, t = i) => (i._$AI(e, t), i), hi = {}, xt = (i, e = hi) => i._$AH = e, di = (i) => i._$AH, pe = (i) => {
  i._$AR(), i._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (i, e, t) => {
  const s = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) s.set(i[r], r);
  return s;
}, pi = wt(class extends yt {
  constructor(i) {
    if (super(i), i.type !== li.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(i, e, t) {
    let s;
    t === void 0 ? t = e : e !== void 0 && (s = e);
    const r = [], o = [];
    let n = 0;
    for (const l of i) r[n] = s ? s(l, n) : n, o[n] = t(l, n), n++;
    return { values: o, keys: r };
  }
  render(i, e, t) {
    return this.dt(i, e, t).values;
  }
  update(i, [e, t, s]) {
    const r = di(i), { values: o, keys: n } = this.dt(e, t, s);
    if (!Array.isArray(r)) return this.ut = n, o;
    const l = this.ut ??= [], a = [];
    let c, h, d = 0, f = r.length - 1, m = 0, b = o.length - 1;
    for (; d <= f && m <= b; ) if (r[d] === null) d++;
    else if (r[f] === null) f--;
    else if (l[d] === n[m]) a[m] = k(r[d], o[m]), d++, m++;
    else if (l[f] === n[b]) a[b] = k(r[f], o[b]), f--, b--;
    else if (l[d] === n[b]) a[b] = k(r[d], o[b]), D(i, a[b + 1], r[d]), d++, b--;
    else if (l[f] === n[m]) a[m] = k(r[f], o[m]), D(i, r[d], r[f]), f--, m++;
    else if (c === void 0 && (c = Qe(n, m, b), h = Qe(l, d, f)), c.has(l[d])) if (c.has(l[f])) {
      const M = h.get(n[m]), he = M !== void 0 ? r[M] : null;
      if (he === null) {
        const Ce = D(i, r[d]);
        k(Ce, o[m]), a[m] = Ce;
      } else a[m] = k(he, o[m]), D(i, r[d], he), r[M] = null;
      m++;
    } else pe(r[f]), f--;
    else pe(r[d]), d++;
    for (; m <= b; ) {
      const M = D(i, a[b + 1]);
      k(M, o[m]), a[m++] = M;
    }
    for (; d <= f; ) {
      const M = r[d++];
      M !== null && pe(M);
    }
    return this.ut = n, xt(i, a), z;
  }
});
function K(i = "id") {
  return `${i}_${St()}`;
}
function ui(i) {
  return `site-widget:${Date.now()}:${St()}`;
}
function mi(i) {
  let e = 2166136261;
  for (let t = 0; t < i.length; t += 1)
    e ^= i.charCodeAt(t), e = Math.imul(e, 16777619);
  return `h${(e >>> 0).toString(16).padStart(8, "0")}`;
}
function St() {
  const i = globalThis.crypto;
  if (i && typeof i.randomUUID == "function")
    return i.randomUUID().replaceAll("-", "");
  const e = new Uint8Array(16);
  return i && typeof i.getRandomValues == "function" ? (i.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("")) : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
const Ge = 3, Ze = 5 * 1024 * 1024, Je = 15 * 1024 * 1024, Ye = 24e6, fi = [255, 216, 255], gi = [137, 80, 78, 71, 13, 10, 26, 10], bi = [82, 73, 70, 70], vi = [87, 69, 66, 80];
function wi(i) {
  if (Y(i, fi)) return "image/jpeg";
  if (Y(i, gi)) return "image/png";
  if (Y(i, bi) && Y(i, vi, 8)) return "image/webp";
}
function yi(i, e) {
  if (!e) return !1;
  const t = String(i ?? "").trim().toLowerCase();
  return t === "" || t === e;
}
function xi(i, e) {
  if (!Number.isSafeInteger(i.sizeBytes) || i.sizeBytes < 0)
    return { code: "invalid_image_size", actualBytes: i.sizeBytes };
  const t = e.length + 1;
  if (t > Ge)
    return { code: "too_many_images", maxCount: Ge, actualCount: t };
  if (i.sizeBytes > Ze)
    return { code: "image_too_large", maxBytes: Ze, actualBytes: i.sizeBytes };
  const s = e.reduce((r, o) => r + o.sizeBytes, i.sizeBytes);
  if (s > Je)
    return { code: "total_too_large", maxBytes: Je, actualBytes: s };
}
function Si(i, e) {
  if (!Number.isSafeInteger(i) || !Number.isSafeInteger(e) || i <= 0 || e <= 0)
    return { code: "invalid_image_dimensions", width: i, height: e };
  const t = i * e;
  if (!Number.isSafeInteger(t) || t > Ye)
    return { code: "too_many_pixels", maxPixels: Ye, actualPixels: t };
}
function $i(i) {
  if (i.length === 0) return "";
  const e = [...new Set(i.map(({ error: s }) => Ai(s)))];
  return `${i.length === 1 ? "Фото не добавлено" : "Некоторые фото не добавлены"}: ${e.join("; ")}.`;
}
function Y(i, e, t = 0) {
  return i.length < t + e.length ? !1 : e.every((s, r) => i[t + r] === s);
}
function Ai(i) {
  switch (i.code) {
    case "invalid_image_size":
      return "не удалось определить размер файла";
    case "too_many_images":
      return `можно добавить не более ${i.maxCount} фото`;
    case "image_too_large":
      return `размер одного фото превышает ${Xe(i.maxBytes)} МБ`;
    case "total_too_large":
      return `общий размер фото превышает ${Xe(i.maxBytes)} МБ`;
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
function Xe(i) {
  return String(i / (1024 * 1024));
}
class O extends Error {
  constructor() {
    super("Image selection is no longer current"), this.name = "StaleImageSelectionError";
  }
}
class _i {
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
    const t = [...e], s = this.generation, r = Symbol("image-selection");
    this.pendingSelections.set(r, s), this.host.requestUpdate();
    let o = () => {
    };
    const n = new Promise((l) => {
      o = l;
    });
    return this.selectionQueue = this.selectionQueue.catch(() => {
    }).then(async () => {
      try {
        o(await this.processBatch(t, s));
      } catch {
        if (s !== this.generation || !this.enabled) {
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
    const s = this.draft[t];
    s && this.revokePreview(s.previewUrl), this.draft = this.draft.filter((o) => o.id !== e), this.validationMessage = "";
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
      for (const s of t) this.revokePreview(s.previewUrl);
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
    const s = e || t.size > 0 || this.draft.length > 0 || this.byMessageId.size > 0 || this.validationMessage;
    this.draft = [], this.byMessageId.clear(), this.validationMessage = "", s && this.host.requestUpdate();
  }
  async processBatch(e, t) {
    if (!this.enabled || t !== this.generation || e.length === 0)
      return { accepted: 0, rejected: 0, validationMessage: "" };
    const s = t, r = () => s === this.generation && this.enabled, o = [], n = [], l = [...this.draft];
    for (const a of e) {
      A(r);
      const c = { file: a, sizeBytes: a.size }, h = xi(c, l);
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
    return this.draft = [...this.draft, ...o], this.validationMessage = $i(n), this.validationRevision += 1, this.host.requestUpdate(), {
      accepted: o.length,
      rejected: n.length,
      validationMessage: this.validationMessage
    };
  }
  async validateAndCreateAttachment(e, t, s) {
    A(s);
    let r;
    try {
      const a = await Ii(e.file.slice(0, 12));
      A(s), r = wi(new Uint8Array(a));
    } catch (a) {
      if (a instanceof O) throw a;
      t.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    if (!r) {
      t.push({ candidate: e, error: { code: "unsupported_image_type" } });
      return;
    }
    if (!yi(e.file.type, r)) {
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
      o = await Mi(
        e.file,
        (a) => this.createInFlightPreview(a),
        (a) => this.revokeInFlightPreview(a),
        s
      );
    } catch (a) {
      if (a instanceof O) throw a;
      t.push({ candidate: e, error: { code: "decode_failed" } });
      return;
    }
    A(s);
    const n = Si(o.width, o.height);
    if (n) {
      t.push({ candidate: e, error: n });
      return;
    }
    let l;
    try {
      if (A(s), l = this.createInFlightPreview(e.file), !s())
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
async function Mi(i, e, t, s) {
  let r;
  if (typeof createImageBitmap == "function")
    try {
      A(s);
      const n = await createImageBitmap(i);
      try {
        return A(s), { width: n.width, height: n.height };
      } finally {
        n.close();
      }
    } catch (n) {
      if (n instanceof O) throw n;
      r = n;
    }
  if (A(s), typeof Image > "u" || typeof URL.createObjectURL != "function")
    throw r instanceof Error ? r : new Error("No browser image decoder is available");
  A(s);
  const o = e(i);
  try {
    A(s);
    const n = new Image();
    return n.decoding = "async", n.src = o, typeof n.decode == "function" ? await n.decode() : await Ei(n), A(s), { width: n.naturalWidth, height: n.naturalHeight };
  } finally {
    t(o);
  }
}
function A(i) {
  if (!i()) throw new O();
}
function Ei(i) {
  return new Promise((e, t) => {
    i.addEventListener("load", () => e(), { once: !0 }), i.addEventListener("error", () => t(new Error("Image decode failed")), { once: !0 });
  });
}
async function Ii(i) {
  return typeof i.arrayBuffer == "function" ? i.arrayBuffer() : new Promise((e, t) => {
    const s = new FileReader();
    s.addEventListener("load", () => {
      s.result instanceof ArrayBuffer ? e(s.result) : t(new Error("Blob read returned no ArrayBuffer"));
    }), s.addEventListener("error", () => t(s.error ?? new Error("Blob read failed"))), s.readAsArrayBuffer(i);
  });
}
const ue = 8, me = 40, et = 180, P = 0.5, ki = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", " ", "Spacebar"]);
class Pi {
  constructor(e) {
    this.items = [], this.mode = "following-bottom", this.snapshot = {
      mode: "following-bottom",
      canScrollStart: !1,
      canScrollEnd: !1,
      newItemCount: 0
    }, this.newItemCount = 0, this.hasInitialPlacement = !1, this.observedRows = /* @__PURE__ */ new Set(), this.programmaticScroll = !1, this.pointerActive = !1, this.handleWheel = () => this.releaseForUser(), this.handleTouchMove = () => this.releaseForUser(), this.handleKeydown = (t) => {
      if (!ki.has(t.key)) return;
      const s = t.target;
      s instanceof HTMLElement && s !== this.viewport && this.isInteractive(s) || this.releaseForUser();
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
  connect({ root: e, viewport: t, content: s, tailSpacer: r }) {
    if (this.viewport === t && this.content === s && this.tailSpacer === r) {
      this.root = e, this.commitModeAttribute();
      return;
    }
    this.detachElements(), this.root = e, this.viewport = t, this.content = s, this.tailSpacer = r, t.addEventListener("scroll", this.handleScroll, { passive: !0 }), t.addEventListener("wheel", this.handleWheel, { passive: !0 }), t.addEventListener("touchmove", this.handleTouchMove, { passive: !0 }), t.addEventListener("keydown", this.handleKeydown), t.addEventListener("pointerdown", this.handlePointerDown), t.addEventListener("pointerup", this.handlePointerUp), t.addEventListener("pointercancel", this.handlePointerUp), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.scheduleCommit()), this.resizeObserver.observe(t), this.resizeObserver.observe(s), this.reconcileObservedRows()) : typeof window < "u" && window.addEventListener("resize", this.handleWindowResize), this.commitModeAttribute(), this.scheduleCommit();
  }
  reconcile(e) {
    const t = e.map((o) => ({ id: o.id, scrollAnchor: !!o.scrollAnchor })), s = this.pendingReconcile?.previous ?? this.items, r = this.pendingReconcile?.layoutAnchor ?? this.pendingLayoutAnchor;
    this.pendingLayoutAnchor = void 0, this.items = t, this.pendingReconcile = r ? { previous: s, next: t, layoutAnchor: r } : { previous: s, next: t }, this.reconcileObservedRows(), this.scheduleCommit();
  }
  scrollToEnd(e = {}) {
    const t = this.viewport;
    if (!t || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0;
    const s = this.normalizeBehavior(e.behavior ?? "auto");
    return this.clearSettlingTimer(), this.mode = s === "smooth" ? "settling-jump" : "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), s), this.updateSnapshot(), s === "smooth" && (this.settlingTimer = globalThis.setTimeout(() => {
      if (this.settlingTimer = void 0, this.mode !== "settling-jump") return;
      this.mode = "following-bottom", this.commitModeAttribute();
      const r = this.viewport;
      r && this.hasLayout() && (this.performScroll(Math.max(0, r.scrollHeight - r.clientHeight), "auto"), this.scheduleCommit()), this.updateSnapshot();
    }, et)), !0;
  }
  scrollToMessage(e, t = {}) {
    const s = this.viewport, r = this.findRow(e);
    if (!s || !r || !this.hasLayout()) return !1;
    this.activeAnchorId = void 0, this.setTailHeight(0), this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "free-scrolling", this.commitModeAttribute();
    const o = s.getBoundingClientRect(), n = r.getBoundingClientRect(), l = s.scrollTop + n.top - o.top - me;
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
    const s = this.getAppendedItems(e.previous, e.next), r = [...s].reverse().find((o) => o.scrollAnchor);
    r ? this.startTurnAnchor(r.id) : s.length > 0 ? this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), "auto") : this.activeAnchorId ? this.reconcileActiveAnchor() : this.newItemCount += s.length : this.mode === "following-bottom" || this.mode === "settling-jump" ? this.performScroll(Math.max(0, t.scrollHeight - t.clientHeight), "auto") : this.activeAnchorId && this.reconcileActiveAnchor(), this.updateSnapshot();
  }
  startTurnAnchor(e) {
    const t = this.viewport, s = this.findRow(e);
    if (!t || !s || !this.tailSpacer) return;
    this.activeAnchorId = e, this.newItemCount = 0, this.clearSettlingTimer(), this.mode = "anchored-to-message", this.commitModeAttribute();
    const r = this.desiredScrollTop(s);
    this.setTailHeight(this.requiredTailHeight(r)), this.performScroll(r, "auto");
  }
  reconcileActiveAnchor() {
    const e = this.activeAnchorId ? this.findRow(this.activeAnchorId) : void 0;
    if (!e || !this.viewport) {
      this.activeAnchorId = void 0, this.setTailHeight(0);
      return;
    }
    const t = this.desiredScrollTop(e), s = this.requiredTailHeight(t);
    if (this.setTailHeight(s), this.mode === "anchored-to-message")
      if (s <= P)
        this.activeAnchorId = void 0, this.mode = "following-bottom", this.commitModeAttribute(), this.performScroll(Math.max(0, this.viewport.scrollHeight - this.viewport.clientHeight), "auto");
      else {
        const r = this.viewport.getBoundingClientRect(), o = e.getBoundingClientRect();
        Math.abs(o.top - r.top - me) > P && this.performScroll(t, "auto");
      }
    else s <= P && (this.activeAnchorId = void 0);
  }
  requiredTailHeight(e) {
    const t = this.viewport, s = this.tailSpacer;
    if (!t || !s) return 0;
    const r = t.getBoundingClientRect(), o = s.getBoundingClientRect(), n = t.scrollTop + o.top - r.top;
    return Math.max(0, e + t.clientHeight - n);
  }
  desiredScrollTop(e) {
    const t = this.viewport;
    if (!t) return 0;
    const s = t.getBoundingClientRect(), r = e.getBoundingClientRect();
    return Math.max(0, t.scrollTop + r.top - s.top - me);
  }
  restoreLayoutAnchor(e) {
    const t = this.viewport, s = this.findRow(e.id);
    if (!t || !s) return;
    const r = t.getBoundingClientRect(), n = s.getBoundingClientRect().top - r.top - e.viewportTop;
    Math.abs(n) <= P || (this.markProgrammaticScroll("auto"), t.scrollTop += n);
  }
  captureFirstVisible() {
    const e = this.viewport, t = this.content;
    if (!e || !t) return;
    const s = e.getBoundingClientRect();
    for (const r of t.querySelectorAll("[data-message-id]")) {
      const o = r.getBoundingClientRect();
      if (o.bottom > s.top + P && o.top < s.bottom - P)
        return { id: r.dataset.messageId ?? "", viewportTop: o.top - s.top };
    }
  }
  getAppendedItems(e, t) {
    if (e.length === 0) return t;
    const s = this.findSequenceStart(e, t);
    return s < 0 ? [] : t.slice(s + e.length);
  }
  isPrepend(e, t) {
    return e.length === 0 || t.length <= e.length ? !1 : this.findSequenceStart(e, t) > 0;
  }
  findSequenceStart(e, t) {
    if (e.length === 0) return 0;
    const s = t.length - e.length;
    for (let r = 0; r <= s; r += 1)
      if (e.every((o, n) => o.id === t[r + n]?.id)) return r;
    return -1;
  }
  releaseForUser() {
    this.clearProgrammaticTimer(), this.clearSettlingTimer(), this.programmaticScroll = !1, this.mode !== "free-scrolling" && (this.mode = "free-scrolling", this.commitModeAttribute(), this.updateSnapshot());
  }
  performScroll(e, t) {
    const s = this.viewport;
    if (!s) return;
    const r = Math.max(0, s.scrollHeight - s.clientHeight), o = Math.min(Math.max(0, e), r);
    this.markProgrammaticScroll(t), typeof s.scrollTo == "function" ? s.scrollTo({ top: o, behavior: t }) : s.scrollTop = o;
  }
  markProgrammaticScroll(e) {
    this.programmaticScroll = !0, this.clearProgrammaticTimer();
    const t = e === "smooth" ? et : 0;
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
    const s = Math.max(0, e), r = Number.parseFloat(t.style.height || "0") || 0;
    Math.abs(r - s) <= P || (t.style.height = `${s}px`);
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
function Ti(i) {
  const e = zi(i.contact), t = Ci(i.environment.search), s = V({
    channel: "site_widget",
    page_url: i.environment.href,
    widget_instance_id: i.config.widgetInstanceId,
    page_title: i.environment.title,
    referrer_url: i.environment.referrer,
    utm: t
  }), r = V({
    locale: i.environment.locale,
    timezone: i.environment.timezone
  });
  return V({
    schema_version: "site_widget.v1",
    event_type: "site_widget.message_submitted",
    idempotency_key: i.idempotencyKey,
    submitted_at: i.environment.now,
    public_session_id: i.publicSessionId,
    source: s,
    contact: e && Object.keys(e).length > 0 ? e : void 0,
    message: {
      role: "visitor",
      text: i.text.trim()
    },
    visitor_context: Object.keys(r).length > 0 ? r : void 0,
    consent: i.privacyPolicyAccepted ? { privacy_policy: !0 } : void 0
  });
}
function Ci(i = "") {
  if (!i.trim()) return;
  const e = new URLSearchParams(i.startsWith("?") ? i.slice(1) : i), t = V({
    source: e.get("utm_source") ?? void 0,
    medium: e.get("utm_medium") ?? void 0,
    campaign: e.get("utm_campaign") ?? void 0,
    term: e.get("utm_term") ?? void 0,
    content: e.get("utm_content") ?? void 0
  });
  return Object.keys(t).length > 0 ? t : void 0;
}
function zi(i) {
  if (i)
    return V({
      name: X(i.name),
      phone: X(i.phone),
      email: X(i.email),
      preferred_contact: i.preferred_contact,
      city: X(i.city)
    });
}
function X(i) {
  return i?.trim() || void 0;
}
function V(i) {
  for (const e of Object.keys(i)) {
    const t = i[e];
    (t == null || t === "" || typeof t == "object" && !Array.isArray(t) && Object.keys(t).length === 0) && delete i[e];
  }
  return i;
}
function se({
  config: i,
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
        text: i.introMessage,
        createdAt: t.toISOString()
      })
    ],
    visitorMessageCount: 0,
    unreadCount: 0
  };
}
function v(i, e, t) {
  const s = Ri(i);
  switch (e.type) {
    case "open":
      return {
        ...s,
        open: !0,
        unreadCount: 0,
        status: it(s, t)
      };
    case "close":
      return { ...s, open: !1, status: "closed" };
    case "draft.changed": {
      const r = String(e.value ?? "");
      return {
        ...s,
        draft: r,
        status: s.open ? r.trim() ? "composing" : it(s, t) : s.status
      };
    }
    case "contact.capture.toggled":
      return {
        ...s,
        contactCaptureOpen: typeof e.open == "boolean" ? e.open : !s.contactCaptureOpen
      };
    case "contact.phone.saved":
      return {
        ...s,
        contactPhone: String(e.phone ?? "").trim(),
        contactCaptureOpen: !1
      };
    case "submit.started": {
      if (s.submitting || s.pending) return s;
      const r = String(e.text ?? "").trim(), o = String(e.idempotencyKey ?? "").trim();
      if (!r || !o) return s;
      const n = re({ role: "visitor", text: r, status: "pending" });
      return {
        ...s,
        open: !0,
        status: "submitted_waiting",
        submitting: !0,
        draft: "",
        pending: {
          messageId: n.id,
          text: r,
          idempotencyKey: o
        },
        visitorMessageCount: s.visitorMessageCount + 1,
        messages: [...s.messages, n]
      };
    }
    case "retry.started":
      return !s.pending || s.submitting ? s : {
        ...s,
        status: "submitted_waiting",
        submitting: !0,
        messages: s.messages.map(
          (r) => r.id === s.pending?.messageId ? { ...r, status: "pending" } : r
        )
      };
    case "visitor.persisted":
      return !s.pending || e.messageId && e.messageId !== s.pending.messageId ? s : {
        ...s,
        messages: s.messages.map(
          (r) => r.id === s.pending?.messageId ? { ...r, status: "sent" } : r
        )
      };
    case "assistant.replied": {
      const r = String(e.text ?? "").trim(), o = r ? [...s.messages, re({ role: "assistant", text: r, disclosure: !0 })] : s.messages;
      return tt(s, o, "replied");
    }
    case "system.message": {
      const r = String(e.text ?? "").trim(), o = r ? [...s.messages, re({ role: "system", text: r, systemKind: e.status })] : s.messages;
      return tt(s, o, e.status);
    }
    case "submit.failed": {
      if (!s.pending || e.messageId && e.messageId !== s.pending.messageId) return s;
      const r = s.messages.map(
        (o) => o.id === s.pending?.messageId ? { ...o, status: "error" } : o
      );
      return {
        ...s,
        status: "error",
        submitting: !1,
        messages: r
      };
    }
    case "session.cleared":
      return t ? se({ config: t, open: s.open }) : { ...s, pending: void 0, submitting: !1 };
    default:
      return s;
  }
}
function ne(i, e) {
  const t = i.trim();
  return t ? t.length > e.maxMessageLength ? "message_too_long" : null : "empty_message";
}
function re({
  role: i,
  text: e,
  status: t = "sent",
  disclosure: s = !1,
  systemKind: r,
  createdAt: o = (/* @__PURE__ */ new Date()).toISOString()
}) {
  return {
    id: K("msg"),
    role: i,
    text: String(e ?? ""),
    status: t,
    disclosure: s,
    systemKind: r,
    createdAt: o
  };
}
function tt(i, e, t) {
  return {
    ...i,
    status: t,
    submitting: !1,
    pending: void 0,
    messages: e,
    unreadCount: i.open ? i.unreadCount : i.unreadCount + 1
  };
}
function it(i, e) {
  const t = e ? ne(i.draft, e) : i.draft.trim() ? null : "empty_message";
  return i.submitting ? "submitted_waiting" : i.status === "error" ? "error" : i.status === "replied" || i.status === "fallback" || i.status === "disabled" ? i.status : i.draft.trim() && !t ? "composing" : "open_idle";
}
function Ri(i) {
  return {
    ...i,
    draft: String(i.draft ?? ""),
    contactPhone: String(i.contactPhone ?? ""),
    submitting: !!i.submitting,
    messages: Array.isArray(i.messages) ? i.messages : [],
    visitorMessageCount: Number.isInteger(i.visitorMessageCount) ? i.visitorMessageCount : 0,
    unreadCount: Number.isInteger(i.unreadCount) ? i.unreadCount : 0
  };
}
function Li(i, e) {
  const t = ne(i.draft, e), s = i.visitorMessageCount > 0;
  return {
    ...i,
    canSend: !i.submitting && !i.pending && !t,
    draftError: t,
    showQuickReplies: i.open && e.showQuickActions && e.quickReplies.length > 0 && !i.submitting && !s,
    showMobileActions: !i.open && e.showMobileActions && e.mobileActions.length > 0,
    showContactTrigger: !e.collectPhoneAfterFirstMessage || s,
    contactLabel: i.contactPhone ? e.phoneSavedLabel : e.phoneCaptureLabel,
    attachmentVisible: e.mock && e.attachmentsEnabled && e.showAttachmentSlot,
    attachmentDisabled: !1,
    status: i.status
  };
}
const st = "granit-site-widget", rt = "granit-widget", Ui = {
  opened: "open",
  closed: "close",
  "response-received": "response"
};
function $(i, e, t, s = {}) {
  const r = Oi(s, t);
  ee(i, `${st}:${e}`, r), ee(i, `${rt}:${e}`, r);
  const o = Ui[e];
  o && (ee(i, `${st}:${o}`, r), ee(i, `${rt}:${o}`, r));
}
function Oi(i, e) {
  const t = {
    ...i,
    widgetInstanceId: i.widgetInstanceId ?? e.widgetInstanceId
  };
  if (typeof t.publicSessionId == "string") {
    const s = t.publicSessionId.trim();
    s && (t.publicSessionIdHash = mi(s)), delete t.publicSessionId;
  }
  return e.includeMessageTextInEvents || (typeof t.messageText == "string" && (t.messageLength = t.messageText.length), delete t.messageText), t;
}
function ee(i, e, t) {
  i.dispatchEvent(
    new CustomEvent(e, {
      bubbles: !0,
      composed: !0,
      detail: t
    })
  );
}
function Bi(i = /* @__PURE__ */ new Date()) {
  return {
    href: typeof window > "u" ? "" : window.location.href,
    search: typeof window > "u" ? "" : window.location.search,
    title: typeof document > "u" ? void 0 : document.title || void 0,
    referrer: typeof document > "u" ? void 0 : document.referrer || void 0,
    locale: typeof navigator > "u" ? void 0 : navigator.language || void 0,
    timezone: qi(),
    now: i.toISOString()
  };
}
function qi() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return;
  }
}
const Hi = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function Q(i) {
  if (typeof i != "string") return;
  const e = i.trim().toLowerCase();
  return Hi.test(e) ? e : void 0;
}
function Ni(i, e) {
  const t = F(i) ?? {}, s = F(t.automation) ?? {}, r = _(s.status), o = Q(t.public_session_id) ?? Q(F(t.session)?.public_session_id) ?? Q(t.publicSessionId);
  if (r === "replied") {
    const n = F(s.reply) ?? F(t.reply) ?? {}, l = ge(n.persisted) ?? ge(n.is_persisted) ?? ge(s.reply_persisted), a = _(n.text) ?? _(n.body) ?? _(s.persisted_text);
    return a && l !== !1 ? {
      status: "replied",
      publicSessionId: o,
      replyText: a,
      reason: _(s.reason),
      raw: i
    } : {
      status: "fallback",
      publicSessionId: o,
      systemText: fe(s, e.fallbackMessage),
      reason: _(s.reason),
      raw: i
    };
  }
  return r === "disabled" ? {
    status: "disabled",
    publicSessionId: o,
    systemText: fe(s, e.disabledMessage),
    reason: _(s.reason),
    raw: i
  } : r === "fallback" ? {
    status: "fallback",
    publicSessionId: o,
    systemText: fe(s, e.fallbackMessage),
    reason: _(s.reason),
    raw: i
  } : {
    status: "fallback",
    publicSessionId: o,
    systemText: e.fallbackMessage,
    raw: i
  };
}
function fe(i, e) {
  return _(i.message) ?? _(i.display_message) ?? e;
}
function F(i) {
  if (typeof i == "object" && i !== null && !Array.isArray(i))
    return i;
}
function _(i) {
  return typeof i != "string" ? void 0 : i.trim() || void 0;
}
function ge(i) {
  if (typeof i == "boolean") return i;
  if (typeof i != "string") return;
  const e = i.trim().toLowerCase();
  if (e === "true" || e === "1" || e === "yes") return !0;
  if (e === "false" || e === "0" || e === "no") return !1;
}
async function Di(i, e, t) {
  if (t?.aborted) throw new DOMException("Aborted", "AbortError");
  if (i.mock) return Fi(i, e, t);
  if (!i.apiBaseUrl) throw new Error("apiBaseUrl is required when mock=false");
  const s = new AbortController(), r = globalThis.setTimeout(() => s.abort(), i.timeoutMs), o = () => s.abort();
  t?.aborted ? s.abort() : t?.addEventListener("abort", o, { once: !0 });
  try {
    const n = await fetch(`${i.apiBaseUrl}${i.messagesPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(e),
      credentials: "omit",
      signal: s.signal
    }), l = await ji(n);
    if (!n.ok)
      throw new Error(Wi(l) ?? `Widget request failed with HTTP ${n.status}`);
    const a = Ni(l, i);
    if (!a.publicSessionId)
      throw new Error("Widget response is missing a valid public_session_id");
    return a;
  } finally {
    globalThis.clearTimeout(r), t?.removeEventListener("abort", o);
  }
}
async function Fi(i, e, t) {
  await Ki(350, t);
  const s = e.message.text.toLowerCase();
  return s.includes("менеджер") || s.includes("позвон") ? {
    status: "fallback",
    publicSessionId: e.public_session_id,
    systemText: "Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",
    reason: "manager_requested",
    raw: { mock: !0 }
  } : s.includes("сто") || s.includes("цен") || s.includes("расчет") || s.includes("расчёт") ? {
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
async function ji(i) {
  if ((i.headers.get("content-type") ?? "").includes("application/json")) return i.json();
  const t = await i.text();
  return t ? { message: t } : void 0;
}
function Wi(i) {
  if (!i || typeof i != "object" || Array.isArray(i)) return;
  const e = i;
  return typeof e.message == "string" ? e.message : typeof e.error == "string" ? e.error : void 0;
}
function Ki(i, e) {
  return e?.aborted ? Promise.reject(new DOMException("Aborted", "AbortError")) : new Promise((t, s) => {
    const r = globalThis.setTimeout(() => {
      e?.removeEventListener("abort", o), t();
    }, i), o = () => {
      globalThis.clearTimeout(r), s(new DOMException("Aborted", "AbortError"));
    };
    e?.addEventListener("abort", o, { once: !0 });
  });
}
function ot(i, e = "local") {
  const t = `sw:${i}:public_session_id`, s = `sw:${i}:open_state`, r = `sw:${i}:panel_size`, o = e === "memory" ? void 0 : Qi();
  let n = "", l, a;
  return {
    getPublicSessionId() {
      const c = be(o, t), h = Q(c || n);
      return h ? (n = h, c && c !== h && te(o, t, h), h) : (n = "", c && nt(o, t), "");
    },
    setPublicSessionId(c) {
      const h = Q(c);
      h && (n = h, te(o, t, h));
    },
    clearPublicSessionId() {
      n = "", nt(o, t);
    },
    getOpenState() {
      const c = be(o, s);
      return c === "open" ? !0 : c === "closed" ? !1 : l;
    },
    setOpenState(c) {
      l = c, te(o, s, c ? "open" : "closed");
    },
    getPanelSize() {
      const c = be(o, r);
      return Vi(c) ? c : a;
    },
    setPanelSize(c) {
      a = c, te(o, r, c);
    }
  };
}
function Vi(i) {
  return i === "normal" || i === "wide" || i === "fullscreen";
}
function Qi() {
  try {
    return typeof window > "u" ? void 0 : window.localStorage;
  } catch {
    return;
  }
}
function be(i, e) {
  try {
    return i?.getItem(e) || void 0;
  } catch {
    return;
  }
}
function te(i, e, t) {
  try {
    i?.setItem(e, t);
  } catch {
  }
}
function nt(i, e) {
  try {
    i?.removeItem(e);
  } catch {
  }
}
const Gi = pt`
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
`, Zi = pt`
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
function x(i, e = 22) {
  const t = {
    width: e,
    height: e
  };
  switch (i) {
    case "send":
      return S(t, y`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);
    case "phone":
      return S(
        t,
        y`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`
      );
    case "calculator":
      return S(
        t,
        y`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`
      );
    case "close":
      return S(t, y`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);
    case "minus":
      return S(t, y`<path d="M5 12h14" />`);
    case "paperclip":
      return S(t, y`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);
    case "shield":
      return S(
        t,
        y`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`
      );
    case "brand":
      return S(t, y`<path d="m8 3 4 8 5-5 5 15H2Z" />`);
    case "plus":
      return S(t, y`<path d="M5 12h14" /><path d="M12 5v14" />`);
    case "maximize-2":
    case "expand":
      return S(t, y`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);
    case "minimize-2":
    case "shrink":
      return S(t, y`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);
    case "spark":
      return S(
        t,
        y`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`
      );
    case "loader":
      return S(t, y`<path d="M21 12a9 9 0 1 1-2.64-6.36" />`);
    case "message":
    default:
      return S(t, y`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`);
  }
}
function S(i, e) {
  return y`<svg
    aria-hidden="true"
    width=${i.width}
    height=${i.height}
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
const Ji = wt(class extends yt {
  constructor() {
    super(...arguments), this.key = u;
  }
  render(i, e) {
    return this.key = i, e;
  }
  update(i, [e, t]) {
    return e !== this.key && (xt(i), this.key = e), t;
  }
}), Yi = "image/jpeg,image/png,image/webp", at = "Добавить фото";
function Xi({
  label: i = at,
  disabled: e = !1,
  onFilesSelected: t
}) {
  const s = i.trim() || at;
  return g`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${s}
      aria-label=${s}
      ?disabled=${e}
      @click=${is}
    >
      ${x("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${Yi}
      multiple
      hidden
      ?disabled=${e}
      @change=${(r) => ss(r, t)}
    />
  `;
}
function es({
  attachments: i,
  validationMessage: e = "",
  validationRevision: t = 0,
  onRemove: s
}) {
  const r = e.trim();
  return g`
    ${r ? Ji(
    t,
    g`<p class="attachment-validation" role="alert" data-validation-revision=${t}>
            ${r}
          </p>`
  ) : u}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${rs(i.length)}
    </span>
    ${i.length > 0 ? g`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${i.map((o, n) => {
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
                    <span class="attachment__size">${os(o.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${o.id}
                    type="button"
                    aria-label=${`Удалить фото ${l}`}
                    @click=${() => s(o.id)}
                  >
                    ${x("close", 18)}
                  </button>
                </li>
              `;
  })}
          </ul>
        ` : u}
  `;
}
function ts(i) {
  return i.length === 0 ? u : g`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${i.map(
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
function is(i) {
  const e = i.currentTarget;
  if (!(e instanceof HTMLButtonElement)) return;
  const t = e.nextElementSibling;
  t instanceof HTMLInputElement && !t.disabled && t.click();
}
function ss(i, e) {
  const t = i.currentTarget;
  if (!(t instanceof HTMLInputElement)) return;
  const s = t.files ? Array.from(t.files) : [];
  t.value = "", s.length > 0 && e(s);
}
function rs(i) {
  return `Выбрано фото: ${i}`;
}
function os(i) {
  const e = Math.max(0, Math.floor(i));
  return e < 1024 ? `${e} Б` : e < 1024 * 1024 ? `${lt(e / 1024)} КБ` : `${lt(e / (1024 * 1024))} МБ`;
}
function lt(i) {
  const e = i >= 10 ? 0 : 1;
  return i.toFixed(e).replace(".", ",");
}
function ae(i) {
  return Math.max(1, Math.floor(i));
}
function ns(i, e) {
  return i.role === "system" ? ds(i) : as(i, e);
}
function as(i, e) {
  return g`<div
    class=${`message-root message-root--${i.role}`}
    part="message-root"
    data-message-id=${i.id}
  >
    ${ls(i, e)} ${cs(i, e)}
  </div>`;
}
function ls(i, e) {
  return g`<article class=${ps(i)} part=${`message message-${i.role} message-bubble`}>
    <p class="message__text">${i.text}</p>
    ${ts(e.images ?? [])}
  </article>`;
}
function cs(i, e) {
  const t = i.status === "pending" || i.status === "error";
  return !i.disclosure && !t ? u : g`<div class="message-meta" part="message-meta">
    ${i.disclosure ? g`<div class="message-disclosure" part="message-disclosure">
          ${x("spark", 16)}
          <span>${e.config.disclosureText}</span>
        </div>` : u}
    ${t ? g`<div class=${`message-status-row message-status-row--${i.status}`}>
          <span class="message-status" part="message-status">
            ${i.status === "pending" ? g`<span class="message-status__spinner" aria-hidden="true">${x("loader", 14)}</span
                  >Отправляем…` : "Не отправлено"}
          </span>
          ${hs(i, e)}
        </div>` : u}
  </div>`;
}
function hs(i, e) {
  return i.status !== "error" ? u : g`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${() => e.onRetry(i.id)}
    >
      ${e.config.retryLabel}
    </button>
  </div>`;
}
function ds(i) {
  return g`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${i.id}
    data-system-kind=${i.systemKind ?? "fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${x("shield", 16)}</span>
    <span class="marker__text" part="marker-text">${i.text}</span>
  </div>`;
}
function ps(i) {
  const e = ["message", `message--${i.role}`];
  return i.status === "error" && e.push("message--error"), e.join(" ");
}
const Pe = "granit-site-widget", us = ["normal", "wide", "fullscreen"], ms = ["normal", "fullscreen"], fs = {
  normal: "обычный размер",
  wide: "широкий режим",
  fullscreen: "на весь экран"
}, Te = class Te extends W {
  constructor() {
    super(...arguments), this.config = $e(), this.state = se({ config: this.config }), this.panelSize = "normal", this.hasBooted = !1, this.publicSessionId = "", this.operationEpoch = 0, this.messageScroller = new Pi(this), this.imageAttachments = new _i(this), this.sendMessageRequest = Di, this.panelId = K("sw-panel"), this.titleId = K("sw-title"), this.phoneCaptureId = K("sw-phone"), this.cyclePanelSize = () => {
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
      this.state = v(this.state, { type: "contact.phone.saved", phone: e }, this.config), $(this, "phone-saved", this.config, { hasPhone: e.length > 0 }), this.requestUpdate();
    }, this.retryPending = async (e) => {
      if (!this.state.pending || this.state.submitting || e && e !== this.state.pending.messageId) return;
      const t = this.state.pending, s = this.operationEpoch;
      this.state = v(this.state, { type: "retry.started" }, this.config), this.requestUpdate(), await this.sendPending(t, s);
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
    return [...super.observedAttributes, ..._t];
  }
  connectedCallback() {
    const e = this.hasBooted;
    super.connectedCallback(), this.boot(), e && this.requestUpdate();
  }
  disconnectedCallback() {
    this.invalidateActiveWork(!0), super.disconnectedCallback();
  }
  attributeChangedCallback(e, t, s) {
    if (t === s || !this.hasBooted) return;
    const r = this.config, o = this.isPhotoPreviewEnabled();
    this.config = ze(this), this.syncHostAttributes();
    const n = this.isPhotoPreviewEnabled(), l = r.widgetInstanceId !== this.config.widgetInstanceId || r.storage !== this.config.storage, a = r.apiBaseUrl !== this.config.apiBaseUrl || r.messagesPath !== this.config.messagesPath || r.timeoutMs !== this.config.timeoutMs || r.mock !== this.config.mock, c = o !== n;
    if (l) {
      const h = this.state.open;
      this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.sessionStore = ot(this.config.widgetInstanceId, this.config.storage), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.state = se({ config: this.config, open: h });
    } else (a || c) && this.invalidateActiveWork(!0);
    this.imageAttachments.setEnabled(n), e === "panel-size" && (this.panelSize = this.config.panelSize), e === "open" && (this.state = v(this.state, this.hasAttribute("open") ? { type: "open" } : { type: "close" }, this.config)), this.requestUpdate();
  }
  open() {
    this.boot(), this.state = v(this.state, { type: "open" }, this.config), this.hasAttribute("open") || this.setAttribute("open", ""), this.persistOpenState(!0), $(this, "opened", this.config), this.requestUpdate(), this.focusInputSoon();
  }
  close() {
    this.boot(), this.state = v(this.state, { type: "close" }, this.config), this.hasAttribute("open") && this.removeAttribute("open"), this.persistOpenState(!1), $(this, "closed", this.config), this.requestUpdate(), this.focusLauncherSoon();
  }
  sendMessage(e) {
    this.boot(), this.state = v(this.state, { type: "draft.changed", value: e }, this.config), this.submitDraft();
  }
  clearSession() {
    this.invalidateActiveWork(!1), this.imageAttachments.clearAll(), this.state = v(this.state, { type: "session.cleared" }, this.config), this.sessionStore?.clearPublicSessionId(), this.publicSessionId = this.sessionStore?.getPublicSessionId() ?? "", this.requestUpdate();
  }
  render() {
    const e = Li(this.state, this.config), t = this.getEffectivePanelSize(), s = this.getPanelSizeButtonLabel(), r = t === "fullscreen" ? "minimize-2" : "maximize-2", o = this.messageScroller.getSnapshot(), n = this.isPhotoPreviewEnabled(), l = this.imageAttachments.isProcessing(), a = e.pending ? e.messages.find((h) => h.id === e.pending?.messageId) : void 0, c = a?.status === "error" ? this.config.errorMessage : a?.status === "pending" ? "Отправляем сообщение." : "";
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
        <span part="launcher-icon" aria-hidden="true">${x("message")}</span>
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
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${x("brand", 24)}</div>
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
              aria-label=${s}
              title=${s}
              @click=${this.cyclePanelSize}
            >
              ${x(r)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${() => this.close()}
            >
              ${x("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${() => this.close()}
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
                aria-busy=${String(e.submitting)}
              >
                ${pi(
      e.messages,
      (h) => h.id,
      (h) => g`<div
                    class="message-scroller__item"
                    data-message-id=${h.id}
                    data-scroll-anchor=${h.role === "visitor" ? "true" : u}
                  >
                    ${ns(h, {
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
          ${n ? es({
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
            ${n ? Xi({
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
              ${x("send")}
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
                  ${x("plus", 18)}
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
            <span aria-hidden="true">${x("shield", 18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${c}</div>
        </div>
      </section>
    `;
  }
  updated() {
    this.autoGrowTextarea();
    const e = this.renderRoot.querySelector(".message-scroller"), t = this.renderRoot.querySelector(".message-viewport"), s = this.renderRoot.querySelector(".messages"), r = this.renderRoot.querySelector(".message-scroller__tail");
    e && t && s && r && (this.messageScroller.connect({ root: e, viewport: t, content: s, tailSpacer: r }), this.messageScroller.reconcile(
      this.state.messages.map((o) => ({ id: o.id, scrollAnchor: o.role === "visitor" }))
    ));
  }
  boot() {
    if (this.hasBooted) return;
    this.config = ze(this), this.syncHostAttributes(), this.sessionStore = ot(this.config.widgetInstanceId, this.config.storage), this.publicSessionId = this.sessionStore.getPublicSessionId(), this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize, this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());
    const e = this.config.persistOpenState ? this.sessionStore.getOpenState() : void 0, t = this.hasAttribute("open") || (e ?? this.config.initialState === "open");
    this.state = se({ config: this.config, open: t }), t && !this.hasAttribute("open") && this.setAttribute("open", ""), this.hasBooted = !0, this.updateComplete.then(() => {
      $(this, "ready", this.config), t && this.focusInputSoon();
    });
  }
  syncHostAttributes() {
    this.getAttribute("theme") !== this.config.theme && this.setAttribute("theme", this.config.theme), this.getAttribute("position") !== this.config.position && this.setAttribute("position", this.config.position);
  }
  persistOpenState(e) {
    this.config.persistOpenState && this.sessionStore?.setOpenState(e);
  }
  getPanelSizeButtonLabel() {
    return `${this.config.resizeLabel}: ${fs[this.getNextPanelSize()]}`;
  }
  getNextPanelSize() {
    const e = this.getPanelSizeOrder(), t = e.includes(this.panelSize) ? this.panelSize : "normal", s = e.indexOf(t);
    return e[(s + 1) % e.length] ?? "normal";
  }
  getEffectivePanelSize() {
    return this.isMobileViewport() && this.panelSize === "wide" ? "normal" : this.panelSize;
  }
  getPanelSizeOrder() {
    return this.isMobileViewport() ? ms : us;
  }
  isMobileViewport() {
    return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 767px)").matches;
  }
  handleQuickReply(e) {
    $(this, "action-clicked", this.config, { actionType: "quick-reply" }), this.state = v(this.state, { type: "draft.changed", value: e }, this.config), this.requestUpdate(), this.config.quickReplySubmit === "auto" ? this.submitDraft() : this.focusInputSoon();
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
        @click=${() => $(this, "action-clicked", this.config, { actionType: e.type })}
      >
        ${x(t, 20)}
        <span>${e.label}</span>
      </a>` : g`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${() => this.handleMobileAction(e)}
    >
      ${x(t, 20)}
      <span>${e.label}</span>
    </button>`;
  }
  handleMobileAction(e) {
    $(this, "action-clicked", this.config, { actionType: e.type }), this.open(), e.type === "prefill" && (this.state = v(this.state, { type: "draft.changed", value: e.text }, this.config), this.requestUpdate(), this.focusInputSoon());
  }
  async submitDraft() {
    if (!this.isConnected) return;
    const e = this.operationEpoch;
    let t = this.state.draft.trim();
    if (ne(t, this.config) || this.state.submitting || this.state.pending || this.isPhotoPreviewEnabled() && this.imageAttachments.isProcessing() && (await this.imageAttachments.whenIdle(), e !== this.operationEpoch || !this.isConnected || (t = this.state.draft.trim(), ne(t, this.config) || this.state.submitting || this.state.pending)) || e !== this.operationEpoch || !this.isConnected) return;
    const s = ui(this.publicSessionId);
    this.state = v(this.state, { type: "submit.started", text: t, idempotencyKey: s }, this.config);
    const r = this.state.pending;
    !r || r.idempotencyKey !== s || (this.isPhotoPreviewEnabled() && this.imageAttachments.transferDraftToMessage(r.messageId), this.requestUpdate(), await this.sendPending(r, e));
  }
  async sendPending(e, t) {
    this.abortController?.abort();
    const s = new AbortController();
    this.abortController = s;
    const { messageId: r, text: o, idempotencyKey: n } = e, l = () => this.operationEpoch === t && this.abortController === s && !s.signal.aborted && this.isConnected && this.state.pending?.messageId === r && this.state.pending.idempotencyKey === n;
    try {
      const a = Ti({
        config: this.config,
        text: o,
        publicSessionId: this.publicSessionId,
        idempotencyKey: n,
        contact: this.buildContact(),
        environment: Bi()
      });
      if ($(this, "message-submitted", this.config, {
        idempotencyKey: n,
        publicSessionId: this.publicSessionId,
        messageText: o
      }), !l()) return;
      const c = await this.sendMessageRequest(this.config, a, s.signal);
      if (!l()) return;
      if (c.publicSessionId && (this.publicSessionId = c.publicSessionId, this.sessionStore?.setPublicSessionId(c.publicSessionId)), this.state = v(this.state, { type: "visitor.persisted", text: o, messageId: r }, this.config), c.status === "replied" && c.replyText)
        this.state = v(this.state, { type: "assistant.replied", text: c.replyText }, this.config);
      else {
        const h = c.status === "disabled" ? "disabled" : "fallback";
        this.state = v(
          this.state,
          { type: "system.message", text: c.systemText || this.config.fallbackMessage, status: h },
          this.config
        ), $(this, "fallback-shown", this.config, {
          status: h,
          reason: c.reason ?? ""
        });
      }
      $(this, "response-received", this.config, {
        status: c.status,
        reason: c.reason ?? ""
      }), this.requestUpdate();
    } catch (a) {
      if (a instanceof DOMException && a.name === "AbortError" && s.signal.aborted || !l()) return;
      this.state = v(
        this.state,
        { type: "submit.failed", text: this.config.errorMessage, messageId: r },
        this.config
      ), $(this, "error", this.config, {
        errorMessage: a instanceof Error ? a.message : String(a)
      }), this.requestUpdate();
    } finally {
      this.abortController === s && (this.abortController = void 0);
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
Te.styles = [Zi, Gi];
let xe = Te;
function Se(i = Pe) {
  typeof window > "u" || !window.customElements || window.customElements.get(i) || window.customElements.define(i, xe);
}
function gs(i = {}) {
  if (typeof document > "u")
    throw new Error("mountSiteWidget requires a browser document");
  Se();
  const e = document.createElement(Pe);
  It(e, i);
  const t = i.target ?? document.body;
  if (!t) throw new Error("mountSiteWidget target was not found");
  return t.appendChild(e), e;
}
typeof window < "u" && (window.GranitSiteWidget = {
  define: Se,
  mount: gs,
  tagName: Pe
}, Se());
export {
  xe as GranitSiteWidgetElement,
  Pe as SITE_WIDGET_TAG_NAME,
  Se as defineSiteWidget,
  gs as mountSiteWidget
};
//# sourceMappingURL=site-widget.esm.js.map

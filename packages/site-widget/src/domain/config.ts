import type {
  MountSiteWidgetOptions,
  QuickReplySubmitMode,
  SiteWidgetAction,
  SiteWidgetConfig,
  SiteWidgetInitialState,
  SiteWidgetPanelSize,
  SiteWidgetPosition,
  SiteWidgetQuickReply,
  SiteWidgetStorageMode
} from "../types/public";

export const DEFAULT_QUICK_REPLIES: SiteWidgetQuickReply[] = [
  { label: "Нужен расчет", text: "Нужен расчет памятника с установкой" },
  { label: "Есть вопрос", text: "Здравствуйте, у меня есть вопрос по заказу" },
  { label: "Хочу каталог", text: "Хочу посмотреть каталог памятников" }
];

export const DEFAULT_MOBILE_ACTIONS: SiteWidgetAction[] = [
  { type: "call", label: "Позвонить", href: "tel:", icon: "phone" },
  { type: "open", label: "Написать", icon: "message" },
  { type: "prefill", label: "Расчет", text: "Нужен расчет памятника", icon: "calculator" }
];

export const DEFAULT_WIDGET_CONFIG: SiteWidgetConfig = {
  apiBaseUrl: "",
  messagesPath: "/public/intake/site-widget/messages",
  timeoutMs: 15000,
  widgetInstanceId: "default",
  theme: "memorial-soft",
  position: "bottom-right",
  panelSize: "normal",
  mock: false,
  initialState: "closed",
  persistOpenState: false,
  storage: "local",
  quickReplySubmit: "prefill",
  showQuickActions: true,
  showMobileActions: true,
  showAttachmentSlot: true,
  attachmentsEnabled: false,
  collectPhoneAfterFirstMessage: false,
  includeMessageTextInEvents: false,
  maxMessageLength: 1000,

  launcherLabel: "Написать",
  headerTitle: "Поможем с заказом",
  headerStatus: "Онлайн",
  headerResponseTime: "обычно отвечаем за 2 минуты",
  introMessage:
    "Здравствуйте! 👋\nПодскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.",
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

  phoneHref: undefined,
  privacyUrl: undefined,
  quickReplies: DEFAULT_QUICK_REPLIES,
  mobileActions: DEFAULT_MOBILE_ACTIONS
};

const ATTRIBUTE_MAP = {
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
} as const satisfies Record<string, keyof SiteWidgetConfig>;

export const OBSERVED_CONFIG_ATTRIBUTES = [
  ...Object.keys(ATTRIBUTE_MAP),
  "config",
  "quick-replies",
  "mobile-actions",
  "open"
];

const BOOLEAN_KEYS = new Set<keyof SiteWidgetConfig>([
  "mock",
  "persistOpenState",
  "showQuickActions",
  "showMobileActions",
  "showAttachmentSlot",
  "attachmentsEnabled",
  "collectPhoneAfterFirstMessage",
  "includeMessageTextInEvents"
]);

const NUMBER_KEYS = new Set<keyof SiteWidgetConfig>(["timeoutMs", "maxMessageLength"]);

export function normalizeWidgetConfig(input: Partial<SiteWidgetConfig> = {}): SiteWidgetConfig {
  const raw = { ...DEFAULT_WIDGET_CONFIG, ...input };
  const timeoutMs = toPositiveInteger(raw.timeoutMs, DEFAULT_WIDGET_CONFIG.timeoutMs, 60000);
  const maxMessageLength = toPositiveInteger(raw.maxMessageLength, DEFAULT_WIDGET_CONFIG.maxMessageLength, 10000);

  return {
    ...raw,
    apiBaseUrl: trimTrailingSlash(stringValue(raw.apiBaseUrl)),
    messagesPath: normalizeMessagesPath(raw.messagesPath),
    timeoutMs,
    widgetInstanceId: stringValue(raw.widgetInstanceId) || DEFAULT_WIDGET_CONFIG.widgetInstanceId,
    theme: stringValue(raw.theme) || DEFAULT_WIDGET_CONFIG.theme,
    position: normalizePosition(raw.position),
    panelSize: normalizePanelSize(raw.panelSize),
    mock: Boolean(raw.mock),
    initialState: normalizeInitialState(raw.initialState),
    persistOpenState: Boolean(raw.persistOpenState),
    storage: normalizeStorage(raw.storage),
    quickReplySubmit: normalizeQuickReplySubmit(raw.quickReplySubmit),
    showQuickActions: Boolean(raw.showQuickActions),
    showMobileActions: Boolean(raw.showMobileActions),
    showAttachmentSlot: Boolean(raw.showAttachmentSlot),
    attachmentsEnabled: Boolean(raw.attachmentsEnabled),
    collectPhoneAfterFirstMessage: Boolean(raw.collectPhoneAfterFirstMessage),
    includeMessageTextInEvents: Boolean(raw.includeMessageTextInEvents),
    maxMessageLength,
    phoneHref: optionalString(raw.phoneHref),
    privacyUrl: optionalString(raw.privacyUrl),
    quickReplies: normalizeQuickReplies(raw.quickReplies),
    mobileActions: normalizeActions(raw.mobileActions, raw.phoneHref)
  };
}

export function readConfigFromElement(element: Element): SiteWidgetConfig {
  const raw: Partial<SiteWidgetConfig> = {
    ...readInlineConfig(element),
    ...readJsonConfigAttribute(element.getAttribute("config"))
  };

  for (const [attributeName, configKey] of Object.entries(ATTRIBUTE_MAP)) {
    if (!element.hasAttribute(attributeName)) continue;
    const value = element.getAttribute(attributeName);
    if (value == null) continue;

    if (BOOLEAN_KEYS.has(configKey)) {
      (raw as Record<string, unknown>)[configKey] = parseBoolean(value);
    } else if (NUMBER_KEYS.has(configKey)) {
      (raw as Record<string, unknown>)[configKey] = Number(value);
    } else {
      (raw as Record<string, unknown>)[configKey] = value;
    }
  }

  if (element.hasAttribute("quick-replies")) {
    raw.quickReplies = parseQuickReplies(element.getAttribute("quick-replies") ?? "");
  }

  if (element.hasAttribute("mobile-actions")) {
    raw.mobileActions = parseActions(element.getAttribute("mobile-actions") ?? "");
  }

  return normalizeWidgetConfig(raw);
}

export function applyOptionsToElement(element: HTMLElement, options: MountSiteWidgetOptions = {}): void {
  const normalized = normalizeWidgetConfig(options);

  setAttr(element, "api-base-url", normalized.apiBaseUrl);
  setAttr(element, "messages-path", normalized.messagesPath);
  setAttr(element, "timeout-ms", String(normalized.timeoutMs));
  setAttr(element, "widget-instance-id", normalized.widgetInstanceId);
  setAttr(element, "theme", normalized.theme);
  setAttr(element, "position", normalized.position);
  setAttr(element, "panel-size", normalized.panelSize);
  setAttr(element, "initial-state", normalized.initialState);
  setAttr(element, "storage", normalized.storage);
  setAttr(element, "quick-reply-submit", normalized.quickReplySubmit);
  setAttr(element, "launcher-label", normalized.launcherLabel);
  setAttr(element, "header-title", normalized.headerTitle);
  setAttr(element, "header-status", normalized.headerStatus);
  setAttr(element, "header-response-time", normalized.headerResponseTime);
  setAttr(element, "intro-message", normalized.introMessage);
  setAttr(element, "placeholder", normalized.placeholder);
  setAttr(element, "disclosure-text", normalized.disclosureText);
  setAttr(element, "footer-note", normalized.footerNote);
  setAttr(element, "phone-capture-label", normalized.phoneCaptureLabel);
  setAttr(element, "phone-saved-label", normalized.phoneSavedLabel);
  setAttr(element, "phone-placeholder", normalized.phonePlaceholder);
  setAttr(element, "fallback-message", normalized.fallbackMessage);
  setAttr(element, "disabled-message", normalized.disabledMessage);
  setAttr(element, "error-message", normalized.errorMessage);
  setAttr(element, "retry-label", normalized.retryLabel);
  setAttr(element, "send-label", normalized.sendLabel);
  setAttr(element, "attach-label", normalized.attachLabel);
  setAttr(element, "resize-label", normalized.resizeLabel);
  setAttr(element, "close-label", normalized.closeLabel);
  setAttr(element, "minimize-label", normalized.minimizeLabel);
  setAttr(element, "phone-href", normalized.phoneHref);
  setAttr(element, "privacy-url", normalized.privacyUrl);
  setAttr(element, "max-message-length", String(normalized.maxMessageLength));

  setBooleanAttr(element, "mock", normalized.mock);
  setBooleanAttr(element, "persist-open-state", normalized.persistOpenState);
  setAttr(element, "show-quick-actions", String(normalized.showQuickActions));
  setAttr(element, "show-mobile-actions", String(normalized.showMobileActions));
  setAttr(element, "show-attachment-slot", String(normalized.showAttachmentSlot));
  setBooleanAttr(element, "attachments-enabled", normalized.attachmentsEnabled);
  setBooleanAttr(element, "collect-phone-after-first-message", normalized.collectPhoneAfterFirstMessage);
  setBooleanAttr(element, "include-message-text-in-events", normalized.includeMessageTextInEvents);

  if (options.open || normalized.initialState === "open") element.setAttribute("open", "");
  if (normalized.quickReplies.length > 0) element.setAttribute("quick-replies", JSON.stringify(normalized.quickReplies));
  if (normalized.mobileActions.length > 0) element.setAttribute("mobile-actions", JSON.stringify(normalized.mobileActions));

  for (const [name, value] of Object.entries(options.attributes ?? {})) {
    element.setAttribute(name, value);
  }
}

export function parseQuickReplies(value: string): SiteWidgetQuickReply[] {
  const trimmed = value.trim();
  if (!trimmed) return [];
  const parsed = parseJson<unknown>(trimmed);
  if (Array.isArray(parsed)) return normalizeQuickReplies(parsed as SiteWidgetQuickReply[]);

  return normalizeQuickReplies(
    trimmed
      .split("|")
      .map((label) => ({ label: label.trim(), text: label.trim() }))
      .filter((reply) => reply.label)
  );
}

export function parseActions(value: string): SiteWidgetAction[] {
  const trimmed = value.trim();
  if (!trimmed) return [];
  const parsed = parseJson<unknown>(trimmed);
  if (Array.isArray(parsed)) return normalizeActions(parsed as SiteWidgetAction[]);

  return normalizeActions(
    trimmed
      .split("|")
      .map((label) => ({ type: "open" as const, label: label.trim() }))
      .filter((action) => action.label)
  );
}

export function normalizeQuickReplies(value: readonly SiteWidgetQuickReply[] = []): SiteWidgetQuickReply[] {
  return value
    .map((reply) => {
      const label = stringValue(reply?.label);
      const text = stringValue(reply?.text ?? reply?.value ?? reply?.label);
      return { label, text };
    })
    .filter((reply) => reply.label.length > 0 && reply.text.length > 0)
    .slice(0, 6);
}

export function normalizeActions(value: readonly SiteWidgetAction[] = [], phoneHref?: string): SiteWidgetAction[] {
  return value
    .map((action): SiteWidgetAction | undefined => {
      const label = stringValue(action?.label);
      if (!label) return undefined;
      if (action.type === "call") {
        const href = stringValue(action.href || phoneHref || "tel:");
        return { type: "call", label, href, icon: optionalString(action.icon) };
      }
      if (action.type === "link") {
        const href = stringValue(action.href);
        if (!href) return undefined;
        return {
          type: "link",
          label,
          href,
          target: action.target === "_self" ? "_self" : "_blank",
          icon: optionalString(action.icon)
        };
      }
      if (action.type === "prefill") {
        const text = stringValue(action.text);
        if (!text) return undefined;
        return { type: "prefill", label, text, icon: optionalString(action.icon) };
      }
      return { type: "open", label, icon: optionalString(action.icon) };
    })
    .filter((action): action is SiteWidgetAction => Boolean(action))
    .slice(0, 4);
}

function readInlineConfig(element: Element): Partial<SiteWidgetConfig> {
  const script = element.querySelector?.('script[type="application/json"][data-site-widget-config]');
  if (!script?.textContent) return {};
  return readJsonConfigAttribute(script.textContent);
}

function readJsonConfigAttribute(value: string | null): Partial<SiteWidgetConfig> {
  if (!value?.trim()) return {};
  const parsed = parseJson<Partial<SiteWidgetConfig>>(value);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

function setAttr(element: HTMLElement, name: string, value?: string): void {
  if (value && value.length > 0) element.setAttribute(name, value);
}

function setBooleanAttr(element: HTMLElement, name: string, enabled: boolean): void {
  if (enabled) element.setAttribute(name, "true");
  else element.removeAttribute(name);
}

function parseBoolean(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === "" || normalized === "1" || normalized === "true" || normalized === "yes";
}

function normalizePosition(value: unknown): SiteWidgetPosition {
  const normalized = stringValue(value);
  if (normalized === "bottom-left" || normalized === "inline") return normalized;
  return "bottom-right";
}

export function normalizePanelSize(value: unknown): SiteWidgetPanelSize {
  const normalized = stringValue(value);
  if (normalized === "wide" || normalized === "fullscreen") return normalized;
  return "normal";
}

function normalizeInitialState(value: unknown): SiteWidgetInitialState {
  return stringValue(value) === "open" ? "open" : "closed";
}

function normalizeStorage(value: unknown): SiteWidgetStorageMode {
  return stringValue(value) === "memory" ? "memory" : "local";
}

function normalizeQuickReplySubmit(value: unknown): QuickReplySubmitMode {
  return stringValue(value) === "auto" ? "auto" : "prefill";
}

function normalizeMessagesPath(value: unknown): string {
  const normalized = stringValue(value);
  if (!normalized) return DEFAULT_WIDGET_CONFIG.messagesPath;
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function toPositiveInteger(value: unknown, fallback: number, max: number): number {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) return fallback;
  return Math.min(numeric, max);
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function optionalString(value: unknown): string | undefined {
  const normalized = stringValue(value);
  return normalized || undefined;
}

function stringValue(value: unknown): string {
  return String(value ?? "").trim();
}

function parseJson<T>(value: string): T | undefined {
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

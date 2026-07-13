import { stableHash } from "../domain/ids";
import type { SiteWidgetConfig, SiteWidgetEventName } from "../types/public";

const PRIMARY_PREFIX = "granit-site-widget";
const ALIAS_PREFIX = "granit-widget";

const LEGACY_EVENT_NAMES: Partial<Record<SiteWidgetEventName, string>> = {
  opened: "open",
  closed: "close",
  "response-received": "response"
};

export type SiteWidgetEventDetail = Record<string, unknown>;

export function emitSiteWidgetEvent(
  element: HTMLElement,
  name: SiteWidgetEventName,
  config: SiteWidgetConfig,
  detail: SiteWidgetEventDetail = {}
): void {
  const safeDetail = sanitizeEventDetail(detail, config);
  dispatch(element, `${PRIMARY_PREFIX}:${name}`, safeDetail);
  dispatch(element, `${ALIAS_PREFIX}:${name}`, safeDetail);

  const legacyName = LEGACY_EVENT_NAMES[name];
  if (legacyName) {
    dispatch(element, `${PRIMARY_PREFIX}:${legacyName}`, safeDetail);
    dispatch(element, `${ALIAS_PREFIX}:${legacyName}`, safeDetail);
  }
}

export function sanitizeEventDetail(detail: SiteWidgetEventDetail, config: SiteWidgetConfig): SiteWidgetEventDetail {
  const result: SiteWidgetEventDetail = {
    ...detail,
    widgetInstanceId: detail.widgetInstanceId ?? config.widgetInstanceId
  };

  if (typeof result.publicSessionId === "string") {
    const publicSessionId = result.publicSessionId.trim();
    if (publicSessionId) result.publicSessionIdHash = stableHash(publicSessionId);
    delete result.publicSessionId;
  }

  if (!config.includeMessageTextInEvents) {
    if (typeof result.messageText === "string") result.messageLength = result.messageText.length;
    delete result.messageText;
  }

  return result;
}

function dispatch(element: HTMLElement, eventName: string, detail: SiteWidgetEventDetail): void {
  element.dispatchEvent(
    new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail
    })
  );
}

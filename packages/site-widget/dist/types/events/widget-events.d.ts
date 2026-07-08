import type { SiteWidgetConfig, SiteWidgetEventName } from "../types/public";
export type SiteWidgetEventDetail = Record<string, unknown>;
export declare function emitSiteWidgetEvent(element: HTMLElement, name: SiteWidgetEventName, config: SiteWidgetConfig, detail?: SiteWidgetEventDetail): void;
export declare function sanitizeEventDetail(detail: SiteWidgetEventDetail, config: SiteWidgetConfig): SiteWidgetEventDetail;
//# sourceMappingURL=widget-events.d.ts.map
import type { SiteWidgetConfig, SiteWidgetMessageRequest, SiteWidgetResponseViewModel } from "../types/public";
export declare function sendSiteWidgetMessage(config: SiteWidgetConfig, request: SiteWidgetMessageRequest, signal?: AbortSignal): Promise<SiteWidgetResponseViewModel>;
export declare function mockSiteWidgetMessage(config: SiteWidgetConfig, request: SiteWidgetMessageRequest, signal?: AbortSignal): Promise<SiteWidgetResponseViewModel>;
//# sourceMappingURL=intake-client.d.ts.map
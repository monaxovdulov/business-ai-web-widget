import type { SiteWidgetConfig, SiteWidgetContact, SiteWidgetMessageRequest, SiteWidgetUtm } from "../types/public";
import type { BrowserEnvironmentSnapshot } from "../services/browser-env";
export type BuildSiteWidgetRequestInput = {
    config: SiteWidgetConfig;
    text: string;
    publicSessionId?: string | undefined;
    idempotencyKey: string;
    contact?: SiteWidgetContact | undefined;
    environment: BrowserEnvironmentSnapshot;
    privacyPolicyAccepted?: boolean | undefined;
};
export declare function buildSiteWidgetMessageRequest(input: BuildSiteWidgetRequestInput): SiteWidgetMessageRequest;
export declare function parseUtm(search?: string): SiteWidgetUtm | undefined;
//# sourceMappingURL=request.d.ts.map
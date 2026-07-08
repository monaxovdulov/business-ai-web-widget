import { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME } from "./components/granit-site-widget";
import type { GranitSiteWidgetGlobal, MountSiteWidgetOptions } from "./types/public";
export { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME };
export type * from "./types/public";
export declare function defineSiteWidget(tagName?: string): void;
export declare function mountSiteWidget(options?: MountSiteWidgetOptions): GranitSiteWidgetElement;
declare global {
    interface Window {
        GranitSiteWidget?: GranitSiteWidgetGlobal;
    }
    interface HTMLElementTagNameMap {
        "granit-site-widget": GranitSiteWidgetElement;
    }
}
//# sourceMappingURL=index.d.ts.map
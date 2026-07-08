import { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME } from "./types/components/granit-site-widget";
import type { GranitSiteWidgetGlobal, MountSiteWidgetOptions } from "./types/types/public";
export { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME };
export type * from "./types/types/public";
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
//# sourceMappingURL=site-widget.d.ts.map
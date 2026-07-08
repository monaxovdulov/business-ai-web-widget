import type { MountSiteWidgetOptions, SiteWidgetAction, SiteWidgetConfig, SiteWidgetPanelSize, SiteWidgetQuickReply } from "../types/public";
export declare const DEFAULT_QUICK_REPLIES: SiteWidgetQuickReply[];
export declare const DEFAULT_MOBILE_ACTIONS: SiteWidgetAction[];
export declare const DEFAULT_WIDGET_CONFIG: SiteWidgetConfig;
export declare const OBSERVED_CONFIG_ATTRIBUTES: string[];
export declare function normalizeWidgetConfig(input?: Partial<SiteWidgetConfig>): SiteWidgetConfig;
export declare function readConfigFromElement(element: Element): SiteWidgetConfig;
export declare function applyOptionsToElement(element: HTMLElement, options?: MountSiteWidgetOptions): void;
export declare function parseQuickReplies(value: string): SiteWidgetQuickReply[];
export declare function parseActions(value: string): SiteWidgetAction[];
export declare function normalizeQuickReplies(value?: readonly SiteWidgetQuickReply[]): SiteWidgetQuickReply[];
export declare function normalizeActions(value?: readonly SiteWidgetAction[], phoneHref?: string): SiteWidgetAction[];
export declare function normalizePanelSize(value: unknown): SiteWidgetPanelSize;
//# sourceMappingURL=config.d.ts.map
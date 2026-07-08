import type { SiteWidgetPanelSize, SiteWidgetStorageMode } from "../types/public";
export type WidgetSessionStore = {
    getPublicSessionId(): string;
    setPublicSessionId(publicSessionId: string): void;
    clearPublicSessionId(): void;
    getOpenState(): boolean | undefined;
    setOpenState(open: boolean): void;
    getPanelSize(): SiteWidgetPanelSize | undefined;
    setPanelSize(panelSize: SiteWidgetPanelSize): void;
};
export declare function createSessionStore(widgetInstanceId: string, mode?: SiteWidgetStorageMode): WidgetSessionStore;
//# sourceMappingURL=session-store.d.ts.map
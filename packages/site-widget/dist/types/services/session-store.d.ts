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
export type WidgetSessionStoreOptions = {
    conversationScopeId?: string | undefined;
    legacyConversationScopeIds?: readonly string[] | undefined;
};
export declare function createSessionStore(widgetInstanceId: string, mode?: SiteWidgetStorageMode, options?: WidgetSessionStoreOptions): WidgetSessionStore;
//# sourceMappingURL=session-store.d.ts.map
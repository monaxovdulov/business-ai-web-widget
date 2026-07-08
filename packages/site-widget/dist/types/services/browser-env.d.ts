export type BrowserEnvironmentSnapshot = {
    href: string;
    search: string;
    title?: string | undefined;
    referrer?: string | undefined;
    locale?: string | undefined;
    timezone?: string | undefined;
    now: string;
};
export declare function readBrowserEnvironment(now?: Date): BrowserEnvironmentSnapshot;
//# sourceMappingURL=browser-env.d.ts.map
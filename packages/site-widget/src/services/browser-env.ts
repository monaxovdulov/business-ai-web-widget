export type BrowserEnvironmentSnapshot = {
  href: string;
  search: string;
  title?: string | undefined;
  referrer?: string | undefined;
  locale?: string | undefined;
  timezone?: string | undefined;
  now: string;
};

export function readBrowserEnvironment(now = new Date()): BrowserEnvironmentSnapshot {
  return {
    href: typeof window === "undefined" ? "" : window.location.href,
    search: typeof window === "undefined" ? "" : window.location.search,
    title: typeof document === "undefined" ? undefined : document.title || undefined,
    referrer: typeof document === "undefined" ? undefined : document.referrer || undefined,
    locale: typeof navigator === "undefined" ? undefined : navigator.language || undefined,
    timezone: readTimezone(),
    now: now.toISOString()
  };
}

function readTimezone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}

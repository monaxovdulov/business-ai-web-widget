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

export function buildSiteWidgetMessageRequest(input: BuildSiteWidgetRequestInput): SiteWidgetMessageRequest {
  const contact = compactContact(input.contact);
  const utm = parseUtm(input.environment.search);
  const source = withoutEmpty({
    channel: "site_widget" as const,
    page_url: input.environment.href,
    widget_instance_id: input.config.widgetInstanceId,
    page_title: input.environment.title,
    referrer_url: input.environment.referrer,
    utm
  });
  const visitorContext = withoutEmpty({
    locale: input.environment.locale,
    timezone: input.environment.timezone
  });

  return withoutEmpty({
    schema_version: "site_widget.v1" as const,
    event_type: "site_widget.message_submitted" as const,
    idempotency_key: input.idempotencyKey,
    submitted_at: input.environment.now,
    public_session_id: input.publicSessionId,
    source,
    contact: contact && Object.keys(contact).length > 0 ? contact : undefined,
    message: {
      role: "visitor" as const,
      text: input.text.trim()
    },
    visitor_context: Object.keys(visitorContext).length > 0 ? visitorContext : undefined,
    consent: input.privacyPolicyAccepted ? { privacy_policy: true } : undefined
  });
}

export function parseUtm(search = ""): SiteWidgetUtm | undefined {
  if (!search.trim()) return undefined;
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const utm = withoutEmpty({
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined
  });

  return Object.keys(utm).length > 0 ? utm : undefined;
}

function compactContact(contact?: SiteWidgetContact): SiteWidgetContact | undefined {
  if (!contact) return undefined;
  return withoutEmpty({
    name: trim(contact.name),
    phone: trim(contact.phone),
    email: trim(contact.email),
    preferred_contact: contact.preferred_contact,
    city: trim(contact.city)
  });
}

function trim(value?: string): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

function withoutEmpty<T extends Record<string, unknown>>(record: T): T {
  for (const key of Object.keys(record)) {
    const value = record[key];
    if (value === undefined || value === null || value === "") {
      delete record[key];
    } else if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
      delete record[key];
    }
  }
  return record;
}

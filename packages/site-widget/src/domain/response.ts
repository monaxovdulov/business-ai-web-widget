import type { SiteWidgetConfig, SiteWidgetResponseViewModel } from "../types/public";
import { normalizePublicSessionId } from "./public-session";

export function mapSiteWidgetResponse(body: unknown, config: SiteWidgetConfig): SiteWidgetResponseViewModel {
  const record = asRecord(body) ?? {};
  const automation = asRecord(record.automation) ?? {};
  const status = stringValue(automation.status);
  const publicSessionId =
    normalizePublicSessionId(record.public_session_id) ??
    normalizePublicSessionId(asRecord(record.session)?.public_session_id) ??
    normalizePublicSessionId(record.publicSessionId);

  if (status === "replied") {
    const reply = asRecord(automation.reply) ?? asRecord(record.reply) ?? {};
    const persisted = booleanish(reply.persisted) ?? booleanish(reply.is_persisted) ?? booleanish(automation.reply_persisted);
    const replyText = stringValue(reply.text) ?? stringValue(reply.body) ?? stringValue(automation.persisted_text);

    if (replyText && persisted !== false) {
      return {
        status: "replied",
        publicSessionId,
        replyText,
        reason: stringValue(automation.reason),
        raw: body
      };
    }

    return {
      status: "fallback",
      publicSessionId,
      systemText: safeSystemMessage(automation, config.fallbackMessage),
      reason: stringValue(automation.reason),
      raw: body
    };
  }

  if (status === "disabled") {
    return {
      status: "disabled",
      publicSessionId,
      systemText: safeSystemMessage(automation, config.disabledMessage),
      reason: stringValue(automation.reason),
      raw: body
    };
  }

  if (status === "fallback") {
    return {
      status: "fallback",
      publicSessionId,
      systemText: safeSystemMessage(automation, config.fallbackMessage),
      reason: stringValue(automation.reason),
      raw: body
    };
  }

  return {
    status: "fallback",
    publicSessionId,
    systemText: config.fallbackMessage,
    raw: body
  };
}

function safeSystemMessage(automation: Record<string, unknown>, fallback: string): string {
  return stringValue(automation.message) ?? stringValue(automation.display_message) ?? fallback;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

function stringValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function booleanish(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  return undefined;
}

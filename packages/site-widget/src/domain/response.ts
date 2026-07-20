import type {
  SiteWidgetAcceptanceStatus,
  SiteWidgetConfig,
  SiteWidgetServerResponseViewModel
} from "../types/public";
import { normalizePublicUuid } from "./public-session";

const FALLBACK_REASONS = new Set([
  "missing_openai_config",
  "model_error",
  "empty_model_response",
  "unsafe_model_response",
  "semantic_verifier_error",
  "grounding_validation_failed",
  "turn_timeout",
  "agent_reply_blocked",
  "ai_persistence_unconfirmed"
]);

const ROOT_KEYS = [
  "ok",
  "schema_version",
  "status",
  "public_session_id",
  "public_message_id",
  "action",
  "automation",
  "message_to_user"
] as const;
const REPLIED_AUTOMATION_KEYS = ["status", "next_step", "conversation_state", "disclosure", "reply"] as const;
const DEGRADED_AUTOMATION_KEYS = ["status", "next_step", "conversation_state", "reason"] as const;
const FALLBACK_AUTOMATION_KEYS = ["status", "next_step", "reason"] as const;
const DISABLED_AUTOMATION_KEYS = ["status", "next_step"] as const;
const DISCLOSURE_KEYS = ["shown", "version", "text"] as const;
const REPLY_KEYS = ["public_message_id", "sender_role", "text"] as const;

export function mapSiteWidgetResponse(body: unknown, config: SiteWidgetConfig): SiteWidgetServerResponseViewModel {
  const record = requireRecord(body, "root");
  requireExactKeys(record, ROOT_KEYS, "root");
  if (record.ok !== true) protocolError("ok");
  if (record.schema_version !== "site_widget.v1") protocolError("schema_version");

  const acceptanceStatus = requireAcceptanceStatus(record.status);
  if (record.action !== "show_widget_saved") protocolError("action");

  const publicSessionId = requireUuid(record.public_session_id, "public_session_id");
  const publicMessageId = requireUuid(record.public_message_id, "public_message_id");
  const messageToUser = requireString(record.message_to_user, "message_to_user");
  const automation = requireRecord(record.automation, "automation");
  const automationStatus = requireString(automation.status, "automation.status");
  const base = {
    source: "server" as const,
    acceptanceStatus,
    action: "show_widget_saved" as const,
    publicSessionId,
    publicMessageId,
    raw: body
  };

  if (automationStatus === "replied") {
    requireExactKeys(automation, REPLIED_AUTOMATION_KEYS, "automation");
    if (automation.next_step !== "ai_reply_shown") protocolError("automation.next_step");
    if (automation.conversation_state !== undefined) {
      requireConversationState(automation.conversation_state, ["ai_active", "manager_pending"]);
    }
    const disclosure = requireRecord(automation.disclosure, "automation.disclosure");
    requireExactKeys(disclosure, DISCLOSURE_KEYS, "automation.disclosure");
    if (disclosure.shown !== true) protocolError("automation.disclosure.shown");
    requireBoundedString(disclosure.version, "automation.disclosure.version", 120);
    const disclosureText = requireBoundedString(disclosure.text, "automation.disclosure.text", 1_000);

    const reply = requireRecord(automation.reply, "automation.reply");
    requireExactKeys(reply, REPLY_KEYS, "automation.reply");
    const replyPublicMessageId = requireUuid(reply.public_message_id, "automation.reply.public_message_id");
    if (replyPublicMessageId === publicMessageId) protocolError("automation.reply.public_message_id_identity");
    if (reply.sender_role !== "ai_assistant") protocolError("automation.reply.sender_role");
    const replyText = requireBoundedString(reply.text, "automation.reply.text", 1_000);

    return {
      ...base,
      status: "replied",
      replyText,
      replyPublicMessageId,
      disclosureText
    };
  }

  if (automationStatus === "degraded") {
    requireExactKeys(automation, DEGRADED_AUTOMATION_KEYS, "automation");
    if (automation.next_step !== "retry_available") protocolError("automation.next_step");
    requireConversationState(automation.conversation_state, ["ai_active"]);
    const reason = requireString(automation.reason, "automation.reason");
    if (!FALLBACK_REASONS.has(reason)) protocolError("automation.reason");
    return {
      ...base,
      status: "fallback",
      systemText: messageToUser.trim() || config.fallbackMessage,
      reason
    };
  }

  if (automationStatus === "fallback") {
    requireExactKeys(automation, FALLBACK_AUTOMATION_KEYS, "automation");
    if (automation.next_step !== "manager_review") protocolError("automation.next_step");
    const reason = requireString(automation.reason, "automation.reason");
    if (!FALLBACK_REASONS.has(reason)) protocolError("automation.reason");
    return {
      ...base,
      status: "fallback",
      systemText: messageToUser.trim() || config.fallbackMessage,
      reason
    };
  }

  if (automationStatus === "disabled") {
    requireExactKeys(automation, DISABLED_AUTOMATION_KEYS, "automation");
    if (automation.next_step !== "manager_review") protocolError("automation.next_step");
    return {
      ...base,
      status: "disabled",
      systemText: messageToUser.trim() || config.disabledMessage
    };
  }

  protocolError("automation.status");
}

function requireAcceptanceStatus(value: unknown): SiteWidgetAcceptanceStatus {
  if (value === "accepted" || value === "replayed") return value;
  return protocolError("status");
}

function requireConversationState(value: unknown, allowedStates: readonly string[]): string {
  const state = requireString(value, "automation.conversation_state");
  if (!allowedStates.includes(state)) protocolError("automation.conversation_state");
  return state;
}

function requireUuid(value: unknown, field: string): string {
  return normalizePublicUuid(value) ?? protocolError(field);
}

function requireRecord(value: unknown, field: string): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return protocolError(field);
}

function requireExactKeys(record: Record<string, unknown>, allowedKeys: readonly string[], field: string): void {
  const allowed = new Set(allowedKeys);
  const unexpected = Object.keys(record).find((key) => !allowed.has(key));
  if (unexpected) protocolError(`${field}.${unexpected}`);
}

function requireString(value: unknown, field: string): string {
  if (typeof value === "string") return value;
  return protocolError(field);
}

function requireNonEmptyString(value: unknown, field: string): string {
  const string = requireString(value, field).trim();
  return string || protocolError(field);
}

function requireBoundedString(value: unknown, field: string, maxLength: number): string {
  const raw = requireString(value, field);
  if (raw.length > maxLength) protocolError(field);
  const normalized = raw.trim();
  return normalized || protocolError(field);
}

function protocolError(field: string): never {
  throw new Error(`Invalid site_widget.v1 response: ${field}`);
}

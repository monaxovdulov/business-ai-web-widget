import { normalizePublicUuid } from "./public-session";
import type {
  SiteWidgetHistoryMessage,
  SiteWidgetHistoryViewModel,
  WidgetCatalogReference
} from "../types/public";

const ROOT_KEYS = [
  "ok",
  "schema_version",
  "public_session_id",
  "public_conversation_id",
  "conversation_state",
  "poll_after_ms",
  "messages"
] as const;
const MESSAGE_KEYS = [
  "public_message_id",
  "sender_role",
  "text",
  "submitted_at",
  "delivery_state",
  "catalog_references",
  "automation"
] as const;
const REFERENCE_KEYS = ["kind", "label", "title", "href", "entity_id"] as const;
const AUTOMATION_KEYS = ["status", "reason"] as const;
const CATALOG_HREF =
  /^\/catalog\.html\?section=[a-z0-9-]+&entity=ent_[a-f0-9]+#block-[a-z0-9-]+$/;

export function mapSiteWidgetHistory(body: unknown): SiteWidgetHistoryViewModel {
  const record = requireRecord(body, "root");
  requireExactKeys(record, ROOT_KEYS, "root");
  if (record.ok !== true) protocolError("ok");
  if (record.schema_version !== "site_widget.history.v2") protocolError("schema_version");

  const publicSessionId = requireUuid(record.public_session_id, "public_session_id");
  const publicConversationId = requireUuid(
    record.public_conversation_id,
    "public_conversation_id"
  );
  const conversationState = requireConversationState(record.conversation_state);
  const pollAfterMs =
    record.poll_after_ms === undefined
      ? undefined
      : requireIntegerRange(record.poll_after_ms, "poll_after_ms", 250, 5_000);
  if (!Array.isArray(record.messages) || record.messages.length > 100) {
    protocolError("messages");
  }

  const messages = record.messages.map(mapHistoryMessage);
  const identities = new Set<string>();
  for (const message of messages) {
    if (identities.has(message.publicMessageId)) protocolError("messages.public_message_id_duplicate");
    identities.add(message.publicMessageId);
  }

  return {
    publicSessionId,
    publicConversationId,
    conversationState,
    pollAfterMs,
    messages,
    raw: body
  };
}

function mapHistoryMessage(value: unknown, index: number): SiteWidgetHistoryMessage {
  const field = `messages.${index}`;
  const record = requireRecord(value, field);
  requireExactKeys(record, MESSAGE_KEYS, field);
  const senderRole = record.sender_role;
  if (senderRole !== "visitor" && senderRole !== "ai_assistant" && senderRole !== "manager") {
    protocolError(`${field}.sender_role`);
  }
  if (record.delivery_state !== "accepted") protocolError(`${field}.delivery_state`);

  return {
    publicMessageId: requireUuid(record.public_message_id, `${field}.public_message_id`),
    senderRole,
    text: requireBoundedString(record.text, `${field}.text`, 4_000),
    submittedAt: requireIsoDate(record.submitted_at, `${field}.submitted_at`),
    deliveryState: "accepted",
    catalogReferences: mapCatalogReferences(record.catalog_references, field),
    automation:
      record.automation === undefined
        ? undefined
        : mapAutomation(record.automation, `${field}.automation`)
  };
}

function mapCatalogReferences(value: unknown, field: string): WidgetCatalogReference[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 8) protocolError(`${field}.catalog_references`);

  return value.map((candidate, index) => {
    const referenceField = `${field}.catalog_references.${index}`;
    const record = requireRecord(candidate, referenceField);
    requireExactKeys(record, REFERENCE_KEYS, referenceField);
    if (record.kind !== "catalog_item") protocolError(`${referenceField}.kind`);
    const href = requireBoundedString(record.href, `${referenceField}.href`, 2_048);
    if (!CATALOG_HREF.test(href)) protocolError(`${referenceField}.href`);
    const entityId = requireBoundedString(record.entity_id, `${referenceField}.entity_id`, 80);
    if (!/^ent_[a-f0-9]+$/.test(entityId)) protocolError(`${referenceField}.entity_id`);

    return {
      kind: "catalog_item",
      label: requireBoundedString(record.label, `${referenceField}.label`, 240),
      title: requireBoundedString(record.title, `${referenceField}.title`, 160),
      href,
      entityId
    };
  });
}

function mapAutomation(
  value: unknown,
  field: string
): NonNullable<SiteWidgetHistoryMessage["automation"]> {
  const record = requireRecord(value, field);
  requireExactKeys(record, AUTOMATION_KEYS, field);
  const status = record.status;
  if (
    status !== "pending" &&
    status !== "processing" &&
    status !== "retrying" &&
    status !== "replied" &&
    status !== "degraded" &&
    status !== "blocked" &&
    status !== "failed"
  ) {
    protocolError(`${field}.status`);
  }
  const reason =
    record.reason === undefined
      ? undefined
      : requireBoundedString(record.reason, `${field}.reason`, 120);
  return { status, reason };
}

function requireConversationState(
  value: unknown
): SiteWidgetHistoryViewModel["conversationState"] {
  if (
    value === "ai_active" ||
    value === "manager_pending" ||
    value === "manager_active" ||
    value === "closed"
  ) {
    return value;
  }
  return protocolError("conversation_state");
}

function requireRecord(value: unknown, field: string): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return protocolError(field);
}

function requireExactKeys(
  record: Record<string, unknown>,
  allowedKeys: readonly string[],
  field: string
): void {
  const allowed = new Set(allowedKeys);
  const unexpected = Object.keys(record).find((key) => !allowed.has(key));
  if (unexpected) protocolError(`${field}.${unexpected}`);
}

function requireUuid(value: unknown, field: string): string {
  return normalizePublicUuid(value) ?? protocolError(field);
}

function requireBoundedString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string" || value.length > maxLength || !value.trim()) {
    protocolError(field);
  }
  return value.trim();
}

function requireIsoDate(value: unknown, field: string): string {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) protocolError(field);
  return value;
}

function requireIntegerRange(
  value: unknown,
  field: string,
  minimum: number,
  maximum: number
): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < minimum || value > maximum) {
    protocolError(field);
  }
  return value;
}

function protocolError(field: string): never {
  throw new Error(`Invalid site_widget.history.v2 response: ${field}`);
}

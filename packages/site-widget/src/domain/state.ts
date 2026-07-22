import type {
  SiteWidgetAcceptanceStatus,
  SiteWidgetConfig,
  SiteWidgetHistoryMessage,
  WidgetCatalogReference,
  WidgetMessage,
  WidgetMessageStatus,
  WidgetSystemKind
} from "../types/public";
import { createClientId } from "./ids";

export type WidgetStatus =
  | "closed"
  | "open_idle"
  | "composing"
  | "submitting"
  | "submitted_waiting"
  | "replied"
  | "fallback"
  | "disabled"
  | "error";

export type PendingSubmission = {
  messageId: string;
  text: string;
  idempotencyKey: string;
};

export type WidgetState = {
  open: boolean;
  status: WidgetStatus;
  draft: string;
  contactPhone: string;
  contactCaptureOpen: boolean;
  submitting: boolean;
  pending?: PendingSubmission | undefined;
  awaitingAi: boolean;
  conversationState?: "ai_active" | "manager_pending" | "manager_active" | "closed" | undefined;
  messages: WidgetMessage[];
  visitorMessageCount: number;
  unreadCount: number;
};

export type WidgetAction =
  | { type: "open" }
  | { type: "close" }
  | { type: "draft.changed"; value: string }
  | { type: "contact.capture.toggled"; open?: boolean }
  | { type: "contact.phone.saved"; phone: string }
  | { type: "submit.started"; text: string; idempotencyKey: string }
  | { type: "retry.started" }
  | {
      type: "visitor.saved";
      messageId: string;
      publicMessageId: string;
      acceptanceStatus: SiteWidgetAcceptanceStatus;
      submittedAt?: string | undefined;
      awaitingAi?: boolean | undefined;
    }
  | { type: "visitor.mocked"; messageId: string }
  | {
      type: "assistant.replied";
      text: string;
      publicMessageId?: string | undefined;
      disclosureText?: string | undefined;
      catalogReferences?: WidgetCatalogReference[] | undefined;
      createdAt?: string | undefined;
    }
  | {
      type: "history.synced";
      messages: SiteWidgetHistoryMessage[];
      awaitingAi: boolean;
      conversationState: "ai_active" | "manager_pending" | "manager_active" | "closed";
    }
  | { type: "system.message"; text: string; status: "fallback" | "disabled" }
  | { type: "submit.failed"; text: string; messageId?: string }
  | { type: "session.cleared" };

export function createWidgetState({
  config,
  open = false,
  now = new Date()
}: {
  config: SiteWidgetConfig;
  open?: boolean;
  now?: Date;
}): WidgetState {
  return {
    open,
    status: open ? "open_idle" : "closed",
    draft: "",
    contactPhone: "",
    contactCaptureOpen: false,
    submitting: false,
    pending: undefined,
    awaitingAi: false,
    conversationState: undefined,
    messages: [
      createWidgetMessage({
        role: "assistant",
        text: config.introMessage,
        createdAt: now.toISOString(),
        localKind: "intro"
      })
    ],
    visitorMessageCount: 0,
    unreadCount: 0
  };
}

export function applyWidgetAction(state: WidgetState, action: WidgetAction, config?: SiteWidgetConfig): WidgetState {
  const current = normalizeState(state);

  switch (action.type) {
    case "open":
      return {
        ...current,
        open: true,
        unreadCount: 0,
        status: statusForOpen(current, config)
      };

    case "close":
      return { ...current, open: false, status: "closed" };

    case "draft.changed": {
      const draft = String(action.value ?? "");
      return {
        ...current,
        draft,
        status: current.open ? (draft.trim() ? "composing" : statusForOpen(current, config)) : current.status
      };
    }

    case "contact.capture.toggled":
      return {
        ...current,
        contactCaptureOpen: typeof action.open === "boolean" ? action.open : !current.contactCaptureOpen
      };

    case "contact.phone.saved":
      return {
        ...current,
        contactPhone: String(action.phone ?? "").trim(),
        contactCaptureOpen: false
      };

    case "submit.started": {
      if (current.submitting || current.pending) return current;
      const text = String(action.text ?? "").trim();
      const idempotencyKey = String(action.idempotencyKey ?? "").trim();
      if (!text || !idempotencyKey) return current;

      const message = createWidgetMessage({ role: "visitor", text, status: "pending" });
      return {
        ...current,
        open: true,
        status: "submitted_waiting",
        submitting: true,
        draft: "",
        pending: {
          messageId: message.id,
          text,
          idempotencyKey
        },
        visitorMessageCount: current.visitorMessageCount + 1,
        messages: [...current.messages, message]
      };
    }

    case "retry.started": {
      if (!current.pending || current.submitting) return current;
      return {
        ...current,
        status: "submitted_waiting",
        submitting: true,
        messages: current.messages.map((message) =>
          message.id === current.pending?.messageId ? { ...message, status: "pending" as const } : message
        )
      };
    }

    case "visitor.saved": {
      if (!current.pending) return current;
      if (action.messageId !== current.pending.messageId) return current;
      return {
        ...current,
        status: action.awaitingAi ? "submitted_waiting" : "open_idle",
        submitting: false,
        pending: undefined,
        awaitingAi: Boolean(action.awaitingAi),
        messages: current.messages.map((message) =>
          message.id === current.pending?.messageId
            ? {
                ...message,
                status: "saved" as const,
                publicMessageId: action.publicMessageId,
                acceptanceStatus: action.acceptanceStatus,
                createdAt: action.submittedAt ?? message.createdAt
              }
            : message
        )
      };
    }

    case "visitor.mocked": {
      if (!current.pending || action.messageId !== current.pending.messageId) return current;
      return {
        ...current,
        messages: current.messages.map((message) =>
          message.id === current.pending?.messageId ? { ...message, status: "sent" as const } : message
        )
      };
    }

    case "assistant.replied": {
      const text = String(action.text ?? "").trim();
      const disclosureAlreadyShown = current.messages.some((message) => message.disclosure);
      const messages = text
        ? [
            ...current.messages,
            createWidgetMessage({
              role: "assistant",
              text,
              disclosure: !disclosureAlreadyShown,
              publicMessageId: action.publicMessageId,
              disclosureText: action.disclosureText,
              catalogReferences: action.catalogReferences,
              createdAt: action.createdAt
            })
          ]
        : current.messages;
      return finishSubmit(current, messages, "replied");
    }

    case "history.synced":
      return syncHistory(current, action);

    case "system.message": {
      const text = String(action.text ?? "").trim();
      const alreadyShown = current.messages.some(
        (message) =>
          message.role === "system" &&
          message.systemKind === action.status &&
          message.text === text
      );
      const messages = text && !alreadyShown
        ? [...current.messages, createWidgetMessage({ role: "system", text, systemKind: action.status })]
        : current.messages;
      return finishSubmit(current, messages, action.status);
    }

    case "submit.failed": {
      if (!current.pending) return current;
      if (action.messageId && action.messageId !== current.pending.messageId) return current;
      const messages = current.messages.map((message) =>
        message.id === current.pending?.messageId ? { ...message, status: "error" as const } : message
      );
      return {
        ...current,
        status: "error",
        submitting: false,
        messages
      };
    }

    case "session.cleared":
      return config
        ? createWidgetState({ config, open: current.open })
        : { ...current, pending: undefined, submitting: false, awaitingAi: false };

    default:
      return current;
  }
}

export function validateDraft(text: string, config: SiteWidgetConfig): "empty_message" | "message_too_long" | null {
  const normalized = text.trim();
  if (!normalized) return "empty_message";
  if (normalized.length > config.maxMessageLength) return "message_too_long";
  return null;
}

export function createWidgetMessage({
  role,
  text,
  status = "sent",
  disclosure = false,
  publicMessageId,
  acceptanceStatus,
  disclosureText,
  systemKind,
  catalogReferences,
  localKind,
  id,
  createdAt = new Date().toISOString()
}: {
  role: WidgetMessage["role"];
  text: string;
  status?: WidgetMessageStatus;
  disclosure?: boolean;
  publicMessageId?: string | undefined;
  acceptanceStatus?: SiteWidgetAcceptanceStatus;
  disclosureText?: string | undefined;
  systemKind?: WidgetSystemKind;
  catalogReferences?: WidgetCatalogReference[] | undefined;
  localKind?: "intro" | undefined;
  id?: string | undefined;
  createdAt?: string | undefined;
}): WidgetMessage {
  return {
    id: id ?? createClientId("msg"),
    role,
    text: String(text ?? ""),
    status,
    publicMessageId,
    acceptanceStatus,
    disclosure,
    disclosureText,
    systemKind,
    catalogReferences,
    localKind,
    createdAt
  };
}

function finishSubmit(state: WidgetState, messages: WidgetMessage[], status: "replied" | "fallback" | "disabled"): WidgetState {
  return {
    ...state,
    status,
    submitting: false,
    pending: undefined,
    awaitingAi: false,
    messages,
    unreadCount: state.open ? state.unreadCount : state.unreadCount + 1
  };
}

function statusForOpen(state: WidgetState, config?: SiteWidgetConfig): WidgetStatus {
  const draftError = config ? validateDraft(state.draft, config) : state.draft.trim() ? null : "empty_message";
  if (state.submitting) return "submitted_waiting";
  if (state.awaitingAi) return "submitted_waiting";
  if (state.status === "error") return "error";
  if (state.status === "replied" || state.status === "fallback" || state.status === "disabled") return state.status;
  return state.draft.trim() && !draftError ? "composing" : "open_idle";
}

function normalizeState(state: WidgetState): WidgetState {
  return {
    ...state,
    draft: String(state.draft ?? ""),
    contactPhone: String(state.contactPhone ?? ""),
    submitting: Boolean(state.submitting),
    awaitingAi: Boolean(state.awaitingAi),
    messages: Array.isArray(state.messages) ? state.messages : [],
    visitorMessageCount: Number.isInteger(state.visitorMessageCount) ? state.visitorMessageCount : 0,
    unreadCount: Number.isInteger(state.unreadCount) ? state.unreadCount : 0
  };
}

function syncHistory(
  state: WidgetState,
  action: Extract<WidgetAction, { type: "history.synced" }>
): WidgetState {
  const intro = state.messages.find((message) => message.localKind === "intro");
  const localMessages = state.messages.filter(
    (message) => message.localKind !== "intro" && !message.publicMessageId
  );
  const existingByPublicId = new Map(
    state.messages.flatMap((message) =>
      message.publicMessageId ? [[message.publicMessageId, message] as const] : []
    )
  );
  let disclosureAssigned = false;
  const persisted = action.messages.map((message) => {
    const existing = existingByPublicId.get(message.publicMessageId);
    const assistant = message.senderRole !== "visitor";
    const disclosure = message.senderRole === "ai_assistant" && !disclosureAssigned;
    if (disclosure) disclosureAssigned = true;

    return createWidgetMessage({
      id: existing?.id ?? `server:${message.publicMessageId}`,
      role: assistant ? "assistant" : "visitor",
      text: message.text,
      status: assistant ? "sent" : "saved",
      publicMessageId: message.publicMessageId,
      acceptanceStatus: existing?.acceptanceStatus ?? "accepted",
      disclosure,
      disclosureText: existing?.disclosureText,
      catalogReferences: message.catalogReferences,
      createdAt: message.submittedAt
    });
  });
  const previousPublicIds = new Set(existingByPublicId.keys());
  const newUnread = action.messages.filter(
    (message) => message.senderRole !== "visitor" && !previousPublicIds.has(message.publicMessageId)
  ).length;
  const messages = [...(intro ? [intro] : []), ...persisted, ...localMessages];
  const hasReply = action.messages.some((message) => message.senderRole !== "visitor");
  const status: WidgetStatus = action.awaitingAi
    ? "submitted_waiting"
    : action.conversationState === "manager_pending" || action.conversationState === "manager_active"
      ? "fallback"
      : hasReply
        ? "replied"
        : "open_idle";

  return {
    ...state,
    status,
    awaitingAi: action.awaitingAi,
    conversationState: action.conversationState,
    messages,
    visitorMessageCount: Math.max(
      state.visitorMessageCount,
      action.messages.filter((message) => message.senderRole === "visitor").length
    ),
    unreadCount: state.open ? state.unreadCount : state.unreadCount + newUnread
  };
}

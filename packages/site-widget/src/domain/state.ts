import type { SiteWidgetConfig, WidgetMessage, WidgetMessageStatus, WidgetSystemKind } from "../types/public";
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
  | { type: "visitor.persisted"; text: string; messageId?: string }
  | { type: "assistant.replied"; text: string }
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
    messages: [
      createWidgetMessage({
        role: "assistant",
        text: config.introMessage,
        createdAt: now.toISOString()
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

    case "visitor.persisted": {
      if (!current.pending) return current;
      if (action.messageId && action.messageId !== current.pending.messageId) return current;
      return {
        ...current,
        messages: current.messages.map((message) =>
          message.id === current.pending?.messageId
            ? { ...message, status: "sent" as const }
            : message
        )
      };
    }

    case "assistant.replied": {
      const text = String(action.text ?? "").trim();
      const messages = text
        ? [...current.messages, createWidgetMessage({ role: "assistant", text, disclosure: true })]
        : current.messages;
      return finishSubmit(current, messages, "replied");
    }

    case "system.message": {
      const text = String(action.text ?? "").trim();
      const messages = text
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
      return config ? createWidgetState({ config, open: current.open }) : { ...current, pending: undefined, submitting: false };

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
  systemKind,
  createdAt = new Date().toISOString()
}: {
  role: WidgetMessage["role"];
  text: string;
  status?: WidgetMessageStatus;
  disclosure?: boolean;
  systemKind?: WidgetSystemKind;
  createdAt?: string;
}): WidgetMessage {
  return {
    id: createClientId("msg"),
    role,
    text: String(text ?? ""),
    status,
    disclosure,
    systemKind,
    createdAt
  };
}

function finishSubmit(state: WidgetState, messages: WidgetMessage[], status: "replied" | "fallback" | "disabled"): WidgetState {
  return {
    ...state,
    status,
    submitting: false,
    pending: undefined,
    messages,
    unreadCount: state.open ? state.unreadCount : state.unreadCount + 1
  };
}

function statusForOpen(state: WidgetState, config?: SiteWidgetConfig): WidgetStatus {
  const draftError = config ? validateDraft(state.draft, config) : state.draft.trim() ? null : "empty_message";
  if (state.submitting) return "submitted_waiting";
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
    messages: Array.isArray(state.messages) ? state.messages : [],
    visitorMessageCount: Number.isInteger(state.visitorMessageCount) ? state.visitorMessageCount : 0,
    unreadCount: Number.isInteger(state.unreadCount) ? state.unreadCount : 0
  };
}

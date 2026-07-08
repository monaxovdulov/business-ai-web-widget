import type { SiteWidgetConfig, WidgetMessage, WidgetMessageStatus } from "../types/public";
export type WidgetStatus = "closed" | "open_idle" | "composing" | "submitting" | "submitted_waiting" | "replied" | "fallback" | "disabled" | "error";
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
export type WidgetAction = {
    type: "open";
} | {
    type: "close";
} | {
    type: "draft.changed";
    value: string;
} | {
    type: "contact.capture.toggled";
    open?: boolean;
} | {
    type: "contact.phone.saved";
    phone: string;
} | {
    type: "submit.started";
    text: string;
    idempotencyKey: string;
} | {
    type: "retry.started";
} | {
    type: "visitor.persisted";
    text: string;
} | {
    type: "assistant.replied";
    text: string;
} | {
    type: "system.message";
    text: string;
    status: "fallback" | "disabled";
} | {
    type: "submit.failed";
    text: string;
};
export declare function createWidgetState({ config, open, now }: {
    config: SiteWidgetConfig;
    open?: boolean;
    now?: Date;
}): WidgetState;
export declare function applyWidgetAction(state: WidgetState, action: WidgetAction, config?: SiteWidgetConfig): WidgetState;
export declare function validateDraft(text: string, config: SiteWidgetConfig): "empty_message" | "message_too_long" | null;
export declare function createWidgetMessage({ role, text, status, disclosure, createdAt }: {
    role: WidgetMessage["role"];
    text: string;
    status?: WidgetMessageStatus;
    disclosure?: boolean;
    createdAt?: string;
}): WidgetMessage;
//# sourceMappingURL=state.d.ts.map
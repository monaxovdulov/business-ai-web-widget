import type { SiteWidgetAcceptanceStatus } from "../../src/types/public";

export const TEST_PUBLIC_SESSION_ID = "11111111-1111-4111-8111-111111111111";
export const TEST_VISITOR_MESSAGE_ID = "22222222-2222-4222-8222-222222222222";
export const TEST_REPLY_MESSAGE_ID = "33333333-3333-4333-8333-333333333333";

type ReceiptOptions = {
  acceptanceStatus?: SiteWidgetAcceptanceStatus;
  publicSessionId?: string;
  publicMessageId?: string;
  messageToUser?: string;
};

export function repliedReceipt(
  options: ReceiptOptions & {
    replyText?: string;
    replyPublicMessageId?: string;
    disclosureText?: string;
  } = {}
): Record<string, unknown> {
  return receiptBase(options, {
    status: "replied",
    next_step: "ai_reply_shown",
    conversation_state: "ai_active",
    disclosure: {
      shown: true,
      version: "widget-ai-disclosure.v1",
      text: options.disclosureText ?? "Автоответ. Менеджер подтвердит условия."
    },
    reply: {
      public_message_id: options.replyPublicMessageId ?? TEST_REPLY_MESSAGE_ID,
      sender_role: "ai_assistant",
      text: options.replyText ?? "Готово"
    }
  });
}

export function disabledReceipt(options: ReceiptOptions = {}): Record<string, unknown> {
  return receiptBase(
    { messageToUser: "Сообщение сохранено. Менеджер ответит вручную.", ...options },
    {
      status: "disabled",
      next_step: "manager_review"
    }
  );
}

export function fallbackReceipt(
  options: ReceiptOptions & {
    reason?:
      | "missing_openai_config"
      | "model_error"
      | "empty_model_response"
      | "unsafe_model_response"
      | "semantic_verifier_error"
      | "grounding_validation_failed"
      | "turn_timeout"
      | "agent_reply_blocked"
      | "ai_persistence_unconfirmed";
  } = {}
): Record<string, unknown> {
  return receiptBase(
    { messageToUser: "Сообщение сохранено. Менеджер проверит детали.", ...options },
    {
      status: "fallback",
      next_step: "manager_review",
      reason: options.reason ?? "model_error"
    }
  );
}

export function degradedReceipt(
  options: ReceiptOptions & {
    reason?: "semantic_verifier_error" | "grounding_validation_failed" | "turn_timeout";
  } = {}
): Record<string, unknown> {
  return receiptBase(
    {
      messageToUser: "Сообщение сохранено, но AI не смог ответить на этот ход.",
      ...options
    },
    {
      status: "degraded",
      next_step: "retry_available",
      conversation_state: "ai_active",
      reason: options.reason ?? "grounding_validation_failed"
    }
  );
}

function receiptBase(options: ReceiptOptions, automation: Record<string, unknown>): Record<string, unknown> {
  return {
    ok: true,
    schema_version: "site_widget.v1",
    status: options.acceptanceStatus ?? "accepted",
    public_session_id: options.publicSessionId ?? TEST_PUBLIC_SESSION_ID,
    public_message_id: options.publicMessageId ?? TEST_VISITOR_MESSAGE_ID,
    action: "show_widget_saved",
    automation,
    message_to_user: options.messageToUser ?? "Сообщение сохранено."
  };
}

import { html, nothing, type TemplateResult } from "lit";
import type { SiteWidgetConfig, WidgetMessage } from "../types/public";
import { widgetIcon } from "../ui/icons";

export type WidgetMessageRenderContext = {
  config: SiteWidgetConfig;
  onRetry: (messageId: string) => void;
};

export function renderChatItem(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult {
  return message.role === "system" ? renderMarker(message) : renderMessageRoot(message, context);
}

export function renderMessageRoot(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult {
  return html`<div
    class=${`message-root message-root--${message.role}`}
    part="message-root"
    data-message-id=${message.id}
  >
    ${renderMessageBubble(message)} ${renderMessageMeta(message, context)}
  </div>`;
}

export function renderMessageBubble(message: WidgetMessage): TemplateResult {
  return html`<article class=${messageClass(message)} part=${`message message-${message.role} message-bubble`}>
    <p class="message__text">${message.text}</p>
  </article>`;
}

export function renderMessageMeta(
  message: WidgetMessage,
  context: WidgetMessageRenderContext
): TemplateResult | typeof nothing {
  const hasStatus = message.status === "pending" || message.status === "error";
  if (!message.disclosure && !hasStatus) return nothing;

  return html`<div class="message-meta" part="message-meta">
    ${message.disclosure
      ? html`<div class="message-disclosure" part="message-disclosure">
          ${widgetIcon("spark", 16)}
          <span>${context.config.disclosureText}</span>
        </div>`
      : nothing}
    ${hasStatus
      ? html`<div class=${`message-status-row message-status-row--${message.status}`}>
          <span class="message-status" part="message-status">
            ${message.status === "pending"
              ? html`<span class="message-status__spinner" aria-hidden="true">${widgetIcon("loader", 14)}</span
                  >Отправляем…`
              : "Не отправлено"}
          </span>
          ${renderMessageActions(message, context)}
        </div>`
      : nothing}
  </div>`;
}

export function renderMessageActions(
  message: WidgetMessage,
  context: WidgetMessageRenderContext
): TemplateResult | typeof nothing {
  if (message.status !== "error") return nothing;
  return html`<div class="message-actions" part="message-actions">
    <span aria-hidden="true">·</span>
    <button
      class="retry-button"
      part="retry-button"
      type="button"
      @click=${() => context.onRetry(message.id)}
    >
      ${context.config.retryLabel}
    </button>
  </div>`;
}

export function renderMarker(message: WidgetMessage): TemplateResult {
  return html`<div
    class="marker"
    part="message message-system marker"
    role="status"
    data-message-id=${message.id}
    data-system-kind=${message.systemKind ?? "fallback"}
  >
    <span class="marker__icon" part="marker-icon" aria-hidden="true">${widgetIcon("shield", 16)}</span>
    <span class="marker__text" part="marker-text">${message.text}</span>
  </div>`;
}

function messageClass(message: WidgetMessage): string {
  const classes = ["message", `message--${message.role}`];
  if (message.status === "error") classes.push("message--error");
  return classes.join(" ");
}

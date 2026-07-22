import { html, nothing, type TemplateResult } from "lit";
import type { SiteWidgetConfig, WidgetMessage } from "../types/public";
import { widgetIcon } from "../ui/icons";
import { renderMessageAttachments, type WidgetAttachmentView } from "./widget-attachments";

export type WidgetMessageRenderContext = {
  config: SiteWidgetConfig;
  onRetry: (messageId: string) => void;
  images?: readonly WidgetAttachmentView[];
};

export function renderChatItem(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult {
  return message.role === "system" ? renderMarker(message) : renderMessageRoot(message, context);
}

export function renderMessageRoot(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult {
  return html`<div
    class=${`message-root message-root--${message.role}`}
    part="message-root"
    data-message-id=${message.id}
    data-message-status=${message.status}
    data-public-message-id=${message.publicMessageId ?? nothing}
    data-acceptance-status=${message.acceptanceStatus ?? nothing}
  >
    ${renderMessageBubble(message, context)} ${renderMessageMeta(message, context)}
  </div>`;
}

export function renderMessageBubble(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult {
  return html`<article class=${messageClass(message)} part=${`message message-${message.role} message-bubble`}>
    <p class="message__text">${message.text}</p>
    ${message.catalogReferences?.length
      ? html`<div class="message-links" part="message-links">
          ${message.catalogReferences.map(
            (reference) => html`<a
              class="message-link"
              part="message-link"
              href=${reference.href}
              target="_self"
              data-entity-id=${reference.entityId}
            >
              ${reference.label}
              <span aria-hidden="true">→</span>
            </a>`
          )}
        </div>`
      : nothing}
    ${renderMessageAttachments(context.images ?? [])}
  </article>`;
}

export function renderMessageMeta(
  message: WidgetMessage,
  context: WidgetMessageRenderContext
): TemplateResult | typeof nothing {
  const hasStatus = message.status === "pending" || message.status === "saved" || message.status === "error";
  if (message.localKind === "intro" && !message.disclosure && !hasStatus) return nothing;

  return html`<div class="message-meta" part="message-meta">
    ${message.disclosure
      ? html`<div class="message-disclosure" part="message-disclosure">
          ${widgetIcon("spark", 16)}
          <span>${message.disclosureText ?? context.config.disclosureText}</span>
        </div>`
      : nothing}
    <div class=${`message-status-row message-status-row--${message.status}`}>
      <time class="message-time" datetime=${message.createdAt}>${formatMessageTime(message.createdAt)}</time>
      ${hasStatus
        ? html`
          <span aria-hidden="true">·</span>
          <span class="message-status" part="message-status">
            ${message.status === "pending"
              ? html`<span class="message-status__spinner" aria-hidden="true">${widgetIcon("loader", 14)}</span
                  >Отправляем…`
              : message.status === "saved"
                ? "Принято"
                : "Не отправлено"}
          </span>
          ${renderMessageActions(message, context)}
        `
        : nothing}
    </div>
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

export function renderDateSeparator(
  message: WidgetMessage,
  previous: WidgetMessage | undefined,
  now = new Date()
): TemplateResult | typeof nothing {
  if (message.localKind === "intro") return nothing;
  const currentDate = validDate(message.createdAt);
  const previousDate = previous && previous.localKind !== "intro" ? validDate(previous.createdAt) : undefined;
  if (!currentDate || (previousDate && sameCalendarDate(currentDate, previousDate))) return nothing;

  return html`<div class="date-separator" part="date-separator" role="separator">
    <span>${formatDateLabel(currentDate, now)}</span>
  </div>`;
}

export function renderTypingIndicator(): TemplateResult {
  return html`<div class="typing" part="typing-indicator" role="status" aria-label="AI-помощник печатает">
    <span class="typing__avatar" aria-hidden="true">${widgetIcon("spark", 16)}</span>
    <span class="typing__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="visually-hidden">AI-помощник печатает</span>
  </div>`;
}

export function formatMessageTime(value: string): string {
  const date = validDate(value);
  return date
    ? new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(date)
    : "";
}

export function formatDateLabel(date: Date, now = new Date()): string {
  if (sameCalendarDate(date, now)) return "Сегодня";
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (sameCalendarDate(date, yesterday)) return "Вчера";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric"
  }).format(date);
}

function validDate(value: string): Date | undefined {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : undefined;
}

function sameCalendarDate(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function messageClass(message: WidgetMessage): string {
  const classes = ["message", `message--${message.role}`];
  if (message.status === "error") classes.push("message--error");
  return classes.join(" ");
}

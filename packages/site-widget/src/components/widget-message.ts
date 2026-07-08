import { html, nothing, type TemplateResult } from "lit";
import type { SiteWidgetConfig, WidgetMessage } from "../types/public";
import { widgetIcon } from "../ui/icons";

export function renderWidgetMessage(message: WidgetMessage, config: SiteWidgetConfig): TemplateResult {
  const statusText = message.status === "pending" ? "Отправляем..." : message.status === "error" ? "Не отправлено" : "";
  const part = `message message-${message.role}`;

  return html`<article class=${messageClass(message)} part=${part}>
    <p class="message__text">${message.text}</p>
    ${message.disclosure
      ? html`<div class="message__disclosure" part="message-disclosure">
          ${widgetIcon("spark", 16)}
          <span>${config.disclosureText}</span>
        </div>`
      : nothing}
    ${statusText ? html`<small class="message__meta">${statusText}</small>` : nothing}
  </article>`;
}

function messageClass(message: WidgetMessage): string {
  const classes = ["message", `message--${message.role}`];
  if (message.status === "error") classes.push("message--error");
  return classes.join(" ");
}

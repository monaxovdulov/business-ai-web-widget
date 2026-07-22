import { css } from "lit";

export const messageStyles = css`
  .message-root {
    align-items: flex-start;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    max-width: min(85%, var(--sw-message-max-width, 460px));
    min-width: 0;
  }

  .message-root--visitor {
    align-items: flex-end;
    align-self: flex-end;
  }

  .message {
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-message);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    color: var(--sw-color-text-primary);
    max-width: 100%;
    min-width: 0;
    padding: 12px 14px;
  }

  .message--visitor {
    background: var(--sw-color-surface-message-visitor);
    border-color: transparent;
    border-top-right-radius: 6px;
  }

  .message--assistant {
    border-top-left-radius: 6px;
  }

  .message--error {
    border-color: var(--sw-color-error);
  }

  .message__text {
    font-size: var(--sw-font-size-body);
    line-height: var(--sw-line-height-body);
    margin: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    word-break: normal;
  }

  .message-links {
    display: grid;
    gap: 7px;
    margin-top: 11px;
  }

  .message-link {
    align-items: center;
    background: color-mix(in srgb, var(--sw-color-accent) 9%, var(--sw-color-surface-control));
    border: 1px solid color-mix(in srgb, var(--sw-color-accent) 28%, var(--sw-color-border-soft));
    border-radius: 11px;
    color: var(--sw-color-text-primary);
    display: flex;
    font-size: 14px;
    font-weight: var(--sw-font-weight-action);
    gap: 10px;
    justify-content: space-between;
    line-height: 1.3;
    min-height: 44px;
    padding: 9px 11px;
    text-decoration: none;
  }

  .message-link:hover {
    border-color: var(--sw-color-accent);
  }

  .message-attachments {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    list-style: none;
    margin: 10px 0 0;
    max-width: 240px;
    padding: 0;
  }

  .message-attachment {
    border-radius: 9px;
    min-width: 0;
    overflow: hidden;
  }

  .message-attachment__preview {
    aspect-ratio: 1;
    background: var(--sw-color-surface-system);
    display: block;
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  .message-meta,
  .message-disclosure,
  .message-status-row {
    color: var(--sw-color-text-secondary);
    font-size: var(--sw-font-size-small);
    line-height: var(--sw-line-height-small);
  }

  .message-meta {
    margin-top: 5px;
    max-width: 100%;
  }

  .message-root--visitor .message-meta {
    align-self: flex-end;
    text-align: right;
  }

  .message-disclosure,
  .message-status-row,
  .message-status,
  .message-actions {
    align-items: center;
    display: flex;
  }

  .message-disclosure {
    gap: 6px;
  }

  .message-status-row {
    gap: 5px;
    min-height: 32px;
  }

  .message-time {
    color: var(--sw-color-text-muted);
    font-variant-numeric: tabular-nums;
  }

  .message-status-row--error,
  .message-status-row--error .message-actions,
  .message-status-row--error .retry-button {
    color: var(--sw-color-error);
  }

  .message-status,
  .message-actions {
    gap: 5px;
  }

  .message-status__checks {
    color: var(--sw-color-accent);
    display: inline-flex;
    font-weight: 700;
    letter-spacing: -2px;
  }

  .message-actions .retry-button {
    margin: 0;
    min-height: 44px;
    padding: 0 3px;
  }

  .marker {
    align-items: center;
    align-self: center;
    background: var(--sw-color-surface-system);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 999px;
    color: var(--sw-color-text-secondary);
    display: flex;
    font-size: var(--sw-font-size-small);
    gap: 8px;
    line-height: var(--sw-line-height-small);
    max-width: 94%;
    padding: 9px 13px;
    text-align: left;
  }

  .marker__icon {
    color: var(--sw-color-accent);
    display: inline-flex;
    flex: 0 0 auto;
  }

  .marker__text {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .date-separator {
    align-items: center;
    color: var(--sw-color-text-muted);
    display: flex;
    font-size: 12px;
    gap: 10px;
    justify-content: center;
    line-height: 1.3;
    margin: 3px 0;
    text-align: center;
  }

  .date-separator::before,
  .date-separator::after {
    background: var(--sw-color-border-soft);
    content: "";
    flex: 1;
    height: 1px;
  }

  .typing {
    align-items: center;
    align-self: flex-start;
    display: flex;
    gap: 8px;
  }

  .typing__avatar {
    align-items: center;
    background: var(--sw-color-surface-control);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 50%;
    color: var(--sw-color-accent);
    display: inline-flex;
    height: 30px;
    justify-content: center;
    width: 30px;
  }

  .typing__dots {
    align-items: center;
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: 14px 14px 14px 5px;
    display: inline-flex;
    gap: 4px;
    min-height: 36px;
    padding: 0 12px;
  }

  .typing__dots i {
    animation: typing-pulse 1.15s ease-in-out infinite;
    background: var(--sw-color-text-muted);
    border-radius: 50%;
    display: block;
    height: 5px;
    opacity: 0.35;
    width: 5px;
  }

  .typing__dots i:nth-child(2) {
    animation-delay: 140ms;
  }

  .typing__dots i:nth-child(3) {
    animation-delay: 280ms;
  }

  @keyframes typing-pulse {
    0%,
    60%,
    100% {
      opacity: 0.35;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`;

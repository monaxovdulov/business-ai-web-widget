import { css } from "lit";

export const messageStyles = css`
  .message {
    align-self: flex-start;
    background: var(--sw-color-surface-message-assistant);
    border: 1px solid var(--sw-color-border-soft);
    border-radius: var(--sw-radius-message);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    color: var(--sw-color-text-primary);
    max-width: min(85%, var(--sw-message-max-width, 460px));
    padding: 15px 17px;
  }

  .message--visitor {
    align-self: flex-end;
    background: var(--sw-color-surface-message-visitor);
    border-color: transparent;
    border-top-right-radius: 6px;
  }

  .message--assistant {
    border-top-left-radius: 6px;
  }

  .message--system {
    align-self: center;
    background: var(--sw-color-surface-system);
    color: var(--sw-color-text-secondary);
    max-width: 94%;
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

  .message__meta,
  .message__disclosure {
    color: var(--sw-color-text-secondary);
    font-size: var(--sw-font-size-small);
    line-height: var(--sw-line-height-small);
  }

  .message__meta {
    display: block;
    margin-top: 8px;
    text-align: right;
  }

  .message__disclosure {
    align-items: center;
    display: flex;
    gap: 6px;
    margin-top: 10px;
  }
`;

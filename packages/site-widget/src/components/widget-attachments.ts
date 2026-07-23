import { html, nothing, type TemplateResult } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { widgetIcon } from "../ui/icons";

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const DEFAULT_PICKER_LABEL = "Добавить фото";

export type WidgetAttachmentView = {
  readonly id: string;
  readonly previewUrl: string;
  readonly sizeBytes: number;
  readonly width: number;
  readonly height: number;
};

type AttachmentPickerOptions = {
  label?: string | undefined;
  disabled?: boolean | undefined;
  onFilesSelected: (files: readonly File[]) => void | Promise<void>;
};

type AttachmentPreviewListOptions = {
  attachments: readonly WidgetAttachmentView[];
  validationMessage?: string | undefined;
  validationRevision?: number | undefined;
  onRemove: (attachmentId: string) => void;
};

export function renderAttachmentPicker({
  label = DEFAULT_PICKER_LABEL,
  disabled = false,
  onFilesSelected
}: AttachmentPickerOptions): TemplateResult {
  const accessibleLabel = label.trim() || DEFAULT_PICKER_LABEL;

  return html`
    <button
      class="attach-button"
      part="attach-button"
      type="button"
      title=${accessibleLabel}
      aria-label=${accessibleLabel}
      ?disabled=${disabled}
      @click=${openFileDialog}
    >
      ${widgetIcon("paperclip")}
    </button>
    <input
      class="attachment-input"
      type="file"
      accept=${IMAGE_ACCEPT}
      multiple
      hidden
      ?disabled=${disabled}
      @change=${(event: Event) => handleFileSelection(event, onFilesSelected)}
    />
  `;
}

export function renderAttachmentPreviewList({
  attachments,
  validationMessage = "",
  validationRevision = 0,
  onRemove
}: AttachmentPreviewListOptions): TemplateResult {
  const errorText = validationMessage.trim();

  return html`
    ${errorText
      ? keyed(
          validationRevision,
          html`<p class="attachment-validation" role="alert" data-validation-revision=${validationRevision}>
            ${errorText}
          </p>`
        )
      : nothing}
    <span class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      ${formatAttachmentCount(attachments.length)}
    </span>
    ${attachments.length > 0
      ? html`
          <ul class="attachment-list" part="attachment-list" aria-label="Выбранные фото">
            ${attachments.map((attachment, index) => {
              const photoNumber = index + 1;
              return html`
                <li class="attachment" part="attachment">
                  <img
                    class="attachment__preview"
                    part="attachment-preview"
                    src=${attachment.previewUrl}
                    alt=""
                    width=${normalizedDimension(attachment.width)}
                    height=${normalizedDimension(attachment.height)}
                    decoding="async"
                  />
                  <span class="attachment__details">
                    <span class="attachment__label">Фото ${photoNumber}</span>
                    <span class="attachment__size">${formatFileSize(attachment.sizeBytes)}</span>
                  </span>
                  <button
                    class="attachment__remove"
                    part="attachment-remove"
                    data-attachment-id=${attachment.id}
                    type="button"
                    aria-label=${`Удалить фото ${photoNumber}`}
                    @click=${() => onRemove(attachment.id)}
                  >
                    ${widgetIcon("close", 18)}
                  </button>
                </li>
              `;
            })}
          </ul>
        `
      : nothing}
  `;
}

export function renderMessageAttachments(
  attachments: readonly WidgetAttachmentView[]
): TemplateResult | typeof nothing {
  if (attachments.length === 0) return nothing;

  return html`
    <ul class="message-attachments" part="attachment-list" aria-label="Фото в сообщении">
      ${attachments.map(
        (attachment, index) => html`
          <li class="message-attachment" part="attachment">
            <img
              class="message-attachment__preview"
              part="attachment-preview"
              src=${attachment.previewUrl}
              alt=${`Фото ${index + 1}`}
              width=${normalizedDimension(attachment.width)}
              height=${normalizedDimension(attachment.height)}
              decoding="async"
            />
          </li>
        `
      )}
    </ul>
  `;
}

function openFileDialog(event: Event): void {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;

  const input = button.nextElementSibling;
  if (input instanceof HTMLInputElement && !input.disabled) input.click();
}

function handleFileSelection(
  event: Event,
  onFilesSelected: (files: readonly File[]) => void | Promise<void>
): void {
  const input = event.currentTarget;
  if (!(input instanceof HTMLInputElement)) return;

  const files = input.files ? Array.from(input.files) : [];
  input.value = "";
  if (files.length > 0) void onFilesSelected(files);
}

function formatAttachmentCount(count: number): string {
  return `Выбрано фото: ${count}`;
}

function formatFileSize(sizeBytes: number): string {
  const bytes = Math.max(0, Math.floor(sizeBytes));
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${formatDecimal(bytes / 1024)} КБ`;
  return `${formatDecimal(bytes / (1024 * 1024))} МБ`;
}

function formatDecimal(value: number): string {
  const digits = value >= 10 ? 0 : 1;
  return value.toFixed(digits).replace(".", ",");
}

function normalizedDimension(value: number): number {
  return Math.max(1, Math.floor(value));
}

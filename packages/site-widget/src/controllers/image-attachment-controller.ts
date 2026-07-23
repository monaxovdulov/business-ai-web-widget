import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { WidgetAttachmentView } from "../components/widget-attachments";
import { createClientId } from "../domain/ids";
import {
  detectImageMime,
  formatImageValidationMessage,
  validateDeclaredMime,
  validateImageLimits,
  validateImagePixelLimit,
  type AllowedImageMime,
  type ImageValidationRejection
} from "../domain/image-attachments";

export type DraftImageAttachment = WidgetAttachmentView & {
  readonly name: string;
  readonly mimeType: AllowedImageMime;
  readonly file: File;
};

export type ImageAttachmentSelectionResult = {
  readonly accepted: number;
  readonly rejected: number;
  readonly validationMessage: string;
};

type ImageFileCandidate = {
  readonly file: File;
  readonly sizeBytes: number;
};

type DecodedImageDimensions = {
  width: number;
  height: number;
};

class StaleImageSelectionError extends Error {
  constructor() {
    super("Image selection is no longer current");
    this.name = "StaleImageSelectionError";
  }
}

export class ImageAttachmentController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private draft: DraftImageAttachment[] = [];
  private readonly byMessageId = new Map<string, DraftImageAttachment[]>();
  private validationMessage = "";
  private validationRevision = 0;
  private enabled = true;
  private generation = 0;
  private readonly pendingSelections = new Map<symbol, number>();
  private readonly inFlightPreviewUrls = new Set<string>();
  private selectionQueue: Promise<void> = Promise.resolve();

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostDisconnected(): void {
    this.clearAll();
  }

  getDraft(): readonly DraftImageAttachment[] {
    return this.draft;
  }

  getForMessage(messageId: string): readonly DraftImageAttachment[] {
    return this.byMessageId.get(messageId) ?? [];
  }

  getValidationMessage(): string {
    return this.validationMessage;
  }

  getValidationRevision(): number {
    return this.validationRevision;
  }

  isProcessing(): boolean {
    for (const generation of this.pendingSelections.values()) {
      if (generation === this.generation) return true;
    }
    return false;
  }

  async whenIdle(): Promise<void> {
    await this.selectionQueue.catch(() => undefined);
  }

  setEnabled(enabled: boolean): void {
    const next = Boolean(enabled);
    if (this.enabled === next) return;
    this.enabled = next;
    if (!next) this.clearAll();
  }

  selectFiles(files: readonly File[]): Promise<ImageAttachmentSelectionResult> {
    const batch = [...files];
    const selectionGeneration = this.generation;
    const selectionToken = Symbol("image-selection");
    this.pendingSelections.set(selectionToken, selectionGeneration);
    this.host.requestUpdate();
    let resolveResult: (result: ImageAttachmentSelectionResult) => void = () => undefined;
    const result = new Promise<ImageAttachmentSelectionResult>((resolve) => {
      resolveResult = resolve;
    });

    this.selectionQueue = this.selectionQueue.catch(() => undefined).then(async () => {
      try {
        resolveResult(await this.processBatch(batch, selectionGeneration));
      } catch {
        if (selectionGeneration !== this.generation || !this.enabled) {
          resolveResult({ accepted: 0, rejected: batch.length, validationMessage: "" });
          return;
        }
        const validationMessage = "Фото не добавлено: одно из изображений не удалось прочитать.";
        this.validationMessage = validationMessage;
        this.validationRevision += 1;
        this.host.requestUpdate();
        resolveResult({ accepted: 0, rejected: batch.length, validationMessage });
      } finally {
        this.pendingSelections.delete(selectionToken);
        this.host.requestUpdate();
      }
    });

    return result;
  }

  removeDraft(attachmentId: string): string | undefined {
    const index = this.draft.findIndex((attachment) => attachment.id === attachmentId);
    if (index < 0) return undefined;
    const removed = this.draft[index];
    if (removed) this.revokePreview(removed.previewUrl);
    this.draft = this.draft.filter((attachment) => attachment.id !== attachmentId);
    this.validationMessage = "";
    const focusTarget = this.draft[index]?.id ?? this.draft[index - 1]?.id;
    this.host.requestUpdate();
    return focusTarget;
  }

  transferDraftToMessage(messageId: string): void {
    if (this.draft.length === 0) return;
    const existing = this.byMessageId.get(messageId) ?? [];
    this.byMessageId.set(messageId, [...existing, ...this.draft]);
    this.draft = [];
    this.validationMessage = "";
    this.host.requestUpdate();
  }

  removeMessageAttachments(messageId: string): void {
    const attachments = this.byMessageId.get(messageId);
    if (!attachments) return;
    for (const attachment of attachments) this.revokePreview(attachment.previewUrl);
    this.byMessageId.delete(messageId);
    this.host.requestUpdate();
  }

  clearAll(): void {
    const wasProcessing = this.isProcessing();
    this.generation += 1;
    this.pendingSelections.clear();
    this.selectionQueue = Promise.resolve();
    const previewUrls = new Set<string>();
    for (const previewUrl of this.inFlightPreviewUrls) previewUrls.add(previewUrl);
    for (const attachment of this.draft) previewUrls.add(attachment.previewUrl);
    for (const attachments of this.byMessageId.values()) {
      for (const attachment of attachments) previewUrls.add(attachment.previewUrl);
    }
    for (const previewUrl of previewUrls) this.revokePreview(previewUrl);
    this.inFlightPreviewUrls.clear();
    const hadState =
      wasProcessing || previewUrls.size > 0 || this.draft.length > 0 || this.byMessageId.size > 0 || this.validationMessage;
    this.draft = [];
    this.byMessageId.clear();
    this.validationMessage = "";
    if (hadState) this.host.requestUpdate();
  }

  private async processBatch(
    files: readonly File[],
    selectionGeneration: number
  ): Promise<ImageAttachmentSelectionResult> {
    if (!this.enabled || selectionGeneration !== this.generation || files.length === 0) {
      return { accepted: 0, rejected: 0, validationMessage: "" };
    }

    const generation = selectionGeneration;
    const isCurrent = (): boolean => generation === this.generation && this.enabled;
    const accepted: DraftImageAttachment[] = [];
    const rejections: ImageValidationRejection<ImageFileCandidate>[] = [];
    const acceptedForLimits = [...this.draft];

    for (const file of files) {
      assertSelectionCurrent(isCurrent);
      const candidate: ImageFileCandidate = { file, sizeBytes: file.size };
      const limitError = validateImageLimits(candidate, acceptedForLimits);
      if (limitError) {
        rejections.push({ candidate, error: limitError });
        continue;
      }

      const attachment = await this.validateAndCreateAttachment(candidate, rejections, isCurrent);
      if (!attachment) continue;
      if (!isCurrent()) {
        this.revokeInFlightPreview(attachment.previewUrl);
        break;
      }
      accepted.push(attachment);
      acceptedForLimits.push(attachment);
    }

    if (!isCurrent()) {
      for (const attachment of accepted) this.revokeInFlightPreview(attachment.previewUrl);
      return { accepted: 0, rejected: files.length, validationMessage: "" };
    }

    for (const attachment of accepted) this.inFlightPreviewUrls.delete(attachment.previewUrl);
    this.draft = [...this.draft, ...accepted];
    this.validationMessage = formatImageValidationMessage(rejections);
    this.validationRevision += 1;
    this.host.requestUpdate();
    return {
      accepted: accepted.length,
      rejected: rejections.length,
      validationMessage: this.validationMessage
    };
  }

  private async validateAndCreateAttachment(
    candidate: ImageFileCandidate,
    rejections: ImageValidationRejection<ImageFileCandidate>[],
    isCurrent: () => boolean
  ): Promise<DraftImageAttachment | undefined> {
    assertSelectionCurrent(isCurrent);
    let detectedMime: AllowedImageMime | undefined;
    try {
      const header = await readBlobArrayBuffer(candidate.file.slice(0, 12));
      assertSelectionCurrent(isCurrent);
      detectedMime = detectImageMime(new Uint8Array(header));
    } catch (error) {
      if (error instanceof StaleImageSelectionError) throw error;
      rejections.push({ candidate, error: { code: "decode_failed" } });
      return undefined;
    }

    if (!detectedMime) {
      rejections.push({ candidate, error: { code: "unsupported_image_type" } });
      return undefined;
    }

    if (!validateDeclaredMime(candidate.file.type, detectedMime)) {
      rejections.push({
        candidate,
        error: {
          code: "mime_mismatch",
          declaredMime: candidate.file.type,
          detectedMime
        }
      });
      return undefined;
    }

    let dimensions: DecodedImageDimensions;
    try {
      dimensions = await decodeImage(
        candidate.file,
        (blob) => this.createInFlightPreview(blob),
        (previewUrl) => this.revokeInFlightPreview(previewUrl),
        isCurrent
      );
    } catch (error) {
      if (error instanceof StaleImageSelectionError) throw error;
      rejections.push({ candidate, error: { code: "decode_failed" } });
      return undefined;
    }

    assertSelectionCurrent(isCurrent);
    const pixelError = validateImagePixelLimit(dimensions.width, dimensions.height);
    if (pixelError) {
      rejections.push({ candidate, error: pixelError });
      return undefined;
    }

    let previewUrl: string;
    try {
      assertSelectionCurrent(isCurrent);
      previewUrl = this.createInFlightPreview(candidate.file);
      if (!isCurrent()) {
        this.revokeInFlightPreview(previewUrl);
        throw new StaleImageSelectionError();
      }
    } catch (error) {
      if (error instanceof StaleImageSelectionError) throw error;
      rejections.push({ candidate, error: { code: "decode_failed" } });
      return undefined;
    }

    return {
      id: createClientId("img"),
      name: candidate.file.name,
      mimeType: detectedMime,
      sizeBytes: candidate.file.size,
      width: dimensions.width,
      height: dimensions.height,
      previewUrl,
      file: candidate.file
    };
  }

  private revokePreview(previewUrl: string): void {
    try {
      URL.revokeObjectURL(previewUrl);
    } catch {
      // Object URL cleanup is best effort in constrained browser environments.
    }
  }

  private createInFlightPreview(blob: Blob): string {
    const previewUrl = URL.createObjectURL(blob);
    this.inFlightPreviewUrls.add(previewUrl);
    return previewUrl;
  }

  private revokeInFlightPreview(previewUrl: string): void {
    if (!this.inFlightPreviewUrls.delete(previewUrl)) return;
    this.revokePreview(previewUrl);
  }
}

async function decodeImage(
  file: File,
  createTemporaryUrl: (blob: Blob) => string,
  revokeTemporaryUrl: (previewUrl: string) => void,
  isCurrent: () => boolean
): Promise<DecodedImageDimensions> {
  let bitmapFailure: unknown;
  if (typeof createImageBitmap === "function") {
    try {
      assertSelectionCurrent(isCurrent);
      const bitmap = await createImageBitmap(file);
      try {
        assertSelectionCurrent(isCurrent);
        return { width: bitmap.width, height: bitmap.height };
      } finally {
        bitmap.close();
      }
    } catch (error) {
      if (error instanceof StaleImageSelectionError) throw error;
      bitmapFailure = error;
    }
  }

  assertSelectionCurrent(isCurrent);
  if (typeof Image === "undefined" || typeof URL.createObjectURL !== "function") {
    throw bitmapFailure instanceof Error ? bitmapFailure : new Error("No browser image decoder is available");
  }

  assertSelectionCurrent(isCurrent);
  const temporaryUrl = createTemporaryUrl(file);
  try {
    assertSelectionCurrent(isCurrent);
    const image = new Image();
    image.decoding = "async";
    image.src = temporaryUrl;
    if (typeof image.decode === "function") await image.decode();
    else await waitForImage(image);
    assertSelectionCurrent(isCurrent);
    return { width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    revokeTemporaryUrl(temporaryUrl);
  }
}

function assertSelectionCurrent(isCurrent: () => boolean): void {
  if (!isCurrent()) throw new StaleImageSelectionError();
}

function waitForImage(image: HTMLImageElement): Promise<void> {
  return new Promise((resolve, reject) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => reject(new Error("Image decode failed")), { once: true });
  });
}

async function readBlobArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  if (typeof blob.arrayBuffer === "function") return blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (reader.result instanceof ArrayBuffer) resolve(reader.result);
      else reject(new Error("Blob read returned no ArrayBuffer"));
    });
    reader.addEventListener("error", () => reject(reader.error ?? new Error("Blob read failed")));
    reader.readAsArrayBuffer(blob);
  });
}

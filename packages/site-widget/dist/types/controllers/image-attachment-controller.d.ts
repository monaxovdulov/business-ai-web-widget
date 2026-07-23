import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { WidgetAttachmentView } from "../components/widget-attachments";
import { type AllowedImageMime } from "../domain/image-attachments";
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
export declare class ImageAttachmentController implements ReactiveController {
    private readonly host;
    private draft;
    private readonly byMessageId;
    private validationMessage;
    private validationRevision;
    private enabled;
    private generation;
    private readonly pendingSelections;
    private readonly inFlightPreviewUrls;
    private selectionQueue;
    constructor(host: ReactiveControllerHost);
    hostDisconnected(): void;
    getDraft(): readonly DraftImageAttachment[];
    getForMessage(messageId: string): readonly DraftImageAttachment[];
    getValidationMessage(): string;
    getValidationRevision(): number;
    isProcessing(): boolean;
    whenIdle(): Promise<void>;
    setEnabled(enabled: boolean): void;
    selectFiles(files: readonly File[]): Promise<ImageAttachmentSelectionResult>;
    removeDraft(attachmentId: string): string | undefined;
    transferDraftToMessage(messageId: string): void;
    removeMessageAttachments(messageId: string): void;
    clearAll(): void;
    private processBatch;
    private validateAndCreateAttachment;
    private revokePreview;
    private createInFlightPreview;
    private revokeInFlightPreview;
}
//# sourceMappingURL=image-attachment-controller.d.ts.map
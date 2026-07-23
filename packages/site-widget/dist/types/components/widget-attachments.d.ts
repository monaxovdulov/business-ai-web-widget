import { nothing, type TemplateResult } from "lit";
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
export declare function renderAttachmentPicker({ label, disabled, onFilesSelected }: AttachmentPickerOptions): TemplateResult;
export declare function renderAttachmentPreviewList({ attachments, validationMessage, validationRevision, onRemove }: AttachmentPreviewListOptions): TemplateResult;
export declare function renderMessageAttachments(attachments: readonly WidgetAttachmentView[]): TemplateResult | typeof nothing;
export {};
//# sourceMappingURL=widget-attachments.d.ts.map
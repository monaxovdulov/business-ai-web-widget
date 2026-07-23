import { nothing, type TemplateResult } from "lit";
import type { SiteWidgetConfig, WidgetMessage } from "../types/public";
import { type WidgetAttachmentView } from "./widget-attachments";
export type WidgetMessageRenderContext = {
    config: SiteWidgetConfig;
    onRetry: (messageId: string) => void;
    images?: readonly WidgetAttachmentView[];
};
export declare function renderChatItem(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult;
export declare function renderMessageRoot(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult;
export declare function renderMessageBubble(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult;
export declare function renderMessageMeta(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult | typeof nothing;
export declare function renderMessageActions(message: WidgetMessage, context: WidgetMessageRenderContext): TemplateResult | typeof nothing;
export declare function renderMarker(message: WidgetMessage): TemplateResult;
export declare function renderDateSeparator(message: WidgetMessage, previous: WidgetMessage | undefined, now?: Date): TemplateResult | typeof nothing;
export declare function renderTypingIndicator(): TemplateResult;
export declare function formatMessageTime(value: string): string;
export declare function formatMessageDateTime(value: string): string;
export declare function millisecondsUntilNextLocalDay(now?: Date): number;
export declare function formatDateLabel(date: Date, now?: Date): string;
//# sourceMappingURL=widget-message.d.ts.map
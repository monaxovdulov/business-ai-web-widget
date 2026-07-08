import type { SiteWidgetConfig } from "../types/public";
import { validateDraft, type WidgetState } from "./state";
export type WidgetViewModel = WidgetState & {
    canSend: boolean;
    draftError: ReturnType<typeof validateDraft>;
    showQuickReplies: boolean;
    showMobileActions: boolean;
    showContactTrigger: boolean;
    contactLabel: string;
    attachmentVisible: boolean;
    attachmentDisabled: boolean;
};
export declare function buildWidgetViewModel(state: WidgetState, config: SiteWidgetConfig): WidgetViewModel;
//# sourceMappingURL=view-model.d.ts.map
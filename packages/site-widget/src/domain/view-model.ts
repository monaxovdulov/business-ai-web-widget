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

export function buildWidgetViewModel(state: WidgetState, config: SiteWidgetConfig): WidgetViewModel {
  const draftError = validateDraft(state.draft, config);
  const hasVisitorMessage = state.visitorMessageCount > 0;

  return {
    ...state,
    canSend: !state.submitting && !draftError,
    draftError,
    showQuickReplies:
      state.open &&
      config.showQuickActions &&
      config.quickReplies.length > 0 &&
      !state.submitting &&
      !hasVisitorMessage,
    showMobileActions: !state.open && config.showMobileActions && config.mobileActions.length > 0,
    showContactTrigger: !config.collectPhoneAfterFirstMessage || hasVisitorMessage,
    contactLabel: state.contactPhone ? config.phoneSavedLabel : config.phoneCaptureLabel,
    attachmentVisible: config.showAttachmentSlot,
    attachmentDisabled: !config.attachmentsEnabled,
    status: state.status
  };
}

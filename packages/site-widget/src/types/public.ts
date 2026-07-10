export type SiteWidgetTheme = "memorial-soft" | "minimal-dark-accent" | "light-catalog" | string;

export type SiteWidgetPosition = "bottom-right" | "bottom-left" | "inline";

export type SiteWidgetInitialState = "closed" | "open";

export type SiteWidgetStorageMode = "local" | "memory";

export type QuickReplySubmitMode = "prefill" | "auto";

export type SiteWidgetPanelSize = "normal" | "wide" | "fullscreen";

export type SiteWidgetQuickReply = {
  label: string;
  text?: string | undefined;
  value?: string | undefined;
};

export type SiteWidgetAction =
  | { type: "call"; label: string; href: string; icon?: string | undefined }
  | { type: "open"; label: string; icon?: string | undefined }
  | { type: "prefill"; label: string; text: string; icon?: string | undefined }
  | { type: "link"; label: string; href: string; target?: "_self" | "_blank" | undefined; icon?: string | undefined };

export type SiteWidgetContact = {
  name?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  preferred_contact?: "phone" | "whatsapp" | "telegram" | "email" | undefined;
  city?: string | undefined;
};

export type SiteWidgetUtm = {
  source?: string | undefined;
  medium?: string | undefined;
  campaign?: string | undefined;
  term?: string | undefined;
  content?: string | undefined;
};

export type SiteWidgetMessageRequest = {
  schema_version: "site_widget.v1";
  event_type: "site_widget.message_submitted";
  idempotency_key: string;
  submitted_at: string;
  public_session_id?: string | undefined;
  source: {
    channel: "site_widget";
    page_url: string;
    widget_instance_id: string;
    page_title?: string | undefined;
    referrer_url?: string | undefined;
    utm?: SiteWidgetUtm | undefined;
  };
  contact?: SiteWidgetContact | undefined;
  message: {
    role: "visitor";
    text: string;
  };
  visitor_context?: {
    locale?: string | undefined;
    timezone?: string | undefined;
  } | undefined;
  consent?: {
    privacy_policy?: boolean | undefined;
  } | undefined;
};

export type WidgetAutomationStatus = "replied" | "fallback" | "disabled";

export type SiteWidgetResponseViewModel = {
  status: WidgetAutomationStatus | "error";
  publicSessionId?: string | undefined;
  replyText?: string | undefined;
  systemText?: string | undefined;
  reason?: string | undefined;
  raw: unknown;
};

export type WidgetMessageRole = "assistant" | "visitor" | "system";

export type WidgetMessageStatus = "pending" | "sent" | "error";

export type WidgetSystemKind = "fallback" | "disabled";

export type WidgetMessage = {
  id: string;
  role: WidgetMessageRole;
  text: string;
  createdAt: string;
  status: WidgetMessageStatus;
  disclosure?: boolean | undefined;
  systemKind?: WidgetSystemKind | undefined;
};

export type SiteWidgetEventName =
  | "ready"
  | "opened"
  | "closed"
  | "message-submitted"
  | "response-received"
  | "fallback-shown"
  | "error"
  | "action-clicked"
  | "phone-saved";

export type SiteWidgetConfig = {
  apiBaseUrl: string;
  messagesPath: "/public/intake/site-widget/messages" | string;
  timeoutMs: number;
  widgetInstanceId: string;
  theme: SiteWidgetTheme;
  position: SiteWidgetPosition;
  panelSize: SiteWidgetPanelSize;
  mock: boolean;
  initialState: SiteWidgetInitialState;
  persistOpenState: boolean;
  storage: SiteWidgetStorageMode;
  quickReplySubmit: QuickReplySubmitMode;
  showQuickActions: boolean;
  showMobileActions: boolean;
  showAttachmentSlot: boolean;
  attachmentsEnabled: boolean;
  collectPhoneAfterFirstMessage: boolean;
  includeMessageTextInEvents: boolean;
  maxMessageLength: number;

  launcherLabel: string;
  headerTitle: string;
  headerStatus: string;
  headerResponseTime: string;
  introMessage: string;
  placeholder: string;
  disclosureText: string;
  footerNote: string;
  phoneCaptureLabel: string;
  phoneSavedLabel: string;
  phonePlaceholder: string;
  fallbackMessage: string;
  disabledMessage: string;
  errorMessage: string;
  retryLabel: string;
  sendLabel: string;
  attachLabel: string;
  resizeLabel: string;
  closeLabel: string;
  minimizeLabel: string;

  phoneHref?: string | undefined;
  privacyUrl?: string | undefined;
  quickReplies: SiteWidgetQuickReply[];
  mobileActions: SiteWidgetAction[];
};

export type MountSiteWidgetOptions = Partial<SiteWidgetConfig> & {
  target?: Element | null | undefined;
  attributes?: Record<string, string> | undefined;
  open?: boolean | undefined;
};

export type GranitSiteWidgetGlobal = {
  define: (tagName?: string) => void;
  mount: (options?: MountSiteWidgetOptions) => HTMLElement;
  tagName: string;
};

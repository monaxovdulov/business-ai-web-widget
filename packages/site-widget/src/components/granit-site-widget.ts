import { LitElement, html, nothing, type TemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { ImageAttachmentController } from "../controllers/image-attachment-controller";
import { MessageScrollerController } from "../controllers/message-scroller-controller";
import { normalizeWidgetConfig, OBSERVED_CONFIG_ATTRIBUTES, readConfigFromElement } from "../domain/config";
import { createClientId, createIdempotencyKey } from "../domain/ids";
import { buildSiteWidgetMessageRequest } from "../domain/request";
import {
  applyWidgetAction,
  createWidgetState,
  validateDraft,
  type PendingSubmission,
  type WidgetState
} from "../domain/state";
import { buildWidgetViewModel } from "../domain/view-model";
import { emitSiteWidgetEvent } from "../events/widget-events";
import { readBrowserEnvironment } from "../services/browser-env";
import { sendSiteWidgetMessage } from "../services/intake-client";
import { createSessionStore, type WidgetSessionStore } from "../services/session-store";
import { messageStyles } from "../styles/message.styles";
import { widgetStyles } from "../styles/widget.styles";
import type { SiteWidgetAction, SiteWidgetConfig, SiteWidgetContact, SiteWidgetPanelSize } from "../types/public";
import { widgetIcon } from "../ui/icons";
import { renderAttachmentPicker, renderAttachmentPreviewList } from "./widget-attachments";
import { renderChatItem } from "./widget-message";

export const SITE_WIDGET_TAG_NAME = "granit-site-widget";

const DESKTOP_PANEL_SIZE_ORDER: readonly SiteWidgetPanelSize[] = ["normal", "wide", "fullscreen"];
const MOBILE_PANEL_SIZE_ORDER: readonly SiteWidgetPanelSize[] = ["normal", "fullscreen"];
const PANEL_SIZE_LABELS: Record<SiteWidgetPanelSize, string> = {
  normal: "обычный размер",
  wide: "широкий режим",
  fullscreen: "на весь экран"
};

export class GranitSiteWidgetElement extends LitElement {
  static override styles = [widgetStyles, messageStyles];

  static override get observedAttributes(): string[] {
    return [...super.observedAttributes, ...OBSERVED_CONFIG_ATTRIBUTES];
  }

  private config: SiteWidgetConfig = normalizeWidgetConfig();
  private state: WidgetState = createWidgetState({ config: this.config });
  private panelSize: SiteWidgetPanelSize = "normal";
  private hasBooted = false;
  private sessionStore?: WidgetSessionStore;
  private publicSessionId = "";
  private abortController: AbortController | undefined;
  private operationEpoch = 0;
  private readonly messageScroller = new MessageScrollerController(this);
  private readonly imageAttachments = new ImageAttachmentController(this);
  private sendMessageRequest = sendSiteWidgetMessage;
  private readonly panelId = createClientId("sw-panel");
  private readonly titleId = createClientId("sw-title");
  private readonly phoneCaptureId = createClientId("sw-phone");

  override connectedCallback(): void {
    const reconnecting = this.hasBooted;
    super.connectedCallback();
    this.boot();
    if (reconnecting) this.requestUpdate();
  }

  override disconnectedCallback(): void {
    this.invalidateActiveWork(true);
    super.disconnectedCallback();
  }

  override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue || !this.hasBooted) return;

    const previousConfig = this.config;
    const previousPhotoPreviewEnabled = this.isPhotoPreviewEnabled();
    this.config = readConfigFromElement(this);
    this.syncHostAttributes();
    const photoPreviewEnabled = this.isPhotoPreviewEnabled();
    const sessionBoundaryChanged =
      previousConfig.widgetInstanceId !== this.config.widgetInstanceId || previousConfig.storage !== this.config.storage;
    const transportBoundaryChanged =
      previousConfig.apiBaseUrl !== this.config.apiBaseUrl ||
      previousConfig.messagesPath !== this.config.messagesPath ||
      previousConfig.timeoutMs !== this.config.timeoutMs ||
      previousConfig.mock !== this.config.mock;
    const photoBoundaryChanged = previousPhotoPreviewEnabled !== photoPreviewEnabled;

    if (sessionBoundaryChanged) {
      const wasOpen = this.state.open;
      this.invalidateActiveWork(false);
      this.imageAttachments.clearAll();
      this.sessionStore = createSessionStore(this.config.widgetInstanceId, this.config.storage);
      this.publicSessionId = this.sessionStore.getPublicSessionId();
      this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize;
      this.state = createWidgetState({ config: this.config, open: wasOpen });
    } else if (transportBoundaryChanged || photoBoundaryChanged) {
      this.invalidateActiveWork(true);
    }
    this.imageAttachments.setEnabled(photoPreviewEnabled);

    if (name === "panel-size") {
      this.panelSize = this.config.panelSize;
    }

    if (name === "open") {
      this.state = applyWidgetAction(this.state, this.hasAttribute("open") ? { type: "open" } : { type: "close" }, this.config);
    }

    this.requestUpdate();
  }

  open(): void {
    this.boot();
    this.state = applyWidgetAction(this.state, { type: "open" }, this.config);
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    this.persistOpenState(true);
    emitSiteWidgetEvent(this, "opened", this.config);
    this.requestUpdate();
    void this.focusInputSoon();
  }

  close(): void {
    this.boot();
    this.state = applyWidgetAction(this.state, { type: "close" }, this.config);
    if (this.hasAttribute("open")) this.removeAttribute("open");
    this.persistOpenState(false);
    emitSiteWidgetEvent(this, "closed", this.config);
    this.requestUpdate();
    void this.focusLauncherSoon();
  }

  sendMessage(text: string): void {
    this.boot();
    this.state = applyWidgetAction(this.state, { type: "draft.changed", value: text }, this.config);
    void this.submitDraft();
  }

  clearSession(): void {
    this.invalidateActiveWork(false);
    this.imageAttachments.clearAll();
    this.state = applyWidgetAction(this.state, { type: "session.cleared" }, this.config);
    this.sessionStore?.clearPublicSessionId();
    this.publicSessionId = this.sessionStore?.getPublicSessionId() ?? "";
    this.requestUpdate();
  }

  protected override render(): TemplateResult {
    const view = buildWidgetViewModel(this.state, this.config);
    const effectivePanelSize = this.getEffectivePanelSize();
    const panelSizeButtonLabel = this.getPanelSizeButtonLabel();
    const panelSizeIconName = effectivePanelSize === "fullscreen" ? "minimize-2" : "maximize-2";
    const scrollerSnapshot = this.messageScroller.getSnapshot();
    const photoPreviewEnabled = this.isPhotoPreviewEnabled();
    const attachmentProcessing = this.imageAttachments.isProcessing();
    const pendingMessage = view.pending
      ? view.messages.find((message) => message.id === view.pending?.messageId)
      : undefined;
    const liveStatus =
      pendingMessage?.status === "error"
        ? this.config.errorMessage
        : pendingMessage?.status === "pending"
          ? "Отправляем сообщение."
          : "";

    return html`
      <button
        class="launcher"
        part="launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded=${String(view.open)}
        aria-controls=${this.panelId}
        ?hidden=${view.open}
        @click=${() => this.open()}
      >
        <span part="launcher-icon" aria-hidden="true">${widgetIcon("message")}</span>
        <span part="launcher-label">${this.config.launcherLabel}</span>
        ${view.unreadCount > 0
          ? html`<span class="launcher__badge" aria-label=${`${view.unreadCount} новых сообщений`}
              >${view.unreadCount}</span
            >`
          : nothing}
      </button>

      ${this.renderMobileActions(view.showMobileActions)}

      <section
        id=${this.panelId}
        class="panel"
        part="panel"
        data-size=${effectivePanelSize}
        role="dialog"
        aria-modal="false"
        aria-labelledby=${this.titleId}
        ?hidden=${!view.open}
        @keydown=${this.handlePanelKeydown}
      >
        <header class="header" part="header">
          <div class="brand-mark" part="brand-mark" aria-hidden="true">${widgetIcon("brand", 24)}</div>
          <div>
            <h2 id=${this.titleId} class="title" part="title">${this.config.headerTitle}</h2>
            <div class="status" part="status">
              <span class="status__dot" aria-hidden="true"></span>
              <span>${this.config.headerStatus}</span>
              <span aria-hidden="true">·</span>
              <span>${this.config.headerResponseTime}</span>
            </div>
          </div>
          <div class="header-actions" part="header-actions">
            <button
              class="icon-button"
              part="resize-button"
              type="button"
              aria-label=${panelSizeButtonLabel}
              title=${panelSizeButtonLabel}
              @click=${this.cyclePanelSize}
            >
              ${widgetIcon(panelSizeIconName)}
            </button>
            <button
              class="icon-button"
              part="minimize-button"
              type="button"
              aria-label=${this.config.minimizeLabel}
              @click=${() => this.close()}
            >
              ${widgetIcon("minus")}
            </button>
            <button
              class="icon-button"
              part="close-button"
              type="button"
              aria-label=${this.config.closeLabel}
              @click=${() => this.close()}
            >
              ${widgetIcon("close")}
            </button>
          </div>
        </header>

        <div class="body" part="body">
          <div class="message-scroller">
            <div
              class="message-viewport"
              part="message-viewport"
              role="region"
              aria-label="Сообщения"
              tabindex="0"
            >
              <div
                class="messages"
                part="messages"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-busy=${String(view.submitting)}
              >
                ${repeat(
                  view.messages,
                  (message) => message.id,
                  (message) => html`<div
                    class="message-scroller__item"
                    data-message-id=${message.id}
                    data-scroll-anchor=${message.role === "visitor" ? "true" : nothing}
                  >
                    ${renderChatItem(message, {
                      config: this.config,
                      onRetry: this.retryPending,
                      images: this.imageAttachments.getForMessage(message.id)
                    })}
                  </div>`
                )}
                <div class="message-scroller__tail" aria-hidden="true"></div>
              </div>
            </div>
            ${scrollerSnapshot.canScrollEnd
              ? html`<button
                  class="jump-latest"
                  part="jump-latest"
                  type="button"
                  @click=${() => this.messageScroller.scrollToEnd({ behavior: "smooth" })}
                >
                  ${scrollerSnapshot.newItemCount > 0 ? "Новые сообщения" : "К новым сообщениям"}
                </button>`
              : nothing}
          </div>

          ${view.showQuickReplies
            ? html`<div class="quick-replies" part="quick-replies">
                ${this.config.quickReplies.map(
                  (reply) => html`<button
                    class="quick-reply"
                    part="quick-reply"
                    type="button"
                    @click=${() => this.handleQuickReply(reply.text ?? reply.value ?? reply.label)}
                    @focus=${this.handleQuickReplyFocus}
                  >
                    ${reply.label}
                  </button>`
                )}
              </div>`
            : nothing}
        </div>

        <div class="composer-shell" part="composer-shell">
          ${photoPreviewEnabled
            ? renderAttachmentPreviewList({
                attachments: this.imageAttachments.getDraft(),
                validationMessage: this.imageAttachments.getValidationMessage(),
                validationRevision: this.imageAttachments.getValidationRevision(),
                onRemove: this.handleRemoveAttachment
              })
            : nothing}
          <form
            class="composer"
            part="composer"
            data-attachments=${String(photoPreviewEnabled)}
            @submit=${this.handleSubmit}
          >
            ${photoPreviewEnabled
              ? renderAttachmentPicker({
                  label: this.config.attachLabel,
                  disabled: attachmentProcessing || view.submitting || Boolean(view.pending),
                  onFilesSelected: this.handleAttachmentFiles
                })
              : nothing}
            <label class="visually-hidden" for="granit-site-widget-message">${this.config.placeholder}</label>
            <textarea
              id="granit-site-widget-message"
              class="textarea"
              part="input textarea"
              rows="1"
              maxlength=${this.config.maxMessageLength}
              placeholder=${this.config.placeholder}
              aria-label=${this.config.placeholder}
              .value=${view.draft}
              ?disabled=${view.submitting}
              @input=${this.handleInput}
              @keydown=${this.handleTextareaKeydown}
            ></textarea>
            <button
              class="send-button"
              part="send-button"
              type="submit"
              aria-label=${this.config.sendLabel}
              ?disabled=${!view.canSend || attachmentProcessing}
            >
              ${widgetIcon("send")}
            </button>
          </form>

          ${view.showContactTrigger
            ? html`<div class="contact-row" part="contact-row">
                <button
                  class="contact-trigger"
                  part="phone-trigger"
                  type="button"
                  aria-expanded=${String(view.contactCaptureOpen)}
                  aria-controls=${this.phoneCaptureId}
                  @click=${this.toggleContactCapture}
                >
                  ${widgetIcon("plus", 18)}
                  <span>${view.contactLabel}</span>
                </button>
              </div>
              <div
                id=${this.phoneCaptureId}
                class="phone-capture"
                part="phone-capture"
                ?hidden=${!view.contactCaptureOpen}
              >
                <label class="visually-hidden" for="granit-site-widget-phone">${this.config.phoneCaptureLabel}</label>
                <input
                  id="granit-site-widget-phone"
                  class="phone-field"
                  part="phone-field"
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder=${this.config.phonePlaceholder}
                  .value=${view.contactPhone}
                  @input=${this.handlePhoneInput}
                  @keydown=${this.handlePhoneKeydown}
                />
                <button class="phone-save" part="phone-save-button" type="button" @click=${this.savePhone}>OK</button>
              </div>`
            : nothing}

          <div class="footer-note" part="footer-note">
            <span aria-hidden="true">${widgetIcon("shield", 18)}</span>
            <span>${this.config.footerNote}</span>
          </div>
          <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">${liveStatus}</div>
        </div>
      </section>
    `;
  }

  protected override updated(): void {
    this.autoGrowTextarea();
    const root = this.renderRoot.querySelector<HTMLElement>(".message-scroller");
    const viewport = this.renderRoot.querySelector<HTMLElement>(".message-viewport");
    const content = this.renderRoot.querySelector<HTMLElement>(".messages");
    const tailSpacer = this.renderRoot.querySelector<HTMLElement>(".message-scroller__tail");
    if (root && viewport && content && tailSpacer) {
      this.messageScroller.connect({ root, viewport, content, tailSpacer });
      this.messageScroller.reconcile(
        this.state.messages.map((message) => ({ id: message.id, scrollAnchor: message.role === "visitor" }))
      );
    }
  }

  private boot(): void {
    if (this.hasBooted) return;
    this.config = readConfigFromElement(this);
    this.syncHostAttributes();
    this.sessionStore = createSessionStore(this.config.widgetInstanceId, this.config.storage);
    this.publicSessionId = this.sessionStore.getPublicSessionId();
    this.panelSize = this.sessionStore.getPanelSize() ?? this.config.panelSize;
    this.imageAttachments.setEnabled(this.isPhotoPreviewEnabled());

    const persistedOpen = this.config.persistOpenState ? this.sessionStore.getOpenState() : undefined;
    const initialOpen = this.hasAttribute("open") || (persistedOpen ?? this.config.initialState === "open");
    this.state = createWidgetState({ config: this.config, open: initialOpen });
    if (initialOpen && !this.hasAttribute("open")) this.setAttribute("open", "");

    this.hasBooted = true;
    void this.updateComplete.then(() => {
      emitSiteWidgetEvent(this, "ready", this.config);
      if (initialOpen) void this.focusInputSoon();
    });
  }

  private syncHostAttributes(): void {
    if (this.getAttribute("theme") !== this.config.theme) this.setAttribute("theme", this.config.theme);
    if (this.getAttribute("position") !== this.config.position) this.setAttribute("position", this.config.position);
  }

  private persistOpenState(open: boolean): void {
    if (this.config.persistOpenState) this.sessionStore?.setOpenState(open);
  }

  private cyclePanelSize = (): void => {
    this.panelSize = this.getNextPanelSize();
    this.sessionStore?.setPanelSize(this.panelSize);
    this.requestUpdate();
  };

  private getPanelSizeButtonLabel(): string {
    return `${this.config.resizeLabel}: ${PANEL_SIZE_LABELS[this.getNextPanelSize()]}`;
  }

  private getNextPanelSize(): SiteWidgetPanelSize {
    const order = this.getPanelSizeOrder();
    const current = order.includes(this.panelSize) ? this.panelSize : "normal";
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % order.length] ?? "normal";
  }

  private getEffectivePanelSize(): SiteWidgetPanelSize {
    if (this.isMobileViewport() && this.panelSize === "wide") return "normal";
    return this.panelSize;
  }

  private getPanelSizeOrder(): readonly SiteWidgetPanelSize[] {
    return this.isMobileViewport() ? MOBILE_PANEL_SIZE_ORDER : DESKTOP_PANEL_SIZE_ORDER;
  }

  private isMobileViewport(): boolean {
    return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    void this.submitDraft();
  };

  private handleInput = (event: Event): void => {
    const target = event.currentTarget as HTMLTextAreaElement;
    this.state = applyWidgetAction(this.state, { type: "draft.changed", value: target.value }, this.config);
    this.requestUpdate();
  };

  private handleTextareaKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void this.submitDraft();
    }
  };

  private handlePanelKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
    }
  };

  private handleQuickReply(text: string): void {
    emitSiteWidgetEvent(this, "action-clicked", this.config, { actionType: "quick-reply" });
    this.state = applyWidgetAction(this.state, { type: "draft.changed", value: text }, this.config);
    this.requestUpdate();

    if (this.config.quickReplySubmit === "auto") {
      void this.submitDraft();
    } else {
      void this.focusInputSoon();
    }
  }

  private handleQuickReplyFocus = (event: FocusEvent): void => {
    const target = event.currentTarget;
    if (target instanceof HTMLElement && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
    }
  };

  private renderMobileActions(show: boolean): TemplateResult | typeof nothing {
    if (!show) return nothing;
    return html`<nav class="mobile-actions" part="mobile-actions" aria-label="Быстрые действия">
      ${this.config.mobileActions.map((action) => this.renderMobileAction(action))}
    </nav>`;
  }

  private renderMobileAction(action: SiteWidgetAction): TemplateResult {
    const iconName = action.icon ?? action.type;
    if (action.type === "call" || action.type === "link") {
      return html`<a
        class="mobile-action"
        part="mobile-action"
        href=${action.href}
        target=${action.type === "link" ? action.target ?? "_blank" : "_self"}
        rel=${action.type === "link" && action.target !== "_self" ? "noopener noreferrer" : ""}
        @click=${() => emitSiteWidgetEvent(this, "action-clicked", this.config, { actionType: action.type })}
      >
        ${widgetIcon(iconName, 20)}
        <span>${action.label}</span>
      </a>`;
    }

    return html`<button
      class="mobile-action"
      part="mobile-action"
      type="button"
      @click=${() => this.handleMobileAction(action)}
    >
      ${widgetIcon(iconName, 20)}
      <span>${action.label}</span>
    </button>`;
  }

  private handleMobileAction(action: SiteWidgetAction): void {
    emitSiteWidgetEvent(this, "action-clicked", this.config, { actionType: action.type });
    this.open();
    if (action.type === "prefill") {
      this.state = applyWidgetAction(this.state, { type: "draft.changed", value: action.text }, this.config);
      this.requestUpdate();
      void this.focusInputSoon();
    }
  }

  private toggleContactCapture = (): void => {
    this.state = applyWidgetAction(this.state, { type: "contact.capture.toggled" }, this.config);
    this.requestUpdate();
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLInputElement>(".phone-field")?.focus());
  };

  private handlePhoneInput = (event: Event): void => {
    const phone = (event.currentTarget as HTMLInputElement).value;
    this.state = { ...this.state, contactPhone: phone };
  };

  private handlePhoneKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.savePhone();
    }
  };

  private savePhone = (): void => {
    const phone = this.state.contactPhone.trim();
    this.state = applyWidgetAction(this.state, { type: "contact.phone.saved", phone }, this.config);
    emitSiteWidgetEvent(this, "phone-saved", this.config, { hasPhone: phone.length > 0 });
    this.requestUpdate();
  };

  private async submitDraft(): Promise<void> {
    if (!this.isConnected) return;
    const operationEpoch = this.operationEpoch;
    let text = this.state.draft.trim();
    if (validateDraft(text, this.config) || this.state.submitting || this.state.pending) return;

    if (this.isPhotoPreviewEnabled() && this.imageAttachments.isProcessing()) {
      await this.imageAttachments.whenIdle();
      if (operationEpoch !== this.operationEpoch || !this.isConnected) return;
      text = this.state.draft.trim();
      if (validateDraft(text, this.config) || this.state.submitting || this.state.pending) return;
    }

    if (operationEpoch !== this.operationEpoch || !this.isConnected) return;

    const idempotencyKey = createIdempotencyKey(this.publicSessionId);
    this.state = applyWidgetAction(this.state, { type: "submit.started", text, idempotencyKey }, this.config);
    const pending = this.state.pending;
    if (!pending || pending.idempotencyKey !== idempotencyKey) return;
    if (this.isPhotoPreviewEnabled()) this.imageAttachments.transferDraftToMessage(pending.messageId);
    this.requestUpdate();
    await this.sendPending(pending, operationEpoch);
  }

  private retryPending = async (messageId?: string): Promise<void> => {
    if (!this.state.pending || this.state.submitting) return;
    if (messageId && messageId !== this.state.pending.messageId) return;
    const pending = this.state.pending;
    const operationEpoch = this.operationEpoch;
    this.state = applyWidgetAction(this.state, { type: "retry.started" }, this.config);
    this.requestUpdate();
    await this.sendPending(pending, operationEpoch);
  };

  private async sendPending(pending: PendingSubmission, operationEpoch: number): Promise<void> {
    this.abortController?.abort();
    const requestController = new AbortController();
    this.abortController = requestController;
    const { messageId, text, idempotencyKey } = pending;
    const isCurrentRequest = (): boolean =>
      this.operationEpoch === operationEpoch &&
      this.abortController === requestController &&
      !requestController.signal.aborted &&
      this.isConnected &&
      this.state.pending?.messageId === messageId &&
      this.state.pending.idempotencyKey === idempotencyKey;

    try {
      const request = buildSiteWidgetMessageRequest({
        config: this.config,
        text,
        publicSessionId: this.publicSessionId,
        idempotencyKey,
        contact: this.buildContact(),
        environment: readBrowserEnvironment()
      });

      emitSiteWidgetEvent(this, "message-submitted", this.config, {
        idempotencyKey,
        publicSessionId: this.publicSessionId,
        messageText: text
      });
      if (!isCurrentRequest()) return;

      const response = await this.sendMessageRequest(this.config, request, requestController.signal);
      if (!isCurrentRequest()) return;

      if (response.publicSessionId) {
        this.publicSessionId = response.publicSessionId;
        this.sessionStore?.setPublicSessionId(response.publicSessionId);
      }

      this.state = applyWidgetAction(this.state, { type: "visitor.persisted", text, messageId }, this.config);

      if (response.status === "replied" && response.replyText) {
        this.state = applyWidgetAction(this.state, { type: "assistant.replied", text: response.replyText }, this.config);
      } else {
        const status = response.status === "disabled" ? "disabled" : "fallback";
        this.state = applyWidgetAction(
          this.state,
          { type: "system.message", text: response.systemText || this.config.fallbackMessage, status },
          this.config
        );
        emitSiteWidgetEvent(this, "fallback-shown", this.config, {
          status,
          reason: response.reason ?? ""
        });
      }

      emitSiteWidgetEvent(this, "response-received", this.config, {
        status: response.status,
        reason: response.reason ?? ""
      });
      this.requestUpdate();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError" && requestController.signal.aborted) return;
      if (!isCurrentRequest()) return;
      this.state = applyWidgetAction(
        this.state,
        { type: "submit.failed", text: this.config.errorMessage, messageId },
        this.config
      );
      emitSiteWidgetEvent(this, "error", this.config, {
        errorMessage: error instanceof Error ? error.message : String(error)
      });
      this.requestUpdate();
    } finally {
      if (this.abortController === requestController) this.abortController = undefined;
    }
  }

  private invalidateActiveWork(markPendingAsError: boolean): void {
    this.operationEpoch += 1;
    const activeController = this.abortController;
    this.abortController = undefined;
    activeController?.abort();
    if (markPendingAsError && this.state.pending && this.state.submitting) {
      this.state = applyWidgetAction(
        this.state,
        { type: "submit.failed", text: this.config.errorMessage, messageId: this.state.pending.messageId },
        this.config
      );
    }
  }

  private buildContact(): SiteWidgetContact | undefined {
    const phone = this.state.contactPhone.trim();
    return phone ? { phone, preferred_contact: "phone" } : undefined;
  }

  private isPhotoPreviewEnabled(): boolean {
    return this.config.mock && this.config.attachmentsEnabled && this.config.showAttachmentSlot;
  }

  private handleAttachmentFiles = async (files: readonly File[]): Promise<void> => {
    if (!this.isPhotoPreviewEnabled()) return;
    await this.imageAttachments.selectFiles(files);
  };

  private handleRemoveAttachment = (attachmentId: string): void => {
    const focusTarget = this.imageAttachments.removeDraft(attachmentId);
    void this.updateComplete.then(() => {
      const target = focusTarget
        ? [...this.renderRoot.querySelectorAll<HTMLButtonElement>("[data-attachment-id]")].find(
            (button) => button.dataset.attachmentId === focusTarget
          )
        : this.renderRoot.querySelector<HTMLButtonElement>(".attach-button");
      target?.focus();
    });
  };

  private autoGrowTextarea(): void {
    const textarea = this.renderRoot.querySelector<HTMLTextAreaElement>(".textarea");
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 118)}px`;
  }

  private async focusInputSoon(): Promise<void> {
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLTextAreaElement>(".textarea")?.focus();
  }

  private async focusLauncherSoon(): Promise<void> {
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLButtonElement>(".launcher")?.focus();
  }
}

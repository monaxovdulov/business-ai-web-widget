import type { ReactiveController, ReactiveControllerHost } from "lit";

export const SCROLL_EDGE_THRESHOLD = 8;
export const PREVIOUS_ITEM_PEEK = 40;
export const SMOOTH_SCROLL_CLEAR_MS = 180;
export const SCROLL_EPSILON = 0.5;

export type MessageScrollerMode =
  | "following-bottom"
  | "free-scrolling"
  | "anchored-to-message"
  | "settling-jump";

export type MessageScrollerItem = {
  id: string;
  scrollAnchor: boolean;
};

export type MessageScrollerSnapshot = {
  mode: MessageScrollerMode;
  canScrollStart: boolean;
  canScrollEnd: boolean;
  newItemCount: number;
};

export type MessageScrollerElements = {
  root?: HTMLElement;
  viewport: HTMLElement;
  content: HTMLElement;
  tailSpacer: HTMLElement;
};

export type MessageScrollerScrollOptions = {
  behavior?: ScrollBehavior;
};

type LayoutAnchor = {
  id: string;
  viewportTop: number;
};

type PendingReconcile = {
  previous: readonly MessageScrollerItem[];
  next: readonly MessageScrollerItem[];
  layoutAnchor?: LayoutAnchor;
};

const RELEASE_KEYS = new Set(["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", " ", "Spacebar"]);

export class MessageScrollerController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private root: HTMLElement | undefined;
  private viewport: HTMLElement | undefined;
  private content: HTMLElement | undefined;
  private tailSpacer: HTMLElement | undefined;
  private items: readonly MessageScrollerItem[] = [];
  private mode: MessageScrollerMode = "following-bottom";
  private snapshot: MessageScrollerSnapshot = {
    mode: "following-bottom",
    canScrollStart: false,
    canScrollEnd: false,
    newItemCount: 0
  };
  private newItemCount = 0;
  private hasInitialPlacement = false;
  private activeAnchorId: string | undefined;
  private pendingLayoutAnchor: LayoutAnchor | undefined;
  private pendingReconcile: PendingReconcile | undefined;
  private resizeObserver: ResizeObserver | undefined;
  private observedRows = new Set<Element>();
  private frameId: number | undefined;
  private programmaticScroll = false;
  private smoothClearTimer: number | undefined;
  private pointerActive = false;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostUpdate(): void {
    if (!this.hasLayout()) return;
    this.pendingLayoutAnchor = this.captureFirstVisible();
  }

  hostDisconnected(): void {
    this.disconnect();
  }

  connect({ root, viewport, content, tailSpacer }: MessageScrollerElements): void {
    if (this.viewport === viewport && this.content === content && this.tailSpacer === tailSpacer) {
      this.root = root;
      this.commitModeAttribute();
      return;
    }

    this.detachElements();
    this.root = root;
    this.viewport = viewport;
    this.content = content;
    this.tailSpacer = tailSpacer;

    viewport.addEventListener("scroll", this.handleScroll, { passive: true });
    viewport.addEventListener("wheel", this.handleWheel, { passive: true });
    viewport.addEventListener("touchmove", this.handleTouchMove, { passive: true });
    viewport.addEventListener("keydown", this.handleKeydown);
    viewport.addEventListener("pointerdown", this.handlePointerDown);
    viewport.addEventListener("pointerup", this.handlePointerUp);
    viewport.addEventListener("pointercancel", this.handlePointerUp);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.scheduleCommit());
      this.resizeObserver.observe(viewport);
      this.resizeObserver.observe(content);
      this.reconcileObservedRows();
    }

    this.commitModeAttribute();
    this.scheduleCommit();
  }

  reconcile(items: readonly MessageScrollerItem[]): void {
    const next = items.map((item) => ({ id: item.id, scrollAnchor: Boolean(item.scrollAnchor) }));
    const previous = this.pendingReconcile?.previous ?? this.items;
    const layoutAnchor = this.pendingLayoutAnchor;
    this.pendingLayoutAnchor = undefined;
    this.items = next;
    this.pendingReconcile = layoutAnchor ? { previous, next, layoutAnchor } : { previous, next };
    this.reconcileObservedRows();
    this.scheduleCommit();
  }

  scrollToEnd(options: MessageScrollerScrollOptions = {}): boolean {
    const viewport = this.viewport;
    if (!viewport || !this.hasLayout()) return false;

    this.activeAnchorId = undefined;
    this.setTailHeight(0);
    this.newItemCount = 0;
    const behavior = this.normalizeBehavior(options.behavior ?? "auto");
    this.mode = behavior === "smooth" ? "settling-jump" : "following-bottom";
    this.commitModeAttribute();
    this.performScroll(Math.max(0, viewport.scrollHeight - viewport.clientHeight), behavior);
    this.updateSnapshot();

    if (behavior === "smooth") {
      this.clearSmoothTimer();
      this.smoothClearTimer = globalThis.setTimeout(() => {
        this.smoothClearTimer = undefined;
        this.programmaticScroll = false;
        this.mode = "following-bottom";
        this.commitModeAttribute();
        this.updateSnapshot();
      }, SMOOTH_SCROLL_CLEAR_MS);
    }

    return true;
  }

  scrollToMessage(messageId: string, options: MessageScrollerScrollOptions = {}): boolean {
    const viewport = this.viewport;
    const target = this.findRow(messageId);
    if (!viewport || !target || !this.hasLayout()) return false;

    this.activeAnchorId = undefined;
    this.setTailHeight(0);
    this.newItemCount = 0;
    this.mode = "free-scrolling";
    this.commitModeAttribute();
    const viewportRect = viewport.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = viewport.scrollTop + targetRect.top - viewportRect.top - PREVIOUS_ITEM_PEEK;
    this.performScroll(Math.max(0, top), this.normalizeBehavior(options.behavior ?? "auto"));
    this.updateSnapshot();
    return true;
  }

  disconnect(): void {
    this.detachElements();
    this.cancelFrame();
    this.clearSmoothTimer();
    this.pendingReconcile = undefined;
    this.pendingLayoutAnchor = undefined;
    this.activeAnchorId = undefined;
    this.hasInitialPlacement = false;
    this.pointerActive = false;
    this.programmaticScroll = false;
  }

  getSnapshot(): MessageScrollerSnapshot {
    return this.snapshot;
  }

  private scheduleCommit(): void {
    if (this.frameId !== undefined) return;
    this.frameId = this.requestFrame(() => {
      this.frameId = undefined;
      const reconcile = this.pendingReconcile;
      this.pendingReconcile = undefined;
      this.commitReconcile(
        reconcile ?? {
          previous: this.items,
          next: this.items
        }
      );
    });
  }

  private commitReconcile(reconcile: PendingReconcile): void {
    const viewport = this.viewport;
    if (!viewport || !this.content || !this.tailSpacer) return;
    if (!this.hasLayout()) {
      this.updateSnapshot();
      return;
    }

    if (reconcile.next.length > 0 && !this.hasInitialPlacement) {
      this.hasInitialPlacement = true;
      this.activeAnchorId = undefined;
      this.setTailHeight(0);
      this.mode = "following-bottom";
      this.commitModeAttribute();
      this.performScroll(Math.max(0, viewport.scrollHeight - viewport.clientHeight), "auto");
      this.updateSnapshot();
      return;
    }

    if (this.isPrepend(reconcile.previous, reconcile.next) && reconcile.layoutAnchor) {
      this.restoreLayoutAnchor(reconcile.layoutAnchor);
    }

    const appended = this.getAppendedItems(reconcile.previous, reconcile.next);
    const turnAnchor = [...appended].reverse().find((item) => item.scrollAnchor);

    if (turnAnchor) {
      this.startTurnAnchor(turnAnchor.id);
    } else if (appended.length > 0) {
      if (this.mode === "following-bottom" || this.mode === "settling-jump") {
        this.performScroll(Math.max(0, viewport.scrollHeight - viewport.clientHeight), "auto");
      } else if (this.activeAnchorId) {
        this.reconcileActiveAnchor();
      } else {
        this.newItemCount += appended.length;
      }
    } else if (this.mode === "following-bottom") {
      this.performScroll(Math.max(0, viewport.scrollHeight - viewport.clientHeight), "auto");
    } else if (this.activeAnchorId) {
      this.reconcileActiveAnchor();
    }

    this.updateSnapshot();
  }

  private startTurnAnchor(messageId: string): void {
    const viewport = this.viewport;
    const target = this.findRow(messageId);
    if (!viewport || !target || !this.tailSpacer) return;

    this.activeAnchorId = messageId;
    this.newItemCount = 0;
    this.mode = "anchored-to-message";
    this.commitModeAttribute();
    const desiredTop = this.desiredScrollTop(target);
    this.setTailHeight(this.requiredTailHeight(desiredTop));
    this.performScroll(desiredTop, "auto");
  }

  private reconcileActiveAnchor(): void {
    const target = this.activeAnchorId ? this.findRow(this.activeAnchorId) : undefined;
    if (!target || !this.viewport) {
      this.activeAnchorId = undefined;
      this.setTailHeight(0);
      return;
    }

    const desiredTop = this.desiredScrollTop(target);
    const tailHeight = this.requiredTailHeight(desiredTop);
    this.setTailHeight(tailHeight);

    if (this.mode === "anchored-to-message") {
      if (tailHeight <= SCROLL_EPSILON) {
        this.activeAnchorId = undefined;
        this.mode = "following-bottom";
        this.commitModeAttribute();
        this.performScroll(Math.max(0, this.viewport.scrollHeight - this.viewport.clientHeight), "auto");
      } else {
        const viewportRect = this.viewport.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        if (Math.abs(targetRect.top - viewportRect.top - PREVIOUS_ITEM_PEEK) > SCROLL_EPSILON) {
          this.performScroll(desiredTop, "auto");
        }
      }
    } else if (tailHeight <= SCROLL_EPSILON) {
      this.activeAnchorId = undefined;
    }
  }

  private requiredTailHeight(desiredScrollTop: number): number {
    const viewport = this.viewport;
    const tail = this.tailSpacer;
    if (!viewport || !tail) return 0;
    const viewportRect = viewport.getBoundingClientRect();
    const tailRect = tail.getBoundingClientRect();
    const tailStart = viewport.scrollTop + tailRect.top - viewportRect.top;
    return Math.max(0, desiredScrollTop + viewport.clientHeight - tailStart);
  }

  private desiredScrollTop(target: HTMLElement): number {
    const viewport = this.viewport;
    if (!viewport) return 0;
    const viewportRect = viewport.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return Math.max(0, viewport.scrollTop + targetRect.top - viewportRect.top - PREVIOUS_ITEM_PEEK);
  }

  private restoreLayoutAnchor(anchor: LayoutAnchor): void {
    const viewport = this.viewport;
    const row = this.findRow(anchor.id);
    if (!viewport || !row) return;
    const viewportRect = viewport.getBoundingClientRect();
    const currentTop = row.getBoundingClientRect().top - viewportRect.top;
    const delta = currentTop - anchor.viewportTop;
    if (Math.abs(delta) <= SCROLL_EPSILON) return;
    this.markProgrammaticScroll("auto");
    viewport.scrollTop += delta;
  }

  private captureFirstVisible(): LayoutAnchor | undefined {
    const viewport = this.viewport;
    const content = this.content;
    if (!viewport || !content) return undefined;
    const viewportRect = viewport.getBoundingClientRect();
    for (const row of content.querySelectorAll<HTMLElement>("[data-message-id]")) {
      const rect = row.getBoundingClientRect();
      if (rect.bottom > viewportRect.top + SCROLL_EPSILON && rect.top < viewportRect.bottom - SCROLL_EPSILON) {
        return { id: row.dataset.messageId ?? "", viewportTop: rect.top - viewportRect.top };
      }
    }
    return undefined;
  }

  private getAppendedItems(
    previous: readonly MessageScrollerItem[],
    next: readonly MessageScrollerItem[]
  ): readonly MessageScrollerItem[] {
    if (next.length <= previous.length) return [];
    for (let index = 0; index < previous.length; index += 1) {
      if (previous[index]?.id !== next[index]?.id) return [];
    }
    return next.slice(previous.length);
  }

  private isPrepend(previous: readonly MessageScrollerItem[], next: readonly MessageScrollerItem[]): boolean {
    if (previous.length === 0 || next.length <= previous.length) return false;
    const start = next.findIndex((item) => item.id === previous[0]?.id);
    if (start <= 0 || start + previous.length > next.length) return false;
    return previous.every((item, index) => item.id === next[start + index]?.id);
  }

  private handleWheel = (): void => this.releaseForUser();

  private handleTouchMove = (): void => this.releaseForUser();

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!RELEASE_KEYS.has(event.key)) return;
    const target = event.target;
    if (target instanceof HTMLElement && target !== this.viewport && this.isInteractive(target)) return;
    this.releaseForUser();
  };

  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerActive = event.target === this.viewport;
  };

  private handlePointerUp = (): void => {
    this.pointerActive = false;
  };

  private handleScroll = (): void => {
    if (this.pointerActive && !this.programmaticScroll) this.releaseForUser();
    const viewport = this.viewport;
    if (
      viewport &&
      !this.programmaticScroll &&
      this.mode === "free-scrolling" &&
      this.distanceToEnd(viewport) <= SCROLL_EDGE_THRESHOLD
    ) {
      this.activeAnchorId = undefined;
      this.setTailHeight(0);
      this.newItemCount = 0;
      this.mode = "following-bottom";
      this.commitModeAttribute();
    }
    this.updateSnapshot();
  };

  private releaseForUser(): void {
    this.clearSmoothTimer();
    this.programmaticScroll = false;
    if (this.mode !== "free-scrolling") {
      this.mode = "free-scrolling";
      this.commitModeAttribute();
      this.updateSnapshot();
    }
  }

  private performScroll(top: number, behavior: ScrollBehavior): void {
    const viewport = this.viewport;
    if (!viewport) return;
    const maxTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const targetTop = Math.min(Math.max(0, top), maxTop);
    this.markProgrammaticScroll(behavior);
    if (typeof viewport.scrollTo === "function") {
      viewport.scrollTo({ top: targetTop, behavior });
    } else {
      viewport.scrollTop = targetTop;
    }
  }

  private markProgrammaticScroll(behavior: ScrollBehavior): void {
    this.programmaticScroll = true;
    this.clearSmoothTimer();
    const delay = behavior === "smooth" ? SMOOTH_SCROLL_CLEAR_MS : 0;
    this.smoothClearTimer = globalThis.setTimeout(() => {
      this.programmaticScroll = false;
      this.smoothClearTimer = undefined;
      this.updateSnapshot();
    }, delay);
  }

  private updateSnapshot(): void {
    const viewport = this.viewport;
    const next: MessageScrollerSnapshot = viewport
      ? {
          mode: this.mode,
          canScrollStart: viewport.scrollTop > SCROLL_EDGE_THRESHOLD,
          canScrollEnd: this.distanceToEnd(viewport) > SCROLL_EDGE_THRESHOLD,
          newItemCount: this.newItemCount
        }
      : {
          mode: this.mode,
          canScrollStart: false,
          canScrollEnd: false,
          newItemCount: this.newItemCount
        };

    if (
      next.mode === this.snapshot.mode &&
      next.canScrollStart === this.snapshot.canScrollStart &&
      next.canScrollEnd === this.snapshot.canScrollEnd &&
      next.newItemCount === this.snapshot.newItemCount
    ) {
      return;
    }

    this.snapshot = next;
    this.host.requestUpdate();
  }

  private distanceToEnd(viewport: HTMLElement): number {
    return Math.max(0, viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop);
  }

  private setTailHeight(height: number): void {
    const tail = this.tailSpacer;
    if (!tail) return;
    const normalized = Math.max(0, height);
    const current = Number.parseFloat(tail.style.height || "0") || 0;
    if (Math.abs(current - normalized) <= SCROLL_EPSILON) return;
    tail.style.height = `${normalized}px`;
  }

  private findRow(messageId: string): HTMLElement | undefined {
    if (!this.content) return undefined;
    return [...this.content.querySelectorAll<HTMLElement>("[data-message-id]")].find(
      (row) => row.dataset.messageId === messageId
    );
  }

  private hasLayout(): boolean {
    const viewport = this.viewport;
    return Boolean(viewport && viewport.clientHeight > 0 && viewport.getClientRects().length > 0);
  }

  private normalizeBehavior(behavior: ScrollBehavior): ScrollBehavior {
    if (behavior !== "smooth") return behavior;
    const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduced ? "auto" : "smooth";
  }

  private isInteractive(target: HTMLElement): boolean {
    return Boolean(target.closest("button, a, input, textarea, select, [contenteditable='true']"));
  }

  private reconcileObservedRows(): void {
    if (!this.resizeObserver || !this.content) return;
    const nextRows = new Set(this.content.querySelectorAll("[data-message-id]"));
    for (const row of this.observedRows) {
      if (!nextRows.has(row)) this.resizeObserver.unobserve(row);
    }
    for (const row of nextRows) {
      if (!this.observedRows.has(row)) this.resizeObserver.observe(row);
    }
    this.observedRows = nextRows;
  }

  private commitModeAttribute(): void {
    if (this.root) this.root.dataset.scrollMode = this.mode;
    if (this.viewport) this.viewport.dataset.scrollMode = this.mode;
  }

  private detachElements(): void {
    const viewport = this.viewport;
    if (viewport) {
      viewport.removeEventListener("scroll", this.handleScroll);
      viewport.removeEventListener("wheel", this.handleWheel);
      viewport.removeEventListener("touchmove", this.handleTouchMove);
      viewport.removeEventListener("keydown", this.handleKeydown);
      viewport.removeEventListener("pointerdown", this.handlePointerDown);
      viewport.removeEventListener("pointerup", this.handlePointerUp);
      viewport.removeEventListener("pointercancel", this.handlePointerUp);
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.observedRows.clear();
    this.root = undefined;
    this.viewport = undefined;
    this.content = undefined;
    this.tailSpacer = undefined;
  }

  private clearSmoothTimer(): void {
    if (this.smoothClearTimer === undefined) return;
    globalThis.clearTimeout(this.smoothClearTimer);
    this.smoothClearTimer = undefined;
  }

  private requestFrame(callback: FrameRequestCallback): number {
    if (typeof requestAnimationFrame === "function") return requestAnimationFrame(callback);
    return globalThis.setTimeout(() => callback(performance.now()), 0);
  }

  private cancelFrame(): void {
    if (this.frameId === undefined) return;
    if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(this.frameId);
    else globalThis.clearTimeout(this.frameId);
    this.frameId = undefined;
  }
}

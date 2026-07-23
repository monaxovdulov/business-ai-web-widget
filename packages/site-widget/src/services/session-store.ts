import { normalizePublicSessionId } from "../domain/public-session";
import type { SiteWidgetPanelSize, SiteWidgetStorageMode } from "../types/public";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type WidgetSessionStore = {
  getPublicSessionId(): string;
  setPublicSessionId(publicSessionId: string): void;
  clearPublicSessionId(): void;
  getOpenState(): boolean | undefined;
  setOpenState(open: boolean): void;
  getPanelSize(): SiteWidgetPanelSize | undefined;
  setPanelSize(panelSize: SiteWidgetPanelSize): void;
};

export function createSessionStore(widgetInstanceId: string, mode: SiteWidgetStorageMode = "local"): WidgetSessionStore {
  const publicSessionKey = `sw:${widgetInstanceId}:public_session_id`;
  const openStateKey = `sw:${widgetInstanceId}:open_state`;
  const panelSizeKey = `sw:${widgetInstanceId}:panel_size`;
  const storage = mode === "memory" ? undefined : getLocalStorage();
  let memoryPublicSessionId = "";
  let memoryOpenState: boolean | undefined;
  let memoryPanelSize: SiteWidgetPanelSize | undefined;

  return {
    getPublicSessionId() {
      const stored = storageGet(storage, publicSessionKey);
      const normalized = normalizePublicSessionId(stored || memoryPublicSessionId);

      if (!normalized) {
        memoryPublicSessionId = "";
        if (stored) storageRemove(storage, publicSessionKey);
        return "";
      }

      memoryPublicSessionId = normalized;
      if (stored && stored !== normalized) storageSet(storage, publicSessionKey, normalized);
      return normalized;
    },
    setPublicSessionId(publicSessionId: string) {
      const normalized = normalizePublicSessionId(publicSessionId);
      if (!normalized) return;
      memoryPublicSessionId = normalized;
      storageSet(storage, publicSessionKey, normalized);
    },
    clearPublicSessionId() {
      memoryPublicSessionId = "";
      storageRemove(storage, publicSessionKey);
    },
    getOpenState() {
      const value = storageGet(storage, openStateKey);
      if (value === "open") return true;
      if (value === "closed") return false;
      return memoryOpenState;
    },
    setOpenState(open: boolean) {
      memoryOpenState = open;
      storageSet(storage, openStateKey, open ? "open" : "closed");
    },
    getPanelSize() {
      const value = storageGet(storage, panelSizeKey);
      if (isPanelSize(value)) return value;
      return memoryPanelSize;
    },
    setPanelSize(panelSize: SiteWidgetPanelSize) {
      memoryPanelSize = panelSize;
      storageSet(storage, panelSizeKey, panelSize);
    }
  };
}

function isPanelSize(value: string | undefined): value is SiteWidgetPanelSize {
  return value === "normal" || value === "wide" || value === "fullscreen";
}

function getLocalStorage(): StorageLike | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function storageGet(storage: StorageLike | undefined, key: string): string | undefined {
  try {
    return storage?.getItem(key) || undefined;
  } catch {
    return undefined;
  }
}

function storageSet(storage: StorageLike | undefined, key: string, value: string): void {
  try {
    storage?.setItem(key, value);
  } catch {
    // Memory fallback remains authoritative for this tab.
  }
}

function storageRemove(storage: StorageLike | undefined, key: string): void {
  try {
    storage?.removeItem(key);
  } catch {
    // Ignore storage errors.
  }
}

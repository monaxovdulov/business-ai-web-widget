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

export type WidgetSessionStoreOptions = {
  conversationScopeId?: string | undefined;
  legacyConversationScopeIds?: readonly string[] | undefined;
};

export function createSessionStore(
  widgetInstanceId: string,
  mode: SiteWidgetStorageMode = "local",
  options: WidgetSessionStoreOptions = {}
): WidgetSessionStore {
  const normalizedWidgetInstanceId = normalizeScopeId(widgetInstanceId) || "default";
  const conversationScopeId = normalizeScopeId(options.conversationScopeId) || normalizedWidgetInstanceId;
  const legacyConversationScopeIds = normalizeLegacyScopeIds(
    options.legacyConversationScopeIds,
    conversationScopeId
  );
  const publicSessionKey = `sw:${conversationScopeId}:public_session_id`;
  const migrationMarkerKey = `sw:${conversationScopeId}:legacy_session_migration_v1`;
  const legacyPublicSessionKeys = legacyConversationScopeIds.map(
    (scopeId) => `sw:${scopeId}:public_session_id`
  );
  const migrationEnabled = legacyPublicSessionKeys.length > 0;
  const openStateKey = `sw:${normalizedWidgetInstanceId}:open_state`;
  const panelSizeKey = `sw:${normalizedWidgetInstanceId}:panel_size`;
  const storage = mode === "memory" ? undefined : getLocalStorage();
  let memoryPublicSessionId = "";
  let memoryMigrationComplete = false;
  let memoryOpenState: boolean | undefined;
  let memoryPanelSize: SiteWidgetPanelSize | undefined;

  return {
    getPublicSessionId() {
      const stored = storageGet(storage, publicSessionKey);
      const normalized = normalizePublicSessionId(stored || memoryPublicSessionId);

      if (normalized) {
        memoryPublicSessionId = normalized;
        if (stored && stored !== normalized) storageSet(storage, publicSessionKey, normalized);
        markMigrationComplete();
        return normalized;
      }

      memoryPublicSessionId = "";
      if (stored) storageRemove(storage, publicSessionKey);
      if (isMigrationComplete()) return "";

      for (const legacyPublicSessionKey of legacyPublicSessionKeys) {
        const legacySessionId = normalizePublicSessionId(storageGet(storage, legacyPublicSessionKey));
        if (!legacySessionId) continue;
        memoryPublicSessionId = legacySessionId;
        storageSet(storage, publicSessionKey, legacySessionId);
        markMigrationComplete();
        return legacySessionId;
      }

      return "";
    },
    setPublicSessionId(publicSessionId: string) {
      const normalized = normalizePublicSessionId(publicSessionId);
      if (!normalized) return;
      memoryPublicSessionId = normalized;
      storageSet(storage, publicSessionKey, normalized);
      markMigrationComplete();
    },
    clearPublicSessionId() {
      memoryPublicSessionId = "";
      storageRemove(storage, publicSessionKey);
      markMigrationComplete();
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

  function isMigrationComplete(): boolean {
    if (!migrationEnabled) return false;
    return memoryMigrationComplete || storageGet(storage, migrationMarkerKey) === "complete";
  }

  function markMigrationComplete(): void {
    if (!migrationEnabled) return;
    memoryMigrationComplete = true;
    storageSet(storage, migrationMarkerKey, "complete");
  }
}

function normalizeLegacyScopeIds(value: readonly string[] | undefined, canonicalScopeId: string): string[] {
  const normalized: string[] = [];
  const seen = new Set<string>([canonicalScopeId]);
  for (const candidate of value ?? []) {
    const scopeId = normalizeScopeId(candidate);
    if (!scopeId || seen.has(scopeId)) continue;
    seen.add(scopeId);
    normalized.push(scopeId);
  }
  return normalized;
}

function normalizeScopeId(value: unknown): string {
  return String(value ?? "").trim();
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

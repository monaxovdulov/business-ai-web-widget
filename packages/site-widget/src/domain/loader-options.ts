import type { MountSiteWidgetOptions } from "../types/public";
import { parseActions, parseConversationScopeIds, parseQuickReplies } from "./config";

export function readLoaderOptions(dataset: DOMStringMap): MountSiteWidgetOptions {
  const options: MountSiteWidgetOptions = {};

  const stringMap: Record<string, keyof MountSiteWidgetOptions> = {
    apiBaseUrl: "apiBaseUrl",
    messagesPath: "messagesPath",
    widgetInstanceId: "widgetInstanceId",
    conversationScopeId: "conversationScopeId",
    theme: "theme",
    position: "position",
    panelSize: "panelSize",
    initialState: "initialState",
    storage: "storage",
    quickReplySubmit: "quickReplySubmit",
    launcherLabel: "launcherLabel",
    headerTitle: "headerTitle",
    headerStatus: "headerStatus",
    headerResponseTime: "headerResponseTime",
    introMessage: "introMessage",
    placeholder: "placeholder",
    disclosureText: "disclosureText",
    footerNote: "footerNote",
    phoneCaptureLabel: "phoneCaptureLabel",
    phoneSavedLabel: "phoneSavedLabel",
    phonePlaceholder: "phonePlaceholder",
    fallbackMessage: "fallbackMessage",
    disabledMessage: "disabledMessage",
    errorMessage: "errorMessage",
    retryLabel: "retryLabel",
    sendLabel: "sendLabel",
    attachLabel: "attachLabel",
    resizeLabel: "resizeLabel",
    closeLabel: "closeLabel",
    minimizeLabel: "minimizeLabel",
    phoneHref: "phoneHref",
    privacyUrl: "privacyUrl"
  };

  for (const [datasetKey, optionKey] of Object.entries(stringMap)) {
    const value = dataset[datasetKey];
    if (value) (options as Record<string, unknown>)[optionKey] = value;
  }

  setBoolean(options, "mock", dataset.mock);
  setBoolean(options, "open", dataset.open);
  setBoolean(options, "persistOpenState", dataset.persistOpenState);
  setBoolean(options, "showQuickActions", dataset.showQuickActions);
  setBoolean(options, "showMobileActions", dataset.showMobileActions);
  setBoolean(options, "showAttachmentSlot", dataset.showAttachmentSlot);
  setBoolean(options, "attachmentsEnabled", dataset.attachmentsEnabled);
  setBoolean(options, "collectPhoneAfterFirstMessage", dataset.collectPhoneAfterFirstMessage);
  setBoolean(options, "includeMessageTextInEvents", dataset.includeMessageTextInEvents);

  setNumber(options, "timeoutMs", dataset.timeoutMs);
  setNumber(options, "maxMessageLength", dataset.maxMessageLength);

  if (dataset.quickReplies) options.quickReplies = parseQuickReplies(dataset.quickReplies);
  if (dataset.mobileActions) options.mobileActions = parseActions(dataset.mobileActions);
  if (dataset.legacyConversationScopeIds) {
    options.legacyConversationScopeIds = parseConversationScopeIds(dataset.legacyConversationScopeIds);
  }

  return options;
}

function setBoolean(options: MountSiteWidgetOptions, key: keyof MountSiteWidgetOptions, value?: string): void {
  if (value === undefined) return;
  const normalized = value.trim().toLowerCase();
  (options as Record<string, unknown>)[key] =
    normalized === "" || normalized === "1" || normalized === "true" || normalized === "yes";
}

function setNumber(options: MountSiteWidgetOptions, key: keyof MountSiteWidgetOptions, value?: string): void {
  if (value === undefined || value.trim() === "") return;
  (options as Record<string, unknown>)[key] = Number(value);
}

import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_WIDGET_CONFIG,
  normalizeWidgetConfig,
  parseQuickReplies,
  readConfigFromElement,
  satisfiesSiteWidgetTimeoutInvariant,
  SITE_WIDGET_BACKEND_PROVIDER_TIMEOUT_MS,
  SITE_WIDGET_MIN_BROWSER_TIMEOUT_MS,
  SITE_WIDGET_NETWORK_PERSISTENCE_ALLOWANCE_MS,
  SITE_WIDGET_TOTAL_SERVER_DEADLINE_MS
} from "../src/domain/config";
import { createIdempotencyKey } from "../src/domain/ids";
import { normalizePublicSessionId } from "../src/domain/public-session";
import { buildSiteWidgetMessageRequest } from "../src/domain/request";
import { mapSiteWidgetResponse } from "../src/domain/response";
import { applyWidgetAction, createWidgetState } from "../src/domain/state";
import { buildWidgetViewModel } from "../src/domain/view-model";
import { emitSiteWidgetEvent } from "../src/events/widget-events";
import { sendSiteWidgetMessage } from "../src/services/intake-client";
import { createSessionStore } from "../src/services/session-store";
import {
  disabledReceipt,
  degradedReceipt,
  fallbackReceipt,
  repliedReceipt,
  TEST_REPLY_MESSAGE_ID,
  TEST_VISITOR_MESSAGE_ID
} from "./helpers/response-fixtures";

const firstSessionId = "11111111-1111-4111-8111-111111111111";
const secondSessionId = "22222222-2222-4222-8222-222222222222";

describe("site widget domain", () => {
  it("normalizes public config and keeps quick replies in prefill mode by default", () => {
    const element = document.createElement("granit-site-widget");
    element.setAttribute("api-base-url", "https://ops.example.com/");
    element.setAttribute("widget-instance-id", "memorial-main");
    element.setAttribute("panel-size", "wide");
    element.setAttribute("quick-replies", "Нужен расчет|Есть вопрос");

    const config = readConfigFromElement(element);

    expect(config.apiBaseUrl).toBe("https://ops.example.com");
    expect(config.widgetInstanceId).toBe("memorial-main");
    expect(config.panelSize).toBe("wide");
    expect(config.quickReplySubmit).toBe("prefill");
    expect(config.quickReplies).toEqual([
      { label: "Нужен расчет", text: "Нужен расчет" },
      { label: "Есть вопрос", text: "Есть вопрос" }
    ]);
  });

  it("keeps the browser timeout strictly above the backend/provider budget and bounded allowance", () => {
    expect(DEFAULT_WIDGET_CONFIG.timeoutMs).toBe(25_000);
    expect(satisfiesSiteWidgetTimeoutInvariant(DEFAULT_WIDGET_CONFIG.timeoutMs)).toBe(true);
    expect(SITE_WIDGET_MIN_BROWSER_TIMEOUT_MS).toBe(
      SITE_WIDGET_BACKEND_PROVIDER_TIMEOUT_MS + SITE_WIDGET_NETWORK_PERSISTENCE_ALLOWANCE_MS + 1
    );
    expect(SITE_WIDGET_TOTAL_SERVER_DEADLINE_MS).toBe(20_000);
    expect(normalizeWidgetConfig({ timeoutMs: 15_000 }).timeoutMs).toBe(SITE_WIDGET_MIN_BROWSER_TIMEOUT_MS);
    expect(normalizeWidgetConfig({ timeoutMs: 20_000 }).timeoutMs).toBe(SITE_WIDGET_MIN_BROWSER_TIMEOUT_MS);
    expect(normalizeWidgetConfig({ timeoutMs: 20_500 }).timeoutMs).toBe(20_500);
  });

  it("aborts the actual fetch after the browser deadline, not inside the fixed server budget", async () => {
    vi.useFakeTimers();
    const config = {
      ...normalizeWidgetConfig({ apiBaseUrl: "https://ops.example.com" }),
      timeoutMs: 15_000
    };
    const request = buildSiteWidgetMessageRequest({
      config,
      text: "Проверка deadline",
      idempotencyKey: "idem_deadline_abort",
      environment: {
        href: "https://example.com/",
        search: "",
        title: "Landing",
        referrer: "",
        locale: "ru-RU",
        timezone: "Europe/Moscow",
        now: "2026-07-14T00:00:00.000Z"
      }
    });
    let fetchSignal: AbortSignal | undefined;
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          if (!init?.signal) throw new Error("Expected fetch AbortSignal");
          fetchSignal = init.signal;
          init.signal.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true }
          );
        })
    );

    try {
      const sendPromise = sendSiteWidgetMessage(config, request);
      const rejection = expect(sendPromise).rejects.toMatchObject({ name: "AbortError" });
      expect(fetchSignal?.aborted).toBe(false);

      await vi.advanceTimersByTimeAsync(SITE_WIDGET_TOTAL_SERVER_DEADLINE_MS);
      expect(fetchSignal?.aborted).toBe(false);

      await vi.advanceTimersByTimeAsync(1);
      await rejection;
      expect(fetchSignal?.aborted).toBe(true);
    } finally {
      fetchMock.mockRestore();
      vi.useRealTimers();
    }
  });

  it("builds the v1 public intake request with UTM and no empty fields", () => {
    const config = normalizeWidgetConfig({
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: "main"
    });

    const request = buildSiteWidgetMessageRequest({
      config,
      text: " Сколько стоит? ",
      publicSessionId: firstSessionId,
      idempotencyKey: "idem_1",
      contact: { phone: " +79990000000 ", email: "" },
      environment: {
        href: "https://example.com/?utm_source=ads&utm_campaign=summer",
        search: "?utm_source=ads&utm_campaign=summer",
        title: "Landing",
        referrer: "",
        locale: "ru-RU",
        timezone: "Europe/Moscow",
        now: "2026-07-04T00:00:00.000Z"
      }
    });

    expect(request.schema_version).toBe("site_widget.v1");
    expect(request.event_type).toBe("site_widget.message_submitted");
    expect(request.source.utm).toEqual({ source: "ads", campaign: "summer" });
    expect(request.contact).toEqual({ phone: "+79990000000" });
    expect(request.message.text).toBe("Сколько стоит?");
    expect(request.public_session_id).toBe(firstSessionId);
  });

  it("omits public_session_id before the backend establishes a session", () => {
    const request = buildSiteWidgetMessageRequest({
      config: normalizeWidgetConfig({ apiBaseUrl: "https://ops.example.com" }),
      text: "Первое сообщение",
      publicSessionId: "",
      idempotencyKey: "idem_without_session",
      environment: {
        href: "https://example.com/",
        search: "",
        title: "Landing",
        referrer: "",
        locale: "ru-RU",
        timezone: "Europe/Moscow",
        now: "2026-07-13T00:00:00.000Z"
      }
    });

    expect(request.public_session_id).toBeUndefined();
  });

  it("maps accepted and replayed receipts only after strict response truth checks", () => {
    const config = normalizeWidgetConfig();

    expect(mapSiteWidgetResponse(repliedReceipt({ replyText: "Готово" }), config)).toMatchObject({
      source: "server",
      acceptanceStatus: "accepted",
      action: "show_widget_saved",
      publicMessageId: TEST_VISITOR_MESSAGE_ID,
      status: "replied",
      replyPublicMessageId: TEST_REPLY_MESSAGE_ID,
      replyText: "Готово"
    });
    expect(
      mapSiteWidgetResponse(
        repliedReceipt({ acceptanceStatus: "replayed", replyText: "Тот же сохранённый ответ" }),
        config
      )
    ).toMatchObject({
      acceptanceStatus: "replayed",
      status: "replied",
      replyText: "Тот же сохранённый ответ"
    });
    expect(mapSiteWidgetResponse(fallbackReceipt({ messageToUser: "Менеджер проверит детали" }), config)).toMatchObject(
      {
        status: "fallback",
        systemText: "Менеджер проверит детали",
        reason: "model_error"
      }
    );
    expect(mapSiteWidgetResponse(disabledReceipt(), config)).toMatchObject({ status: "disabled" });
    expect(mapSiteWidgetResponse(degradedReceipt(), config)).toMatchObject({
      status: "fallback",
      systemText: "Сообщение сохранено, но AI не смог ответить на этот ход.",
      reason: "grounding_validation_failed"
    });
  });

  it("rejects responses that cannot prove root truth or persisted identities", () => {
    const config = normalizeWidgetConfig();
    const wrongStatus = { ...disabledReceipt(), status: "queued" };
    const wrongAction = { ...disabledReceipt(), action: "show_reply" };
    const missingVisitorIdentity = { ...disabledReceipt(), public_message_id: "not-a-uuid" };
    const duplicateReplyIdentity = repliedReceipt({ replyPublicMessageId: TEST_VISITOR_MESSAGE_ID });
    const extraRootField = { ...disabledReceipt(), unexpected: true };
    const extraReplyField = repliedReceipt();
    const extraReply = (extraReplyField.automation as Record<string, unknown>).reply as Record<string, unknown>;
    extraReply.unexpected = true;
    const oversizedReply = repliedReceipt({ replyText: "x".repeat(1_001) });
    const oversizedDisclosure = repliedReceipt({ disclosureText: "x".repeat(1_001) });
    const whitespacePaddedAutomationStatus = repliedReceipt();
    (whitespacePaddedAutomationStatus.automation as Record<string, unknown>).status = " replied ";
    const whitespacePaddedFallbackReason = fallbackReceipt();
    (whitespacePaddedFallbackReason.automation as Record<string, unknown>).reason = " model_error ";

    expect(() => mapSiteWidgetResponse(wrongStatus, config)).toThrow("Invalid site_widget.v1 response: status");
    expect(() => mapSiteWidgetResponse(wrongAction, config)).toThrow("Invalid site_widget.v1 response: action");
    expect(() => mapSiteWidgetResponse(missingVisitorIdentity, config)).toThrow(
      "Invalid site_widget.v1 response: public_message_id"
    );
    expect(() => mapSiteWidgetResponse(duplicateReplyIdentity, config)).toThrow(
      "Invalid site_widget.v1 response: automation.reply.public_message_id_identity"
    );
    expect(() => mapSiteWidgetResponse(extraRootField, config)).toThrow(
      "Invalid site_widget.v1 response: root.unexpected"
    );
    expect(() => mapSiteWidgetResponse(extraReplyField, config)).toThrow(
      "Invalid site_widget.v1 response: automation.reply.unexpected"
    );
    expect(() => mapSiteWidgetResponse(oversizedReply, config)).toThrow(
      "Invalid site_widget.v1 response: automation.reply.text"
    );
    expect(() => mapSiteWidgetResponse(oversizedDisclosure, config)).toThrow(
      "Invalid site_widget.v1 response: automation.disclosure.text"
    );
    expect(() => mapSiteWidgetResponse(whitespacePaddedAutomationStatus, config)).toThrow(
      "Invalid site_widget.v1 response: automation.status"
    );
    expect(() => mapSiteWidgetResponse(whitespacePaddedFallbackReason, config)).toThrow(
      "Invalid site_widget.v1 response: automation.reason"
    );
  });

  it("accepts only UUID public sessions from backend responses", () => {
    const config = normalizeWidgetConfig();

    expect(
      mapSiteWidgetResponse(disabledReceipt({ publicSessionId: firstSessionId }), config).publicSessionId
    ).toBe(firstSessionId);
    expect(normalizePublicSessionId(` ${firstSessionId.toUpperCase()} `)).toBe(firstSessionId);
    expect(normalizePublicSessionId("sws_legacy")).toBeUndefined();
  });

  it.each([undefined, "sws_legacy", "not-a-uuid"])(
    "fails a real response without a valid backend session: %s",
    async (publicSessionId) => {
      const config = normalizeWidgetConfig({ apiBaseUrl: "https://ops.example.com" });
      const request = buildSiteWidgetMessageRequest({
        config,
        text: "Проверка protocol failure",
        idempotencyKey: "idem_protocol_failure",
        environment: {
          href: "https://example.com/",
          search: "",
          title: "Landing",
          referrer: "",
          locale: "ru-RU",
          timezone: "Europe/Moscow",
          now: "2026-07-13T00:00:00.000Z"
        }
      });
      const responseBody = disabledReceipt();
      responseBody.public_session_id = publicSessionId;
      const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
          JSON.stringify(responseBody),
          { status: 202, headers: { "content-type": "application/json" } }
        )
      );

      try {
        await expect(sendSiteWidgetMessage(config, request)).rejects.toThrow(
          "Invalid site_widget.v1 response: public_session_id"
        );
      } finally {
        fetchMock.mockRestore();
      }
    }
  );

  it("rejects a valid response UUID that would replace an established public session", async () => {
    const config = normalizeWidgetConfig({ apiBaseUrl: "https://ops.example.com" });
    const request = buildSiteWidgetMessageRequest({
      config,
      text: "Продолжение существующей сессии",
      publicSessionId: firstSessionId,
      idempotencyKey: "idem_session_mismatch",
      environment: {
        href: "https://example.com/",
        search: "",
        title: "Landing",
        referrer: "",
        locale: "ru-RU",
        timezone: "Europe/Moscow",
        now: "2026-07-14T00:00:00.000Z"
      }
    });
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(disabledReceipt({ publicSessionId: secondSessionId })), {
        status: 202,
        headers: { "content-type": "application/json" }
      })
    );

    try {
      await expect(sendSiteWidgetMessage(config, request)).rejects.toThrow(
        "Invalid site_widget.v1 response: public_session_id_mismatch"
      );
    } finally {
      fetchMock.mockRestore();
    }
  });

  it("keeps the same idempotency key while retrying a failed pending message", () => {
    const config = normalizeWidgetConfig();
    const idem = createIdempotencyKey("sws_test");
    let state = createWidgetState({ config, open: true });

    state = applyWidgetAction(state, { type: "draft.changed", value: "Нужен расчет" }, config);
    state = applyWidgetAction(state, { type: "submit.started", text: "Нужен расчет", idempotencyKey: idem }, config);
    state = applyWidgetAction(state, { type: "submit.failed", text: config.errorMessage }, config);

    const failedMessageId = state.pending?.messageId;
    expect(state.pending).toMatchObject({
      messageId: failedMessageId,
      text: "Нужен расчет",
      idempotencyKey: idem
    });
    expect(state.messages.filter((message) => message.status === "error")).toHaveLength(1);
    expect(state.messages.find((message) => message.id === failedMessageId)?.role).toBe("visitor");

    state = applyWidgetAction(state, { type: "retry.started" }, config);

    expect(state.pending?.idempotencyKey).toBe(idem);
    expect(state.pending?.messageId).toBe(failedMessageId);
    expect(state.messages.find((message) => message.id === failedMessageId)?.status).toBe("pending");
  });

  it("keeps one failed visitor message and blocks a parallel submit until retry or clear", () => {
    const config = normalizeWidgetConfig();
    let state = createWidgetState({ config, open: true });
    const initialLength = state.messages.length;

    state = applyWidgetAction(
      state,
      { type: "submit.started", text: "Первое сообщение", idempotencyKey: "idem_first" },
      config
    );
    const failedMessageId = state.pending?.messageId;
    state = applyWidgetAction(state, { type: "submit.failed", text: config.errorMessage }, config);
    state = applyWidgetAction(state, { type: "submit.failed", text: config.errorMessage }, config);

    expect(state.messages).toHaveLength(initialLength + 1);
    expect(state.messages.filter((message) => message.status === "error")).toHaveLength(1);
    expect(buildWidgetViewModel(state, config).canSend).toBe(false);

    const blocked = applyWidgetAction(
      state,
      { type: "submit.started", text: "Второе сообщение", idempotencyKey: "idem_second" },
      config
    );
    expect(blocked.pending?.messageId).toBe(failedMessageId);
    expect(blocked.messages).toHaveLength(initialLength + 1);
  });

  it("ignores stale failures when there is no matching pending message", () => {
    const config = normalizeWidgetConfig();
    const initial = createWidgetState({ config, open: true });

    const withoutPending = applyWidgetAction(
      initial,
      { type: "submit.failed", text: config.errorMessage, messageId: "msg_stale" },
      config
    );
    expect(withoutPending).toEqual(initial);

    let active = applyWidgetAction(
      initial,
      { type: "submit.started", text: "Актуальное", idempotencyKey: "idem_active" },
      config
    );
    active = applyWidgetAction(
      active,
      { type: "submit.failed", text: config.errorMessage, messageId: "msg_stale" },
      config
    );
    expect(active.submitting).toBe(true);
    expect(active.messages.find((message) => message.id === active.pending?.messageId)?.status).toBe("pending");
  });

  it("marks only the current pending visitor as explicitly saved", () => {
    const config = normalizeWidgetConfig();
    let state = createWidgetState({ config, open: true });

    state = applyWidgetAction(
      state,
      { type: "submit.started", text: "Одинаковый текст", idempotencyKey: "idem_current" },
      config
    );
    const currentId = state.pending?.messageId;
    state = {
      ...state,
      messages: [
        ...state.messages,
        {
          id: "msg_older_duplicate",
          role: "visitor",
          text: "Одинаковый текст",
          createdAt: "2026-07-10T00:00:00.000Z",
          status: "error"
        }
      ]
    };

    state = applyWidgetAction(
      state,
      {
        type: "visitor.saved",
        messageId: currentId ?? "",
        publicMessageId: TEST_VISITOR_MESSAGE_ID,
        acceptanceStatus: "replayed"
      },
      config
    );

    expect(state.messages.find((message) => message.id === currentId)).toMatchObject({
      status: "saved",
      publicMessageId: TEST_VISITOR_MESSAGE_ID,
      acceptanceStatus: "replayed"
    });
    expect(state.messages.find((message) => message.id === "msg_older_duplicate")?.status).toBe("error");
  });

  it("stores fallback and disabled marker kinds on their own messages", () => {
    const config = normalizeWidgetConfig();
    let fallback = createWidgetState({ config, open: true });
    fallback = applyWidgetAction(
      fallback,
      { type: "system.message", text: config.fallbackMessage, status: "fallback" },
      config
    );

    let disabled = createWidgetState({ config, open: true });
    disabled = applyWidgetAction(
      disabled,
      { type: "system.message", text: config.disabledMessage, status: "disabled" },
      config
    );

    expect(fallback.messages[fallback.messages.length - 1]?.systemKind).toBe("fallback");
    expect(disabled.messages[disabled.messages.length - 1]?.systemKind).toBe("disabled");
  });

  it("keeps site_widget.v1 request strictly text-only", () => {
    const config = normalizeWidgetConfig({ mock: true, attachmentsEnabled: true, showAttachmentSlot: true });
    const request = buildSiteWidgetMessageRequest({
      config,
      text: "Фото остаётся только в UI",
      idempotencyKey: "idem_text_only",
      environment: {
        href: "https://example.com/",
        search: "",
        title: "Landing",
        referrer: "",
        locale: "ru-RU",
        timezone: "Europe/Moscow",
        now: "2026-07-10T00:00:00.000Z"
      }
    });
    const serialized = JSON.stringify(request);

    expect(request.message).toEqual({ role: "visitor", text: "Фото остаётся только в UI" });
    expect(serialized).not.toMatch(/attachments|filename|base64|blob:|image\//i);
  });

  it("dispatches primary and compatibility events with redacted payloads", () => {
    const config = normalizeWidgetConfig({ widgetInstanceId: "main" });
    const element = document.createElement("div");
    const seen: Array<{ name: string; detail: Record<string, unknown> }> = [];

    for (const name of ["granit-site-widget:message-submitted", "granit-widget:message-submitted"]) {
      element.addEventListener(name, (event) => {
        seen.push({ name, detail: (event as CustomEvent).detail });
      });
    }

    emitSiteWidgetEvent(element, "message-submitted", config, {
      publicSessionId: firstSessionId,
      messageText: "Полный текст"
    });

    expect(seen).toHaveLength(2);
    expect(seen[0]?.detail.messageText).toBeUndefined();
    expect(seen[0]?.detail.messageLength).toBe("Полный текст".length);
    expect(seen[0]?.detail.publicSessionId).toBeUndefined();
    expect(seen[0]?.detail.publicSessionIdHash).toMatch(/^h/);
  });

  it("does not invent a public session hash before the backend session exists", () => {
    const config = normalizeWidgetConfig({ widgetInstanceId: "main" });
    const element = document.createElement("div");
    let detail: Record<string, unknown> = {};
    element.addEventListener("granit-site-widget:message-submitted", (event) => {
      detail = (event as CustomEvent).detail;
    });

    emitSiteWidgetEvent(element, "message-submitted", config, {
      publicSessionId: "",
      messageText: "Первое сообщение"
    });

    expect(detail.publicSessionId).toBeUndefined();
    expect(detail.publicSessionIdHash).toBeUndefined();
    expect(detail.messageLength).toBe("Первое сообщение".length);
  });

  it("keeps generated idempotency keys opaque from the public session id", () => {
    const key = createIdempotencyKey("sws_private_session");

    expect(key).toMatch(/^site-widget:/);
    expect(key).not.toContain("sws_private_session");
  });

  it("keeps public session storage empty until a backend UUID is received", () => {
    const store = createSessionStore("empty-session");

    expect(store.getPublicSessionId()).toBe("");
    expect(localStorage.getItem("sw:empty-session:public_session_id")).toBeNull();
  });

  it("removes legacy sessions and stores only backend UUIDs per widget instance", () => {
    const first = createSessionStore("first");
    const second = createSessionStore("second");

    localStorage.setItem("sw:first:public_session_id", "sws_legacy");
    expect(first.getPublicSessionId()).toBe("");
    expect(localStorage.getItem("sw:first:public_session_id")).toBeNull();

    first.setPublicSessionId(firstSessionId);
    second.setPublicSessionId(secondSessionId);
    first.setPublicSessionId("sws_rejected");

    expect(first.getPublicSessionId()).toBe(firstSessionId);
    expect(second.getPublicSessionId()).toBe(secondSessionId);
    expect(localStorage.getItem("sw:first:public_session_id")).toBe(firstSessionId);
    expect(localStorage.getItem("sw:second:public_session_id")).toBe(secondSessionId);
  });

  it("stores the visitor-selected panel size per widget instance", () => {
    const store = createSessionStore("panel-size");

    expect(store.getPanelSize()).toBeUndefined();

    store.setPanelSize("fullscreen");

    expect(store.getPanelSize()).toBe("fullscreen");
    expect(localStorage.getItem("sw:panel-size:panel_size")).toBe("fullscreen");
  });

  it("parses quick replies from JSON or pipe lists", () => {
    expect(parseQuickReplies('[{"label":"A","text":"B"}]')).toEqual([{ label: "A", text: "B" }]);
    expect(parseQuickReplies("A|B")).toEqual([
      { label: "A", text: "A" },
      { label: "B", text: "B" }
    ]);
  });
});

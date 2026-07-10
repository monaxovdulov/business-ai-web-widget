import { describe, expect, it } from "vitest";
import { normalizeWidgetConfig, parseQuickReplies, readConfigFromElement } from "../src/domain/config";
import { createIdempotencyKey } from "../src/domain/ids";
import { buildSiteWidgetMessageRequest } from "../src/domain/request";
import { mapSiteWidgetResponse } from "../src/domain/response";
import { applyWidgetAction, createWidgetState } from "../src/domain/state";
import { buildWidgetViewModel } from "../src/domain/view-model";
import { emitSiteWidgetEvent } from "../src/events/widget-events";
import { createSessionStore } from "../src/services/session-store";

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

  it("builds the v1 public intake request with UTM and no empty fields", () => {
    const config = normalizeWidgetConfig({
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: "main"
    });

    const request = buildSiteWidgetMessageRequest({
      config,
      text: " Сколько стоит? ",
      publicSessionId: "sws_1",
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
  });

  it("maps backend responses through the display gate", () => {
    const config = normalizeWidgetConfig();

    expect(
      mapSiteWidgetResponse({ automation: { status: "replied", reply: { text: "Готово" } } }, config)
    ).toMatchObject({ status: "replied", replyText: "Готово" });

    expect(mapSiteWidgetResponse({ automation: { status: "replied", reply: {} } }, config)).toMatchObject({
      status: "fallback",
      systemText: config.fallbackMessage
    });

    expect(
      mapSiteWidgetResponse({ automation: { status: "fallback", reply: { text: "AI draft" } } }, config)
    ).toMatchObject({ status: "fallback", systemText: config.fallbackMessage });
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

  it("marks only the current pending visitor as persisted", () => {
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

    state = applyWidgetAction(state, { type: "visitor.persisted", text: "Одинаковый текст" }, config);

    expect(state.messages.find((message) => message.id === currentId)?.status).toBe("sent");
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
      publicSessionId: "sws_private",
      messageText: "Полный текст"
    });

    expect(seen).toHaveLength(2);
    expect(seen[0]?.detail.messageText).toBeUndefined();
    expect(seen[0]?.detail.messageLength).toBe("Полный текст".length);
    expect(seen[0]?.detail.publicSessionId).toBeUndefined();
    expect(seen[0]?.detail.publicSessionIdHash).toMatch(/^h/);
  });

  it("keeps generated idempotency keys opaque from the public session id", () => {
    const key = createIdempotencyKey("sws_private_session");

    expect(key).toMatch(/^site-widget:/);
    expect(key).not.toContain("sws_private_session");
  });

  it("uses v1 storage keys and supports separate widget instances", () => {
    const first = createSessionStore("first");
    const second = createSessionStore("second");

    first.setPublicSessionId("sws_first");
    second.setPublicSessionId("sws_second");

    expect(localStorage.getItem("sw:first:public_session_id")).toBe("sws_first");
    expect(localStorage.getItem("sw:second:public_session_id")).toBe("sws_second");
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

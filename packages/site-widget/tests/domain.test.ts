import { describe, expect, it } from "vitest";
import { normalizeWidgetConfig, parseQuickReplies, readConfigFromElement } from "../src/domain/config";
import { createIdempotencyKey } from "../src/domain/ids";
import { buildSiteWidgetMessageRequest } from "../src/domain/request";
import { mapSiteWidgetResponse } from "../src/domain/response";
import { applyWidgetAction, createWidgetState } from "../src/domain/state";
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

    expect(state.pending?.idempotencyKey).toBe(idem);
    expect(state.messages.some((message) => message.status === "error")).toBe(true);

    state = applyWidgetAction(state, { type: "retry.started" }, config);

    expect(state.pending?.idempotencyKey).toBe(idem);
    expect(state.messages.some((message) => message.role === "system" && message.status === "error")).toBe(false);
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

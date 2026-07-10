import { describe, expect, it, vi } from "vitest";
import { defineSiteWidget, mountSiteWidget } from "../src";
import type { GranitSiteWidgetElement } from "../src/components/granit-site-widget";

describe("granit-site-widget Lit component", () => {
  it("defines only the public custom element", () => {
    defineSiteWidget();

    expect(customElements.get("granit-site-widget")).toBeTruthy();
    expect(customElements.get("granit-widget-message")).toBeUndefined();
    expect(customElements.get("widget-message")).toBeUndefined();
  });

  it("renders open state and pre-fills quick replies by default", async () => {
    const submitted = vi.fn();
    document.addEventListener("granit-site-widget:message-submitted", submitted);

    const widget = mountSiteWidget({
      mock: true,
      open: true,
      widgetInstanceId: "component-test"
    });
    await widget.updateComplete;

    const quickReply = widget.shadowRoot?.querySelector<HTMLButtonElement>(".quick-reply");
    quickReply?.click();
    await widget.updateComplete;

    const textarea = widget.shadowRoot?.querySelector<HTMLTextAreaElement>(".textarea");
    expect(textarea?.value).toContain("Нужен расчет");
    expect(submitted).not.toHaveBeenCalled();
  });

  it("moves focus into the panel on open and returns it to the launcher on close", async () => {
    const widget = mountSiteWidget({ mock: true }) as GranitSiteWidgetElement;
    await widget.updateComplete;

    widget.open();
    await widget.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(widget.shadowRoot?.activeElement?.classList.contains("textarea")).toBe(true);

    widget.close();
    await widget.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(widget.shadowRoot?.activeElement?.classList.contains("launcher")).toBe(true);
  });

  it("cycles visitor-controlled panel sizes and persists the choice", async () => {
    const widget = mountSiteWidget({
      mock: true,
      open: true,
      widgetInstanceId: "panel-size-test"
    });
    await widget.updateComplete;

    const resizeButton = widget.shadowRoot?.querySelector<HTMLButtonElement>('[part="resize-button"]');
    const panel = widget.shadowRoot?.querySelector<HTMLElement>(".panel");

    expect(panel?.dataset.size).toBe("normal");

    resizeButton?.click();
    await widget.updateComplete;
    expect(panel?.dataset.size).toBe("wide");
    expect(localStorage.getItem("sw:panel-size-test:panel_size")).toBe("wide");

    resizeButton?.click();
    await widget.updateComplete;
    expect(panel?.dataset.size).toBe("fullscreen");

    resizeButton?.click();
    await widget.updateComplete;
    expect(panel?.dataset.size).toBe("normal");
  });

  it("renders backend HTML-looking text as plain text", async () => {
    const widget = mountSiteWidget({
      mock: false,
      open: true,
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: "html-safety"
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          automation: {
            status: "replied",
            reply: { text: "<img src=x onerror=alert(1)>safe" }
          }
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );

    await widget.updateComplete;
    widget.sendMessage("test");
    await new Promise((resolve) => setTimeout(resolve, 0));
    await widget.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await widget.updateComplete;

    const messages = widget.shadowRoot?.querySelector(".messages");
    expect(messages?.innerHTML).toContain("&lt;img");
    expect(messages?.querySelector("img")).toBeNull();
  });

  it("renders assistant and visitor messages through additive message primitives", async () => {
    const widget = mountSiteWidget({ mock: true, open: true, widgetInstanceId: "message-primitives" });
    await widget.updateComplete;

    widget.sendMessage("Нужен расчет");
    await vi.waitFor(() => {
      expect(widget.shadowRoot?.querySelectorAll('[part~="message-root"]')).toHaveLength(3);
    });
    await widget.updateComplete;

    const assistantBubble = widget.shadowRoot?.querySelector('[part~="message-assistant"]');
    const visitorBubble = widget.shadowRoot?.querySelector('[part~="message-visitor"]');
    const disclosure = widget.shadowRoot?.querySelector('[part~="message-disclosure"]');

    expect(assistantBubble?.getAttribute("part")?.split(" ")).toEqual(
      expect.arrayContaining(["message", "message-assistant", "message-bubble"])
    );
    expect(visitorBubble?.getAttribute("part")?.split(" ")).toEqual(
      expect.arrayContaining(["message", "message-visitor", "message-bubble"])
    );
    expect(visitorBubble?.closest('[part~="message-root"]')).toBeTruthy();
    expect(disclosure?.closest('[part~="message-meta"]')).toBeTruthy();
  });

  it.each(["fallback", "disabled"] as const)("renders %s responses as semantic markers", async (status) => {
    const widget = mountSiteWidget({
      mock: false,
      open: true,
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: `marker-${status}`
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ automation: { status } }), {
        status: 200,
        headers: { "content-type": "application/json" }
      })
    );

    await widget.updateComplete;
    widget.sendMessage("Передайте менеджеру");
    await vi.waitFor(() => {
      expect(widget.shadowRoot?.querySelector('[part~="marker"]')).toBeTruthy();
    });

    const marker = widget.shadowRoot?.querySelector<HTMLElement>('[part~="marker"]');
    expect(marker?.getAttribute("part")?.split(" ")).toEqual(
      expect.arrayContaining(["message", "message-system", "marker"])
    );
    expect(marker?.dataset.systemKind).toBe(status);
    expect(marker?.getAttribute("role")).toBe("status");
    expect(marker?.querySelector('[part~="marker-icon"]')).toBeTruthy();
    expect(marker?.querySelector('[part~="marker-text"]')).toBeTruthy();
  });

  it("keeps one inline error and retries the same visitor bubble with the same idempotency key", async () => {
    const requests: Array<Record<string, unknown>> = [];
    const fetchMock = vi.spyOn(globalThis, "fetch");
    fetchMock.mockImplementation(async (_input, init) => {
      requests.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      if (requests.length === 1) throw new Error("offline");
      return new Response(
        JSON.stringify({ automation: { status: "replied", reply: { text: "Принято", persisted: true } } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    });
    const widget = mountSiteWidget({
      mock: false,
      open: true,
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: "inline-retry"
    });

    await widget.updateComplete;
    widget.sendMessage("Проверьте заказ");
    await vi.waitFor(() => {
      expect(widget.shadowRoot?.querySelectorAll('[part~="retry-button"]')).toHaveLength(1);
    });

    expect(widget.shadowRoot?.querySelectorAll('.message-root--visitor')).toHaveLength(1);
    expect(widget.shadowRoot?.querySelectorAll('[part~="marker"]')).toHaveLength(0);
    expect(widget.shadowRoot?.textContent).toContain("Не отправлено");

    widget.shadowRoot?.querySelector<HTMLButtonElement>('[part~="retry-button"]')?.click();
    await vi.waitFor(() => {
      expect(requests).toHaveLength(2);
      expect(widget.shadowRoot?.textContent).toContain("Принято");
    });

    expect(widget.shadowRoot?.querySelectorAll('.message-root--visitor')).toHaveLength(1);
    expect(requests[0]?.idempotency_key).toBe(requests[1]?.idempotency_key);
  });

  it("announces the configured transport error in an atomic live region", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const widget = mountSiteWidget({
      mock: false,
      open: true,
      apiBaseUrl: "https://ops.example.com",
      errorMessage: "Связь потеряна. Повторите отправку.",
      widgetInstanceId: "live-error"
    });

    await widget.updateComplete;
    widget.sendMessage("Проверка связи");
    await vi.waitFor(() => {
      const live = widget.shadowRoot?.querySelector('[aria-live="polite"][aria-atomic="true"]');
      expect(live?.textContent).toContain("Связь потеряна. Повторите отправку.");
    });
  });

  it("does not apply an aborted mock response after clearSession", async () => {
    const widget = mountSiteWidget({ mock: true, open: true, widgetInstanceId: "clear-race" });
    await widget.updateComplete;

    widget.sendMessage("Старое сообщение");
    widget.clearSession();
    await new Promise((resolve) => setTimeout(resolve, 400));
    await widget.updateComplete;

    expect(widget.shadowRoot?.querySelectorAll('.message-root--visitor')).toHaveLength(0);
    expect(widget.shadowRoot?.textContent).not.toContain("Старое сообщение");
  });
});

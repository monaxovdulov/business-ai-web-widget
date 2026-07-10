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

  it("wires dialog, transcript, contact and live-region ARIA references", async () => {
    const widget = mountSiteWidget({ mock: true, open: true, widgetInstanceId: "aria-contract" });
    await widget.updateComplete;

    const launcher = widget.shadowRoot?.querySelector<HTMLElement>('.launcher');
    const panel = widget.shadowRoot?.querySelector<HTMLElement>('.panel');
    const title = widget.shadowRoot?.querySelector<HTMLElement>('.title');
    const viewport = widget.shadowRoot?.querySelector<HTMLElement>('.message-viewport');
    const log = widget.shadowRoot?.querySelector<HTMLElement>('.messages');
    const contactTrigger = widget.shadowRoot?.querySelector<HTMLElement>('[part~="phone-trigger"]');
    const phoneCapture = widget.shadowRoot?.querySelector<HTMLElement>('[part~="phone-capture"]');
    const live = widget.shadowRoot?.querySelector<HTMLElement>('[aria-live="polite"][aria-atomic="true"]');

    expect(launcher?.getAttribute("aria-controls")).toBe(panel?.id);
    expect(panel?.getAttribute("aria-labelledby")).toBe(title?.id);
    expect(viewport).toMatchObject({ tabIndex: 0 });
    expect(viewport?.getAttribute("role")).toBe("region");
    expect(viewport?.getAttribute("aria-label")).toBe("Сообщения");
    expect(log?.getAttribute("role")).toBe("log");
    expect(log?.getAttribute("aria-relevant")).toBe("additions");
    expect(log?.getAttribute("aria-busy")).toBe("false");
    expect(live?.getAttribute("role")).toBe("status");
    expect(contactTrigger?.getAttribute("aria-controls")).toBe(phoneCapture?.id);
    expect(contactTrigger?.getAttribute("aria-expanded")).toBe("false");
    expect(widget.shadowRoot?.querySelector('[part~="minimize-button"]')).toBeTruthy();

    contactTrigger?.click();
    await widget.updateComplete;
    expect(contactTrigger?.getAttribute("aria-expanded")).toBe("true");
    expect(phoneCapture?.hidden).toBe(false);
  });

  it("reflects pending work through aria-busy and an atomic status", async () => {
    let resolveRequest: (value: { status: "replied"; replyText: string; raw: unknown }) => void = () => undefined;
    const requestMock = vi.fn(
      () =>
        new Promise<{ status: "replied"; replyText: string; raw: unknown }>((resolve) => {
          resolveRequest = resolve;
        })
    );
    const widget = mountSiteWidget({ mock: true, open: true, widgetInstanceId: "aria-busy" });
    (widget as unknown as { sendMessageRequest: typeof requestMock }).sendMessageRequest = requestMock;
    await widget.updateComplete;

    widget.sendMessage("Проверка статуса");
    await vi.waitFor(() => {
      expect(widget.shadowRoot?.querySelector('.messages')?.getAttribute("aria-busy")).toBe("true");
      expect(widget.shadowRoot?.querySelector('[aria-atomic="true"]')?.textContent).toContain("Отправляем сообщение");
    });

    resolveRequest({ status: "replied", replyText: "Готово", raw: {} });
    await vi.waitFor(() => {
      expect(widget.shadowRoot?.querySelector('.messages')?.getAttribute("aria-busy")).toBe("false");
    });
  });

  it("handles Escape once and restores focus to the launcher", async () => {
    const widget = mountSiteWidget({ mock: true, open: true, widgetInstanceId: "escape-once" });
    const closed = vi.fn();
    widget.addEventListener("granit-site-widget:closed", closed);
    await widget.updateComplete;

    widget.shadowRoot
      ?.querySelector<HTMLTextAreaElement>('.textarea')
      ?.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Escape" }));
    await widget.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(closed).toHaveBeenCalledTimes(1);
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

  it("keeps production site_widget.v1 completely free of photo controls", async () => {
    const widget = mountSiteWidget({
      mock: false,
      open: true,
      attachmentsEnabled: true,
      showAttachmentSlot: true,
      apiBaseUrl: "https://ops.example.com",
      widgetInstanceId: "production-text-only"
    });
    await widget.updateComplete;

    expect(widget.shadowRoot?.querySelector(".attach-button")).toBeNull();
    expect(widget.shadowRoot?.querySelector('input[type="file"]')).toBeNull();
    expect(widget.shadowRoot?.textContent).not.toContain("Вложения будут доступны позже");
  });

  it.each([
    { attachmentsEnabled: false, showAttachmentSlot: true, label: "attachments disabled" },
    { attachmentsEnabled: true, showAttachmentSlot: false, label: "slot hidden" }
  ])("hides the mock photo picker when $label", async ({ attachmentsEnabled, showAttachmentSlot }) => {
    const widget = mountSiteWidget({
      mock: true,
      open: true,
      attachmentsEnabled,
      showAttachmentSlot,
      widgetInstanceId: `mock-gate-${String(attachmentsEnabled)}-${String(showAttachmentSlot)}`
    });
    await widget.updateComplete;

    expect(widget.shadowRoot?.querySelector('.attach-button')).toBeNull();
    expect(widget.shadowRoot?.querySelector('.attachment-input')).toBeNull();
  });

  it("accepts a valid mock photo preview but still requires message text", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "mock-photo-preview"
      });
      await widget.updateComplete;

      const input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      expect(input?.accept).toBe("image/jpeg,image/png,image/webp");
      expect(input?.multiple).toBe(true);
      const file = validPngFile("browser-private-name.png");
      selectFiles(input, [file]);

      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelectorAll('[part~="attachment"]')).toHaveLength(1);
      });

      expect(input?.value).toBe("");
      expect(widget.shadowRoot?.textContent).toContain("Фото 1");
      expect(widget.shadowRoot?.textContent).not.toContain("browser-private-name.png");
      expect(widget.shadowRoot?.querySelector<HTMLButtonElement>('.send-button')?.disabled).toBe(true);
      widget.shadowRoot
        ?.querySelector<HTMLTextAreaElement>('.textarea')
        ?.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(widget.shadowRoot?.querySelector('.message-root--visitor')).toBeNull();
    } finally {
      imageEnvironment.restore();
    }
  });

  it("partially accepts an image batch and announces one validation error", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "partial-photo-batch"
      });
      await widget.updateComplete;

      const input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      const invalid = new File(["<svg></svg>"], "spoofed.png", { type: "image/png" });
      selectFiles(input, [invalid, validPngFile("accepted.png")]);

      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelectorAll('[part~="attachment"]')).toHaveLength(1);
        expect(widget.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain(
          "поддерживаются только JPEG, PNG и WebP"
        );
      });
    } finally {
      imageEnvironment.restore();
    }
  });

  it("exposes photo parts, labels, count updates and deterministic remove focus", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-a11y"
      });
      await widget.updateComplete;

      const picker = widget.shadowRoot?.querySelector<HTMLButtonElement>('[part~="attach-button"]');
      expect(picker?.getAttribute("aria-label")).toBe("Добавить фото");
      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [
        validPngFile("first.png"),
        validPngFile("second.png")
      ]);
      await vi.waitFor(() => expect(widget.shadowRoot?.querySelectorAll('[part~="attachment-remove"]')).toHaveLength(2));

      const list = widget.shadowRoot?.querySelector('[part~="attachment-list"]');
      const removeButtons = [
        ...(widget.shadowRoot?.querySelectorAll<HTMLButtonElement>('[part~="attachment-remove"]') ?? [])
      ];
      const secondId = removeButtons[1]?.dataset.attachmentId;
      expect(list?.getAttribute("aria-label")).toBe("Выбранные фото");
      expect(widget.shadowRoot?.querySelectorAll('[part~="attachment"]')).toHaveLength(2);
      expect(widget.shadowRoot?.querySelectorAll('[part~="attachment-preview"]')).toHaveLength(2);
      expect(removeButtons.map((button) => button.getAttribute("aria-label"))).toEqual([
        "Удалить фото 1",
        "Удалить фото 2"
      ]);
      expect(widget.shadowRoot?.textContent).toContain("Выбрано фото: 2");

      removeButtons[0]?.click();
      await widget.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect((widget.shadowRoot?.activeElement as HTMLElement | null)?.dataset.attachmentId).toBe(secondId);
      expect(widget.shadowRoot?.textContent).toContain("Выбрано фото: 1");

      widget.shadowRoot?.querySelector<HTMLButtonElement>('[part~="attachment-remove"]')?.click();
      await widget.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(widget.shadowRoot?.activeElement?.classList.contains("attach-button")).toBe(true);
      expect(widget.shadowRoot?.textContent).toContain("Выбрано фото: 0");
    } finally {
      imageEnvironment.restore();
    }
  });

  it("recreates an identical validation alert so it can be announced again", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-alert-revision"
      });
      await widget.updateComplete;
      const invalid = new File(["GIF89a"], "invalid.gif", { type: "image/gif" });

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [invalid]);
      let firstAlert: Element | null | undefined;
      let firstRevision = "";
      await vi.waitFor(() => {
        firstAlert = widget.shadowRoot?.querySelector('[role="alert"]');
        firstRevision = firstAlert?.getAttribute("data-validation-revision") ?? "";
        expect(firstRevision).not.toBe("");
      });

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [invalid]);
      await vi.waitFor(() => {
        const nextAlert = widget.shadowRoot?.querySelector('[role="alert"]');
        expect(nextAlert?.getAttribute("data-validation-revision")).not.toBe(firstRevision);
        expect(nextAlert).not.toBe(firstAlert);
      });
    } finally {
      imageEnvironment.restore();
    }
  });

  it("rejects spoofed MIME, decoder failure and oversized pixels before creating a permanent URL", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-validation-pipeline"
      });
      await widget.updateComplete;

      const spoofed = new File(
        [Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])],
        "spoofed.jpg",
        { type: "image/jpeg" }
      );
      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [spoofed]);
      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain(
          "тип файла не совпадает с его содержимым"
        );
      });
      expect(imageEnvironment.createImageBitmap).not.toHaveBeenCalled();
      expect(imageEnvironment.createObjectURL).not.toHaveBeenCalled();

      imageEnvironment.createImageBitmap.mockRejectedValueOnce(new Error("decode failed"));
      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [validPngFile("decode.png")]);
      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain(
          "изображений не удалось прочитать"
        );
      });
      expect(imageEnvironment.createObjectURL).not.toHaveBeenCalled();

      const closeBitmap = vi.fn();
      imageEnvironment.createImageBitmap.mockResolvedValueOnce({
        width: 6001,
        height: 4000,
        close: closeBitmap
      } as unknown as ImageBitmap);
      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [validPngFile("pixels.png")]);
      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain(
          "разрешение одного фото слишком большое"
        );
      });
      expect(closeBitmap).toHaveBeenCalledTimes(1);
      expect(imageEnvironment.createObjectURL).not.toHaveBeenCalled();
    } finally {
      imageEnvironment.restore();
    }
  });

  it("revokes previews on remove, config switch, clear and disconnect", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-cleanup"
      });
      await widget.updateComplete;

      let input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      const repeatedFile = validPngFile("repeat-selection.png");
      selectFiles(input, [repeatedFile]);
      const removeUrl = await waitForDraftPreviewUrl(widget);
      widget.shadowRoot?.querySelector<HTMLButtonElement>('[part~="attachment-remove"]')?.click();
      await vi.waitFor(() => expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(removeUrl));

      input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      selectFiles(input, [repeatedFile]);
      const switchUrl = await waitForDraftPreviewUrl(widget);
      widget.removeAttribute("mock");
      await widget.updateComplete;
      expect(widget.shadowRoot?.querySelector('.attachment-input')).toBeNull();
      expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(switchUrl);

      widget.setAttribute("mock", "true");
      await widget.updateComplete;
      input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      selectFiles(input, [validPngFile("clear.png")]);
      const clearUrl = await waitForDraftPreviewUrl(widget);
      widget.clearSession();
      expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(clearUrl);
      await widget.updateComplete;

      input = widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input');
      selectFiles(input, [validPngFile("disconnect.png")]);
      const disconnectUrl = await waitForDraftPreviewUrl(widget);
      widget.remove();
      expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(disconnectUrl);
    } finally {
      imageEnvironment.restore();
    }
  });

  it("moves mock photos into the visitor bubble without exposing metadata in events or storage", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-submit"
      });
      let submittedDetail: Record<string, unknown> | undefined;
      widget.addEventListener("granit-site-widget:message-submitted", (event) => {
        submittedDetail = (event as CustomEvent<Record<string, unknown>>).detail;
      });
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [
        validPngFile("secret-cemetery-reference.png")
      ]);
      await vi.waitFor(() => expect(widget.shadowRoot?.querySelector('[part~="attachment"]')).toBeTruthy());

      const textarea = widget.shadowRoot?.querySelector<HTMLTextAreaElement>('.textarea');
      if (textarea) {
        textarea.value = "Похожий памятник";
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
      await widget.updateComplete;
      widget.shadowRoot?.querySelector<HTMLButtonElement>('.send-button')?.click();

      await vi.waitFor(() => {
        expect(widget.shadowRoot?.querySelector('.message-root--visitor .message-attachment__preview')).toBeTruthy();
      });
      const submittedPreviewUrl = widget.shadowRoot
        ?.querySelector<HTMLImageElement>('.message-root--visitor .message-attachment__preview')
        ?.getAttribute("src");

      expect(widget.shadowRoot?.querySelector('.attachment-list')).toBeNull();
      expect(JSON.stringify(submittedDetail)).not.toMatch(/secret-cemetery-reference|blob:|image\/png|attachments/i);
      expectNoAttachmentRuntimeValues(submittedDetail);
      expectStorageToContainOnlyWidgetState("photo-submit");

      widget.clearSession();
      expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(submittedPreviewUrl);
    } finally {
      imageEnvironment.restore();
    }
  });

  it("keeps the same mock preview and idempotency key across an inline retry", async () => {
    const imageEnvironment = installImageTestEnvironment();
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-retry"
      });
      const requestMock = vi
        .fn()
        .mockRejectedValueOnce(new Error("offline"))
        .mockResolvedValueOnce({
          status: "replied",
          replyText: "Фото осталось в сообщении",
          raw: { mock: true }
        });
      (widget as unknown as { sendMessageRequest: typeof requestMock }).sendMessageRequest = requestMock;
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [
        validPngFile("retry-private-name.png")
      ]);
      const previewUrl = await waitForDraftPreviewUrl(widget);
      const textarea = widget.shadowRoot?.querySelector<HTMLTextAreaElement>('.textarea');
      if (textarea) {
        textarea.value = "Проверить фото";
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
      await widget.updateComplete;
      widget.shadowRoot?.querySelector<HTMLButtonElement>('.send-button')?.click();

      await vi.waitFor(() => expect(widget.shadowRoot?.querySelector('[part~="retry-button"]')).toBeTruthy());
      expect(
        widget.shadowRoot
          ?.querySelector<HTMLImageElement>('.message-root--visitor .message-attachment__preview')
          ?.getAttribute("src")
      ).toBe(previewUrl);

      widget.shadowRoot?.querySelector<HTMLButtonElement>('[part~="retry-button"]')?.click();
      await vi.waitFor(() => expect(widget.shadowRoot?.textContent).toContain("Фото осталось в сообщении"));

      expect(requestMock).toHaveBeenCalledTimes(2);
      const firstRequest = requestMock.mock.calls[0]?.[1] as Record<string, unknown>;
      const secondRequest = requestMock.mock.calls[1]?.[1] as Record<string, unknown>;
      expect(firstRequest.idempotency_key).toBe(secondRequest.idempotency_key);
      expect(JSON.stringify(firstRequest)).not.toMatch(/attachments|retry-private-name|blob:|image\/png/i);
      expectNoAttachmentRuntimeValues(firstRequest);
      expect(widget.shadowRoot?.querySelectorAll('.message-root--visitor')).toHaveLength(1);
      expect(imageEnvironment.revokeObjectURL).not.toHaveBeenCalledWith(previewUrl);
    } finally {
      imageEnvironment.restore();
    }
  });

  it("does not resurrect a photo selection that was cleared while decoding", async () => {
    const imageEnvironment = installImageTestEnvironment();
    let finishDecode: (bitmap: ImageBitmap) => void = () => undefined;
    imageEnvironment.createImageBitmap.mockImplementationOnce(
      () =>
        new Promise<ImageBitmap>((resolve) => {
          finishDecode = resolve;
        })
    );
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-clear-during-decode"
      });
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [
        validPngFile("slow.png")
      ]);
      await vi.waitFor(() => expect(imageEnvironment.createImageBitmap).toHaveBeenCalledTimes(1));
      widget.clearSession();
      finishDecode({ width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap);

      await new Promise((resolve) => setTimeout(resolve, 0));
      await widget.updateComplete;
      expect(widget.shadowRoot?.querySelector('[part~="attachment"]')).toBeNull();
      expect(widget.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
    } finally {
      imageEnvironment.restore();
    }
  });

  it("waits for an in-flight photo validation before programmatic submit", async () => {
    const imageEnvironment = installImageTestEnvironment();
    let finishDecode: (bitmap: ImageBitmap) => void = () => undefined;
    imageEnvironment.createImageBitmap.mockImplementationOnce(
      () =>
        new Promise<ImageBitmap>((resolve) => {
          finishDecode = resolve;
        })
    );
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-submit-during-decode"
      });
      const requestMock = vi.fn().mockResolvedValue({
        status: "replied",
        replyText: "Готово",
        raw: { mock: true }
      });
      (widget as unknown as { sendMessageRequest: typeof requestMock }).sendMessageRequest = requestMock;
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [validPngFile("slow.png")]);
      await vi.waitFor(() => expect(imageEnvironment.createImageBitmap).toHaveBeenCalledTimes(1));
      widget.sendMessage("Сообщение ждёт фото");
      expect(requestMock).not.toHaveBeenCalled();

      finishDecode({ width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap);
      await vi.waitFor(() => {
        expect(requestMock).toHaveBeenCalledTimes(1);
        expect(widget.shadowRoot?.querySelector('.message-root--visitor .message-attachment__preview')).toBeTruthy();
      });
      expect(widget.shadowRoot?.querySelector('.attachment-list')).toBeNull();
    } finally {
      imageEnvironment.restore();
    }
  });

  it("starts a fresh selection queue after clear without waiting for an obsolete decoder", async () => {
    const imageEnvironment = installImageTestEnvironment();
    let finishOldDecode: (bitmap: ImageBitmap) => void = () => undefined;
    imageEnvironment.createImageBitmap.mockImplementationOnce(
      () =>
        new Promise<ImageBitmap>((resolve) => {
          finishOldDecode = resolve;
        })
    );
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-queue-epoch"
      });
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [validPngFile("old.png")]);
      await vi.waitFor(() => expect(imageEnvironment.createImageBitmap).toHaveBeenCalledTimes(1));
      widget.clearSession();
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [validPngFile("new.png")]);
      await waitForDraftPreviewUrl(widget);
      expect(imageEnvironment.createImageBitmap).toHaveBeenCalledTimes(2);

      finishOldDecode({ width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(widget.shadowRoot?.querySelectorAll('.attachment__preview')).toHaveLength(1);
    } finally {
      imageEnvironment.restore();
    }
  });

  it("revokes every in-flight batch URL immediately on clear", async () => {
    const imageEnvironment = installImageTestEnvironment();
    let finishSecondDecode: (bitmap: ImageBitmap) => void = () => undefined;
    imageEnvironment.createImageBitmap
      .mockResolvedValueOnce({ width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap)
      .mockImplementationOnce(
        () =>
          new Promise<ImageBitmap>((resolve) => {
            finishSecondDecode = resolve;
          })
      );
    try {
      const widget = mountSiteWidget({
        mock: true,
        open: true,
        attachmentsEnabled: true,
        showAttachmentSlot: true,
        widgetInstanceId: "photo-inflight-cleanup"
      });
      await widget.updateComplete;

      selectFiles(widget.shadowRoot?.querySelector<HTMLInputElement>('.attachment-input'), [
        validPngFile("first.png"),
        validPngFile("second.png")
      ]);
      await vi.waitFor(() => expect(imageEnvironment.createImageBitmap).toHaveBeenCalledTimes(2));
      const createdBeforeClear = imageEnvironment.createObjectURL.mock.results
        .map((result) => result.value)
        .filter((value): value is string => typeof value === "string");
      expect(createdBeforeClear.length).toBeGreaterThan(0);

      widget.clearSession();
      for (const previewUrl of createdBeforeClear) {
        expect(imageEnvironment.revokeObjectURL).toHaveBeenCalledWith(previewUrl);
      }

      finishSecondDecode({ width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(widget.shadowRoot?.querySelector('[part~="attachment"]')).toBeNull();
    } finally {
      imageEnvironment.restore();
    }
  });
});

function validPngFile(name: string): File {
  return new File([Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0])], name, {
    type: "image/png"
  });
}

function selectFiles(input: HTMLInputElement | null | undefined, files: readonly File[]): void {
  if (!input) throw new Error("Attachment input was not rendered");
  Object.defineProperty(input, "files", { configurable: true, value: files });
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

async function waitForDraftPreviewUrl(widget: HTMLElement): Promise<string> {
  let previewUrl = "";
  await vi.waitFor(() => {
    previewUrl = widget.shadowRoot?.querySelector<HTMLImageElement>('.attachment__preview')?.getAttribute("src") ?? "";
    expect(previewUrl).toMatch(/^blob:mock-/);
  });
  return previewUrl;
}

function installImageTestEnvironment(): {
  createImageBitmap: ReturnType<typeof vi.fn>;
  createObjectURL: ReturnType<typeof vi.fn>;
  revokeObjectURL: ReturnType<typeof vi.fn>;
  restore(): void;
} {
  const createImageBitmapDescriptor = Object.getOwnPropertyDescriptor(globalThis, "createImageBitmap");
  const createObjectURLDescriptor = Object.getOwnPropertyDescriptor(URL, "createObjectURL");
  const revokeObjectURLDescriptor = Object.getOwnPropertyDescriptor(URL, "revokeObjectURL");
  let objectUrlIndex = 0;
  const createObjectURL = vi.fn(() => `blob:mock-${++objectUrlIndex}`);
  const revokeObjectURL = vi.fn();
  const createImageBitmapMock = vi.fn(async () => {
    return { width: 1200, height: 800, close: vi.fn() } as unknown as ImageBitmap;
  });

  Object.defineProperty(globalThis, "createImageBitmap", {
    configurable: true,
    value: createImageBitmapMock,
    writable: true
  });
  Object.defineProperty(URL, "createObjectURL", { configurable: true, value: createObjectURL, writable: true });
  Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: revokeObjectURL, writable: true });

  return {
    createImageBitmap: createImageBitmapMock,
    createObjectURL,
    revokeObjectURL,
    restore() {
      restoreProperty(globalThis, "createImageBitmap", createImageBitmapDescriptor);
      restoreProperty(URL, "createObjectURL", createObjectURLDescriptor);
      restoreProperty(URL, "revokeObjectURL", revokeObjectURLDescriptor);
    }
  };
}

function expectNoAttachmentRuntimeValues(value: unknown, seen = new Set<unknown>()): void {
  if (value == null || typeof value !== "object") return;
  expect(value).not.toBeInstanceOf(File);
  expect(value).not.toBeInstanceOf(Blob);
  if (seen.has(value)) return;
  seen.add(value);

  const forbiddenKeys = new Set([
    "attachment",
    "attachments",
    "file",
    "files",
    "filename",
    "mimeType",
    "previewUrl",
    "sizeBytes"
  ]);
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    expect(forbiddenKeys.has(key)).toBe(false);
    expectNoAttachmentRuntimeValues(child, seen);
  }
}

function expectStorageToContainOnlyWidgetState(widgetInstanceId: string): void {
  const allowedKeys = new Set([
    `sw:${widgetInstanceId}:public_session_id`,
    `sw:${widgetInstanceId}:open_state`,
    `sw:${widgetInstanceId}:panel_size`
  ]);
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key) continue;
    expect(allowedKeys.has(key)).toBe(true);
    expect(localStorage.getItem(key)).not.toMatch(/blob:|data:image|base64|secret-cemetery-reference|\[object File\]/i);
  }
}

function restoreProperty(target: object, key: PropertyKey, descriptor?: PropertyDescriptor): void {
  if (descriptor) Object.defineProperty(target, key, descriptor);
  else Reflect.deleteProperty(target, key);
}

import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "playwright/test";
import {
  disabledReceipt,
  degradedReceipt,
  fallbackReceipt,
  repliedReceipt,
  TEST_VISITOR_MESSAGE_ID
} from "../helpers/response-fixtures";

type FixtureWindow = Window &
  typeof globalThis & {
    widgetFixture?: { widget: HTMLElement & { updateComplete: Promise<unknown> } };
  };

type ApiResponse = {
  status?: number;
  body: unknown;
};

type CapturedRequest = {
  body: Record<string, unknown>;
  contentType: string;
};

type LayoutMetrics = {
  documentClientWidth: number;
  documentScrollWidth: number;
  panelClientWidth: number;
  panelScrollWidth: number;
  panel: RectMetrics;
  composer: RectMetrics;
  messageViewport: RectMetrics;
  headerActions: RectMetrics[];
  hitTargets: Array<RectMetrics & { label: string }>;
};

type RectMetrics = {
  x: number;
  y: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

const fixturePath = "/tests/fixtures/widget.html";
const apiRoute = "**/api/public/intake/site-widget/messages";
const screenshotDirectory = "C:/Users/user/Desktop/business-ai-web-widget/output/site-widget-qa";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("open/close возвращает focus и переключает normal, wide, fullscreen", async ({ page }) => {
  await gotoWidget(page, { scenario: "open-close" });

  const launcher = page.getByRole("button", { name: "Написать" });
  await expect(launcher).toBeVisible();
  await launcher.click();

  const panel = widget(page).locator(".panel");
  const textarea = page.getByRole("textbox", { name: "Напишите сообщение..." });
  await expect(panel).toHaveAttribute("data-size", "normal");
  await expect(textarea).toBeFocused();
  await expectPanelWidth(panel, 520);
  await assertResponsiveLayout(page);
  await expectNoAxeViolations(page, "idle desktop");
  await saveScreenshot(page, "idle-desktop");

  const resize = page.getByRole("button", { name: /Изменить размер виджета/ });
  await resize.click();
  await expect(panel).toHaveAttribute("data-size", "wide");
  await expectPanelWidth(panel, 640);

  await resize.click();
  await expect(panel).toHaveAttribute("data-size", "fullscreen");
  const fullscreenBox = await requiredBox(panel);
  expect(fullscreenBox.x).toBeCloseTo(24, 0);
  expect(fullscreenBox.y).toBeCloseTo(24, 0);
  expect(fullscreenBox.width).toBeCloseTo(1392, 0);
  expect(fullscreenBox.height).toBeCloseTo(852, 0);

  await textarea.press("Escape");
  await expect(panel).toBeHidden();
  await expect(launcher).toBeFocused();
});

test("replied сохраняет strict site_widget.v1 и production не показывает photo UI", async ({ page }) => {
  const captured = await interceptApi(page, [
    {
      body: repliedReceipt({
        publicSessionId: "55555555-5555-4555-8555-555555555555",
        replyText: "Подготовим варианты и передадим менеджеру."
      })
    }
  ]);
  await gotoWidget(page, { open: true, attachments: true, scenario: "replied" });

  await expect(widget(page).locator(".attach-button")).toHaveCount(0);
  await expect(widget(page).locator(".attachment-input")).toHaveCount(0);
  await submitText(page, "Нужен расчет памятника");
  await expect(page.getByText("Подготовим варианты и передадим менеджеру.")).toBeVisible();

  expect(captured).toHaveLength(1);
  const request = captured[0];
  expect(request?.contentType).toContain("application/json");
  expect(request?.body.schema_version).toBe("site_widget.v1");
  expect(request?.body.event_type).toBe("site_widget.message_submitted");
  expect(request?.body.message).toStrictEqual({ role: "visitor", text: "Нужен расчет памятника" });
  expect(request?.body.public_session_id).toBeUndefined();
  expect(allKeys(request?.body)).not.toEqual(expect.arrayContaining(["attachments", "file", "filename", "mimeType"]));
  expect(widget(page).locator(".message-attachment__preview")).toHaveCount(0);
  await expect(widget(page).locator(".message-root--visitor")).toHaveAttribute("data-message-status", "saved");
  await saveScreenshot(page, "replied-desktop");
});

test("deferred response показывает pending bubble и отдельный sending status не позднее 300 ms", async ({ page }) => {
  let releaseResponse: () => void = () => undefined;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await page.route(apiRoute, async (route) => {
    await responseGate;
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify(
        repliedReceipt({
          publicSessionId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
          replyText: "Ответ после подтверждённого сохранения."
        })
      )
    });
  });
  await gotoWidget(page, { open: true, scenario: "deferred-pending-timing" });
  await page.getByRole("textbox", { name: "Напишите сообщение..." }).fill("Проверка мгновенной реакции");

  const pendingElapsedMs = await page.evaluate(async () => {
    const host = document.querySelector("granit-site-widget");
    const shadow = host?.shadowRoot;
    const form = shadow?.querySelector<HTMLFormElement>("form.composer");
    if (!shadow || !form) throw new Error("Widget form is not ready");

    return new Promise<number>((resolve, reject) => {
      const startedAt = performance.now();
      let timeoutId = 0;
      const observer = new MutationObserver(check);

      function check(): void {
        const pendingBubble = shadow?.querySelector(
          '.message-root--visitor[data-message-status="pending"] .message__text'
        );
        const sendingStatus = shadow?.querySelector('.message-root--visitor .message-status');
        if (!pendingBubble || !sendingStatus?.textContent?.includes("Отправляем")) return;
        observer.disconnect();
        window.clearTimeout(timeoutId);
        resolve(performance.now() - startedAt);
      }

      observer.observe(shadow, { attributes: true, childList: true, characterData: true, subtree: true });
      timeoutId = window.setTimeout(() => {
        observer.disconnect();
        reject(new Error("Pending UI was not rendered within 1000 ms"));
      }, 1_000);
      form.requestSubmit();
      check();
    });
  });

  expect(pendingElapsedMs).toBeLessThanOrEqual(300);
  const visitorRoot = widget(page).locator(".message-root--visitor");
  await expect(visitorRoot).toHaveAttribute("data-message-status", "pending");
  await expect(visitorRoot.locator(".message-status")).toContainText("Отправляем");

  releaseResponse();
  await expect(visitorRoot).toHaveAttribute("data-message-status", "saved");
  await expect(visitorRoot).toHaveAttribute("data-public-message-id", TEST_VISITOR_MESSAGE_ID);
  await expect(page.getByText("Ответ после подтверждённого сохранения.")).toBeVisible();
});

test("error остаётся одной зоной, retry сохраняет message id и idempotency key", async ({ page }) => {
  const captured = await interceptApi(page, [
    { status: 500, body: { message: "temporary browser failure" } },
    {
      body: repliedReceipt({
        acceptanceStatus: "replayed",
        publicSessionId: "66666666-6666-4666-8666-666666666666",
        replyText: "Повторная отправка принята."
      })
    }
  ]);
  await gotoWidget(page, { open: true, scenario: "error-retry" });
  await submitText(page, "Сообщение для retry");

  const visitorRoot = widget(page).locator(".message-root--visitor");
  const retry = page.getByRole("button", { name: "Повторить" });
  await expect(retry).toBeVisible();
  await expect(widget(page).locator(".message--error")).toHaveCount(1);
  await expect(widget(page).locator(".marker")).toHaveCount(0);
  await expect(visitorRoot).toHaveCount(1);
  const messageId = await visitorRoot.evaluate((root) => root.closest("[data-message-id]")?.getAttribute("data-message-id"));
  expect(messageId).toBeTruthy();

  await expectNoAxeViolations(page, "error desktop");
  await saveScreenshot(page, "error-desktop");
  await retry.click();
  await expect(page.getByText("Повторная отправка принята.")).toBeVisible();

  expect(captured).toHaveLength(2);
  expect(captured[0]?.body.idempotency_key).toBe(captured[1]?.body.idempotency_key);
  expect(captured[0]?.body.public_session_id).toBeUndefined();
  expect(captured[1]?.body.public_session_id).toBeUndefined();
  expect(await visitorRoot.evaluate((root) => root.closest("[data-message-id]")?.getAttribute("data-message-id"))).toBe(
    messageId
  );
  await expect(visitorRoot).toHaveCount(1);
  await expect(widget(page).locator(".message--error")).toHaveCount(0);
  await expect(visitorRoot).toHaveAttribute("data-message-status", "saved");
  await expect(visitorRoot).toHaveAttribute("data-acceptance-status", "replayed");
});

test("fallback рендерится Marker и проходит axe", async ({ page }) => {
  await interceptApi(page, [
    {
      body: fallbackReceipt({
        publicSessionId: "77777777-7777-4777-8777-777777777777",
        messageToUser: "Менеджер проверит детали и ответит вам."
      })
    }
  ]);
  await gotoWidget(page, { open: true, scenario: "fallback" });
  await submitText(page, "Позовите менеджера");

  const marker = widget(page).locator(".marker");
  await expect(marker).toHaveCount(1);
  await expect(marker).toContainText("Менеджер проверит детали");
  await expect(widget(page).locator("article.message--system")).toHaveCount(0);
  await expectNoAxeViolations(page, "fallback desktop");
  await saveScreenshot(page, "fallback-desktop");
});

test("degraded подтверждает сохранение и не показывает ошибку отправки", async ({ page }) => {
  await interceptApi(page, [
    {
      body: degradedReceipt({
        publicSessionId: "12121212-1212-4212-8212-121212121212"
      })
    }
  ]);
  await gotoWidget(page, { open: true, scenario: "degraded-saved" });
  await submitText(page, "Нужна консультация");

  const visitorRoot = widget(page).locator(".message-root--visitor");
  await expect(visitorRoot).toHaveAttribute("data-message-status", "saved");
  await expect(widget(page).locator(".marker")).toContainText("Сообщение сохранено");
  await expect(page.getByRole("button", { name: "Повторить" })).toHaveCount(0);
  await expect(widget(page).locator(".message--error")).toHaveCount(0);
});

test("disabled также использует Marker", async ({ page }) => {
  await interceptApi(page, [
    {
      body: disabledReceipt({
        publicSessionId: "88888888-8888-4888-8888-888888888888",
        messageToUser: "Автоответ отключён, менеджер ответит вручную."
      })
    }
  ]);
  await gotoWidget(page, { open: true, scenario: "disabled" });
  await submitText(page, "Есть вопрос");
  await expect(widget(page).locator(".marker")).toContainText("Автоответ отключён");
  await expect(widget(page).locator("article.message--system")).toHaveCount(0);
});

test("mock preview принимает 1 и 3 PNG, проходит axe и остаётся frontend-only", async ({ page }) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/public/intake/site-widget/messages")) apiRequests.push(request.url());
  });
  await gotoWidget(page, { open: true, mock: true, attachments: true, scenario: "mock-attachments" });

  const input = widget(page).locator(".attachment-input");
  const draftItems = widget(page).locator(".attachment-list .attachment");
  await expect(page.getByRole("button", { name: "Добавить фото" })).toBeVisible();
  await selectGeneratedPngs(input, 1, 0);
  await expect(draftItems).toHaveCount(1);
  await selectGeneratedPngs(input, 2, 1);
  await expect(draftItems).toHaveCount(3);
  await expectNoAxeViolations(page, "mock attachments desktop");
  await saveScreenshot(page, "mock-attachments-desktop");

  await submitText(page, "Фото участка для расчета");
  await expect(widget(page).locator(".message-attachment__preview")).toHaveCount(3);
  await expect(draftItems).toHaveCount(0);
  expect(apiRequests).toHaveLength(0);
});

test("keyboard-only flow открывает, отправляет и закрывает widget", async ({ page }) => {
  await interceptApi(page, [
    {
      body: repliedReceipt({
        publicSessionId: "99999999-9999-4999-8999-999999999999",
        replyText: "Keyboard flow принят."
      })
    }
  ]);
  await gotoWidget(page, { scenario: "keyboard" });

  const launcher = page.getByRole("button", { name: "Написать" });
  await page.keyboard.press("Tab");
  await expect(launcher).toBeFocused();
  await page.keyboard.press("Enter");

  const textarea = page.getByRole("textbox", { name: "Напишите сообщение..." });
  await expect(textarea).toBeFocused();
  await textarea.fill("Keyboard-only сообщение");
  await textarea.press("Enter");
  await expect(page.getByText("Keyboard flow принят.")).toBeVisible();
  await textarea.press("Escape");
  await expect(launcher).toBeFocused();
});

test("390×844: idle не переполняет viewport и сохраняет controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoWidget(page, { open: true, mock: true, scenario: "mobile-390" });
  await assertResponsiveLayout(page);
  await saveScreenshot(page, "idle-mobile-390");
});

test("320×568: error оставляет composer и header actions доступными", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await interceptApi(page, [{ status: 500, body: { message: "mobile failure" } }]);
  await gotoWidget(page, { open: true, scenario: "mobile-error-320" });
  await submitText(page, "Ошибка на мобильном");
  await expect(page.getByRole("button", { name: "Повторить" })).toBeVisible();
  await assertResponsiveLayout(page);
  await saveScreenshot(page, "error-mobile-320");
});

test("667×375: fullscreen landscape не имеет horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await gotoWidget(page, { open: true, mock: true, scenario: "landscape" });
  await page.getByRole("button", { name: /Изменить размер виджета/ }).click();
  await expect(widget(page).locator(".panel")).toHaveAttribute("data-size", "fullscreen");
  await assertResponsiveLayout(page);
  await saveScreenshot(page, "fullscreen-landscape");
});

function widget(page: Page): Locator {
  return page.locator("granit-site-widget");
}

async function gotoWidget(
  page: Page,
  options: {
    open?: boolean;
    mock?: boolean;
    attachments?: boolean;
    panelSize?: "normal" | "wide" | "fullscreen";
    scenario: string;
  }
): Promise<void> {
  const parameters = new URLSearchParams({ scenario: options.scenario });
  if (options.open) parameters.set("open", "1");
  if (options.mock) parameters.set("mock", "1");
  if (options.attachments) parameters.set("attachments", "1");
  if (options.panelSize) parameters.set("panel-size", options.panelSize);
  await page.goto(`${fixturePath}?${parameters}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => Boolean((window as FixtureWindow).widgetFixture));
  await expect(widget(page)).toHaveCount(1);
}

async function interceptApi(page: Page, responses: readonly ApiResponse[]): Promise<CapturedRequest[]> {
  const captured: CapturedRequest[] = [];
  let responseIndex = 0;
  await page.route(apiRoute, async (route) => {
    const request = route.request();
    captured.push({
      body: request.postDataJSON() as Record<string, unknown>,
      contentType: request.headers()["content-type"] ?? ""
    });
    const response = responses[Math.min(responseIndex, responses.length - 1)];
    responseIndex += 1;
    await route.fulfill({
      status: response?.status ?? 200,
      contentType: "application/json",
      body: JSON.stringify(response?.body ?? {})
    });
  });
  return captured;
}

async function submitText(page: Page, text: string): Promise<void> {
  const textarea = page.getByRole("textbox", { name: "Напишите сообщение..." });
  await textarea.fill(text);
  await page.getByRole("button", { name: "Отправить" }).click();
}

async function expectNoAxeViolations(page: Page, state: string): Promise<void> {
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations,
    `${state}: ${results.violations.map((violation) => `${violation.id} (${violation.nodes.length})`).join(", ")}`
  ).toEqual([]);
}

async function expectPanelWidth(panel: Locator, expected: number): Promise<void> {
  await expect
    .poll(async () => (await requiredBox(panel)).width)
    .toBeGreaterThanOrEqual(expected - 1);
  expect((await requiredBox(panel)).width).toBeLessThanOrEqual(expected + 1);
}

async function requiredBox(locator: Locator): Promise<{ x: number; y: number; width: number; height: number }> {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box ?? { x: 0, y: 0, width: 0, height: 0 };
}

async function assertResponsiveLayout(page: Page): Promise<void> {
  const metrics = await widget(page).evaluate((host): LayoutMetrics => {
    const root = host.shadowRoot;
    if (!root) throw new Error("Widget shadow root is unavailable");
    const panel = root.querySelector<HTMLElement>(".panel");
    const composer = root.querySelector<HTMLElement>(".composer");
    const messageViewport = root.querySelector<HTMLElement>(".message-viewport");
    if (!panel || !composer || !messageViewport) throw new Error("Widget layout nodes are unavailable");

    const toMetrics = (rect: DOMRect): RectMetrics => ({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      right: rect.right,
      bottom: rect.bottom
    });
    const headerActions = [...root.querySelectorAll<HTMLElement>('[part~="resize-button"], [part~="close-button"]')]
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => toMetrics(element.getBoundingClientRect()));
    const hitTargets = [
      ...root.querySelectorAll<HTMLElement>("button, a.mobile-action, textarea, input:not([type='file'])")
    ]
      .filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden")
      .map((element) => ({
        ...toMetrics(element.getBoundingClientRect()),
        label: element.getAttribute("aria-label") || element.textContent?.trim() || element.className
      }));

    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      panelClientWidth: panel.clientWidth,
      panelScrollWidth: panel.scrollWidth,
      panel: toMetrics(panel.getBoundingClientRect()),
      composer: toMetrics(composer.getBoundingClientRect()),
      messageViewport: toMetrics(messageViewport.getBoundingClientRect()),
      headerActions,
      hitTargets
    };
  });

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const width = viewport?.width ?? 0;
  const height = viewport?.height ?? 0;
  expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.documentClientWidth);
  expect(metrics.panelScrollWidth).toBeLessThanOrEqual(metrics.panelClientWidth + 1);
  expect(metrics.panel.x).toBeGreaterThanOrEqual(0);
  expect(metrics.panel.y).toBeGreaterThanOrEqual(0);
  expect(metrics.panel.right).toBeLessThanOrEqual(width + 0.5);
  expect(metrics.panel.bottom).toBeLessThanOrEqual(height + 0.5);
  expect(metrics.composer.y).toBeGreaterThanOrEqual(0);
  expect(metrics.composer.bottom).toBeLessThanOrEqual(height + 0.5);
  expect(metrics.messageViewport.height).toBeGreaterThanOrEqual(72);
  expect(metrics.headerActions).toHaveLength(2);
  for (const action of metrics.headerActions) {
    expect(action.width).toBeGreaterThanOrEqual(44);
    expect(action.height).toBeGreaterThanOrEqual(44);
    expect(action.right).toBeLessThanOrEqual(width + 0.5);
  }
  expect(metrics.hitTargets.length).toBeGreaterThan(0);
  for (const target of metrics.hitTargets) {
    expect(target.width, `${target.label} width`).toBeGreaterThanOrEqual(44);
    expect(target.height, `${target.label} height`).toBeGreaterThanOrEqual(44);
  }
}

async function selectGeneratedPngs(input: Locator, count: number, offset: number): Promise<void> {
  await input.evaluate(
    async (element, options) => {
      if (!(element instanceof HTMLInputElement)) throw new Error("Attachment input is unavailable");
      const transfer = new DataTransfer();
      for (let index = 0; index < options.count; index += 1) {
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas 2D context is unavailable");
        context.fillStyle = ["#8a6f55", "#5f7d65", "#78658f"][(index + options.offset) % 3] ?? "#8a6f55";
        context.fillRect(0, 0, canvas.width, canvas.height);
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((value) => (value ? resolve(value) : reject(new Error("PNG generation failed"))), "image/png");
        });
        transfer.items.add(new File([blob], `photo-${options.offset + index + 1}.png`, { type: "image/png" }));
      }
      Object.defineProperty(element, "files", { configurable: true, value: transfer.files });
      element.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    },
    { count, offset }
  );
}

function allKeys(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(allKeys);
  return Object.entries(value).flatMap(([key, nested]) => [key, ...allKeys(nested)]);
}

async function saveScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `${screenshotDirectory}/${name}.png`,
    animations: "disabled",
    caret: "hide"
  });
}

import { expect, test, type Page } from "playwright/test";

type FixtureItem = {
  id: string;
  height: number;
  scrollAnchor?: boolean;
};

type ScrollerSnapshot = {
  mode: "following-bottom" | "free-scrolling" | "anchored-to-message" | "settling-jump";
  canScrollStart: boolean;
  canScrollEnd: boolean;
  newItemCount: number;
};

type ScrollerMetrics = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  distanceToEnd: number;
  tailHeight: number;
  firstVisible: { id: string; top: number; bottom: number } | null;
  item: { top: number; bottom: number } | null;
};

type FixtureApi = {
  reset(items: FixtureItem[], viewportHeight?: number): Promise<void>;
  append(items: FixtureItem[]): Promise<void>;
  prepend(items: FixtureItem[]): Promise<void>;
  setItemHeight(id: string, height: number): Promise<void>;
  setViewportHeight(height: number): Promise<void>;
  setVisible(visible: boolean): Promise<void>;
  scrollToEnd(options?: ScrollToOptions): Promise<boolean>;
  scrollToMessage(id: string, options?: ScrollToOptions): Promise<boolean>;
  clearScrollCalls(): void;
  getScrollCalls(): ScrollBehavior[];
  getSnapshot(): ScrollerSnapshot;
  getMetrics(id?: string): ScrollerMetrics;
};

type FixtureWindow = Window & typeof globalThis & { messageScrollerFixture: FixtureApi };

const fixtureUrl = "/tests/fixtures/message-scroller.html";

test.beforeEach(async ({ page }) => {
  await page.goto(fixtureUrl, { waitUntil: "domcontentloaded" });
  await waitForFixture(page);
});

test("следует за live edge и сохраняет follow при росте ответа", async ({ page }) => {
  await reset(page, rows("message", 14, 64));

  await expectAtEnd(page);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");

  await append(page, [{ id: "reply", height: 72 }]);
  await expectAtEnd(page);

  await page.evaluate(async () => {
    await (window as FixtureWindow).messageScrollerFixture.setItemHeight("reply", 220);
  });

  await expectAtEnd(page);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");
});

test("wheel и keyboard освобождают чтение, latest возвращает follow", async ({ page }) => {
  await reset(page, rows("message", 18, 64));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -420);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  const beforeAppend = await metrics(page);
  await append(page, [
    { id: "new-1", height: 64 },
    { id: "new-2", height: 64 }
  ]);
  const afterAppend = await metrics(page);

  expect(Math.abs(afterAppend.scrollTop - beforeAppend.scrollTop)).toBeLessThanOrEqual(1);
  await expectSnapshot(page, (snapshot) => snapshot.newItemCount === 2 && snapshot.canScrollEnd);

  await viewport.focus();
  await page.keyboard.press("PageUp");
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  await page.evaluate(() => (window as FixtureWindow).messageScrollerFixture.clearScrollCalls());
  await page.getByTestId("jump-latest").click();

  await expectAtEnd(page);
  await expectSnapshot(
    page,
    (snapshot) => snapshot.mode === "following-bottom" && snapshot.newItemCount === 0
  );
  expect(await scrollCalls(page)).toContain("smooth");
});

test("turn anchor держит reading line и расходует tail spacer", async ({ page }) => {
  await reset(page, rows("message", 12, 58));
  await append(page, [{ id: "visitor-turn", height: 64, scrollAnchor: true }]);

  await expectSnapshot(page, (snapshot) => snapshot.mode === "anchored-to-message");
  const anchored = await metrics(page, "visitor-turn");
  expect(anchored.item?.top).toBeCloseTo(40, 0);
  expect(anchored.tailHeight).toBeGreaterThan(0);

  await append(page, [{ id: "assistant-reply", height: 72 }]);
  const partialReply = await metrics(page, "visitor-turn");
  expect(partialReply.item?.top).toBeCloseTo(40, 0);
  expect(partialReply.tailHeight).toBeLessThan(anchored.tailHeight);

  await page.evaluate(async () => {
    await (window as FixtureWindow).messageScrollerFixture.setItemHeight("assistant-reply", 520);
  });

  await expectAtEnd(page);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");
  expect((await metrics(page)).tailHeight).toBeLessThanOrEqual(0.5);
});

test("prepend сохраняет stable id и viewport-relative offset", async ({ page }) => {
  await reset(page, rows("message", 22, 58));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -650);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  const before = await metrics(page);
  expect(before.firstVisible).not.toBeNull();

  await page.evaluate(async (items) => {
    await (window as FixtureWindow).messageScrollerFixture.prepend(items);
  }, rows("history", 5, 52));

  const after = await metrics(page);
  expect(after.firstVisible?.id).toBe(before.firstVisible?.id);
  expect(Math.abs((after.firstVisible?.top ?? 0) - (before.firstVisible?.top ?? 0))).toBeLessThanOrEqual(1);
});

test("reopen и resize не сбрасывают free-scrolling", async ({ page }) => {
  await reset(page, rows("message", 20, 62));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -500);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
  const before = await metrics(page);

  await page.evaluate(async () => {
    const fixture = (window as FixtureWindow).messageScrollerFixture;
    await fixture.setVisible(false);
    await fixture.setVisible(true);
    await fixture.setViewportHeight(220);
  });

  const after = await metrics(page);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
  expect(Math.abs(after.scrollTop - before.scrollTop)).toBeLessThanOrEqual(1);

  await page.getByTestId("jump-latest").click();
  await expectAtEnd(page);
  await page.evaluate(async () => {
    await (window as FixtureWindow).messageScrollerFixture.setViewportHeight(300);
  });
  await expectAtEnd(page);
});

test("explicit message jump освобождает follow и показывает target", async ({ page }) => {
  await reset(page, rows("message", 18, 64));

  const result = await page.evaluate(async () => {
    return (window as FixtureWindow).messageScrollerFixture.scrollToMessage("message-5", {
      behavior: "auto"
    });
  });

  expect(result).toBe(true);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
  const target = await metrics(page, "message-5");
  expect(target.item?.bottom).toBeGreaterThan(0);
  expect(target.item?.top).toBeLessThan(target.clientHeight);
});

test("prefers-reduced-motion заменяет latest smooth на auto", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForFixture(page);
  await reset(page, rows("message", 18, 64));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -400);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
  await page.evaluate(() => (window as FixtureWindow).messageScrollerFixture.clearScrollCalls());

  await page.getByTestId("jump-latest").click();

  await expectAtEnd(page);
  expect(await scrollCalls(page)).toContain("auto");
  expect(await scrollCalls(page)).not.toContain("smooth");
});

test("остаётся работоспособным без ResizeObserver", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: undefined,
      writable: true
    });
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForFixture(page);

  await reset(page, rows("message", 14, 64));
  await expectAtEnd(page);
  await append(page, [{ id: "without-resize-observer", height: 96 }]);
  await expectAtEnd(page);
});

test("smooth latest с немедленным append и resize завершается в following-bottom", async ({ page }) => {
  await reset(page, rows("message", 18, 64));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -420);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  await page.getByTestId("jump-latest").click();
  await append(page, [{ id: "during-smooth-jump", height: 72 }]);
  await page.evaluate(async () => {
    await (window as FixtureWindow).messageScrollerFixture.setItemHeight("during-smooth-jump", 220);
  });

  await expect
    .poll(async () => (await snapshot(page)).mode, { timeout: 1_000 })
    .toBe("following-bottom");
  await expectAtEnd(page);
});

test("detach и reinsert ReactiveController host восстанавливают user release и follow", async ({ page }) => {
  await reset(page, rows("message", 18, 64));
  await reinsertFixture(page);
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -420);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  const beforeAppend = await metrics(page);
  await append(page, [{ id: "after-reinsert", height: 72 }]);
  expect(Math.abs((await metrics(page)).scrollTop - beforeAppend.scrollTop)).toBeLessThanOrEqual(1);

  await page.getByTestId("jump-latest").click();
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");
  await expectAtEnd(page);
});

test("window resize сохраняет live edge без ResizeObserver", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: undefined,
      writable: true
    });
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForFixture(page);
  await reset(page, rows("message", 16, 64));
  await expectAtEnd(page);

  await page.evaluate(() => {
    const element = document.querySelector<HTMLElement>("message-scroller-fixture");
    if (!element) throw new Error("MessageScroller fixture is unavailable");
    element.style.setProperty("--fixture-viewport-height", "180px");
    window.dispatchEvent(new Event("resize"));
  });

  await expect
    .poll(async () => (await metrics(page)).distanceToEnd, { timeout: 1_000 })
    .toBeLessThanOrEqual(8);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");
});

test("touchmove и scrollbar pointer drag освобождают follow", async ({ page }) => {
  await reset(page, rows("message", 18, 64));

  await page.getByTestId("content").dispatchEvent("touchmove", {
    touches: [],
    targetTouches: [],
    changedTouches: []
  });
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");

  await page.evaluate(async () => {
    await (window as FixtureWindow).messageScrollerFixture.scrollToEnd({ behavior: "auto" });
  });
  await expectSnapshot(page, (snapshot) => snapshot.mode === "following-bottom");

  await page.evaluate(() => {
    const viewport = document.querySelector<HTMLElement>("[data-testid='viewport']");
    if (!viewport) throw new Error("MessageScroller viewport is unavailable");
    const rect = viewport.getBoundingClientRect();
    viewport.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        clientX: rect.right - 1,
        clientY: rect.top + rect.height / 2,
        pointerId: 1,
        pointerType: "mouse"
      })
    );
    viewport.scrollTop = Math.max(0, viewport.scrollTop - 180);
    viewport.dispatchEvent(new Event("scroll"));
    viewport.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1, pointerType: "mouse" }));
  });

  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
});

test("batched prepend и append сохраняют reading position и считают suffix", async ({ page }) => {
  await reset(page, rows("message", 22, 58));
  const viewport = page.getByTestId("viewport");

  await viewport.hover();
  await page.mouse.wheel(0, -650);
  await expectSnapshot(page, (snapshot) => snapshot.mode === "free-scrolling");
  const before = await metrics(page);
  expect(before.firstVisible).not.toBeNull();

  await batchedPrependAndAppend(page, rows("history", 5, 52), { id: "live-suffix", height: 64 });

  const after = await metrics(page);
  expect(after.firstVisible?.id).toBe(before.firstVisible?.id);
  expect(Math.abs((after.firstVisible?.top ?? 0) - (before.firstVisible?.top ?? 0))).toBeLessThanOrEqual(1);
  await expectSnapshot(page, (value) => value.mode === "free-scrolling" && value.newItemCount === 1);
});

function rows(prefix: string, count: number, height: number): FixtureItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    height
  }));
}

async function reset(page: Page, items: FixtureItem[]): Promise<void> {
  await page.evaluate(async (nextItems) => {
    await (window as FixtureWindow).messageScrollerFixture.reset(nextItems);
  }, items);
}

async function append(page: Page, items: FixtureItem[]): Promise<void> {
  await page.evaluate(async (nextItems) => {
    await (window as FixtureWindow).messageScrollerFixture.append(nextItems);
  }, items);
}

async function reinsertFixture(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const element = document.querySelector<HTMLElement>("message-scroller-fixture");
    if (!element) throw new Error("MessageScroller fixture is unavailable");
    element.remove();
    document.body.appendChild(element);
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

async function batchedPrependAndAppend(
  page: Page,
  prepended: FixtureItem[],
  appended: FixtureItem
): Promise<void> {
  await page.evaluate(
    async ({ prefix, suffix }) => {
      const element = document.querySelector("message-scroller-fixture") as
        | (HTMLElement & {
            items: FixtureItem[];
            updateComplete: Promise<unknown>;
          })
        | null;
      if (!element) throw new Error("MessageScroller fixture is unavailable");

      element.items = [...prefix.map((item) => ({ ...item })), ...element.items];
      await element.updateComplete;
      element.items = [...element.items, { ...suffix }];
      await element.updateComplete;
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
      );
    },
    { prefix: prepended, suffix: appended }
  );
}

async function metrics(page: Page, id?: string): Promise<ScrollerMetrics> {
  return page.evaluate((messageId) => {
    return (window as FixtureWindow).messageScrollerFixture.getMetrics(messageId);
  }, id);
}

async function snapshot(page: Page): Promise<ScrollerSnapshot> {
  return page.evaluate(() => (window as FixtureWindow).messageScrollerFixture.getSnapshot());
}

async function scrollCalls(page: Page): Promise<ScrollBehavior[]> {
  return page.evaluate(() => (window as FixtureWindow).messageScrollerFixture.getScrollCalls());
}

async function waitForFixture(page: Page): Promise<void> {
  await page.waitForFunction(() => Boolean((window as Partial<FixtureWindow>).messageScrollerFixture));
}

async function expectAtEnd(page: Page): Promise<void> {
  await expect.poll(async () => (await metrics(page)).distanceToEnd).toBeLessThanOrEqual(8);
}

async function expectSnapshot(page: Page, predicate: (value: ScrollerSnapshot) => boolean): Promise<void> {
  await expect.poll(async () => predicate(await snapshot(page))).toBe(true);
}

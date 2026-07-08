import { describe, expect, it } from "vitest";
import { readLoaderOptions } from "../src/domain/loader-options";

describe("loader data parsing", () => {
  it("maps script data attributes to mount options", () => {
    const script = document.createElement("script");
    script.dataset.widgetInstanceId = "memorial-main";
    script.dataset.apiBaseUrl = "https://ops.example.com";
    script.dataset.mock = "true";
    script.dataset.open = "1";
    script.dataset.panelSize = "wide";
    script.dataset.quickReplySubmit = "auto";
    script.dataset.quickReplies = "Нужен расчет|Есть вопрос";

    expect(readLoaderOptions(script.dataset)).toMatchObject({
      widgetInstanceId: "memorial-main",
      apiBaseUrl: "https://ops.example.com",
      mock: true,
      open: true,
      panelSize: "wide",
      quickReplySubmit: "auto",
      quickReplies: [
        { label: "Нужен расчет", text: "Нужен расчет" },
        { label: "Есть вопрос", text: "Есть вопрос" }
      ]
    });
  });
});

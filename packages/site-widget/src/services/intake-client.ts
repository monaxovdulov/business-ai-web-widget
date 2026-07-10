import { mapSiteWidgetResponse } from "../domain/response";
import type { SiteWidgetConfig, SiteWidgetMessageRequest, SiteWidgetResponseViewModel } from "../types/public";

export async function sendSiteWidgetMessage(
  config: SiteWidgetConfig,
  request: SiteWidgetMessageRequest,
  signal?: AbortSignal
): Promise<SiteWidgetResponseViewModel> {
  if (config.mock) return mockSiteWidgetMessage(config, request, signal);
  if (!config.apiBaseUrl) throw new Error("apiBaseUrl is required when mock=false");

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), config.timeoutMs);
  const abortForwarder = () => controller.abort();
  signal?.addEventListener("abort", abortForwarder, { once: true });

  try {
    const response = await fetch(`${config.apiBaseUrl}${config.messagesPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(request),
      credentials: "omit",
      signal: controller.signal
    });

    const body = await readResponseBody(response);
    if (!response.ok) {
      throw new Error(readErrorMessage(body) ?? `Widget request failed with HTTP ${response.status}`);
    }

    return mapSiteWidgetResponse(body, config);
  } finally {
    globalThis.clearTimeout(timeout);
    signal?.removeEventListener("abort", abortForwarder);
  }
}

export async function mockSiteWidgetMessage(
  config: SiteWidgetConfig,
  request: SiteWidgetMessageRequest,
  signal?: AbortSignal
): Promise<SiteWidgetResponseViewModel> {
  await delay(350, signal);
  const text = request.message.text.toLowerCase();

  if (text.includes("менеджер") || text.includes("позвон")) {
    return {
      status: "fallback",
      publicSessionId: request.public_session_id,
      systemText: "Передали менеджеру. Он свяжется с вами по указанным контактам или ответит здесь.",
      reason: "manager_requested",
      raw: { mock: true }
    };
  }

  if (text.includes("сто") || text.includes("цен") || text.includes("расчет") || text.includes("расчёт")) {
    return {
      status: "replied",
      publicSessionId: request.public_session_id,
      replyText:
        "Стоимость зависит от модели, размера и комплектации. Опишите, пожалуйста, какой памятник нужен, или приложите фото — подготовим расчет.",
      raw: { mock: true }
    };
  }

  return {
    status: "replied",
    publicSessionId: request.public_session_id,
    replyText:
      "Приняли сообщение. Уточните город, примерный размер и нужен ли монтаж — так менеджер быстрее подготовит ответ.",
    raw: { mock: true }
  };
}

async function readResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return response.json();
  const text = await response.text();
  return text ? { message: text } : undefined;
}

function readErrorMessage(body: unknown): string | undefined {
  if (!body || typeof body !== "object" || Array.isArray(body)) return undefined;
  const record = body as Record<string, unknown>;
  return typeof record.message === "string"
    ? record.message
    : typeof record.error === "string"
      ? record.error
      : undefined;
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));

  return new Promise((resolve, reject) => {
    const timeout = globalThis.setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve();
    }, ms);
    const handleAbort = () => {
      globalThis.clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

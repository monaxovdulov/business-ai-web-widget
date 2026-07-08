const SESSION_PREFIX = "sws";

export function createClientId(prefix = "id"): string {
  return `${prefix}_${randomToken()}`;
}

export function createPublicSessionId(prefix = SESSION_PREFIX): string {
  return `${prefix}_${randomToken()}`;
}

export function createIdempotencyKey(publicSessionId?: string): string {
  const sessionPart = normalizePart(publicSessionId) || "anonymous";
  return `site-widget:${sessionPart}:${Date.now()}:${randomToken()}`;
}

export function stableHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `h${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalizePart(value?: string): string {
  return String(value ?? "")
    .trim()
    .replace(/[^a-zA-Z0-9_.:-]/g, "_");
}

function randomToken(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === "function") {
    return cryptoApi.randomUUID().replaceAll("-", "");
  }

  const bytes = new Uint8Array(16);
  if (cryptoApi && typeof cryptoApi.getRandomValues === "function") {
    cryptoApi.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

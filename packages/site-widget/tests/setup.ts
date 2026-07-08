import { beforeEach, vi } from "vitest";

beforeEach(() => {
  document.body.innerHTML = "";
  localStorage.clear();
  vi.restoreAllMocks();
});

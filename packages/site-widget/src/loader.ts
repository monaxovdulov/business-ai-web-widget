import { readLoaderOptions } from "./domain/loader-options";

void (async () => {
  if (typeof document === "undefined") return;

  const script =
    document.currentScript instanceof HTMLScriptElement
      ? document.currentScript
      : document.querySelector<HTMLScriptElement>("script[data-granit-site-widget-loader]");

  if (!script) return;

  const moduleUrl = new URL("./site-widget.esm.js", script.src || window.location.href).href;
  const targetSelector = script.dataset.targetSelector || script.dataset.target || "";
  const options = readLoaderOptions(script.dataset);

  try {
    const module = await import(/* @vite-ignore */ moduleUrl);
    const target = targetSelector ? document.querySelector(targetSelector) : document.body;
    module.mountSiteWidget({ ...options, target });
  } catch (error) {
    globalThis.setTimeout(() => {
      throw error;
    }, 0);
  }
})();

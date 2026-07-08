import { applyOptionsToElement } from "./domain/config";
import { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME } from "./components/granit-site-widget";
import type { GranitSiteWidgetGlobal, MountSiteWidgetOptions } from "./types/public";

export { GranitSiteWidgetElement, SITE_WIDGET_TAG_NAME };
export type * from "./types/public";

export function defineSiteWidget(tagName = SITE_WIDGET_TAG_NAME): void {
  if (typeof window === "undefined" || !window.customElements) return;
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, GranitSiteWidgetElement);
  }
}

export function mountSiteWidget(options: MountSiteWidgetOptions = {}): GranitSiteWidgetElement {
  if (typeof document === "undefined") {
    throw new Error("mountSiteWidget requires a browser document");
  }

  defineSiteWidget();

  const element = document.createElement(SITE_WIDGET_TAG_NAME) as GranitSiteWidgetElement;
  applyOptionsToElement(element, options);

  const target = options.target ?? document.body;
  if (!target) throw new Error("mountSiteWidget target was not found");
  target.appendChild(element);
  return element;
}

declare global {
  interface Window {
    GranitSiteWidget?: GranitSiteWidgetGlobal;
  }

  interface HTMLElementTagNameMap {
    "granit-site-widget": GranitSiteWidgetElement;
  }
}

import { defineSiteWidget, mountSiteWidget, SITE_WIDGET_TAG_NAME } from "./index";

export * from "./index";

if (typeof window !== "undefined") {
  window.GranitSiteWidget = {
    define: defineSiteWidget,
    mount: mountSiteWidget,
    tagName: SITE_WIDGET_TAG_NAME
  };
  defineSiteWidget();
}

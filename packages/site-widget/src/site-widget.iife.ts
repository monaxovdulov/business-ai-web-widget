import { defineSiteWidget, mountSiteWidget, SITE_WIDGET_TAG_NAME } from "./index";

defineSiteWidget();

if (typeof window !== "undefined") {
  window.GranitSiteWidget = {
    define: defineSiteWidget,
    mount: mountSiteWidget,
    tagName: SITE_WIDGET_TAG_NAME
  };
}

export { defineSiteWidget, mountSiteWidget, SITE_WIDGET_TAG_NAME };

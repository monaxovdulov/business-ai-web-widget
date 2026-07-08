import { svg, type TemplateResult } from "lit";

export type WidgetIconName =
  | "message"
  | "send"
  | "phone"
  | "calculator"
  | "close"
  | "minus"
  | "paperclip"
  | "shield"
  | "brand"
  | "plus"
  | "expand"
  | "shrink"
  | "maximize-2"
  | "minimize-2"
  | "spark"
  | string;

export function widgetIcon(name: WidgetIconName, size = 22): TemplateResult {
  const common = {
    width: size,
    height: size
  };

  switch (name) {
    case "send":
      return svgIcon(common, svg`<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />`);
    case "phone":
      return svgIcon(
        common,
        svg`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.35 1.71.58 2.61.7A2 2 0 0 1 22 16.92Z" />`
      );
    case "calculator":
      return svgIcon(
        common,
        svg`<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M16 14v4" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />`
      );
    case "close":
      return svgIcon(common, svg`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`);
    case "minus":
      return svgIcon(common, svg`<path d="M5 12h14" />`);
    case "paperclip":
      return svgIcon(common, svg`<path d="m16 6-8.41 8.59a2 2 0 0 0 2.82 2.82l8.42-8.58a4 4 0 1 0-5.66-5.66l-8.38 8.55a6 6 0 1 0 8.49 8.49l8.38-8.55" />`);
    case "shield":
      return svgIcon(
        common,
        svg`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" />`
      );
    case "brand":
      return svgIcon(common, svg`<path d="m8 3 4 8 5-5 5 15H2Z" />`);
    case "plus":
      return svgIcon(common, svg`<path d="M5 12h14" /><path d="M12 5v14" />`);
    case "maximize-2":
    case "expand":
      return svgIcon(common, svg`<path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />`);
    case "minimize-2":
    case "shrink":
      return svgIcon(common, svg`<path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 7-7" /><path d="m3 21 7-7" />`);
    case "spark":
      return svgIcon(
        common,
        svg`<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />`
      );
    case "message":
    default:
      return svgIcon(common, svg`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />`);
  }
}

function svgIcon(size: { width: number; height: number }, paths: TemplateResult): TemplateResult {
  return svg`<svg
    aria-hidden="true"
    width=${size.width}
    height=${size.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
  >
    ${paths}
  </svg>`;
}

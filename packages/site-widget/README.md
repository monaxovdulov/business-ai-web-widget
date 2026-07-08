# @granit/site-widget

Production v1.0 public site widget. The public API is Web Components-first:
`<granit-site-widget>`. Lit is bundled and used only as the internal UI layer.

## CDN Loader

```html
<script
  async
  src="https://cdn.example.com/site-widget/v1/loader.js"
  data-widget-instance-id="memorial-main"
  data-api-base-url="https://ops.example.com"
  data-theme="memorial-soft"
  data-panel-size="normal">
</script>
```

The loader reads `data-*`, imports the sibling `/site-widget/v1/site-widget.esm.js`,
and mounts the widget into `document.body`.

## Direct Web Component

```html
<script type="module" src="https://cdn.example.com/site-widget/v1/site-widget.esm.js"></script>

<granit-site-widget
  widget-instance-id="memorial-main"
  api-base-url="https://ops.example.com"
  theme="memorial-soft"
  panel-size="normal">
</granit-site-widget>
```

## Programmatic

```ts
import { defineSiteWidget, mountSiteWidget } from "@granit/site-widget";

defineSiteWidget();

const widget = mountSiteWidget({
  widgetInstanceId: "memorial-main",
  apiBaseUrl: "https://ops.example.com",
  theme: "memorial-soft",
  panelSize: "normal"
});

widget.open();
```

`panelSize`/`panel-size` controls the initial open panel size. Visitors can
cycle the panel between `normal`, `wide`, and `fullscreen` from the header; the
choice is stored per widget instance when local storage is available.

## Backend Contract

The widget sends:

```text
POST /public/intake/site-widget/messages
```

with `schema_version: "site_widget.v1"` and
`event_type: "site_widget.message_submitted"`.

The browser renders AI text only when the response has
`automation.status="replied"` and a persisted reply text. `fallback`,
`disabled`, unknown statuses, and `replied` without text render a safe
manager-review system bubble.

## Events

Events bubble and cross Shadow DOM. The primary namespace is
`granit-site-widget:*`; compatibility aliases are emitted as `granit-widget:*`.
Payloads do not include full visitor message text unless
`include-message-text-in-events="true"` is explicitly configured.

```ts
document.addEventListener("granit-site-widget:response-received", (event) => {
  console.log(event.detail);
});
```

## Build

```bash
npm install
npm run check
npm test
npm run build
```

Build outputs:

```text
dist/index.js
dist/loader.js
dist/site-widget.esm.js
dist/site-widget.iife.js
dist/site-widget.d.ts
dist/design-tokens.json
```

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
manager-review marker.

`site_widget.v1` is strict text-only JSON. Production never renders a photo
picker and never adds attachments, filenames, MIME values, `blob:` URLs, or
base64 to requests, events, or storage. The frontend does not know the AI
qualification workflow, its fields, completion criteria, or number of turns;
it only sends visitor text and renders the backend-confirmed sequence.

## Mock photo previews

Photo preview is a development-only aid and appears only when all three flags
are enabled:

```ts
mountSiteWidget({
  mock: true,
  attachmentsEnabled: true,
  showAttachmentSlot: true
});
```

The mock accepts up to three JPEG, PNG, or WebP images (5 MiB each, 15 MiB
total), validates signatures and decoded pixel count, and keeps object URLs
only in tab memory. Text remains required. The preview can move into a mock
visitor bubble, but the v1 request remains text-only. After a local build, see
`examples/mock-photo-preview.html` through `npm run serve:local`.

Production photos require a separate upload endpoint and `site_widget.v2` with
opaque normalized `upload_id` references; browser metadata must remain
untrusted.

## Chat behavior and styling

The transcript uses a keyed MessageScroller. It follows the live edge only
while the visitor is already there, preserves the reading position, provides a
“К новым сообщениям” action, and keeps a 40px reading line for new visitor
turns. A failed request stays on one visitor bubble with one inline retry and
the same idempotency key.

The original CSS variables and `::part` names remain supported. Additive
variables are `--sw-panel-normal-width` (520px) and
`--sw-panel-wide-width` (640px). Additive parts include:

```text
message-root message-bubble message-meta message-status message-actions
marker marker-icon marker-text message-viewport jump-latest
attachment-list attachment attachment-preview attachment-remove
```

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
npm run test:browser
# or the complete gate:
npm run test:all
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

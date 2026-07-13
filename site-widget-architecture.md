# Site Widget Architecture

Status: accepted
Date: 2026-06-16
Decision update: 2026-07-03, Lit hybrid implementation selected
Scope: portable public website widget, frontend package, backend public intake integration

## 1. Goal

Build a website widget that can be mounted on different landing pages without coupling to React, Vue, Next.js, WordPress, Tilda, or another host framework.

The widget must support:

- closed launcher state;
- opened chat/help state;
- optional quick actions such as call, write, calculation request;
- custom visual theme per landing;
- stable public API contract with the backend;
- safe AI display behavior: the browser shows AI text only when the backend response says the AI reply was accepted and persisted;
- portable design documentation in `design.md`.

## 2. Decision

Implement the widget as a framework-agnostic Lit-based Custom Element with Shadow DOM.

The public architecture stays Web Components-first: host pages still consume a standard
`<granit-site-widget>` element, not a React/Vue/Svelte component. Lit is the internal UI
implementation layer for templating, reactive properties, lifecycle, and scoped styles.
Domain logic, public HTTP contracts, session storage, idempotency, and event naming remain
owned by package modules outside the Lit rendering layer.

Chosen implementation strategy: Lit hybrid.

- Use `granit-site-widget-webcomponents.zip` as the behavioral reference because it already
  separates domain logic, reducer/state transitions, request/response mapping, API facade,
  browser environment, session storage, and events.
- Use `granit-site-widget.zip` as the TypeScript/package reference because it already has
  a package-shaped source tree, public types, `exports`, examples, and build/test metadata.
- Use `chat_widget_mockup.html` and `ref.png` as visual references, not as production code.
- Bundle Lit into publishable browser artifacts for CDN/script-tag usage. Host pages should
  not have to provide a separate `lit` dependency or import map.
- Treat Lit as a view adapter only. Do not move backend DTO construction, response mapping,
  idempotency, or session persistence into Lit components.
- Render visitor and backend text through Lit text bindings. Do not use `unsafeHTML` for
  public message content.

Runtime package:

```text
packages/site-widget
  src/
    index.ts                         # exports and custom element registration
    loader.ts                        # CDN/script auto-init entry
    components/granit-site-widget.ts  # LitElement for <granit-site-widget>
    components/widget-message.ts      # LitElement for message bubble rendering
    domain/config.ts                  # config normalization and validation
    domain/state.ts                   # state machine and reducer
    domain/view-model.ts              # UI view model from state + config
    domain/request.ts                 # public intake request builder
    domain/response.ts                # public response mapper
    domain/ids.ts                     # idempotency and client ids
    services/intake-client.ts         # public API client
    services/session-store.ts         # public_session_id persistence
    services/browser-env.ts           # page URL/title/referrer/locale snapshot
    events/widget-events.ts           # CustomEvent names and payloads
    styles/widget.styles.ts           # Lit CSS for root widget
    styles/message.styles.ts          # Lit CSS for message component
    ui/icons.ts                       # icon templates
    types/public.ts                   # public package types
  design.md                          # portable design contract
  README.md                          # integration guide
```

Primary host interface:

```html
<script
  defer
  src="/vendor/granit/site-widget/v1.0.0/loader.js"
  data-widget-instance-id="memorial-main"
  data-api-base-url="https://ops.example.com"
  data-theme="memorial-soft">
</script>
```

Explicit Web Component interface:

```html
<script type="module" src="/vendor/granit/site-widget/v1.0.0/site-widget.esm.js"></script>

<granit-site-widget
  widget-instance-id="memorial-main"
  api-base-url="https://ops.example.com"
  theme="memorial-soft">
</granit-site-widget>
```

Programmatic interface:

```ts
import { defineSiteWidget, mountSiteWidget } from "@monaxovdulov/site-widget";

defineSiteWidget();

mountSiteWidget({
  target: document.body,
  widgetInstanceId: "memorial-main",
  apiBaseUrl: "https://ops.example.com",
  theme: "memorial-soft",
});
```

React/Vue/Next wrappers can be added later. They should only render the custom element and pass attributes. They should not own widget state.

## 3. Runtime boundaries

```text
Host page
  -> loader.js
  -> <granit-site-widget>
  -> Lit Shadow DOM UI
  -> domain state/reducer
  -> IntakeClient
  -> POST /public/intake/site-widget/messages
  -> SiteWidgetResponse
  -> domain state update
  -> Lit render
```

### 3.1 Host page

The host page owns page content, global CSS, analytics, and layout. It provides mount location and public configuration.

The host page does not import widget internals. It does not call the AI provider. It does not persist leads.

### 3.2 Loader

The loader reads `data-*` attributes, creates `<granit-site-widget>`, appends it to `document.body`, and stops.

Rules:

- no business logic;
- no API request except optional config fetch;
- no global CSS reset;
- no synchronous heavy work;
- no dependency on host framework.

### 3.3 Lit Web Component

The custom element owns:

- Shadow DOM root;
- scoped styles;
- DOM events;
- keyboard/focus behavior;
- responsive layout;
- rendering of closed, opened, loading, submitted, fallback, and error states.

It delegates data and state transitions to the domain modules. Lit components must stay
thin: they convert user interaction into domain actions, render the current view model,
and emit public browser events.

### 3.4 Domain state and reducer

Domain state is plain TypeScript. It has no DOM or Lit dependency.

Responsibilities:

- maintain state machine;
- create outbound DTO for public intake;
- manage idempotency key generation;
- use `public_session_id` from storage or backend response;
- process `SiteWidgetResponse`;
- emit events for UI and analytics adapter.

### 3.5 IntakeClient

The API client has one stable dependency: the public widget HTTP contract.

Base operation:

```text
POST /public/intake/site-widget/messages
```

The backend validates the request, persists inbound state, optionally generates AI output, repeats the send gate, persists outbound AI state, and returns a widget response. The widget renders only the public response.

## 4. Backend contract use

The frontend sends a versioned public message event:

```ts
type SiteWidgetMessageRequest = {
  schema_version: "site_widget.v1";
  event_type: "site_widget.message_submitted";
  idempotency_key: string;
  submitted_at: string;
  public_session_id?: string;
  source: {
    channel: "site_widget";
    page_url: string;
    widget_instance_id: string;
    page_title?: string;
    referrer_url?: string;
    utm?: Record<string, string>;
  };
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
    preferred_contact?: "phone" | "whatsapp" | "telegram" | "email";
    city?: string;
  };
  message: {
    role: "visitor";
    text: string;
  };
  visitor_context?: {
    locale?: string;
    timezone?: string;
  };
  consent?: {
    privacy_policy?: boolean;
  };
};
```

The widget treats backend automation status as display state:

```ts
type WidgetAutomationStatus = "disabled" | "fallback" | "replied";
```

Rendering rules:

| Backend result | Widget rendering |
|---|---|
| `automation.status="replied"` | Render AI assistant bubble with disclosure and persisted reply text. |
| `automation.status="fallback"` | Render handoff/manager review bubble. Do not render generated AI text. |
| `automation.status="disabled"` | Render manager review bubble. |
| HTTP/network error | Keep user text in local UI, show retry/error state, do not mark as delivered. |
| validation conflict | Show retry-safe error and ask visitor to submit again. |

The browser never receives internal `leadId` or `conversationId`.

## 5. Config model

Public config can come from attributes, inline JSON, or backend config endpoint. Final config is normalized into one shape.

```ts
type SiteWidgetConfigV1 = {
  schema_version: "site_widget_config.v1";
  widget_instance_id: string;
  api: {
    base_url: string;
    messages_path: "/public/intake/site-widget/messages";
    timeout_ms: number;
  };
  copy: {
    title: string;
    subtitle: string;
    greeting: string;
    input_placeholder: string;
    privacy_note: string;
    calculation_note?: string;
  };
  behavior: {
    initial_state: "closed" | "open";
    persist_open_state: boolean;
    show_quick_actions: boolean;
    show_bottom_action_bar_on_mobile: boolean;
    collect_phone_after_first_message: boolean;
  };
  actions: Array<
    | { type: "call"; label: string; href: string }
    | { type: "open"; label: string }
    | { type: "prefill"; label: string; text: string }
    | { type: "link"; label: string; href: string; target?: "_self" | "_blank" }
  >;
  theme: SiteWidgetThemeV1;
};
```

Merge order:

```text
default config
  -> named preset
  -> backend public config
  -> inline JSON config
  -> element attributes
  -> CSS custom properties on host element
```

Sensitive values are not allowed in public config.

## 6. Theming and design portability

Use semantic tokens instead of hard-coded component colors. The same `design.md` can be copied to another project and implemented through CSS variables, JSON tokens, or Figma variables.

Token groups:

```text
color.*
font.*
space.*
radius.*
shadow.*
motion.*
zIndex.*
```

CSS custom properties are applied on `:host`:

```css
granit-site-widget {
  --sw-color-accent: #a98b6d;
  --sw-color-surface: #fffdf9;
  --sw-color-user-bubble: #f0e6db;
  --sw-radius-panel: 24px;
  --sw-shadow-panel: 0 24px 80px rgba(28, 23, 18, 0.18);
}
```

Shadow DOM prevents most host CSS collisions. CSS variables and `::part()` keep controlled customization available.

Exposed parts:

```text
launcher
panel
header
status
messages
message-visitor
message-assistant
quick-replies
input
send-button
phone-field
footer-note
mobile-actions
```

## 7. State machine

```text
unmounted
  -> booting
  -> closed
  -> opening
  -> open_idle
  -> composing
  -> submitting
  -> submitted_waiting
  -> replied | fallback | disabled | error
  -> composing
  -> closed
```

State ownership:

| State data | Owner |
|---|---|
| `public_session_id` | `SessionStore` using localStorage with memory fallback |
| `isOpen` | `WidgetController`; optionally persisted |
| message draft | Web Component UI state |
| submitted messages | `WidgetController` runtime state; backend is source after acceptance |
| backend response | `IntakeClient` result |
| theme tokens | `ThemeResolver` |

## 8. Storage

Storage keys:

```text
sw:<widget_instance_id>:public_session_id
sw:<widget_instance_id>:open_state
sw:<widget_instance_id>:last_contact
```

Rules:

- store only public session id and non-sensitive display preferences by default;
- do not store message history by default;
- do not store AI text by default;
- allow `storage="memory"` mode for strict privacy pages.

## 9. Events

The Web Component emits browser events for the host page.

```ts
type SiteWidgetEventName =
  | "granit-widget:ready"
  | "granit-widget:opened"
  | "granit-widget:closed"
  | "granit-widget:message-submitted"
  | "granit-widget:response-received"
  | "granit-widget:fallback-shown"
  | "granit-widget:error"
  | "granit-widget:action-clicked";
```

Payloads must exclude full message text unless `analytics.include_message_text=true` is explicitly enabled. Default analytics payloads contain event type, widget instance id, page URL, public session id hash, and status.

## 10. Accessibility

Minimum requirements:

- launcher is a real button;
- panel uses `role="dialog"` and `aria-modal="false"`;
- header close/minimize controls have labels;
- input has an accessible label;
- status updates use a polite live region;
- focus moves into panel on open and returns to launcher on close;
- Escape closes the panel;
- Enter submits, Shift+Enter inserts newline;
- touch targets are at least 44px high;
- `prefers-reduced-motion` disables non-essential animation.

## 11. Security and browser constraints

| Risk | Control |
|---|---|
| Host CSS breaks widget | Shadow DOM and scoped styles. |
| Widget CSS breaks host page | No global stylesheet; no body resets. |
| XSS through backend text | Render text via `textContent`; no HTML message rendering in v1. |
| Duplicate submissions | Idempotency key per user message. |
| Cross-origin failure | API CORS allowlist per landing domain. |
| CSP blocks script | Provide documented `script-src` and `connect-src` requirements. |
| Widget covers important page UI | Configurable placement, safe-area insets, mobile bottom offset. |
| Long AI latency | Render delivered/waiting state; timeout fallback. |

## 12. Build outputs

```text
dist/
  site-widget.esm.js          # ESM, for bundlers and module script
  site-widget.iife.js         # global build
  loader.js                   # async auto-init script
  site-widget.d.ts            # public TypeScript types
  design-tokens.json          # portable token artifact
```

Build package fields:

```json
{
  "name": "@monaxovdulov/site-widget",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/site-widget.d.ts",
      "import": "./dist/site-widget.esm.js"
    },
    "./loader": "./dist/loader.js",
    "./tokens": "./dist/design-tokens.json"
  },
  "sideEffects": false
}
```

`loader.js` is allowed to have side effects because it mounts the widget. Main ESM entry should only define exports until `defineSiteWidget()` or `mountSiteWidget()` is called.

## 13. Optional iframe mode

Default render mode is Shadow DOM. Add iframe mode only for hostile CMS pages or strict isolation requirements.

```html
<granit-site-widget render-mode="iframe"></granit-site-widget>
```

Iframe mode uses `postMessage` between host shell and iframe app. It increases implementation cost and should not be the default path.

## 14. Tests

Required checks:

```text
unit: config schema, theme resolver, state machine, idempotency
unit: intake request builder and response mapper
component: closed/open/submitting/replied/fallback/error render states
component: keyboard and focus behavior
contract: request DTO against packages/contracts schema
integration: embed in plain HTML, React, Vue, Next.js static page, WordPress-like page
e2e: message submit success, fallback, network error, retry, duplicate idempotency
a11y: axe or equivalent check for all primary states
visual: token presets and responsive breakpoints
bundle: size budget and no host framework dependency
```

## 15. Acceptance criteria

- One script tag can mount the widget on a plain HTML page.
- The same package can be used through a custom element in any framework.
- No React/Vue runtime is included in widget bundle.
- Host page CSS does not change widget layout.
- Widget CSS does not change host page layout.
- A landing can change colors, radii, shadows, copy, quick actions, and placement without rebuilding package code.
- User message is sent through the public intake contract.
- AI text is displayed only when the backend response status is `replied`.
- Fallback/disabled states render a manager-review message.
- `design.md` contains the portable visual contract and token schema.

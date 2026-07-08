# Lit Hybrid Decision

Status: accepted
Date: 2026-07-03
Scope: implementation strategy for the portable public site widget

## Decision

Build the production widget as a Lit-based Custom Element while preserving the existing
Web Components public boundary.

The package still exposes a standard `<granit-site-widget>` element, a script-tag loader,
an ESM entry, programmatic helpers, browser events, CSS custom properties, and `::part()`
styling hooks. Lit is only the internal UI implementation layer.

## Rationale

Lit fits this widget because the UI is stateful: closed/open states, messages, quick replies,
composer behavior, mobile actions, loading, fallback, disabled, retry, accessibility, and
theme overrides. Lit removes much of the manual DOM bookkeeping while keeping the final
artifact a native Custom Element.

The selected path is hybrid:

- behavior source: `granit-site-widget-webcomponents.zip`;
- TypeScript/package source: `granit-site-widget.zip`;
- visual source: `chat_widget_mockup.html` and `ref.png`.

## Boundaries

- Keep backend request building, response mapping, idempotency, session storage, browser
  environment reads, and event payload construction outside Lit components.
- Bundle Lit into the browser artifacts for CDN usage. Host pages should not provide Lit.
- Do not use `unsafeHTML` for visitor text, backend text, labels, errors, or fallback copy.
- Preserve the public tag name, attributes, methods, events, CSS variables, and supported
  `::part()` names unless an explicit migration note says otherwise.
- Prefer root-level public `part` exposure. If nested Lit components own shadow roots, use
  `exportparts` deliberately.

## Target Structure

```text
src/
  index.ts
  loader.ts
  components/
    granit-site-widget.ts
    widget-message.ts
  domain/
    config.ts
    state.ts
    view-model.ts
    request.ts
    response.ts
    ids.ts
  services/
    intake-client.ts
    session-store.ts
    browser-env.ts
  events/
    widget-events.ts
  styles/
    widget.styles.ts
    message.styles.ts
  ui/
    icons.ts
  types/
    public.ts
tests/
  domain.test.mjs
  component.test.mjs
  loader.test.mjs
examples/
  plain-html.html
  direct-web-component.html
  programmatic.html
dist/
  loader.js
  site-widget.esm.js
  site-widget.iife.js
  site-widget.d.ts
  design-tokens.json
```

## Migration Map

| Existing source | Lit target |
|---|---|
| `granit-site-widget-webcomponents/shared/site-widget-domain.js` | `src/domain/*` |
| `granit-site-widget-webcomponents/static/components/granit-site-widget.js` and `.html` | `src/components/granit-site-widget.ts` |
| `granit-site-widget-webcomponents/static/components/widget-message.js` and `.html` | `src/components/widget-message.ts` |
| `granit-site-widget-webcomponents/static/api.js` | `src/services/intake-client.ts` |
| `granit-site-widget-webcomponents/static/session-store.js` | `src/services/session-store.ts` |
| `granit-site-widget-webcomponents/static/browser-env.js` | `src/services/browser-env.ts` |
| `granit-site-widget-webcomponents/static/events.js` | `src/events/widget-events.ts` |
| `granit-site-widget/src/types/public.ts` | `src/types/public.ts` |
| `granit-site-widget/src/loader.ts` and webcomponents loader behavior | `src/loader.ts` |
| `chat_widget_mockup.html` and `ref.png` | Visual reference for Lit render/styles |

## Open Decisions Before Implementation

- Keep package name `@granit/site-widget` or publish a separate `@granit/site-widget-lit`.
- Choose the bundler and output policy for self-contained CDN artifacts.
- Decide whether `granit-widget-message` stays a separate public custom element or becomes
  an internal Lit component.
- Confirm final CSS token names where the existing artifacts differ.
- Confirm quick reply default behavior: prefill or auto-submit.
- Confirm browser target and whether output must be transpiled below modern ESM.

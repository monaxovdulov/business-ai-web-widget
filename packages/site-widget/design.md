# Site Widget Design

Status: implemented
Version: `site_widget_design.v1.1`
Scope: portable visual and interaction contract for the public website widget

## 1. Design intent

The widget is a compact contact and order-help entry point for landing pages. It must stay visually close to the landing style, keep the main content readable, and provide a short path to three actions:

- write a message;
- request a calculation;
- call or leave a phone number.

The design is portable. This document uses semantic tokens and component anatomy instead of tool-specific names. The same spec can be implemented in Web Component CSS, Figma variables, or another frontend package.

## 2. Primary surfaces

| Surface | Purpose | Typical placement |
|---|---|---|
| Launcher | Closed state entry button. | Bottom right on desktop; bottom area on mobile if action rail is disabled. |
| Panel | Open chat/help surface. | Floating bottom right on desktop; near full-width bottom sheet on mobile. |
| Quick action rail | Fast closed-state actions. | Mobile bottom bar. |
| Inline trigger | Optional button inside landing content. | Hero, pricing, catalog, contact sections. |

## 3. Component anatomy

```text
SiteWidgetRoot
  Launcher
    LauncherIcon
    LauncherLabel
    UnreadBadge
  Panel
    Header
      BrandMark
      Title
      StatusLine
      ResizeButton
      MinimizeButton
      CloseButton
    MessageScroller
      MessageViewport
        MessageLog
          MessageRoot
            MessageBubble
            MessageMeta
            MessageActions
          Marker
          TailSpacer
      JumpToLatest
    QuickReplies
      QuickReplyButton
    Composer
      AttachmentButton(optional)
      Textarea
      SendButton
    ContactCapture(optional)
      PhoneInput
      SubmitPhoneButton
    FooterNote
  MobileActionRail(optional)
    CallAction
    MessageAction
    CalculationAction
```

## 4. States

| State | Required UI |
|---|---|
| `closed` | Launcher visible; optional mobile action rail visible. |
| `opening` | Panel animates in; focus moves to first meaningful control. |
| `open_idle` | Greeting, quick replies, empty input. |
| `composing` | Input has text; send button enabled. |
| `submitting` | Visitor message appears; send button disabled; pending indicator visible. |
| `replied` | Assistant message appears with disclosure if backend returned AI reply. |
| `fallback` | Manager handoff message appears. |
| `disabled` | Manager review message appears. |
| `error` | The pending visitor bubble shows one inline retry; no duplicate system error is added. |
| `closed_with_unread` | Launcher badge visible if new assistant or system message arrived while closed. |

## 5. Copy defaults

```json
{
  "title": "Поможем с заказом",
  "status_online": "Онлайн",
  "response_time": "обычно отвечаем за 2 минуты",
  "greeting": "Здравствуйте! 👋\nПодскажем по памятнику, рассчитаем стоимость и оформим заказ дистанционно. Опишите задачу или выберите вариант ниже.",
  "quick_replies": ["Нужен расчет", "Есть вопрос", "Хочу каталог"],
  "input_placeholder": "Напишите сообщение...",
  "resize_label": "Изменить размер виджета",
  "phone_add_label": "Добавить телефон для ответа",
  "footer_note": "Расчет бесплатный. Точную стоимость подтвердит менеджер после уточнения деталей.",
  "fallback_message": "Сообщение принято. Менеджер ответит после уточнения деталей.",
  "error_message": "Не удалось отправить сообщение. Проверьте соединение и попробуйте еще раз."
}
```

Copy can be overridden per landing. Copy changes do not require component code changes.

## 6. Layout tokens

| Token | Default | Use |
|---|---:|---|
| `size.launcher.height` | `64px` | Closed button height. |
| `size.launcher.minWidth` | `184px` | Closed button minimum width. |
| `size.panel.width` | `520px` | Desktop normal panel width. |
| `size.panel.wideWidth` | `640px` | Desktop wide panel width. |
| `size.panel.fullscreenInset` | `24px` | Desktop fullscreen panel inset. |
| `size.panel.maxHeight` | `min(760px, calc(100vh - 48px))` | Desktop panel height limit. |
| `size.mobile.panelWidth` | `calc(100vw - 24px)` | Mobile panel width. |
| `size.mobile.panelMaxHeight` | `calc(100dvh - 24px)` | Mobile panel height limit. |
| `space.1` | `4px` | Small offset. |
| `space.2` | `8px` | Compact gap. |
| `space.3` | `12px` | Message/control gap. |
| `space.4` | `16px` | Section padding. |
| `space.5` | `20px` | Panel internal padding. |
| `space.6` | `24px` | Outer floating offset. |

## 7. Radius tokens

| Token | Default | Use |
|---|---:|---|
| `radius.button` | `999px` | Launcher, quick replies, actions. |
| `radius.panel` | `24px` | Open panel. |
| `radius.message` | `16px` | Message bubbles. |
| `radius.input` | `999px` | Composer field. |
| `radius.card` | `18px` | Optional cards. |

## 8. Color tokens

| Token | Default | Use |
|---|---|---|
| `color.text.primary` | `#2f2d2a` | Main text. |
| `color.text.secondary` | `#716d67` | Status and notes. |
| `color.text.muted` | `#766f68` | Time and placeholders with readable contrast. |
| `color.surface.pageOverlay` | `rgba(255, 252, 248, 0.72)` | Optional soft overlay behind panel. |
| `color.surface.panel` | `#fffdf9` | Panel background. |
| `color.surface.messageAssistant` | `#ffffff` | Assistant bubble. |
| `color.surface.messageVisitor` | `#f1e7dd` | Visitor bubble. |
| `color.surface.control` | `#ffffff` | Input and secondary buttons. |
| `color.border.soft` | `rgba(55, 48, 40, 0.10)` | Dividers and outlines. |
| `color.accent` | `#8a6f55` | Launcher and send button; AA contrast against white. |
| `color.accentText` | `#ffffff` | Text on accent. |
| `color.online` | `#68c75a` | Online dot. |
| `color.error` | `#b84b3f` | Error text. |

## 9. Typography tokens

| Token | Default | Use |
|---|---|---|
| `font.family` | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Widget font stack. |
| `font.size.title` | `24px` | Header title desktop. |
| `font.size.body` | `16px` | Message text. |
| `font.size.small` | `13px` | Status and metadata. |
| `font.size.action` | `16px` | Buttons. |
| `font.weight.title` | `650` | Header title. |
| `font.weight.action` | `560` | Buttons. |
| `lineHeight.body` | `1.45` | Message text. |
| `lineHeight.small` | `1.35` | Status and notes. |

Mobile adjustment:

```text
font.size.title: 20px
font.size.body: 15px
font.size.action: 15px
```

## 10. Shadow tokens

| Token | Default | Use |
|---|---|---|
| `shadow.launcher` | `0 14px 34px rgba(42, 32, 22, 0.18)` | Closed button. |
| `shadow.panel` | `0 24px 80px rgba(28, 23, 18, 0.18)` | Open panel. |
| `shadow.rail` | `0 12px 36px rgba(28, 23, 18, 0.12)` | Mobile action rail. |

## 11. Motion tokens

| Token | Default | Use |
|---|---:|---|
| `motion.duration.fast` | `120ms` | Hover and focus. |
| `motion.duration.panel` | `180ms` | Panel open/close. |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default easing. |

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}
```

## 12. Z-index tokens

| Token | Default | Use |
|---|---:|---|
| `zIndex.widget` | `2147483000` | Root stacking context. |
| `zIndex.panel` | `2147483010` | Open panel. |
| `zIndex.rail` | `2147483005` | Mobile action rail. |

## 13. CSS custom properties

A landing can override the visual style with CSS variables on the host element.

```css
granit-site-widget {
  --sw-color-accent: #9d8062;
  --sw-color-surface-panel: #fffaf3;
  --sw-color-surface-message-visitor: #efe2d5;
  --sw-color-text-primary: #27231f;
  --sw-radius-panel: 28px;
  --sw-shadow-panel: 0 28px 90px rgba(35, 29, 22, 0.18);
  --sw-font-family: Inter, system-ui, sans-serif;
}
```

## 14. Parts for controlled styling

The Web Component exposes `part` names for advanced customization.

```css
granit-site-widget::part(launcher) {
  letter-spacing: 0.01em;
}

granit-site-widget::part(panel) {
  backdrop-filter: blur(8px);
}

granit-site-widget::part(send-button) {
  transform: translateZ(0);
}
```

Supported parts:

```text
launcher
launcher-icon
launcher-label
panel
header
header-actions
brand-mark
title
status
minimize-button
resize-button
close-button
body
messages
message
message-assistant
message-visitor
message-system
message-disclosure
retry-button
message-root
message-bubble
message-meta
message-status
message-actions
marker
marker-icon
marker-text
message-viewport
jump-latest
attachment-list
attachment
attachment-preview
attachment-remove
quick-replies
quick-reply
composer-shell
composer
attach-button
input
textarea
send-button
contact-row
phone-trigger
phone-capture
phone-field
phone-save-button
footer-note
mobile-actions
mobile-action
```

## 15. Theme preset shape

```json
{
  "schema_version": "site_widget_theme.v1",
  "name": "memorial-soft",
  "tokens": {
    "color.accent": "#8a6f55",
    "color.surface.panel": "#fffdf9",
    "color.surface.messageVisitor": "#f1e7dd",
    "color.text.primary": "#2f2d2a",
    "radius.panel": "24px",
    "radius.button": "999px",
    "shadow.panel": "0 24px 80px rgba(28, 23, 18, 0.18)"
  }
}
```

Theme validation rules:

- unknown token keys are rejected in strict mode;
- invalid CSS color values are rejected;
- token values must be strings;
- theme schema version is required;
- theme names must be stable and lowercase with hyphens.

## 16. Desktop layout

Default desktop placement:

```text
bottom: max(24px, env(safe-area-inset-bottom))
right: max(24px, env(safe-area-inset-right))
```

Panel:

```text
width: min(var(--sw-panel-normal-width, 520px), calc(100vw - 48px))
max-height: min(760px, calc(100vh - 48px))
```

Launcher:

```text
height: 64px
min-width: 184px
padding-inline: 24px
```

## 17. Mobile layout

Breakpoint: `max-width: 767px`.

Panel:

```text
left: 12px
right: 12px
bottom: max(12px, env(safe-area-inset-bottom))
width: auto
max-height: calc(100dvh - 24px)
border-radius: 22px
```

Mobile action rail:

```text
left: 12px
right: 12px
bottom: max(12px, env(safe-area-inset-bottom))
height: 72px
```

When panel is open, the mobile action rail is hidden.

## 18. Interaction rules

### Launcher

- Click opens panel.
- Enter and Space open panel.
- When there is an unread item, badge appears on launcher.
- Launcher label can be hidden on very narrow screens.

### Panel size

- Visitors can cycle open panel size from the header size button.
- Desktop size order: `normal` -> `wide` -> `fullscreen` -> `normal`.
- Mobile size order: `normal` -> `fullscreen` -> `normal`; `wide` resolves to `normal`.
- `normal` remains the default so the widget does not cover landing content unnecessarily.
- The selected size is stored per widget instance when local storage is available.

### Quick replies

- Click inserts configured text and submits immediately only when `quickReplySubmit="auto"`.
- Default behavior: click pre-fills the composer.
- Quick replies disappear after the first visitor message unless configured otherwise.

### Composer

- Enter submits.
- Shift+Enter inserts line break.
- Empty or whitespace-only text cannot be submitted.
- Max length default: 1000 characters.
- On submit, visitor message appears optimistically with pending state.
- If network request fails, pending message becomes retryable.

### Phone capture

- Phone field can appear after first message.
- Phone submission uses the same public session id.
- Phone field must not block sending a text message.

## 19. Response rendering

| Response status | Bubble text source | Visual status |
|---|---|---|
| `replied` | `automation.reply.text` | Assistant bubble with AI disclosure. |
| `fallback` | configured fallback text plus backend reason if safe to show | Neutral Marker. |
| `disabled` | configured manager review text | Neutral Marker. |
| network error | configured detailed copy in an atomic live region | Existing visitor bubble with one inline retry. |

AI disclosure default:

```text
Автоответ. Менеджер проверит детали и подтвердит условия.
```

## 20. Accessibility rules

- Launcher is `button`.
- Panel has `role="dialog"`.
- Close button label: `Закрыть виджет`.
- Minimize button label: `Свернуть виджет`.
- A focusable labelled region contains a `role="log"` transcript and an atomic status live region.
- Input label is available for screen readers.
- Focus is never trapped; the dialog is non-modal and Escape returns focus to the launcher.
- Escape closes or minimizes panel depending on config.
- All clickable controls are at least `44px` high.
- Focus ring uses `color.accent` with sufficient contrast.

## 21. Content safety display rules

- Message text is rendered as plain text.
- HTML from backend is not rendered in v1.
- URLs in text are not auto-linked in v1.
- Internal IDs are not displayed.
- Technical fallback reasons are mapped to user-safe text.

## 22. Example landing presets

### Memorial soft

```css
granit-site-widget[theme="memorial-soft"] {
  --sw-color-accent: #8a6f55;
  --sw-color-surface-panel: #fffdf9;
  --sw-color-surface-message-visitor: #f1e7dd;
  --sw-color-text-primary: #2f2d2a;
  --sw-radius-panel: 24px;
}
```

### Minimal dark accent

```css
granit-site-widget[theme="minimal-dark-accent"] {
  --sw-color-accent: #3c342d;
  --sw-color-surface-panel: #ffffff;
  --sw-color-surface-message-visitor: #efefef;
  --sw-color-text-primary: #1f1f1f;
  --sw-radius-panel: 18px;
}
```

### Light catalog

```css
granit-site-widget[theme="light-catalog"] {
  --sw-color-accent: #7c8a6a;
  --sw-color-surface-panel: #fbfbf7;
  --sw-color-surface-message-visitor: #e9eee2;
  --sw-color-text-primary: #252821;
  --sw-radius-panel: 20px;
}
```

## 23. Design QA checklist

- Closed state does not cover primary CTA on desktop.
- Mobile rail does not cover cookie banner, checkout controls, or fixed navigation.
- Open panel fits within `100dvh` on mobile browsers.
- Long user and assistant messages wrap correctly.
- Empty, loading, replied, fallback, disabled, and error states are visually distinct.
- Focus ring is visible on every control.
- Text remains readable after theme override.
- Theme override does not require rebuilding widget code.
- Copy can be changed per landing.
- Layout works on light image backgrounds and plain solid backgrounds.

## 24. MessageScroller contract

- Stable message IDs key every transcript row.
- The viewport follows the bottom only while it is already at the live edge (8px threshold).
- Wheel, touch, scroll keys, scrollbar interaction, and explicit message jumps release follow mode.
- A new visitor turn anchors at a 40px reading line. Its tail spacer is consumed as the reply grows.
- Prepending history preserves the first visible stable ID and viewport-relative offset.
- Resize and reopen preserve free-reading mode; reduced motion changes explicit smooth jumps to `auto`.
- Resize/listener/observer state is runtime-only and is disconnected with the host.

## 25. Mock-only photo boundary

The picker is rendered only for `mock && attachmentsEnabled && showAttachmentSlot`.
Production `site_widget.v1` is always text-only and renders no disabled or future-photo promise.

Mock preview rules:

- up to three JPEG, PNG, or WebP files;
- 5 MiB per file, 15 MiB total, and 24 million decoded pixels;
- signature, declared MIME, and decoder validation;
- partial batch acceptance with one consolidated error;
- text remains mandatory;
- object URLs are revoked on remove, config switch, clear, disconnect, and cancelled in-flight work;
- `File`, filename, MIME, size, and `blob:` URL never enter requests, events, storage, `WidgetState`, or `WidgetMessage`.

Production photos are deferred to an upload endpoint plus `site_widget.v2`, which should carry only
opaque normalized `upload_id` references.

## 26. AI-agnostic frontend boundary

The backend/AI layer owns prompts, qualification fields, question count, completion criteria, and
manager handoff. The widget has no workflow state for those concepts. It only sends visitor text and
renders backend-confirmed messages and safe automation states.

## 27. Verification

The package gate is:

```text
npm run check
npm test
npm run build
npm run test:browser
```

Playwright covers MessageScroller layout, retry, strict v1 payloads, mock photos, accessibility,
desktop/mobile/landscape geometry, keyboard flow, and visual screenshots.

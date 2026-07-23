# План реализации: chat primitives, MessageScroller и mock-фото

Статус: готов к запуску в новой сессии
Дата: 2026-07-10
Пакет: `packages/site-widget`
Спецификация: `docs/superpowers/specs/2026-07-10-site-widget-chat-primitives-design.md`
Объясняющая страница: `output/site-widget-project-refresher.html`

## 1. Цель новой сессии

Реализовать одобренную спецификацию в текущем Lit/Web Component пакете, не меняя backend и строгий DTO `site_widget.v1`.

Критический бизнес-инвариант:

```text
site widget -> operations API -> Postgres persistence -> manager visibility
```

Виджет остаётся входной точкой лидов. Backend/AI-слой может вести настраиваемый многошаговый диалог, но frontend:

- не знает число AI-turns;
- не содержит список квалификационных полей;
- не определяет prompt/workflow или момент передачи менеджеру;
- только отправляет visitor messages и отображает подтверждённую backend-последовательность сообщений и состояний.

## 2. Жёсткие ограничения

1. Не изменять `granit-operations` и другие backend-репозитории.
2. Не добавлять `attachments`, base64 или multipart в `site_widget.v1`.
3. Production v1 остаётся text-only и не показывает недоступную кнопку фото.
4. Фото доступны только при `mock && attachmentsEnabled && showAttachmentSlot`.
5. Не добавлять React, Tailwind, `@shadcn/react`, AI SDK или новые публичные Custom Elements.
6. Не использовать `unsafeHTML` для сообщений, marker, ошибок или подписей.
7. Сохранить tag, методы, attrs, events, CSS variables и существующие `::part`.
8. Не переносить scroll-state или File objects в domain reducer, public events или storage.
9. Не кодировать в виджете AI-сценарий, число вопросов или критерий завершения квалификации.
10. Не начинать `site_widget.v2`; только оставить совместимую frontend-границу для будущего `upload_id`.

## 3. Ожидаемый результат

- MessageScroller не срывает человека вниз при чтении истории.
- Есть live-edge, turn anchors, сохранение позиции и jump-to-latest.
- Один сетевой сбой создаёт одну error-зону и один inline retry.
- Assistant/visitor используют Message primitives; fallback/disabled используют Marker.
- Production v1 не показывает photo UI.
- Mock-режим поддерживает до трёх JPEG/PNG/WebP preview без изменения request body.
- Виджет плотнее, работает на `320×568`, имеет видимый focus и hit areas минимум 44px.
- Unit, component, browser, accessibility и build проверки проходят.

## 4. Подготовка новой сессии

### 4.1 Прочитать контекст

В начале сессии прочитать полностью:

```text
docs/superpowers/specs/2026-07-10-site-widget-chat-primitives-design.md
docs/superpowers/plans/2026-07-10-site-widget-chat-primitives-implementation.md
packages/site-widget/README.md
packages/site-widget/design.md
packages/site-widget/src/components/granit-site-widget.ts
packages/site-widget/src/components/widget-message.ts
packages/site-widget/src/domain/state.ts
packages/site-widget/src/domain/view-model.ts
packages/site-widget/src/domain/request.ts
packages/site-widget/src/domain/response.ts
packages/site-widget/src/types/public.ts
packages/site-widget/src/styles/widget.styles.ts
packages/site-widget/src/styles/message.styles.ts
packages/site-widget/tests/domain.test.ts
packages/site-widget/tests/component.test.ts
```

Не проводить повторный продуктовый research и не пересматривать одобренные решения без нового запроса пользователя.

### 4.2 Проверить baseline

Из `packages/site-widget` выполнить:

```powershell
npm ci
npm run check
npm test
npm run build
```

Ожидаемый baseline перед изменениями:

- TypeScript check проходит;
- 14 существующих тестов проходят;
- production build проходит;
- ESM gzip остаётся примерно в текущем диапазоне 22–23 kB до изменений.

Перед редактированием выполнить `git status --short`. Не трогать неизвестные пользовательские изменения.

## 5. Целевая структура файлов

Добавить:

```text
packages/site-widget/src/controllers/message-scroller-controller.ts
packages/site-widget/src/controllers/image-attachment-controller.ts
packages/site-widget/src/domain/image-attachments.ts
packages/site-widget/src/components/widget-attachments.ts
packages/site-widget/tests/image-attachments.test.ts
packages/site-widget/tests/browser/widget.spec.ts
packages/site-widget/tests/browser/message-scroller.spec.ts
packages/site-widget/tests/fixtures/message-scroller.html
packages/site-widget/playwright.config.ts
```

Изменить:

```text
packages/site-widget/src/components/granit-site-widget.ts
packages/site-widget/src/components/widget-message.ts
packages/site-widget/src/domain/state.ts
packages/site-widget/src/domain/view-model.ts
packages/site-widget/src/domain/config.ts
packages/site-widget/src/types/public.ts
packages/site-widget/src/styles/widget.styles.ts
packages/site-widget/src/styles/message.styles.ts
packages/site-widget/src/ui/icons.ts
packages/site-widget/tests/domain.test.ts
packages/site-widget/tests/component.test.ts
packages/site-widget/package.json
packages/site-widget/package-lock.json
packages/site-widget/design-tokens.json
packages/site-widget/design.md
packages/site-widget/README.md
```

Не создавать отдельные `granit-widget-message`, `message-bubble` или другие registered Custom Elements.

## 6. Этап 1 — исправить domain-модель ошибки

### 6.1 Сначала тесты

В `tests/domain.test.ts` добавить проверки:

- `submit.failed` не увеличивает `messages.length`;
- только текущий pending visitor message получает `status: "error"`;
- `pending.messageId`, `pending.text` и `pending.idempotencyKey` сохраняются;
- `retry.started` меняет тот же message обратно на `pending`;
- повторный failure не создаёт дубликат;
- failed message не становится `sent` без `visitor.persisted` для его id;
- новый submit блокируется, пока существует unresolved pending/error;
- fallback и disabled сохраняют собственный `systemKind`.

Сначала убедиться, что новые тесты падают на текущей реализации.

### 6.2 Реализация

В `src/types/public.ts`:

```ts
export type WidgetSystemKind = "fallback" | "disabled";

export type WidgetMessage = {
  // существующие поля
  systemKind?: WidgetSystemKind | undefined;
};
```

Поле additive и не должно ломать внешних потребителей.

В `src/domain/state.ts`:

- расширить `createWidgetMessage` необязательным `systemKind`;
- action `system.message` сохраняет `fallback` или `disabled` в message;
- `submit.failed` только помечает pending visitor message как `error`;
- не добавлять system error message;
- сохранить `pending` до retry/success/clear;
- убрать фильтрацию старого system error из `retry.started`;
- `visitor.persisted` обновляет только message с текущим pending id;
- не очищать error другого сообщения через `clearErrorStatuses`;
- не позволять параллельный второй submit при unresolved pending.

В `src/domain/view-model.ts`:

```ts
canSend = !state.submitting && !state.pending && !draftError;
```

Retry остаётся отдельным разрешённым действием.

### 6.3 Проверка этапа

```powershell
npx vitest run tests/domain.test.ts
npm run check
```

Рекомендуемый commit:

```text
Fix widget message error state model
```

## 7. Этап 2 — Message primitives и Marker

### 7.1 Рендер-контракт

Преобразовать `src/components/widget-message.ts` в внутренний renderer без нового Shadow DOM:

```ts
type WidgetMessageRenderContext = {
  config: SiteWidgetConfig;
  onRetry: (messageId: string) => void;
  images?: readonly WidgetAttachmentView[];
};

renderChatItem(message, context)
renderMessageRoot(message, context)
renderMessageBubble(message, context)
renderMessageMeta(message, context)
renderMessageActions(message, context)
renderMarker(message, context)
```

`renderChatItem` выбирает:

- `assistant`/`visitor` → MessageRoot/Bubble/Meta/Actions;
- `system` → Marker.

### 7.2 Parts и DOM

Assistant/visitor:

```text
message-root
  message + message-<role> + message-bubble
  message-meta
    message-status
    message-actions
      retry-button
```

System:

```text
message + message-system + marker
  marker-icon
  marker-text
```

Сохранить старые parts на соответствующих новых элементах. Добавить новые parts из спецификации.

### 7.3 Статусы

- pending: spinner/иконка + `Отправляем…`;
- sent: без лишней рамки и без обязательного статуса;
- error: `Не отправлено · Повторить` под visitor bubble;
- assistant disclosure: отдельная meta-строка;
- fallback/disabled: нейтральный Marker, не bubble;
- локальная transport error не создаёт Marker.

`config.errorMessage` использовать в отдельном доступном live-region как подробный текст.

### 7.4 Тесты

В `tests/component.test.ts` добавить:

- определяется только `<granit-site-widget>`;
- assistant/visitor имеют новые и старые parts;
- system fallback/disabled имеет `marker`, `message`, `message-system`;
- fetch failure создаёт один error bubble и одну retry button;
- retry вызывает второй fetch, но visitor bubble остаётся один;
- оба запроса используют одинаковый `idempotency_key`;
- backend HTML-looking text остаётся plain text.

### 7.5 Проверка этапа

```powershell
npx vitest run tests/domain.test.ts tests/component.test.ts
npm run check
```

Рекомендуемый commit:

```text
Add widget chat message primitives and markers
```

## 8. Этап 3 — MessageScrollerController

### 8.1 Controller API

Создать `src/controllers/message-scroller-controller.ts` как внутренний Lit `ReactiveController`, но не хранить hot scroll state в Lit `@state`.

Минимальный API:

```ts
type MessageScrollerItem = {
  id: string;
  scrollAnchor: boolean;
};

type MessageScrollerSnapshot = {
  mode: "following-bottom" | "free-scrolling" | "anchored-to-message" | "settling-jump";
  canScrollStart: boolean;
  canScrollEnd: boolean;
  newItemCount: number;
};

connect(elements): void;
reconcile(items: readonly MessageScrollerItem[]): void;
scrollToEnd(options?): boolean;
scrollToMessage(messageId, options?): boolean;
disconnect(): void;
getSnapshot(): MessageScrollerSnapshot;
```

Controller вызывает `host.requestUpdate()` только когда меняется UI-снимок кнопки/latest status, а не на каждый scroll pixel.

### 8.2 DOM в GranitSiteWidgetElement

Использовать Lit `repeat()` по `message.id`:

```text
message scroller root
├── viewport[role="region"][aria-label="Сообщения"]
│   └── content[role="log"][aria-relevant="additions"]
│       ├── item[data-message-id][data-scroll-anchor]
│       └── tail spacer
└── jump-to-latest button
```

Сохранить старый `part="messages"` на transcript content и добавить:

```text
message-viewport
jump-latest
```

### 8.3 Алгоритм

Константы первой реализации:

```ts
SCROLL_EDGE_THRESHOLD = 8;
PREVIOUS_ITEM_PEEK = 40;
SMOOTH_SCROLL_CLEAR_MS = 180;
SCROLL_EPSILON = 0.5;
```

Реализовать:

- первое непустое открытие → end;
- follow только если viewport уже у live edge;
- release по `wheel`, `touchmove`, `ArrowUp`, `ArrowDown`, `Home`, `End`, `PageUp`, `PageDown`, `Space`, scrollbar drag и explicit message jump;
- рост content не отключает follow;
- `scrollToEnd()` возвращает following-bottom;
- новый visitor item является turn anchor;
- anchor располагается у reading line с 40px previous peek;
- tail spacer уменьшается при росте ответа;
- `ResizeObserver` следит за viewport/content;
- Lit `updated()` вызывает `reconcile`, поэтому `MutationObserver` не нужен;
- scroll/data-attribute commits агрегируются через `requestAnimationFrame`;
- prepend сохраняет первый видимый stable message id и viewport-relative offset;
- `IntersectionObserver` создаётся только при подписке на visibility;
- fallback без observers остаётся работоспособным;
- `prefers-reduced-motion` отключает smooth behavior.

### 8.4 Удалить старый долг

Удалить безусловные:

```ts
this.scrollMessagesToBottom();
messages.scrollTop = messages.scrollHeight;
```

Не заменять их новым безусловным вызовом в `updated()`.

### 8.5 Browser fixture и тесты

На этом этапе добавить минимальный `playwright.config.ts` с Vite webServer и script:

```json
{
  "scripts": {
    "test:browser": "playwright test"
  }
}
```

Этап 7 расширит эту инфраструктуру widget/a11y/visual coverage; не создавать второй config.

Добавить `tests/fixtures/message-scroller.html`, который импортирует controller через Vite и создаёт управляемый transcript для layout-тестов.

В `tests/browser/message-scroller.spec.ts` проверить реальные размеры DOM:

- follow у live edge;
- отсутствие follow при чтении истории;
- release по wheel и keyboard;
- latest возвращает follow;
- anchor + tail spacer;
- prepend сохраняет первый видимый id;
- изменение высоты ответа не создаёт скачок;
- reopen/resize сохраняет корректный режим;
- reduced motion использует auto behavior.

### 8.6 Проверка этапа

```powershell
npm run check
npm test
npx playwright test tests/browser/message-scroller.spec.ts
```

Рекомендуемый commit:

```text
Add message scroller behavior controller
```

## 9. Этап 4 — чистая проверка фотографий

### 9.1 Константы и типы

В `src/domain/image-attachments.ts` определить:

```ts
MAX_IMAGE_COUNT = 3;
MAX_IMAGE_BYTES = 5 * 1024 * 1024;
MAX_TOTAL_IMAGE_BYTES = 15 * 1024 * 1024;
MAX_IMAGE_PIXELS = 24_000_000;

type AllowedImageMime = "image/jpeg" | "image/png" | "image/webp";
```

`MAX_IMAGE_PIXELS` защищает preview от чрезмерного декодированного bitmap. Это frontend guard, не security boundary.

### 9.2 Pure helpers

Реализовать независимо тестируемые функции:

```ts
detectImageMime(bytes: Uint8Array): AllowedImageMime | undefined;
validateImageLimits(candidate, existing): ImageValidationError | undefined;
validateDeclaredMime(declared, detected): boolean;
formatImageValidationMessage(rejections): string;
```

Сигнатуры:

- JPEG: `FF D8 FF`;
- PNG: полные 8 magic bytes;
- WebP: `RIFF` и `WEBP` с offset 8.

Расширению файла не доверять. MIME может быть пустым, но при наличии должен совпасть с detected type.

### 9.3 Unit tests

В `tests/image-attachments.test.ts` покрыть:

- три разрешённые сигнатуры;
- spoofed MIME;
- SVG/GIF/PDF/ZIP/HEIC и случайные bytes;
- ровно 5 MiB и превышение на 1 byte;
- ровно 3 файла и четвёртый файл;
- ровно 15 MiB total и превышение;
- partial batch;
- единый понятный validation message.

### 9.4 Проверка этапа

```powershell
npx vitest run tests/image-attachments.test.ts
npm run check
```

Не подключать UI до прохождения pure tests.

## 10. Этап 5 — ImageAttachmentController и mock UI

### 10.1 Controller ownership

Создать `src/controllers/image-attachment-controller.ts`.

Controller хранит только runtime-memory:

```ts
draft: DraftImageAttachment[];
byMessageId: Map<string, DraftImageAttachment[]>;
validationMessage: string;
```

Каждый descriptor содержит:

```ts
id;
name;
mimeType;
sizeBytes;
width;
height;
previewUrl;
file;
```

Ничего из этого не попадает в request/events/storage.

### 10.2 Validation flow

Для каждого выбранного File:

1. проверить count/per-file/total limits;
2. прочитать первые bytes;
3. определить magic signature;
4. сопоставить MIME;
5. декодировать через `createImageBitmap`, с fallback на `HTMLImageElement`;
6. проверить `width * height <= 24_000_000`;
7. только после успеха создать постоянный object URL;
8. принять валидную часть batch и сообщить об отклонённых файлах одной строкой.

Всегда сбрасывать `input.value` после change.

### 10.3 Cleanup

`URL.revokeObjectURL()` обязателен:

- при удалении draft-фото;
- при очистке сессии;
- при смене config из mock/attachments-enabled в production/disabled;
- в `disconnectedCallback`;
- при удалении message attachment из runtime registry.

### 10.4 UI

Создать `src/components/widget-attachments.ts`:

- `renderAttachmentPicker`;
- `renderAttachmentPreviewList`;
- `renderMessageAttachments`.

Показывать picker только при:

```ts
config.mock && config.attachmentsEnabled && config.showAttachmentSlot
```

Production v1 не рендерит ни picker, ни disabled paperclip, ни marker «будут доступны позже».

UI:

- кнопка `Добавить фото`;
- hidden input с `accept="image/jpeg,image/png,image/webp"` и `multiple`;
- preview list над composer;
- thumbnail, `Фото N`, размер, remove button;
- remove hit area минимум 44px;
- `role="alert"` для validation error;
- polite live-region для количества;
- текст сообщения остаётся обязательным.

### 10.5 Mock-submit

После `submit.started` получить `pending.messageId` и передать ownership draft-фото этому message id.

- существующий mock client продолжает получать только текстовый v1 request;
- visitor bubble в runtime transcript показывает связанные preview;
- failure сохраняет фото у того же pending id;
- retry использует те же preview и idempotency key;
- success оставляет preview в mock transcript до clear/disconnect.

Никогда не показывать фото отправленными в production v1.

### 10.6 Regression tests

Добавить component tests:

- production v1 не содержит picker;
- mock + enabled содержит picker;
- request body не содержит `attachments`, filename, base64 или File;
- invalid file показывает alert;
- valid preview можно удалить;
- input reset позволяет выбрать тот же файл повторно;
- object URLs revoke-ятся;
- mock failure/retry сохраняет preview;
- одни фото без текста нельзя отправить.

### 10.7 Проверка этапа

```powershell
npx vitest run tests/image-attachments.test.ts tests/component.test.ts
npm run check
```

Рекомендуемый commit:

```text
Add mock-only image attachment previews
```

## 11. Этап 6 — плотность, responsive и accessibility

### 11.1 Tokens

Обновить CSS/design tokens:

```text
--sw-panel-normal-width: 520px
--sw-panel-wide-width: 640px
header: 92–96px
body padding: 18px 20px 14px
message gap: 10–12px
bubble padding: 12px 14px
composer shell: 14px 20px 18px
interactive hit areas: >=44px
default memorial accent target: #8a6f55 или эквивалент с WCAG AA
```

Не удалять существующие CSS variables.

### 11.2 Header

- default показывает resize + close;
- minimize element и part остаются в DOM для compatibility, но скрыты default CSS;
- mobile icon buttons не уменьшаются ниже 44px;
- title/status не перекрываются на 320px.

### 11.3 Composer и transcript

- `.body`, viewport и content получают корректный `min-height: 0`;
- composer остаётся доступным при высоте 568px;
- textarea/phone font-size минимум 16px на mobile;
- composer имеет заметный `:focus-within`;
- quick replies имеют horizontal strip и видимый edge cue;
- focus quick reply приводит chip в видимую область;
- footer не вытесняет composer.

### 11.4 ARIA и focus

- launcher получает `aria-controls` id панели;
- dialog использует `aria-labelledby` title id;
- viewport — focusable labelled `role="region"`;
- content — `role="log"`, `aria-relevant="additions"`;
- submitting отражается через `aria-busy`;
- pending/error меняются через отдельный atomic live-region;
- latest/retry/remove — настоящие buttons с доступными именами;
- Escape закрывает немодальный dialog и возвращает focus launcher;
- focus trap не добавлять;
- `prefers-reduced-motion` отключает smooth scrolling и transitions.

### 11.5 Component tests

Проверить:

- `aria-controls` ссылается на существующую panel;
- `aria-labelledby` ссылается на title;
- live region существует и atomic;
- `aria-busy` меняется при submit;
- старые parts присутствуют в релевантных состояниях;
- новые parts присутствуют;
- minimize part сохранён, хотя default CSS скрывает кнопку.

### 11.6 Проверка этапа

```powershell
npm test
npm run check
npm run build
```

Рекомендуемый commit:

```text
Refine widget responsive design and accessibility
```

## 12. Этап 7 — Playwright, accessibility и visual regression

### 12.1 Инфраструктура

Расширить созданный на этапе MessageScroller `playwright.config.ts`. Сохранить Vite webServer на фиксированном локальном порту и не использовать production backend.

В `package.json` добавить:

```json
{
  "scripts": {
    "test:browser": "playwright test",
    "test:all": "npm run check && npm test && npm run build && npm run test:browser"
  }
}
```

Добавить `@axe-core/playwright` только как dev dependency. Runtime bundle от этого не меняется.

### 12.2 Widget browser tests

В `tests/browser/widget.spec.ts` покрыть:

- open/close/focus return;
- normal/wide/fullscreen;
- success, fallback, disabled, error и retry;
- один error bubble;
- одинаковый idempotency key retry;
- mock attachments с 1 и 3 фото;
- production v1 без photo UI;
- request body strict v1;
- quick replies;
- keyboard-only flow;
- axe audit открытого idle/error/fallback/mock-attachment состояния.

API ответы перехватывать через Playwright routing. Не обращаться к внешнему backend.

### 12.3 Viewports

Обязательные:

```text
1440×900 desktop normal/wide
390×844 mobile
320×568 small mobile
667×375 landscape
```

Assertions:

- нет horizontal overflow;
- composer доступен;
- header actions видимы;
- hit areas >=44px;
- quick replies дают edge cue;
- footer не вытесняет composer.

### 12.4 Visual snapshots

Зафиксировать Playwright screenshots:

```text
idle-desktop
replied-desktop
error-desktop
fallback-desktop
mock-attachments-desktop
idle-mobile-390
error-mobile-320
fullscreen-landscape
```

Не принимать baseline автоматически при визуальном дефекте. Проверить изображения вручную.

### 12.5 Browser-harness QA

После автоматических тестов использовать обязательный browser-harness workflow:

1. запустить локальный built widget;
2. screenshot initial state;
3. проверить interaction coordinates и Shadow DOM;
4. снять desktop/mobile/error/mock-photo screenshots;
5. проверить free-scrolling и jump-to-latest вручную;
6. убедиться, что server/process остановлен после QA.

### 12.6 Проверка этапа

```powershell
npm run test:browser
npm run test:all
```

Рекомендуемый commit:

```text
Add widget browser and accessibility regression coverage
```

## 13. Этап 8 — документация и финальная совместимость

Обновить:

- `README.md` — production v1 text-only, mock photo preview, browser tests;
- `design.md` — MessageScroller behavior, primitives, Marker, density, parts, AI-agnostic frontend boundary;
- `design-tokens.json` — новые additive width/density tokens;
- примеры — показать mock photo mode только в development example;
- список supported `::part`.

Зафиксировать явно:

- AI qualification workflow находится в backend/AI-слое;
- frontend не ограничивает количество вопросов;
- фото production появятся только после upload endpoint + `site_widget.v2`;
- будущий message DTO должен ссылаться на нормализованные `upload_id`, а не доверять browser metadata.

Проверить public compatibility:

```text
tag: granit-site-widget
methods: open, close, sendMessage, clearSession
events: granit-site-widget:* + aliases
attributes/config: существующие значения
CSS variables: существующие значения
parts: все старые + новые additive
request: strict site_widget.v1
```

Рекомендуемый commit:

```text
Document widget chat primitives and photo boundaries
```

## 14. Финальная верификация

### 14.1 Автоматическая

Из `packages/site-widget`:

```powershell
npm run check
npm test
npm run build
npm run test:browser
```

Все команды должны завершиться exit code 0.

### 14.2 Bundle

Записать итоговые размеры:

```text
dist/site-widget.esm.js raw/gzip
dist/site-widget.iife.js raw/gzip
dist/loader.js raw/gzip
```

Увеличение объяснить MessageScroller и mock-photo логикой. Проверить, что React/Tailwind отсутствуют в dependency graph и bundle text.

### 14.3 Ручная приёмка

- новое сообщение не срывает пользователя, читающего историю;
- latest возвращает live edge;
- retry создаёт одну error-зону;
- fallback/disabled выглядят как Marker;
- production v1 не показывает фото;
- mock preview принимает только JPEG/PNG/WebP и до 3 файлов;
- запросы/events/storage не содержат файлов или metadata;
- AI multi-turn диалог отображается как обычная последовательность backend-confirmed сообщений без frontend workflow;
- 320×568 и 390×844 не имеют horizontal overflow;
- все controls доступны клавиатурой;
- host CSS не ломает Shadow DOM;
- public methods/events/parts работают.

### 14.4 Git hygiene

Перед сдачей:

```powershell
git status --short
git diff --check
git diff --stat
```

Не включать `dist`, `test-artifacts`, `output`, `.codex`, временные screenshots и server logs в commit.

## 15. Порядок commits

Рекомендуемая последовательность:

```text
1. Fix widget message error state model
2. Add widget chat message primitives and markers
3. Add message scroller behavior controller
4. Add mock-only image attachment previews
5. Refine widget responsive design and accessibility
6. Add widget browser and accessibility regression coverage
7. Document widget chat primitives and photo boundaries
```

Каждый commit должен проходить релевантные тесты своего этапа. Не объединять все изменения в один трудно проверяемый commit.

## 16. Риски и контрольные точки

### Scroll regressions

Риск: browser layout отличается от jsdom. Контроль: основные scroll assertions только в Playwright/реальном браузере.

### Object URL leaks

Риск: preview URL остаются после remove/disconnect. Контроль: unit spies на `createObjectURL/revokeObjectURL` и browser cleanup case.

### Ложная отправка фото

Риск: пользователь считает фото отправленным через v1. Контроль: production picker отсутствует, request regression проверяет strict JSON.

### Public CSS breakage

Риск: перемещение retry/marker ломает host overrides. Контроль: старые parts сохраняются, component test проверяет compatibility snapshot.

### AI coupling

Риск: frontend начнёт кодировать поля или число вопросов. Контроль: не добавлять AI workflow state/types/config; browser tests используют многошаговую последовательность как обычные messages.

### Performance

Риск: Lit rerender на каждый scroll. Контроль: plain controller fields, rAF batching и requestUpdate только при изменении visible UI snapshot.

### Test duration

Текущий Vitest на Node 24 тратит большую часть времени на jsdom environment. Не считать долгий startup зависанием; использовать file-filtered runs по этапам и полный suite перед сдачей.

## 17. Готовый prompt для новой сессии

```text
Реализуй полностью одобренный дизайн site widget из:

- docs/superpowers/specs/2026-07-10-site-widget-chat-primitives-design.md
- docs/superpowers/plans/2026-07-10-site-widget-chat-primitives-implementation.md

Начни с baseline check и выполняй план по этапам. Не пересматривай продуктовые решения и не подключай backend.

Критические ограничения:
- site_widget.v1 остаётся strict text-only JSON;
- production не показывает photo UI;
- фото работают только в mock && attachmentsEnabled && showAttachmentSlot;
- frontend не знает AI workflow, поля квалификации или число вопросов;
- сохранить Web Component API, events, CSS variables/parts и plain-text safety;
- MessageScroller должен быть проверен в реальном браузере;
- после каждого этапа запускай указанные тесты;
- в конце выполни check, unit/component tests, build, Playwright и visual QA.

Работай до полного прохождения критериев приёмки. Не изменяй granit-operations.
```

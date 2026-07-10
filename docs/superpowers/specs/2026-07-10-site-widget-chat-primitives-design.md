# Дизайн: chat primitives, MessageScroller и frontend-only фото

Статус: одобрено пользователем, готово к реализации
Дата: 2026-07-10
Область: `packages/site-widget`

## 1. Цель

Обновить текущий Lit-виджет по модели новых chat primitives shadcn, не подключая React, Tailwind или `@shadcn/react` runtime и не меняя backend-контракт `site_widget.v1`.

Виджет остаётся входной точкой для лидов с сайта. Он не превращается в полноценный мессенджер или автоматическую систему продаж.

Критический бизнес-путь:

```text
site widget -> operations API -> Postgres persistence -> manager visibility
```

Бизнес-инварианты:

- посетитель быстро пишет вопрос или заявку, не уходя в телефон или мессенджер;
- backend сохраняет `lead`, `conversation` и входящее `message` до того, как сайт показывает успех;
- менеджер видит сохранённый диалог в панели и продолжает обработку заявки;
- `public_session_id` позволяет браузеру продолжать тот же диалог;
- вместе с лидом сохраняются контакт, страница, UTM, referrer и visitor context;
- фотографии ускоряют квалификацию лида: показывают участок, старый памятник, референс или повреждение.

### 1.1 Роль AI

AI — настраиваемый безопасный ассистент, работающий только внутри `granit-operations` после сохранения входящего сообщения. Создание лида не зависит от доступности AI. Backend/AI-слой владеет сценарием квалификации: нужными данными, порядком и количеством вопросов, условиями завершения и моментом передачи менеджеру.

AI может:

- быстро ответить на первое сообщение;
- вести многошаговый диалог и собирать настраиваемый набор данных;
- задавать столько уточняющих вопросов, сколько требует backend-сценарий;
- объяснить общие вещи про памятники, материалы, оформление и этапы;
- определить готовность квалификации и передать менеджеру собранный контекст.

AI не может:

- называть финальную цену или обещать сроки;
- подтверждать гарантию, договор, скидку, наличие, оплату или рассрочку;
- давать юридические, похоронные или наследственные советы;
- обращаться к OpenAI напрямую из браузера;
- видеть секреты, внутренние ID или брать коммерческие обязательства.

Если AI недоступен или ответ не проходит safe gate, входящее сообщение остаётся сохранённым, а виджет показывает manager fallback.

Виджет не знает и не должен знать число AI-turns, набор собираемых полей, prompt, workflow или критерий завершения квалификации. Frontend только отправляет visitor messages и отображает подтверждённую backend-последовательность сообщений и состояний.

Результат должен:

- не срывать пользователя вниз, когда он читает историю;
- показывать одну понятную ошибку с локальным retry;
- разделить message, bubble, meta, actions и system marker;
- стать плотнее и лучше работать на небольших мобильных экранах;
- подготовить frontend для максимум трёх фотографий без ложной отправки в текущий backend;
- сохранить публичную Web Component границу и безопасность plain-text рендера.

## 2. Зафиксированные решения

1. Единственный публичный Custom Element остаётся `<granit-site-widget>`.
2. Новые primitives реализуются как Lit template-функции и внутренние controller-классы в одном Shadow DOM.
3. `site_widget.v1` остаётся строгим JSON-контрактом без `attachments`, base64 и multipart.
4. Production при `site_widget.v1` остаётся text-only: фото-кнопка и сообщение «будут доступны позже» скрыты.
5. Полный frontend-only photo preview доступен только при `mock && attachmentsEnabled && showAttachmentSlot`.
6. В mock-режиме фото живут только в памяти вкладки и могут визуально переходить из composer в visitor message. Они не добавляются в HTTP payload, events или storage.
7. Текст сообщения остаётся обязательным даже при выбранных фото.
8. Реальная отправка фото откладывается до отдельного upload endpoint и `site_widget.v2`.
9. Визуальный источник истины — текущий `main`, `ref.png` и `chat_widget_mockup.html`; приложенный error-state используется как пример проблемы, а не как кодовая база.

## 3. Не входит в работу

- backend upload и изменение `granit-operations`;
- `site_widget.v2` runtime-интеграция;
- документы, архивы, SVG, GIF, HEIC, видео и drag-and-drop;
- markdown/HTML сообщения, reactions, edit/copy actions;
- виртуализация истории;
- сохранение истории или файлов в `localStorage`;
- новые публичные вложенные Custom Elements;
- React Context, hooks, Tailwind/CVA и AI SDK bindings.

## 4. Целевая архитектура

```text
<granit-site-widget>
├── header
├── MessageScrollerController
│   └── viewport[role="region"]
│       └── content[role="log"]
│           ├── MessageRoot
│           │   ├── MessageBubble
│           │   ├── MessageMeta
│           │   └── MessageActions
│           ├── Marker
│           └── tail spacer
├── JumpToLatest
└── composer
    ├── ImageAttachmentController (только mock preview)
    ├── AttachmentPreviewList
    ├── textarea
    └── send
```

Рекомендуемые внутренние единицы:

- `MessageScrollerController` — scroll modes, live edge, anchors, observers и команды;
- `ImageAttachmentController` — выбор, проверка, object URL и ownership mock-превью;
- `renderChatItem` — маршрутизация message или marker;
- `renderMessageRoot`, `renderMessageBubble`, `renderMessageMeta`, `renderMessageActions`;
- `renderMarker`;
- `renderAttachmentPreviewList`.

Controller-ы не регистрируют Custom Elements. Горячее scroll-состояние хранится в plain fields и DOM attributes, а не в Lit reactive state.

## 5. MessageScroller

### 5.1 DOM-контракт

```text
root
├── viewport[role="region"][aria-label="Сообщения"]
│   └── content[role="log"][aria-relevant="additions"]
│       ├── item[data-message-id][data-scroll-anchor]
│       ├── item[data-message-id]
│       └── tail spacer
└── button «К новым сообщениям»
```

Список рендерится keyed-директивой Lit `repeat()` по стабильному `message.id`.

### 5.2 Режимы

Внутреннее состояние:

```ts
type MessageScrollerMode =
  | "following-bottom"
  | "free-scrolling"
  | "anchored-to-message"
  | "settling-jump";
```

Правила:

- первое непустое открытие располагается в конце;
- live-edge threshold — `8px`;
- follow сохраняется только если пользователь уже находился у live edge;
- wheel, touchmove, scroll keys, scrollbar drag и `scrollToMessage` переводят в free-scrolling;
- рост ответа сам по себе не отключает follow;
- `scrollToEnd()` и кнопка latest возвращают following-bottom;
- программное слежение использует `behavior: "auto"`;
- явная кнопка latest использует `smooth`, кроме `prefers-reduced-motion`.

### 5.3 Turn anchors

- Новое visitor message получает `data-scroll-anchor="true"`.
- При создании turn anchor выравнивается по reading line.
- Над ним остаётся `40px` контекста предыдущего сообщения.
- Tail spacer уменьшается по мере роста ответа.
- После исчерпания spacer controller переходит в following-bottom.

### 5.4 Изменение размеров и история

- `ResizeObserver` следит за viewport/content и изменением высоты rich rows.
- Lit `updated()` вызывает явный `reconcile(items)`; `MutationObserver` не нужен.
- DOM/data-attribute commits объединяются через `requestAnimationFrame`.
- При prepend сохраняются первый видимый `messageId` и его положение относительно viewport; после render компенсируется только реальная delta.
- `IntersectionObserver` создаётся лениво только для visibility/current-anchor подписки.
- Кнопка latest появляется, если конец не виден; при новых элементах может показывать `Новые сообщения`.

### 5.5 Жизненный цикл

- listeners и observers подключаются после первого render viewport;
- resize/reopen вызывает reconcile без принудительного сброса чтения;
- `disconnectedCallback` снимает listeners и disconnect-ит observers;
- scroll controller не попадает в domain reducer и public events.

## 6. Message, Bubble, Meta, Actions и Marker

### 6.1 Message primitives

```html
<div class="message-root message-root--visitor"
     part="message-root"
     data-message-id="…">
  <article class="message message--visitor"
           part="message message-visitor message-bubble">
    <p class="message__text">…</p>
  </article>
  <div class="message-meta" part="message-meta">
    <span part="message-status">Не отправлено</span>
    <div part="message-actions">
      <button part="retry-button">Повторить</button>
    </div>
  </div>
</div>
```

Ответственность:

- `MessageRoot` — alignment, stable id и композиция;
- `MessageBubble` — только поверхность текста/фото;
- `MessageMeta` — pending, error и AI disclosure;
- `MessageActions` — только retry в текущем scope;
- весь внешний текст остаётся Lit text binding без `unsafeHTML`.

### 6.2 Единая транспортная ошибка

`submit.failed`:

- меняет существующее pending visitor message на `error`;
- не добавляет system error message;
- сохраняет `pending.messageId`, исходный текст и `idempotencyKey`;
- показывает одну строку `Не отправлено · Повторить` под bubble;
- повторная отправка меняет тот же message обратно на `pending` и использует прежний ключ;
- новый submit блокируется, пока текущая ошибка не разрешена retry или очисткой сессии;
- `config.errorMessage` сохраняется и используется в atomic live-region как подробное объяснение.

Failed message не может стать `sent` из-за отправки другого текста. Статус `sent` устанавливается только после `visitor.persisted` для текущего pending id.

### 6.3 Marker

Fallback и disabled рендерятся не bubble, а нейтральным Marker:

```html
<div class="marker"
     part="message message-system marker"
     role="status">
  <span part="marker-icon" aria-hidden="true"></span>
  <span part="marker-text">Менеджер проверит детали и ответит вам.</span>
</div>
```

В `WidgetMessage` добавляется необязательный additive `systemKind?: "fallback" | "disabled"`, чтобы история не выводила variant из последнего глобального `state.status`.

## 7. Frontend-only фотографии

Фотографии не являются отдельной продуктовой веткой. Они сокращают время квалификации уже созданного лида и помогают менеджеру быстрее понять задачу.

### 7.1 Доступность функции

Photo UI показывается только если одновременно истинны:

```text
config.mock
&& config.attachmentsEnabled
&& config.showAttachmentSlot
```

При production `site_widget.v1` кнопка полностью отсутствует. Disabled paperclip и marker «Вложения будут доступны позже» не рендерятся.

### 7.2 UX

- Название действия: `Добавить фото`.
- До 3 фото.
- JPEG, PNG или WebP.
- До 5 MiB на фото, до 15 MiB суммарно.
- Preview strip находится над composer.
- Каждый элемент содержит thumbnail, `Фото N`, размер и кнопку удаления.
- Текст обязателен; одни фото отправить нельзя.
- Допускается частичное принятие batch: валидные фото добавляются, причины отклонения остальных объявляются один раз.
- Ложный upload progress не показывается.

### 7.3 Локальная модель

`ImageAttachmentController` владеет:

- draft-массивом `File` и descriptors;
- registry `messageId -> attachments` для mock transcript;
- созданием и освобождением object URLs;
- validation result и focus target после удаления.

Ни `File`, ни имя, ни `blob:` URL не попадают в domain request, browser events или storage. При mock-submit ownership object URLs переходит к visitor message; при remove, clear session и disconnect вызывается `URL.revokeObjectURL()`.

После каждого выбора `input.value` сбрасывается, чтобы тот же файл можно было выбрать повторно.

### 7.4 Проверка в браузере

`accept="image/jpeg,image/png,image/webp"` является только UX-фильтром. Controller дополнительно проверяет:

1. count, per-file и total-size limits;
2. JPEG signature `FF D8 FF`;
3. полную восьмибайтовую PNG signature;
4. WebP `RIFF` и `WEBP` на offset 8;
5. совпадение заявленного MIME с сигнатурой либо пустой MIME;
6. успешное декодирование через image decoder;
7. разумный предел пикселей до создания постоянного preview.

SVG, GIF, HEIC, PDF, ZIP и несовпадающие данные отклоняются. Это UX-защита, а не backend security boundary.

### 7.5 Поведение mock и production

- В mock message text проходит через существующий mock client.
- Фото визуально переходят в созданное visitor message, но не включаются в request.
- При mock network error фото сохраняются у того же pending message для retry.
- Production v1 не позволяет выбрать фото и никогда не отбрасывает их молча.
- Request builder остаётся точным `site_widget.v1` и получает отдельный regression test на отсутствие attachments/base64/file metadata.

## 8. Будущий backend `site_widget.v2`

Предпочтителен двухэтапный flow:

1. Upload endpoint принимает одно изображение, повторно валидирует, декодирует, удаляет metadata и пересохраняет raster.
2. Endpoint возвращает непрозрачный `upload_id`, привязанный к widget/session и ограниченный TTL.
3. `site_widget.v2` отправляет только `kind: "image"` и `upload_id`.
4. Browser filename, MIME и size считаются недоверенными display metadata.
5. Retry переиспользует upload ids; idempotency учитывает упорядоченный список ids.

```json
{
  "schema_version": "site_widget.v2",
  "message": {
    "role": "visitor",
    "text": "Похожий памятник",
    "attachments": [
      { "kind": "image", "upload_id": "uuid" }
    ]
  }
}
```

Backend обязан повторить лимиты 3/5 MiB/15 MiB, не раздавать оригинал и хранить нормализованные изображения вне webroot/private object storage.

## 9. Плотность и responsive

Целевые default tokens:

- normal panel: `520px`;
- wide panel: `640px`;
- header: `92–96px`, padding `18px 20px`;
- body: `18px 20px 14px`;
- message gap: `10–12px`;
- bubble padding: `12px 14px`;
- composer shell: примерно `14px 20px 18px`;
- все интерактивные hit areas: минимум `44×44px`;
- интерактивный memorial accent: контраст не ниже WCAG AA; базовый ориентир `#8a6f55`.

Новые размеры задаются additive variables `--sw-panel-normal-width` и `--sw-panel-wide-width`. Существующие variables не удаляются.

Дополнительно:

- `.body` и scroller viewport получают `min-height: 0`;
- quick replies остаются горизонтальным strip с видимым edge cue;
- keyboard focus приводит chip в видимую область;
- textarea и phone input на mobile имеют минимум `16px`;
- fullscreen учитывает `100dvh` и все safe-area insets;
- на `320×568` header и composer остаются доступны;
- default header показывает resize и close; существующий minimize element/part сохраняется для совместимости, но скрыт default-стилем;
- footer/disclaimer не вытесняет composer.

## 10. Accessibility

- Launcher сохраняет `aria-expanded` и получает `aria-controls` id панели.
- Dialog использует `aria-labelledby` заголовка.
- Viewport — focusable labelled `role="region"`; transcript — `role="log"`.
- `aria-busy` отражает submitting/stream-like update.
- Pending/error объявляются отдельным atomic live-region; изменение существующей строки не зависит только от `aria-relevant="additions"`.
- Error содержит текст, не только красную рамку.
- Composer получает заметный `:focus-within` ring.
- Latest и retry — настоящие buttons.
- Все icon-only controls имеют доступные имена; декоративные иконки скрыты.
- Photo previews — список `aria-label="Выбранные фото"`; remove label включает номер фото.
- Validation error использует `role="alert"`, изменение количества — polite live-region.
- Escape закрывает немодальный dialog и возвращает focus launcher; focus trap не добавляется.
- `prefers-reduced-motion` отключает smooth scrolling и transitions.

## 11. Публичная совместимость

Сохраняются:

- tag name;
- методы `open`, `close`, `sendMessage`, `clearSession`;
- существующие attributes/config options;
- события `granit-site-widget:*` и aliases;
- `site_widget.v1` DTO;
- plain-text safety gate;
- существующие CSS variables и parts.

Старые parts остаются на семантически соответствующих элементах: `messages`, `message`, `message-assistant`, `message-visitor`, `message-system`, `message-disclosure`, `retry-button`, header/composer/contact/mobile parts.

Добавляются parts:

```text
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
```

## 12. Ошибки и edge cases

- Один failed request создаёт одну error-поверхность и одну retry action.
- Повторный failure не добавляет сообщения.
- Retry сохраняет message id, фото и idempotency key.
- Mode/config switch с draft-фото сначала очищает фото и revoke URLs; silent drop при submit запрещён.
- Invalid batch может быть принят частично, но выдаёт единое понятное объяснение.
- Если `ResizeObserver` или `IntersectionObserver` недоступен, базовый scroll остаётся рабочим без visibility enhancement.
- Reopen не сбрасывает пользователя вниз, если он находился в free-scrolling; новый session/open с одним intro message начинается в конце.
- Unknown backend automation status продолжает проходить через существующий safe fallback gate.

## 13. Тестирование

### Domain/Vitest

- `submit.failed` не увеличивает `messages.length`;
- error применяется только к pending visitor message;
- retry сохраняет id и idempotency key;
- failed message не становится sent без `visitor.persisted`;
- fallback/disabled сохраняют `systemKind`;
- request `site_widget.v1` не содержит attachments, File, filename или base64.

### Attachment unit/component

- magic bytes для JPEG/PNG/WebP и spoofed MIME;
- границы 3 фото, 5 MiB и 15 MiB;
- partial batch и повторный выбор того же файла;
- create/revoke object URL при remove, clear и disconnect;
- production v1 не рендерит photo UI;
- mock preview, remove, validation, submit и retry;
- текст остаётся обязательным.

### MessageScroller browser tests

- follow у live edge;
- сохранение позиции при чтении истории;
- release по wheel/touch/keyboard/drag;
- jump-to-latest возвращает follow;
- turn anchor и tail spacer при росте ответа;
- prepend сохраняет первый видимый message id;
- resize/reopen не создают скачок;
- reduced motion отключает smooth behavior.

### Component/a11y/visual

- defined только один публичный Custom Element;
- одна error surface и один retry;
- fallback/disabled рендерятся Marker;
- `aria-controls`, `aria-labelledby`, live status и `aria-busy`;
- plain-text/XSS regression;
- desktop `1440×900`: normal, wide, replied, error, fallback, mock attachments;
- mobile `390×844`, `320×568`, landscape `667×375`;
- отсутствие horizontal overflow;
- hit areas не меньше 44px;
- keyboard flow launcher → textarea → send/retry → Escape;
- visual snapshots до и после нового сообщения при free-scrolling.

Финальная проверка:

```text
npm run check
npm test
npm run build
```

## 14. Критерии приёмки

- Новый ответ не срывает пользователя, читающего историю.
- Latest button корректно возвращает к live edge.
- Один failed request даёт один error state и один retry.
- Retry не создаёт новый bubble и использует прежний idempotency key.
- Assistant/visitor используют Message primitives; fallback/disabled используют Marker.
- Production `site_widget.v1` остаётся text-only и никогда не обещает отправку фото.
- Mock-режим показывает до трёх валидных фото и корректно освобождает ресурсы.
- HTTP body и browser events не содержат фото или их metadata.
- На `320×568` и `390×844` нет горизонтального overflow, composer доступен.
- Все hit areas не меньше 44px и keyboard focus видим.
- Публичные методы, attrs, events, CSS variables и старые parts продолжают работать.
- Bundle не получает React/Tailwind runtime.
- Все существующие и новые тесты, typecheck и build проходят.

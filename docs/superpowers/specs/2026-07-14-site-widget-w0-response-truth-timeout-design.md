# W0: подтверждённое сохранение и честный timeout site widget

Дата: 2026-07-14
Статус: одобрено владельцем как часть W0 Live Widget UX

## Цель

Виджет должен реагировать на submit сразу, но считать visitor message сохранённым и показывать
AI reply только после строгого подтверждения неизменённого `site_widget.v1`. При transport или
protocol failure исходный текст и idempotency key остаются в одной retryable bubble.

## Рассмотренные подходы

1. Оставить permissive mapper и проверять только `automation.status`. Это минимальная правка, но
   может показать неподтверждённый reply и ложно отметить visitor message сохранённым.
2. Валидировать только HTTP status и `public_session_id`. Это защищает session continuity, но не
   доказывает `accepted/replayed`, `show_widget_saved` и persisted message identities.
3. Выбранный: fail-closed receipt boundary. Реальный response сначала проходит структурную
   проверку обязательных корневых полей и automation variant; только затем UI применяет receipt.

## Дизайн

- `mapSiteWidgetResponse` принимает только успешный `site_widget.v1` receipt: `ok: true`,
  `schema_version: "site_widget.v1"`, root `status` из `accepted|replayed`,
  `action: "show_widget_saved"`, валидные UUID session и visitor public message.
- Root и каждый nested variant принимают только опубликованный allowlist полей; reply/disclosure
  сохраняют contract length limits. Лишнее поле или превышение лимита является protocol failure.
- Для `automation.status: "replied"` дополнительно обязательны persisted reply UUID,
  `sender_role: "ai_assistant"`, непустой text, корректные `next_step` и disclosure. Visitor и
  reply identities должны отличаться.
- `fallback`/`disabled` проходят только со своим contract-compatible `next_step`; fallback reason
  ограничен опубликованным enum. Текст marker берётся из root `message_to_user` с безопасным
  локальным fallback.
- Production response view model несёт server receipt и IDs. Mock response помечен отдельно и не
  выдаётся за server persistence proof.
- Для уже установленной public session response обязан вернуть тот же UUID. Mismatch не меняет
  storage/state, оставляет bubble retryable и не показывает automation result.
- Локальная visitor bubble остаётся `pending` до receipt, после чего получает явный status
  `saved` и server public message ID. Replay применяет тот же pending message и idempotency key.
  Ошибка оставляет один status `error` с inline retry и не создаёт assistant bubble.
- Total server deadline фиксирован в 20 000 мс: provider/backend budget 15 000 мс плюс
  ограниченный network/persistence allowance 5 000 мс. Default browser timeout — 25 секунд,
  нормализация не допускает значение меньше 20 001 мс, а intake client реально abort'ит fetch по
  browser deadline.

## Проверки

- Unit: accepted/replayed receipts, все обязательные identity/action/status поля, protocol
  rejection, timeout default/floor/invariant, explicit saved state.
- Component: accepted и replay отмечают только текущую bubble как saved; invalid receipt остаётся
  retryable; escaping, idempotency и session continuity сохраняются.
- Playwright: искусственно задержанный HTTP response доказывает visitor pending bubble и отдельный
  sending status не позднее 300 мс; после release response bubble становится saved. Отдельный
  replay сценарий доказывает одну bubble и тот же idempotency key.

## Вне scope

Backend contract, streaming/SSE/WebSocket, model/API вызовы, landing vendor files, deploy,
production enablement, npm publish и release tag не меняются.

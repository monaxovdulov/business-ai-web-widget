# Design: Mastra + observability после `site-widget.v1`

Дата: 2026-07-14  
Статус: одобрено владельцем 2026-07-14  
Тип: cross-repo follow-up design, без реализации и deploy

## Контекст

Текущий goal выпускает уже реализованный `site-widget.v1` через CI, staging, приёмку и
управляемый release. Он не должен расширяться изменениями backend или AI runtime.

Безопасный website AI уже существует в `granit-operations` как S05/S06 baseline и вызывает
OpenAI через текущий provider adapter. Mastra runtime пока не подключён. Канально-нейтральная
AI-граница начата, но до Mastra нужны app-owned записи AI runs/quality events, видимые
менеджеру degradation/handoff outcomes, review/eval linkage и утверждённые versioned AI assets.

## Решение

После приёмки `site-widget.v1` следующим AI-направлением становится отдельный путь:

```text
site-widget.v1 acceptance
  -> завершение neutral AI boundary и app-owned quality/trace foundation
  -> Mastra runtime + observability на staging
  -> S08 Telegram AI parity через тот же AI boundary
  -> S10 bad dialog -> sanitized eval -> regression
```

Это уточняет практический порядок внутри принятой последовательности S01-S15, но не
перенумеровывает её и не добавляет Mastra в scope текущего widget-релиза.

Календарная дата внедрения не назначается. Переход между этапами определяется evidence и
acceptance criteria, а не только завершением предыдущего коммита.

## Архитектурная граница

`granit-operations` и его Postgres остаются источником истины для заявки, клиента,
идентичности канала, диалога, сообщений, takeover, handoff, delivery, AI run, review label и
eval reference.

Mastra работает внутри operations app за typed AI boundary и может:

- оркестрировать один ограниченный AI turn;
- вызывать только app-approved tools;
- возвращать typed candidate decision;
- создавать trace/scorer metadata;
- запускать eval/regression cases над тем же behavior boundary.

Mastra не может:

- отправлять сообщение клиенту напрямую;
- писать business state напрямую в Postgres;
- обходить persistence, policy validation, outbox или send-time gate;
- становиться источником customer identity, lead status, takeover или manager assignment;
- предоставлять публичные Mastra routes или публичный Studio.

Отдельный Mastra Studio service не входит в первый staging slice. Локальный/dev Studio можно
рассматривать только как диагностический интерфейс; любое staging-доступное Studio требует
отдельного решения по auth, network access, redaction, retention и cleanup.

## Компоненты первого staging slice

1. `AiTurnInput` и compact context, не зависящие от widget DTO или Telegram update.
2. App-owned orchestrator/policy/send gate, сохраняющие окончательную власть приложения.
3. `MastraAiRunner` за узким интерфейсом, чтобы direct OpenAI adapter оставался rollback path.
4. `AiRunRecorder` или эквивалентная app-owned quality event model.
5. Связь AI run с `conversation_id`, `message_id`, `lead_id`, policy/prompt/model/tool versions и
   внутренним trace id.
6. Redaction до любого внешнего trace export; public API не возвращает внутренние trace/eval
   поля.
7. Staging-only feature flag и kill switch, не включающие production автоматически.

## Поток данных

```text
channel adapter
  -> inbound persistence in granit-operations
  -> app-owned conversation state + compact context
  -> deterministic prechecks
  -> Mastra runner behind typed boundary
  -> typed candidate decision + trace metadata
  -> app policy/schema validation
  -> send-time takeover gate
  -> app-owned message/handoff/degradation persistence
  -> channel delivery through app-owned outbox/sender
  -> sanitized trace/review/eval linkage
```

Telegram на S08 использует этот же AI boundary, policy, tool schemas, trace contract и
send-time gate. Mastra channels не заменяют Telegram adapter или delivery outbox.

## Ошибки и деградация

- Ошибка Mastra, модели, tool или trace export не должна терять входящее сообщение.
- Клиент получает только безопасный fallback, если app policy и send-time gate разрешают
  отправку.
- Менеджер получает app-owned видимый degradation/handoff item.
- Неудачный trace export не блокирует customer workflow, но фиксируется как operational
  failure без утечки персональных данных.
- Kill switch возвращает AI path на текущий direct provider/fallback без изменения канального
  транспорта и business state.

## Observability и evals

Observability вводится вместе с первым Mastra staging slice, а не после Telegram AI:

- run/trace linkage;
- latency, model/tool failure и token/cost metadata;
- policy, prompt, model, tool и asset versions;
- handoff, fallback, blocked и degradation outcomes;
- redaction и retention rules.

S10 завершает quality loop:

```text
conversation/message/ai_run
  -> manager review label
  -> sanitization
  -> eval case
  -> regression run
  -> unsafe change blocked
```

Google Sheet может быть только ручным review input. Runtime и Mastra читают лишь
утверждённые versioned repo assets.

## Проверки перед staging

- Existing S05/S06 policy, persistence and takeover tests остаются зелёными.
- Mastra runner и direct adapter проходят одинаковые contract fixtures.
- Test доказывает, что takeover во время AI work блокирует stale reply.
- Test доказывает отсутствие direct send и direct business-DB writes из Mastra.
- Route inventory доказывает отсутствие публичных Mastra/Studio routes.
- Trace linkage содержит обязательные app-owned IDs и версии, но public response их не
  раскрывает.
- Redaction tests не допускают secrets и неразрешённые персональные данные во внешнем export.
- Disable/rollback smoke возвращает direct adapter/fallback без потери сообщений.
- Один заранее подготовленный sanitized regression case проходит через eval runner до допуска
  S08; manager-driven promotion реального плохого диалога остаётся S10.

## Acceptance criteria первого Mastra/observability slice

- Mastra включается только на staging отдельным flag и отключена по умолчанию.
- Один widget AI turn проходит через Mastra behind boundary и сохраняет app-owned run record.
- Менеджер может связать результат с диалогом и сообщением без использования Mastra как CRM.
- Failure path создаёт безопасный fallback и manager-visible degradation.
- Direct adapter остаётся проверенным rollback path.
- Production и Telegram AI outbound остаются выключенными.

## Не входит

- изменение scope или release gates `site-widget.v1`;
- production enablement;
- публичный Mastra Studio;
- Mastra channels как транспорт widget/Telegram;
- Mastra schedules для критичных delivery/background jobs;
- прямое чтение Google Sheet из runtime;
- autonomous commercial promises;
- новый identity/CRM source of truth.

## Документальная фиксация

Решение должно быть отражено в двух местах:

1. этот follow-up design и ссылка из текущего `site-widget.v1` release goal;
2. канонический `granit-plan-app`: task board, S01-S15 delivery note, Mastra current-state map
   и связанные Mastra/observability task docs.

Реализация начинается только отдельным implementation plan в `granit-operations` после
приёмки этой спецификации и проверки актуальных official Mastra docs/package versions.

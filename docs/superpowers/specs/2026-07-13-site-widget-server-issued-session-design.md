# Server-issued public session для site widget

Дата: 2026-07-13  
Статус: вариант 2 выбран владельцем для RC-исправления и staging-only проверки

## Контекст

Реальный staging UI дошел через CORS до operations API, но получил `400`: виджет отправил локально созданный `public_session_id` формата `sws_…`, тогда как опубликованный `site_widget.v1` требует UUID и Postgres хранит идентификатор в UUID-колонке.

## Решение

Operations backend становится единственным источником `public_session_id`.

1. При первом запуске виджет не создает публичную session локально и не записывает session key в storage.
2. Первый POST не содержит `public_session_id`; backend создает UUID и возвращает его в принятом ответе.
3. Виджет проверяет, что возвращенный идентификатор — UUID, затем сохраняет его в `sw:<widget-instance-id>:public_session_id`.
4. Все последующие сообщения и reload этой browser session используют сохраненный backend UUID.
5. Первый transport/protocol retry повторяет тот же message ID и idempotency key без `public_session_id`; backend не может получить два разных client-generated session ID.

## Migration старого storage

`getPublicSessionId()` принимает только UUID. Старые `sws_…`, пустые и другие некорректные значения удаляются и трактуются как отсутствие server-issued session. На следующем успешном сообщении storage получает backend UUID.

`setPublicSessionId()` также сохраняет только UUID. Некорректный идентификатор из ответа не становится состоянием следующего запроса.

## Response safety

Для реального `mock=false` ответа `202` без валидного `public_session_id` считается protocol failure: пользователь не должен видеть подтвержденную отправку, если виджет не может продолжить тот же backend dialog. UI показывает существующее безопасное error/retry состояние.

Mock mode остается изолированным и не используется как production persistence proof.

## Events и приватность

Первое событие `message-submitted` не содержит `publicSessionId` или `publicSessionIdHash`, потому что backend session еще не существует. Message text по-прежнему удаляется и заменяется `messageLength`. После принятого ответа последующие события могут содержать только hash server-issued UUID.

## Проверки

- новый store не создает session key до server response;
- legacy `sws_…` удаляется;
- UUID читается и сохраняется, невалидные значения отклоняются;
- первый request не содержит `public_session_id`;
- retry повторяет idempotency key и по-прежнему не содержит session id;
- валидный backend UUID сохраняется, следующий request отправляет его;
- missing/invalid UUID в real response дает безопасную ошибку;
- reload сохраняет только UUID и не хранит message text;
- полные typecheck, unit/component, build, browser, package/runtime release checks проходят;
- staging RC vendor bytes/manifest обновляются из проверенного widget commit;
- реальный browser-harness UI submit получает `202`, затем reload/second-message подтверждает UUID continuity без дублей.

## Ограничения

- без backend schema, DTO, DB, Caddy, DNS, AI и production изменений;
- без merge, tag, npm publish и GitHub Release;
- staging API host остается `https://manager.botops.ru` только в RC static branch.

## Rollback

Вернуть widget/static preview на предыдущие commits и runtime hashes. Backend CORS deployment и данные staging не требуют изменения схемы или rollback migration.

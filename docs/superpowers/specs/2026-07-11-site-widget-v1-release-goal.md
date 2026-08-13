# Goal: выпуск `site-widget.v1` через PR, CI, ZIP и приватный npm

Дата фиксации: 2026-07-11  
Статус: готово к выполнению в отдельной сессии  
Основной репозиторий: `C:\Users\user\Desktop\business-ai-web-widget`  
Пакет: `packages/site-widget`  
Репозиторий статического сайта на `giorno`: `/home/devuser/ai-projects/landing-granit-static`

## 1. Инструкция следующему агенту

Прочитать этот файл полностью и выполнить описанный goal по этапам. Не менять порядок
approval-gates и не считать внешнее действие разрешённым только потому, что оно описано в
этом документе. Пользователь должен отдельно попросить выполнить этот goal в новой сессии.

Работать автономно между явно указанными контрольными точками. Не спрашивать о решениях,
которые уже зафиксированы ниже. Если внешний доступ, секрет, staging-окружение или право на
публикацию отсутствует, завершить все безопасные локальные этапы, предъявить доказательства
и остановиться на соответствующем gate.

## 2. Цель

Довести уже реализованный `site-widget.v1` от чистого локального состояния до управляемого
релиза:

1. сохранить текущую реализацию в отдельной ветке;
2. добавить воспроизводимый GitHub CI;
3. проверить npm-состав и подготовить переносимый runtime ZIP;
4. открыть PR в `main`;
5. развернуть release candidate на отдельном staging статического сайта;
6. проверить работу с реальным backend и browser security policy;
7. после явной приёмки объединить PR, поставить тег и выпустить артефакты;
8. после отдельного разрешения обновить production-лендинг с возможностью отката;
9. оформить `site_widget.v2` как отдельную design-задачу, не реализуя backend или upload.

## 3. Исходное состояние, которое необходимо перепроверить

На момент подготовки goal:

- рабочее дерево основного репозитория было чистым;
- локальный `main` опережал `origin/main` на 16 продуктовых/документационных коммитов до
  добавления этого goal-файла;
- текущий продуктовый HEAD до goal-файла: `12e7734`;
- удалённый репозиторий: `https://github.com/monaxovdulov/business-ai-web-widget.git`;
- GitHub Actions в репозитории отсутствовали;
- git-теги отсутствовали;
- версия `packages/site-widget/package.json` была `1.0.0`;
- все заявленные проверки проходили: typecheck, 67 unit/component tests, production build,
  23 Playwright tests, 13 MessageScroller browser cases и axe без нарушений;
- локальный `main` нельзя сбрасывать, переписывать или заменять состоянием `origin/main`;
- backend не изменён и не входит в релизную реализацию `v1`.

Следующий агент обязан начать с повторной проверки `git status`, `git log`, `git fetch`,
доступных remotes, существующих веток, тегов и публикаций. Любые появившиеся пользовательские
изменения сохранить и не перезаписывать.

## 4. Зафиксированные решения

### 4.1 Релизный маршрут

Использовать маршрут:

`branch -> PR -> CI -> package validation -> staging -> acceptance -> merge -> tag -> release`

Прямой push текущего `main` в `origin/main` запрещён.

### 4.2 Ветка

Создать ветку от текущего локального состояния:

```text
codex/site-widget-chat-primitives
```

Если ветка уже существует, сначала доказать, что она указывает на нужную историю. Не удалять
и не force-push ветку без отдельного разрешения.

### 4.3 Каналы доставки

Использовать два канала из одного git-тега и одного исходного дерева:

1. приватный npm-пакет в GitHub Packages;
2. runtime ZIP для чистых статических сайтов.

CDN, публичный npmjs.org и отдельное object storage пока не использовать.

### 4.4 npm package identity

Переименовать npm-пакет:

```text
@granit/site-widget -> @monaxovdulov/site-widget
```

Registry:

```text
https://npm.pkg.github.com
```

Пакет должен оставаться приватным в GitHub Packages. Не добавлять `"private": true`, потому
что это запрещает `npm publish`. Настроить `publishConfig`, `repository` и scope mapping без
сохранения токенов в репозитории. Для GitHub Actions использовать `GITHUB_TOKEN`; токены
разработчиков должны приходить только через secret/environment configuration.

### 4.5 Выбор версии

До изменения версии проверить GitHub Packages и другие ранее использовавшиеся registry:

- если `1.0.0` нигде не публиковалась, оставить `1.0.0`;
- если `1.0.0` уже существует, использовать `1.1.0`;
- не перезаписывать существующую опубликованную версию;
- если наличие публикации невозможно проверить из-за отсутствия доступа, остановиться перед
  выбором версии и запросить доступ или подтверждение пользователя.

Git-тег использовать в формате:

```text
site-widget-v<version>
```

Каталог статического сайта использовать в формате:

```text
vendor/granit/site-widget/v<version>/
```

### 4.6 Статический сайт

Сайт не использует npm или сборщик. Его файлы раздаются Caddy напрямую. Текущий production
root:

```text
/var/www/landing-granit-static/
```

Текущий ручной deploy использует `rsync -av --delete`. Поэтому распакованный runtime должен
находиться в исходном репозитории `landing-granit-static`, а не копироваться только в
production root: иначе следующий deploy удалит его.

Целевая структура:

```text
vendor/
  granit/
    site-widget/
      v<version>/
        loader.js
        site-widget.esm.js
```

Версионные каталоги неизменяемые. Новая версия создаётся рядом со старой. Путь `/latest/`,
перезапись содержимого опубликованного каталога и удаление предыдущей рабочей версии не
используются.

### 4.7 Production browser contract

Статический сайт подключает loader со своего origin. Итоговый тег должен содержать реальный
backend URL и стабильный instance id, например по форме:

```html
<script
  defer
  src="/vendor/granit/site-widget/v<version>/loader.js"
  data-widget-instance-id="landing-main"
  data-api-base-url="<approved-backend-origin>">
</script>
```

Значение backend origin нельзя придумывать. Его нужно обнаружить в утверждённой конфигурации
окружения или получить от пользователя. В production запрещены `mock`,
`attachments-enabled`, `show-attachment-slot` в режиме mock и любые другие mock-only flags.

`loader.js` и `site-widget.esm.js` должны лежать рядом: loader вычисляет ESM URL относительно
собственного `src`.

### 4.8 Связанный follow-up: Mastra + observability

Этот follow-up зафиксирован владельцем 2026-07-14, но не расширяет scope текущего релиза.
После приёмки `site-widget.v1` следующий AI-путь планируется отдельно:

```text
site-widget.v1 acceptance
  -> neutral AI boundary + app-owned quality/trace foundation
  -> Mastra runtime + observability на staging
  -> S08 Telegram AI parity
  -> S10 bad dialog -> sanitized eval -> regression
```

Источник истины остаётся в `granit-operations` Postgres/app services. Mastra не получает
direct send, direct business-state writes или право обходить app-owned send-time gate.
Публичный Mastra Studio не одобрен.

Подробный дизайн:
`docs/superpowers/specs/2026-07-14-mastra-observability-follow-up-design.md`.

Этот пункт не разрешает backend/AI implementation, staging deploy AI или production
enablement внутри goal `site-widget.v1`; для них нужен отдельный implementation plan и
соответствующие approval/evidence gates.

## 5. Жёсткие границы scope

### Входит в goal

- ветка, scoped commits, push и draft PR;
- GitHub CI для текущего пакета;
- npm packaging metadata для GitHub Packages;
- `npm pack --dry-run` и smoke installation;
- воспроизводимый runtime ZIP и checksums;
- staging-интеграция со статическим лендингом;
- проверка CORS, CSP, MIME, network failures, retry и reconnect/live edge;
- выпуск private package и GitHub Release после approval;
- production deploy только после отдельного approval;
- отдельная design-спецификация `site_widget.v2` после завершения релиза `v1`.

### Не входит в goal

- изменение backend API или AI-workflow;
- production upload фотографий в `site_widget.v1`;
- квалификационные поля или frontend knowledge о числе вопросов;
- CDN, npmjs.org, Cloudflare R2, S3 или иной новый hosting;
- рефакторинг виджета, не требуемый CI, packaging или найденным release blocker;
- публикация секретов, registry tokens или backend credentials;
- реализация `site_widget.v2`.

## 6. Approval-gates

После явного поручения выполнить этот goal агент может без дополнительных вопросов:

- проводить read-only preflight;
- создавать локальные ветки и scoped commits;
- добавлять CI, release scripts и документацию;
- запускать локальные проверки;
- собирать локальные/CI release-candidate artifacts;
- push-ить согласованную feature branch;
- открыть draft PR;
- подготовить отдельную ветку интеграции в репозитории статического сайта;
- развернуть RC только в заранее существующее и явно идентифицированное staging-окружение.

Обязательное отдельное подтверждение пользователя требуется непосредственно перед:

1. merge PR в `main`;
2. созданием и push git-тега;
3. публикацией GitHub Release;
4. `npm publish` в GitHub Packages;
5. изменением production Caddy configuration или reload Caddy;
6. запуском `rsync --delete` или иной production deployment команды;
7. любым изменением backend;
8. удалением веток, версий, release assets или опубликованных packages.

Если отдельного staging root/домена нет, production root нельзя использовать как staging.
В этом случае остановиться после подготовки RC и запросить решение пользователя.

## 7. Этап 0 — preflight и baseline

1. Прочитать:
   - этот goal-файл;
   - `packages/site-widget/README.md`;
   - `packages/site-widget/package.json`;
   - `packages/site-widget/playwright.config.ts`;
   - существующие design/implementation docs;
   - `/home/devuser/ai-projects/landing-granit-static/README.md`;
   - `/home/devuser/ai-projects/landing-granit-static/DEPLOY.md`.
2. Проверить оба worktree и не затронуть несвязанные изменения.
3. Проверить GitHub authentication и права на repository/packages.
4. Проверить наличие версии package и выбрать `1.0.0` или `1.1.0` по правилу выше.
5. Зафиксировать версии Node/npm/Playwright, с которыми проходит baseline.
6. Из `packages/site-widget` выполнить:

```text
npm ci
npm run test:all
```

7. Если baseline не проходит, диагностировать причину. Не маскировать существующую ошибку
   изменением тестов и не продолжать release как будто gate зелёный.

## 8. Этап 1 — ветка и package metadata

1. Создать `codex/site-widget-chat-primitives` от текущего локального HEAD.
2. Обновить package identity до `@monaxovdulov/site-widget`.
3. Добавить корректные `repository` и `publishConfig`.
4. Настроить scope registry без токена в tracked files.
5. Проверить все README/import examples и заменить старое package name там, где речь идёт об
   устанавливаемом npm-пакете. Не переименовывать Web Component tag,
   `granit-site-widget:*` events или публичные browser API.
6. Запустить typecheck, unit/component tests и build.

## 9. Этап 2 — CI

Добавить GitHub workflow для PR и push в основной/feature branches. Workflow должен:

1. использовать Linux runner и поддерживаемую проектом LTS-версию Node;
2. использовать `packages/site-widget/package-lock.json` для npm cache;
3. выполнять `npm ci` в `packages/site-widget`;
4. устанавливать Chromium и системные зависимости Playwright;
5. отдельно отображать результаты:
   - `npm run check`;
   - `npm test`;
   - `npm run build`;
   - `npm run test:browser`;
6. загружать Playwright report только при ошибке или всегда с ограниченным retention;
7. иметь минимальные GitHub permissions и не получать package write permission в PR job;
8. не использовать secrets в workflow, исполняемом из недоверенного PR-кода.

Не сокращать gate до одного зелёного build без browser tests.

## 10. Этап 3 — npm package validation

1. Выполнить `npm pack --dry-run --json`.
2. Сохранить в PR summary:
   - итоговое имя и версию;
   - список верхнеуровневых файлов;
   - unpacked/packed size;
   - отсутствие секретов, тестовых fixtures и временных файлов.
3. Создать реальный tarball локально или в изолированном CI step.
4. Установить tarball в пустой временный проект и проверить:
   - ESM import package root;
   - наличие type declarations;
   - exports `site-widget.esm`, `iife`, `loader`, `tokens`;
   - отсутствие runtime dependency resolution errors.
5. После smoke test удалить только созданные временные каталоги и не удалять пользовательские
   файлы.

## 11. Этап 4 — runtime ZIP

Добавить воспроизводимый release script. Артефакт:

```text
granit-site-widget-v<version>.zip
```

Внутри ZIP должен быть один каталог `v<version>/` с файлами:

```text
v<version>/loader.js
v<version>/site-widget.esm.js
v<version>/manifest.json
```

`manifest.json` должен содержать package name, version, исходный git commit и SHA-256 runtime
файлов. Source maps, тесты, examples, type declarations и mock fixtures в runtime ZIP не
включать. Рядом сформировать SHA-256 самого ZIP.

Проверить архив распаковкой в новый временный каталог и browser smoke test через обычный
static HTTP server. Открытие через `file://` не считается валидным smoke test для ESM.

## 12. Этап 5 — commits, push и draft PR

1. Разбить изменения на небольшие осмысленные commits, например:
   - package identity and registry configuration;
   - CI workflow;
   - release archive and package smoke checks;
   - release documentation.
2. Повторно выполнить полный локальный gate.
3. Push-нуть только feature branch.
4. Открыть draft PR в `main`.
5. В PR описать:
   - исходные 16 локальных commits и новые release commits;
   - отсутствие backend изменений;
   - результаты всех проверок;
   - `npm pack` composition;
   - RC ZIP name/checksum;
   - известные external gates.
6. Дождаться зелёного CI. Ошибки исправлять в feature branch, не в `main`.

## 13. Этап 6 — staging статического сайта

### 13.1 Подготовка

1. На `giorno` проверить worktree и remote репозитория
   `/home/devuser/ai-projects/landing-granit-static`.
2. Создать отдельную ветку интеграции, не изменяя production branch напрямую.
3. Распаковать проверенный RC в:

```text
vendor/granit/site-widget/v<version>/
```

4. Сохранить runtime-файлы в исходном репозитории статического сайта, чтобы `rsync --delete`
   не удалил их.
5. Добавить loader tag на согласованную страницу с реальными production-like параметрами,
   но staging backend/environment.
6. Не включать mock-photo flags.

### 13.2 Развёртывание

Разворачивать только в отдельный staging root и staging hostname. Перед любой рекурсивной
копией или `rsync --delete` вывести и проверить абсолютные source/target paths. Если staging
не существует, остановиться и запросить решение; не создавать новую публичную инфраструктуру
и не подменять staging production-сайтом.

### 13.3 Проверки

Использовать `browser-harness` для browser QA и проверить как минимум:

- loader и ESM возвращают `200`, корректный JavaScript MIME и не дают 404;
- виджет монтируется один раз и не создаёт console errors;
- desktop, `390x844`, `320x568` и `667x375` landscape;
- открытие, закрытие, resize и отсутствие horizontal overflow;
- отправка текста в реальный staging backend;
- CORS preflight/POST при cross-origin backend;
- CSP `script-src`, `connect-src` и отсутствие CSP violations;
- backend success/replied, fallback/disabled и transport error -> retry;
- reconnect и live-edge поведение MessageScroller;
- события и storage не получают полный текст без opt-in;
- request остаётся `site_widget.v1` strict text-only;
- request/event/storage не получают файлы, filenames, MIME, blob URLs, base64 или mock metadata;
- перезагрузка страницы и отсутствие duplicate widget/session corruption;
- axe в ключевых состояниях.

Тестовые сообщения должны быть явно помечены как staging/test и не отправляться в production
customer workflow без согласования.

## 14. Этап 7 — отчёт о приёмке

До merge предоставить пользователю единый отчёт:

- URL draft PR;
- commit SHA проверенного RC;
- CI status и ссылки на checks;
- выбранная версия;
- npm pack composition и sizes;
- ZIP SHA-256;
- staging URL;
- browser/network/CORS/CSP/axe results;
- найденные ограничения и точный rollback procedure;
- подтверждение отсутствия backend и `site_widget.v1` contract changes.

Затем остановиться и запросить approval на merge/tag/publish.

## 15. Этап 8 — merge, tag и публикация

Выполнять только после явного approval.

1. Убедиться, что approved PR head и проверенный RC относятся к одной принятой source tree.
2. Merge PR в `main` выбранным пользователем способом.
3. Обновить локальный `main` безопасным fast-forward там, где это возможно.
4. Создать annotated tag `site-widget-v<version>` на принятом release commit.
5. Запустить release workflow, который повторяет полный test gate.
6. Создать private GitHub Package `@monaxovdulov/site-widget`.
7. Проверить установку опубликованной версии с `read:packages` в чистом проекте.
8. Создать GitHub Release и приложить:
   - `granit-site-widget-v<version>.zip`;
   - SHA-256 checksum;
   - npm tarball или его composition report, если дублировать tarball не требуется;
   - release notes и rollback instructions.
9. Проверить, что package visibility остаётся private.
10. Не публиковать CDN URL и не создавать `/latest/`.

## 16. Этап 9 — production статического сайта

Выполнять только после отдельного approval на production deploy.

1. Обновить интеграционную ветку статического сайта финальными release-файлами и checksum.
2. Убедиться, что старый versioned directory сохранён.
3. Проверить loader tag, backend origin и отсутствие mock flags.
4. Перед `rsync --delete` проверить абсолютный source root и
   `/var/www/landing-granit-static/` как target.
5. Выполнить команды из `DEPLOY.md` только в согласованном порядке и только после approval.
6. После deploy проверить HTTP headers, загрузку runtime, console/network, отправку сообщения и
   mobile layout.
7. При регрессии вернуть loader URL на предыдущий каталог и повторно развернуть статический
   сайт. Не удалять проблемную npm-версию автоматически; сначала остановить rollout и
   зафиксировать incident evidence.

## 17. Отдельный follow-up: design `site_widget.v2`

Этот этап не реализует код и не блокирует release `v1`.

После завершения релиза создать отдельную design-спецификацию с новым brainstorming/review
циклом. В ней спроектировать:

- upload-init/upload-complete или иной явный upload lifecycle;
- opaque `upload_id` вместо browser metadata в message request;
- server-side MIME/signature validation, pixel/size limits и normalization;
- malware scanning и безопасное удаление EXIF/metadata;
- authorization, rate limits, idempotency и abuse protection;
- retention, deletion, privacy, consent и auditability;
- частично завершённые/просроченные uploads;
- `site_widget.v2` schema negotiation и совместимость с strict text-only `v1`;
- fallback клиента на `v1`, если upload capability недоступна;
- observability и end-to-end тесты.

Backend архитектуру и storage provider не придумывать без изучения существующего backend.
После написания v2 design остановиться на пользовательском review gate. Реализация upload
endpoint, frontend production-photo flow и миграция backend являются отдельным будущим goal.

## 18. Definition of Done

Goal `v1 release` завершён только когда:

- feature branch опубликована и PR merged после approval;
- required CI зелёный;
- npm tarball проверен установкой;
- RC прошёл staging с реальным backend;
- tag существует на принятом release commit;
- GitHub Release содержит проверенный ZIP и checksum;
- `@monaxovdulov/site-widget@<version>` опубликован приватно и устанавливается;
- production static site обновлён после отдельного approval или пользователь явно исключил
  production deploy из этой сессии;
- rollback описан и практически возможен;
- backend и strict text-only contract `site_widget.v1` не изменены;
- итоговый отчёт содержит ссылки, SHA, версии и результаты проверок.

Если пользователь остановил работу на approval-gate, агент должен назвать достигнутый этап и
не объявлять весь goal завершённым.

## 19. Готовый prompt для новой сессии

```text
Выполни goal из
docs/superpowers/specs/2026-07-11-site-widget-v1-release-goal.md.

Сначала прочитай файл полностью и перепроверь исходное состояние. Работай автономно между
зафиксированными approval-gates. Не меняй backend и не реализуй site_widget.v2. Не делай
merge, tag, publish или production deploy без отдельного подтверждения в этой сессии.
```

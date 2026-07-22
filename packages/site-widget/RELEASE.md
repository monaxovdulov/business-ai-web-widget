# Выпуск `@monaxovdulov/site-widget`

Этот документ описывает выпуск private npm-пакета и runtime ZIP из одного
git-тега. Он не разрешает внешние действия сам по себе: merge, tag, GitHub
Release, `npm publish` и production deploy выполняются только после отдельных
подтверждений пользователя.

## Инварианты

- `site_widget.v2` остаётся strict text-only JSON без upload; rollout выполняется backend-first, а legacy `v1` response parser сохраняется на окно совместимости.
- Версия npm не перезаписывается. Перед её выбором проверяются GitHub Packages и
  ранее использованные registry.
- Единственный тег версии имеет вид `site-widget-v<version>`.
- npm-канал — private GitHub Packages package
  `@monaxovdulov/site-widget`.
- Runtime-канал — `granit-site-widget-v<version>.zip`; CDN и `/latest/` не
  используются.
- Каталог `v<version>/` неизменяемый. Предыдущие версии сохраняются для rollback.
- Токены не хранятся в репозитории. Actions использует только `GITHUB_TOKEN`;
  локальный доступ приходит из user/environment configuration.

## Поддерживаемый toolchain

- Node.js `24.14.0` (ветка Node 24 LTS);
- npm major `11`;
- Playwright `1.61.1`, Chromium из lockfile/toolchain пакета.

## Локальный release-candidate gate

Запускать из `packages/site-widget`:

```text
npm ci
npm run test:all
npm run verify:package
npm run release:runtime
npm run smoke:runtime
```

`verify:package` сравнивает `npm pack --dry-run --json` с реальным tarball,
устанавливает tarball в пустой временный проект, проверяет runtime exports и
TypeScript declarations, сканирует состав на secrets/fixtures/temp-файлы и
записывает `release-artifacts/package-composition.json`.

`release:runtime` принимает только runtime, совпадающий с текущим commit,
создаёт детерминированные ZIP и SHA-256 и проверяет точный состав архива:

```text
v<version>/loader.js
v<version>/site-widget.esm.js
v<version>/manifest.json
```

`smoke:runtime` распаковывает ZIP во временный каталог, раздаёт его обычным
HTTP server и в Chromium проверяет loader, ESM, JavaScript MIME, одиночный mount
и отсутствие console/page errors. Проверка через `file://` запрещена.

Флаг `--allow-dirty-runtime` у ZIP builder предназначен только для разработки.
Такой manifest помечается как dirty и не является release candidate.

## Draft PR и приёмка

До merge PR должен содержать:

- результаты `check`, unit/component, build и Playwright;
- package composition, packed/unpacked sizes и результат secret scan;
- имя ZIP, SHA-256 и source commit;
- staging URL и browser/network/CORS/CSP/axe результаты;
- подтверждение совместимых backend `site_widget.v2` acknowledgement/history контрактов и сохранённого legacy `v1` response path;
- известные внешние gates и rollback.

Runtime кладётся в отдельном репозитории статического сайта по пути
`vendor/granit/site-widget/v<version>/`. Loader подключается со своего origin:

```html
<script
  defer
  src="/vendor/granit/site-widget/v<version>/loader.js"
  data-widget-instance-id="landing-main"
  data-api-base-url="<approved-backend-origin>">
</script>
```

Backend origin берётся только из утверждённой конфигурации. В production tag
не допускаются `mock`, `attachments-enabled`, `show-attachment-slot` или другие
mock-only flags.

Текущий live-host использует versioned releases под
`/srv/granit-prod/site/releases/` и независимые `site-preview`/`site-prod`
promotion lanes. Устаревший `/var/www/landing-granit-static` и ручной
`rsync --delete` не применяются. Точные команды берутся из актуального checkout
репозитория статического сайта после `fetch`, а не из старой локальной копии.

## Tag, package и GitHub Release

После приёмки и отдельных approvals:

1. merge approved PR;
2. создать annotated tag `site-widget-v<version>` на принятом commit;
3. вручную запустить `Site Widget Release` на этом tag сначала без write-флагов;
4. после approval включить `publish_package` для private GitHub Package;
5. проверить установку опубликованной версии в чистом проекте;
6. после отдельного approval включить `create_github_release` и приложить ZIP,
   checksum и package-composition report.

Workflow всегда повторяет полный gate и отказывается работать, если выбранный
ref, tag, package version и source commit не совпадают.

## Rollback

Package version и GitHub Release не удаляются автоматически. При проблеме
rollout останавливается, сохраняются console/network/CI evidence, а loader tag
статического сайта возвращается на предыдущий неизменяемый
`vendor/granit/site-widget/v<previous-version>/loader.js`. Затем прежний
проверенный static-site commit продвигается через соответствующий preview/prod
lane. Проблемный versioned каталог сохраняется до разбора инцидента.

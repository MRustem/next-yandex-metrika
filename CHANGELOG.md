# Changelog

## [0.0.8] - 2024-12-30

### ✨ Основные изменения

#### 🔧 Обновления зависимостей
- Обновлены все devDependencies до последних версий
- Улучшена совместимость с Next.js 15.x и React 19.x
- Добавлена поддержка новых версий TypeScript и ESLint

#### 📦 Изменения в peerDependencies
- `next`: `^14.2.11` → `>=14.0.0` (более гибкий диапазон)
- `react`: `^18.3.1` → `>=18.0.0` (поддержка React 19)
- `react-dom`: `^18.3.1` → `>=18.0.0` (поддержка React 19)
- Добавлены `peerDependenciesMeta` для лучшего управления

#### 🚀 Улучшения usePageViews
- **BREAKING**: Заменён `next/router` на `next/navigation`
- Добавлена полная поддержка App Router
- Улучшено отслеживание изменений hash в URL
- Лучшая типизация с `declare global`

#### ⚙️ Конфигурационные изменения
- Обновлён `tsconfig.json` с современными настройками
- Мигрирован на новый ESLint 9 с flat config
- Добавлен `.npmrc` для избежания конфликтов с peer deps
- Улучшен `tsup.config.ts` с внешними зависимостями

#### 🛠️ Технические улучшения
- Добавлен `type: "module"` в package.json
- Исправлен порядок в exports (types первый)
- Улучшена обработка ошибок в console.warn
- Добавлена поддержка Node.js >=18.0.0

### 📝 Миграция

Для пользователей библиотеки:
1. Обновите зависимости: `npm update`
2. Если используете App Router, убедитесь что `usePageViews` в client component
3. При проблемах с peer deps добавьте в `.npmrc`:
   ```
   auto-install-peers=true
   strict-peer-dependencies=false
   legacy-peer-deps=false
   ```

### 🏗️ Разработчикам
- Добавлен современный ESLint конфиг
- Обновлены все dev-зависимости
- Улучшена сборка с tsup
- Добавлены файлы миграции и changelog

### 🐛 Исправления
- Исправлены конфликты с legacy-peer-deps
- Убраны неиспользуемые ESLint правила
- Исправлена проблема с incremental в TypeScript
- Улучшена типизация глобальных переменных 
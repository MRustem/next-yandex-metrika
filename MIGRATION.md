# Руководство по миграции на версию 0.0.8

## Основные изменения

### 1. Обновлённые зависимости
- Обновлены все dev-dependencies до последних версий
- Улучшена совместимость с Next.js 15.x и React 19.x

### 2. Изменения в peer dependencies
```json
{
  "peerDependencies": {
    "next": ">=14.0.0",    // Было: "^14.2.11"
    "react": ">=18.0.0",   // Было: "^18.3.1"
    "react-dom": ">=18.0.0" // Было: "^18.3.1"
  }
}
```

### 3. Улучшений в usePageViews
- **КРИТИЧНО**: Хук теперь использует `usePathname` и `useSearchParams` из `next/navigation`
- Удалена зависимость от `next/router` для лучшей совместимости с App Router
- Добавлена поддержка обоих роутеров (Pages Router и App Router)

### 4. Обновления TypeScript конфигурации
- Обновлён target до ES2020
- Улучшена настройка модулей
- Добавлена поддержка bundler module resolution

## Как мигрировать

### Для проектов на Pages Router
Никаких изменений в коде не требуется - библиотека остаётся обратно совместимой.

### Для проектов на App Router  
Убедитесь, что компонент `usePageViews` используется в клиентских компонентах:

```tsx
'use client'
import { usePageViews } from '@koiztech/next-yandex-metrika'

export default function MyComponent() {
  usePageViews()
  // ... остальной код
}
```

## Решение проблем с peer dependencies

Если возникают конфликты с peer dependencies, добавьте в ваш `.npmrc`:

```
auto-install-peers=true
strict-peer-dependencies=false
legacy-peer-deps=false
```

Или используйте флаги при установке:
```bash
npm install --legacy-peer-deps=false
```

## Проверка совместимости

После обновления проверьте, что всё работает:

```bash
npm run build
npm run lint  # если есть
```

## Поддержка

При возникновении проблем создайте issue на GitHub с указанием:
- Версии Next.js, React
- Используемого роутера (Pages/App)
- Полного текста ошибки 
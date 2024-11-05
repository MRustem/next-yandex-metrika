# @koiztech/next-yandex-metrika

Other languages: [English](README.md)

> ВАЖНО: Этот пакет находится в стадии разработки.

React-компонент и хук для интеграции Яндекс.Метрики в ваше Next.js приложение (версия 14 и выше).

## Установка

Установите пакет:

```bash
npm install @koiztech/next-yandex-metrika
# или
pnpm add @koiztech/next-yandex-metrika
```

Добавьте ID счётчика Яндекс.Метрики в переменные окружения:

```bash
NEXT_PUBLIC_YANDEX_ID=ваш_id_счетчика
```

## Использование

### 1. Добавьте компонент Яндекс.Метрики

Сначала добавьте компонент YandexMetrika в layout или страницу вашего приложения:

```jsx
// app/layout.tsx
import { YandexMetrika } from '@koiztech/next-yandex-metrika'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <YandexMetrika />
      </body>
    </html>
  )
}
```

Компонент YandexMetrika принимает следующие пропсы:

- `clickmap` (опционально): Включить сбор карты кликов (по умолчанию: true)
- `trackLinks` (опционально): Включить отслеживание внешних ссылок (по умолчанию: true)
- `accurateTrackBounce` (опционально): Включить точный расчет отказов (по умолчанию: true)
- `webvisor` (опционально): Включить вебвизор (по умолчанию: false)
- `strategy` (опционально): Стратегия загрузки скрипта ('lazyOnload' | 'afterInteractive' | 'beforeInteractive', по умолчанию: 'afterInteractive'). [Подробнее](https://nextjs.org/docs/app/api-reference/components/script#strategy).

Например:

```tsx
<YandexMetrika clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={false} strategy="afterInteractive" />
```

### 2. (опционально) Отслеживание просмотров страниц

Тег Яндекс.Метрики сам по себе не может точно отслеживать просмотры страниц в Next.js.

Для этого в пакете есть дополнительный хук для отслеживания просмотров страниц: `usePageViews`.

Для автоматического отслеживания просмотров страниц в вашем Next.js приложении используйте хук usePageViews.

Вы можете добавить его непосредственно в `app/layout.tsx` или – если ваше приложение использует SSR – в клиентский layout, например:

```tsx
// например, src/components/LayoutClient.tsx
'use client'
import { usePageViews } from '@koiztech/next-yandex-metrika'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  usePageViews()
  return <>{children}</>
}
```

```tsx
// app/layout.tsx
import LayoutClient from '@/components/LayoutClient'

const yid = process.env.NEXT_PUBLIC_YANDEX_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>  
        <LayoutClient>
          {children}
        </LayoutClient>
        <YandexMetrika clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={false} />
      </body>
    </html>
  )
}
```

...или вы можете использовать хук на конкретных страницах:

```jsx
// например, app/page.tsx
'use client'
import { usePageViews } from '@koiztech/next-yandex-metrika'

export default function App() {
  usePageViews()
  return <div>Содержимое вашего приложения</div>
}
```

> Примечание: Используйте только в клиентских компонентах.

Хук usePageViews принимает объект опций со следующими свойствами:

- `ignoreHashChange` (опционально): Отключить отслеживание изменений хэша (по умолчанию: false)
- `disabled` (опционально): Отключить отслеживание просмотров страниц (по умолчанию: false)

## Поддержка TypeScript

Этот пакет включает встроенные определения TypeScript.
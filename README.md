# @koiztech/next-yandex-metrika

Other languages: [Russian](README_ru.md)

> IMPORTANT: This package is a Work in Progress.

A Next.js component and hook for integrating Yandex Metrika analytics into your Next.js application (version 14 and above).

## Installation

Install the package:

```bash
npm install @koiztech/next-yandex-metrika
```

Add the Yandex Metrika ID to your environment variables:

```bash
NEXT_PUBLIC_YANDEX_ID=your_counter_id
```

## Usage

### 1. Add the Yandex Metrika component

First, add the YandexMetrika component to your app layout or page:

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

The YandexMetrika component accepts the following props:

- clickmap (optional): Enable click map collection (default: true)
- trackLinks (optional): Enable external link tracking (default: true)
- accurateTrackBounce (optional): Enable accurate bounce rate tracking (default: true)
- webvisor (optional): Enable session recording (default: false)
- strategy (optional): Script loading strategy ('lazyOnload' | 'afterInteractive' | 'beforeInteractive', default: 'afterInteractive'). [Reference](https://nextjs.org/docs/app/api-reference/components/script#strategy).

e.g.:

```tsx
<YandexMetrika clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={false} strategy="afterInteractive" />
```

### 2. (optional) Track Page Views

The Yandex Metrika Tag by itself fails to track page views accurately in Next.js.

For this reason, there's an additional hook that you can use to track page views: `usePageViews`.

For automatic page view tracking in your Next.js application, use the usePageViews hook.

You could add it to your `app/layout.tsx` directly or – if your app is SSR – to a client layout, e.g.:

```tsx
// e.g. src/components/LayoutClient.tsx
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

...or you can use the hook on specific pages:

```jsx
// e.g. app/page.tsx
'use client'
import { usePageViews } from '@koiztech/next-yandex-metrika'

export default function App() {
  usePageViews()
  return <div>Your app content</div>
}
```

> Note: Use only on client components.

The usePageViews hook accepts an options object with the following properties:

- ignoreHashChange (optional): Disable tracking of hash changes (default: false)
- disabled (optional): Disable page view tracking (default: false)

## TypeScript Support

This package includes TypeScript definitions out of the box.

# @koiztech/next-yandex-metrika

A Next.js component and hook for integrating Yandex Metrika analytics into your Next.js application (version 14 and above).

## Installation

```bash
npm install @koiztech/next-yandex-metrika
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
        <YandexMetrika yid={YOUR_YANDEX_ID} />
      </body>
    </html>
  )
}
```

The YandexMetrika component accepts the following props:

- yid (required): Your Yandex Metrika counter ID
- clickmap (optional): Enable click map collection (default: true)
- trackLinks (optional): Enable external link tracking (default: true)
- accurateTrackBounce (optional): Enable accurate bounce rate tracking (default: true)
- webvisor (optional): Enable session recording (default: false)
- strategy (optional): Script loading strategy ('lazyOnload' | 'afterInteractive' | 'beforeInteractive', default: 'afterInteractive')

### 2. Track Page Views

For automatic page view tracking in your Next.js application, use the usePageViews hook (recommended):

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

- yandexId (optional): Your Yandex Metrika counter ID (falls back to NEXT_PUBLIC_YANDEX_ID environment variable)
- ignoreHashChange (optional): Disable tracking of hash changes (default: false)
- disabled (optional): Disable page view tracking (default: false)

## Environment Variables

You can set your Yandex Metrika ID using an environment variable:

```bash
# .env
NEXT_PUBLIC_YANDEX_ID=your_counter_id
```

## TypeScript Support

This package includes TypeScript definitions out of the box.

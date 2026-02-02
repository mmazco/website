import type { Metadata } from 'next'
import './globals.css'
import { PHProvider } from './providers'

export const metadata: Metadata = {
  title: 'mmazco portfolio',
  description: 'Serial entrepreneur, product strategist, go-to-market and growth expert.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
      </head>
      <body>
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  )
}

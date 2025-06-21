import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maryam Mazraei - From personal photography archives. A Photo a Day',
  description: 'A photo a day. Photos are on a randomised rotating basis. Date log tracker resets every 10 days.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 
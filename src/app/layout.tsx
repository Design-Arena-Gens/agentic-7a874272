import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Expense Dashboard',
  description: 'Track, analyze, and export your expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}

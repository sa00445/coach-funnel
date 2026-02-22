import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Book a Free Funnel Strategy Call | Syed Abdullah Ali',
  description: 'Helping coaches with 10k–200k followers build high-converting funnels that turn audiences into revenue. Book your free 30-min strategy call.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}

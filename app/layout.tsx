import { Suspense } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/theme'
import { AuthProvider } from '@/context/auth'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import PortfolioBar from '@/components/PortfolioBar'


export const metadata: Metadata = {
  title: 'PRD Generator — AI-Powered Product Requirements Document',
  description: 'Describe your product idea and get a complete PRD with personas, use cases, feature roadmap, success metrics, and risk analysis — powered by AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
        <Suspense fallback={null}><PortfolioBar /></Suspense>
        <ThemeProvider><AuthProvider><DisclaimerBanner />{children}</AuthProvider></ThemeProvider>
      </body>
    </html>
  )
}

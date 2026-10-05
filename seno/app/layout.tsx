import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { FrontendAuthProvider } from '@/components/frontend-auth-provider'
import { ToastProvider } from '@/components/ui/toast-provider'

export const metadata: Metadata = {
  title: 'SENO STORE | شحن الألعاب والبطاقات الرقمية',
  description: 'SENO STORE — شحن الألعاب والتطبيقات والبطاقات الرقمية بسهولة وأمان.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/branding/logo-source.png', sizes: '1800x1024', type: 'image/png' },
      { url: '/branding/logo-source.png', type: 'image/png' },
    ],
    apple: '/branding/logo-source.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <FrontendAuthProvider>
          {children}
        </FrontendAuthProvider>
        <ToastProvider />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

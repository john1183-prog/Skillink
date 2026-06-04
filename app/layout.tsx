import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'SkillLink — From Certificate Holder to Verified Talent',
  description: 'AI-powered employability platform for Nigerian university students. Verify skills. Discover careers. Access real opportunities.',
  openGraph: {
    title: 'SkillLink — From Certificate Holder to Verified Talent',
    description: 'AI-powered employability platform for Nigerian university students.',
    url: 'https://skilllink.vercel.app',
    siteName: 'SkillLink',
    type: 'website',
    images: [{ url: 'https://placehold.co/1200x630/0038d1/ffffff?text=SkillLink', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillLink — From Certificate Holder to Verified Talent',
    description: 'AI-powered employability platform for Nigerian university students.',
    images: ['https://placehold.co/1200x630/0038d1/ffffff?text=SkillLink'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} scroll-smooth dark`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-on-background min-h-screen antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

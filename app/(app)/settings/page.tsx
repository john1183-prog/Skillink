'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { useAuthStore } from '@/lib/store/authStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { User, Shield, Bell, ChevronRight, LogOut, Info, ExternalLink } from 'lucide-react'

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { label: 'Personal Information', desc: 'Name, email, academic details', icon: User,   href: '/settings/account' },
      { label: 'Security',             desc: 'Password, sessions, 2FA',       icon: Shield, href: '/settings/security' },
      { label: 'Notifications',        desc: 'Alerts and reminders',           icon: Bell,   href: '/settings/notifications' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'About SkillLink', desc: 'Version 1.0 • Competition Demo', icon: Info,        href: null,                          external: false },
      { label: 'Anthropic AI',    desc: 'Powered by Google Gemini',       icon: ExternalLink, href: 'https://anthropic.com',      external: true },
    ],
  },
]

export default function SettingsPage() {
  const router   = useRouter()
  const { user, logout } = useAuthStore()

  return (
    <div className="max-w-xl mx-auto space-y-md pb-xl">

      {/* Profile mini-card */}
      <FadeSlideIn>
        <Link href="/profile">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md flex items-center gap-md hover:border-primary/20 transition-colors group shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
              <span className="text-sm font-black text-primary font-mono">
                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AO'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-body-md text-on-surface">{user?.name ?? 'Amara Okonkwo'}</p>
              <p className="text-body-sm text-on-surface-variant truncate">{user?.email ?? 'amara@futa.edu.ng'}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
          </div>
        </Link>
      </FadeSlideIn>

      {/* Sections */}
      {SECTIONS.map((section, si) => (
        <FadeSlideIn key={section.title} delay={si * 0.08 + 0.1}>
          <div className="space-y-xs">
            <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider px-xs">{section.title}</p>
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-card">
              {section.items.map((item, idx) => {
                const isLast = idx === section.items.length - 1
                const Inner = (
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center gap-md p-md hover:bg-surface-container transition-colors ${!isLast ? 'border-b border-outline-variant/10' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-on-surface-variant" />
                    </div>
                    <div className="flex-1">
                      <p className="text-body-md font-medium text-on-surface">{item.label}</p>
                      <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                  </motion.div>
                )

                if (!item.href) return <div key={item.label}>{Inner}</div>
                if (item.external) return <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{Inner}</a>
                return <Link key={item.label} href={item.href}>{Inner}</Link>
              })}
            </div>
          </div>
        </FadeSlideIn>
      ))}

      {/* Sign out */}
      <FadeSlideIn delay={0.3}>
        <button
          onClick={() => { logout(); router.push('/login') }}
          className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md flex items-center gap-md hover:border-error/30 hover:bg-error/5 transition-all group shadow-card"
        >
          <div className="w-9 h-9 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4 text-error" />
          </div>
          <span className="flex-1 text-left text-body-md font-medium text-error">Sign Out</span>
        </button>
      </FadeSlideIn>

      <FadeSlideIn delay={0.35}>
        <p className="text-center text-body-sm text-on-surface-variant opacity-50">SkillLink v1.0 • MTC Competition Demo</p>
      </FadeSlideIn>

    </div>
  )
}

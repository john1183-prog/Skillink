'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Sun, Moon } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { cn } from '@/lib/utils/cn'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/skills/gap-analysis': 'My Skills',
  '/passport': 'Passport', '/opportunities': 'Opportunities',
  '/roadmap': 'Roadmap', '/ai-assistant': 'AI Assistant',
  '/settings/notifications': 'Notifications',
}

export function AppTopbar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const [dark, setDark] = useState(true)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AO'
  const title = TITLES[pathname] ?? 'SkillLink'

  useEffect(() => {
    const stored = localStorage.getItem('skilllink-theme')
    if (stored === 'light') { document.documentElement.classList.remove('dark'); setDark(false) }
    else { document.documentElement.classList.add('dark'); setDark(true) }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) { document.documentElement.classList.add('dark'); localStorage.setItem('skilllink-theme', 'dark') }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('skilllink-theme', 'light') }
  }

  return (
    <header className="h-14 bg-surface-container-low/80 backdrop-blur-sm border-b border-outline-variant/20 flex items-center justify-between px-gutter-mobile lg:px-gutter-desktop sticky top-0 z-30">
      <h1 className="font-sans font-bold text-body-lg text-on-surface">{title}</h1>
      <div className="flex items-center gap-sm">
        <button onClick={toggle} className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-[10px] font-black text-primary font-mono">{initials}</span>
        </div>
      </div>
    </header>
  )
}

export default AppTopbar

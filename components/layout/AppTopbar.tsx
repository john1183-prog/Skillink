'use client'
import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Sun, Moon } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'

const TITLES: Record<string, string> = {
  '/dashboard':              'Dashboard',
  '/skills':                 'My Skills',
  '/skills/gap-analysis':    'Skill Gap Analysis',
  '/passport':               'My Passport',
  '/opportunities':          'Opportunities',
  '/roadmap':                'My Roadmap',
  '/ai-assistant':           'AI Assistant',
  '/profile':                'My Profile',
  '/profile/edit':           'Edit Profile',
  '/settings':               'Settings',
  '/settings/account':       'Account Settings',
  '/settings/security':      'Security',
  '/settings/notifications': 'Notifications',
}

export function AppTopbar() {
  const pathname  = usePathname()
  const router    = useRouter()
  const { user }  = useAuthStore()
  const [dark, setDark] = useState(false)

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AO'
  const title    = TITLES[pathname] ?? 'SkillLink'

  // Sync state from DOM class (set by layout inline script before paint)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('skilllink-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('skilllink-theme', 'light')
    }
  }

  return (
    <header className="h-14 bg-surface-container-low/80 backdrop-blur-sm border-b border-outline-variant/20 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 transition-colors duration-300">
      <h1 className="font-sans font-bold text-body-lg text-on-surface">{title}</h1>

      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 active:scale-95"
        >
          {dark
            ? <Sun  className="w-4 h-4" />
            : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification bell → /settings/notifications */}
        <button
          onClick={() => router.push('/settings/notifications')}
          aria-label="Notifications"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 active:scale-95 relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface-container-low" />
        </button>

        {/* Avatar → /profile */}
        <button
          onClick={() => router.push('/profile')}
          aria-label="View profile"
          className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-primary/20 transition-all duration-200 active:scale-95 ml-1"
        >
          <span className="text-[10px] font-black text-primary font-mono leading-none">{initials}</span>
        </button>
      </div>
    </header>
  )
}

export default AppTopbar

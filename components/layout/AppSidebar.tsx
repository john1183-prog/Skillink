'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { LayoutDashboard, Target, Award, Briefcase, Map, Sparkles, LogOut, Zap, Settings, User, HelpCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { cn } from '@/lib/utils/cn'

const NAV = [
  { href: '/dashboard',          label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/skills/gap-analysis',label: 'My Skills',    icon: Target },
  { href: '/passport',           label: 'Passport',     icon: Award },
  { href: '/opportunities',      label: 'Opportunities',icon: Briefcase },
  { href: '/roadmap',            label: 'Roadmap',      icon: Map },
  { href: '/ai-assistant',       label: 'AI Assistant', icon: Sparkles },
]

const BOTTOM_NAV = [
  { href: '/profile',   label: 'Profile',  icon: User },
  { href: '/settings',  label: 'Settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, logout } = useAuthStore()
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AO'

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const active = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link href={href}>
        <motion.div
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'flex items-center gap-sm px-sm py-xs rounded-lg text-body-md transition-all duration-150',
            active
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          )}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span>{label}</span>
          {active && (
            <motion.div
              layoutId="sidebar-indicator"
              className="ml-auto w-1 h-4 rounded-full bg-primary"
            />
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 bg-surface-container-low border-r border-outline-variant/20 shrink-0 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-sm px-md h-14 border-b border-outline-variant/10">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-on-primary" />
        </div>
        <span className="font-sans font-black text-body-lg text-on-surface tracking-tight">SkillLink</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-sm py-sm flex flex-col gap-xs overflow-y-auto">
        {NAV.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Bottom section: Profile + Settings + Help */}
      <div className="px-sm pb-xs pt-sm border-t border-outline-variant/10 flex flex-col gap-xs">
        {BOTTOM_NAV.map(item => <NavItem key={item.href} {...item} />)}

        <button
          className="flex items-center gap-sm px-sm py-xs rounded-lg text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-150 w-full"
          onClick={() => window.open('mailto:support@skilllink.ng')}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Help</span>
        </button>
      </div>

      {/* User strip */}
      <div className="px-sm pb-sm pt-xs border-t border-outline-variant/10">
        <div className="flex items-center gap-sm px-sm py-xs">
          <button onClick={() => router.push('/profile')} className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 hover:border-primary/50 transition-colors">
            <span className="text-[10px] font-black text-primary font-mono">{initials}</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-label-md text-on-surface font-semibold truncate">{user?.name ?? 'Amara Okonkwo'}</p>
            <p className="text-[10px] text-on-surface-variant font-mono truncate">{user?.level ?? '300L'}</p>
          </div>
          <button
            onClick={() => { logout(); router.push('/login') }}
            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar

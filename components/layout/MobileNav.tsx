'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { LayoutDashboard, Target, Award, Briefcase, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const TABS = [
  { href: '/dashboard',           label: 'Home',         icon: LayoutDashboard },
  { href: '/skills/gap-analysis', label: 'Skills',       icon: Target },
  { href: '/passport',            label: 'Passport',     icon: Award },
  { href: '/opportunities',       label: 'Opps',         icon: Briefcase },
  { href: '/ai-assistant',        label: 'AI',           icon: Sparkles },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden h-16 bg-surface-container-low/95 backdrop-blur-md border-t border-outline-variant/20 flex items-center z-40 transition-colors duration-300">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full active:opacity-70 transition-opacity"
          >
            <div className="relative flex flex-col items-center gap-0.5">
              {active && (
                <motion.div
                  layoutId="mobile-pill"
                  className="absolute -inset-x-3 -inset-y-1.5 bg-primary/10 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {/* Fixed: was w-4.5 h-4.5 (invalid Tailwind) — now w-5 h-5 */}
              <Icon
                className={cn('w-5 h-5 transition-colors duration-150', active ? 'text-primary' : 'text-on-surface-variant')}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={cn(
                'text-[9px] font-mono font-bold uppercase tracking-wider transition-colors duration-150',
                active ? 'text-primary' : 'text-on-surface-variant'
              )}>
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

export default MobileNav

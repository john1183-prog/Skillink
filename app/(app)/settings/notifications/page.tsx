'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Bell, Briefcase, Target, Map, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const SETTINGS = [
  { id: 'opportunities', label: 'Opportunity Alerts', desc: 'New internships, scholarships, and hackathons matching your skills', icon: Briefcase, defaultOn: true },
  { id: 'assessments',   label: 'Assessment Reminders', desc: 'Reminders to complete pending skill assessments', icon: Target, defaultOn: true },
  { id: 'roadmap',       label: 'Roadmap Updates', desc: 'Progress alerts and milestone completions', icon: Map, defaultOn: true },
  { id: 'weekly',        label: 'Weekly Digest', desc: 'A weekly summary of your employability progress', icon: BookOpen, defaultOn: false },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={cn('w-11 h-6 rounded-full transition-all relative', on ? 'bg-primary' : 'bg-surface-container-high')}>
      <motion.div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ left: on ? '22px' : '2px' }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} />
    </button>
  )
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map(s => [s.id, s.defaultOn]))
  )

  return (
    <div className="max-w-xl mx-auto space-y-md">
      <FadeSlideIn>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-sans font-black text-headline-md text-on-surface">Notifications</h1>
            <p className="text-body-md text-on-surface-variant mt-0.5">Control what SkillLink alerts you about</p>
          </div>
        </div>
      </FadeSlideIn>

      <div className="space-y-sm">
        {SETTINGS.map((s, idx) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 + 0.1 }}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
              <s.icon className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-semibold text-body-md text-on-surface">{s.label}</p>
              <p className="text-label-sm text-on-surface-variant mt-0.5">{s.desc}</p>
            </div>
            <Toggle on={settings[s.id]} onToggle={() => setSettings(prev => ({ ...prev, [s.id]: !prev[s.id] }))} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useSkillStore, computeReadiness } from '@/lib/store/skillStore'
import { useCareerStore } from '@/lib/store/careerStore'
import { ReadinessRing } from '@/components/charts/ReadinessRing'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Compass, Target, Award, Briefcase, Map, ChevronRight, Sparkles } from 'lucide-react'

const CARDS = [
  { title: 'Career Compass',  desc: 'Discover your path',    icon: Compass,   href: '/career-compass/test',  color: 'text-primary' },
  { title: 'My Skills',       desc: 'Verify competencies',   icon: Target,    href: '/skills/gap-analysis',  color: 'text-tertiary' },
  { title: 'Passport',        desc: 'View verified profile', icon: Award,     href: '/passport',             color: 'text-on-tertiary-container' },
  { title: 'Opportunities',   desc: 'Find matches',          icon: Briefcase, href: '/opportunities',        color: 'text-primary' },
  { title: 'Roadmap',         desc: 'Track milestones',      icon: Map,       href: '/roadmap',              color: 'text-tertiary' },
  { title: 'AI Assistant',    desc: 'Career coaching',       icon: Sparkles,  href: '/ai-assistant',         color: 'text-primary' },
]

export default function DashboardPage() {
  const { user }                       = useAuthStore()
  const { verifiedSkills, skillGaps }  = useSkillStore()
  const { selectedPath }               = useCareerStore()
  const isPythonVerified               = verifiedSkills.some(v => v.skillName === 'Python Programming')
  const readinessScore                 = computeReadiness(verifiedSkills)
  const hour                           = new Date().getHours()
  const greeting                       = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName                      = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="max-w-4xl mx-auto space-y-md">

      {/* Greeting */}
      <FadeSlideIn>
        <h1 className="font-sans font-black text-headline-md text-on-surface">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-body-md text-on-surface-variant mt-xs">
          {isPythonVerified
            ? 'Python verified! Keep building your passport.'
            : 'Start verifying skills to boost your readiness.'}
        </p>
      </FadeSlideIn>

      {/* Readiness card */}
      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-card overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-tertiary via-primary to-primary-container" />
          <div className="p-md flex flex-col sm:flex-row items-center gap-md">
            <ReadinessRing score={readinessScore} />
            <div className="flex-1 space-y-sm">
              <div>
                <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Target Career</p>
                <p className="font-sans font-bold text-body-lg text-on-surface mt-0.5">
                  {selectedPath?.title ?? 'Data Analyst'}
                </p>
                <div className="flex flex-wrap gap-xs mt-xs">
                  {(selectedPath?.requiredSkills ?? ['Python', 'SQL', 'Data Visualization'])
                    .slice(0, 3)
                    .map(s => (
                      <Badge
                        key={s}
                        variant={verifiedSkills.some(v => v.skillName.toLowerCase().includes(s.toLowerCase())) ? 'verified' : 'secondary'}
                      >
                        {s}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="bg-surface-container rounded-lg p-sm">
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Verified Skills</p>
                  <p className="font-black text-2xl text-primary font-mono mt-0.5">{verifiedSkills.length}</p>
                </div>
                <div className="bg-surface-container rounded-lg p-sm">
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Skill Gaps</p>
                  <p className="font-black text-2xl text-error font-mono mt-0.5">
                    {skillGaps.filter(g => !verifiedSkills.some(v => v.skillName === g.skill)).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSlideIn>

      {/* Quick Access — grid is ON the cards directly, no StaggerList wrapper breaking layout */}
      <FadeSlideIn delay={0.2}>
        <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
          {CARDS.map(({ title, desc, icon: Icon, href, color }, i) => (
            <Link key={href} href={href}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,56,209,0.12)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-sm flex items-center gap-sm transition-colors hover:border-primary/20 h-full"
              >
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-body-md text-on-surface truncate">{title}</p>
                  <p className="text-label-sm text-on-surface-variant truncate">{desc}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
              </motion.div>
            </Link>
          ))}
        </div>
      </FadeSlideIn>

    </div>
  )
}

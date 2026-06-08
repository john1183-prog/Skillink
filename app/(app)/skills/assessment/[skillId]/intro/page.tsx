'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Button } from '@/components/ui/Button'
import { Shield, Clock, HelpCircle, Award, AlertTriangle, ChevronRight } from 'lucide-react'

const SKILL_META: Record<string, {
  name: string; duration: string; questions: number; passing: number; topics: string[]
}> = {
  python: {
    name:      'Python Programming',
    duration:  '4 minutes',
    questions: 10,
    passing:   70,
    topics:    ['Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Dicts', 'Basic OOP'],
  },
}

const RULES = [
  { icon: Clock,         text: 'The timer starts the moment you begin. It cannot be paused.' },
  { icon: HelpCircle,   text: 'You cannot revisit previous questions once answered.' },
  { icon: Shield,       text: 'This assessment is monitored. Multiple attempts are tracked.' },
  { icon: AlertTriangle,text: 'Leaving this tab during the assessment will be flagged.' },
]

export default function AssessmentIntroPage() {
  const { skillId } = useParams<{ skillId: string }>()
  const router      = useRouter()
  const meta        = SKILL_META[skillId ?? 'python'] ?? SKILL_META['python']

  return (
    <div className="max-w-xl mx-auto space-y-md pb-xl">

      {/* Hero */}
      <FadeSlideIn>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-primary to-tertiary" />
          <div className="p-md text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-md"
            >
              <Award className="w-8 h-8 text-primary" />
            </motion.div>

            <h1 className="font-sans font-black text-headline-sm text-on-surface">{meta.name}</h1>
            <p className="text-body-md text-on-surface-variant mt-xs">Skill Verification Assessment</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-sm mt-md">
              {[
                { label: 'Duration',  value: meta.duration },
                { label: 'Questions', value: `${meta.questions}` },
                { label: 'Pass Score',value: `${meta.passing}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-container rounded-xl p-sm">
                  <p className="font-black text-title-md text-primary font-mono">{value}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSlideIn>

      {/* Topics covered */}
      <FadeSlideIn delay={0.08}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Topics Covered</h2>
          <div className="space-y-xs">
            {meta.topics.map((t, i) => (
              <div key={t} className="flex items-center gap-sm">
                <span className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] text-primary font-bold">{i + 1}</span>
                </span>
                <p className="text-body-md text-on-surface">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSlideIn>

      {/* Rules */}
      <FadeSlideIn delay={0.14}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Before You Begin</h2>
          <div className="space-y-sm">
            {RULES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-sm">
                <Icon className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
                <p className="text-body-sm text-on-surface-variant">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSlideIn>

      {/* Integrity notice */}
      <FadeSlideIn delay={0.18}>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-md flex items-start gap-sm">
          <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-body-sm text-on-surface">
            By starting this assessment you agree that your answers represent your own work. Verified skills on your SkillLink Passport are trusted by employers.
          </p>
        </div>
      </FadeSlideIn>

      {/* CTAs */}
      <FadeSlideIn delay={0.22}>
        <div className="flex gap-sm">
          <Button variant="outline" size="lg" onClick={() => router.back()} className="flex-1">
            Go Back
          </Button>
          <Button variant="primary" size="lg"
            onClick={() => router.push(`/skills/assessment/${skillId}`)}
            className="flex-1 flex items-center justify-center gap-sm">
            Start Assessment <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </FadeSlideIn>

    </div>
  )
}

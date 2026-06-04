'use client'
import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useSkillStore } from '@/lib/store/skillStore'
import { useCareerStore } from '@/lib/store/careerStore'
import { useRouter } from 'next/navigation'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { CountUp } from '@/components/animations/CountUp'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Map, CheckCircle2, Clock, Lock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { RoadmapMilestone } from '@/types'

function MilestoneRow({ item, idx, isLast, router }: { item: RoadmapMilestone; idx: number; isLast: boolean; router: ReturnType<typeof useRouter> }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const statusConfig = {
    completed:   { icon: null,                         badge: <Badge variant="verified">Completed</Badge>,   bg: 'border-tertiary-container/40 bg-tertiary-container/5' },
    in_progress: { icon: <Clock className="w-4 h-4 text-primary" />, badge: <Badge variant="default">In Progress</Badge>, bg: 'border-primary/30 bg-primary/5' },
    locked:      { icon: <Lock className="w-4 h-4 text-on-surface-variant" />, badge: <Badge variant="secondary">Locked</Badge>, bg: 'border-outline-variant/20 opacity-60' },
  }
  const cfg = statusConfig[item.status]

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.07 }}
      className="relative flex gap-md">
      <div className="flex flex-col items-center shrink-0">
        <div className={cn('w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background z-10',
          item.status === 'completed' ? 'border-tertiary-container' : item.status === 'in_progress' ? 'border-primary' : 'border-outline-variant/40')}>
          {item.status === 'completed' ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <motion.path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" fill="none"
                strokeLinecap="round" strokeLinejoin="round" className="text-on-tertiary-container"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.07 + 0.2 }} />
            </svg>
          ) : cfg.icon}
        </div>
        {!isLast && (
          <motion.div className="w-0.5 bg-outline-variant/20 flex-1 mt-1"
            initial={{ height: 0 }} animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.5, delay: idx * 0.07 + 0.3 }} />
        )}
      </div>

      <div className={cn('flex-1 mb-md p-md rounded-xl border transition-all', cfg.bg,
        item.status === 'in_progress' && 'ring-1 ring-primary/10')}>
        <div className="flex items-start justify-between gap-sm flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-body-md text-on-surface">{item.title}</h3>
            <p className="text-label-sm text-on-surface-variant mt-0.5">{item.desc}</p>
            <div className="flex flex-wrap gap-xs mt-sm">
              {item.relatedSkills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
          </div>
          <div className="shrink-0">{cfg.badge}</div>
        </div>
        {item.status === 'in_progress' && (
          <Button variant="primary" size="sm" className="mt-sm"
            onClick={() => router.push('/skills/assessment/python')}>
            Take Assessment <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default function RoadmapPage() {
  const router = useRouter()
  const { roadmapMilestones } = useSkillStore()
  const { selectedPath } = useCareerStore()
  const completed = roadmapMilestones.filter(m => m.status === 'completed').length
  const pct = Math.round((completed / roadmapMilestones.length) * 100)

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <FadeSlideIn>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Map className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-sans font-black text-headline-md text-on-surface">Roadmap</h1>
            <p className="text-body-md text-on-surface-variant mt-0.5">
              Path to <strong className="text-primary">{selectedPath?.title ?? 'Data Analyst'}</strong>
            </p>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <div className="flex items-center justify-between mb-sm">
            <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Overall Progress</p>
            <CountUp from={0} to={pct} suffix="%" className="font-black text-xl text-primary font-mono" />
          </div>
          <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-tertiary-container rounded-full"
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <p className="text-label-sm text-on-surface-variant mt-xs font-mono">{completed} of {roadmapMilestones.length} milestones complete</p>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.2}>
        <div className="space-y-0">
          {roadmapMilestones.map((item, idx) => (
            <MilestoneRow key={item.id} item={item} idx={idx} isLast={idx === roadmapMilestones.length - 1} router={router} />
          ))}
        </div>
      </FadeSlideIn>
    </div>
  )
}
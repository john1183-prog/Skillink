'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useSkillStore } from '@/lib/store/skillStore'
import { useCareerStore } from '@/lib/store/careerStore'
import { SkillRadarChart } from '@/components/charts/SkillRadarChart'
import { CountUp } from '@/components/animations/CountUp'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Target, ChevronRight } from 'lucide-react'

export default function SkillGapPage() {
  const router = useRouter()
  const { skillGaps, verifiedSkills } = useSkillStore()
  const { selectedPath } = useCareerStore()
  const profileMatch = skillGaps.length === 0 ? 0 : Math.round(
    skillGaps.reduce((acc, g) => acc + (g.required > 0 ? (g.current / g.required) * 100 : 100), 0) / skillGaps.length
  )

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <FadeSlideIn>
        <div className="flex items-start justify-between gap-sm">
          <div>
            <div className="flex items-center gap-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <h1 className="font-sans font-black text-headline-md text-on-surface">Skill Gap Matrix</h1>
            </div>
            <p className="text-body-md text-on-surface-variant mt-xs ml-11">
              {selectedPath?.title ?? 'Data Analyst'} pathway
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Profile Match</div>
            <CountUp from={0} to={profileMatch} suffix="%" className="font-black text-2xl text-primary font-mono" />
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">
            Current vs Required Skills
          </p>
          <SkillRadarChart gaps={skillGaps} />
          <div className="flex items-center justify-center gap-md mt-sm">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-1.5 rounded-full bg-primary opacity-60" />
              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Current</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-1.5 rounded-full bg-tertiary-container opacity-70" />
              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Required</span>
            </div>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.2}>
        <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Skills Breakdown</h2>
        <div className="space-y-sm mt-sm">
          {skillGaps.map((gap, idx) => {
            const isVerified = verifiedSkills.some(v => v.skillName === gap.skill)
            return (
              <motion.div key={gap.skill}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 + 0.3 }}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
                <div className="flex items-start justify-between gap-sm mb-sm">
                  <div>
                    <p className="font-sans font-semibold text-body-md text-on-surface">{gap.skill}</p>
                    <div className="flex items-center gap-xs mt-xs">
                      <Badge variant={isVerified ? 'verified' : gap.priority === 'high' ? 'error' : gap.priority === 'medium' ? 'warning' : 'secondary'}>
                        {isVerified ? '✓ Verified' : gap.priority + ' priority'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-lg text-error font-mono">-{gap.gap}%</span>
                    <p className="text-[10px] font-mono text-on-surface-variant">gap</p>
                  </div>
                </div>
                <div className="space-y-xs">
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
                    <span>Current: {gap.current}%</span>
                    <span>Required: {gap.required}%</span>
                  </div>
                  <div className="relative h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div className="absolute left-0 top-0 h-full bg-primary rounded-full"
                      initial={{ width: 0 }} whileInView={{ width: `${gap.current}%` }} viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.08 + 0.2 }} />
                    <div className="absolute top-0 h-full w-px bg-error/60" style={{ left: `${gap.required}%` }} />
                  </div>
                </div>
                {!isVerified && (
                  <Button variant="outline" size="sm" className="mt-sm"
                    onClick={() => router.push('/skills/assessment/python/intro')}>
                    Take Assessment <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Button>
                )}
              </motion.div>
            )
          })}
        </div>
      </FadeSlideIn>
    </div>
  )
}
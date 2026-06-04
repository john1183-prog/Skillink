'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter, useParams } from 'next/navigation'
import { useCareerStore } from '@/lib/store/careerStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function CareerPathPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { recommendations, selectPath } = useCareerStore()
  const career = recommendations.find(r => r.id === id) ?? recommendations[0]

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <FadeSlideIn>
        <button onClick={() => router.back()} className="flex items-center gap-xs text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to results
        </button>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-primary/20 rounded-xl overflow-hidden shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-tertiary via-primary to-primary-container" />
          <div className="p-md">
            <div className="flex items-start justify-between gap-md">
              <div>
                <h1 className="font-sans font-black text-headline-md text-on-surface">{career.title}</h1>
                <p className="text-body-md text-on-surface-variant mt-xs">{career.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-3xl text-primary font-mono">{career.matchPercentage}%</div>
                <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">match</div>
              </div>
            </div>
            <div className="mt-md grid grid-cols-2 gap-sm">
              <div className="bg-surface-container rounded-lg p-sm">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Avg Salary</p>
                <p className="font-bold text-body-md text-on-surface mt-0.5">{career.averageSalary}</p>
              </div>
              <div className="bg-surface-container rounded-lg p-sm">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Market Demand</p>
                <div className="flex items-center gap-xs mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <p className="font-bold text-body-md text-on-surface">{Math.round(career.demandScore * 100)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.2}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-sm">
          <h2 className="font-mono text-label-md text-on-surface uppercase tracking-wider font-bold">Required Skills</h2>
          <div className="flex flex-wrap gap-xs">
            {career.requiredSkills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.3}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-sm">
          <h2 className="font-mono text-label-md text-on-surface uppercase tracking-wider font-bold">Your Skill Gaps</h2>
          {career.skillGaps.map((gap, idx) => (
            <motion.div key={gap.skillName} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 + 0.4 }}
              className="flex items-center justify-between gap-sm p-sm bg-surface-container rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-xs mb-xs">
                  <p className="font-semibold text-body-md text-on-surface truncate">{gap.skillName}</p>
                  <Badge variant={gap.priority === 'High' ? 'error' : gap.priority === 'Medium' ? 'warning' : 'secondary'}>{gap.priority}</Badge>
                </div>
                <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${gap.currentLevel}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.5 }} />
                </div>
                <p className="text-[10px] font-mono text-on-surface-variant mt-0.5">{gap.currentLevel}% / {gap.requiredLevel}% required</p>
              </div>
              <a href={gap.recommendedResource.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-0.5 text-label-sm text-primary hover:underline shrink-0">
                Learn <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.4}>
        <Button variant="primary" size="lg" className="w-full" onClick={() => { selectPath(career.id); router.push('/skills/gap-analysis') }}>
          View My Full Skill Gap Analysis
        </Button>
      </FadeSlideIn>
    </div>
  )
}
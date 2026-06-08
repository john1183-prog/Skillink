'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCareerStore } from '@/lib/store/careerStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { StaggerList } from '@/components/animations/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function CareerResultsPage() {
  const router = useRouter()
  const { recommendations, selectPath } = useCareerStore()

  const handleSelect = (id: string) => {
    selectPath(id)
    router.push(`/career-compass/path/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <FadeSlideIn>
        <div>
          <h1 className="font-sans font-black text-headline-md text-on-surface">Your Career Matches</h1>
          <p className="text-body-md text-on-surface-variant mt-xs">Based on your personality and academic profile, here are your strongest paths.</p>
        </div>
      </FadeSlideIn>

      <div className="space-y-sm">
        <StaggerList>
          {recommendations.map((path, idx) => (
            <motion.div key={path.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              className={cn('bg-surface-container-lowest border rounded-xl p-md shadow-card cursor-pointer transition-all hover:shadow-card-hover',
                idx === 0 ? 'border-primary/30 ring-1 ring-primary/10' : 'border-outline-variant/20')}>
              <div className="flex items-start justify-between gap-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-sm mb-xs flex-wrap">
                    <h3 className="font-sans font-bold text-body-lg text-on-surface">{path.title}</h3>
                    {idx === 0 && <Badge variant="verified">⭐ Best Match</Badge>}
                  </div>
                  <p className="text-body-md text-on-surface-variant mb-sm">{path.description}</p>
                  <p className="text-label-sm text-primary font-mono italic">"{path.matchReason}"</p>
                  <div className="flex flex-wrap gap-xs mt-sm">
                    {path.requiredSkills.slice(0, 3).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-2xl text-primary font-mono">{path.matchPercentage}%</div>
                  <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">match</div>
                  <div className="mt-sm flex items-center gap-0.5 text-label-sm text-on-surface-variant">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-mono text-[10px]">{Math.round(path.demandScore * 100)}% demand</span>
                  </div>
                </div>
              </div>
              <div className="mt-sm">
                <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary to-tertiary-container rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${path.matchPercentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }} />
                </div>
              </div>
              <Button variant={idx === 0 ? 'primary' : 'outline'} size="sm" className="mt-md"
                onClick={() => handleSelect(path.id)}>
                Explore this path <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </div>
  )
}
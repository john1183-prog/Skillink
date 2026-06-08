'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ExternalLink, Briefcase } from 'lucide-react'
import { mockOpportunities } from '@/lib/demo/mockData'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Button } from '@/components/ui/Button'
import { Briefcase, ExternalLink, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const FILTERS = ['All', 'Internship', 'Scholarship', 'Bootcamp', 'Hackathon']

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState('All')
  const router = useRouter()
  const filtered = filter === 'All' ? mockOpportunities : mockOpportunities.filter(o => o.type === filter)

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <FadeSlideIn>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-sans font-black text-headline-md text-on-surface">Opportunities</h1>
            <p className="text-body-md text-on-surface-variant mt-0.5">Matched to your verified skills</p>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="flex gap-xs overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map(f => (
            <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => setFilter(f)}
              className={cn('shrink-0 px-sm py-xs rounded-full text-label-sm font-mono font-bold uppercase tracking-wider border transition-all',
                filter === f ? 'bg-primary text-on-primary border-primary shadow-glow-sm' : 'bg-surface-container border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high')}>
              {f}
            </motion.button>
          ))}
        </div>
      </FadeSlideIn>

      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} className="space-y-sm">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center py-xl gap-sm">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-on-surface-variant" />
              </div>
              <p className="text-body-md text-on-surface-variant">No {filter.toLowerCase()} opportunities right now.</p>
              <button onClick={() => setFilter('All')}
                className="text-label-sm text-primary hover:underline font-mono uppercase tracking-wider">
                View all opportunities
              </button>
            </motion.div>
          ) : filtered.map((opp, idx) => (
            <motion.div key={opp.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={cn('relative bg-surface-container-lowest border rounded-xl p-md shadow-card hover:shadow-card-hover transition-all',
                opp.matchScore >= 90 ? 'border-primary/30' : 'border-outline-variant/20')}>
              {opp.matchScore >= 90 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: idx * 0.08 + 0.3 }}
                  className="absolute -top-2 -right-2">
                  <Badge variant="verified">⭐ Best Match</Badge>
                </motion.div>
              )}
              <div className="flex items-start justify-between gap-sm mb-sm">
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-bold text-body-lg text-on-surface">{opp.title}</h3>
                  <p className="text-label-sm text-on-surface-variant font-mono">{opp.company}</p>
                </div>
                <Badge variant={opp.type === 'Scholarship' ? 'verified' : opp.type === 'Internship' ? 'default' : 'secondary'}>
                  {opp.type}
                </Badge>
              </div>
              <p className="text-body-md text-on-surface-variant mb-sm">{opp.description}</p>
              <div className="flex flex-wrap gap-xs mb-sm">
                {opp.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
              </div>
              <div className="space-y-xs mb-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Profile Match</span>
                  <span className="font-mono text-[10px] font-bold text-primary">{opp.matchScore}%</span>
                </div>
                <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary-container"
                    initial={{ width: 0 }} animate={{ width: `${opp.matchScore}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }} />
                </div>
              </div>
              <div className="flex gap-xs">
                <Button variant="outline" size="sm" onClick={() => router.push(`/opportunities/${opp.id}`)}>
                  View
                </Button>
                <Button variant={opp.matchScore >= 90 ? 'primary' : 'outline'} size="sm"
                  onClick={() => window.open(opp.applicationUrl, '_blank')}>
                  Apply <ExternalLink className="w-3 h-3 ml-xs" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
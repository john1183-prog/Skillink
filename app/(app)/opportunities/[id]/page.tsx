'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockOpportunities } from '@/lib/demo/mockData'
import {
  ArrowLeft, Bookmark, ExternalLink, MapPin, Clock,
  Users, CheckCircle, AlertCircle, Star
} from 'lucide-react'

const EXTRA: Record<string, { location: string; duration: string; teamSize: string; deadline: string; requirements: string[]; perks: string[] }> = {
  'flutterwave-intern': {
    location:    'Lagos (Remote-friendly)',
    duration:    '3–6 months',
    teamSize:    'Data team of 12',
    deadline:    'July 31, 2026',
    requirements: ['Basic Python/SQL knowledge', '200L and above', 'Available for at least 3 months', 'Good internet access'],
    perks:       ['Monthly stipend (₦80k)', 'Certificate of completion', 'Mentorship from senior data engineers', 'Possibility of full-time conversion'],
  },
  'google-scholarship': {
    location:    'Fully Remote',
    duration:    '6 months',
    teamSize:    '1,000+ scholars across Africa',
    deadline:    'August 15, 2026',
    requirements: ['Enrolled in a Nigerian university', 'Basic programming knowledge', 'Strong internet access', 'Commitment to full program'],
    perks:       ['Fully funded', 'Monthly stipend (₦150k)', 'Google/Andela certification', 'Job placement support'],
  },
  'hng-internship': {
    location:    'Remote (Nigeria)',
    duration:    '3 months',
    teamSize:    '5,000+ participants',
    deadline:    'Rolling admissions',
    requirements: ['Any skill level welcome', 'Consistent availability', 'Team player', 'Nigerian student or graduate'],
    perks:       ['Top performers get placed in tech companies', 'Build real products', 'Networking with 5,000+ developers', 'Portfolio projects'],
  },
}

export default function OpportunityDetailPage() {
  const { id }     = useParams<{ id: string }>()
  const router     = useRouter()
  const [bookmarked, setBookmarked] = useState(false)

  const opp   = mockOpportunities.find(o => o.id === id)
  const extra = EXTRA[id ?? '']

  if (!opp) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl gap-md">
        <AlertCircle className="w-12 h-12 text-on-surface-variant opacity-40" />
        <p className="text-body-md text-on-surface-variant">Opportunity not found.</p>
        <Button variant="outline" onClick={() => router.push('/opportunities')}>Back to Opportunities</Button>
      </div>
    )
  }

  const matchColor = opp.matchScore >= 90 ? 'text-primary' : opp.matchScore >= 75 ? 'text-tertiary' : 'text-on-surface-variant'

  return (
    <div className="max-w-2xl mx-auto space-y-md pb-xl">

      {/* Back */}
      <FadeSlideIn>
        <button onClick={() => router.push('/opportunities')}
          className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface text-body-sm transition-colors mb-xs">
          <ArrowLeft className="w-4 h-4" /> Opportunities
        </button>
      </FadeSlideIn>

      {/* Header */}
      <FadeSlideIn delay={0.05}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-primary to-tertiary" style={{ width: `${opp.matchScore}%` }} />
          <div className="p-md">
            <div className="flex items-start justify-between gap-md">
              <div>
                <h1 className="font-sans font-black text-title-lg text-on-surface">{opp.title}</h1>
                <p className="text-body-md text-on-surface-variant mt-xs">{opp.company}</p>
              </div>
              <button
                onClick={() => setBookmarked(p => !p)}
                className={`p-sm rounded-xl border transition-all ${bookmarked ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:text-primary'}`}
              >
                <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-sm mt-md text-label-md text-on-surface-variant">
              {extra && (
                <>
                  <span className="flex items-center gap-xs"><MapPin  className="w-3.5 h-3.5" />{extra.location}</span>
                  <span className="flex items-center gap-xs"><Clock   className="w-3.5 h-3.5" />{extra.duration}</span>
                  <span className="flex items-center gap-xs"><Users   className="w-3.5 h-3.5" />{extra.teamSize}</span>
                </>
              )}
            </div>

            {/* Match score */}
            <div className="mt-md flex items-center gap-sm">
              <Star className={`w-4 h-4 ${matchColor}`} fill="currentColor" />
              <span className={`font-black text-title-md font-mono ${matchColor}`}>{opp.matchScore}%</span>
              <span className="text-body-sm text-on-surface-variant">skill match</span>
            </div>
          </div>
        </div>
      </FadeSlideIn>

      {/* Description */}
      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">About</h2>
          <p className="text-body-md text-on-surface leading-relaxed">{opp.description}</p>
          <div className="flex flex-wrap gap-xs mt-md">
            {opp.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </div>
      </FadeSlideIn>

      {extra && (
        <>
          {/* Requirements */}
          <FadeSlideIn delay={0.15}>
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
              <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Requirements</h2>
              <div className="space-y-xs">
                {extra.requirements.map(r => (
                  <div key={r} className="flex items-start gap-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-body-md text-on-surface">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSlideIn>

          {/* Perks */}
          <FadeSlideIn delay={0.2}>
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
              <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Perks & Benefits</h2>
              <div className="space-y-xs">
                {extra.perks.map(p => (
                  <div key={p} className="flex items-start gap-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <p className="text-body-md text-on-surface">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSlideIn>

          {/* Deadline */}
          <FadeSlideIn delay={0.22}>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-md flex items-center gap-sm">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-label-md text-on-surface font-semibold">Application Deadline</p>
                <p className="text-body-sm text-on-surface-variant">{extra.deadline}</p>
              </div>
            </div>
          </FadeSlideIn>
        </>
      )}

      {/* CTA */}
      <FadeSlideIn delay={0.25}>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button variant="primary" size="lg"
            onClick={() => window.open(opp.applicationUrl, '_blank')}
            className="w-full flex items-center justify-center gap-sm">
            Apply Now <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>
      </FadeSlideIn>

    </div>
  )
}

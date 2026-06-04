'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Zap, CheckCircle2, Target, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'

export default function WelcomePage() {
  const router = useRouter()
  return (
    <div className="space-y-md py-lg">
      <FadeSlideIn>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Zap className="w-5 h-5 text-on-primary" /></div>
          <span className="font-sans font-black text-headline-md text-on-surface">SkillLink</span>
        </div>
      </FadeSlideIn>
      <FadeSlideIn delay={0.1}>
        <h1 className="font-sans font-black text-headline-xl-mobile text-on-surface leading-tight">Build Your Verified Skill Passport</h1>
      </FadeSlideIn>
      <FadeSlideIn delay={0.2}>
        <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-md">
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Over{' '}
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="text-headline-md font-black text-primary">40%</motion.span>
            {' '}of Nigerian graduates are underemployed within 2 years of graduation.
          </p>
        </div>
      </FadeSlideIn>
      <FadeSlideIn delay={0.3}>
        <div className="grid grid-cols-3 gap-sm">
          {[['AI Career Matching', Target], ['Verified Assessments', CheckCircle2], ['Real Opportunities', Sparkles]].map(([label, Icon]: any, i) => (
            <div key={i} className="bg-surface-container rounded-xl p-sm flex flex-col items-center gap-xs text-center">
              <Icon className="w-5 h-5 text-primary" />
              <p className="text-label-sm text-on-surface font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </FadeSlideIn>
      <FadeSlideIn delay={0.4}>
        <Button variant="primary" size="lg" className="w-full" onClick={() => router.push('/academic')}>
          Build My Passport
        </Button>
      </FadeSlideIn>
    </div>
  )
}
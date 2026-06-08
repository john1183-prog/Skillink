'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useOnboardingStore } from '@/lib/store/onboardingStore'
import { cn } from '@/lib/utils/cn'

const INTERESTS = ['Data Science','Web Development','Embedded Systems','Renewable Energy','AI & Machine Learning','Cybersecurity','Product Design','Mobile Development','Cloud Computing','IoT','Robotics','Fintech']

export default function GoalsPage() {
  const router = useRouter()
  const { goals, toggleGoal } = useOnboardingStore()

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-md py-lg">
      <div>
        <h1 className="font-sans font-black text-headline-md text-on-surface">Your Interests</h1>
        <p className="text-label-sm text-on-surface-variant font-mono uppercase tracking-wider mt-xs">Step 2 of 3 · Select at least 3</p>
      </div>
      <div className="flex flex-wrap gap-xs">
        {INTERESTS.map(interest => {
          const active = goals.includes(interest)
          return (
            <motion.button key={interest} whileTap={{ scale: 0.95 }}
              onClick={() => toggleGoal(interest)}
              className={cn('px-sm py-xs rounded-full text-label-sm font-semibold border transition-all',
                active ? 'bg-primary text-on-primary border-primary shadow-glow-sm' : 'bg-surface-container border-outline-variant/40 text-on-surface-variant hover:border-primary/40 hover:text-on-surface')}>
              {interest}
            </motion.button>
          )
        })}
      </div>
      <Button variant="primary" size="md" className="w-full" disabled={goals.length < 3} onClick={() => router.push('/career-compass/test')}>
        Continue {goals.length > 0 && `(${goals.length} selected)`}
      </Button>
    </motion.div>
  )
}
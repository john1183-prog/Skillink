'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCareerStore } from '@/lib/store/careerStore'
import { ConstellationMap } from '@/components/three/ConstellationMap'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { cn } from '@/lib/utils/cn'
import { mockCareerPaths } from '@/lib/demo/mockData'

const QUESTIONS = [
  { id: 'q1', text: 'Which best describes your ideal work style?', options: ['Analysing patterns in structured data', 'Building physical or embedded systems', 'Designing sustainable infrastructure', 'Creating products people interact with'] },
  { id: 'q2', text: 'Which industry excites you most?', options: ['Finance & Fintech', 'Hardware & Manufacturing', 'Energy & Environment', 'Technology & Software'] },
  { id: 'q3', text: 'What type of problem do you prefer solving?', options: ['Finding insights in large datasets', 'Making machines work efficiently', 'Reducing energy waste at scale', 'Improving how people interact with systems'] },
  { id: 'q4', text: 'How do you prefer to communicate results?', options: ['Charts, dashboards, and reports', 'Technical documentation and schematics', 'Impact assessments and proposals', 'Prototypes and user interfaces'] },
  { id: 'q5', text: 'Pick the tool you would most like to master:', options: ['Python & SQL', 'C/C++ & Microcontrollers', 'AutoCAD & Solar PV Software', 'React & Mobile Frameworks'] },
]

export default function CareerTestPage() {
  const router = useRouter()
  const { setAnswer, completeTest } = useCareerStore()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showConstellation, setShowConstellation] = useState(false)
  const [direction, setDirection] = useState(1)

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  const handleSelect = (opt: string) => {
    if (selected !== null) return
    setSelected(opt)
    setAnswer(q.id, opt)
    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setDirection(1)
        setCurrent(c => c + 1)
        setSelected(null)
      } else {
        completeTest()
        setShowConstellation(true)
      }
    }, 600)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      {showConstellation && (
        <ConstellationMap
          careers={mockCareerPaths.map(c => c.title)}
          onComplete={() => router.push('/career-compass/results')}
        />
      )}

      <FadeSlideIn>
        <div>
          <h1 className="font-sans font-black text-headline-md text-on-surface">Career Compass</h1>
          <p className="text-label-sm text-on-surface-variant font-mono uppercase tracking-wider mt-xs">
            Question {current + 1} of {QUESTIONS.length}
          </p>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-tertiary-container rounded-full"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </FadeSlideIn>

      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: direction * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-md">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
            <p className="font-sans font-bold text-body-lg text-on-surface">{q.text}</p>
          </div>
          <div className="space-y-sm">
            {q.options.map((opt, i) => (
              <motion.button key={opt} whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleSelect(opt)}
                className={cn(
                  'w-full text-left p-md rounded-xl border transition-all font-sans text-body-md',
                  selected === opt ? 'bg-primary text-on-primary border-primary shadow-glow' : 'bg-surface-container border-outline-variant/30 text-on-surface hover:border-primary/40 hover:bg-surface-container-high'
                )}>
                <span className="font-mono text-[10px] text-current/50 uppercase tracking-widest mr-sm">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
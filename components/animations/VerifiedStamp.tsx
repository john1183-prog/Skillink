'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'

interface VerifiedStampProps {
  isVisible?: boolean
  skillName?: string
  triggerConfetti?: boolean
}

export function VerifiedStamp({ isVisible = false, skillName = 'Skill', triggerConfetti = true }: VerifiedStampProps) {
  useEffect(() => {
    if (!isVisible || !triggerConfetti) return
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 180, spread: 80, colors: ['#0038D1', '#B9C3FF', '#FFFFFF', '#5052DD'], origin: { y: 0.4 } })
    })
  }, [isVisible, triggerConfetti])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ rotateY: 90, scale: 0.7, opacity: 0 }}
          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
          style={{ perspective: 1000 }}
          className="flex flex-col items-center gap-sm"
        >
          <div className="w-28 h-28 rounded-full border-4 border-tertiary-container bg-tertiary-container/20 flex flex-col items-center justify-center shadow-glow">
            <CheckCircle2 className="w-10 h-10 text-on-tertiary-container mb-1" />
            <span className="font-mono text-[9px] font-black text-on-tertiary-container uppercase tracking-[0.15em]">Verified</span>
          </div>
          <div className="text-center">
            <p className="font-sans font-bold text-body-md text-on-surface">{skillName}</p>
            <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">
              Added to your passport
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VerifiedStamp

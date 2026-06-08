'use client'
import { useEffect } from 'react'
import { motion } from 'motion/react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-md px-margin-mobile text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 rounded-2xl bg-error-container flex items-center justify-center mb-sm">
        <span className="text-2xl">⚡</span>
      </motion.div>
      <h1 className="text-headline-md font-black text-on-surface font-sans">Something went wrong</h1>
      <p className="text-body-md text-on-surface-variant max-w-sm">SkillLink hit an unexpected error. Your progress is saved.</p>
      <button onClick={reset} className="bg-primary text-on-primary rounded-DEFAULT px-md py-sm font-semibold transition-all active:scale-[0.98]">
        Try again
      </button>
    </div>
  )
}

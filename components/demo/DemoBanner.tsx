'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Zap, X, RotateCcw } from 'lucide-react'
import { DEMO } from '@/lib/demo/demoConfig'
import { useSkillStore } from '@/lib/store/skillStore'
import { useAssessmentStore } from '@/lib/store/assessmentStore'
import { useCareerStore } from '@/lib/store/careerStore'

export function DemoBanner() {
  const [visible, setVisible] = useState(false)
  const { resetSkills } = useSkillStore()
  const { resetAssessment } = useAssessmentStore()
  const { resetTest } = useCareerStore()

  useEffect(() => {
    if (!DEMO.isEnabled) return
    const dismissed = sessionStorage.getItem('skilllink-demo-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  if (!DEMO.isEnabled) return null

  const dismiss = () => { setVisible(false); sessionStorage.setItem('skilllink-demo-dismissed', 'true') }

  const reset = () => {
    resetSkills()
    resetAssessment()
    resetTest()
    sessionStorage.removeItem('skilllink-demo-dismissed')
    setVisible(true)
    window.location.href = '/dashboard'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -48, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 h-9 bg-tertiary-container text-on-tertiary-container flex items-center justify-between px-margin-mobile"
        >
          <div className="flex items-center gap-xs min-w-0">
            <Zap className="w-3 h-3 shrink-0" />
            <span className="font-mono font-bold uppercase tracking-wider text-[10px] truncate">
              Demo · {DEMO.student.name} · FUTA EEE · {DEMO.student.level}
            </span>
          </div>
          <div className="flex items-center gap-sm shrink-0">
            <button onClick={reset} className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button onClick={dismiss} className="opacity-60 hover:opacity-100 transition-opacity ml-xs">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DemoBanner

'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useAssessmentStore } from '@/lib/store/assessmentStore'
import { useSkillStore } from '@/lib/store/skillStore'
import { pythonAssessment } from '@/lib/demo/mockData'
import { AssessmentResult } from '@/types'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function AssessmentPage() {
  const router = useRouter()
  const { currentQuestionIndex, answers, nextQuestion, answerQuestion, completeAssessment, setTimeRemaining: storeSetTime, resetAssessment } = useAssessmentStore()
  const { verifySkill } = useSkillStore()
  const [timeLeft, setTimeLeft] = useState(240)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [finishing, setFinishing] = useState(false)

  // Reset store state on every mount so re-entering the assessment always starts fresh
  useEffect(() => {
    resetAssessment()
    setTimeLeft(240)
  }, []) // eslint-disable-line
  const questions = pythonAssessment
  const q = questions[currentQuestionIndex]
  const timePercent = timeLeft / 240

  const getStrokeColor = () => {
    if (timePercent > 0.5) return '#0038d1'
    if (timePercent > 0.2) return '#3636c5'
    return '#ba1a1a'
  }

  const handleComplete = useCallback(() => {
    if (finishing) return
    setFinishing(true)
    const currentAnswers = useAssessmentStore.getState().answers
    let correct = 0
    questions.forEach((q, idx) => { if (currentAnswers[idx] === q.correctIndex) correct++ })
    const score = Math.round((correct / questions.length) * 100)
    if (score >= 70) verifySkill('Python Programming', score)
    const result: AssessmentResult = {
      skillName: 'Python Programming', score, passed: score >= 70,
      correctCount: correct, totalQuestions: questions.length,
      completionTimeSeconds: 240 - timeLeft, completedAt: new Date().toISOString()
    }
    completeAssessment(result)
    router.push('/skills/result')
  }, [finishing, questions, verifySkill, completeAssessment, router, timeLeft])

  useEffect(() => {
    if (finishing || currentQuestionIndex >= questions.length) return
    if (timeLeft <= 0) { handleComplete(); return }
    const interval = setInterval(() => {
      setTimeLeft(t => {
        const next = t - 1
        storeSetTime(next)
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft, finishing, currentQuestionIndex, questions.length, handleComplete, storeSetTime])

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null || finishing) return
    setSelectedOpt(idx)
    const correct = idx === q.correctIndex
    setIsCorrect(correct)
    answerQuestion(currentQuestionIndex, idx)
    setTimeout(() => {
      setSelectedOpt(null)
      setIsCorrect(null)
      if (currentQuestionIndex >= questions.length - 1) handleComplete()
      else nextQuestion()
    }, 800)
  }

  if (finishing || !q) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-sm">
          <div className="w-12 h-12 rounded-full border-2 border-t-primary border-primary/20 animate-spin mx-auto" />
          <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider animate-pulse">Computing results...</p>
        </div>
      </div>
    )
  }

  const radius = 45, circ = 2 * Math.PI * radius
  const strokeColor = getStrokeColor()
  const mins = Math.floor(timeLeft / 60), secs = timeLeft % 60

  return (
    <div className="max-w-2xl mx-auto space-y-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans font-black text-headline-md text-on-surface">Python Assessment</h1>
          <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <motion.div animate={timeLeft < 30 ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, repeat: timeLeft < 30 ? Infinity : 0, repeatDelay: 0.4 }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#282a32" strokeWidth="6" />
            <motion.circle cx="50" cy="50" r={radius} fill="none" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: circ * (1 - timePercent), stroke: strokeColor }}
              transition={{ strokeDashoffset: { duration: 1, ease: 'linear' }, stroke: { duration: 0.8 } }}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }} />
            <text x="50" y="46" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="monospace" fill={strokeColor}>{mins}:{String(secs).padStart(2,'0')}</text>
            <text x="50" y="60" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#c4c5d9">TIME LEFT</text>
          </svg>
        </motion.div>
      </div>

      <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-primary to-tertiary-container rounded-full"
          animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <p className="font-sans font-bold text-body-lg text-on-surface">{q.question}</p>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-sm">
        {q.options.map((opt, i) => {
          const state = selectedOpt === i ? (isCorrect ? 'correct' : 'wrong') : selectedOpt !== null && i === q.correctIndex ? 'reveal' : 'idle'
          return (
            <motion.button key={`${currentQuestionIndex}-${i}`}
              whileTap={{ scale: selectedOpt === null ? 0.98 : 1 }}
              animate={state === 'wrong' ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              onClick={() => handleSelect(i)}
              className={cn(
                'w-full text-left p-md rounded-xl border transition-all font-sans text-body-md flex items-center gap-sm',
                state === 'correct' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                state === 'wrong'   ? 'bg-error-container border-error/40 text-error' :
                state === 'reveal'  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                'bg-surface-container border-outline-variant/30 text-on-surface hover:border-primary/40 hover:bg-surface-container-high'
              )}>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 shrink-0">{String.fromCharCode(65+i)}.</span>
              <span className="flex-1">{opt}</span>
              {state === 'correct' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /></motion.div>}
              {state === 'wrong'   && <XCircle className="w-5 h-5 text-error shrink-0" />}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
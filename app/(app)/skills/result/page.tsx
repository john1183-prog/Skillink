'use client'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useAssessmentStore } from '@/lib/store/assessmentStore'
import { VerifiedStamp } from '@/components/animations/VerifiedStamp'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { XCircle, RotateCcw } from 'lucide-react'

export default function ResultPage() {
  const router = useRouter()
  const { result, resetAssessment } = useAssessmentStore()

  useEffect(() => {
    if (!result) router.replace('/skills/gap-analysis')
  }, [result, router])

  if (!result) return null

  const { score, passed, correctCount, totalQuestions, skillName } = result

  return (
    <div className="max-w-lg mx-auto space-y-md py-md">
      <FadeSlideIn>
        <div className="text-center">
          <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Assessment Complete</p>
          <h1 className="font-sans font-black text-headline-md text-on-surface mt-xs">{skillName}</h1>
        </div>
      </FadeSlideIn>

      {passed ? (
        <>
          <FadeSlideIn delay={0.1} className="flex justify-center">
            <VerifiedStamp isVisible={true} skillName={skillName} triggerConfetti={true} />
          </FadeSlideIn>

          <FadeSlideIn delay={0.4}>
            <div className="bg-surface-container-lowest border border-tertiary-container/30 rounded-xl p-md shadow-card text-center space-y-sm">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.7 }}
                className="text-5xl font-black text-primary font-mono">
                {score}%
              </motion.div>
              <div className="flex items-center justify-center gap-sm">
                <Badge variant="verified">✓ Verified</Badge>
                <span className="text-label-sm text-on-surface-variant font-mono">{correctCount}/{totalQuestions} correct</span>
              </div>
              <p className="text-body-md text-on-surface-variant">
                <strong className="text-on-tertiary-container">{skillName}</strong> is now on your SkillLink Passport.
              </p>
            </div>
          </FadeSlideIn>

          <FadeSlideIn delay={0.6}>
            <Button variant="primary" size="lg" className="w-full" onClick={() => router.push('/passport')}>
              View My Passport
            </Button>
          </FadeSlideIn>
        </>
      ) : (
        <>
          <FadeSlideIn delay={0.1} className="flex justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
              <XCircle className="w-20 h-20 text-error" />
            </motion.div>
          </FadeSlideIn>

          <FadeSlideIn delay={0.2}>
            <div className="bg-surface-container-lowest border border-error/20 rounded-xl p-md text-center space-y-sm">
              <div className="text-4xl font-black text-error font-mono">{score}%</div>
              <p className="text-body-md text-on-surface-variant">
                You need <strong className="text-on-surface">70%</strong> to verify. You scored {correctCount}/{totalQuestions} correct.
              </p>
              <p className="text-label-sm text-on-surface-variant">Review the material and try again.</p>
            </div>
          </FadeSlideIn>

          <FadeSlideIn delay={0.3} className="space-y-sm">
            <Button variant="primary" size="md" className="w-full" onClick={() => { resetAssessment(); router.push('/skills/assessment/python') }}>
              <RotateCcw className="w-4 h-4 mr-xs" /> Try Again
            </Button>
            <Button variant="outline" size="md" className="w-full" onClick={() => router.push('/skills/gap-analysis')}>
              Back to Skills
            </Button>
          </FadeSlideIn>
        </>
      )}
    </div>
  )
}
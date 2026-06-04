'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuthStore } from '@/lib/store/authStore'

const SkillOrb = dynamic(() => import('@/components/three/SkillOrb').then(m => m.SkillOrb), {
  ssr: false,
  loading: () => (
    <div className="w-64 h-64 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  ),
})

const WORDS = ['From', 'Certificate', 'Holder', 'to', 'Verified', 'Talent']

export default function SplashPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 3200
    const interval = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => router.push(isAuthenticated ? '/dashboard' : '/login'), 300)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [router, isAuthenticated])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-lg px-margin-mobile relative overflow-hidden">
      <div className="absolute inset-0 ambient-glow-primary opacity-30 pointer-events-none" style={{ top: '20%' }} />

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <SkillOrb />
      </motion.div>

      <div className="text-center space-y-sm z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-xs mb-xs">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-[10px] font-black text-on-primary font-mono">SL</span>
          </div>
          <span className="font-sans font-black text-headline-md text-on-surface tracking-tight">SkillLink</span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0">
          {WORDS.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`font-sans text-body-lg ${w === 'Verified' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
              {w}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="w-48 space-y-xs z-10">
        <div className="h-0.5 bg-surface-container-high rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }} />
        </div>
        <p className="text-[10px] font-mono text-on-surface-variant text-center uppercase tracking-widest">
          Loading
        </p>
      </motion.div>
    </div>
  )
}

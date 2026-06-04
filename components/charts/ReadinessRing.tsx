'use client'
import React from 'react'
import { motion } from 'motion/react'
import { CountUp } from '@/components/animations/CountUp'

export function ReadinessRing({ score }: { score: number }) {
  const size = 160, sw = 10, r = (size - sw) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5052dd" />
              <stop offset="50%" stopColor="#1b4fff" />
              <stop offset="100%" stopColor="#0038d1" />
            </linearGradient>
          </defs>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f8" strokeWidth={sw} className="dark:stroke-surface-container-high" />
          <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={sw}
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CountUp from={0} to={score} duration={1.5} suffix="%" className="text-3xl font-black text-on-surface tracking-tighter font-mono leading-none" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-on-surface-variant mt-0.5">Readiness</span>
        </div>
      </div>
    </div>
  )
}

export default ReadinessRing

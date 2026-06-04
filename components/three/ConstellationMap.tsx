'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const STARS = [
  { cx: '15%', cy: '25%' }, { cx: '28%', cy: '45%' }, { cx: '42%', cy: '20%' },
  { cx: '55%', cy: '38%' }, { cx: '35%', cy: '60%' }, { cx: '68%', cy: '22%' },
  { cx: '72%', cy: '55%' }, { cx: '20%', cy: '70%' }, { cx: '50%', cy: '72%' },
  { cx: '82%', cy: '40%' }, { cx: '88%', cy: '68%' }, { cx: '10%', cy: '50%' },
]
const LINES = [
  ['15%','25%','28%','45%'], ['28%','45%','42%','20%'], ['42%','20%','55%','38%'],
  ['55%','38%','68%','22%'], ['55%','38%','72%','55%'], ['28%','45%','35%','60%'],
  ['35%','60%','50%','72%'], ['72%','55%','82%','40%'], ['82%','40%','88%','68%'],
  ['20%','70%','35%','60%'],
]
const MATCH_STARS = [
  { cx: '55%', cy: '38%', lx: '58%', ly: '32%' },
  { cx: '68%', cy: '22%', lx: '71%', ly: '16%' },
  { cx: '72%', cy: '55%', lx: '75%', ly: '49%' },
]

interface ConstellationMapProps {
  careers?: string[]
  skills?: string[]
  onComplete?: () => void
}

export function ConstellationMap({ careers = [], skills = [], onComplete }: ConstellationMapProps) {
  const [phase, setPhase] = useState<'stars' | 'lines' | 'labels' | 'done'>('stars')
  const labels = (careers.length > 0 ? careers : skills).slice(0, 3)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('lines'), 1200)
    const t2 = setTimeout(() => setPhase('labels'), 2000)
    const t3 = setTimeout(() => { setPhase('done'); onComplete?.() }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 bg-inverse-surface/95 flex items-center justify-center cursor-pointer"
          onClick={() => { setPhase('done'); onComplete?.() }}
        >
          <div className="absolute inset-0 ambient-glow-primary opacity-20" />
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            {STARS.map((s, i) => (
              <motion.circle key={i} cx={s.cx} cy={s.cy} r="2.5" fill="#B9C3FF"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.7, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.3 }} />
            ))}
            {phase !== 'stars' && LINES.map((l, i) => (
              <motion.line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]}
                stroke="#0038D1" strokeWidth="1" strokeOpacity="0.35"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.4 }} />
            ))}
            {(phase === 'labels') && MATCH_STARS.map((s, i) => (
              <motion.circle key={`m${i}`} cx={s.cx} cy={s.cy} r="7" fill="#0038D1" fillOpacity="0.8"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }} />
            ))}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
          {phase === 'labels' && (
            <div className="absolute inset-0 pointer-events-none">
              {MATCH_STARS.map((s, i) => (
                <motion.div key={i}
                  style={{ position: 'absolute', left: s.lx, top: s.ly, transform: 'translateY(-50%)' }}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                  className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-white whitespace-nowrap"
                >
                  {labels[i] ?? `Match ${i + 1}`}
                </motion.div>
              ))}
            </div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-8 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Tap to continue
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConstellationMap

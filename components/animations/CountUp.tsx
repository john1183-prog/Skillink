'use client'
import React, { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, motion } from 'motion/react'

export function CountUp({ from = 0, to, duration = 1.5, suffix = '', className }: {
  from?: number; to: number; duration?: number; suffix?: string; className?: string
}) {
  const val = useMotionValue(from)
  const spring = useSpring(val, { stiffness: 60, damping: 15, duration })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => { val.set(to) }, [to, val])

  return <motion.span className={className}>{display}</motion.span>
}

export default CountUp

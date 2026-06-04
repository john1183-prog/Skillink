'use client'
import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'

export function FadeSlideIn({ children, delay = 0, direction = 'up', duration = 0.5, className, yOffset = 16 }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left'; duration?: number; className?: string; yOffset?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? yOffset : 0, x: direction === 'left' ? -yOffset : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeSlideIn

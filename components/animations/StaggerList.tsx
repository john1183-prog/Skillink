'use client'
import React, { Children } from 'react'
import { motion } from 'motion/react'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } } }

export function StaggerList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className={className}>
      {Children.map(children, (child, idx) =>
        child ? <motion.div key={idx} variants={item}>{child}</motion.div> : null
      )}
    </motion.div>
  )
}

export default StaggerList

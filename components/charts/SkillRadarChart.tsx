'use client'
import React from 'react'
import { motion } from 'motion/react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { useSkillStore } from '@/lib/store/skillStore'
import type { SkillGap } from '@/types'

export function SkillRadarChart({ gaps }: { gaps?: SkillGap[] }) {
  const { skillGaps } = useSkillStore()
  const data = (gaps ?? skillGaps).map(g => ({
    skill: g.skill.replace(' & ', ' & ').split(' ').slice(0, 2).join(' '),
    Current: g.current,
    Required: g.required,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="rgba(196,197,217,0.3)" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#c4c5d9', fontWeight: 600 }} />
          <Radar name="Required" dataKey="Required" stroke="#5052dd" fill="#5052dd" fillOpacity={0.15} animationDuration={1200} />
          <Radar name="Current" dataKey="Current" stroke="#0038d1" fill="#0038d1" fillOpacity={0.35} animationDuration={1200} animationBegin={300} />
          <Tooltip contentStyle={{ background: '#1d1f28', border: '1px solid rgba(196,197,217,0.2)', borderRadius: '8px', fontSize: '12px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default SkillRadarChart

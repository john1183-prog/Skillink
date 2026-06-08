import { create } from 'zustand'
import { SkillGap, VerifiedSkill, RoadmapMilestone } from '@/types'
import { DEMO } from '@/lib/demo/demoConfig'
import { mockVerifiedSkills, mockRoadmapMilestones } from '@/lib/demo/mockData'

/** Single source of truth for employability readiness score */
export function computeReadiness(verifiedSkills: VerifiedSkill[]): number {
  if (verifiedSkills.length === 0) return 50
  return Math.min(100, Math.round(50 + verifiedSkills.length * 15 + (verifiedSkills[0]?.score ?? 0) * 0.1))
}

interface SkillState {
  verifiedSkills: VerifiedSkill[]
  skillGaps: SkillGap[]
  roadmapMilestones: RoadmapMilestone[]
  verifySkill: (skillName: string, score: number) => void
  resetSkills: () => void
}

export const useSkillStore = create<SkillState>((set) => ({
  verifiedSkills: [...mockVerifiedSkills],
  skillGaps: [...DEMO.skillGaps],
  roadmapMilestones: [...mockRoadmapMilestones],

  verifySkill: (skillName, score) => set((state) => {
    const alreadyVerified = state.verifiedSkills.some(v => v.skillName === skillName)
    let updatedVerified = [...state.verifiedSkills]
    if (!alreadyVerified) {
      updatedVerified.push({
        skillId: `v-${skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        skillName,
        score,
        proficiency: score >= 90 ? 'Advanced' : score >= 70 ? 'Intermediate' : 'Foundational',
        verifiedAt: new Date().toISOString().split('T')[0],
        isVerified: true,
      })
    } else {
      updatedVerified = updatedVerified.map(v =>
        v.skillName === skillName ? { ...v, score, verifiedAt: new Date().toISOString().split('T')[0] } : v
      )
    }
    const updatedGaps = state.skillGaps.map(g => {
      if (g.skill === skillName) {
        const gap = Math.max(0, g.required - score)
        return { ...g, current: score, gap, priority: (gap > 40 ? 'high' : gap > 15 ? 'medium' : 'low') as SkillGap['priority'] }
      }
      return g
    })
    const updatedMilestones = state.roadmapMilestones.map((m, idx) => {
      if (m.relatedSkills.includes(skillName) && m.status !== 'completed') return { ...m, status: 'completed' as const }
      if (idx > 0 && state.roadmapMilestones[idx-1].relatedSkills.includes(skillName) && m.status === 'locked') return { ...m, status: 'in_progress' as const }
      return m
    })
    return { verifiedSkills: updatedVerified, skillGaps: updatedGaps, roadmapMilestones: updatedMilestones }
  }),

  resetSkills: () => set({
    verifiedSkills: [...mockVerifiedSkills],
    skillGaps: [...DEMO.skillGaps],
    roadmapMilestones: [...mockRoadmapMilestones],
  }),
}))

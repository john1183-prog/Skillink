import type { SkillGap } from '@/types'

export const DEMO = {
  isEnabled: true,
  responseDelay: 1200,
  student: {
    name: 'Amara Okonkwo',
    email: 'amara@futa.edu.ng',
    institution: 'Federal University of Technology, Akure (FUTA)',
    department: 'Electrical & Electronic Engineering',
    level: '300L',
  },
  skillGaps: [
    { skill: 'Python Programming',     current: 20, required: 85, gap: 65, priority: 'high'   },
    { skill: 'Data Visualization',     current: 35, required: 80, gap: 45, priority: 'high'   },
    { skill: 'Machine Learning Basics',current: 10, required: 75, gap: 65, priority: 'high'   },
    { skill: 'SQL & Databases',        current: 45, required: 75, gap: 30, priority: 'medium' },
    { skill: 'Statistical Analysis',   current: 30, required: 70, gap: 40, priority: 'medium' },
  ] as SkillGap[],
} as const

export interface User {
  id: string
  name: string
  email: string
  institution: string
  department: string
  level: string
  interests: string[]
}

export interface CareerPath {
  id: string
  title: string
  description: string
  matchReason: string
  demandScore: number
  matchPercentage: number
  requiredSkills: string[]
  averageSalary: string
  skillGaps: CareerSkillGap[]
}

export interface CareerSkillGap {
  skillName: string
  priority: 'High' | 'Medium' | 'Low'
  currentLevel: number
  requiredLevel: number
  recommendedResource: { title: string; url: string }
}

export interface SkillGap {
  skill: string
  current: number
  required: number
  gap: number
  priority: 'high' | 'medium' | 'low'
}

export interface VerifiedSkill {
  skillId: string
  skillName: string
  score: number
  proficiency: 'Foundational' | 'Intermediate' | 'Advanced'
  verifiedAt: string
  isVerified: boolean
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface AssessmentResult {
  skillName: string
  score: number
  passed: boolean
  correctCount: number
  totalQuestions: number
  completionTimeSeconds: number
  completedAt: string
}

export interface Opportunity {
  id: string
  title: string
  company: string
  type: 'Internship' | 'Hackathon' | 'Project' | 'Full-time' | 'Scholarship' | 'Bootcamp'
  description: string
  tags: string[]
  matchScore: number
  applicationUrl: string
}

export interface RoadmapMilestone {
  id: string
  title: string
  desc: string
  status: 'completed' | 'in_progress' | 'locked'
  relatedSkills: string[]
  resourceUrl?: string
}

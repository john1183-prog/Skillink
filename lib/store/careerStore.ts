import { create } from 'zustand'
import { CareerPath } from '@/types'
import { mockCareerPaths } from '@/lib/demo/mockData'

interface CareerState {
  recommendations: CareerPath[]
  selectedPath: CareerPath | null
  testCompleted: boolean
  answers: Record<string, string>
  setAnswer: (questionId: string, value: string) => void
  completeTest: () => void
  selectPath: (pathId: string) => void
  resetTest: () => void
}

export const useCareerStore = create<CareerState>((set) => ({
  recommendations: mockCareerPaths,
  selectedPath: mockCareerPaths[0],
  testCompleted: true,
  answers: { q_logic: 'structured_data', q_industry: 'finance_telecom', q_scale: 'optimizations' },
  setAnswer: (qId, value) => set((state) => ({ answers: { ...state.answers, [qId]: value } })),
  completeTest: () => set({ testCompleted: true }),
  selectPath: (pathId) => set((state) => ({ selectedPath: state.recommendations.find(p => p.id === pathId) ?? null })),
  resetTest: () => set({ testCompleted: false, answers: {}, selectedPath: null }),
}))

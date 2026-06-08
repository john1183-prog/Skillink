import { create } from 'zustand'
import { AssessmentResult } from '@/types'

interface AssessmentState {
  currentQuestionIndex: number
  answers: Record<number, number>
  timeRemaining: number
  isComplete: boolean
  result: AssessmentResult | null
  answerQuestion: (questionIndex: number, answerIndex: number) => void
  nextQuestion: () => void
  setTimeRemaining: (t: number) => void
  completeAssessment: (result: AssessmentResult) => void
  resetAssessment: () => void
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 240,
  isComplete: false,
  result: null,
  answerQuestion: (questionIndex, answerIndex) => set((state) => ({
    answers: { ...state.answers, [questionIndex]: answerIndex },
  })),
  nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  setTimeRemaining: (t) => set({ timeRemaining: t }),
  completeAssessment: (result) => set({ isComplete: true, result }),
  resetAssessment: () => set({ currentQuestionIndex: 0, answers: {}, timeRemaining: 240, isComplete: false, result: null }),
}))

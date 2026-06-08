import { create } from 'zustand'

interface OnboardingState {
  step: number
  institution: string
  department: string
  level: string
  goals: string[]
  setStep: (step: number) => void
  setAcademicData: (data: { institution: string; department: string; level: string }) => void
  toggleGoal: (goal: string) => void
  complete: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  institution: '',
  department: '',
  level: '',
  goals: [],
  setStep: (step) => set({ step }),
  setAcademicData: (data) => set(data),
  toggleGoal: (goal) => set((state) => ({
    goals: state.goals.includes(goal)
      ? state.goals.filter(g => g !== goal)
      : [...state.goals, goal],
  })),
  complete: () => set({ step: 3 }),
}))

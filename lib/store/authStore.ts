import { create } from 'zustand'
import { User } from '@/types'
import { DEMO } from '@/lib/demo/demoConfig'

const demoUser: User = {
  id: 'demo-futa-001',
  name: DEMO.student.name,
  email: DEMO.student.email,
  institution: DEMO.student.institution,
  department: DEMO.student.department,
  level: DEMO.student.level,
  interests: ['Data Science', 'AI/ML', 'IoT', 'Renewable Energy'],
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO.isEnabled ? demoUser : null,
  token: DEMO.isEnabled ? 'demo-token-futa-001' : null,
  isAuthenticated: DEMO.isEnabled,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setUser: (user) => set({ user }),
}))

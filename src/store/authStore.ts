import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  role: string
  organization: string
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock authentication logic
    if (email && password.length >= 8) {
      const mockUser: User = {
        id: 'USR001',
        name: 'Dr. Evelyn Reed',
        email: email,
        role: 'Radiologist',
        organization: 'Stanford Medical Center',
        token: 'mock_jwt_' + Date.now(),
      }
      
      localStorage.setItem('skolyn_user', JSON.stringify(mockUser))
      set({ user: mockUser, isAuthenticated: true })
      return true
    }
    return false
  },

  logout: () => {
    localStorage.removeItem('skolyn_user')
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: () => {
    const storedUser = localStorage.getItem('skolyn_user')
    if (storedUser) {
      const user = JSON.parse(storedUser) as User
      set({ user, isAuthenticated: true })
    }
  },
}))
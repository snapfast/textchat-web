'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types'
import { apiService } from '@/lib/api'
import { AuthManager } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (token: string, user?: User) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = () => {
      console.log('Initializing auth...')
      const user = AuthManager.getUser()
      if (user) {
        console.log('Found existing auth:', user.username)
        setUser(user)
      } else {
        console.log('No existing auth found')
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (token: string, userData?: User) => {
    console.log('AuthContext login called with token')
    
    try {
      let user: User | null = null
      
      if (userData) {
        console.log('Using provided user data:', userData.username)
        AuthManager.setAuth(token, userData)
        user = userData
      } else {
        console.log('Fetching user data from API...')
        user = await apiService.fetchAndSetCurrentUser(token)
      }
      
      if (user) {
        console.log('Login successful for user:', user.username)
        setUser(user)
      } else {
        console.error('Login failed: no user data')
        throw new Error('Failed to get user data')
      }
    } catch (error) {
      console.error('Login failed:', error)
      AuthManager.clearAuth()
      throw error
    }
  }

  const refreshUser = async () => {
    try {
      const userData = AuthManager.getUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  const logout = () => {
    console.log('Logging out...')
    AuthManager.clearAuth()
    setUser(null)
    router.push('/')
  }

  const isAuthenticated = !!user && AuthManager.isAuthenticated()

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
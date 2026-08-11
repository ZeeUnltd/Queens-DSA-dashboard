import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { login as loginRequest, refreshAccessToken } from '../lib/api-client'
import {
  clearAuthSession,
  getAuthEventName,
  getRefreshExpiry,
  getStoredSession,
  getTokenExpiry,
  saveAuthSession,
  type StoredAuthSession,
} from '../lib/auth-session'
import type { AuthData, LoginRequest } from '../types/auth'

type AuthContextValue = {
  session: StoredAuthSession | null
  isLoading: boolean
  login: (request: LoginRequest) => Promise<AuthData>
  logout: () => void
  refresh: () => Promise<string>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<StoredAuthSession | null>(() => getStoredSession())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sync = () => setSession(getStoredSession())
    window.addEventListener(getAuthEventName(), sync)
    sync()
    setIsLoading(false)
    return () => window.removeEventListener(getAuthEventName(), sync)
  }, [])

  useEffect(() => {
    if (!session) return undefined

    const accessExpiry = getTokenExpiry(session.token.accessToken)
    const refreshExpiry = getRefreshExpiry(session)
    const now = Date.now()
    if (refreshExpiry <= now || (accessExpiry !== null && accessExpiry <= now)) {
      clearAuthSession()
      window.location.assign('/login')
      return undefined
    }

    const refreshAt = accessExpiry ? accessExpiry - 60_000 : now + 300_000
    const shouldLogoutAtRefreshExpiry = refreshExpiry <= refreshAt
    const timer = window.setTimeout(() => {
      if (shouldLogoutAtRefreshExpiry) {
        clearAuthSession()
        toast.error('Session expired', { description: 'Please log in again to continue.' })
        window.location.assign('/login')
        return
      }

      void refreshAccessToken().catch(() => {
        toast.error('Session expired', { description: 'Please log in again to continue.' })
        clearAuthSession()
        window.location.assign('/login')
      })
    }, Math.max((shouldLogoutAtRefreshExpiry ? refreshExpiry : refreshAt) - now, 1_000))

    return () => window.clearTimeout(timer)
  }, [session])

  const value = useMemo<AuthContextValue>(() => ({
    session,
    isLoading,
    login: async (request) => {
      const data = await loginRequest(request)
      saveAuthSession(data)
      return data
    },
    logout: clearAuthSession,
    refresh: refreshAccessToken,
  }), [isLoading, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export default AuthProvider
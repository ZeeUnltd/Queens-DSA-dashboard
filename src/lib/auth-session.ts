import type { AuthData, AuthTokenBundle, AuthUserDetails } from '../types/auth'

export type StoredAuthSession = AuthData & { receivedAt: number }

const STORAGE_KEY = 'queensmonie.auth.session'
const AUTH_EVENT = 'queensmonie-auth-change'

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function getAuthEventName() {
  return AUTH_EVENT
}

export function getStoredSession(): StoredAuthSession | null {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredAuthSession
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function saveAuthSession(data: AuthData, receivedAt = Date.now()) {
  const session: StoredAuthSession = { ...data, receivedAt }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  notifyAuthChange()
  return session
}

export function clearAuthSession() {
  sessionStorage.removeItem(STORAGE_KEY)
  notifyAuthChange()
}

export function updateStoredToken(token: AuthTokenBundle, userDetails?: AuthUserDetails) {
  const current = getStoredSession()
  if (!current) return null

  return saveAuthSession(
    {
      ...current,
      token,
      userDetails: userDetails ?? current.userDetails,
      passcodeSet: current.passcodeSet,
    },
    Date.now(),
  )
}

export function getAccessToken() {
  return getStoredSession()?.token.accessToken
}

export function getTokenExpiry(token: string) {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number }
    return typeof decoded.exp === 'number' ? decoded.exp * 1000 : null
  } catch {
    return null
  }
}

export function getRefreshExpiry(session: StoredAuthSession) {
  return session.receivedAt + session.token.refreshExpiryDate * 24 * 60 * 60 * 1000
}
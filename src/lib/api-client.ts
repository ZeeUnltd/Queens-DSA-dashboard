import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiEnvelope, AuthData, AuthResponse, LoginRequest, RefreshTokenRequest } from '../types/auth'
import type { DsaTopCard, GetTransactionsParams, TransactionsPage } from '../types/dashboard'
import {
  clearAuthSession,
  getAccessToken,
  getStoredSession,
  saveAuthSession,
} from './auth-session'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

let refreshPromise: Promise<string> | null = null

function normalizeAuthData(data: AuthData, previous?: AuthData): AuthData {
  return {
    ...data,
    userDetails: {
      ...data.userDetails,
      userName: data.userDetails.userName || previous?.userDetails.userName || '',
      isRM: data.userDetails.isRM ?? previous?.userDetails.isRM ?? false,
    },
  }
}

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise

  const current = getStoredSession()
  if (!current) return Promise.reject(new Error('No active session'))

  const request: RefreshTokenRequest = {
    refreshToken: current.token.refreshToken,
    username: current.userDetails.userName,
  }

  refreshPromise = apiClient
    .post<AuthResponse>('/api/Auth/refressAccessToken', request)
    .then(({ data }) => {
      if (!data.isSuccess) throw new Error(data.message)
      const normalized = normalizeAuthData(data.data, current)
      saveAuthSession(normalized)
      return normalized.token.accessToken
    })
    .catch((error) => {
      clearAuthSession()
      throw error
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
  if (error.response?.status !== 401 || !original || original._retry || original.url?.includes('/api/Auth/refressAccessToken')) {
    return Promise.reject(error)
  }

  original._retry = true
  const token = await refreshAccessToken()
  original.headers.Authorization = `Bearer ${token}`
  return apiClient(original)
})

export async function login(request: LoginRequest) {
  const response = await apiClient.post<AuthResponse>('/api/dashboard/Dashboard Login', request)
  if (!response.data.isSuccess) throw new Error(response.data.message)
  return normalizeAuthData(response.data.data)
}

export async function getDsaActivitiesCards(referralId: number) {
  const response = await apiClient.get<ApiEnvelope<DsaTopCard[]>>('/api/dashboard/GetDSAActivitiesCards', {
    params: { ReferralId: referralId },
  })
  if (!response.data.isSuccess) throw new Error(response.data.message || 'Unable to load dashboard summary')
  return response.data.data
}

export async function getTransactions({
  pageNumber,
  pageSize,
  accountNumber,
  transactionStartDate,
  transactionEndDate,
}: GetTransactionsParams) {
  const response = await apiClient.get<ApiEnvelope<TransactionsPage>>('/api/dashboard/transactions', {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      AccountNumber: accountNumber || undefined,
      TransactionStartDate: transactionStartDate,
      TransactionEndDate: transactionEndDate,
    },
  })
  if (!response.data.isSuccess) throw new Error(response.data.message || 'Unable to load transactions')
  return response.data.data
}

export { apiClient, refreshAccessToken }

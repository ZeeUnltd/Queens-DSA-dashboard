import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiEnvelope, AuthData, AuthResponse, LoginRequest, RefreshTokenRequest } from '../types/auth'
import type { DsaTopCard, ExportTransactionsParams, GetTransactionsParams, RmDsaReportCard, RmDsaSummaryRow, TransactionsPage } from '../types/dashboard'
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

export async function getRmTopCards() {
  const response = await apiClient.get<ApiEnvelope<DsaTopCard[]>>('/api/dashboard/top-cards')
  if (!response.data.isSuccess) throw new Error(response.data.message || 'Unable to load dashboard summary')
  return response.data.data
}

export async function getRmDsaSummary() {
  const response = await apiClient.get<ApiEnvelope<RmDsaSummaryRow[]>>('/api/dashboard/GetAccountsByDSAorByDate')
  if (!response.data.isSuccess) throw new Error(response.data.message || 'Unable to load DSA summary')
  return response.data.data
}

export async function getRmDsaReportCards() {
  const response = await apiClient.get<ApiEnvelope<RmDsaReportCard[]>>('/api/dashboard/GetAllDSAReportCards')
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

export async function exportTransactions({ downloadOptions, transactionStartDate, transactionEndDate, transactionAmount, accountNumber, pageNumber, pageSize }: ExportTransactionsParams) {
  const response = await apiClient.get<Blob>(`/api/dashboard/exportReport/${encodeURIComponent(downloadOptions)}`, {
    params: {
      TransactionStartDate: transactionStartDate,
      TransactionEndDate: transactionEndDate,
      TransactionAmount: transactionAmount,
      AccountNumber: accountNumber || undefined,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    responseType: 'blob',
    validateStatus: () => true,
  })

  if (response.data.type.includes('json') || response.status >= 400) {
    let payload: { isSuccess?: boolean; message?: string; data?: { data?: string; fileName?: string; fileType?: string } }
    try {
      payload = JSON.parse(await response.data.text()) as { isSuccess?: boolean; message?: string }
    } catch {
      throw new Error('Unable to export transactions')
    }
    if (payload.isSuccess === false) throw new Error(payload.message || 'Unable to export transactions')
    if (response.status >= 400) throw new Error(payload.message || 'Unable to export transactions')

    if (!payload.data?.data) throw new Error('Unable to export transactions')

    const binary = atob(payload.data.data)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return {
      blob: new Blob([bytes], { type: payload.data.fileType || 'application/octet-stream' }),
      fileName: payload.data.fileName,
      fileType: payload.data.fileType,
    }
  }

  if (response.status >= 400) throw new Error('Unable to export transactions')

  return {
    blob: response.data,
    fileName: undefined,
    fileType: response.data.type,
  }
}

export { apiClient, refreshAccessToken }

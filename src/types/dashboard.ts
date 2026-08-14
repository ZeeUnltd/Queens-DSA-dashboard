export type DashboardView = 'summary' | 'transactions' | 'balance-movements' | 'kpi-performance' | 'dsa-dashboard' | 'all-dsas'

export type ProductKey = 'easySavings' | 'queensStash' | 'queensLock' | 'myKolo'

export type CustomerBalance = {
  initials: string
  name: string
  accountNumber: string
  values: Record<ProductKey, number>
  directions?: Partial<Record<ProductKey, 'up' | 'down'>>
}

export type ProductCategory = {
  id: 'personal' | 'business'
  label: string
  values: Record<ProductKey, number>
  customers: CustomerBalance[]
}

export type RelationshipManager = {
  name: string
  role: string
  location: string
  grade: string
  referralCode: string
}

export type DirectSalesAgent = {
  id: string
  initials: string
  name: string
  accountsOpened: number
  inflow: number
  outflow: number
  balance: number
  activeMandates: number
}

export type DsaSummaryMetrics = {
  accountsOpened: number
  inflow: number
  outflow: number
  balance: number
}

export type DsaTopCard = {
  title: string
  value: number
}

export type TransactionRecord = {
  id: number
  transactionType: string
  accountTier: number
  amount: number
  charges: number
  beneficiaryAccount: string
  beneficiaryName: string
  beneficiaryBankCode: string
  benefactorAccount: string
  benefactorName: string
  transactionRef: string
  bank: string
  transactionDate: string
  description: string
  transactionStatus: string
  productType: string
  isReversed: boolean
  sourceId: number | null
  channelId: number | null
  walletOps: string | null
  debitacctcurrBal: number
  debitacctnewBal: number
  creditacctcurrBal: number
  creditacctnewBal: number
  sessionId: string | null
  status: string | null
  failureReason: string | null
  channels: string | null
  staffReferralId: number | null
}

export type TransactionsPage = {
  totalRecords: number
  currentPageNumber: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  data: TransactionRecord[]
}

export type GetTransactionsParams = {
  pageNumber: number
  pageSize: number
  accountNumber?: string
  transactionStartDate: string
  transactionEndDate: string
}

export type ExportTransactionsParams = {
  downloadOptions: string
  transactionStartDate: string
  transactionEndDate: string
  transactionAmount?: number
  accountNumber?: string
  pageNumber: number
  pageSize: number
}

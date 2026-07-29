export type DashboardView = 'summary' | 'accounts-opened' | 'balance-movements' | 'kpi-performance'

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

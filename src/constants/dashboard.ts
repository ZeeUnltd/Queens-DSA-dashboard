import type { DashboardView, ProductKey } from '../types/dashboard'

export const DASHBOARD_NAVIGATION: Array<{ id: DashboardView; label: string; href: string }> = [
  { id: 'summary', label: 'Summary', href: '/dashboard' },
  { id: 'accounts-opened', label: 'Accounts Opened', href: '/dashboard/accounts-opened' },
  { id: 'balance-movements', label: 'Balance Movements', href: '/dashboard/balance-movements' },
  { id: 'kpi-performance', label: 'KPI & Performance', href: '/dashboard/kpi-performance' },
]

export const DSA_NAVIGATION: Array<{ id: DashboardView; label: string; href: string }> = [
  { id: 'dsa-dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'all-dsas', label: 'All DSAs', href: '/dashboard/all-dsas' },
]

export const PRODUCT_LABELS: Record<ProductKey, string> = {
  easySavings: 'Easy Savings',
  queensStash: 'Queens Stash',
  queensLock: 'Queens Lock',
  myKolo: 'My Kolo',
}

export const DASHBOARD_COPY = {
  date: 'Fri, 24 July, 2026',
  helpCenter: 'Help Center',
  logout: 'Logout',
  summary: 'Summary',
  total: 'TOTAL',
  category: 'Category',
} as const

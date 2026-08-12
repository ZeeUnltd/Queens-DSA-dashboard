import type { ProductKey } from '../types/dashboard'

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

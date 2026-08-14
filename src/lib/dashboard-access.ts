import { Icons } from '../constants/icons'
import type { DashboardView } from '../types/dashboard'

export const DASHBOARD_NAVIGATION: Array<{ id: DashboardView; label: string; href: string }> = [
  { id: 'summary', label: 'Summary', href: '/dashboard' },
  { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions' },
  { id: 'balance-movements', label: 'Balance Movements', href: '/dashboard/balance-movements' },
  { id: 'kpi-performance', label: 'KPI & Performance', href: '/dashboard/kpi-performance' },
]

export const DSA_NAVIGATION: Array<{ id: DashboardView; label: string; href: string }> = [
  { id: 'dsa-dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'all-dsas', label: 'All DSAs', href: '/dashboard/all-dsas' },

// NOTE: TEST- uncomment the block below to test the DSA dashboard view without access control
  // { id: 'summary', label: 'Summary', href: '/dashboard' },
  // { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions' },
  // { id: 'balance-movements', label: 'Balance Movements', href: '/dashboard/balance-movements' },
  // { id: 'kpi-performance', label: 'KPI & Performance', href: '/dashboard/kpi-performance' },
]

export const navigationIcons = {
  summary: Icons.category,
  transactions: Icons.profile2User,
  'balance-movements': Icons.bank,
  'kpi-performance': Icons.statusUp,
  'dsa-dashboard': Icons.category,
  'all-dsas': Icons.profile2User,
} as const

export function getDashboardNavigation(isRM: boolean) {
  return isRM ? DASHBOARD_NAVIGATION : DSA_NAVIGATION
}

export function getLandingDashboardView(isRM: boolean): DashboardView {
  return !isRM ? 'summary' : 'dsa-dashboard'
}

export function canAccessDashboardView(view: DashboardView, isRM: boolean) {
  if (view === 'dsa-dashboard' || view === 'all-dsas') return !isRM
  if (view === 'transactions' || view === 'balance-movements' || view === 'kpi-performance') return isRM
  return true
}

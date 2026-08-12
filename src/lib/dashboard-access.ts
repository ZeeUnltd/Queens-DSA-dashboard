import { DASHBOARD_NAVIGATION, DSA_NAVIGATION } from '../constants/dashboard'
import type { DashboardView } from '../types/dashboard'

export function getDashboardNavigation(isRM: boolean) {
  return isRM ? DASHBOARD_NAVIGATION : DSA_NAVIGATION
}

export function canAccessDashboardView(view: DashboardView, isRM: boolean) {
  if (view === 'dsa-dashboard' || view === 'all-dsas') return !isRM
  if (view === 'accounts-opened' || view === 'balance-movements' || view === 'kpi-performance') return isRM
  return true
}


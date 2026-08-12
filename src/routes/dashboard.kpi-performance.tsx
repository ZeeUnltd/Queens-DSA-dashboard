import { createFileRoute, redirect } from '@tanstack/react-router'
import KpiPerformancePage from '../app/dashboard/kpi-performance/page'
import { canAccessDashboardView } from '../lib/dashboard-access'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/kpi-performance')({
	beforeLoad: () => {
		if (!canAccessDashboardView('kpi-performance', Boolean(getStoredSession()?.userDetails.isRM))) throw redirect({ to: '/dashboard' })
	},
	component: KpiPerformancePage,
})

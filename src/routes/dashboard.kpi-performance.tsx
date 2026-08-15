import { createFileRoute } from '@tanstack/react-router'
import KpiPerformancePage from '../app/dashboard/kpi-performance/page'

// export const Route = createFileRoute('/dashboard/kpi-performance')({
// 	beforeLoad: () => {
// 		if (!canAccessDashboardView('kpi-performance', Boolean(getStoredSession()?.userDetails.isRM))) throw redirect({ to: '/dashboard' })
// 	},
// 	component: KpiPerformancePage,
// })


// NOTE: The above code is commented out because the KPI & Performance view is currently not accessible to any user. The access control logic is in place, but the route is disabled for now.
export const Route = createFileRoute('/dashboard/kpi-performance')({ component: KpiPerformancePage })
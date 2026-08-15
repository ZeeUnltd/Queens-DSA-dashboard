import { createFileRoute } from '@tanstack/react-router'
import BalanceMovementsPage from '../app/dashboard/balance-movements/page'

// export const Route = createFileRoute('/dashboard/balance-movements')({
// 	beforeLoad: () => {
// 		if (!canAccessDashboardView('balance-movements', Boolean(getStoredSession()?.userDetails.isRM))) throw redirect({ to: '/dashboard' })
// 	},
// 	component: BalanceMovementsPage,
// })

// NOTE: The above code is commented out because the KPI & Performance view is currently not accessible to any user. The access control logic is in place, but the route is disabled for now.

export const Route = createFileRoute('/dashboard/balance-movements')({ component: BalanceMovementsPage })
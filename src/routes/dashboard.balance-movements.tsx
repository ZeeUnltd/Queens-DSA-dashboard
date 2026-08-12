import { createFileRoute, redirect } from '@tanstack/react-router'
import BalanceMovementsPage from '../app/dashboard/balance-movements/page'
import { canAccessDashboardView } from '../lib/dashboard-access'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/balance-movements')({
	beforeLoad: () => {
		if (!canAccessDashboardView('balance-movements', Boolean(getStoredSession()?.userDetails.isRM))) throw redirect({ to: '/dashboard' })
	},
	component: BalanceMovementsPage,
})


// export const Route = createFileRoute('/dashboard/balance-movements')({ component: BalanceMovementsPage })
import { createFileRoute, redirect } from '@tanstack/react-router'
import BalanceMovementsPage from '../app/dashboard/balance-movements/page'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/balance-movements')({
	beforeLoad: () => {
		if (!getStoredSession()?.userDetails.isRM) throw redirect({ to: '/dashboard' })
	},
	component: BalanceMovementsPage,
})

import { createFileRoute, redirect } from '@tanstack/react-router'
import AccountsOpenedPage from '../app/dashboard/accounts-opened/page'
import { canAccessDashboardView } from '../lib/dashboard-access'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/accounts-opened')({
	beforeLoad: () => {
		if (!canAccessDashboardView('accounts-opened', Boolean(getStoredSession()?.userDetails.isRM))) throw redirect({ to: '/dashboard' })
	},
	component: AccountsOpenedPage,
})


// export const Route = createFileRoute('/dashboard/accounts-opened')({ component: AccountsOpenedPage })
import { createFileRoute, redirect } from '@tanstack/react-router'
import AccountsOpenedPage from '../app/dashboard/accounts-opened/page'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/accounts-opened')({
	beforeLoad: () => {
		if (!getStoredSession()?.userDetails.isRM) throw redirect({ to: '/dashboard' })
	},
	component: AccountsOpenedPage,
})

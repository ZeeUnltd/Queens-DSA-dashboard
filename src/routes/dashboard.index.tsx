import { createFileRoute, redirect } from '@tanstack/react-router'
import DashboardPage from '../app/dashboard/page'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/')({
	beforeLoad: () => {
		if (getStoredSession()?.userDetails.isRM) throw redirect({ to: '/dashboard/rm-dashboard' })
	},
	component: DashboardPage,
})

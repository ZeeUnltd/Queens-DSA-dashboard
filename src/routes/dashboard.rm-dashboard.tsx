import { createFileRoute, redirect } from '@tanstack/react-router'
import RmDashboardPage from '../app/dashboard/rm-dashboard/page'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/rm-dashboard')({
  beforeLoad: () => {
    const session = getStoredSession()
    if (!session) throw redirect({ to: '/login' })
    if (!session.userDetails.isRM) throw redirect({ to: '/dashboard' })
  },
  component: RmDashboardPage,
})
import { createFileRoute, redirect } from '@tanstack/react-router'
import AllDsasPage from '../app/dashboard/all-dsas/page'
import { canAccessDashboardView } from '../lib/dashboard-access'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard/all-dsas')({
  beforeLoad: () => {
    const session = getStoredSession()
    if (!session) throw redirect({ to: '/login' })
    if (!canAccessDashboardView('all-dsas', session.userDetails.isRM)) throw redirect({ to: '/dashboard' })
  },
  component: AllDsasPage,
})

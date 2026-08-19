import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    const session = getStoredSession()
    if (!session) throw redirect({ to: '/login' })
  },
  component: DashboardRoute,
})

function DashboardRoute() {
  return <Outlet />
}

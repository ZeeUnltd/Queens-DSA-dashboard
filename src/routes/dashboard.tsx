import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getStoredSession } from '../lib/auth-session'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!getStoredSession()) throw redirect({ to: '/login' })
  },
  component: DashboardRoute,
})

function DashboardRoute() {
  return <Outlet />
}

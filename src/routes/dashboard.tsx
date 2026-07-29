import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({ component: DashboardRoute })

function DashboardRoute() {
  return <Outlet />
}

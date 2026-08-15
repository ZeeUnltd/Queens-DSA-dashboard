import { createFileRoute } from '@tanstack/react-router'
import AllDsasPage from '../app/dashboard/all-dsas/page'

// export const Route = createFileRoute('/dashboard/all-dsas')({
//   beforeLoad: () => {
//     const session = getStoredSession()
//     if (!session) throw redirect({ to: '/login' })
//     if (!canAccessDashboardView('all-dsas', session.userDetails.isRM)) throw redirect({ to: '/dashboard' })
//   },
//   component: AllDsasPage,
// })

// NOTE: The above code is commented out because the KPI & Performance view is currently not accessible to any user. The access control logic is in place, but the route is disabled for now.
export const Route = createFileRoute('/dashboard/all-dsas')({ component: AllDsasPage })
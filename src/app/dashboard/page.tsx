import { useAuth } from '../../context/AuthContext'
import DsaDashboardView from '../../components/dashboard/DsaDashboardView'
// import SummaryView from '../../components/dashboard/SummaryView'
import DashboardShell from '../../components/layout/DashboardShell'
import { getLandingDashboardView } from '../../lib/dashboard-access' 
import RmDashboardView from '../../components/dashboard/RmDashboardView'

function DashboardPage() {
  const { session } = useAuth()
  const isRM = Boolean(session?.userDetails.isRM)
  return <DashboardShell activeView={getLandingDashboardView(isRM)}>{isRM ? <RmDashboardView /> : <DsaDashboardView />}</DashboardShell>
}

export default DashboardPage

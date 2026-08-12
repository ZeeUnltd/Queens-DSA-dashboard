import { useAuth } from '../../context/AuthContext'
import DsaDashboardView from '../../components/dashboard/DsaDashboardView'
import SummaryView from '../../components/dashboard/SummaryView'
import DashboardShell from '../../components/layout/DashboardShell'

function DashboardPage() {
  const { session } = useAuth()
  return <DashboardShell activeView={session?.userDetails.isRM ? 'summary' : 'dsa-dashboard'}>{session?.userDetails.isRM ? <SummaryView /> : <DsaDashboardView />}</DashboardShell>
}

export default DashboardPage

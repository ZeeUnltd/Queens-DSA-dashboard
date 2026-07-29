import SummaryView from '../../components/dashboard/SummaryView'
import DashboardShell from '../../components/layout/DashboardShell'

function DashboardPage() {
  return <DashboardShell activeView="summary"><SummaryView /></DashboardShell>
}

export default DashboardPage

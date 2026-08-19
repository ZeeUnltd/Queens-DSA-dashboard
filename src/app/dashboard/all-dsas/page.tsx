import DsaDirectoryView from './components/DsaDirectoryView'
import DashboardShell from '../../../components/layout/DashboardShell'

function AllDsasPage() {
  return <DashboardShell activeView="all-dsas"><DsaDirectoryView /></DashboardShell>
}

export default AllDsasPage

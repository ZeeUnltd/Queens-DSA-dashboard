import TransactionsView from '../../../components/dashboard/TransactionsView'
import DashboardShell from '../../../components/layout/DashboardShell'

function TransactionsPage() {
  return <DashboardShell activeView="transactions"><TransactionsView /></DashboardShell>
}

export default TransactionsPage

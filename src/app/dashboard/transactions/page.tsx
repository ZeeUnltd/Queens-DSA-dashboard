import TransactionsView from './components/TransactionsView'
import DashboardShell from '../../../components/layout/DashboardShell'

function TransactionsPage() {
  return <DashboardShell activeView="transactions"><TransactionsView /></DashboardShell>
}

export default TransactionsPage

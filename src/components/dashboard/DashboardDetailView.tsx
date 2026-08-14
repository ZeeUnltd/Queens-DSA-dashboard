import type { DashboardView } from '../../types/dashboard'
import TransactionsView from './TransactionsView'
import BalanceMovementsView from './BalanceMovementsView'
import KpiPerformanceView from './KpiPerformanceView'

type DashboardDetailViewProps = { view: Exclude<DashboardView, 'summary'> }

/** Compatibility entry point for callers that still render a detail view by key. */
function DashboardDetailView({ view }: DashboardDetailViewProps) {
  if (view === 'transactions') return <TransactionsView />
  if (view === 'balance-movements') return <BalanceMovementsView />
  return <KpiPerformanceView />
}

export default DashboardDetailView

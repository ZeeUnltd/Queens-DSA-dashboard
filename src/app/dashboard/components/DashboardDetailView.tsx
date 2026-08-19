import type { DashboardView } from '../../../types/dashboard'
import TransactionsView from '../transactions/components/TransactionsView'
import BalanceMovementsView from '../balance-movements/components/BalanceMovementsView'
import KpiPerformanceView from '../kpi-performance/components/KpiPerformanceView'

type DashboardDetailViewProps = { view: Exclude<DashboardView, 'summary'> }

/** Compatibility entry point for callers that still render a detail view by key. */
function DashboardDetailView({ view }: DashboardDetailViewProps) {
  if (view === 'transactions') return <TransactionsView />
  if (view === 'balance-movements') return <BalanceMovementsView />
  return <KpiPerformanceView />
}

export default DashboardDetailView

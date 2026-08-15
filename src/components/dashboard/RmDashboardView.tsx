import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Eye } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import backdropScenery from '../../assets/backdrop-scenery.png'
import { Icons } from '../../constants/icons'
import { getRmDsaSummary, getRmTopCards } from '../../lib/api-client'
import { formatCurrency } from './dashboard-formatters'
import type { DsaTopCard, RmDsaSummaryRow } from '../../types/dashboard'

function RmDashboardView() {
  const topCardsQuery = useQuery<DsaTopCard[], Error>({ queryKey: ['rm-top-cards'], queryFn: getRmTopCards })
  const dsaSummaryQuery = useQuery<RmDsaSummaryRow[], Error>({ queryKey: ['rm-dsa-summary'], queryFn: getRmDsaSummary })
  const error = topCardsQuery.error?.message ?? dsaSummaryQuery.error?.message
  const cards = (topCardsQuery.data ?? []).filter((card) => card.title !== 'Total Savings').map((card) => ({
    ...card,
    icon: card.title === 'Total Customers' ? Icons.profile2User : card.title === 'Total Deposits' ? Icons.totalInflowIcon : card.title === 'Total Withdrawals' ? Icons.totalOutflowIcon : Eye,
    featured: card.title === 'Total Customers',
  }))

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-qm-ink sm:text-3xl">Welcome! <span aria-hidden="true">👋</span></h1>
        <p className="mt-1 text-sm text-qm-muted">Manage all DSA activities right in one place</p>
      </header>
      {topCardsQuery.isPending ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading dashboard summary" aria-busy="true">{Array.from({ length: 5 }, (_, index) => <div className="min-h-37 animate-pulse rounded-2xl border border-[#eeeeee] bg-[#f7f7f7]" key={index} />)}</div> : null}
      {!topCardsQuery.isPending && error ? <p className="rounded-xl border border-[#f3cccc] bg-[#fff6f6] p-4 text-sm text-qm-brand" role="alert">{error}</p> : null}
      {!topCardsQuery.isPending && !error ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, featured }) => <article style={featured ? { backgroundImage: `linear-gradient(rgba(182, 0, 0, 0.88), rgba(182, 0, 0, 0.88)), url(${backdropScenery})`, backgroundSize: '100px' } : {}} className={`min-h-37 rounded-2xl border p-5 ${featured ? 'border-qm-brand bg-qm-brand text-white' : 'border-[#eeeeee] bg-white text-qm-ink'}`} key={title}>
          <div className={`flex items-center gap-2 text-xs ${featured ? 'text-white' : 'text-qm-muted'}`}><Icon className="h-5 w-5" aria-hidden="true" /><span>{title}</span></div>
          <strong className="mt-4 block text-2xl font-bold">{title === 'Total Deposits' || title === 'Total Withdrawals' ? formatCurrency(value) : value.toLocaleString('en-NG')}</strong>
        </article>)}
      </div> : null}
      <section>
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold text-qm-ink">Direct Sales Agents</h2><Link className="text-xs font-semibold text-qm-brand hover:underline" to="/dashboard/all-dsas">View all <ArrowRight className="inline h-3 w-3" /></Link></div>
        {dsaSummaryQuery.isPending ? <div className="h-64 animate-pulse rounded-xl border border-[#eeeeee] bg-[#f7f7f7]" aria-label="Loading DSA summary" aria-busy="true" /> : dsaSummaryQuery.error ? <p className="rounded-xl border border-[#f3cccc] bg-[#fff6f6] p-4 text-sm text-qm-brand" role="alert">{dsaSummaryQuery.error.message}</p> : <div className="overflow-x-auto rounded-xl border border-[#eeeeee]"><table className="w-full min-w-190 text-xs"><thead><tr className="border-b border-[#f1f1f1] text-left text-[10px] text-qm-muted"><th className="px-4 py-3">DSA Full Name</th><th>Account Opened</th><th>Inflow</th><th>Outflow</th><th>Amount</th><th>Active Mandates</th></tr></thead><tbody>{(dsaSummaryQuery.data ?? []).map((agent) => <tr className="border-b border-[#f1f1f1] last:border-0" key={agent.referralId}><td className="px-4 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{agent.staffName.slice(0, 2).toUpperCase()}</span><strong>{agent.staffName}</strong></span></td><td>{agent.count}</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>)}</tbody></table></div>}
      </section>
    </section>
  )
}

export default RmDashboardView
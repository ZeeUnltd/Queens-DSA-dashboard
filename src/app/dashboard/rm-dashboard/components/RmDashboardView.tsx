import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import backdropScenery from '../../../../assets/backdrop-scenery.png'
import { Icons } from '../../../../constants/icons'
import { getRmDsaReportCards, getRmTopCards } from '../../../../lib/api-client'
import { formatCurrency } from '../../components/dashboard-formatters'
import type { DsaTopCard, RmDsaReportCard } from '../../../../types/dashboard'

function RmDashboardView() {
  const topCardsQuery = useQuery<DsaTopCard[], Error>({ queryKey: ['rm-top-cards'], queryFn: getRmTopCards })
  const reportCardsQuery = useQuery<RmDsaReportCard[], Error>({ queryKey: ['rm-dsa-report-cards'], queryFn: getRmDsaReportCards })
  const topCards = topCardsQuery.data ?? []
  const reportCards = reportCardsQuery.data ?? []
  const cards = topCards.map((card) => ({
    ...card,
    icon: card.title === 'Total Customers'
      ? Icons.profile2User
      : card.title === 'Total Deposits'
        ? Icons.totalInflowIcon
        : card.title === 'Total Withdrawals'
          ? Icons.totalOutflowIcon
          : Eye,
    featured: card.title === 'Total Customers',
    isCurrency: card.title === 'Total Deposits' || card.title === 'Total Withdrawals',
  }))
  const dsaRows = reportCards.filter((card) => card.referralCode !== 'QNS0000')

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-qm-ink sm:text-3xl">Welcome! <span aria-hidden="true">👋</span></h1>
        <p className="mt-1 text-sm text-qm-muted">Manage all DSA activities right in one place</p>
      </header>
      {topCardsQuery.isPending ?

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading dashboard summary" aria-busy="true">{Array.from({ length: 4 }, (_, index) => <div className="min-h-37 animate-pulse rounded-2xl border border-[#eeeeee] bg-[#f7f7f7]" key={index} />)}</div>
        : null}

      {!topCardsQuery.isPending && topCardsQuery.error ?
        <p className="rounded-xl border border-[#f3cccc] bg-[#fff6f6] p-4 text-sm text-qm-brand" role="alert">{topCardsQuery.error.message}</p>
        : null}
      {!topCardsQuery.isPending && !topCardsQuery.error ?

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {cards.map(({ title, value, icon: Icon, featured, isCurrency }) =>

            <article style={featured ? { backgroundImage: `linear-gradient(rgba(182, 0, 0, 0.88), rgba(182, 0, 0, 0.88)), url(${backdropScenery})`, backgroundSize: '100px' } : {}} className={`min-h-37 rounded-2xl border p-5 ${featured ? 'border-qm-brand bg-qm-brand text-white' : 'border-[#eeeeee] bg-white text-qm-ink'}`} key={title}>

              <div className={`flex items-center gap-2 text-xs ${featured ? 'text-white' : 'text-qm-muted'}`}><Icon className="h-5 w-5" aria-hidden="true" />
                <span>{title}</span>
              </div>
              <strong className="mt-4 block text-2xl font-bold">{isCurrency ? formatCurrency(value) : value.toLocaleString('en-NG')}</strong>
            </article>)}
        </div> : null}


      <section>
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold text-qm-ink">Direct Sales Agents</h2></div>
        {reportCardsQuery.isPending ?
          <div className="h-64 animate-pulse rounded-xl border border-[#eeeeee] bg-[#f7f7f7]" aria-label="Loading DSA summary" aria-busy="true" />
          : reportCardsQuery.error ?
            null :
            <div className="overflow-hidden rounded-xl border border-[#eeeeee]"><Table className="min-w-190 text-xs">
              <TableHeader>
                <TableRow className="border-[#f1f1f1] hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-[10px] text-qm-muted">DSA Full Name</TableHead>
                  <TableHead className="text-[10px] text-qm-muted">Account Opened</TableHead>
                  <TableHead className="text-[10px] text-qm-muted">Inflow</TableHead>
                  <TableHead className="text-[10px] text-qm-muted">Outflow</TableHead>
                  <TableHead className="text-[10px] text-qm-muted">Savings</TableHead>
                  <TableHead className="text-[10px] text-qm-muted">Balance</TableHead>
                </TableRow></TableHeader>
              <TableBody>{dsaRows.map((agent) => <TableRow className="border-[#f1f1f1] hover:bg-[#fcfcfc]" key={agent.referralCode}>
                <TableCell className="px-4 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{agent.name.slice(0, 2).toUpperCase()}</span><strong>{agent.name}</strong></span></TableCell>

                <TableCell>{agent.totalAccounts.toLocaleString('en-NG')}</TableCell>
                <TableCell>{agent.totalInflow.toLocaleString('en-NG')}</TableCell>
                <TableCell>{agent.totalOutflow.toLocaleString('en-NG')}</TableCell>
                <TableCell>{agent.totalSavings.toLocaleString('en-NG')}</TableCell>
                <TableCell>{formatCurrency(agent.totalBalances)}</TableCell>
              </TableRow>)}
              </TableBody>
            </Table>
            </div>}
      </section>
    </section>
  )
}

export default RmDashboardView
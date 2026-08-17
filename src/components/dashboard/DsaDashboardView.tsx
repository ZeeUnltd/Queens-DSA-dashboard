import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import {Icons} from '../../constants/icons'
import { useAuth } from '../../context/AuthContext'
import { directSalesAgentsFixture } from '../../fixtures/dashboard'
import { getDsaActivitiesCards } from '../../lib/api-client'
import type { DsaTopCard } from '../../types/dashboard'
import { formatCurrency } from './dashboard-formatters'
import backdropScenery from '../../assets/backdrop-scenery.png'

function DsaDashboardView() {
  const { session } = useAuth()
  const referralId = session?.userDetails.staffRefCode
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const { data: topCards = [], isPending, error: queryError } = useQuery<DsaTopCard[], Error>({
    queryKey: ['dsa-activities-cards', referralId],
    queryFn: () => getDsaActivitiesCards(referralId!),
    enabled: referralId !== undefined,
  })
  const error = referralId === undefined
    ? 'Unable to load dashboard summary: referral code is missing'
    : queryError?.message

  const cards = topCards
    .filter((card) => card.title !== 'Total Savings')
    .sort((firstCard, secondCard) => Number(secondCard.title === 'Total Accounts Opened') - Number(firstCard.title === 'Total Accounts Opened'))
    .map((card) => ({
    ...card,
    icon: card.title === 'Total Accounts Opened' ? Icons.profile2User : card.title === 'Total Inflows' ? Icons.totalInflowIcon : card.title === 'Total Outflows' ? Icons.totalOutflowIcon : Eye,
    featured: card.title === 'Total Accounts Opened',
  }))

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-qm-ink sm:text-3xl">Welcome! <span aria-hidden="true">👋</span></h1>
        <p className="mt-1 text-sm text-qm-muted">Manage all DSA activities right in one place</p>
      </header>
      {isPending ? 
      
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading dashboard summary" aria-busy="true">{Array.from({ length: 6 }, (_, index) => <div className="min-h-37 animate-pulse rounded-2xl border border-[#eeeeee] bg-[#f7f7f7]" key={index} />)}</div> 
      
      : null}
      {!isPending && error ? <p className="rounded-xl border border-[#f3cccc] bg-[#fff6f6] p-4 text-sm text-qm-brand" role="alert">{error}</p> : null}
      {!isPending && !error ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, featured }) => (
          <article  style={title === 'Total Accounts Opened' ? { backgroundImage: `linear-gradient(rgba(182, 0, 0, 0.88), rgba(182, 0, 0, 0.88)), url(${backdropScenery})`, backgroundSize: '100px' } : {}} 

          className={`min-h-37 rounded-2xl border p-5  ${featured ? 'border-qm-brand bg-qm-brand text-white' : 'border-[#eeeeee] bg-white text-qm-ink'}`} 
          
          key={title}>
            <div className={`flex items-center gap-2 text-xs ${featured ? 'text-white' : 'text-qm-muted'}`}>
              {title === 'Total Balance' ? <button className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-qm-brand/40" type="button" aria-label={isBalanceVisible ? 'Hide total balance' : 'Show total balance'} aria-pressed={isBalanceVisible} onClick={() => setIsBalanceVisible((visible) => !visible)}>
                {isBalanceVisible ? <Eye className="h-5 w-5" aria-hidden="true" /> : <EyeOff className="h-5 w-5" aria-hidden="true" />}
              </button> : <Icon className="h-5 w-5" aria-hidden="true" />}
              <span>{title}</span>
            </div>
            <strong className="mt-4 block text-2xl font-bold">{title === 'Total Balance' && !isBalanceVisible ? '••••••••••••' : title === 'Total Balance' ? formatCurrency(value) : value.toLocaleString('en-NG')}</strong>
          </article>
        ))}
      </div> : null}
      <section>
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold text-qm-ink">Direct Sales Agents</h2><Link className="text-xs font-semibold text-qm-brand hover:underline" to="/dashboard/all-dsas">View all <ArrowRight className="inline h-3 w-3" /></Link></div>
        <div className="overflow-x-auto rounded-xl border border-[#eeeeee]"><table className="w-full min-w-190 text-xs"><thead><tr className="border-b border-[#f1f1f1] text-left text-[10px] text-qm-muted"><th className="px-4 py-3">DSA Full Name</th><th>Account Opened</th><th>Inflow</th><th>Outflow</th><th>Amount</th><th>Active Mandates</th></tr></thead><tbody>{directSalesAgentsFixture.slice(0, 7).map((agent) => <tr className="border-b border-[#f1f1f1] last:border-0" key={agent.id}><td className="px-4 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{agent.initials}</span><strong>{agent.name}</strong></span></td><td>{agent.accountsOpened}</td><td>{agent.inflow}</td><td>{agent.outflow}</td><td>{formatCurrency(agent.balance)}</td><td>{agent.activeMandates}</td></tr>)}</tbody></table></div>
      </section>
    </section>
  )
}

export default DsaDashboardView

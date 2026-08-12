import { Link } from '@tanstack/react-router'
import { ArrowRight, Eye, TrendingDown, TrendingUp, Users } from 'lucide-react'
import {Icons} from '../../constants/icons'
import { dsaSummaryMetricsFixture, directSalesAgentsFixture } from '../../fixtures/dashboard'
import { formatCurrency } from './dashboard-formatters'
import backdropScenery from '../../assets/backdrop-scenery.png'

function DsaDashboardView() {
  const metrics = dsaSummaryMetricsFixture
  const cards = [
    { label: 'Total Account Opened', value: metrics.accountsOpened, icon: Icons.profile2User, featured: true },
    { label: 'Total Inflow', value: metrics.inflow, icon: Icons.totalInflowIcon, featured: false },
    { label: 'Total Outflow', value: metrics.outflow, icon: Icons.totalOutflowIcon, featured: false },
    { label: 'Total Balance', value: formatCurrency(metrics.balance), icon: Eye, featured: false },
  ]

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-qm-ink sm:text-3xl">Welcome! <span aria-hidden="true">👋</span></h1>
        <p className="mt-1 text-sm text-qm-muted">Manage all DSA activities right in one place</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, featured }) => (
          <article  style={label === 'Total Account Opened' ? { backgroundImage: `linear-gradient(rgba(182, 0, 0, 0.88), rgba(182, 0, 0, 0.88)), url(${backdropScenery})`, backgroundSize: '100px' } : {}} 

          className={`min-h-37 rounded-2xl border p-5  ${featured ? 'border-qm-brand bg-qm-brand text-white' : 'border-[#eeeeee] bg-white text-qm-ink'} ${ label === 'Total Account Opened' ? 'col-row-span2' : ''}`} 
          
          key={label}>
            <div className={`flex items-center gap-2 text-xs ${featured ? 'text-white' : 'text-qm-muted'}`}><Icon className="h-5 w-5" /><span>{label}</span></div>
            <strong className="mt-4 block text-2xl font-bold">{value}</strong>
          </article>
        ))}
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold text-qm-ink">Direct Sales Agents</h2><Link className="text-xs font-semibold text-qm-brand hover:underline" to="/dashboard/all-dsas">View all <ArrowRight className="inline h-3 w-3" /></Link></div>
        <div className="overflow-x-auto rounded-xl border border-[#eeeeee]"><table className="w-full min-w-[760px] text-xs"><thead><tr className="border-b border-[#f1f1f1] text-left text-[10px] text-qm-muted"><th className="px-4 py-3">DSA Full Name</th><th>Account Opened</th><th>Inflow</th><th>Outflow</th><th>Amount</th><th>Active Mandates</th></tr></thead><tbody>{directSalesAgentsFixture.slice(0, 7).map((agent) => <tr className="border-b border-[#f1f1f1] last:border-0" key={agent.id}><td className="px-4 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{agent.initials}</span><strong>{agent.name}</strong></span></td><td>{agent.accountsOpened}</td><td>{agent.inflow}</td><td>{agent.outflow}</td><td>{formatCurrency(agent.balance)}</td><td>{agent.activeMandates}</td></tr>)}</tbody></table></div>
      </section>
    </section>
  )
}

export default DsaDashboardView

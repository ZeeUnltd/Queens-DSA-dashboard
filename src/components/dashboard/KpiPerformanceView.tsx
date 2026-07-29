import { BadgeCheck, ChartNoAxesCombined, UsersRound } from 'lucide-react'
import backdropScenery from '../../assets/backdrop-scenery.png'
import { kpiFixture } from '../../fixtures/dashboard'
import { Badge } from '@/components/ui/badge'

function KpiPerformanceView() {
  return (
    <section>
      <h1 className="mb-8 text-[22px] font-bold tracking-[-0.03em] text-qm-ink">KPI &amp; Performance</h1>
      <article className="relative overflow-hidden rounded-2xl bg-qm-brand px-6 py-7 text-white" style={{ backgroundImage: `linear-gradient(rgba(182, 0, 0, 0.88), rgba(182, 0, 0, 0.88)), url(${backdropScenery})`, backgroundSize: '100px' }}>

        <div className="flex flex-wrap items-center justify-between gap-6"><div className="flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#f6b000] text-lg font-bold">75%</span><span><strong className="block text-xl">Overall Performance</strong><span className="mt-1 block text-sm text-white/80">Period: <b className="text-white">July 2026</b></span></span></div><div className="flex gap-6 text-sm"><span>In Progress: <b className="ml-1 text-2xl">2</b></span><span>Completed: <b className="ml-1 text-2xl">1</b></span></div></div>
      </article>
      <div className="mt-8 space-y-3">{kpiFixture.map((kpi) => { const Icon = kpi.icon === 'users' ? UsersRound : kpi.icon === 'chart' ? ChartNoAxesCombined : BadgeCheck; const isGreen = kpi.tone === 'green'; return <article key={kpi.label} className="flex items-center gap-4 rounded-2xl bg-[#fafafa] px-5 py-5 md:px-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff2f2] text-qm-brand"><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="flex items-center gap-2"><strong className="text-sm text-qm-ink">{kpi.label}</strong><Badge className={isGreen ? 'border-0 bg-[#e5f9ef] text-[10px] text-[#15b75c]' : 'border-0 bg-[#fff5e6] text-[10px] text-[#ff9f1a]'}>{kpi.status}</Badge></span><strong className={isGreen ? 'text-[#15b75c]' : 'text-[#ff9f1a]'}>{kpi.percentage}%</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-[#f8e3ba]"><div className={`h-full rounded-full ${isGreen ? 'bg-[#00b84a]' : 'bg-[#ffad21]'}`} style={{ width: `${kpi.percentage}%` }} /></div></div></article> })}</div>
    </section>
  )
}

export default KpiPerformanceView

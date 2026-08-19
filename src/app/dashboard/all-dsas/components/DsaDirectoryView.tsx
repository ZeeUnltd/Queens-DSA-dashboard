import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Download, Search } from 'lucide-react'
import { directSalesAgentsFixture } from '../../../../fixtures/dashboard'
import DsaDetailsDialog from './DsaDetailsDialog'

const PAGE_SIZE = 7

function DsaDirectoryView() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const filteredAgents = useMemo(() => directSalesAgentsFixture.filter((agent) => agent.name.toLowerCase().includes(query.toLowerCase())), [query])
  const pageCount = Math.max(1, Math.ceil(filteredAgents.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const selectedAgent = directSalesAgentsFixture.find((agent) => agent.id === selectedId) ?? null

  return (
    <section>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><h1 className="text-2xl font-bold text-qm-ink sm:text-3xl">Direct Sales Agents</h1><p className="mt-1 text-sm text-qm-muted">View all DSA activities and report</p></div><div className="flex flex-wrap items-center gap-3"><label className="flex h-10 w-full items-center gap-3 rounded-full bg-[#fafafa] px-4 text-sm text-qm-muted sm:w-[226px]"><Search className="h-5 w-5 text-qm-ink" /><input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-qm-muted" placeholder="Search here" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></label><button className="flex h-10 items-center gap-2 rounded-full bg-[#fafafa] px-4 text-xs text-qm-muted" type="button"><CalendarDays className="h-4 w-4 text-qm-ink" /><span>Nov 29 - Dec 29</span></button><button className="flex h-10 items-center gap-2 rounded-full bg-qm-brand px-4 text-xs text-white hover:bg-qm-brand-hover" type="button"><Download className="h-4 w-4" />Export CSV</button></div></div>
      <div className="overflow-hidden rounded-xl border border-[#eeeeee]">
        
        {/* <Table className="min-w-[820px] text-xs"><TableHeader><TableRow className="border-[#f1f1f1] hover:bg-transparent"><TableHead className="px-4 py-4 text-[10px] text-qm-muted">DSA Full Name</TableHead><TableHead className="text-[10px] text-qm-muted">Account Opened</TableHead><TableHead className="text-[10px] text-qm-muted">Inflow</TableHead><TableHead className="text-[10px] text-qm-muted">Outflow</TableHead><TableHead className="text-[10px] text-qm-muted">Balance</TableHead><TableHead className="text-[10px] text-qm-muted">Active Mandates</TableHead><TableHead /></TableRow></TableHeader><TableBody>{agents.map((agent) => <TableRow className="border-[#f1f1f1] hover:bg-[#fcfcfc]" key={agent.id}><TableCell className="px-4 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{agent.initials}</span><strong>{agent.name}</strong></span></TableCell><TableCell>{agent.accountsOpened}</TableCell><TableCell>{agent.inflow}</TableCell><TableCell>{agent.outflow}</TableCell><TableCell>{formatCurrency(agent.balance)}</TableCell><TableCell>{agent.activeMandates}</TableCell><TableCell className="pr-4 text-right"><button className="font-semibold text-qm-brand hover:underline" type="button" onClick={() => setSelectedId(agent.id)}>View Details</button></TableCell></TableRow>)}</TableBody></Table> */}
        
        <nav className="flex items-center justify-between border-t border-[#f1f1f1] px-4 py-3 text-xs text-qm-muted" aria-label="DSA pagination"><button className="flex items-center gap-1 rounded-md border border-[#eeeeee] px-3 py-2 disabled:opacity-40" type="button" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-3.5 w-3.5" />Previous</button><span>Page {currentPage} of {pageCount}</span><button className="flex items-center gap-1 rounded-md border border-[#eeeeee] px-3 py-2 disabled:opacity-40" type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => value + 1)}>Next<ChevronRight className="h-3.5 w-3.5" /></button></nav></div>
      <DsaDetailsDialog agent={selectedAgent} onClose={() => setSelectedId(null)} />
    </section>
  )
}

export default DsaDirectoryView

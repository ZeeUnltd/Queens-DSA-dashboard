import { ArrowLeft, ArrowRight, CalendarDays, Download, Search } from 'lucide-react'
import { accountsOpenedFixture } from '../../fixtures/dashboard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Direction, formatCurrency } from './dashboard-formatters'

function AccountsOpenedView() {
  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-[22px] font-bold tracking-[-0.03em] text-qm-ink">Accounts Opened</h1>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-10 w-full items-center gap-3 rounded-full bg-[#fafafa] px-4 text-sm text-qm-muted sm:w-[226px]">
            <Search className="h-5 w-5 text-qm-ink" />
            <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-qm-muted" placeholder="Search here" type="search" />
          </label>
          <button className="flex h-10 items-center gap-2 rounded-full bg-[#fafafa] px-4 text-xs text-qm-muted" type="button" aria-label="Select reporting period">
            <CalendarDays className="h-4 w-4 text-qm-ink" />
            <span aria-hidden="true">‹</span><span>Nov 29 - Dec 29</span><span aria-hidden="true">›</span>
          </button>
          <Button className="h-10 rounded-full bg-qm-brand px-5 text-xs hover:bg-qm-brand-hover"><Download />Export CSV</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#eeeeee]">
        <Table className="min-w-[950px] text-xs">
          <TableHeader><TableRow className="hover:bg-transparent">
            <TableHead className="px-5 py-4 text-[10px] text-qm-muted">Account Name</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Account Number</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Type</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Products</TableHead>
            <TableHead className="text-right text-[10px] text-qm-muted">Balance</TableHead>
            <TableHead className="px-5 text-right text-[10px] text-qm-muted">Movement</TableHead>
          </TableRow></TableHeader>
          <TableBody>{accountsOpenedFixture.map((account) => (
            <TableRow key={account.name} className="border-[#f1f1f1] hover:bg-[#fcfcfc]">
              <TableCell className="px-5 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{account.initials}</span><strong className="text-sm text-qm-ink">{account.name}</strong></span></TableCell>
              <TableCell className="text-sm">0012345678</TableCell>
              <TableCell><Badge className={account.type === 'Personal' ? 'border-0 bg-[#e9f1ff] text-[10px] text-[#477cf5] hover:bg-[#e9f1ff]' : 'border-0 bg-[#fff0f0] text-[10px] text-qm-brand hover:bg-[#fff0f0]'}>{account.type}</Badge></TableCell>
              <TableCell className="text-sm">{account.products}</TableCell>
              <TableCell className="text-right text-sm font-medium">{formatCurrency(account.balance)}</TableCell>
              <TableCell className="px-5 text-right text-sm font-semibold"><span className={account.movement === 0 ? 'text-qm-muted' : ''}>{formatCurrency(account.movement)}</span><Direction direction={account.direction} /></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
        <nav className="flex items-center justify-between border-t border-[#f1f1f1] px-5 py-3 text-xs text-qm-muted" aria-label="Accounts pagination">
          <button className="flex items-center gap-2 rounded-md border border-[#eeeeee] px-3 py-2" type="button"><ArrowLeft className="h-3.5 w-3.5" />Previous</button>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map(page => (
              <Button key={page} variant={page === 1 ? 'default' : 'outline'} size="icon" className="h-9 w-9">
                {page}
              </Button>
            ))}
          </div>

          <button className="flex items-center gap-2 rounded-md border border-[#eeeeee] px-3 py-2" type="button">Next<ArrowRight className="h-3.5 w-3.5" /></button>
        </nav>
      </div>

      {/* <div className="hidden gap-5 sm:flex"><span className="rounded bg-[#fff4f4] px-3 py-2 text-qm-brand">1</span><span>2</span><span>3</span><span>…</span><span>8</span><span>9</span><span>10</span></div> */}
      {/* Pagination Controls */}
      {/* <Button variant="outline" size="icon" className="h-5 w-5"><ChevronLeft className="h-4 w-4" /></Button> */}
      {/* <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button> */}
    </section>

  )
}

export default AccountsOpenedView

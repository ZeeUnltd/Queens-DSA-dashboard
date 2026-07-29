import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { balanceMovementsFixture } from '../../fixtures/dashboard'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from './dashboard-formatters'

function BalanceMovementsView() {
  return (
    <section>
      <h1 className="mb-8 text-[22px] font-bold tracking-[-0.03em] text-qm-ink">Balance Movements</h1>
      <div className="space-y-3">
        {balanceMovementsFixture.map((movement, index) => (
          <article key={`${movement.name}-${index}`} className="flex items-center justify-between rounded-2xl bg-[#fafafa] px-5 py-5 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${movement.direction === 'up' ? 'bg-[#e5f8eb] text-[#15b75c]' : 'bg-[#ffe9ed] text-[#ff4765]'}`} aria-hidden="true">
                {movement.direction === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              </span>
              <span className="min-w-0"><strong className="block truncate text-sm text-qm-ink">{movement.name}</strong><span className="block text-[10px] text-qm-muted">0012345678</span></span>
              <Badge className={`ml-2 shrink-0 border-0 text-[10px] font-medium hover:bg-inherit ${movement.product === 'Easy Savings' ? 'bg-[#fff0f0] text-qm-brand' : movement.product === 'Queens Stash' ? 'bg-[#e5f9ef] text-[#1aaa70]' : movement.product === 'Queens Lock' ? 'bg-[#fff5e6] text-[#ff9f1a]' : 'bg-[#f6eaff] text-[#ae67e7]'}`}>{movement.product}</Badge>
            </div>
            <div className="shrink-0 pl-3 text-right"><strong className="block text-base text-qm-ink">{formatCurrency(movement.balance)}</strong><span className={`text-sm font-semibold ${movement.direction === 'up' ? 'text-[#15b75c]' : 'text-[#ff4765]'}`}>{formatCurrency(movement.movement)}</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BalanceMovementsView

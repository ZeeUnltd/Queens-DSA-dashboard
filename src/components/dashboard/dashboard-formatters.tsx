import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function formatCurrency(value: number) {
  return value === 0 ? '₦0.00' : `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function Direction({ direction }: { direction?: 'up' | 'down' }) {
  if (direction === 'up') return <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 text-[#15b75c]" aria-label="Increase" />
  if (direction === 'down') return <ArrowDownRight className="ml-1 inline h-3.5 w-3.5 text-[#ff4765]" aria-label="Decrease" />
  return null
}

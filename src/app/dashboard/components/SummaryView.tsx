import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Building2, ChevronDown, ChevronUp, UserRound } from 'lucide-react'
import { DASHBOARD_COPY, PRODUCT_LABELS } from '../../../constants/dashboard'
import { productCategoriesFixture, totalValuesFixture } from '../../../fixtures/dashboard'
import type { ProductCategory, ProductKey } from '../../../types/dashboard'
import RelationshipManagerProfile from './RelationshipManagerProfile'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const productKeys = Object.keys(PRODUCT_LABELS) as ProductKey[]

function formatCurrency(value: number) {
  if (value === 0) return '₦0.00'
  return `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function CategoryRows({ category, expanded, onToggle }: { category: ProductCategory; expanded: boolean; onToggle: () => void }) {
  const Icon = category.id === 'personal' ? UserRound : Building2

  return (
    <>
      <TableRow className="border-0 bg-[#f7f7f7] hover:bg-[#f7f7f7]">
        <TableCell className="w-[34%] px-4 py-4 md:px-6">
          <button className="flex items-center gap-3 text-left text-sm font-semibold text-qm-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20" type="button" onClick={onToggle} aria-expanded={expanded}>
            <Icon className="h-5 w-5 text-qm-brand" />
            <span>{category.label}</span>
            {expanded ? <ChevronUp className="h-4 w-4 text-qm-muted" /> : <ChevronDown className="h-4 w-4 text-qm-muted" />}
          </button>
        </TableCell>
        {productKeys.map((key) => <TableCell key={key} className="whitespace-nowrap px-3 py-4 text-right text-sm font-semibold text-qm-ink md:px-5">{formatCurrency(category.values[key])}</TableCell>)}
      </TableRow>
      {expanded && category.customers.map((customer) => (
        <TableRow key={`${category.id}-${customer.name}`} className="border-[#f2f2f2] hover:bg-[#fcfcfc]">
          <TableCell className="px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{customer.initials}</span>
              <span><span className="block text-sm font-semibold text-qm-ink">{customer.name}</span><span className="block text-[11px] text-qm-muted">{customer.accountNumber}</span></span>
            </div>
          </TableCell>
          {productKeys.map((key) => {
            const direction = customer.directions?.[key]
            return <TableCell key={key} className="whitespace-nowrap px-3 py-3 text-right text-sm font-medium text-qm-ink md:px-5"><span className={customer.values[key] === 0 ? 'text-qm-muted' : ''}>{formatCurrency(customer.values[key])}</span>{direction === 'up' ? <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 text-[#20b664]" /> : null}{direction === 'down' ? <ArrowDownRight className="ml-1 inline h-3.5 w-3.5 text-[#ff4d6d]" /> : null}</TableCell>
          })}
        </TableRow>
      ))}
    </>
  )
}

function SummaryView() {
  const [expandedCategory, setExpandedCategory] = useState<ProductCategory['id'] | null>('personal')

  return (
    <>
      <RelationshipManagerProfile />
      <h2 className="mb-5 text-xl font-bold text-qm-ink">{DASHBOARD_COPY.summary}</h2>
      <section className="overflow-x-auto rounded-xl border border-[#eeeeee]" aria-label="Banking product summary">
        <Table className="min-w-[820px] text-xs">
          <TableHeader><TableRow className="border-[#f1f1f1] hover:bg-transparent"><TableHead className="w-[34%] px-4 py-4 text-xs font-medium text-qm-muted md:px-6">{DASHBOARD_COPY.category}</TableHead>{productKeys.map((key) => <TableHead key={key} className="whitespace-nowrap px-3 py-4 text-right text-xs font-medium text-qm-muted md:px-5">{PRODUCT_LABELS[key]}</TableHead>)}</TableRow></TableHeader>
          <TableBody>
            {productCategoriesFixture.map((category) => <CategoryRows key={category.id} category={category} expanded={expandedCategory === category.id} onToggle={() => setExpandedCategory((current) => current === category.id ? null : category.id)} />)}
            <TableRow className="border-0 bg-white hover:bg-white"><TableCell className="px-4 py-5 text-sm font-bold text-qm-brand md:px-6">{DASHBOARD_COPY.total}</TableCell>{productKeys.map((key) => <TableCell key={key} className="whitespace-nowrap px-3 py-5 text-right text-sm font-bold text-qm-brand md:px-5">{formatCurrency(totalValuesFixture[key])}</TableCell>)}</TableRow>
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export default SummaryView

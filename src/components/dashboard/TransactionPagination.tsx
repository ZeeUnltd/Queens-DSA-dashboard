import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PaginationItem = number | 'ellipsis'

type TransactionPaginationProps = {
  currentPage: number
  totalPages: number
  totalRecords: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFetching?: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

function getPageItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1)

  const visiblePages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  const pages = [...visiblePages].filter((page) => page > 0 && page <= totalPages).sort((first, second) => first - second)
  const items: PaginationItem[] = []

  pages.forEach((page, index) => {
    const previousPage = pages[index - 1]
    if (previousPage && page - previousPage > 1) items.push('ellipsis')
    items.push(page)
  })

  return items
}

function TransactionPagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  hasNextPage,
  hasPreviousPage,
  isFetching = false,
  onPageChange,
  onPageSizeChange,
}: TransactionPaginationProps) {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalRecords)

  return (
    <nav className="flex flex-wrap items-center gap-3 border-t border-[#f1f1f1] px-5 py-3 text-xs text-qm-muted" aria-label="Transactions pagination">
      <button className="flex items-center gap-2 rounded-md border border-[#eeeeee] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={!hasPreviousPage || isFetching} onClick={() => onPageChange(currentPage - 1)}>
        <ArrowLeft className="h-3.5 w-3.5" />Previous
      </button>

      <div className="flex flex-1 items-center justify-center gap-1" aria-label={`Page ${currentPage} of ${totalPages}`}>
        {getPageItems(currentPage, totalPages).map((item, index) => item === 'ellipsis' ? <span className="px-1.5" key={`ellipsis-${index}`} aria-hidden="true">…</span> : (
          <Button key={item} variant={item === currentPage ? 'default' : 'outline'} size="icon" className="h-9 w-9" type="button" aria-current={item === currentPage ? 'page' : undefined} disabled={isFetching} onClick={() => onPageChange(item)}>
            {item}
          </Button>
        ))}
      </div>

      <label className="flex items-center gap-2 whitespace-nowrap">
        <span className="sr-only">Transactions per page</span>
        <select className="h-9 rounded-md border border-[#eeeeee] bg-white px-2 text-xs text-qm-ink" value={pageSize} disabled={isFetching} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {[20, 40, 60, 80, 100].map((size) => <option key={size} value={size}>{size} per page</option>)}
        </select>
      </label>

      <p className="whitespace-nowrap">Showing {startRecord}–{endRecord} of {totalRecords.toLocaleString('en-NG')} transactions · {pageSize} per page</p>

      <button className="flex items-center gap-2 rounded-md border border-[#eeeeee] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={!hasNextPage || isFetching} onClick={() => onPageChange(currentPage + 1)}>
        Next<ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  )
}

export default TransactionPagination

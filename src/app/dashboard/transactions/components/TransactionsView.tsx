import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { CalendarDays, Check, Copy, Download, Search } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { exportTransactions, getTransactions } from '../../../../lib/api-client'
import type { TransactionRecord } from '../../../../types/dashboard'
import { formatCurrency } from '../../components/dashboard-formatters'
import TransactionDetailsSheet from './TransactionDetailsSheet'
import TransactionExportDialog from './TransactionExportDialog'
import TransactionPagination from './TransactionPagination'
import { getTransactionInitials, getTransactionStatusClassName, getTransactionTypeClassName, getTransactionTypeLabel, TransactionDirectionIcon } from './transaction-display'

const DEFAULT_PAGE_SIZE = 20

function formatLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDefaultDateRange() {
  const today = new Date()
  const previousDay = new Date(today)
  previousDay.setDate(today.getDate() - 1)
  return { start: formatLocalDate(previousDay), end: formatLocalDate(today) }
}

function formatTransactionDate(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function formatDateRange(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${formatter.format(new Date(`${start}T00:00:00`))} - ${formatter.format(new Date(`${end}T00:00:00`))}`
}

function TransactionsView() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [accountNumberInput, setAccountNumberInput] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [dateRange, setDateRange] = useState(getDefaultDateRange)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [copiedTransactionId, setCopiedTransactionId] = useState<number | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => setAccountNumber(accountNumberInput.trim()), 400)
    return () => window.clearTimeout(timeout)
  }, [accountNumberInput])

  const { data, error, isFetching, isPending } = useQuery({
    queryKey: ['transactions', page, pageSize, accountNumber, dateRange.start, dateRange.end],
    queryFn: () => getTransactions({
      pageNumber: page,
      pageSize,
      accountNumber: accountNumber || undefined,
      transactionStartDate: `${dateRange.start}T00:00:00`,
      transactionEndDate: `${dateRange.end}T23:59:59.999`,
    }),
    placeholderData: keepPreviousData,
  })
  const transactions = data?.data ?? []

  function updateDateRange(key: 'start' | 'end', value: string) {
    setDateRange((current) => ({ ...current, [key]: value }))
    setPage(1)
  }

  async function handleCopyTransactionReference(transaction: TransactionRecord) {
    if (!transaction.transactionRef) return

    try {
      await navigator.clipboard.writeText(transaction.transactionRef)
      setCopiedTransactionId(transaction.id)
      window.setTimeout(() => setCopiedTransactionId(null), 1600)
    } catch {
      return
    }
  }

  async function handleExport(values: { startDate: string; endDate: string; accountNumber: string; amount: string; pageNumber: number; pageSize: number }) {
    setIsExporting(true)
    setExportError(null)
    try {
      const { blob, contentDisposition } = await exportTransactions({
        downloadOptions: 'email',
        transactionStartDate: `${values.startDate}T00:00:00`,
        transactionEndDate: `${values.endDate}T23:59:59.999`,
        transactionAmount: values.amount ? Number(values.amount) : undefined,
        accountNumber: values.accountNumber || undefined,
        pageNumber: values.pageNumber,
        pageSize: values.pageSize,
      })
      const filename = contentDisposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i)?.[1] || 'transactions.csv'
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = decodeURIComponent(filename)
      link.click()
      URL.revokeObjectURL(url)
      setIsExportDialogOpen(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to export transactions'
      setExportError(message)
      toast.error(message)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section aria-busy={isPending}>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-[22px] font-bold tracking-[-0.03em] text-qm-ink">Transactions</h1>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-10 w-full items-center gap-3 rounded-full bg-[#fafafa] px-4 text-sm text-qm-muted sm:w-[226px]">
            <Search className="h-5 w-5 text-qm-ink" />
            <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-qm-muted" placeholder="Search account number" type="search" value={accountNumberInput} onChange={(event) => { setAccountNumberInput(event.target.value); setPage(1) }} />
          </label>
          <details className="relative">
            <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-full bg-[#fafafa] px-4 text-xs text-qm-muted"><CalendarDays className="h-4 w-4 text-qm-ink" /><span>{formatDateRange(dateRange.start, dateRange.end)}</span></summary>
            <div className="absolute right-0 z-10 mt-2 grid w-72 gap-3 rounded-xl border border-[#eeeeee] bg-white p-4 shadow-lg">
              <label className="grid gap-1 text-xs font-medium text-qm-ink">Start date<input className="h-9 rounded-md border border-[#dedede] px-2 text-sm" type="date" value={dateRange.start} max={dateRange.end} onChange={(event) => updateDateRange('start', event.target.value)} /></label>
              <label className="grid gap-1 text-xs font-medium text-qm-ink">End date<input className="h-9 rounded-md border border-[#dedede] px-2 text-sm" type="date" value={dateRange.end} min={dateRange.start} onChange={(event) => updateDateRange('end', event.target.value)} /></label>
            </div>
          </details>
          <Button className="h-10 rounded-full bg-qm-brand px-5 text-xs hover:bg-qm-brand-hover" type="button" onClick={() => { setExportError(null); setIsExportDialogOpen(true) }}><Download />Export CSV</Button>
        </div>
      </div>

      {error ? <p className="mb-4 rounded-xl border border-[#f3cccc] bg-[#fff6f6] p-4 text-sm text-qm-brand" role="alert">{error.message}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-[#eeeeee]">
        <Table className="min-w-[1500px] text-xs">
          <TableHeader><TableRow className="hover:bg-transparent">
            <TableHead className="px-5 py-4 text-[10px] text-qm-muted">Beneficiary</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Beneficiary Account</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Type</TableHead>
            <TableHead className="text-right text-[10px] text-qm-muted">Amount</TableHead>
            <TableHead className="text-right text-[10px] text-qm-muted">Charges</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Status</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Product</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Transaction Reference</TableHead>
            <TableHead className="text-[10px] text-qm-muted">Date</TableHead>
            <TableHead className="px-5 text-right text-[10px] text-qm-muted">Action</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {isPending ? Array.from({ length: 6 }, (_, index) => <TableRow key={index} className="border-[#f1f1f1]"><TableCell className="px-5 py-4" colSpan={10}><span className="block h-4 animate-pulse rounded bg-[#f3f3f3]" /></TableCell></TableRow>) : null}
            {!isPending && !error && transactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-[#f1f1f1] hover:bg-[#fcfcfc]">
                <TableCell className="px-5 py-3"><span className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff6f6] text-[10px] font-bold text-qm-brand">{getTransactionInitials(transaction.beneficiaryName || '')}</span><strong className="text-sm text-qm-ink">{transaction.beneficiaryName || '—'}</strong></span></TableCell>
                <TableCell className="text-sm">{transaction.beneficiaryAccount || '—'}</TableCell>
                <TableCell><Badge className={getTransactionTypeClassName(transaction)}>{getTransactionTypeLabel(transaction)}</Badge></TableCell>
                <TableCell className="text-right text-sm font-medium">{formatCurrency(transaction.amount)}</TableCell>
                <TableCell className="text-right text-sm">{formatCurrency(transaction.charges)}</TableCell>
                <TableCell><Badge className={getTransactionStatusClassName(transaction)}>{transaction.transactionStatus || transaction.status || 'Unknown'}</Badge></TableCell>
                <TableCell className="text-sm">{transaction.productType || '—'}</TableCell>
                <TableCell className="max-w-[220px]">
                  {transaction.transactionRef ? (
                    <span className="group/reference flex min-w-0 items-center gap-1.5">
                      <span className="min-w-0 truncate font-mono text-xs" title={transaction.transactionRef}>{transaction.transactionRef}</span>
                      <Button
                        aria-label={`Copy transaction reference ${transaction.transactionRef}`}
                        className="pointer-events-none opacity-0 transition-opacity group-hover/reference:pointer-events-auto group-hover/reference:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100"
                        size="icon-xs"
                        title={copiedTransactionId === transaction.id ? 'Copied' : 'Copy transaction reference'}
                        type="button"
                        variant="ghost"
                        onClick={() => { void handleCopyTransactionReference(transaction) }}
                      >
                        {copiedTransactionId === transaction.id ? <Check /> : <Copy />}
                      </Button>
                    </span>
                  ) : '—'}
                </TableCell>
                <TableCell className="text-sm"><span className="flex items-center gap-1.5 whitespace-nowrap">{formatTransactionDate(transaction.transactionDate)}<TransactionDirectionIcon transaction={transaction} /></span></TableCell>
                <TableCell className="px-5 text-right"><button className="font-semibold text-qm-brand hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-qm-brand/30" type="button" onClick={() => setSelectedTransaction(transaction)} aria-label={`View transaction details for ${transaction.beneficiaryName || transaction.id}`}>View details</button></TableCell>
              </TableRow>
            ))}
            {!isPending && !error && transactions.length === 0 ? <TableRow><TableCell className="px-5 py-12 text-center text-sm text-qm-muted" colSpan={10}>No transactions found for the selected filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
        {data ? <TransactionPagination
          currentPage={data.currentPageNumber}
          totalPages={data.totalPages}
          totalRecords={data.totalRecords}
          pageSize={data.pageSize}
          hasNextPage={data.hasNextPage}
          hasPreviousPage={data.hasPreviousPage}
          isFetching={isFetching}
          onPageChange={setPage}
          onPageSizeChange={(nextPageSize) => { setPageSize(nextPageSize); setPage(1) }}
        /> : null}
      </div>
      <TransactionDetailsSheet transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      {isExportDialogOpen ? <TransactionExportDialog startDate={dateRange.start} endDate={dateRange.end} accountNumber={accountNumber} pageNumber={page} pageSize={pageSize} isExporting={isExporting} error={exportError} onClose={() => setIsExportDialogOpen(false)} onExport={handleExport} /> : null}
    </section>
  )
}

export default TransactionsView

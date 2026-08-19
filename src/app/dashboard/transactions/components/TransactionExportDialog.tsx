import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TransactionExportDialogProps = {
  startDate: string
  endDate: string
  accountNumber: string
  pageNumber: number
  pageSize: number
  isExporting: boolean
  error: string | null
  onClose: () => void
  onExport: (values: { startDate: string; endDate: string; accountNumber: string; amount: string; downloadOptions: 'csv' | 'pdf'; pageNumber: number; pageSize: number }) => void
}

function TransactionExportDialog({ startDate, endDate, accountNumber, pageNumber, pageSize, isExporting, error, onClose, onExport }: TransactionExportDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [start, setStart] = useState(startDate)
  const [end, setEnd] = useState(endDate)
  const [account, setAccount] = useState(accountNumber)
  const [amount, setAmount] = useState('')
  const [downloadOptions, setDownloadOptions] = useState<'csv' | 'pdf'>('csv')

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isExporting) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExporting, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isExporting) onClose() }}>
      <section className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="transaction-export-title">
        <div className="flex items-start justify-between gap-4">
          <div><h2 className="text-2xl font-bold text-qm-ink" id="transaction-export-title">Export transactions</h2><p className="mt-1 text-sm text-qm-muted">Choose the transactions and file format to download.</p></div>
          <button ref={closeButtonRef} className="rounded-full p-1 text-qm-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20 disabled:opacity-40" type="button" aria-label="Close export dialog" disabled={isExporting} onClick={onClose}><X className="h-6 w-6" /></button>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); onExport({ startDate: start, endDate: end, accountNumber: account.trim(), amount, downloadOptions, pageNumber, pageSize }) }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-medium text-qm-ink">Start date<input className="h-10 rounded-lg border border-[#dedede] px-3 text-sm" type="date" value={start} max={end} required onChange={(event) => setStart(event.target.value)} /></label>
            <label className="grid gap-1.5 text-xs font-medium text-qm-ink">End date<input className="h-10 rounded-lg border border-[#dedede] px-3 text-sm" type="date" value={end} min={start} required onChange={(event) => setEnd(event.target.value)} /></label>
          </div>
          <label className="grid gap-1.5 text-xs font-medium text-qm-ink">Account number<input className="h-10 rounded-lg border border-[#dedede] px-3 text-sm" type="text" value={account} onChange={(event) => setAccount(event.target.value)} /></label>
          <label className="grid gap-1.5 text-xs font-medium text-qm-ink">Transaction amount <span className="font-normal text-qm-muted">(optional)</span><input className="h-10 rounded-lg border border-[#dedede] px-3 text-sm" min="0" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
          <label className="grid gap-1.5 text-xs font-medium text-qm-ink" htmlFor="transaction-download-format">Download format<select className="h-10 rounded-lg border border-[#dedede] bg-white px-3 text-sm" id="transaction-download-format" required value={downloadOptions} onChange={(event) => setDownloadOptions(event.target.value as 'csv' | 'pdf')}><option value="csv">CSV</option><option value="pdf">PDF</option></select></label>
          {error ? <p className="rounded-lg border border-[#f3cccc] bg-[#fff6f6] p-3 text-sm text-qm-brand" role="alert">{error}</p> : null}
          <div className="mt-2 flex justify-end gap-3"><Button className="rounded-full px-5" variant="outline" type="button" disabled={isExporting} onClick={onClose}>Cancel</Button><Button className="rounded-full bg-qm-brand px-5 hover:bg-qm-brand-hover" type="submit" disabled={isExporting}>{isExporting ? 'Exporting...' : `Download ${downloadOptions.toUpperCase()}`}</Button></div>
        </form>
      </section>
    </div>
  )
}

export default TransactionExportDialog
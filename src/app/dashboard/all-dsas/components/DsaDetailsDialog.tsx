import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { DirectSalesAgent } from '../../../../types/dashboard'
import { formatCurrency } from '../../components/dashboard-formatters'

type DsaDetailsDialogProps = {
  agent: DirectSalesAgent | null
  onClose: () => void
}

function DsaDetailsDialog({ agent, onClose }: DsaDetailsDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!agent) return undefined
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [agent, onClose])

  if (!agent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="w-full max-w-[870px] rounded-[24px] bg-white p-7 shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-labelledby="dsa-details-title">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-3xl font-bold text-qm-ink" id="dsa-details-title">{agent.name}</h2>
          <button ref={closeButtonRef} className="rounded-full p-1 text-qm-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20" type="button" aria-label="Close details" onClick={onClose}>
            <X className="h-7 w-7" />
          </button>
        </div>
        <dl className="mt-8 grid gap-x-6 gap-y-8 rounded-[22px] bg-[#f8f8f8] p-6 sm:grid-cols-2 sm:p-7">
          <div><dt className="text-xl text-qm-muted">Accounts Opened</dt><dd className="mt-1 text-right text-2xl font-medium text-qm-ink sm:text-left">{agent.accountsOpened}</dd></div>
          <div><dt className="text-xl text-qm-muted">Total No. of Inflow</dt><dd className="mt-1 text-right text-2xl font-medium text-qm-ink sm:text-left">{agent.inflow}</dd></div>
          <div><dt className="text-xl text-qm-muted">Total No. of Outflow</dt><dd className="mt-1 text-right text-2xl font-medium text-qm-ink sm:text-left">{agent.outflow}</dd></div>
          <div><dt className="text-xl text-qm-muted">Balance</dt><dd className="mt-1 text-right text-2xl font-medium text-qm-ink sm:text-left">{formatCurrency(agent.balance)}</dd></div>
          <div><dt className="text-xl text-qm-muted">Active Mandates</dt><dd className="mt-1 text-right text-2xl font-medium text-qm-ink sm:text-left">{agent.activeMandates}</dd></div>
        </dl>
        <button className="mt-8 w-full rounded-full bg-qm-brand px-6 py-4 text-base font-medium text-white hover:bg-qm-brand-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25" type="button" onClick={onClose}>Close</button>
      </section>
    </div>
  )
}

export default DsaDetailsDialog

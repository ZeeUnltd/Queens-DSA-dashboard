import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { ReactNode } from 'react'
import type { TransactionRecord } from '../../../../types/dashboard'
import { formatCurrency } from '../../components/dashboard-formatters'
import { getTransactionStatusClassName, getTransactionTypeClassName, getTransactionTypeLabel } from './transaction-display'

type TransactionDetailsSheetProps = {
  transaction: TransactionRecord | null
  onClose: () => void
}

function formatTransactionDate(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function DetailRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === '') return null
  return <div className="grid gap-1 border-b border-[#f1f1f1] py-3 last:border-0"><dt className="text-xs text-qm-muted">{label}</dt><dd className="break-words text-sm font-medium text-qm-ink">{value}</dd></div>
}

function DetailsSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-xl border border-[#eeeeee] p-4"><h3 className="text-sm font-semibold text-qm-ink">{title}</h3><dl className="mt-2">{children}</dl></section>
}

function TransactionDetailsSheet({ transaction, onClose }: TransactionDetailsSheetProps) {
  return (
    <Sheet open={transaction !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      <SheetContent side="right" className="w-full max-w-none gap-0 overflow-hidden p-0 sm:max-w-[500px]">
        {transaction ? <>
          <SheetHeader className="shrink-0 border-b border-[#eeeeee] bg-white p-6 pr-14">
            <div className="flex flex-wrap items-center gap-2"><Badge className={getTransactionTypeClassName(transaction)}>{getTransactionTypeLabel(transaction)}</Badge><Badge className={getTransactionStatusClassName(transaction)}>{transaction.transactionStatus || transaction.status || 'Unknown'}</Badge></div>
            <SheetTitle className="mt-3 text-xl font-bold text-qm-ink">{transaction.beneficiaryName || 'Transaction details'}</SheetTitle>
            <p className="mt-1 text-sm text-qm-muted">Transaction details</p>
            <SheetDescription className="mt-1 font-mono text-xs">{transaction.transactionRef || `Transaction #${transaction.id}`}</SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
            <DetailsSection title="Overview">
              <DetailRow label="Amount" value={formatCurrency(transaction.amount)} />
              <DetailRow label="Charges" value={formatCurrency(transaction.charges)} />
              <DetailRow label="Transaction date" value={formatTransactionDate(transaction.transactionDate)} />
              <DetailRow label="Product" value={transaction.productType} />
              <DetailRow label="Description" value={transaction.description} />
              <DetailRow label="Reversal" value={transaction.isReversed ? 'Yes' : 'No'} />
            </DetailsSection>

            <DetailsSection title="Beneficiary">
              <DetailRow label="Name" value={transaction.beneficiaryName} />
              <DetailRow label="Account" value={transaction.beneficiaryAccount} />
              <DetailRow label="Bank" value={transaction.bank} />
              <DetailRow label="Bank code" value={transaction.beneficiaryBankCode} />
            </DetailsSection>

            <DetailsSection title="Benefactor">
              <DetailRow label="Name" value={transaction.benefactorName} />
              <DetailRow label="Account" value={transaction.benefactorAccount} />
            </DetailsSection>

            <DetailsSection title="Processing">
              <DetailRow label="Channel" value={transaction.channels} />
              <DetailRow label="Wallet operation" value={transaction.walletOps} />
              <DetailRow label="Session ID" value={transaction.sessionId} />
              <DetailRow label="Source ID" value={transaction.sourceId} />
              <DetailRow label="Channel ID" value={transaction.channelId} />
              <DetailRow label="Staff referral ID" value={transaction.staffReferralId} />
            </DetailsSection>

            <DetailsSection title="Balances and resolution">
              <DetailRow label="Debit balance before" value={formatCurrency(transaction.debitacctcurrBal)} />
              <DetailRow label="Debit balance after" value={formatCurrency(transaction.debitacctnewBal)} />
              <DetailRow label="Credit balance before" value={formatCurrency(transaction.creditacctcurrBal)} />
              <DetailRow label="Credit balance after" value={formatCurrency(transaction.creditacctnewBal)} />
              <DetailRow label="Failure reason" value={transaction.failureReason} />
            </DetailsSection>
          </div>
        </> : null}
      </SheetContent>
    </Sheet>
  )
}

export default TransactionDetailsSheet

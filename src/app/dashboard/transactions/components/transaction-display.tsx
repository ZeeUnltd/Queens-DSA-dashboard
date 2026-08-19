import { ArrowDownRight, ArrowUpRight, RotateCcw } from 'lucide-react'
import type { TransactionRecord } from '../../../../types/dashboard'

export type TransactionKind = 'deposit' | 'withdrawal' | 'reversal'

export function getTransactionKind(transaction: TransactionRecord): TransactionKind {
  if (transaction.isReversed || transaction.transactionStatus === 'Reversed') return 'reversal'
  return transaction.transactionType.toLowerCase() === 'deposit' ? 'deposit' : 'withdrawal'
}

export function getTransactionTypeLabel(transaction: TransactionRecord) {
  const kind = getTransactionKind(transaction)
  return kind === 'deposit' ? 'Deposit' : kind === 'withdrawal' ? 'Withdrawal' : 'Reversal'
}

export function getTransactionInitials(name: string) {
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('')
  return initials.toUpperCase() || '—'
}

export function getTransactionTypeClassName(transaction: TransactionRecord) {
  const kind = getTransactionKind(transaction)
  if (kind === 'deposit') return 'border-0 bg-[#ecfdf3] text-[#16794b] hover:bg-[#ecfdf3]'
  if (kind === 'withdrawal') return 'border-0 bg-[#fff0f0] text-qm-brand hover:bg-[#fff0f0]'
  return 'border-0 bg-[#fff7e6] text-[#9a6700] hover:bg-[#fff7e6]'
}

export function getTransactionStatusClassName(transaction: TransactionRecord) {
  if (transaction.isReversed || transaction.transactionStatus === 'Reversed') return 'border-0 bg-[#fff0f0] text-qm-brand hover:bg-[#fff0f0]'
  if (transaction.transactionStatus === 'Approved' || transaction.status === 'SUCCESS') return 'border-0 bg-[#ecfdf3] text-[#16794b] hover:bg-[#ecfdf3]'
  return 'border-0 bg-[#fff7e6] text-[#9a6700] hover:bg-[#fff7e6]'
}

export function TransactionDirectionIcon({ transaction }: { transaction: TransactionRecord }) {
  const kind = getTransactionKind(transaction)
  if (kind === 'deposit') return <ArrowUpRight className="h-4 w-4 text-[#16a34a]" aria-label="Deposit" />
  if (kind === 'withdrawal') return <ArrowDownRight className="h-4 w-4 text-qm-brand" aria-label="Withdrawal" />
  return <RotateCcw className="h-4 w-4 text-[#d97706]" aria-label="Reversal" />
}

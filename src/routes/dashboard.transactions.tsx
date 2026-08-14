import { createFileRoute } from '@tanstack/react-router'
import TransactionsPage from '../app/dashboard/transactions/page'

export const Route = createFileRoute('/dashboard/transactions')({ component: TransactionsPage })

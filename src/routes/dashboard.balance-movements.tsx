import { createFileRoute } from '@tanstack/react-router'
import BalanceMovementsPage from '../app/dashboard/balance-movements/page'

export const Route = createFileRoute('/dashboard/balance-movements')({ component: BalanceMovementsPage })

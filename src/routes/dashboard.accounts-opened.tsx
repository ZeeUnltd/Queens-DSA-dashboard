import { createFileRoute } from '@tanstack/react-router'
import AccountsOpenedPage from '../app/dashboard/accounts-opened/page'

export const Route = createFileRoute('/dashboard/accounts-opened')({ component: AccountsOpenedPage })

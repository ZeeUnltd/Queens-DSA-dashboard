import { createFileRoute } from '@tanstack/react-router'
import KpiPerformancePage from '../app/dashboard/kpi-performance/page'

export const Route = createFileRoute('/dashboard/kpi-performance')({ component: KpiPerformancePage })

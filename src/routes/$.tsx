import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({ component: NotFoundPage })

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-qm-ink">Page not found</h1>
      <p className="text-sm text-qm-muted">The page you requested does not exist.</p>
      <Link className="rounded-full bg-qm-brand px-5 py-3 text-sm font-semibold text-white" to="/login">Return to login</Link>
    </main>
  )
}

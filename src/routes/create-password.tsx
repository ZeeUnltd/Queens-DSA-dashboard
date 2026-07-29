import { createFileRoute } from '@tanstack/react-router'
import CreatePasswordPage from '../app/create-password/page'

export const Route = createFileRoute('/create-password')({ component: CreatePasswordPage })

import { createFileRoute } from '@tanstack/react-router'
import PasswordResetSuccessPage from '../app/password-reset-success/page'

export const Route = createFileRoute('/password-reset-success')({ component: PasswordResetSuccessPage })

import { createFileRoute } from '@tanstack/react-router'
import OtpPage from '../app/otp/page'

export const Route = createFileRoute('/otp')({ component: OtpPage })

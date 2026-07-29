import './App.css'
import CreatePasswordPage from './app/create-password/page'
import LoginPage from './app/login/page'
import OtpPage from './app/otp/page'
import PasswordResetSuccessPage from './app/password-reset-success/page'
import ResetPasswordPage from './app/reset-password/page'

const PAGES_BY_PATH = {
  '/': LoginPage,
  '/login': LoginPage,
  '/reset-password': ResetPasswordPage,
  '/otp': OtpPage,
  '/create-password': CreatePasswordPage,
  '/password-reset-success': PasswordResetSuccessPage,
} as const

function App() {
  const path = window.location.pathname as keyof typeof PAGES_BY_PATH
  const Page = PAGES_BY_PATH[path] ?? LoginPage

  return <Page />
}

export default App

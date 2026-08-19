import AuthShell from '../../components/layout/AuthShell'
import LoginForm from '../../components/auth/LoginForm'

function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
      <span className="text-sm text-gray-500">
        v-1.0.0
      </span> 
    </AuthShell>
  )
}

export default LoginPage

import type { PropsWithChildren } from 'react'
import desktopImage from '../../assets/Desktop - 10.png'

type AuthShellProps = PropsWithChildren

function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-shell grid min-h-screen md:grid-cols-2">
      <section className="auth-visual overflow-hidden p-4 md:p-6" aria-label="QueensMoni brand">
        <img
          className="auth-visual__image rounded-[20px]"
          src={desktopImage}
          alt="QueensMoni relationship manager working at a desk"
        />
      </section>

      <section className="auth-form-panel flex items-center justify-center px-6 py-14 sm:px-10 md:px-14 lg:px-20 xl:px-28">
        {children}
      </section>
    </main>
  )
}

export default AuthShell

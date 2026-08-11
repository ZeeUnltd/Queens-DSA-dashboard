import type { PropsWithChildren } from 'react'
import desktopImage from '../../assets/portrait-cheerful-woman-home-office-opening-laptop 1.png'
import whiteBrandLogo from '../../assets/white-brand-logo.svg'
import cbnLogo from '../../assets/cbn-logo.svg'
import ndicBadge from '../../assets/ndic-badge.svg'
import ndicBrand from '../../assets/ndic-brand.svg'

type AuthShellProps = PropsWithChildren

function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-shell grid min-h-screen grid-cols-1 p-4 lg:grid-cols-2">
      <section className="auth-visual relative hidden overflow-hidden lg:block" aria-label="QueensMoni brand">
        <img
          className="auth-visual__image absolute inset-0 h-full w-full rounded-[20px]"
          src={desktopImage}
          alt="QueensMoni relationship manager working at a desk"
        />
        <div className="auth-visual__overlay absolute inset-0 rounded-[20px]" aria-hidden="true" />
        <footer className="auth-visual__footer absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 px-8 pb-8 xl:px-12 xl:pb-10">
          <img className="h-auto w-[170px] xl:w-[213px]" src={whiteBrandLogo} alt="QueensMonie" />

          <div className="flex items-center gap-8 text-sm text-white xl:gap-12 xl:text-base">
            <div className="flex items-center gap-3" aria-label="Licensed by the Central Bank of Nigeria and insured by NDIC">
              <span>Licensed by</span>
              <img className="h-6 w-6" src={cbnLogo} alt="Central Bank of Nigeria" />
              <img className="h-6 w-6" src={ndicBadge} alt="NDIC" />
            </div>
            <div className="flex items-center gap-3">
              <span>Insured by</span>
              <img className="h-6 w-auto xl:h-7" src={ndicBrand} alt="NDIC" />
            </div>
          </div>
        </footer>
      </section>

      <section className="auth-form-panel flex w-full items-center justify-center px-4 py-12 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {children}
      </section>
    </main>
  )
}
 
export default AuthShell

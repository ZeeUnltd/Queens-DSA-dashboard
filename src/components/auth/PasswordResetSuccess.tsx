import successCheckIcon from '../../assets/success-check.svg'
import closeIcon from '../../assets/proicons_cancel-circle.svg'
import { PASSWORD_RESET_SUCCESS_COPY } from '../../constants/password-reset-success'

function PasswordResetSuccess() {
  return (
    <section className="auth-form auth-success-panel text-center">
      <div className="auth-success-card rounded-[32px] bg-white px-6 py-8 sm:px-12 sm:py-10">
        <div className="flex justify-end">
          <a
            className="rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
            href="/login"
            aria-label={PASSWORD_RESET_SUCCESS_COPY.closeLabel}
          >
            <img className="h-5 w-5" src={closeIcon} alt="" aria-hidden="true" />
          </a>
        </div>

        <div className="mx-auto mt-8 flex justify-center sm:mt-10">
          <img className="h-[112px] w-[112px] sm:h-[132px] sm:w-[132px]" src={successCheckIcon} alt="" aria-hidden="true" />
        </div>

        <h1 className="mx-auto mt-10 max-w-[720px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-qm-ink sm:text-[40px]">
          {PASSWORD_RESET_SUCCESS_COPY.title}
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] text-[18px] leading-[1.45] text-[#8d8d8d] sm:text-[20px]">
          {PASSWORD_RESET_SUCCESS_COPY.description}
        </p>

        <a
          className="auth-submit mt-14 inline-flex w-full items-center justify-center rounded-full bg-qm-brand px-6 py-5 text-[18px] font-medium text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25 sm:mt-16 sm:py-6"
          href="/login"
        >
          {PASSWORD_RESET_SUCCESS_COPY.submit}
        </a>
      </div>
    </section>
  )
}

export default PasswordResetSuccess

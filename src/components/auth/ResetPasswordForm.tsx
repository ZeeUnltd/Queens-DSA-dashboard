import type { FormEvent } from 'react'
import { useState } from 'react'
import backIcon from '../../assets/arrow-down.svg'
import { RESET_PASSWORD_COPY } from '../../constants/reset-password'
import type { ResetPasswordFieldErrors, ResetPasswordFormValues } from '../../types/auth'

const INITIAL_VALUES: ResetPasswordFormValues = {
  referralCode: '',
}

function ResetPasswordForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<ResetPasswordFieldErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const updateValue = (value: string) => {
    setValues({ referralCode: value })
    setErrors({ referralCode: undefined })
    setSubmitted(false)
  }

  const validate = (): ResetPasswordFieldErrors => {
    const nextErrors: ResetPasswordFieldErrors = {}

    if (!values.referralCode.trim()) {
      nextErrors.referralCode = 'Enter your referral code.'
    }

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
    window.location.assign('/otp')
  }

  return (
    <form className="auth-form overflow-auto" onSubmit={handleSubmit} noValidate>
      <div className="mb-8">
        <a
          className="auth-back-link focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
          href="/login"
        >
          <img className="auth-back-link__icon" src={backIcon} alt="" aria-hidden="true" />
          {RESET_PASSWORD_COPY.back}
        </a>
      </div>

      <header className="mb-12">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-qm-ink sm:text-[34px]">
          {RESET_PASSWORD_COPY.title}
        </h1>
        <p className="mt-4 text-base leading-6 text-qm-muted sm:text-lg">{RESET_PASSWORD_COPY.description}</p>
      </header>

      <div>
        <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="reset-referral-code">
          {RESET_PASSWORD_COPY.referralLabel}
        </label>
        <div className="auth-field rounded-full bg-qm-field px-5 py-4 sm:px-6">
          <input
            className="w-full bg-transparent text-base text-qm-ink placeholder:text-qm-muted focus:outline-none"
            id="reset-referral-code"
            name="referralCode"
            type="text"
            placeholder={RESET_PASSWORD_COPY.referralPlaceholder}
            autoComplete="username"
            value={values.referralCode}
            aria-invalid={Boolean(errors.referralCode)}
            aria-describedby={errors.referralCode ? 'reset-referral-error' : undefined}
            onChange={(event) => updateValue(event.target.value)}
          />
        </div>
        {errors.referralCode ? (
          <p className="mt-2 px-5 text-sm text-red-700" id="reset-referral-error">
            {errors.referralCode}
          </p>
        ) : null}
      </div>

      <button
        className="auth-submit mt-10 w-full cursor-pointer rounded-full bg-qm-brand px-6 py-5 text-base font-medium text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25"
        type="submit"
      >
        {RESET_PASSWORD_COPY.submit}
      </button>

      <p className="sr-only" aria-live="polite">
        {submitted ? 'Referral code accepted.' : ''}
      </p>
    </form>
  )
}

export default ResetPasswordForm

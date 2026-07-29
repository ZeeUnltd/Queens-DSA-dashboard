import { useState } from 'react'
import type { FormEvent } from 'react'
import eyeSlash from '../../assets/eye-slash.svg'
import { LOGIN_COPY } from '../../constants/login'
import type { LoginFieldErrors, LoginFormValues } from '../../types/auth'

const INITIAL_VALUES: LoginFormValues = {
  referralCode: '',
  password: '',
  rememberMe: false,
}

function LoginForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<LoginFieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateValue = (field: keyof LoginFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitted(false)
  }

  const validate = (): LoginFieldErrors => {
    const nextErrors: LoginFieldErrors = {}

    if (!values.referralCode.trim()) {
      nextErrors.referralCode = 'Enter your referral code.'
    }

    if (!values.password) {
      nextErrors.password = 'Enter your password.'
    }

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <form className="auth-form overflow-auto" onSubmit={handleSubmit} noValidate>
      <header className="mb-12">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-qm-ink sm:text-[34px]">
          {LOGIN_COPY.title}
          <span className="block">{LOGIN_COPY.subtitle}</span>
        </h1>
        <p className="mt-4 text-base leading-6 text-qm-muted sm:text-lg">
          {LOGIN_COPY.description}
        </p>
      </header>

      <div className="space-y-7">
        <div>
          <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="referral-code">
            {LOGIN_COPY.referralLabel}
          </label>
          <div className="auth-field rounded-full bg-qm-field px-5 py-4 sm:px-6">
            <input
              className="w-full bg-transparent text-base text-qm-ink placeholder:text-qm-muted focus:outline-none"
              id="referral-code"
              name="referralCode"
              type="text"
              placeholder={LOGIN_COPY.referralPlaceholder}
              autoComplete="username"
              value={values.referralCode}
              aria-invalid={Boolean(errors.referralCode)}
              aria-describedby={errors.referralCode ? 'referral-error' : undefined}
              onChange={(event) => updateValue('referralCode', event.target.value)}
            />
          </div>
          {errors.referralCode ? (
            <p className="mt-2 px-5 text-sm text-red-700" id="referral-error">
              {errors.referralCode}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="password">
            {LOGIN_COPY.passwordLabel}
          </label>
          <div className="auth-field flex items-center rounded-full bg-qm-field px-5 py-4 sm:px-6">
            <input
              className="w-full bg-transparent text-base text-qm-ink placeholder:text-qm-muted focus:outline-none"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={LOGIN_COPY.passwordPlaceholder}
              autoComplete="current-password"
              value={values.password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              onChange={(event) => updateValue('password', event.target.value)}
            />
            <button
              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((current) => !current)}
            >
              <img className="h-5 w-5" src={eyeSlash} alt="" aria-hidden="true" />
            </button>
          </div>
          {errors.password ? (
            <p className="mt-2 px-5 text-sm text-red-700" id="password-error">
              {errors.password}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 text-base">
        <label className="flex cursor-pointer items-center gap-2 text-qm-muted" htmlFor="remember-me">
          <input
            className="peer sr-only"
            id="remember-me"
            name="rememberMe"
            type="checkbox"
            checked={values.rememberMe}
            onChange={(event) => updateValue('rememberMe', event.target.checked)}
          />
          <span
            aria-hidden="true"
            className="relative h-4 w-4 shrink-0 rounded-[3px] border border-[#bdbdbd] bg-white transition-colors after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-[11px] after:font-bold after:leading-none after:text-white after:content-['✓'] peer-checked:border-qm-brand peer-checked:bg-qm-brand peer-focus-visible:ring-4 peer-focus-visible:ring-qm-brand/20"
          />
          <span>{LOGIN_COPY.rememberMe}</span>
        </label>
        <a className="font-semibold text-qm-brand underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20" href="/reset-password">
          {LOGIN_COPY.forgotPassword}
        </a>
      </div>

      <button className="auth-submit mt-10 w-full rounded-full bg-qm-brand px-6 py-5 text-base font-medium text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25 cursor-pointer" type="submit">
        {LOGIN_COPY.submit}
      </button>

      <p className="sr-only" aria-live="polite">
        {submitted ? 'Login details are ready to submit.' : ''}
      </p>
    </form>
  )
}

export default LoginForm

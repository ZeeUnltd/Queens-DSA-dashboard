import type { FormEvent } from 'react'
import { useState } from 'react'
import backIcon from '../../assets/arrow-down.svg'
import eyeSlash from '../../assets/eye-slash.svg'
import { CREATE_PASSWORD_COPY } from '../../constants/create-password'
import type { CreatePasswordFieldErrors, CreatePasswordFormValues } from '../../types/auth'

const INITIAL_VALUES: CreatePasswordFormValues = {
  password: '',
  confirmPassword: '',
}

function CreatePasswordForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<CreatePasswordFieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateValue = (field: keyof CreatePasswordFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitted(false)
  }

  const validate = (): CreatePasswordFieldErrors => {
    const nextErrors: CreatePasswordFieldErrors = {}

    if (!values.password) {
      nextErrors.password = 'Enter your new password.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must contain at least 8 characters.'
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your new password.'
    } else if (values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
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
    window.location.assign('/password-reset-success')
  }

  return (
    <form className="auth-form overflow-auto" onSubmit={handleSubmit} noValidate>
      <div className="mb-8">
        <a
          className="auth-back-link focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
          href="/otp"
        >
          <img className="auth-back-link__icon" src={backIcon} alt="" aria-hidden="true" />
          {CREATE_PASSWORD_COPY.back}
        </a>
      </div>

      <header className="mb-12">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-qm-ink sm:text-[34px]">
          {CREATE_PASSWORD_COPY.title}
        </h1>
        <p className="mt-4 text-base leading-6 text-qm-muted sm:text-lg">{CREATE_PASSWORD_COPY.description}</p>
      </header>

      <div className="space-y-7">
        <div>
          <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="new-password">
            {CREATE_PASSWORD_COPY.passwordLabel}
          </label>
          <div className="auth-field flex items-center rounded-full bg-qm-field px-5 py-4 sm:px-6">
            <input
              className="w-full bg-transparent text-base text-qm-ink placeholder:text-qm-muted focus:outline-none"
              id="new-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={CREATE_PASSWORD_COPY.passwordPlaceholder}
              autoComplete="new-password"
              value={values.password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'new-password-error' : undefined}
              onChange={(event) => updateValue('password', event.target.value)}
            />
            <button
              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
              type="button"
              aria-label={showPassword ? 'Hide new password' : 'Show new password'}
              onClick={() => setShowPassword((current) => !current)}
            >
              <img className="h-5 w-5" src={eyeSlash} alt="" aria-hidden="true" />
            </button>
          </div>
          {errors.password ? (
            <p className="mt-2 px-5 text-sm text-red-700" id="new-password-error">
              {errors.password}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="confirm-password">
            {CREATE_PASSWORD_COPY.confirmPasswordLabel}
          </label>
          <div className="auth-field flex items-center rounded-full bg-qm-field px-5 py-4 sm:px-6">
            <input
              className="w-full bg-transparent text-base text-qm-ink placeholder:text-qm-muted focus:outline-none"
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={CREATE_PASSWORD_COPY.confirmPasswordPlaceholder}
              autoComplete="new-password"
              value={values.confirmPassword}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              onChange={(event) => updateValue('confirmPassword', event.target.value)}
            />
            <button
              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
              type="button"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setShowConfirmPassword((current) => !current)}
            >
              <img className="h-5 w-5" src={eyeSlash} alt="" aria-hidden="true" />
            </button>
          </div>
          {errors.confirmPassword ? (
            <p className="mt-2 px-5 text-sm text-red-700" id="confirm-password-error">
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>
      </div>

      <button
        className="auth-submit mt-10 w-full cursor-pointer rounded-full bg-qm-brand px-6 py-5 text-base font-medium text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25"
        type="submit"
      >
        {CREATE_PASSWORD_COPY.submit}
      </button>

      <p className="sr-only" aria-live="polite">
        {submitted ? 'Your password is ready to be reset.' : ''}
      </p>
    </form>
  )
}

export default CreatePasswordForm

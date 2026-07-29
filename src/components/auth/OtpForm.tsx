import type { FormEvent } from 'react'
import { useRef, useState } from 'react'
import backIcon from '../../assets/arrow-down.svg'
import { OTP_COPY } from '../../constants/otp'
import type { OtpFieldErrors, OtpFormValues } from '../../types/auth'

const OTP_LENGTH = 6

const INITIAL_VALUES: OtpFormValues = {
  otp: '',
}

function OtpForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<OtpFieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const updateValue = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, OTP_LENGTH)
    setValues({ otp: digitsOnly })
    setErrors({ otp: undefined })
    setSubmitted(false)
  }

  const handleDigitChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    const nextDigits = values.otp.split('')

    nextDigits[index] = digit
    updateValue(nextDigits.join(''))

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleDigitKeyDown = (index: number, key: string) => {
    if (key === 'Backspace') {
      const nextDigits = values.otp.split('')

      if (nextDigits[index]) {
        nextDigits[index] = ''
        updateValue(nextDigits.join(''))
        return
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      return
    }

    if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
      return
    }

    if (key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, OTP_LENGTH)

    if (!digitsOnly) {
      return
    }

    updateValue(digitsOnly)

    const focusIndex = Math.min(digitsOnly.length, OTP_LENGTH) - 1
    inputRefs.current[focusIndex]?.focus()
  }

  const validate = (): OtpFieldErrors => {
    const nextErrors: OtpFieldErrors = {}

    if (!values.otp) {
      nextErrors.otp = 'Enter the OTP code.'
    } else if (values.otp.length !== OTP_LENGTH) {
      nextErrors.otp = 'OTP must be 6 digits.'
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
    window.location.assign('/create-password')
  }

  return (
    <form className="auth-form overflow-auto" onSubmit={handleSubmit} noValidate>
      <div className="mb-8">
        <a
          className="auth-back-link focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
          href="/reset-password"
        >
          <img className="auth-back-link__icon" src={backIcon} alt="" aria-hidden="true" />
          {OTP_COPY.back}
        </a>
      </div>

      <header className="mb-12">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-qm-ink sm:text-[34px]">
          {OTP_COPY.title}
        </h1>
        <p className="mt-4 text-base leading-6 text-qm-muted sm:text-lg">{OTP_COPY.description}</p>
      </header>

      <div>
        <label className="mb-3 block text-base font-medium text-qm-ink" htmlFor="otp-code-0">
          {OTP_COPY.otpLabel}
        </label>
        <div className="auth-otp-group" role="group" aria-label={OTP_COPY.otpLabel}>
          {Array.from({ length: OTP_LENGTH }, (_, index) => {
            const digitValue = values.otp[index] ?? ''

            return (
              <div key={index} className="auth-otp-slot">
                <input
                  ref={(element) => {
                    inputRefs.current[index] = element
                  }}
                  className="auth-otp-input"
                  id={`otp-code-${index}`}
                  name={`otp-digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  value={digitValue}
                  aria-invalid={Boolean(errors.otp)}
                  aria-describedby={errors.otp ? 'otp-error' : undefined}
                  onChange={(event) => handleDigitChange(index, event.target.value)}
                  onKeyDown={(event) => handleDigitKeyDown(index, event.key)}
                  onPaste={(event) => {
                    event.preventDefault()
                    handlePaste(event.clipboardData.getData('text'))
                  }}
                />
              </div>
            )
          })}
        </div>
        {errors.otp ? (
          <p className="mt-2 px-5 text-sm text-red-700" id="otp-error">
            {errors.otp}
          </p>
        ) : null}
      </div>

      <div className="mt-6 text-sm sm:text-base">
        <p className="text-qm-muted">
          {OTP_COPY.resendHint}{' '}
          <a
            className="font-semibold text-qm-brand underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20"
            href="/otp"
          >
            {OTP_COPY.resend}
          </a>
        </p>
      </div>

      <button
        className="auth-submit mt-10 w-full cursor-pointer rounded-full bg-qm-brand px-6 py-5 text-base font-medium text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/25"
        type="submit"
      >
        {OTP_COPY.submit}
      </button>

      <p className="sr-only" aria-live="polite">
        {submitted ? 'OTP has been verified successfully.' : ''}
      </p>
    </form>
  )
}

export default OtpForm

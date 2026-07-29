export type LoginFormValues = {
  referralCode: string
  password: string
  rememberMe: boolean
}

export type LoginFieldErrors = Partial<
  Record<keyof Omit<LoginFormValues, 'rememberMe'>, string>
>

export type ResetPasswordFormValues = {
  referralCode: string
}

export type ResetPasswordFieldErrors = Partial<
  Record<keyof ResetPasswordFormValues, string>
>

export type OtpFormValues = {
  otp: string
}

export type OtpFieldErrors = Partial<Record<keyof OtpFormValues, string>>

export type CreatePasswordFormValues = {
  password: string
  confirmPassword: string
}

export type CreatePasswordFieldErrors = Partial<
  Record<keyof CreatePasswordFormValues, string>
>

export type LoginFormValues = {
  referralCode: string
  password: string
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

export type AuthUserDetails = {
  firstName: string
  lastName: string
  userName: string
  isCompleteKyc: boolean
  role?: string
  roles?: string[]
  staffRefCode?: number
  isRM: boolean
}

export type AuthTokenBundle = {
  accessToken: string
  expiryDate: number
  refreshToken: string
  refreshExpiryDate: number
}

export type AuthData = {
  passcodeSet?: boolean
  token: AuthTokenBundle
  userDetails: AuthUserDetails
}

export type ApiEnvelope<T> = {
  responseCode: string
  isSuccess: boolean
  message: string
  data: T
}

export type LoginRequest = {
  PhoneNumber: string
  Password: string
}

export type RefreshTokenRequest = {
  refreshToken: string
  username: string
}

export type AuthResponse = ApiEnvelope<AuthData>

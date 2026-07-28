export type LoginFormValues = {
  referralCode: string
  password: string
  rememberMe: boolean
}

export type LoginFieldErrors = Partial<
  Record<keyof Omit<LoginFormValues, 'rememberMe'>, string>
>

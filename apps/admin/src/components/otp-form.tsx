'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'
import { createClient } from '../utils/supabase/client'

interface OTPFormProps extends React.ComponentProps<'div'> {
  email?: string | null
}

export function OTPForm({ className, email, ...props }: OTPFormProps) {
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [infoMsg, setInfoMsg] = React.useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function onVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setErrorMsg('Missing email. Go back and request a code again.')
      return
    }
    setLoading(true)
    setErrorMsg(null)
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' })
      if (error) throw error
      router.replace('/dashboard')
    } catch (err) {
      console.error(err)
      setErrorMsg('Invalid or expired code. Please re-enter the code or request a new one.')
    } finally {
      setLoading(false)
    }
  }

  async function onResend() {
    if (!email) {
      setErrorMsg('Missing email. Go back and enter your email.')
      return
    }
    setLoading(true)
    setErrorMsg(null)
    setInfoMsg(null)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setInfoMsg('You have been sent a new 6-digit code to your email.')
    } catch (err) {
      console.error(err)
      setErrorMsg('Unable to resend code. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6 md:min-h-[450px]', className)} {...props}>
      <Card className="flex-1 overflow-hidden p-0">
        <CardContent className="flex-1 p-0">
          <form onSubmit={onVerify} className="flex flex-col items-center justify-center gap-6 p-6 md:p-8">
            <div className="items-center text-center">
              <h1 className="text-2xl font-bold">Enter verification code</h1>
              <p className="text-muted-foreground text-sm text-balance">
                {email ? `You have been sent a 6-digit code to ${email}` : 'You have been sent a 6-digit code to your email'}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="otp" className="sr-only">
                Verification code
              </label>
              <InputOTP maxLength={6} id="otp" required containerClassName="gap-4" value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {infoMsg ? <p className="text-center text-xs text-muted-foreground">{infoMsg}</p> : null}
              {errorMsg ? <p className="text-center text-sm text-destructive">{errorMsg}</p> : null}
            </div>

            <div className="space-y-2 w-full">
              <Button type="submit" className="w-full" disabled={loading || code.length !== 6}>
                {loading ? 'Verifying…' : 'Verify'}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the code?{' '}
                <button type="button" className="underline" onClick={onResend} disabled={loading}>
                  Resend
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and{' '}
        <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  )
}



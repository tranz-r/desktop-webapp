import { OTPForm } from '../../../components/otp-form'
import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function OTPPage({ searchParams }: { searchParams: { email?: string } }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  // If user exists already, send them to dashboard
  if (data?.user) {
    redirect('/dashboard')
  }
  // Read email from query param (provided by login redirect)
  const email: string | null = searchParams?.email ?? null
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <OTPForm email={email} />
      </div>
    </div>
  )
}



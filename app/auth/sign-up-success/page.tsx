import { Wand2, Mail, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Wand2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">WuzEpic</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {"We've sent a confirmation link to your email address. Please click the link to verify your account and start creating beautiful framed photos."}
          </p>

          <div className="mt-8 rounded-xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              {"Didn't receive the email? Check your spam folder or"}{' '}
              <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
                try again
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

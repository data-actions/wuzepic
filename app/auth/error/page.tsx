import { Frame, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Frame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">FrameIt</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {params?.error 
              ? `Error: ${params.error}`
              : 'An unexpected error occurred during authentication. Please try again.'
            }
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild className="h-12 rounded-xl text-base font-semibold">
              <Link href="/auth/login">Try again</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-xl text-base">
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

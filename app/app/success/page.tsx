import { Button } from '@/components/ui/button'
import { CheckCircle2, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  // Generate a dummy order number
  const orderNumber = `FRM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
      <div className="w-full max-w-sm text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for your order. Your beautiful framed photos are being prepared with care.
        </p>

        {/* Order Details */}
        <div className="mt-8 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Order Number</span>
            <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estimated Delivery</span>
            <span className="font-medium text-foreground">5-7 Business Days</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-left">
          <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {"We'll email you tracking info"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;ll receive shipping updates once your order is on its way.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild className="h-12 rounded-xl text-base font-semibold">
            <Link href="/app">
              Create Another Frame
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

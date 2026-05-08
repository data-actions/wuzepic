'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FanClubBenefits } from '@/components/fan-club-benefits'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Loader2, ArrowRight, Crown } from 'lucide-react'

export default function FanClubPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    // Check if coming from signup
    const hasPendingSignup = typeof window !== 'undefined' && 
      sessionStorage.getItem('pendingFanClubSignup')
    if (!hasPendingSignup && !paymentSuccess) {
      // Redirect if not coming from signup
      // In a real app, you'd handle this with proper auth checks
    }
  }, [paymentSuccess])

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear the pending flag
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pendingFanClubSignup')
    }
    
    setPaymentSuccess(true)
  }

  if (paymentSuccess) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center p-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/white background logo.jpg" 
            alt="WuzEpic" 
            width={160} 
            height={40}
            className="h-10 w-40 rounded-xl object-cover"
          />
        </Link>
      </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                  <Crown className="h-10 w-10 text-green-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground">Welcome to Fan-Club!</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your Fan-Club membership is now active. You&apos;ll receive your 2 free frames shortly and can start enjoying all member benefits immediately.
            </p>

            <div className="mt-8 space-y-4">
              <Card className="p-4">
                <h3 className="mb-3 font-semibold text-foreground">What&apos;s Next?</h3>
                <ul className="space-y-2 text-left text-sm text-muted-foreground">
                  <li>• Check your email for account confirmation</li>
                  <li>• Your 2 free frames will arrive shortly</li>
                  <li>• Start enjoying 5% discount on all purchases</li>
                  <li>• Monthly $10 credit for game tickets/merch</li>
                </ul>
              </Card>

              <Button
                asChild
                className="h-12 w-full rounded-xl text-base font-semibold"
              >
                <Link href="/auth/sign-up-success">
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center p-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/white background logo.jpg" 
            alt="WuzEpic" 
            width={160} 
            height={40}
            className="h-10 w-40 rounded-xl object-cover"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Complete Your Membership</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Finish setting up your Fan-Club subscription
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="mb-6 border-primary/20 bg-primary/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fan-Club Membership</p>
                <p className="mt-1 text-3xl font-bold text-foreground">$99</p>
                <p className="mt-1 text-xs text-muted-foreground">/year (billed annually)</p>
              </div>
              <Crown className="h-12 w-12 text-primary" />
            </div>
          </Card>

          {/* Benefits Preview */}
          <div className="mb-8">
            <h3 className="mb-4 font-semibold text-foreground">Your Benefits:</h3>
            <FanClubBenefits />
          </div>

          {/* Payment Disclaimer */}
          <div className="mb-8 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">
              By clicking "Complete Purchase" below, you agree to be charged $99 annually for your Fan-Club membership. Your first payment will be processed immediately, and you&apos;ll receive a confirmation email.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Complete Purchase
              </>
            )}
          </Button>

          {/* Skip Option */}
          <Button
            asChild
            variant="outline"
            className="mt-3 h-12 w-full rounded-xl text-base"
          >
            <Link href="/auth/sign-up-success">
              Skip for Now
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

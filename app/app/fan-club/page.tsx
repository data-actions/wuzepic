'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppHeader } from '@/components/app-header'
import { FanClubBenefits } from '@/components/fan-club-benefits'
import { FeatureComparison } from '@/components/feature-comparison'
import { PaymentMethodSelector } from '@/components/payment-method-selector'
import {
  Star,
  Check,
  TrendingUp,
  Gift,
  Zap,
  Users,
  ArrowRight,
  Crown,
} from 'lucide-react'

export default function FanClubUpgradePage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card')
  const router = useRouter()

  const handleProceedToPayment = () => {
    // Store selected payment method in session or state management
    sessionStorage.setItem('fanClubPaymentMethod', selectedPaymentMethod)
    // Redirect to fan-club payment page
    router.push('/auth/fan-club-payment')
  }

  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <AppHeader />

      <main className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-12">
          {/* Hero Section */}
          <section className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Membership</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Join WuzEpic Fan-Club
              </h1>
              <p className="text-lg text-muted-foreground">
                Unlock exclusive benefits and become part of our VIP community
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <div className="text-4xl font-bold text-primary">$99</div>
              <div className="space-y-1 text-left">
                <p className="font-semibold text-foreground">/year</p>
                <p className="text-sm text-muted-foreground">Plus applicable taxes</p>
              </div>
            </div>
          </section>

          {/* Pricing Tiers */}
          <section className="grid gap-6 sm:grid-cols-2">
            {/* Standard Tier */}
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Check className="h-4 w-4 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Standard</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">Free</p>
              <p className="mt-2 text-sm text-muted-foreground">For casual framers</p>

              <ul className="mt-6 space-y-3">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-foreground">Upload & customize photos</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-foreground">Choose from 5 frame styles</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-foreground">Free shipping on orders</span>
                </li>
              </ul>

              <Button variant="outline" className="mt-6 w-full" disabled>
                Current Plan
              </Button>
            </Card>

            {/* Fan-Club Tier */}
            <Card className="relative border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="absolute -top-3 right-4 inline-flex gap-1 rounded-full bg-primary px-3 py-1">
                <Star className="h-3 w-3 text-primary-foreground" />
                <span className="text-xs font-semibold text-primary-foreground">Recommended</span>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Crown className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Fan-Club</h3>
              </div>

              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">$99</p>
                <p className="text-sm text-muted-foreground">per year, annual billing</p>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">Everything in Standard</span>
                </li>
                <li className="flex gap-2">
                  <Gift className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">2 free frames yearly</span>
                </li>
                <li className="flex gap-2">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">5% off all purchases</span>
                </li>
                <li className="flex gap-2">
                  <Zap className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">$10 monthly ticket credit</span>
                </li>
                <li className="flex gap-2">
                  <Users className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">VIP support & early access</span>
                </li>
              </ul>

              <Button className="mt-6 w-full" onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Upgrade Now
              </Button>
            </Card>
          </section>

          {/* Benefits Section */}
          <section className="rounded-xl border border-border bg-card/50 p-6 sm:p-8">
            <FanClubBenefits />
          </section>

          {/* Feature Comparison */}
          <section className="rounded-xl border border-border bg-card/50 p-6 sm:p-8">
            <FeatureComparison />
          </section>

          {/* Payment Section */}
          <section id="payment-section" className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Complete Your Purchase</h2>
              <p className="mt-2 text-muted-foreground">
                Select your payment method and proceed to checkout
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">WuzEpic Fan-Club Membership</p>
                  <p className="text-sm text-muted-foreground">Annual subscription</p>
                </div>
                <p className="text-lg font-semibold text-primary">$99.00</p>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Estimated tax</p>
                  <p className="text-sm font-medium text-foreground">Calculated at checkout</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />

            {/* Terms & Conditions */}
            <div className="rounded-lg bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground">
                By proceeding, you agree to our{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </a>
                . Your subscription will automatically renew each year unless cancelled.
              </p>
            </div>

            {/* Proceed Button */}
            <Button
              size="lg"
              className="w-full rounded-xl text-base font-semibold"
              onClick={handleProceedToPayment}
            >
              <Crown className="mr-2 h-5 w-5" />
              Proceed to Payment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 border-t border-border pt-6">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">🔒</span>
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">✓</span>
                <p className="text-xs text-muted-foreground">Money-back Guarantee</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">📞</span>
                <p className="text-xs text-muted-foreground">24/7 Support</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, you can cancel your Fan-Club membership anytime. If you cancel within 30 days of your purchase, we\'ll provide a full refund.',
                },
                {
                  q: 'When do the free frames get delivered?',
                  a: 'Your 2 free frames are allocated each year and can be used anytime. Simply select "Free Frame" when placing an order.',
                },
                {
                  q: 'How do I use the game ticket credit?',
                  a: 'The $10 monthly credit is applied automatically to eligible Savannah Bananas tickets and merchandise purchases.',
                },
                {
                  q: 'Is there a loyalty program?',
                  a: 'Yes! Fan-Club members earn points on every purchase that can be redeemed for discounts and exclusive items.',
                },
              ].map((faq, index) => (
                <details key={index} className="group rounded-lg border border-border bg-card/50 p-4">
                  <summary className="cursor-pointer font-medium text-foreground transition-colors group-open:text-primary">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-6 text-center sm:p-8">
            <h3 className="text-xl font-bold text-foreground">Ready to upgrade?</h3>
            <p className="mt-2 text-muted-foreground">
              Join thousands of satisfied members and get exclusive benefits today
            </p>
            <Button
              size="lg"
              className="mt-4 rounded-xl"
              onClick={handleProceedToPayment}
            >
              Upgrade to Fan-Club Now
            </Button>
          </section>
        </div>
      </main>
    </div>
  )
}

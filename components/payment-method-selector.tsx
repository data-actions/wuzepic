'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { CreditCard, Smartphone } from 'lucide-react'

export interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, American Express',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Fast and secure payment',
    icon: <span className="text-lg font-bold">ⓟ</span>,
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'Quick checkout with Apple Pay',
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    description: 'Fast checkout with Google Pay',
    icon: <Smartphone className="h-5 w-5" />,
  },
]

interface PaymentMethodSelectorProps {
  selectedMethod?: string
  onMethodChange: (methodId: string) => void
}

export function PaymentMethodSelector({
  selectedMethod = 'credit-card',
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
      <p className="text-sm text-muted-foreground">
        Choose your preferred payment method to complete your purchase
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <div key={method.id}>
            <input
              type="radio"
              id={method.id}
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value)}
              className="peer sr-only"
            />
            <Label
              htmlFor={method.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-muted-foreground/20 bg-card p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
            >
              <div className="flex h-6 w-6 items-center justify-center text-primary">
                {method.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{method.name}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

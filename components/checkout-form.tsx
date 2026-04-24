'use client'

import { useOrder } from '@/lib/order-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { FanClubOption } from '@/components/fan-club-option'
import { Gift, Truck, CreditCard } from 'lucide-react'

export function CheckoutForm() {
  const { order, setShipping, setGiftWrap, setGiftMessage, setFanClubSignup } = useOrder()

  const updateShipping = (field: keyof typeof order.shipping, value: string) => {
    setShipping({ ...order.shipping, [field]: value })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Shipping Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Shipping Details</h2>
            <p className="text-sm text-muted-foreground">Where should we send your frames?</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={order.shipping.fullName}
              onChange={(e) => updateShipping('fullName', e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Street Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street, Apt 4B"
              value={order.shipping.address}
              onChange={(e) => updateShipping('address', e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Input
                id="city"
                placeholder="New York"
                value={order.shipping.city}
                onChange={(e) => updateShipping('city', e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State
              </Label>
              <Input
                id="state"
                placeholder="NY"
                value={order.shipping.state}
                onChange={(e) => updateShipping('state', e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="zipCode" className="text-sm font-medium">
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={order.shipping.zipCode}
                onChange={(e) => updateShipping('zipCode', e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={order.shipping.phone}
                onChange={(e) => updateShipping('phone', e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gift Options Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Gift Options</h2>
            <p className="text-sm text-muted-foreground">Make it special for someone</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Gift Wrapping</span>
              <span className="text-sm text-muted-foreground">
                Beautiful gift packaging (+$5.99)
              </span>
            </div>
            <Switch
              checked={order.giftWrap}
              onCheckedChange={setGiftWrap}
            />
          </div>

          {order.giftWrap && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="giftMessage" className="text-sm font-medium">
                Gift Message (Optional)
              </Label>
              <Textarea
                id="giftMessage"
                placeholder="Write a personal message..."
                value={order.giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
                maxLength={200}
              />
              <span className="text-right text-xs text-muted-foreground">
                {order.giftMessage.length}/200
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Fan-Club Membership Section */}
      <section className="flex flex-col gap-4">
        <FanClubOption 
          isSelected={order.fanClubSignup}
          onToggle={setFanClubSignup}
        />
      </section>

      {/* Payment Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
            <p className="text-sm text-muted-foreground">Secure payment processing</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          {/* Payment options - dummy UI */}
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-primary bg-primary/5 p-4">
              <input type="radio" name="payment" defaultChecked className="hidden" />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-primary">
                <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-foreground">Credit / Debit Card</span>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-border p-4 hover:border-primary/50">
              <input type="radio" name="payment" className="hidden" />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted-foreground/30" />
              <div className="flex-1">
                <span className="font-medium text-foreground">PayPal</span>
                <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-border p-4 hover:border-primary/50">
              <input type="radio" name="payment" className="hidden" />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted-foreground/30" />
              <div className="flex-1">
                <span className="font-medium text-foreground">Apple Pay</span>
                <p className="text-sm text-muted-foreground">Fast and secure checkout</p>
              </div>
            </label>
          </div>

          {/* Card Input - Dummy */}
          <div className="flex flex-col gap-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cvv" className="text-sm font-medium">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

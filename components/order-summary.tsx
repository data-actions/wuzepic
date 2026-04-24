'use client'

import { useOrder, frameOptions } from '@/lib/order-context'
import Image from 'next/image'
import { Package, Gift, Truck, Crown } from 'lucide-react'

export function OrderSummary() {
  const { order, getTotalPrice } = useOrder()
  
  const selectedFrame = frameOptions.find((f) => f.id === order.selectedFrame)
  const subtotal = selectedFrame ? selectedFrame.price * order.photos.length : 0
  const giftWrapCost = order.giftWrap ? 5.99 : 0
  const fanClubCost = order.fanClubSignup ? 99.0 : 0
  const shipping = 0 // Free shipping
  const total = getTotalPrice()

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
        {/* Order Items */}
        {order.photos.length > 0 && selectedFrame && (
          <div className="flex flex-col gap-3">
            {order.photos.map((photo, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="relative h-16 w-16 overflow-hidden rounded-lg"
                  style={{
                    backgroundColor: selectedFrame.color,
                    padding: 4,
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden bg-white">
                    <Image
                      src={photo}
                      alt={`Order item ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {selectedFrame.name} Frame
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Photo {index + 1} of {order.photos.length}
                  </p>
                </div>
                <span className="font-medium text-foreground">
                  ${selectedFrame.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        {order.photos.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Package className="mr-2 h-5 w-5" />
            <span>No items in order</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Cost Breakdown */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>

          {order.giftWrap && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Gift className="h-4 w-4" />
                Gift Wrapping
              </span>
              <span className="text-foreground">${giftWrapCost.toFixed(2)}</span>
            </div>
          )}

          {order.fanClubSignup && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Crown className="h-4 w-4" />
                Fan-Club Membership
              </span>
              <span className="text-foreground">${fanClubCost.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Truck className="h-4 w-4" />
              Shipping
            </span>
            <span className="font-medium text-green-600">Free</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Shipping Info */}
      {order.shipping.fullName && (
        <div className="rounded-xl border border-border bg-muted/50 p-4">
          <p className="text-sm font-medium text-foreground">Shipping to:</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.shipping.fullName}
            <br />
            {order.shipping.address}
            <br />
            {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
          </p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useOrder, frameOptions, type FrameStyle } from '@/lib/order-context'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FrameSelector() {
  const { order, setSelectedFrame } = useOrder()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Choose Frame</h2>
        <p className="text-sm text-muted-foreground">
          Select a frame style for your photos
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {frameOptions.map((frame) => (
          <button
            key={frame.id}
            onClick={() => setSelectedFrame(frame.id)}
            className={cn(
              'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
              order.selectedFrame === frame.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            )}
          >
            {/* Frame Color Preview */}
            <div
              className="h-14 w-14 flex-shrink-0 rounded-lg shadow-sm"
              style={{
                backgroundColor: frame.color,
                border: frame.id === 'elegant-white' ? '1px solid #e5e5e5' : 'none',
              }}
            />

            {/* Frame Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{frame.name}</h3>
                <span className="font-semibold text-primary">
                  ${frame.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{frame.description}</p>
            </div>

            {/* Selection Indicator */}
            <div
              className={cn(
                'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all',
                order.selectedFrame === frame.id
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/30'
              )}
            >
              {order.selectedFrame === frame.id && (
                <Check className="h-4 w-4 text-primary-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

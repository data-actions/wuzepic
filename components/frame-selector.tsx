'use client'

import { useOrder, frameOptions, frameSizeOptions, type FrameStyle } from '@/lib/order-context'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FrameSelector() {
  const { order, setSelectedFrameSize, setSelectedFrame } = useOrder()

  // Group frames by category
  const standardFrames = frameOptions.filter((f) => f.category === 'Standard')
  const premiumFrames = frameOptions.filter((f) => f.category === 'Premium')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Choose Frame</h2>
        <p className="text-sm text-muted-foreground">
          Select a frame size and style for your photos
        </p>
      </div>

      {/* Frame Size Selection */}
      <div className="flex flex-col gap-3">
        <Label className="text-base font-semibold text-foreground">Frame Size</Label>
        <div className="grid grid-cols-3 gap-3">
          {frameSizeOptions.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedFrameSize(size.id)}
              className={cn(
                'flex flex-col items-center rounded-lg border-2 p-3 text-center transition-all',
                order.selectedFrameSize === size.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/50'
              )}
            >
              <span className="font-semibold text-foreground">{size.name}</span>
              <span className="text-xs text-muted-foreground">{size.dimensions}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Frame Color Selection */}
      <div className="flex flex-col gap-4">
        <Label className="text-base font-semibold text-foreground">Frame Color</Label>

        {/* Standard Frames */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Standard - $29.99
          </span>
          <div className="flex flex-col gap-2">
            {standardFrames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all',
                  order.selectedFrame === frame.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                {/* Frame Color Preview */}
                <div
                  className="h-10 w-10 flex-shrink-0 rounded-md shadow-sm"
                  style={{
                    backgroundColor: frame.color,
                    border: frame.id === 'elegant-white' ? '1px solid #e5e5e5' : 'none',
                  }}
                />

                {/* Frame Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{frame.name}</h3>
                </div>

                {/* Selection Indicator */}
                <div
                  className={cn(
                    'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all',
                    order.selectedFrame === frame.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30'
                  )}
                >
                  {order.selectedFrame === frame.id && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Frames */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Premium - $49.99
          </span>
          <div className="flex flex-col gap-2">
            {premiumFrames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all',
                  order.selectedFrame === frame.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                {/* Frame Color Preview */}
                <div
                  className="h-10 w-10 flex-shrink-0 rounded-md shadow-sm"
                  style={{
                    backgroundColor: frame.color,
                  }}
                />

                {/* Frame Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{frame.name}</h3>
                </div>

                {/* Selection Indicator */}
                <div
                  className={cn(
                    'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all',
                    order.selectedFrame === frame.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30'
                  )}
                >
                  {order.selectedFrame === frame.id && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className="text-sm font-medium">
      {children}
    </label>
  )
}

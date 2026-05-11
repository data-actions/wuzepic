'use client'

import { useOrder, frameOptions } from '@/lib/order-context'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { format } from 'date-fns'

const BANANA_BALL_LOGO = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBallStillFrame_01-uOaswpUYKRo4SI4LnJp1Nyd36VnuuI.png'

export function FramePreview() {
  const { order } = useOrder()
  
  const selectedFrame = frameOptions.find((f) => f.id === order.selectedFrame)
  const frameColor = selectedFrame?.color || '#e5e5e5'
  const borderWidth = selectedFrame?.borderWidth || 16

  if (order.photos.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
        <div className="flex aspect-square flex-col items-center justify-center rounded-xl bg-muted/50">
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            Upload photos to see preview
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
        {selectedFrame && (
          <span className="text-sm text-muted-foreground">
            {selectedFrame.name}
          </span>
        )}
      </div>

      {/* Single photo layout - no grid */}
      {order.photos.map((photo, index) => (
          <div
            key={index}
            className="relative mx-auto w-full max-w-[280px]"
          >
            {/* Outer Frame */}
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl transition-all duration-300"
              style={{
                backgroundColor: frameColor,
                padding: borderWidth,
                boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -2px rgba(0, 0, 0, 0.1),
                  inset 0 2px 4px rgba(255, 255, 255, 0.1),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                `,
              }}
            >
              {/* Inner Mat Container */}
              <div
                className="relative h-full w-full overflow-hidden bg-white flex flex-col"
                style={{
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.15)',
                  padding: '8px 8px 0px 8px',
                }}
              >
                {/* Photo Area with thin mat on all sides */}
                <div className="relative flex-1 overflow-hidden bg-white" style={{ flexGrow: 20 }}>
                  <Image
                    src={photo}
                    alt={`Framed photo ${index + 1}`}
                    fill
                    className="object-cover"
                    style={{
                      transform: `scale(${order.photoScale})`,
                      transformOrigin: 'center',
                    }}
                  />
                </div>

                {/* Mat Bottom Section with Logo and Text - Using CSS Grid */}
                <div 
                  className="grid auto-cols-fr items-center gap-1 bg-white px-2 py-1 flex-shrink-0"
                  style={{
                    gridTemplateColumns: '1fr auto 1fr',
                  }}
                >
                  {/* Left Text - Now Date */}
                  <span className="text-left text-[7px] font-semibold text-foreground leading-tight line-clamp-2">
                    {order.selectedDate ? format(order.selectedDate, "do MMMM yyyy") : ''}
                  </span>

                  {/* Logo - Always centered */}
                  <div className="relative h-15 w-15 flex-shrink-0 overflow-hidden">
                    <Image
                      src={BANANA_BALL_LOGO}
                      alt="Banana Ball logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Right Text */}
                  <span className="text-right text-[7px] font-semibold text-foreground leading-tight line-clamp-2">
                    {order.textRight || ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {!selectedFrame && (
        <p className="text-center text-sm text-muted-foreground">
          Select a frame style to see the final look
        </p>
      )}
    </div>
  )
}

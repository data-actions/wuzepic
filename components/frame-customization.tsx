'use client'

import { useRef } from 'react'
import { useOrder } from '@/lib/order-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Type } from 'lucide-react'
import Image from 'next/image'

const BANANA_BALL_LOGO = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBallStillFrame_01-uOaswpUYKRo4SI4LnJp1Nyd36VnuuI.png'
const MAX_TEXT_LENGTH = 30

export function FrameCustomization() {
  const { order, setTextLeft, setTextRight } = useOrder()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Customize Your Frame</h2>
        <p className="text-sm text-muted-foreground">
          Add optional text messages to personalize your frame mat
        </p>
      </div>

      {/* Logo Preview Section */}
      <div className="flex flex-col gap-3">
        <Label className="text-base font-semibold text-foreground">Frame Logo</Label>
        <div className="relative h-24 w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={BANANA_BALL_LOGO}
            alt="Banana Ball logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Your frame will feature the iconic Banana Ball logo
        </p>
      </div>

      {/* Text Messages Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" />
          <Label className="text-base font-semibold text-foreground">Text Messages (Optional)</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Add optional text on either side of the logo on the frame mat
        </p>
      </div>

      {/* Left Text Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="text-left" className="text-sm font-medium">
          Left Text
          {order.textLeft.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {order.textLeft.length}/{MAX_TEXT_LENGTH}
            </span>
          )}
        </Label>
        <Input
          id="text-left"
          placeholder="e.g., Player Name"
          value={order.textLeft}
          onChange={(e) => {
            const text = e.target.value.slice(0, MAX_TEXT_LENGTH)
            setTextLeft(text)
          }}
          maxLength={MAX_TEXT_LENGTH}
          className="rounded-lg"
        />
      </div>

      {/* Right Text Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="text-right" className="text-sm font-medium">
          Right Text
          {order.textRight.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {order.textRight.length}/{MAX_TEXT_LENGTH}
            </span>
          )}
        </Label>
        <Input
          id="text-right"
          placeholder="e.g., 2024"
          value={order.textRight}
          onChange={(e) => {
            const text = e.target.value.slice(0, MAX_TEXT_LENGTH)
            setTextRight(text)
          }}
          maxLength={MAX_TEXT_LENGTH}
          className="rounded-lg"
        />
      </div>

      {/* Preview of Mat Customization */}
      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Mat Preview</p>
        <div className="flex items-center justify-between rounded-lg bg-background px-6 py-8">
          <span className="flex-1 text-left text-sm font-semibold text-foreground leading-relaxed line-clamp-2">
            {order.textLeft || '—'}
          </span>
          <div className="relative h-14 w-14 flex-shrink-0 mx-3 overflow-hidden">
            <Image
              src={BANANA_BALL_LOGO}
              alt="Banana Ball logo preview"
              fill
              className="object-contain"
            />
          </div>
          <span className="flex-1 text-right text-sm font-semibold text-foreground leading-relaxed line-clamp-2">
            {order.textRight || '—'}
          </span>
        </div>
      </div>
    </div>
  )
}

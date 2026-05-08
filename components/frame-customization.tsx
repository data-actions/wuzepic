'use client'

import { useState } from 'react'
import { useOrder } from '@/lib/order-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Type, ZoomIn, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import Image from 'next/image'

const BANANA_BALL_LOGO = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBallStillFrame_01-uOaswpUYKRo4SI4LnJp1Nyd36VnuuI.png'
const MAX_TEXT_LENGTH = 30

export function FrameCustomization() {
  const { order, setSelectedDate, setTextRight, setPhotoScale } = useOrder()
  const [isDateOpen, setIsDateOpen] = useState(false)

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
        <Label className="text-base font-semibold text-foreground">Image Resizing</Label>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Adjust the photo size to fit better in your frame while maintaining aspect ratio
          </p>
          {order.photos.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <ZoomIn className="h-5 w-5 text-primary flex-shrink-0" />
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={order.photoScale}
                  onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-semibold text-foreground w-12 text-right">
                  {Math.round(order.photoScale * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50% (Zoomed out)</span>
                <span>150% (Zoomed in)</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Upload a photo to enable resizing
            </p>
          )}
        </div>
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

      {/* Date Picker */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">
          Date on Frame
        </Label>
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal rounded-lg"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {order.selectedDate
                ? format(order.selectedDate, "do MMMM yyyy")
                : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={order.selectedDate || undefined}
              onSelect={(date) => {
                setSelectedDate(date || null)
                setIsDateOpen(false)
              }}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Caption Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="text-right" className="text-sm font-medium">
          Caption
          {order.textRight.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {order.textRight.length}/{MAX_TEXT_LENGTH}
            </span>
          )}
        </Label>
        <Input
          id="text-right"
          placeholder="e.g., My First Game"
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
        <p className="mb-3 text-sm font-medium text-foreground">Matte Preview</p>
        <div 
          className="grid items-center rounded-lg bg-background px-6 py-8"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
          }}
        >
          <span className="text-left text-sm font-semibold text-foreground leading-relaxed line-clamp-2">
            {order.selectedDate ? format(order.selectedDate, "do MMMM yyyy") : '—'}
          </span>
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden">
            <Image
              src={BANANA_BALL_LOGO}
              alt="Banana Ball logo preview"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-right text-sm font-semibold text-foreground leading-relaxed line-clamp-2">
            {order.textRight || '—'}
          </span>
        </div>
      </div>
    </div>
  )
}

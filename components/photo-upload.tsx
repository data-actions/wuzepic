'use client'

import { useCallback, useRef } from 'react'
import { useOrder } from '@/lib/order-context'
import { ImagePlus, X, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'

export function PhotoUpload() {
  const { order, setPhoto } = useOrder()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload only image files')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPhoto(result)
        toast.success('Photo uploaded successfully')
      }
      reader.readAsDataURL(file)

      // Reset input so same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [setPhoto]
  )

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Your Photo</h2>
          <p className="text-sm text-muted-foreground">
            Select one photo to frame
          </p>
        </div>
        {order.photo && (
          <span className="text-sm font-medium text-primary">
            Photo selected
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Photo Preview */}
      {order.photo ? (
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={order.photo}
            alt="Selected photo"
            fill
            className="object-cover"
          />
          <button
            onClick={() => setPhoto(null)}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background transition-colors hover:bg-foreground"
            aria-label="Remove photo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleUploadClick}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary bg-muted/30 transition-colors hover:border-secondary hover:bg-muted/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Click to Upload Photo
          </span>
        </button>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUploadClick}
        className="h-12 w-full rounded-xl"
      >
        <ImagePlus className="mr-2 h-5 w-5" />
        {order.photo ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </div>
  )
}

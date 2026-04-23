'use client'

import { useOrder } from '@/lib/order-context'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const officialPhotos = [
  { id: 1, src: '/official-photos/gaming-arena-1.jpg', label: 'Gaming Arena' },
  { id: 2, src: '/official-photos/gaming-arena-2.jpg', label: 'Tournament Stage' },
  { id: 3, src: '/official-photos/gaming-character-1.jpg', label: 'Fantasy Warrior' },
  { id: 4, src: '/official-photos/gaming-character-2.jpg', label: 'Cyberpunk Hero' },
  { id: 5, src: '/official-photos/gaming-moment-1.jpg', label: 'Action Scene' },
  { id: 6, src: '/official-photos/gaming-moment-2.jpg', label: 'Epic Battle' },
  { id: 7, src: '/official-photos/gaming-setup-1.jpg', label: 'Pro Setup' },
  { id: 8, src: '/official-photos/gaming-world-1.jpg', label: 'Fantasy World' },
]

export function OfficialPhotosGallery() {
  const { order, setPhoto } = useOrder()

  const handleSelectPhoto = (photoSrc: string) => {
    setPhoto(photoSrc)
    toast.success('Photo selected')
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    toast.success('Photo removed')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Official Game Photos</h2>
          <p className="text-sm text-muted-foreground">
            Select one official image for your frame
          </p>
        </div>
        {order.photo && (
          <span className="text-sm font-medium text-primary">
            Photo selected
          </span>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3">
        {officialPhotos.map((photo) => {
          const isSelected = order.photo === photo.src
          return (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-xl bg-muted group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover transition-opacity group-hover:opacity-75"
              />
              
              {/* Selection Overlay */}
              <div
                className={`absolute inset-0 transition-all ${
                  isSelected ? 'bg-primary/40' : 'group-hover:bg-black/20'
                }`}
              />

              {/* Checkbox for Selection */}
              <div className="absolute right-3 top-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() =>
                    isSelected
                      ? handleRemovePhoto()
                      : handleSelectPhoto(photo.src)
                  }
                  className="h-5 w-5 cursor-pointer border-2 border-white bg-transparent"
                  aria-label={isSelected ? 'Remove photo' : 'Select photo'}
                />
              </div>

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-xs font-medium text-white">{photo.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {order.photo && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Selected Photo:</p>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <Image
              src={order.photo}
              alt="Selected official photo"
              fill
              className="object-cover"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleRemovePhoto}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" />
            Change Selection
          </Button>
        </div>
      )}
    </div>
  )
}

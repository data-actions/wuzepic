'use client'

import { useOrder } from '@/lib/order-context'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const officialPhotos = [
  { id: 1, src: '/official-photos/img-1.jpg' },
  { id: 2, src: '/official-photos/img-2.jpg' },
  { id: 3, src: '/official-photos/img-3.jpg' },
  { id: 4, src: '/official-photos/img-4.jpg' },
]

export function OfficialPhotosGallery() {
  const { order, addPhoto, removePhoto } = useOrder()

  const handleSelectPhoto = (photoSrc: string) => {
    addPhoto(photoSrc)
    toast.success('Photo selected')
  }

  const handleRemovePhoto = (photoToRemove: string) => {
    const index = order.photos.indexOf(photoToRemove)
    if (index > -1) {
      removePhoto(index)
      toast.success('Photo removed')
    }
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
        {order.photos.length > 0 && (
          <span className="text-sm font-medium text-primary">
            Photo selected
          </span>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3">
        {officialPhotos.map((photo) => {
          const isSelected = order.photos.includes(photo.src)
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
                      ? handleRemovePhoto(photo.src)
                      : handleSelectPhoto(photo.src)
                  }
                  className="h-5 w-5 cursor-pointer border-2 border-white bg-transparent"
                  aria-label={isSelected ? 'Remove photo' : 'Select photo'}
                />
              </div>
            </div>
          )
        })}
      </div>

      {order.photos.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Selected Photo:</p>
          <div className="grid gap-2 grid-cols-1">
            {order.photos.map((photo, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg bg-muted group">
                <Image
                  src={photo}
                  alt="Selected official photo"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => {
                    const index = order.photos.indexOf(photo)
                    if (index > -1) removePhoto(index)
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

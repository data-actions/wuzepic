'use client'

import { useOrder, type PhotoSource } from '@/lib/order-context'
import { Button } from '@/components/ui/button'
import { Upload, Image as ImageIcon } from 'lucide-react'

export function PhotoSourceSelector() {
  const { order, setPhotoSource, setPhotos } = useOrder()

  const handleSourceChange = (source: PhotoSource) => {
    setPhotoSource(source)
    // Clear existing photos when switching sources
    setPhotos([])
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Choose Photo Source</h2>
        <p className="text-sm text-muted-foreground">
          Select where your photos will come from
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Your Photos Option */}
        <Button
          variant={order.photoSource === 'personal' ? 'default' : 'outline'}
          onClick={() => handleSourceChange('personal')}
          className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl"
        >
          <Upload className="h-6 w-6" />
          <span className="text-sm font-medium">Your Photos</span>
        </Button>

        {/* Official Photos Option */}
        <Button
          variant={order.photoSource === 'official' ? 'default' : 'outline'}
          onClick={() => handleSourceChange('official')}
          className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl"
        >
          <ImageIcon className="h-6 w-6" />
          <span className="text-sm font-medium">Official Photos</span>
        </Button>
      </div>
    </div>
  )
}

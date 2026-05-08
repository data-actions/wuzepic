'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrder, frameOptions } from '@/lib/order-context'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/step-indicator'
import { PhotoSourceSelector } from '@/components/photo-source-selector'
import { PhotoUpload } from '@/components/photo-upload'
import { OfficialPhotosGallery } from '@/components/official-photos-gallery'
import { FrameCustomization } from '@/components/frame-customization'
import { FrameSelector } from '@/components/frame-selector'
import { FramePreview } from '@/components/frame-preview'
import { CheckoutForm } from '@/components/checkout-form'
import { OrderSummary } from '@/components/order-summary'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const steps = [
  { id: 1, name: 'Photos' },
  { id: 2, name: 'Customize' },
  { id: 3, name: 'Frame' },
  { id: 4, name: 'Checkout' },
]

export default function AppPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { order, resetOrder, getTotalPrice } = useOrder()
  const router = useRouter()

  const canProceedFromStep1 = order.photos.length > 0
  const canProceedFromStep2 = true // Logo is now fixed, no upload needed
  const canProceedFromStep3 = order.selectedFrame !== null && order.selectedFrameSize !== null
  const canProceedFromStep4 = 
    order.shipping.fullName.trim() !== '' &&
    order.shipping.address.trim() !== '' &&
    order.shipping.city.trim() !== '' &&
    order.shipping.state.trim() !== '' &&
    order.shipping.zipCode.trim() !== ''

  const handleNext = () => {
    if (currentStep === 1 && !canProceedFromStep1) {
      toast.error('Please select a photo source and upload at least one photo')
      return
    }
    if (currentStep === 3 && !canProceedFromStep3) {
      toast.error('Please select a frame style')
      return
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitOrder = async () => {
    if (!canProceedFromStep3) {
      toast.error('Please fill in all shipping details')
      return
    }

    setIsSubmitting(true)
    
    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    toast.success('Order placed successfully!')
    resetOrder()
    router.push('/app/success')
  }

  const selectedFrame = frameOptions.find((f) => f.id === order.selectedFrame)

  return (
    <main className="flex flex-1 flex-col">
      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="mx-auto w-full max-w-lg flex-1 px-4 pb-32">
        {currentStep === 1 && (
          <div className="flex flex-col gap-6">
            <PhotoSourceSelector />
            {order.photoSource === 'personal' && <PhotoUpload />}
            {order.photoSource === 'official' && <OfficialPhotosGallery />}
            {order.photos.length > 0 && <FramePreview />}
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col gap-6">
            <FramePreview />
            <FrameCustomization />
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-6">
            <FramePreview />
            <FrameSelector />
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex flex-col gap-6">
            <OrderSummary />
            <CheckoutForm />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4 p-4">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="h-12 flex-1 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div className="flex-1" />
          )}

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="h-12 flex-1 rounded-xl font-semibold"
              disabled={
                (currentStep === 1 && !canProceedFromStep1) ||
                (currentStep === 2 && !canProceedFromStep2) ||
                (currentStep === 3 && !canProceedFromStep3)
              }
            >
              {currentStep === 3 && order.selectedFrameSize && order.selectedFrame && (
                <span className="mr-2">${getTotalPrice().toFixed(2)}</span>
              )}
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmitOrder}
              className="h-12 flex-1 rounded-xl font-semibold"
              disabled={!canProceedFromStep4 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Place Order - ${getTotalPrice().toFixed(2)}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}

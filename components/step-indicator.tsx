'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: number
  name: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
              currentStep > step.id
                ? 'bg-primary text-primary-foreground'
                : currentStep === step.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
            )}
          >
            {currentStep > step.id ? (
              <Check className="h-4 w-4" />
            ) : (
              step.id
            )}
          </div>

          {/* Step Label - visible on larger screens */}
          <span
            className={cn(
              'ml-2 hidden text-sm font-medium sm:block',
              currentStep >= step.id
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {step.name}
          </span>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'mx-2 h-0.5 w-8 sm:w-12',
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

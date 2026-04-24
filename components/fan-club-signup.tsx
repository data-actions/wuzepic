'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { FanClubBenefits } from '@/components/fan-club-benefits'

interface FanClubSignupProps {
  isSelected: boolean
  onToggle: (selected: boolean) => void
}

export function FanClubSignup({ isSelected, onToggle }: FanClubSignupProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
        <div className="mb-4 flex items-start gap-3">
          <Checkbox
            id="fan-club"
            checked={isSelected}
            onCheckedChange={(checked) => onToggle(checked === true)}
            className="mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor="fan-club"
              className="cursor-pointer text-base font-semibold text-foreground"
            >
              Join the Fan-Club
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Unlock exclusive benefits and support the Savannah Bananas
            </p>
            <div className="mt-2 inline-flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">$99</span>
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Plus applicable taxes. Billed annually.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <FanClubBenefits />
    </div>
  )
}

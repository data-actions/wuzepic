'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

interface FanClubOptionProps {
  isSelected: boolean
  onToggle: (selected: boolean) => void
}

export function FanClubOption({ isSelected, onToggle }: FanClubOptionProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Checkbox
          id="fan-club-checkout"
          checked={isSelected}
          onCheckedChange={(checked) => onToggle(checked === true)}
          className="mt-1"
        />
        <div className="flex-1">
          <label
            htmlFor="fan-club-checkout"
            className="cursor-pointer font-semibold text-foreground"
          >
            Add Fan-Club Membership
          </label>
          <p className="mt-1 text-sm text-muted-foreground">
            Join the Fan-Club and enjoy exclusive benefits
          </p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• 2 free photo frames each year</li>
            <li>• 5% discount on all purchases</li>
            <li>• $10 monthly credit for game tickets</li>
            <li>• Early access to special offers</li>
          </ul>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-lg font-bold text-primary">$99</div>
          <div className="text-xs text-muted-foreground">/year</div>
        </div>
      </div>
    </Card>
  )
}

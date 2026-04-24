import { Heart, Percent, Ticket, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Heart,
    title: '2 Free Photo Frames',
    description: 'Receive 2 free photo frames each year',
  },
  {
    icon: Percent,
    title: '5% Discount',
    description: '5% discount on all WuzEpic purchases',
  },
  {
    icon: Ticket,
    title: 'Game Ticket Credit',
    description: 'Flat $10 off Savannah Bananas game tickets/merchandise monthly',
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Early access to special offers and new products',
  },
]

export function FanClubBenefits() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {benefits.map((benefit) => {
        const Icon = benefit.icon
        return (
          <div
            key={benefit.title}
            className="flex gap-3 rounded-lg border border-border/50 bg-muted/30 p-3"
          >
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {benefit.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

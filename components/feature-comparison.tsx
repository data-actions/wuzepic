'use client'

import { Check, X } from 'lucide-react'

interface Feature {
  name: string
  standard: boolean | string
  fanClub: boolean | string
}

const FEATURES: Feature[] = [
  {
    name: 'Photo Frames Per Order',
    standard: 'Up to 2',
    fanClub: 'Up to 2',
  },
  {
    name: 'Frame Styles Available',
    standard: '5 Premium Styles',
    fanClub: '5 Premium Styles',
  },
  {
    name: 'Customization Options',
    standard: 'Text + Scale',
    fanClub: 'Text + Scale',
  },
  {
    name: 'Free Frames Per Year',
    standard: false,
    fanClub: 'Up to 2',
  },
  {
    name: 'Discount on Purchases',
    standard: false,
    fanClub: '5% Off Everything',
  },
  {
    name: 'Monthly Game Ticket Credit',
    standard: false,
    fanClub: '$10/Month',
  },
  {
    name: 'Early Access to New Styles',
    standard: false,
    fanClub: true,
  },
  {
    name: 'VIP Customer Support',
    standard: false,
    fanClub: true,
  },
  {
    name: 'Exclusive Member Events',
    standard: false,
    fanClub: true,
  },
  {
    name: 'Birthday Gift Bonus',
    standard: false,
    fanClub: '10% Discount',
  },
]

export function FeatureComparison() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">What's Included</h2>
        <p className="mt-2 text-muted-foreground">
          Compare standard and Fan-Club membership benefits
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground">Standard</th>
              <th className="px-4 py-3 text-center font-semibold text-primary">Fan-Club</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature, index) => (
              <tr
                key={index}
                className={`border-b border-border/50 ${
                  index % 2 === 0 ? 'bg-muted/20' : 'bg-transparent'
                }`}
              >
                <td className="px-4 py-4 text-foreground">{feature.name}</td>
                <td className="px-4 py-4 text-center">
                  {typeof feature.standard === 'boolean' ? (
                    feature.standard ? (
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{feature.standard}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  {typeof feature.fanClub === 'boolean' ? (
                    feature.fanClub ? (
                      <Check className="mx-auto h-5 w-5 text-primary" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-primary">{feature.fanClub}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

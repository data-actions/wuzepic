'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-[4px] border-2 transition-all outline-none',
        // Unchecked state - enhanced visibility
        'border-muted-foreground/40 bg-card hover:border-muted-foreground/60',
        // Checked state
        'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
        // Focus state
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-primary',
        // Disabled state - more visible
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-muted disabled:border-muted-foreground/20',
        // Dark mode enhancements
        'dark:border-muted-foreground/50 dark:bg-card dark:hover:border-muted-foreground/70',
        'dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary',
        'dark:disabled:bg-muted/50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

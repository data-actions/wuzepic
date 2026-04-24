'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-all outline-none',
        // Unchecked state - enhanced visibility
        'border-muted-foreground/40 bg-muted/30 hover:border-muted-foreground/60 hover:bg-muted/40',
        // Checked state
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        // Focus state
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        // Disabled state - more visible
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:border-muted-foreground/20 disabled:bg-muted/50',
        // Dark mode
        'dark:border-muted-foreground/50 dark:bg-muted/40 dark:hover:border-muted-foreground/70',
        'dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary',
        'dark:disabled:bg-muted/30',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block size-5 rounded-full transition-transform ring-0 shadow-sm',
          // Unchecked state
          'bg-background dark:bg-muted-foreground',
          // Checked state
          'data-[state=checked]:bg-primary-foreground dark:data-[state=checked]:bg-primary-foreground',
          // Position
          'data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

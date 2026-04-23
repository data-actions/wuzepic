import { OrderProvider } from '@/lib/order-context'
import { createClient } from '@/lib/supabase/server'
import { AppHeader } from '@/components/app-header'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <OrderProvider>
      <div className="flex min-h-svh flex-col bg-background">
        <AppHeader userEmail={user?.email} />
        {children}
      </div>
    </OrderProvider>
  )
}

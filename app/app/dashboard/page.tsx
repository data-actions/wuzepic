'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/lib/order-context'
import { Crown, ArrowRight, Package, Calendar, DollarSign, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  email: string
  first_name?: string
  last_name?: string
  fan_club_member?: boolean
  created_at?: string
}

interface Order {
  id: string
  created_at: string
  status: string
  total: number
  frame_style?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { resetOrder } = useOrder()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login')
        return
      }

      // Get user email from session
      const userEmail = session.user.email
      const firstName = session.user.user_metadata?.first_name || userEmail?.split('@')[0] || 'User'

      setUser({
        email: userEmail || '',
        first_name: firstName,
        fan_club_member: session.user.user_metadata?.fan_club_member || false,
      })

      // In a real app, you'd fetch orders from the database
      // For now, we'll show sample orders
      setOrders([
        {
          id: '1',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          total: 89.99,
          frame_style: 'Classic Wood',
        },
        {
          id: '2',
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          total: 79.99,
          frame_style: 'Modern Black',
        },
        {
          id: '3',
          created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          total: 99.99,
          frame_style: 'Premium Gold',
        },
      ])

      setLoading(false)
    }

    checkAuth()
  }, [router, supabase.auth])

  const handleStartFraming = () => {
    resetOrder()
    router.push('/app')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Greeting Section */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back, {user?.first_name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Create beautiful photo frames and memories that last a lifetime
          </p>
        </div>

        {/* Start Framing CTA */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Ready to create?</h2>
              <p className="mt-2 text-muted-foreground">
                Start designing your next photo frame with WuzEpic
              </p>
            </div>
            <Button
              onClick={handleStartFraming}
              className="h-12 rounded-xl px-8 text-base font-semibold whitespace-nowrap"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Framing
            </Button>
          </div>
        </div>

        {/* Fan-Club Status Section */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {user?.fan_club_member ? (
            <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Crown className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Fan-Club Member</h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Enjoy exclusive benefits as a valued Fan-Club member
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span>
                  <span>2 free photo frames annually</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span>
                  <span>5% discount on all purchases</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span>
                  <span>$10 monthly game ticket credit</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span>
                  <span>Early access to special offers</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Crown className="h-6 w-6 text-muted-foreground/60" />
                    <h3 className="text-xl font-bold text-foreground">Join Fan-Club</h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Unlock exclusive perks and save on every purchase
                  </p>
                </div>
              </div>
              <Link href="/app/checkout" className="inline-block">
                <Button variant="outline" className="rounded-xl">
                  Upgrade to Fan-Club
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* Quick Stats */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Your Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  Total Orders
                </div>
                <span className="text-lg font-bold text-foreground">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Total Spent
                </div>
                <span className="text-lg font-bold text-foreground">
                  ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </div>
                <span className="text-sm font-medium text-foreground">
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Order History</h2>

          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                You haven't placed any orders yet. Start creating beautiful frames!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 md:flex-row md:items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {order.frame_style || 'Photo Frame'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Order {order.id} • {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <p className="font-bold text-foreground">${order.total.toFixed(2)}</p>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

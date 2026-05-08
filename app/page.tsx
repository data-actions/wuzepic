import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Upload, Image as ImageIcon, Package, ArrowRight, Star, Palette } from 'lucide-react'

const frames = [
  { color: '#1a1a1a', name: 'Classic Black' },
  { color: '#c4a574', name: 'Natural Oak' },
  { color: '#f5f5f5', name: 'Elegant White', border: true },
  { color: '#d4af37', name: 'Vintage Gold' },
  { color: '#5d432c', name: 'Modern Walnut' },
]

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The quality exceeded my expectations. My photos look stunning!',
    rating: 5,
  },
  {
    name: 'James K.',
    text: 'Super easy to use and the frames arrived perfectly packaged.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    text: 'Beautiful frames at great prices. Already ordered my third one!',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <div className="flex items-center">
            <Image 
              src="/white background logo.jpg" 
              alt="WuzEpic" 
              width={64} 
              height={32}
              className="h-8 w-16 rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="px-4 py-12">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Turn Your Memories Into Beautiful Framed Art
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Upload your favorite photos, choose from premium frame styles, and receive stunning framed prints delivered to your door.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button size="lg" asChild className="h-14 rounded-xl text-base font-semibold">
                <Link href="/auth/sign-up">
                  Start Framing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Free shipping on all orders
              </p>
            </div>
          </div>

          {/* Frame Preview */}
          <div className="mx-auto mt-12 max-w-sm">
            <div className="relative mx-auto w-64">
              <div
                className="aspect-[4/5] rounded-sm shadow-2xl"
                style={{
                  backgroundColor: '#c4a574',
                  padding: 20,
                }}
              >
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100"
                  style={{ boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.15)' }}
                >
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-amber-600/50" />
                    <p className="mt-2 text-sm text-amber-700/70">Your photo here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-border bg-muted/30 px-4 py-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-center text-2xl font-bold text-foreground">
              How It Works
            </h2>
            <div className="mt-8 flex flex-col gap-6">
              {[
                {
                  icon: Upload,
                  title: 'Upload Photos',
                  description: 'Choose up to 2 of your favorite photos',
                },
                {
                  icon: Palette,
                  title: 'Pick Your Frame',
                  description: 'Select from 5 premium frame styles',
                },
                {
                  icon: Package,
                  title: 'We Deliver',
                  description: 'Receive beautifully framed art at your door',
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frame Options */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Premium Frame Styles
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Handcrafted with quality materials
            </p>
            <div className="mt-8 flex justify-center gap-3">
              {frames.map((frame, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="h-14 w-14 rounded-lg shadow-md transition-transform hover:scale-105"
                    style={{
                      backgroundColor: frame.color,
                      border: frame.border ? '1px solid #e5e5e5' : 'none',
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{frame.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-border bg-muted/30 px-4 py-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Loved by Customers
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-foreground">{testimonial.text}</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to Frame Your Memories?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Join thousands of happy customers
            </p>
            <Button size="lg" asChild className="mt-6 h-14 rounded-xl text-base font-semibold">
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-center">
            <Image 
              src="/white background logo.jpg" 
              alt="WuzEpic" 
              width={48} 
              height={24}
              className="h-6 w-12 rounded-md object-cover"
            />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            2024 WuzEpic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

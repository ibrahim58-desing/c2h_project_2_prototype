import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { companyInfo } from '../data/site'
import { ProductCard } from '../components/ui/ProductCard'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { MaterialMarquee } from '../components/ui/MaterialMarquee'
import { useLenisScroll } from '../hooks/useLenisScroll'
import { useMouseInteraction } from '../hooks/useMouseInteraction'
import { plantationImages } from '../data/visuals'

const ExperienceCanvas = lazy(() =>
  import('../components/canvas/ExperienceCanvas').then((m) => ({ default: m.ExperienceCanvas })),
)

export function HomePage() {
  useLenisScroll(true)
  useMouseInteraction()

  const featured = products.slice(0, 3)

  return (
    <div className="relative">
      {/* 3D background — fixed for full page scroll including footer */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense
          fallback={
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${plantationImages.main})` }}
            />
          }
        >
          <ExperienceCanvas className="h-full w-full" />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/45 to-charcoal/82" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(154,132,104,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="flex min-h-[92vh] flex-col justify-end px-6 pb-24 pt-32 md:justify-center md:px-10 md:pb-16 md:pt-40">
          <div className="mx-auto w-full max-w-7xl">
            <ScrollReveal>
              <p className="section-label mb-4">Natural Fiber Craft</p>
              <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-cream md:text-7xl lg:text-8xl">
                Handcrafted from banana fiber, shaped by artisan hands
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60">
                {companyInfo.name} transforms agricultural waste into durable, beautiful objects —
                baskets, textiles, and home pieces with the texture and warmth of natural materials.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary">
                  Shop Collection
                </Link>
                <Link to="/about" className="btn-outline">
                  Our Story
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={320} className="mt-20">
              <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3 md:max-w-lg md:gap-6">
                {[
                  { value: '128+', label: 'Artisans' },
                  { value: '15.6t', label: 'Waste diverted' },
                  { value: '100%', label: 'Natural fiber' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-[family-name:var(--font-display)] text-2xl text-fiber-light md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] tracking-wider text-cream/40 uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <MaterialMarquee />

        {/* Featured */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-label mb-2">Featured</p>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-cream md:text-5xl">
                    Selected pieces
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="text-xs tracking-wider text-fiber uppercase transition-colors hover:text-fiber-light"
                >
                  View all products →
                </Link>
              </div>
            </ScrollReveal>
            <div className="product-grid">
              {featured.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 100}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <p className="section-label mb-2">The Process</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-cream md:text-4xl">
                From plantation to product
              </h2>
            </ScrollReveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Harvest',
                  text: 'After fruit is collected, pseudostems are stripped and prepared — material that would otherwise decompose unused.',
                },
                {
                  step: '02',
                  title: 'Extract & Dry',
                  text: 'Fibers are pulled by hand, sun-dried, and sorted by length and strength before entering the workshop.',
                },
                {
                  step: '03',
                  title: 'Weave & Finish',
                  text: 'Artisans weave, press, or braid each piece. Natural oils and plant-based coatings protect without synthetic plastics.',
                },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 120}>
                  <div className="glass-panel h-full p-8 transition-all duration-500 hover:border-fiber/20 hover:bg-white/[0.04]">
                    <span className="section-label">{item.step}</span>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/50">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="px-6 py-20 md:px-10">
          <ScrollReveal>
            <blockquote className="mx-auto max-w-3xl border-l-2 border-fiber/40 pl-8">
              <p className="font-[family-name:var(--font-display)] text-2xl leading-relaxed text-cream/80 md:text-3xl">
                "Every strand carries the memory of the land it came from — the rain, the soil, the
                hands that pulled it."
              </p>
              <footer className="mt-6 text-sm text-cream/40">— Maria Santos, Master Weaver</footer>
            </blockquote>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="px-6 pb-8 md:px-10">
          <ScrollReveal>
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border border-white/10 bg-white/[0.03] p-10 backdrop-blur-md md:flex-row md:items-center md:p-14">
              <div>
                <p className="section-label mb-2">Explore</p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-cream md:text-4xl">
                  Discover our full collection
                </h2>
                <p className="mt-3 max-w-md text-sm text-cream/50">
                  Browse baskets, textiles, home goods, and accessories — each made in small batches.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/categories" className="btn-outline">
                  Browse Categories
                </Link>
                <Link to="/shop" className="btn-primary">
                  Shop All
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  )
}

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, type Product } from '../data/products'
import { ProductCard } from '../components/ui/ProductCard'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { useLenisScroll } from '../hooks/useLenisScroll'

const filters = ['all', 'basket', 'textile', 'home', 'accessory'] as const

export function ShopPage() {
  useLenisScroll(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = (searchParams.get('category') as (typeof filters)[number]) || 'all'
  const [filter, setFilter] = useState<(typeof filters)[number]>(
    filters.includes(initial) ? initial : 'all',
  )
  const [selected, setSelected] = useState<Product | null>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const didScroll = useRef(false)

  useEffect(() => {
    const cat = searchParams.get('category') as (typeof filters)[number]
    if (cat && filters.includes(cat)) setFilter(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    return filter === 'all' ? products : products.filter((p) => p.category === filter)
  }, [filter])

  const handleFilter = (cat: (typeof filters)[number]) => {
    setFilter(cat)
    if (cat === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  const openProduct = (product: Product) => {
    if (didScroll.current) return
    setSelected(product)
  }

  return (
    <div className="px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="section-label mb-3">Shop</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-cream md:text-5xl">
            All products
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/50">
            Every item is made by hand from banana abaca fiber. Prices reflect fair wages for artisans
            and the time required for each weave.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 text-[11px] tracking-wider uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-fiber/25 text-fiber-light shadow-[0_0_20px_rgba(154,132,104,0.15)]'
                    : 'text-cream/40 hover:bg-white/5 hover:text-cream/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="product-grid mt-12">
          {filtered.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 60}>
              <div
                onPointerDown={(e) => {
                  pointerStart.current = { x: e.clientX, y: e.clientY }
                  didScroll.current = false
                }}
                onPointerMove={(e) => {
                  if (!pointerStart.current) return
                  const dx = Math.abs(e.clientX - pointerStart.current.x)
                  const dy = Math.abs(e.clientY - pointerStart.current.y)
                  if (dx > 8 || dy > 8) didScroll.current = true
                }}
                onPointerUp={() => {
                  pointerStart.current = null
                }}
              >
                <ProductCard product={product} onSelect={() => openProduct(product)} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/75 p-6 backdrop-blur-md"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-charcoal shadow-2xl animate-[fadeIn_0.4s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), linear-gradient(145deg, ${selected.accentColor}99, ${selected.color})`,
              }}
            />
            <div className="p-8">
              <p className="section-label">{selected.category}</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-cream">
                {selected.name}
              </h2>
              <p className="mt-2 text-fiber-light">${selected.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/55">{selected.description}</p>
              <dl className="mt-6 space-y-2 text-sm text-cream/45">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt>Material</dt>
                  <dd className="text-cream/70">{selected.material}</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt>Dimensions</dt>
                  <dd className="text-cream/70">{selected.dimensions}</dd>
                </div>
              </dl>
              <ul className="mt-6 space-y-1 text-sm text-cream/50">
                {selected.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <button type="button" className="btn-primary mt-8 w-full" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { categories } from '../data/site'
import { products } from '../data/products'
import { CategoryCard } from '../components/ui/CategoryCard'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { useLenisScroll } from '../hooks/useLenisScroll'

export function CategoriesPage() {
  useLenisScroll(true)

  return (
    <div className="px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="section-label mb-3">Categories</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-cream md:text-5xl">
            Browse by type
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/50">
            Each category reflects a distinct way of working with banana fiber — from open-weave
            baskets to compressed pulp forms. Tap the button to explore — scrolling won't navigate away.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.id).length
            return (
              <ScrollReveal key={cat.id} delay={i * 80}>
                <CategoryCard category={cat} count={count} index={i} />
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

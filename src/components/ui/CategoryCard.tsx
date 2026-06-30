import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import type { CategoryItem } from '../../data/site'

interface CategoryCardProps {
  category: CategoryItem
  count: number
  index: number
}

export function CategoryCard({ category, count, index }: CategoryCardProps) {
  const navigate = useNavigate()
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const didScroll = useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    didScroll.current = false
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const dx = Math.abs(e.clientX - pointerStart.current.x)
    const dy = Math.abs(e.clientY - pointerStart.current.y)
    if (dx > 8 || dy > 8) didScroll.current = true
  }

  const goToCategory = () => {
    if (didScroll.current) return
    navigate(`/shop?category=${category.id}`)
  }

  return (
    <article
      className="group overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-fiber/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
      style={{ animationDelay: `${index * 100}ms` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => {
        pointerStart.current = null
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          style={{ backgroundImage: category.image }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />
        <span className="absolute top-4 left-4 glass-panel px-3 py-1 text-[10px] tracking-wider text-cream/70 uppercase">
          {count} pieces
        </span>
      </div>

      <div className="p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-cream transition-colors group-hover:text-fiber-light">
          {category.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/50">{category.description}</p>
        <button
          type="button"
          onClick={goToCategory}
          className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-wider text-fiber uppercase transition-all hover:gap-3 hover:text-fiber-light"
        >
          Explore category
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  )
}

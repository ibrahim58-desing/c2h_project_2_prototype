import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../../data/products'

interface ProductCardProps {
  product: Product
  onSelect?: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onSelect) {
      onSelect()
    } else {
      navigate('/shop')
    }
  }

  return (
    <article
      className="group cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className="overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-fiber/30 hover:bg-white/[0.04] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group-hover:border-fiber/30">
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.08]"
            style={{
              backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(145deg, ${product.accentColor}99 0%, ${product.color} 55%, #1a1a18 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute top-4 right-4 translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 glass-panel px-3 py-1 text-[10px] tracking-wider text-cream/80 uppercase">
            View
          </span>
        </div>
        <div className="p-5">
          <p className="section-label">{product.category}</p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-cream transition-colors group-hover:text-fiber-light">
            {product.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-cream/45">{product.tagline}</p>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-sm text-fiber-light">${product.price}</span>
            {onSelect ? (
              <span className="text-[10px] tracking-wider text-cream/30 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                View detail
              </span>
            ) : (
              <Link
                to="/shop"
                className="text-[10px] tracking-wider text-cream/40 uppercase hover:text-fiber-light"
                onClick={(e) => e.stopPropagation()}
              >
                Shop
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

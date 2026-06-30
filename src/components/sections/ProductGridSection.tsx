import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, type Product } from '../../data/products'
import { AnimatedText } from '../ui/AnimatedText'
import { MagneticButton } from '../ui/GlassNav'
import { useExperienceStore } from '../../store/experienceStore'

const categories = ['all', 'basket', 'textile', 'home', 'accessory'] as const

export function ProductGridSection() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('all')
  const [visibleCount, setVisibleCount] = useState(4)
  const setSelectedProduct = useExperienceStore((s) => s.setSelectedProduct)

  const filtered = useMemo(() => {
    const list = filter === 'all' ? products : products.filter((p) => p.category === filter)
    return list.slice(0, visibleCount)
  }, [filter, visibleCount])

  return (
    <section id="collection" className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <AnimatedText
            as="h2"
            variant="assemble"
            className="font-[family-name:var(--font-display)] text-5xl text-gradient md:text-6xl"
          >
            The Collection
          </AnimatedText>
          <p className="mt-4 text-sm tracking-[0.3em] text-white/40 uppercase">
            Museum of regenerative craft
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => {
                setFilter(cat)
                setVisibleCount(4)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
                filter === cat
                  ? 'glass-panel text-fiber-glow border-fiber/30'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onSelect={() => setSelectedProduct(product.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < products.length && (
          <div className="mt-16 text-center">
            <MagneticButton onClick={() => setVisibleCount((c) => c + 3)}>
              Reveal More
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: Product
  index: number
  onSelect: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: index * 0.08,
      }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      className="masonry-item group cursor-pointer"
      onClick={onSelect}
    >
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 group-hover:border-fiber/20 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div
          className="mb-6 aspect-square rounded-xl transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${product.accentColor}40, ${product.color}20, transparent 70%)`,
          }}
        >
          <div
            className="flex h-full items-center justify-center"
            style={{ perspective: '600px' }}
          >
            <motion.div
              className="h-24 w-24 rounded-lg"
              style={{ backgroundColor: product.color }}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        <p className="text-xs tracking-[0.2em] text-fiber/60 uppercase">{product.category}</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-fiber-glow">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-white/40">{product.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg text-banana">${product.price}</span>
          <span className="text-xs tracking-wider text-white/30 uppercase opacity-0 transition-opacity group-hover:opacity-100">
            Explore →
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}

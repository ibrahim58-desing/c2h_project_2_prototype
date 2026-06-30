import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const links = [
  { label: 'Journey', href: '#journey' },
  { label: 'Collection', href: '#collection' },
  { label: 'Craft', href: '#craft' },
  { label: 'Impact', href: '#impact' },
]

export function GlassNav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      const scrolled = window.scrollY > 100
      navRef.current.style.background = scrolled
        ? 'rgba(10, 31, 15, 0.6)'
        : 'transparent'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 right-0 left-0 z-[9000] flex items-center justify-between px-6 py-5 backdrop-blur-md transition-all duration-700 md:px-12"
    >
      <Link to="/" className="group flex items-center gap-3">
        <motion.div
          className="h-8 w-8 rounded-full border border-fiber/30"
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em] text-fiber-glow">
          FIBRA
        </span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="group relative text-xs tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-fiber-glow"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-fiber transition-all duration-500 group-hover:w-full" />
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/admin"
          className="glass-panel rounded-full px-4 py-2 text-xs tracking-wider text-white/50 transition-all hover:text-fiber-glow"
        >
          Studio
        </Link>
      </div>
    </motion.nav>
  )
}

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'ghost'
}

export function MagneticButton({
  children,
  onClick,
  className,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'relative overflow-hidden rounded-full px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-500',
        variant === 'primary' &&
          'bg-gradient-to-r from-fiber/20 to-banana/10 text-fiber-glow border border-fiber/20 hover:border-fiber/50 hover:shadow-[0_0_30px_rgba(196,165,116,0.2)]',
        variant === 'ghost' && 'text-white/50 hover:text-fiber-glow',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-banana/10 to-fiber/10"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}

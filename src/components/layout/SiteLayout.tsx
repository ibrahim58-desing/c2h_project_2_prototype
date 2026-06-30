import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { companyInfo } from '../../data/site'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Categories', path: '/categories' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function SiteNav() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[9000] border-b border-white/5 bg-charcoal/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="flex items-center gap-3 relative z-[9002]">
            <div className="h-7 w-7 rounded-full border border-fiber/40 transition-transform duration-500 hover:rotate-180" />
            <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-cream">
              {companyInfo.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={clsx(
                    'group relative text-xs tracking-[0.12em] uppercase transition-colors duration-300',
                    pathname === link.path
                      ? 'text-fiber-light'
                      : 'text-cream/50 hover:text-cream',
                  )}
                >
                  {link.label}
                  <span 
                    className={clsx(
                      'absolute -bottom-1 left-0 h-px bg-fiber-light transition-all duration-300 ease-out',
                      pathname === link.path ? 'w-full opacity-60' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
                    )} 
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/shop" className="btn-primary hidden px-5 py-2 text-[10px] md:inline-flex relative z-[9002]">
            Shop Now
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[9002] flex flex-col justify-center items-end w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={clsx("h-px bg-cream transition-all duration-300 ease-out", isOpen ? "w-6 rotate-45 translate-y-2" : "w-8")} />
            <span className={clsx("h-px bg-cream transition-all duration-300 ease-out", isOpen ? "opacity-0" : "w-6")} />
            <span className={clsx("h-px bg-cream transition-all duration-300 ease-out", isOpen ? "w-6 -rotate-45 -translate-y-1" : "w-4")} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9001] flex flex-col justify-center bg-charcoal/95 backdrop-blur-xl px-6"
          >
            <ul className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className={clsx(
                      'font-[family-name:var(--font-display)] text-4xl text-cream transition-colors duration-300 hover:text-fiber-light',
                      pathname === link.path && 'text-fiber-light italic'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <Link to="/shop" className="btn-primary w-full text-center">
                Shop Collection
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function SiteFooter() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <footer
      className={clsx(
        'relative z-30 border-t border-white/10',
        isHome
          ? 'bg-charcoal/55 backdrop-blur-xl'
          : 'bg-charcoal',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] text-fiber-light">
              {companyInfo.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/45">
              {companyInfo.tagline} — transforming banana agricultural waste into objects built to
              last, made by hand in the Philippines.
            </p>
          </div>

          <div>
            <p className="section-label mb-4">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/50 transition-colors hover:text-fiber-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-cream/50">
              <li>{companyInfo.email}</li>
              <li>{companyInfo.phone}</li>
              <li className="leading-relaxed">{companyInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-cream/30 md:flex-row">
          <p>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
          <p>Crafted from banana fiber · Sustainably made</p>
        </div>
      </div>
    </footer>
  )
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <SiteNav />
      <main className="relative z-10 pt-[72px]">{children}</main>
      <SiteFooter />
    </div>
  )
}

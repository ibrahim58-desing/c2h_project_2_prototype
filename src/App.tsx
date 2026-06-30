import { Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Preloader } from './components/loader/Preloader'
import { LiquidCursor } from './components/cursor/LiquidCursor'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'

/** Top-level error boundary — prevents the entire page from going blank on crash */
class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('[App] Uncaught error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1c1c1a',
            color: '#f4f0e8',
            fontFamily: "'Outfit', system-ui, sans-serif",
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#c4b49a',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(244,240,232,0.5)', maxWidth: '400px', marginBottom: '2rem' }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.875rem 2rem',
              background: '#9a8468',
              color: '#1c1c1a',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <Preloader />
      <LiquidCursor />
      <BrowserRouter>
        <ScrollToTop />
        <SiteLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </AppErrorBoundary>
  )
}

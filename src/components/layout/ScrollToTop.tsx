import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Reset window scroll on route change
    window.scrollTo(0, 0)
    // If lenis is active globally, window.scrollTo usually syncs, 
    // but we can also dispatch a custom event if needed.
    // For now, standard scrollTo works fine.
  }, [pathname])

  return null
}

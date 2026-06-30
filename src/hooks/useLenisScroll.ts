import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useExperienceStore } from '../store/experienceStore'
import { throttle } from '../utils/performance'

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null)
  const setScrollProgress = useExperienceStore((s) => s.setScrollProgress)
  const setWindIntensity = useExperienceStore((s) => s.setWindIntensity)

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1.2,
    })

    lenisRef.current = lenis

    const updateStore = (velocity: number, progress: number) => {
      setScrollProgress(progress)
      const windBoost = Math.min(Math.abs(velocity) * 0.015, 0.5)
      setWindIntensity(0.25 + windBoost)
    }

    lenis.on('scroll', ({ velocity, progress }: { velocity: number; progress: number }) => {
      updateStore(velocity, progress)
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.defaults({ scroller: document.body })
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [enabled, setScrollProgress, setWindIntensity])

  return lenisRef
}

export { gsap, ScrollTrigger }

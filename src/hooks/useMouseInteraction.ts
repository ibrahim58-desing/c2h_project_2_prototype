import { useEffect, useRef } from 'react'
import { useExperienceStore } from '../store/experienceStore'

export function useMouseInteraction() {
  const setMouse = useExperienceStore((s) => s.setMouse)
  const setCursorLight = useExperienceStore((s) => s.setCursorLight)
  const setShakeDetected = useExperienceStore((s) => s.setShakeDetected)
  const setIsIdle = useExperienceStore((s) => s.setIsIdle)
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() })
  const shakeHistory = useRef<number[]>([])
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pending = useRef<MouseEvent | null>(null)
  const rafId = useRef(0)

  useEffect(() => {
    const flush = () => {
      rafId.current = 0
      const e = pending.current
      if (!e) return

      const now = Date.now()
      const dt = now - lastPos.current.time
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const velocity = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0

      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
        velocity,
        isMoving: velocity > 0.01,
      })

      setCursorLight(Math.min(0.5 + velocity * 2, 1))

      shakeHistory.current.push(Math.abs(dx) + Math.abs(dy))
      if (shakeHistory.current.length > 6) shakeHistory.current.shift()
      const avg =
        shakeHistory.current.reduce((a, b) => a + b, 0) / shakeHistory.current.length
      if (avg > 50 && shakeHistory.current.length >= 5) {
        setShakeDetected(true)
        setTimeout(() => setShakeDetected(false), 1500)
        shakeHistory.current = []
      }

      lastPos.current = { x: e.clientX, y: e.clientY, time: now }

      clearTimeout(idleTimer.current)
      setIsIdle(false)
      idleTimer.current = setTimeout(() => setIsIdle(true), 4000)
    }

    const onMove = (e: MouseEvent) => {
      pending.current = e
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(flush)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      clearTimeout(idleTimer.current)
    }
  }, [setMouse, setCursorLight, setShakeDetected, setIsIdle])
}

export function useGyroscope(enabled = true) {
  const setMouse = useExperienceStore((s) => s.setMouse)

  useEffect(() => {
    if (!enabled || !window.DeviceOrientationEvent) return

    const onOrient = (e: DeviceOrientationEvent) => {
      const beta = (e.beta ?? 0) / 90
      const gamma = (e.gamma ?? 0) / 90
      setMouse({ normalizedX: gamma, normalizedY: beta * 0.5 })
    }

    window.addEventListener('deviceorientation', onOrient, { passive: true })
    return () => window.removeEventListener('deviceorientation', onOrient)
  }, [enabled, setMouse])
}

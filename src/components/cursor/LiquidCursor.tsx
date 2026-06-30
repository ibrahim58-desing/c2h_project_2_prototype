import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useExperienceStore } from '../../store/experienceStore'

export function LiquidCursor() {
  const x = useExperienceStore((s) => s.mouse.x)
  const y = useExperienceStore((s) => s.mouse.y)
  const velocity = useExperienceStore((s) => s.mouse.velocity)
  const cursorLight = useExperienceStore((s) => s.cursorLight)

  const cursorX = useSpring(x, { stiffness: 600, damping: 30 })
  const cursorY = useSpring(y, { stiffness: 600, damping: 30 })
  const ringX = useSpring(x, { stiffness: 200, damping: 22 })
  const ringY = useSpring(y, { stiffness: 200, damping: 22 })

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
    ringX.set(x)
    ringY.set(y)
  }, [x, y, cursorX, cursorY, ringX, ringY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-fiber-glow"
          style={{
            transform: `scale(${0.8 + cursorLight * 0.4})`,
            boxShadow: `0 0 ${16 + cursorLight * 20}px rgba(232, 213, 163, 0.5)`,
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-fiber/30"
          style={{
            width: 28 + velocity * 30,
            height: 28 + velocity * 30,
            opacity: 0.25 + cursorLight * 0.25,
          }}
        />
      </motion.div>
    </>
  )
}

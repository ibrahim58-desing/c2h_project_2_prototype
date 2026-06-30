import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import { useExperienceStore } from '../../store/experienceStore'
import { companyInfo } from '../../data/site'

export function Preloader() {
  const { progress } = useProgress()
  const [show, setShow] = useState(true)
  const setPhase = useExperienceStore((s) => s.setPhase)
  const setIntroComplete = useExperienceStore((s) => s.setIntroComplete)

  // Force minimum loading time to show the elegant animation
  const [minTimeMet, setMinTimeMet] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeMet(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // When Three.js is done loading and our minimum time is met
    if (progress >= 100 && minTimeMet) {
      setTimeout(() => {
        setShow(false)
        setPhase('intro')
        setIntroComplete(true)
      }, 500)
    }
  }, [progress, minTimeMet, setPhase, setIntroComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-charcoal"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,132,104,0.05),transparent_60%)]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Spinning ring representing fiber weaving */}
            <div className="relative mb-8 h-20 w-20">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(244,240,232,0.05)"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#9a8468"
                  strokeWidth="1.5"
                  strokeDasharray="301.59" // 2 * PI * 48
                  initial={{ strokeDashoffset: 301.59 }}
                  animate={{ strokeDashoffset: 301.59 - (301.59 * progress) / 100 }}
                  transition={{ ease: 'linear', duration: 0.2 }}
                />
              </svg>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-[family-name:var(--font-display)] text-2xl tracking-[0.2em] text-fiber-light"
            >
              {companyInfo.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-[10px] tracking-widest text-cream/40 uppercase"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

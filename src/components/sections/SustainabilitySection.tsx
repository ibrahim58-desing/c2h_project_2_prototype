import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from '../../hooks/useLenisScroll'
import { sustainabilityStats } from '../../data/products'
import { AnimatedText } from '../ui/AnimatedText'

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      setCount(Math.floor(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.from('.impact-stat', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section id="impact" ref={sectionRef} className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 text-center">
          <AnimatedText
            as="h2"
            variant="morph"
            className="font-[family-name:var(--font-display)] text-5xl text-gradient md:text-6xl"
          >
            Living Impact
          </AnimatedText>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed text-white/40">
            Every fiber diverted from waste. Every product replacing plastic. Every artisan
            empowered. Watch the earth breathe again.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sustainabilityStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="impact-stat glass-panel group relative overflow-hidden rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-canopy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-xs tracking-[0.2em] text-fiber/60 uppercase">{stat.label}</p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-4xl text-fiber-glow md:text-5xl">
                <AnimatedCounter value={stat.value} duration={2 + i * 0.3} />
                <span className="ml-1 text-lg text-white/30">{stat.unit}</span>
              </p>
              <p
                className={`mt-2 text-xs ${stat.trend > 0 ? 'text-green-400/60' : 'text-banana/60'}`}
              >
                {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% this year
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { label: 'CO₂ Absorbed', progress: 72, color: '#6b8f4e' },
            { label: 'Plastic Eliminated', progress: 58, color: '#c4a574' },
            { label: 'Waste Transformed', progress: 89, color: '#f5e642' },
          ].map((bar) => (
            <div key={bar.label} className="glass-panel rounded-xl p-6">
              <div className="mb-3 flex justify-between text-xs tracking-wider text-white/40 uppercase">
                <span>{bar.label}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: bar.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const items = timelineRef.current.querySelectorAll('.timeline-item')
    items.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
      })
    })
  }, [])

  const milestones = [
    { year: '2018', event: 'First fiber extracted from Philippine banana waste' },
    { year: '2020', event: 'Artisan collective formed — 12 master weavers' },
    { year: '2022', event: 'Carbon-neutral workshop powered by biomass' },
    { year: '2024', event: '128 artisans, 15,600 kg waste diverted annually' },
  ]

  return (
    <section id="craft" className="relative z-10 py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <AnimatedText
          as="h2"
          variant="rotate"
          className="mb-16 font-[family-name:var(--font-display)] text-5xl text-gradient md:text-6xl"
        >
          The Workshop
        </AnimatedText>

        <div ref={timelineRef} className="relative border-l border-fiber/10 pl-8 md:pl-12">
          {milestones.map((m) => (
            <div key={m.year} className="timeline-item relative mb-16 last:mb-0">
              <div className="absolute -left-[calc(2rem+1px)] h-3 w-3 rounded-full border border-fiber bg-forest md:-left-[calc(3rem+1px)]" />
              <span className="text-xs tracking-[0.3em] text-banana/60">{m.year}</span>
              <p className="mt-2 max-w-md text-lg leading-relaxed text-white/60">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedText } from '../ui/AnimatedText'

const kpis = [
  { label: 'Revenue', value: '$124,580', change: '+18.2%', spark: [40, 55, 45, 70, 65, 80, 90] },
  { label: 'Orders', value: '847', change: '+12.4%', spark: [30, 45, 60, 55, 70, 75, 85] },
  { label: 'Conversion', value: '4.8%', change: '+2.1%', spark: [20, 25, 30, 28, 35, 40, 48] },
  { label: 'Artisans', value: '128', change: '+8', spark: [80, 82, 85, 90, 95, 100, 128] },
]

const orders = [
  { id: '#2847', product: 'Helix Basket', time: '2m ago', status: 'processing' },
  { id: '#2846', product: 'Canopy Throw', time: '15m ago', status: 'shipped' },
  { id: '#2845', product: 'Root Planter', time: '1h ago', status: 'delivered' },
  { id: '#2844', product: 'Harvest Tote', time: '2h ago', status: 'delivered' },
]

function SparkLine({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`)
    .join(' ')

  return (
    <svg viewBox="0 0 100 100" className="h-12 w-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="url(#spark-gradient)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id="spark-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c4a574" />
          <stop offset="100%" stopColor="#f5e642" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function AdminDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2,
    }))

    let animId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 10, 5, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(196, 165, 116, 0.3)'
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050a05] text-white">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" />

      <nav className="relative z-10 flex items-center justify-between border-b border-white/5 px-8 py-5">
        <Link to="/" className="text-xs tracking-[0.3em] text-fiber/60 uppercase hover:text-fiber-glow">
          ← Return to Experience
        </Link>
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em] text-fiber-glow">
          FIBRA Studio
        </span>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        <AnimatedText
          as="h1"
          variant="slide"
          className="font-[family-name:var(--font-display)] text-4xl text-gradient md:text-5xl"
        >
          Analytics Command
        </AnimatedText>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6"
            >
              <p className="text-xs tracking-[0.2em] text-white/40 uppercase">{kpi.label}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-fiber-glow">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-green-400/70">{kpi.change}</p>
              <div className="mt-4">
                <SparkLine data={kpi.spark} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="glass-panel lg:col-span-2 rounded-2xl p-8">
            <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase">Revenue Flow</h3>
            <div className="mt-6 flex h-48 items-end gap-2">
              {[35, 50, 40, 65, 55, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-fiber/20 to-banana/40"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase">Live Orders</h3>
            <div className="mt-6 space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center justify-between border-b border-white/5 pb-3"
                >
                  <div>
                    <p className="text-sm text-fiber-glow">{order.product}</p>
                    <p className="text-xs text-white/30">
                      {order.id} · {order.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase ${
                      order.status === 'processing'
                        ? 'bg-banana/10 text-banana'
                        : order.status === 'shipped'
                          ? 'bg-fiber/10 text-fiber'
                          : 'bg-green-400/10 text-green-400'
                    }`}
                  >
                    {order.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Component, Suspense, type ReactNode, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { CameraRig } from './CameraRig'
import { PlantationBackdrop } from './environments/PlantationBackdrop'
import { DustParticles } from './effects/DustParticles'
import { getOptimalDpr } from '../../utils/performance'

/** Error boundary to prevent Three.js crashes from blanking the entire page */
interface ErrorBoundaryState {
  hasError: boolean
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('[ExperienceCanvas] 3D scene error caught:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

function HomeScene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <color attach="background" args={['#1a2218']} />
      <fog attach="fog" args={['#1a2218', 10, 32]} />
      <ambientLight intensity={0.35} color="#e8dcc8" />
      <CameraRig />
      <PlantationBackdrop />
      <DustParticles count={isMobile ? 12 : 28} spread={14} />
      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.08} luminanceThreshold={0.92} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil offset={0.12} darkness={0.4} />
        </EffectComposer>
      )}
    </>
  )
}

interface ExperienceCanvasProps {
  className?: string
}

const canvasFallback = (
  <div
    className="h-full w-full"
    style={{
      background: 'linear-gradient(145deg, #1a2218 0%, #2c3e2d 50%, #1c1c1a 100%)',
    }}
  />
)

export function ExperienceCanvas({ className }: ExperienceCanvasProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={className}>
      <CanvasErrorBoundary fallback={canvasFallback}>
        <Canvas
          dpr={isMobile ? Math.min(window.devicePixelRatio, 1) : getOptimalDpr(1.15)}
          camera={{ position: [0, 2.5, 14], fov: isMobile ? 65 : 44, near: 0.1, far: 70 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <HomeScene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}

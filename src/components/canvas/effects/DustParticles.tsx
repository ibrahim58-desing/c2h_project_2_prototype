import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DustParticlesProps {
  count?: number
  spread?: number
}

export function DustParticles({ count = 50, spread = 20 }: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const frame = useRef(0)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = Math.random() * spread * 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      vel[i * 3] = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 1] = Math.random() * 0.004
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008
    }
    return [pos, vel]
  }, [count, spread])

  useFrame((state) => {
    frame.current++
    if (frame.current % 2 !== 0 || !pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3] + Math.sin(t + i) * 0.001
      let y = posAttr.getY(i) + velocities[i * 3 + 1]
      let z = posAttr.getZ(i) + velocities[i * 3 + 2]

      if (y > spread * 0.5) y = 0
      if (Math.abs(x) > spread * 0.5) x *= -0.9
      if (Math.abs(z) > spread * 0.5) z *= -0.9

      posAttr.setXYZ(i, x, y, z)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e8d5a3"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

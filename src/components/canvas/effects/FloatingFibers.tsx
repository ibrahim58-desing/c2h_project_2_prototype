import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingFibersProps {
  count?: number
  radius?: number
  color?: string
  windIntensity?: number
}

export function FloatingFibers({
  count = 120,
  radius = 8,
  color = '#c4a574',
  windIntensity = 0.3,
}: FloatingFibersProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * radius,
      y: (Math.random() - 0.5) * radius,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
      length: 0.3 + Math.random() * 0.6,
    }))
  }, [count, radius])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    particles.forEach((p, i) => {
      const windX = Math.sin(t * p.speed + p.phase) * windIntensity * 0.5
      const windY = Math.cos(t * p.speed * 0.7 + p.phase) * windIntensity * 0.3
      const x = Math.cos(p.angle + t * 0.1) * p.radius + windX
      const z = Math.sin(p.angle + t * 0.1) * p.radius
      const y = p.y + Math.sin(t * p.speed + p.phase) * 0.5 + windY

      dummy.position.set(x, y, z)
      dummy.rotation.set(
        Math.sin(t + p.phase) * 0.5,
        p.angle + t * 0.05,
        Math.cos(t * 0.5 + p.phase) * 0.3,
      )
      dummy.scale.set(p.scale, p.length, p.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} roughness={0.8} />
    </instancedMesh>
  )
}

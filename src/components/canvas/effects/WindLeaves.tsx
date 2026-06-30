import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperienceStore } from '../../../store/experienceStore'

interface WindLeavesProps {
  count?: number
}

export function WindLeaves({ count = 40 }: WindLeavesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const windIntensity = useExperienceStore((s) => s.windIntensity)
  const shakeDetected = useExperienceStore((s) => s.shakeDetected)

  const leaves = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: 2 + Math.random() * 8,
        z: (Math.random() - 0.5) * 16,
        rotSpeed: 0.5 + Math.random(),
        fallSpeed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        scale: 0.08 + Math.random() * 0.12,
      })),
    [count],
  )

  const leafRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const wind = windIntensity + (shakeDetected ? 1.5 : 0)

    leaves.forEach((leaf, i) => {
      const mesh = leafRefs.current[i]
      if (!mesh) return

      const fall = shakeDetected ? leaf.fallSpeed * 3 : 0
      mesh.position.y =
        leaf.y +
        Math.sin(t * leaf.rotSpeed + leaf.phase) * 0.3 * wind -
        fall * ((t * 0.5) % 3)
      mesh.position.x = leaf.x + Math.sin(t * 0.5 + leaf.phase) * wind * 0.8
      mesh.rotation.x = Math.sin(t + leaf.phase) * wind
      mesh.rotation.z = Math.cos(t * 0.7 + leaf.phase) * wind * 0.5

      if (mesh.position.y < -1) {
        mesh.position.y = leaf.y + 8
      }
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.02 * wind
    }
  })

  return (
    <group ref={groupRef}>
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          ref={(el) => {
            leafRefs.current[i] = el
          }}
          position={[leaf.x, leaf.y, leaf.z]}
          scale={leaf.scale}
        >
          <planeGeometry args={[1, 1.4]} />
          <meshStandardMaterial
            color="#2d5016"
            emissive="#1a3d2e"
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

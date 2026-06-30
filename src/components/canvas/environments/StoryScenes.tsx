import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function EarthGlobe({ progress = 0 }: { progress?: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const treesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const treeCount = Math.floor(progress * 10)

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial
          color="#1a3d2e"
          emissive="#0a1f0f"
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.55, 12, 12]} />
        <meshBasicMaterial color="#6b8f4e" transparent opacity={0.06} wireframe />
      </mesh>

      <group ref={treesRef}>
        {Array.from({ length: treeCount }).map((_, i) => {
          const phi = Math.acos(2 * Math.random() - 1)
          const theta = Math.random() * Math.PI * 2
          const r = 1.52
          const x = r * Math.sin(phi) * Math.cos(theta)
          const y = r * Math.cos(phi)
          const z = r * Math.sin(phi) * Math.sin(theta)
          return (
            <mesh key={i} position={[x, y, z]} scale={0.04 + Math.random() * 0.03}>
              <coneGeometry args={[1, 2, 4]} />
              <meshStandardMaterial color="#2d5016" emissive="#1a3d2e" emissiveIntensity={0.3} />
            </mesh>
          )
        })}
      </group>

      <pointLight position={[3, 2, 3]} intensity={1.5} color="#f5e642" />
      <ambientLight intensity={0.2} color="#1a3d2e" />
    </group>
  )
}

export function WorkshopScene({ progress = 0 }: { progress?: number }) {
  const weaverRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (weaverRef.current) {
      weaverRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 * progress
    }
  })

  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>

      <group ref={weaverRef} position={[0, 0.5, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.15, 0.5, 4, 8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#c4a574" roughness={0.7} />
        </mesh>
      </group>

      {Array.from({ length: Math.floor(progress * 12) }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -1 + (i % 4) * 0.5,
            0.15,
            -0.5 + Math.floor(i / 4) * 0.4,
          ]}
          rotation={[0, (i * 0.3) % Math.PI, 0]}
        >
          <boxGeometry args={[0.02, 0.02, 0.4]} />
          <meshStandardMaterial
            color="#c4a574"
            emissive="#e8d5a3"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      <pointLight position={[0, 2, 1]} intensity={1} color="#f5e642" castShadow />
      <ambientLight intensity={0.3} color="#4a3728" />
    </group>
  )
}

export function WovenBasket({ progress = 0 }: { progress?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const weaveProgress = Math.min(progress * 1.5, 1)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const strandCount = Math.floor(weaveProgress * 16)

  return (
    <group ref={groupRef}>
      {Array.from({ length: strandCount }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const r = 0.5 + (i % 3) * 0.02
        return (
          <mesh key={i} position={[Math.cos(angle) * r, (i / 16) * 0.6 - 0.3, Math.sin(angle) * r]} rotation={[0, angle, 0.3]}>
            <boxGeometry args={[0.03, 0.04, 0.5]} />
            <meshStandardMaterial
              color="#c4a574"
              emissive="#e8d5a3"
              emissiveIntensity={0.15 + weaveProgress * 0.2}
              roughness={0.7}
            />
          </mesh>
        )
      })}
      {weaveProgress > 0.8 && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.35, 0.5, 16, 1, true]} />
          <meshStandardMaterial color="#8b6914" transparent opacity={0.3} wireframe />
        </mesh>
      )}
    </group>
  )
}

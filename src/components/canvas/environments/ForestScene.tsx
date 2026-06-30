import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const trunkColor = '#5c4a3a'
const leafColor = '#3d5238'
const leafDark = '#2a3828'
const groundColor = '#2a3228'
const ripeBanana = '#b8a030'

function BananaTree({
  position,
  scale = 1,
  rotation = 0,
  phase = 0,
}: {
  position: [number, number, number]
  scale?: number
  rotation?: number
  phase?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const trunkHeight = 3.2 * scale

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.z = Math.sin(t * 0.4 + phase) * 0.015
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.2, trunkHeight, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.95} metalness={0} />
      </mesh>

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const height = trunkHeight - 0.4 + (i % 2) * 0.15
        return (
          <Leaf
            key={i}
            angle={angle}
            height={height}
            phase={phase + i}
            color={i % 2 === 0 ? leafColor : leafDark}
          />
        )
      })}

      <mesh position={[0.15, trunkHeight - 0.9, 0.08]} rotation={[0.6, 0.2, 0.2]} castShadow>
        <capsuleGeometry args={[0.05, 0.35, 4, 8]} />
        <meshStandardMaterial color={ripeBanana} roughness={0.65} metalness={0} />
      </mesh>
    </group>
  )
}

function Leaf({
  angle,
  height,
  phase,
  color,
}: {
  angle: number
  height: number
  phase: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = 0.35 + Math.sin(t * 0.5 + phase) * 0.06
    ref.current.rotation.z = 0.4 + Math.cos(t * 0.35 + phase) * 0.04
  })

  return (
    <mesh
      ref={ref}
      position={[Math.cos(angle) * 0.25, height, Math.sin(angle) * 0.25]}
      rotation={[0.35, angle, 0.4]}
      castShadow
    >
      <planeGeometry args={[0.35, 2.2]} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function PlantationScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const trees: [number, number, number, number, number][] = [
    [0, -1, 0, 1, 0],
    [-3.5, -1, -2, 0.85, 0.4],
    [3.2, -1, -1.5, 0.9, -0.3],
    [-1.8, -1, -4.5, 0.75, 1.2],
    [2.5, -1, -5, 0.8, -0.8],
    [-4, -1, 2, 0.7, 2.1],
    [4.5, -1, 1, 0.95, -1.5],
    [-2, -1, 3, 0.65, 3],
    [1.5, -1, 4, 0.7, 1.8],
  ]

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={groundColor} roughness={1} metalness={0} />
      </mesh>

      {trees.map(([x, y, z, s, r], i) => (
        <BananaTree
          key={i}
          position={[x, y, z]}
          scale={s * (1 + scrollProgress * 0.015)}
          rotation={r}
          phase={i * 0.7}
        />
      ))}

      <mesh position={[0, -0.5, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 20]} />
        <meshStandardMaterial color="#1e2820" roughness={1} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

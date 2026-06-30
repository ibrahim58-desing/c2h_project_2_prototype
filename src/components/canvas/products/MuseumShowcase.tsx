import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Float } from '@react-three/drei'
import type { Product } from '../../../data/products'

interface MuseumShowcaseProps {
  product: Product
  position: [number, number, number]
  index: number
  onSelect: (id: string) => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

function ProductShape({ product, hovered }: { product: Product; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * (hovered ? 0.8 : 0.3)
    }
  })

  const shape =
    product.category === 'basket' ? (
      <group>
        <mesh>
          <cylinderGeometry args={[0.5, 0.4, 0.6, 12, 1, true]} />
          <meshStandardMaterial color={product.color} roughness={0.7} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} rotation={[0, (i / 6) * Math.PI * 2, 0]}>
            <boxGeometry args={[0.02, 0.55, 0.5]} />
            <meshStandardMaterial color={product.accentColor} roughness={0.8} />
          </mesh>
        ))}
      </group>
    ) : product.category === 'textile' ? (
      <mesh ref={meshRef}>
        <planeGeometry args={[1.2, 0.9]} />
        <meshStandardMaterial color={product.color} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    ) : (
      <mesh ref={meshRef}>
        <boxGeometry args={[0.7, 0.7, 0.5]} />
        <meshStandardMaterial color={product.color} roughness={0.6} metalness={0.1} />
      </mesh>
    )

  return (
    <Float speed={hovered ? 2 : 1} rotationIntensity={0.05} floatIntensity={hovered ? 0.5 : 0.2}>
      {shape}
    </Float>
  )
}

export function MuseumShowcase({
  product,
  position,
  onSelect,
  isHovered,
  onHover,
}: MuseumShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null)
  const spotRef = useRef<THREE.SpotLight>(null)

  useFrame((state) => {
    if (spotRef.current) {
      spotRef.current.intensity = isHovered ? 2 : 1
    }
    if (groupRef.current && isHovered) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHover(false)
        document.body.style.cursor = 'none'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(product.id)
      }}
    >
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.9, 1, 0.05, 16]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          depthWrite={false}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      <spotLight
        ref={spotRef}
        position={[0, 2, 1]}
        angle={0.4}
        penumbra={0.8}
        intensity={1}
        color={product.accentColor}
      />

      <ProductShape product={product} hovered={isHovered} />

      <Text
        position={[0, -1.1, 0]}
        fontSize={0.12}
        color="#e8d5a3"
        anchorX="center"
        anchorY="middle"
      >
        {product.name}
      </Text>
    </group>
  )
}

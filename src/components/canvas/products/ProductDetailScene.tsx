import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { products } from '../../../data/products'
import { PostFX } from '../effects/PostFX'

interface ProductDetailSceneProps {
  productId: string
  onClose: () => void
}

export function ProductDetailScene({ productId, onClose }: ProductDetailSceneProps) {
  const product = products.find((p) => p.id === productId)
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  if (!product) return null

  return (
    <>
      <color attach="background" args={['#050a05']} />
      <fog attach="fog" args={['#050a05', 5, 15]} />
      <ambientLight intensity={0.15} />
      <spotLight position={[0, 5, 2]} angle={0.3} penumbra={1} intensity={2.5} color={product.accentColor} />
      <pointLight position={[-2, 1, 2]} intensity={0.4} color="#f5e642" />

      <Float speed={1.5} floatIntensity={0.15}>
        <mesh ref={meshRef} position={[0, 0.5, 0]}>
          {product.category === 'basket' ? (
            <cylinderGeometry args={[0.6, 0.45, 0.7, 16, 1, true]} />
          ) : product.category === 'textile' ? (
            <planeGeometry args={[1.5, 1.1]} />
          ) : (
            <boxGeometry args={[0.8, 0.8, 0.6]} />
          )}
          <meshStandardMaterial
            color={product.color}
            emissive={product.accentColor}
            emissiveIntensity={0.15}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </Float>

      {product.features.map((feature, i) => {
        const angle = (i / product.features.length) * Math.PI * 2
        return (
          <group key={feature} position={[Math.cos(angle) * 1.5, 0.5 + i * 0.2, Math.sin(angle) * 1.5]}>
            <mesh>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial color={product.accentColor} emissive={product.accentColor} emissiveIntensity={0.4} />
            </mesh>
            <Text position={[0, 0.15, 0]} fontSize={0.08} color="#e8d5a3" anchorX="center" maxWidth={1} textAlign="center">
              {feature}
            </Text>
          </group>
        )
      })}

      <Text position={[0, -0.8, 0]} fontSize={0.2} color="#e8d5a3" anchorX="center">
        {product.name}
      </Text>

      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={0.8} />
      <PostFX bloomIntensity={0.35} />
    </>
  )
}

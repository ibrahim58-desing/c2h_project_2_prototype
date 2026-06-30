import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperienceStore } from '../../../store/experienceStore'
import { plantationImages } from '../../../data/visuals'
import { lerp } from '../../../utils/math'

const textureLoader = new THREE.TextureLoader()

/** Load a texture with error handling — returns null on failure instead of throwing */
function useResilientTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let disposed = false
    textureLoader.load(
      url,
      (tex) => {
        if (disposed) {
          tex.dispose()
          return
        }
        tex.colorSpace = THREE.SRGBColorSpace
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        setTexture(tex)
      },
      undefined,
      (err) => {
        console.warn(`[PlantationBackdrop] Failed to load texture: ${url}`, err)
      },
    )
    return () => {
      disposed = true
    }
  }, [url])

  return texture
}

function PhotoLayer({
  texture,
  position,
  size,
  opacity = 1,
  scrollFactor = 1,
  parallaxX = 0,
}: {
  texture: THREE.Texture | null
  position: [number, number, number]
  size: [number, number]
  opacity?: number
  scrollFactor?: number
  parallaxX?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const base = useRef(new THREE.Vector3(...position))

  useFrame(() => {
    if (!ref.current) return
    const p = useExperienceStore.getState().scrollProgress
    const mouse = useExperienceStore.getState().mouse

    ref.current.position.x = base.current.x + parallaxX * p + mouse.normalizedX * 0.15 * scrollFactor
    ref.current.position.y = base.current.y - p * 0.6 * scrollFactor
    ref.current.position.z = base.current.z + p * 3.5 * scrollFactor
  })

  if (!texture) return null

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        map={texture}
        transparent={opacity < 1}
        opacity={opacity}
        depthWrite={opacity >= 1}
        toneMapped={false}
      />
    </mesh>
  )
}

export function PlantationBackdrop() {
  const mainTex = useResilientTexture(plantationImages.main)
  const midTex = useResilientTexture(plantationImages.mid)
  const fgTex = useResilientTexture(plantationImages.foreground)
  const craftTex = useResilientTexture(plantationImages.craft)

  const lightRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    const p = useExperienceStore.getState().scrollProgress
    if (lightRef.current) {
      lightRef.current.intensity = lerp(0.9, 0.5, p)
    }
    state.scene.fog && ((state.scene.fog as THREE.Fog).near = lerp(8, 14, p))
  })

  return (
    <>
      {/* Deep backdrop — aerial plantation */}
      <PhotoLayer
        texture={midTex}
        position={[0, 3, -22]}
        size={[48, 28]}
        scrollFactor={0.5}
        parallaxX={-0.8}
      />

      {/* Main hero — lush banana rows */}
      <PhotoLayer
        texture={mainTex}
        position={[0, 1.5, -14]}
        size={[38, 22]}
        scrollFactor={1}
        parallaxX={0.4}
      />

      {/* Foreground leaves — depth & framing */}
      <PhotoLayer
        texture={fgTex}
        position={[-1.5, 0.5, -6]}
        size={[22, 14]}
        opacity={0.55}
        scrollFactor={1.4}
        parallaxX={-1.2}
      />

      {/* Craft layer emerges on scroll — fiber / workshop */}
      <PhotoLayer
        texture={craftTex}
        position={[0, -0.5, -8]}
        size={[32, 18]}
        opacity={0.45}
        scrollFactor={1.8}
        parallaxX={0.6}
      />

      <directionalLight ref={lightRef} position={[5, 8, 4]} intensity={0.9} color="#fff8ee" />

      {/* Ground fade into scene */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -4]}>
        <planeGeometry args={[60, 40]} />
        <meshBasicMaterial color="#1a2218" transparent opacity={0.85} />
      </mesh>
    </>
  )
}

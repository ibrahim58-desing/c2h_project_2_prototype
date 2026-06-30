import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

interface PostFXProps {
  bloomIntensity?: number
}

/** Lightweight post-processing — Bloom + Vignette only for 60fps */
export function PostFX({ bloomIntensity = 0.3 }: PostFXProps) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil offset={0.12} darkness={0.45} />
    </EffectComposer>
  )
}

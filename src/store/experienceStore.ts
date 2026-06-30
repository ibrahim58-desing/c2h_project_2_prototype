import { create } from 'zustand'

export type ExperiencePhase =
  | 'loading'
  | 'intro'
  | 'journey'
  | 'product-detail'
  | 'admin'

interface MouseState {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  velocity: number
  isMoving: boolean
}

interface ExperienceStore {
  phase: ExperiencePhase
  introComplete: boolean
  scrollProgress: number
  activeSection: number
  selectedProductId: string | null
  windIntensity: number
  cursorLight: number
  isIdle: boolean
  shakeDetected: boolean
  audioEnabled: boolean
  mouse: MouseState
  setPhase: (phase: ExperiencePhase) => void
  setIntroComplete: (complete: boolean) => void
  setScrollProgress: (progress: number) => void
  setActiveSection: (section: number) => void
  setSelectedProduct: (id: string | null) => void
  setWindIntensity: (intensity: number) => void
  setCursorLight: (light: number) => void
  setIsIdle: (idle: boolean) => void
  setShakeDetected: (shake: boolean) => void
  setAudioEnabled: (enabled: boolean) => void
  setMouse: (mouse: Partial<MouseState>) => void
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  phase: 'loading',
  introComplete: false,
  scrollProgress: 0,
  activeSection: 0,
  selectedProductId: null,
  windIntensity: 0.3,
  cursorLight: 0.5,
  isIdle: false,
  shakeDetected: false,
  audioEnabled: false,
  mouse: {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocity: 0,
    isMoving: false,
  },
  setPhase: (phase) => set({ phase }),
  setIntroComplete: (introComplete) => set({ introComplete }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setSelectedProduct: (selectedProductId) => set({ selectedProductId }),
  setWindIntensity: (windIntensity) => set({ windIntensity }),
  setCursorLight: (cursorLight) => set({ cursorLight }),
  setIsIdle: (isIdle) => set({ isIdle }),
  setShakeDetected: (shakeDetected) => set({ shakeDetected }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setMouse: (mouse) => set((state) => ({ mouse: { ...state.mouse, ...mouse } })),
}))

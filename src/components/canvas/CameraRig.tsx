import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperienceStore } from '../../store/experienceStore'
import { getCameraPath, getLookAt } from '../../utils/math'

const targetPos = new THREE.Vector3()
const targetLook = new THREE.Vector3()

export function CameraRig() {
  const scrollProgress = useExperienceStore((s) => s.scrollProgress)
  const mouse = useExperienceStore((s) => s.mouse)
  const { camera } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, 2.5, 14))
  const currentLook = useRef(new THREE.Vector3(0, 1.2, 0))

  useFrame(() => {
    const [tx, ty, tz] = getCameraPath(scrollProgress)
    const [lx, ly, lz] = getLookAt(scrollProgress)

    targetPos.set(tx + mouse.normalizedX * 0.08, ty + mouse.normalizedY * 0.04, tz)
    targetLook.set(lx, ly + 0.5, lz)

    currentPos.current.lerp(targetPos, 0.06)
    currentLook.current.lerp(targetLook, 0.06)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentLook.current)
  })

  return null
}

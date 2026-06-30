/** Camera drifts through photographic plantation layers on scroll */
export function getCameraPath(progress: number): [number, number, number] {
  const p = Math.min(1, Math.max(0, progress))
  const eased = p * p * (3 - 2 * p)
  return [
    0.3 * eased,
    2.2 - eased * 1.2,
    14 - eased * 7,
  ]
}

export function getLookAt(progress: number): [number, number, number] {
  const p = Math.min(1, Math.max(0, progress))
  const eased = p * p * (3 - 2 * p)
  return [0, 1.2 - eased * 0.4, -2 - eased * 8]
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

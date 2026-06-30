export function getOptimalDpr(max = 1.25): number {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio, max)
}

export function throttle<T extends (...args: never[]) => void>(fn: T, ms: number): T {
  let last = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  return ((...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = ms - (now - last)
    if (remaining <= 0) {
      last = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = undefined
        fn(...args)
      }, remaining)
    }
  }) as T
}

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap } from '../../hooks/useLenisScroll'

type AnimationVariant =
  | 'explode'
  | 'morph'
  | 'slide'
  | 'rotate'
  | 'split'
  | 'float'
  | 'assemble'

interface AnimatedTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  variant?: AnimationVariant
  className?: string
  delay?: number
  trigger?: boolean
}

export function AnimatedText({
  children,
  as: Tag = 'h2',
  variant = 'split',
  className = '',
  delay = 0,
  trigger = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || !trigger) return

    const split = new SplitType(ref.current, { types: 'chars,words' })
    const chars = ref.current.querySelectorAll('.char')
    const words = ref.current.querySelectorAll('.word')

    const tl = gsap.timeline({ delay })

    switch (variant) {
      case 'explode':
        tl.from(chars, {
          opacity: 0,
          scale: 0,
          x: () => (Math.random() - 0.5) * 200,
          y: () => (Math.random() - 0.5) * 200,
          rotation: () => (Math.random() - 0.5) * 360,
          duration: 1,
          stagger: 0.02,
          ease: 'back.out(2)',
        })
        break
      case 'slide':
        tl.from(chars, {
          opacity: 0,
          y: 80,
          rotationX: -90,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
        })
        break
      case 'rotate':
        tl.from(chars, {
          opacity: 0,
          rotationY: 90,
          transformOrigin: '50% 50% -50px',
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
        })
        break
      case 'float':
        tl.from(chars, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: { each: 0.05, from: 'random' },
          ease: 'sine.out',
        })
        tl.to(chars, {
          y: -5,
          duration: 2,
          stagger: { each: 0.1, from: 'random', repeat: -1, yoyo: true },
          ease: 'sine.inOut',
        })
        break
      case 'assemble':
        tl.from(chars, {
          opacity: 0,
          x: () => (Math.random() - 0.5) * 100,
          y: () => (Math.random() - 0.5) * 100,
          duration: 1.2,
          stagger: 0.015,
          ease: 'elastic.out(1, 0.5)',
        })
        break
      case 'morph':
        tl.from(words, {
          opacity: 0,
          filter: 'blur(20px)',
          scale: 1.5,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
        })
        break
      default:
        tl.from(chars, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.025,
          ease: 'power3.out',
        })
    }

    return () => {
      split.revert()
      tl.kill()
    }
  }, [children, variant, delay, trigger])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../hooks/useLenisScroll'
import { storyChapters } from '../../data/products'
import { AnimatedText } from '../ui/AnimatedText'
import { useExperienceStore } from '../../store/experienceStore'

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setActiveSection = useExperienceStore((s) => s.setActiveSection)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = containerRef.current.querySelectorAll('.story-chapter')

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      })

      gsap.from(section.querySelectorAll('.chapter-content'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [setActiveSection])

  const variants = ['explode', 'slide', 'rotate', 'assemble', 'float', 'morph'] as const

  return (
    <section id="journey" ref={containerRef} className="relative z-10">
      {storyChapters.map((chapter, i) => (
        <div
          key={chapter.id}
          className="story-chapter section-pin flex min-h-screen items-end pb-24 md:items-center md:pb-0"
        >
          <div
            className={`chapter-content mx-auto w-full max-w-4xl px-6 md:px-12 ${
              i % 2 === 0 ? 'md:mr-auto md:ml-12' : 'md:mr-12 md:ml-auto md:text-right'
            }`}
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-fiber/60 uppercase">
              Chapter {String(i + 1).padStart(2, '0')}
            </p>
            <AnimatedText
              as="h2"
              variant={variants[i % variants.length]}
              className="font-[family-name:var(--font-display)] text-5xl leading-tight text-gradient md:text-7xl"
              delay={0.2}
            >
              {chapter.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              variant="slide"
              className="mt-4 text-lg text-fiber-glow/80 md:text-xl"
              delay={0.5}
            >
              {chapter.subtitle}
            </AnimatedText>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/40 md:text-base">
              {chapter.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}

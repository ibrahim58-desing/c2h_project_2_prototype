const items = [
  'Abaca Fiber',
  'Hand Woven',
  'Sun Dried',
  'Zero Plastic',
  'Artisan Made',
  'Biodegradable',
  'Fair Trade',
  'Natural Dye',
]

export function MaterialMarquee() {
  const track = [...items, ...items]

  return (
    <div className="marquee-mask overflow-hidden border-y border-white/5 py-5">
      <div className="marquee-track flex w-max gap-12">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-12 text-xs tracking-[0.35em] text-cream/30 uppercase"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-fiber/50" />
          </span>
        ))}
      </div>
    </div>
  )
}

import { companyInfo, categories } from '../data/site'
import { useLenisScroll } from '../hooks/useLenisScroll'

export function AboutPage() {
  useLenisScroll(true)

  return (
    <div className="px-6 py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="section-label mb-3">About Us</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-cream md:text-5xl">
          A workshop rooted in the land
        </h1>
        <p className="mt-8 text-base leading-[1.8] text-cream/55">
          {companyInfo.name} began in the Bicol region of the Philippines, where banana cultivation
          produces tonnes of pseudostem waste each harvest. Rather than letting that material rot,
          local craftspeople developed methods to extract abaca-grade fiber and weave it into
          objects built to last decades.
        </p>
        <p className="mt-6 text-base leading-[1.8] text-cream/55">
          Today we work with 128 artisans across weaving, pressing, and finishing. Every product
          is made in small batches. Variations in tone and texture are natural — they reflect the
          fiber batch, the season, and the hand that made it.
        </p>

        <div className="my-16 border-y border-white/5 py-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-cream">What we make</h2>
          <ul className="mt-8 space-y-6">
            {categories.map((cat) => (
              <li key={cat.id} className="flex gap-4">
                <div
                  className="h-16 w-16 shrink-0 bg-cover"
                  style={{ backgroundImage: cat.image }}
                />
                <div>
                  <h3 className="text-sm font-medium text-cream">{cat.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/45">{cat.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { value: '128', label: 'Artisans employed' },
            { value: '15.6t', label: 'Waste diverted yearly' },
            { value: '2018', label: 'Founded' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-display)] text-3xl text-fiber-light">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-cream/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

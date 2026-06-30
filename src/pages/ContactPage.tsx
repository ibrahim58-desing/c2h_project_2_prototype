import { useState } from 'react'
import { companyInfo } from '../data/site'
import { useLenisScroll } from '../hooks/useLenisScroll'

export function ContactPage() {
  useLenisScroll(true)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <div>
          <p className="section-label mb-3">Contact</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-cream md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-cream/50">
            Questions about materials, wholesale orders, or custom commissions — we respond within
            two business days.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="section-label">Email</dt>
              <dd className="mt-1 text-cream/70">{companyInfo.email}</dd>
            </div>
            <div>
              <dt className="section-label">Phone</dt>
              <dd className="mt-1 text-cream/70">{companyInfo.phone}</dd>
            </div>
            <div>
              <dt className="section-label">Workshop</dt>
              <dd className="mt-1 text-cream/70">{companyInfo.address}</dd>
            </div>
            <div>
              <dt className="section-label">Hours</dt>
              <dd className="mt-1 text-cream/70">{companyInfo.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="border border-white/5 p-8 md:p-10">
          {sent ? (
            <p className="text-cream/70">
              Thank you — your message has been received. We will reply shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="section-label mb-2 block">
                  Name
                </label>
                <input id="name" name="name" required className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="section-label mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="section-label mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

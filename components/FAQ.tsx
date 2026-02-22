'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Coaches with an established audience (10k–200k followers) across any niche — fitness, business, mindset, relationships, finance, etc. — who are ready to monetize more effectively.',
  },
  {
    q: 'How long does it take to build a funnel?',
    a: 'Most full funnel builds are completed within 2–3 weeks from our strategy call. Simple funnels can be done in as little as 7 days.',
  },
  {
    q: 'What platforms do you build on?',
    a: 'I primarily build on GoHighLevel (GHL) for the backend — CRM, automations, email, and bookings. Websites and landing pages are built with modern web tech for speed and performance.',
  },
  {
    q: 'Do I need to know anything about tech?',
    a: 'Not at all. That\'s the point. You focus on coaching and content — I handle everything technical from strategy to launch.',
  },
  {
    q: 'What does it cost?',
    a: 'Pricing depends on the scope of your funnel. That\'s exactly what the strategy call is for — to understand your needs and give you a clear, honest quote with no surprises.',
  },
  {
    q: 'What happens on the strategy call?',
    a: 'We spend 30 minutes talking about your audience, your current offers, and your revenue goals. I\'ll give you actionable insights regardless — and if I think I can help, I\'ll share how.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Common questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-gray-900">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Who is this for?', a: 'Coaches with an established audience (10k–200k followers) across any niche — fitness, business, mindset, relationships, finance, etc. — who are ready to monetize more effectively.' },
  { q: 'How long does it take to build a funnel?', a: 'Most full funnel builds are completed within 2–3 weeks from our strategy call. Simple funnels can be done in as little as 7 days.' },
  { q: 'What platforms do you build on?', a: 'I primarily build on GoHighLevel (GHL) for the backend — CRM, automations, email, and bookings. Websites and landing pages are built with modern web tech for speed and performance.' },
  { q: 'Do I need to know anything about tech?', a: 'Not at all. That\'s the point. You focus on coaching and content — I handle everything technical from strategy to launch.' },
  { q: 'What does it cost?', a: 'Pricing depends on the scope of your funnel. That\'s exactly what the strategy call is for — to understand your needs and give you a clear, honest quote with no surprises.' },
  { q: 'What happens on the strategy call?', a: 'We spend 30 minutes talking about your audience, your current offers, and your revenue goals. I\'ll give you actionable insights regardless — and if I think I can help, I\'ll share how.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-6" style={{backgroundColor: '#111111'}}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#F5F0E8'}}>Common questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border" style={{borderColor: '#2a2a2a', backgroundColor: '#1a1a1a'}}>
              <button
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                style={{color: '#F5F0E8'}}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`}
                  style={{color: '#C9A84C'}}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 leading-relaxed" style={{color: '#9A8A6A'}}>
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

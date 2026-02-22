const services = [
  { title: 'Funnel Strategy', desc: 'We map out your entire customer journey — from first touch to purchase — with a proven structure tailored to your coaching niche.' },
  { title: 'High-Converting Pages', desc: 'Landing pages and sales pages that are designed to convert your audience into paying clients, not just look pretty.' },
  { title: 'Email Automation', desc: 'Nurture sequences that do the selling for you 24/7, warming up leads and guiding them to the next step automatically.' },
  { title: 'GHL & CRM Setup', desc: 'Full GoHighLevel build-out: pipelines, automations, booking systems, and follow-up sequences — all done for you.' },
  { title: 'Offer Positioning', desc: 'We make sure your offer is positioned to attract the right clients at the right price point for your audience size.' },
  { title: 'Analytics & Optimization', desc: 'After launch, we track what\'s working and what\'s not — so your funnel gets better over time, not just at launch.' },
]

export default function Solution() {
  return (
    <section className="py-20 px-6" style={{backgroundColor: '#0a0a0a'}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#F5F0E8'}}>What I do for you</h2>
          <p className="text-lg max-w-xl mx-auto" style={{color: '#9A8A6A'}}>
            A complete, done-for-you funnel system built specifically for coaches who want to monetize their audience properly.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border transition-all" style={{backgroundColor: '#1a1a1a', borderColor: '#2a2a2a'}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mb-4" style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a'}}>
                {i + 1}
              </div>
              <h3 className="font-semibold mb-2" style={{color: '#F5F0E8'}}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{color: '#9A8A6A'}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

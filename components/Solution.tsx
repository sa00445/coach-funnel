const services = [
  {
    title: 'Funnel Strategy',
    desc: 'We map out your entire customer journey — from first touch to purchase — with a proven structure tailored to your coaching niche.',
  },
  {
    title: 'High-Converting Pages',
    desc: 'Landing pages and sales pages that are designed to convert your audience into paying clients, not just look pretty.',
  },
  {
    title: 'Email Automation',
    desc: 'Nurture sequences that do the selling for you 24/7, warming up leads and guiding them to the next step automatically.',
  },
  {
    title: 'GHL & CRM Setup',
    desc: 'Full GoHighLevel build-out: pipelines, automations, booking systems, and follow-up sequences — all done for you.',
  },
  {
    title: 'Offer Positioning',
    desc: 'We make sure your offer is positioned to attract the right clients at the right price point for your audience size.',
  },
  {
    title: 'Analytics & Optimization',
    desc: 'After launch, we track what\'s working and what\'s not — so your funnel gets better over time, not just at launch.',
  },
]

export default function Solution() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What I do for you
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            A complete, done-for-you funnel system built specifically for coaches who want to monetize their audience properly.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

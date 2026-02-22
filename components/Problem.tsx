const problems = [
  {
    icon: '📊',
    title: 'Huge audience, tiny revenue',
    desc: 'You have thousands of engaged followers but your monthly income doesn\'t reflect that. Something is broken between attention and conversion.',
  },
  {
    icon: '🔗',
    title: 'No clear path to purchase',
    desc: 'Followers don\'t know how to hire you. There\'s no structured journey from "I love your content" to "take my money."',
  },
  {
    icon: '⚙️',
    title: 'Overwhelmed by tech & tools',
    desc: 'Landing pages, email sequences, CRMs, payment processors — you\'re a coach, not a software engineer. It shouldn\'t feel this hard.',
  },
  {
    icon: '🎯',
    title: 'Inconsistent lead flow',
    desc: 'Some months are great, others are dry. Without a proper funnel, your revenue is as unpredictable as the algorithm.',
  },
]

export default function Problem() {
  return (
    <section className="py-20 px-6" style={{backgroundColor: '#111111'}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#F5F0E8'}}>Sound familiar?</h2>
          <p className="text-lg max-w-xl mx-auto" style={{color: '#9A8A6A'}}>
            Most coaches are leaving significant money on the table — not because they lack value, but because they lack the right system.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="rounded-2xl p-8 border transition-all hover:border-opacity-60" style={{backgroundColor: '#1a1a1a', borderColor: '#2a2a2a'}}>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold mb-2" style={{color: '#F5F0E8'}}>{p.title}</h3>
              <p className="leading-relaxed" style={{color: '#9A8A6A'}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

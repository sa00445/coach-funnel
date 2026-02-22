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
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sound familiar?
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Most coaches are leaving significant money on the table — not because they lack value, but because they lack the right system.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

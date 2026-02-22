const steps = [
  {
    step: '01',
    title: 'Strategy Call',
    desc: 'We start with a free 30-minute call to understand your audience, offer, and goals. Zero pitch, pure clarity.',
  },
  {
    step: '02',
    title: 'Funnel Blueprint',
    desc: 'I map out your complete funnel strategy — pages, emails, automations — before a single line of code is written.',
  },
  {
    step: '03',
    title: 'Build & Launch',
    desc: 'My team builds everything in 2–3 weeks. You review, approve, and we go live. You focus on coaching.',
  },
]

export default function Process() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600">Simple, fast, and done-for-you.</p>
        </div>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-8 items-start bg-white rounded-2xl p-8 border border-gray-100">
              <div className="text-4xl font-bold text-gray-200 shrink-0">{s.step}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="#booking"
            className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
          >
            Start with Step 01 — It's Free
          </a>
        </div>
      </div>
    </section>
  )
}

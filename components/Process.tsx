const steps = [
  { step: '01', title: 'Strategy Call', desc: 'We start with a free 30-minute call to understand your audience, offer, and goals. Zero pitch, pure clarity.' },
  { step: '02', title: 'Funnel Blueprint', desc: 'I map out your complete funnel strategy — pages, emails, automations — before a single line of code is written.' },
  { step: '03', title: 'Build & Launch', desc: 'My team builds everything in 2–3 weeks. You review, approve, and we go live. You focus on coaching.' },
]

export default function Process() {
  return (
    <section className="py-20 px-6" style={{backgroundColor: '#111111'}}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#F5F0E8'}}>How it works</h2>
          <p className="text-lg" style={{color: '#9A8A6A'}}>Simple, fast, and done-for-you.</p>
        </div>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-8 items-start rounded-2xl p-8 border" style={{backgroundColor: '#1a1a1a', borderColor: '#2a2a2a'}}>
              <div className="text-4xl font-bold shrink-0" style={{color: '#3a3020'}}>{s.step}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{color: '#C9A84C'}}>{s.title}</h3>
                <p className="leading-relaxed" style={{color: '#9A8A6A'}}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="#booking"
            className="px-8 py-4 rounded-full text-lg font-semibold inline-block transition-all hover:opacity-90 hover:scale-105"
            style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a', boxShadow: '0 0 30px rgba(201, 168, 76, 0.25)'}}
          >
            Start with Step 01 — It's Free
          </a>
        </div>
      </div>
    </section>
  )
}

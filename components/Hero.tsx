export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 relative overflow-hidden" style={{backgroundColor: '#0a0a0a'}}>
      {/* Gold glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 rounded-full blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, #C9A84C, transparent)'}} />
      
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-8 border" style={{backgroundColor: '#1a1a1a', borderColor: '#3a3020', color: '#C9A84C'}}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#C9A84C'}}></span>
          Accepting new coaching clients
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{color: '#F5F0E8'}}>
          You've Built the Audience.
          <br />
          <span style={{background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Now Let's Build the Revenue.
          </span>
        </h1>

        <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{color: '#9A8A6A'}}>
          I help coaches with 10k–200k followers build high-converting funnels that turn their audience into consistent, scalable income — without the tech headaches.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#booking"
            className="px-8 py-4 rounded-full text-lg font-semibold transition-all hover:opacity-90 hover:scale-105 w-full sm:w-auto text-center"
            style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a', boxShadow: '0 0 30px rgba(201, 168, 76, 0.3)'}}
          >
            Book Your Free Strategy Call
          </a>
          <span className="text-sm" style={{color: '#9A8A6A'}}>30 minutes · No pitch · Pure value</span>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '40+', label: 'Funnels Built' },
            { value: '$2M+', label: 'Revenue Generated' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className={`text-center ${i === 1 ? 'border-x' : ''}`} style={{borderColor: '#2a2a2a'}}>
              <div className="text-3xl font-bold" style={{color: '#C9A84C'}}>{stat.value}</div>
              <div className="text-sm mt-1" style={{color: '#9A8A6A'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

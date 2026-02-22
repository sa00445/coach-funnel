export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Accepting new coaching clients
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          You've Built the Audience.
          <br />
          <span className="text-gray-400">Now Let's Build the Revenue.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          I help coaches with 10k–200k followers build high-converting funnels that turn their audience into consistent, scalable income — without the tech headaches.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#booking"
            className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors w-full sm:w-auto text-center"
          >
            Book Your Free Strategy Call
          </a>
          <span className="text-gray-500 text-sm">30 minutes · No pitch · Pure value</span>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">40+</div>
            <div className="text-sm text-gray-500 mt-1">Funnels Built</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-3xl font-bold text-gray-900">$2M+</div>
            <div className="text-sm text-gray-500 mt-1">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-500 mt-1">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}

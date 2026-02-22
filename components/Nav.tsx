export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg text-gray-900">Abdullah Ali</span>
        <a
          href="#booking"
          className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Book Free Call
        </a>
      </div>
    </nav>
  )
}

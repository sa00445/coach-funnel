export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{backgroundColor: '#0a0a0aee', borderColor: '#2a2a2a', backdropFilter: 'blur(12px)'}}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a'}}>SA</div>
          <span className="font-bold text-lg" style={{color: '#F5F0E8'}}>Abdullah Ali</span>
        </div>
        <a
          href="#booking"
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
          style={{background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0a0a0a'}}
        >
          Book Free Call
        </a>
      </div>
    </nav>
  )
}

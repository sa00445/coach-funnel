export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t" style={{backgroundColor: '#0a0a0a', borderColor: '#2a2a2a'}}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold" style={{color: '#C9A84C'}}>Syed Abdullah Ali</span>
        <p className="text-sm text-center" style={{color: '#9A8A6A'}}>
          Funnel Builder for Coaches · Helping coaches with 10k–200k followers monetize better
        </p>
        <p className="text-sm" style={{color: '#3a3020'}}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

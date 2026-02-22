export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-gray-900">Syed Abdullah Ali</span>
        <p className="text-sm text-gray-500 text-center">
          Funnel Builder for Coaches · Helping coaches with 10k–200k followers monetize better
        </p>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

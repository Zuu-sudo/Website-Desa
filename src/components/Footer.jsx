export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#111] py-10 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/6 mb-6">
          <div>
            <p className="font-display text-xl font-bold text-[#C9A84C] tracking-widest">
              KUREKSARI <span className="text-[#D4520A] italic">BLACKSMITH</span>
            </p>
            <p className="text-white/25 text-xs mt-1">Pande Besi Tradisional · Sidoarjo, Jawa Timur</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {['#about', '#products', '#reviews', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                className="text-white/35 hover:text-[#C9A84C] text-xs tracking-wider capitalize transition-colors"
              >
                {href.replace('#', '')}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-white/20 text-xs gap-2">
          <span>© {year} Kureksari Blacksmith. Semua hak dilindungi.</span>
          <span>Dibuat untuk para pengrajin lokal Kureksari</span>
        </div>
      </div>
    </footer>
  )
}

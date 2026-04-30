const TICKER_ITEMS = ['Sparepart Industri', '✦', 'Pesanan Custom', '✦', 'Sparepart Industri', 'Pesanan Custom']

export default function Ticker() {
  return (
    <div className="bg-[#D4520A] py-2.5 sm:py-3 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span key={i} className="text-white/90 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold px-4 sm:px-5 whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
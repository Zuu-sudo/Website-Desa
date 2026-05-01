const TICKER_ITEMS = [
  'Sparepart Industri',
  '✦',
  'Pesanan Custom',
  '✦',
  'Sparepart Industri',
  '✦',
  'Pesanan Custom',
  '✦',
]

export default function Ticker() {
  // Duplicate items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="bg-[#D4520A] py-3 sm:py-3.5 overflow-hidden">
      <div className="ticker-container">
        <div className="ticker-track">
          {items.map((t, i) => (
            <span
              key={i}
              className="text-white/90 text-[10px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold px-5 sm:px-6 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
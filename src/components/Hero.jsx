import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen min-h-[100dvh] bg-[#0F0F0F] overflow-hidden flex items-center"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),
            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 sm:px-8 md:px-14 pt-24 pb-16 sm:pt-28 sm:pb-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#E8632A] font-semibold mb-5 sm:mb-7 border border-[#E8632A]/30 px-3 sm:px-3.5 py-1.5"
        >
          <span className="w-4 sm:w-5 h-px bg-[#E8632A] block" />
          Kureksari Blacksmith · Sidoarjo
          <span className="w-4 sm:w-5 h-px bg-[#E8632A] block" />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[clamp(3.2rem,7vw,6.5rem)] leading-[1.05] font-bold text-white mb-5 sm:mb-7 px-2"
        >
          Kualitas{' '}
          <span className="text-[#E8632A] italic">Besi</span>
          <br />dari Tangan
          <br />
          <span className="text-[#D4AF37]">Para Ahli.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl sm:max-w-2xl mb-8 sm:mb-10 mx-auto px-4"
        >
          Kami telah menempa produk berkualitas selama puluhan tahun khususnya sparepart industri hingga pesanan custom. Pesan langsung dari pengrajinnya.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full px-4">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-3 bg-[#E8632A] hover:bg-[#F06A1A] text-white px-6 sm:px-7 py-3 sm:py-3.5 font-medium text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E8632A]/20 w-full sm:w-auto"
          >
            Lihat Produk
            <ArrowDown size={15} />
          </a>
          <a
            href="https://wa.me/6282132310749?text=Halo%20Pak%2C%20saya%20ingin%20menanyakan%20harga%20untuk%20pemesanan%20produk%20%5BJelaskan%20produk%20yang%20anda%20inginkan%5D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-[#D4AF37] text-white/75 hover:text-[#D4AF37] px-6 sm:px-7 py-3 sm:py-3.5 font-medium text-sm tracking-wide transition-all duration-300 w-full sm:w-auto"
          >
            <MessageCircle size={15} />
            WhatsApp Sekarang
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 w-full px-4"
        >
          {[
            { num: '25+', label: 'Tahun Pengalaman' },
            { num: '500+', label: 'Pelanggan Puas' },
            { num: '100%', label: 'Produk Lokal' },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#D4AF37] block">{s.num}</span>
              <span className="text-white/40 text-[9px] sm:text-[10px] tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
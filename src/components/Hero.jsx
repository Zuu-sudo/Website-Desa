import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'

const SPARKS = [
  { top: '20%', left: '72%', delay: 0, size: 3 },
  { top: '55%', left: '80%', delay: 0.4, size: 2 },
  { top: '35%', left: '60%', delay: 0.8, size: 4 },
  { top: '70%', left: '68%', delay: 0.2, size: 2 },
  { top: '15%', left: '85%', delay: 1.1, size: 3 },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
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
      className="relative min-h-screen bg-[#181818] overflow-hidden flex items-center"
    >
      {/* BG image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565785901975-8b40df05e07d?w=1800&auto=format&fit=crop&q=80"
          alt="Pande besi"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/80 to-[#181818]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
      </motion.div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),
            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)`,
        }}
      />

      {/* Floating spark dots */}
      {SPARKS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#E8651A] z-10"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i * 0.5, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Decorative circle */}
      <motion.div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#C9A84C]/10 z-0 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#B84A2F]/15 z-0 hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-8 md:px-14 pt-28 pb-20 max-w-3xl"
      >
        <motion.div variants={item} className="tag">
          Pande Besi Tradisional · Desa Kureksari · Sidoarjo
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-bold text-white mb-8"
        >
          Kualitas{' '}
          <span className="text-[#B84A2F] italic">Besi</span>
          <br />dari Tangan
          <br />
          <span className="text-[#C9A84C]">Para Ahli.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg mb-10"
        >
          Pande besi Kureksari telah menempa produk berkualitas selama puluhan tahun — sparepart industri, tiang listrik, alat pertanian, hingga pesanan custom. Pesan langsung dari pengrajinnya.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a
            href="#products"
            className="animate-glow inline-flex items-center gap-3 bg-[#B84A2F] hover:bg-[#E8651A] text-white px-7 py-3.5 font-medium text-sm tracking-wide transition-all duration-300"
          >
            Lihat Produk
            <ArrowDown size={15} />
          </a>
          <a
            href={`https://wa.me/6282132310749?text=Halo%20Pak%2C%20saya%20ingin%20menanyakan%20produk`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 hover:border-[#C9A84C] text-white/75 hover:text-[#C9A84C] px-7 py-3.5 font-medium text-sm tracking-wide transition-all duration-300"
          >
            <MessageCircle size={15} />
            WhatsApp Sekarang
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/10"
        >
          {[
            { num: '25+', label: 'Tahun Pengalaman' },
            { num: '500+', label: 'Pelanggan Puas' },
            { num: '100%', label: 'Produk Lokal' },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-display text-4xl font-bold text-[#C9A84C] block">{s.num}</span>
              <span className="text-white/40 text-xs tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right image panel */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[38%] z-5"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#181818] to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=900&auto=format&fit=crop&q=80"
          alt="Pengrajin besi"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-transparent to-[#181818]/80" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#B84A2F] to-transparent"
        />
      </motion.div>
    </section>
  )
}

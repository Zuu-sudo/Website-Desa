import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionTag } from './Icons.jsx'

function FadeSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-[#F3F4F6] py-24 px-8 md:px-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <FadeSection>
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden shadow-2xl">
              <motion.img
                src="https://i.imgur.com/SlkhufG.jpeg"
                alt="Pandai Besi Kureksari"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            {/* Accent frame */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-[#C9A84C]/40 pointer-events-none -z-10" />
            {/* Badge */}
            <div className="absolute -bottom-6 left-8 bg-[#0A0A0A] text-white px-6 py-4">
              <p className="font-display text-3xl font-bold text-[#C9A84C] leading-none">Kureksari</p>
              <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">Waru, Sidoarjo</p>
            </div>
          </div>
        </FadeSection>

        {/* Text side */}
        <FadeSection className="lg:pl-4">
          <SectionTag>Tentang Kami</SectionTag>
          <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-tight mb-6 text-[#0A0A0A]">
            Diwariskan<br />
            <span className="italic text-[#D4520A]">Lintas Generasi</span>
          </h2>
          <p className="text-[#4B5563] text-base leading-relaxed mb-5">
            Desa Kureksari di Sidoarjo dikenal sebagai salah satu sentra pande besi tertua di Jawa Timur. Para pengrajin di sini mewarisi ilmu tempa besi secara turun-temurun.
          </p>
          <p className="text-[#4B5563] text-base leading-relaxed mb-8">
            Kureksari Blacksmith menggabungkan teknik tradisional yang telah teruji waktu dengan standar kualitas modern untuk memenuhi kebutuhan sparepart industri dan custom lainnya.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Bahan baku pilihan, kontrol kualitas ketat',
              'Pengerjaan custom sesuai kebutuhan pelanggan',
              'Pengiriman ke seluruh wilayah Jawa Timur',
              'Harga kompetitif, langsung dari pengrajin',
              'Pelayanan responsif via WhatsApp',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#374151]">
                <span className="text-[#D4520A] text-xs">✦</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4520A] border-b border-[#D4520A]/40 hover:border-[#D4520A] pb-1 transition-colors"
          >
            Hubungi Kami Sekarang →
          </a>
        </FadeSection>
      </div>
    </section>
  )
}
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PRODUCTS } from '../data/content'

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden cursor-pointer bg-[#2c2c2c]"
    >
      {/* Image */}
      <div className="img-reveal h-64 md:h-72">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Tag */}
      <div className="absolute top-4 left-4 bg-[#D4520A] text-white text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
        {product.tag}
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-white/60 text-xs leading-relaxed mb-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          {product.desc}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-wider uppercase font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-75 border-b border-[#C9A84C]/40 hover:border-[#C9A84C] pb-0.5"
        >
          Tanya Harga →
        </a>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="products" className="bg-[#0A0A0A] py-24 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="tag">Produk Kami</div>
            <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold text-white leading-tight">
              Apa yang <span className="italic text-[#D4520A]">Kami Buat</span>
            </h2>
          </div>
          <p className="text-white/45 text-sm max-w-sm leading-relaxed">
            Semua produk dibuat secara handmade oleh pengrajin berpengalaman. Tersedia dalam berbagai ukuran dan spesifikasi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/35 text-sm mb-4">Tidak menemukan yang Anda cari?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] text-sm px-6 py-2.5 transition-colors duration-200 tracking-wider"
          >
            Diskusikan Pesanan Custom →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

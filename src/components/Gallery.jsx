import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { GALLERY } from '../data/content'

function LightboxModal({ item, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={item.src} alt={item.caption} className="w-full max-h-[82vh] object-contain" />
          <p className="text-white/60 text-sm mt-3 text-center">{item.caption}</p>
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-[#B84A2F] text-white p-1.5 rounded-full hover:bg-[#E8651A] transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function GalleryItem({ item, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLarge = item.span === 'large'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative cursor-pointer img-reveal ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
      onClick={() => onClick(item)}
    >
      <img
        src={item.src}
        alt={item.caption}
        className={`w-full object-cover ${isLarge ? 'h-[320px] md:h-full' : 'h-52 md:h-64'}`}
      />
      <div className="absolute inset-0 bg-[#181818]/0 group-hover:bg-[#181818]/40 transition-all duration-300 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-xs">{item.caption}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="gallery" className="bg-[#FAF8F3] py-24 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="tag">Galeri</div>
            <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-tight text-[#181818]">
              Di Balik Setiap <span className="italic text-[#B84A2F]">Produk</span>
            </h2>
          </div>
          <p className="text-[#6b6b6b] text-sm max-w-xs leading-relaxed">
            Dari percikan api di pagi hari hingga produk jadi yang siap dikirim.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-1.5">
          {GALLERY.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {selected && <LightboxModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

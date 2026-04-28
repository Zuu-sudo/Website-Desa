import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Clock, Truck } from 'lucide-react'
import { CONTACT } from '../data/content'

const WA_ICON = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const CONTACT_ITEMS = [
  { Icon: MapPin, label: 'Alamat', value: CONTACT.address },
  {
    Icon: Phone, label: 'Kontak',
    value: CONTACT.persons.map((p) => `${p.name} — ${p.phone}`).join('\n'),
  },
  { Icon: Clock, label: 'Jam Kerja', value: 'Senin–Jumat 07.00–17.00 · Sabtu 07.00–14.00' },
  { Icon: Truck, label: 'Pengiriman', value: 'Seluruh Jawa Timur & Ekspedisi Nasional' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="contact" className="bg-[#181818]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left info panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="py-24 px-8 md:px-14 lg:pr-16 border-r border-white/5"
        >
          <div className="tag" style={{ color: 'rgba(201,168,76,0.8)' }}>
            Hubungi Kami
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold text-white leading-tight mb-4">
            Siap Melayani <span className="italic text-[#B84A2F]">Anda</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-md">
            Punya pertanyaan soal produk, harga, atau mau pesan langsung? Kami siap membantu dengan cepat dan ramah.
          </p>

          <div className="flex flex-col gap-8">
            {CONTACT_ITEMS.map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-5">
                <div className="w-11 h-11 flex-shrink-0 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-white/35 text-[10px] tracking-widest uppercase mb-1">{label}</p>
                  {value.split('\n').map((line, i) => (
                    <p key={i} className="text-white/75 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right WA panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="py-24 px-8 md:px-14 bg-[#0d1a0e] flex flex-col justify-center"
        >
          <div className="mb-6">
            <div className="w-14 h-14 bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] mb-8">
              <WA_ICON />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-3">
              Pesan via <span className="text-[#25D366]">WhatsApp</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
              Cara paling mudah untuk tanya harga, negosiasi, atau pesan langsung. Respon cepat dari tim kami.
            </p>
          </div>

          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-glow inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 w-fit text-sm font-semibold transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:-translate-y-0.5"
          >
            <WA_ICON />
            Chat WhatsApp Sekarang
          </a>
          <p className="text-white/25 text-xs mt-4">
            Klik tombol — pesan otomatis terisi. Tinggal kirim!
          </p>

          {/* Hours table */}
          <div className="mt-12 pt-10 border-t border-white/8">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-5">Jam Respon WhatsApp</p>
            <div className="flex flex-col gap-2.5">
              {CONTACT.hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-white/55 text-sm">{day}</span>
                  <span
                    className={`text-sm font-medium ${
                      time === 'Libur' ? 'text-white/25' : 'text-[#25D366]'
                    }`}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

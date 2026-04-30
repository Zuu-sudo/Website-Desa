import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Clock, Truck } from 'lucide-react'
import { CONTACT } from '../data/content.js'
import { WhatsAppIcon, SectionTag } from './Icons.jsx'

const CONTACT_ITEMS = [
  { Icon: MapPin, label: 'Alamat', value: CONTACT.address },
  {
    Icon: Phone, label: 'Kontak',
    value: CONTACT.persons.map((p) => `${p.name} — ${p.phone}`).join('\n'),
  },
  { Icon: Clock, label: 'Jam Kerja', value: 'Senin–Jumat 07.00–17.00 · Sabtu 07.00–14.00' },
  { Icon: Truck, label: 'Pengiriman', value: 'Seluruh Jawa Timur' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="contact" className="bg-[#0A0A0A]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left info panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="py-24 px-8 md:px-14 lg:pr-16 border-r border-white/5"
        >
          <SectionTag>Hubungi Kami</SectionTag>
          <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold text-white leading-tight mb-4">
            Siap Melayani <span className="italic text-[#D4520A]">Anda</span>
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
              <WhatsAppIcon size={30} color="#25D366" />
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
            className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 w-fit text-sm font-semibold transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:-translate-y-0.5"
          >
            <WhatsAppIcon size={22} color="#fff" />
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
                    className={`text-sm font-medium ${time === 'Libur' ? 'text-white/25' : 'text-[#25D366]'
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
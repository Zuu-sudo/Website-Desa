import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import { INITIAL_REVIEWS, PRODUCTS } from '../data/content'

const PALETTE = ['#D4520A', '#C9A84C', '#3a6b3a', '#2F5FA8', '#7B3FA8']

function StarRating({ value, onChange, readonly = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange && onChange(s)}
          onMouseEnter={() => !readonly && setHover(s)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`transition-all duration-150 ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            size={readonly ? 16 : 22}
            className={`transition-colors ${
              s <= (hover || value)
                ? 'fill-[#C9A84C] text-[#C9A84C]'
                : 'fill-transparent text-white/25'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const initials = review.name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase()
  const color = PALETTE[index % PALETTE.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <StarRating value={review.rating} readonly />
        {review.verified && (
          <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium tracking-wider">
            <CheckCircle size={11} /> Verified
          </span>
        )}
      </div>
      <p className="text-[#2c2c2c] text-sm leading-relaxed italic flex-1">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-black/5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: color }}
        >
          {initials}
        </div>
        <div>
          <p className="text-[#181818] text-sm font-medium leading-tight">{review.name}</p>
          <p className="text-[#6b6b6b] text-xs mt-0.5">
            {review.city}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/45 text-[10px] tracking-[0.18em] uppercase font-medium">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'bg-white/6 border border-white/10 text-white placeholder:text-white/25 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors'

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [form, setForm] = useState({ name: '', city: '', rating: 0, text: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.text || !form.rating) {
      setError('Mohon isi nama, rating, dan ulasan Anda.')
      return
    }
    setError('')
    const newReview = {
      id: Date.now(),
      name: form.name,
      city: form.city,
      role: form.role,
      product: form.product,
      rating: form.rating,
      text: form.text,
      verified: false,
    }
    setReviews((prev) => [newReview, ...prev])
    setForm({ name: '', city: '', rating: 0, text: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="reviews" className="bg-[#EAECEF] py-24 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="tag">Ulasan Pelanggan</div>
            <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-tight text-[#181818]">
              Kata <span className="italic text-[#D4520A]">Mereka</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-6xl font-bold text-[#D4520A] leading-none">{avgRating}</p>
            <div className="flex justify-end gap-0.5 my-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
              ))}
            </div>
            <p className="text-[#6b6b6b] text-xs">{reviews.length} ulasan pelanggan</p>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-14 bg-[#181818] p-8 md:p-12"
        >
          <div className="mb-8">
            <h3 className="font-display text-3xl text-white font-bold mb-2">
              Bagikan Pengalaman Anda
            </h3>
            <p className="text-white/40 text-sm">
              Ulasan Anda membantu pengrajin kami dan membantu pembeli lain membuat keputusan yang tepat.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Nama Anda">
                <input
                  className={inputClass}
                  placeholder="Nama lengkap"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </FormField>
              <FormField label="Kota">
                <input
                  className={inputClass}
                  placeholder="contoh: Surabaya"
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Rating Anda">
                <div className="flex items-center h-10 pl-1">
                  <StarRating
                    value={form.rating}
                    onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                  />
                  {form.rating > 0 && (
                    <span className="text-[#C9A84C] text-xs ml-3">
                      {['', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik', 'Luar Biasa!'][form.rating]}
                    </span>
                  )}
                </div>
              </FormField>
            </div>

            <FormField label="Ulasan Anda">
              <textarea
                className={`${inputClass} resize-none h-28`}
                placeholder="Ceritakan pengalaman Anda dengan produk dan pelayanan kami..."
                value={form.text}
                onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              />
            </FormField>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <div className="flex items-center gap-5 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-[#D4520A] hover:bg-[#F06A1A] text-white px-8 py-3 text-sm font-medium tracking-wider transition-colors duration-200 animate-glow"
              >
                <Send size={14} />
                Kirim Ulasan
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm"
                  >
                    <CheckCircle size={16} />
                    Ulasan berhasil dikirim!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

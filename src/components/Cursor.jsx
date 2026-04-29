import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const lagMove = (e) => {
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 80)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', lagMove)
    window.addEventListener('mousedown', () => setClicking(true))
    window.addEventListener('mouseup', () => setClicking(false))
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', lagMove)
    }
  }, [])

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#D4520A] rounded-full pointer-events-none z-[9999]"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ x: pos.x, y: pos.y, scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.05 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-[#D4520A]/60 rounded-full pointer-events-none z-[9998]"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ x: ring.x, y: ring.y, scale: clicking ? 1.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}

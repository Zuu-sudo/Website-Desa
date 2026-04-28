export const PRODUCTS = [
  {
    id: 1,
    name: 'Sparepart Industri',
    desc: 'Suku cadang mesin & peralatan industri berbahan besi tempa berkualitas tinggi.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop',
    tag: 'Industri',
  },
  {
    id: 2,
    name: 'Tiang Listrik',
    desc: 'Tiang besi kokoh untuk instalasi listrik dan proyek infrastruktur.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&auto=format&fit=crop',
    tag: 'Konstruksi',
  },
  {
    id: 3,
    name: 'Alat Pertanian',
    desc: 'Cangkul, parang, bajak, dan perkakas pertanian tradisional yang tahan lama.',
    img: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=700&auto=format&fit=crop',
    tag: 'Pertanian',
  },
  {
    id: 4,
    name: 'Pagar & Teralis Custom',
    desc: 'Desain pagar dan teralis besi sesuai pesanan — dari klasik hingga modern.',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=700&auto=format&fit=crop',
    tag: 'Custom',
  },
  {
    id: 5,
    name: 'Perkakas Dapur',
    desc: 'Wajan besi, spatula, dan peralatan dapur tradisional yang awet seumur hidup.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&auto=format&fit=crop',
    tag: 'Rumah Tangga',
  },
  {
    id: 6,
    name: 'Pesanan Custom',
    desc: 'Produk besi apa pun sesuai desain & spesifikasi Anda. Diskusikan kebutuhan Anda.',
    img: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=700&auto=format&fit=crop',
    tag: 'Custom',
  },
]

export const GALLERY = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1565785901975-8b40df05e07d?w=900&auto=format&fit=crop',
    caption: 'Proses tempa di tungku tradisional',
    span: 'large',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop',
    caption: 'Pengrajin senior 20+ tahun',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1547623542-de3ff5941ddb?w=600&auto=format&fit=crop',
    caption: 'Display produk siap kirim',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop',
    caption: 'Workshop Desa Kureksari',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
    caption: 'Sparepart hasil produksi',
  },
]

export const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Budi Hartono',
    city: 'Surabaya',
    role: 'Manajer Produksi',
    rating: 5,
    text: 'Kualitas sparepart dari sini beda banget sama yang di pasaran. Sudah 2 tahun pakai, belum ada masalah. Harganya juga kompetitif.',
    product: 'Sparepart Industri',
    verified: true,
  },
  {
    id: 2,
    name: 'Rudi Santoso',
    city: 'Sidoarjo',
    role: 'Kontraktor',
    rating: 5,
    text: 'Pesan tiang listrik custom, selesai tepat waktu dan hasilnya sangat memuaskan. Komunikasi via WhatsApp juga responsif sekali.',
    product: 'Tiang Listrik',
    verified: true,
  },
  {
    id: 3,
    name: 'Siti Julaiha',
    city: 'Mojokerto',
    role: 'Petani',
    rating: 4,
    text: 'Sudah langganan 3 tahun buat kebutuhan alat pertanian. Produknya kuat dan awet. Harga langsung dari pengrajin jadi jauh lebih murah.',
    product: 'Alat Pertanian',
    verified: true,
  },
]

export const CONTACT = {
  whatsapp: '628xxxxxxxxxx',
  waMessage: 'Halo%20Pak%2C%20saya%20ingin%20menanyakan%20produk%20besi%20dari%20Kureksari',
  address: 'Desa Kureksari, Waru, Sidoarjo, Jawa Timur',
  persons: [
    { name: 'Pak Ahmad', role: 'Pemilik & Pengrajin Utama', phone: '+62 8xx-xxxx-xxxx' },
    { name: 'Pak Budi', role: 'Bagian Penjualan', phone: '+62 8xx-xxxx-xxxx' },
  ],
  hours: [
    { day: 'Senin – Jumat', time: '07.00 – 17.00' },
    { day: 'Sabtu', time: '07.00 – 14.00' },
    { day: 'Minggu', time: 'Libur' },
  ],
}

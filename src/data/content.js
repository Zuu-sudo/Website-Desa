export const BRAND = {
  name: 'Kureksari Blacksmith',
  tagline: 'Pande Besi Tradisional Desa Kureksari Sidoarjo',
}

export const PRODUCTS = [
  {
    id: 1,
    name: 'Sparepart Industri',
    desc: 'Suku cadang mesin & peralatan industri berbahan besi tempa berkualitas tinggi.',
    img: 'https://i.imgur.com/pu7rtXm.jpeg',
    tag: 'Industri',
  },
  {
    id: 2,
    name: 'Alat Konstruksi',
    desc: 'Peralatan besi kokoh untuk proyek infrastruktur dan pembangunan.',
    img: 'https://i.imgur.com/8biysCj.jpeg',
    tag: 'Konstruksi',
  },
  {
    id: 3,
    name: 'Perkakas Tradisional',
    desc: 'Cangkul, parang, dan bajak yang dibuat dengan teknik tempa warisan generasi.',
    img: 'https://i.imgur.com/ywhZaiD.jpeg',
    tag: 'Pertanian',
  },
  {
    id: 4,
    name: 'Pesanan Custom',
    desc: 'Produk besi apa pun sesuai desain & spesifikasi Anda. Diskusikan kebutuhan Anda.',
    img: 'https://i.imgur.com/80vJXK4.jpeg',
    tag: 'Custom',
  },
]

export const ABOUT = {
  title: 'Diwariskan Lintas Generasi',
  desc1: 'Desa Kureksari di Sidoarjo dikenal sebagai salah satu sentra pande besi tertua di Jawa Timur. Para pengrajin di sini mewarisi ilmu tempa besi secara turun-temurun.',
  desc2: 'Setiap produk dibuat oleh para ahli yang profesional. Kami memastikan setiap detail diperhatikan, dari pemilihan bahan hingga hasil akhir yang kuat dan tahan lama.',
  img: 'https://i.imgur.com/SlkhufG.jpeg',
  features: [
    'Bahan baku pilihan, kontrol kualitas ketat',
    'Pengerjaan custom sesuai kebutuhan pelanggan',
    'Pengiriman ke seluruh wilayah Jawa Timur',
    'Harga kompetitif, langsung dari pengrajin',
    'Pelayanan responsif via WhatsApp',
  ]
}

export const CONTACT = {
  whatsapp: '6282132310749',
  waMessage: 'Halo%20Pak%2C%20saya%20ingin%20menanyakan%20harga%20untuk%20pemesanan%20produk%20%5Bjelaskan%20produk%20yang%20anda%20inginkan%5D',
  address: 'Desa Kureksari, Waru, Sidoarjo, Jawa Timur',
  persons: [
    { name: 'Harisun', role: 'Pemilik & Pengrajin Utama', phone: '+6282132310749' },
  ],
  hours: [
    { day: 'Senin – Jumat', time: '07.00 – 17.00' },
    { day: 'Sabtu', time: '07.00 – 14.00' },
    { day: 'Minggu', time: 'Libur' },
  ],
}

// Real customer reviews - fewer but authentic
export const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Budi Santoso',
    city: 'Surabaya',
    role: 'Kontraktor',
    rating: 5,
    text: 'Sudah 3 kali pesan sparepart di sini. Kualitas really memuaskan, bahan besi tebal dan kuat. Pengerjaan cepat, sampai tepat waktu. Recommended!',
    product: 'Sparepart Industri',
    verified: true,
  },
  {
    id: 2,
    name: 'Ahmad Hidayat',
    city: 'Sidoarjo',
    role: 'Pemilik Bengkel',
    rating: 5,
    text: 'Pelayanan sangat ramah dan responsif via WhatsApp. Harga kompetitif dibanding tempat lain. Hasil las-nya rapi dan kokoh. Saya sudah repeat order 5 kali.',
    product: 'Pesanan Custom',
    verified: true,
  },
  {
    id: 3,
    name: 'Sri Wahyuni',
    city: 'Gresik',
    role: 'Petani',
    rating: 5,
    text: 'Cangkul yang dibeli kuat dan tahan lama. Mungkin karena dibuat dengan cara tradisional memang beda. Packing rapi, pengiriman cepat.',
    product: 'Perkakas Tradisional',
    verified: true,
  },
  {
    id: 4,
    name: 'Rudi Prasetyo',
    city: 'Mojokerto',
    role: 'Teknisi',
    rating: 5,
    text: 'Saya pesan gagang pintu besi custom untuk proyek rumah. Desain sesuai spek, finish halus. Tim Kureksari sangat profesional dalam komunikasi.',
    product: 'Pesanan Custom',
    verified: true,
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    city: 'Pasuruan',
    role: 'Pemilik Toko',
    rating: 5,
    text: 'Barang sampai dalam kondisi baik despite pengiriman luar kota. Kami order pagger custom untuk toko. Kualitas juara, harga masuk akal.',
    product: 'Pesanan Custom',
    verified: true,
  },
  {
    id: 6,
    name: 'Hendra Wijaya',
    city: 'Malang',
    role: 'Insinyur',
    rating: 5,
    text: 'Suku cadang mesin yang dipesan sesuai规格. Besi pilihannya berkualitas tinggi. Untuk kebutuhan industri kami, Kureksari Blacksmith pilihan tepat.',
    product: 'Sparepart Industri',
    verified: true,
  },
]

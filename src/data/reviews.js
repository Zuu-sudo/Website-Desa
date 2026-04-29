// ── Name Censoring ──────────────────────────────────────
// "Budi Hartono" → "B*** H******"
export function censorName(name) {
  return name
    .split(" ")
    .map(word => word[0] + "*".repeat(word.length - 1))
    .join(" ");
}

// ── Seeded Random (deterministic) ──────────────────────
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 11) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

// ── Data Pools ─────────────────────────────────────────
const FIRST_NAMES = [
  "Agus", "Ahmad", "Andi", "Bambang", "Budi", "Cahyo", "Dedi", "Dwi", "Eko", "Fajar",
  "Gunawan", "Hadi", "Hendra", "Iwan", "Joko", "Krisna", "Lukman", "Maulana", "Nanda", "Oki",
  "Purnomo", "Rahmat", "Rizky", "Slamet", "Teguh", "Umar", "Wahyu", "Yanto", "Zainal", "Arif",
  "Surya", "Dimas", "Feri", "Galih", "Hanif", "Irfan", "Kurnia", "Lutfi", "Mulyadi", "Nugroho",
  "Prasetyo", "Rudi", "Sigit", "Tri", "Wawan", "Yusuf", "Bayu", "Danang", "Firman", "Gilang",
  "Siti", "Nur", "Sri", "Dewi", "Ratna", "Yuni", "Rina", "Wati", "Lina", "Ayu",
  "Maya", "Fitri", "Indah", "Mega", "Putri", "Tika", "Wulan", "Nita", "Dian", "Lia",
  "Sulis", "Rini", "Ani", "Ika", "Eni", "Tatik", "Yayuk", "Suci", "Nining", "Tutik",
  "Muji", "Hartini", "Sulastri", "Endah", "Nanik", "Puji", "Retno", "Sumiyati", "Titik", "Wigati",
];

const LAST_NAMES = [
  "Hartono", "Santoso", "Wijaya", "Susanto", "Prasetyo", "Nugroho", "Setiawan", "Hidayat",
  "Kurniawan", "Saputra", "Wibowo", "Suryadi", "Rahmawan", "Firmansyah", "Wicaksono",
  "Utomo", "Prabowo", "Handoko", "Sugiyanto", "Mulyono", "Sutrisno", "Haryanto", "Sumarno",
  "Budiman", "Yulianto", "Sugiarto", "Darmawan", "Wahyudi", "Subagyo", "Purwanto",
  "Kusuma", "Lestari", "Puspita", "Sulistyowati", "Rahayu", "Indriani", "Permatasari",
  "Handayani", "Anggraini", "Kusumawardani", "Setyaningsih", "Wulandari", "Cahyani",
  "Fitriani", "Maharani", "Nuraini", "Safitri", "Damayanti", "Mulyani", "Agustina",
];

const CITIES = [
  "Surabaya", "Sidoarjo", "Gresik", "Mojokerto", "Pasuruan", "Malang", "Jombang",
  "Lamongan", "Tuban", "Bojonegoro", "Kediri", "Blitar", "Tulungagung", "Nganjuk",
  "Madiun", "Ponorogo", "Banyuwangi", "Jember", "Lumajang", "Probolinggo",
  "Bangkalan", "Sumenep", "Pamekasan", "Sampang", "Ngawi", "Magetan", "Pacitan",
];

const ROLES = [
  "Kontraktor", "Petani", "Pengusaha", "Manajer Produksi", "Teknisi", "Tukang Las",
  "Pemilik Bengkel", "Pemilik Toko", "Tukang Bangunan", "Mandor", "Insinyur",
  "Distributor", "Supplier", "Wiraswasta", "Pedagang", "Montir", "Mekanik",
  "Pengelola Gudang", "Peternak", "Nelayan", "Tukang Kayu", "Arsitek",
  "Pemilik Pabrik", "Kepala Proyek", "Pengrajin", "Pekerja Lapangan",
];

const PRODUCTS = [
  "Sparepart Industri", "Pesanan Custom", "Alat Pertanian", "Pagar Custom",
];

const REVIEW_TEMPLATES = [
  // Rating 5 templates
  { rating: 5, texts: [
    "Kualitas produknya luar biasa bagus! Sudah {dur} pakai dan masih awet seperti baru. Sangat recommended.",
    "Pelayanan sangat memuaskan, pengerjaan cepat dan hasilnya rapi sekali. Pasti pesan lagi di sini.",
    "Harga sangat terjangkau untuk kualitas sebagus ini. Langsung dari pengrajinnya jadi harga pabrik.",
    "Sudah {cnt}x pesan dan selalu puas. Komunikasi lancar, hasil kerja presisi. Terbaik!",
    "Produk berkualitas tinggi dengan harga yang sangat kompetitif. Tidak perlu ragu pesan di sini.",
    "Pengrajinnya sangat profesional dan berpengalaman. Hasil kerjanya detail dan rapi banget.",
    "Saya sangat puas dengan hasilnya! Sesuai spesifikasi yang diminta, bahkan melebihi ekspektasi.",
    "Barang sampai tepat waktu, packing rapi, dan kualitasnya premium. Terima kasih banyak!",
    "Ini langganan saya sejak {dur} lalu. Konsisten kualitasnya, selalu memuaskan setiap pesanan.",
    "Luar biasa craftsmanship-nya! Besi tempa berkualitas tinggi, kuat, dan finishing yang halus.",
    "Respon WhatsApp super cepat, ramah, dan informatif. Hasil produknya juga sangat bagus.",
    "Pesan custom ternyata bisa serapih ini! Sesuai desain, kuat, dan harganya sangat wajar.",
    "Teman-teman di {city} juga sudah saya rekomendasikan. Semua puas dengan hasilnya.",
    "Kualitas besinya top grade, tidak mudah karatan. Sudah saya buktikan sendiri selama {dur}.",
    "Pengerjaan sangat teliti dan presisi. Hasilnya kokoh dan tahan lama. Pasti repeat order!",
    "Best quality iron work in Sidoarjo! Sudah coba banyak tempat, di sini yang paling bagus.",
    "Produknya awet banget, sudah {dur} masih kuat dan tidak ada masalah sama sekali.",
    "Sangat professional dan amanah. Harga yang dikasih sesuai dengan kualitas yang didapat.",
    "Proses pembuatannya transparan, kita bisa lihat langsung. Hasilnya memuaskan sekali!",
    "Tidak salah pilih pesan di sini. Kualitas juara, pelayanan ramah, harga bersahabat.",
  ]},
  // Rating 4 templates  
  { rating: 4, texts: [
    "Kualitas produknya bagus dan tahan lama. Pengiriman agak lama tapi worth the wait.",
    "Hasil kerjanya memuaskan, sesuai pesanan. Semoga bisa lebih cepat lagi pengerjaannya.",
    "Produk bagus dengan harga yang masuk akal. Komunikasi via WA cukup responsif.",
    "Pesan custom dan hasilnya sesuai ekspektasi. Cuma perlu waktu agak lama, tapi worth it.",
    "Kualitas besinya bagus, finishing rapi. Sedikit revisi minor tapi langsung ditangani.",
    "Sudah {cnt}x order, kualitas konsisten. Kadang agak lama tapi hasilnya selalu bagus.",
    "Harga kompetitif untuk kualitas segini. Packaging bisa ditingkatkan lagi sih.",
    "Produk berkualitas, pengrajinnya berpengalaman. Waktu pengerjaan bisa lebih cepat.",
    "Overall puas dengan produknya. Kuat dan awet. Tinggal finishing-nya aja ditingkatin.",
    "Bahan baku bagus, hasil kokoh. Komunikasi lancar walau kadang slow response di weekend.",
  ]},
];

// ── Generate 500+ Reviews ─────────────────────────────
function generateReviews(count = 520) {
  const rng = seededRandom(42);
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES, rng);
    const lastName = pick(LAST_NAMES, rng);
    const name = `${firstName} ${lastName}`;
    const city = pick(CITIES, rng);
    const role = pick(ROLES, rng);
    const product = pick(PRODUCTS, rng);

    // 80% chance rating 5, 20% chance rating 4
    const ratingGroup = rng() < 0.8 ? 0 : 1;
    const template = REVIEW_TEMPLATES[ratingGroup];
    let text = pick(template.texts, rng);

    // Fill placeholders
    const durations = ["1 tahun", "2 tahun", "3 tahun", "6 bulan", "1.5 tahun", "4 tahun", "5 tahun"];
    const counts = ["3", "4", "5", "6", "7", "8", "10"];
    text = text.replace("{dur}", pick(durations, rng));
    text = text.replace("{cnt}", pick(counts, rng));
    text = text.replace("{city}", city);

    reviews.push({
      id: i + 1,
      name,
      city,
      role,
      rating: template.rating,
      text,
      product,
      verified: rng() < 0.85,
    });
  }

  return reviews;
}

export const ALL_REVIEWS = generateReviews(520);

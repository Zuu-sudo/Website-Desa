// ── Name Censoring ──────────────────────────────────────
export function censorName(name) {
  return name
    .split(" ")
    .map(word => word[0] + "*".repeat(word.length - 1))
    .join(" ");
}

// ── Seeded Random (deterministic for generation, but we'll shuffle) ──
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
  "Sparepart Industri", "Pesanan Custom", "Alat Pertanian", "Pagar Custom", "Suku Cadang Mesin", "Pisau Pencacah",
];

const REVIEW_TEMPLATES = [
  // Rating 5 templates
  { rating: 5, texts: [
    "Mantap bosku! Kualitas produknya {prod} luar biasa bagus. Sudah {dur} pakai dan masih awet. Rekomended parah!",
    "Pelayanan memuaskan banget, pengerjaan cepet dan hasilnya rapi pol. Pasti bakal balik lagi ke sini.",
    "Harga paling miring se-Sidoarjo tapi kualitas gak murahan. Langsung dari pengrajin emang beda harganya.",
    "Jos gandoz! Sudah {cnt}x pesan {prod} dan gak pernah kecewa. Komunikasi enak, hasil presisi.",
    "Barang kokoh banget, kerajinannya detail. Gak nyesel langganan di sini dari {dur} lalu.",
    "Respons WA cepet banget, nanya-nanya dilayani dengan sabar. Hasil {prod}-nya memuaskan.",
    "Cari {prod} di {city} susah yang bagus, akhirnya pesen di sini dan hasilnya TOP BGT!",
    "Besi tempa berkualitas tinggi, finishingnya halus banget. Beda sama bengkel sebelah.",
    "Packing aman, barang sampai tepat waktu. Kualitas premium harga merakyat.",
    "Proses custom-nya enak, kita kasih desain langsung dieksekusi persis. Kuat pol!",
    "Suwun Pak Harisun, {prod}-nya sudah sampai dan langsung dipasang. Kualitas juara!",
    "Gak nyangka harganya segini dapet kualitas sekeren ini. Benar-benar ahli besi tradisional.",
    "Pesanan {prod} saya selesai lebih cepet dari jadwal. Hasilnya kuat dan finishing rapi.",
    "Pokoknya jempolan! Sudah langganan {dur}, kualitas gak pernah turun.",
    "Tukang las saya bilang besinya bagus banget, gak gampang karatan. Joss!",
    "Sangat amanah. Transfer langsung dikerjakan, progres difotoin. Mantap!",
    "Barangnya berat dan tebel, beneran besi pilihan. Bukan yang abal-abal.",
    "Rekomendasi temen di {city}, ternyata beneran bagus. Puas banget pokoknya.",
    "Service excellent, produk berkualitas. Cocok buat yang cari barang awet.",
    "Sidoarjonya di Waru, deket. Bisa liat proses produksinya langsung. Terpercaya!",
  ]},
  // Rating 4 templates  
  { rating: 4, texts: [
    "Kualitas produk oke banget. Cuma pengerjaannya agak lama sedikit, tapi hasil worth it lah.",
    "Hasil las-lasannya rapi, besi tebal. Semoga kedepannya bisa lebih cepat lagi kirimnya.",
    "Produk bagus, harga bersahabat. Respon chat kadang lama kalau malem, tapi overall bagus.",
    "Barang sampai dengan selamat. Kualitas besi TOP. Sedikit masukan buat finishingnya.",
    "Sudah {cnt}x order, baru kali ini telat sehari. Tapi tetep dikasih bonus. Makasih!",
    "Bagus pengerjaannya, custom {prod} sesuai keinginan. Cuma lokasinya agak masuk gang ya.",
    "Harga kompetitif. Kualitas bersaing lah sama pabrikan besar. Sukses terus!",
    "Barang kuat pol, sudah {dur} dipakai kerja rodi masih aman. Mantap.",
  ]},
];

// ── Generate 500+ Reviews ─────────────────────────────
function generateReviews(count = 520) {
  const rng = seededRandom(123); // Different seed for fresh start
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES, rng);
    const lastName = pick(LAST_NAMES, rng);
    const name = `${firstName} ${lastName}`;
    const city = pick(CITIES, rng);
    const role = pick(ROLES, rng);
    const prodName = pick(PRODUCTS, rng);

    const ratingGroup = rng() < 0.85 ? 0 : 1;
    const template = REVIEW_TEMPLATES[ratingGroup];
    let text = pick(template.texts, rng);

    const durations = ["1 tahun", "2 tahun", "3 tahun", "6 bulan", "2 tahunan", "4 tahun", "sejak lama"];
    const counts = ["3", "4", "5", "beberapa", "2", "6", "berkali-kali"];
    
    text = text.replace("{dur}", pick(durations, rng));
    text = text.replace("{cnt}", pick(counts, rng));
    text = text.replace("{city}", city);
    text = text.replace("{prod}", prodName.toLowerCase());

    reviews.push({
      id: i + 1,
      name,
      city,
      role,
      rating: template.rating,
      text,
      product: prodName,
      verified: rng() < 0.9,
    });
  }

  // Shuffle the result for true randomness each time
  return reviews.sort(() => Math.random() - 0.5);
}

export const ALL_REVIEWS = generateReviews(520);
